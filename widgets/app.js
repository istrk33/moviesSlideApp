'use strict'

module.exports = (data, props) => {
  var fs = require('fs');
  var obj = JSON.parse(fs.readFileSync('../resources/appState.json', 'utf8'));
  data.totalDurationTime=obj[0];
  return {
    type: "flex",
    direction: "vertical",
    fillParent: true,
    crossAxisAlignment: "stretch",
    children: [
      {
        type: "widget",
        name: "menu",
        props: {
          page: "Hello World"
        }
      },
      {
        type: "flexible",
        child: {
          type: 'text',
          value: String(data.totalDurationTime)
        }
      }
    ]
  }
}

