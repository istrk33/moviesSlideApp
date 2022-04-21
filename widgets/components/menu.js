'use strict'

module.exports = (data, props) => {
  const functions = require("../../resources/functions");
  var uiName1 = "";
  var icon1 = "";
  var uiName2 = "";
  var icon2 = "";
  if (data.navigation == "home") {
    uiName1 = "switchInterestUi";
    uiName2 = "switchViewedUi";
    icon1 = "featured_play_list";
    icon2 = "done_all";
  } else if (data.navigation == "userViewed") {
    uiName1 = "switchInterestUi";
    uiName2 = "switchHomeUi";
    icon1 = "featured_play_list";
    icon2 = "home";
  } else {
    uiName1 = "switchHomeUi";
    uiName2 = "switchViewedUi";
    icon1 = "home";
    icon2 = "done_all";
  }
  var menudisp;
  switch (data.menuTimeLabel) {
    case "tempsPerdu":
      menudisp = functions.computeMenuTime(data.totalWastedTime);
      break;
    case "tempsAPerdre":
      menudisp = functions.computeMenuTime(data.potentialWasteTime);
      break;
    case "tempsEconomise":
      menudisp = functions.computeMenuTime(data.totalSavedTime);
      break;
  }
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
          children: [
            {
              type: "dropdownButton",
              text: String(menudisp),
              icon: {
                type: "icon",
                value: "movie",
                color: 0xFFFFFFFF,
                size: 25
              },
              mainStyle: "tertiary",
              child: {
                type: "menu",
                children: [
                  {
                    type: "flex",
                    direction: "vertical",
                    crossAxisAlignment: "stretch",
                    children: [
                      {
                        type: "widget",
                        name: "dropdownMenuButton",
                        props: {
                          srcButton: "tempsPerdu",
                          icon: "remove_red_eye",
                          buttonText: "Temps Perdu",
                          color: data.dropDownButton1Color[0],
                          iconColor: data.dropDownButton1Color[1]
                        }
                      },
                      {
                        type: "widget",
                        name: "dropdownMenuButton",
                        props: {
                          srcButton: "tempsAPerdre",
                          icon: "watch_later",
                          buttonText: "Temps à Perdre",
                          color: data.dropDownButton2Color[0],
                          iconColor: data.dropDownButton2Color[1]
                        }
                      },
                      {
                        type: "widget",
                        name: "dropdownMenuButton",
                        props: {
                          srcButton: "tempsEconomise",
                          icon: "close",
                          buttonText: "Temps Economisé",
                          color: data.dropDownButton3Color[0],
                          iconColor: data.dropDownButton3Color[1]
                        }
                      },
                      // {
                      //   type: "widget",
                      //   name: "menuButton",
                      //   props: {
                      //     buttonIcon: icon1,
                      //     uiName: uiName1,
                      //     order: "first",
                      //     color: data.menuHoverButton1Color[0],
                      //     iconColor: data.menuHoverButton1Color[1]
                      //   }
                      // },
                      // {
                      //   type: "widget",
                      //   name: "menuButton",
                      //   props: {
                      //     buttonIcon: icon2,
                      //     uiName: uiName2,
                      //     order: "second",
                      //     color: data.menuHoverButton2Color[0],
                      //     iconColor: data.menuHoverButton2Color[1]
                      //   }
                      // }
                    ]
                  }
                ]
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

