import path from "path";
import { httpConfig } from "../config/http.js";
import * as cheerio from 'cheerio';
class AnimasuHelper {
    async getUpdateAnime() {
        try {
            const request = await httpConfig.get(`https://v9.animasu.cc/`);
            const $ = cheerio.load(request);
            const response = [];
            const listupd = $('.listupd_custompage').find('.bs');
            $(listupd).each((index, element) => {
                const title = $(element).find('.tt').text().trim();
                const links = $(element).find('a').attr('href')?.split("v9.animasu.cc/anime")[1];
                const image = $(element).find('img').attr('src');
                const episode = $(element).find('.epx').text();
                const parseEpisode = episode.replace(' ', '-').toLowerCase().trim();
                response.push({
                    title: title,
                    links: `nonton${links?.replace(/\//g, "-")}${parseEpisode}`,
                    image: image,
                    episode: episode
                });
            });
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async getDetailAnime(path) {
        const request = await httpConfig.get(`https://v9.animasu.cc/anime/${path}`);
        const $ = cheerio.load(request);
        const title = $('h1[itemprop=headline]').text();
        const episodeList = $('ul[id=daftarepisode]').find('li');
        const description = $('.desc').text();
        const image = $('.attachment-post-thumbnail').attr('src');
        const episodes = [];
        episodeList.each((index, element) => {
            const episode = $(element).find('.lchx').text().split('Episode')[1]?.trim() ? $(element).find('.lchx').text().split('Episode')[1]?.trim() : "1" ;
            const pathEpisode = $(element).find('a').attr('href')?.split('v9.animasu.cc')[1];
            episodes.push({
                episode,
                path: pathEpisode
            });
        });
        const response = {
            image: "https:" + image,
            title: title,
            description: description,
            episodes: episodes
        };
        return response;
    }
    async searchAnime(animeTitle) {
        const request = await httpConfig.get(`https://v9.animasu.cc/?s=${animeTitle}`);
        const $ = cheerio.load(request);
        const list = [];
        $('.bs').each((index, element) => {
            const title = $(element).find('.tt').text().trim();
            const links = $(element).find('a').attr('href')?.split("v9.animasu.cc/anime")[1];
            const image = $(element).find('img').attr('src');
            list.push({
                title: title,
                links: links,
                image: image
            });
        });
        return list;
    }
    async getWatchAnime(path) {
        const request = await httpConfig.get(`https://v9.animasu.cc/${path}`);
        const $ = cheerio.load(request);
        const tokenVideo = $('iframe').attr('src');
        const title = $('h1').text();
        return {
            title: title,
            tokenVideo: tokenVideo
        };
    }
    async getLatestEpisodeRelease() {
        try {
            const request = await httpConfig.get(`https://v9.animasu.cc/`);
            const $ = cheerio.load(request);
            const getRelease = $('#terupdate');
            const list = $(getRelease).find('.bs');
            const response = [];
            list.each((index, element) => {
                const title = $(element).find('.tt').text().trim();
                const links = $(element).find('a').attr('href')?.split("v9.animasu.cc/anime")[1];
                const image = $(element).find('img').attr('src');
                response.push({
                    title: title,
                    links: links,
                    image: image
                });
            });
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async getRating(path) {
        try {
            const request = await httpConfig.get(`https://v9.animasu.cc/${path}`);
            const $ = cheerio.load(request);
            const rating = $('.score').attr('data-current-rating');
            return {
                rating: Number(rating)
            };
        }
        catch (error) {
            throw error;
        }
    }
}
export const animasuHelper = new AnimasuHelper();
