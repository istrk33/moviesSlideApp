'use strict'

module.exports = async (data, _props, event) => {
    var functions = require("../../resources/functions");
    data.navigation = "homeWithOverlay";
    if ( _props.tvShowUpdate) {
        data.tvShowIdToSetupSeasons =  String(_props.viewedMovieId).substring(8);
    }
    return data
}