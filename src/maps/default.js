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
 * Default map sample
 */
var React = require("react");
var ej2_maps_1 = require("@syncfusion/ej2-maps");
var ej2_react_maps_1 = require("@syncfusion/ej2-react-maps");
var sample_base_1 = require("../common/sample-base");
var data = require("./map-data/default-datasource.json");
var datasource = data;
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var markers = [
    { name: 'Asia', latitude: 50.32087157990324, longitude: 90.015625 },
    { name: 'Australia', latitude: -25.88583769986199, longitude: 134.296875 },
    { name: 'Africa', latitude: 16.97274101999902, longitude: 16.390625 },
    { name: 'Europe', latitude: 49.95121990866204, longitude: 18.468749999999998 },
    { name: 'North America', latitude: 59.88893689676585, longitude: -109.3359375 },
    { name: 'South America', latitude: -6.64607562172573, longitude: -55.54687499999999 }
];
var DefaultMaps = (function (_super) {
    __extends(DefaultMaps, _super);
    function DefaultMaps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DefaultMaps.prototype.render = function () {
        return (React.createElement("div", { className: 'control-panel' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_maps_1.MapsComponent, { id: "maps", loaded: this.onMapsLoad.bind(this), load: this.load, zoomSettings: {
                        enable: false
                    }, legendSettings: {
                        visible: true
                    }, titleSettings: {
                        text: 'YouTube office locations',
                        textStyle: {
                            size: '16px'
                        }
                    } },
                    React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Marker, ej2_react_maps_1.Legend, ej2_react_maps_1.MapsTooltip] }),
                    React.createElement(ej2_react_maps_1.LayersDirective, null,
                        React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: new ej2_maps_1.MapAjax('./src/maps/map-data/world-map.json'), shapePropertyPath: 'continent', shapeDataPath: 'continent', dataSource: datasource.default, shapeSettings: {
                                colorValuePath: 'color'
                            } },
                            React.createElement(ej2_react_maps_1.MarkersDirective, null,
                                React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, template: '<div style="font-size: 12px;color:white;text-shadow: 0px 1px 1px black;font-weight: 500;width:50px">{{:name}}</div>', animationDuration: 0, dataSource: markers }),
                                React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, shape: 'Image', imageUrl: 'src/maps/images/ballon.png', height: 20, width: 20, animationDuration: 0, tooltipSettings: {
                                        visible: true,
                                        valuePath: 'name'
                                    }, dataSource: [
                                        { latitude: 37.6276571, longitude: -122.4276688, name: 'San Bruno' },
                                        { latitude: 33.5302186, longitude: -117.7418381, name: 'Laguna Niguel' },
                                        { latitude: 40.7424509, longitude: -74.0081468, name: 'New York' },
                                        { latitude: -23.5268201, longitude: -46.6489927, name: 'Bom Retiro' },
                                        { latitude: 43.6533855, longitude: -79.3729994, name: 'Toronto' },
                                        { latitude: 48.8773406, longitude: 2.3299627, name: 'Paris' },
                                        { latitude: 52.4643089, longitude: 13.4107368, name: 'Berlin' },
                                        { latitude: 19.1555762, longitude: 72.8849595, name: 'Mumbai' },
                                        { latitude: 35.6628744, longitude: 139.7345469, name: 'Minato' },
                                        { latitude: 51.5326602, longitude: -0.1262422, name: 'London' }
                                    ] })))))),
            React.createElement("div", { style: { float: 'right', marginright: '10px' } },
                "Source:",
                React.createElement("a", { href: "https://craft.co/youtube/locations", target: "_blank" }, "craft.co/youtube/locations")),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the continents in the world by rendering these in a map layer. Also marks the office locations of YouTube in the world using markers. ")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render a map with the provided GeoJSON data. Group of shapes can be combined to form a layer of the map. You can bind the desired colors from the data source to the map shapes. The marker template is used to display the names for shapes. Legend is enabled in this example to represent each continent."),
                React.createElement("p", null, "Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a marker or tap a marker in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "Maps component features are segregated into individual feature-wise modules. To use a legend, inject the ",
                    React.createElement("code", null, "Legend"),
                    " module using the ",
                    React.createElement("code", null, "Maps.Inject(Legend)"),
                    " method."))));
    };
    DefaultMaps.prototype.onMapsLoad = function (args) {
        var maps = document.getElementById('maps');
        maps.setAttribute('title', '');
    };
    ;
    // custom code start
    DefaultMaps.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    ;
    return DefaultMaps;
}(sample_base_1.SampleBase));
exports.DefaultMaps = DefaultMaps;
