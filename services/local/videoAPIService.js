'use strict'

const axios = require("axios");
const consts = require("./appConstsService");

module.exports = {
    async queryPopularMovies(start) {
        var url = "https://api.betaseries.com/movies/discover?key=" + consts.apiKey + "&type=popular&offset=" + start + "&limit=5";
        // console.log(url);
        var listOfMovies = (((await axios.get(url, { crossdomain: true },
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            }
        ).catch((e => {
            console.log(e);
        }))).data).movies);
        return listOfMovies;
    },
    async queryPopularTvShows(start) {
        var url = "https://api.betaseries.com/shows/list?key=" + consts.apiKey + "&order=followers&start=" + start + "&limit=5";
        var listOfTvShows = (((await axios.get(url, { crossdomain: true },
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            }
        ).catch((e => {
            console.log(e);
        }))).data).shows);
        return listOfTvShows;
    },
    async getMovieDetails(id) {
        // https://api.betaseries.com/movies/movie
        var url = "https://api.betaseries.com/movies/movie?key=" + consts.apiKey + "&id=" + id;
        console.log("URLLLLLLLLL MOVIE DETAILS")
        console.log(url)
        var movieDetail = (await axios.get(url, { crossdomain: true },
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            }
        ).catch((e => {
            console.log(e);
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
            console.log(e);
        }))));
        return tvShowDetail.data.show;
    }
}