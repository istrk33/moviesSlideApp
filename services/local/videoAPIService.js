'use strict'

const axios = require("axios");
const consts = require("./appConstsService");

module.exports = {
    async queryPopularMovies(start) {
        var url = "https://api.betaseries.com/movies/discover?key=" + consts.apiKey + "&type=popular&offset=" + start + "&limit=50";
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
        var url = "https://api.betaseries.com/shows/list?key=" + consts.apiKey + "&order=followers&start=" + start + "&limit=50";
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
    }
}