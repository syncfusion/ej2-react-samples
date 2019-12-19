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
var data = require("./dataSource.json");
var Grouping = (function (_super) {
    __extends(Grouping, _super);
    function Grouping() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.temp = 'vegetableData';
        //define the data with category
        _this.vegetableData = data[_this.temp];
        // map the groupBy field with category column
        _this.groupFields = { groupBy: 'Category', text: 'Vegetable', value: 'Id' };
        return _this;
    }
    Grouping.prototype.render = function () {
        return (React.createElement("div", { id: 'multigroup', className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { id: "ms-multigroup", className: "control-styles" },
                    React.createElement("h4", null, "Grouping"),
                    React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "grouping", dataSource: this.vegetableData, fields: this.groupFields, placeholder: "Select vegetables" }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the grouping functionalities of the MultiSelect. Type a character in the MultiSelect element or click on this element to choose one or more items from the categorized list.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The MultiSelect allows to group the relevant items under a corresponding category by mapping the ",
                    React.createElement("code", null, "groupBy"),
                    " field, and allows to load the list items with icons."),
                React.createElement("p", null, "The grouping sample illustrates how the vegetables are grouped based on its category."),
                React.createElement("p", null,
                    "More information on the grouping feature configuration can be found in the",
                    React.createElement("a", { href: "http://ej2.syncfusion.com/react/documentation/multi-select/grouping.html", target: "_blank" }, " documentation section"),
                    "."))));
    };
    return Grouping;
}(sample_base_1.SampleBase));
exports.Grouping = Grouping;
