const consts = require("../../services/local/appConstsService");

module.exports = (_data, props) => {
    return {
        type: "actionable",
        onPressed: {
            action: "changeMenuLabel",
            props: {
                srcButton: props.srcButton,
            }
        },
        // onHovered: {
        //     action: "dropdownButtonHoverEvent",
        //     props: {
        //         srcButton: props.srcButton
        //     }
        // },
        child: {
            type: "container",
            decoration: {
                color: props.color
            },
            child: {
                type: "flex",
                children: [
                    {
                        type: "icon",
                        value: props.icon,
                        color: props.iconColor,
                        size: 25
                    },
                    {
                        type: "container",
                        padding: {
                            top: 1,
                            left: 1,
                        },
                        child: {
                            type: "text",
                            value: props.buttonText,
                            style: {
                                color: props.iconColor
                            }
                        }
                    },
                ]
            }
        }
    }
}
