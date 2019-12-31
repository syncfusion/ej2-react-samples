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
  * Default sample for smith chart
 */
var React = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
//custom code start
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
// custom code end
var Default = (function (_super) {
    __extends(Default, _super);
    function Default() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.droplist = [
            { text: 'Impedance', value: 'Impedance' },
            { text: 'Admittance', value: 'Admittance' },
        ];
        return _this;
    }
    Default.prototype.typeChange = function () {
        var element = this.dropElement.value;
        this.smithchartInstance.renderType = element;
        this.smithchartInstance.refresh();
    };
    // custom code start
    Default.prototype.load = function (args) {
        args.smithchart.title.text = 'Transmission details';
        args.smithchart.title.visible = true;
        var theme = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.smithchart.theme = (theme.charAt(0).toUpperCase() + theme.slice(1));
    };
    // custom code end
    Default.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'col-md-9 control-section' },
                React.createElement(ej2_react_charts_1.SmithchartComponent, { load: this.load.bind(this), id: 'smith-chart', ref: function (gauge) { return _this.smithchartInstance = gauge; }, legendSettings: { visible: true, shape: 'Circle' } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.SmithchartLegend, ej2_react_charts_1.TooltipRender] }),
                    React.createElement(ej2_react_charts_1.SmithchartSeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SmithchartSeriesDirective, { points: [
                                { resistance: 10, reactance: 25 }, { resistance: 8, reactance: 6 },
                                { resistance: 6, reactance: 4.5 }, { resistance: 4.5, reactance: 2 },
                                { resistance: 3.5, reactance: 1.6 }, { resistance: 2.5, reactance: 1.3 },
                                { resistance: 2, reactance: 1.2 }, { resistance: 1.5, reactance: 1 },
                                { resistance: 1, reactance: 0.8 }, { resistance: 0.5, reactance: 0.4 },
                                { resistance: 0.3, reactance: 0.2 }, { resistance: 0, reactance: 0.15 },
                            ], name: 'Transmission1', enableAnimation: true, tooltip: { visible: true }, marker: { shape: 'Circle', visible: true, border: { width: 2 } } }),
                        React.createElement(ej2_react_charts_1.SmithchartSeriesDirective, { points: [
                                { resistance: 20, reactance: -50 }, { resistance: 10, reactance: -10 },
                                { resistance: 9, reactance: -4.5 }, { resistance: 8, reactance: -3.5 },
                                { resistance: 7, reactance: -2.5 }, { resistance: 6, reactance: -1.5 },
                                { resistance: 5, reactance: -1 }, { resistance: 4.5, reactance: -0.5 },
                                { resistance: 3.5, reactance: 0 }, { resistance: 2.5, reactance: 0.4 },
                                { resistance: 2, reactance: 0.5 }, { resistance: 1.5, reactance: 0.5 },
                                { resistance: 1, reactance: 0.4 }, { resistance: 0.5, reactance: 0.2 },
                                { resistance: 0.3, reactance: 0.1 }, { resistance: 0, reactance: 0.05 },
                            ], name: 'Transmission2', enableAnimation: true, tooltip: { visible: true }, marker: { shape: 'Circle', visible: true, border: { width: 2 } } })))),
            React.createElement("div", { className: 'col-md-3 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", { style: { width: '60%' } },
                                React.createElement("div", null, "Render Type")),
                            React.createElement("td", { style: { width: '40%' } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", index: 0, ref: function (d) { return _this.dropElement = d; }, change: this.typeChange.bind(this), dataSource: this.droplist, fields: { text: 'text', value: 'value' } }))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample visualizes two transmissions in Smith chart. Rendering Smith chart can be changed by using the ",
                    React.createElement("code", null, "Render Type"),
                    " in properties panel.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render a Smith chart with multiple series. Legend has been enabled to denote the series in Smith chart."),
                React.createElement("p", null, "Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a data point or tap a data point in touch enabled devices"),
                React.createElement("br", null),
                React.createElement("b", null, "Injecting Module"),
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("p", null,
                    "Smith chart component features are segregated into individual feature-wise modules. To use a tooltip, inject the  ",
                    React.createElement("code", null, "Tooltip"),
                    " module using the ",
                    React.createElement("code", null, "SmithChart.Inject(TooltipRender)"),
                    " method, and use a legend by injecting the ",
                    React.createElement("code", null, "Legend"),
                    " module using the ",
                    React.createElement("code", null, "SmithChart.Inject(Legend)"),
                    " method."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
