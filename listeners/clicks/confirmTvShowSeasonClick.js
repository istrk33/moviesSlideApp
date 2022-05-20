'use strict'

/**
 * managing lists, and time variables that store lost, potential lost time and the user interest with the user viewed dict
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
var _ = require("underscore");
const functions = require("../../resources/functions");
const service = require("../../services/userDataService");
module.exports = async (_props, event, api) => {
    var errList = [];
    var vars = (await service.getDatastore(api, "vars")).data.data[0];
    var id = vars._id;
    var varsData = vars.data;
    var viewed = (await service.getDatastore(api, "userViewed")).data.data;
    var interests = (await service.getDatastore(api, "userInterests")).data.data;
    var listOfUndiscoveredMovies = (await service.getDatastore(api, "listOfUndiscoveredMovies")).data.data;

    var newMovieDataInInterests = [];
    var newMovieDataInViewed = [];
    var tvshowidForQuery = _props.movieId;
    var tvshowid = "tvshows_" + _props.movieId;
    var numberOfSeasons = (await functions.getTvShowDetails(varsData.apiKey, tvshowidForQuery)).show.seasons;
    // si la série a déja été traitée => se situe dans viewed et interests
    if (viewed.find(e => e.data[0] === tvshowid) != null && interests.find(e => e.data[0] === tvshowid) != null) {
        // si on vient de sélectionner la totalité des saison
        if (varsData.overlaySliderValue == numberOfSeasons) {
            // on enlève du temps perdu courant la durée visualisé de la série jusqu'à maintenant
            varsData.totalWastedTime -= viewed.find(e => e.data[0] === tvshowid).data[3];
            // on mets à jour vars data et con créer un tableau qui va remplacer la valeur dans le datastore
            varsData, newMovieDataInViewed = addTvShowToViewed(varsData, _props, [viewed.find(e => e.data[0] === tvshowid).data[0], viewed.find(e => e.data[0] === tvshowid).data[1]]);

            // on enlève du temps potentiel à perdre courant la durée qui restait à visualiser
            varsData.potentialWasteTime -= interests.find(e => e.data[0] === tvshowid).data[3];
            // on supprime du datastore des intérêts cette série
            var elemToRemoveId = (await service.getIdOfMovieDataByMovieId(api, tvshowid, "userInterests"))._id;
            await service.deleteFromDatastore(api, elemToRemoveId, "userInterests");
            // update viewed
            var elemToUpdateId = (await service.getIdOfMovieDataByMovieId(api, tvshowid, "userViewed"))._id;
            await service.put(api, "userViewed", elemToUpdateId, { data: newMovieDataInViewed }).then(function (response) {
                response.data
            }).catch((e => {
                errList.push(e);
                console.log(e);
            }));
            // sinon on a regardé 10%,20%....
        } else {
            // on enlève du temps perdu courant la durée visualisé de la série jusqu'à maintenant
            varsData.totalWastedTime -= viewed.find(e => e.data[0] === tvshowid).data[3];
            // on mets à jour vars data et con créer un tableau qui va remplacer la valeur dans le datastore
            varsData, newMovieDataInViewed = addTvShowToViewed(varsData, _props, [viewed.find(e => e.data[0] === tvshowid).data[0], viewed.find(e => e.data[0] === tvshowid).data[1]]);
            // on enlève du temps potentiel à perdre courant la durée qui restait à visualiser
            varsData.potentialWasteTime -= interests.find(e => e.data[0] === tvshowid).data[3];
            // on mets à jour vars data et con créer un tableau qui va remplacer la valeur dans le datastore
            varsData, newMovieDataInInterests = addTvShowToInterests(varsData, _props, [interests.find(e => e.data[0] === tvshowid).data[0], interests.find(e => e.data[0] === tvshowid).data[1]])
            // update de interests
            var elemInterestId = (await service.getIdOfMovieDataByMovieId(api, tvshowid, "userInterests"))._id;
            await service.put(api, "userInterests", elemInterestId, { data: newMovieDataInInterests }).then(function (response) {
                response.data
            }).catch((e => {
                errList.push(e);
                console.log(e);
            }));
            // update de viewed
            var elemViewedId = (await service.getIdOfMovieDataByMovieId(api, tvshowid, "userViewed"))._id;
            await service.put(api, "userViewed", elemViewedId, { data: newMovieDataInViewed }).then(function (response) {
                response.data
            }).catch((e => {
                errList.push(e);
                console.log(e);
            }));

        }
        // sinon si la série n'as JAMAIS été traitée
    } else {
        // si on vient de sélectionner la totalité des saison
        if (varsData.overlaySliderValue == numberOfSeasons) {
            // si elle se situe dans les nouvelles séries
            if (listOfUndiscoveredMovies.find(e => e.data[0] === tvshowid).data != null) {
                // creation du tv show pour viewed
                varsData, newMovieDataInViewed = addTvShowToViewed(varsData, _props, [...listOfUndiscoveredMovies.find(e => e.data[0] === tvshowid).data]);
                var elemToRemoveId = (await service.getIdOfMovieDataByMovieId(api, tvshowid, "listOfUndiscoveredMovies"))._id;
                await service.deleteFromDatastore(api, elemToRemoveId, "listOfUndiscoveredMovies");
                // sinon elle se situe dans user interests
            } else {
                varsData, newMovieDataInViewed = addTvShowToViewed(varsData, _props, [interests.find(e => e.data[0] === tvshowid).data[0], interests.find(e => e.data[0] === tvshowid).data[1]]);
                varsData.potentialWasteTime -= interests.find(e => e.data[0] === tvshowid).data[3];
                var elemToRemoveId = (await service.getIdOfMovieDataByMovieId(api, tvshowid, "userInterests"))._id;
                await service.deleteFromDatastore(api, elemToRemoveId, "userInterests");
            }
            // ajout de l'enregistrement dans userViewed
            await service.new(api, "userViewed", newMovieDataInViewed).then(function (response) {
                response.data;
            }).catch((e => {
                list.push(e);
                console.log("ERROR " + e);
            }));
            // sinon on vient de regarder 10%,20%....
        } else {
            // si elle se situe dans les nouvelles séries
            if (listOfUndiscoveredMovies.find(e => e.data[0] === tvshowid).data != null) {
                varsData, newMovieDataInViewed = addTvShowToViewed(varsData, _props, [...listOfUndiscoveredMovies.find(e => e.data[0] === tvshowid).data]);
                varsData, newMovieDataInInterests = addTvShowToInterests(varsData, _props, [...listOfUndiscoveredMovies.find(e => e.data[0] === tvshowid).data]);
                var elemToRemoveId = (await service.getIdOfMovieDataByMovieId(api, tvshowid, "listOfUndiscoveredMovies"))._id;
                await service.deleteFromDatastore(api, elemToRemoveId, "listOfUndiscoveredMovies");
                // sinon elle se situe dans user interests
                // ajout de l'enregistrement dans userViewed
                await service.new(api, "userViewed", newMovieDataInViewed).then(function (response) {
                    response.data;
                }).catch((e => {
                    list.push(e);
                    console.log("ERROR " + e);
                }));
                // ajout de l'enregistrement dans userInterests
                await service.new(api, "userInterests", newMovieDataInInterests).then(function (response) {
                    response.data;
                }).catch((e => {
                    list.push(e);
                    console.log("ERROR " + e);
                }));
            } else {
                varsData, newMovieDataInViewed = addTvShowToViewed(varsData, _props, [interests.find(e => e.data[0] === tvshowid).data[0], interests.find(e => e.data[0] === tvshowid).data[1]]);
                varsData, newMovieDataInInterests = addTvShowToInterests(varsData, _props, [interests.find(e => e.data[0] === tvshowid).data[0], interests.find(e => e.data[0] === tvshowid).data[1]]);
                // maj interests
                var elemInterestId = (await service.getIdOfMovieDataByMovieId(api, tvshowid, "userInterests"))._id;
                await service.put(api, "userInterests", elemInterestId, { data: newMovieDataInInterests }).then(function (response) {
                    response.data
                }).catch((e => {
                    errList.push(e);
                    console.log(e);
                }));
                // ajout viewed
                await service.new(api, "userViewed", newMovieDataInViewed).then(function (response) {
                    response.data;
                }).catch((e => {
                    list.push(e);
                    console.log("ERROR " + e);
                }));
            }
        }
    }
    // maj des datastores
    varsData = (await functions.updateCurrent(varsData, api));
    varsData.overlayState = false;
    varsData.overlaySliderValue = 1;
    // return data
    await service.put(api, "vars", id, { data: varsData }).then(function (response) {
        response.data
    }).catch((e => {
        errList.push(e);
        console.log(e);
    }));
    return errList;
}

/**
 * updating the index corresponding to tvshowid in data.userViewed
 * @param {*} data 
 * @param {*} _props 
 * @param {*} tvshowid 
 * @param {*} arr 
 * @returns data
 */
function addTvShowToViewed(data, _props, arr) {
    var viewed = arr;
    viewed.push(data.darkbg);
    viewed.push(_props.tvshowViewedTime);
    viewed.push(_props.seasonNum);
    data.totalWastedTime += _props.tvshowViewedTime;
    console.log("ARRRRRRRRRAAAAAAAAYYYYYYYYYYY");
    console.log(_props.seasonNum);
    console.log(viewed);
    return data, viewed;
}

/**
 * updating the index corresponding to tvshowid in data.userInterests
 * @param {*} data 
 * @param {*} _props 
 * @param {*} tvshowid 
 * @param {*} arr 
 * @returns 
 */
function addTvShowToInterests(data, _props, arr) {
    var interests = arr;
    interests.push(data.darkbg);
    interests.push(_props.tvshowNotViewedTime);
    interests.push(_props.seasonNum + 1);
    data.potentialWasteTime += _props.tvshowNotViewedTime;
    console.log("ARRRRRRRRRAAAAAAAAYYYYYYYYYYY");
    console.log(_props.seasonNum);
    console.log(interests);
    return data, interests;
}