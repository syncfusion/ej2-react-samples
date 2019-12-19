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
// custom code start
var SAMPLE_CSS = "\n#control-container {\n    padding: 0px !important;\n}";
// custom code end
/**
 * Schedule Default sample
 */
var EmptyPoints = (function (_super) {
    __extends(EmptyPoints, _super);
    function EmptyPoints() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmptyPoints.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_heatmap_1.HeatMapComponent, { id: 'heatmap-container', titleSettings: {
                        text: 'Deffective Count per 1000 Products from a Manufacturing Unit',
                        textStyle: {
                            size: '15px',
                            fontWeight: '500',
                            fontStyle: 'Normal',
                            fontFamily: 'Segoe UI'
                        }
                    }, xAxis: {
                        labels: ['2007', '2008', '2009', '2010', '2011',
                            '2012', '2013', '2014', '2015', '2016', '2017'],
                    }, yAxis: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May',
                            'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
                    }, dataSource: data.emptyPointDataSource, cellSettings: {
                        showLabel: true,
                        border: { width: 0, color: 'white' },
                    }, tooltipRender: this.tooltipTemplate, paletteSettings: {
                        palette: [{ color: 'rgb(172, 213, 242)' },
                            { color: 'rgb(127, 168, 201)' },
                            { color: 'rgb(82, 123, 160)' },
                            { color: 'rgb(37, 78, 119)' },
                        ],
                        type: 'Gradient'
                    }, load: this.load.bind(this), legendSettings: {
                        position: 'Bottom',
                        width: '250px',
                        showLabel: true,
                    } },
                    React.createElement(ej2_react_heatmap_1.Inject, { services: [ej2_react_heatmap_1.Legend, ej2_react_heatmap_1.Tooltip] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the number of deffective product count per 1000 units coming out from a manufacturing unit Data points are enhanced with labels and tooltip. Some data points were not marked with any values which indicates there are no deffective products and these data points are termed as empty points.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render empty points in the Heatmap. The empty points or the points with no data can be marked using ",
                    React.createElement("code", null, "null"),
                    " in the data source. You can also customize the background color of the empty points by using the ",
                    React.createElement("code", null, "emptyPointColor"),
                    " property in ",
                    React.createElement("code", null, "paletteSettings")),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Heatmap component features are segregated into individual feature-wise modules. To use a tooltip, inject the",
                    React.createElement("code", null, "Tooltip "),
                    "  module using the ",
                    React.createElement("code", null, "Heatmap.Inject(Tooltip) "),
                    " method, and use a legend by injecting the ",
                    React.createElement("code", null, "Legend "),
                    "  module using the ",
                    React.createElement("code", null, "Heatmap.Inject(Legend) "),
                    "  method."))));
    };
    EmptyPoints.prototype.tooltipTemplate = function (args) {
        args.content = [args.yLabel + ' | ' + args.xLabel + ' : ' + args.value + ' deffective units'];
    };
    ;
    EmptyPoints.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    ;
    return EmptyPoints;
}(sample_base_1.SampleBase));
exports.EmptyPoints = EmptyPoints;
