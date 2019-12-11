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
 * Default sample for bullet chart
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var BulletChartDefault = /** @class */ (function (_super) {
    __extends(BulletChartDefault, _super);
    function BulletChartDefault() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bulletLoad = function (args) {
            var chartId = ['Revenue', 'Profit', 'Average', 'Customers', 'Rating'];
            for (var _i = 0, chartId_1 = chartId; _i < chartId_1.length; _i++) {
                var ids = chartId_1[_i];
                var chart = document.getElementById(ids);
                chart.setAttribute('title', '');
            }
            var selectedTheme = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.bulletChart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/dark/i, 'Dark').replace(/light/i, 'Light').replace(/contrast/i, 'Contrast');
        };
        return _this;
    }
    BulletChartDefault.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.BulletChartComponent, { id: 'Revenue', style: { textAlign: "center" }, animation: { enable: false }, width: ej2_base_1.Browser.isDevice ? '100%' : '80%', tooltip: { enable: true }, valueField: 'value', targetField: 'target', minimum: 0, maximum: 300, interval: 50, title: 'Revenue', titlePosition: ej2_base_1.Browser.isDevice ? 'Top' : 'Left', labelFormat: '{value}$', subtitle: 'U.S. $ (1,000s)', dataSource: [{ value: 270, target: 250 }], margin: { left: (ej2_base_1.Browser.isDevice ? 10 : 10) }, load: this.bulletLoad.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.BulletTooltip] }),
                    React.createElement(ej2_react_charts_1.BulletRangeCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 150 }),
                        React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 250 }),
                        React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 300 }))),
                React.createElement(ej2_react_charts_1.BulletChartComponent, { id: 'Profit', style: { textAlign: "center" }, width: ej2_base_1.Browser.isDevice ? '100%' : '80%', animation: { enable: false }, tooltip: { enable: true }, valueField: 'value', targetField: 'target', minimum: 0, maximum: 30, interval: 5, labelFormat: '{value}%', title: 'Profit', subtitle: '%', margin: { left: ej2_base_1.Browser.isDevice ? 10 : 80 }, titlePosition: ej2_base_1.Browser.isDevice ? 'Top' : 'Left', load: this.bulletLoad.bind(this), dataSource: [{ value: 23, target: 27 }] },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.BulletTooltip] }),
                    React.createElement(ej2_react_charts_1.BulletRangeCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 20 }),
                        React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 25 }),
                        React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 30 }))),
                React.createElement(ej2_react_charts_1.BulletChartComponent, { id: 'Average', style: { textAlign: "center" }, width: ej2_base_1.Browser.isDevice ? '100%' : '80%', animation: { enable: false }, tooltip: { enable: true }, valueField: 'value', targetField: 'target', minimum: 0, maximum: 600, interval: 100, title: 'Avg Order Size', subtitle: 'U.S. $', margin: { left: ej2_base_1.Browser.isDevice ? 10 : 22 }, titlePosition: ej2_base_1.Browser.isDevice ? 'Top' : 'Left', load: this.bulletLoad.bind(this), dataSource: [{ value: 350, target: 550 }] },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.BulletTooltip] }),
                    React.createElement(ej2_react_charts_1.BulletRangeCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 350 }),
                        React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 500 }),
                        React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 600 }))),
                React.createElement(ej2_react_charts_1.BulletChartComponent, { id: 'Customers', style: { textAlign: "center" }, width: ej2_base_1.Browser.isDevice ? '100%' : '80%', animation: { enable: false }, tooltip: { enable: true }, valueField: 'value', targetField: 'target', minimum: 0, maximum: 2500, interval: 500, title: 'New Customers', subtitle: 'Count', margin: { left: ej2_base_1.Browser.isDevice ? 10 : 19 }, titlePosition: ej2_base_1.Browser.isDevice ? 'Top' : 'Left', load: this.bulletLoad.bind(this), dataSource: [{ value: 1600, target: 2100 }] },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.BulletTooltip] }),
                    React.createElement(ej2_react_charts_1.BulletRangeCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 1700 }),
                        React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 2000 }),
                        React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 2500 }))),
                React.createElement(ej2_react_charts_1.BulletChartComponent, { id: 'Rating', style: { textAlign: "center" }, width: ej2_base_1.Browser.isDevice ? '100%' : '80%', animation: { enable: false }, tooltip: { enable: true }, valueField: 'value', targetField: 'target', minimum: 0, maximum: 5, interval: 1, title: 'Cust Satifaction', subtitle: 'Top Rating of 5', titlePosition: ej2_base_1.Browser.isDevice ? 'Top' : 'Left', load: this.bulletLoad.bind(this), margin: { left: ej2_base_1.Browser.isDevice ? 10 : 18 }, dataSource: [{ value: 4.9, target: 4 }] },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.BulletTooltip] }),
                    React.createElement(ej2_react_charts_1.BulletRangeCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 3.7 }),
                        React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 4.2 }),
                        React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 5 })))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This sample illustrates a default bullet chart to compare the feature (value) bar with comparative (target) bar. It includes variety of configurations to change the look and feel of the chart.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a feature bar or comparative bar on the bullet chart."))));
    };
    return BulletChartDefault;
}(sample_base_1.SampleBase));
exports.BulletChartDefault = BulletChartDefault;
