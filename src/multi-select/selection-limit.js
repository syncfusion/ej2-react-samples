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
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
require("./checkbox.css");
var data = require("./dataSource.json");
var SelectionLimit = (function (_super) {
    __extends(SelectionLimit, _super);
    function SelectionLimit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.temp = 'countries';
        //define the data with category
        _this.countries = data[_this.temp];
        // maps the appropriate column to fields property
        _this.checkFields = { text: 'Name', value: 'Code' };
        return _this;
    }
    SelectionLimit.prototype.applyRange = function () {
        var value = parseFloat(document.getElementById('length').value);
        this.mulObj.value = null;
        this.mulObj.maximumSelectionLength = value;
    };
    SelectionLimit.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { id: "multichecbox", className: 'control-pane' },
            React.createElement("div", { className: 'control-section col-lg-8' },
                React.createElement("div", { id: "multigroup", className: "control-styles" },
                    React.createElement("h4", null, "Selection Limit"),
                    React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "checkbox", ref: function (scope) { _this.mulObj = scope; }, dataSource: this.countries, fields: this.checkFields, placeholder: "Select countries", mode: "CheckBox", showDropDownIcon: true, maximumSelectionLength: 3, filterBarPlaceholder: "Search countries", popupHeight: "350px" },
                        React.createElement(ej2_react_dropdowns_1.Inject, { services: [ej2_react_dropdowns_1.CheckBoxSelection] })))),
            React.createElement("div", { className: 'col-lg-4 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties", className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", null, "Selection Limit ")),
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: 'length', format: "n0", max: this.countries.length, value: 3, min: 1 })))),
                        React.createElement("tr", null,
                            React.createElement("td", null),
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "buttonApply", cssClass: 'e-btn e-control e-outline', style: { marginBottom: '10px', marginLeft: '100px' }, onClick: this.applyRange.bind(this) }, "Apply"))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the maximum selection limit functionalities with checkbox of the MultiSelect. MultiSelect value can set restrictions based on the maximum selection length that can be selected.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The MultiSelect has built-in support to limit the value selected in Multiselect component, when the ",
                    React.createElement("code", null, "maximumSelectionLength"),
                    "        property is set as ",
                    React.createElement("code", null, "3"),
                    ", maximum of only 3 value will be selected in the MultiSelect."),
                React.createElement("p", null, "The selection limit sample illustrates using the countries data."))));
    };
    return SelectionLimit;
}(sample_base_1.SampleBase));
exports.SelectionLimit = SelectionLimit;
