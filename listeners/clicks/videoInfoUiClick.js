'use strict'

/**
 * managing the data to display into movieInfoUi
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
module.exports = async (_props, event, api) => {
    const functions = require("../../resources/functions");
    data.navigation = "movieInfo";
    if (_props.from == "home") {
        data.movieInfoToSee = data.currentMovieInfo;
    } else {
        if (String(_props.movieId).includes("tvshows")) {
            data.movieInfoToSee = (await functions.getTvShowDetails(data.apiKey, String(_props.movieId).substring(8)));
        } else {
            data.movieInfoToSee = (await functions.getMovieDetails(data.apiKey, _props.movieId));
        }
    }
    data.searchValue="";
    return data
}