'use strict'

/**
 * changing the display type of the dropdown button
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
    switch (_props.srcButton) {
        case "tempsPerdu":
            datas["menuTimeLabel"] = "tempsPerdu";
            break;
        case "tempsAPerdre":
            datas["menuTimeLabel"] = "tempsAPerdre";
            break;
        case "tempsEconomise":
            datas["menuTimeLabel"] = "tempsEconomise";
            break;
    }
    return service.put(api, id, datas).then(function (response) {
        response.data
    });
}