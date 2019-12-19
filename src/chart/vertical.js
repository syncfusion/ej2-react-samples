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
 * Samples for vertical chart
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var VerticalChart = (function (_super) {
    __extends(VerticalChart, _super);
    function VerticalChart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.count = 0;
        return _this;
    }
    VerticalChart.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts-vertical', ref: function (chart) { return _this.chartInstance = chart; }, style: { textAlign: "center" }, primaryXAxis: {
                        title: 'Time (s)', majorGridLines: { width: 0 }
                    }, load: this.load.bind(this), loaded: this.onChartLoad.bind(this), primaryYAxis: {
                        title: 'Velocity (m/s)', majorGridLines: { width: 0 }, minimum: -15, maximum: 15, interval: 5
                    }, chartArea: { border: { width: 0 } }, isTransposed: true, width: ej2_base_1.Browser.isDevice ? '100%' : '80%', title: 'Indonesia - Seismograph Analysis' },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.LineSeries] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { width: 2, dataSource: [{ x: 0, y: 0 }], xName: 'x', yName: 'y', type: 'Line', animation: { enable: false } })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates the vertical chart by changing the orientation of x-axis to vertical and y-axis to horizontal.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the vertical type charts. To render a chart in vertical manner, you can use ",
                    React.createElement("code", null, "isTransposed"),
                    " in chart."),
                React.createElement("p", null,
                    "More information on the isTransposed can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype" }, "documentation section"),
                    "."))));
    };
    VerticalChart.prototype.onChartLoad = function (args) {
        var _this = this;
        //let chart: Element = document.getElementById('charts-vertical');
        this.chartInstance.loaded = null;
        //chart.setAttribute('title', '');
        this.clrInterval =
            +setInterval(function () {
                args.chart.series[0].dataSource = _this.liveData(args.chart.series[0].dataSource, args.chart.series[0]);
                args.chart.refresh();
            }, 
            // tslint:disable-next-line:align
            10);
    };
    ;
    // custom code start
    VerticalChart.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    ;
    // custom code end
    VerticalChart.prototype.liveData = function (data, series) {
        this.count = this.count + 1;
        var newData = data;
        if (this.count > 350 || ej2_react_charts_1.getElement('charts-vertical') === null) {
            clearInterval(this.clrInterval);
        }
        else if (this.count > 300) {
            newData.push({ x: this.getXValue(data), y: this.getRandomArbitrary(0, 0) });
        }
        else if (this.count > 250) {
            newData.push({ x: this.getXValue(data), y: this.getRandomArbitrary(-2, 1) });
        }
        else if (this.count > 180) {
            newData.push({ x: this.getXValue(data), y: this.getRandomArbitrary(-3, 2) });
        }
        else if (this.count > 100) {
            newData.push({ x: this.getXValue(data), y: this.getRandomArbitrary(-7, 6) });
        }
        else if (this.count < 50) {
            newData.push({ x: this.getXValue(data), y: this.getRandomArbitrary(-3, 3) });
        }
        else {
            newData.push({ x: this.getXValue(data), y: this.getRandomArbitrary(-9, 9) });
        }
        return newData;
    };
    VerticalChart.prototype.getRandomArbitrary = function (min, max) {
        return Math.random() * (max - min) + min;
    };
    VerticalChart.prototype.getXValue = function (data) {
        return data.length;
    };
    return VerticalChart;
}(sample_base_1.SampleBase));
exports.VerticalChart = VerticalChart;
