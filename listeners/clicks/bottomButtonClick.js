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
    console.log(vars);
    var id = vars._id;
    var varsData = vars.data;
    var videoId = varsData.currentId;
    if (varsData.currentMovieInfo.movie != null || varsData.currentMovieInfo.movie != undefined) {
        var timeInSec = varsData.currentMovieInfo.movie.length;
        varsData = actionOnVideo(varsData, timeInSec, _props.buttonName, videoId);
        // if it's a video of type of type tvShow
    } else {
        // computing the total length of the tv show by using the number of seasons, episodes and the average length of one episode
        var timeInSec = 0;
        varsData.currentMovieInfo.show.seasons_details.forEach(element => {
            timeInSec += element.episodes * varsData.currentMovieInfo.show.length * 60;
        });
        console.log("TTTTTIIIIIIIIIIMMMMMMMMMMMMMMMMMEEEEEEEEEEEEE " + timeInSec);
        varsData = actionOnVideo(varsData, timeInSec, _props.buttonName, videoId);
    }
    varsData = (await functions.updateCurrent(varsData, videoId));

    return await service.put(api, "vars", id, { data: varsData }).then(function (response) {
        response.data
    });
    // return service.put(api, id, datas).then(function (response) {
    //     response.data
    // });
    varsData.searchValue = "";
    varsData.navigation = "userViewed";
    varsData.menuTimeLabel = "tempsPerdu";
}

/**
 * manage the video to lists in function of the button
 * @param {*} data 
 * @param {the length in sec of the video} timeInSec 
 * @param {the button} buttonName 
 * @param {the id of the video} videoId 
 */
 async function actionOnVideo(data, timeInSec, buttonName, videoId) {
    // var datas = data;
    switch (buttonName) {
        case "viewed":
            // new sur userViewed
            // delete sur listOfUndiscoveredMovies
            var elemToRemove=await service.getIdOfUndiscoveredDataByMovieId(api, videoId);
            console.log(elemToRemove);
            await service.new(api, "userViewed", variables).then(function (response) {
                response.data
            }).catch((e => { console.log(e); }));
            // datas.userViewed[videoId] = datas.listOfUndiscoveredMovies[videoId];
            // datas.userViewed[videoId].push(datas.darkbg);
            // datas.userViewed[videoId].push(timeInSec);
            // datas.totalWastedTime += timeInSec;
            break;
        case "notviewed":
            // new sur userViewed
            // delete sur listOfUndiscoveredMovies

            // datas.userNotViewed[videoId] = datas.listOfUndiscoveredMovies[videoId];
            // datas.totalSavedTime += timeInSec;
            break;
        case "interested":
            // new sur userInterests
            // delete sur listOfUndiscoveredMovies

            // datas.userInterests[videoId] = datas.listOfUndiscoveredMovies[videoId];
            // datas.userInterests[videoId].push(datas.darkbg);
            // datas.userInterests[videoId].push(timeInSec);
            // datas.potentialWasteTime += timeInSec;
            break;
    }
    return datas;
}