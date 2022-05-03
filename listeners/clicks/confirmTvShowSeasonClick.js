'use strict'

/**
 * 
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
module.exports = async (data, _props, event) => {
    const functions = require("../../resources/functions");
    var tvshowid = _props.tvshowid;
    var numberOfSeasons = (await functions.getTvShowDetails(data.apiKey, tvshowid)).show.seasons;

    if (data.userViewed["tvshows_" + tvshowid] != null && data.userInterests["tvshows_" + tvshowid] != null) {
        //if user had seen every seasons
        if (data.overlaySliderValue == numberOfSeasons) {
            /*update viewed*/
            //removing old wasted time
            data.totalWastedTime -= data.userViewed["tvshows_" + tvshowid][3];
            data.userViewed["tvshows_" + tvshowid] = [data.userViewed["tvshows_" + tvshowid][0],data.userViewed["tvshows_" + tvshowid][1]];
            //button color
            data.userViewed["tvshows_" + tvshowid].push(data.darkbg);
            //viewed time
            data.userViewed["tvshows_" + tvshowid].push(_props.tvshowViewedTime);
            //viewed seasons
            data.userViewed["tvshows_" + tvshowid].push(_props.seasonNum);
            data.totalWastedTime += _props.tvshowViewedTime;

            data.potentialWasteTime -= data.userInterests["tvshows_" + tvshowid][3];
            delete data.userInterests["tvshows_" + tvshowid];
        } else {
            //update viewed
            data.totalWastedTime -= data.userViewed["tvshows_" + tvshowid][3];
            data.userViewed["tvshows_" + tvshowid] = [data.userViewed["tvshows_" + tvshowid][0],data.userViewed["tvshows_" + tvshowid][1]];
            //button color
            data.userViewed["tvshows_" + tvshowid].push(data.darkbg);
            //viewed time
            data.userViewed["tvshows_" + tvshowid].push(_props.tvshowViewedTime);
            //viewed seasons
            data.userViewed["tvshows_" + tvshowid].push(_props.seasonNum);
            data.totalWastedTime += _props.tvshowViewedTime;

            data.potentialWasteTime -= data.userInterests["tvshows_" + tvshowid][3];
            /*ajout dans interests*/
            data.userInterests["tvshows_" + tvshowid] = [data.userInterests["tvshows_" + tvshowid][0],data.userInterests["tvshows_" + tvshowid][1]];
            //button color
            data.userInterests["tvshows_" + tvshowid].push(data.darkbg);
            //unviewed time
            data.userInterests["tvshows_" + tvshowid].push(_props.tvshowNotViewedTime);
            //seasons remaining
            data.userInterests["tvshows_" + tvshowid].push(_props.seasonNum + 1);
            data.potentialWasteTime += _props.tvshowNotViewedTime;
        }
        data.navigation = "userInterest";
    } else {
        //if user had seen every seasons
        if (data.overlaySliderValue == numberOfSeasons) {
            /*ajout dans viewed*/
            data.userViewed["tvshows_" + tvshowid] = [...data.listOfUndiscoveredMovies["tvshows_" + tvshowid]];
            //button color
            data.userViewed["tvshows_" + tvshowid].push(data.darkbg);
            //viewed time
            data.userViewed["tvshows_" + tvshowid].push(_props.tvshowViewedTime);
            //viewed seasons
            data.userViewed["tvshows_" + tvshowid].push(_props.seasonNum);
            data.totalWastedTime += _props.tvshowViewedTime;
        } else {
            /*ajout dans viewed*/
            data.userViewed["tvshows_" + tvshowid] = [...data.listOfUndiscoveredMovies["tvshows_" + tvshowid]];
            //button color
            data.userViewed["tvshows_" + tvshowid].push(data.darkbg);
            //viewed time
            data.userViewed["tvshows_" + tvshowid].push(_props.tvshowViewedTime);
            //viewed seasons
            data.userViewed["tvshows_" + tvshowid].push(_props.seasonNum);
            data.totalWastedTime += _props.tvshowViewedTime;

            /*ajout dans interests*/
            data.userInterests["tvshows_" + tvshowid] = [...data.listOfUndiscoveredMovies["tvshows_" + tvshowid]];
            //button color
            data.userInterests["tvshows_" + tvshowid].push(data.darkbg);
            //unviewed time
            data.userInterests["tvshows_" + tvshowid].push(_props.tvshowNotViewedTime);
            //seasons remaining
            data.userInterests["tvshows_" + tvshowid].push(_props.seasonNum + 1);
            data.potentialWasteTime += _props.tvshowNotViewedTime;
        }


        delete data.listOfUndiscoveredMovies["tvshows_" + tvshowid];
        data.keys = Object.keys(data.listOfUndiscoveredMovies);
        data.currentId = data.keys[data.keys.length * Math.random() << 0];
        var currentMovie = data.listOfUndiscoveredMovies[data.currentId][0];
        data.currentMovieInfo = (data.currentId.includes("tvshows_")) ? (await functions.getTvShowDetails(data.apiKey, currentMovie)) : (await functions.getMovieDetails(data.apiKey, currentMovie));
        if (data.keys.length <= 1) {
            (await functions.queryPopularMovies(data.apiKey, data.start)).forEach((element) => data.listOfUndiscoveredMovies[element.id] = [element.id, element.title]);
            (await functions.queryPopularTvShows(data.apiKey, data.start)).forEach((element) => data.listOfUndiscoveredMovies["tvshows_" + element.id] = [element.id, element.title]);
            data.start += 5;
        }
        data.navigation = "home";
    }
    data.overlaySliderValue = 1;

    return data
}