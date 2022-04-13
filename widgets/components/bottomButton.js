'use strict'

module.exports = (data, props) => {
    return {
        type: "flexible",
        child:
        {
            type: "container",
            decoration: {
                color: props.color
            },
            child:
            {
                type: "actionable",
                onPressed: {
                    action: "NotViewed"
                },
                onHovered: {
                    action: "bottomButtonHoverEvent",
                    props: {
                        buttonStr: props.buttonStr
                    }
                },
                child: {
                    type: "container",
                    decoration: {
                        color: props.color
                    },
                    constraints: {
                        minHeight: 150,
                        maxHeight: 150,
                        minWidth: 0,
                        maxWidth: 600
                    },
                    padding: {
                        top: 7
                    },
                    child: {
                        type: "flex",
                        mainAxisAlignment: "center",
                        children: [
                            {
                                type: "icon",
                                value: props.buttonIcon,
                                size: 40,
                                color:props.iconColor
                            },
                            // {
                            //     type: "container",
                            //     padding: {
                            //         top: 1
                            //     },
                            //     child: {
                            //         type: "text",
                            //         value: props.buttonStr,
                            //         style: {
                            //             color: 0xFFFFFFFF,
                            //             fontSize: 15
                            //         }
                            //     }
                            // }
                        ]
                    }
                }
            }
        }
    }
}
