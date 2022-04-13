'use strict'

module.exports = (data, _props, event) => {
    switch (_props.order) {
        case "first":
            if (data.menuHoverButton1Color[0] == data.black) {
                data.menuHoverButton1Color[0] = data.hoverMenuButtonColor;
                data.menuHoverButton1Color[1] = data.black;
            } else {
                data.menuHoverButton1Color[0] = data.black;
                data.menuHoverButton1Color[1] = data.white;
            }
            break;
        case "second":
            if (data.menuHoverButton2Color[0] == data.black) {
                data.menuHoverButton2Color[0] = data.hoverMenuButtonColor;
                data.menuHoverButton2Color[1] = data.black;
            } else {
                data.menuHoverButton2Color[0] = data.black;
                data.menuHoverButton2Color[1] = data.white;
            }
            break;
    }
    return data
}