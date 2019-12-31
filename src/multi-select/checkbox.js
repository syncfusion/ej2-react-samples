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
var property_pane_1 = require("../common/property-pane");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
require("./checkbox.css");
var CheckBox = (function (_super) {
    __extends(CheckBox, _super);
    function CheckBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //define the data with category
        _this.countries = [
            { Name: 'Australia', Code: 'AU' },
            { Name: 'Bermuda', Code: 'BM' },
            { Name: 'Canada', Code: 'CA' },
            { Name: 'Cameroon', Code: 'CM' },
            { Name: 'Denmark', Code: 'DK' },
            { Name: 'France', Code: 'FR' },
            { Name: 'Finland', Code: 'FI' },
            { Name: 'Germany', Code: 'DE' },
            { Name: 'Greenland', Code: 'GL' },
            { Name: 'Hong Kong', Code: 'HK' },
            { Name: 'India', Code: 'IN' },
            { Name: 'Italy', Code: 'IT' },
            { Name: 'Japan', Code: 'JP' },
            { Name: 'Mexico', Code: 'MX' },
            { Name: 'Norway', Code: 'NO' },
            { Name: 'Poland', Code: 'PL' },
            { Name: 'Switzerland', Code: 'CH' },
            { Name: 'United Kingdom', Code: 'GB' },
            { Name: 'United States', Code: 'US' }
        ];
        // maps the appropriate column to fields property
        _this.checkFields = { text: 'Name', value: 'Code' };
        return _this;
    }
    // function to handle the CheckBox change event
    CheckBox.prototype.onChange = function (args) {
        // enable or disable the SelectAll in multiselect on CheckBox checked state
        this.mulObj.showSelectAll = args.checked;
    };
    // function to handle the CheckBox change event
    CheckBox.prototype.onChangeDrop = function (args) {
        // enable or disable the Dropdown button in multiselect on CheckBox checked state
        this.mulObj.showDropDownIcon = args.checked;
    };
    // function to handle the CheckBox change event
    CheckBox.prototype.onChangeLimit = function (args) {
        // enable or disable the selection limit in multiselect on CheckBox checked state
        this.mulObj.enableSelectionOrder = args.checked;
    };
    CheckBox.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { id: "multichecbox", className: 'control-pane' },
            React.createElement("div", { className: 'control-section col-lg-8' },
                React.createElement("div", { id: "multigroup", className: "control-styles" },
                    React.createElement("h4", null, "CheckBox"),
                    React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "checkbox", ref: function (scope) { _this.mulObj = scope; }, dataSource: this.countries, fields: this.checkFields, placeholder: "Select countries", mode: "CheckBox", showSelectAll: true, showDropDownIcon: true, filterBarPlaceholder: "Search countries", popupHeight: "350px" },
                        React.createElement(ej2_react_dropdowns_1.Inject, { services: [ej2_react_dropdowns_1.CheckBoxSelection] })))),
            React.createElement("div", { className: 'col-lg-4 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties", className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, label: 'Show Select All', ref: function (scope) { _this.checkboxObj = scope; }, change: this.onChange.bind(this) })))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, label: 'DropDown Button', ref: function (scope) { _this.checkboxObj = scope; }, change: this.onChangeDrop.bind(this) })))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, label: 'Selection Reorder', ref: function (scope) { _this.checkboxObj = scope; }, change: this.onChangeLimit.bind(this) }))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the checkbox functionalities of the MultiSelect. Click the MultiSelect element and then type a character in the search box. It will display the filtered list items based on the typed characters and then select the multiple values through the checkbox.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The MultiSelect has built-in support to select the multiple values through checkbox, when the ",
                    React.createElement("code", null, "mode"),
                    " property is set as ",
                    React.createElement("code", null, "CheckBox"),
                    ". To perform the checkbox feature in MultiSelect, the ",
                    React.createElement("code", null, "CheckBoxSelection"),
                    " module have to be injected in the application end."),
                React.createElement("p", null,
                    "In this sample, the local data is bound to a collection of countries data. Also, provided options for the following:",
                    React.createElement("p", null,
                        " To enable/disable ",
                        React.createElement("code", null, "Select All"),
                        "feature in the property panel."),
                    React.createElement("p", null,
                        " To enable/disable ",
                        React.createElement("code", null, "DropDown Button"),
                        "feature in the property panel."),
                    React.createElement("p", null,
                        " To enable/disable ",
                        React.createElement("code", null, "Selection Reorder"),
                        "feature in the property panel.")),
                React.createElement("p", null, "The checkbox sample illustrates using the countries data. "))));
    };
    return CheckBox;
}(sample_base_1.SampleBase));
exports.CheckBox = CheckBox;
