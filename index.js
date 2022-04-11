'use strict'
// Widgets

module.exports = () => {
  return {
    widgets: {
      app: require('./widgets/app'),
      menu: require('./widgets/menu')
      // first entrance
      // already entered into the app
    },
    listeners: {
      InitData: require('./listeners/initData')
      // resetTextfield: require('./listeners/resetTextfield')
    },
    resources:{
      appState: require('./resources/appState.json')
    },
    rootWidget: 'app'
  }
}
