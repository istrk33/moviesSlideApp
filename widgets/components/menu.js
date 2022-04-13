'use strict'

module.exports = (data, props) => {
  var buttonText1 = "";
  var uiName1 = "";
  var icon1 = "";
  var buttonText2 = "";
  var uiName2 = "";
  var icon2 = "";
  if (data.navigation == "home") {
    // buttonText1 = "Mes intérêts";
    // buttonText2 = "Mes films vu";
    uiName1 = "switchInterestUi";
    uiName2 = "switchViewedUi";
    icon1 = "featured_play_list";
    icon2 = "done_all";
  } else if (data.navigation == "userViewed") {
    // buttonText1 = "Mes intérêts";
    // buttonText2 = "Home";
    uiName1 = "switchInterestUi";
    uiName2 = "switchHomeUi";
    icon1 = "featured_play_list";
    icon2 = "home";
  } else {
    // buttonText1 = "Home";
    // buttonText2 = "Mes films vu";
    uiName1 = "switchHomeUi";
    uiName2 = "switchViewedUi";
    icon1 = "home";
    icon2 = "done_all";
  }
  return {
    type: "container",
    decoration: {
      color: 0xFF494949,
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
      // crossAxisAlignment: "center",
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
          padding: {
            left: 0,
            right: 0,
            top: 2,
            bottom: 0
          },
          children: [
            {
              type: 'text',
              value: String(data.totalDurationTime),
              style: {
                fontSize: 20,
                fontWeight: "w700",
                color: 0xFFFFFFFF
              }
            }
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
                color: data.menuHoverButton1Color[0],
                iconColor: data.menuHoverButton1Color[1]
              }
            },
            {
              type: "widget",
              name: "menuButton",
              props: {
                buttonIcon: icon2,
                uiName: uiName2,
                order: "second",
                color: data.menuHoverButton2Color[0],
                iconColor: data.menuHoverButton2Color[1]
              }
            }
          ]
        }
      ]
    }
  }
}

