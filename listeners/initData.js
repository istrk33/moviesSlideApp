'use strict'

module.exports = (data, props, event) => {
  // console.log(__dirname);
  // console.log(__filename);
  if (typeof totalDurationTime !== 'undefined' && userInterests.length != 0 && userViewed.length != 0) {
    return
    data
  } else {
    return {
      navigation: "home",
      totalDurationTime: 0,
      userInterests: ["un","deux","trois","quatre","cinq"],
      userViewed: ["strange","vbt","nwh","spectre","notimetodie"]
    }
  }
}
