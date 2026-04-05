import api from "./axios"

export const changePassword = async (data) => {
    return api.put("/user/change-pass",data);
}