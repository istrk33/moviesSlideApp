'use strict'

/**
 * managing actionable colors
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
const service = require("../../services/userDataService");
module.exports = async (_props, event, api) => {
    // data.menuHoverButton1Color = [data.black, data.white];
    // data.menuHoverButton2Color = [data.black, data.white];
    var vars = (await service.getDatastore(api, "vars")).data.data[0];
    var id = vars._id;
    var varsData = vars.data;
    varsData.searchValue = "";
    varsData.navigation = "home";
    return await service.put(api, "vars", id, { data: varsData }).then(function (response) {
        response.data
    });
}