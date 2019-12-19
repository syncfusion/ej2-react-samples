"use strict";
/**
 * Loading API sample
 */
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
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var React = require("react");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
require("./api.css");
var ApiTooltip = (function (_super) {
    __extends(ApiTooltip, _super);
    function ApiTooltip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = ["Click", "Hover", "Auto"];
        return _this;
    }
    ApiTooltip.prototype.onClick = function (args) {
        if (!args.target.classList.contains("e-control") && !args.target.classList.contains("e-btn")) {
            if (!this.tooltip.isSticky && document.getElementsByClassName("e-tooltip-wrap").length > 0) {
                this.tooltip.close();
            }
        }
    };
    ApiTooltip.prototype.onScroll = function () {
        if (document.getElementsByClassName("e-tooltip-wrap").length > 0) {
            this.tooltip.close();
        }
    };
    ApiTooltip.prototype.created = function () {
        if (document.getElementById("right-pane")) {
            document.getElementById("right-pane").addEventListener("click", this.onClick.bind(this));
            document.getElementById("right-pane").addEventListener("scroll", this.onScroll.bind(this));
        }
    };
    ApiTooltip.prototype.onModeChange = function (args) {
        this.tooltip.close();
        this.tooltip.opensOn = args.value;
    };
    ApiTooltip.prototype.onHeightChange = function (args) {
        this.tooltip.close();
        this.tooltip.height = args.value;
        this.tooltip.refresh(this.tooltip.element);
    };
    ApiTooltip.prototype.onWidthChange = function (args) {
        this.tooltip.close();
        this.tooltip.width = args.value;
        this.tooltip.refresh(this.tooltip.element);
    };
    ApiTooltip.prototype.handleKeyPress = function (args) {
        this.tooltip.close();
        this.tooltip.content = args.currentTarget.value;
    };
    ApiTooltip.prototype.checkboxChange = function (args) {
        this.tooltip.close();
        this.tooltip.isSticky = args.checked;
    };
    ApiTooltip.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { className: "col-lg-8 control-section" },
                    React.createElement(ej2_react_popups_1.TooltipComponent, { created: this.created.bind(this), id: "defaultTooltip", ref: function (t) { return (_this.tooltip = t); }, opensOn: "Click", content: "Tooltip content" },
                        React.createElement(ej2_react_buttons_1.ButtonComponent, null, "Show Tooltip"))),
                React.createElement("div", { className: "col-lg-4 property-section" },
                    React.createElement(property_pane_1.PropertyPane, { title: "Properties" },
                        React.createElement("table", { id: "property", title: "Properties" },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: "50%" } },
                                        React.createElement("div", { className: "userselect" }, "Content")),
                                    React.createElement("td", { style: { width: "50%", paddingRight: "10px" } },
                                        React.createElement("div", null,
                                            React.createElement("input", { id: "value", ref: function (t) { return (_this.text = t); }, onKeyUp: this.handleKeyPress.bind(this), type: "text", className: "e-input", placeholder: "Tooltip content" })))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: "50%" } },
                                        React.createElement("div", { className: "userselect" }, "Height")),
                                    React.createElement("td", { style: { width: "50%", paddingRight: "10px" } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: "height", ref: function (t) { return (_this.height = t); }, value: 45, change: this.onHeightChange.bind(this) })))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: "50%" } },
                                        React.createElement("div", { className: "userselect" }, "Width")),
                                    React.createElement("td", { style: { width: "50%", paddingRight: "10px" } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: "width", ref: function (t) { return (_this.width = t); }, className: "e-input", value: 100, change: this.onWidthChange.bind(this) })))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: "50%" } },
                                        React.createElement("div", { className: "userselect" }, "Open Mode")),
                                    React.createElement("td", { style: { width: "50%", paddingRight: "10px" } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { dataSource: this.data, ref: function (t) { return (_this.ddl = t); }, placeholder: "Select mode", change: this.onModeChange.bind(this), id: "ddlelement" })))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: "50%" } },
                                        React.createElement("div", { className: "userselect" }, "Sticky Mode")),
                                    React.createElement("td", { style: { width: "50%", paddingRight: "10px" } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "sticky", ref: function (t) { return (_this.sticky = t); }, change: this.checkboxChange.bind(this) }))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates how to customize the tooltip component by using its properties from the property pane. Select any combination of properties from the property pane to customize tooltips.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this demo, the default tooltip is rendered with minimal configuration. This sample can be customized further with the combination of tooltip properties from the property pane. For example,"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        "Any change made to a textbox in the property pane will be reflected in the tooltip",
                        React.createElement("a", { href: "https://ej2.syncfusion.com/documentation/tooltip/api-tooltip.html#content" }, "content")),
                    React.createElement("li", null,
                        React.createElement("a", { href: "https://ej2.syncfusion.com/documentation/tooltip/api-tooltip.html?lang=typescript#issticky" }, "StickyMode"),
                        "can be enabled by checking the sticky mode option in the property pane."),
                    React.createElement("li", null,
                        React.createElement("a", { href: "https://ej2.syncfusion.com/documentation/tooltip/api-tooltip.html?lang=typescript#height" }, "Height"),
                        "and",
                        React.createElement("a", { href: "https://ej2.syncfusion.com/documentation/tooltip/api-tooltip.html?lang=typescript#width" }, "width"),
                        "can be changed from the property pane."),
                    React.createElement("li", null,
                        React.createElement("a", { href: "https://ej2.syncfusion.com/documentation/tooltip/api-tooltip.html?lang=typescript#openson" }, "OpenMode"),
                        "can be changed from the property pane.")))));
    };
    return ApiTooltip;
}(sample_base_1.SampleBase));
exports.ApiTooltip = ApiTooltip;
