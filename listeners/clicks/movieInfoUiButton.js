'use strict'

/**
 * managing the data to display into movieInfoUi
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
module.exports = async (data, _props, event) => {
    const functions = require("../../resources/functions");
    console.log("SIUUUU");
    data.navigation = "movieInfo";
    if (_props.from == "home") {
        data.movieInfoToSee = data.currentMovieInfo;
    } else {
        if (_props.videotype == "movie") {
            data.movieInfoToSee = (await functions.getMovieDetails(data.apiKey, _props.movieId));
        } else {
            data.movieInfoToSee = (await functions.getTvShowDetails(data.apiKey, _props.movieId));
        }
    }
    return data
}