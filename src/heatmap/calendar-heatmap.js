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
var React = require("react");
var ej2_react_heatmap_1 = require("@syncfusion/ej2-react-heatmap");
var data = require("./data.json");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
// custom code start
var SAMPLE_CSS = "\n#control-container {\n    padding: 0px !important;\n}";
// custom code end
/**
 * Schedule Default sample
 */
var CalendarHeatmap = (function (_super) {
    __extends(CalendarHeatmap, _super);
    function CalendarHeatmap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalendarHeatmap.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_heatmap_1.HeatMapComponent, { id: 'heatmap-container', titleSettings: {
                        text: 'Annual Summary of User Activities in GitLab',
                        textStyle: {
                            size: '15px',
                            fontWeight: '500',
                            fontStyle: 'Normal',
                            fontFamily: 'Segoe UI'
                        }
                    }, height: '300px', xAxis: {
                        opposedPosition: true,
                        valueType: 'DateTime',
                        minimum: new Date(2017, 6, 23),
                        maximum: new Date(2018, 6, 30),
                        intervalType: 'Days',
                        showLabelOn: 'Months',
                        labelFormat: 'MMM',
                        increment: 7,
                        labelIntersectAction: 'Rotate45',
                    }, yAxis: {
                        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                        isInversed: true,
                    }, dataSource: data.calendarDataSource, cellSettings: {
                        showLabel: false,
                        border: { color: 'white' }
                    }, tooltipRender: this.tooltipTemplate, paletteSettings: {
                        palette: [{ value: 0, color: 'rgb(238,238,238)', label: 'no contributions' },
                            { value: 1, color: 'rgb(172, 213, 242)', label: '1-15 contributions' },
                            { value: 16, color: 'rgb(127, 168, 201)', label: '16-31 contributions' },
                            { value: 32, color: 'rgb(82, 123, 160)', label: '31-49 contributions' },
                            { value: 50, color: 'rgb(37, 78, 119)', label: '50+ contributions' },
                        ],
                        type: 'Fixed',
                        emptyPointColor: 'white'
                    }, load: this.load.bind(this), legendSettings: {
                        position: 'Bottom',
                        width: '20%',
                        alignment: 'Near',
                        showLabel: true,
                        labelDisplayType: 'None',
                        enableSmartLegend: true
                    } },
                    React.createElement(ej2_react_heatmap_1.Inject, { services: [ej2_react_heatmap_1.Legend, ej2_react_heatmap_1.Tooltip] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the summary of user activities in GitLab account such as merge requests, push events and comments across 52 weeks in a year.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to display a calendar data using heatmap. You can make the axis labels to display at specific time intervals along the datetime axis using the showLabelOn property."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Heatmap component features are segregated into individual feature-wise modules. To use a tooltip, inject the",
                    React.createElement("code", null, "Tooltip "),
                    "  module using the ",
                    React.createElement("code", null, "Heatmap.Inject(Tooltip) "),
                    " method, and use a legend by injecting the ",
                    React.createElement("code", null, "Legend "),
                    "  module using the ",
                    React.createElement("code", null, "Heatmap.Inject(Legend) "),
                    "  method."))));
    };
    CalendarHeatmap.prototype.tooltipTemplate = function (args) {
        var intl = new ej2_base_1.Internationalization();
        var format = intl.getDateFormat({ format: 'EEE MMM dd, yyyy' });
        var newDate = new Date(args.xValue);
        var date = new Date(newDate.getTime());
        var axisLabel = args.heatmap.axisCollections[1].axisLabels;
        var index = axisLabel.indexOf(args.yLabel);
        (date).setDate((date).getDate() + index);
        var value = format(date);
        args.content = [(args.value === 0 ? 'No' : args.value) + ' ' + 'contributions' + '<br>' + value];
    };
    ;
    CalendarHeatmap.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    ;
    return CalendarHeatmap;
}(sample_base_1.SampleBase));
exports.CalendarHeatmap = CalendarHeatmap;
