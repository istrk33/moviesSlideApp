'use strict'

module.exports = (data, _props, event) => {
    //Object.keys(dict).length
    data.userViewed[_props.idMovie] = _props.movieDict;
    delete data.listOfUndiscoveredFilms[Object.keys(data.listOfUndiscoveredFilms)[0]];
    data.currentMovie = data.listOfUndiscoveredFilms[Object.keys(data.listOfUndiscoveredFilms)[0]];
    console.log(data.listOfUndiscoveredFilms)
    return data
}