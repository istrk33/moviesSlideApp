'use strict'

const service = require("../../services/userDataService");


module.exports = (props, event, api) => {
    var list = [];
    service.createDatastore(api, "listOfUndiscoveredMovies").then(function (response) {
        response.data
    }).catch((e => { list.push(e) }));

    service.createDatastore(api, "userInterests").then(function (response) {
        response.data
    }).catch((e => { list.push(e) }));

    service.createDatastore(api, "userViewed").then(function (response) {
        response.data
    }).catch((e => { list.push(e) }));

    // ???? pas sur de garder cette donnée
    service.createDatastore(api, "userNotViewed").then(function (response) {
        response.data
    }).catch((e => { list.push(e) }));

    // service.createDatastore(api, "consts").then(function (response) {
    //     response.data
    // }).catch((e => { list.push(e) }));

    console.log("creating vars");
    service.createDatastore(api, "vars").then(function (response) {
        response.data
    }).catch((e => { list.push(e) }));
    console.log("created vars");
    console.log("\n\n\n\nDATASTORES CREATED\n\n\n");
    return list;
}