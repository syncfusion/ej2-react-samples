"use strict";
/**
 * Export sample
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
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var SAMPLE_CSS = "\n.control-fluid {\n    padding: 0px !important;\n}\n#btn-control {\n    width: 100%;\n    text-align: center;\n    text-transform:none !important;\n}\n.e-play-icon::before {\n    content: \"\\e728\";\n}";
var ExportMaps = /** @class */ (function (_super) {
    __extends(ExportMaps, _super);
    function ExportMaps() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = [
            { value: 'JPEG' },
            { value: 'PNG' },
            { value: 'SVG' },
            { value: 'PDF' }
        ];
        return _this;
    }
    ExportMaps.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-8' },
                    React.createElement(ej2_react_maps_1.MapsComponent, { id: "maps", loaded: this.onMapsLoad.bind(this), load: this.load, ref: function (m) { return _this.mapInstance = m; }, titleSettings: {
                            text: 'Location of the Wonders in the World',
                            textStyle: {
                                size: '16px'
                            },
                        } },
                        React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Marker, ej2_react_maps_1.MapsTooltip] }),
                        React.createElement(ej2_react_maps_1.LayersDirective, null,
                            React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: new ej2_maps_1.MapAjax('./src/maps/map-data/world-map.json'), shapeSettings: {
                                    fill: 'lightgrey',
                                    border: { color: 'black', width: 0.1 }
                                } },
                                React.createElement(ej2_react_maps_1.MarkersDirective, null,
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, animationDuration: 0, shape: "Balloon", fill: '#E13E40', width: 15, height: 20, dataSource: [
                                            { 'longitude': 116.5703749, 'latitude': 40.4319077, 'name': 'The Great Wall of China, China ' },
                                            { 'longitude': 35.4443622, 'latitude': 30.3284544, 'name': 'Petra, Jorden' },
                                            { 'longitude': 78.0421552, 'latitude': 27.1750151, 'name': 'Taj Mahal, Agra, India' },
                                            { 'longitude': 12.4922309, 'latitude': 41.8902102, 'name': 'The Roman Colosseum, Rome, Italy' },
                                            { 'longitude': -88.5677826, 'latitude': 20.6842849, 'name': 'The Chichen Itza, Mexico' },
                                            { 'longitude': -72.5449629, 'latitude': -13.1631412, 'name': 'Machu Picchu, Peru' },
                                            { 'longitude': -43.2104872, 'latitude': -22.951916, 'name': 'Christ Redeemer, Rio de janeiro, Brazil' },
                                        ], tooltipSettings: {
                                            visible: true,
                                            valuePath: 'name'
                                        } }))))),
                    React.createElement("div", { style: { float: 'right', marginright: '10px' } },
                        "Source:",
                        React.createElement("a", { href: "http://www.emapsworld.com/world-seven-wonder-map.html", target: "_blank" }, "en.wikipedia.org"))),
                React.createElement("div", { className: 'col-md-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '90%' } },
                            React.createElement("tr", { style: { height: "50px" } },
                                React.createElement("td", { style: { width: "20%" } }, "Export Type:"),
                                React.createElement("td", { style: { width: "30%" } },
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: 80, id: "etype", value: "JPEG", ref: function (d) { return _this.mode = d; }, dataSource: this.type, fields: { text: 'value', value: 'value' }, placeholder: "JPEG" }))),
                            React.createElement("tr", { style: { height: "50px" } },
                                React.createElement("td", { style: { width: "30%" } }, "FileName :"),
                                React.createElement("td", { style: { width: "40%" } },
                                    React.createElement("div", { className: "e-float-input", style: { width: 90, 'margin-top': '0px' } },
                                        React.createElement("input", { type: "text", defaultValue: "Maps", id: "fileName", style: { "margin-left": "-10px" } })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", { id: "btn-control", style: { 'margin-left': '60px' } },
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: this.onClick.bind(this), style: { width: '80px' }, cssClass: 'e-info', isPrimary: true }, "Export")))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates the exporting feature in Maps. By clicking\u00A0the Export button, you can export the map in PNG, JPEG, SVG or in PDF formats.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render and configure the export. The rendered map can be exported as either JPEG, PNG, SVG and PDF formats. It can be achieved using Blob and it is supported only in modern browsers. Also this sample visualizes the locations of the wonders in the world using markers."),
                React.createElement("p", null, "Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a marker or tap a marker in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "Maps component features are segregated into individual feature-wise modules. To use a marker, inject the ",
                    React.createElement("code", null, "Marker"),
                    " module using the ",
                    React.createElement("code", null, "Maps.Inject(Marker)"),
                    " method."))));
    };
    ExportMaps.prototype.onMapsLoad = function (args) {
        var maps = document.getElementById('maps');
        maps.setAttribute('title', '');
    };
    ;
    // custom code start
    ExportMaps.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    ;
    // custom code end
    ExportMaps.prototype.onClick = function (e) {
        var fileName = document.getElementById('fileName').value;
        this.mapInstance.export(this.mode.value, fileName);
    };
    return ExportMaps;
}(sample_base_1.SampleBase));
exports.ExportMaps = ExportMaps;
