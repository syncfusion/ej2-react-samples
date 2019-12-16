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
require("./button.css");
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //Toggle button click event handler
    Default.prototype.btnClick = function () {
        var proxy = this;
        if (proxy.btnobj.element.classList.contains('e-active')) {
            proxy.btnobj.content = 'Pause';
            proxy.btnobj.iconCss = 'e-btn-sb-icons e-pause-icon';
        }
        else {
            proxy.btnobj.content = 'Play';
            proxy.btnobj.iconCss = 'e-btn-sb-icons e-play-icon';
        }
    };
    Default.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'button-section' },
                    React.createElement("div", { id: 'button-control' },
                        React.createElement("div", { className: 'row' },
                            React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                                React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-primary' }, "Primary")),
                                React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, null, "Normal"))),
                            React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                                React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-outline', isPrimary: true }, "Outline")),
                                React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-flat e-primary' }, "Flat"))),
                            React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                                React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-success' }, "Success")),
                                React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-warning' }, "Warning"))),
                            React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                                React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-danger' }, "Danger")),
                                React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-info' }, "Info"))),
                            React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                                React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-small e-round', iconCss: 'e-btn-sb-icons e-add-icon', isPrimary: true })),
                                React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-flat e-primary', ref: function (scope) { _this.btnobj = scope; }, iconCss: 'e-btn-sb-icons e-play-icon', isToggle: true, onClick: this.btnClick.bind(this) }, "Play"))),
                            React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                                React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-flat e-primary', iconCss: 'e-btn-sb-icons e-open-icon', iconPosition: 'Right' }, "Open")),
                                React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-small' }, "Small"))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the default functionalities of the Button with different types and predefined styles.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "Button is a graphical user interface element that triggers an event on click action. It contains the text, an image, or both."),
                React.createElement("p", null,
                    "In this sample, Play button is a toggle button and it can be enabled by using the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/button/#istoggle" },
                        React.createElement("code", null, "isToggle")),
                    " property. To change the text and icon you should handle click event."),
                React.createElement("p", null,
                    "More information about Button can be found in this ",
                    React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/button/getting-started' }, "documentation section"),
                    "."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
