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
              "$eq": "general"
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
              "$eq": "general"
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
              "$eq": "general"
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
              "$eq": "general"
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
  if (data[0].element !== undefined || data[0].element != null) {
    return getCurrentPage(data[0].element);
  } else {
    return getCurrentPage(data[0]);
  }
}
