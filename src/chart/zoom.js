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
 * Sample for Zooming in chart
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var SAMPLE_CSS = "\n    #gradient-chart stop {\n\t\tstop-color: #BDEDE9;\n\t}\n\t#gradient-chart stop[offset=\"0\"] {\n\t\tstop-opacity: 0.75;\n\t}\n\t#gradient-chart stop[offset=\"1\"] {\n\t\tstop-opacity: 0;\n\t}";
function GetZoomingData() {
    var series1 = [];
    var point1;
    var value = 80;
    var i;
    for (i = 1; i < 500; i++) {
        if (Math.random() > .5) {
            value += Math.random();
        }
        else {
            value -= Math.random();
        }
        point1 = { x: new Date(1950, i + 2, i), y: value.toFixed(1) };
        series1.push(point1);
    }
    return { 'series1': series1 };
}
exports.GetZoomingData = GetZoomingData;
exports.data = GetZoomingData().series1;
var Zooming = (function (_super) {
    __extends(Zooming, _super);
    function Zooming() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Zooming.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: {
                        title: 'Years',
                        valueType: 'DateTime',
                        skeleton: 'yMMM',
                        edgeLabelPlacement: 'Shift',
                        majorGridLines: { width: 0 }
                    }, load: this.load.bind(this), primaryYAxis: {
                        title: 'Profit ($)',
                        rangePadding: 'None',
                        lineStyle: { width: 0 },
                        majorTickLines: { width: 0 }
                    }, width: ej2_base_1.Browser.isDevice ? '100%' : '80%', chartArea: { border: { width: 0 } }, legendSettings: { visible: false }, zoomSettings: {
                        enableMouseWheelZooming: true, enablePinchZooming: true,
                        enableSelectionZooming: true, mode: 'X', enableScrollbar: true
                    }, title: 'Sales History of Product X', loaded: this.onChartLoad.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AreaSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.Legend, ej2_react_charts_1.Zoom, ej2_react_charts_1.ScrollBar] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, xName: 'x', yName: 'y', name: 'Product X', border: { width: 0.5, color: '#00bdae' }, animation: { enable: false }, fill: 'url(#gradient-chart)', type: 'Area' })))),
            React.createElement("svg", { style: { height: '0' } },
                React.createElement("defs", null,
                    React.createElement("linearGradient", { id: "gradient-chart", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates zooming feature in chart. The change can be zoomed by pinching or by mouse wheel.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "This sample demonstrates the zooming and panning behavior in chart."),
                React.createElement("ul", null,
                    React.createElement("li", null, "Click and drag the mouse on a chart area to enable selection zooming."),
                    React.createElement("li", null, "Hover the mouse on the toolbar at the top right corner of chart area to switch between zooming and panning."),
                    React.createElement("li", null, "Pinch in and pinch out the chart area to zoom in or zoom out the chart in touch enabled devices."),
                    React.createElement("li", null, "Touch and drag to pan the chart."),
                    React.createElement("li", null, "Double tap to reset the zoomed chart.")),
                React.createElement("p", null,
                    "Chart component supports four types of zooming which can be set using ",
                    React.createElement("code", null, "enableSelectionZooming"),
                    ", ",
                    React.createElement("code", null, "enablePinchZooming"),
                    ", ",
                    React.createElement("code", null, "enableMouseWheelZooming"),
                    ", ",
                    React.createElement("code", null, "enableDeferredZooming"),
                    " property."),
                React.createElement("p", null,
                    "Chart supports two mode of zooming which can be set using",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-zoomSettings.html#mode-string" }, "mode")),
                    " property."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "XY"),
                        " - Zoom the chart with respect to both the axis."),
                    React.createElement("li", null,
                        React.createElement("code", null, "X"),
                        " - Zoom the chart with respect to horizontal axis."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Y"),
                        " - Zoom the chart with respect to vertical axis.")),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use zooming, we need to inject",
                    React.createElement("code", null, "Zoom"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the Zooming can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-zoomSettings.html#properties" }, "documentation section"),
                    "."))));
    };
    Zooming.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    // custom code start
    Zooming.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    ;
    return Zooming;
}(sample_base_1.SampleBase));
exports.Zooming = Zooming;
