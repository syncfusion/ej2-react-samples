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
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_maps_1 = require("@syncfusion/ej2-react-maps");
var sample_base_1 = require("../common/sample-base");
var data = require("./map-data/legend-datasource.json");
var datasource = data;
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var LegendMaps = /** @class */ (function (_super) {
    __extends(LegendMaps, _super);
    function LegendMaps() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Code for Property Panel
        _this.droplist = [
            { text: 'Default', value: 'Default' },
            { text: 'Interactive', value: 'Interactive' },
        ];
        _this.positionList = [
            { text: 'Top', value: 'Top' },
            { text: 'Bottom', value: 'Bottom' },
            { text: 'Left', value: 'Left' },
            { text: 'Right', value: 'Right' },
        ];
        return _this;
    }
    LegendMaps.prototype.legendChange = function () {
        this.mapInstance.legendSettings.mode = this.legendElement.value;
        if (this.legendElement.value === 'Interactive') {
            if (this.mapInstance.legendSettings.orientation === 'Horizontal' || this.mapInstance.legendSettings.orientation === 'None') {
                this.mapInstance.legendSettings.height = '10';
                this.mapInstance.legendSettings.width = '';
            }
            else {
                this.mapInstance.legendSettings.height = '70%';
                this.mapInstance.legendSettings.width = '10';
            }
        }
        else {
            this.mapInstance.legendSettings.height = '';
            this.mapInstance.legendSettings.width = '';
        }
        this.mapInstance.refresh();
    };
    LegendMaps.prototype.legendPositionChange = function () {
        this.mapInstance.legendSettings.position = this.legendPositionElement.value;
        if (this.legendPositionElement.value === 'Left' || this.legendPositionElement.value === 'Right') {
            this.mapInstance.legendSettings.orientation = 'Vertical';
            if (this.mapInstance.legendSettings.mode === 'Interactive') {
                this.mapInstance.legendSettings.height = '70%';
                this.mapInstance.legendSettings.width = '10';
            }
            else {
                this.mapInstance.legendSettings.height = '';
                this.mapInstance.legendSettings.width = '';
            }
        }
        else {
            this.mapInstance.legendSettings.orientation = 'Horizontal';
            if (this.mapInstance.legendSettings.mode === 'Interactive') {
                this.mapInstance.legendSettings.height = '10';
                this.mapInstance.legendSettings.width = '';
            }
        }
        this.mapInstance.refresh();
    };
    LegendMaps.prototype.dataChange = function (args) {
        if (args.checked) {
            this.mapInstance.layers[0].shapeSettings.colorMapping[5].color = 'lightgrey';
            this.mapInstance.layers[0].shapeSettings.colorMapping[5].label = 'No Data';
        }
        else {
            this.mapInstance.layers[0].shapeSettings.colorMapping[5].color = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[5].label = null;
        }
        this.mapInstance.refresh();
    };
    LegendMaps.prototype.toggleLegendChange = function (args) {
        this.mapInstance.legendSettings.toggleLegendSettings.enable = args.checked;
        this.mapInstance.refresh();
    };
    LegendMaps.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'col-lg-8 control-section' },
                React.createElement(ej2_react_maps_1.MapsComponent, { id: "maps", tooltipRender: this.tooltip, loaded: this.onMapsLoad.bind(this), load: this.load, ref: function (m) { return _this.mapInstance = m; }, zoomSettings: {
                        enable: false
                    }, legendSettings: {
                        visible: true,
                        position: 'Top'
                    }, titleSettings: {
                        text: 'Population density (per square kilometer) - 2015',
                        textStyle: {
                            size: '16px'
                        }
                    } },
                    React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Legend, ej2_react_maps_1.MapsTooltip] }),
                    React.createElement(ej2_react_maps_1.LayersDirective, null,
                        React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: new ej2_maps_1.MapAjax('./src/maps/map-data/world-map.json'), shapePropertyPath: 'name', shapeDataPath: 'name', dataSource: datasource.legend, tooltipSettings: {
                                visible: true,
                                valuePath: 'name',
                                format: '${name} : ${density}'
                            }, shapeSettings: {
                                colorValuePath: 'density',
                                colorMapping: [
                                    {
                                        from: 0.00001, to: 100, color: 'rgb(153,174,214)', label: '<100'
                                    },
                                    {
                                        from: 100, to: 200, color: 'rgb(115,143,199)', label: '100 - 200'
                                    },
                                    {
                                        from: 200, to: 300, color: 'rgb(77,112,184)', label: '200 - 300'
                                    },
                                    {
                                        from: 300, to: 500, color: 'rgb(38,82,168)', label: '300 - 500'
                                    },
                                    {
                                        from: 500, to: 19000, color: 'rgb(0,51,153)', label: '>500'
                                    },
                                    {
                                        color: null, label: null
                                    }
                                ]
                            } }))),
                React.createElement("div", { style: { float: 'right', marginright: '10px' } },
                    "Source:",
                    React.createElement("a", { href: "https://simple.wikipedia.org/wiki/List_of_countries_by_population_density", target: "_blank" }, "simple.wikipedia.org"))),
            React.createElement("div", { className: 'col-lg-4 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%', marginBottom: '20px' } },
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", null, "Legend mode")),
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "legendmode", width: "120px", index: 0, change: this.legendChange.bind(this), ref: function (d) { return _this.legendElement = d; }, dataSource: this.droplist, fields: { text: 'text', value: 'value' } })))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", null, "Legend position ")),
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "legendPosition", width: "120px", index: 0, change: this.legendPositionChange.bind(this), ref: function (d) { return _this.legendPositionElement = d; }, dataSource: this.positionList, fields: { text: 'text', value: 'value' } })))),
                        React.createElement("tr", { style: { height: "50px" } },
                            React.createElement("td", { style: { width: "80%" } },
                                React.createElement("div", { className: "property-text", style: { padding: "0px;" } }, "Show legend for remaining data source items")),
                            React.createElement("td", { style: { width: "20%" } },
                                React.createElement("div", { className: "col" },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "datasource", change: this.dataChange.bind(this) })))),
                        React.createElement("tr", { style: { height: "50px" } },
                            React.createElement("td", { style: { width: "70%" } },
                                React.createElement("div", { className: "property-text", style: { padding: "0px;" } }, "Show population density when the legend item is toggled")),
                            React.createElement("td", { style: { width: "20%" } },
                                React.createElement("div", { className: "col" },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "toggleLegend", change: this.toggleLegendChange.bind(this) }))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes grouping of countries in the legends based on its population density. The legend will be displayed at the top of the map.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render a legend in the maps. A legend item denotes the value of a shape. Any number of legend items can be added to the legend. You can bind the desired colors to the shapes, if its values are within the specified range using the ColorMapping property. You can also show or hide color mapping related to population density when toggling the legend item"),
                React.createElement("p", null, "Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a shape or tap a shape in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", { style: { fontweight: 500 } }, "Injecting Module"),
                React.createElement("p", null, "Maps component features are segregated into individual feature-wise modules. To use a legend, inject the Legend module using the Maps.Inject(Legend) method."))));
    };
    LegendMaps.prototype.onMapsLoad = function (args) {
        var maps = document.getElementById('maps');
        maps.setAttribute('title', '');
    };
    ;
    // custom code start
    LegendMaps.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    ;
    //tslint:disable
    // custom code end
    LegendMaps.prototype.tooltip = function (args) {
        if (!args.options['data']) {
            args.cancel = true;
        }
    };
    return LegendMaps;
}(sample_base_1.SampleBase));
exports.LegendMaps = LegendMaps;
