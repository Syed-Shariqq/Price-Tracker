import api from "./axios";

export const scrapeProduct = (data) => {
    return api.post("/products/scrape", data);
}

export const addProduct = (data) => {
    return api.post("/products", data);
}

export const getTrackedProductsOfUser = () => {
    return api.get("/products");
}

export const deleteUserTrackingProduct = (productId) => {
    return api.delete(`/products/tracking/${productId}`);
}

export const getProductAnalytics = (productId) => {
    return api.get(`/products/${productId}/analytics`);
}

