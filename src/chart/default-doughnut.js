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
var ej2_base_1 = require("@syncfusion/ej2-base");
exports.data1 = [
    { 'x': 'Net-tution and Fees', y: 21, text: '21%' },
    { 'x': 'Self-supporting Operations', y: 21, text: '21%' },
    { 'x': 'Private Gifts', y: 8, text: '8%' },
    { 'x': 'All Other', y: 8, text: '8%' },
    { 'x': 'Local Revenue', y: 4, text: '4%' },
    { 'x': 'State Revenue', y: 21, text: '21%' },
    { 'x': 'Federal Revenue', y: 16, text: '16%' }
];
var count = 0;
var Doughnut = (function (_super) {
    __extends(Doughnut, _super);
    function Doughnut() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Doughnut.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.AccumulationChartComponent, { id: 'pie-chart2', ref: function (pie) { return _this.pie = pie; }, title: 'Education Institutional Revenue', legendSettings: {
                        visible: true, toggleVisibility: false,
                        position: 'Right', height: '28%', width: '44%'
                    }, enableSmartLabels: true, selectionMode: 'Point', load: this.load.bind(this), animationComplete: this.onAnimationComplete.bind(this), tooltip: { enable: false, header: '<b>${point.x}</b>', format: 'Composition: <b>${point.y}%</b>' }, textRender: this.onTextRender.bind(this), loaded: this.onChartLoad.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AccumulationLegend, ej2_react_charts_1.PieSeries, ej2_react_charts_1.AccumulationDataLabel, ej2_react_charts_1.AccumulationTooltip, ej2_react_charts_1.AccumulationSelection, ej2_react_charts_1.Selection] }),
                    React.createElement(ej2_react_charts_1.AccumulationSeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.AccumulationSeriesDirective, { name: 'Revenue', dataSource: exports.data1, xName: 'x', yName: 'y', innerRadius: '40%', startAngle: 0, endAngle: 360, dataLabel: {
                                visible: true, position: 'Inside',
                                name: '${point.y}',
                                font: { color: 'white', fontWeight: '600', size: '14px' }
                            } }))),
                React.createElement("div", { id: "center_title", style: { visibility: 'hidden', position: 'absolute' } }, "Expenses in Year")),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates an educational institute\u2019s revenue by using the pie with legend series. The legend will be displayed at right side of the chart.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    " In this example, you can see how to render doughnut chart. You can use ",
                    React.createElement("code", null, "radius"),
                    " and ",
                    React.createElement("code", null, "innerRadius"),
                    " properties to render the doughnut and also use ",
                    React.createElement("code", null, "border"),
                    ", ",
                    React.createElement("code", null, "fill"),
                    " properties to customize the point. ",
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
                    React.createElement("code", null, "AccumulationLegend"),
                    " into ",
                    React.createElement("code", null, "services"),
                    "."))));
    };
    Doughnut.prototype.onAnimationComplete = function (args) {
        var centerTitle = document.getElementById('center_title');
        centerTitle.style.fontSize = this.getFontSize(args.accumulation.initialClipRect.width);
        var rect = centerTitle.getBoundingClientRect();
        centerTitle.style.top = (args.accumulation.origin.y + args.accumulation.element.offsetTop - (rect.height / 2)) + 'px';
        centerTitle.style.left = (args.accumulation.origin.x + args.accumulation.element.offsetLeft - (rect.width / 2)) + 'px';
        centerTitle.style.visibility = 'visible';
        var points = args.accumulation.visibleSeries[0].points;
        for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
            var point = points_1[_i];
            if (point.labelPosition === 'Outside' && point.labelVisible) {
                var label = document.getElementById('pie-chart2_datalabel_Series_0_text_' + point.index);
                label.setAttribute('fill', 'black');
            }
        }
        this.pie.animateSeries = false;
    };
    ;
    Doughnut.prototype.getFontSize = function (width) {
        if (width > 300) {
            return '13px';
        }
        else if (width > 250) {
            return '8px';
        }
        else {
            return '6px';
        }
    };
    ;
    Doughnut.prototype.onTextRender = function (args) {
        var pie = ej2_base_1.getInstance('#pie-chart2', ej2_react_charts_1.AccumulationChart);
        args.series.dataLabel.font.size = this.getFontSize(pie.initialClipRect.width);
        args.text = args.text + '%';
    };
    ;
    Doughnut.prototype.onChartLoad = function (args) {
        var pie = ej2_base_1.getInstance('#pie-chart2', ej2_react_charts_1.AccumulationChart);
        document.getElementById('pie-chart2').setAttribute('title', '');
        pie.loaded = null;
        var pieinterval = setInterval(function () {
            if (document.getElementById('pie-chart2')) {
                if (count === 0) {
                    pie.series[0].dataSource = [{ 'x': 'Net-tution and Fees', y: 10 }, { 'x': 'Self-supporting Operations', y: 10 },
                        { 'x': 'Private Gifts', y: 13 }, { 'x': 'All Other', y: 14 },
                        { 'x': 'Local Revenue', y: 9 }, { 'x': 'State Revenue', y: 13 },
                        { 'x': 'Federal Revenue', y: 8 }
                    ];
                    pie.animate();
                    count++;
                }
                else if (count === 1) {
                    pie.series[0].dataSource = [
                        { 'x': 'Net-tution and Fees', y: 120 }, { 'x': 'Self-supporting Operations', y: 31 },
                        { 'x': 'Private Gifts', y: 6 }, { 'x': 'All Other', y: 12 },
                        { 'x': 'Local Revenue', y: 25 }, { 'x': 'State Revenue', y: 11 },
                        { 'x': 'Federal Revenue', y: 12 }
                    ];
                    pie.animate();
                    count++;
                }
                else if (count === 2) {
                    pie.series[0].dataSource = [
                        { 'x': 'Net-tution and Fees', y: 6 }, { 'x': 'Self-supporting Operations', y: 22 },
                        { 'x': 'Private Gifts', y: 11 }, { 'x': 'All Other', y: 15 },
                        { 'x': 'Local Revenue', y: 13 }, { 'x': 'State Revenue', y: 10 },
                        { 'x': 'Federal Revenue', y: 8 }
                    ];
                    pie.animate();
                    count++;
                }
                else if (count === 3) {
                    pie.series[0].dataSource = [
                        { 'x': 'Net-tution and Fees', y: 15 }, { 'x': 'Self-supporting Operations', y: 10 },
                        { 'x': 'Private Gifts', y: 18 }, { 'x': 'All Other', y: 20 },
                        { 'x': 'Local Revenue', y: 30 }, { 'x': 'State Revenue', y: 20 },
                        { 'x': 'Federal Revenue', y: 25 }
                    ];
                    pie.animate();
                    count++;
                }
                else if (count === 4) {
                    pie.series[0].dataSource = [
                        { 'x': 'Net-tution and Fees', y: 21 }, { 'x': 'Self-supporting Operations', y: 10 },
                        { 'x': 'Private Gifts', y: 15 }, { 'x': 'All Other', y: 15 },
                        { 'x': 'Local Revenue', y: 11 }, { 'x': 'State Revenue', y: 20 },
                        { 'x': 'Federal Revenue', y: 60 }
                    ];
                    pie.animate();
                    count = 0;
                }
            }
            else {
                clearInterval(pieinterval);
            }
        }, 3000);
    };
    ;
    // custom code start
    Doughnut.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/dark/i, "Dark").
            replace(/light/i, "Light");
    };
    ;
    return Doughnut;
}(sample_base_1.SampleBase));
exports.Doughnut = Doughnut;
