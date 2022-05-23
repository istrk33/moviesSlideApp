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
  var nav = (data.length == 0) ? "firstUi" : (data[0].navigation === undefined) ? data[0].data.navigation : data[0].navigation;
  var page = getCurrentPage(nav);
  console.log("SIUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU");
  console.log(nav);
  console.log(page);
  return page;
}
