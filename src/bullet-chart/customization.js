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
 * Right to left for bullet chart
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var BulletChartCustomization = /** @class */ (function (_super) {
    __extends(BulletChartCustomization, _super);
    function BulletChartCustomization() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bulletLoad = function (args) {
            var chart = document.getElementById('customization');
            chart.setAttribute('title', '');
            var selectedTheme = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.bulletChart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/dark/i, 'Dark').replace(/light/i, 'Light').replace(/contrast/i, 'Contrast');
        };
        return _this;
    }
    BulletChartCustomization.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section col-md-8' },
                React.createElement(ej2_react_charts_1.BulletChartComponent, { id: 'customization', ref: function (chart) { return _this.bulletChartInstance = chart; }, width: '100%', tooltip: { enable: true }, animation: { enable: false }, valueField: 'value', targetField: 'target', minimum: 0, maximum: 3, interval: 0.5, title: 'Package Downloads', subtitle: 'in Thousands', load: this.bulletLoad.bind(this), dataSource: [{ value: 1.7, target: 2.5 }] },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.BulletTooltip] }),
                    React.createElement(ej2_react_charts_1.BulletRangeCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 1.5, color: '#599C20' }),
                        React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 2.5, color: '#EFC820' }),
                        React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 3, color: '#CA4218' })))),
            React.createElement("div", { className: 'property-section col-md-4' },
                React.createElement("div", { className: "property-panel-header" }, "Properties"),
                React.createElement("table", { style: { width: '100%' } },
                    React.createElement("tr", { style: { height: '50px' } },
                        React.createElement("td", { style: { width: '50%' } },
                            React.createElement("div", { className: 'prop-text' }, "Start Color:")),
                        React.createElement("td", { style: { width: '50%', textAlign: 'center' } },
                            React.createElement(ej2_react_inputs_1.ColorPickerComponent, { id: 'start', mode: 'Palette', value: '#599C20', change: function (args) {
                                    _this.bulletChartInstance.ranges[0].color = args.currentValue.hex;
                                    _this.bulletChartInstance.refresh();
                                } }))),
                    React.createElement("tr", { style: { height: '50px' } },
                        React.createElement("td", { style: { width: '50%' } },
                            React.createElement("div", { className: 'prop-text' }, "Middle Color:")),
                        React.createElement("td", { style: { width: '50%', textAlign: 'center' } },
                            React.createElement(ej2_react_inputs_1.ColorPickerComponent, { mode: 'Palette', id: 'middle', value: '#EFC820', change: function (args) {
                                    _this.bulletChartInstance.ranges[1].color = args.currentValue.hex;
                                    _this.bulletChartInstance.refresh();
                                } }))),
                    React.createElement("tr", { style: { height: '50px' } },
                        React.createElement("td", { style: { width: '50%' } },
                            React.createElement("div", { className: 'prop-text' }, "End Color:")),
                        React.createElement("td", { style: { width: '50%', textAlign: 'center' } },
                            React.createElement(ej2_react_inputs_1.ColorPickerComponent, { id: 'end', mode: 'Palette', value: '#CA4218', change: function (args) {
                                    _this.bulletChartInstance.ranges[2].color = args.currentValue.hex;
                                    _this.bulletChartInstance.refresh();
                                } }))),
                    React.createElement("tr", { style: { height: '50px' } },
                        React.createElement("td", { style: { width: '50%' } },
                            React.createElement("div", { className: 'prop-text' }, "Use Range Color:")),
                        React.createElement("td", { style: { width: '50%', textAlign: 'center' } },
                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'rangeColor', checked: false, change: function (args) {
                                    _this.bulletChartInstance.majorTickLines.useRangeColor = args.checked;
                                    _this.bulletChartInstance.minorTickLines.useRangeColor = args.checked;
                                    _this.bulletChartInstance.labelStyle.useRangeColor = args.checked;
                                    _this.bulletChartInstance.refresh();
                                } }))),
                    React.createElement("tr", { style: { height: '50px' } },
                        React.createElement("td", { style: { width: '50%' } },
                            React.createElement("div", { className: 'prop-text' }, "Opposed Position")),
                        React.createElement("td", { style: { width: '50%', textAlign: 'center' } },
                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'opposedPosition', checked: false, change: function (args) {
                                    _this.bulletChartInstance.opposedPosition = args.checked;
                                    _this.bulletChartInstance.refresh();
                                } }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates a bullet chart with with different customization in value, range fill, opposed position changes.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a feature bar or comparative bar on the bullet chart."))));
    };
    return BulletChartCustomization;
}(sample_base_1.SampleBase));
exports.BulletChartCustomization = BulletChartCustomization;
