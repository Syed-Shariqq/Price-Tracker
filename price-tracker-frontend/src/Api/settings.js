import api from "./axios"

export const changePassword = async (data) => {
    return api.put("/user/change-pass",data);
}

export const updateProfile = async (data) => {
    return api.put("/user/profile",data);
}

export const getProfile = async () => {
    return api.get("/user/profile");
}

export const getSettings = async () => {
    return api.get(`/settings`);
}

export const updateSettings = async (data) => {
    return api.put(`/settings`,data);
}