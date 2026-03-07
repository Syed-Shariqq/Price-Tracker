import api from "./axios";


export const forgotPassword = (data) => {
    return api.post("/otp/forgot-password", data);
};

export const resetPassword = (data) => {
    return api.post("/otp/reset-password", data);
};