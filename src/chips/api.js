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
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var React = require("react");
var sample_base_1 = require("../common/sample-base");
require("./api.css");
var data = require("./data.json");
var property_pane_1 = require("../common/property-pane");
var Api = (function (_super) {
    __extends(Api, _super);
    function Api() {
        var _this = _super.call(this) || this;
        _this.data = data;
        _this.colorCss = '';
        _this.outlineCss = '';
        _this.state = {
            cssClass: '',
            avatarIconCss: '',
            avatarText: '',
            trailingIconCss: '',
            leadingIconCss: ''
        };
        return _this;
    }
    // checkbox change handler for chip leading icon
    Api.prototype.iconHandler = function (e) {
        this.setState({ leadingIconCss: e.checked ? 'janet' : '' });
    };
    // drop-down list change handler for chip color
    Api.prototype.colorChange = function (e) {
        this.setState({ cssClass: "e-" + e.value.toLowerCase() + " " + this.outlineCss.trim() });
        this.colorCss = "e-" + e.value.toLowerCase();
    };
    // checkbox change handler for chip outline
    Api.prototype.variantHandler = function (e) {
        this.outlineCss = e.checked ? 'e-outline' : '';
        this.setState({ cssClass: (this.colorCss + " " + this.outlineCss).trim() });
    };
    // drop-down list change handler for chip avatar
    Api.prototype.avatarHandler = function (e) {
        this.setState({ avatarIconCss: (e.value.toLowerCase() === 'icon') ? 'e-icon' : (e.value.toLowerCase() === 'image') ? 'janet' : '', avatarText: (e.value.toLowerCase() === 'letter' ? 'JL' : '') });
    };
    // checkbox change handler for chip trailing icon
    Api.prototype.deleteIconHandler = function (e) {
        this.setState({ trailingIconCss: e.checked ? 'e-dlt-btn' : '' });
    };
    Api.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("div", { className: "col-lg-8 control-section" },
                React.createElement("div", { id: "chip-api-wrapper" },
                    React.createElement(ej2_react_buttons_1.ChipListComponent, { id: "chip", text: "Janet Leverling", cssClass: this.state.cssClass, avatarIconCss: this.state.avatarIconCss, trailingIconCss: this.state.trailingIconCss, avatarText: this.state.avatarText, leadingIconCss: this.state.leadingIconCss }))),
            React.createElement("div", { className: "col-lg-4 property-section", id: "chips-api-property" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties" },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: "50%" } },
                                    React.createElement("div", { className: "userselect" }, "Color")),
                                React.createElement("td", { style: { width: "50%", "paddingRight": "10px" } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "chip-color", dataSource: this.data.ddlData, placeholder: "Select a color", change: this.colorChange.bind(this) })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: "50%" } },
                                    React.createElement("div", { className: "userselect" }, "Leading icon")),
                                React.createElement("td", { style: { width: "50%", paddingRight: "10px" } },
                                    React.createElement("div", { style: { paddingLeft: "0", paddingTop: "0" } },
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "chip-leadingicon", change: this.iconHandler.bind(this) })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: "50%" } },
                                    React.createElement("div", { className: "userselect" }, "Avatar")),
                                React.createElement("td", { style: { width: "50%", paddingRight: "10px" } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "chip-avatar", dataSource: this.data.avatarData, placeholder: "Select an avatar", change: this.avatarHandler.bind(this) })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: "50%" } },
                                    React.createElement("div", { className: "userselect" }, "Trailing icon")),
                                React.createElement("td", { style: { width: "50%", paddingRight: "10px" } },
                                    React.createElement("div", { style: { paddingLeft: "0", paddingTop: "0" } },
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "chip-trailingicon", change: this.deleteIconHandler.bind(this) })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: "50%" } },
                                    React.createElement("div", { className: "userselect" }, "Outline")),
                                React.createElement("td", { style: { width: "50%", paddingRight: "10px" } },
                                    React.createElement("div", { style: { paddingLeft: "0", paddingTop: "0" } },
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "chip-outline", change: this.variantHandler.bind(this) })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates most commonly used API functionalities of chip control from the property pane. Select any combination of properties from the property pane to customize the appearance of chip.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this sample, default chip is rendered with minimal configuration."),
                React.createElement("p", null, "This sample can be customized further with the combination of Chip properties from the property pane. For example,"),
                React.createElement("ul", null,
                    React.createElement("li", null, "Color variant can be changed by selecting the color dropdownlist from property pane."),
                    React.createElement("li", null, "Leading and Trailing icons can be enabled by selecting Leading or Trailing Icon checkbox from property pane."),
                    React.createElement("li", null, "Leading icon can be customized with avatar initials, icons and images from property pane"),
                    React.createElement("li", null, "Outline chip type can be enabled by checking outline checkbox from property pane.")))));
    };
    return Api;
}(sample_base_1.SampleBase));
exports.Api = Api;
