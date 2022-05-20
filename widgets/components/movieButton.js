'use strict'

/**
 * button into userViewed or userInterests
 * @param {*} data 
 * @param {*} props 
 * @returns 
 */
module.exports = (data, props) => {
    console.log("PLANTAGE DANS MOVIE BUTTTTTTTTTTTTTTOOOOOOOOOOOOOONNNNNNNNNNNNNN");
    if (data[0].element !== undefined || data[0].element != null) {
        var datas = data[0].element;
    } else {
        var datas = data[0];
    }
    if (String(props.movieId).includes("tvshows_")) {
        var color = props.arrayData[props.movieId][2];
    } else {
        var color = props.arrayData[props.movieId][2];
    }
    var textcolor = (color == datas.darkbg) ? datas.hoverMenuButtonColor : datas.darkbg;
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
                    color: datas.white
                },
                bottom: {
                    width: 1,
                    color: datas.white
                },
                right: {
                    width: 1,
                    color: datas.white
                },
                left: {
                    width: 1,
                    color: datas.white
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
