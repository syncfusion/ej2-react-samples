"use strict";
/**
 * Projection sample
 */
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
var ej2_maps_1 = require("@syncfusion/ej2-maps");
var ej2_react_maps_1 = require("@syncfusion/ej2-react-maps");
var sample_base_1 = require("../common/sample-base");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
ej2_react_charts_1.AccumulationChart.Inject(ej2_react_charts_1.PieSeries, ej2_react_charts_1.AccumulationTooltip);
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var PieMaps = /** @class */ (function (_super) {
    __extends(PieMaps, _super);
    function PieMaps() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.chartCollection = [];
        return _this;
    }
    PieMaps.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-12' },
                    React.createElement(ej2_react_maps_1.MapsComponent, { id: "maps", resize: this.resize.bind(this), loaded: this.onMapsLoad.bind(this), load: this.load, ref: function (m) { return _this.mapInstance = m; }, titleSettings: {
                            text: 'Top 6 largest countries age group details',
                            textStyle: {
                                size: '16px'
                            }
                        }, zoomSettings: {
                            enable: false
                        }, legendSettings: {
                            visible: true,
                            position: 'Bottom'
                        } },
                        React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Marker, ej2_react_maps_1.Legend] }),
                        React.createElement(ej2_react_maps_1.LayersDirective, null,
                            React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: new ej2_maps_1.MapAjax('./src/maps/map-data/continent.json'), shapeSettings: {
                                    fill: '#E5E5E5',
                                    colorMapping: [
                                        {
                                            from: 0, to: 4, color: '#634D6F', label: '0-14 years',
                                        },
                                        {
                                            from: 5, to: 14, color: '#B34D6D', label: '15-24 years'
                                        },
                                        {
                                            from: 15, to: 59, color: '#557C5C', label: '25-54 years'
                                        },
                                        {
                                            from: 60, to: 100, color: '#5E55E2', label: '55-64 years'
                                        }
                                    ]
                                } },
                                React.createElement(ej2_react_maps_1.MarkersDirective, null,
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, animationDuration: 0, template: '<div id="marker4" style="margin-left:-35px;margin-top:-35px;position: absolute !important;"></div>', dataSource: [
                                            { 'latitude': 35.746512259918504, 'longitude': 102.216796875 },
                                        ] }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, animationDuration: 0, template: '<div id="marker1" style="margin-left:-35px;margin-top:-35px;position: absolute !important;"></div>', dataSource: [
                                            { 'latitude': 61.938950426660604, 'longitude': 97.03125 },
                                        ] }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, animationDuration: 0, template: '<div id="marker2" style="margin-left:-35px;margin-top:-35px;position: absolute !important;"></div>', dataSource: [
                                            { 'latitude': 57.70414723434193, 'longitude': -114.08203125 }
                                        ] }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, animationDuration: 0, template: '<div id="marker3" style="margin-left:-35px;margin-top:-35px;position: absolute !important;"></div>', dataSource: [
                                            { 'latitude': 39.90973623453719, 'longitude': -103.0078125 }
                                        ] }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, animationDuration: 0, template: '<div id="marker5" style="margin-left:-35px;margin-top:-35px;position: absolute !important;"></div>', dataSource: [
                                            { 'latitude': -8.667918002363107, 'longitude': -52.55859375 },
                                        ] }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, animationDuration: 0, template: '<div id="marker6" style="margin-left:-35px;margin-top:-35px;position: absolute !important;"></div>', dataSource: [
                                            { 'latitude': -23.725011735951796, 'longitude': 132.978515625 }
                                        ] }))))))),
            React.createElement("div", { style: { float: 'right', marginright: '10px' } },
                "Source:",
                React.createElement("a", { href: "http://www.nationmaster.com/country-info/stats/People/Age-structure/55--64-years", target: "_blank" }, "www.nationmaster.com")),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the placing of pie charts on the maps. Pie chart is rendered with the age group detais of top 6 largest countries.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render the pie chart as marker in map. Any custom HTML elements can be used as a marker."),
                React.createElement("br", null),
                React.createElement("p", { style: { fontweight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "Maps component features are segregated into individual feature-wise modules. To use marker template, you need to inject ",
                    React.createElement("code", null, "Marker"),
                    " module using ",
                    React.createElement("code", null, "Maps.Inject(Marker)"),
                    " method."))));
    };
    PieMaps.prototype.onMapsLoad = function (args) {
        var maps = document.getElementById('maps');
        maps.setAttribute('title', '');
        var chart = new ej2_react_charts_1.AccumulationChart({
            background: 'transparent',
            width: '70',
            height: '70',
            tooltip: {
                enable: true,
                format: '${point.x} : ${point.y}'
            },
            series: [
                {
                    explode: true,
                    explodeIndex: 0,
                    explodeOffset: '20%',
                    name: 'China',
                    palettes: ['#634D6F', '#B34D6D', '#557C5C', '#5E55E2', '#7C744D'],
                    dataSource: [
                        { 'x': '0-14 years', y: 17.2 }, { 'x': '15-24 years', y: 15.4 },
                        { 'x': '25-54 years', y: 46.9 }, { 'x': '55-64 years', y: 11.3 },
                    ],
                    type: 'Pie',
                    xName: 'x',
                    yName: 'y'
                }
            ],
            legendSettings: { visible: false }
        });
        chart.appendTo('#marker1');
        this.chartCollection.push(chart);
        var chart1 = new ej2_react_charts_1.AccumulationChart({
            background: 'transparent',
            width: '70',
            height: '70',
            tooltip: {
                enable: true,
                format: '${point.x} : ${point.y}%'
            },
            series: [
                {
                    explode: true,
                    explodeIndex: 0,
                    explodeOffset: '20%',
                    name: 'Russia',
                    palettes: ['#634D6F', '#B34D6D', '#557C5C', '#5E55E2', '#7C744D'],
                    dataSource: [
                        { 'x': '0-14 years', y: 16 }, { 'x': '15-24 years', y: 11.5 },
                        { 'x': '25-54 years', y: 45.9 }, { 'x': '55-64 years', y: 13.5 },
                    ],
                    type: 'Pie',
                    xName: 'x',
                    yName: 'y'
                }
            ]
        });
        chart1.appendTo('#marker2');
        this.chartCollection.push(chart1);
        var chart2 = new ej2_react_charts_1.AccumulationChart({
            background: 'transparent',
            width: '70',
            height: '70',
            tooltip: {
                enable: true,
                format: '${point.x} : ${point.y}%'
            },
            series: [
                {
                    explode: true,
                    explodeIndex: 0,
                    explodeOffset: '20%',
                    name: 'Canada',
                    palettes: ['#634D6F', '#B34D6D', '#557C5C', '#5E55E2', '#7C744D'],
                    dataSource: [
                        { 'x': '0-14 years', y: 15.5 }, { 'x': '15-24 years', y: 12.9 },
                        { 'x': '25-54 years', y: 41.4 }, { 'x': '55-64 years', y: 13.3 },
                    ],
                    type: 'Pie',
                    xName: 'x',
                    yName: 'y'
                }
            ]
        });
        chart2.appendTo('#marker3');
        this.chartCollection.push(chart2);
        var chart3 = new ej2_react_charts_1.AccumulationChart({
            background: 'transparent',
            width: '70',
            height: '70',
            tooltip: {
                enable: true,
                format: '${point.x} : ${point.y}%'
            },
            series: [
                {
                    explode: true,
                    explodeIndex: 0,
                    explodeOffset: '20%',
                    name: 'USA',
                    palettes: ['#634D6F', '#B34D6D', '#557C5C', '#5E55E2', '#7C744D'],
                    dataSource: [
                        { 'x': '0-14 years', y: 20 }, { 'x': '15-24 years', y: 13.7 },
                        { 'x': '25-54 years', y: 40.2 }, { 'x': '55-64 years', y: 12.3 },
                    ],
                    type: 'Pie',
                    xName: 'x',
                    yName: 'y'
                }
            ]
        });
        chart3.appendTo('#marker4');
        this.chartCollection.push(chart3);
        var chart4 = new ej2_react_charts_1.AccumulationChart({
            background: 'transparent',
            width: '70',
            height: '70',
            tooltip: {
                enable: true,
                format: '${point.x} : ${point.y}%'
            },
            series: [
                {
                    explode: true,
                    explodeIndex: 0,
                    explodeOffset: '20%',
                    name: 'Brazil',
                    palettes: ['#634D6F', '#B34D6D', '#557C5C', '#5E55E2', '#7C744D'],
                    dataSource: [
                        { 'x': '0-14 years', y: 24.2 }, { 'x': '15-24 years', y: 16.7 },
                        { 'x': '25-54 years', y: 43.6 }, { 'x': '55-64 years', y: 8.2 },
                    ],
                    type: 'Pie',
                    xName: 'x',
                    yName: 'y'
                }
            ]
        });
        chart4.appendTo('#marker5');
        this.chartCollection.push(chart4);
        var chart5 = new ej2_react_charts_1.AccumulationChart({
            background: 'transparent',
            width: '70',
            height: '70',
            tooltip: {
                enable: true,
                format: '${point.x} : ${point.y}%'
            },
            series: [
                {
                    explode: true,
                    explodeIndex: 0,
                    explodeOffset: '20%',
                    name: 'Australia',
                    palettes: ['#634D6F', '#B34D6D', '#557C5C', '#5E55E2', '#7C744D'],
                    dataSource: [
                        { 'x': '0-14 years', y: 18.1 }, { 'x': '15-24 years', y: 13.4 },
                        { 'x': '25-54 years', y: 42 }, { 'x': '55-64 years', y: 11.8 },
                    ],
                    type: 'Pie',
                    xName: 'x',
                    yName: 'y'
                }
            ]
        });
        chart5.appendTo('#marker6');
        this.chartCollection.push(chart5);
    };
    ;
    // custom code start
    PieMaps.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    ;
    // custom code end
    PieMaps.prototype.resize = function (args) {
        for (var i = 0; i < this.chartCollection.length; i++) {
            this.chartCollection[i].destroy();
        }
    };
    return PieMaps;
}(sample_base_1.SampleBase));
exports.PieMaps = PieMaps;
