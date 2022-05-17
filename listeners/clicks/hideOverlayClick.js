'use strict'

/**
 * hiding overlay                                                                                                           
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
    varsData.overlayState = false;
    return await service.put(api, "vars", id, { data: varsData }).then(function (response) {
        response.data
    });
}