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
 * Sample for Ranges
 */
var React = require("react");
var property_pane_1 = require("../common/property-pane");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loaded = false;
        // custom code end
        // Code for Property Panel
        _this.positionlist = [
            { value: 'Top' },
            { value: 'Bottom' },
            { value: 'Left' },
            { value: 'Right' },
            { value: 'Auto' }
        ];
        _this.alignlist = [
            { value: 'Far' },
            { value: 'Center' },
            { value: 'Near' }
        ];
        _this.shapelist = [
            { value: 'Circle' },
            { value: 'Rectangle' },
            { value: 'Triangle' },
            { value: 'Diamond' },
            { value: 'InvertedTriangle' }
        ];
        return _this;
    }
    // custom code start
    Circle.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    Circle.prototype.position = function () {
        this.gauge.legendSettings.position = this.positionElement.value;
    };
    Circle.prototype.alignment = function () {
        this.gauge.legendSettings.alignment = this.alignElement.value;
    };
    Circle.prototype.shape = function () {
        this.gauge.legendSettings.shape = this.dropElement.value;
    };
    Circle.prototype.enableToggleLegend = function (args) {
        this.gauge.legendSettings.toggleVisibility = args.checked;
    };
    Circle.prototype.enableLegend = function (args) {
        this.gauge.legendSettings.visible = args.checked;
        this.gauge.refresh();
    };
    Circle.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-lg-8' },
                    React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.load.bind(this), id: 'range-container', loaded: this.onChartLoad.bind(this), title: 'Measure of wind speed in Km/h', legendSettings: { visible: true, position: "Bottom" }, ref: function (gauge) { return _this.gauge = gauge; } },
                        React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations, ej2_react_circulargauge_1.Legend] }),
                        React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 210, endAngle: 150, radius: '80%', minimum: 0, maximum: 120, majorTicks: {
                                    color: '#9E9E9E', height: 16, interval: 20
                                }, lineStyle: { width: 2 }, minorTicks: {
                                    height: 8, interval: 10
                                }, labelStyle: {
                                    position: 'Inside', useRangeColor: false,
                                    font: {
                                        size: '12px', color: '#424242', fontFamily: 'Roboto', fontStyle: 'Regular'
                                    }
                                } },
                                React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 5, color: '#ccffff', radius: '110%', legendText: 'Light air' }),
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 5, end: 11, color: '#99ffff', radius: '110%', legendText: 'Light breeze' }),
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 11, end: 19, color: '#99ff99', radius: '110%', legendText: 'Gentle breeze' }),
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 19, end: 28, color: '#79ff4d', radius: '110%', legendText: 'Moderate breeze' }),
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 28, end: 49, color: '#c6ff1a', radius: '110%', legendText: 'Strong breeze' }),
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 49, end: 74, color: '#e6ac00', radius: '110%', legendText: 'Gale' }),
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 74, end: 102, color: '#ff6600', radius: '110%', legendText: 'Storm' }),
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 102, end: 120, color: '#ff0000', radius: '110%', legendText: 'Hurricane force' })),
                                React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 70, radius: '60%', color: '#757575', pointerWidth: 8, border: {
                                            width: 0,
                                            color: 'transparent'
                                        }, animation: { enable: true }, cap: {
                                            radius: 7,
                                            color: '#757575'
                                        }, needleTail: { length: '18%' } })))))),
                React.createElement("div", { className: 'col-lg-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", { style: { width: '20%' } },
                                        React.createElement("div", { id: 'enablePointer' }, "Show Legend")),
                                    React.createElement("td", { style: { width: '40%' } },
                                        React.createElement("div", { style: { paddingTop: '0px' } },
                                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'enable', checked: true, change: this.enableLegend.bind(this) })))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", { style: { width: '20%' } },
                                        React.createElement("div", { id: 'enable' }, "Show range when the legend item is toggled")),
                                    React.createElement("td", { style: { width: '40%' } },
                                        React.createElement("div", { style: { paddingTop: '0px' } },
                                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'enableToggle', checked: true, change: this.enableToggleLegend.bind(this) })))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { id: 'position' }, "Position")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", index: 0, change: this.position.bind(this), ref: function (d) { return _this.positionElement = d; }, dataSource: this.positionlist, fields: { text: 'value', value: 'value' } })))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { id: 'range' }, "Alignment")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", index: 0, change: this.alignment.bind(this), ref: function (d) { return _this.alignElement = d; }, dataSource: this.alignlist, fields: { text: 'value', value: 'value' } })))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { id: 'pointColor' }, "Shape")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", index: 0, change: this.shape.bind(this), ref: function (d) { return _this.dropElement = d; }, dataSource: this.shapelist, fields: { text: 'value', value: 'value' } }))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes moving air types in the legend based on their speed. The visibility, shape, alignment and position of the legend can be changed using the properties panel options.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render a legend in circular gauge. A legend item denotes the axis ranges. Any number of legend items can be added to a legend. You can bind the desired colors  and legend text to the corresponding ranges."),
                React.createElement("p", null,
                    "More information on the labels can be found in this",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation" }, " documentation section"),
                    "."),
                React.createElement("br", null),
                React.createElement("p", { className: 'description-header' }, "Injecting Module"),
                React.createElement("p", null,
                    "The circular gauge component features are segregated into individual modules by feature. To use a legend, inject the legend module using the ",
                    React.createElement("code", null, "Legend"),
                    " into ",
                    React.createElement("code", null, "services"),
                    "."))));
    };
    Circle.prototype.onChartLoad = function (args) {
        var _this = this;
        if (!this.loaded) {
            this.loaded = true;
            this.legendPosition = new ej2_react_dropdowns_1.DropDownList({
                index: 0,
                width: 130,
                change: function () {
                    var position = _this.legendPosition.value.toString();
                }
            });
            this.legendPosition.appendTo('#legendPosition');
        }
    };
    return Circle;
}(sample_base_1.SampleBase));
exports.Circle = Circle;
