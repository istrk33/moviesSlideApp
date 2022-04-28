'use strict'

/**
 * updating current movie/tvshow and the dictionnary of movies/tvshows
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
module.exports = async (data, _props, event) => {
    const functions = require("../../resources/functions");
    var videoId = data.currentId;
    // checking if it's a movie or a tv show
    if (data.currentMovieInfo.movie != null || data.currentMovieInfo.movie != undefined) {
        var timeInSec = data.currentMovieInfo.movie.length;
        actionOnVideo(data, timeInSec, _props.buttonName, videoId);
    } else {
        var timeInSec = 0;
        data.currentMovieInfo.show.seasons_details.forEach(element => {
            timeInSec += element.episodes * data.currentMovieInfo.show.length * 60;
        });
        actionOnVideo(data, timeInSec, _props.buttonName, videoId);
    }
    delete data.listOfUndiscoveredMovies[videoId];
    data.keys = Object.keys(data.listOfUndiscoveredMovies);
    data.currentId = data.keys[data.keys.length * Math.random() << 0];
    var currentMovie = data.listOfUndiscoveredMovies[data.currentId][0];
    data.currentMovieInfo = (data.currentId.includes("tvshows_")) ? (await functions.getTvShowDetails(data.apiKey, currentMovie)) : (await functions.getMovieDetails(data.apiKey, currentMovie));
    if (data.keys.length <= 1) {
        // (await functions.queryPopularMovies(data.apiKey, data.start)).forEach((element) => data.listOfUndiscoveredMovies[element.id] = [element.id, element.title]);
        (await functions.queryPopularTvShows(data.apiKey, data.start)).forEach((element) => data.listOfUndiscoveredMovies["tvshows_" + element.id] = [element.id, element.title]);
        data.start += 5;
    }
    return data
}

function actionOnVideo(data, timeInSec, buttonName, videoId) {
    switch (buttonName) {
        case "viewed":
            data.userViewed[videoId] = data.listOfUndiscoveredMovies[videoId];
            data.userViewed[videoId].push(data.darkbg);
            data.userViewed[videoId].push(timeInSec);
            data.totalWastedTime += timeInSec;
            break;
        case "notviewed":
            data.userNotViewed[videoId] = data.listOfUndiscoveredMovies[videoId];
            data.totalSavedTime += timeInSec;
            break;
        case "interested":
            data.userInterests[videoId] = data.listOfUndiscoveredMovies[videoId];
            data.userInterests[videoId].push(data.darkbg);
            data.userInterests[videoId].push(timeInSec);
            data.potentialWasteTime += timeInSec;
            break;
    }
}