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
// custom code start
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    #annotation {\n        color: #DDDDDD;\n\t\tfont-size: 12px;\n\t\tfont-family: Roboto;\n        background: #3E464C;\n        margin: 20px;\n        padding: 10px;\n        -webkit-border-radius: 2px;\n        -moz-border-radius: 2px;\n        border-radius: 2px;\n        width: 300px;\n        -moz-box-shadow: 0px 2px 5px #666;\n        -webkit-box-shadow: 0px 2px 5px #666;\n        box-shadow: 0px 2px 5px #666;\n    }\n    .country-label {\n        color: white;\n        font-size: 25px;\n    }";
// custom code end
var AnnotationMaps = /** @class */ (function (_super) {
    __extends(AnnotationMaps, _super);
    function AnnotationMaps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnnotationMaps.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement(ej2_react_maps_1.MapsComponent, { id: "maps", loaded: this.onMapsLoad.bind(this), load: this.load, ref: function (m) { return _this.mapInstance = m; }, zoomSettings: {
                        enable: false
                    }, annotations: [
                        {
                            content: '#maps-annotation',
                            x: '0%', y: '70%'
                        }, {
                            content: '#compass-maps',
                            x: '85%', y: '5%'
                        }
                    ] },
                    React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Annotations, ej2_react_maps_1.Marker] }),
                    React.createElement(ej2_react_maps_1.LayersDirective, null,
                        React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: new ej2_maps_1.MapAjax('./src/maps/map-data/africa-continent.json'), shapePropertyPath: 'name', shapeDataPath: 'name', shapeSettings: {
                                fill: 'url(#grad1)'
                            } },
                            React.createElement(ej2_react_maps_1.MarkersDirective, null,
                                React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, animationDuration: 1, template: '<h3 style="color:white">{{:name}}</h3>', dataSource: [{
                                            name: 'Africa', latitude: 13.97274101999902, longitude: 20.390625
                                        }] })))))),
            React.createElement("svg", { height: "150", width: "400" },
                React.createElement("defs", null,
                    React.createElement("linearGradient", { id: "grad1", x1: "0%", y1: "0%", x2: "0%", y2: "100%" },
                        React.createElement("stop", { offset: "0%", style: { stopColor: '#C5494B', stopOpacity: '1' } }),
                        React.createElement("stop", { offset: "100%", style: { stopColor: '#4C134F', stopOpacity: '1' } })))),
            React.createElement("div", { id: "maps-annotation", style: { display: 'none' } },
                React.createElement("div", { id: "annotation" },
                    React.createElement("div", { style: { marginLeft: '10px', fontsize: '13px', fontweight: 500 } },
                        React.createElement("h5", { style: { marginLeft: '40px' } }, "Facts about Africa")),
                    React.createElement("hr", null),
                    React.createElement("div", null,
                        React.createElement("ul", { style: { listStyleType: 'disc' } },
                            React.createElement("li", null, "Africa is the second largest and second most populated continent in the world."),
                            React.createElement("li", { style: { paddingtop: '5px' } }, "Africa has 54 sovereign states and 10 non-sovereign territories."),
                            React.createElement("li", { style: { paddingtop: '5px' } }, "Algeria is the largest country in Africa, where as Mayotte is the smallest."))))),
            React.createElement("div", { id: "compass-maps", style: { display: 'none' } },
                React.createElement("img", { src: "src/maps/images/compass.svg", alt: "Direction compass", height: "75px", width: "75px" })),
            React.createElement("div", { style: { float: 'right', marginright: '10px' } },
                "Source:",
                React.createElement("a", { href: "https://en.wikipedia.org/wiki/Africa", target: "_blank" }, "en.wikipedia.org")),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample depicts the facts about Africa in an annotation. The shape of Africa is filled with gradient color.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render a map with the provided GeoJSON data. Group of shapes can be combined to form a layer of the map. You can bind the desired colors from the data source to the map shapes. The marker template is used to display the names for shapes. Legend is enabled in this example to represent each continent."),
                React.createElement("br", null),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
                React.createElement("p", null, "Maps component features are segregated into individual feature-wise modules. To use an annotation, inject the Annotations module using the Maps.Inject(Annotations) method."))));
    };
    AnnotationMaps.prototype.onMapsLoad = function (args) {
        var maps = document.getElementById('maps');
        maps.setAttribute('title', '');
    };
    ;
    // custom code start
    AnnotationMaps.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    ;
    return AnnotationMaps;
}(sample_base_1.SampleBase));
exports.AnnotationMaps = AnnotationMaps;
