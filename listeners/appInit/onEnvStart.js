'use strict'

const service = require("../../services/userDataService");


module.exports = (props, event, api) => {
    console.log("OnEnvStart");
    var list = [];
    //datastore for general data
    service.createDatastore(api, "general").then(function (response) {
        console.log("response" + response)
        response.data
    }).catch((e => { list.push(e) }));
    return list;
}