'use strict'

/**
 * updating current movie/tvshow and the dictionnary of movies/tvshows
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
const userService = require("../../services/userService");
const lenraDataService = require("../../services/lenraDataService");
const mainVideosServices = require('../../services/mainVideosService');
const userInterestsVideosService = require('../../services/userInterestedVideosService');
const userViewedVideosService = require('../../services/userViewedVideosService');
const videoAPIService = require("../../services/local/videoAPIService");

module.exports = async (_props, event, api) => {
    var userData = (await userService.getUser(api));
    var mainData = userData.mainData;
    var videoIndex = mainData.lenraCurrentVideoIndex;

    var allFilms = await lenraDataService.getAll(api, mainVideosServices.datastoreName);
    allFilms.sort(function (a, b) {
        return b._id - a._id;
    }).reverse();
    var data = allFilms[videoIndex];

    // GET MOVIE FROM LENRA API
    var video = data.videoDetails;
    if (!data.isTvShow) {
        var timeInSec = video.length;
        await actionOnVideo(api, data._id, userData, timeInSec, _props.buttonName, -1);
        // if it's a video of type of type tvShow
    } else {
        // computing the total length of the tv show by using the number of seasons, episodes and the average length of one episode
        var timeInSec = 0;
        video.seasons_details.forEach(element => {
            timeInSec += element.episodes * video.length * 60;
        });
        await actionOnVideo(api, data._id, userData, timeInSec, _props.buttonName, 1);
    }
}

/**
 * manage the video to lists in function of the button
 * @param {*} data 
 * @param {the length in sec of the video} timeInSec 
 * @param {the button} buttonName 
 * @param {the id of the video} videoId 
 */
async function actionOnVideo(api, videoId, userData, timeInSec, buttonName, startSeason) {
    var userId = userData._id;
    switch (buttonName) {
        case "viewed":
            // update time in userData
            userData.mainData.totalWastedTime += timeInSec;
            await userService.updateUser(api, userData, userId);
            // add user id and video to viewed
            // next movie
            // get 2 or 5 new video from betaseries api
            break;
        case "notviewed":
            // update time in userData
            userData.mainData.totalSavedTime += timeInSec;
            await userService.updateUser(api, userData, userId);
            // next movie
            // get 2 or 5 new video from betaseries api
            break;
        case "interested":
            // add user id and video to interest
            await userInterestsVideosService.createNewInterest(api, userId, videoId, startSeason);
            // update time in userData
            userData.mainData.potentialWasteTime += timeInSec;
            break;
    }
    // get 2 or 5 new video from betaseries api
    // update video in userData
    userData.mainData.lenraCurrentVideoIndex++;
    await userService.updateUser(api, userData, userId);
    // BUG -> planter l'appli car charge trop de données et récupère beaucoup de données (tout le datastore)
    var start = (await lenraDataService.getAll(api, "mainAppVars"))[0];
    await videoAPIService.addNewVideosToLenra(api, start);
}