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
var sample_base_1 = require("../common/sample-base");
require("./default.css");
var Default = (function (_super) {
    __extends(Default, _super);
    function Default() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Default.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section default badge-samples' },
                React.createElement("div", { className: "sample_container badge-default" },
                    React.createElement("div", { className: "e-btn-group e-custom-button" },
                        React.createElement("button", { id: "update", className: "e-btn" },
                            "Updates",
                            React.createElement("span", { className: "e-badge e-badge-info e-badge-notification e-badge-overlap" }, "14")),
                        React.createElement("button", { id: "task", className: "e-btn" },
                            "Tasks",
                            React.createElement("span", { className: "e-badge e-badge-success e-badge-notification e-badge-overlap" }, "48")),
                        React.createElement("button", { id: "notify", className: "e-btn" },
                            "Notifications",
                            React.createElement("span", { className: "e-badge e-badge-secondary e-badge-notification e-badge-overlap" }, "99"))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates the default functionalities of the badge. To apply the badge, add",
                    React.createElement("code", null, ".e-badge"),
                    " class to the target element.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The Badge is a component which is developed in pure CSS and designed in",
                    React.createElement("code", null, "em"),
                    " relative units, so that badge will always be in relevant to the parent and makes the badge super easy to customize."),
                React.createElement("p", null, "For example, to increase the size of the badge, increase the font-size, width, and height."),
                React.createElement("p", null, "There are 6 different types of badges as follows: "),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        "Default badge: To get the default badge, add the",
                        React.createElement("code", null, ".e-badge"),
                        " class to the target element."),
                    React.createElement("li", null,
                        "Notification badge: To get the notification badge, add the",
                        React.createElement("code", null, ".e-badge-notification"),
                        " class with",
                        React.createElement("code", null, ".e-badge"),
                        " and change the wrapper element to",
                        React.createElement("code", null, "position: relative"),
                        " property."),
                    React.createElement("li", null,
                        "Circle badge: To get the circle badge, add the",
                        React.createElement("code", null, ".e-badge-circle"),
                        " class with",
                        React.createElement("code", null, ".e-badge"),
                        "."),
                    React.createElement("li", null,
                        "Pill badge: To get the pill badge, add the",
                        React.createElement("code", null, ".e-badge-pill"),
                        " class with",
                        React.createElement("code", null, ".e-badge"),
                        "."),
                    React.createElement("li", null,
                        "Dot badge: To get the dot badge, add the",
                        React.createElement("code", null, ".e-badge-dot"),
                        " class with",
                        React.createElement("code", null, ".e-badge"),
                        " and change the wrapper element to",
                        React.createElement("code", null, "position: relative"),
                        " property.")),
                React.createElement("p", null, "The badge component supports two positions, and this is applicable only to notification and dot badge."),
                React.createElement("ul", null,
                    React.createElement("li", null, "Top: It is the default position, so there is no additional class needed for the top position."),
                    React.createElement("li", null,
                        "Bottom: To get the bottom badge, add the",
                        React.createElement("code", null, ".e-.badge-bottom"),
                        " class with",
                        React.createElement("code", null, ".e-badge"),
                        ".")))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
