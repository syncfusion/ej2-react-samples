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
 * Sample for direction compass
 */
var React = require("react");
var property_pane_1 = require("../common/property-pane");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var sample_base_1 = require("../common/sample-base");
var ej2_dropdowns_1 = require("@syncfusion/ej2-dropdowns");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var Direction = /** @class */ (function (_super) {
    __extends(Direction, _super);
    function Direction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loaded = false;
        return _this;
    }
    Direction.prototype.onLabelRender = function (args) {
        args.text = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', ''][args.value];
    };
    ;
    // custom code start
    Direction.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    // custom code end
    // Code for Property Panel
    Direction.prototype.onChartLoad = function (args) {
        var _this = this;
        if (!this.loaded) {
            this.loaded = true;
            this.pointerColor = new ej2_dropdowns_1.DropDownList({
                index: 0,
                placeholder: 'Select Range Bar Color',
                width: 100,
                change: function () {
                    var rangeColor = _this.pointerColor.value.toString();
                    _this.gauge.axes[0].pointers[0].color = rangeColor;
                    _this.gauge.setPointerValue(0, 0, _this.gauge.axes[0].pointers[0].value);
                }
            });
            this.pointerColor.appendTo('#poiterColor');
            this.labelColor = new ej2_dropdowns_1.DropDownList({
                index: 0,
                placeholder: 'Select Range Bar Color',
                width: 100,
                change: function () {
                    var rangeColor = _this.labelColor.value.toString();
                    _this.gauge.axes[0].labelStyle.font.color = rangeColor;
                    _this.gauge.refresh();
                }
            });
            this.labelColor.appendTo('#labelColor');
        }
    };
    Direction.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-lg-8' },
                    React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.load.bind(this), id: 'direction-gauge', ref: function (gauge) { return _this.gauge = gauge; }, axisLabelRender: this.onLabelRender.bind(this), loaded: this.onChartLoad.bind(this) },
                        React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_circulargauge_1.AxisDirective, { radius: '70%', startAngle: 0, endAngle: 360, minimum: 0, maximum: 8, majorTicks: {
                                    height: 15,
                                    interval: 1
                                }, lineStyle: { width: 10 }, minorTicks: {
                                    height: 10,
                                    interval: 0.5
                                }, labelStyle: {
                                    font: {
                                        size: '12px', fontFamily: 'Roboto'
                                    },
                                    autoAngle: true,
                                    hiddenLabel: 'Last'
                                } },
                                React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 7, radius: '50%', color: '#f03e3e', pointerWidth: 20, cap: {
                                            radius: 0
                                        }, animation: {
                                            enable: false
                                        } }),
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 3, radius: '50%', color: '#9E9E9E', pointerWidth: 20, cap: {
                                            radius: 0
                                        }, animation: {
                                            enable: false
                                        } })),
                                React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 7, end: 7 })))))),
                React.createElement("div", { className: 'col-lg-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { id: '' }, "Pointer Color")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement("select", { id: "poiterColor", className: "form-control" },
                                                React.createElement("option", { value: "#f03e3e" }, "#f03e3e"),
                                                React.createElement("option", { value: "#4472c4" }, "#4472c4"),
                                                React.createElement("option", { value: "#ed7d31" }, "#ed7d31"))))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { id: '' }, "Label Color")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement("select", { id: "labelColor", className: "form-control" },
                                                React.createElement("option", { value: "#f03e3e" }, "#f03e3e"),
                                                React.createElement("option", { value: "#4472c4" }, "#4472c4"),
                                                React.createElement("option", { value: "#ed7d31" }, "#ed7d31")))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates how to make a direction compass by using the features in gauge. Color of the needle and direction labels can be customized by using options.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Circular gauge can be customized as per a user requirement. In this example, a direction compass has been depicted by adding ",
                    React.createElement("code", null, "needles"),
                    " and by customizing the ",
                    React.createElement("code", null, "labels"),
                    " to show the direction."),
                React.createElement("p", null,
                    "More information on the needle and labels can be found in this",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation" }, " documentation section"),
                    "."))));
    };
    return Direction;
}(sample_base_1.SampleBase));
exports.Direction = Direction;
