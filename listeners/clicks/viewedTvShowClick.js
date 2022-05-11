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
    var obj = (await service.getGeneral(api)).data.data[0];
    var id = obj._id;
    var datas = obj;
    datas["overlayState"] = true;
    if (_props.movieId != null || _props.movieId != undefined) {
        datas.tvShowIdToSetupSeasons = String(_props.movieId).substring(8);
    }
    if (_props.tvShowUpdate) {
        datas.overlaySliderValue = datas.userViewed[_props.movieId][4];
    } else {
        datas.overlaySliderValue = 1;
    }
    return service.put(api, id, datas).then(function (response) {
        response.data
    });
    // datas["navigation"] = "home";
    // data.overlayState = true;
    // datas["menuTimeLabel"] = "tempsPerdu";
    // datas["overlaySliderValue"] = 1;
}