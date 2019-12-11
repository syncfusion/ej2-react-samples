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
var ej2_react_pivotview_1 = require("@syncfusion/ej2-react-pivotview");
var data_source_1 = require("./data-source");
var sample_base_1 = require("../common/sample-base");
require("./tool-bar.css");
/**
 * PivotView Toolbar Sample
 */
var dataSourceSettings = {
    enableSorting: true,
    columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
    rows: [{ name: 'Country' }, { name: 'Products' }],
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    dataSource: data_source_1.Pivot_Data,
    expandAll: false,
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
        { name: 'Amount', caption: 'Sold Amount' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }]
};
var PivotToolbar = /** @class */ (function (_super) {
    __extends(PivotToolbar, _super);
    function PivotToolbar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toolbarOptions = ['New', 'Save', 'SaveAs', 'Rename', 'Remove', 'Load',
            'Grid', 'Chart', 'Export', 'SubTotal', 'GrandTotal', 'ConditionalFormatting', 'FieldList'];
        return _this;
    }
    PivotToolbar.prototype.saveReport = function (args) {
        var reports = [];
        var isSaved = false;
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reports = JSON.parse(localStorage.pivotviewReports);
        }
        if (args.report && args.reportName && args.reportName !== '') {
            reports.map(function (item) {
                if (args.reportName === item.reportName) {
                    item.report = args.report;
                    isSaved = true;
                }
            });
            if (!isSaved) {
                reports.push(args);
            }
            localStorage.pivotviewReports = JSON.stringify(reports);
        }
    };
    PivotToolbar.prototype.fetchReport = function (args) {
        var reportCollection = [];
        var reeportList = [];
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reportCollection = JSON.parse(localStorage.pivotviewReports);
        }
        reportCollection.map(function (item) { reeportList.push(item.reportName); });
        args.reportName = reeportList;
    };
    PivotToolbar.prototype.loadReport = function (args) {
        var reportCollection = [];
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reportCollection = JSON.parse(localStorage.pivotviewReports);
        }
        reportCollection.map(function (item) {
            if (args.reportName === item.reportName) {
                args.report = item.report;
            }
        });
        if (args.report) {
            this.pivotObj.dataSourceSettings = JSON.parse(args.report).dataSourceSettings;
        }
    };
    PivotToolbar.prototype.removeReport = function (args) {
        var reportCollection = [];
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reportCollection = JSON.parse(localStorage.pivotviewReports);
        }
        for (var i = 0; i < reportCollection.length; i++) {
            if (reportCollection[i].reportName === args.reportName) {
                reportCollection.splice(i, 1);
            }
        }
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            localStorage.pivotviewReports = JSON.stringify(reportCollection);
        }
    };
    PivotToolbar.prototype.renameReport = function (args) {
        var reportCollection = [];
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reportCollection = JSON.parse(localStorage.pivotviewReports);
        }
        reportCollection.map(function (item) { if (args.reportName === item.reportName) {
            item.reportName = args.rename;
        } });
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            localStorage.pivotviewReports = JSON.stringify(reportCollection);
        }
    };
    PivotToolbar.prototype.newReport = function () {
        this.pivotObj.setProperties({ dataSourceSettings: { columns: [], rows: [], values: [], filters: [] } }, false);
    };
    PivotToolbar.prototype.beforeToolbarRender = function (args) {
        args.customToolbar.splice(6, 0, {
            type: 'Separator'
        });
        args.customToolbar.splice(9, 0, {
            type: 'Separator'
        });
    };
    PivotToolbar.prototype.chartOnLoad = function (args) {
        var selectedTheme = location.hash.split("/")[1];
        selectedTheme = selectedTheme ? selectedTheme : "Material";
        args.chart.theme =
            selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1);
    };
    PivotToolbar.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section', id: 'pivot-table-section', style: { overflow: 'initial' } },
                React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView', ref: function (scope) { _this.pivotObj = scope; }, dataSourceSettings: dataSourceSettings, width: '100%', height: '300', showFieldList: true, gridSettings: { columnWidth: 140 }, allowExcelExport: true, allowConditionalFormatting: true, allowPdfExport: true, showToolbar: true, allowCalculatedField: true, displayOption: { view: 'Both' }, toolbar: this.toolbarOptions, newReport: this.newReport.bind(this), renameReport: this.renameReport.bind(this), removeReport: this.removeReport.bind(this), loadReport: this.loadReport.bind(this), fetchReport: this.fetchReport.bind(this), saveReport: this.saveReport.bind(this), toolbarRender: this.beforeToolbarRender.bind(this), chartSettings: { load: this.chartOnLoad.bind(this) } },
                    React.createElement(ej2_react_pivotview_1.Inject, { services: [ej2_react_pivotview_1.FieldList, ej2_react_pivotview_1.CalculatedField, ej2_react_pivotview_1.Toolbar, ej2_react_pivotview_1.PDFExport, ej2_react_pivotview_1.ExcelExport, ej2_react_pivotview_1.ConditionalFormatting] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the toolbar options of the pivot table. The options include report manipulations like create, save, save as, rename and delete, show or hide subtotals and grand totals, conditional formatting, and exporting in the pivot table and pivot chart.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this sample, users can generate a report at runtime, as well as save and load them. Save and load operations are performed in localStorage (session storage) using the ",
                    React.createElement("b", null, "saveReport"),
                    " and ",
                    React.createElement("b", null, "loadReport"),
                    " events. Users can change the pivot table or pivot chart view using the toggle option. Other toolbar options available are:"),
                React.createElement("table", null,
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '10px 0', width: '230px;' } },
                            React.createElement("code", null, "Create new report:")),
                        React.createElement("td", null, "Allows user to create new reports at runtime.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                            React.createElement("code", null, "Rename report:")),
                        React.createElement("td", null, "Allows user to change current report name dynamically through UI.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                            React.createElement("code", null, "Remove report:")),
                        React.createElement("td", null, "Allows user to remove current report from the report collection at runtime.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                            React.createElement("code", null, "Save as option:")),
                        React.createElement("td", null, "Allows user to save report locally in browser memory.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                            React.createElement("code", null, "Report list:")),
                        React.createElement("td", null, "Allows user to swap between the reports within the report collection.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                            React.createElement("code", null, "Pivot Table:")),
                        React.createElement("td", null, "Allows user to view data in cross-tabulation format.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                            React.createElement("code", null, "Pivot Chart and its types:")),
                        React.createElement("td", null, "Allows user to view data in graphical format. The chart types include column, bar, line, area, etc.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                            React.createElement("code", null, "Export:")),
                        React.createElement("td", null, "Provides options to save data in PDF, Excel, and CSV document types.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                            React.createElement("code", null, "Hide subtotals and grand totals:")),
                        React.createElement("td", null, "Allows user to hide grand totals and subtotals (based on fields) in row and column.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                            React.createElement("code", null, "Conditional formatting:")),
                        React.createElement("td", null, "Allows user to customize cells base on certain conditions.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                            React.createElement("code", null, "Field List:")),
                        React.createElement("td", null, "Provides option to alter the report dynamically through UI."))))));
    };
    return PivotToolbar;
}(sample_base_1.SampleBase));
exports.PivotToolbar = PivotToolbar;
