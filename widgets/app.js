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
        name: "home",
        query: {
          "$find": {
            "_datastore": {
              "$eq": "appData"
            }
          }
        }
      };
    case "userInterest":
      return {
        type: "widget",
        name: "userInterest",
        query: {
          "$find": {
            "_datastore": {
              "$eq": "appData"
            }
          }
        }
      };
    case "userViewed":
      return {
        type: "widget",
        name: "userViewed",
        query: {
          "$find": {
            "_datastore": {
              "$eq": "appData"
            }
          }
        }
      };
    case "movieInfo":
      return {
        type: "widget",
        name: "movieInfo",
        query: {
          "$find": {
            "_datastore": {
              "$eq": "appData"
            }
          }
        }
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
module.exports = async (data, _props) => {
  return getCurrentPage(data[0].general);
}
