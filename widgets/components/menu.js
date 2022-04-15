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

  var totalSec = data.totalWastedTime;
  var d = Math.floor(totalSec / (3600 * 24));
  var h = Math.floor(totalSec % (3600 * 24) / 3600);
  var m = Math.floor(totalSec % 3600 / 60);

  var dDisplay = d + "j ";
  var hDisplay = h + "h ";
  var mDisplay = m + "min ";
  // var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";

  var menudisp = totalSec == 0 ? "0j 0h 0min" : dDisplay + " " + hDisplay + " " + mDisplay /*+ " " + sDisplay*/;
  return {
    type: "container",
    decoration: {
      color: data.black,
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
              value: String(menudisp),
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

