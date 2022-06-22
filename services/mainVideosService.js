'use strict'

const dataService = require("./lenraDataService.js");
const datastoreName = 'mainVideos';

module.exports = {
    datastoreName,
    async createVideo(api, videoData) {
        return dataService.createData(api, datastoreName, videoData);
    },
    async getVideo(api, videoId) {
        return dataService.getData(api, datastoreName, videoId);
    }
}