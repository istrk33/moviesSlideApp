'use strict'

/**
 * button into userViewed or userInterests
 * @param {*} data 
 * @param {*} props 
 * @returns 
 */
module.exports = (data, props) => {
    return {
        type:"button",
        text:"Accéder App",
        onPressed: {
            action: "firstJoinClick",
        },
    }
}
