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
    console.log("TESSSSSSSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTTTTTTTT11111111111111111111111");
    var vars = (await service.getDatastore(api, "vars")).data.data[0];
    console.log("TESSSSSSSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTTTTTTTT2222222222222");
    var id = vars._id;
    console.log("TESSSSSSSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTTTTTTTT333333333333333");
    var varsData = vars.data;
    console.log("TESSSSSSSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTTTTTTTT444444444444444444");
    var viewed = (await service.getDatastore(api, "viewed")).data.data;
    console.log("TESSSSSSSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTTTTTTTT5555555555555555");
    var interests = (await service.getDatastore(api, "interests")).data.data;
    console.log("TESSSSSSSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTTTTTTTT666666666666666");
    var listOfUndiscoveredMovies = (await service.getDatastore(api, "listOfUndiscoveredMovies")).data.data;
    // console.log("siuuuuu");
    // console.log(listOfUndiscoveredMovies);
    // console.log("siuuuuu");
    // console.log(interests);
    // console.log("siuuuuu");
    // console.log(viewed);
    // datas["searchValue"] = "";
    // datas["navigation"] = "home";
    // datas["menuTimeLabel"] = "tempsPerdu";
    // datas["overlaySliderValue"] = 1;
    var tvshowidForQuery =  _props.movieId;
    var tvshowid = "tvshows_" + _props.movieId;
    console.log("TESSSSSSSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTTTTTTTT7777777777777777777777");
    var numberOfSeasons = (await functions.getTvShowDetails(varsData.apiKey, tvshowidForQuery)).show.seasons;
    console.log("TESSSSSSSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTTTTTTTT88888888888888");
    // if the tv show first season is already watched
    // array1.find(element => element > 10)
    // console.log(listOfUndiscoveredMovies.filter(e => e.data[0] == tvshowid));
    // console.log(_.filter(listOfUndiscoveredMovies, { 'data[0]': tvshowid }));
    // console.log(tvshowid);
    // console.log(listOfUndiscoveredMovies.find(e => e.data[0] == "tvshows_" + tvshowid).data);
    // console.log(listOfUndiscoveredMovies.find(e => e.data[0] === "tvshows_" + tvshowid));
    // console.log(listOfUndiscoveredMovies.find(e => e.data[0] == "tvshows_" + tvshowid).data);
    // console.log(listOfUndiscoveredMovies.find(e => e.data[0] === "tvshows_" + tvshowid));
    // console.log(_.filter(listOfUndiscoveredMovies, function (data) { console.log(data.data); return data.data[0] == tvshowid; }));
    if (viewed.find(e => e.data[0] === tvshowid).data != null && interests.find(e => e.data[0] === tvshowid).data != null) {
        // if (datas.userViewed["tvshows_" + tvshowid] != null && datas.userInterests["tvshows_" + tvshowid] != null) {
        // if the last season is watched
        if (varsData.overlaySliderValue === numberOfSeasons) {
            //adding data in userViewed
            varsData.totalWastedTime -= viewed.find(e => e.data[0] === tvshowid).data[3];
            varsData, viewed = addTvShowToViewed(viewed, varsData, _props, tvshowid, [viewed.find(e => e.data[0] === tvshowid).data[0], viewed.find(e => e.data[0] === tvshowid).data[1]]);

            //deleting data from userInterests
            varsData.potentialWasteTime -= interests.find(e => e.data[0] === tvshowid).data[3];
            // delete datas.userInterests["tvshows_" + tvshowid];
            console.log("REMOVEEEEEEE 1");
            var elemToRemoveId = (await service.getIdOfMovieDataByMovieId(api, tvshowid, "userInterests"))._id;
            console.log("REMOVEEEEEEE 1");
            await service.deleteFromDatastore(api, elemToRemoveId, "userInterests");
            console.log("REMOVEEEEEEE 1");
            // else at most the s-1 season is watched
        } else {
            // adding data in userViewed
            varsData.totalWastedTime -= viewed.find(e => e.data[0] === tvshowid).data[3];
            varsData, viewed = addTvShowToViewed(viewed, varsData, _props, tvshowid, [viewed.find(e => e.data[0] === tvshowid).data[0], viewed.find(e => e.data[0] === tvshowid).data[1]]);
            // adding data in userInterests
            varsData.potentialWasteTime -= interests.find(e => e.data[0] === tvshowid).data[3];
            varsData, interests = addTvShowToInterests(interests, varsData, _props, tvshowid, [interests.find(e => e.data[0] === tvshowid).data[0], interests.find(e => e.data[0] === tvshowid).data[1]])
        }
        // data.navigation = "userInterest";
        // if the tv show is never watched
    } else {
        // if the last season is watched
        if (varsData.overlaySliderValue == numberOfSeasons) {
            //  if we come from the current tvshow in homeUi
            if (listOfUndiscoveredMovies.find(e => e.data[0] === tvshowid).data != null) {
                varsData, viewed = addTvShowToViewed(viewed, varsData, _props, tvshowid, [...listOfUndiscoveredMovies.find(e => e.data[0] === tvshowid).data]);
                // tv show only in userInterests
            } else if (viewed.find(e => e.data[0] === tvshowid).data == null) {
                varsData, viewed = addTvShowToViewed(viewed, varsData, _props, tvshowid, [interests.find(e => e.data[0] === tvshowid).data[0], interests.find(e => e.data[0] === tvshowid).data[1]]);
                varsData.potentialWasteTime -= interests.find(e => e.data[0] === tvshowid).data[3];
                console.log("REMOVEEEEEEE 2");
                var elemToRemoveId = (await service.getIdOfMovieDataByMovieId(api, tvshowid, "userInterests"))._id;
                console.log("REMOVEEEEEEE 2");
                await service.deleteFromDatastore(api, elemToRemoveId, "userInterests");
                console.log("REMOVEEEEEEE 2");
            } else {
                varsData, viewed = addTvShowToViewed(viewed, varsData, _props, tvshowid, [interests.find(e => e.data[0] === tvshowid).data[0], interests.find(e => e.data[0] === tvshowid).data[1]]);
            }
            //at most the s-1 season is watched
        } else {
            //  if we come from the current tvshow in homeUi
            if (listOfUndiscoveredMovies.find(e => e.data[0] === tvshowid).data != null) {
                // updating userViewed and userInterrest
                varsData, viewed = addTvShowToViewed(viewed, varsData, _props, tvshowid, [...listOfUndiscoveredMovies.find(e => e.data[0] === tvshowid).data]);
                varsData, interests = addTvShowToInterests(interests, varsData, _props, tvshowid, [...listOfUndiscoveredMovies.find(e => e.data[0] === tvshowid).data]);
                // tv show only in userInterests
            } else if (viewed.find(e => e.data[0] === tvshowid).data == null) {
                varsData, viewed = addTvShowToViewed(viewed, varsData, _props, tvshowid, [interests.find(e => e.data[0] === tvshowid).data[0], interests.find(e => e.data[0] === tvshowid).data[1]]);
                varsData, interests = addTvShowToInterests(interests, varsData, _props, tvshowid, [interests.find(e => e.data[0] === tvshowid).data[0], interests.find(e => e.data[0] === tvshowid).data[1]]);
            }
            else {
                varsData, viewed = addTvShowToViewed(viewed, varsData, _props, tvshowid, [interests.find(e => e.data[0] === tvshowid).data[0], viewed.find(e => e.data[0] === tvshowid).data[1]]);
                varsData, interests = addTvShowToInterests(interests, varsData, _props, tvshowid, [interests.find(e => e.data[0] === tvshowid).data[0], viewed.find(e => e.data[0] === tvshowid).data[1]]);
            }
            // data = addTvShowToViewed(data, _props, tvshowid, [...data.listOfUndiscoveredMovies["tvshows_" + tvshowid]]);
        }
        varsData = (await functions.updateCurrent(varsData, api));
        // data.navigation = "home";
    }
    varsData.overlayState = false;
    varsData.overlaySliderValue = 1;
    // return data
    console.log("SIUUUUUUUUUUUUU DATA");
    await service.put(api, "vars", id, { data: varsData }).then(function (response) {
        response.data
    }).catch((e => {
        errList.push(e);
        console.log(e);
    }));
    console.log("SIUUUUUUUUUUUUU INTERESTS");
    await service.put(api, "userInterests", id, { data: interests }).then(function (response) {
        response.data
    }).catch((e => {
        errList.push(e);
        console.log(e);
    }));
    console.log("SIUUUUUUUUUUUUU VIEWED");
    await service.put(api, "userViewed", id, { data: viewed }).then(function (response) {
        response.data
    }).catch((e => {
        errList.push(e);
        console.log(e);
    }));
    return errList;
    // return service.put(api, id, datas).then(function (response) {
    //     response.data
    // });

}

/**
 * updating the index corresponding to tvshowid in data.userViewed
 * @param {*} data 
 * @param {*} _props 
 * @param {*} tvshowid 
 * @param {*} arr 
 * @returns data
 */
function addTvShowToViewed(viewed, data, _props, tvshowid, arr) {
    viewed.find(e => e.data[0] === tvshowid).data = arr;
    viewed.find(e => e.data[0] === tvshowid).data.push(data.darkbg);
    viewed.find(e => e.data[0] === tvshowid).data.push(_props.tvshowViewedTime);
    viewed.find(e => e.data[0] === tvshowid).data.push(_props.seasonNum);
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
function addTvShowToInterests(interests, data, _props, tvshowid, arr) {
    interests.find(e => e.data[0] === tvshowid).data = arr;
    interests.find(e => e.data[0] === tvshowid).data.push(data.darkbg);
    interests.find(e => e.data[0] === tvshowid).data.push(_props.tvshowNotViewedTime);
    interests.find(e => e.data[0] === tvshowid).data.push(_props.seasonNum + 1);
    data.potentialWasteTime += _props.tvshowNotViewedTime;
    return data, interests;
}