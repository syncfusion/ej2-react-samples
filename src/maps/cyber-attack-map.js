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
//tslint:disable
var React = require("react");
var ej2_maps_1 = require("@syncfusion/ej2-maps");
var ej2_react_maps_1 = require("@syncfusion/ej2-react-maps");
var sample_base_1 = require("../common/sample-base");
var data = require("./map-data/default-datasource.json");
var datasource = data;
var SAMPLE_CSS = "\n.name {\n    margin-top: -6px;\n    margin-left: -6px;\n    font-size: 12px;\n    color: black;\n    text-shadow: 0px 1px 1px lightgray;\n    font-weight: 500\n}\n\n@keyframes dash {\n    from {\n        stroke-dashoffset: 1000;\n        stroke-width: 1px;\n        stroke: #D2691E;\n    }\n\n    to {\n        stroke-dashoffset: 0;\n        stroke-width: 1px;\n    }\n\n    40% {\n        opacity: 0.7;\n    }\n\n    50%,\n    100% {\n        opacity: 0;\n    }\n}\n\n.pulse-css {\n    width: 12px;\n    height: 12px;\n    -webkit-border-radius: 10px;\n    -moz-border-radius: 10px;\n    border-radius: 10px;\n    background: #D2691E;\n    position: relative;\n    animation-delay: 5s;\n}\n\n.pulse-css:before,\n.pulse-css:after {\n    content: '';\n    width: 9px;\n    height: 9px;\n    -webkit-border-radius: 10px;\n    -moz-border-radius: 10px;\n    border-radius: 10px;\n    background-color: #D2691E;\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    margin: auto;\n    transform: scale(0.5);\n    animation: pulse-css1 2s linear infinite;\n}\n\n.parent_css {\n    width: 13px;\n    height: 13px;\n    background: #D2691E;\n    position: relative;\n    animation-delay: 5s;\n}\n\n.parent_css:before,\n.parent_css:after {\n    content: '';\n    width: 9px;\n    height: 9px;\n    background-color: #D2691E;\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    margin: auto;\n    transform: scale(0.5);\n    animation: pulse-css1 3s linear infinite;\n}\n\n@keyframes pulse-css1 {\n    0% {\n        transform: scale(0.5);\n        opacity: 0;\n    }\n\n    50% {\n        opacity: 0.2;\n    }\n\n    90%,\n    100% {\n        transform: scale(5);\n        opacity: 0;\n    }\n}";
var CyberAttackMaps = /** @class */ (function (_super) {
    __extends(CyberAttackMaps, _super);
    function CyberAttackMaps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CyberAttackMaps.prototype.render = function () {
        return (React.createElement("div", { className: 'control-panel' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_maps_1.MapsComponent, { id: "container", loaded: this.loaded.bind(this), load: this.load, zoomSettings: {
                        enable: false
                    }, titleSettings: {
                        text: 'Cyber Attack Map of United States',
                        textStyle: { size: '16px' }
                    } },
                    React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Marker, ej2_react_maps_1.MapsTooltip, ej2_react_maps_1.NavigationLine] }),
                    React.createElement(ej2_react_maps_1.LayersDirective, null,
                        React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: new ej2_maps_1.MapAjax('./src/maps/map-data/world-map.json'), shapeSettings: {
                                border: { color: '#D2691E', width: 0.5 },
                                fill: '#FFFFE0'
                            }, navigationLineSettings: [
                                {
                                    dashArray: '5,1', visible: true,
                                    angle: -0.3, color: '#ffffb3',
                                    latitude: [15.758401, 39.864171],
                                    longitude: [101.155642, -100.854833]
                                },
                                {
                                    dashArray: '5,1', visible: true,
                                    angle: 0.4, color: '#ffffb3',
                                    latitude: [57.725612, 39.864171],
                                    longitude: [-101.802160, -100.854833]
                                },
                                {
                                    dashArray: '5,1', visible: true,
                                    angle: -0.2, color: '#ffffb3',
                                    latitude: [29.930938, 39.864171],
                                    longitude: [69.358894, -100.854833]
                                },
                                {
                                    dashArray: '5,1', visible: true,
                                    angle: -0.1, color: '#ffffb3',
                                    latitude: [22.860388, 39.864171],
                                    longitude: [79.739066, -100.854833]
                                },
                                {
                                    dashArray: '5,1', visible: true,
                                    angle: -0.1, color: '#ffffb3',
                                    latitude: [-24.763753, 39.864171],
                                    longitude: [134.852191, -100.854833]
                                },
                                {
                                    dashArray: '5,1', visible: true,
                                    angle: -0.4, color: '#ffffb3',
                                    latitude: [34.611098, 39.864171],
                                    longitude: [104.189872, -100.854833]
                                },
                                {
                                    dashArray: '5,1', visible: true,
                                    angle: -0.8, color: '#ffffb3',
                                    latitude: [-12.354844, 39.864171],
                                    longitude: [-49.017709, -100.854833],
                                },
                                {
                                    dashArray: '5,1', visible: true,
                                    angle: -0.4, color: '#ffffb3',
                                    latitude: [3.450682, 39.864171],
                                    longitude: [-72.943141, -100.854833]
                                },
                                {
                                    dashArray: '5,1', visible: true,
                                    angle: -0.7, color: '#ffffb3',
                                    latitude: [62.448268, 39.864171],
                                    longitude: [97.251835, -100.854833]
                                },
                                {
                                    dashArray: '5,1', visible: true,
                                    angle: -0.3, color: '#ffffb3',
                                    latitude: [65.931163, 39.864171],
                                    longitude: [-45.812820, -100.854833]
                                },
                                {
                                    dashArray: '5,1', visible: true,
                                    angle: -0.2, color: '#ffffb3',
                                    latitude: [-21.206222, 39.864171],
                                    longitude: [17.122018, -100.854833],
                                },
                                {
                                    dashArray: '5,1', visible: true,
                                    angle: -0.2, color: '#ffffb3',
                                    latitude: [35.839969, 39.864171],
                                    longitude: [137.904641, -100.854833]
                                },
                                {
                                    dashArray: '5,1', visible: true,
                                    angle: -0.2, color: '#ffffb3',
                                    latitude: [46.582184, 39.864171],
                                    longitude: [2.232903, -100.854833]
                                },
                                {
                                    dashArray: '5,1', visible: true,
                                    angle: -0.2, color: '#ffffb3',
                                    latitude: [0.390617, 39.864171],
                                    longitude: [37.893734, -100.854833]
                                }
                            ] },
                            React.createElement(ej2_react_maps_1.MarkersDirective, null,
                                React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, template: '<div id="marker_template"><div class="pulse-css"><br /><div class="name">{{:name}}</div></div></div>', animationDuration: 0, height: 15, width: 15, dataSource: [
                                        { latitude: 15.758401, longitude: 101.155642, name: 'Thailand' },
                                        { latitude: 57.725612, longitude: -101.802160, name: 'Canada' },
                                        { latitude: 39.634177, longitude: 42.410740, name: 'Turkey' },
                                        { latitude: 22.860388, longitude: 79.739066, name: 'India' },
                                        { latitude: -24.763753, longitude: 134.852191, name: 'Australia' },
                                        { latitude: 34.611098, longitude: 104.189872, name: 'China' },
                                        { latitude: -12.354844, longitude: -49.017709, name: 'Brazil' },
                                        { latitude: 3.450682, longitude: -72.943141, name: 'Colombia' },
                                        { latitude: 62.448268, longitude: 97.251835, name: 'Russia' },
                                        { latitude: 65.931163, longitude: -45.812820, name: 'Greenland' },
                                        { latitude: -21.206222, longitude: 17.122018, name: 'Namibia' },
                                        { latitude: 35.839969, longitude: 137.904641, name: 'Japan' },
                                        { latitude: 46.582184, longitude: 2.232903, name: 'France' },
                                        { latitude: 0.390617, longitude: 37.893734, name: 'Kenya' }
                                    ] }),
                                React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, template: '<div id="parent_template"><div class="parent_css"><br/><div class="name" style="margin-left: -10px;margin-top: -2px">United States</div></div></div>', height: 20, width: 20, animationDuration: 0, dataSource: [
                                        {
                                            latitude: 39.864171,
                                            longitude: -100.854833
                                        }
                                    ] })))))),
            React.createElement("div", { style: { float: 'right', marginright: '10px' } },
                "Source:",
                React.createElement("a", { href: "https://craft.co/youtube/locations", target: "_blank" }, "craft.co/youtube/locations")),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample depicts a cyber attack map, which displays the cyber attacks and threats from various countries to USA, using navigation lines and marker.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to dynamically display a navigation line with linear animation. Marker templates are added to denote the source and destination locations. Any custom HTML element can be used as a marker."),
                React.createElement("br", null),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "The maps component features are segregated into individual modules by feature. To use marker template, inject the ",
                    React.createElement("code", null, "Marker"),
                    " module using the ",
                    React.createElement("code", null, "Maps.Inject(Marker)"),
                    " method, and use the navigation lines by injecting the ",
                    React.createElement("code", null, "NavigationLine"),
                    " module."))));
    };
    // custom code start
    CyberAttackMaps.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    ;
    CyberAttackMaps.prototype.loaded = function (args) {
        var lines = args.maps.layers[0].navigationLineSettings;
        var _loop_1 = function (i) {
            var line = document.getElementById('container_LayerIndex_0_NavigationIndex_' + i + '_Line0');
            var marker = document.getElementById('container_LayerIndex_0_MarkerIndex_0_dataIndex_' + i);
            if (line) {
                line.style.strokeDasharray = '1000';
                line.style.strokeDashoffset = '1000';
                if (i < 4) {
                    line.style.animation = marker.style.animation = 'dash 5s linear 0s infinite';
                    marker.style.visibility = 'hidden';
                    setTimeout(function () {
                        marker.style.visibility = 'visible';
                    }, 0);
                }
                else if (i < 8) {
                    line.style.animation = marker.style.animation = 'dash 6s linear 2s infinite';
                    marker.style.visibility = 'hidden';
                    setTimeout(function () {
                        marker.style.visibility = 'visible';
                    }, 2000);
                }
                else if (i < 12) {
                    line.style.animation = marker.style.animation = 'dash 6s linear 4.5s infinite';
                    marker.style.visibility = 'hidden';
                    setTimeout(function () {
                        marker.style.visibility = 'visible';
                    }, 4500);
                }
                else {
                    line.style.animation = marker.style.animation = 'dash 5s linear 7s infinite';
                    marker.style.visibility = 'hidden';
                    setTimeout(function () {
                        marker.style.visibility = 'visible';
                    }, 7000);
                }
            }
        };
        for (var i = 0; i < lines.length; i++) {
            _loop_1(i);
        }
    };
    return CyberAttackMaps;
}(sample_base_1.SampleBase));
exports.CyberAttackMaps = CyberAttackMaps;
