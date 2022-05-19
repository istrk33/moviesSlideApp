'use strict'

const service = require("../../services/userDataService");


module.exports =async (props, event, api) => {
    var list = [];
    await service.createDatastore(api, "listOfUndiscoveredMovies").then(function (response) {
        response.data
    }).catch((e => { list.push(e) }));
    await service.createDatastore(api, "userInterests").then(function (response) {
        response.data
    }).catch((e => { list.push(e) }));
    await service.createDatastore(api, "userViewed").then(function (response) {
        response.data
    }).catch((e => { list.push(e) }));
    // ???? pas sur de garder cette donnée
    // service.createDatastore(api, "userNotViewed").then(function (response) {
    //     response.data
    // }).catch((e => { list.push(e) }));
    await service.createDatastore(api, "vars").then(function (response) {
        response.data
    }).catch((e => { list.push(e) }));
    return list;
}