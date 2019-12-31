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
var data = require("./map-data/default-datasource.json");
var datasource = data;
// Data ref
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    .backLabel:hover {\n        cursor: pointer;\n}";
var markers = [
    { name: 'Asia', latitude: 50.32087157990324, longitude: 90.015625 },
    { name: 'Australia', latitude: -23.88583769986199, longitude: 134.296875 },
    { name: 'Africa', latitude: 16.97274101999902, longitude: 16.390625 },
    { name: 'Europe', latitude: 49.95121990866204, longitude: 18.468749999999998 },
    { name: 'North America', latitude: 59.88893689676585, longitude: -109.3359375 },
    { name: 'South America', latitude: -6.64607562172573, longitude: -54.54687499999999 }
];
var touchmove;
var DrilldownMaps = (function (_super) {
    __extends(DrilldownMaps, _super);
    function DrilldownMaps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DrilldownMaps.prototype.change = function () {
        this.mapInstance.baseLayerIndex = 0;
        this.mapInstance.refresh();
        var button = document.getElementById('button');
        button.style.display = 'none';
        document.getElementById('content').innerHTML = 'Click on a shape to drill';
        document.getElementById('category').style.visibility = 'hidden';
        document.getElementById('text').innerHTML = '';
        document.getElementById('symbol').style.visibility = 'hidden';
    };
    DrilldownMaps.prototype.shapeSelected = function (args) {
        var shape = args.shapeData.continent;
        if (this.mapInstance.baseLayerIndex === 0 && !touchmove) {
            if (shape === 'Africa') {
                this.mapInstance.baseLayerIndex = 1;
                this.mapInstance.refresh();
            }
            else if (shape === 'Europe') {
                this.mapInstance.baseLayerIndex = 2;
                this.mapInstance.refresh();
            }
            else if (shape === 'Asia') {
                this.mapInstance.baseLayerIndex = 3;
                this.mapInstance.refresh();
            }
            else if (shape === 'North America') {
                this.mapInstance.baseLayerIndex = 4;
                this.mapInstance.refresh();
            }
            else if (shape === 'South America') {
                this.mapInstance.baseLayerIndex = 5;
                this.mapInstance.refresh();
            }
            else if (shape === 'Australia') {
                this.mapInstance.baseLayerIndex = 6;
                this.mapInstance.refresh();
            }
            var button = document.getElementById('button');
            button.style.display = 'block';
            document.getElementById('content').innerHTML = '';
            document.getElementById('category').style.visibility = 'visible';
            document.getElementById('text').innerHTML = shape;
            document.getElementById('symbol').style.visibility = 'visible';
        }
        touchmove = false;
    };
    DrilldownMaps.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { id: "button", className: "backLabel" },
                    React.createElement("a", { id: "category", onClick: this.change.bind(this), style: { visibility: 'hidden', display: 'inline-block', fontsize: 16 } },
                        React.createElement("h5", null, "WorldMap")),
                    React.createElement("p", { style: { visibility: 'hidden', display: 'inline-block' }, id: "symbol" }, "\u00A0>>\u00A0"),
                    React.createElement("p", { id: "text", style: { display: 'inline-block', fontSize: 16 } })),
                React.createElement("div", { className: 'col-md-12' },
                    React.createElement(ej2_react_maps_1.MapsComponent, { id: "maps", ref: function (m) { return _this.mapInstance = m; }, loaded: this.loaded, load: this.load, shapeSelected: this.shapeSelected.bind(this), zoomSettings: {
                            enable: false
                        } },
                        React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Selection, ej2_react_maps_1.Highlight, ej2_react_maps_1.Marker, ej2_react_maps_1.MapsTooltip] }),
                        React.createElement(ej2_react_maps_1.LayersDirective, null,
                            React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: new ej2_maps_1.MapAjax('./src/maps/map-data/world-map.json'), layerType: 'Geometry', shapePropertyPath: 'continent', shapeDataPath: 'continent', dataSource: datasource.default, shapeSettings: {
                                    colorValuePath: 'drillColor'
                                }, selectionSettings: {
                                    enable: false
                                }, tooltipSettings: {
                                    visible: true,
                                    valuePath: 'continent'
                                } },
                                React.createElement(ej2_react_maps_1.MarkersDirective, null,
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, template: '<div style="font-size: 12px;color:white;text-shadow: 0px 1px 1px black;font-weight: 500;width:50px">{{:name}}</div>', animationDuration: 0, dataSource: markers }))),
                            React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: new ej2_maps_1.MapAjax('./src/maps/map-data/africa.json'), layerType: 'Geometry', shapeSettings: {
                                    fill: '#80306A'
                                }, highlightSettings: {
                                    enable: true,
                                    fill: '#80306A'
                                }, tooltipSettings: {
                                    visible: true,
                                    valuePath: 'name'
                                } }),
                            React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: new ej2_maps_1.MapAjax('./src/maps/map-data/europe.json'), layerType: 'Geometry', shapeSettings: {
                                    fill: '#622D6C'
                                }, highlightSettings: {
                                    enable: true,
                                    fill: '#622D6C'
                                }, tooltipSettings: {
                                    visible: true,
                                    valuePath: 'name'
                                } }),
                            React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: new ej2_maps_1.MapAjax('./src/maps/map-data/asia.json'), layerType: 'Geometry', shapeSettings: {
                                    fill: '#462A6D'
                                }, highlightSettings: {
                                    enable: true,
                                    fill: '#462A6D'
                                }, tooltipSettings: {
                                    visible: true,
                                    valuePath: 'name'
                                } }),
                            React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: new ej2_maps_1.MapAjax('./src/maps/map-data/north-america.json'), layerType: 'Geometry', shapeSettings: {
                                    fill: '#C13664'
                                }, highlightSettings: {
                                    enable: true,
                                    fill: '#C13664'
                                }, tooltipSettings: {
                                    visible: true,
                                    valuePath: 'name'
                                } }),
                            React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: new ej2_maps_1.MapAjax('./src/maps/map-data/south-america.json'), layerType: 'Geometry', shapeSettings: {
                                    fill: '#9C3367'
                                }, highlightSettings: {
                                    enable: true,
                                    fill: '#9C3367'
                                }, tooltipSettings: {
                                    visible: true,
                                    valuePath: 'name'
                                } }),
                            React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: new ej2_maps_1.MapAjax('./src/maps/map-data/oceania.json'), layerType: 'Geometry', shapeSettings: {
                                    fill: '#2A2870'
                                }, highlightSettings: {
                                    enable: true,
                                    fill: '#2A2870'
                                }, tooltipSettings: {
                                    visible: true,
                                    valuePath: 'name'
                                } }))))),
            React.createElement("div", null,
                React.createElement("i", null,
                    React.createElement("p", { id: "content", style: { fontSize: '16px', color: 'grey', textAlign: 'center' } }, "Click on a shape to drill"))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates drill down with all the continents in the initial view. By clicking a continent, you can view all the countries available in that continent.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to display an another layer by clicking a shape in previous layer. Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a shape or tap a shape in touch enabled devices"))));
    };
    //public onMapsLoad(args: ILoadedEventArgs): void {
    //};
    // custom code start
    DrilldownMaps.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    ;
    DrilldownMaps.prototype.loaded = function (args) {
        var maps = document.getElementById('maps');
        maps.setAttribute('title', '');
        var mapsSVG = document.getElementById('mapdrilldown_svg');
        if (mapsSVG) {
            mapsSVG.addEventListener('touchmove', function (e) { touchmove = true; }, false);
        }
    };
    ;
    return DrilldownMaps;
}(sample_base_1.SampleBase));
exports.DrilldownMaps = DrilldownMaps;
