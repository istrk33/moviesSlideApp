'use strict'

/**
 * managing hover event on movies/tvshows lists
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
module.exports = (_props, event, api) => {
    switch (_props.listName) {
        case "viewed":
            movieListItemColor(data, data.userViewed, _props.movieId);
            break;
        case "interests":
            movieListItemColor(data, data.userInterests, _props.movieId);
            break;
    }
    return data
}

/**
 * changing color to manage hover
 * @param {main data} data 
 * @param {the concerned list(viewed or interests)} list 
 * @param {id of the movie/tvshow} id 
 */
function movieListItemColor(data, list, id) {
    if (list[id][2] == data.darkbg) {
        list[id][2] = data.hoverMenuButtonColor;
    } else {
        list[id][2] = data.darkbg;
    }
}