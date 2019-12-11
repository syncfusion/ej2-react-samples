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
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var BulletChartTooltip = /** @class */ (function (_super) {
    __extends(BulletChartTooltip, _super);
    function BulletChartTooltip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ChartToolTemplate = _this.tooltipTemplate;
        _this.bulletLoad = function (args) {
            var chart = document.getElementById('Revenue');
            chart.setAttribute('title', '');
            var selectedTheme = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.bulletChart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/dark/i, 'Dark').replace(/light/i, 'Light').replace(/contrast/i, 'Contrast');
        };
        return _this;
    }
    BulletChartTooltip.prototype.tooltipTemplate = function (props) {
        return (React.createElement("div", { id: "wrap" },
            React.createElement("table", { style: { width: '100%', backgroundColor: '#ffffff', borderSpacing: '0px', borderCollapse: 'separate', border: '1px solid grey', borderRadius: '10px', paddingTop: '5px', paddingBottom: '5px' } },
                React.createElement("tr", null,
                    React.createElement("td", { style: { fontWeight: 'bold', color: 'black', paddingLeft: '5px', paddingTop: '2px', paddingBottom: '2px' } }, "Sales")),
                React.createElement("tr", null,
                    React.createElement("td", { style: { paddingLeft: '5px', color: 'black', paddingRight: '5px', paddingBottom: '2px' } },
                        "Target   : $",
                        props.target,
                        "K ")),
                React.createElement("tr", null,
                    React.createElement("td", { style: { paddingLeft: '5px', color: 'black', paddingRight: '5px' } },
                        "Current : $",
                        props.value,
                        "K ")))));
    };
    BulletChartTooltip.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.BulletChartComponent, { id: 'Revenue', style: { textAlign: "center" }, width: ej2_base_1.Browser.isDevice ? '100%' : '70%', tooltip: { enable: true, template: this.ChartToolTemplate }, animation: { enable: false }, valueField: 'value', targetField: 'target', minimum: 0, maximum: 100, interval: 10, title: 'Revenue YTD', subtitle: 'US $(in thousands)', labelFormat: '${value}K', load: this.bulletLoad.bind(this), dataSource: [{ value: 70, target: 50 }] },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.BulletTooltip] }),
                    React.createElement(ej2_react_charts_1.BulletRangeCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 30, color: "#599C20" }),
                        React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 60, color: "#EFC820" }),
                        React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 100, color: "#CA4218" })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates bullet chart with tooltip customization such as template.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a feature bar or comparative bar on the bullet chart."))));
    };
    return BulletChartTooltip;
}(sample_base_1.SampleBase));
exports.BulletChartTooltip = BulletChartTooltip;
