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
var data1 = require("./map-data/penisular-marker.json");
var data2 = require("./map-data/penisular-location.json");
var datasource1 = data1;
var datasource2 = data2;
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    #maps_layerIndex_0_line_Group{\n        stroke-dasharray: 10px 10px;\n        stroke-linejoin: round; stroke-linecap: round;\n        -webkit-animation: dash 15s linear infinite;\n        animation: dash 15s linear infinite;\n    }\n    @-webkit-keyframes dash {\n        100% {\n            stroke-dashoffset: -20px;\n        }\n    }\n\n    @keyframes dash {\n        100% {\n            stroke-dashoffset: -20px;\n        }\n    }";
var NavigationLineMaps = /** @class */ (function (_super) {
    __extends(NavigationLineMaps, _super);
    function NavigationLineMaps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NavigationLineMaps.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-12' },
                    React.createElement(ej2_react_maps_1.MapsComponent, { id: "maps", loaded: this.onMapsLoad.bind(this), load: this.load, ref: function (m) { return _this.mapInstance = m; }, zoomSettings: {
                            enable: false,
                            zoomFactor: 10
                        }, projectionType: 'Equirectangular', titleSettings: {
                            text: 'Shipping sea route between various cities',
                            textStyle: {
                                size: '18px'
                            }
                        }, mapsArea: {
                            background: '#4863A0'
                        }, centerPosition: {
                            latitude: 25.54244147012483,
                            longitude: -89.62646484375
                        } },
                        React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Zoom, ej2_react_maps_1.Marker, ej2_react_maps_1.MapsTooltip, ej2_react_maps_1.NavigationLine] }),
                        React.createElement(ej2_react_maps_1.LayersDirective, null,
                            React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: new ej2_maps_1.MapAjax('./src/maps/map-data/world-map.json'), shapeSettings: {
                                    fill: '#789071'
                                }, navigationLineSettings: datasource2.location },
                                React.createElement(ej2_react_maps_1.MarkersDirective, null,
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, shape: 'Circle', fill: 'white', width: 10, height: 10, animationDuration: 0, tooltipSettings: {
                                            visible: true,
                                            valuePath: 'title'
                                        }, dataSource: datasource1.marker }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, template: '<div id="marker1" style="font-size: 12px;color:white">ALTAMIRA</div>', dataSource: [{ latitude: 22.403410892712124, longitude: -100.0 }], animationDuration: 0 }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, template: '<div id="marker2" style="font-size: 12px;color:white">HOUSTON</div>', dataSource: [{ latitude: 30.332197482973, longitude: -95.36270141601562 }], animationDuration: 0 }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, template: '<div id="marker3" style="font-size: 12px;color:white">PANAMA CITY</div>', dataSource: [{ latitude: 30.380747605060766, longitude: -85.81283569335938 }], animationDuration: 0 }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, template: '<div id="marker4" style="font-size: 12px;color:white">TAMPA</div>', dataSource: [{ latitude: 27.9337540167772, longitude: -81.15908447265625 }], animationDuration: 0 }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, template: '<div id="marker5" style="font-size: 12px;color:white">PROGRESO</div>', dataSource: [{ latitude: 20.62336521195344, longitude: -89.6649169921875 }], animationDuration: 0 })))))),
                React.createElement("div", { style: { float: 'right', marginright: '10px' } },
                    "Source:",
                    React.createElement("a", { href: "http://www.lineaships.com/en/linea-peninsular/", target: "_blank" }, "www.lineaships.com"))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates the sea routes between various cities for shipping.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render lines between two points in map. You can use ",
                    React.createElement("code", null, "dashArray"),
                    ", ",
                    React.createElement("code", null, "width"),
                    " and ",
                    React.createElement("code", null, "color"),
                    " properties to customize the appearance of the navigation lines."),
                React.createElement("br", null),
                React.createElement("p", { style: { fontweight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "Maps component features are segregated into individual feature-wise modules. To use navigation lines, you need to inject ",
                    React.createElement("code", null, "NavigationLine"),
                    " module using ",
                    React.createElement("code", null, "Maps.Inject(NavigationLine)"),
                    " method"))));
    };
    NavigationLineMaps.prototype.onMapsLoad = function (args) {
        var maps = document.getElementById('maps');
        maps.setAttribute('title', '');
    };
    ;
    // custom code start
    NavigationLineMaps.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    ;
    return NavigationLineMaps;
}(sample_base_1.SampleBase));
exports.NavigationLineMaps = NavigationLineMaps;
