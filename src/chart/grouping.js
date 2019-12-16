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
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
exports.data1 = [
    { 'x': 'China', y: 26, text: 'China: 26' },
    { 'x': 'Russia', y: 19, text: 'Russia: 19' },
    { 'x': 'Germany', y: 17, text: 'Germany: 17' },
    { 'x': 'Japan', y: 12, text: 'Japan: 12' },
    { 'x': 'France', y: 10, text: 'France: 10' },
    { 'x': 'South Korea', y: 9, text: 'South Korea: 9' },
    { 'x': 'Great Britain', y: 27, text: 'Great Britain: 27' },
    { 'x': 'Italy', y: 8, text: 'Italy: 8' },
    { 'x': 'Australia', y: 8, text: 'Australia: 8' },
    { 'x': 'Netherlands', y: 8, text: 'Netherlands: 8' },
    { 'x': 'Hungary', y: 8, text: 'Hungary: 8' },
    { 'x': 'Brazil', y: 7, text: 'Brazil: 7' },
    { 'x': 'Spain', y: 7, text: 'Spain: 7' },
    { 'x': 'Kenya', y: 6, text: 'Kenya: 6' },
];
var Grouping = /** @class */ (function (_super) {
    __extends(Grouping, _super);
    function Grouping() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.droplist = [
            { value: 'Point' },
            { value: 'Value' }
        ];
        return _this;
        // custom code end
    }
    Grouping.prototype.change = function () {
        this.pie.series[0].groupMode = this.dropElement.value;
        var currentValue = this.dropElement.value === 'Point' ? 9 : 8;
        this.pie.series[0].groupTo = currentValue.toString();
        this.pie.series[0].animation.enable = false;
        document.getElementById('clubtext').innerHTML = currentValue.toString();
        this.pie.removeSvg();
        this.pie.refreshSeries();
        this.pie.refreshChart();
    };
    ;
    Grouping.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-lg-9' },
                    React.createElement(ej2_react_charts_1.AccumulationChartComponent, { id: 'pie-chart', ref: function (pie) { return _this.pie = pie; }, title: 'RIO Olympics Gold', load: this.load.bind(this), tooltip: { enable: false }, legendSettings: { visible: false }, textRender: this.onTextRender.bind(this), pointRender: this.onPointRender.bind(this), enableSmartLabels: true, loaded: this.onChartLoad.bind(this) },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AccumulationLegend, ej2_react_charts_1.PieSeries, ej2_react_charts_1.AccumulationTooltip, ej2_react_charts_1.AccumulationDataLabel] }),
                        React.createElement(ej2_react_charts_1.AccumulationSeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.AccumulationSeriesDirective, { name: 'RIO', dataSource: exports.data1, xName: 'x', yName: 'y', animation: { enable: true }, explode: true, radius: '70%', groupTo: '9', groupMode: 'Point', startAngle: 0, endAngle: 360, innerRadius: '0%', dataLabel: {
                                    visible: true,
                                    position: 'Outside',
                                    connectorStyle: { type: 'Line', length: '5%' },
                                    font: {
                                        size: '14px'
                                    }
                                } })))),
                React.createElement("div", { className: 'col-lg-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", null, "Mode: ")),
                                React.createElement("td", { style: { padding: 10, width: '50%' } },
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: 120, id: "modes", change: this.change.bind(this), ref: function (d) { return _this.dropElement = d; }, dataSource: this.droplist, fields: { text: 'value', value: 'value' }, value: "Point" }))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null,
                                        "Group To:",
                                        React.createElement("p", { id: "clubtext", style: { fontWeight: 'normal' } }, "9"))),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement("input", { type: "range", name: "clubvalue", onChange: this.onClubvalue.bind(this), ref: function (slider) { return _this.slider = slider; }, defaultValue: "9", min: "0", max: "27", id: "clubvalue", style: { marginLeft: '-5px' } })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample illustrates the grouping functionality in pie series.  The grouping value can be changed by using ",
                    React.createElement("code", null, "Group To"),
                    " property.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    " In this example, you can see how to ",
                    React.createElement("code", null, "group"),
                    " points in pie chart."),
                React.createElement("p", null,
                    " Points having value below the ",
                    React.createElement("code", null, "'groupTo'"),
                    " value are grouped and showed as separate point. You can customise the apearance of the point using ",
                    React.createElement("code", null, "'poinRender'"),
                    " event."),
                React.createElement("p", null, " DataLabel is used to represent individual data and its value."))));
    };
    Grouping.prototype.onTextRender = function (args) {
        args.text = args.point.x + ' ' + args.point.y;
    };
    ;
    Grouping.prototype.onPointRender = function (args) {
        if (args.point.isClubbed || args.point.isSliced) {
            args.fill = '#D3D3D3';
        }
    };
    ;
    Grouping.prototype.onChartLoad = function (args) {
        document.getElementById('pie-chart').setAttribute('title', '');
    };
    ;
    Grouping.prototype.onClubvalue = function (e) {
        var clubvalue = document.getElementById('clubvalue').value;
        this.pie.series[0].groupTo = clubvalue;
        this.pie.series[0].animation.enable = false;
        document.getElementById('clubtext').innerHTML = clubvalue;
        this.pie.removeSvg();
        this.pie.refreshSeries();
        this.pie.refreshChart();
    };
    ;
    // custom code start
    Grouping.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    ;
    return Grouping;
}(sample_base_1.SampleBase));
exports.Grouping = Grouping;
