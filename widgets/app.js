'use strict'

/**
 * 
 * @param {*} data 
 * @returns 
 */
function getCurrentPage(navigation) {
  switch (navigation) {
    case "home":
      return {
        type: "widget",
        name: "home",
        query: {
          "$find": {
            "_datastore": {
              "$eq": "vars"
            }
          }
        }
      };
    case "firstUi":
      return {
        type: "widget",
        name: "firstUi",
        query: {
          "$find": {
            "_datastore": {
              "$eq": "vars"
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
              "$eq": "vars"
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
              "$eq": "vars"
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
              "$eq": "vars"
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
  console.log("SIUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU");
  var page = (data[0].data != null || data[0].data !== undefined) ? getCurrentPage(data[0].data.navigation) : getCurrentPage(data[0].navigation);
  console.log("SIUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU");
  return page;
}
