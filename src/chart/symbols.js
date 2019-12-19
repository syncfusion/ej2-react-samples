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
 * Sample for Chart symbols
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
exports.data = [
    { x: 'WW', y: 12, y1: 22, y2: 38.3, y3: 50, text: 'World Wide' },
    { x: 'EU', y: 9.9, y1: 26, y2: 45.2, y3: 63.6, text: 'Europe' },
    { x: 'APAC', y: 4.4, y1: 9.3, y2: 18.2, y3: 20.9, text: 'Asia Pacific' },
    { x: 'LATAM', y: 6.4, y1: 28, y2: 46.7, y3: 65.1, text: 'Latin America' },
    { x: 'MEA', y: 30, y1: 45.7, y2: 61.5, y3: 73, text: 'Middle East Africa' },
    { x: 'NA', y: 25.3, y1: 35.9, y2: 64, y3: 81.4, text: 'North America' }
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var Symbols = (function (_super) {
    __extends(Symbols, _super);
    function Symbols() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Symbols.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: {
                        title: 'Countries', valueType: 'Category',
                        interval: 1, labelIntersectAction: 'Rotate45',
                        majorGridLines: { width: 0 },
                    }, load: this.load.bind(this), primaryYAxis: {
                        title: 'Penetration', rangePadding: 'None',
                        labelFormat: '{value}%', minimum: 0,
                        lineStyle: { width: 0 },
                        maximum: 75, interval: 15
                    }, width: ej2_base_1.Browser.isDevice ? '100%' : '60%', chartArea: { border: { width: 0 } }, title: 'FB Penetration of Internet Audience', loaded: this.onChartLoad.bind(this), legendSettings: { visible: false }, tooltip: { enable: true } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.LineSeries, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.DataLabel, ej2_react_charts_1.Category] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, xName: 'x', yName: 'y', width: 2, name: 'December 2007', type: 'Line', marker: { visible: true, dataLabel: { name: 'text' }, width: 10, height: 10, shape: 'Diamond' } }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, xName: 'x', yName: 'y1', width: 2, name: 'December 2008', type: 'Line', marker: { visible: true, dataLabel: { name: 'text' }, width: 10, height: 10, shape: 'Pentagon' } }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, xName: 'x', yName: 'y2', width: 2, name: 'December 2009', type: 'Line', marker: { visible: true, dataLabel: { name: 'text' }, width: 10, height: 10, shape: 'Triangle' } }))),
                React.createElement("div", { style: { float: 'right', marginRight: '10px' } },
                    "Source: \u00A0",
                    React.createElement("a", { href: "http://www.marketingprofs.com/charts/2012/7064/facebook-stats-five-years-of-worldwide-growth", target: "_blank" }, "www.marketingprofs.com"))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates the rendering of symbols in chart. In line based series, data points can be annotated by using symbols.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Each points in a series can be represented as a symbol through marker. We can also customize the shape, size and color of a symbol through ",
                    React.createElement("code", null, "marker"),
                    " properties."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null,
                    "More information on the marker can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-markerSettingsModel.html" }, "documentation section"),
                    "."))));
    };
    Symbols.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    // custom code start
    Symbols.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    ;
    return Symbols;
}(sample_base_1.SampleBase));
exports.Symbols = Symbols;
