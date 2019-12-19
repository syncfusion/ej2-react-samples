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
 * Sample for treemap with pie
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_react_treemap_1 = require("@syncfusion/ej2-react-treemap");
var sample_base_1 = require("../common/sample-base");
var data = require("./treemap-data/continent_data.json");
ej2_react_charts_1.AccumulationChart.Inject(ej2_react_charts_1.AccumulationTooltip, ej2_react_charts_1.PieSeries, ej2_react_charts_1.DataLabel, ej2_react_charts_1.AccumulationChart);
var datasource = data;
// custom code start
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
// custom code end
var Pie = (function (_super) {
    __extends(Pie, _super);
    function Pie() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.chartCollection = [];
        _this.count = 0;
        return _this;
    }
    // custom code start
    Pie.prototype.load = function (args) {
        var theme = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.treemap.theme = (theme.charAt(0).toUpperCase() + theme.slice(1));
    };
    // custom code end
    Pie.prototype.loaded = function (args) {
        var template = document.getElementById(args.treemap.element.id + '_Label_Template_Group');
        if (template) {
            for (var i = 0; i < template.childElementCount; i++) {
                this.AccumulationChartRender(template.childNodes[i].childNodes[0].id, i);
            }
            var count = 0;
        }
    };
    Pie.prototype.resize = function (args) {
        for (var i = 0; i < this.chartCollection.length; i++) {
            this.chartCollection[i].destroy();
        }
    };
    Pie.prototype.tooltipRendering = function (args) {
        //tslint:disable-next-line
        if (args.item['groupIndex'] !== 1) {
            args.cancel = true;
        }
    };
    Pie.prototype.AccumulationChartRender = function (id, i) {
        var chartData = this.getData(i);
        var dataSource = chartData['data'];
        var name = chartData['name'];
        var chart = new ej2_react_charts_1.AccumulationChart({
            background: 'transparent',
            tooltip: {
                enable: true,
                format: '${point.x} : ${point.y}%'
            },
            series: [
                {
                    explode: true,
                    explodeIndex: 0,
                    explodeOffset: '20%',
                    name: name,
                    palettes: ['#1E1E1E', '#00BDAE', '#FFFFFF'],
                    dataSource: dataSource,
                    type: 'Pie',
                    xName: 'x',
                    yName: 'y'
                }
            ],
            legendSettings: { visible: false }
        });
        chart.appendTo('#' + id);
        this.chartCollection.push(chart);
    };
    Pie.prototype.getData = function (count) {
        var dataSource;
        var dataName;
        if (count === 0) {
            dataSource = [
                { 'x': '0-15 years', y: 40.8 }, { 'x': '15-64 years', y: 56.2 },
                { 'x': 'Above 64 years', y: 3.0 }
            ];
            dataName = 'Afica';
        }
        else if (count === 1) {
            dataSource = [
                { 'x': '0-15 years', y: 15.5 }, { 'x': '15-64 years', y: 12.9 },
                { 'x': 'Above 64 years', y: 41.4 }
            ];
            dataName = 'Asia';
        }
        else if (count === 2) {
            dataSource = [
                { 'x': '0-15 years', y: 25.1 }, { 'x': '15-64 years', y: 67.8 },
                { 'x': 'Above 64 years', y: 7.1 }
            ];
            dataName = 'Europe';
        }
        else if (count === 3) {
            dataSource = [
                { 'x': '0-15 years', y: 15.3 }, { 'x': '15-64 years', y: 68.4 },
                { 'x': 'Above 64 years', y: 16.3 }
            ];
            dataName = 'North America';
        }
        else if (count === 4) {
            dataSource = [
                { 'x': '0-15 years', y: 22.8 }, { 'x': '15-64 years', y: 65.9 },
                { 'x': 'Above 64 years', y: 11.4 }
            ];
            dataName = 'Oceania';
        }
        else if (count === 5) {
            dataSource = [
                { 'x': '0-15 years', y: 26.8 }, { 'x': '15-64 years', y: 66.1 },
                { 'x': 'Above 64 years', y: 7.1 }
            ];
            dataName = 'South America';
        }
        else if (count === 6) {
            dataSource = [
                { 'x': '0-15 years', y: 26.8 }, { 'x': '15-64 years', y: 66.1 },
                { 'x': 'Above 64 years', y: 7.1 }
            ];
            dataName = 'South America';
        }
        else if (count === 7) {
            dataSource = [
                { 'x': '0-15 years', y: 26.8 }, { 'x': '15-64 years', y: 66.1 },
                { 'x': 'Above 64 years', y: 7.1 }
            ];
            dataName = 'South America';
        }
        else if (count === 8) {
            dataSource = [
                { 'x': '0-15 years', y: 26.8 }, { 'x': '15-64 years', y: 66.1 },
                { 'x': 'Above 64 years', y: 7.1 }
            ];
            dataName = 'South America';
        }
        else if (count === 9) {
            dataSource = [
                { 'x': '0-15 years', y: 26.8 }, { 'x': '15-64 years', y: 66.1 },
                { 'x': 'Above 64 years', y: 7.1 }
            ];
            dataName = 'South America';
        }
        else if (count === 10) {
            dataSource = [
                { 'x': '0-15 years', y: 26.8 }, { 'x': '15-64 years', y: 66.1 },
                { 'x': 'Above 64 years', y: 7.1 }
            ];
            dataName = 'South America';
        }
        else if (count === 11) {
            dataSource = [
                { 'x': '0-15 years', y: 26.8 }, { 'x': '15-64 years', y: 66.1 },
                { 'x': 'Above 64 years', y: 7.1 }
            ];
            dataName = 'South America';
        }
        else if (count === 12) {
            dataSource = [
                { 'x': '0-15 years', y: 26.8 }, { 'x': '15-64 years', y: 66.1 },
                { 'x': 'Above 64 years', y: 7.1 }
            ];
            dataName = 'South America';
        }
        count++;
        return new Object({ name: dataName, data: dataSource });
    };
    Pie.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-md-12' },
                    React.createElement(ej2_react_treemap_1.TreeMapComponent, { resize: this.resize.bind(this), loaded: this.loaded.bind(this), tooltipRendering: this.tooltipRendering.bind(this), load: this.load.bind(this), id: 'treemap-container', tooltipSettings: {
                            visible: true,
                            format: ' ${Gender} : ${Population}'
                        }, titleSettings: {
                            text: 'Population of the continents based on gender and age group - 2011',
                            textStyle: { size: '15px' }
                        }, format: "n", useGroupingSeparator: true, dataSource: datasource.continent, weightValuePath: 'Population', leafItemSettings: {
                            labelPath: 'Gender',
                            fill: '#A1317D',
                            showLabels: false,
                            border: { color: 'black', width: 0.5 },
                            labelFormat: '${Gender} : ${Population}',
                            templatePosition: 'Center',
                            labelTemplate: '<div style="height:{{:PieHeight}};width:{{:PieWidth}};" id ={{:Id}}></div>',
                        } },
                        React.createElement(ej2_react_treemap_1.Inject, { services: [ej2_react_treemap_1.TreeMapTooltip] }),
                        React.createElement(ej2_react_treemap_1.LevelsDirective, null,
                            React.createElement(ej2_react_treemap_1.LevelDirective, { groupPath: 'Continent', fill: '#7E2361', border: { color: 'black', width: 1 }, headerAlignment: 'Center', groupGap: 0, headerStyle: { size: '14px' } })))),
                React.createElement("div", { style: { float: 'right', marginright: '10px' } },
                    "Source:",
                    React.createElement("a", { href: "http://en.worldstat.info/Asia/", target: "_blank" }, "en.worldstat.info"))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the population level of various continents in 2011 based on the gender and age group.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render a pie chart as a template for leaf items in TreeMap. Any custom HTML element can be rendered as label template.",
                    React.createElement("br", null),
                    React.createElement("br", null),
                    "Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item in touch enabled devices."))));
    };
    return Pie;
}(sample_base_1.SampleBase));
exports.Pie = Pie;
