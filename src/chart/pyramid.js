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
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
exports.data1 = [{ x: 'Sweet Treats', y: 120, text: '120 cal' },
    { x: 'Milk, Youghnut, Cheese', y: 435, text: '435 cal' },
    { x: 'Vegetables', y: 470, text: '470 cal' },
    { x: 'Meat, Poultry, Fish', y: 475, text: '475 cal' },
    { x: 'Fruits', y: 520, text: '520 cal' },
    { x: 'Bread, Rice, Pasta', y: 930, text: '930 cal' }];
var Pyramid = (function (_super) {
    __extends(Pyramid, _super);
    function Pyramid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Pyramid.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.AccumulationChartComponent, { id: 'pyramid-chart', ref: function (pyramid) { return _this.pyramid = pyramid; }, title: 'Food Comparison Chart', legendSettings: {
                        visible: false,
                    }, load: this.load.bind(this), tooltip: { enable: true, format: '${point.x} : <b>${point.y} cal</b>' }, loaded: this.onChartLoad.bind(this), resized: this.chartResized.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AccumulationDataLabel, ej2_react_charts_1.AccumulationTooltip, ej2_react_charts_1.PyramidSeries, ej2_react_charts_1.AccumulationLegend, ej2_react_charts_1.AccumulationSelection] }),
                    React.createElement(ej2_react_charts_1.AccumulationSeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.AccumulationSeriesDirective, { name: 'Food', dataSource: exports.data1, xName: 'x', yName: 'y', type: 'Pyramid', width: '45%', height: '80%', neckWidth: '15%', gapRatio: 0.03, explode: true, emptyPointSettings: { mode: 'Drop', fill: 'red' }, dataLabel: {
                                visible: true, position: 'Inside',
                                name: 'text',
                            } })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes food comparison data by using pyramid series. Datalabel shows the Information about the points.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    " In this example, you can see how to render pyramid chart. ",
                    React.createElement("code", null, "dataLabel"),
                    " is used to represent individual data and its value."),
                React.createElement("p", null,
                    " ",
                    React.createElement("code", null, "Tooltip"),
                    " is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("p", null,
                    " ",
                    React.createElement("code", null, "Legends"),
                    " are disabled in this example, the information about it can be read using ",
                    React.createElement("code", null, "Tooltip"),
                    "."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use Pyramid series, we need to inject",
                    React.createElement("code", null, "PyramidSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."))));
    };
    Pyramid.prototype.onChartLoad = function (args) {
        document.getElementById('pyramid-chart').setAttribute('title', '');
    };
    ;
    // custom code start
    Pyramid.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark");
        if (args.accumulation.availableSize.width < args.accumulation.availableSize.height) {
            args.accumulation.series[0].width = '80%';
            args.accumulation.series[0].height = '70%';
        }
    };
    ;
    // custom code end
    Pyramid.prototype.chartResized = function (args) {
        var bounds = document.getElementById('pyramid-chart').getBoundingClientRect();
        if (bounds.width < bounds.height) {
            args.accumulation.series[0].width = '80%';
            args.accumulation.series[0].height = '70%';
        }
        else {
            args.accumulation.series[0].width = '60%';
            args.accumulation.series[0].height = '80%';
        }
    };
    return Pyramid;
}(sample_base_1.SampleBase));
exports.Pyramid = Pyramid;
