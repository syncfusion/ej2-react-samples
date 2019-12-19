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
exports.data1 = [
    { 'x': 'USA', y: 46, text: 'United States of America: 46' },
    { 'x': 'China', y: 26, text: 'China: 26' },
    { 'x': 'Russia', y: 19, text: 'Russia: 19' },
    { 'x': 'Germany', y: 17, text: 'Germany: 17' },
    { 'x': 'Japan', y: 12, text: 'Japan: 12' },
    { 'x': 'France', y: 10, text: 'France: 10' },
    { 'x': 'South Korea', y: 9, text: 'South Korea: 9' },
    { 'x': 'Great Britain', y: 27, text: 'Great Britain: 27' },
    { 'x': 'Italy', y: 8, text: 'Italy: 8' },
    { 'x': 'Australia', y: 8, text: 'Australia: 8' },
    { 'x': 'Netherlands', y: 8, text: 'Netherlands: 8' },
    { 'x': 'NewZealand', y: 4, text: 'New Zealand: 4' },
    { 'x': 'Uzbekistan', y: 4, text: 'Uzbekistan: 4' },
    { 'x': 'Kazakhstan', y: 3, text: 'Kazakhstan: 3' },
    { 'x': 'Colombia', y: 3, text: 'Colombia: 3' },
    { 'x': 'Switzerland', y: 3, text: 'Switzerland: 3' },
    { 'x': 'Argentina', y: 3, text: 'Argentina: 3' },
    { 'x': 'South Africa', y: 2, text: 'South Africa: 2' },
    { 'x': 'North Korea', y: 2, text: 'North Korea: 2' }
];
var SmartLabels = (function (_super) {
    __extends(SmartLabels, _super);
    function SmartLabels() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SmartLabels.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.AccumulationChartComponent, { id: 'pie-chart', title: 'RIO Olympics Gold', tooltip: { enable: true, format: '${point.x} : <b>${point.y}%</b>' }, load: this.load.bind(this), legendSettings: {
                        visible: false
                    }, loaded: this.onChartLoad.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AccumulationDataLabel, ej2_react_charts_1.AccumulationTooltip, ej2_react_charts_1.PieSeries] }),
                    React.createElement(ej2_react_charts_1.AccumulationSeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.AccumulationSeriesDirective, { name: 'RIO', dataSource: exports.data1, xName: 'x', yName: 'y', dataLabel: {
                                visible: true, position: 'Outside',
                                connectorStyle: { length: '10%' }, name: 'text',
                            } })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates the Rio Olympic\u2019s gold medal count by using smart labels in the chart. The smart label placement for a series can be shown, when it contains more of points.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    " In this example, you can see how to arrange the labels smartly without overlapping with each other. You can use ",
                    React.createElement("code", null, "enableSmartLabels"),
                    " property to enable or disable the action. Legend with paging is enabled in this sample."),
                React.createElement("p", { style: { fontWeight: 500 } }, " Injecting Module "),
                React.createElement("p", null,
                    " Accumulation chart component features are segregated into individual feature-wise modules. To use AccumulationDataLabel, we need to inject ",
                    React.createElement("code", null, "AccumulationDataLabel"),
                    " into ",
                    React.createElement("code", null, "services"),
                    "."))));
    };
    SmartLabels.prototype.onChartLoad = function (args) {
        document.getElementById('pie-chart').setAttribute('title', '');
    };
    ;
    // custom code start
    SmartLabels.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark");
    };
    ;
    return SmartLabels;
}(sample_base_1.SampleBase));
exports.SmartLabels = SmartLabels;
