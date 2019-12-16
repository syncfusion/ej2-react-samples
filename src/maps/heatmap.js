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
var data = require("./map-data/heatmap-datasource.json");
var datasource = data;
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var colormapping = [{
        from: 60000, to: 400000, color: '#9fdfdf', label: '<0.4M'
    },
    {
        from: 400000, to: 10000000, color: '#79d2d2', label: '0.4-10M'
    },
    {
        from: 10000000, to: 20000000, color: '#53C6C6', label: '10-20M'
    },
    {
        from: 20000000, to: 70000000, color: '#39acac', label: '20-70M'
    },
    {
        from: 70000000, to: 100000000, color: '#339999', label: '70-100M'
    },
    {
        from: 100000000, to: 200000000, color: '#2d8686', label: '>100M'
    }
];
var HeatMaps = /** @class */ (function (_super) {
    __extends(HeatMaps, _super);
    function HeatMaps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HeatMaps.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-12' },
                    React.createElement(ej2_react_maps_1.MapsComponent, { id: "maps", loaded: this.onMapsLoad.bind(this), load: this.load, ref: function (m) { return _this.mapInstance = m; }, useGroupingSeparator: true, format: "n", zoomSettings: {
                            enable: false
                        }, legendSettings: {
                            visible: true,
                            mode: 'Interactive',
                            position: 'Bottom',
                            height: '10',
                            width: '350',
                            alignment: 'Center',
                            labelDisplayMode: 'Trim'
                        }, titleSettings: {
                            text: "State wise India's population - 2011",
                            textStyle: {
                                size: '16px'
                            }
                        } },
                        React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Marker, ej2_react_maps_1.MapsTooltip, ej2_react_maps_1.Legend] }),
                        React.createElement(ej2_react_maps_1.LayersDirective, null,
                            React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: new ej2_maps_1.MapAjax('./src/maps/map-data/india.json'), shapePropertyPath: 'NAME_1', shapeDataPath: 'Name', dataSource: datasource.heatmap, tooltipSettings: {
                                    visible: true,
                                    valuePath: 'population',
                                    format: 'State: ${Name} <br> Population: ${population}'
                                }, shapeSettings: {
                                    /*border: {
                                        width: 0.2,
                                        color: 'white'
                                    },*/
                                    colorValuePath: 'population',
                                    colorMapping: colormapping
                                } }))))),
            React.createElement("div", { style: { float: 'right', marginright: '10px' } },
                "Source:",
                React.createElement("a", { href: "https://en.wikipedia.org/wiki/List_of_states_and_union_territories_of_India_by_population", target: "_blank" }, "en.wikipedia.org")),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the state wise population of India in the year 2011. Color for each state will be applied based on its value.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to apply the desired colors for the shapes, if its value is within the specified range using the ColorMapping property. Also, the interactive legend has been placed at the bottom of the map."),
                React.createElement("p", null, "Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a shape or tap a shape in touch enabled devices."))));
    };
    HeatMaps.prototype.onMapsLoad = function (args) {
        var maps = document.getElementById('maps');
        maps.setAttribute('title', '');
    };
    ;
    // custom code start
    HeatMaps.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    ;
    return HeatMaps;
}(sample_base_1.SampleBase));
exports.HeatMaps = HeatMaps;
