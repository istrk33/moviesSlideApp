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
    var vars = (await service.getDatastore(api, "vars")).data.data[0];
    var id = vars._id;
    var varsData = vars.data;
    varsData.searchValue = "";
    varsData.navigation = "userInterest";
    varsData.menuTimeLabel = "tempsAPerdre";
    varsData.tvShowIdToSetupSeasons = -1;
    return await service.put(api, "vars", id, { data: varsData }).then(function (response) {
        response.data
    });
}