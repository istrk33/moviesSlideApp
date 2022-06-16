'use strict'

const lenraDataService = require("../../services/lenraDataService");
const mainVideosServices = require('../../services/mainVideosService');
const userViewedVideosService = require('../../services/userViewedVideosService');
const userInterestsVideosService = require('../../services/userInterestedVideosService');
const userService = require('../../services/userService');
const apiVideoService = require('../../services/local/videoAPIService');
const consts = require('../../services/local/appConstsService');
const mainAppVars = "mainAppVars";
const userToVideo = "userToVideo";
//placer tous les datastores a utiliser
const datastores = [mainAppVars, mainVideosServices.datastoreName, userViewedVideosService.datastoreName, userInterestsVideosService.datastoreName, userToVideo];

module.exports = async (props, event, api) => {
    var errors = [];
    var listOfVideos = [];
    // creating datastores
    const promises = datastores.map(ds => lenraDataService.createDatastore(api, ds).catch((e => { })));
    await Promise.all(promises);
    // METTRE ICI DANS FONCTION !!!!!!!!!!
    // getting list of movies/tvshows
    var tmp = await lenraDataService.createData(api, mainAppVars, { start: 0 });
    console.log(tmp);
    var start = (await lenraDataService.getData(api, mainAppVars, tmp._id));

    (await apiVideoService.queryPopularMovies(start.start)).forEach((element) => listOfVideos.push([element.id, false]));
    (await apiVideoService.queryPopularTvShows(start.start)).forEach((element) => listOfVideos.push([element.id, true]));
    start.start += consts.numberOfResults;
    (await lenraDataService.updateData(api, mainAppVars, start));

    listOfVideos = listOfVideos.sort((a, b) => 0.5 - Math.random());
    listOfVideos.forEach(async e => {
        var videoDetails = (e[1]) ? await apiVideoService.getTvShowDetails(e[0]) : await apiVideoService.getMovieDetails(e[0]);
        videoDetails.img = (e[1]) ? "https://api.betaseries.com/pictures/shows?key=" + consts.apiKey + "&id=" + videoDetails.id + "&width=627&height=933" : "https://api.betaseries.com/pictures/movies?key=" + consts.apiKey + "&id=" + videoDetails.id + "&width=627&height=933";
        await lenraDataService.createData(api, mainVideosServices.datastoreName, { id: e[0], isTvShow: e[1], videoDetails });
    });
    return errors;
}