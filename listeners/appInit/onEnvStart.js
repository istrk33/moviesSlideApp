'use strict'

const lenraDataService = require("../../services/lenraDataService");
const mainVideosServices = require('../../services/mainVideosService');
const userViewedVideosService = require('../../services/userViewedVideosService');
const userInterestsVideosService = require('../../services/userInterestedVideosService');
const userService = require('../../services/userService');
const apiVideoService = require('../../services/local/videoAPIService');

//placer tous les datastores a utiliser
const datastores = [mainVideosServices.datastoreName, userViewedVideosService.datastoreName, userInterestsVideosService.datastoreName];

module.exports = async (props, event, api) => {
    var errors = [];
    var listOfVideos = [];
    // creating datastores
    const promises = datastores.map(ds => lenraDataService.createDatastore(api, ds).catch((e => { })));
    await Promise.all(promises);
    // METTRE ICI DANS FONCTION !!!!!!!!!!
    // getting list of movies/tvshows
    var tmp = await lenraDataService.createData(api, mainVideosServices.datastoreName, { start: 0 });
    var start = (await lenraDataService.getData(api, mainVideosServices.datastoreName, tmp._id));

    (await apiVideoService.queryPopularMovies(start.start)).forEach((element) => listOfVideos.push([element.id, false]));
    (await apiVideoService.queryPopularTvShows(start.start)).forEach((element) => listOfVideos.push([element.id, true]));
    start.start += 50;
    (await lenraDataService.updateData(api, mainVideosServices.datastoreName, start));

    listOfVideos = listOfVideos.sort((a, b) => 0.5 - Math.random());
    listOfVideos.forEach(async e => {
        var videoDetails = (e[1]) ? await apiVideoService.getTvShowDetails(e[0]) : await apiVideoService.getMovieDetails(e[0]);
        await lenraDataService.createData(api, mainVideosServices.datastoreName, { id: e[0], isTvShow: e[1], videoDetails });
    });
    return errors;
}