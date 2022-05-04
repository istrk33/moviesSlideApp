'use strict'

/**
 * redirecting to the view with the slider to setup the number of seasons
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
module.exports = async (data, _props, event) => {
    data.navigation = "homeWithOverlay";
    if (_props.tvShowUpdate) {
        data.tvShowIdToSetupSeasons = String(_props.movieId).substring(8);
        data.overlaySliderValue = data.userViewed[_props.movieId][4];
    } else {
        data.overlaySliderValue = 1;
    }
    return data
}