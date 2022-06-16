'use strict'

const User = require('../classes/User.js');
const userService = require('../services/userService');

/**
 * @param {User} user 
 * @param {*} _props 
 * @returns 
 */
module.exports = (users, _props) => {
  const user = users[0];
  // console.log(user);
  var userData = user.mainData;
  if (!userData) {
    return {
      type: "text",
      value: "Loading"
    }
  } else {
    return getUi(userData.navigation);
  }
}

function getUi(nav) {
  switch (nav) {
    case "home":
      return {
        type: "widget",
        name: "home",
        query: {
          "$find": {
            "_datastore": userService.datastoreName,
            "_id": "@me"
          }
        }
      };
    case "videoInfoUi":
      return {
        type: "widget",
        name: "videoInfoUi"
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