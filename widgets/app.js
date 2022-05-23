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
  console.log("siuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");/*try {
    nonExistentFunction();
  } catch (error) {
    console.error(error);
    // expected output: ReferenceError: nonExistentFunction is not defined
    // Note - error messages will vary depending on browser
  }*/
  var nav = (data.length == 0) ? "firstUi" : (data[0].navigation === undefined) ? data[0].data.navigation : data[0].navigation;
  var page = getCurrentPage(nav);
  return page;
}
