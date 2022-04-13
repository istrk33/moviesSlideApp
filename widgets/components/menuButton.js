'use strict'

module.exports = (data, props) => {
    var buttonColor = data.menuHoverColor;
    return {
        type: "actionable",
        onPressed: {
            action: props.uiName
        },
        onHovered: {
            action: menuButtonHoverEvent
        },
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
