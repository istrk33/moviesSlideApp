'use strict'

/**
 * deleting a movie from the viewed dictionnary
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
module.exports = (data, _props, event) => {
    switch (_props.src) {
        case "viewed":
            data.totalWastedTime -= data.userViewed[_props.movieIdToRemove][4];
            data.totalSavedTime += data.userViewed[_props.movieIdToRemove][4];
            delete data.userViewed[_props.movieIdToRemove];
            break;
        case "interests":
            data.potentialWasteTime -= data.userInterests[_props.movieIdToRemove][4];
            data.totalSavedTime += data.userInterests[_props.movieIdToRemove][4];
            delete data.userInterests[_props.movieIdToRemove];
            break;
    }
    return data
}