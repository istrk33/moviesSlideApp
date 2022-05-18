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
    var vars = (await service.getDatastore(api, "vars")).data.data[0];
    var id = vars._id;
    var varsData = vars.data;
    var videoId = varsData.currentId;
    if (varsData.currentMovieInfo.movie != null || varsData.currentMovieInfo.movie != undefined) {
        var timeInSec = varsData.currentMovieInfo.movie.length;
        varsData = await actionOnVideo(varsData, timeInSec, api, _props.buttonName, videoId);
        // if it's a video of type of type tvShow
    }
    else {
        // computing the total length of the tv show by using the number of seasons, episodes and the average length of one episode
        var timeInSec = 0;
        varsData.currentMovieInfo.show.seasons_details.forEach(element => {
            timeInSec += element.episodes * varsData.currentMovieInfo.show.length * 60;
        });
        varsData = await actionOnVideo(varsData, timeInSec, api, _props.buttonName, videoId);
    }
    varsData = (await functions.updateCurrent(varsData, api));

    return await service.put(api, "vars", id, { data: varsData }).then(function (response) {
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
async function actionOnVideo(data, timeInSec, api, buttonName, videoId) {
    var datas = data;
    switch (buttonName) {
        case "viewed":
            // var query = (await service.getIdOfUndiscoveredDataByMovieId(api, videoId));
            var query = (await service.getIdOfMovieDataByMovieId(api, videoId, "listOfUndiscoveredMovies"));
            var dataId = query._id;
            var array = query.data;
            array.push(datas.darkbg);
            array.push(timeInSec);
            datas.totalWastedTime += timeInSec;
            await service.new(api, "userViewed", array).then(function (response) {
                response.data
            }).catch((e => { console.log(e); }));
            // await service.deleteFromListOfUndiscovered(api, dataId);
            await service.deleteFromDatastore(api, dataId, "listOfUndiscoveredMovies");
            break;
        case "notviewed":
            var elemToRemoveId = (await service.getIdOfMovieDataByMovieId(api, videoId, "listOfUndiscoveredMovies"))._id;
            datas.totalSavedTime += timeInSec;
            await service.deleteFromDatastore(api, elemToRemoveId, "listOfUndiscoveredMovies");
            break;
        case "interested":
            var query = (await service.getIdOfMovieDataByMovieId(api, videoId, "listOfUndiscoveredMovies"));
            var dataId = query._id;
            var array = query.data;
            array.push(datas.darkbg);
            array.push(timeInSec);
            datas.potentialWasteTime += timeInSec;
            await service.new(api, "userInterests", array).then(function (response) {
                response.data
            }).catch((e => { console.log(e); }));
            // await service.deleteFromListOfUndiscovered(api, dataId);
            await service.deleteFromDatastore(api, dataId, "listOfUndiscoveredMovies");
            break;
    }
    return data;
}