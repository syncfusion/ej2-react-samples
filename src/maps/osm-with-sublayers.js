"use strict";
/**
 * OSM sample
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
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var OSMSubLayer = (function (_super) {
    __extends(OSMSubLayer, _super);
    function OSMSubLayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OSMSubLayer.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-12' },
                    React.createElement(ej2_react_maps_1.MapsComponent, { id: "maps", load: this.load, ref: function (m) { return _this.mapInstance = m; }, titleSettings: {
                            text: 'Location of Africa continent in the World map',
                            textStyle: {
                                size: '16px'
                            }
                        }, zoomSettings: {
                            enable: true
                        } },
                        React.createElement(ej2_react_maps_1.AnnotationsDirective, null,
                            React.createElement(ej2_react_maps_1.AnnotationDirective, { content: '<div style="height:18px;width:170px;background:white;text-align:center"><a href="https://www.openstreetmap.org/copyright"  target = "_blank" > © OpenStreetMap contributors </a></div >', verticalAlignment: 'Far', zIndex: '1', x: '-40', y: '-20', horizontalAlignment: 'Far' })),
                        React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Bubble, ej2_react_maps_1.MapsTooltip, ej2_react_maps_1.Zoom] }),
                        React.createElement(ej2_react_maps_1.LayersDirective, null,
                            React.createElement(ej2_react_maps_1.LayerDirective, { layerType: 'OSM' }),
                            React.createElement(ej2_react_maps_1.LayerDirective, { type: 'SubLayer', animationDuration: 0, shapeData: new ej2_maps_1.MapAjax('./src/maps/map-data/africa.json'), shapeSettings: { fill: '#5100a3', opacity: 0.4 } }))))),
            React.createElement("div", { style: { float: 'right' } },
                React.createElement("a", { href: "https://www.openstreetmap.org/copyright", target: "_blank" }, "\u00A9 OpenStreetMap contributors")),
            React.createElement("br", null),
            React.createElement("div", { style: { float: 'right', marginright: '10px' } },
                "Source:",
                React.createElement("a", { href: "https://www.whatarethe7continents.com/biggest-largest-smallest-continents/", target: "_blank" }, "Seven Continents")),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the Africa continent location in the World map. Africa continent is rendered in sublayer, on the OpenStreetMap.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render geometric layers as sublayer on the OpenStreetMap. Rendered the outline of Africa continent using GeoJSON data on the top of the OSM map."),
                React.createElement("br", null),
                React.createElement("p", { style: { fontweight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "Maps component features are segregated into individual feature-wise modules. To use zooming feature, inject the Zoom module using the ",
                    React.createElement("code", null, "Maps.Inject(Zoom)"),
                    " method."))));
    };
    // custom code start
    OSMSubLayer.prototype.load = function (args) {
        var theme = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.maps.theme = (theme.charAt(0).toUpperCase() + theme.slice(1));
    };
    ;
    return OSMSubLayer;
}(sample_base_1.SampleBase));
exports.OSMSubLayer = OSMSubLayer;
