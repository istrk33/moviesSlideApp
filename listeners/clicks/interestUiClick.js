'use strict'

/**
 * redirecting to the ui of interested videos of the user
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
const service = require("../../services/userDataService");
module.exports = async (_props, event, api) => {
    // data.menuHoverButton1Color=[data.black,data.white];
    // data.menuHoverButton2Color=[data.black,data.white];
    var obj = (await service.getGeneral(api)).data.data[0];
    var id = obj._id;
    var datas = obj;
    datas["searchValue"] = "";
    datas["navigation"] = "userInterest";
    datas["menuTimeLabel"] = "tempsAPerdre";
    datas["tvShowIdToSetupSeasons"] = -1;
    return service.put(api, id, datas).then(function (response) {
        response.data
    });
    // data.menuTimeLabel = "tempsAPerdre";
    // data.navigation="userInterest";
    // data.tvShowIdToSetupSeasons=-1;
    // data.searchValue="";
    // return data
}