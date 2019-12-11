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
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var SAMPLE_CSS = "\n#category:hover {\n    cursor: pointer;\n}";
var content = '<div id= "white" style="cursor:pointer;padding:3px;width:30px; height:30px;"><img src="./src/chart/images/white.png" id="back" /><div>';
var Drilldown = /** @class */ (function (_super) {
    __extends(Drilldown, _super);
    function Drilldown() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = [
            { x: 'SUV', y: 25 }, { x: 'Car', y: 37 }, { x: 'Pickup', y: 15 },
            { x: 'Minivan', y: 23 }
        ];
        _this.suvs = [{ x: 'Toyota', y: 8 }, { x: 'Ford', y: 12 }, { x: 'GM', y: 17 }, { x: 'Renault', y: 6 }, { x: 'Fiat', y: 3 },
            { x: 'Hyundai', y: 16 }, { x: 'Honda', y: 8 }, { x: 'Maruthi', y: 10 }, { x: 'BMW', y: 20 }];
        _this.cars = [{ x: 'Toyota', y: 7 }, { x: 'Chrysler', y: 12 }, { x: 'Nissan', y: 9 }, { x: 'Ford', y: 15 },
            { x: 'Tata', y: 10 },
            { x: 'Mahindra', y: 7 }, { x: 'Renault', y: 8 }, { x: 'Skoda', y: 5 }, { x: 'Volkswagen', y: 15 }, { x: 'Fiat', y: 3 }];
        _this.pickups = [{ x: 'Nissan', y: 9 }, { x: 'Chrysler', y: 4 }, { x: 'Ford', y: 7 }, { x: 'Toyota', y: 20 },
            { x: 'Suzuki', y: 13 }, { x: 'Lada', y: 12 }, { x: 'Bentley', y: 6 }, { x: 'Volvo', y: 10 }, { x: 'Audi', y: 19 }];
        _this.minivans = [{ x: 'Hummer', y: 11 }, { x: 'Ford', y: 5 }, { x: 'GM', y: 12 }, { x: 'Chrysler', y: 3 },
            { x: 'Jaguar', y: 9 },
            { x: 'Fiat', y: 8 }, { x: 'Honda', y: 15 }, { x: 'Hyundai', y: 4 }, { x: 'Scion', y: 11 }, { x: 'Toyota', y: 17 }];
        _this.dataLabel = {
            visible: true, position: 'Inside', connectorStyle: { type: 'Curve', length: '5%' }, font: { size: '14px', color: 'white' }
        };
        _this.startAngle = 0;
        //public explodeIndex: number = 2;
        _this.endAngle = 360;
        _this.title = 'Automobile Sales by Category';
        _this.isparent = true;
        return _this;
        // custom code end
    }
    Drilldown.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { id: "link" },
                    React.createElement("a", { id: "category", onClick: this.onClick.bind(this), style: { visibility: 'hidden', display: 'inline-block' } }, "Sales by Category"),
                    React.createElement("p", { style: { visibility: 'hidden', display: 'inline-block' }, id: "symbol" }, "\u00A0>>\u00A0"),
                    React.createElement("p", { id: "text", style: { display: 'inline-block' } })),
                React.createElement(ej2_react_charts_1.AccumulationChartComponent, { id: 'pie-chart', ref: function (pie) { return _this.pie = pie; }, title: 'Automobile Sales by Category', enableSmartLabels: false, legendSettings: { visible: false }, tooltip: { enable: false, format: '${point.x} <br> ${point.y} %' }, chartMouseClick: this.onChartMouseClick.bind(this), textRender: this.onTextRender.bind(this), load: this.load.bind(this), loaded: this.onChartLoad.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AccumulationDataLabel, ej2_react_charts_1.AccumulationTooltip, ej2_react_charts_1.PieSeries, ej2_react_charts_1.AccumulationAnnotation] }),
                    React.createElement(ej2_react_charts_1.AccumulationSeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.AccumulationSeriesDirective, { dataSource: this.data, xName: 'x', yName: 'y', dataLabel: this.dataLabel, radius: '70%', explode: false })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates drill down sample with pie chart for a automobiles sales by category. By clicking one category, you can navigate to other sub-category by which companies are differentiated.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    " In this example, you can see how to achieve ",
                    React.createElement("code", null, "drilldown"),
                    " concept using pie control. An automobile sales has been shown by different category, on clicking each category, you can navigate to next level, which shows the sales of those category in terms of company."),
                React.createElement("p", null, " Legend and datalabel is used in this sample."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    " Accumulation chart component features are segregated into individual feature-wise modules. To use datalabel, we need to inject DataLabel module ",
                    React.createElement("code", null, "AccumulationDataLabel"),
                    " into services "))));
    };
    Drilldown.prototype.onTextRender = function (args) {
        args.text = args.point.x + ' ' + args.point.y + ' %';
    };
    Drilldown.prototype.onChartMouseClick = function (args) {
        var index = ej2_react_charts_1.indexFinder(args.target);
        if (this.isparent && document.getElementById('pie-chart_Series_' + index.series + '_Point_' + index.point)) {
            this.isparent = false;
            switch (index.point) {
                case 0:
                    this.pie.series[0].dataSource = this.suvs;
                    this.pie.title = 'Automobile Sales in the SUV Segment';
                    document.getElementById('text').innerHTML = 'SUV';
                    break;
                case 1:
                    this.pie.series[0].dataSource = this.cars;
                    this.pie.title = 'Automobile Sales in the Car Segment';
                    document.getElementById('text').innerHTML = 'Car';
                    break;
                case 2:
                    this.pie.series[0].dataSource = this.pickups;
                    this.pie.title = 'Automobile Sales in the Pickup Segment';
                    document.getElementById('text').innerHTML = 'Pickup';
                    break;
                case 3:
                    this.pie.series[0].dataSource = this.minivans;
                    this.pie.title = 'Automobile Sales in the Minivan Segment';
                    document.getElementById('text').innerHTML = 'Minivan';
                    break;
            }
            this.pie.annotations = [{
                    content: '<div id="back" style="cursor:pointer; padding: 3px; width: 30px; height: 30px;">' +
                        '<img src="./src/chart/images/back.png" id="imgback" />', region: 'Series', x: '50%', y: '50%'
                }];
            this.pie.series[0].innerRadius = '30%';
            this.pie.series[0].explode = false;
            this.pie.series[0].dataLabel.position = 'Outside';
            this.pie.series[0].dataLabel.font.color = 'black';
            this.pie.legendSettings.visible = true;
            this.pie.visibleSeries[0].explodeIndex = null;
            this.pie.enableSmartLabels = true;
            this.pie.refresh();
            document.getElementById('category').style.visibility = 'visible';
            document.getElementById('symbol').style.visibility = 'visible';
            document.getElementById('text').style.visibility = 'visible';
        }
        if (args.target.indexOf('back') > -1) {
            this.hide(document.getElementById(args.target));
        }
    };
    Drilldown.prototype.onClick = function (e) {
        this.hide(e.target);
    };
    Drilldown.prototype.hide = function (target) {
        this.pie.series[0].dataSource = this.data;
        this.pie.series[0].innerRadius = '0%';
        this.isparent = true;
        this.pie.series[0].explode = false;
        this.pie.annotations = [];
        this.pie.annotationModule['annotations'] = [];
        this.pie.series[0].dataLabel = this.dataLabel;
        this.pie.title = this.title;
        this.pie.legendSettings.visible = false;
        //this.pie.visibleSeries[0].explodeIndex = this.explodeIndex;
        this.pie.enableSmartLabels = false;
        this.pie.refresh();
        target.style.visibility = 'hidden';
        document.getElementById('category').style.visibility = 'hidden';
        document.getElementById('symbol').style.visibility = 'hidden';
        document.getElementById('text').style.visibility = 'hidden';
    };
    Drilldown.prototype.onChartLoad = function (args) {
        document.getElementById('pie-chart').setAttribute('title', '');
    };
    ;
    // custom code start
    Drilldown.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/dark/i, "Dark").
            replace(/light/i, "Light");
        if (selectedTheme === 'highcontrast') {
            args.accumulation.series[0].dataLabel.font.color = "white";
            args.accumulation.annotations[0].content = content;
        }
    };
    ;
    return Drilldown;
}(sample_base_1.SampleBase));
exports.Drilldown = Drilldown;
