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
/**
 * Sample for Line Series
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
exports.data1 = [
    { x: '2005', y: 21 }, { x: '2006', y: 60 },
    { x: '2007', y: 45 }, { x: '2008', y: 50 },
    { x: '2009', y: 74 }, { x: '2010', y: 65 },
    { x: '2011', y: 85 }
];
exports.data2 = [
    { x: '2005', y: 21 }, { x: '2006', y: 22 },
    { x: '2007', y: 36 }, { x: '2008', y: 34 },
    { x: '2009', y: 54 }, { x: '2010', y: 55 },
    { x: '2011', y: 60 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }\n        .charts {\n            align :center\n        }";
var DataEdit = (function (_super) {
    __extends(DataEdit, _super);
    function DataEdit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataEdit.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: {
                        valueType: 'Category',
                        minimum: -0.5,
                        maximum: 6.5,
                        labelPlacement: 'OnTicks',
                        majorGridLines: { width: 0 },
                    }, load: this.load.bind(this), primaryYAxis: {
                        rangePadding: 'None',
                        minimum: 0,
                        maximum: 100,
                        interval: 20,
                        title: 'Sales',
                        labelFormat: '{value}%',
                        lineStyle: { width: 0 },
                        majorTickLines: { width: 0 },
                        minorTickLines: { width: 0 }
                    }, chartArea: { border: { width: 0 } }, tooltip: { enable: true }, width: ej2_base_1.Browser.isDevice ? '100%' : '60%', title: 'Sales prediction of products', loaded: this.onChartLoad.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.LineSeries, ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Category, ej2_react_charts_1.DataEditing, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, dragSettings: { enable: true }, xName: 'x', yName: 'y', name: 'Product A', width: 2, marker: { visible: true, width: 10, height: 10 }, type: 'Column', fill: '#00BDAE' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data2, dragSettings: { enable: true }, xName: 'x', yName: 'y', name: 'Product B', width: 2, marker: { visible: true, width: 10, height: 10 }, type: 'Line', fill: '#357CD2' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates data editing feature in chart. Drag and drop the points to change the data values dynamically.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The draggable-points allows data to be moved around the chart. In addition to this, the module fires events such as dragStart, drag and dragComplete."),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use data editing, we need to inject",
                    React.createElement("code", null, "DataEditing"),
                    " module using ",
                    React.createElement("code", null, "Chart.Inject(DataEditing)"),
                    " method."),
                " ",
                React.createElement("br", null),
                React.createElement("p", null,
                    "More information on the Data Editing can be found in this",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation/chart/api-dataEditing.html#properties" }, "documentation section"),
                    "."))));
    };
    DataEdit.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    DataEdit.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    ;
    return DataEdit;
}(sample_base_1.SampleBase));
exports.DataEdit = DataEdit;
