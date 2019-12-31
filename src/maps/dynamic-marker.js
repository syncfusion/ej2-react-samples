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
 * Marker cluster map sample
 */
var React = require("react");
var ej2_maps_1 = require("@syncfusion/ej2-maps");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_maps_1 = require("@syncfusion/ej2-react-maps");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    .property-text {\n        font-family: \"Roboto\", \"Segoe UI\", \"GeezaPro\", \"DejaVu Serif\", \"sans-serif\";\n        font-size: 13px;\n        font-weight: 400;\n    }\n    .e-input[disabled] {\n        border-bottom-color: inherit;\n        background-image: none;\n    }";
var DynamicMarker = (function (_super) {
    __extends(DynamicMarker, _super);
    function DynamicMarker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.markerCheck = true;
        _this.navigationLines = [];
        _this.latitude = [];
        _this.longitude = [];
        _this.droplist = [
            { value: 'Image' },
            { value: 'Circle' },
            { value: 'Diamond' },
            { value: 'Star' },
            { value: 'Triangle' }
        ];
        _this.emptySavedLinePositions = function () {
            _this.latitude = [];
            _this.longitude = [];
        };
        _this.addMarker = function (args) {
            if (args['latitude'] !== null && args['longitude'] !== null) {
                var layerIndex = (args.target.indexOf('_LayerIndex_') !== -1) ?
                    parseFloat(args.target.split('_LayerIndex_')[1].split('_')[0]) : 0;
                var marker = void 0;
                var dynamicMarker = _this.mapInstance.layersCollection[layerIndex].markerSettings;
                dynamicMarker.push(new ej2_react_maps_1.MarkerSettings(_this.mapInstance, 'markerSettings', marker));
                var markerIndex = dynamicMarker.length - 1;
                dynamicMarker[markerIndex].visible = true;
                dynamicMarker[markerIndex].dataSource = [
                    { latitude: args['latitude'], longitude: args['longitude'], name: 'dynamicmarker' }
                ];
                dynamicMarker[markerIndex].animationDuration = 0;
                dynamicMarker[markerIndex].fill = '#DB4537';
                dynamicMarker[markerIndex].shape = (_this.dropElement.value !== 'Image') ? _this.dropElement.value : 'Image';
                dynamicMarker[markerIndex].height = (_this.dropElement.value !== 'Image') ? 12 : 20;
                dynamicMarker[markerIndex].width = (_this.dropElement.value !== 'Image') ? 12 : 20;
                dynamicMarker[markerIndex].imageUrl = (_this.dropElement.value !== 'Image') ? '' : 'src/maps/images/ballon.png';
            }
        };
        _this.addLine = function (lineArgs, lineWidth, connectiveLine) {
            if (lineArgs.latitude != null && lineArgs.longitude != null) {
                _this.latitude.push(lineArgs.latitude);
                _this.longitude.push(lineArgs.longitude);
            }
            if (_this.latitude.length >= 2) {
                _this.navigationLines.push({
                    'visible': true,
                    'latitude': [_this.latitude[(_this.latitude.length - 2)], _this.latitude[(_this.latitude.length - 1)]],
                    'longitude': [_this.longitude[(_this.longitude.length - 2)], _this.longitude[(_this.longitude.length - 1)]],
                    'angle': 0,
                    'color': 'blue',
                    'width': (lineWidth > 5) ? 5 : (((5 >= lineWidth) && (lineWidth >= 1)) ? lineWidth : 1)
                });
                _this.mapInstance.layers[0].navigationLineSettings = _this.navigationLines;
                if (!connectiveLine) {
                    _this.emptySavedLinePositions();
                }
            }
        };
        return _this;
    }
    DynamicMarker.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-panel' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'col-lg-9 control-section' },
                React.createElement(ej2_react_maps_1.MapsComponent, { id: "container", load: this.load, click: this.click.bind(this), ref: function (m) { return _this.mapInstance = m; }, zoomSettings: {
                        enable: true
                    } },
                    React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Marker, ej2_maps_1.NavigationLine, ej2_maps_1.Zoom] }),
                    React.createElement(ej2_react_maps_1.LayersDirective, null,
                        React.createElement(ej2_react_maps_1.LayerDirective, { layerType: 'OSM' }))),
                React.createElement("div", null,
                    React.createElement("p", null,
                        React.createElement("i", null,
                            React.createElement("div", null,
                                React.createElement("p", { id: "content", style: { fontSize: '16px', color: 'grey', textAlign: 'center' } }, "Click on the maps to add marker/navigation line")))))),
            React.createElement("div", { className: "col-lg-3 property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties", style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '35px' } },
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", { className: "property-text", style: { padding: '0px', display: 'inline-block' } }, "Marker")),
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'marker', change: this.markerChange.bind(this), checked: true })))),
                            React.createElement("tr", { style: { height: '35px' } },
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", { className: "property-text", style: { padding: '0px' } }, "Line")),
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'line', change: this.lineChange.bind(this) })))),
                            React.createElement("tr", { style: { height: '35px' } },
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", { className: "property-text", style: { padding: '0px' } }, "Connecting line")),
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'connect', change: this.connectLineChange.bind(this), ref: function (d) { return _this.connectLineInstance = d; }, disabled: true })))),
                            React.createElement("tr", { style: { height: '10px' } }),
                            React.createElement("tr", { style: { height: '35px' } },
                                React.createElement("td", { style: { width: '70%', padding: '0px' }, className: "property-text" }, "Marker type"),
                                React.createElement("td", { style: { width: '10%', marginLeft: '20px' } },
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'type', fields: { text: 'value', value: 'value' }, ref: function (d) { return _this.dropElement = d; }, style: { width: '50px', height: '20px' }, dataSource: this.droplist, index: 0, placeholder: 'Select marker shape', width: 80 }))),
                            React.createElement("tr", { style: { height: '10px' } }),
                            React.createElement("tr", { style: { height: '35px' } },
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", { className: "property-text", style: { padding: '0px' } }, "Width")),
                                React.createElement("td", { style: { width: '10%' } },
                                    React.createElement(ej2_react_inputs_1.TextBoxComponent, { className: "e-input", value: '1', style: { width: '80px' }, id: "width", ref: function (d) { return _this.textElement = d; }, disabled: true }))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { style: { marginLeft: '70%' } },
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'togglebtn', cssClass: 'e-info', isPrimary: true, onClick: this.buttonClick.bind(this), style: { textTransform: 'none !important', width: '80px', marginLeft: '-65%', marginTop: '2px' }, ref: function (d) { return _this.buttonInstance = d; } }, "Clear")))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample shows how custom markers and lines can be dynamically added to our maps with UI interaction. Marker or line can be chosen from the properties panel. ")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "Using UI interaction, the markers or line can be added as follows: You can get the currently clicked geo location by passing \"PointerEvent\" or \"MouseEvent\" argument and layer index to the \"getGeoLocation\" method. Then, use that geo position to place the marker or line in the appropriate position."),
                React.createElement("br", null),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "The features of maps component are segregated into individual feature-wise modules. To use navigation lines and marker, you need to inject the ",
                    React.createElement("code", null, "NavigationLine "),
                    " and ",
                    React.createElement("code", null, "Marker "),
                    " module using the ",
                    React.createElement("code", null, "Maps.Inject(NavigationLine, Marker)"),
                    " method."))));
    };
    // custom code start
    DynamicMarker.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    ;
    // custom code end
    DynamicMarker.prototype.click = function (args) {
        if (this.markerCheck) {
            this.addMarker(args);
        }
        if (this.lineCheck && !this.connectLineCheck) {
            this.addLine(args, this.textElement.value);
        }
        if (this.connectLineCheck) {
            this.addLine(args, this.textElement.value, true);
        }
        if (this.markerCheck || this.lineCheck || this.connectLineCheck) {
            this.mapInstance.refresh();
            if (this.buttonInstance.disabled && (this.mapInstance.layers[0].markerSettings.length ||
                this.mapInstance.layers[0].navigationLineSettings.length)) {
                this.buttonInstance.disabled = false;
            }
        }
    };
    ;
    DynamicMarker.prototype.markerChange = function (args) {
        this.markerCheck = args.checked;
        this.dropElement.enabled = args.checked;
    };
    ;
    DynamicMarker.prototype.lineChange = function (args) {
        this.lineCheck = args.checked;
        if (args.checked) {
            this.connectLineInstance.disabled = false;
            this.connectLineInstance.checked = false;
            this.textElement.enabled = true;
        }
        else {
            this.connectLineCheck = args.checked;
            this.emptySavedLinePositions();
            this.connectLineInstance.disabled = true;
            this.connectLineInstance.checked = false;
            this.textElement.enabled = false;
        }
    };
    ;
    DynamicMarker.prototype.connectLineChange = function (args) {
        this.connectLineCheck = args.checked;
        if (!args.checked) {
            this.emptySavedLinePositions();
        }
    };
    ;
    DynamicMarker.prototype.buttonClick = function (args) {
        this.mapInstance.layers[0].markerSettings = [];
        this.mapInstance.layers[0].navigationLineSettings = [];
        this.navigationLines = [];
        this.emptySavedLinePositions();
        this.mapInstance.refresh();
        this.buttonInstance.disabled = true;
    };
    ;
    return DynamicMarker;
}(sample_base_1.SampleBase));
exports.DynamicMarker = DynamicMarker;
