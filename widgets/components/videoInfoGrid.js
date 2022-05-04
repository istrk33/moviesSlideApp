'use strict'

/**
 * the grid used to display characters of a movie tv show in videoInfo view
 * @param {*} data 
 * @param {*} props 
 * @returns 
 */
module.exports = (data, props) => {
    return {
        type: "flex",
        direction: "vertical",
        crossAxisAlignment: "center",
        mainAxisAlignment: "center",
        children: [
            {
                type: "flex",
                padding: {
                    bottom: 1
                },
                children: [
                    {
                        type: "icon",
                        value: "people",
                        size: 25,
                        color: 0xFFFFFFFF,
                    }, {
                        type: "container",
                        padding: {
                            top: 1,
                            bottom: 1,
                            left: 1
                        },
                        child: {
                            type: "text",
                            value: "Acteurs(rices)",
                            style: {
                                color: 0xFFFFFFFF,
                                fontSize: 17
                            }
                        },
                    }
                ]
            },
            {
                type: "container",
                child: {
                    type: "flex",
                    fillParent: true,
                    crossAxisAlignment: "center",
                    mainAxisAlignment: "center",
                    children: [
                        {
                            type: "container",
                            constraints: {
                                maxHeight: 70,
                                maxWidth: 160,
                                minWidth: 160,
                                minHeight: 25,
                            },
                            border: {
                                top: {
                                    color: data.white,
                                    width: 1
                                },
                                bottom: {
                                    color: data.white,
                                    width: 1
                                },
                                left: {
                                    color: data.white,
                                    width: 1
                                },
                                right: {
                                    color: data.white,
                                    width: 1
                                }
                            },
                            child: {
                                type: "flex",
                                direction: "vertical",
                                fillParent: true,
                                crossAxisAlignment: "center",
                                mainAxisAlignment: "center",
                                children: [
                                    {
                                        type: "text",
                                        value: "Acteur(rice)",
                                        style: {
                                            color: 0xFFFFFFFF,
                                            fontSize: 17
                                        }
                                    }
                                ]
                            },
                        },
                        {
                            type: "container",
                            constraints: {
                                maxHeight: 70,
                                maxWidth: 160,
                                minWidth: 160,
                                minHeight: 25,
                            },
                            border: {
                                top: {
                                    color: data.white,
                                    width: 1
                                },
                                bottom: {
                                    color: data.white,
                                    width: 1
                                },
                                left: {
                                    color: data.white,
                                    width: 1
                                },
                                right: {
                                    color: data.white,
                                    width: 1
                                }
                            },
                            child: {
                                type: "flex",
                                direction: "vertical",
                                fillParent: true,
                                crossAxisAlignment: "center",
                                mainAxisAlignment: "center",
                                children: [
                                    {
                                        type: "text",
                                        value: "Rôle",
                                        style: {
                                            color: 0xFFFFFFFF,
                                            fontSize: 17
                                        }
                                    }
                                ]
                            },
                        }
                    ]
                }
            },
            {
                type: "flex",
                children: [
                    {
                        type: "flex",
                        direction: "vertical",
                        fillParent: true,
                        children: [
                            ...props.charactersArray.sort().map(element => {
                                return {
                                    type: "container",
                                    border: {
                                        top: {
                                            color: data.white,
                                            width: 1
                                        },
                                        bottom: {
                                            color: data.white,
                                            width: 1
                                        },
                                        left: {
                                            color: data.white,
                                            width: 1
                                        },
                                        right: {
                                            color: data.white,
                                            width: 1
                                        }
                                    },
                                    child: {
                                        type: "flex",
                                        children: [
                                            {
                                                type: "container",
                                                constraints: {
                                                    maxHeight: 200,
                                                    maxWidth: 160,
                                                    minWidth: 160,
                                                    minHeight: 25,
                                                },
                                                border: {
                                                    left: {
                                                        color: data.white,
                                                        width: 1
                                                    },
                                                    right: {
                                                        color: data.white,
                                                        width: 1
                                                    }
                                                },
                                                child:
                                                {
                                                    type: "flex",
                                                    crossAxisAlignment: "center",
                                                    mainAxisAlignment: "center",
                                                    direction: "vertical",
                                                    children: [
                                                        {
                                                            type: "container",
                                                            padding: {
                                                                top: 1,
                                                                left: 1,
                                                                bottom: 1,
                                                                right: 1
                                                            },
                                                            child:
                                                            {
                                                                type: "text",
                                                                value: element.actor,
                                                                style: {
                                                                    color: 0xFFFFFFFF,
                                                                    fontSize: 17
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                type: "container",
                                                constraints: {
                                                    maxHeight: 200,
                                                    maxWidth: 160,
                                                    minWidth: 160,
                                                    minHeight: 25,
                                                },
                                                border: {
                                                    left: {
                                                        color: data.white,
                                                        width: 1
                                                    },
                                                    right: {
                                                        color: data.white,
                                                        width: 1
                                                    }
                                                },
                                                child:
                                                {
                                                    type: "flex",
                                                    direction: "vertical",
                                                    crossAxisAlignment: "center",
                                                    mainAxisAlignment: "center",
                                                    children: [
                                                        {
                                                            type: "container",
                                                            padding: {
                                                                top: 1,
                                                                left: 1,
                                                                bottom: 1,
                                                                right: 1
                                                            },
                                                            child:
                                                            {
                                                                type: "text",
                                                                value: element.name,
                                                                style: {
                                                                    color: 0xFFFFFFFF,
                                                                    fontSize: 17
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                }
                            })
                        ]
                    }
                ]
            }
        ]
    }
}

