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
    var obj = (await service.getGeneral(api)).data.data[0];
    var id = obj._id;
    if (obj.element !== undefined || obj.element != null) {
        var datas = obj.element;
    } else {
        var datas = obj;
    }
    datas["searchValue"] = "";
    datas["navigation"] = "movieInfo";
    if (_props.from == "home") {
        datas["movieInfoToSee"] = datas["currentMovieInfo"];
    } else {
        if (String(_props.movieId).includes("tvshows")) {
            datas["movieInfoToSee"] = (await functions.getTvShowDetails(datas["apiKey"], String(_props.movieId).substring(8)));
        } else {
            datas["movieInfoToSee"] = (await functions.getMovieDetails(datas["apiKey"], _props.movieId));
        }
    }
    return service.put(api, id, datas).then(function (response) {
        response.data
    });
}