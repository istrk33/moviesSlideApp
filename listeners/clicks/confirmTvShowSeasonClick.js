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
        console.log("on a deja vu la série");
        // if the last season is watched
        if (varsData.overlaySliderValue == numberOfSeasons) {
            console.log("on a deja vu la série et on y ajoute toutes les saisons");
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
            console.log("on a deja vu la série et on y ajoute au moins 1 saison");
            // adding data in userViewed
            varsData.totalWastedTime -= viewed.find(e => e.data[0] === tvshowid).data[3];
            varsData, newMovieDataInViewed = addTvShowToViewed(varsData, _props, [viewed.find(e => e.data[0] === tvshowid).data[0], viewed.find(e => e.data[0] === tvshowid).data[1]]);
            // adding data in userInterests
            varsData.potentialWasteTime -= interests.find(e => e.data[0] === tvshowid).data[3];
            varsData, newMovieDataInInterests = addTvShowToInterests(varsData, _props, [interests.find(e => e.data[0] === tvshowid).data[0], interests.find(e => e.data[0] === tvshowid).data[1]])
            await service.new(api, "userInterests", newMovieDataInInterests).then(function (response) {
                response.data;
            }).catch((e => {
                list.push(e);
                console.log("ERROR " + e);
            }));
        }
        // data.navigation = "userInterest";
        // if the tv show is never watched
    } else {
        console.log("on a jamais vu la série");
        //  if we come from the current tvshow in homeUi
        // if the last season is watched
        if (varsData.overlaySliderValue == numberOfSeasons) {
            console.log("on a jamais vu la série et on a tout regardé");
            //  if we come from the current tvshow in homeUi
            console.log("on passe dans toutes les series");
            if (listOfUndiscoveredMovies.find(e => e.data[0] === tvshowid).data != null) {
                console.log("on a jamais vu la série et il viens d'apparaotre da,s home ui ---> tout vu");
                varsData, newMovieDataInViewed = addTvShowToViewed(varsData, _props, [...listOfUndiscoveredMovies.find(e => e.data[0] === tvshowid).data]);
                await service.new(api, "userViewed", newMovieDataInInterests).then(function (response) {
                    response.data;
                }).catch((e => {
                    list.push(e);
                    console.log("ERROR " + e);
                }));
                var elemToRemoveId = (await service.getIdOfMovieDataByMovieId(api, tvshowid, "listOfUndiscoveredMovies"))._id;
                await service.deleteFromDatastore(api, elemToRemoveId, "listOfUndiscoveredMovies");
                // tv show interest the user -> only in interests
            } else if (viewed.find(e => e.data[0] === tvshowid).data == null) {
                console.log("on a jamais vu la série et il est probablement uniquement dans interests ---> tout vu");
                varsData, newMovieDataInViewed = addTvShowToViewed(varsData, _props, [interests.find(e => e.data[0] === tvshowid).data[0], interests.find(e => e.data[0] === tvshowid).data[1]]);
                varsData.potentialWasteTime -= interests.find(e => e.data[0] === tvshowid).data[3];
                var elemToRemoveId = (await service.getIdOfMovieDataByMovieId(api, tvshowid, "userInterests"))._id;
                await service.deleteFromDatastore(api, elemToRemoveId, "userInterests");
            }
            // else {
            //     varsData, newMovieDataInViewed = addTvShowToViewed(varsData, _props, [interests.find(e => e.data[0] === tvshowid).data[0], interests.find(e => e.data[0] === tvshowid).data[1]]);
            // }
            //at most the s-1 season is watched
        } else {
            console.log("on a au max vu n-1 saison");
            if (listOfUndiscoveredMovies.find(e => e.data[0] === tvshowid).data != null) {
                console.log("on arrive de home ui");
                // updating userViewed and userInterrest
                varsData, newMovieDataInViewed = addTvShowToViewed(varsData, _props, [...listOfUndiscoveredMovies.find(e => e.data[0] === tvshowid).data]);
                console.log("TESSSSSSSSSSSSSSSSSSTTTTTTTTT 111111111111");
                varsData, newMovieDataInInterests = addTvShowToInterests(varsData, _props, [...listOfUndiscoveredMovies.find(e => e.data[0] === tvshowid).data]);
                console.log("TESSSSSSSSSSSSSSSSSSTTTTTTTTT 222222222222");
                var elemToRemoveId = (await service.getIdOfMovieDataByMovieId(api, tvshowid, "listOfUndiscoveredMovies"))._id;
                console.log("TESSSSSSSSSSSSSSSSSSTTTTTTTTT 333333333333");
                await service.deleteFromDatastore(api, elemToRemoveId, "listOfUndiscoveredMovies");
                console.log("TESSSSSSSSSSSSSSSSSSTTTTTTTTT 444444444444");
                // tv show only in userInterests
                await service.new(api, "userInterests", newMovieDataInInterests).then(function (response) {
                    response.data;
                }).catch((e => {
                    list.push(e);
                    console.log("ERROR " + e);
                }));
                console.log("TESSSSSSSSSSSSSSSSSSTTTTTTTTT 555555555555");
            } else if (viewed.find(e => e.data[0] === tvshowid).data == null) {
                console.log("on arrive de interest ui et on a pas tout vu");
                varsData, newMovieDataInViewed = addTvShowToViewed(varsData, _props, [interests.find(e => e.data[0] === tvshowid).data[0], interests.find(e => e.data[0] === tvshowid).data[1]]);
                varsData, newMovieDataInInterests = addTvShowToInterests(varsData, _props, [interests.find(e => e.data[0] === tvshowid).data[0], interests.find(e => e.data[0] === tvshowid).data[1]]);
                // var elemToRemoveId = (await service.getIdOfMovieDataByMovieId(api, tvshowid, "listOfUndiscoveredMovies"))._id;
                // await service.deleteFromDatastore(api, elemToRemoveId, "listOfUndiscoveredMovies");
                await service.new(api, "userInterests", newMovieDataInInterests).then(function (response) {
                    response.data;
                }).catch((e => {
                    list.push(e);
                    console.log("ERROR " + e);
                }));
            }
            else {
                console.log("sinon jsp");
                varsData, newMovieDataInViewed = addTvShowToViewed(varsData, _props, [interests.find(e => e.data[0] === tvshowid).data[0], viewed.find(e => e.data[0] === tvshowid).data[1]]);
                varsData, newMovieDataInInterests = addTvShowToInterests(varsData, _props, [interests.find(e => e.data[0] === tvshowid).data[0], viewed.find(e => e.data[0] === tvshowid).data[1]]);
            }
            // data = addTvShowToViewed(data, _props, tvshowid, [...data.listOfUndiscoveredMovies["tvshows_" + tvshowid]]);
        }
        // data.navigation = "home";
    }
    console.log("TESSSSSSSSSSSSSSSSSSTTTTTTTTT 666666666666666");
    varsData = (await functions.updateCurrent(varsData, api));
    console.log("TESSSSSSSSSSSSSSSSSSTTTTTTTTT 777777777777777");
    varsData.overlayState = false;
    varsData.overlaySliderValue = 1;
    // return data
    console.log("TESSSSSSSSSSSSSSSSSSTTTTTTTTT 888888888888888");
    await service.put(api, "vars", id, { data: varsData }).then(function (response) {
        response.data
    }).catch((e => {
        errList.push(e);
        console.log(e);
    }));
    console.log("TESSSSSSSSSSSSSSSSSSTTTTTTTTT 999999999999999");
    await service.new(api, "userViewed", newMovieDataInViewed).then(function (response) {
        response.data;
    }).catch((e => {
        list.push(e);
        console.log("ERROR " + e);
    }));
    console.log("TESSSSSSSSSSSSSSSSSSTTTTTTTTT 1000000000001010100100110110010101010110101010101010101001010101010101010010101010");
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