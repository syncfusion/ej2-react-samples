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
 * Sample for Selection in chart
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var property_pane_1 = require("../common/property-pane");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
exports.data1 = [
    { x: 'CHN', y: 17 }, { x: 'USA', y: 19 },
    { x: 'IDN', y: 29 }, { x: 'JAP', y: 13 },
    { x: 'BRZ', y: 24 }
];
exports.data2 = [
    { x: 'CHN', y: 54 }, { x: 'USA', y: 67 },
    { x: 'IDN', y: 65 }, { x: 'JAP', y: 61 },
    { x: 'BRZ', y: 68 }
];
exports.data3 = [
    { x: 'CHN', y: 9 }, { x: 'USA', y: 14 },
    { x: 'IDN', y: 6 }, { x: 'JAP', y: 26 },
    { x: 'BRZ', y: 8 }
];
var SelectionChart = /** @class */ (function (_super) {
    __extends(SelectionChart, _super);
    function SelectionChart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.droplist = [
            { value: 'Point' },
            { value: 'Series' },
            { value: 'Cluster' }
        ];
        _this.previousType = 'Point';
        return _this;
        // custom code end
    }
    SelectionChart.prototype.change = function () {
        this.chartInstance.selectionMode = this.dropElement.value;
        this.chartInstance.dataBind();
    };
    SelectionChart.prototype.check = function () {
        this.chartInstance.isMultiSelect = this.checkElement.checked;
    };
    SelectionChart.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-8' },
                    React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: function (chart) { return _this.chartInstance = chart; }, style: { textAlign: "center" }, primaryXAxis: {
                            title: 'Countries',
                            valueType: 'Category',
                            interval: 1,
                            labelIntersectAction: 'Rotate90'
                        }, primaryYAxis: {
                            title: 'Distribution',
                            labelFormat: '{value}%',
                            interval: 20
                        }, load: this.load.bind(this), title: 'Age Distribution by Country', loaded: this.onChartLoad.bind(this), legendSettings: { visible: true, toggleVisibility: false }, selectionMode: 'Point' },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.Selection, ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Legend, ej2_react_charts_1.Category, ej2_react_charts_1.ScatterSeries] }),
                        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', width: 2, yName: 'y', name: 'Age 0-14', type: 'Column' }),
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data2, xName: 'x', width: 2, yName: 'y', name: 'Age 15-64', type: 'Column' }),
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data3, xName: 'x', width: 2, yName: 'y', name: 'Age 65 & Above', type: 'Column' })))),
                React.createElement("div", { className: 'col-md-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null, "Selection Mode:")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "selmode", change: this.change.bind(this), ref: function (d) { return _this.dropElement = d; }, dataSource: this.droplist, fields: { text: 'value', value: 'value' }, value: "Point" })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '80%' } },
                                    React.createElement("div", null, "Enable MultipleSelection:")),
                                React.createElement("td", { style: { width: '20%' } },
                                    React.createElement("div", null,
                                        React.createElement("input", { type: "checkbox", id: "select", onChange: this.check.bind(this), ref: function (d) { return _this.checkElement = d; } })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample illustrates the selection feature in chart. To select a specific point, click  the point. The selection mode can be changed by changing Selection Mode in panel. ",
                    React.createElement("code", null, "Multiple selection"),
                    " also can be enabled by ",
                    React.createElement("code", null, "Enable MultipleSelection."))),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This sample demonstrates the selection behavior in a chart. Any point or a series can be selected in a chart by clicking or touching the point. We can also select the point while loading chart through ",
                    React.createElement("code", null, "selectedDataIndexes"),
                    " properties. Click to select a point or series, click and drag to enable rectangular selection. Rectangular selection will return the collection point that are selected under the region."),
                React.createElement("p", null, "Tap to select a point or series, double tap and drag to enable rectangular selection in touch enabled devices."),
                React.createElement("p", null,
                    "Chart supports seven mode of selection which can be set using ",
                    React.createElement("code", null, "SelectionMode"),
                    " property."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Series"),
                        " - Select the series in chart."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Point"),
                        " - Select a point in the series ."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Cluster"),
                        " - Select a group of points in the chart."),
                    React.createElement("li", null,
                        React.createElement("code", null, "DragXY"),
                        " - Rectangular selection with respect to both axis."),
                    React.createElement("li", null,
                        React.createElement("code", null, "DragX"),
                        " - Rectangular selection with respect to horizontal axis."),
                    React.createElement("li", null,
                        React.createElement("code", null, "DragY"),
                        " - Rectangular selection with respect to vertical axis."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Lasso"),
                        " - Select free form of selection area points.")),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use selection feature, we need to inject",
                    React.createElement("code", null, "Selection"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."))));
    };
    SelectionChart.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
        chart.setAttribute('align', 'center');
    };
    ;
    // custom code start
    SelectionChart.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    ;
    return SelectionChart;
}(sample_base_1.SampleBase));
exports.SelectionChart = SelectionChart;
