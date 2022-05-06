'use strict'

/**
 * search texfield
 * @param {*} data 
 * @param {*} props 
 * @returns 
 */
module.exports = (data, props) => {
    return {
        type: "container",
        padding: {
            bottom: 1,
            left:3 ,
            right: 3,
        },
        // constraints:{
        //     maxWidth:300
        // },
        child: {
            type: "textfield",
            value: "",
            style: {
                textStyle: {
                    color: data.white,
                },
                decoration: {
                    icon: {
                        type: "icon",
                        value: "search",
                        color: data.white,
                        size: 25
                    },
                    focusedBorder: {
                        type: "underline",
                        borderSide: {
                            color: data.white
                        }
                    },
                    label: {
                        type: "text",
                        value: "Rechercher",
                        style: {
                            color: data.white
                        }
                    }
                }
            },
            onChanged: {
                action: "searchTextChanged",
            }
        }
    }
}
