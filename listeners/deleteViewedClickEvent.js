'use strict'

module.exports = (data, _props, event) => {
    switch (_props.src) {
        case "viewed":
            delete data.userViewed[_props.movieIdToRemove];
            break;
        case "interests":
            delete data.userInterests[_props.movieIdToRemove];
            break;
    }
    return data
}