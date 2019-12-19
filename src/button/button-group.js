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
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./button-group.css");
var ButtonGroup = (function (_super) {
    __extends(ButtonGroup, _super);
    function ButtonGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonGroup.prototype.rendereComplete = function () {
        // To enable ripple in checkbox/radio type ButtonGroup.
        var buttons = document.querySelectorAll('label.e-btn');
        var button;
        for (var i = 0; i < buttons.length; i++) {
            button = buttons.item(i);
            ej2_base_1.rippleEffect(button, { selector: '.e-btn' });
        }
    };
    ButtonGroup.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "control-section button-group-container" },
                React.createElement("div", { className: "button-group-section" },
                    React.createElement("div", { id: "button-group-control" },
                        React.createElement("div", { className: "row" },
                            React.createElement("p", { className: "h5" }, "Default"),
                            React.createElement("div", { id: "bgicon", className: "e-btn-group" },
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { iconCss: 'bg-icons e-btngrp-watch' }),
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { iconCss: 'bg-icons e-btngrp-star' }),
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { iconCss: 'bg-icons e-btngrp-download' }))),
                        React.createElement("div", { className: "row" },
                            React.createElement("p", { className: "h5" }, "Single selection"),
                            React.createElement("div", { id: "text", className: "e-btn-group" },
                                React.createElement("input", { type: "radio", id: "left", name: "align", value: "left" }),
                                React.createElement("label", { className: "e-btn", htmlFor: "left" }, "Left"),
                                React.createElement("input", { type: "radio", id: "center", name: "align", value: "center", disabled: true }),
                                React.createElement("label", { className: "e-btn", htmlFor: "center" }, "Center"),
                                React.createElement("input", { type: "radio", id: "right", name: "align", value: "right" }),
                                React.createElement("label", { className: "e-btn", htmlFor: "right" }, "Right"))),
                        React.createElement("div", { className: "row" },
                            React.createElement("p", { className: "h5" }, "Multiple selection"),
                            React.createElement("div", { id: "iconandtext", className: "e-btn-group" },
                                React.createElement("input", { type: "checkbox", id: "bold", name: "fontstyle", value: "bold", checked: true }),
                                React.createElement("label", { className: "e-btn", htmlFor: "bold" },
                                    React.createElement("span", { className: "e-btn-icon bg-icons e-btngrp-bold e-icon-left" }),
                                    "Bold"),
                                React.createElement("input", { type: "checkbox", id: "italic", name: "fontstyle", value: "italic" }),
                                React.createElement("label", { className: "e-btn", htmlFor: "italic" },
                                    React.createElement("span", { className: "e-btn-icon bg-icons e-btngrp-italic e-icon-left" }),
                                    "Italic"),
                                React.createElement("input", { type: "checkbox", id: "underline", name: "fontstyle", value: "underline" }),
                                React.createElement("label", { className: "e-btn", htmlFor: "underline" },
                                    React.createElement("span", { className: "e-btn-icon bg-icons e-btngrp-underline e-icon-left" }),
                                    "Underline")))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "The following sample demonstrates the default functionalities of normal, radio, and checkbox button groups.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "ButtonGroup is a graphical user interface that groups series of buttons horizontally or vertically. This supports radio and checkbox type behaviors."),
                React.createElement("p", null, "The above sample demonstrates the behaviors of button groups with icon only, text only, and text with icon combinations."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("b", null, "Default:"),
                        " Triggers action on button click."),
                    React.createElement("li", null,
                        React.createElement("b", null, "Single selection:"),
                        " Radio type behavior selects a single button and submits its value to the server on form submission.This is showcased with the second button disabled, by default"),
                    React.createElement("li", null,
                        React.createElement("b", null, "Multiple selection:"),
                        " Checkbox type behavior selects multiple buttons and submits its selected values to the server on form submission. This is showcased with the first button selected, by default.")),
                React.createElement("p", null,
                    "More information on ButtonGroup can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/button-group/getting-started" }, "documentation section"),
                    "."))));
    };
    return ButtonGroup;
}(sample_base_1.SampleBase));
exports.ButtonGroup = ButtonGroup;
