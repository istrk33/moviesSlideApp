'use strict'

/**
 * button into userViewed or userInterests
 * @param {*} data 
 * @param {*} props 
 * @returns 
 */
module.exports = (data, props) => {
    var white = 0xFFFFFFFF;
    console.log("movie bUUUUUUUUUUUUUTTTTTTTTTTTTTTTTTTOOOOOOOOOOOOOOOOOOONNNNNNNNNNNNNNNNNNNNN");
    console.log("movie bUUUUUUUUUUUUUTTTTTTTTTTTTTTTTTTOOOOOOOOOOOOOOOOOOONNNNNNNNNNNNNNNNNNNNN");
    console.log("movie bUUUUUUUUUUUUUTTTTTTTTTTTTTTTTTTOOOOOOOOOOOOOOOOOOONNNNNNNNNNNNNNNNNNNNN");
    console.log("movie bUUUUUUUUUUUUUTTTTTTTTTTTTTTTTTTOOOOOOOOOOOOOOOOOOONNNNNNNNNNNNNNNNNNNNN");
    console.log("movie bUUUUUUUUUUUUUTTTTTTTTTTTTTTTTTTOOOOOOOOOOOOOOOOOOONNNNNNNNNNNNNNNNNNNNN");
    console.log("movie bUUUUUUUUUUUUUTTTTTTTTTTTTTTTTTTOOOOOOOOOOOOOOOOOOONNNNNNNNNNNNNNNNNNNNN");
    console.log("movie bUUUUUUUUUUUUUTTTTTTTTTTTTTTTTTTOOOOOOOOOOOOOOOOOOONNNNNNNNNNNNNNNNNNNNN");
    console.log("movie bUUUUUUUUUUUUUTTTTTTTTTTTTTTTTTTOOOOOOOOOOOOOOOOOOONNNNNNNNNNNNNNNNNNNNN");
    console.log("movie bUUUUUUUUUUUUUTTTTTTTTTTTTTTTTTTOOOOOOOOOOOOOOOOOOONNNNNNNNNNNNNNNNNNNNN");
    if (String(props.movieId).includes("tvshows_")) {
        var color = props.arrayData[2];
    } else {
        var color = props.arrayData[2];
    }
    var textcolor = (color == 0xFF212121) ? 0xFFB5B5B5 : 0xFF212121;
    return {
        type: "actionable",
        onPressed: {
            action: "switchMovieInfoUi",
            props: {
                movieId: props.movieId,
                from: props.from,
                videotype: props.videotype
            }
        },
        // onHovered: {
        //     action: "movieButtonHovered",
        //     props: {
        //         movieId: props.movieId,
        //         listName: props.src
        //     }
        // },
        child: {
            type: "container",
            constraints: {
                minHeight: props.height,
                maxHeight: props.height * 3,
                minWidth: props.width,
                maxWidth: props.width
            },
            border: {
                top: {
                    width: 1,
                    color: white
                },
                bottom: {
                    width: 1,
                    color: white
                },
                right: {
                    width: 1,
                    color: white
                },
                left: {
                    width: 1,
                    color: white
                }
            },
            decoration: {
                color: color
            },
            child: {
                type: "flex",
                mainAxisAlignment: "spaceBetween",
                direction: "vertical",
                children: [
                    {
                        type: "container",
                        padding: {
                            top: 2,
                            left: 1,
                            right: 1,
                            bottom: 2
                        },
                        child: {
                            type: "text",
                            value: String(props.buttonText),
                            style: {
                                color: textcolor
                            }
                        }
                    },
                ]
            }
        }
    }
}
