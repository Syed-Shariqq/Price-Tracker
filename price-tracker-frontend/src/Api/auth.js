import api from "./axios";


export const signup = (data) => {
    return api.post("/auth/signup", data);
}

export const sendOtp = (data) => {
    return api.post("/otp/send-otp", data);
}

export const verifyOtp = (data) => {
    return api.post("/otp/verify-otp", data);
}

export const login = (data) => {
    return api.post("/auth/login", data);
}