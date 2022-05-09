'use strict'

/**
 * updating current movie/tvshow and the dictionnary of movies/tvshows
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
module.exports = async (_props, event, api) => {
    const functions = require("../../resources/functions");
    var videoId = data.currentId;
    //if it's a video of type movie
    if (data.currentMovieInfo.movie != null || data.currentMovieInfo.movie != undefined) {
        var timeInSec = data.currentMovieInfo.movie.length;
        actionOnVideo(data, timeInSec, _props.buttonName, videoId);
        // if it's a video of type of type tvShow
    } else {
        // computing the total length of the tv show by using the number of seasons, episodes and the average length of one episode
        var timeInSec = 0;
        data.currentMovieInfo.show.seasons_details.forEach(element => {
            timeInSec += element.episodes * data.currentMovieInfo.show.length * 60;
        });
        actionOnVideo(data, timeInSec, _props.buttonName, videoId);
    }
    data = (await functions.updateCurrent(data, videoId));
    return data
}

/**
 * manage the video to lists in function of the button
 * @param {*} data 
 * @param {the length in sec of the video} timeInSec 
 * @param {the button} buttonName 
 * @param {the id of the video} videoId 
 */
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