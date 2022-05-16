'use strict'

/**
 * managing the data to display into movieInfoUi
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
const functions = require("../../resources/functions");
const service = require("../../services/userDataService");
module.exports = async (_props, event, api) => {
    var vars = (await service.getDatastore(api, "vars")).data.data[0];
    var id = vars._id;
    var varsData = vars.data;
    varsData.searchValue = "";
    varsData.navigation = "movieInfo";
    if (_props.from == "home") {
        varsData.movieInfoToSee = varsData.currentMovieInfo;
    } else {
        if (String(_props.movieId).includes("tvshows")) {
            varsData.movieInfoToSee = (await functions.getTvShowDetails(varsData.apiKey, String(_props.movieId).substring(8)));
        } else {
            varsData.movieInfoToSee = (await functions.getMovieDetails(varsData.apiKey, _props.movieId));
        }
    }
    // return await service.put(api, "vars", id, varsData).then(function (response) {
    //     response.data
    // });
    var s = await service.put(api, "vars", id, { data: varsData }).then(function (response) {
        response.data
    });
    var t = (await service.getDatastore(api, "vars")).data;
    console.log(t);
    return s;
}