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
var data1 = require("./map-data/curved-datasource.json");
var data2 = require("./map-data/navigation-datasource.json");
var datasource1 = data1;
var datasource2 = data2;
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var markerTemplate = '<div id="marker1" style="font-size:12px;color:black;font-weight:500">{{:name}}' + '</div>';
var CurvedMaps = (function (_super) {
    __extends(CurvedMaps, _super);
    function CurvedMaps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CurvedMaps.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-12' },
                    React.createElement(ej2_react_maps_1.MapsComponent, { id: "maps", loaded: this.onMapsLoad.bind(this), load: this.load, ref: function (m) { return _this.mapInstance = m; }, centerPosition: {
                            latitude: 30.41078179084589,
                            longitude: 90.52734374999999
                        }, zoomSettings: {
                            enable: false,
                            zoomFactor: 3.5
                        }, mapsArea: {
                            background: '#AEE2FA'
                        }, titleSettings: {
                            text: 'Flights from India to China',
                            textStyle: {
                                size: '16px'
                            }
                        } },
                        React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Marker, ej2_react_maps_1.MapsTooltip, ej2_react_maps_1.NavigationLine, ej2_react_maps_1.Zoom] }),
                        React.createElement(ej2_react_maps_1.LayersDirective, null,
                            React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: new ej2_maps_1.MapAjax('./src/maps/map-data/world-map.json'), shapeDataPath: 'name', shapePropertyPath: 'name', dataSource: [
                                    {
                                        name: 'India'
                                    },
                                    {
                                        name: 'China'
                                    }
                                ], shapeSettings: {
                                    colorValuePath: 'name',
                                    fill: '#fcfbf9',
                                    border: {
                                        width: 0.1,
                                        color: 'black'
                                    },
                                    colorMapping: [
                                        {
                                            value: 'China',
                                            color: '#f7d083'
                                        },
                                        {
                                            value: 'India',
                                            color: '#FFFE99'
                                        }
                                    ]
                                }, navigationLineSettings: datasource2.navigation },
                                React.createElement(ej2_react_maps_1.MarkersDirective, null,
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, shape: 'Circle', fill: 'white', width: 4, animationDuration: 0, border: { color: 'black', width: 1 }, dataSource: datasource1.location }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, dataSource: [
                                            { 'name': 'New Delhi',
                                                'latitude': 28.6139391,
                                                'longitude': 77.2090212
                                            }
                                        ], offset: {
                                            x: -50,
                                            y: 10
                                        }, template: markerTemplate, animationDuration: 0 }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, dataSource: [
                                            {
                                                'name': 'Mumbai',
                                                'latitude': 19.0759837,
                                                'longitude': 72.8776559
                                            }
                                        ], offset: {
                                            x: 0,
                                            y: 12
                                        }, template: markerTemplate, animationDuration: 0 }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, dataSource: [
                                            {
                                                'name': 'Chennai',
                                                'latitude': 13.0826802,
                                                'longitude': 80.2707184
                                            }
                                        ], offset: {
                                            x: 0,
                                            y: 12
                                        }, template: markerTemplate, animationDuration: 0 }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, dataSource: [
                                            {
                                                'name': 'Kolkata',
                                                'latitude': 22.572646,
                                                'longitude': 88.363895
                                            }
                                        ], offset: {
                                            x: 0,
                                            y: 12
                                        }, template: markerTemplate, animationDuration: 0 }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, dataSource: [
                                            {
                                                'name': 'Kunming',
                                                'latitude': 24.880095,
                                                'longitude': 102.832891
                                            }
                                        ], offset: {
                                            x: 0,
                                            y: 12
                                        }, template: markerTemplate, animationDuration: 0 }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, dataSource: [
                                            {
                                                'name': 'Beijing',
                                                'latitude': 39.9041999,
                                                'longitude': 116.4073963
                                            }
                                        ], offset: {
                                            x: 0,
                                            y: 12
                                        }, template: markerTemplate, animationDuration: 0 }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, dataSource: [
                                            {
                                                'name': 'Shanghai',
                                                'latitude': 31.2303904,
                                                'longitude': 121.4737021
                                            }
                                        ], offset: {
                                            x: 0,
                                            y: 12
                                        }, template: markerTemplate, animationDuration: 0 }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, dataSource: [
                                            {
                                                'name': 'Hong Kong',
                                                'latitude': 22.396428,
                                                'longitude': 114.109497
                                            }
                                        ], offset: {
                                            x: 20,
                                            y: 20
                                        }, template: markerTemplate, animationDuration: 0 }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, dataSource: [
                                            {
                                                'name': 'Guangzhou',
                                                'latitude': 23.12911,
                                                'longitude': 113.264385
                                            }
                                        ], offset: {
                                            x: 35,
                                            y: -10
                                        }, template: markerTemplate, animationDuration: 0 })))))),
                React.createElement("div", { style: { float: 'right', marginright: '10px' } },
                    "Source:",
                    React.createElement("a", { href: "https://www.tibettravel.org/nepal-map/nepal-india-map.html", target: "_blank" }, "www.tibettravel.org"))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the flight routes from India to China.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render the curved lines between two points in a map. You can use the dashArray, width, and color properties to customize the appearance of the navigation lines.."),
                React.createElement("p", null, "Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a marker or tap a maker in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", { style: { fontweight: 500 } }, "Injecting Module"),
                React.createElement("p", null, "Maps component features are segregated into individual feature-wise modules. To use the navigation lines, inject the NavigationLines module using the Maps.Inject(NavigationLines)method."))));
    };
    CurvedMaps.prototype.onMapsLoad = function (args) {
        var maps = document.getElementById('maps');
        maps.setAttribute('title', '');
    };
    ;
    // custom code start
    CurvedMaps.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    ;
    return CurvedMaps;
}(sample_base_1.SampleBase));
exports.CurvedMaps = CurvedMaps;
