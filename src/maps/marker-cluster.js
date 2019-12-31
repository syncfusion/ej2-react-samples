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
var ej2_react_maps_1 = require("@syncfusion/ej2-react-maps");
var sample_base_1 = require("../common/sample-base");
var data = require("./map-data/marker-cluster.json");
var datasource = data;
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var MarkerCluster = (function (_super) {
    __extends(MarkerCluster, _super);
    function MarkerCluster() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MarkerCluster.prototype.render = function () {
        return (React.createElement("div", { className: 'control-panel' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_maps_1.MapsComponent, { id: "maps", load: this.load, useGroupingSeparator: true, format: 'n', zoomSettings: {
                        enable: true
                    }, titleSettings: {
                        text: 'Top 50 largest cities in the World',
                        textStyle: {
                            size: '16px'
                        }
                    } },
                    React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Marker, ej2_react_maps_1.MapsTooltip, ej2_react_maps_1.Zoom] }),
                    React.createElement(ej2_react_maps_1.LayersDirective, null,
                        React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: new ej2_maps_1.MapAjax('./src/maps/map-data/world-map.json'), shapeSettings: {
                                fill: '#C1DFF5'
                            }, markerClusterSettings: {
                                allowClustering: true,
                                shape: 'Image',
                                height: 40,
                                width: 40,
                                labelStyle: { color: 'white' },
                                imageUrl: 'src/maps/images/cluster.svg'
                            } },
                            React.createElement(ej2_react_maps_1.MarkersDirective, null,
                                React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, dataSource: datasource.cluster, shape: 'Image', imageUrl: 'src/maps/images/ballon.png', tooltipSettings: {
                                        visible: true,
                                        valuePath: 'area',
                                        template: '<div id="template" style="width: 140px;opacity: 90%;background: rgba(53, 63, 76, 0.90);box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.40);padding:10px;border: 1px #abb9c6;border-radius: 4px;">' +
                                            '<div style="font-size:13px;color:#ffffff;font-weight: 500;"><center>${city}</center></div>' +
                                            '<hr style="margin-top: 2px;margin-bottom:5px;border:0.5px solid #DDDDDD">' +
                                            '<div><span style="font-size:13px;color:#cccccc">Rank : </span><span style="font-size:13px;color:#ffffff;font-weight: 500;">${Rank}</span></div>' +
                                            '<div><span style="font-size:13px;color:#cccccc">Area : </span><span style="font-size:13px;color:#ffffff;font-weight: 500;">${area} sq kms</span></div></div>',
                                    }, height: 20, width: 20, animationDuration: 0 })))))),
            React.createElement("div", { style: { float: 'right', marginright: '10px' } },
                "Source:",
                React.createElement("a", { href: "http://www.citymayors.com/statistics/largest-cities-population-125.html", target: "_blank" }, "www.citymayors.com")),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates the world's top 50 cities by showing the markers in their locations and clustering the markers to avoid intersecting. ")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to display multiple markers in the same region without intersecting each other. If a marker intersects, it will be clustered and the total number of markers will be displayed over the cluster. When zooming in, the number of clusters will be decreased, and the individual marker will be displayed. When zooming out, markers that intersect will again be clustered. You can use the \"clusterSettings\" property in \"layer\" to enable marker clustering."),
                React.createElement("p", null, "Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a marker or tap a marker in touch-enabled devices."),
                React.createElement("br", null),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "Maps component features are segregated into individual feature-wise modules. To use a marker and cluster, inject the ",
                    React.createElement("code", null, "Marker"),
                    " module using the ",
                    React.createElement("code", null, "Maps.Inject(Marker)"),
                    " method."))));
    };
    // custom code start
    MarkerCluster.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    ;
    return MarkerCluster;
}(sample_base_1.SampleBase));
exports.MarkerCluster = MarkerCluster;
