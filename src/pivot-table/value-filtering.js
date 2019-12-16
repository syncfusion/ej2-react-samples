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
var property_pane_1 = require("../common/property-pane");
var ej2_react_pivotview_1 = require("@syncfusion/ej2-react-pivotview");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
var pivotData = require("./pivot-data/Pivot_Data.json");
require("./filtering.css");
/**
 * PivotView Filtering Sample.
 */
/* tslint:disable */
var Pivot_Data = pivotData.data;
var dataSourceSettings = {
    allowValueFilter: true,
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
        { name: 'Amount', caption: 'Sold Amount' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
    rows: [{ name: 'Country' }, { name: 'Products' }],
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    columns: [{ name: 'Year' }],
    dataSource: Pivot_Data,
    expandAll: false
};
var fieldCollections = {};
var operators = ['Equals', 'DoesNotEquals', 'GreaterThan', 'GreaterThanOrEqualTo',
    'LessThan', 'LessThanOrEqualTo', 'Between', 'NotBetween'];
var fields = ['Country', 'Products', 'Year'];
var measures = [
    { value: 'In_Stock', text: 'In Stock' },
    { value: 'Sold', text: 'Units Sold' },
    { value: 'Amount', text: 'Sold Amount' }
];
var measureFields = { text: 'text', value: 'value' };
var pivotObj;
var fieldsddl;
var measuresddl;
var applyBtn;
var operatorddl;
var valueInput1;
var valueInput2;
var ValueFilter = /** @class */ (function (_super) {
    __extends(ValueFilter, _super);
    function ValueFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ValueFilter.prototype.setFilters = function (fieldName, measureName, condition, operand1, operand2) {
        fieldCollections[fieldName] = {
            name: fieldName,
            measure: measureName,
            type: 'Value',
            condition: condition,
            value1: operand1,
            value2: operand2
        };
    };
    ValueFilter.prototype.onClick = function (args) {
        var filterOptions = [];
        filterOptions = [{
                name: fieldsddl.value,
                type: 'Value',
                measure: measuresddl.value,
                condition: operatorddl.value,
                value1: valueInput1.value === null ? '1' : valueInput1.value.toString(),
                value2: valueInput2.value === null ? '1' : valueInput2.value.toString()
            }];
        pivotObj.dataSourceSettings.filterSettings = filterOptions;
    };
    ValueFilter.prototype.onClear = function (args) {
        pivotObj.dataSourceSettings.filterSettings = [];
        valueInput1.value = 0;
        valueInput2.value = 0;
    };
    ValueFilter.prototype.onFieldChange = function (args) {
        if (fieldCollections[args.value]) {
            measuresddl.value = fieldCollections[args.value].measure;
            operatorddl.value = fieldCollections[args.value].condition;
        }
        else {
            this.setFilters(args.value, 'In_Stock', 'DoesNotEquals', '', '');
            operatorddl.value = 'DoesNotEquals';
            measuresddl.value = 'In_Stock';
        }
    };
    ValueFilter.prototype.onMeasureChange = function (args) {
        this.setFilters(fieldsddl.value, args.value, operatorddl.value, valueInput1.value.toString(), valueInput2.value.toString());
    };
    ValueFilter.prototype.onOperatorChange = function (args) {
        if (args.value === 'Between' || args.value === 'NotBetween') {
            document.querySelector('.input2cls').style.display = '';
        }
        else {
            document.querySelector('.input2cls').style.display = 'none';
        }
        this.setFilters(fieldsddl.value, measuresddl.value, args.value, valueInput1.value.toString(), valueInput2.value.toString());
    };
    ValueFilter.prototype.onValue1Change = function (e) {
        this.setFilters(fieldsddl.value, measuresddl.value, operatorddl.value, e.value.toString(), valueInput2.value.toString());
    };
    ValueFilter.prototype.onValue2Change = function (e) {
        this.setFilters(fieldsddl.value, measuresddl.value, operatorddl.value, valueInput1.value.toString(), e.value.toString());
    };
    ValueFilter.prototype.ondataBound = function (args) {
        fieldCollections = {};
        for (var _i = 0, _a = pivotObj.dataSourceSettings.filterSettings; _i < _a.length; _i++) {
            var field = _a[_i];
            fieldCollections[field.name] = field;
        }
    };
    ValueFilter.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section', style: { overflow: 'auto' } },
                React.createElement("div", { className: 'col-lg-8 adaptive' },
                    React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView', ref: function (pivotview) { pivotObj = pivotview; }, dataSourceSettings: dataSourceSettings, width: '100%', height: '300', dataBound: this.ondataBound, gridSettings: { columnWidth: 140 } })),
                React.createElement("div", { className: 'col-lg-4 property-section pivottable-property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", { style: { height: "50px" } },
                                    React.createElement("td", null, "Fields:"),
                                    React.createElement("td", { style: { paddingBottom: '16px' } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (scope) { fieldsddl = scope; }, index: 0, width: '100%', id: "fields", change: this.onFieldChange.bind(this), dataSource: fields })))),
                                React.createElement("tr", { style: { height: "50px" } },
                                    React.createElement("td", null, "Measures:"),
                                    React.createElement("td", { style: { paddingBottom: '16px' } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (scope) { measuresddl = scope; }, index: 0, width: '100%', id: "measures", change: this.onMeasureChange.bind(this), dataSource: measures, fields: measureFields })))),
                                React.createElement("tr", { style: { height: "50px" } },
                                    React.createElement("td", null, "Condition:"),
                                    React.createElement("td", { style: { paddingBottom: '16px' } },
                                        React.createElement("div", { className: 'conditionscls' },
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (scope) { operatorddl = scope; }, value: 'DoesNotEquals', width: '100%', id: "conditions", change: this.onOperatorChange.bind(this), dataSource: operators })))),
                                React.createElement("tr", { className: "input1cls", style: { height: "50px" } },
                                    React.createElement("td", null, "Value 1:"),
                                    React.createElement("td", { style: { paddingBottom: '16px' } },
                                        React.createElement("div", { className: "value1cls" },
                                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: "value1", ref: function (scope) { valueInput1 = scope; }, value: 0, width: '100%', change: this.onValue1Change.bind(this), placeholder: 'Example: 9590' })))),
                                React.createElement("tr", { className: "input2cls", style: { height: "50px", display: "none" } },
                                    React.createElement("td", null, "Value 2:"),
                                    React.createElement("td", { style: { paddingBottom: '16px' } },
                                        React.createElement("div", { className: "value2cls" },
                                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: "value2", ref: function (scope) { valueInput2 = scope; }, value: 0, width: '100%', change: this.onValue2Change.bind(this), placeholder: 'Example: 17500' })))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", { colSpan: 2 },
                                        React.createElement("div", { style: { float: 'right', marginRight: "4px" } },
                                            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'clear', onClick: this.onClear.bind(this) }, "Clear")),
                                        React.createElement("div", { style: { float: 'right', marginRight: "4px" } },
                                            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'apply', ref: function (scope) { applyBtn = scope; }, onClick: this.onClick.bind(this), isPrimary: true }, "Apply"))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates filtering row and column headers based on a specific measure and the grand total. The different conditions that can be applied to the grand total are equals, less than, greater than, between, etc.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this sample, any field can be selected from the",
                    React.createElement("b", null, " Fields"),
                    " dropdown list along with value field from",
                    React.createElement("b", null, " Measures"),
                    " dropdown list to filter. Further, choose an option from the",
                    React.createElement("b", null, " Conditions"),
                    " dropdown list, enter the values in",
                    React.createElement("b", null, " Value1"),
                    " and",
                    React.createElement("b", null, " Value2"),
                    " input textbox and apply the same to view the field headers filtered based on the grand total."),
                React.createElement("p", null,
                    "Value filtering can be applied either through code-behind or UI. To achieve this in code-behind, use the",
                    React.createElement("code", null, " filterSettings"),
                    " object in the pivot table along with the following properties."),
                React.createElement("table", null,
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '10px 0', width: '100px' } },
                            React.createElement("code", null, "name :")),
                        React.createElement("td", null, "Specifies the normal field.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                            React.createElement("code", null, "type :")),
                        React.createElement("td", null, "Specifies the filter type and it should be \"Value\" in this scenario.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                            React.createElement("code", null, "measure :")),
                        React.createElement("td", null, "Specifies the value based field.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                            React.createElement("code", null, "condition :")),
                        React.createElement("td", null, "Specifies the operator type like equals, greater than, less than, etc.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                            React.createElement("code", null, "value1 :")),
                        React.createElement("td", null, "Gets the value to view the filter result. For example, select \"DoesNotEquals\" and enter \"9590\" to exclude the grand total with this value.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                            React.createElement("code", null, "value2 :")),
                        React.createElement("td", null, "For conditions like \"between\" and \"not between\", this option will be enabled. Enter both start and end value to view the filter result. For example, enter \"9590\" and \"17500\" to filter the grand totals within this range."))),
                React.createElement("br", null),
                React.createElement("p", null,
                    "To achieve value filtering through UI, navigate to",
                    React.createElement("b", null, " \"User Interaction > Field List\""),
                    " sample and open the filter dialog. For API details, refer to the",
                    React.createElement("b", null, " \"Field List\""),
                    " sample description."))));
    };
    return ValueFilter;
}(sample_base_1.SampleBase));
exports.ValueFilter = ValueFilter;
