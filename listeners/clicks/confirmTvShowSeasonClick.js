'use strict'

/**
 * managing lists, and time variables that store lost, potential lost time and the user interest with the user viewed dict
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
module.exports = async (data, _props, event) => {
    const functions = require("../../resources/functions");
    var tvshowid = _props.movieId;
    var numberOfSeasons = (await functions.getTvShowDetails(data.apiKey, tvshowid)).show.seasons;
    // if the tv show first seasons are already watched
    if (data.userViewed["tvshows_" + tvshowid] != null && data.userInterests["tvshows_" + tvshowid] != null) {
        // if the last season is watched
        if (data.overlaySliderValue == numberOfSeasons) {
            data.totalWastedTime -= data.userViewed["tvshows_" + tvshowid][3];
            data = addTvShowToViewed(data, _props, tvshowid, [data.userViewed["tvshows_" + tvshowid][0], data.userViewed["tvshows_" + tvshowid][1]]);

            data.potentialWasteTime -= data.userInterests["tvshows_" + tvshowid][3];
            delete data.userInterests["tvshows_" + tvshowid];
        } else {
            data.totalWastedTime -= data.userViewed["tvshows_" + tvshowid][3];
            data = addTvShowToViewed(data, _props, tvshowid, [data.userViewed["tvshows_" + tvshowid][0], data.userViewed["tvshows_" + tvshowid][1]]);

            data.potentialWasteTime -= data.userInterests["tvshows_" + tvshowid][3];
            data = addTvShowToInterests(data, _props, tvshowid, [data.userInterests["tvshows_" + tvshowid][0], data.userInterests["tvshows_" + tvshowid][1]])
        }
        data.navigation = "userInterest";
        // if the tv show is only in userInterests or is never treated (from homeUi)
    } else {
        // if all season are watched
        if (data.overlaySliderValue == numberOfSeasons) {
            //  if the tv show is not treated
            if (data.listOfUndiscoveredMovies["tvshows_" + tvshowid] != null) {
                data = addTvShowToViewed(data, _props, tvshowid, [...data.listOfUndiscoveredMovies["tvshows_" + tvshowid]]);
                // tv show only in userInterests
            } else {
                data = addTvShowToViewed(data, _props, tvshowid, [data.userInterests["tvshows_" + tvshowid][0], data.userViewed["tvshows_" + tvshowid][1]]);
            }
        } else {
            data = addTvShowToViewed(data, _props, tvshowid, [...data.listOfUndiscoveredMovies["tvshows_" + tvshowid]]);
            data = addTvShowToInterests(data, _props, tvshowid, [...data.listOfUndiscoveredMovies["tvshows_" + tvshowid]]);
        }
        data = (await functions.updateCurrent(data, "tvshows_" + tvshowid));
        data.navigation = "home";
    }
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