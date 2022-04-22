'use strict'

module.exports = (data, props) => {
    var color = props.array[props.movieId][3];
    var textcolor = (color == data.darkbg) ? data.hoverMenuButtonColor : data.darkbg;
    return {
        type: "actionable",
        onPressed: {
            action: "switchMovieInfoUi",
            props: {
                movieId: props.movieId,
                from: props.from
            }
        },
        onHovered: {
            action: "movieButtonHovered",
            props: {
                movieId: props.movieId,
                listName: props.src
            }
        },
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
                    color: data.white
                },
                bottom: {
                    width: 1,
                    color: data.white
                },
                right: {
                    width: 1,
                    color: data.white
                },
                left: {
                    width: 1,
                    color: data.white
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
                            value: props.buttonText,
                            style: {
                                color: textcolor
                            }
                        }
                    },
                    // ...props.viewWidget
                ]
            }
        }
    }
}
