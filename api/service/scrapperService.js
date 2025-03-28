import { httpConfig } from "../config/http.js";
import * as cheerio from 'cheerio';
import { animasuHelper } from "../utilities/animasu.js";
import { AxiosError } from "axios";
class ScrapperService {
    async getAnimeListUpdate() {
        try {
            const result = await animasuHelper.getUpdateAnime();
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    async searchAnime(title) {
        try {
            const result = await animasuHelper.searchAnime(title);
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    async detailAnime(path) {
        try {
            const result = await animasuHelper.getDetailAnime(path);
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    async watchAnime(payload) {
        const parseTitle = payload.title.toLocaleLowerCase();
        try {
            const result = await animasuHelper.getWatchAnime(parseTitle);
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    async getLatestEpisode() {
        try {
            const result = await animasuHelper.getLatestEpisodeRelease();
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    async getRatingAnime(path) {
        try {
            console.log(path);
            const result = await animasuHelper.getRating(path);
            return result;
        }
        catch (error) {
            throw error;
        }
    }
}
export const scrapperService = new ScrapperService();
