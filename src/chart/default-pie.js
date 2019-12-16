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
    { 'x': 'Chrome', y: 37, text: '37%' }, { 'x': 'UC Browser', y: 17, text: '17%' },
    { 'x': 'iPhone', y: 19, text: '19%' },
    { 'x': 'Others', y: 4, text: '4%' }, { 'x': 'Opera', y: 11, text: '11%' },
    { 'x': 'Android', y: 12, text: '12%' }
];
var Pie = /** @class */ (function (_super) {
    __extends(Pie, _super);
    function Pie() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Pie.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-lg-9' },
                    React.createElement(ej2_react_charts_1.AccumulationChartComponent, { id: 'pie-chart', ref: function (pie) { return _this.pie = pie; }, title: 'Mobile Browser Statistics', load: this.load.bind(this), legendSettings: { visible: false }, enableSmartLabels: true, enableAnimation: false, center: { x: '50%', y: '50%' }, tooltip: { enable: true, format: '${point.x} : <b>${point.y}%</b>' }, loaded: this.onChartLoad.bind(this) },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AccumulationLegend, ej2_react_charts_1.PieSeries, ej2_react_charts_1.AccumulationTooltip, ej2_react_charts_1.AccumulationDataLabel] }),
                        React.createElement(ej2_react_charts_1.AccumulationSeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.AccumulationSeriesDirective, { dataSource: exports.data1, name: 'Browser', xName: 'x', yName: 'y', explode: true, explodeOffset: '10%', explodeIndex: 0, dataLabel: {
                                    visible: true,
                                    position: 'Inside', name: 'text',
                                    font: {
                                        fontWeight: '600'
                                    }
                                }, radius: '70%' })))),
                React.createElement("div", { className: 'col-lg-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", null,
                                        "Pie Angle:",
                                        React.createElement("p", { id: "anglevalue", style: { fontWeight: 'normal' } }, "0"))),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", { "data-role": "rangeslider" },
                                        React.createElement("input", { type: "range", name: "range-min", onChange: this.pieangle.bind(this), ref: function (s) { return _this.slider = s; }, id: "pieangle", defaultValue: "0", min: "0", max: "360", style: { width: '90%' } })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", null,
                                        "Outer Radius:",
                                        React.createElement("p", { id: "radius", style: { fontWeight: 'normal' } }, "0.8"))),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", { "data-role": "rangeslider" },
                                        React.createElement("input", { type: "range", name: "range-min", onChange: this.pieradius.bind(this), ref: function (s) { return _this.slider = s; }, id: "pieradius", defaultValue: "80", min: "0", max: "80", style: { marginLeft: '-5px' } })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", null,
                                        "Explode Radius:",
                                        React.createElement("p", { id: "exploderadius", style: { fontWeight: 'normal' } }, "0.1"))),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", { "data-role": "rangeslider" },
                                        React.createElement("input", { type: "range", name: "range-min", onChange: this.pieexploderadius.bind(this), ref: function (s) { return _this.slider = s; }, id: "pieexploderadius", defaultValue: "10", min: "0", max: "40", style: { marginLeft: '-5px' } })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", null,
                                        "Explode Index:",
                                        React.createElement("p", { id: "explodeindex", style: { fontWeight: 'normal' } }, "5"))),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", { "data-role": "rangeslider" },
                                        React.createElement("input", { type: "range", name: "range-min", onChange: this.pieexplodeindex.bind(this), ref: function (s) { return _this.slider = s; }, id: "pieexplodeindex", defaultValue: "5", min: "0", max: "6", style: { marginLeft: '-5px' } })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", null,
                                        "Center X",
                                        React.createElement("p", { id: "xvalue", style: { fontWeight: 'normal' } }, "50%"))),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", { "data-role": "rangeslider" },
                                        React.createElement("input", { type: "range", name: "range-min", onChange: this.piecenterx.bind(this), ref: function (s) { return _this.slider = s; }, id: "x", defaultValue: "50", min: "0", max: "100", style: { marginLeft: '-5px' } })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", null,
                                        "Center Y",
                                        React.createElement("p", { id: "yvalue", style: { fontWeight: 'normal' } }, "50%"))),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", { "data-role": "rangeslider" },
                                        React.createElement("input", { type: "range", name: "range-min", onChange: this.piecentery.bind(this), ref: function (s) { return _this.slider = s; }, id: "y", defaultValue: "50", min: "0", max: "100", style: { marginLeft: '-5px' } })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates pie chart for mobile browser usage statistics. ",
                    React.createElement("code", null, "Datalabel"),
                    " shows the Information about the points. While hovering on the slice, border will be highlighted.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    " In this example, you can see how to render and configure the pie chart. You can use ",
                    React.createElement("code", null, "border"),
                    ", ",
                    React.createElement("code", null, "fill"),
                    " properties to customize the pie point. ",
                    React.createElement("code", null, "dataLabel"),
                    " is used to represent individual data and its value."),
                React.createElement("p", null,
                    " ",
                    React.createElement("code", null, "Tooltip"),
                    " is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Accumulation Chart component features are segregated into individual feature-wise modules.To use pie chart, you need to inject ",
                    React.createElement("code", null, "PieSeries"),
                    " into ",
                    React.createElement("code", null, "services"),
                    "."))));
    };
    Pie.prototype.pieangle = function (e) {
        var angle = document.getElementById('pieangle').value;
        this.pie.series[0].startAngle = parseFloat(angle);
        this.pie.series[0].endAngle = parseFloat(angle);
        this.pie.series[0].animation.enable = false;
        document.getElementById('anglevalue').innerHTML = angle;
        this.pie.removeSvg();
        this.pie.refreshSeries();
        this.pie.refreshChart();
    };
    ;
    Pie.prototype.pieradius = function (e) {
        var radius = document.getElementById('pieradius').value;
        this.pie.series[0].radius = radius + '%';
        document.getElementById('radius').innerHTML = (parseInt(radius, 10) / 100).toFixed(2);
        this.pie.series[0].animation.enable = false;
        this.pie.removeSvg();
        this.pie.refreshSeries();
        this.pie.refreshChart();
    };
    ;
    Pie.prototype.pieexploderadius = function (e) {
        var radius = document.getElementById('pieexploderadius').value;
        this.pie.visibleSeries[0].explodeOffset = radius + '%';
        document.getElementById('exploderadius').innerHTML = (parseInt(radius, 10) / 100).toFixed(2);
        this.pie.series[0].animation.enable = false;
        this.pie.removeSvg();
        this.pie.refreshSeries();
        this.pie.refreshChart();
    };
    ;
    Pie.prototype.pieexplodeindex = function (e) {
        var index = +document.getElementById('pieexplodeindex').value;
        this.pie.visibleSeries[0].explodeIndex = index;
        document.getElementById('explodeindex').innerHTML = index.toString();
        this.pie.series[0].animation.enable = false;
        this.pie.removeSvg();
        this.pie.refreshSeries();
        this.pie.refreshChart();
    };
    ;
    Pie.prototype.piecenterx = function (e) {
        var x = document.getElementById('x').value;
        this.pie.center.x = x + '%';
        document.getElementById('xvalue').innerHTML = x + '%';
        this.pie.series[0].animation.enable = false;
        this.pie.removeSvg();
        this.pie.refreshSeries();
        this.pie.refreshChart();
    };
    ;
    Pie.prototype.piecentery = function (e) {
        var y = document.getElementById('y').value;
        this.pie.center.y = y + '%';
        document.getElementById('yvalue').innerHTML = y + '%';
        this.pie.series[0].animation.enable = false;
        this.pie.removeSvg();
        this.pie.refreshSeries();
        this.pie.refreshChart();
    };
    ;
    Pie.prototype.onChartLoad = function (args) {
        document.getElementById('pie-chart').setAttribute('title', '');
    };
    ;
    // custom code start
    Pie.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/dark/i, "Dark").
            replace(/light/i, "Light");
    };
    ;
    return Pie;
}(sample_base_1.SampleBase));
exports.Pie = Pie;
