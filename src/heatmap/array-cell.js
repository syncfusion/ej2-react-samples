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
var sample_base_1 = require("../common/sample-base");
// custom code start
var SAMPLE_CSS = "\n#control-container {\n    padding: 0px !important;\n}\n#source{\n    float: right; margin-right: 10p\n}";
// custom code end
/**
 * Heatmap Array data binding sample
 */
var ArrayCell = (function (_super) {
    __extends(ArrayCell, _super);
    function ArrayCell() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.arrayCellData = [
            [0, 0, 10.75], [0, 1, 14.5], [0, 2, 25.5], [0, 3, 39.5], [0, 4, 59.75], [0, 5, 35.50], [0, 6, 75.5],
            [1, 0, 20.75], [1, 1, 35.5], [1, 2, 29.5], [1, 3, 75.5], [1, 4, 80], [1, 5, 65], [1, 6, 85],
            [2, 0, 6], [2, 1, 18.5], [2, 2, 30.05], [2, 3, 35.5], [2, 4, 40.75], [2, 5, 50.75], [2, 6, 65],
            [3, 0, 30.5], [3, 1, 20.5], [3, 2, 45.30], [3, 3, 50], [3, 4, 55], [3, 5, 85.80], [3, 6, 87.5],
            [4, 0, 10.5], [4, 1, 20.75], [4, 2, 35.5], [4, 3, 35.5], [4, 4, 45.5], [4, 5, 65.], [4, 6, 75.5],
            [5, 0, 45.5], [5, 1, 20.75], [5, 2, 45.5], [5, 3, 50.75], [5, 4, 79.30], [5, 5, 84.20], [5, 6, 87.36],
            [6, 0, 26.82], [6, 1, 70], [6, 2, 75], [6, 3, 79.5], [6, 4, 88.5], [6, 5, 89.5], [6, 6, 91.75],
            [7, 0, 15.75], [7, 1, 20.75], [7, 2, 25.5], [7, 3, 42.35], [7, 4, 45.15], [7, 5, 76.5], [7, 6, 80.5],
            [8, 0, 1.98], [8, 1, 15.23], [8, 2, 43], [8, 3, 49], [8, 4, 63.80], [8, 5, 67.97], [8, 6, 70.52],
            [9, 0, 14.31], [9, 1, 42.87], [9, 2, 77.28], [9, 3, 77.82], [9, 4, 81.44], [9, 5, 81.92], [9, 6, 83.75],
            [10, 0, 25.5], [10, 1, 35.5], [10, 2, 40.5], [10, 3, 45.05], [10, 4, 50.5], [10, 5, 75.5], [10, 6, 90.58]
        ];
        return _this;
    }
    ArrayCell.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_heatmap_1.HeatMapComponent, { id: 'heatmap-container', titleSettings: {
                        text: 'Percentage of Individuals Using Internet by Country',
                        textStyle: {
                            size: '15px',
                            fontWeight: '500',
                            fontStyle: 'Normal',
                            fontFamily: 'Segoe UI'
                        }
                    }, xAxis: {
                        labels: ['China', 'Australia', 'Mexico', 'Canada', 'Brazil', 'USA',
                            'UK', 'Germany', 'Russia', 'France', 'Japan'],
                    }, yAxis: {
                        labels: ['2000', '2005', '2010', '2011', '2012', '2013', '2014'],
                    }, dataSource: this.arrayCellData, dataSourceSettings: {
                        isJsonData: false,
                        adaptorType: 'Cell'
                    }, cellSettings: {
                        border: {
                            width: 0,
                        },
                        textStyle: {
                            color: 'white'
                        },
                        format: '{value} %'
                    }, paletteSettings: {
                        palette: [{ color: '#3498DB' },
                            { color: '#2C3E50' }
                        ]
                    }, legendSettings: {
                        visible: false,
                    }, load: this.load.bind(this), tooltipRender: this.tooltipTemplate },
                    React.createElement(ej2_react_heatmap_1.Inject, { services: [ej2_react_heatmap_2.Adaptor, ej2_react_heatmap_1.Tooltip] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the percentage growth rate of individuals using the internet in a country compared to the overall population to the country.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to bind two-dimensional array object as datasource for heatmap and configure the Heatmap using the data adaptor support."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Heatmap component features are segregated into individual feature-wise modules. To use data adaptor support, we need to inject ",
                    React.createElement("code", null, "Adaptor "),
                    "module using ",
                    React.createElement("code", null, "Heatmap.Inject(Adaptor) "),
                    " method and to use a tooltip, inject the ",
                    React.createElement("code", null, "Tooltip "),
                    " module using the ",
                    React.createElement("code", null, "Heatmap.Inject(Tooltip) "),
                    " method."))));
    };
    ArrayCell.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    ;
    ArrayCell.prototype.tooltipTemplate = function (args) {
        args.content = [args.yLabel + ' | ' + args.xLabel + ' : ' + args.value + ' %'];
    };
    ;
    return ArrayCell;
}(sample_base_1.SampleBase));
exports.ArrayCell = ArrayCell;
