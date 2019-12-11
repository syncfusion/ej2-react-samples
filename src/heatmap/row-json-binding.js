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
 * Heatmap JSON data binding sample
 */
var JsonRow = /** @class */ (function (_super) {
    __extends(JsonRow, _super);
    function JsonRow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.jsonTableData = [
            { 'Region': 'USA', '2000': 93, '2004': 101, '2008': 112, '2012': 103, '2016': 121 },
            { 'Region': 'GBR', '2000': 28, '2004': 30, '2008': 49, '2012': 65, '2016': 67 },
            { 'Region': 'China', '2000': 58, '2004': 63, '2008': 100, '2012': 91, '2016': 70 },
            { 'Region': 'Russia', '2000': 89, '2004': 90, '2008': 60, '2012': 69, '2016': 55 },
            { 'Region': 'Germany', '2000': 56, '2004': 49, '2008': 41, '2012': 44, '2016': 42 },
            { 'Region': 'Japan', '2000': 18, '2004': 37, '2008': 25, '2012': 38, '2016': 41 },
            { 'Region': 'France', '2000': 38, '2004': 33, '2008': 43, '2012': 35, '2016': 42 },
            { 'Region': 'KOR', '2000': 28, '2004': 30, '2008': 32, '2012': 30, '2016': 21 },
            { 'Region': 'Italy', '2000': 34, '2004': 32, '2008': 27, '2012': 28, '2016': 28 }
        ];
        return _this;
    }
    JsonRow.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_heatmap_1.HeatMapComponent, { id: 'heatmap-container', titleSettings: {
                        text: 'Olympic Medal Achievements of most Successful Countries',
                        textStyle: {
                            size: '15px',
                            fontWeight: '500',
                            fontStyle: 'Normal',
                            fontFamily: 'Segoe UI'
                        }
                    }, xAxis: {
                        labels: ['China', 'France', 'GBR', 'Germany', 'Italy', 'Japan', 'KOR', 'Russia', 'USA'],
                        labelRotation: 45,
                        labelIntersectAction: 'None',
                    }, yAxis: {
                        title: { text: 'Olympic Year' },
                        labels: ['2000', '2004', '2008', '2012', '2016'],
                    }, dataSource: this.jsonTableData, dataSourceSettings: {
                        isJsonData: true,
                        adaptorType: 'Table',
                        xDataMapping: 'Region',
                    }, paletteSettings: {
                        palette: [{ color: '#F0C27B' },
                            { color: '#4B1248' }
                        ]
                    }, cellSettings: {
                        border: {
                            width: 1,
                            radius: 4,
                            color: 'white'
                        }
                    }, load: this.load.bind(this), tooltipRender: this.tooltipTemplate },
                    React.createElement(ej2_react_heatmap_1.Inject, { services: [ej2_react_heatmap_1.Legend, ej2_react_heatmap_1.Tooltip, ej2_react_heatmap_2.Adaptor] }))),
            React.createElement("div", { id: "source" },
                "Source:",
                React.createElement("a", { href: "https://en.wikipedia.org/wiki/2016_Summer_Olympics_medal_table", target: "_blank" }, "https://en.wikipedia.org/")),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the overall Olympic medals won by the countries in all the summer Olympic events from the year 2000 to 2016.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to bind JSON data and configure the Heatmap using the data adaptor support. You can bind the JSON data with information for each row to the Heatmap using ",
                    React.createElement("code", null, "isJsonData"),
                    " and by defining the ",
                    React.createElement("code", null, "adaptorType"),
                    " properties. In row JSON data, the row header is mapped using the",
                    React.createElement("code", null, "xDataMapping"),
                    "."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null,
                    " ",
                    React.createElement("strong", null, "Injecting Module")),
                React.createElement("p", null,
                    "Heatmap component features are segregated into individual feature-wise modules. To use data adaptor support, we need to inject ",
                    React.createElement("code", null, "Adaptor"),
                    " module using ",
                    React.createElement("code", null, "Heatmap.Inject(Adaptor)"),
                    " method, to use a tooltip, inject the ",
                    React.createElement("code", null, "Tooltip"),
                    " module using the ",
                    React.createElement("code", null, "Heatmap.Inject(Tooltip)"),
                    " method, and use a legend by injecting the ",
                    React.createElement("code", null, "Legend"),
                    " module using the ",
                    React.createElement("code", null, "Heatmap.Inject(Legend)"),
                    " method."))));
    };
    JsonRow.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    ;
    JsonRow.prototype.tooltipTemplate = function (args) {
        args.content = [args.yLabel + ' | ' + args.xLabel + ' : ' + args.value + ' medals'];
    };
    ;
    return JsonRow;
}(sample_base_1.SampleBase));
exports.JsonRow = JsonRow;
