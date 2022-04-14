'use strict'

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