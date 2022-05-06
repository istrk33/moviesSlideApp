'use strict'

const { process_params } = require("express/lib/router");

/**
 * redirecting to the view with the slider to setup the number of seasons
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
module.exports = async (data, _props, event) => {
    data.overlayState = true;
    if (_props.movieId != null || _props.movieId != undefined) {
        data.tvShowIdToSetupSeasons = String(_props.movieId).substring(8);
    }
    if (_props.tvShowUpdate) {
        data.overlaySliderValue = data.userViewed[_props.movieId][4];
    } else {
        data.overlaySliderValue = 1;
    }
    return data
}