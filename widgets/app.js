'use strict'

/**
 * 
 * @param {*} data 
 * @returns 
 */
function getCurrentPage(data) {
  switch (data.navigation) {
    case "home":
      return {
        type: "widget",
        name: "home"
      };
    //for overlay v1
    // case "homeWithOverlay":
    //   return {
    //     type: "widget",
    //     name: "homeWithOverlay"
    //   };
    // //end
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

/**
 * 
 * @param {*} data 
 * @param {*} _props 
 * @returns 
 */
module.exports = (data, _props) => {
  return getCurrentPage(data);
}
