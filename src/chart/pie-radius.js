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
    { x: 'Argentina', y: 505370, r: '100' },
    { x: 'Belgium', y: 551500, r: '118.7' },
    { x: 'Cuba', y: 312685, r: '124.6' },
    { x: 'Dominican Republic', y: 350000, r: '137.5' },
    { x: 'Egypt', y: 301000, r: '150.8' },
    { x: 'Kazakhstan', y: 300000, r: '155.5' },
    { x: 'Somalia', y: 357022, r: '160.6' }
];
var PieRadius = /** @class */ (function (_super) {
    __extends(PieRadius, _super);
    function PieRadius() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PieRadius.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.AccumulationChartComponent, { id: 'pie-chart', ref: function (pie) { return _this.pie = pie; }, legendSettings: {
                        visible: true
                    }, enableSmartLabels: true, enableAnimation: true, load: this.load.bind(this), tooltip: { enable: true } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AccumulationLegend, ej2_react_charts_1.PieSeries, ej2_react_charts_1.AccumulationDataLabel, ej2_react_charts_1.AccumulationTooltip] }),
                    React.createElement(ej2_react_charts_1.AccumulationSeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.AccumulationSeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', innerRadius: '20%', dataLabel: {
                                visible: true, position: 'Outside', name: 'x'
                            }, radius: 'r' }))),
                React.createElement("div", { id: "action-description" },
                    React.createElement("p", null, "This sample compares countries by population density and total area by using the various radius in pie series.")),
                React.createElement("div", { id: "description" },
                    React.createElement("p", null,
                        " In this example, you can see how to render doughnut chart with different radius. You can use ",
                        React.createElement("code", null, "radius"),
                        " mapping property to achieve this feature.",
                        React.createElement("code", null, "dataLabel"),
                        "  is used to represent individual data and its value."),
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
                        ".")))));
    };
    // custom code start
    PieRadius.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark");
    };
    ;
    return PieRadius;
}(sample_base_1.SampleBase));
exports.PieRadius = PieRadius;
