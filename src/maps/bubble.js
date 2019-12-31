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
var population_data_1 = require("./map-data/population-data");
var data = require("./map-data/bubble-datasource.json");
var datasource = data;
// custom code start
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
// custom code end
var BubbleMaps = (function (_super) {
    __extends(BubbleMaps, _super);
    function BubbleMaps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BubbleMaps.prototype.bubbleRendering = function (args) {
        args.radius = args.data.value;
    };
    BubbleMaps.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-12' },
                    React.createElement(ej2_react_maps_1.MapsComponent, { id: "maps", loaded: this.onMapsLoad.bind(this), load: this.load, ref: function (m) { return _this.mapInstance = m; }, useGroupingSeparator: true, format: "n", zoomSettings: {
                            enable: false,
                            horizontalAlignment: 'Near',
                            toolBarOrientation: 'Vertical',
                            toolbars: ['ZoomIn', 'ZoomOut', 'Reset'],
                            pinchZooming: true
                        }, bubbleRendering: this.bubbleRendering.bind(this), titleSettings: {
                            text: 'Top 30 countries with highest Internet users',
                            textStyle: {
                                size: '16px'
                            }
                        } },
                        React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Bubble, ej2_react_maps_1.MapsTooltip, ej2_react_maps_1.Zoom] }),
                        React.createElement(ej2_react_maps_1.LayersDirective, null,
                            React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: new ej2_maps_1.MapAjax('./src/maps/map-data/world-map.json'), shapePropertyPath: 'name', shapeDataPath: 'name', dataSource: datasource, shapeSettings: {
                                    fill: '#E5E5E5'
                                } },
                                React.createElement(ej2_react_maps_1.BubblesDirective, null,
                                    React.createElement(ej2_react_maps_1.BubbleDirective, { dataSource: population_data_1.internetUsers, visible: true, valuePath: 'value', colorValuePath: 'color', minRadius: 3, maxRadius: 70, opacity: 0.8, tooltipSettings: {
                                            visible: true,
                                            valuePath: 'population',
                                            template: '<div id="bubbletooltiptemplate" style="width: 165px;background: rgba(53, 63, 76, 0.90); opacity: 90%;background: rgba(53, 63, 76, 0.90);box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.40);padding: 10px;border: 1px #abb9c6;border-radius: 4px;">' +
                                                '<div style="font-size:13px;color:#ffffff;font-weight: 500;"><center>${name}</center></div>' +
                                                '<hr style="margin-top: 2px;margin-bottom:5px;border:0.5px solid #DDDDDD">' +
                                                '<div><span style="font-size:13px;color:#cccccc">Rank : </span><span style="font-size:13px;color:#ffffff;font-weight: 500;">${rank}</span></div>' +
                                                '<div><span style="font-size:13px;color:#cccccc">Population : </span><span style="font-size:13px;color:#ffffff;font-weight: 500;">${population}</span></div></div>',
                                        } })))))),
                React.createElement("div", { style: { float: 'right', marginright: '10px' } },
                    "Source:",
                    React.createElement("a", { href: "https://en.wikipedia.org/wiki/List_of_countries_by_number_of_Internet_users", target: "_blank" }, "en.wikipedia.org"))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates the top 30 countries which has highest Internet users in bubbles of the year 2016.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render the bubbles for each shape in a map. Values of the shapes can be determined from the size and color of the bubbles. You can bind the desired colors from the data source to the bubbles."),
                React.createElement("p", null, "Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a bubble or tap a bubble in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", { style: { fontweight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "Maps component features are segregated into individual feature-wise modules. To use the bubbles, inject the ",
                    React.createElement("code", null, "Bubble"),
                    " module using the ",
                    React.createElement("code", null, "Maps.Inject(Bubble)"),
                    " method."))));
    };
    BubbleMaps.prototype.onMapsLoad = function (args) {
        var maps = document.getElementById('maps');
        maps.setAttribute('title', '');
    };
    ;
    // custom code start
    BubbleMaps.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    ;
    return BubbleMaps;
}(sample_base_1.SampleBase));
exports.BubbleMaps = BubbleMaps;
