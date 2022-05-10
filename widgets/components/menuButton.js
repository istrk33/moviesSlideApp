'use strict'

/**
 * button display on the top menu at the right
 * @param {*} data 
 * @param {*} props 
 * @returns 
 */
module.exports = (data, props) => {
    return {
        type: "actionable",
        onPressed: {
            action: props.uiName
        },
        // onHovered: {
        //     action: "menuButtonHoverEvent",
        //     props: {
        //         order: props.order
        //     }
        // },
        child: {
            type: "container",
            decoration: {
                color: props.color
            },
            constraints: {
                minHeight: 45,
                maxHeight: 45,
                minWidth: 80,
                maxWidth: 100
            },
            child: {
                type: "flex",
                mainAxisAlignment: "center",
                padding: {
                    left: 0,
                    right: 0,
                    top: 1.5,
                    bottom: 0
                },
                children: [
                    {
                        type: "icon",
                        value: props.buttonIcon,
                        color: props.iconColor,
                        size: 20
                    },
                ]
            }
        }
    }
}
