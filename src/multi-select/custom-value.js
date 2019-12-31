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
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
require("./style.css");
var CustomTag = (function (_super) {
    __extends(CustomTag, _super);
    function CustomTag() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // define the JSON of data
        _this.gameList = [
            { Id: 'Game1', Game: 'American Football' },
            { Id: 'Game2', Game: 'Badminton' },
            { Id: 'Game3', Game: 'Basketball' },
            { Id: 'Game4', Game: 'Cricket' },
            { Id: 'Game5', Game: 'Football' },
            { Id: 'Game6', Game: 'Golf' },
            { Id: 'Game7', Game: 'Hockey' },
            { Id: 'Game8', Game: 'Rugby' },
            { Id: 'Game9', Game: 'Snooker' },
            { Id: 'Game10', Game: 'Tennis' },
        ];
        // maps the appropriate column to fields property
        _this.fields = { text: "Game", value: "Id" };
        return _this;
    }
    CustomTag.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { id: 'multidefault', className: "control-styles" },
                    React.createElement("h4", null, "Custom Values"),
                    React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "customelement", dataSource: this.gameList, fields: this.fields, mode: "Box", placeholder: "Favorite sports", allowCustomValue: true }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the custom tag functionalities of the MultiSelect. Type a character(s) in the MultiSelect element that are not present in the dataSource, you can select and tag that custom typed characters as new item from the suggestion list.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The MultiSelect allows the user to add a non-present option to the component value when\u00A0the ",
                    React.createElement("code", null, "allowCustomValue"),
                    "\u00A0is enabled. While selecting new custom value the ",
                    React.createElement("code", null, "customValueSelection"),
                    "\u00A0event will be triggered."),
                React.createElement("p", null,
                    " More information on the custom value feature can be found in the",
                    React.createElement("a", { href: "http://ej2.syncfusion.com/react/documentation/multi-select/custom-value.html", target: "_blank" }, " documentation section"),
                    "."))));
    };
    return CustomTag;
}(sample_base_1.SampleBase));
exports.CustomTag = CustomTag;
