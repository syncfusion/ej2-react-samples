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
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var markers1 = [
    {
        longitude: -96.9412994, latitude: 36.0446575, name: 'Mehan'
    },
    {
        longitude: -99.0925598, latitude: 35.0299964, name: 'Hobart'
    },
    {
        longitude: -98.4924316, latitude: 33.9137338, name: 'Wichita Falls'
    },
    {
        longitude: -98.9675903, latitude: 35.5154609, name: 'Clinton'
    },
    {
        longitude: -98.923645, latitude: 36.1478557, name: 'Seiling'
    },
    {
        longitude: -99.2985535, latitude: 36.1500735, name: 'Vici'
    },
    {
        longitude: -95.3173828, latitude: 36.3084855, name: 'Pryor'
    },
    {
        longitude: -96.7524719, latitude: 34.9596836, name: 'Konawa'
    },
    {
        longitude: -101.9450281, latitude: 35.2018863, name: 'Amarillo'
    },
    {
        longitude: -98.0971969, latitude: 35.5514624, name: 'El Reno'
    },
    {
        longitude: -97.8432238, latitude: 35.5150073, name: 'Yukon'
    },
    {
        longitude: -97.2557752, latitude: 35.4933852, name: 'Harrah'
    },
    {
        longitude: -97.1019391, latitude: 35.3620257, name: 'Shawnee'
    },
    {
        longitude: -97.072877, latitude: 35.6853011, name: 'Wellston'
    },
    {
        longitude: -96.2093353, latitude: 36.133417, name: 'Lotsee'
    },
    {
        longitude: -96.3077788, latitude: 36.1879088, name: 'Sand Springs'
    },
    {
        longitude: -98.7075369, latitude: 35.931371, name: 'Oakwood'
    },
    {
        longitude: -98.0003367, latitude: 35.0403272, name: 'Chickasha'
    },
    {
        longitude: -97.1836494, latitude: 36.4595554, name: 'Red Rock'
    },
    {
        longitude: -96.7148021, latitude: 35.4859752, name: 'Prague'
    },
    {
        longitude: -97.9339651, latitude: 36.1022835, name: 'Hennessey'
    },
    {
        longitude: -96.2595621, latitude: 35.2453183, name: 'Wetumka'
    },
    {
        longitude: -97.4499583, latitude: 35.0304344, name: 'Purcell'
    },
    {
        longitude: -96.1059044, latitude: 35.605942, name: 'Okmulgee'
    },
    {
        longitude: -97.9684792, latitude: 35.8439429, name: 'Kingfisher'
    },
    {
        longitude: -95.7691956, latitude: 34.9332303, name: 'McAlester'
    },
    {
        longitude: -96.1289978, latitude: 34.3853794, name: 'Atoka'
    },
    {
        longitude: -97.1191406, latitude: 34.5042932, name: 'Davis'
    },
    {
        longitude: -98.0310059, latitude: 37.1537496, name: 'Anthony'
    },
    {
        longitude: -98.3564758, latitude: 36.7542898, name: 'Cherokee'
    },
    {
        longitude: -95.3695679, latitude: 35.7476268, name: 'Muskogee'
    },
    {
        longitude: -95.582428, latitude: 35.2871057, name: 'Eufaula'
    },
    {
        longitude: -96.9412994, latitude: 36.0446575, name: 'Mehan'
    }
];
var marker2 = [
    { latitude: 35.6379762, longitude: -97.4823761 },
    { latitude: 35.5676663, longitude: -97.5128031 },
    { latitude: 35.5412361, longitude: -97.601552 },
    { latitude: 35.5451471, longitude: -97.5661039 },
    { latitude: 35.5120376, longitude: -97.5918531 },
    { latitude: 35.5112516, longitude: -97.5843 },
    { latitude: 35.4737072, longitude: -97.5158072 },
    { latitude: 35.4575239, longitude: -97.6179457 },
    { latitude: 35.4362676, longitude: -97.5998354 },
    { latitude: 35.3954872, longitude: -97.5962305 },
    { latitude: 35.3492258, longitude: -97.5294113 },
    { latitude: 35.5260794, longitude: -98.7032318 },
    { latitude: 34.7827916, longitude: -98.3001709 },
    { latitude: 34.0793936, longkitude: -98.5583496 },
    { latitude: 36.1434199, longitude: -97.0690155 },
    { latitude: 36.0170318, longitude: -96.11063 },
    { latitude: 36.1608845, longitude: -96.0205078 },
    { latitude: 36.1323292, longitude: -95.9624863 },
    { latitude: 36.1317746, longitude: -95.9046364 },
    { latitude: 36.1604341, longitude: -95.8885002 },
];
var HighlightMaps = /** @class */ (function (_super) {
    __extends(HighlightMaps, _super);
    function HighlightMaps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HighlightMaps.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-panel' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { style: { width: 350, margin: 'auto', paddingBottom: 20 } },
                    React.createElement("img", { src: "src/maps/images/atm.png", alt: "ATM indication", style: { width: 25, height: 25, float: 'left' } }),
                    React.createElement("div", { id: "sampletitle", style: { fontWeight: 400, paddingLeft: 30, fontSize: 18 } }, "ATM locations in Oklahoma, USA")),
                React.createElement("div", { className: 'col-md-12' },
                    React.createElement(ej2_react_maps_1.MapsComponent, { id: "maps", loaded: this.onMapsLoad.bind(this), load: this.load, ref: function (m) { return _this.mapInstance = m; }, zoomSettings: {
                            enable: false,
                            zoomFactor: 2
                        }, centerPosition: {
                            latitude: 35.65,
                            longitude: -97.3
                        } },
                        React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Zoom, ej2_react_maps_1.Marker, ej2_react_maps_1.MapsTooltip] }),
                        React.createElement(ej2_react_maps_1.LayersDirective, null,
                            React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: new ej2_maps_1.MapAjax('./src/maps/map-data/okalahoma.json'), shapeSettings: {
                                    fill: '#F5F5F5',
                                    border: { color: '#EEDA97', width: 1 }
                                } },
                                React.createElement(ej2_react_maps_1.MarkersDirective, null,
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, width: 20, height: 20, shape: 'Image', imageUrl: 'src/maps/images/ballon.png', fill: '#000080', border: { color: 'transparent' }, dataSource: marker2, tooltipSettings: {
                                            visible: true,
                                            valuePath: 'title'
                                        } }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, shape: 'Circle', width: 130, height: 130, fill: 'rgba(70,130,180,0.3)', dataSource: [{ latitude: 35.5112516, longitude: -97.5843, text: '10/18 ATMs' },], tooltipSettings: { visible: true, valuePath: 'text' }, border: { color: 'transparent' } }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, shape: 'Circle', width: 100, height: 100, fill: 'rgba(70,130,180,0.3)', dataSource: [{ latitude: 36.0808845, longitude: -96.0205078, text: '5/18 ATMs' }], tooltipSettings: { visible: true, valuePath: 'text' }, border: { color: 'transparent' } }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, template: '<div style="color: black;">{{:name}}</div>', dataSource: markers1 }))))))),
            React.createElement("div", { style: { float: 'right', marginright: '10px' } },
                "Source:",
                React.createElement("a", { href: "https://www.google.co.in/maps/search/atm+in+oklahoma/@35.3864432,-98.2888719,8z/data=!3m1!4b1", target: "_blank" }, "www.google.co.in/maps")),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample depicts the ATM populated areas in Oklahoma by highlighting the regions.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to highlight some specific region by rendering circles. Any custom HTML element can be used as a marker."),
                React.createElement("br", null),
                React.createElement("p", { style: { fontweight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "Maps component features are segregated into individual feature-wise modules. To use marker template, you need to inject ",
                    React.createElement("code", null, "Marker"),
                    " module using ",
                    React.createElement("code", null, "Maps.Inject(Marker)"),
                    " method."))));
    };
    HighlightMaps.prototype.onMapsLoad = function (args) {
        var maps = document.getElementById('maps');
        maps.setAttribute('title', '');
    };
    ;
    // custom code start
    HighlightMaps.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    ;
    return HighlightMaps;
}(sample_base_1.SampleBase));
exports.HighlightMaps = HighlightMaps;
