'use strict'

/**
 * updating current movie/tvshow and the dictionnary of movies/tvshows
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
const userService = require("../../services/userService");

module.exports = async (_props, event, api) => {
    var userData = (await userService.getUser(api));
    var userId = userData._id;
    var mainData = userData.mainData;
    mainData.navigation = "home";
    await userService.updateUser(api, userData, userId);
}