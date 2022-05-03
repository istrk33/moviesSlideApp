'use strict'

module.exports = async (data, _props, event) => {
    data.navigation = "homeWithOverlay";
    if (_props.tvShowUpdate) {
        data.tvShowIdToSetupSeasons = String(_props.viewedMovieId).substring(8);
        // data.currentTvShowViewedSeasons = data.userViewed[_props.viewedMovieId][4];
        data.overlaySliderValue=data.userViewed[_props.viewedMovieId][4];
    }
    return data
}