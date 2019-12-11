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
 * Local Data for bullet chart
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var data = [
    {
        requiredStories: 20,
        completedStories: 25,
        name: 'David'
    },
    {
        requiredStories: 25,
        completedStories: 20,
        name: 'Asif'
    },
    {
        requiredStories: 15,
        completedStories: 10,
        name: 'Thomas'
    },
    {
        requiredStories: 40,
        completedStories: 39,
        name: 'Rohit'
    },
    {
        requiredStories: 35,
        completedStories: 40,
        name: 'Virat'
    },
    {
        requiredStories: 28,
        completedStories: 25,
        name: 'Jude'
    },
    {
        requiredStories: 10,
        completedStories: 18,
        name: 'Warner'
    },
    {
        requiredStories: 30,
        completedStories: 28,
        name: 'Malik'
    }
];
var BulletChartMultipleData = /** @class */ (function (_super) {
    __extends(BulletChartMultipleData, _super);
    function BulletChartMultipleData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bulletLoad = function (args) {
            var chart = document.getElementById('multipleData');
            chart.setAttribute('title', '');
            var selectedTheme = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.bulletChart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/dark/i, 'Dark').replace(/light/i, 'Light').replace(/contrast/i, 'Contrast');
        };
        return _this;
    }
    BulletChartMultipleData.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.BulletChartComponent, { id: 'multipleData', style: { textAlign: "center" }, width: ej2_base_1.Browser.isDevice ? '100%' : '80%', tooltip: { enable: true }, dataSource: data, valueField: 'completedStories', targetField: 'requiredStories', categoryField: 'name', animation: { enable: false }, height: '400', minimum: 5, maximum: 45, interval: 5, minorTickLines: { width: 0 }, title: 'Sprint Planning', titlePosition: 'Top', valueFill: '#304560', targetColor: '#304560', subtitle: 'Estimated in story points', load: this.bulletLoad.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.BulletTooltip] }),
                    React.createElement(ej2_react_charts_1.BulletRangeCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 25, color: '#DBE7F3' }),
                        React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 37, color: '#BBCEE7' }),
                        React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 45, color: '#96B2D7' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates a bullet chart with multiple local data. It displays multiple data in bullet chart.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a feature bar or comparative bar on the bullet chart."))));
    };
    return BulletChartMultipleData;
}(sample_base_1.SampleBase));
exports.BulletChartMultipleData = BulletChartMultipleData;
