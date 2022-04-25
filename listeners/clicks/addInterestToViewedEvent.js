'use strict'

/**
 * adding movies/tvshows from interests to viewed
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
module.exports = (data, _props, event) => {
    data.userViewed[_props.viewedMovieId] = data.userInterests[_props.viewedMovieId];
    data.totalWastedTime += data.userViewed[_props.viewedMovieId][4];
    data.potentialWasteTime -= data.userInterests[_props.viewedMovieId][4];
    delete data.userInterests[_props.viewedMovieId];
    return data
}