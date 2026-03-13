import api from "./axios";

export const scrapeProduct = (data) => {
    return api.post("/products/scrape", data);
}

export const addProduct = (data) => {
    return api.post("/products", data);
}