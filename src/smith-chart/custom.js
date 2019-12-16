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
 * Customization sample for smith chart
 */
var React = require("react");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
// custom code start
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    #radius > * {\n        padding: 0px !important;\n    }";
var slidercss = "  \n    .content-wrapper {\n        width: 40%;\n        margin: 0 auto;\n        min-width: 100px;\n    }";
// custom code end
var Customization = /** @class */ (function (_super) {
    __extends(Customization, _super);
    function Customization() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.droplist = [
            { text: 'Top', value: 'Top' },
            { text: 'Bottom', value: 'Bottom' },
            { text: 'Left', value: 'Left' },
            { text: 'Right', value: 'Right' },
        ];
        return _this;
    }
    Customization.prototype.radiusChange = function () {
        this.smithchartInstance.radius = parseInt(this.radiusElement.value.toString(), 10) / 10;
        document.getElementById('radius1').innerHTML = 'Radius <span>&nbsp;&nbsp;&nbsp;' + (parseInt(this.radiusElement.value.toString(), 10) / 10);
        this.smithchartInstance.refresh();
    };
    Customization.prototype.markerChange = function (args) {
        if (args.checked) {
            this.smithchartInstance.series[0].marker.visible = true;
            this.smithchartInstance.series[1].marker.visible = true;
        }
        else {
            this.smithchartInstance.series[0].marker.visible = false;
            this.smithchartInstance.series[1].marker.visible = false;
        }
        this.smithchartInstance.refresh();
    };
    Customization.prototype.labelChange = function (args) {
        if (args.checked) {
            this.smithchartInstance.series[0].marker.dataLabel.visible = true;
            this.smithchartInstance.series[1].marker.dataLabel.visible = true;
        }
        else {
            this.smithchartInstance.series[0].marker.dataLabel.visible = false;
            this.smithchartInstance.series[1].marker.dataLabel.visible = false;
        }
        this.smithchartInstance.refresh();
    };
    Customization.prototype.animateChange = function (args) {
        if (args.checked) {
            this.smithchartInstance.series[0].enableAnimation = true;
            this.smithchartInstance.series[1].enableAnimation = true;
        }
        else {
            this.smithchartInstance.series[0].enableAnimation = false;
            this.smithchartInstance.series[1].enableAnimation = false;
        }
        this.smithchartInstance.refresh();
    };
    Customization.prototype.tooltipChange = function (args) {
        if (args.checked) {
            this.smithchartInstance.series[0].tooltip.visible = true;
            this.smithchartInstance.series[1].tooltip.visible = true;
        }
        else {
            this.smithchartInstance.series[0].tooltip.visible = false;
            this.smithchartInstance.series[1].tooltip.visible = false;
        }
        this.smithchartInstance.refresh();
    };
    Customization.prototype.legendChange = function (args) {
        if (args.checked) {
            this.smithchartInstance.legendSettings.visible = true;
        }
        else {
            this.smithchartInstance.legendSettings.visible = false;
        }
        this.smithchartInstance.refresh();
    };
    Customization.prototype.positionChange = function () {
        this.smithchartInstance.legendSettings.position = this.positionElement.value.toString();
        this.smithchartInstance.refresh();
    };
    // custom code start
    Customization.prototype.load = function (args) {
        args.smithchart.title.text = 'Impedance Transmission';
        args.smithchart.title.visible = true;
        var theme = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.smithchart.theme = (theme.charAt(0).toUpperCase() + theme.slice(1));
    };
    // custom code end
    Customization.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'col-md-8 control-section' },
                React.createElement(ej2_react_charts_1.SmithchartComponent, { load: this.load.bind(this), id: 'smith-chart', ref: function (gauge) { return _this.smithchartInstance = gauge; }, horizontalAxis: { minorGridLines: { visible: true } }, radialAxis: { minorGridLines: { visible: true } }, radius: 1, legendSettings: {
                        visible: true,
                        shape: 'Circle',
                        position: 'Top'
                    } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.TooltipRender, ej2_react_charts_1.SmithchartLegend] }),
                    React.createElement(ej2_react_charts_1.SmithchartSeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SmithchartSeriesDirective, { points: [
                                { resistance: 10, reactance: 25 }, { resistance: 8, reactance: 6 },
                                { resistance: 6, reactance: 4.5 }, { resistance: 4.5, reactance: 4 },
                                { resistance: 3.5, reactance: 3 }, { resistance: 2.5, reactance: 2 },
                                { resistance: 2, reactance: 1.5 }, { resistance: 1.5, reactance: 1.25 },
                                { resistance: 1, reactance: 0.9 }, { resistance: 0.5, reactance: 0.6 },
                                { resistance: 0.3, reactance: 0.4 }, { resistance: 0, reactance: 0.15 },
                            ], name: 'Transmission1', enableAnimation: false, width: 2, tooltip: { visible: true }, enableSmartLabels: false, fill: '#0F94C4', marker: { shape: 'rectangle', visible: true, border: { width: 2 } } }),
                        React.createElement(ej2_react_charts_1.SmithchartSeriesDirective, { points: [
                                { resistance: 20, reactance: -50 }, { resistance: 10, reactance: -10 },
                                { resistance: 9, reactance: -4.5 }, { resistance: 8, reactance: -3.5 },
                                { resistance: 7, reactance: -2.5 }, { resistance: 6, reactance: -1.5 },
                                { resistance: 5, reactance: -1 }, { resistance: 4.5, reactance: -0.8 },
                                { resistance: 3.5, reactance: -0.8 }, { resistance: 2.5, reactance: -0.4 },
                                { resistance: 2, reactance: -0.2 }, { resistance: 1.5, reactance: 0 },
                                { resistance: 1, reactance: 0.1 }, { resistance: 0.5, reactance: 0.2 },
                                { resistance: 0.3, reactance: 0.15 }, { resistance: 0, reactance: 0.05 },
                            ], name: 'Transmission2', enableAnimation: false, width: 2, tooltip: { visible: true }, enableSmartLabels: false, fill: '#EE0C88', marker: { shape: 'rectangle', visible: true, border: { width: 2 } } })))),
            React.createElement("div", { className: 'col-md-4 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%', marginBottom: '20px' } },
                        React.createElement("tr", { style: { "height": "35px" } },
                            React.createElement("td", { style: { "width": "70%" } },
                                React.createElement("div", { id: 'radius1' },
                                    "Radius ",
                                    React.createElement("span", null, "\u00A0\u00A0\u00A01"),
                                    " ")),
                            React.createElement("td", { style: { "width": "50%" } },
                                React.createElement("div", { className: "content-wrapper" },
                                    React.createElement("style", null,
                                        " ",
                                        slidercss,
                                        " "),
                                    React.createElement(ej2_react_inputs_1.SliderComponent, { id: "radius", change: this.radiusChange.bind(this), ref: function (slider) { return _this.radiusElement = slider; }, name: "radius", step: 1, value: 10, type: 'MinRange', min: 0, max: 10 })))),
                        React.createElement("tr", { style: { "height": "35px" } },
                            React.createElement("td", { style: { "width": "70%" } },
                                React.createElement("div", null, "Marker")),
                            React.createElement("td", { style: { "width": "50%" } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'marker', checked: true, change: this.markerChange.bind(this) }, " ")))),
                        React.createElement("tr", { style: { "height": "35px" } },
                            React.createElement("td", { style: { "width": "70%" } },
                                React.createElement("div", null, "Data Label")),
                            React.createElement("td", { style: { "width": "50%" } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'datalabel', change: this.labelChange.bind(this) }, " ")))),
                        React.createElement("tr", { style: { "height": "35px" } },
                            React.createElement("td", { style: { "width": "70%" } },
                                React.createElement("div", null, "Animation")),
                            React.createElement("td", { style: { "width": "50%" } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'animate', change: this.animateChange.bind(this) }, " ")))),
                        React.createElement("tr", { style: { "height": "35px" } },
                            React.createElement("td", { style: { "width": "70%" } },
                                React.createElement("div", null, "Tooltip")),
                            React.createElement("td", { style: { "width": "50%" } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'tooltip', checked: true, change: this.tooltipChange.bind(this) }, " ")))),
                        React.createElement("tr", { style: { "height": "35px" } },
                            React.createElement("td", { style: { "width": "70%" } },
                                React.createElement("div", null, "Legend")),
                            React.createElement("td", { style: { "width": "50%" } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'legend', checked: true, change: this.legendChange.bind(this) }, " ")))),
                        React.createElement("tr", { style: { "height": "35px" } },
                            React.createElement("td", { style: { "width": "70%" } },
                                React.createElement("div", null, "Legend Position")),
                            React.createElement("td", { style: { "width": "50%" } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "mode", width: "100px", index: 0, change: this.positionChange.bind(this), ref: function (d) { return _this.positionElement = d; }, dataSource: this.droplist, fields: { text: 'text', value: 'value' } }))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample visualizes two transmissions in Smith chart. Rendering Smith chart can be changed by using the ",
                    React.createElement("code", null, "Render Type"),
                    " in properties panel.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render a Smith chart with multiple series. Legend has been enabled to denote the series in Smith chart."),
                React.createElement("br", null),
                React.createElement("b", null, "Injecting Module"),
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("p", null,
                    "Smith chart component features are segregated into individual feature-wise modules. To use a tooltip, inject the ",
                    React.createElement("code", null, "Tooltip"),
                    " module using the ",
                    React.createElement("code", null, "SmithChart.Inject(TooltipRender)"),
                    " method, and use a legend by injecting the ",
                    React.createElement("code", null, "Legend"),
                    " module using the ",
                    React.createElement("code", null, "SmithChart.Inject(Legend)"),
                    " method."))));
    };
    return Customization;
}(sample_base_1.SampleBase));
exports.Customization = Customization;
