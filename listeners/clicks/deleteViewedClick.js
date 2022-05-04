'use strict'

/**
 * deleting a movie from the viewed dictionnary
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
module.exports = (data, _props, event) => {
    var id = _props.movieId;
    switch (_props.src) {
        case "viewed":
            manageDicts(data, data.userViewed, id, "wasted");
            break;
        case "interests":
            manageDicts(data, data.userInterests, id, "potential");
            break;
    }
    return data
}

/**
 * managing the deletion of index in function of the dict
 * @param {*} data 
 * @param {*} dictToEdit 
 * @param {*} id 
 * @param {*} srcTime 
 */
function manageDicts(data, dictToEdit, id, srcTime) {
    if (dictToEdit[id] == null || dictToEdit[id] == undefined) {
        var id = "tvshows_" + id;
    }
    if (srcTime == "wasted") {
        if (String(id).includes("tvshows_") && data.userInterests[id] != null) {
            data.potentialWasteTime -= data.userInterests[id][3];
            delete data.userInterests[id];
        }
        data.totalWastedTime -= dictToEdit[id][3];
    } else {
        data.potentialWasteTime -= dictToEdit[id][3];
    }
    data.totalSavedTime += dictToEdit[id][3];
    delete dictToEdit[id];
}