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
var data = require("./map-data/tooltip-datasource.json");
var datasource = data;
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var TooltipMaps = (function (_super) {
    __extends(TooltipMaps, _super);
    function TooltipMaps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TooltipMaps.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-12' },
                    React.createElement(ej2_react_maps_1.MapsComponent, { id: "maps", tooltipRender: this.tooltipRender.bind(this), loaded: this.onMapsLoad.bind(this), load: this.load, ref: function (m) { return _this.mapInstance = m; }, zoomSettings: {
                            enable: false
                        }, legendSettings: {
                            visible: true,
                            mode: 'Interactive',
                            position: 'Left',
                            orientation: 'Vertical',
                            height: '70%',
                            width: '10'
                        }, titleSettings: {
                            text: 'Finalist in Cricket World Cup',
                            textStyle: {
                                size: '16px'
                            }
                        } },
                        React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.MapsTooltip, ej2_react_maps_1.Legend] }),
                        React.createElement(ej2_react_maps_1.LayersDirective, null,
                            React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: new ej2_maps_1.MapAjax('./src/maps/map-data/world-map.json'), shapePropertyPath: 'name', shapeDataPath: 'name', dataSource: datasource, tooltipSettings: {
                                    visible: true,
                                    valuePath: 'name',
                                    template: '<div id="tooltemplate" style="width: 90px;background: rgba(53, 63, 76, 0.90); opacity: 90%;background: rgba(53, 63, 76, 0.90);box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.40);padding-bottom: 10px;padding-top: 10px;padding-left: 10px;padding-right: 10px;border: 1px #abb9c6">' +
                                        '<div style="font-size:13px;color:#ffffff;font-weight: 500;"><center>${country}</center></div>' +
                                        '<hr style="margin-top: 2px;margin-bottom:5px;border:0.5px solid #DDDDDD">' +
                                        '<div><span style="font-size:13px;color:#cccccc">Finalist : </span><span style="font-size:13px;color:#ffffff;font-weight: 500;">${value1}</span></div>' +
                                        '<div><span style="font-size:13px;color:#cccccc">Win : </span><span style="font-size:13px;color:#ffffff;font-weight: 500;">${value2}</span></div></div>',
                                }, shapeSettings: {
                                    fill: 'lightgrey',
                                    colorMapping: [
                                        {
                                            value: '1',
                                            color: '#b3daff'
                                        },
                                        {
                                            color: '#80c1ff',
                                            value: '2'
                                        },
                                        {
                                            color: '#1a90ff',
                                            value: '3'
                                        },
                                        {
                                            color: '#005cb3',
                                            value: '7'
                                        }
                                    ],
                                    colorValuePath: 'value1'
                                } }))))),
            React.createElement("div", { style: { float: 'right', marginright: '10px' } },
                "Source:",
                React.createElement("a", { href: "https://en.wikipedia.org/wiki/List_of_Cricket_World_Cup_finals", target: "_blank" }, "en.wikipedia.org")),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample depicts the countries that were appeared in the finals of Cricket World Cup and their counts. By hovering the mouse over the shapes, county name, finalist count, and winning count will be displayed in the tooltip template.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render the custom HTML element as tooltip. To see the tooltip in action, hover the mouse over a shape or tap a shape in touch enabled devices. Also, the interactive legend has been placed at the left of the map."),
                React.createElement("br", null),
                React.createElement("p", { style: { fontweight: 500 } }, "Injecting Module"),
                React.createElement("p", null, "Maps component features are segregated into individual feature-wise modules. To use a tooltip, inject the Tooltip module using the Maps.Inject(Tooltip) method."))));
    };
    TooltipMaps.prototype.onMapsLoad = function (args) {
        var maps = document.getElementById('maps');
        maps.setAttribute('title', '');
    };
    ;
    // custom code start
    TooltipMaps.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    ;
    //tslint:disable
    // custom code end
    TooltipMaps.prototype.tooltipRender = function (args) {
        if (!args.options['data']) {
            args.cancel = true;
        }
    };
    return TooltipMaps;
}(sample_base_1.SampleBase));
exports.TooltipMaps = TooltipMaps;
