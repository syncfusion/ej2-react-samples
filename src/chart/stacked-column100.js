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
 * Sample for 100 percent Stacking Column series
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
exports.data = [
    { x: '2006', y: 900, y1: 190, y2: 250, y3: 150 },
    { x: '2007', y: 544, y1: 226, y2: 145, y3: 120 },
    { x: '2008', y: 880, y1: 194, y2: 190, y3: 115 },
    { x: '2009', y: 675, y1: 250, y2: 220, y3: 125 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var StackedColumn100 = /** @class */ (function (_super) {
    __extends(StackedColumn100, _super);
    function StackedColumn100() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StackedColumn100.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: {
                        valueType: 'Category',
                        labelIntersectAction: 'Rotate45',
                        majorGridLines: { width: 0 },
                        minorGridLines: { width: 0 },
                        majorTickLines: { width: 0 },
                        minorTickLines: { width: 0 }
                    }, primaryYAxis: {
                        title: 'GDP (%) per Annum',
                        rangePadding: 'None',
                        interval: 20,
                        majorTickLines: { width: 0 },
                        majorGridLines: { width: 1 },
                        minorGridLines: { width: 1 },
                        minorTickLines: { width: 0 },
                        lineStyle: {
                            width: 0
                        }
                    }, width: ej2_base_1.Browser.isDevice ? '100%' : '60%', chartArea: { border: { width: 0 } }, load: this.load.bind(this), title: 'Gross Domestic Product Growth', loaded: this.onChartLoad.bind(this), tooltip: { enable: true, format: '${point.x} : <b>${point.y} (${point.percentage}%)</b>' } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.StackingColumnSeries, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.DataLabel, ej2_react_charts_1.Category] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, xName: 'x', yName: 'y', name: 'UK', type: 'StackingColumn100' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, xName: 'x', yName: 'y1', name: 'Germany', type: 'StackingColumn100' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, xName: 'x', yName: 'y2', name: 'France', type: 'StackingColumn100' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, xName: 'x', yName: 'y3', name: 'Italy', type: 'StackingColumn100' }))),
                React.createElement("div", { style: { float: 'right', marginRight: '10px' } },
                    "Source: \u00A0",
                    React.createElement("a", { href: "https://www.cyberagent.co.jp/en/newsinfo/press/detail/id=12026", target: "_blank" }, "www.cyberagent.co.jp"))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes percentage of domestic product growth of four different countries with default 100% stacked column series in chart. Legend in the sample shows the information about the series.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the 100% stacking column type charts. Stacks the points in the series vertically and also you can use ",
                    React.createElement("code", null, "stackingGroup"),
                    " property to group the stacking collection based on categories. You can use ",
                    React.createElement("code", null, "border"),
                    ", ",
                    React.createElement("code", null, "fill"),
                    " properties to customize the vertical bar. ",
                    React.createElement("code", null, "dataLabel"),
                    " is used to represent individual data and its value."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use 100% stacking column series, we need to inject",
                    React.createElement("code", null, "StackingColumnSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the 100% stacking column series can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype" }, "documentation section"),
                    "."))));
    };
    StackedColumn100.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    // custom code start
    StackedColumn100.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    ;
    return StackedColumn100;
}(sample_base_1.SampleBase));
exports.StackedColumn100 = StackedColumn100;
