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
 * Sample for Range Selection in chart
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var property_pane_1 = require("../common/property-pane");
exports.data = [{ x: 1971, y: 50 }, { x: 1972, y: 20 }, { x: 1973, y: 63 }, { x: 1974, y: 81 }, { x: 1975, y: 64 },
    { x: 1976, y: 36 }, { x: 1977, y: 22 }, { x: 1978, y: 78 }, { x: 1979, y: 60 }, { x: 1980, y: 41 },
    { x: 1981, y: 62 }, { x: 1982, y: 56 }, { x: 1983, y: 96 }, { x: 1984, y: 48 }, { x: 1985, y: 23 },
    { x: 1986, y: 54 }, { x: 1987, y: 73 }, { x: 1988, y: 56 }, { x: 1989, y: 67 }, { x: 1990, y: 79 },
    { x: 1991, y: 18 }, { x: 1992, y: 78 }, { x: 1993, y: 92 }, { x: 1994, y: 43 }, { x: 1995, y: 29 },
    { x: 1996, y: 14 }, { x: 1997, y: 85 }, { x: 1998, y: 24 }, { x: 1999, y: 61 }, { x: 2000, y: 80 },
    { x: 2001, y: 14 }, { x: 2002, y: 34 }, { x: 2003, y: 81 }, { x: 2004, y: 70 }, { x: 2005, y: 21 },
    { x: 2006, y: 70 }, { x: 2007, y: 32 }, { x: 2008, y: 43 }, { x: 2009, y: 21 }, { x: 2010, y: 63 },
    { x: 2011, y: 9 }, { x: 2012, y: 51 }, { x: 2013, y: 25 }, { x: 2014, y: 96 }, { x: 2015, y: 32 }
];
exports.data1 = [{ x: 1971, y: 23 }, { x: 1972, y: 67 }, { x: 1973, y: 83 }, { x: 1974, y: 43 }, { x: 1975, y: 8 },
    { x: 1976, y: 41 }, { x: 1977, y: 56 }, { x: 1978, y: 31 }, { x: 1979, y: 29 }, { x: 1980, y: 87 },
    { x: 1981, y: 43 }, { x: 1982, y: 12 }, { x: 1983, y: 38 }, { x: 1984, y: 67 }, { x: 1985, y: 49 },
    { x: 1986, y: 67 }, { x: 1987, y: 83 }, { x: 1988, y: 16 }, { x: 1989, y: 89 }, { x: 1990, y: 18 },
    { x: 1991, y: 46 }, { x: 1992, y: 39 }, { x: 1993, y: 68 }, { x: 1994, y: 87 }, { x: 1995, y: 45 },
    { x: 1996, y: 42 }, { x: 1997, y: 28 }, { x: 1998, y: 82 }, { x: 1999, y: 13 }, { x: 2000, y: 83 },
    { x: 2001, y: 26 }, { x: 2002, y: 57 }, { x: 2003, y: 48 }, { x: 2004, y: 84 }, { x: 2005, y: 64 },
    { x: 2006, y: 24 }, { x: 2007, y: 82 }, { x: 2008, y: 37 }, { x: 2009, y: 68 }, { x: 2010, y: 37 },
    { x: 2011, y: 35 }, { x: 2012, y: 81 }, { x: 2013, y: 38 }, { x: 2014, y: 51 }, { x: 2015, y: 58 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n\t}";
var RangeSelection = (function (_super) {
    __extends(RangeSelection, _super);
    function RangeSelection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.droplist = [
            { value: 'DragXY' },
            { value: 'DragX' },
            { value: 'DragY' },
            { value: 'Lasso' }
        ];
        return _this;
        // custom code end
    }
    RangeSelection.prototype.change = function () {
        this.chartInstance.selectionMode = this.dropElement.value;
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.series[1].animation.enable = false;
        this.chartInstance.refresh();
    };
    RangeSelection.prototype.check = function () {
        this.chartInstance.allowMultiSelection = this.checkElement.checked;
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.series[1].animation.enable = false;
        this.chartInstance.refresh();
    };
    RangeSelection.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-8' },
                    React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: function (chart) { return _this.chartInstance = chart; }, primaryXAxis: {
                            minimum: 1970,
                            maximum: 2016,
                            majorGridLines: { width: 0 }
                        }, primaryYAxis: {
                            title: 'Sales',
                            labelFormat: '{value}%',
                            interval: 25,
                            minimum: 0,
                            maximum: 100,
                            majorGridLines: { width: 0 }
                        }, chartArea: { border: { width: 0 } }, legendSettings: { visible: true, toggleVisibility: false }, title: 'Profit Comparision of A and B', loaded: this.onChartLoad.bind(this), selectionMode: 'DragXY', load: this.load.bind(this) },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.Selection, ej2_react_charts_1.Legend, ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Category, ej2_react_charts_1.ScatterSeries] }),
                        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, name: 'Product A', xName: 'x', yName: 'y', type: 'Scatter', marker: {
                                    shape: 'Triangle',
                                    width: 10, height: 10
                                } }),
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, name: 'Product B', xName: 'x', yName: 'y', type: 'Scatter', marker: {
                                    shape: 'Pentagon',
                                    width: 10, height: 10
                                } })))),
                React.createElement("div", { className: 'col-md-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null, "Selection Mode:")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "selmode", change: this.change.bind(this), ref: function (d) { return _this.dropElement = d; }, dataSource: this.droplist, fields: { text: 'value', value: 'value' }, value: "DragXY" })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '80%' } },
                                    React.createElement("div", null, "Enable MultipleSelection:")),
                                React.createElement("td", { style: { width: '20%' } },
                                    React.createElement("div", null,
                                        React.createElement("input", { type: "checkbox", id: "select", onChange: this.check.bind(this), ref: function (d) { return _this.checkElement = d; } })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates the range selection feature in chart. Data can be selected under region by drag and drop.")),
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
                React.createElement("p", { style: { "font-weight": 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use selection feature, we need to inject",
                    React.createElement("code", null, "Selection"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."))));
    };
    RangeSelection.prototype.onChartLoad = function (args) {
        document.getElementById('charts').setAttribute('title', '');
    };
    ;
    // custom code start
    RangeSelection.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    ;
    return RangeSelection;
}(sample_base_1.SampleBase));
exports.RangeSelection = RangeSelection;
