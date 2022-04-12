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
    icon1="dashboard";
    icon2="done_all";
  } else if (data.navigation == "userViewed") {
    // buttonText1 = "Mes intérêts";
    // buttonText2 = "Home";
    uiName1 = "switchInterestUi";
    uiName2 = "switchHomeUi";
    icon1="dashboard";
    icon2="home";
  } else {
    // buttonText1 = "Home";
    // buttonText2 = "Mes films vu";
    uiName1 = "switchHomeUi";
    uiName2 = "switchViewedUi";
    icon1="home";
    icon2="done_all";
  }
  return {
    type: "container",
    decoration: {
      color: 0xFFFFFFFF,
      boxShadow: {
        blurRadius: 8,
        color: 0x1A000000,
        offset: {
          dx: 0,
          dy: 1
        }
      },
    },
    child: {
      type: "flex",
      fillParent: true,
      mainAxisAlignment: "spaceBetween",
      crossAxisAlignment: "center",
      padding: {
        left: 4,
        right: 4,
        top: 2,
        bottom: 2
      },
      children: [{
        type: 'text',
        value: String(data.totalDurationTime) || "Oups",
        style: {
          fontSize: 20,
          fontWeight: "w700"
        }
      },
      {
        type: 'button',
        text: buttonText1,
        leftIcon:
              {
                type: "icon",
                value: icon1,
                size:20
              },
        onPressed: {
          //Ouvrir une nouvelle vue affichant la liste des films stockés dans la liste/tableau des intérêts
          action: uiName1
        }
      },
      {
        type: 'button',
        text: buttonText2,
        leftIcon:
              {
                type: "icon",
                value: icon2,
                size:20
              },
        onPressed: {
          //Ouvrir une nouvelle vue affichant la liste des films stockés dans la liste/tableau des intérêts
          action: uiName2
        }
      }
      ]
    }
  }
}

