import { scrapperService } from "../service/scrapperService.js";
import { AxiosError } from "axios";
import { ResponseHandler } from "../utilities/responseHandler.js";
class ScrapperController {
    async getAnimeAll(c) {
        try {
            const service = await scrapperService.getAnimeListUpdate();
            return ResponseHandler.responseOk(c, service, 200);
        }
        catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status == 404) {
                    return ResponseHandler.responseError(c, "data tidak deitemukan !", 404);
                }
            }
            else {
                return ResponseHandler.responseError(c, "terjadi kesalahan disisi server !", 500);
            }
        }
    }
    async searchAnime(c) {
        const title = c.req.query('q');
        try {
            const service = await scrapperService.searchAnime(title);
            return ResponseHandler.responseOk(c, service, 200);
        }
        catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status == 404) {
                    return ResponseHandler.responseError(c, "data tidak deitemukan !", 404);
                }
            }
            else {
                return ResponseHandler.responseError(c, "terjadi kesalahan disisi server !", 500);
            }
        }
    }
    async detailAnime(c) {
        const path = c.req.param('path');
        try {
            const service = await scrapperService.detailAnime(path);
            return ResponseHandler.responseOk(c, service, 200);
        }
        catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status == 404) {
                    return ResponseHandler.responseError(c, "data tidak deitemukan !", 404);
                }
            }
            else {
                return ResponseHandler.responseError(c, "terjadi kesalahan disisi server !", 500);
            }
        }
    }
    async watchAnime(c) {
        const path = c.req.query('path');
        try {
            const service = await scrapperService.watchAnime({
                title: path
            });
            return ResponseHandler.responseOk(c, service, 200);
        }
        catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status == 404) {
                    return ResponseHandler.responseError(c, "data tidak deitemukan !", 404);
                }
            }
            else {
                return ResponseHandler.responseError(c, "terjadi kesalahan disisi server !", 500);
            }
        }
    }
    async latestRelease(c) {
        try {
            const service = await scrapperService.getLatestEpisode();
            return ResponseHandler.responseOk(c, service, 200);
        }
        catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status == 404) {
                    return ResponseHandler.responseError(c, "data tidak deitemukan !", 404);
                }
            }
            else {
                return ResponseHandler.responseError(c, "terjadi kesalahan disisi server !", 500);
            }
        }
    }
    async getRating(c) {
        try {
            const service = await scrapperService.getRatingAnime(c.req.param('path'));
            return ResponseHandler.responseOk(c, service, 200);
        }
        catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status == 404) {
                    return ResponseHandler.responseError(c, "data tidak deitemukan !", 404);
                }
            }
            else {
                return ResponseHandler.responseError(c, "terjadi kesalahan disisi server !", 500);
            }
        }
    }
}
export const scrapperController = new ScrapperController();
