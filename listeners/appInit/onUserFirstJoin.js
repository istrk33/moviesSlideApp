const lenraDataService = require("../../services/lenraDataService");
const mainVideosServices = require('../../services/mainVideosService');
const userService = require('../../services/userService');
const apiVideoService = require('../../services/local/videoAPIService');

module.exports = async (props, event, api) => {
    // get first video id from the datastore
    await new Promise(resolve => setTimeout(resolve, 5000));
    // getUser Id
    var userData = await userService.getUser(api, userData);
    var userId = userData._id;
    var allFIlms = await lenraDataService.getAll(api, mainVideosServices.datastoreName);
    allFIlms.sort(function (a, b) {
        return b._id - a._id;
    }).reverse();

    var userInitialData = {
        totalWastedTime: 0,
        totalSavedTime: 0,
        potentialWasteTime: 0,
        menuTimeLabel: "tempsPerdu",
        searchValue: "",
        tvShowIdToSetupSeasons: -1,
        currentTvShowViewedSeasons: 1,
        overlaySliderValue: 1,
        overlayState: false,
        lenraCurrentVideoIndex: 0,
        navigation: "home"
    };
    userData.mainData = userInitialData;
    await userService.updateUser(api, userData, userId);
}