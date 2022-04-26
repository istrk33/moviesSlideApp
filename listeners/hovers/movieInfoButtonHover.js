'use strict'

/**
 * managing hover on the movie info button(on the poster in homeUi)
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
module.exports = (data, _props, event) => {
    if(data.movieInfoButtonColor[0]==0xF4212121){
        data.movieInfoButtonColor[0]=0xFFFFFFFF;
        data.movieInfoButtonColor[1]=0xF4212121;
    }else{
        data.movieInfoButtonColor[0]=0xF4212121;
        data.movieInfoButtonColor[1]=0xFFFFFFFF;
    }
    return data
}