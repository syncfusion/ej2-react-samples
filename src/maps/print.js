"use strict";
/**
 * Print sample
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
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var data = require("./map-data/print-datasource.json");
var datasource = data;
var SAMPLE_CSS = "\n.control-fluid {\n    padding: 0px !important;\n}\n#btn-control {\n    width: 100%;\n    text-align: center;\n    text-transform:none !important;\n}\n.e-play-icon::before {\n    content: \"\\e813\";\n}";
var PrintMaps = (function (_super) {
    __extends(PrintMaps, _super);
    function PrintMaps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PrintMaps.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-8' },
                    React.createElement(ej2_react_maps_1.MapsComponent, { id: "maps", tooltipRender: this.tooltipRender.bind(this), loaded: this.onMapsLoad.bind(this), load: this.load, ref: function (m) { return _this.mapInstance = m; }, useGroupingSeparator: true, format: "n", legendSettings: {
                            visible: true,
                            mode: 'Interactive',
                            position: 'Bottom',
                            height: '10',
                            width: '350',
                            labelDisplayMode: 'Trim',
                            alignment: 'Center'
                        }, titleSettings: {
                            text: 'State-wise US population - 2010',
                            textStyle: {
                                size: '16px'
                            }
                        } },
                        React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Legend, ej2_react_maps_1.MapsTooltip] }),
                        React.createElement(ej2_react_maps_1.LayersDirective, null,
                            React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: new ej2_maps_1.MapAjax('./src/maps/map-data/usa.json'), shapePropertyPath: 'name', shapeDataPath: 'name', dataSource: datasource.print, tooltipSettings: {
                                    visible: true,
                                    valuePath: 'population',
                                    format: 'State: ${name} <br> Population: ${population}'
                                }, shapeSettings: {
                                    /*border: {
                                        width: 0.5,
                                        color: 'gray'
                                    },*/
                                    colorValuePath: 'population',
                                    colorMapping: [
                                        {
                                            from: 580000, to: 2800000, color: '#dae8f1', label: '<3M'
                                        },
                                        {
                                            from: 2800000, to: 5280000, color: '#b0cde1', label: '3-6M'
                                        },
                                        {
                                            from: 5280000, to: 8260000, color: '#90bad8', label: '6-9M'
                                        },
                                        {
                                            from: 8260000, to: 11660000, color: '#6ea7d2', label: '9-12M'
                                        },
                                        {
                                            from: 11660000, to: 19600000, color: '#4c96cb', label: '12-20M'
                                        },
                                        {
                                            from: 19600000, to: 26500000, color: '#3182bd', label: '20-25M'
                                        },
                                        {
                                            from: 26500000, to: 38400000, color: '#004374', label: '>25M'
                                        }
                                    ]
                                } }))),
                    React.createElement("div", { style: { float: 'right', marginright: '10px', marginBottom: '0px' } },
                        "Source:",
                        React.createElement("a", { href: "https://en.wikipedia.org/wiki/List_of_U.S._states_and_territories_by_population", target: "_blank" }, "en.wikipedia.org"))),
                React.createElement("div", { className: 'col-md-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '100%' } },
                                    React.createElement("div", { id: "btn-control" },
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: this.onClick.bind(this), style: { width: '80px' }, cssClass: 'e-info', isPrimary: true }, "Print")))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates the print feature in Maps. By clicking\u00A0the Print button, you can print the maps directly from the browser.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the print. The rendered maps can be printed directly from the browser by calling the public method ",
                    React.createElement("code", null, "print"),
                    ". Also this sample visualizes the State-wise US population in the year 2010."),
                React.createElement("p", null, "Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a marker or tap a marker in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "Maps component features are segregated into individual feature-wise modules. To use a legend, inject the ",
                    React.createElement("code", null, "Legend"),
                    " module using the ",
                    React.createElement("code", null, "Maps.Inject(Legend)"),
                    " method."))));
    };
    PrintMaps.prototype.onMapsLoad = function (args) {
        var maps = document.getElementById('maps');
        maps.setAttribute('title', '');
    };
    ;
    // custom code start
    PrintMaps.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    ;
    // custom code end
    PrintMaps.prototype.tooltipRender = function (args) {
        if (args.options.toString().indexOf('population') > -1) {
            args.cancel = true;
        }
    };
    ;
    PrintMaps.prototype.onClick = function (e) {
        this.mapInstance.print();
    };
    return PrintMaps;
}(sample_base_1.SampleBase));
exports.PrintMaps = PrintMaps;
