'use strict'

/**
 * managing lists, and time variables that store lost, potential lost time and the user interest with the user viewed dict
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
module.exports = async (_props, event, api) => {
    const functions = require("../../resources/functions");
    var tvshowid = _props.movieId;
    var numberOfSeasons = (await functions.getTvShowDetails(data.apiKey, tvshowid)).show.seasons;
    // if the tv show first season is already watched
    if (data.userViewed["tvshows_" + tvshowid] != null && data.userInterests["tvshows_" + tvshowid] != null) {
        // if the last season is watched
        if (data.overlaySliderValue == numberOfSeasons) {
            //adding data in userViewed
            data.totalWastedTime -= data.userViewed["tvshows_" + tvshowid][3];
            data = addTvShowToViewed(data, _props, tvshowid, [data.userViewed["tvshows_" + tvshowid][0], data.userViewed["tvshows_" + tvshowid][1]]);

            //deleting data from userInterests
            data.potentialWasteTime -= data.userInterests["tvshows_" + tvshowid][3];
            delete data.userInterests["tvshows_" + tvshowid];
            // else at most the s-1 season is watched
        } else {
            // adding data in userViewed
            data.totalWastedTime -= data.userViewed["tvshows_" + tvshowid][3];
            data = addTvShowToViewed(data, _props, tvshowid, [data.userViewed["tvshows_" + tvshowid][0], data.userViewed["tvshows_" + tvshowid][1]]);

            // adding data in userInterests
            data.potentialWasteTime -= data.userInterests["tvshows_" + tvshowid][3];
            data = addTvShowToInterests(data, _props, tvshowid, [data.userInterests["tvshows_" + tvshowid][0], data.userInterests["tvshows_" + tvshowid][1]])
        }
        // data.navigation = "userInterest";
        // if the tv show is never watched
    } else {
        // if the last season is watched
        if (data.overlaySliderValue == numberOfSeasons) {
            //  if we come from the current tvshow in homeUi
            if (data.listOfUndiscoveredMovies["tvshows_" + tvshowid] != null) {
                data = addTvShowToViewed(data, _props, tvshowid, [...data.listOfUndiscoveredMovies["tvshows_" + tvshowid]]);
                // tv show only in userInterests
            } else if (data.userViewed["tvshows_" + tvshowid] == null) {
                data = addTvShowToViewed(data, _props, tvshowid, [data.userInterests["tvshows_" + tvshowid][0], data.userInterests["tvshows_" + tvshowid][1]]);
                data.potentialWasteTime -= data.userInterests["tvshows_" + tvshowid][3];
                delete data.userInterests["tvshows_" + tvshowid];
            } else {
                data = addTvShowToViewed(data, _props, tvshowid, [data.userInterests["tvshows_" + tvshowid][0], data.userViewed["tvshows_" + tvshowid][1]]);
            }
            //at most the s-1 season is watched
        } else {
            //  if we come from the current tvshow in homeUi
            if (data.listOfUndiscoveredMovies["tvshows_" + tvshowid] != null) {
                // updating userViewed and userInterrest
                data = addTvShowToViewed(data, _props, tvshowid, [...data.listOfUndiscoveredMovies["tvshows_" + tvshowid]]);
                data = addTvShowToInterests(data, _props, tvshowid, [...data.listOfUndiscoveredMovies["tvshows_" + tvshowid]]);
                // tv show only in userInterests
            } else if (data.userViewed["tvshows_" + tvshowid] == null) {
                data = addTvShowToViewed(data, _props, tvshowid, [data.userInterests["tvshows_" + tvshowid][0], data.userInterests["tvshows_" + tvshowid][1]]);
                data = addTvShowToInterests(data, _props, tvshowid, [data.userInterests["tvshows_" + tvshowid][0], data.userInterests["tvshows_" + tvshowid][1]]);
            }
            else {
                data = addTvShowToViewed(data, _props, tvshowid, [data.userInterests["tvshows_" + tvshowid][0], data.userViewed["tvshows_" + tvshowid][1]]);
                data = addTvShowToInterests(data, _props, tvshowid, [data.userInterests["tvshows_" + tvshowid][0], data.userViewed["tvshows_" + tvshowid][1]]);
            }
            // data = addTvShowToViewed(data, _props, tvshowid, [...data.listOfUndiscoveredMovies["tvshows_" + tvshowid]]);
        }
        data = (await functions.updateCurrent(data, "tvshows_" + tvshowid));
        // data.navigation = "home";
    }
    data.overlayState = false;
    data.overlaySliderValue = 1;
    return data
}

/**
 * updating the index corresponding to tvshowid in data.userViewed
 * @param {*} data 
 * @param {*} _props 
 * @param {*} tvshowid 
 * @param {*} arr 
 * @returns data
 */
function addTvShowToViewed(data, _props, tvshowid, arr) {
    data.userViewed["tvshows_" + tvshowid] = arr;
    data.userViewed["tvshows_" + tvshowid].push(data.darkbg);
    data.userViewed["tvshows_" + tvshowid].push(_props.tvshowViewedTime);
    data.userViewed["tvshows_" + tvshowid].push(_props.seasonNum);
    data.totalWastedTime += _props.tvshowViewedTime;
    return data;
}

/**
 * updating the index corresponding to tvshowid in data.userInterests
 * @param {*} data 
 * @param {*} _props 
 * @param {*} tvshowid 
 * @param {*} arr 
 * @returns 
 */
function addTvShowToInterests(data, _props, tvshowid, arr) {
    data.userInterests["tvshows_" + tvshowid] = arr;
    data.userInterests["tvshows_" + tvshowid].push(data.darkbg);
    data.userInterests["tvshows_" + tvshowid].push(_props.tvshowNotViewedTime);
    data.userInterests["tvshows_" + tvshowid].push(_props.seasonNum + 1);
    data.potentialWasteTime += _props.tvshowNotViewedTime;
    return data;
}