const consts= require("../../services/local/appConstsService");

module.exports = (data, props) => {
    return {
        type: "container",
        child:
        {
            type: "flex",
            mainAxisAlignment: "spaceBetween",
            crossAxisAlignment: "center",
            fillParent: true,
            children: [
                {
                    type: "widget",
                    name: "bottomButton",
                    props: {
                        videoType: props.videoType,
                        buttonIcon: "close",
                        buttonStr: "Pas vu",
                        color: consts.bottomButton3Color[0],
                        iconColor: consts.bottomButton3Color[1],
                        action: "bottomButtonClick",
                        videoId: props.videoId,
                        buttonName: "notviewed"
                    }
                },
                {
                    type: "widget",
                    name: "bottomButton",
                    props: {
                        videoType: props.videoType,
                        buttonIcon: "add",
                        buttonStr: "Intéressé",
                        color: consts.bottomButton2Color[0],
                        iconColor: consts.bottomButton2Color[1],
                        action: "bottomButtonClick",
                        videoId: props.videoId,
                        buttonName: "interested"
                    }
                },
                {
                    type: "widget",
                    name: "bottomButton",
                    props: {
                        videoType: props.videoType,
                        buttonIcon: "done",
                        buttonStr: "Vu",
                        color: consts.bottomButton1Color[0],
                        iconColor: consts.bottomButton1Color[1],
                        videoId: props.videoId,
                        action: props.action,
                        buttonName: "viewed"
                    }
                }
            ]
        }
    }
}