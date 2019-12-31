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
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var LabelMaps = (function (_super) {
    __extends(LabelMaps, _super);
    function LabelMaps() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.droplist = [
            { text: 'Trim', value: 'Trim' },
            { text: 'None', value: 'None' },
            { text: 'Hide', value: 'Hide' }
        ];
        return _this;
        // custom code end
    }
    LabelMaps.prototype.showlabel = function () {
        var element = (document.getElementById('select'));
        this.mapInstance.layers[0].dataLabelSettings.visible = element.checked;
        this.mapInstance.refresh();
    };
    LabelMaps.prototype.intersectaction = function () {
        this.mapInstance.layers[0].dataLabelSettings.intersectionAction = this.dropElement1.value;
        this.mapInstance.refresh();
    };
    LabelMaps.prototype.smartlabel = function () {
        this.mapInstance.layers[0].dataLabelSettings.smartLabelMode = this.dropElement2.value;
        this.mapInstance.refresh();
    };
    LabelMaps.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-8' },
                    React.createElement(ej2_react_maps_1.MapsComponent, { id: "maps", loaded: this.onMapsLoad.bind(this), load: this.load, ref: function (m) { return _this.mapInstance = m; }, zoomSettings: {
                            enable: false
                        } },
                        React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.DataLabel, ej2_react_maps_1.MapsTooltip] }),
                        React.createElement(ej2_react_maps_1.LayersDirective, null,
                            React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: new ej2_maps_1.MapAjax('./src/maps/map-data/usa.json'), dataLabelSettings: {
                                    visible: true,
                                    labelPath: 'name',
                                    smartLabelMode: 'Trim',
                                    intersectionAction: 'None'
                                }, shapeSettings: {
                                    autofill: true
                                }, tooltipSettings: {
                                    visible: true,
                                    valuePath: 'name'
                                } })))),
                React.createElement("div", { className: 'col-md-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '110%' } },
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null, "Show Labels")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement("input", { type: "checkbox", onClick: this.showlabel.bind(this), defaultChecked: true, id: "select", style: { marginTop: '15px' } })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null, "Smart label mode")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", index: 0, change: this.smartlabel.bind(this), ref: function (d) { return _this.dropElement2 = d; }, dataSource: this.droplist, fields: { text: 'text', value: 'value' }, placeholder: 'Select smartlabel mode' })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null, "Intersect action")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", index: 1, change: this.intersectaction.bind(this), ref: function (d) { return _this.dropElement1 = d; }, dataSource: this.droplist, fields: { text: 'text', value: 'value' }, placeholder: 'Select intersect action' })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the names of all the states in USA in data labels. Options have been provided to change the intersect action and smart labels mode of the data labels.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render a map with the provided GeoJSON data. Group of shapes can be combined to form a layer of the map. You can bind the desired colors from the data source to the map shapes. The marker templates are used to display the names for shapes and mark specific locations. Legend is enabled in this example to represent each continent."),
                React.createElement("p", null, "Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a shape or tap a shape in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", { style: { fontweight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "Maps component features are segregated into individual feature-wise modules. To use a marker, inject the ",
                    React.createElement("code", null, "Marker"),
                    " module using the ",
                    React.createElement("code", null, "Maps.Inject(Marker)"),
                    " method, and use a legend by injecting the ",
                    React.createElement("code", null, "Legend"),
                    " module."))));
    };
    LabelMaps.prototype.onMapsLoad = function (args) {
        var maps = document.getElementById('maps');
        maps.setAttribute('title', '');
    };
    ;
    // custom code start
    LabelMaps.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    ;
    return LabelMaps;
}(sample_base_1.SampleBase));
exports.LabelMaps = LabelMaps;
