'use strict'

/**
 * deleting a movie from the viewed dictionnary
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
const service = require("../../services/userDataService");
module.exports = async (_props, event, api) => {
    var obj = (await service.getGeneral(api)).data.data[0];
    var id = obj._id;
    var props_id = _props.movieId;
    var datas = obj;
    switch (_props.src) {
        case "viewed":
            // manageDicts(data, data.userViewed, props_id, "wasted");
            if (datas.userViewed[props_id] == null || datas.userViewed[props_id] == undefined) {
                var props_id = "tvshows_" + props_id;
            }
            // if (srcTime == "wasted") {
            if (String(props_id).includes("tvshows_") && datas.userInterests[props_id] != null) {
                datas.potentialWasteTime -= datas.userInterests[props_id][3];
                delete datas.userInterests[props_id];
            }
            datas.totalWastedTime -= datas.userViewed[props_id][3];
            // } else {
            //     data.potentialWasteTime -= dictToEdit[props_id][3];
            // }
            datas.totalSavedTime += datas.userViewed[props_id][3];
            delete datas.userViewed[props_id];
            break;
        case "interests":
            // manageDicts(data,  datas.userInterests, props_id, "potential");
            if (datas.userInterests[props_id] == null || datas.userInterests[props_id] == undefined) {
                var props_id = "tvshows_" + props_id;
            }
            datas.potentialWasteTime -= datas.userInterests[props_id][3];
            datas.totalSavedTime += datas.userInterests[props_id][3];
            delete datas.userInterests[props_id];
            break;
    }
    return service.put(api, id, datas).then(function (response) {
        response.data
    });
}

/**
 * managing the deletion of index in function of the dict
 * @param {*} data 
 * @param {*} dictToEdit 
 * @param {*} props_id 
 * @param {*} srcTime 
 */
function manageDicts(data, dictToEdit, props_id, srcTime) {
    if (dictToEdit[props_id] == null || dictToEdit[props_id] == undefined) {
        var props_id = "tvshows_" + props_id;
    }
    if (srcTime == "wasted") {
        if (String(props_id).includes("tvshows_") && data.userInterests[props_id] != null) {
            data.potentialWasteTime -= data.userInterests[props_id][3];
            delete data.userInterests[props_id];
        }
        data.totalWastedTime -= dictToEdit[props_id][3];
    } else {
        data.potentialWasteTime -= dictToEdit[props_id][3];
    }
    data.totalSavedTime += dictToEdit[props_id][3];
    delete dictToEdit[props_id];
}