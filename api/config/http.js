import axios from "axios";
class HttpConfig {
    async get(baseUrl) {
        try {
            const response = await axios.get(baseUrl);
            return response.data;
        }
        catch (error) {
            throw error;
        }
    }
}
export const httpConfig = new HttpConfig();
