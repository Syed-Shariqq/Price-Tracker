import api from "./axios";

export const scrapeProduct = (data) => {
    return api.post("/products/scrape", data);
}