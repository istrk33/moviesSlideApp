const consts = require("../../services/local/appConstsService");

module.exports = (_data, props) => {
  var data = props.data;
  var currentUi = data.navigation;
  var uiName1 = "";
  var icon1 = "";
  var uiName2 = "";
  var icon2 = "";
  if (currentUi == "home") {
    uiName1 = "goToInterestUi";
    uiName2 = "goToViewedUi";
    icon1 = "featured_play_list";
    icon2 = "done_all";
  } else if (currentUi == "userViewed") {
    uiName1 = "goToInterestUi";
    uiName2 = "goToHomeUi";
    icon1 = "featured_play_list";
    icon2 = "home";
  } else {
    uiName1 = "goToHomeUi";
    uiName2 = "goToViewedUi";
    icon1 = "home";
    icon2 = "done_all";
  }
  return {
    type: "container",
    decoration: {
      color: consts.black,
      boxShadow: {
        blurRadius: 8,
        color: 0x1AFFFFFF,
        offset: {
          dx: 0,
          dy: 1
        }
      },
    },
    child:
    {
      type: "flex",
      fillParent: true,
      mainAxisAlignment: "spaceBetween",
      padding: {
        left: 4,
        right: 0,
        top: 0,
        bottom: 0
      },
      children: [
        {
          type: "flex",
          fillParent: true,
          children: [
            {
              type: "widget",
              name: "dropMenuAll",
              props: {
                data: data
              }
            },
          ]
        },
        {
          type: "flex",
          fillParent: true,
          mainAxisAlignment: "spaceEvenly",
          crossAxisAlignment: "center",
          children: [
            {
              type: "widget",
              name: "menuButton",
              props: {
                buttonIcon: icon1,
                uiName: uiName1,
                order: "first",
                color: consts.menuHoverButton1Color[0],
                iconColor: consts.menuHoverButton1Color[1]
              },
            },
            {
              type: "widget",
              name: "menuButton",
              props: {
                buttonIcon: icon2,
                uiName: uiName2,
                order: "second",
                color: consts.menuHoverButton2Color[0],
                iconColor: consts.menuHoverButton2Color[1]
              },
            }
          ]
        }
      ]
    }
  }
}