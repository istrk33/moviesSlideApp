'use strict'

/**
 * updating current movie/tvshow and the dictionnary of movies/tvshows
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
const service = require("../../services/userDataService");
const functions = require("../../resources/functions");
module.exports = async (_props, event, api) => {
    var obj = (await service.getGeneral(api)).data.data[0];
    var id = obj._id;
    if (obj.element !== undefined || obj.element != null) {
        var datas = obj.element;
    } else {
        var datas = obj;
    }
    var videoId = datas.currentId;
    if (datas.currentMovieInfo.movie != null || datas.currentMovieInfo.movie != undefined) {
        var timeInSec = datas.currentMovieInfo.movie.length;
        datas = actionOnVideo(datas, timeInSec, _props.buttonName, videoId);
        // if it's a video of type of type tvShow
    } else {
        // computing the total length of the tv show by using the number of seasons, episodes and the average length of one episode
        var timeInSec = 0;
        datas.currentMovieInfo.show.seasons_details.forEach(element => {
            timeInSec += element.episodes * datas.currentMovieInfo.show.length * 60;
        });
        datas = actionOnVideo(datas, timeInSec, _props.buttonName, videoId);
    }
    datas = (await functions.updateCurrent(datas, videoId));

    return service.put(api, id, datas).then(function (response) {
        response.data
    });
}

/**
 * manage the video to lists in function of the button
 * @param {*} data 
 * @param {the length in sec of the video} timeInSec 
 * @param {the button} buttonName 
 * @param {the id of the video} videoId 
 */
function actionOnVideo(data, timeInSec, buttonName, videoId) {
    var datas = data;
    switch (buttonName) {
        case "viewed":
            datas.userViewed[videoId] = datas.listOfUndiscoveredMovies[videoId];
            datas.userViewed[videoId].push(datas.darkbg);
            datas.userViewed[videoId].push(timeInSec);
            datas.totalWastedTime += timeInSec;
            break;
        case "notviewed":
            datas.userNotViewed[videoId] = datas.listOfUndiscoveredMovies[videoId];
            datas.totalSavedTime += timeInSec;
            break;
        case "interested":
            datas.userInterests[videoId] = datas.listOfUndiscoveredMovies[videoId];
            datas.userInterests[videoId].push(datas.darkbg);
            datas.userInterests[videoId].push(timeInSec);
            datas.potentialWasteTime += timeInSec;
            break;
    }
    return datas;
}