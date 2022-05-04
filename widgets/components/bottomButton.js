'use strict'

/**
 * bottom button (not viewed, interest and viewed)
 * @param {*} data 
 * @param {*} props 
 * @returns 
 */
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
                    action: props.action,
                    props: {
                        buttonName: props.buttonName,
                        videoType: props.videoType
                    }
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
                        minHeight: 100,
                        maxHeight: 100,
                        minWidth: 0,
                        maxWidth: 600
                    },
                    padding: {
                        top: 3.5
                    },
                    child: {
                        type: "flex",
                        mainAxisAlignment: "center",
                        children: [
                            {
                                type: "icon",
                                value: props.buttonIcon,
                                size: 40,
                                color: props.iconColor
                            },
                        ]
                    }
                }
            }
        }
    }
}
