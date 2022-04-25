'use strict'

/**
 * managing hover event on movies/tvshows lists
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
module.exports = (data, _props, event) => {
    switch (_props.listName) {
        case "viewed":
            if (data.userViewed[_props.movieId][2] == data.darkbg) {
                data.userViewed[_props.movieId][2] = data.hoverMenuButtonColor;
            } else {
                data.userViewed[_props.movieId][2] = data.darkbg;
            }
            break;
        case "interests":
            if (data.userInterests[_props.movieId][2] == data.darkbg) {
                data.userInterests[_props.movieId][2] = data.hoverMenuButtonColor;
            } else {
                data.userInterests[_props.movieId][2] = data.darkbg;
            }
            break;
    }
    return data
}