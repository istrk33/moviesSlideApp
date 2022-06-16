const lenraDataService = require("../../services/lenraDataService");
const mainVideosServices = require('../../services/mainVideosService');
const userService = require('../../services/userService');
const userToUserViewed = "userToUserViewed";
const userToUserInterest = "userToUserInterest";
const userToVideo = "userToVideo";
const apiVideoService = require('../../services/local/videoAPIService');

module.exports = async (props, event, api) => {
    // get first video id from the datastore
    lenraDataService.createData(api, userToVideo)
    await new Promise(resolve => setTimeout(resolve, 2000));
    // get first lenra movie
    var allData = await lenraDataService.getAll(api, mainVideosServices.datastoreName);
    var first = allData[0];
    console.log("FIRST MOVIEEEEEE");
    console.log(first);
    // getUser Id
    var userData = await userService.getUser(api, userData);
    var userId = userData._id;
    // create data userToVideo for current video with movie id user id and if is tv show
    await lenraDataService.createData(api, userToVideo, { userId: userId, videoId: first._id, numberOfSeason: first.seasons });

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
        navigation: "home"
    };
    userData.mainData = userInitialData;
    return await userService.updateUser(api, userData, userId);
}