'use strict'

/**
 * updating current movie/tvshow and the dictionnary of movies/tvshows
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
const userService = require("../../services/userService");
const lenraDataService = require("../../services/lenraDataService");
const mainVideosServices = require('../../services/mainVideosService');
const userInterestsVideosService = require('../../services/userInterestedVideosService');
const userViewedVideosService = require('../../services/userViewedVideosService');
const videoAPIService = require("../../services/local/videoAPIService");

module.exports = async (_props, event, api) => {
    var userData = (await userService.getUser(api));
    var userId = userData._id;
    var mainData = userData.mainData;
    mainData.navigation = "home";
    await userService.updateUser(api, userData, userId);
}