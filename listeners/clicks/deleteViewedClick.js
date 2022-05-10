'use strict'

/**
 * deleting a movie from the viewed dictionnary
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
const service = require("../../services/userDataService");
module.exports = (_props, event, api) => {
    var props_id = _props.movieId;
    switch (_props.src) {
        case "viewed":
            manageDicts(data, data.userViewed, props_id, "wasted");
            break;
        case "interests":
            manageDicts(data, data.userInterests, props_id, "potential");
            break;
    }
    return data
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