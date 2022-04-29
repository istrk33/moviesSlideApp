'use strict'

/**
 * 
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
module.exports = (data, _props, event) => {
    // data.currentTvShowViewedSeasons=event.value;
    // console.log(event);
    data.searchValue=event.value;
    return data
}