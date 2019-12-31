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
 * Sample for stripline
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var property_pane_1 = require("../common/property-pane");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var xAxisStripLine = [
    {
        start: -1, end: 1.5, text: 'Winter', color: 'url(#winter)',
        textStyle: { size: '18px', color: '#ffffff', fontWeight: '600' },
        border: { width: 0 }, rotation: -90, visible: true
    }, {
        start: 1.5, end: 3.5, text: 'Summer', color: 'url(#summer)',
        textStyle: { size: '18px', color: '#ffffff', fontWeight: '600' },
        border: { width: 0 }, rotation: -90, visible: true
    }, {
        start: 3.5, end: 4.5, text: 'Spring', color: 'url(#spring)',
        textStyle: { size: '18px', color: '#ffffff', fontWeight: '600' },
        border: { width: 0 }, rotation: -90, visible: true
    }, {
        start: 4.5, end: 5.5, text: 'Autumn', color: 'url(#autumn)',
        textStyle: { size: '18px', color: '#ffffff', fontWeight: '600' },
        border: { width: 0 }, rotation: -90, visible: true
    }, {
        start: 5.5, end: 7, text: 'Winter', color: 'url(#winter)',
        textStyle: { size: '18px', color: '#ffffff', fontWeight: '600' },
        border: { width: 0 }, rotation: -90, visible: true
    }, {
        startFromAxis: true, size: 2, isSegmented: true, segmentStart: 22.5, text: 'Average Temperature',
        segmentEnd: 27.5, visible: false, color: '#fc902a',
        textStyle: { size: '18px', color: '#ffffff', fontWeight: '600' }, border: { width: 0 }, rotation: 0
    }, {
        start: 3.5, size: 3, isSegmented: true, segmentStart: 22.5, text: 'Average Temperature',
        segmentEnd: 27.5, visible: false, color: '#fc902a',
        textStyle: { size: '18px', color: '#ffffff', fontWeight: '600' }, border: { width: 0 }, rotation: 0
    }, {
        start: 1.5, size: 2, isSegmented: true, segmentStart: 32.5, text: 'High Temperature',
        segmentEnd: 37.5, visible: false, color: '#ff512f',
        textStyle: { size: '18px', color: '#ffffff', fontWeight: '600' }, border: { width: 0 }, rotation: 0
    }
];
exports.data = [
    { x: 'Sun', y: 25 }, { x: 'Mon', y: 27 }, { x: 'Tue', y: 33 }, { x: 'Wed', y: 36 },
    { x: 'Thu', y: 26 }, { x: 'Fri', y: 27.5 }, { x: 'Sat', y: 23 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    #winter stop {\n        stop-color: #4ca1af;\n    }\n\n    #winter stop[offset=\"0\"] {\n        stop-color: #c4e0e5;\n    }\n\n    #winter stop[offset=\"1\"] {\n        stop-color: #4ca1af;\n    }\n\n    #summer stop {\n        stop-color: #ffa751;\n    }\n\n    #summer stop[offset=\"0\"] {\n        stop-color: #ffe259;\n    }\n\n    #summer stop[offset=\"1\"] {\n        stop-color: #ffa751;\n    }\n\n    #spring stop {\n        stop-color: #1d976c;\n    }\n\n    #spring stop[offset=\"0\"] {\n        stop-color: #93f9b9;\n    }\n\n    #spring stop[offset=\"1\"] {\n        stop-color: #1d976c;\n    }\n\n    #autumn stop {\n        stop-color: #603813;\n    }\n\n    #autumn stop[offset=\"0\"] {\n        stop-color: #b29f94;\n    }\n\n    #autumn stop[offset=\"1\"] {\n        stop-color: #603813;\n    }";
var Stripline = (function (_super) {
    __extends(Stripline, _super);
    function Stripline() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.droplist = [
            { value: 'Vertical' },
            { value: 'Horizontal' },
            { value: 'Segment' }
        ];
        return _this;
        // custom code end
    }
    Stripline.prototype.change = function () {
        this.chartInstance.series[0].fill = 'white';
        this.chartInstance.series[0].marker.fill = 'black';
        this.chartInstance.series[0].marker.border.color = 'white';
        for (var i = 0; i < 3; i++) {
            this.chartInstance.primaryYAxis.stripLines[i].visible = false;
        }
        if (this.dropElement.value === 'Vertical') {
            for (var i = 0; i <= 7; i++) {
                this.chartInstance.primaryXAxis.stripLines[i].visible = !this.chartInstance.primaryXAxis.stripLines[i].isSegmented;
            }
        }
        else if (this.dropElement.value === 'Horizontal') {
            for (var i = 0; i < 3; i++) {
                this.chartInstance.primaryYAxis.stripLines[i].visible = true;
            }
            for (var i = 0; i <= 7; i++) {
                this.chartInstance.primaryXAxis.stripLines[i].visible = false;
            }
        }
        else {
            for (var i = 0; i <= 7; i++) {
                this.chartInstance.primaryXAxis.stripLines[i].visible = this.chartInstance.primaryXAxis.stripLines[i].isSegmented;
            }
            this.chartInstance.series[0].fill = 'black';
            this.chartInstance.series[0].marker.fill = 'white';
            this.chartInstance.series[0].marker.border.color = 'black';
        }
        this.chartInstance.refresh();
    };
    ;
    Stripline.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("svg", { style: { height: 0 } },
                React.createElement("defs", null,
                    React.createElement("linearGradient", { id: "winter", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "summer", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "spring", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "autumn", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })))),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-8' },
                    React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: function (chart) { return _this.chartInstance = chart; }, primaryXAxis: {
                            valueType: 'Category', majorGridLines: { width: 0 },
                            stripLines: xAxisStripLine
                        }, load: this.load.bind(this), primaryYAxis: {
                            minimum: 10, maximum: 40, interval: 5,
                            lineStyle: { color: '#808080' }, labelFormat: '{value} °C', rangePadding: 'None',
                            stripLines: [
                                {
                                    start: 30, end: 40, text: 'High Temperature', color: '#ff512f', visible: false,
                                    textStyle: { size: '18px', color: '#ffffff', fontWeight: '600' }, border: { width: 0 },
                                }, {
                                    start: 20, end: 30, text: 'Average Temperature', color: '#fc902a', visible: false,
                                    textStyle: { size: '18px', color: '#ffffff', fontWeight: '600' }, border: { width: 0 },
                                }, {
                                    start: 10, end: 20, text: 'Low Temperature', visible: false,
                                    textStyle: { size: '18px', color: '#ffffff', fontWeight: '600' }, border: { width: 0 }, color: '#f9d423'
                                }
                            ]
                        }, tooltip: {
                            enable: true
                        }, legendSettings: { visible: false }, loaded: this.onChartLoad.bind(this), title: 'Weather Report' },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.LineSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.StripLine] }),
                        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, xName: 'x', yName: 'y', width: 2, fill: 'white', type: 'Line', name: 'Weather', marker: { visible: true, width: 10, height: 10, border: { width: 2, color: 'white' }, fill: '#666666' } })))),
                React.createElement("div", { className: 'col-md-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null, "StripLine Types:")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: 120, id: "selmode", style: { "width": "auto" }, change: this.change.bind(this), ref: function (d) { return _this.dropElement = d; }, dataSource: this.droplist, fields: { text: 'value', value: 'value' }, value: "Vertical" })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample highlights certain range in an axis by using stripline feature.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the stripline charts. You can use stripline by enable the",
                    React.createElement("code", null, "visible"),
                    " property. Striplines are rendered in the specified",
                    React.createElement("code", null, "start"),
                    " and",
                    React.createElement("code", null, "end"),
                    " range and you can add more than one stripline for an axis."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use strip line feature, we need to inject",
                    React.createElement("code", null, "StripLine"),
                    " module using",
                    React.createElement("code", null, "Chart.Inject(StripLine)"),
                    " method."),
                React.createElement("p", null,
                    "More information on the strip line can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype" }, "documentation section"),
                    "."))));
    };
    Stripline.prototype.onChartLoad = function (args) {
        document.getElementById('charts').setAttribute('title', '');
    };
    ;
    // custom code start
    Stripline.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    ;
    return Stripline;
}(sample_base_1.SampleBase));
exports.Stripline = Stripline;
