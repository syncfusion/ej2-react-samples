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
var data = require("./map-data/california.json");
var datasource = data;
var data1 = require("./map-data/texas.json");
var datasource1 = data1;
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    \n    .svgcircle{\n        -webkit-animation: opac 1.5s ease-out infinite;\n        animation: opac 1.5s ease-out infinite;\n    }\n    @keyframes opac {\n        0% {\n            stroke-opacity: 0.8;\n            stroke-width: 0px;\n        }\n        100% {\n            stroke-opacity: 0;\n            stroke-width: 8px;\n        }\n    }";
var markers = [
    { name: 'Asia', latitude: 50.32087157990324, longitude: 90.015625 },
    { name: 'Australia', latitude: -25.88583769986199, longitude: 134.296875 },
    { name: 'Africa', latitude: 16.97274101999902, longitude: 16.390625 },
    { name: 'Europe', latitude: 49.95121990866204, longitude: 18.468749999999998 },
    { name: 'North America', latitude: 59.88893689676585, longitude: -109.3359375 },
    { name: 'South America', latitude: -6.64607562172573, longitude: -55.54687499999999 }
];
var MultilayerMaps = /** @class */ (function (_super) {
    __extends(MultilayerMaps, _super);
    function MultilayerMaps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultilayerMaps.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-12' },
                    React.createElement(ej2_react_maps_1.MapsComponent, { id: "maps", loaded: this.onMapsLoad.bind(this), load: this.load, ref: function (m) { return _this.mapInstance = m; }, zoomSettings: {
                            enable: true,
                            pinchZooming: true,
                        }, titleSettings: {
                            text: 'Samsung Semiconductor office locations in USA',
                            textStyle: {
                                size: '16px'
                            }
                        } },
                        React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Marker, ej2_react_maps_1.Zoom, ej2_react_maps_1.DataLabel, ej2_react_maps_1.Marker, ej2_react_maps_1.MapsTooltip] }),
                        React.createElement(ej2_react_maps_1.LayersDirective, null,
                            React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: new ej2_maps_1.MapAjax('./src/maps/map-data/usa.json'), shapeSettings: {
                                    fill: '#E5E5E5',
                                    border: {
                                        color: 'black',
                                        width: 0.1
                                    }
                                }, dataLabelSettings: {
                                    visible: true,
                                    labelPath: 'iso_3166_2',
                                    smartLabelMode: 'Hide'
                                } }),
                            React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: datasource, type: 'SubLayer', shapeSettings: {
                                    fill: 'rgba(141, 206, 255, 0.6)',
                                    border: {
                                        color: '#1a9cff',
                                        width: 0.25
                                    }
                                } },
                                " ",
                                React.createElement(ej2_react_maps_1.MarkersDirective, null,
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, width: 20, fill: 'white', height: 20, template: '<svg id="markertemplate" width="20" height="20" style={{display:none}}><circle class="svgcircle" cx=10 cy=10 r=6 stroke="rgba(77, 77, 77, 0.8)" fill="rgba(0, 77, 153, 0.8)"/></svg>', dataSource: [
                                            { latitude: 37.3382082,
                                                longitude: -121.8863286,
                                                name: 'San Jose'
                                            }
                                        ], tooltipSettings: {
                                            visible: true,
                                            valuePath: 'name',
                                            format: '<b>${name}</b><br>Regional Office,<br>Research and Development Center'
                                        } }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, dataSource: [
                                            { latitude: 37.09023980307208,
                                                longitude: -119.35546875000001
                                            }
                                        ], template: '<div style="color:black;">CA</div>' }))),
                            React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: datasource1, type: 'SubLayer', shapeSettings: {
                                    fill: 'rgba(141, 206, 255, 0.5)',
                                    border: {
                                        color: '#1a9cff',
                                        width: 0.25
                                    }
                                } },
                                React.createElement(ej2_react_maps_1.MarkersDirective, null,
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, animationDuration: 0, fill: 'white', width: 20, height: 20, template: '<svg id="markertemplate" width="20" height="20" style={{display:none}}><circle class="svgcircle" cx=10 cy=10 r=6 stroke="rgba(77, 77, 77, 0.8)" fill="rgba(0, 77, 153, 0.8)"/></svg>', dataSource: [
                                            { latitude: 30.267153,
                                                longitude: -97.7430608,
                                                name: 'Austin'
                                            }
                                        ], tooltipSettings: {
                                            visible: true,
                                            valuePath: 'name',
                                            format: '<b>${name}</b><br>Manufacturing Center,<br>Research and Development Center'
                                        } }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, dataSource: [
                                            { latitude: 31.80289258670676,
                                                longitude: -98.96484375
                                            }
                                        ], template: '<div style="color:black;">TX</div>' }))))))),
            React.createElement("div", { style: { float: 'right', marginright: '10px' } },
                "Source:",
                React.createElement("a", { href: "http://www.samsung.com/semiconductor/about-us/location/", target: "_blank" }, "www.samsung.com")),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample depicts the layers along with sublayers. Countries in the African and Australian continents are rendered in the sublayers.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render a sublayer in map. Sublayers are used to render the desired shapes over the existing layers. Any number of sublayers can be added to a map. You can use the ",
                    React.createElement("code", null, "fill"),
                    ", ",
                    React.createElement("code", null, "width"),
                    ", and ",
                    React.createElement("code", null, "color"),
                    " properties in the border to customize the appearance of the shapes."),
                React.createElement("p", null, "Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a marker or tap a marker in touch enabled devices."))));
    };
    MultilayerMaps.prototype.onMapsLoad = function (args) {
        var maps = document.getElementById('maps');
        maps.setAttribute('title', '');
    };
    ;
    // custom code start
    MultilayerMaps.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    ;
    return MultilayerMaps;
}(sample_base_1.SampleBase));
exports.MultilayerMaps = MultilayerMaps;
