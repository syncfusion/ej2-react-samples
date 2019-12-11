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
var sample_base_1 = require("../common/sample-base");
var pivotData = require("./pivot-data/Pivot_Data.json");
/**
 * PivotView Exporting Sample.
 */
var SAMPLE_CSS = "\n.e-pivotview {\n    width: 100%;\n    height: 100%;\n}";
/* tslint:disable */
var Pivot_Data = pivotData.data;
var dataSourceSettings = {
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
        { name: 'Amount', caption: 'Sold Amount' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
    enableSorting: true,
    rows: [{ name: 'Country' }, { name: 'Products' }],
    formatSettings: [{ name: 'Amount', format: 'C' }],
    columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
    dataSource: Pivot_Data,
    expandAll: false
};
var Exporting = /** @class */ (function (_super) {
    __extends(Exporting, _super);
    function Exporting() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.exportType = [
            { value: 'pdf', text: 'PDF' },
            { value: 'excel', text: 'Excel' },
            { value: 'csv', text: 'CSV' }
        ];
        _this.expandMode = [
            { value: 'false', text: 'False' },
            { value: 'true', text: 'True' }
        ];
        return _this;
    }
    Exporting.prototype.onClick = function () {
        if (this.mode.value === 'excel') {
            this.pivotObj.excelExport();
        }
        else if (this.mode.value === 'csv') {
            this.pivotObj.csvExport();
        }
        else {
            this.pivotObj.pdfExport();
        }
    };
    Exporting.prototype.expandModeChange = function (args) {
        this.pivotObj.dataSourceSettings.expandAll = args.checked;
        this.pivotObj.dataBind();
    };
    Exporting.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-lg-8 adaptive' },
                    React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView', ref: function (pivotview) { _this.pivotObj = pivotview; }, dataSourceSettings: dataSourceSettings, allowExcelExport: true, allowPdfExport: true, showFieldList: true, width: '100%', height: '300', gridSettings: { columnWidth: 140 } },
                        React.createElement(ej2_react_dropdowns_1.Inject, { services: [ej2_react_pivotview_1.FieldList] }))),
                React.createElement("div", { className: 'col-lg-4 property-section', style: { paddingRight: 0 } },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", null, "Export Type:")),
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { paddingLeft: 0 } },
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: '160px', id: "etype", value: "pdf", ref: function (d) { return _this.mode = d; }, dataSource: this.exportType, fields: { text: 'text', value: 'value' }, placeholder: "PDF" })))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null),
                                    React.createElement("td", null,
                                        React.createElement("div", { id: "btn-control", style: { float: 'right' } },
                                            React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: this.onClick.bind(this), cssClass: 'e-flat', isPrimary: true }, "Export"))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates client-side exporting of the pivot table to Excel, CSV and PDF formats.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The pivot table supports client-side exporting and exports its data to the Excel, CSV and PDF formats data using the",
                    React.createElement("code", null, "excelExport"),
                    ",",
                    React.createElement("code", null, "csvExport"),
                    " and",
                    React.createElement("code", null, "pdfExport"),
                    " methods."),
                React.createElement("p", null, "Choose the export document type in the dropdown list available inside the property panel and click the export button to export the pivot table to the selected document format."))));
    };
    return Exporting;
}(sample_base_1.SampleBase));
exports.Exporting = Exporting;
