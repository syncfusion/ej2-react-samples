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
 * Sample for Lazy Loading
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }\n        ";
var LazyLoading = (function (_super) {
    __extends(LazyLoading, _super);
    function LazyLoading() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.intl = new ej2_base_1.Internationalization();
        _this.droplist = [
            { value: 'Range' },
            { value: 'Points Length' }
        ];
        return _this;
        // custom code end
    }
    LazyLoading.prototype.minChange = function (args) {
        this.chart.primaryXAxis.scrollbarSettings.range.minimum = args.value;
        this.chart.refresh();
    };
    ;
    LazyLoading.prototype.maxChange = function (args) {
        this.chart.primaryXAxis.scrollbarSettings.range.maximum = args.value;
        this.chart.refresh();
    };
    ;
    LazyLoading.prototype.pointChange = function (args) {
        this.chart.primaryXAxis.scrollbarSettings.pointsLength = args.value;
        this.chart.refresh();
    };
    ;
    LazyLoading.prototype.modeChange = function (arg) {
        var min;
        var max;
        if (arg.value === 'Range') {
            this.chart.primaryXAxis.valueType = 'DateTime';
            min = this.chart.primaryXAxis.scrollbarSettings.range.minimum = new Date(2009, 0, 1);
            max = this.chart.primaryXAxis.scrollbarSettings.range.maximum = new Date(2014, 0, 1);
            this.chart.series[0].dataSource = this.GetDateTimeData(new Date(2009, 0, 1), new Date(2009, 8, 1));
            this.chart.refresh();
            this.minDate.enabled = true;
            this.maxDate.enabled = true;
            this.pointslength.enabled = false;
        }
        else {
            this.chart.primaryXAxis.valueType = 'Double';
            this.chart.primaryXAxis.scrollbarSettings.range.minimum = null;
            this.chart.primaryXAxis.scrollbarSettings.range.maximum = null;
            this.chart.primaryXAxis.scrollbarSettings.pointsLength = 1000;
            this.chart.series[0].dataSource = this.GetNumericData(1, 200);
            this.chart.refresh();
            this.minDate.enabled = false;
            this.maxDate.enabled = false;
            this.pointslength.enabled = true;
        }
    };
    ;
    LazyLoading.prototype.GetDateTimeData = function (start, end) {
        var series1 = [];
        var date;
        var value = 30;
        var option = {
            skeleton: 'full',
            type: 'dateTime'
        };
        var dateParser = this.intl.getDateParser(option);
        var dateFormatter = this.intl.getDateFormat(option);
        for (var i = 0; start <= end; i++) {
            date = Date.parse(dateParser(dateFormatter(start)));
            if (Math.random() > .5) {
                value += (Math.random() * 10 - 5);
            }
            else {
                value -= (Math.random() * 10 - 5);
            }
            if (value < 0) {
                value = this.getRandomInt(20, 40);
            }
            var point1 = { x: new Date(date), y: Math.round(value) };
            new Date(start.setDate(start.getDate() + 1));
            series1.push(point1);
        }
        return series1;
    };
    LazyLoading.prototype.GetNumericData = function (start, end) {
        var series1 = [];
        var value = 30;
        for (var i = start; i <= end; i++) {
            if (Math.random() > .5) {
                value += (Math.random() * 10 - 5);
            }
            else {
                value -= (Math.random() * 10 - 5);
            }
            if (value < 0) {
                value = this.getRandomInt(20, 40);
            }
            var point = { x: i, y: Math.round(value) };
            series1.push(point);
        }
        return series1;
    };
    LazyLoading.prototype.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    LazyLoading.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-md-8' },
                    React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: function (chart) { return _this.chart = chart; }, primaryXAxis: {
                            title: 'Day',
                            valueType: 'DateTime',
                            edgeLabelPlacement: 'Shift',
                            skeleton: 'yMMM',
                            skeletonType: 'Date',
                            scrollbarSettings: {
                                range: {
                                    minimum: new Date(2009, 0, 1),
                                    maximum: new Date(2014, 0, 1)
                                },
                                enable: true,
                                pointsLength: 1000
                            }
                        }, primaryYAxis: {
                            title: 'Server Load',
                            labelFormat: '{value}MB'
                        }, chartArea: { border: { width: 0 } }, tooltip: { enable: true, shared: true, header: '<b>${point.x}</b>', format: 'Server load : <b>${point.y}</b>' }, legendSettings: { visible: true }, scrollEnd: this.scrollEnd.bind(this), load: this.load.bind(this), title: 'Network Load', height: '450', width: '100%' },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.LineSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.Tooltip, ej2_react_charts_1.ScrollBar, ej2_react_charts_1.Zoom, ej2_react_charts_1.Crosshair] }),
                        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: this.GetDateTimeData(new Date(2009, 0, 1), new Date(2009, 8, 1)), xName: 'x', yName: 'y', type: 'Line', animation: { enable: false } })))),
                React.createElement("div", { className: 'col-md-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: "property", title: "Properties", style: { width: '100%' } },
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null, "Lazy Load ")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { index: 0, width: 120, id: "lazymode", ref: function (drop) { return _this.lazymode = drop; }, style: { "width": "auto" }, change: this.modeChange.bind(this), dataSource: this.droplist, fields: { text: 'value', value: 'value' }, value: "Range" })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", null, "Min ")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_calendars_1.DatePickerComponent, { width: 120, ref: function (min) { return _this.minDate = min; }, id: "datepickermin", style: { "width": "auto" }, change: this.minChange.bind(this), value: new Date(2009, 0, 1) })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", null, "Max ")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_calendars_1.DatePickerComponent, { width: 120, ref: function (max) { return _this.maxDate = max; }, id: "datepickermax", style: { "width": "auto" }, change: this.maxChange.bind(this), value: new Date(2014, 0, 1) })))),
                            React.createElement("tr", { style: { width: '40%' } },
                                React.createElement("td", null,
                                    React.createElement("div", null, "Point Length ")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { min: 1000, max: 10000, value: 1000, step: 100, enabled: false, format: 'n', width: 120, ref: function (point) { return _this.pointslength = point; }, id: "pointslength", style: { "width": "auto" }, change: this.pointChange.bind(this) })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates lazy laoding feature in chart. Loads data for chart on demand.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to load data for chart on demand. Chart will fire the",
                    React.createElement("code", null, "scrollEnd"),
                    " event, in that can udpate the chart with required data based on point length and axis range."),
                React.createElement("p", null, "ScrollBar is enabled in the sample and ScrollBar module injected to the chart."),
                React.createElement("br", null),
                React.createElement("p", null, "Injecting Module"),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use lazy laoding need to inject ",
                    React.createElement("code", null, "ScrollBar"),
                    " and ",
                    React.createElement("code", null, "Zoom"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."))));
    };
    LazyLoading.prototype.scrollEnd = function (args) {
        if (this.lazymode.value === 'Range') {
            this.chart.series[0].dataSource = this.GetDateTimeData(args.currentRange.minimum, args.currentRange.maximum);
        }
        else {
            this.chart.series[0].dataSource = this.GetNumericData(args.currentRange.minimum, args.currentRange.maximum);
        }
        this.chart.dataBind();
    };
    ;
    // custom code start
    LazyLoading.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark");
    };
    ;
    return LazyLoading;
}(sample_base_1.SampleBase));
exports.LazyLoading = LazyLoading;
