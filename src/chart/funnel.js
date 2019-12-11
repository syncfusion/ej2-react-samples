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
exports.data1 = [{ x: "China", y: 1409517397, text: "China" },
    { x: "India", y: 1339180127, text: "India" },
    { x: "United States", y: 324459463, text: "United States" },
    { x: "Indonesia", y: 263991379, text: "Indonesia" },
    { x: "Brazil", y: 209288278, text: "Brazil" },
    { x: "Pakistan", y: 197015955, text: "Pakistan" },
    { x: "Nigeria", y: 190886311, text: "Nigeria" },
    { x: "Bangladesh", y: 164669751, text: "Bangladesh" },
    { x: "Russia", y: 143989754, text: "Russia" },
    { x: "Mexico", y: 129163276, text: "Mexico" },
    { x: "Japan", y: 127484450, text: " Japan" },
    { x: "Ethiopia", y: 104957438, text: "Ethiopia" },
    { x: "Philippines", y: 104918090, text: "Philippines" },
    { x: "Egypt", y: 97553151, text: "Egypt" },
    { x: "Vietnam", y: 95540800, text: "Vietnam" },
    { x: "Germany", y: 82114224, text: "Germany" }];
var Funnel = /** @class */ (function (_super) {
    __extends(Funnel, _super);
    function Funnel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Funnel.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-lg-9' },
                    React.createElement(ej2_react_charts_1.AccumulationChartComponent, { id: 'funnel-chart', ref: function (funnel) { return _this.funnel = funnel; }, title: 'Top populated countries in 2017', load: this.load.bind(this), tooltip: { enable: true, format: '${point.x} : <b>${point.y}</b>' }, resized: this.onChartResized.bind(this), loaded: this.onChartLoad.bind(this) },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.FunnelSeries, ej2_react_charts_1.AccumulationTooltip, ej2_react_charts_1.AccumulationDataLabel] }),
                        React.createElement(ej2_react_charts_1.AccumulationSeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.AccumulationSeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', type: 'Funnel', width: '60%', height: '80%', neckWidth: '15%', gapRatio: 0.03, neckHeight: '18%', explode: false, dataLabel: {
                                    name: 'text', visible: true, position: 'Outside', connectorStyle: { length: "6%" }
                                } })))),
                React.createElement("div", { className: 'col-lg-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", null,
                                        "Neck Width:",
                                        React.createElement("p", { id: "neckWidth", style: { fontWeight: 'normal' } }, "15%"))),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", { "data-role": "rangeslider" },
                                        React.createElement("input", { type: "range", name: "range-min", onChange: this.pyramidneckWidth.bind(this), ref: function (s) { return _this.slider = s; }, id: "pyramidNeckWidth", defaultValue: "15", min: "0", max: "45", style: { width: '90%' } })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", null,
                                        "Neck Height:",
                                        React.createElement("p", { id: "neckHeight", style: { fontWeight: 'normal' } }, "18%"))),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", { "data-role": "rangeslider" },
                                        React.createElement("input", { type: "range", name: "range-min", onChange: this.pyramidneckHeight.bind(this), ref: function (s) { return _this.slider = s; }, id: "pyramidNeckHeight", defaultValue: "18", min: "0", max: "50", style: { marginLeft: '-5px' } })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the data about population of different countries by using default funnel series. Datalabel shows the Information about the points and are arranged smartly.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    " In this example, you can see how to render funnel chart.",
                    React.createElement("code", null, "dataLabel"),
                    " is used to represent individual data and its value, here the labels are arranged smartly to avoid the overlap."),
                React.createElement("p", null,
                    " ",
                    React.createElement("code", null, "Tooltip"),
                    " is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use Funnel series, we need to inject",
                    React.createElement("code", null, "FunnelSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."))));
    };
    Funnel.prototype.pyramidneckWidth = function (e) {
        var neckWidth = document.getElementById('pyramidNeckWidth').value;
        this.funnel.series[0].neckWidth = neckWidth + '%';
        document.getElementById('neckWidth').innerHTML = neckWidth + '%';
        this.funnel.removeSvg();
        this.funnel.refreshSeries();
        this.funnel.refreshChart();
    };
    ;
    Funnel.prototype.pyramidneckHeight = function (e) {
        var neckHeight = document.getElementById('pyramidNeckHeight').value;
        this.funnel.series[0].neckHeight = neckHeight + '%';
        document.getElementById('neckHeight').innerHTML = neckHeight + '%';
        this.funnel.series[0].animation.enable = false;
        this.funnel.removeSvg();
        this.funnel.refreshSeries();
        this.funnel.refreshChart();
    };
    ;
    Funnel.prototype.onChartLoad = function (args) {
        document.getElementById('funnel-chart').setAttribute('title', '');
    };
    ;
    Funnel.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        if (args.accumulation.availableSize.width < args.accumulation.availableSize.height) {
            args.accumulation.series[0].width = '80%';
            args.accumulation.series[0].height = '70%';
        }
    };
    ;
    Funnel.prototype.onChartResized = function (args) {
        var bounds = document.getElementById('funnel-chart').getBoundingClientRect();
        if (bounds.width < bounds.height) {
            args.accumulation.series[0].width = '80%';
            args.accumulation.series[0].height = '70%';
        }
        else {
            args.accumulation.series[0].width = '60%';
            args.accumulation.series[0].height = '80%';
        }
    };
    return Funnel;
}(sample_base_1.SampleBase));
exports.Funnel = Funnel;
