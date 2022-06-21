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
    var obj = (await service.getDatastore(api, "vars")).data.data;
    console.log(obj);
    // var obj = (await service.getGeneral(api)).data.data[0];  getDatastore(api, name) {
    var id = obj[0]._id;
    var data = obj[0].data;
    data.searchValue = event.value;
    return service.put(api, id, data).then(function (response) {
        response.data
    });
}