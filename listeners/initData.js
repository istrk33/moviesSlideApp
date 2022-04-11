'use strict'

module.exports = (data, props, event) => {
  console.log(__dirname);
  console.log(__filename);
  if (data) {
    return
    data
  } else {
    return {
      totalDurationTime: 0
    }
  }
}
