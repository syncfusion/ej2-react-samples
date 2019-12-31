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
 * Sample for containers
 */
var React = require("react");
var ej2_react_lineargauge_1 = require("@syncfusion/ej2-react-lineargauge");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var Container = (function (_super) {
    __extends(Container, _super);
    function Container() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // custom code end
        _this.droplist = [
            { value: 'Vertical' },
            { value: 'Horizontal' }
        ];
        _this.modelist = [
            { value: 'Thermometer' },
            { value: 'Normal' },
            { value: 'RoundedRectangle' }
        ];
        return _this;
    }
    Container.prototype.orienatationChange = function () {
        this.gaugeInstance.orientation = this.orientationElement.value;
        this.gaugeInstance.refresh();
    };
    Container.prototype.containerChange = function () {
        this.gaugeInstance.container.type = this.containerElement.value;
        this.gaugeInstance.refresh();
    };
    // custom code start
    Container.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    Container.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-lg-8' },
                    React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), id: 'gauge', ref: function (gauge) { return _this.gaugeInstance = gauge; }, title: 'Temperature Measure', container: { width: 13, type: 'Thermometer', roundedCornerRadius: 5 } },
                        React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_lineargauge_1.AxisDirective, { minimum: 0, maximum: 180, line: { width: 0 }, minorTicks: { color: '#9e9e9e' }, majorTicks: { interval: 20, color: '#9e9e9e' } },
                                React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 90, height: 13, width: 13, type: 'Bar', roundedCornerRadius: 5, color: '#f02828' }))),
                            React.createElement(ej2_react_lineargauge_1.AxisDirective, { minimum: 0, maximum: 180, opposedPosition: true, line: { width: 0 }, majorTicks: { interval: 20 } },
                                React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { width: 0 })))))),
                React.createElement("div", { className: 'col-lg-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", null, "Orientation")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: 120, id: "orientationMode", style: { "width": "90%" }, change: this.orienatationChange.bind(this), className: "form-control", ref: function (d) { return _this.orientationElement = d; }, dataSource: this.droplist, fields: { text: 'value', value: 'value' }, value: "Vertical" })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", null, "Container Type")),
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingBottom: '20px', width: '90%' } },
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: 120, id: "containerMode", style: { "width": "90%" }, change: this.containerChange.bind(this), className: "form-control", ref: function (d) { return _this.containerElement = d; }, dataSource: this.modelist, fields: { text: 'value', value: 'value' }, value: "Thermometer" })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates the type of containers used in linear gauge. Orientation and container type of linear gauge can be changed by using ",
                    React.createElement("code", null, "Orientation"),
                    " and ",
                    React.createElement("code", null, "Container Type"),
                    " options.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the ranges in linear gauge. You can use ",
                    React.createElement("code", null, "start"),
                    ",",
                    React.createElement("code", null, "end"),
                    ", ",
                    React.createElement("code", null, "startWidth"),
                    ",",
                    React.createElement("code", null, "endWidth"),
                    " and ",
                    React.createElement("code", null, "position"),
                    " properties to customize the ranges. You can also specify various colors for the ranges in the axis. If you enable the ",
                    React.createElement("code", null, "useRangeColor"),
                    " property, then the axis labels will be displayed based on its range color."),
                React.createElement("p", null,
                    "More information about linear gauge can be found in this ",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation" }, "documentation section"),
                    "."))));
    };
    return Container;
}(sample_base_1.SampleBase));
exports.Container = Container;
