'use strict'

function getCurrentPage(data) {
  console.log("navigation", data.navigation);
  switch (data.navigation) {
    case "home":
      return {
        type: "widget",
        name: "home"
      };
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

module.exports =
  (data, _props) => {
    return getCurrentPage(data);
  }
