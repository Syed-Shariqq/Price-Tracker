import api from "./axios"

export const getAlertsOfUser = () => {
    return api.get("/alerts");
}