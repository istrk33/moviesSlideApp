'use strict'

/**
 * button widget that is used to delete viewed or interested movie/tv show, or add movie and edit tv show to viewed list
 * @param {*} data 
 * @param {*} props 
 * @returns 
 */
module.exports = (data, props) => {
    console.log("////////////////////////////////////////////////////////////LIST BUTTON///////////////////////////////////////////////////////////////////");
    return {
        type: "actionable",
        onPressed: {
            action: props.action,
            props: {
                movieId: props.movieId,
                src: props.src
            }
        },
        child: {
            type: "container",
            decoration: {
                color: data.darkbg
            },
            border: {
                top: {
                    width: 1,
                    color: props.borderColor
                },
                bottom: {
                    width: 1,
                    color: props.borderColor
                },
                right: {
                    width: 1,
                    color: props.borderColor
                },
                left: {
                    width: 1,
                    color: props.borderColor
                }
            },
            child: {
                type: "icon",
                value: props.iconValue,
                color: props.iconColor,
                size: 51
            }
        }
        // onHovered: {
        //   action:"",
        //   props:{

        //   }
        // }
    }
}
