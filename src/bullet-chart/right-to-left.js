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
var BulletChartRightToLeft = /** @class */ (function (_super) {
    __extends(BulletChartRightToLeft, _super);
    function BulletChartRightToLeft() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bulletLoad = function (args) {
            var chart = document.getElementById('RTL');
            chart.setAttribute('title', '');
            var selectedTheme = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.bulletChart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/dark/i, 'Dark').replace(/light/i, 'Light').replace(/contrast/i, 'Contrast');
        };
        return _this;
    }
    BulletChartRightToLeft.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.BulletChartComponent, { id: 'RTL', style: { textAlign: "center" }, width: ej2_base_1.Browser.isDevice ? '100%' : '80%', tooltip: { enable: true }, animation: { enable: false }, valueField: 'value', targetField: 'target', minimum: 0, maximum: 300, interval: 50, title: 'Revenue YTD', enableRtl: true, labelFormat: '${value}K', load: this.bulletLoad.bind(this), dataSource: [{ value: 270, target: 250 }] },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.BulletTooltip] }),
                    React.createElement(ej2_react_charts_1.BulletRangeCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 150 }),
                        React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 250 }),
                        React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 300 })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates bullet chart with diferent mode and orientation such as like right to left or left to right.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a feature bar or comparative bar on the bullet chart."))));
    };
    return BulletChartRightToLeft;
}(sample_base_1.SampleBase));
exports.BulletChartRightToLeft = BulletChartRightToLeft;
