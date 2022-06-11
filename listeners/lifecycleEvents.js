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
    var start = (await lenraDataService.getData(api, mainVideosServices.datastoreName, tmp._id)).start;
    // var start = (await lenraDataService.getAll(api, mainVideosServices.datastoreName)).start;
    console.log("IDDDDDDDDDDDDDDDDDDDDDD START");
    console.log(tmp._id);

    (await apiVideoService.queryPopularMovies(start)).forEach((element) => listOfVideos.push([element.id, element.title, false]));
    // (await apiVideoService.queryPopularTvShows(start)).forEach((element) => listOfVideos.push([element.id, element.title, true]));
    listOfVideos = listOfVideos.sort((a, b) => 0.5 - Math.random());
    listOfVideos.forEach(async e => {
        await lenraDataService.createData(api, mainVideosServices.datastoreName, { id: e[0], title: e[1], isTvShow: e[2] });
    });

    // // getting list of movies/tvshows from movies api 50 off each or 100 and do update on this datastore when finished
    // new Promise(async (accept,reject)=>{
    //     (await apiVideoService.queryPopularMovies(start)).forEach((element) => listOfVideos.push([element.id, element.title]));
    //true for is tv show
    //     (await apiVideoService.queryPopularTvShows(start)).forEach((element) => listOfVideos.push([element.id, element.title,true]));
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
    // get first video id from the datastore
    var allData = (await lenraDataService.getAll(api, mainVideosServices.datastoreName))[0];
    var currentId = allData.id;
    console.log("ONS USER FIRST JOINNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN");
    // console.log(currentId);
    // with the first video id get movie details from beta series api
    var currentMovieInfo = (allData.isTvShow == true) ? await apiVideoService.getTvShowDetails(currentId) : await apiVideoService.getMovieDetails(currentId);
    console.log(currentMovieInfo);
    // movie info to see = currentMovieInfo
    var movieInfoToSee = currentMovieInfo;
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
    /**
     * commencer les widgets
     * faire attention lors de l'envoie de faire une query des userData
     */
}

function onUserQuit(props, event, api) {
    // TODO: remove user data
}

function onSessionStart(props, event, api) {
    var me=userService.getUser(api);
    console.log(me);
    // get userdatas to display widgets 
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