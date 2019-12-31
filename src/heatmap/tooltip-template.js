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
var ej2_react_heatmap_2 = require("@syncfusion/ej2-react-heatmap");
var data = require("./data.json");
var sample_base_1 = require("../common/sample-base");
// custom code start
var SAMPLE_CSS = "\n#control-container {\n    padding: 0px !important;\n}\n#source{\n    float: right; margin-right: 10p\n}";
// custom code end
/**
 * Heatmap Tooltip Template sample
 */
var TooltipTemplate = (function (_super) {
    __extends(TooltipTemplate, _super);
    function TooltipTemplate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TooltipTemplate.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_heatmap_1.HeatMapComponent, { id: 'heatmap-container', titleSettings: {
                        text: 'Crude Oil Production of Non-OPEC Countries (in Million barrels per day)',
                        textStyle: {
                            size: '15px',
                            fontWeight: '500',
                            fontStyle: 'Normal',
                            fontFamily: 'Segoe UI'
                        }
                    }, xAxis: {
                        labels: ['Canada', 'China', 'Egypt', 'Mexico', 'Norway', 'Russia', 'UK', 'USA'],
                        labelRotation: 45,
                        labelIntersectAction: 'None',
                    }, yAxis: {
                        labels: ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010'],
                    }, dataSource: data.defaultTableDataSource, cellSettings: {
                        border: {
                            width: 0
                        },
                        format: '{value} M'
                    }, legendSettings: {
                        visible: false,
                    }, tooltipSettings: {
                        fill: '#265259',
                        textStyle: {
                            color: '#FFFFFF',
                            size: "12px"
                        },
                        border: {
                            width: 1,
                            color: "#98BABF"
                        }
                    }, paletteSettings: {
                        palette: [{ value: 0, color: '#C2E7EC' },
                            { value: 0.6, color: '#AEDFE6' },
                            { value: 0.75, color: '#9AD7E0' },
                            { value: 1, color: '#86CFDA' },
                            { value: 1.5, color: '#72C7D4' },
                            { value: 2, color: '#5EBFCE' },
                            { value: 2.5, color: '#4AB7C8' },
                            { value: 3, color: '#36AFC2' },
                            { value: 3.5, color: '#309DAE' },
                            { value: 5, color: '#2B8C9B' },
                            { value: 5.5, color: '#257A87' },
                            { value: 6, color: '#206974' },
                            { value: 8, color: '#1B5761' },
                            { value: 9, color: '#15464D' },
                            { value: 9.5, color: '#000000' },
                        ],
                        type: 'Fixed'
                    }, load: this.load.bind(this), tooltipRender: this.tooltipTemplate },
                    React.createElement(ej2_react_heatmap_2.Inject, { services: [ej2_react_heatmap_1.Legend, ej2_react_heatmap_1.Tooltip] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the crude oil production of the non-OPEC countries over the years. The data point values displayed are in million barrels per day units.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to customize the tooltip content in Heatmap. You can customize the tooltip content by using the ",
                    React.createElement("code", null, "tooltipRender "),
                    " event."),
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
    TooltipTemplate.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    ;
    TooltipTemplate.prototype.tooltipTemplate = function (args) {
        args.content = ['In ' + args.yLabel + ', the ' + args.xLabel + ' produced ' + args.value + ' million barrels per day'];
    };
    ;
    return TooltipTemplate;
}(sample_base_1.SampleBase));
exports.TooltipTemplate = TooltipTemplate;
