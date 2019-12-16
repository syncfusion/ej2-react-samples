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
var ej2_react_layouts_1 = require("@syncfusion/ej2-react-layouts");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
require("./default.component.css");
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cellSpacing = [5, 5];
        _this.count = 8;
        return _this;
    }
    Default.prototype.onCloseIconHandler = function (event) {
        var proxy = this;
        var panel = event.target;
        if (panel.offsetParent) {
            proxy.dashboardObj.removePanel(panel.offsetParent.id);
        }
    };
    Default.prototype.btnClick = function () {
        var proxy = this;
        var panel = [{
                'id': this.count.toString() + '_layout', 'sizeX': 1, 'sizeY': 1, 'row': 0, 'col': 0,
                content: '<span id="close" class="e-close-icon e-clear-icon"></span><div class="text-align">' + this.count.toString() + '</div>'
            }];
        proxy.dashboardObj.addPanel(panel[0]);
        var closeIcon = document.getElementById(this.count.toString() + '_layout').querySelector('.e-clear-icon');
        closeIcon.addEventListener('click', this.onCloseIconHandler.bind(this));
        this.count = this.count + 1;
    };
    Default.prototype.rendereComplete = function () {
        var closeElement = document.querySelectorAll('.e-clear-icon');
        for (var i = 0; i < closeElement.length; i++) {
            closeElement[i].addEventListener('click', this.onCloseIconHandler.bind(this));
        }
    };
    Default.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("div", { id: "default_target", className: "control-section" },
                React.createElement("div", { className: "addContainer" },
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "add", cssClass: "e-info", onClick: this.btnClick.bind(this) }, "Add Panel")),
                React.createElement(ej2_react_layouts_1.DashboardLayoutComponent, { id: "default_dashboard", columns: 5, ref: function (scope) { _this.dashboardObj = scope; }, cellSpacing: this.cellSpacing, allowResizing: true },
                    React.createElement("div", { id: "one", className: "e-panel", "data-row": "0", "data-col": "0", "data-sizeX": "1", "data-sizeY": "1" },
                        React.createElement("span", { id: "close", className: "e-close-icon e-clear-icon" }),
                        React.createElement("div", { className: "e-panel-container" },
                            React.createElement("div", { className: "text-align" }, "0"))),
                    React.createElement("div", { id: "two", className: "e-panel", "data-row": "1", "data-col": "0", "data-sizeX": "1", "data-sizeY": "2" },
                        React.createElement("span", { id: "close", className: "e-close-icon e-clear-icon" }),
                        React.createElement("div", { className: "e-panel-container" },
                            React.createElement("div", { className: "text-align" }, "1"))),
                    React.createElement("div", { id: "three", className: "e-panel", "data-row": "0", "data-col": "1", "data-sizeX": "2", "data-sizeY": "2" },
                        React.createElement("span", { id: "close", className: "e-close-icon e-clear-icon" }),
                        React.createElement("div", { className: "e-panel-container" },
                            React.createElement("div", { className: "text-align" }, "2"))),
                    React.createElement("div", { id: "four", className: "e-panel", "data-row": "2", "data-col": "1", "data-sizeX": "1", "data-sizeY": "1" },
                        React.createElement("span", { id: "close", className: "e-close-icon e-clear-icon" }),
                        React.createElement("div", { className: "e-panel-container" },
                            React.createElement("div", { className: "text-align" }, "3"))),
                    React.createElement("div", { id: "five", className: "e-panel", "data-row": "2", "data-col": "2", "data-sizeX": "2", "data-sizeY": "1" },
                        React.createElement("span", { id: "close", className: "e-close-icon e-clear-icon" }),
                        React.createElement("div", { className: "e-panel-container" },
                            React.createElement("div", { className: "text-align" }, "4"))),
                    React.createElement("div", { id: "six", className: "e-panel", "data-row": "0", "data-col": "3", "data-sizeX": "1", "data-sizeY": "1" },
                        React.createElement("span", { id: "close", className: "e-close-icon e-clear-icon" }),
                        React.createElement("div", { className: "e-panel-container" },
                            React.createElement("div", { className: "text-align" }, "5"))),
                    React.createElement("div", { id: "seven", className: "e-panel", "data-row": "1", "data-col": "3", "data-sizeX": "1", "data-sizeY": "1" },
                        React.createElement("span", { id: "close", className: "e-close-icon e-clear-icon" }),
                        React.createElement("div", { className: "e-panel-container" },
                            React.createElement("div", { className: "text-align" }, "6"))),
                    React.createElement("div", { id: "eight", className: "e-panel", "data-row": "0", "data-col": "4", "data-sizeX": "1", "data-sizeY": "3" },
                        React.createElement("span", { id: "close", className: "e-close-icon e-clear-icon" }),
                        React.createElement("div", { className: "e-panel-container" },
                            React.createElement("div", { className: "text-align" }, "7"))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "The following sample demonstrates the default functionalities of the DashboardLayout component. Click the ",
                    React.createElement("code", null, "Add Panel"),
                    " button to add panels dynamically to the dashboard layout.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The DashboardLayout component provides the capability to arrange, ",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/dashboard-layout#allowresizing", target: "_blank" }, "resize"),
                    " and reorder the panels within the dashboard layout."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
