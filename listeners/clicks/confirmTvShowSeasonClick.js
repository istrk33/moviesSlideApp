'use strict'

/**
 * managing lists, and time variables that store lost, potential lost time and the user interest with the user viewed dict
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
const functions = require("../../resources/functions");
const service = require("../../services/userDataService");
module.exports = async (_props, event, api) => {
    var obj = (await service.getGeneral(api)).data.data[0];
    var id = obj._id;
    var datas = obj;
    // datas["searchValue"] = "";
    // datas["navigation"] = "home";
    // datas["menuTimeLabel"] = "tempsPerdu";
    // datas["overlaySliderValue"] = 1;
    var tvshowid = _props.movieId;
    var numberOfSeasons = (await functions.getTvShowDetails(datas.apiKey, tvshowid)).show.seasons;
    // if the tv show first season is already watched
    if (datas.userViewed["tvshows_" + tvshowid] != null && datas.userInterests["tvshows_" + tvshowid] != null) {
        // if the last season is watched
        if (datas.overlaySliderValue == numberOfSeasons) {
            //adding data in userViewed
            datas.totalWastedTime -= datas.userViewed["tvshows_" + tvshowid][3];
            datas = addTvShowToViewed(datas, _props, tvshowid, [datas.userViewed["tvshows_" + tvshowid][0], datas.userViewed["tvshows_" + tvshowid][1]]);

            //deleting data from userInterests
            datas.potentialWasteTime -= datas.userInterests["tvshows_" + tvshowid][3];
            delete datas.userInterests["tvshows_" + tvshowid];
            // else at most the s-1 season is watched
        } else {
            // adding data in userViewed
            datas.totalWastedTime -= datas.userViewed["tvshows_" + tvshowid][3];
            datas = addTvShowToViewed(datas, _props, tvshowid, [datas.userViewed["tvshows_" + tvshowid][0], datas.userViewed["tvshows_" + tvshowid][1]]);

            // adding data in userInterests
            datas.potentialWasteTime -= datas.userInterests["tvshows_" + tvshowid][3];
            datas = addTvShowToInterests(datas, _props, tvshowid, [datas.userInterests["tvshows_" + tvshowid][0], datas.userInterests["tvshows_" + tvshowid][1]])
        }
        // data.navigation = "userInterest";
        // if the tv show is never watched
    } else {
        // if the last season is watched
        if (datas.overlaySliderValue == numberOfSeasons) {
            //  if we come from the current tvshow in homeUi
            if (datas.listOfUndiscoveredMovies["tvshows_" + tvshowid] != null) {
                datas = addTvShowToViewed(datas, _props, tvshowid, [...datas.listOfUndiscoveredMovies["tvshows_" + tvshowid]]);
                // tv show only in userInterests
            } else if (datas.userViewed["tvshows_" + tvshowid] == null) {
                datas = addTvShowToViewed(datas, _props, tvshowid, [datas.userInterests["tvshows_" + tvshowid][0], datas.userInterests["tvshows_" + tvshowid][1]]);
                datas.potentialWasteTime -= datas.userInterests["tvshows_" + tvshowid][3];
                delete datas.userInterests["tvshows_" + tvshowid];
            } else {
                datas = addTvShowToViewed(datas, _props, tvshowid, [datas.userInterests["tvshows_" + tvshowid][0], datas.userViewed["tvshows_" + tvshowid][1]]);
            }
            //at most the s-1 season is watched
        } else {
            //  if we come from the current tvshow in homeUi
            if (datas.listOfUndiscoveredMovies["tvshows_" + tvshowid] != null) {
                // updating userViewed and userInterrest
                datas = addTvShowToViewed(datas, _props, tvshowid, [...datas.listOfUndiscoveredMovies["tvshows_" + tvshowid]]);
                datas = addTvShowToInterests(datas, _props, tvshowid, [...datas.listOfUndiscoveredMovies["tvshows_" + tvshowid]]);
                // tv show only in userInterests
            } else if (datas.userViewed["tvshows_" + tvshowid] == null) {
                datas = addTvShowToViewed(datas, _props, tvshowid, [datas.userInterests["tvshows_" + tvshowid][0], datas.userInterests["tvshows_" + tvshowid][1]]);
                datas = addTvShowToInterests(datas, _props, tvshowid, [datas.userInterests["tvshows_" + tvshowid][0], datas.userInterests["tvshows_" + tvshowid][1]]);
            }
            else {
                datas = addTvShowToViewed(datas, _props, tvshowid, [datas.userInterests["tvshows_" + tvshowid][0], datas.userViewed["tvshows_" + tvshowid][1]]);
                datas = addTvShowToInterests(datas, _props, tvshowid, [datas.userInterests["tvshows_" + tvshowid][0], datas.userViewed["tvshows_" + tvshowid][1]]);
            }
            // data = addTvShowToViewed(data, _props, tvshowid, [...data.listOfUndiscoveredMovies["tvshows_" + tvshowid]]);
        }
        datas = (await functions.updateCurrent(datas, "tvshows_" + tvshowid));
        // data.navigation = "home";
    }
    datas["overlayState"] = false;
    datas["overlaySliderValue"] = 1;
    // return data
    return service.put(api, id, datas).then(function (response) {
        response.data
    });

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