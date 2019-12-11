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
 * Sample for Range Navigator Period Selector with Stock Chart
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_charts_1 = require("@syncfusion/ej2-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var ej2_svg_base_1 = require("@syncfusion/ej2-svg-base");
var stock_chart_data_1 = require("./stock-chart-data");
exports.index = 0;
exports.chartDatas = [];
exports.pointColors = [];
exports.getContent = function (value) {
    var text = value.split('<br/>');
    var html = '<table><thead>' + text[0] + '</thead>';
    for (var i = 1; i < text.length; i++) {
        var value_1 = text[i].split(':');
        if (i === text.length - 1) {
            html += '<tr><td style="text-align:left;opacity:0.5">' + value_1[0] + '</td><td style="padding-left: 5px;">' +
                Math.round(((+value_1[1].split('</b>')[0].split('<b>')[1]) / 10000000)) + 'B';
        }
        else {
            html += '<tr><td style="text-align:left;opacity:0.5">' + value_1[0] + '</td><td style="padding-left: 5px;">$' +
                (+value_1[1].split(' <b>')[1].split('</b>')[0]).toFixed(2) + '</td></tr>';
        }
    }
    return html;
};
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px;\n    }\n    #chart_tooltip {\n        opacity: 0;\n    }\n    #chart_HorizontalLine, #chart_VerticalLine {\n        stroke-dasharray: 2\n    }\n    #stockRange{\n        transform:translateX(12%);font-family: Segoe UI;font-weight: 500; font-style:normal; font-size:14px;\n    }\n    #close{\n        font-size:10px\n    }\n    #value{\n        float: left;\n    }\n    #inc{\n        float: left; color: green;\n    }\n    ";
function annotationTemplate(props) {
    return (React.createElement("div", { id: "annotation" }));
}
exports.annotationTemplate = annotationTemplate;
var StockChart = /** @class */ (function (_super) {
    __extends(StockChart, _super);
    function StockChart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StockChart.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: "row" },
                    React.createElement("div", { id: "stockRange" },
                        React.createElement("div", { id: "title" }, "AAPL 2012-2015"),
                        React.createElement("div", { id: "close" },
                            React.createElement("div", { id: "value" }, "159.67"),
                            React.createElement("div", { id: "inc" }, "\u00A0\u00A0\u00A0+11.49 (+1.06%)")))),
                React.createElement("div", { className: "row" },
                    React.createElement(ej2_react_charts_1.RangeNavigatorComponent, { id: 'rangenavigator', ref: function (rangenavigator) { return _this.rangenavigator1 = rangenavigator; }, style: { textAlign: "center" }, valueType: 'DateTime', disableRangeSelector: true, dataSource: stock_chart_data_1.chartData, xName: 'x', yName: 'close', width: ej2_base_1.Browser.isDevice ? '100%' : '75%', periodSelectorSettings: {
                            position: 'Top',
                            periods: [
                                { text: '1M', interval: 1, intervalType: 'Months' },
                                { text: '3M', interval: 3, intervalType: 'Months' },
                                { text: '6M', interval: 6, intervalType: 'Months' }, { text: 'YTD' },
                                { text: '1Y', interval: 1, intervalType: 'Years' },
                                { text: '2Y', interval: 2, intervalType: 'Years', selected: true }, { text: 'All' }
                            ]
                        }, loaded: this.rangeLoaded.bind(this), load: this.rangeLoad.bind(this), changed: this.changed.bind(this) },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.DateTime, ej2_react_charts_1.PeriodSelector] }))),
                React.createElement("div", { className: "row" },
                    React.createElement(ej2_react_charts_1.ChartComponent, { id: 'chart', ref: function (chart) { return _this.chart1 = chart; }, style: { textAlign: "center" }, primaryXAxis: {
                            valueType: 'DateTime',
                            majorGridLines: { width: 0 },
                            crosshairTooltip: { enable: true }
                        }, margin: { top: 0 }, primaryYAxis: {
                            title: 'Price',
                            crosshairTooltip: { enable: true },
                            labelFormat: 'n0',
                            plotOffset: 25,
                            rangePadding: 'None', majorGridLines: { width: 0 },
                            rowIndex: 1, opposedPosition: true, lineStyle: { width: 0 }
                        }, width: ej2_base_1.Browser.isDevice ? '100%' : '80%', zoomSettings: { enableMouseWheelZooming: true, mode: 'X', toolbarItems: [] }, load: this.chartLoad.bind(this), loaded: this.chartLoaded.bind(this), axisLabelRender: this.labelRender.bind(this), axisRangeCalculated: this.rangeCalculated.bind(this), tooltipRender: this.chartTooltip.bind(this), pointRender: this.renderPoint.bind(this), chartMouseLeave: this.mouseLeave.bind(this), chartMouseMove: this.mouseMove.bind(this), chartArea: { border: { width: 1, color: 'whitesmoke' } }, tooltip: { enable: true, shared: true,
                            format: '${point.x}<br/>High : <b>${point.high}</b><br/>Low :' +
                                ' <b>${point.low}</b><br/>Open : <b>${point.open}</b><br/>Close : <b>${point.close}</b><br/>Volume : <b>${point.volume}</b>'
                        }, legendSettings: { visible: false }, height: '350', crosshair: {
                            enable: true, lineType: 'Both'
                        } },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.CandleSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.Crosshair, ej2_react_charts_1.TmaIndicator, ej2_react_charts_1.MacdIndicator,
                                ej2_react_charts_1.ChartAnnotation, ej2_react_charts_1.Tooltip, ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Zoom, ej2_react_charts_1.LineSeries, ej2_react_charts_1.StripLine] }),
                        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.chartDatas, xName: 'x', yName: 'y', width: 2, type: 'Candle', animation: { enable: true }, name: 'Apple Inc', low: 'low', high: 'high', volume: 'volume', open: 'open', close: 'close', bearFillColor: '#2ecd71', bullFillColor: '#e74c3d' }),
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.chartDatas, xName: 'x', yName: 'volume', type: 'Column', yAxisName: 'secondary', animation: { enable: true } })),
                        React.createElement(ej2_react_charts_1.AnnotationsDirective, null,
                            React.createElement(ej2_react_charts_1.AnnotationDirective, { content: annotationTemplate, x: '10%', y: '20%', coordinateUnits: 'Pixel', region: 'Chart' })),
                        React.createElement(ej2_react_charts_1.RowsDirective, null,
                            React.createElement(ej2_react_charts_1.RowDirective, { height: '30%' }),
                            React.createElement(ej2_react_charts_1.RowDirective, { height: '70%' })),
                        React.createElement(ej2_react_charts_1.AxesDirective, null,
                            React.createElement(ej2_react_charts_1.AxisDirective, { name: 'secondary', opposedPosition: true, rowIndex: 0, majorGridLines: { width: 0 }, lineStyle: { width: 0 }, rangePadding: 'None', majorTickLines: { width: 0 } })),
                        React.createElement(ej2_react_charts_1.IndicatorsDirective, null,
                            React.createElement(ej2_react_charts_1.IndicatorDirective, { type: 'Tma', period: 3, fastPeriod: 8, slowPeriod: 5, seriesName: 'Apple Inc', macdType: 'Both', width: 2, macdPositiveColor: '#2ecd71', macdNegativeColor: '#e74c3d', fill: '#6063ff' })))),
                React.createElement("div", { id: "action-description" },
                    React.createElement("p", null, "This sample illustrates a stock price for AAPL over a period. Period Selector shows the information about the stock values without range navigator.")),
                React.createElement("div", { id: "description" },
                    React.createElement("p", null, "In this example, you can see how to render and configure the period Selector with the financial chart. Tooltip is enabled in this example, to see the tooltip in action, while the selected range is changed."),
                    React.createElement("br", null),
                    React.createElement("p", null,
                        React.createElement("b", null, "Injecting Module")),
                    React.createElement("p", null,
                        "Range Navigator component features are segregated into individual feature-wise modules. To use period selector,",
                        React.createElement("code", null, "PeriodSelector"),
                        " module using ",
                        React.createElement("code", null, "RangeNavigator.Inject(PeriodSelector)"),
                        " method.")))));
    };
    StockChart.prototype.changed = function (args) {
        var data = stock_chart_data_1.chartData.filter(function (data) {
            /* tslint:disable:no-string-literal */
            return ((data.x) >= args.start &&
                (data.x) <= args.end);
        });
        exports.chartDatas = data;
        if (this.chart1 && this.chartRendered) {
            this.chart1.series[0].animation.enable = false;
            this.chart1.primaryXAxis.zoomPosition = 0;
            this.chart1.primaryXAxis.zoomFactor = 1;
            this.chart1.series[1].animation.enable = false;
            this.chart1.primaryXAxis.stripLines = [{ visible: true }];
            this.chart1.indicators[0].animation.enable = false;
            exports.pointColors = [];
            this.chart1.series[0].dataSource = data;
            this.chart1.series[1].dataSource = data;
            this.chart1.refresh();
            this.chart1.setAnnotationValue(0, '<div id="annotation"></div>');
        }
        else {
            exports.zoomFactor = args.zoomFactor;
            exports.zoomPosition = args.zoomPosition;
        }
    };
    ;
    StockChart.prototype.chartTooltip = function (args) {
        if (args.series.type === 'Candle') {
            this.chart1.setAnnotationValue(0, '<div id="annotation" style="line-height: 18px;' +
                ' font-size: 13px;background: #fff; opacity:0.9; color: #464e56; ' +
                ' box-shadow:0 0 8px 0 rgba(70,78,86,.25); padding: 7px 10px;' +
                ' border-radius: 3px">' + (exports.getContent(args.text) + '</table>') + '</div>');
        }
        args.text = '';
    };
    ;
    StockChart.prototype.mouseMove = function (args) {
        if (!ej2_charts_1.withInBounds(this.chart1.mouseX, this.chart1.mouseY, this.chart1.chartAxisLayoutPanel.seriesClipRect)) {
            removeSecondaryElement();
        }
    };
    ;
    StockChart.prototype.mouseLeave = function (args) {
        removeSecondaryElement();
    };
    ;
    StockChart.prototype.chartLoad = function (args) {
        args.chart.series[0].dataSource = exports.chartDatas;
        args.chart.series[1].dataSource = exports.chartDatas;
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark");
    };
    ;
    StockChart.prototype.chartLoaded = function (args) {
        var labels = (args.chart.axisCollections[0]).visibleLabels;
        var maxValue = args.chart.axisCollections[0].visibleRange.max;
        if (args.chart.primaryXAxis.stripLines.length === 1) {
            for (var i = 0; i < labels.length; i += 2) {
                args.chart.primaryXAxis.stripLines.push({
                    start: new Date(labels[i].value), end: labels[i + 1] ? new Date(labels[i + 1].value) : new Date(maxValue),
                    zIndex: 'Behind', border: { width: 0, color: 'transparent' }, rotation: null,
                    opacity: 0.7, textStyle: {}, text: '', color: 'whitesmoke', visible: true
                });
            }
            args.chart.refresh();
        }
        this.chartRendered = true;
    };
    ;
    StockChart.prototype.labelRender = function (args) {
        if (args.axis.name === 'secondary') {
            args.text = Math.round((args.value / 10000000)) + 'B';
        }
        else if (args.axis.orientation === 'Vertical') {
            args.text = '$' + Math.round(args.value);
        }
    };
    ;
    StockChart.prototype.rangeCalculated = function (args) {
        if (this.chart1 && this.chartRendered) {
            this.chart1.setAnnotationValue(0, '<div></div>');
        }
    };
    ;
    StockChart.prototype.renderPoint = function (args) {
        if (args.series.type === 'Candle') {
            exports.pointColors.push(args.fill);
        }
        else {
            args.fill = exports.pointColors[args.point.index];
        }
    };
    ;
    StockChart.prototype.rangeLoaded = function (args) {
        var element = ej2_svg_base_1.getElement('rangenavigator_Secondary_Element');
        if (!ej2_base_1.Browser.isDevice) {
            element.style.transform = 'translate(14%)';
        }
        if (this.rangenavigator1) {
            var value = this.rangenavigator1.svgObject.getBoundingClientRect().left - this.rangenavigator1.element.getBoundingClientRect().left;
            var element1 = ej2_svg_base_1.getElement('stockRange');
            element1.style.transform = 'translateX(' + (value - 10) + 'px)';
        }
    };
    StockChart.prototype.rangeLoad = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.rangeNavigator.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark");
        args.rangeNavigator.periodSelectorSettings.height = document.body.className.indexOf('e-bigger') > -1 ? 56 : 42;
    };
    ;
    return StockChart;
}(sample_base_1.SampleBase));
exports.StockChart = StockChart;
function removeSecondaryElement() {
    setTimeout(function () {
        if (ej2_svg_base_1.getElement("annotation")) {
            ej2_base_1.remove(ej2_svg_base_1.getElement("annotation"));
        }
    }, 2000);
}
