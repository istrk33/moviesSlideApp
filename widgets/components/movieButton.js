'use strict'

module.exports = (data, props) => {
    var color=props.array[props.movieId][3];
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
                listName:props.src
            }
        },
        child: {
            type: "container",
            constraints: {
                minHeight: props.height,
                maxHeight: props.height,
                minWidth: props.width,
                maxWidth: props.width
            },
            decoration: {
                color: color
            },
            child: {
                type: "flex",
                mainAxisAlignment: "spaceBetween",
                children: [
                    {
                        type: "container",
                        padding: {
                            top: 2.5,
                            left: 1,
                            right: 1
                        },
                        child: {
                            type: "text",
                            value: props.buttonText,
                            style: {
                                color: textcolor
                            }
                        }
                    },
                    // ...props.viewWidget.map(element=>{
                    //     return {
                    //         element
                    //     }
                    // })
                    ...props.viewWidget
                ]
            }
        }
    }
}
