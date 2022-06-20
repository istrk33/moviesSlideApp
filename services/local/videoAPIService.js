'use strict'

const axios = require("axios");
const consts = require("./appConstsService");
const lenraDataService = require("../lenraDataService");
const mainVideosServices = require("../mainVideosService");

module.exports = {
    async queryPopularMovies(start) {
        var url = "https://api.betaseries.com/movies/discover?key=" + consts.apiKey + "&type=popular&offset=" + start + "&limit=" + consts.numberOfResults;
        var listOfMovies = (((await axios.get(url, { crossdomain: true },
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            }
        ).catch((e => {
        }))).data).movies);
        return listOfMovies;
    },
    async queryPopularTvShows(start) {
        var url = "https://api.betaseries.com/shows/list?key=" + consts.apiKey + "&order=followers&start=" + start + "&limit=" + consts.numberOfResults;
        var listOfTvShows = (((await axios.get(url, { crossdomain: true },
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            }
        ).catch((e => {
        }))).data).shows);
        return listOfTvShows;
    },
    async getMovieDetails(id) {
        // https://api.betaseries.com/movies/movie
        var url = "https://api.betaseries.com/movies/movie?key=" + consts.apiKey + "&id=" + id;
        var movieDetail = (await axios.get(url, { crossdomain: true },
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            }
        ).catch((e => {
        }))).data;
        return movieDetail.movie;
    },
    async getTvShowDetails(id) {
        // https://api.betaseries.com/shows/display?key=941cc48f228b&id=22592
        var url = "https://api.betaseries.com/shows/display?key=" + consts.apiKey + "&id=" + id;
        var tvShowDetail = ((await axios.get(url, { crossdomain: true },
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            }
        ).catch((e => {
        }))));
        return tvShowDetail.data.show;
    },
    computeMovieDuration(movieLength) {
        var h = Math.floor(movieLength / 3600);
        var m = Math.floor(movieLength % 3600 / 60);
        var s = Math.floor(movieLength % 3600 % 60);

        if (h.toString().length < 2) {
            h = "0" + h;
        }
        if (s.toString().length < 2) {
            s = "0" + s;
        }
        if (m.toString().length < 2) {
            m = "0" + m;
        }
        return h + ":" + m + ":" + s;
    },
    computeMenuTime(totalSec) {
        var d = Math.floor(totalSec / (3600 * 24));
        var h = Math.floor(totalSec % (3600 * 24) / 3600);
        var m = Math.floor(totalSec % 3600 / 60);

        var dDisplay = d + "j ";
        var hDisplay = h + "h ";
        var mDisplay = m + "min ";
        return totalSec == 0 ? "0j 0h 0min" : dDisplay + " " + hDisplay + " " + mDisplay;
    },
    getStars(video) {
        var numberOfStar = parseInt(video.notes.mean);
        var arr = Array(numberOfStar).fill("star");
        (video.notes.mean % 1 != 0) ? arr.splice(arr.length, 0, "star_half") : "";
        while (arr.length < 5) {
            arr.splice(arr.length, 0, "star_border_outlined");
        }
        return arr;
    },
    async addNewVideosToLenra(api, start) {
        var listOfVideos = [];
        // getting list of movies/tvshows
        (await this.queryPopularMovies(start.start)).forEach((element) => listOfVideos.push([element.id, false]));
        (await this.queryPopularTvShows(start.start)).forEach((element) => listOfVideos.push([element.id, true]));
        start.start += consts.numberOfResults;

        listOfVideos = listOfVideos.sort((a, b) => 0.5 - Math.random());
        listOfVideos.forEach(async e => {
            var videoDetails = (e[1]) ? await this.getTvShowDetails(e[0]) : await this.getMovieDetails(e[0]);
            videoDetails.img = (e[1]) ? "https://api.betaseries.com/pictures/shows?key=" + consts.apiKey + "&id=" + videoDetails.id + "&width=627&height=933" : "https://api.betaseries.com/pictures/movies?key=" + consts.apiKey + "&id=" + videoDetails.id + "&width=627&height=933";
            await mainVideosServices.createVideo(api, { id: e[0], isTvShow: e[1], videoDetails });
        });
        (await lenraDataService.updateData(api, "mainAppVars", start));
    }
}