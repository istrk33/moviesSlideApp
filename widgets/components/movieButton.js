'use strict'

module.exports = (data, props) => {
    return {
        type: "actionable",
        onPressed: {
            action: "switchMovieInfoUi",
            props:{
                movieId:props.movieId,
                from:props.from
            }
        },
        child: {
            type: "container",
            constraints: {
                minHeight: 50,
                maxHeight: 50,
                minWidth: 600,
                maxWidth:600
            },
            child: {
                type: "flex",
                mainAxisAlignment: "start",
                children: [
                    {
                        type: "container",
                        padding: {
                            top:2.5,
                            left:1,
                            right:1
                        },
                        child: {
                            type: "text",
                            value: props.buttonText,
                        }
                    }
                ]
            }
        }
    }
}
