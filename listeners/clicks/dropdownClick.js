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
    // var obj = (await service.getGeneral(api)).data.data[0];
    // var id = obj._id;
    // var datas = obj;
    // switch (_props.srcButton) {
    //     case "tempsPerdu":
    //         datas["menuTimeLabel"] = "tempsPerdu";
    //         break;
    //     case "tempsAPerdre":
    //         datas["menuTimeLabel"] = "tempsAPerdre";
    //         break;
    //     case "tempsEconomise":
    //         datas["menuTimeLabel"] = "tempsEconomise";
    //         break;
    // }
    // return service.put(api, id, datas).then(function (response) {
    //     response.data
    // });
    var vars = (await service.getDatastore(api, "vars")).data.data[0];
    var id = vars._id;
    var varsData = vars.data;
    switch (_props.srcButton) {
        case "tempsPerdu":
            varsData.menuTimeLabel = "tempsPerdu";
            break;
        case "tempsAPerdre":
            varsData.menuTimeLabel = "tempsAPerdre";
            break;
        case "tempsEconomise":
            varsData.menuTimeLabel = "tempsEconomise";
            break;
    }
    return await service.put(api, "vars", id, { data: varsData }).then(function (response) {
        response.data
    });
}