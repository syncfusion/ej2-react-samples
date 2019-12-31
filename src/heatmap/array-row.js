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
var sample_base_1 = require("../common/sample-base");
// custom code start
var SAMPLE_CSS = "\n#control-container {\n    padding: 0px !important;\n}\n#source{\n    float: right; margin-right: 10p\n}";
// custom code end
/**
 * Heatmap Array databinding sample
 */
var ArrayRow = (function (_super) {
    __extends(ArrayRow, _super);
    function ArrayRow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.arrayRowData = [
            [9.5, 2.2, 4.2, 8.2, -0.5, 3.2, 5.4, 7.4, 6.2, 1.4],
            [4.3, 8.9, 10.8, 6.5, 5.1, 6.2, 7.6, 7.5, 6.1, 7.6],
            [3.9, 2.7, 2.5, 3.7, 2.6, 5.1, 5.8, 2.9, 4.5, 5.1],
            [2.4, -3.7, 4.1, 6.0, 5.0, 2.4, 3.3, 4.6, 4.3, 2.7],
            [2.0, 7.0, -4.1, 8.9, 2.7, 5.9, 5.6, 1.9, -1.7, 2.9],
            [5.4, 1.1, 6.9, 4.5, 2.9, 3.4, 1.5, -2.8, -4.6, 1.2],
            [-1.3, 3.9, 3.5, 6.6, 5.2, 7.7, 1.4, -3.6, 6.6, 4.3],
            [-1.6, 2.3, 2.9, -2.5, 1.3, 4.9, 10.1, 3.2, 4.8, 2.0],
            [10.8, -1.6, 4.0, 6.0, 7.7, 2.6, 5.6, -2.5, 3.8, -1.9],
            [6.2, 9.8, -1.5, 2.0, -1.5, 4.3, 6.7, 3.8, -1.2, 2.4],
            [1.2, 10.9, 4.0, -1.4, 2.2, 1.6, -2.6, 2.3, 1.7, 2.4],
            [5.1, -2.4, 8.2, -1.1, 3.5, 6.0, -1.3, 7.2, 9.0, 4.2]
        ];
        return _this;
    }
    ArrayRow.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_heatmap_1.HeatMapComponent, { id: 'heatmap-container', titleSettings: {
                        text: 'GDP Growth Rate for Major Economies (in Percentage)',
                        textStyle: {
                            size: '15px',
                            fontWeight: '500',
                            fontStyle: 'Normal',
                            fontFamily: 'Segoe UI'
                        }
                    }, xAxis: {
                        labels: ['China', 'India', 'Australia', 'Mexico', 'Canada', 'Brazil',
                            'USA', 'UK', 'Germany', 'Russia', 'France', 'Japan'],
                        labelRotation: 45,
                        labelIntersectAction: 'None',
                    }, yAxis: {
                        labels: ['2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017']
                    }, paletteSettings: {
                        palette: [{ value: -1, color: '#F0D6AD' },
                            { value: 0, color: '#9da49a' },
                            { value: 3.5, color: '#d7c7a7' },
                            { value: 6.0, color: '#6e888f' },
                            { value: 7.5, color: '#466f86' },
                            { value: 10, color: '#19547B' },
                        ],
                    }, legendSettings: {
                        visible: false
                    }, load: this.load.bind(this), tooltipRender: this.tooltipTemplate, dataSource: this.arrayRowData },
                    React.createElement(ej2_react_heatmap_1.Inject, { services: [ej2_react_heatmap_1.Tooltip] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the GDP growth rate for the countries which are the world\u2019s major economies over the years.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to bind array object as data source for heatmap and configure the Heatmap using the data adaptor support. You can directly bind the array object to the Heatmap data source with default property settings."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null,
                    " ",
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Heatmap component features are segregated into individual feature-wise modules. To use data adaptor support, we need to inject ",
                    React.createElement("code", null, "Adaptor "),
                    " module using ",
                    React.createElement("code", null, "Heatmap.Inject(Adaptor) "),
                    " method and to use a tooltip, inject the ",
                    React.createElement("code", null, "Tooltip "),
                    " module using the ",
                    React.createElement("code", null, "Heatmap.Inject(Tooltip) "),
                    " method."))));
    };
    ArrayRow.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    ;
    ArrayRow.prototype.tooltipTemplate = function (args) {
        args.content = [args.yLabel + ' | ' + args.xLabel + ' : ' + args.value + ' %'];
    };
    ;
    return ArrayRow;
}(sample_base_1.SampleBase));
exports.ArrayRow = ArrayRow;
