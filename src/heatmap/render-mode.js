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
var React = require("react");
var ej2_react_heatmap_1 = require("@syncfusion/ej2-react-heatmap");
var data = require("./data.json");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
// custom code start
var SAMPLE_CSS = "\n#control-container {\n    padding: 0px !important;\n}\n#source{\n    float: right; margin-right: 10p\n}";
// custom code end
/**
 * Heatmap Palette mode sample
 */
var RenderMode = (function (_super) {
    __extends(RenderMode, _super);
    function RenderMode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RenderMode.prototype.svg = function (args) {
        this.heatmap.renderingMode = 'SVG';
        this.heatmap.dataBind();
    };
    RenderMode.prototype.canvas = function (args) {
        this.heatmap.renderingMode = 'Canvas';
        this.heatmap.dataBind();
    };
    RenderMode.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("div", { className: 'col-md-9 control-section' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement(ej2_react_heatmap_1.HeatMapComponent, { id: 'heatmap-container', ref: function (t) { return _this.heatmap = t; }, titleSettings: {
                        text: 'Net Migration Rate of Northern Europe From 1965 to 2015',
                        textStyle: {
                            size: '15px',
                            fontWeight: '500',
                            fontStyle: 'Normal',
                            fontFamily: 'Segoe UI'
                        }
                    }, xAxis: {
                        labels: ['Channel Isl', 'Denmark', 'Estonia', 'Finland',
                            'Iceland', 'Ireland', 'Latvia', 'Lithuania', 'Norway', 'Sweden', 'UK'],
                        labelRotation: -90,
                        labelIntersectAction: 'None',
                    }, yAxis: {
                        labels: ['1965-1970', '1970-1975', '1975-1980', '1980-1985', '1985-1990',
                            '1990-1995', '1995-2000', '2000-2005', '2005-2010', '2010-2015']
                    }, dataSource: data.renderModeData, paletteSettings: {
                        palette: [{ color: '#C06C84' },
                            { color: '#355C7D' }
                        ],
                    }, renderingMode: 'SVG', cellSettings: {
                        border: {
                            width: 0
                        },
                        showLabel: false,
                        format: '{value} %'
                    }, load: this.load.bind(this), legendSettings: {
                        position: 'Bottom',
                        width: '200px'
                    } },
                    React.createElement(ej2_react_heatmap_1.Inject, { services: [ej2_react_heatmap_1.Legend, ej2_react_heatmap_1.Tooltip] }))),
            React.createElement("div", { className: "col-md-3 property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null, "Rendering Mode:")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", { className: 'row' },
                                        React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: 'svg', checked: true, label: 'SVG', name: 'renderingmode', value: "SVG", change: this.svg.bind(this) })),
                                    React.createElement("div", { className: 'row' },
                                        React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: 'canvas', label: 'Canvas', name: 'renderingmode', value: "Canvas", change: this.canvas.bind(this) })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the net migration rate for the northern European countries over the years. The data label is disabled in this sample, the tooltip displays the data point values.  In property panel, the options are available to change the rendering mode between Canvas and SVG means of radio button.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to change the rendering mode between ",
                    React.createElement("code", null, "Canvas "),
                    " and ",
                    React.createElement("code", null, "SVG "),
                    "types in Heatmap. You can change the rendering mode using the ",
                    React.createElement("code", null, "renderingMode "),
                    " property."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Heatmap component features are segregated into individual feature-wise modules. To use a tooltip, inject the",
                    React.createElement("code", null, "Tooltip "),
                    " module using the ",
                    React.createElement("code", null, "Heatmap.Inject(Tooltip) "),
                    " method, and use a legend by injecting the ",
                    React.createElement("code", null, "Legend "),
                    " module using the ",
                    React.createElement("code", null, "Heatmap.Inject(Legend) "),
                    " method."))));
    };
    RenderMode.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    ;
    return RenderMode;
}(sample_base_1.SampleBase));
exports.RenderMode = RenderMode;
