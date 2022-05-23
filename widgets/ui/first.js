'use strict'

/**
 * view that display informations on the movie or the tv show
 * @param {*} data 
 * @param {*} props 
 * @returns 
 */
const functions = require("../../resources/functions");
module.exports = async (data, props) => {
    return {
        type: "flex",
        mainAxisAlignment: "center",
        crossAxisAlignment: "center",
        direction: "vertical",
        fillParent: true,
        children: [
            {
                type: "text",
                value: "Bienvenue dans Filmder"
            }
            , {
                type: "button",
                text: "Accéder app",
                onPressed: {
                    action: "loadAll"
                }
            }
        ]
    }
}