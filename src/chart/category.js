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
 * Sample for Category Axis
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var theme_color_1 = require("./theme-color");
var sample_base_1 = require("../common/sample-base");
exports.pointRender = function (args) {
    var selectedTheme = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'material';
    if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
        args.fill = theme_color_1.fabricColors[args.point.index % 10];
    }
    else if (selectedTheme === 'material') {
        args.fill = theme_color_1.materialColors[args.point.index % 10];
    }
    else if (selectedTheme === 'highcontrast') {
        args.fill = theme_color_1.highContrastColors[args.point.index % 10];
    }
    else {
        args.fill = theme_color_1.bootstrapColors[args.point.index % 10];
    }
};
exports.data = [
    { x: 'Germany', y: 72, country: 'GER: 72' },
    { x: 'Russia', y: 103.1, country: 'RUS: 103.1' },
    { x: 'Brazil', y: 139.1, country: 'BRZ: 139.1' },
    { x: 'India', y: 462.1, country: 'IND: 462.1' },
    { x: 'China', y: 721.4, country: 'CHN: 721.4' },
    { x: 'United States<br>Of America', y: 286.9, country: 'USA: 286.9' },
    { x: 'Great Britain', y: 115.1, country: 'GBR: 115.1' },
    { x: 'Nigeria', y: 97.2, country: 'NGR: 97.2' },
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
/**
 * Category sample
 */
var CategoryAxis = (function (_super) {
    __extends(CategoryAxis, _super);
    function CategoryAxis() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CategoryAxis.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: {
                        title: 'Country',
                        valueType: 'Category',
                        majorGridLines: { width: 0 },
                        enableTrim: false,
                    }, primaryYAxis: {
                        minimum: 0,
                        maximum: 800,
                        labelFormat: ej2_base_1.Browser.isDevice ? '{value}' : '{value}M',
                        edgeLabelPlacement: 'Shift',
                        majorGridLines: { width: 0 },
                        majorTickLines: { width: 0 },
                        lineStyle: { width: 0 },
                        labelStyle: {
                            color: 'transparent'
                        }
                    }, load: this.load.bind(this), width: ej2_base_1.Browser.isDevice ? '100%' : '60%', chartArea: { border: { width: 0 } }, legendSettings: { visible: false }, title: ej2_base_1.Browser.isDevice ? 'Internet Users in Million – 2016' : 'Internet Users – 2016', pointRender: exports.pointRender, loaded: this.onChartLoad.bind(this), tooltip: { enable: true, format: '${point.tooltip}' } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.BarSeries, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.DataLabel, ej2_react_charts_1.Category] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, xName: 'x', yName: 'y', type: 'Bar', width: 2, tooltipMappingName: 'country', marker: {
                                dataLabel: {
                                    visible: true,
                                    position: 'Top', font: {
                                        fontWeight: '600',
                                        color: '#ffffff'
                                    }
                                }
                            }, name: 'Users' }))),
                React.createElement("div", { style: { float: 'right', marginRight: '10px' } },
                    "Source: \u00A0",
                    React.createElement("a", { href: "http://www.internetworldstats.com/top20.htm", target: "_blank" }, "www.internetworldstats.com"))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the rendering of category axis in the chart with internet users of different countries.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Category axis is used to represent the categories in data. To render category axis, set ",
                    React.createElement("code", null, "valueType"),
                    " in axis to ",
                    React.createElement("code", null, "Category"),
                    ". Category label can placed between the ticks or on the ticks, based on ",
                    React.createElement("code", null, "labelPlacement"),
                    " property."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use Category axis, we need to inject",
                    React.createElement("code", null, "Category"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the Category axis can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-axis.html#valuetype-valuetype" }, "documentation section"),
                    "."))));
    };
    CategoryAxis.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    // custom code start
    CategoryAxis.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark");
    };
    ;
    return CategoryAxis;
}(sample_base_1.SampleBase));
exports.CategoryAxis = CategoryAxis;
