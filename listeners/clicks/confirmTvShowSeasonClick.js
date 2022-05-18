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
    var viewed = (await service.getDatastore(api, "viewed")).data.data;
    var interests = (await service.getDatastore(api, "interests")).data.data;
    var listOfUndiscoveredMovies = (await service.getDatastore(api, "listOfUndiscoveredMovies")).data.data;

    var newMovieDataInInterests = [];
    var newMovieDataInViewed = [];
    var tvshowidForQuery = _props.movieId;
    var tvshowid = "tvshows_" + _props.movieId;
    var numberOfSeasons = (await functions.getTvShowDetails(varsData.apiKey, tvshowidForQuery)).show.seasons;
    // if the tv show first season is already watched
    if (viewed.find(e => e.data[0] === tvshowid) != null && interests.find(e => e.data[0] === tvshowid) != null) {
        // if the last season is watched
        if (varsData.overlaySliderValue === numberOfSeasons) {
            //adding data in userViewed
            varsData.totalWastedTime -= viewed.find(e => e.data[0] === tvshowid).data[3];
            varsData, newMovieDataInViewed = addTvShowToViewed(varsData, _props, [viewed.find(e => e.data[0] === tvshowid).data[0], viewed.find(e => e.data[0] === tvshowid).data[1]]);

            //deleting data from userInterests
            varsData.potentialWasteTime -= interests.find(e => e.data[0] === tvshowid).data[3];
            // delete datas.userInterests["tvshows_" + tvshowid];
            var elemToRemoveId = (await service.getIdOfMovieDataByMovieId(api, tvshowid, "userInterests"))._id;
            await service.deleteFromDatastore(api, elemToRemoveId, "userInterests");
            // else at most the s-1 season is watched
        } else {
            // adding data in userViewed
            varsData.totalWastedTime -= viewed.find(e => e.data[0] === tvshowid).data[3];
            varsData, newMovieDataInViewed = addTvShowToViewed(varsData, _props, [viewed.find(e => e.data[0] === tvshowid).data[0], viewed.find(e => e.data[0] === tvshowid).data[1]]);
            // adding data in userInterests
            varsData.potentialWasteTime -= interests.find(e => e.data[0] === tvshowid).data[3];
            varsData, newMovieDataInInterests = addTvShowToInterests(varsData, _props, [interests.find(e => e.data[0] === tvshowid).data[0], interests.find(e => e.data[0] === tvshowid).data[1]])
            service.new(api, "userInterests", newMovieDataInInterests).then(function (response) {
                response.data;
            }).catch((e => {
                list.push(e);
                console.log("ERROR " + e);
            }));
        }
        // data.navigation = "userInterest";
        // if the tv show is never watched
    } else {
        //  if we come from the current tvshow in homeUi
        // if the last season is watched
        if (varsData.overlaySliderValue == numberOfSeasons) {
            //  if we come from the current tvshow in homeUi
            if (listOfUndiscoveredMovies.find(e => e.data[0] === tvshowid).data != null) {
                varsData, newMovieDataInViewed = addTvShowToViewed(varsData, _props, [...listOfUndiscoveredMovies.find(e => e.data[0] === tvshowid).data]);
                await service.new(api, "userViewed", newMovieDataInInterests).then(function (response) {
                    response.data;
                }).catch((e => {
                    list.push(e);
                    console.log("ERROR " + e);
                }));
                var elemToRemoveId = (await service.getIdOfMovieDataByMovieId(api, tvshowid, "listOfUndiscoveredMovies"))._id;
                await service.deleteFromDatastore(api, elemToRemoveId, "listOfUndiscoveredMovies");
                // tv show only in userInterests
            } else if (viewed.find(e => e.data[0] === tvshowid).data == null) {
                varsData, newMovieDataInViewed = addTvShowToViewed(varsData, _props, [interests.find(e => e.data[0] === tvshowid).data[0], interests.find(e => e.data[0] === tvshowid).data[1]]);
                varsData.potentialWasteTime -= interests.find(e => e.data[0] === tvshowid).data[3];
                var elemToRemoveId = (await service.getIdOfMovieDataByMovieId(api, tvshowid, "userInterests"))._id;
                await service.deleteFromDatastore(api, elemToRemoveId, "userInterests");
            } else {
                varsData, newMovieDataInViewed = addTvShowToViewed(varsData, _props, [interests.find(e => e.data[0] === tvshowid).data[0], interests.find(e => e.data[0] === tvshowid).data[1]]);
            }
            //at most the s-1 season is watched
        } else {
            if (listOfUndiscoveredMovies.find(e => e.data[0] === tvshowid).data != null) {
                // updating userViewed and userInterrest
                varsData, newMovieDataInViewed = addTvShowToViewed(varsData, _props, [...listOfUndiscoveredMovies.find(e => e.data[0] === tvshowid).data]);
                varsData, newMovieDataInInterests = addTvShowToInterests(varsData, _props, [...listOfUndiscoveredMovies.find(e => e.data[0] === tvshowid).data]);
                var elemToRemoveId = (await service.getIdOfMovieDataByMovieId(api, tvshowid, "listOfUndiscoveredMovies"))._id;
                await service.deleteFromDatastore(api, elemToRemoveId, "listOfUndiscoveredMovies");
                // tv show only in userInterests
                service.new(api, "userInterests", newMovieDataInInterests).then(function (response) {
                    response.data;
                }).catch((e => {
                    list.push(e);
                    console.log("ERROR " + e);
                }));
            } else if (viewed.find(e => e.data[0] === tvshowid).data == null) {
                varsData, newMovieDataInViewed = addTvShowToViewed(varsData, _props, [interests.find(e => e.data[0] === tvshowid).data[0], interests.find(e => e.data[0] === tvshowid).data[1]]);
                varsData, newMovieDataInInterests = addTvShowToInterests(varsData, _props, [interests.find(e => e.data[0] === tvshowid).data[0], interests.find(e => e.data[0] === tvshowid).data[1]]);
                // var elemToRemoveId = (await service.getIdOfMovieDataByMovieId(api, tvshowid, "listOfUndiscoveredMovies"))._id;
                // await service.deleteFromDatastore(api, elemToRemoveId, "listOfUndiscoveredMovies");
                service.new(api, "userInterests", newMovieDataInInterests).then(function (response) {
                    response.data;
                }).catch((e => {
                    list.push(e);
                    console.log("ERROR " + e);
                }));
            }
            else {
                varsData, newMovieDataInViewed = addTvShowToViewed(varsData, _props, [interests.find(e => e.data[0] === tvshowid).data[0], viewed.find(e => e.data[0] === tvshowid).data[1]]);
                varsData, newMovieDataInInterests = addTvShowToInterests(varsData, _props, [interests.find(e => e.data[0] === tvshowid).data[0], viewed.find(e => e.data[0] === tvshowid).data[1]]);
            }
            // data = addTvShowToViewed(data, _props, tvshowid, [...data.listOfUndiscoveredMovies["tvshows_" + tvshowid]]);
        }
        // data.navigation = "home";
    }
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
    service.new(api, "userViewed", newMovieDataInViewed).then(function (response) {
        response.data;
    }).catch((e => {
        list.push(e);
        console.log("ERROR " + e);
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
    console.log("func1");
    var viewed = arr;
    console.log("func11");
    viewed.push(data.darkbg);
    console.log("func111");
    viewed.push(_props.tvshowViewedTime);
    console.log("func1111");
    viewed.push(_props.seasonNum);
    console.log("func11111");
    data.totalWastedTime += _props.tvshowViewedTime;
    console.log("func111111");
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
    console.log("func2");
    var interests = arr;
    console.log("func22");
    interests.push(data.darkbg);
    console.log("func222");
    interests.push(_props.tvshowNotViewedTime);
    console.log("func2222");
    interests.push(_props.seasonNum + 1);
    console.log("func22222");
    data.potentialWasteTime += _props.tvshowNotViewedTime;
    console.log("func222222");
    return data, interests;
}