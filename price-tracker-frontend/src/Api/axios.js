import axios from "axios";


const api = axios.create({
    baseURL: "http://localhost:8080",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  const publicRoutes = [
    "/otp/send-otp",
    "/otp/verify-otp",
    "/auth/login",
    "/auth/signup"
  ];

  const isPublic = publicRoutes.some(route =>
    config.url.includes(route)
  );

  if (token && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
