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
 * Sample for Chart performance
 */
var React = require("react");
var property_pane_1 = require("../common/property-pane");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var Performance = (function (_super) {
    __extends(Performance, _super);
    function Performance() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dt1 = 0;
        return _this;
    }
    Performance.prototype.change = function () {
        var series1 = [];
        var point1;
        var value = 0;
        var i;
        for (i = 0; i < 100000; i++) {
            value += (Math.random() * 10 - 5);
            point1 = { x: i, y: value };
            series1.push(point1);
        }
        this.dt1 = new Date().getTime();
        this.chart.series[0].animation.enable = false;
        this.chart.series[0].dataSource = series1;
        this.chart.series[0].xName = 'x';
        this.chart.series[0].yName = 'y';
        this.chart.refresh();
    };
    Performance.prototype.onChartLoad = function (args) {
        var dt2;
        dt2 = new Date().getTime();
        if (this.dt1) {
            document.getElementById('performanceTime').innerHTML = (dt2 - this.dt1) + 'ms';
        }
        this.dt1 = 0;
    };
    ;
    Performance.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    ;
    Performance.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-lg-9' },
                    React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: function (chart) { return _this.chart = chart; }, loaded: this.onChartLoad.bind(this), primaryXAxis: {
                            majorGridLines: { color: 'transparent' }
                        }, enableCanvas: true, load: this.load.bind(this), legendSettings: { visible: false } },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.LineSeries, ej2_react_charts_1.Legend] }),
                        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.SeriesDirective, { name: 'Series1', type: 'Line', animation: { enable: false } })))),
                React.createElement("div", { className: 'col-lg-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tr", { style: { height: "50px" } },
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-info', onClick: this.change.bind(this), isPrimary: true, style: { textTransform: 'None', width: 140, textAlign: 'center' } }, "Load 100K Points"))),
                            React.createElement("tr", { style: { height: "50px" } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", null, "Time Taken")),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", null,
                                        React.createElement("span", { id: "performanceTime" }, "0ms")))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the performance of EJ2 chart to render 100K points in canvas mode.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "Chart includes several data rendering optimizations to achieve the best possible performance when plotting large volumes of data as well as handling high frequency real-time data.In this demo, chart is rendered with 100K points in canvas mode."))));
    };
    return Performance;
}(sample_base_1.SampleBase));
exports.Performance = Performance;
