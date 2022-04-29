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
    var numberOfSeasons=(await functions.getTvShowDetails(data.apiKey, tvshowid)).show.seasons;
    //if user had seen every seasons
    if(data.currentTvShowViewedSeasons==numberOfSeasons){
        /*ajout dans viewed*/
        data.userViewed["tvshows_" + tvshowid] = [...data.listOfUndiscoveredMovies["tvshows_" + tvshowid]];
        //button color
        data.userViewed["tvshows_" + tvshowid].push(data.darkbg);
        //viewed time
        data.userViewed["tvshows_" + tvshowid].push(_props.tvshowViewedTime);
        //viewed seasons
        data.userViewed["tvshows_" + tvshowid].push(_props.seasonNum);
        data.totalWastedTime += _props.tvshowViewedTime;
    }else{
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
        // (await functions.queryPopularMovies(data.apiKey, data.start)).forEach((element) => data.listOfUndiscoveredMovies[element.id] = [element.id, element.title]);
        (await functions.queryPopularTvShows(data.apiKey, data.start)).forEach((element) => data.listOfUndiscoveredMovies["tvshows_" + element.id] = [element.id, element.title]);
        data.start += 5;
    }
    data.navigation = "home";
    data.currentTvShowViewedSeasons=1;
    return data
}