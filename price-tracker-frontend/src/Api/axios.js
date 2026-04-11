import axios from "axios";
import { toast } from "react-toastify";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "/api",
    timeout: 7000,
});

console.log("ENV:", import.meta.env);

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

  if (token && !isPublic && token !== "undefined" && token !== null) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.code === "ECONNABORTED" || !error.response) {
      toast.error("Something went wrong. Try again later.");
    }

    return Promise.reject(error);
  }
);

export default api;
