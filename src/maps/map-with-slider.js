"use strict";
/**
 * Slider sample
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
var ej2_inputs_1 = require("@syncfusion/ej2-inputs");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_maps_1 = require("@syncfusion/ej2-react-maps");
var sample_base_1 = require("../common/sample-base");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var data = require("./map-data/population-growth.json");
var datasource = data;
var sliderVal = [-2, 4];
var colorCodes = ['#7E9CDC', '#DCD57E', '#7EDCA2', '#6EB5D0', '#A6DC7E', '#DCA87E', '#d075c6'];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    #mapannotation.e-control.e-slider .e-handle {\n            background-color: #4B4B4B ;\n        }\n    .e-control-wrapper.e-slider-container.e-horizontal .e-slider-track {\n        background: -webkit-linear-gradient(left, #7E9CDC 0, #DCD57E 17%, #7EDCA2 34%, #6EB5D0 51%, #A6DC7E 68%, #DCA87E 85%, #d075c6 100%);\n        background: linear-gradient(left, #7E9CDC 0, #DCD57E 17%, #7EDCA2 34%, #6EB5D0 51%, #A6DC7E 68%, #DCA87E 85%, #d075c6 100%);\n        background: -moz-linear-gradient(left, #7E9CDC 0, #DCD57E 17%, #7EDCA2 34%, #6EB5D0 51%, #A6DC7E 68%, #DCA87E 85%, #d075c6 100%);\n    }\n    .e-limit-bar.e-limits {\n        background-color: transparent !important;\n    }\n    .e-control-wrapper.e-slider-container.e-horizontal .e-range {\n        height: 0px !important;\n    }\n    #mapannotation.e-control.e-slider .e-slider-track {\n        height: 8px;\n        top: calc(50% - 4px);\n        border-radius: 5px;\n    }";
var MapSlider = (function (_super) {
    __extends(MapSlider, _super);
    function MapSlider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // custom code start
    MapSlider.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    ;
    // custom code end
    MapSlider.prototype.loaded = function (args) {
        if (!ej2_base_1.isNullOrUndefined(document.getElementById('mapslider_Annotation_0'))) {
            this.annotationRender(sliderVal);
        }
    };
    MapSlider.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_maps_1.MapsComponent, { id: "maps", load: this.load.bind(this), loaded: this.loaded.bind(this), ref: function (m) { return _this.mapInstance = m; }, margin: {
                        bottom: 20
                    }, titleSettings: {
                        text: 'Average annual population growth in North American countries',
                        textStyle: {
                            size: '16px'
                        }
                    }, zoomSettings: {
                        enable: false
                    } },
                    React.createElement(ej2_react_maps_1.AnnotationsDirective, null,
                        React.createElement(ej2_react_maps_1.AnnotationDirective, { content: '<div id="mapslider-annotation" style="display:none;"/>', horizontalAlignment: 'Center', y: '93%' })),
                    React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Annotations, ej2_react_maps_1.MapsTooltip] }),
                    React.createElement(ej2_react_maps_1.LayersDirective, null,
                        React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: new ej2_maps_1.MapAjax('./src/maps/map-data/north-america.json'), shapePropertyPath: 'name', shapeDataPath: 'name', dataSource: datasource.population, shapeSettings: {
                                colorValuePath: 'population',
                                colorMapping: [
                                    {
                                        from: -1.5, to: -0.75, color: '#7E9CDC'
                                    },
                                    {
                                        from: -0.75, to: 0, color: '#DCD57E'
                                    },
                                    {
                                        from: 0.1, to: 0.75, color: '#7EDCA2'
                                    },
                                    {
                                        from: 0.76, to: 1.5, color: '#6EB5D0'
                                    },
                                    {
                                        from: 1.5, to: 2.25, color: '#A6DC7E'
                                    },
                                    {
                                        from: 2.25, to: 3, color: '#DCA87E'
                                    },
                                    {
                                        from: 3, to: 3.75, color: '#d075c6'
                                    }
                                ]
                            }, tooltipSettings: {
                                visible: true,
                                format: '${name} : ${population}'
                            } })))),
            React.createElement(ej2_react_inputs_1.SliderComponent, { id: "mapannotation", style: { width: '300px', 'margin-left': '300px' }, type: 'Range', min: -1.5, max: 3.75, step: 0.75, value: sliderVal, ticks: { placement: 'After', largeStep: 0.75 }, change: this.sliderChange.bind(this), ref: function (d) { return _this.sliderElement = d; } }),
            React.createElement("div", { style: { float: 'right', marginright: '10px' } },
                "Source:",
                React.createElement("a", { href: "https://en.wikipedia.org/wiki/List_of_North_American_countries_by_population", target: "_blank" }, "Population growth in North America")),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the average annual population growth of the countries in the North America continent.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, range color mapping is applied to the shapes based on their population growth percentage. EJ2 Slider control is place at the bottom of the map to control the minimum and maximum color range."),
                React.createElement("p", null, "Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a marker or tap a marker in touch enabled devices."),
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
    MapSlider.prototype.sliderChange = function () {
        if (!isNaN(this.sliderElement.value[0]) && !isNaN(this.sliderElement.value[1])) {
            for (var i = 0; i < this.mapInstance.layers[0].shapeSettings.colorMapping.length; i++) {
                if (this.mapInstance.layers[0].shapeSettings.colorMapping[i].from < this.sliderElement.value[0] ||
                    this.mapInstance.layers[0].shapeSettings.colorMapping[i].to > this.sliderElement.value[1]) {
                    this.mapInstance.layers[0].shapeSettings.colorMapping[i].color = '#E5E5E5';
                }
                else {
                    this.mapInstance.layers[0].shapeSettings.colorMapping[i].color = colorCodes[i];
                }
            }
            sliderVal = this.sliderElement.value;
            this.mapInstance.refresh();
        }
    };
    MapSlider.prototype.annotationRender = function (val) {
        var _this = this;
        var slider = new ej2_inputs_1.Slider({
            min: -2, max: 4,
            value: val,
            type: 'Range',
            ticks: { placement: 'After', largeStep: 1, },
            change: function (args) {
                _this.sliderChange();
            }
        });
        slider.appendTo('#mapannotation');
    };
    return MapSlider;
}(sample_base_1.SampleBase));
exports.MapSlider = MapSlider;
