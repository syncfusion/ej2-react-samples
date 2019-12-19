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
require("./icons.css");
var data = require("./dataSource.json");
var Grouping = (function (_super) {
    __extends(Grouping, _super);
    function Grouping() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.temp = 'vegetableData';
        //define the data with category
        _this.vegetableData = data[_this.temp];
        // map the groupBy field with Category column
        _this.groupFields = { groupBy: 'Category', text: 'Vegetable', value: 'Id' };
        _this.tempData = 'socialMedia';
        //define the data with icon class
        _this.socialMediaData = data[_this.tempData];
        // map the iconCss field with Class column
        _this.iconFields = { text: 'SocialMedia', value: 'Id', iconCss: 'Class' };
        return _this;
    }
    Grouping.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section', id: 'dropIcon' },
                React.createElement("div", { className: 'col-lg-6' },
                    React.createElement("div", { id: "group" },
                        React.createElement("h4", null, "Grouping"),
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "vegetables", dataSource: this.vegetableData, fields: this.groupFields, placeholder: "Select a vegetable", popupHeight: "220px" }))),
                React.createElement("div", { className: 'col-lg-6' },
                    React.createElement("div", { id: "icon" },
                        React.createElement("h4", null, " Icons"),
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "icons", dataSource: this.socialMediaData, fields: this.iconFields, placeholder: "Select a social media", popupHeight: "220px" })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the grouping and icons supports of the DropDownList. Click the DropDownList element and select an item from the categorized list/icons list.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The DropDownList allows to group the relevant items under a corresponding category by mapping the ",
                    React.createElement("code", null, "groupBy"),
                    " field, and allows to load the list items with icons."),
                React.createElement("p", null, "The grouping sample illustrates how the vegetables are grouped based on its category."),
                React.createElement("p", null,
                    "The 2nd DropDownList is populated with icons that is rendered by mapping the ",
                    React.createElement("code", null, "iconCss"),
                    " field."),
                React.createElement("p", null,
                    "More information on the grouping feature configuration can be found in the",
                    React.createElement("a", { href: "http://ej2.syncfusion.com/react/documentation/drop-down-list/grouping.html", target: "_blank" }, " documentation section"),
                    "."))));
    };
    return Grouping;
}(sample_base_1.SampleBase));
exports.Grouping = Grouping;
