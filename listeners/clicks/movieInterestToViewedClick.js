'use strict'

/**
 * adding movies/tvshows from interests to viewed
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
module.exports = (_props, event, api) => {
    data.userViewed[_props.movieId] = data.userInterests[_props.movieId];
    data.totalWastedTime += data.userViewed[_props.movieId][3];
    data.potentialWasteTime -= data.userInterests[_props.movieId][3];
    delete data.userInterests[_props.movieId];
    return data
}