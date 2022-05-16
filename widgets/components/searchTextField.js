'use strict'

/**
 * search texfield
 * @param {*} data 
 * @param {*} props 
 * @returns 
 */
module.exports = (data, props) => {
    var datas = data[0].data;
    console.log(datas);
    console.log("SIUUUUUUUUUUUUU");
    return {
        type: "container",
        padding: {
            bottom: 1,
            left: 3,
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
                    color: datas.white,
                },
                decoration: {
                    icon: {
                        type: "icon",
                        value: "search",
                        color: datas.white,
                        size: 25
                    },
                    focusedBorder: {
                        type: "underline",
                        borderSide: {
                            color: datas.white
                        }
                    },
                    label: {
                        type: "text",
                        value: "Rechercher",
                        style: {
                            color: datas.white
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
