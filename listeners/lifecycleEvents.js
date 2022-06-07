'use strict'

const lenraDataService = require("../services/lenraDataService");
const mainVideosServices = require('../services/mainVideosService');
const userViewedVideosService = require('../services/userViewedVideosService');
const userInterestsVideosService = require('../services/userInterestedVideosService');
const userService = require('../services/userService');
const apiVideoService = require('../services/local/videoAPIService');

//placer tous les datastores a utiliser
const datastores = [mainVideosServices.datastoreName, userViewedVideosService.datastoreName, userInterestsVideosService.datastoreName];

async function onEnvStart(props, event, api) {
    var errors = [];
    var listOfVideos = [];
    // creating datastores
    const promises = datastores.map(ds => lenraDataService.createDatastore(api, ds).catch((e => { })));
    await Promise.all(promises);
    // getting list of movies/tvshows
    console.log("START");
    var tmp = await lenraDataService.createData(api, mainVideosServices.datastoreName, { start: 0 });
    // var start = (await lenraDataService.getData(api, mainVideosServices.datastoreName,tmp._id)).start;
    var start = (await lenraDataService.getAll(api, mainVideosServices.datastoreName)).start;
    
    // // getting list of movies/tvshows from movies api 50 off each or 100 and do update on this datastore when finished
    // new Promise(async (accept,reject)=>{
    //     (await apiVideoService.queryPopularMovies(start)).forEach((element) => listOfVideos.push([element.id, element.title]));
    //     (await apiVideoService.queryPopularTvShows(start)).forEach((element) => listOfVideos.push([element.id, element.title]));
    // }).then(()=>{
    // console.log("MOVIES");
    // console.log(listOfVideos);
    // });
    return errors;
}

function onEnvStop(props, event, api) {
    // TODO: do something
}

async function onUserFirstJoin(props, event, api) {
    // var userInitialData = {
    //     totalWastedTime: 0,
    //     totalSavedTime: 0,
    //     potentialWasteTime: 0,
    //     menuTimeLabel: "tempsPerdu",
    //     searchValue: "",
    //     tvShowIdToSetupSeasons: -1,
    //     currentTvShowViewedSeasons: 1,
    //     overlaySliderValue: 1,
    //     start: 0,
    //     overlayState: false,
    //     currentMovieInfo: currentMovieInfo,
    //     movieInfoToSee: movieInfoToSee,
    //     currentId: currentId,
    //     navigation: "home"
    // };
    // return userService.initUser(api, { data: userInitialData });
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