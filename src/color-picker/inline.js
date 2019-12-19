"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
require("./inline.css");
var Inline = (function (_super) {
    __extends(Inline, _super);
    function Inline() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // function to handle the ColorPicker change event
    Inline.prototype.change = function (args) {
        document.getElementById('preview').style.backgroundColor = args.currentValue.hex;
    };
    Inline.prototype.rendereComplete = function () {
        if (ej2_base_1.Browser.isDevice) {
            document.getElementById('inline-control').classList.add('e-mobile-control');
        }
    };
    Inline.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'inline control-section' },
                React.createElement("div", { id: 'inline-control' },
                    React.createElement("div", { className: 'row' },
                        React.createElement("div", { id: 'preview' })),
                    React.createElement("div", { id: 'inline-content', className: 'row' },
                        React.createElement("div", { className: 'col-xs-12 col-sm-12 col-lg-6 col-md-6' },
                            React.createElement("h4", null, "Inline Palette"),
                            React.createElement(ej2_react_inputs_1.ColorPickerComponent, { id: 'inline-palette', mode: 'Palette', modeSwitcher: false, inline: true, showButtons: false, change: this.change.bind(this) })),
                        React.createElement("div", { className: 'col-xs-12 col-sm-12 col-lg-6 col-md-6' },
                            React.createElement("h4", null, "Inline Picker"),
                            React.createElement(ej2_react_inputs_1.ColorPickerComponent, { id: 'inline-picker', mode: 'Picker', modeSwitcher: false, inline: true, showButtons: false, change: this.change.bind(this) }))))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This sample demonstrates the inline (flat) mode ColorPicker with different modes and predefined styles.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null, "The ColorPicker component is a user interface to select and adjust color values. This supports various color specifications like RGB (Red Green Blue), HSV (Hue Saturation Value), and Hex codes."),
                React.createElement("p", null, "In this sample,"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        "Color picker/palette is rendered inline by using the inline",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/documentation/api/color-picker/#inline" }, "inline")),
                        " property set to",
                        React.createElement("i", null, "true"),
                        "."),
                    React.createElement("li", null,
                        "Using the",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/documentation/api/color-picker/#mode" }, "mode")),
                        " property, you can specify the mode",
                        React.createElement("i", null, "(Picker/ Palette)"),
                        " of the ColorPicker."),
                    React.createElement("li", null,
                        "Using the",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/documentation/api/color-picker/#showbuttons" }, "showButtons")),
                        " property, you can enable or disable the control",
                        React.createElement("i", null, "(apply/cancel)"),
                        " buttons."),
                    React.createElement("li", null,
                        "To render the 'Palette' / 'Picker' alone you can hide the mode switcher using ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/documentation/api/color-picker/#modeswitcher" }, "modeSwitcher")),
                        " property")),
                React.createElement("p", null,
                    "More information about ColorPicker can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/color-picker/getting-started/#inline-type" }, "documentation section"),
                    "."))));
    };
    return Inline;
}(sample_base_1.SampleBase));
exports.Inline = Inline;
