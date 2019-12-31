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
var sample_base_1 = require("../common/sample-base");
require("./Olap.css");
/**
 * PivotView ToolBar Sample Olap.
 */
var dataSourceSettings = {
    catalog: 'Adventure Works DW 2008 SE',
    cube: 'Adventure Works',
    providerType: 'SSAS',
    url: 'https://bi.syncfusion.com/olap/msmdpump.dll',
    enableSorting: true,
    columns: [{ name: '[Product].[Product Categories]', caption: 'Product Categories' }, { name: '[Measures]', caption: 'Measures' }],
    valueSortSettings: { headerDelimiter: ' - ' },
    values: [{ name: '[Measures].[Customer Count]', caption: 'Customer Count' }, { name: '[Measures].[Internet Sales Amount]', caption: 'Internet Sales Amount' }],
    rows: [{ name: '[Customer].[Customer Geography]', caption: 'Customer Geography' }],
    filters: [{ name: '[Date].[Fiscal]', caption: 'Date Fiscal' }],
    filterSettings: [{
            name: '[Date].[Fiscal]', items: ['[Date].[Fiscal].[Fiscal Quarter].&[2002]&[4]', '[Date].[Fiscal].[Fiscal Year].&[2005]'],
            levelCount: 3
        }
    ]
};
var OlapSample = (function (_super) {
    __extends(OlapSample, _super);
    function OlapSample() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toolbarOptions = ['New', 'Save', 'SaveAs', 'Rename', 'Remove', 'Load',
            'Grid', 'Chart', 'MDX', 'Export', 'SubTotal', 'GrandTotal', 'ConditionalFormatting', 'FieldList'];
        return _this;
    }
    OlapSample.prototype.fetchReport = function (args) {
        var reportsCollection = [];
        var reeportsList = [];
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reportsCollection = JSON.parse(localStorage.pivotviewReports);
        }
        reportsCollection.map(function (item) { reeportsList.push(item.reportName); });
        args.reportName = reeportsList;
    };
    OlapSample.prototype.saveReport = function (args) {
        var report = [];
        var isSave = false;
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            report = JSON.parse(localStorage.pivotviewReports);
        }
        if (args.report && args.reportName && args.reportName !== '') {
            report.map(function (item) {
                if (args.reportName === item.reportName) {
                    item.report = args.report;
                    isSave = true;
                }
            });
            if (!isSave) {
                report.push(args);
            }
            localStorage.pivotviewReports = JSON.stringify(report);
        }
    };
    OlapSample.prototype.removeReport = function (args) {
        var reportsCollection = [];
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reportsCollection = JSON.parse(localStorage.pivotviewReports);
        }
        for (var i = 0; i < reportsCollection.length; i++) {
            if (reportsCollection[i].reportName === args.reportName) {
                reportsCollection.splice(i, 1);
            }
        }
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            localStorage.pivotviewReports = JSON.stringify(reportsCollection);
        }
    };
    OlapSample.prototype.loadReport = function (args) {
        var reportsCollection = [];
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reportsCollection = JSON.parse(localStorage.pivotviewReports);
        }
        reportsCollection.map(function (item) {
            if (args.reportName === item.reportName) {
                args.report = item.report;
            }
        });
        if (args.report) {
            this.pivotObj.dataSourceSettings = JSON.parse(args.report).dataSourceSettings;
        }
    };
    OlapSample.prototype.renameReport = function (args) {
        var reportsCollection = [];
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reportsCollection = JSON.parse(localStorage.pivotviewReports);
        }
        reportsCollection.map(function (item) { if (args.reportName === item.reportName) {
            item.reportName = args.rename;
        } });
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            localStorage.pivotviewReports = JSON.stringify(reportsCollection);
        }
    };
    OlapSample.prototype.beforeToolbarRender = function (args) {
        args.customToolbar.splice(6, 0, {
            type: 'Separator'
        });
        args.customToolbar.splice(9, 0, {
            type: 'Separator'
        });
    };
    OlapSample.prototype.newReport = function () {
        this.pivotObj.setProperties({ dataSourceSettings: { columns: [], rows: [], values: [], filters: [] } }, false);
    };
    OlapSample.prototype.chartOnLoad = function (args) {
        var selectedTheme = location.hash.split("/")[1];
        selectedTheme = selectedTheme ? selectedTheme : "Material";
        args.chart.theme =
            selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1);
    };
    OlapSample.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section', id: 'pivot-table-section', style: { overflow: 'initial' } },
                React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView', ref: function (scope) { _this.pivotObj = scope; }, dataSourceSettings: dataSourceSettings, width: '100%', height: '600', showFieldList: true, showGroupingBar: true, gridSettings: { columnWidth: 140 }, allowExcelExport: true, allowConditionalFormatting: true, allowPdfExport: true, showToolbar: true, allowCalculatedField: true, displayOption: { view: 'Both' }, toolbar: this.toolbarOptions, newReport: this.newReport.bind(this), renameReport: this.renameReport.bind(this), removeReport: this.removeReport.bind(this), loadReport: this.loadReport.bind(this), fetchReport: this.fetchReport.bind(this), saveReport: this.saveReport.bind(this), toolbarRender: this.beforeToolbarRender.bind(this), chartSettings: { load: this.chartOnLoad.bind(this) } },
                    React.createElement(ej2_react_pivotview_1.Inject, { services: [ej2_react_pivotview_1.FieldList, ej2_react_pivotview_1.GroupingBar, ej2_react_pivotview_1.CalculatedField, ej2_react_pivotview_1.Toolbar, ej2_react_pivotview_1.PDFExport, ej2_react_pivotview_1.ExcelExport, ej2_react_pivotview_1.ConditionalFormatting] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the rendering of a pivot table bound to an online SSAS OLAP cube as its data source. OLAP cube elements like dimension, hierarchy, measure, and others can be arranged in row, column, value, and slicer axes to create desired views at runtime.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, users can explore all of an OLAP cube and its elements and view the resultant report in a pivot table or pivot chart at runtime. Grouping bar and field list options are included for exploring the data. Along with these, toolbar options are included for switching to the pivot chart, performing report manipulation, and more:"),
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
                        React.createElement("td", null, "Swap between reports within the report collection.")),
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
                            React.createElement("code", null, "Show MDX query:")),
                        React.createElement("td", null, "View the MDX query of the current pivot table that is used to fetch the data from the cube.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                            React.createElement("code", null, "Export:")),
                        React.createElement("td", null, "Provides options to save data in PDF, Excel, and CSV document types.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                            React.createElement("code", null, "Hide subtotals and grand totals:")),
                        React.createElement("td", null, "Hide grand totals and subtotals based on hierarchies in rows and columns.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                            React.createElement("code", null, "Conditional formatting:")),
                        React.createElement("td", null, "Allows user to customize cells base on certain conditions.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                            React.createElement("code", null, "Field List:")),
                        React.createElement("td", null, "Provides option to alter the report dynamically through UI."))))));
    };
    return OlapSample;
}(sample_base_1.SampleBase));
exports.OlapSample = OlapSample;
