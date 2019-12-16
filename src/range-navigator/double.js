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
 * Sample for Numeric Axis Range Navigator
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var double_data_1 = require("./double-data");
exports.chartAnnotation = [];
exports.chartAnnotation.push({ content: '<div id="exchangeRate"></div>', coordinateUnits: 'Pixel', region: 'Chart', x: '85%', y: '15%' });
exports.selectedTheme = location.hash.split('/')[1];
exports.selectedTheme = exports.selectedTheme ? exports.selectedTheme : 'Material';
exports.theme = (exports.selectedTheme.charAt(0).toUpperCase() + exports.selectedTheme.slice(1)).replace(/-dark/i, "Dark");
exports.backgroundColor = 'white';
getAnnotation(double_data_1.aus, ej2_react_charts_1.getSeriesColor(exports.theme)[0]);
getAnnotation(double_data_1.sl, ej2_react_charts_1.getSeriesColor(exports.theme)[1]);
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px;\n    }\n    #title{\n        font-size: 15px;\n        font-style: normal;\n        font-family: \"Segoe UI\";\n        font-weight: 500;\n        text-anchor: middle;\n        transform: none;\n        opacity: 1;\n    }\n    ";
var NumericAxis = /** @class */ (function (_super) {
    __extends(NumericAxis, _super);
    function NumericAxis() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumericAxis.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: "row", style: { textAlign: "center" } },
                    React.createElement("div", { id: "title" }, "Score Comparision AUS vs SL")),
                React.createElement("div", { className: "row" },
                    React.createElement(ej2_react_charts_1.RangeNavigatorComponent, { id: 'double', ref: function (rangenavigator) { return _this.rangenavigator1 = rangenavigator; }, style: { textAlign: "center" }, labelPosition: 'Outside', tooltip: { enable: true }, load: this.rangeLoad.bind(this), changed: this.changed.bind(this), width: ej2_base_1.Browser.isDevice ? '100%' : '80%', tooltipRender: this.renderTooltip.bind(this), value: [31, 50] },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.RangeTooltip] }),
                        React.createElement(ej2_react_charts_1.RangenavigatorSeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.RangenavigatorSeriesDirective, { dataSource: double_data_1.aus, xName: 'x', yName: 'y' }),
                            React.createElement(ej2_react_charts_1.RangenavigatorSeriesDirective, { dataSource: double_data_1.sl, xName: 'x', yName: 'y' })))),
                React.createElement("div", { className: "row" },
                    React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: function (chart) { return _this.chart1 = chart; }, style: { textAlign: "center" }, primaryXAxis: {
                            title: 'Overs',
                            edgeLabelPlacement: 'Shift',
                            majorGridLines: { width: 0 },
                            labelFormat: 'n1'
                        }, primaryYAxis: {
                            title: 'Runs',
                            minimum: 0,
                            majorTickLines: { width: 0 },
                            lineStyle: { width: 0 }
                        }, width: ej2_base_1.Browser.isDevice ? '100%' : '80%', height: '350', theme: exports.theme, annotations: exports.chartAnnotation, load: this.chartLoad.bind(this), loaded: this.chartLoaded.bind(this), axisLabelRender: this.labelRender.bind(this), chartArea: { border: { width: 0 } } },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.SplineSeries, ej2_react_charts_1.Crosshair, ej2_react_charts_1.Tooltip, ej2_react_charts_1.ChartAnnotation] }),
                        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: double_data_1.aus, xName: 'x', yName: 'y', name: 'AUS', type: 'Spline', width: 2, animation: { enable: false } }),
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: double_data_1.sl, xName: 'x', yName: 'y', name: 'SL', type: 'Spline', width: 2, animation: { enable: false } })))),
                React.createElement("div", { id: "action-description" },
                    React.createElement("p", null, "This sample depicts the cricket match data between two countries with the help of numeric axis in range navigator.")),
                React.createElement("div", { id: "description" },
                    React.createElement("p", null,
                        "Numeric axis is used to plot numeric data in range navigator. To render numeric axis, set ",
                        React.createElement("code", null, "valueType"),
                        " to ",
                        React.createElement("code", null, "Double"),
                        ", Tooltip is enabled in this example, to see the tooltip in action, while the selected range is changed")))));
    };
    NumericAxis.prototype.changed = function (args) {
        if (this.chart1) {
            this.chart1.primaryXAxis.zoomFactor = args.zoomFactor;
            this.chart1.primaryXAxis.zoomPosition = args.zoomPosition;
            this.chart1.dataBind();
        }
        else {
            exports.zoomFactor = args.zoomFactor;
            exports.zoomPosition = args.zoomPosition;
        }
    };
    ;
    NumericAxis.prototype.chartLoad = function (args) {
        args.chart.primaryXAxis.zoomFactor = exports.zoomFactor;
        args.chart.primaryXAxis.zoomPosition = exports.zoomPosition;
    };
    ;
    NumericAxis.prototype.labelRender = function (args) {
        if (args.axis.orientation === 'Horizontal') {
            var value = Math.abs(Number(args.text));
            args.text = String(value);
        }
    };
    NumericAxis.prototype.chartLoaded = function (args) {
        var series1 = args.chart.visibleSeries[0].interior;
        var series2 = args.chart.visibleSeries[1].interior;
        var html = '<table>';
        html += '<tr><td><div style="width:10px; height: 10px; border: 2px solid ' + series1 + '; background: ' + series1 + ';"></div></td><td style="padding-left:10px;">' + ' Australia' + '</td>';
        html += '<tr><td><div style="width:10px; height: 10px; border: 2px solid ' + series2 + '; background: ' + series2 + ';"></div></td><td style="padding-left:10px;">' + ' Sri Lanka' + '</td>';
        html += '</table>';
        if (this.chart1) {
            this.chart1.setAnnotationValue(0, '<div id="exchangeRate" style="line-height: 18px; font-size: 13px;background: #fff; opacity:0.9; color: #464e56; ' +
                ' box-shadow:0 0 8px 0 rgba(70,78,86,.25); padding: 7px 10px; border-radius: 3px">' +
                html +
                '</div>');
        }
    };
    ;
    // custom code start
    NumericAxis.prototype.rangeLoad = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.rangeNavigator.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark");
    };
    ;
    // custom code end
    NumericAxis.prototype.renderTooltip = function (args) {
        var text = parseFloat(args.text[0]);
        text = Math.round(text);
        var text1 = text.toString();
        args.text[0] = text1;
    };
    return NumericAxis;
}(sample_base_1.SampleBase));
exports.NumericAxis = NumericAxis;
function getAnnotation(args, color) {
    for (var i = 0; i < args.length; i++) {
        if (args[i].isWicket) {
            exports.chartAnnotation.push({
                content: '<div id= "wicket" style="width: 20px; height:20px; border-radius: 5px;' +
                    'background: ' + exports.backgroundColor + '; border: 2px solid ' + color + '; color:' + color + '">W</div>',
                x: args[i].x,
                y: args[i].y,
                coordinateUnits: 'Point'
            });
        }
    }
}
