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
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
require("./toolbar.css");
var Toolbar = /** @class */ (function (_super) {
    __extends(Toolbar, _super);
    function Toolbar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Toolbar.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: "sample_container badge-toolbar" },
                    React.createElement(ej2_react_navigations_1.ToolbarComponent, { id: "toolbar" },
                        React.createElement("div", null,
                            React.createElement("div", { className: "header" }, "Notification"),
                            React.createElement("div", null,
                                React.createElement("div", { className: "badge-block" },
                                    React.createElement("div", { className: "message icons" }),
                                    React.createElement("span", { className: "e-badge e-badge-primary e-badge-notification e-badge-overlap" }, "35"))),
                            React.createElement("div", null,
                                React.createElement("div", { className: "badge-block" },
                                    React.createElement("div", { className: "user-profile icons" }),
                                    React.createElement("span", { className: "e-badge e-badge-success e-badge-notification e-badge-overlap" }, "28"))),
                            React.createElement("div", null,
                                React.createElement("div", { className: "badge-block" },
                                    React.createElement("div", { className: "love icons" }),
                                    React.createElement("span", { className: "e-badge e-badge-info e-badge-notification e-badge-overlap" }, "98"))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the integration of badges into toolbar component to display mails, requests, etc.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The badge can be integrated into the toolbar to display the notifications of custom buttons to users. Here, SVG icons use the target for badge elements to display notifications."))));
    };
    return Toolbar;
}(sample_base_1.SampleBase));
exports.Toolbar = Toolbar;
