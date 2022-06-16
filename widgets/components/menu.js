module.exports = (data, props) => {
    var datas = data[0].data;
    var uiName1 = "";
    var icon1 = "";
    var uiName2 = "";
    var icon2 = "";
    if (datas.navigation == "home") {
      uiName1 = "switchInterestUi";
      uiName2 = "switchViewedUi";
      icon1 = "featured_play_list";
      icon2 = "done_all";
    } else if (datas.navigation == "userViewed") {
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
    switch (datas.menuTimeLabel) {
      case "tempsPerdu":
        menudisp = functions.computeMenuTime(datas.totalWastedTime);
        break;
      case "tempsAPerdre":
        menudisp = functions.computeMenuTime(datas.potentialWasteTime);
        break;
      case "tempsEconomise":
        menudisp = functions.computeMenuTime(datas.totalSavedTime);
        break;
    }
    return {
      type: "container",
      decoration: {
        color: datas.black,
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
                type:"widget",
                name:"dropMenu"
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
                  color: datas.menuHoverButton1Color[0],
                  iconColor: datas.menuHoverButton1Color[1]
                },
                query: {
                  "$find": {
                    "_datastore": {
                      "$eq": "general"
                    }
                  }
                }
              },
              {
                type: "widget",
                name: "menuButton",
                props: {
                  buttonIcon: icon2,
                  uiName: uiName2,
                  order: "second",
                  color: datas.menuHoverButton2Color[0],
                  iconColor: datas.menuHoverButton2Color[1]
                },
                query: {
                  "$find": {
                    "_datastore": {
                      "$eq": "general"
                    }
                  }
                }
              }
            ]
          }
        ]
      }
    }
  }