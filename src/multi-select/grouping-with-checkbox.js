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
require("./grouping-with-checkbox.css");
var CheckBoxGrouping = /** @class */ (function (_super) {
    __extends(CheckBoxGrouping, _super);
    function CheckBoxGrouping() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //define the data with category
        _this.vegetables = [
            { "Vegetable": "Cabbage", "Category": "Leafy and Salad", "Id": "item1" },
            { "Vegetable": "Chickpea", "Category": "Beans", "Id": "item2" },
            { "Vegetable": "Garlic", "Category": "Bulb and Stem", "Id": "item3" },
            { "Vegetable": "Green bean", "Category": "Beans", "Id": "item4" },
            { "Vegetable": "Horse gram", "Category": "Beans", "Id": "item5" },
            { "Vegetable": "Nopal", "Category": "Bulb and Stem", "Id": "item6" },
            { "Vegetable": "Onion", "Category": "Bulb and Stem", "Id": "item7" },
            { "Vegetable": "Pumpkins", "Category": "Leafy and Salad", "Id": "item8" },
            { "Vegetable": "Spinach", "Category": "Leafy and Salad", "Id": "item9" },
            { "Vegetable": "Wheat grass", "Category": "Leafy and Salad", "Id": "item10" },
            { "Vegetable": "Yarrow", "Category": "Leafy and Salad", "Id": "item11" }
        ];
        // map the groupBy field with category column
        _this.checkFields = { groupBy: 'Category', text: 'Vegetable', value: 'Id' };
        // set the placeholder to the MultiSelect input
        _this.checkWaterMark = 'Select vegetables';
        // set enableGroupCheckBox value to the Multiselect input
        _this.enableGroupCheckBox = true;
        // set mode value to the multiselect input
        _this.mode = 'CheckBox';
        // set the placeholder to the filter bar
        _this.filterBarPlaceholder = 'Search Vegetables';
        return _this;
    }
    CheckBoxGrouping.prototype.render = function () {
        return (React.createElement("div", { id: "checkboxgroup", className: 'control-pane' },
            React.createElement("div", { className: 'control-section col-lg-12' },
                React.createElement("div", { id: "multigroup", className: "control-styles" },
                    React.createElement("h4", null, "Grouping with CheckBox"),
                    React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "checkbox", dataSource: this.vegetables, filterBarPlaceholder: this.filterBarPlaceholder, fields: this.checkFields, placeholder: this.checkWaterMark, mode: this.mode, showSelectAll: true, enableGroupCheckBox: this.enableGroupCheckBox, showDropDownIcon: true, enableSelectionOrder: false },
                        React.createElement(ej2_react_dropdowns_1.Inject, { services: [ej2_react_dropdowns_1.CheckBoxSelection] })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the grouping functionalities of the MultiSelect in checkbox mode. Clicking the checkbox in group will select all the items grouped under it. Click the MultiSelect element and then type the character in the search box. It will display the filtered list items based on the typed characters and then select the multiple values through the checkbox.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The MultiSelect has built-in support to select the multiple values through the checkbox, when the ",
                    React.createElement("code", null, "mode"),
                    " property is set to ",
                    React.createElement("code", null, "CheckBox"),
                    ". To perform the checkbox feature in MultiSelect, the ",
                    React.createElement("code", null, "CheckBoxSelection"),
                    " module should be injected in the application end."))));
    };
    return CheckBoxGrouping;
}(sample_base_1.SampleBase));
exports.CheckBoxGrouping = CheckBoxGrouping;
