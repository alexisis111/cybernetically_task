import axios from "axios";

const apiUrl = "https://cloud.iexapis.com/v1/stock/market/news/last";
const apiKey = "INSERT_TOKEN";

export async function fetchNews(rangeStart, pageSize) {
    try {
        const res = await axios.get(`${apiUrl}/${rangeStart + pageSize}?token=${apiKey}`);
        return res.data.slice(0, pageSize);
    } catch (error) {
        console.error("Error while getting data:", error);
        throw error;
    }
}
