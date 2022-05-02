'use strict'

/**
 * adding movies/tvshows from interests to viewed
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
module.exports = (data, _props, event) => {
    // var tvshowid = _props.viewedMovieId.substring(8);
    
    console.log(data.userViewed[_props.viewedMovieId]);
        //if série deja commencé afficher overlay avec curseur sur la saison en cour
        if (data.userViewed[_props.viewedMovieId] != null || data.userViewed[_props.viewedMovieId] != undefined) {
            data.currentTvShowViewedSeasons=data.userViewed[_props.viewedMovieId][4];
        //else afficher l'overlay
        }else{

        }
        // console.log("si la série est deja dans viewed pour les saisons antérieure");
        // console.log(data.userInterests[_props.viewedMovieId]);
        // console.log(data.userViewed[_props.viewedMovieId]);
        data.userViewed[_props.viewedMovieId] = data.userInterests[_props.viewedMovieId];
        data.totalWastedTime += data.userViewed[_props.viewedMovieId][3];
        data.potentialWasteTime -= data.userInterests[_props.viewedMovieId][3];
        delete data.userInterests[_props.viewedMovieId];
    return data
}