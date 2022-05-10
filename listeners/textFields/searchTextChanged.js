'use strict'

const service = require("../../services/userDataService");
/**
 * changing the value of the search for the filter into the list views
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
module.exports = async (_props, event, api) => {
    var obj = (await service.getGeneral(api)).data.data[0];
    var id = obj._id;
    var datas = obj;
    datas["searchValue"] = event.value;
    return service.put(api, id, datas).then(function (response) {
        response.data
    });
}