"use strict";
/**
 * Loading tooltip menu sample
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
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var React = require("react");
var sample_base_1 = require("../common/sample-base");
require("./tooltip-menu.css");
var TooltipMenu = (function (_super) {
    __extends(TooltipMenu, _super);
    function TooltipMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fields = { text: "Name", iconCss: "icon" };
        _this.data1 = [
            { Name: "WI-FI", id: "1", icon: "wifi" },
            { Name: "Bluetooth", id: "2", icon: "bluetooth" },
            { Name: "SIM cards", id: "3", icon: "sim" }
        ];
        _this.data2 = [
            { Name: "Display", icon: "display" },
            { Name: "Sound", icon: "sound" },
            { Name: "Battery", icon: "battery" },
            { Name: "Users", icon: "user" }
        ];
        _this.data3 = [
            { Name: "Location", icon: "location" },
            { Name: "Security", icon: "security" },
            { Name: "Language", icon: "language" }
        ];
        _this.data = [_this.data1, _this.data2, _this.data3];
        return _this;
    }
    TooltipMenu.prototype.tooltipTemplate = function () {
        return (React.createElement(ej2_react_lists_1.ListViewComponent, { id: "tooltipMenu-list", dataSource: this.listData, fields: this.fields, showIcon: true }));
    };
    TooltipMenu.prototype.onClick = function (args) {
        if (!args.target.parentNode.parentNode.classList.contains("e-toolbar-item")) {
            if (document.getElementsByClassName("e-tooltip-wrap").length > 0) {
                this.tooltip.close();
            }
        }
    };
    TooltipMenu.prototype.onScroll = function () {
        if (document.getElementsByClassName("e-tooltip-wrap").length > 0) {
            this.tooltip.close();
        }
    };
    TooltipMenu.prototype.onBeforeRender = function (args) {
        var data = [{ title: "Wireless & networks" }, { title: "Device" }, { title: "Personal" }];
        for (var i = 0; i < data.length; i++) {
            if (data[i].title === args.target.parentElement.getAttribute("title")) {
                this.tooltip.close();
                this.listData = this.data[i];
            }
        }
    };
    TooltipMenu.prototype.created = function () {
        if (document.getElementById("right-pane")) {
            document.getElementById("right-pane").addEventListener("click", this.onClick.bind(this));
            document.getElementById("right-pane").addEventListener("scroll", this.onScroll.bind(this));
        }
    };
    TooltipMenu.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { className: "col-lg-12 control-section" },
                    React.createElement(ej2_react_popups_1.TooltipComponent, { created: this.created.bind(this), ref: function (t) { return (_this.tooltip = t); }, opensOn: "Click", cssClass: "e-tooltip-menu-settings", beforeRender: this.onBeforeRender.bind(this), target: "#toolbar-menu button", width: 170, tabIndex: 0, id: "tooltip-menu", content: this.tooltipTemplate.bind(this) },
                        React.createElement("div", { className: "toolbarContainer" },
                            React.createElement(ej2_react_navigations_1.ToolbarComponent, { id: "toolbar-menu", width: 387 },
                                React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                                    React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-copy-icon tb-icons", tooltipText: "Wireless & networks", text: "Wireless & networks", overflow: "Hide" }),
                                    React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-copy-icon tb-icons", tooltipText: "Device", text: "Device", overflow: "Hide" }),
                                    React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-copy-icon tb-icons", tooltipText: "Personal", text: "Personal", overflow: "Hide" }))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "In this demo, the Tooltip has been customized to show the list of menu items.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Tooltip has been integrated with Listview component to display the Tooltip menu. With the help of",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/documentation/tooltip/api-tooltip.html?lang=typescript#beforerender" }, "beforeRender"),
                    "event, dataSource for ListView changed and its instance assigned to",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/documentation/tooltip/api-tooltip.html?lang=typescript#content" }, "content"),
                    "of Tooltip to appear like menu. On clicking the Toolbar items, the corresponding Tooltip menu will be opened."))));
    };
    return TooltipMenu;
}(sample_base_1.SampleBase));
exports.TooltipMenu = TooltipMenu;
