# PriceTracker

A full-stack product price tracking application that monitors prices on e-commerce websites, notifies users when target prices are hit, and maintains a full price history with analytics. Built with Spring Boot 4, React 19, PostgreSQL, and Redis.

---

## Overview

PriceTracker lets users track product prices by submitting a product URL and a target price. The backend periodically scrapes the live price of every tracked product, compares it against each user's target, and sends an email notification when the price drops to or below the threshold. Price changes are stored in a history table, enabling trend analysis through an interactive chart in the frontend.

The system is designed around a shared-product model: if two users track the same URL, only one `Product` record exists in the database. Both users maintain their own `UserTrackedProduct` row with individual target prices and alert states, so scraping runs once per unique product URL regardless of how many users track it.

---

## Features

- **Email/password registration** with OTP-based email verification before login is allowed
- **JWT authentication** (30-day tokens, stateless sessions) with a per-request `JwtFilter`
- **Forgot password flow** using time-limited, single-use tokens stored and validated in Redis
- **Product tracking** — submit a URL, set a target price; the backend scrapes metadata and price on first add
- **Scheduled price checks** running every 6 minutes across all products, paginated in batches of 50, processed by an 8-thread `ExecutorService`
- **On-demand price refresh** — users can trigger an immediate price check for their own tracked products from the Settings page
- **Price drop and price increase alerts** stored in the `alerts` table; email notifications sent asynchronously via Spring's `@Async` event listener
- **Duplicate alert suppression** — the `alertSent` flag on `UserTrackedProduct` prevents repeat email spam for the same drop; resets automatically when prices recover above the target
- **Price history and analytics** — every price change is recorded in `product_price_history` with `changeAmount` and `changePercent`; displayed as an interactive area chart in the frontend using Recharts
- **Lowest-price tracking** — the analytics endpoint computes the historical all-time low from recorded snapshots
- **Notification preferences** — per-user settings for `notifyOnDrop`, `notifyOnIncrease`, and `minDropPercentage`; only significant drops (≥ 1% change by default) trigger alerts
- **Account deletion** with full cascading cleanup: alerts, tracked products, orphaned products with no remaining users, price history, settings, and Redis cache eviction
- **Redis-backed response caching** — `userTrackedProducts` cache with a 10-minute TTL, invalidated on add/remove/price-update operations via `@CacheEvict`
- **OTP rate limiting** in Redis — 1-minute cooldown between OTP requests, 3-attempt limit before a 7-minute block key is written

---

## Tech Stack

| Layer       | Technology                                              |
|-------------|----------------------------------------------------------|
| Frontend    | React 19, Vite, Tailwind CSS 4, React Router DOM 7, Recharts, Axios, react-toastify |
| Backend     | Spring Boot 4, Spring Security, Spring Data JPA, Spring Data Redis, Spring Mail, Spring MVC |
| Scraping    | Jsoup 1.18.3                                             |
| Auth        | JJWT 0.11.5 (HS256), BCrypt                             |
| Database    | PostgreSQL 15                                           |
| Caching     | Redis 7                                                 |
| Concurrency | `ExecutorService` (fixed thread pool of 8), `@Async`, `@Scheduled` |
| DevOps      | Docker, Docker Compose, Eclipse Temurin JDK 21          |
| Build       | Maven (Spring Boot Maven Plugin)                        |

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│  React Frontend (Vite, port 5173)                               │
│  - Axios instance with request interceptor (JWT injection)      │
│  - Protected routes via ProtectedRoute wrapper                  │
│  - Pages: Auth, Products, Alerts, Analytics, Settings           │
└──────────────────────────┬──────────────────────────────────────┘
                           │ HTTP / REST
┌──────────────────────────▼──────────────────────────────────────┐
│  Spring Boot Backend (port 8080)                                │
│                                                                 │
│  JwtFilter (OncePerRequestFilter)                               │
│    └─ Validates Bearer token, loads User, sets SecurityContext  │
│                                                                 │
│  Controllers                                                    │
│    ├─ /auth        → AuthController      (signup, login)        │
│    ├─ /otp         → OtpController       (verify, forgot, reset) │
│    ├─ /products    → ProductController   (add, list, delete, analytics) │
│    ├─ /alerts      → AlertController     (list)                 │
│    ├─ /user        → UserController      (profile, change-pass) │
│    └─ /settings    → UserSettingsController (get, update, fetch-now, delete) │
│                                                                 │
│  Services                                                       │
│    ├─ CheckPriceService  (@Scheduled, ExecutorService pool=8)   │
│    ├─ ProductProcessingService  (Jsoup scraping, alert logic)   │
│    ├─ OtpService  (StringRedisTemplate, rate limiting)          │
│    ├─ AuthService  (signup, login, JWT generation)              │
│    ├─ ProductServiceImpl  (@Cacheable, @CacheEvict)             │
│    ├─ UserSettingsService  (settings CRUD, account deletion)    │
│    ├─ AlertService  (alert retrieval)                           │
│    └─ EmailService  (JavaMailSender — OTP, reset, price alert)  │
│                                                                 │
│  Events                                                         │
│    └─ PriceDropEvent → PriceDropListener (@Async @EventListener)│
└───────────┬──────────────────────────────────┬──────────────────┘
            │                                  │
┌───────────▼──────────┐         ┌─────────────▼────────────────┐
│   PostgreSQL 15       │         │   Redis 7                     │
│   Tables:             │         │   Keys:                       │
│   - users             │         │   - OTP:<email>  (5 min TTL)  │
│   - products          │         │   - OTP:cooldown:<email>  (1m)│
│   - user_tracked_products│       │   - OTP:attemptKey:<email>(5m)│
│   - product_price_history│       │   - OTP:blockKey:<email>  (7m)│
│   - alerts            │         │   - TOKEN:<token>  (15 min)   │
│   - user_settings     │         │   - TOKEN:EMAIL:<email>  (15m)│
│   - email_otp         │         │   - TOKEN:COOLDOWN:<email>(2m)│
└───────────────────────┘         │   Cache: userTrackedProducts  │
                                  │           (10 min TTL, JSON)  │
                                  └───────────────────────────────┘
```

### Scraping Flow

1. `CheckPriceService.checkPrices()` fires every 360,000 ms via `@Scheduled(fixedDelay = 360000)`.
2. Products are fetched from PostgreSQL in pages of 50 using Spring Data's `Pageable`.
3. Each page's product IDs are submitted as separate `Callable` tasks to a `Executors.newFixedThreadPool(8)` executor. All futures are collected and awaited with `future.get()`.
4. Each thread calls `ProductProcessingService.processProduct(productId)`, which:
   - Fetches the live price via Jsoup
   - Skips if price is unchanged
   - Computes `changeAmount` and `changePercent` (4 decimal scale, `HALF_UP` rounding)
   - Persists a `ProductPriceHistory` record
   - Iterates all `UserTrackedProduct` mappings for that product, checks each user's settings (`notifyOnDrop`, `notifyOnIncrease`), evaluates alert conditions, and publishes a `PriceDropEvent` when triggered
   - Evicts the `userTrackedProducts` cache entry for each affected user

### Event-Driven Email Dispatch

When a price drop alert is triggered, `ApplicationEventPublisher.publishEvent(new PriceDropEvent(...))` fires. `PriceDropListener.handleEventListener()` is annotated with both `@EventListener` and `@Async`, so email dispatch happens on a separate thread managed by Spring's async executor — it does not block the scraping thread.

### Redis Usage

Redis serves two distinct roles:

1. **Operational key-value store** (`StringRedisTemplate`) for OTP lifecycle management and password reset tokens. Keys are namespaced (`OTP:`, `TOKEN:`, `TOKEN:EMAIL:`, `TOKEN:COOLDOWN:`) with explicit TTLs.
2. **Spring Cache backend** (`RedisCacheManager`) for the `userTrackedProducts` cache. Values are serialized as JSON using `GenericJackson2JsonRedisSerializer` with `JavaTimeModule` registered to handle `LocalDateTime`. Default entry TTL is 10 minutes.

---

## Key Engineering Highlights

### Concurrency and Scheduling

`CheckPriceService` holds a single `ExecutorService` instance (`Executors.newFixedThreadPool(8)`) as a service-level field. The scheduler (`@Scheduled(fixedDelay = 360000)`) paginates through all products and calls `processProductIds()`, which submits one `Callable` per product ID. The calling thread then blocks on all futures via `future.get()` with per-future exception handling so one failed scrape does not abort the rest of the batch.

The application root class (`PriceTrackerApplication`) declares `@EnableAsync` and `@EnableScheduling` explicitly, ensuring both features are active without relying on auto-configuration.

### OTP Rate Limiting with Redis

Three separate Redis keys are written for each OTP request:

- `OTP:<email>` — the raw OTP value, expires in 5 minutes
- `OTP:cooldown:<email>` — a flag preventing re-request, expires in 1 minute
- `OTP:attemptKey:<email>` — an attempt counter, incremented on wrong OTP, expires in 5 minutes

On verification, if `attemptKey` reaches 3, all OTP keys are deleted and a `OTP:blockKey:<email>` key is written with a 7-minute TTL. This prevents brute-force attempts without any database writes.

The forgot-password flow has its own cooldown key (`TOKEN:COOLDOWN:<email>`, 2-minute TTL) and invalidates the previous token when a new one is requested by looking it up via `TOKEN:EMAIL:<email>` and deleting the old `TOKEN:<token>` key before writing a new one.

### Scraping Mechanism

Jsoup is used for HTML parsing. `ProductProcessingService.fetchPrice()` connects to the target URL with a `Mozilla/5.0` user-agent and a 10-second timeout. CSS selectors target the demo e-commerce site (`books.toscrape.com`): `.price_color` for price, `div.product_main h1` for title, `#product_description + p` for description, and `.item img` for the image URL.

URL validation runs before any HTTP connection: scheme must be `http` or `https`, and the host must contain a `.`. Validation failures throw `InvalidUrlException`, which the global `GlobalExceptionalHandler` maps to a structured `ErrorResponseDto` response.

### Alert Deduplication

`UserTrackedProduct.alertSent` is a boolean flag stored in PostgreSQL. An alert email is only sent when `shouldTrigger` is true AND `alertSent` is `false`. After sending, `alertSent` is set to `true`. When the price rises back above the target (i.e., `targetPrice < newPrice`), `alertSent` is reset to `false`, allowing a future re-notification if the price drops again.

### Optimistic Locking

`Product` carries a `@Version Long version` field, enabling JPA optimistic locking. This prevents lost updates when multiple scraping threads attempt to persist price changes to the same product record simultaneously.

### Cache Invalidation

`ProductServiceImpl` uses Spring's `@Cacheable(value = "userTrackedProducts", key = "#user.id")` on `getUserTrackedProducts`. Cache entries are evicted via `@CacheEvict` on both `addProduct` and `removeProductFromTracking`. During scheduled price updates, `ProductProcessingService` manually calls `cacheManager.getCache("userTrackedProducts").evict(userId)` for each user whose tracked product was updated, keeping cached data fresh between explicit user actions.

### Database Schema Design

- `products` has a unique constraint (`uk_product_url`) and a database index (`idx_product_url`) on `product_url`, enabling O(1) URL lookups on first-add deduplication.
- `user_tracked_products` has a composite unique constraint (`uk_user_product`) on `(user_id, product_id)` enforced at the database level, preventing duplicate tracking entries even under concurrent requests.
- `product_price_history` has a composite index (`idx_product_checked`) on `(product_id, checked_at DESC)` to support the analytics query, which fetches all history for a product ordered by time.

---

## Folder Structure

```
priceTracker/
├── docker-compose.yml                 # Orchestrates backend, PostgreSQL, Redis
├── price-tracker-frontend/
│   ├── src/
│   │   ├── Api/                       # Axios instance + per-domain API call modules
│   │   │   ├── axios.js               # Axios instance, request/response interceptors
│   │   │   ├── auth.js                # signup, login, OTP calls
│   │   │   ├── productApi.js          # scrape, add, list, delete, analytics
│   │   │   └── settings.js            # profile, password, settings, fetch-now, delete
│   │   ├── Components/
│   │   │   ├── Common/                # Reusable Card component
│   │   │   └── Layout/                # LayoutWrapper (sidebar/nav shell)
│   │   ├── Context/
│   │   │   └── SearchContext.jsx      # Global search state
│   │   ├── Pages/                     # One file per route
│   │   │   ├── LandingPage.jsx
│   │   │   ├── AuthPage.jsx           # Login + signup + OTP verification flow
│   │   │   ├── HomePage.jsx
│   │   │   ├── ProductsPage.jsx       # Add and list tracked products
│   │   │   ├── AlertsPage.jsx         # Price drop / increase alert history
│   │   │   ├── AnalyticsPage.jsx      # List view linking to per-product analytics
│   │   │   ├── ProductAnalytics.jsx   # Area chart + stats for a single product
│   │   │   ├── SettingsPage.jsx       # Profile, password, notification prefs, account deletion
│   │   │   ├── ForgotPassword.jsx
│   │   │   └── ResetPassword.jsx
│   │   └── Utils/
│   │       └── ProtectedRoute.jsx     # Redirects unauthenticated users to /auth
│   └── vite.config.js
└── priceTracker/
    ├── Dockerfile
    ├── pom.xml
    └── src/main/java/com/priceTracker/
        ├── Config/
        │   ├── CorsConfig.java            # Allows http://localhost:5173
        │   ├── RedisConfig.java           # StringRedisTemplate bean
        │   └── RedisCacheConfig.java      # RedisCacheManager, 10-min TTL, JSON serializer
        ├── Controllers/                   # REST layer
        ├── DTOs/                          # Request/response shapes (19 classes)
        ├── Entities/                      # JPA entities (8 classes)
        ├── Exceptions/                    # Custom exceptions + GlobalExceptionalHandler
        ├── Repositories/                  # Spring Data JPA interfaces (6)
        ├── Security/
        │   ├── JwtFilter.java             # OncePerRequestFilter, sets SecurityContext
        │   ├── JwtUtil.java               # Token generation and claim extraction
        │   └── SecurityConfig.java        # Security filter chain, stateless session
        ├── Services/                      # Business logic (9 classes)
        ├── SeviceInterfaces/              # ProductService interface
        ├── events/
        │   ├── PriceDropEvent.java        # Event payload
        │   └── PriceDropListener.java     # @Async @EventListener — sends email
        ├── payload/
        │   └── ApiResponse.java           # Uniform response envelope
        └── PriceTrackerApplication.java   # @EnableScheduling @EnableAsync entry point
```

---

## API Endpoints

All authenticated endpoints require `Authorization: Bearer <token>` header. Public routes (`/auth/**`, `/otp/**`) bypass the JWT filter.

### Authentication

| Method | Path             | Description                                      |
|--------|------------------|--------------------------------------------------|
| POST   | `/auth/signup`   | Register a new user. Triggers OTP email.         |
| POST   | `/auth/login`    | Authenticate and receive a JWT.                  |

### OTP and Password Reset

| Method | Path                  | Description                                         |
|--------|-----------------------|------------------------------------------------------|
| POST   | `/otp/send-otp`       | Send/resend email OTP (1-min cooldown enforced).    |
| POST   | `/otp/verify-otp`     | Verify OTP, mark account as email-verified.         |
| POST   | `/otp/forgot-password`| Send password reset link (2-min cooldown enforced). |
| POST   | `/otp/reset-password` | Consume reset token and set new password.           |

### Products

| Method | Path                         | Description                                              |
|--------|------------------------------|----------------------------------------------------------|
| POST   | `/products`                  | Add a product URL to tracking. Scrapes on first add.    |
| GET    | `/products`                  | List current user's tracked products (Redis cached).    |
| DELETE | `/products/tracking/{id}`    | Untrack a product. Evicts cache.                        |
| POST   | `/products/scrape`           | Preview-scrape a URL without saving.                    |
| GET    | `/products/{id}/analytics`   | Return product details + full price history.            |

### Alerts

| Method | Path      | Description                     |
|--------|-----------|---------------------------------|
| GET    | `/alerts` | Fetch all alerts for current user (both `PRICE_DROP` and `PRICE_INCREASE` types). |

### User

| Method | Path               | Description                         |
|--------|--------------------|--------------------------------------|
| GET    | `/user/me`         | Return authenticated user identity. |
| GET    | `/user/profile`    | Return name, email, username.        |
| PUT    | `/user/profile`    | Update name and username.            |
| PUT    | `/user/change-pass`| Change password (current + new).     |

### Settings

| Method | Path                   | Description                                                   |
|--------|------------------------|----------------------------------------------------------------|
| GET    | `/settings`            | Get or auto-create user notification settings.                |
| PUT    | `/settings`            | Update notification preferences.                              |
| POST   | `/settings/fetch-now`  | Trigger immediate price fetch for user's tracked products.    |
| DELETE | `/settings/account`    | Delete account and all associated data. Evicts Redis cache.   |

---

## Setup Instructions (Local Development)

### Prerequisites

- Java 21
- Maven 3.9+
- Node.js 20+
- PostgreSQL 15 running locally
- Redis 7 running locally

### Backend

1. Clone the repository.

2. Create a PostgreSQL database:
   ```sql
   CREATE DATABASE pricetracker;
   ```

3. Edit `priceTracker/src/main/resources/application.properties` for local connections:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/pricetracker
   spring.datasource.username=<your_pg_user>
   spring.datasource.password=<your_pg_password>

   spring.data.redis.host=localhost
   spring.data.redis.port=6379

   spring.mail.username=<your_gmail>
   spring.mail.password=<your_app_password>
   ```

4. Build and run:
   ```bash
   cd priceTracker
   ./mvnw spring-boot:run
   ```

   The backend starts on `http://localhost:8080`.

### Frontend

1. Install dependencies:
   ```bash
   cd price-tracker-frontend
   npm install
   ```

2. Create a `.env` file (optional — defaults to `http://localhost:8080`):
   ```env
   VITE_API_URL=http://localhost:8080
   ```

3. Start the dev server:
   ```bash
   npm run dev
   ```

   The frontend starts on `http://localhost:5173`.

---

## Docker Setup

The `docker-compose.yml` at the project root defines three services: `backend`, `db` (PostgreSQL 15), and `redis` (Redis 7).

### Build and Start

Before running Docker Compose, build the Spring Boot fat JAR:

```bash
cd priceTracker
./mvnw clean package -DskipTests
```

Then from the project root:

```bash
docker-compose up --build
```

### Services

| Service   | Image                     | Port       | Notes                                              |
|-----------|---------------------------|------------|----------------------------------------------------|
| `backend` | Built from `./priceTracker/Dockerfile` | `8080:8080` | Depends on `db` and `redis`. Runs the fat JAR via Eclipse Temurin JDK 21. |
| `db`      | `postgres:15`             | `5432:5432` | Credentials sourced from `.env`. |
| `redis`   | `redis:7`                 | `6379:6379` | No persistence configured. Acts as cache and operational key store. |

Docker Compose injects all sensitive values at runtime from a `.env` file placed at the project root. The `backend` service receives database credentials, Redis connection details, JWT secret, and SMTP credentials as environment variables, which Spring Boot automatically maps to the corresponding `application.properties` keys:

```yaml
SPRING_DATASOURCE_URL: jdbc:postgresql://db:5432/${POSTGRES_DB}
SPRING_DATASOURCE_USERNAME: ${POSTGRES_USER}
SPRING_DATASOURCE_PASSWORD: ${POSTGRES_PASSWORD}
SPRING_DATA_REDIS_HOST: redis
SPRING_DATA_REDIS_PORT: 6379
JWT_SECRET: ${JWT_SECRET}
SPRING_MAIL_USERNAME: ${MAIL_USERNAME}
SPRING_MAIL_PASSWORD: ${MAIL_PASSWORD}
```

The frontend is not containerized in the current `docker-compose.yml`. Run it locally with `npm run dev` pointing `VITE_API_URL` at `http://localhost:8080`.

---

## Environment Variables

All sensitive configuration values — including database credentials, the JWT secret, and SMTP credentials — are supplied exclusively via environment variables. No secrets are hardcoded in the source code or committed to version control.

### `.env` File (Project Root)

Create a `.env` file at the project root before starting the stack. Docker Compose reads this file automatically and injects the values into the relevant service containers. Spring Boot maps them to the corresponding `application.properties` keys at runtime.

```env
# PostgreSQL
POSTGRES_DB=pricetracker
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password

# JWT
JWT_SECRET=your_jwt_secret_key

# SMTP (Gmail App Password)
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password
```

> [!WARNING]
> **Never commit real credentials to version control.** The `.env` file is listed in `.gitignore` and must never be pushed to a repository. Use the placeholder values above as a reference template only. For production deployments, source secrets from a dedicated secrets manager (e.g., AWS Secrets Manager, HashiCorp Vault) rather than a plain `.env` file.

### Backend Environment Variables

The following variables are read by the backend at startup, either directly from the environment or via Spring Boot's property binding. Docker Compose injects all values from the `.env` file at runtime.

| Variable                                          | Description                                     | Source        |
|---------------------------------------------------|-------------------------------------------------|---------------|
| `POSTGRES_DB`                                     | PostgreSQL database name                        | `.env`        |
| `POSTGRES_USER`                                   | PostgreSQL username                             | `.env`        |
| `POSTGRES_PASSWORD`                               | PostgreSQL password                             | `.env`        |
| `JWT_SECRET`                                      | HS256 signing secret for JWT generation/validation | `.env`     |
| `MAIL_USERNAME`                                   | Sender Gmail address for SMTP                   | `.env`        |
| `MAIL_PASSWORD`                                   | Gmail App Password (not the account password)   | `.env`        |
| `spring.data.redis.host`                          | Redis hostname                                  | `docker-compose.yml` |
| `spring.data.redis.port`                          | Redis port                                      | `docker-compose.yml` |
| `spring.mail.host`                                | SMTP host                                       | `application.properties` |
| `spring.mail.port`                                | SMTP port                                       | `application.properties` |
| `spring.mail.properties.mail.smtp.auth`           | Enable SMTP authentication                      | `application.properties` |
| `spring.mail.properties.mail.smtp.starttls.enable`| Enable STARTTLS                                 | `application.properties` |

### Frontend

| Variable         | Description                          | Default                   |
|------------------|--------------------------------------|---------------------------|
| `VITE_API_URL`   | Backend base URL for Axios instance  | `http://localhost:8080`   |

---

## Challenges and Learnings

**Concurrent writes to shared product records.** Multiple scraping threads can process different users' tracked products that resolve to the same `Product` row. Without optimistic locking, two threads could read the same `currentPrice`, compute independent updates, and the second write would silently discard the first. Adding `@Version` to `Product` surfaces this as an optimistic lock exception, which is caught at the `future.get()` level in `CheckPriceService`.

**Cache coherence during batch scraping.** The `userTrackedProducts` cache is popualted per user and keyed by user ID. During a scheduled scrape, `ProductProcessingService` updates prices and must evict each affected user's cache entry manually using `CacheManager.getCache(...).evict(userId)`, since Spring's `@CacheEvict` annotation operates on method boundaries, not inside batch loops. Missing this caused stale product lists until TTL expiry.

**Alert deduplication across price cycles.** Without the `alertSent` flag, a product sitting at or below the target price would fire an email alert on every scrape cycle. The flag stops re-notification until the price recovers above the target and then drops again, modelling a meaningful price movement rather than a repeated condition.

**OTP brute-force prevention without a database.** Implementing attempt counting, cooldowns, and blocking entirely in Redis avoids database writes on every failed OTP attempt. The three-key structure (`OTP:`, `OTP:cooldown:`, `OTP:attemptKey:`) with coordinated TTLs means all state self-expires — there is no cleanup job needed.

**Scraping target-specific selectors.** Jsoup selectors are currently written for `books.toscrape.com` (`.price_color`, `div.product_main h1`). Extending the scraper to support arbitrary e-commerce sites would require a site-detection layer or a headless browser approach (e.g., Playwright), as most production retail sites use JavaScript-rendered prices and anti-bot measures.

**JWT subject as user ID.** The token subject stores the numeric user ID (`String.valueOf(user.getId())`) rather than the username. This allows `JwtFilter` to load the user via `userRepository.findById(id)` directly, avoiding a username lookup that would break if a user changes their username post-login.

---

## Future Improvements

- **Multi-site scraping support** — introduce a `ScraperStrategy` interface with per-domain implementations; use a headless browser (Playwright/Puppeteer via subprocess) for JavaScript-heavy sites.
- **Dockerfile for frontend** — add an Nginx-based Docker image for the React build to make the full stack runnable with a single `docker-compose up`.
- **Persistent Redis volumes** — mount a Docker volume for Redis to survive container restarts without losing OTP state mid-flow.
- **Webhook / push notifications** — supplement email alerts with browser push notifications or webhook endpoints for integration with external services.
- **Admin dashboard** — currently `AdminController` exposes manual price check triggers without authentication. Adding role-based access control (`ROLE_ADMIN`) would secure these endpoints.
- **Scrape health monitoring** — track consecutive scrape failures per product and surface them in the analytics view; auto-pause tracking after N failures.
- **Test coverage** — unit tests for `ProductProcessingService` (alert logic, price comparison edge cases) and `OtpService` (rate limiting key interactions) are the highest-value additions.
