'use strict'

module.exports = (data, _props, event) => {
    data.userViewed[_props.viewedMovieId] = data.userInterests[_props.viewedMovieId];
    console.log(data.totalWastedTime);
    console.log(data.userViewed[_props.viewedMovieId][4]);
    console.log(data.totalWastedTime);
    data.totalWastedTime += data.userViewed[_props.viewedMovieId][4];
    data.potentialWasteTime -= data.userInterests[_props.viewedMovieId][4];
    delete data.userInterests[_props.viewedMovieId];
    return data
}