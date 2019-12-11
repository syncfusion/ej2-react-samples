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
 * Sample fro DataLabel template
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var data1 = [
    { x: 2010, y: 1014 }, { x: 2011, y: 1040 },
    { x: 2012, y: 1065 }, { x: 2013, y: 1110 },
    { x: 2014, y: 1130 }, { x: 2015, y: 1153 },
    { x: 2016, y: 1175 }
];
var data2 = [
    { x: 2010, y: 990 }, { x: 2011, y: 1010 },
    { x: 2012, y: 1030 }, { x: 2013, y: 1070 },
    { x: 2014, y: 1105 }, { x: 2015, y: 1138 },
    { x: 2016, y: 1155 }
];
var theme;
var materialMan = '<div style="background-color:#00bdae;border-radius: 3px; width: 68px">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" />' +
    '<div style="color:white; font-family:Roboto; font-style: medium; fontp-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center; padding-right: 6px;"><span>' +
    '${point.y}M </span></div></div>';
var materialWomen = '<div style="background-color:#404041;border-radius: 3px; width: 68px">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" />' +
    '<div style="color:white; font-family:Roboto; font-style: medium; fontp-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y}M </span></div></div>';
var fabricMan = '<div style="background-color:#4472c4;border-radius: 3px;width: 68px">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" />' +
    '<div style="color:white; font-family:Roboto; font-style: medium; fontp-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px"><span>' +
    '${point.y}M </span></div></div>';
var fabricWomen = '<div style="background-color:#ed7d31;border-radius: 3px;width: 68px">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" />' +
    '<div style="color:white; font-family:Roboto; font-style: medium; fontp-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px"><span>' +
    '${point.y}M </span></div></div>';
var bootstrapMan = '<div style="background-color:#a16ee5;border-radius: 3px;width: 68px">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" />' +
    '<div style="color:white; font-family:Roboto; font-style: medium; fontp-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px"><span>' +
    '${point.y}M </span></div></div>';
var bootstrapWomen = '<div style="background-color:#f7ce69;border-radius: 3px;width: 68px">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" />' +
    '<div style="color:white; font-family:Roboto; font-style: medium; fontp-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px"><span>' +
    '${point.y}M </span></div></div>';
var highcontrastMan = '<div style="background-color:#79ECE4;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" />' +
    '<div style="color:white; font-family:Roboto; font-style: medium; fontp-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y}M </span></div></div>';
var highcontrastWomen = '<div style="background-color:#E98272;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" />' +
    '<div style="color:white; font-family:Roboto; font-style: medium; fontp-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px"><span>' +
    '${point.y}M </span></div></div>';
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n\t}";
var DataLabelTemplate = /** @class */ (function (_super) {
    __extends(DataLabelTemplate, _super);
    function DataLabelTemplate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataLabelTemplate.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: {
                        minimum: 2010, maximum: 2016,
                        interval: ej2_base_1.Browser.isDevice ? 2 : 1,
                        edgeLabelPlacement: 'Shift',
                        labelStyle: {
                            fontFamily: 'Roboto',
                            fontStyle: 'medium',
                            size: '14px'
                        },
                        majorGridLines: { width: 0 },
                        lineStyle: { color: '#eaeaea', width: 1 }
                    }, primaryYAxis: {
                        minimum: 900, maximum: 1300,
                        labelFormat: '{value}M',
                        title: ej2_base_1.Browser.isDevice ? '' : 'Population',
                        labelStyle: {
                            fontFamily: 'Roboto',
                            fontStyle: 'medium', size: '14px'
                        },
                        interval: 80,
                        majorGridLines: {
                            color: '#eaeaea', width: 1
                        },
                        lineStyle: {
                            color: '#eaeaea', width: 1
                        }
                    }, titleStyle: {
                        fontFamily: 'Roboto',
                        fontStyle: 'medium', size: '14px'
                    }, chartArea: { border: { width: 0 } }, width: ej2_base_1.Browser.isDevice ? '100%' : '60%', title: 'Population of India Statistics', subTitle: '(2010 - 2016)', subTitleStyle: {
                        textAlignment: 'Far'
                    }, load: this.loadPre.bind(this), loaded: this.loaded.bind(this), textRender: this.textRender.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.LineSeries, ej2_react_charts_1.DataLabel, ej2_react_charts_1.Category, ej2_react_charts_1.Legend] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: data1, xName: 'x', yName: 'y', name: 'Male', type: 'Line', marker: {
                                visible: true,
                                shape: 'Circle',
                                dataLabel: {
                                    visible: true,
                                    position: 'Top',
                                    margin: { right: 15 },
                                    template: materialMan
                                }
                            }, width: 2 }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: data2, xName: 'x', yName: 'y', name: 'Female', type: 'Line', marker: {
                                visible: true,
                                shape: 'Rectangle',
                                dataLabel: {
                                    visible: true,
                                    position: 'Bottom',
                                    margin: { right: 15 },
                                    template: materialWomen
                                }
                            }, width: 2 })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates datalabel template support in the chart. In this sample, images are placed as datalabel by means of templates.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "Label content can be formatted by using the template option in dataLabel. Inside the template, you can add the placeholder text to display corresponding data points value."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use DataLabel, we need to inject",
                    React.createElement("code", null, "DataLabel"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the Crosshair can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-dataLabelSettingsModel.html" }, "documentation section"),
                    "."))));
    };
    DataLabelTemplate.prototype.textRender = function (args) {
        if (theme === 'Material') {
            args.template = args.series.name === 'Male' ? materialMan : materialWomen;
        }
        else if (theme === 'Fabric') {
            args.template = args.series.name === 'Male' ? fabricMan : fabricWomen;
        }
        else {
            args.template = args.series.name === 'Male' ? bootstrapMan : bootstrapWomen;
        }
    };
    ;
    // custom code start
    DataLabelTemplate.prototype.loadPre = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark");
        theme = args.chart.theme;
    };
    ;
    // custom code end
    DataLabelTemplate.prototype.loaded = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    return DataLabelTemplate;
}(sample_base_1.SampleBase));
exports.DataLabelTemplate = DataLabelTemplate;
