'use strict'

module.exports = (data, props) => {
  return {
    type: "container",
    decoration: {
      color: 0xFFFFFFFF,
      boxShadow: {
        blurRadius: 8,
        color: 0x1A000000,
        offset: {
          dx: 0,
          dy: 1
        }
      },
    },
    child: {
      type: "flex",
      fillParent: true,
      mainAxisAlignment: "spaceBetween",
      crossAxisAlignment: "center",
      padding: {
        left: 4,
        right: 4,
        top: 2,
        bottom: 2
      },
      children: [{
        type: 'text',
        value: props.page || "Oups",
        style: {
            fontSize: 20,
            fontWeight: "w700"
        }
      }]
    }
  }
}

