"use strict";
/**
 * OSM sample
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
var ej2_popups_1 = require("@syncfusion/ej2-popups");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_maps_1 = require("@syncfusion/ej2-react-maps");
var sample_base_1 = require("../common/sample-base");
ej2_base_1.enableRipple(true);
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    #popuposm_dialog-content {\n      display: none !important\n    }\n    #popuposm_title {\n      font-size: 14px !important\n    }\n    .osmpopup {\n      position:relative;\n      background-color:white;\n    }        \n    .osmpopup:after {\n        content:'';\n        position: absolute;\n        top: 170%;\n        left: 50%;\n        width: 0;\n        height: 0;\n        margin-left: -35px;\n        border-top: solid 20px white;\n        border-left: solid 20px transparent;\n        border-right: solid 20px transparent;\n    }\n    #osmdialog .e-popup{\n        min-width: 100px !important\n    }";
var OSMMaps = /** @class */ (function (_super) {
    __extends(OSMMaps, _super);
    function OSMMaps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OSMMaps.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-12' },
                    React.createElement(ej2_react_maps_1.MapsComponent, { id: "maps", load: this.load, ref: function (m) { return _this.mapInstance = m; }, titleSettings: {
                            text: 'Headquarters of the United Nations',
                            textStyle: {
                                size: '16px'
                            }
                        }, centerPosition: {
                            latitude: 40.7209,
                            longitude: -73.9680
                        }, zoomSettings: {
                            zoomFactor: 9,
                            enable: false
                        } },
                        React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Bubble, ej2_react_maps_1.MapsTooltip, ej2_react_maps_1.Zoom, ej2_react_maps_1.Marker] }),
                        React.createElement(ej2_react_maps_1.LayersDirective, null,
                            React.createElement(ej2_react_maps_1.LayerDirective, { layerType: 'OSM', animationDuration: 0 },
                                React.createElement(ej2_react_maps_1.MarkersDirective, null,
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, template: '<div><img src="src/maps/images/ballon.png" style="height:30px;width:20px;"></img></div>', dataSource: exports.data1, tooltipSettings: {
                                            visible: true,
                                            valuePath: 'name'
                                        } }))))))),
            React.createElement("div", { style: { float: 'right' } },
                React.createElement("a", { href: "https://www.openstreetmap.org/copyright", target: "_blank" }, "\u00A9 OpenStreetMap contributors")),
            React.createElement("br", null),
            React.createElement("div", { style: { float: 'right', marginright: '10px' } },
                "Source:",
                React.createElement("a", { href: "https://en.wikipedia.org/wiki/Headquarters_of_the_United_Nations", target: "_blank" }, "en.wikipedia.org")),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the location of United Nations Headquarters in the OpenStreetMap with marker.Tooltip is displayed for marker.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render the OpenStreetMap. Denoted the location of United Nations Headquarters using marker. EJ2 Dialog is displayed on the top of the marker. Also enabled zooming feature to zoom and pan the map for detailed analysis."),
                React.createElement("br", null),
                React.createElement("p", { style: { fontweight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "Maps component features are segregated into individual feature-wise modules. To use a marker, inject the Marker module using the ",
                    React.createElement("code", null, "Maps.Inject(Marker)"),
                    " method and zoom module using ",
                    React.createElement("code", null, "maps.Inject(Zoom)"),
                    " method."))));
    };
    // custom code start
    OSMMaps.prototype.load = function (args) {
        var theme = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.maps.theme = (theme.charAt(0).toUpperCase() + theme.slice(1));
    };
    ;
    return OSMMaps;
}(sample_base_1.SampleBase));
exports.OSMMaps = OSMMaps;
setTimeout(function () {
    var dialogObj = new ej2_popups_1.Dialog({
        header: 'Manhattan,<br> New York, USA',
        animationSettings: { effect: 'FadeZoom' },
        showCloseIcon: true,
        height: '55px',
        width: '186px',
        target: document.getElementById('osmdialog')
    });
    dialogObj.appendTo('#popuposm');
}, 500);
exports.data1 = [
    {
        name: 'Manhattan, New York, USA',
        latitude: 40.7488758,
        longitude: -73.9730091
    },
];
