'use strict'

const { process_params } = require("express/lib/router");

/**
 * redirecting to the view with the slider to setup the number of seasons
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
const service = require("../../services/userDataService");
module.exports = async (_props, event, api) => {
    var vars = (await service.getDatastore(api, "vars")).data.data[0];
    var id = vars._id;
    var varsData = vars.data;
    varsData.overlayState = true;
    if (_props.movieId != null || _props.movieId != undefined) {
        varsData.tvShowIdToSetupSeasons = String(_props.movieId).substring(8);
    }
    if (_props.tvShowUpdate) {
        varsData.overlaySliderValue = varsData.userViewed[_props.movieId][4];
    } else {
        varsData.overlaySliderValue = 1;
    }
    return await service.put(api, "vars", id, { data: varsData }).then(function (response) {
        response.data
    });
}