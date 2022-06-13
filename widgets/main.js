const userService = require('../services/userService.js');
module.exports = () => {
    return {
        type: "widget",
        name: "app",
        query: {
            "$find": {
                "_datastore": userService.datastoreName,
                "_id": "@me"
            }
        }
    };
}