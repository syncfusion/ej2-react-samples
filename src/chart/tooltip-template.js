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
 * Sample for Line Series
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
exports.data1 = [{ x: 2002, y: 1.61 }, { x: 2003, y: 2.34 }, { x: 2004, y: 2.16 }, { x: 2005, y: 2.10 },
    { x: 2006, y: 1.81 }, { x: 2007, y: 2.05 }, { x: 2008, y: 2.50 }, { x: 2009, y: 2.22 },
    { x: 2010, y: 2.21 }, { x: 2011, y: 2.00 }, { x: 2012, y: 2.27 }];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }\n        .charts {\n            align :center\n        }";
var ChartTooltipTemplate = /** @class */ (function (_super) {
    __extends(ChartTooltipTemplate, _super);
    function ChartTooltipTemplate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChartTooltipTemplate.prototype.tooltipTemplate = function (props) {
        return (React.createElement("div", { id: "wrap" },
            React.createElement("table", { style: { width: '100%', border: '1px solid black' }, className: "table-borderless" },
                React.createElement("tr", null,
                    React.createElement("th", { rowSpan: 2, style: { backgroundColor: '#C1272D' } },
                        React.createElement("img", { src: 'src/chart/images/grain.png' })),
                    React.createElement("td", { style: { height: '25px', width: '50px', backgroundColor: '#C1272D', fontSize: '14px', color: '#E7C554', fontWeight: 'bold', paddingLeft: '5px' } }, props.y)),
                React.createElement("tr", null,
                    React.createElement("td", { style: { height: '25px', width: '50px', backgroundColor: '#C1272D', fontSize: '18px', color: '#E7C554', fontWeight: 'bold', paddingLeft: '5px' } }, props.x)))));
    };
    ChartTooltipTemplate.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'chartTooltip', style: { textAlign: "center" }, backgroundImage: 'src/chart/images/wheat.png', primaryXAxis: {
                        labelStyle: { color: 'white' },
                        valueType: 'Category',
                        edgeLabelPlacement: 'Shift',
                        majorGridLines: { width: 0 },
                        majorTickLines: { width: 0 },
                        lineStyle: { color: '#EFEFEF' },
                    }, primaryYAxis: {
                        rangePadding: 'None',
                        labelStyle: { color: 'white' },
                        majorGridLines: { color: '#EFEFEF' },
                        majorTickLines: { width: 0 },
                        title: 'Billion Bushels',
                        titleStyle: { color: 'white' },
                        lineStyle: { width: 0 },
                    }, chartArea: { border: { width: 0 } }, tooltip: { enable: true,
                        template: this.tooltipTemplate.bind(this) }, width: ej2_base_1.Browser.isDevice ? '100%' : '80%', title: 'USA Wheat Production', loaded: this.onChartLoad.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.LineSeries, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Category] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', fill: '#333333', width: 2, marker: {
                                visible: true,
                                width: 10,
                                height: 10,
                                fill: '#C1272D',
                                border: { color: '#333333', width: 2 }
                            }, type: 'Line' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the USA Wheat Production data with default line series in the chart. Data points are enhanced with marker and tooltip.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render and configure the backgroundImage and tooltip template for the charts. You can use backgroundImage, tooltip, fill properties to customize the line. marker is used to represent individual data and its value. Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                " ",
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use Tooltip, we need to inject",
                    React.createElement("code", null, "Tooltip"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the line series can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/documentation/api/chart/series/#type" }, "documentation section"),
                    "."))));
    };
    ChartTooltipTemplate.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('chartTooltip');
        chart.setAttribute('title', '');
    };
    ;
    return ChartTooltipTemplate;
}(sample_base_1.SampleBase));
exports.ChartTooltipTemplate = ChartTooltipTemplate;
