'use strict'

const lenraDataService = require("../../services/lenraDataService");
const mainVideosServices = require('../../services/mainVideosService');
const userViewedVideosService = require('../../services/userViewedVideosService');
const userInterestsVideosService = require('../../services/userInterestedVideosService');
const userService = require('../../services/userService');
const consts = require('../../services/local/appConstsService');
const mainAppVars = "mainAppVars";
const apiVideoService = require('../../services/local/videoAPIService');
//placer tous les datastores a utiliser
const datastores = [mainAppVars, mainVideosServices.datastoreName, userViewedVideosService.datastoreName, userInterestsVideosService.datastoreName];

module.exports = async (props, event, api) => {
    var errors = [];
    // creating datastores
    const promises = datastores.map(ds => lenraDataService.createDatastore(api, ds).catch((e => { })));
    await Promise.all(promises);
    var tmp = await lenraDataService.createData(api, mainAppVars, { start: 0 });
    var start = (await lenraDataService.getData(api, mainAppVars, tmp._id));
    await apiVideoService.addNewVideosToLenra(api, start);
    return errors;
}