'use strict'

const lenraDataService = require("../services/lenraDataService");
const mainVideosServices = require('../services/mainVideosService');
const userViewedVideosService = require('../services/userViewedVideosService');
const userInterestsVideosService = require('../services/userInterestedVideosService');
const appConstsService = require('../services/appConstsService');
const userService = require('../services/userService');

//placer tous les datastores a utiliser
const datastores = ["appConsts", mainVideosServices.datastoreName, userViewedVideosService.datastoreName, userInterestsVideosService.datastoreName];

 function onEnvStart(props, event, api) {
    var errors = [];
    // creating datastores
    const promises = datastores.map(ds => lenraDataService.createDatastore(api, ds).catch((e => { })));
    // adding const values to const datastore
    promises.push(appConstsService.createData(api));
    Promise.all(promises);
    // Promise.all(promises);
    // // getting constdatastore for api key of videos
    // // var consts =;
    // // promises.push( await lenraDataService.getAll(api, "appConsts"));
    // Promise.all(promises);
    // console.log("SIUUUUUUUUUUUUUUUUUUUUUUU");
    console.log(promises);
    return errors;
}

function onEnvStop(props, event, api) {
    // TODO: do something
}

async function onUserFirstJoin(props, event, api) {
    var chiu=await lenraDataService.getAll(api, "appConsts")
    console.log("SIUUUUUUUUUUUUUU");
    console.log(chiu);
    var userInitialData = {
        totalWastedTime: 0,
        totalSavedTime: 0,
        potentialWasteTime: 0,
        menuTimeLabel: "tempsPerdu",
        searchValue: "",
        tvShowIdToSetupSeasons: -1,
        currentTvShowViewedSeasons: 1,
        overlaySliderValue: 1,
        start: 0,
        overlayState: false,
        currentMovieInfo: currentMovieInfo,
        movieInfoToSee: movieInfoToSee,
        currentId: currentId,
        navigation: "home"
    };
    return userService.initUser(api, { data: userInitialData });
}

function onUserQuit(props, event, api) {
    // TODO: remove user data
}

function onSessionStart(props, event, api) {
    // get userdatas
}

function onSessionStop(props, event, api) {
    // TODO: do something
}

module.exports = {
    onEnvStart,
    onEnvStop,
    onUserFirstJoin,
    onUserQuit,
    onSessionStart,
    onSessionStop
}