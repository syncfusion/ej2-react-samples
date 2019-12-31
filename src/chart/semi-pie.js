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
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
exports.data1 = [
    { x: 'Australia', y: 53, text: 'AUS: 14%' },
    { x: 'China', y: 56, text: 'CHN: 15%' },
    { x: 'India', y: 61, text: 'IND: 16%' },
    { x: 'Japan', y: 13, text: 'JPN: 3%' },
    { x: 'South Africa', y: 79, text: 'ZAF: 21%' },
    { x: 'United Kingdom', y: 68, text: 'UK: 19%' },
    { x: 'United States', y: 48, text: 'USA: 12%' }
];
var SemiPie = (function (_super) {
    __extends(SemiPie, _super);
    function SemiPie() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SemiPie.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-lg-9' },
                    React.createElement(ej2_react_charts_1.AccumulationChartComponent, { id: 'pie-chart', ref: function (pie) { return _this.pie = pie; }, title: 'Agricultural Land Percentage', tooltip: { enable: true, format: '${point.x} : <b>${point.y}%</b>' }, legendSettings: { visible: false }, load: this.load.bind(this), loaded: this.onChartLoad.bind(this) },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AccumulationDataLabel, ej2_react_charts_1.AccumulationTooltip, ej2_react_charts_1.PieSeries] }),
                        React.createElement(ej2_react_charts_1.AccumulationSeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.AccumulationSeriesDirective, { name: 'Agricultural', dataSource: exports.data1, xName: 'x', yName: 'y', startAngle: 270, endAngle: 90, radius: '90%', explode: true, innerRadius: '40%', dataLabel: {
                                    visible: true, position: 'Outside',
                                    connectorStyle: { length: '10%' }, name: 'text',
                                    font: { size: '14px' }
                                } })))),
                React.createElement("div", { className: 'col-lg-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null,
                                        "Start Angle:",
                                        React.createElement("p", { id: "startangle", style: { fontWeight: 'normal' } }, "270"))),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", { "data-role": "rangeslider" },
                                        React.createElement("input", { type: "range", name: "range-min", ref: function (slider) { return _this.slider = slider; }, id: "range-min", defaultValue: "270", min: "0", max: "360", onChange: this.startangle.bind(this), style: { marginLeft: '-5px' } })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null,
                                        "End Angle:",
                                        React.createElement("p", { id: "endangle", style: { fontWeight: 'normal' } }, "90"))),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", { "data-role": "rangeslider" },
                                        React.createElement("input", { type: "range", name: "range-min", ref: function (slider) { return _this.slider = slider; }, id: "range-max", defaultValue: "90", min: "0", max: "360", onChange: this.endangle.bind(this), style: { marginLeft: '-5px' } })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null,
                                        "Inner Radius:",
                                        React.createElement("p", { id: "innerradius", style: { fontWeight: 'normal' } }, "0.40"))),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", { "data-role": "rangeslider" },
                                        React.createElement("input", { type: "range", name: "innerRadius", ref: function (slider) { return _this.slider = slider; }, id: "inner-radius", defaultValue: "40", min: "0", max: "50", onChange: this.onChange.bind(this), style: { marginLeft: '-5px' } })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates the agriculture land percentages of various countries by using a pie series. It has options to change the angle and radius of the series.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    " In this example, you can see how to render semi pie and doughnut chart. Using ",
                    React.createElement("code", null, "startAngle"),
                    ", ",
                    React.createElement("code", null, "endAngle"),
                    " properties, we can achieve this semi pie chart. Property panel to change the angle is provided with this sample."),
                React.createElement("p", null,
                    " ",
                    React.createElement("code", null, "Tooltip"),
                    " is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."))));
    };
    SemiPie.prototype.startangle = function (e) {
        var rangeMin = document.getElementById('range-min').value;
        this.pie.series[0].startAngle = parseFloat(rangeMin);
        document.getElementById('startangle').innerHTML = rangeMin;
        this.pie.series[0].animation.enable = false;
        this.pie.removeSvg();
        this.pie.refreshSeries();
        this.pie.refreshChart();
    };
    ;
    SemiPie.prototype.endangle = function (e) {
        var rangeMax = document.getElementById('range-max').value;
        this.pie.series[0].endAngle = parseFloat(rangeMax);
        document.getElementById('endangle').innerHTML = rangeMax;
        this.pie.series[0].animation.enable = false;
        this.pie.removeSvg();
        this.pie.refreshSeries();
        this.pie.refreshChart();
    };
    ;
    SemiPie.prototype.onChange = function (e) {
        var innerRadius = document.getElementById('inner-radius').value;
        this.pie.series[0].innerRadius = innerRadius + '%';
        document.getElementById('innerradius').innerHTML = (parseInt(innerRadius, 10) / 100).toFixed(2);
        this.pie.series[0].animation.enable = false;
        this.pie.removeSvg();
        this.pie.refreshSeries();
        this.pie.refreshChart();
    };
    ;
    SemiPie.prototype.onChartLoad = function (args) {
        document.getElementById('pie-chart').setAttribute('title', '');
    };
    ;
    // custom code start
    SemiPie.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark");
    };
    ;
    return SemiPie;
}(sample_base_1.SampleBase));
exports.SemiPie = SemiPie;
