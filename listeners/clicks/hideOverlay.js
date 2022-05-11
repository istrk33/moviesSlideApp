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
    var obj = (await service.getGeneral(api)).data.data[0];
    var id = obj._id;
    var datas = obj;
    datas.overlayState = false;
    return service.put(api, id, datas).then(function (response) {
        response.data
    });
}