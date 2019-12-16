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
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var rData = require("./pivot-data/rData.json");
/**
 * PivotView Aggregation Sample.
*/
/* tslint:disable */
var data = rData.data;
var dataSourceSettings = {
    enableSorting: true,
    formatSettings: [{ name: 'ProCost', format: 'C' }],
    drilledMembers: [{ name: 'EnerType', items: ['Biomass', 'Free Energy'] }],
    columns: [
        { name: 'EnerType', caption: 'Energy Type' },
        { name: 'EneSource', caption: 'Energy Source' }
    ],
    expandAll: false,
    rows: [
        { name: 'Year', caption: 'Production Year' },
        { name: 'HalfYear', caption: 'Half Year' },
        { name: 'Quarter', caption: 'Quarter Year' }
    ],
    values: [
        { name: 'PowUnits', caption: 'Units (GWh)' },
        { name: 'ProCost', caption: 'Cost (MM)' }
    ],
    filters: []
};
var pivotObj;
var SAMPLE_CSS = "\n.e-pivotview {\n    width: 100%;\n    height: 100%;\n}";
var Aggregation = /** @class */ (function (_super) {
    __extends(Aggregation, _super);
    function Aggregation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fields = { text: 'text', value: 'value' };
        _this.mVal = 'Sum';
        _this.qData = [
            { 'value': 'Max', 'text': 'Max' }, { 'value': 'Min', 'text': 'Min' },
            { 'value': 'Count', 'text': 'Count' }, { 'value': 'Sum', 'text': 'Sum' },
            { 'value': 'Avg', 'text': 'Average' }, { 'value': 'DistinctCount', 'text': 'Distinct Count' },
            { 'value': 'Product', 'text': 'Product' }, { 'value': 'Index', 'text': 'Index' },
            { 'value': 'PopulationStDev', 'text': 'Population StDev' }, { 'value': 'SampleStDev', 'text': 'Sample StDev' },
            { 'value': 'RunningTotals', 'text': 'Running Totals' }, { 'value': 'DifferenceFrom', 'text': 'Difference From' },
            { 'value': 'PercentageOfDifferenceFrom', 'text': '% of Difference From' }, { 'value': 'PercentageOfGrandTotal', 'text': '% of Grand Total' },
            { 'value': 'PercentageOfColumnTotal', 'text': '% of Column Total' }, { 'value': 'PercentageOfRowTotal', 'text': '% of Row Total' },
            { 'value': 'PercentageOfParentTotal', 'text': '% of Parent Total' }, { 'value': 'PercentageOfParentColumnTotal', 'text': '% of Parent Column Total' },
            { 'value': 'PercentageOfParentRowTotal', 'text': '% of Parent Row Total' }
        ];
        _this.cData = [
            { 'value': 'Max', 'text': 'Max' }, { 'value': 'Min', 'text': 'Min' },
            { 'value': 'Sum', 'text': 'Sum' }, { 'value': 'Avg', 'text': 'Average' },
            { 'value': 'Product', 'text': 'Product' }, { 'value': 'Index', 'text': 'Index' },
            { 'value': 'PopulationStDev', 'text': 'Population StDev' }, { 'value': 'SampleStDev', 'text': 'Sample StDev' },
            { 'value': 'RunningTotals', 'text': 'Running Totals' }, { 'value': 'DifferenceFrom', 'text': 'Difference From' },
            { 'value': 'PercentageOfDifferenceFrom', 'text': '% of Difference From' }, { 'value': 'PercentageOfGrandTotal', 'text': '% of Grand Total' },
            { 'value': 'PercentageOfColumnTotal', 'text': '% of Column Total' }, { 'value': 'PercentageOfRowTotal', 'text': '% of Row Total' },
            { 'value': 'PercentageOfParentTotal', 'text': '% of Parent Total' }, { 'value': 'PercentageOfParentColumnTotal', 'text': '% of Parent Column Total' },
            { 'value': 'PercentageOfParentRowTotal', 'text': '% of Parent Row Total' }
        ];
        return _this;
    }
    Aggregation.prototype.onLoad = function () {
        if (data[0].Year === undefined) {
            var date = void 0;
            for (var ln = 0, lt = data.length; ln < lt; ln++) {
                date = new Date(data[ln].Date.toString());
                var dtYr = date.getFullYear();
                var dtMn = date.getMonth();
                var dtdv = (dtMn + 1) / 3;
                data[ln].Year = 'FY ' + dtYr;
                data[ln].Quarter = dtdv <= 1 ? 'Q1 ' + ('FY ' + dtYr) : dtdv <= 2 ? 'Q2 ' + ('FY ' + dtYr) :
                    dtdv <= 3 ? 'Q3 ' + ('FY ' + dtYr) : 'Q4 ' + ('FY ' + dtYr);
                data[ln].HalfYear = (dtMn + 1) / 6 <= 1 ? 'H1 ' + ('FY ' + dtYr) : 'H2' + ('FY ' + dtYr);
                delete (data[ln].Date);
            }
        }
        pivotObj.dataSourceSettings.dataSource = data;
    };
    Aggregation.prototype.changeBalance = function (e) {
        this.setSummaryType('PowUnits', e.value);
    };
    Aggregation.prototype.changeQuantity = function (e) {
        this.setSummaryType('ProCost', e.value);
    };
    Aggregation.prototype.setSummaryType = function (fieldName, summaryType) {
        var isAvail = false;
        for (var vCnt = 0; vCnt < pivotObj.dataSourceSettings.values.length; vCnt++) {
            if (pivotObj.dataSourceSettings.values[vCnt].name === fieldName) {
                pivotObj.dataSourceSettings.values[vCnt].type = summaryType;
                isAvail = true;
            }
        }
        if (isAvail) {
            pivotObj.updateDataSource();
        }
    };
    Aggregation.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-lg-9 adaptive' },
                    React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView', ref: function (pivotview) { pivotObj = pivotview; }, load: this.onLoad, dataSourceSettings: dataSourceSettings, showFieldList: true, width: '100%', height: '300', gridSettings: { columnWidth: 140 } },
                        React.createElement(ej2_react_pivotview_1.Inject, { services: [ej2_react_pivotview_1.FieldList] }))),
                React.createElement("div", { className: 'col-lg-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'mode', floatLabelType: 'Auto', placeholder: 'Units', width: '100%', dataSource: this.qData, fields: this.fields, value: this.mVal, change: this.changeBalance.bind(this) })))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'mode', floatLabelType: 'Auto', placeholder: 'Cost', width: '100%', dataSource: this.cData, fields: this.fields, value: this.mVal, change: this.changeQuantity.bind(this) }))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the aggregate types like sum, average, min, max, count, distinct count, and more in the pivot table for quick business analysis. End users can also change the aggregation type of each field bound to the value axis in the field list at runtime.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this sample, you can change the aggregate types for value fields using the dropdown list separately. The aggregate type can be set using the ",
                    React.createElement("code", null, "type"),
                    " property of the value field. The built-in aggregates are:"),
                React.createElement("p", null,
                    React.createElement("code", null, "Sum"),
                    ", ",
                    React.createElement("code", null, "Average"),
                    ", ",
                    React.createElement("code", null, "Min"),
                    ", ",
                    React.createElement("code", null, "Max"),
                    ", ",
                    React.createElement("code", null, "Count"),
                    ", ",
                    React.createElement("code", null, "Distinct Count"),
                    ", ",
                    React.createElement("code", null, "Product"),
                    ",",
                    React.createElement("code", null, "Index"),
                    ", ",
                    React.createElement("code", null, "Population StDev"),
                    ", ",
                    React.createElement("code", null, "Sample StDev"),
                    ", ",
                    React.createElement("code", null, "Population Var"),
                    ", ",
                    React.createElement("code", null, "Sample Var"),
                    ", ",
                    React.createElement("code", null, "Running Totals"),
                    ",",
                    React.createElement("code", null, "Difference From"),
                    ", ",
                    React.createElement("code", null, "% of Difference From"),
                    ", ",
                    React.createElement("code", null, "% of Grand Total"),
                    ", ",
                    React.createElement("code", null, "% of Column Total"),
                    ", ",
                    React.createElement("code", null, "% of Row Total"),
                    ",",
                    React.createElement("code", null, "% of Parent Total"),
                    ", ",
                    React.createElement("code", null, "% of Parent Column Total"),
                    ", ",
                    React.createElement("code", null, "% of Parent Row Total.")),
                React.createElement("p", null,
                    "To achieve aggregation through UI, navigate to ",
                    React.createElement("b", null, "\"User Interaction > Field List\""),
                    " sample and click and open the value field settings menu to experience the same."))));
    };
    return Aggregation;
}(sample_base_1.SampleBase));
exports.Aggregation = Aggregation;
