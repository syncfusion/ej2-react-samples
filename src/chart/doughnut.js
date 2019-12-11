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
exports.data1 = [{ x: 'Labour', y: 18, text: '18%' }, { x: 'Legal', y: 8, text: '8%' },
    { x: 'Production', y: 15, text: '15%' }, { x: 'License', y: 11, text: '11%' },
    { x: 'Facilities', y: 18, text: '18%' }, { x: 'Taxes', y: 14, text: '14%' },
    { x: 'Insurance', y: 16, text: '16%' }];
var AccumulationDoughnut = /** @class */ (function (_super) {
    __extends(AccumulationDoughnut, _super);
    function AccumulationDoughnut() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AccumulationDoughnut.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.AccumulationChartComponent, { id: "pie-chart", title: 'Project Cost Breakdown', legendSettings: {
                        visible: true,
                        position: 'Top'
                    }, enableSmartLabels: true, load: this.load.bind(this), tooltip: { enable: true }, loaded: this.onChartLoad.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AccumulationLegend, ej2_react_charts_1.PieSeries, ej2_react_charts_1.AccumulationDataLabel] }),
                    React.createElement(ej2_react_charts_1.AccumulationSeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.AccumulationSeriesDirective, { name: 'Project', dataSource: exports.data1, xName: 'x', yName: 'y', innerRadius: '40%', startAngle: 0, endAngle: 360, radius: '70%', explode: true, explodeOffset: '10%', explodeIndex: 3, dataLabel: {
                                visible: true,
                                name: 'text',
                                position: 'Inside',
                                font: {
                                    fontWeight: '600',
                                    color: '#ffffff'
                                }
                            } })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the project cost breakdown statistics by using doughnut series. Datalabel shows the Information about the points. While hovering on the slice, border will be highlighted.")),
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
                    React.createElement("code", null, "PieSeries"),
                    " into ",
                    React.createElement("code", null, "services"),
                    "."))));
    };
    AccumulationDoughnut.prototype.onChartLoad = function (args) {
        document.getElementById('pie-chart').setAttribute('title', '');
    };
    ;
    // custom code start
    AccumulationDoughnut.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/dark/i, "Dark").
            replace(/light/i, "Light");
    };
    ;
    return AccumulationDoughnut;
}(sample_base_1.SampleBase));
exports.AccumulationDoughnut = AccumulationDoughnut;
