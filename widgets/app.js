'use strict'

function getCurrentPage(data) {
  switch (data.navigation) {
    case "home":
      console.log("ON PASSE DANS HOME");
      return {
        type: "widget",
        name: "home"
      };
    //for overlay v1
    case "homeWithOverlay":
      return {
        type: "widget",
        name: "homeWithOverlay"
      };
    //end
    case "userInterest":
      return {
        type: "widget",
        name: "userInterest"
      };
    case "userViewed":
      return {
        type: "widget",
        name: "userViewed"
      };
    case "movieInfo":
      return {
        type: "widget",
        name: "movieInfo"
      };
    default:
      return {
        type: "text",
        value: "Something went wrong"
      };
  }
}

module.exports = (data, _props) => {
  return getCurrentPage(data);
}
