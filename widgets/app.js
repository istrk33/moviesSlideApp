'use strict'

const User = require('../classes/User.js');
const mainVideosService = require('../services/mainVideosService.js');
const userService = require('../services/userService');
const mainAppVars = "mainAppVars";
/**
 * @param {User} user 
 * @param {*} _props 
 * @returns 
 */
module.exports = (users, _props) => {
  const user = users[0];
  var userData = user.mainData;
  if (!userData) {
    return {
      type: "text",
      value: "Loading"
    }
  } else {
    return getUi(userData.navigation, user);
  }
}

function getUi(nav, user) {
  switch (nav) {
    case "home":
      return {
        type: "widget",
        name: "home",
        query: {
          "$find": {
            "_datastore": mainAppVars,
          }
        },
        props: {
          userData: user
        }
      };
    case "videoInfoUi":
      return {
        type: "widget",
        name: "videoInfoUi",
        query: {
          "$find": {
            "_datastore": mainVideosService.datastoreName
          }
        },
        props: {
          userData: user
        }
      };
    case "userInterestsUi":
      return {
        type: "widget",
        name: "userInterestsUi"
      };
    case "userViewedUi":
      return {
        type: "widget",
        name: "userViewedUi"
      };
  }
}