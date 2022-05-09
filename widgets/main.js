module.exports = function (data, props) {
    return {
        type: "widget",
        name: "app",
        query: {
            "$find": {
                "_datastore": {
                    "$eq": "appData"
                }
            }
        }
    }
}