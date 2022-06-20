'use strict'

const dataService = require("./lenraDataService.js");
const datastoreName = 'usersInterests';


module.exports = {
    datastoreName,
    async createNewInterest(api, userId, videoId, startSeason) {
        return dataService.createData(api, datastoreName, { userId: userId, videoId: videoId, startSeason: startSeason });
    },
    async getUserInterests(api) {
        return await dataService.executeQuery(api, {
            "$find": {
                "_datastore": datastoreName,
                "userId": "@me"
            }
        });
    },
    async updateUserInterest(api) {
        return await dataService.executeQuery(api, {
            "$find": {
                "_datastore": datastoreName,
                "_refs": {
                    "$constains": "@me"
                }
            }
        });
    },
    async deleteUserInterest(api, category) {
        return await dataService.updateData(api, datastoreName, category);
    }
}
