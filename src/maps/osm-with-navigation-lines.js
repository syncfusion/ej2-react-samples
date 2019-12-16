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
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_maps_1 = require("@syncfusion/ej2-react-maps");
var sample_base_1 = require("../common/sample-base");
ej2_base_1.enableRipple(true);
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var OSMNavigation = /** @class */ (function (_super) {
    __extends(OSMNavigation, _super);
    function OSMNavigation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OSMNavigation.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-12' },
                    React.createElement(ej2_react_maps_1.MapsComponent, { id: "maps", load: this.load, ref: function (m) { return _this.mapInstance = m; }, titleSettings: {
                            text: 'Flight route from Los Angeles to Mexico city',
                            textStyle: {
                                size: '16px'
                            }
                        }, centerPosition: {
                            latitude: 27.0902,
                            longitude: -105.7129
                        }, zoomSettings: {
                            zoomFactor: 5,
                            enable: false
                        } },
                        React.createElement(ej2_react_maps_1.AnnotationsDirective, null,
                            React.createElement(ej2_react_maps_1.AnnotationDirective, { content: '<div style="height:18px;width:170px;background:white;text-align:center"><a href="https://www.openstreetmap.org/copyright"  target = "_blank" > © OpenStreetMap contributors </a></div >', verticalAlignment: 'Far', zIndex: '1', x: '-40', y: '-20', horizontalAlignment: 'Far' })),
                        React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Bubble, ej2_react_maps_1.MapsTooltip, ej2_react_maps_1.Zoom, ej2_react_maps_1.Marker, ej2_react_maps_1.NavigationLine] }),
                        React.createElement(ej2_react_maps_1.LayersDirective, null,
                            React.createElement(ej2_react_maps_1.LayerDirective, { layerType: 'OSM' },
                                React.createElement(ej2_react_maps_1.MarkersDirective, null,
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, template: '<div><img src="src/maps/images/group.svg" style="height:15px;width:15px;"></img></div>', dataSource: [{
                                                name: 'Mexico City',
                                                latitude: 23.6445,
                                                longitude: -102.832
                                            }], tooltipSettings: {
                                            visible: true,
                                            valuePath: 'name'
                                        } }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, template: '<div><img src="src/maps/images/ballon.png" style="height:30px;width:20px;"></img></div>', dataSource: [{
                                                name: 'Mexico City',
                                                latitude: 24.2005,
                                                longitude: -102.832
                                            }], tooltipSettings: {
                                            visible: true,
                                            valuePath: 'name'
                                        } }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, template: '<div style= "font-weight:500; font-size: 13px; text-align: left">Mexico</div>', dataSource: [{
                                                name: 'Mexico City',
                                                latitude: 24.0005,
                                                longitude: -101.200
                                            }] }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, template: '<div><img src="src/maps/images/oval.svg" style="height:15px;width:15px;"></img></div>', dataSource: [{
                                                name: 'Los Angeles',
                                                latitude: 34.0522,
                                                longitude: -118.2437
                                            }], tooltipSettings: {
                                            visible: true,
                                            valuePath: 'name'
                                        } }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, template: '<div><div style="text-align: right; font-weight:500; font-size: 13px;">Los Angeles</br>International Airport</div></div>', dataSource: [{
                                                name: 'Los Angeles City',
                                                latitude: 34.7000,
                                                longitude: -121.5000
                                            }] }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, template: '<div><img src="src/maps/images/map-tooltip.svg" style="height:50px;width:100px;"></img></div>', dataSource: [{
                                                latitude: 28.5,
                                                longitude: -110.400
                                            }] })),
                                React.createElement(ej2_react_maps_1.NavigationLinesDirective, null,
                                    React.createElement(ej2_react_maps_1.NavigationLineDirective, { width: 8, visible: true, angle: -0.05, color: '#00ace6', latitude: [23.6445, 34.0522], longitude: [-102.832, -118.2437] }))))))),
            React.createElement("div", { style: { float: 'right' } },
                React.createElement("a", { href: "https://www.openstreetmap.org/copyright", target: "_blank" }, "\u00A9 OpenStreetMap contributors")),
            React.createElement("br", null),
            React.createElement("div", { style: { float: 'right', marginright: '10px' } },
                "Source:",
                React.createElement("a", { href: "https://www.google.co.in/maps/dir/Los+Angeles,+CA,+USA/Mexico+City,+Mexico/@26.3645122,-117.6940069,5z/data=!4m14!4m13!1m5!1m1!1s0x80c2c75ddc27da13:0xe22fdf6f254608f4!2m2!1d-118.2436849!2d34.0522342!1m5!1m1!1s0x85ce0036b1352927:0xdefd9e4ee8d18a5b!2m2!1d-99.1013498!2d19.2464696!3e4?hl=en", target: "_blank" }, "www.google.co.in/maps")),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates the flight route from Los Angeles to Mexico City using Navigation lines feature in the OpenStreetMap.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render the navigation lines on the OpenStreetMap. Also denoted the source and destination locations using marker template."),
                React.createElement("br", null),
                React.createElement("p", { style: { fontweight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "Maps component features are segregated into individual feature-wise modules. To use a marker, inject the Marker module using the ",
                    React.createElement("code", null, "Maps.Inject(Marker)"),
                    " method."))));
    };
    // custom code start
    OSMNavigation.prototype.load = function (args) {
        var theme = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.maps.theme = (theme.charAt(0).toUpperCase() + theme.slice(1));
    };
    ;
    return OSMNavigation;
}(sample_base_1.SampleBase));
exports.OSMNavigation = OSMNavigation;
