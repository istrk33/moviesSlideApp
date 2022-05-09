'use strict'

const service = require("../../services/userDataService");
/**
 * changing the value of the search for the filter into the list views
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
module.exports =async (_props, event, api) => {
    var datas=(await service.get(api,"general")).general;
    datas["searchValue"]=event.value;
    return service.put(api, datas).then(function (response) {
        response.data
    });
}