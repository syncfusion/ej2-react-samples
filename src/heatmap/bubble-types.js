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
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
// custom code start
var SAMPLE_CSS = "\n#control-container {\n    padding: 0px !important;\n}\n#source{\n    float: right; margin-right: 10p\n}";
// custom code end
/**
 * Schedule Default sample
 */
var BubbleTypes = (function (_super) {
    __extends(BubbleTypes, _super);
    function BubbleTypes() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.droplist = [
            { value: 'Size' },
            { value: 'Color' },
            { value: 'Sector' }
        ];
        return _this;
    }
    BubbleTypes.prototype.change = function (e) {
        var type = document.getElementById('LegendPosition');
        this.heatmap.cellSettings.bubbleType = type.value;
        this.heatmap.refresh();
    };
    BubbleTypes.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("div", { className: 'col-md-9 control-section' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement(ej2_react_heatmap_1.HeatMapComponent, { id: 'heatmap-container', ref: function (t) { return _this.heatmap = t; }, titleSettings: {
                        text: 'Female Participation Rate in Labor Force for the Countries',
                        textStyle: {
                            size: '15px',
                            fontWeight: '500',
                            fontStyle: 'Normal',
                            fontFamily: 'Segoe UI'
                        }
                    }, xAxis: {
                        labels: ['Singapore', 'Spain', 'Australia', 'Germany', 'Belgium', 'USA', 'France', 'UK'],
                        labelRotation: 45,
                        labelIntersectAction: 'None'
                    }, yAxis: {
                        labels: ['1995', '2000', '2005', '2010', '2015']
                    }, dataSource: data.tableBubbleData, cellSettings: {
                        border: {
                            width: 1
                        },
                        showLabel: false,
                        tileType: 'Bubble',
                        bubbleType: 'Size'
                    }, tooltipRender: this.legendTooltip, paletteSettings: {
                        palette: [{ value: 35, color: '#50A3B1' },
                            { value: 45, color: '#78D1BD' },
                            { value: 55, color: '#CAE8B4' },
                            { value: 65, color: '#EDF8B6' },
                            { value: 78, color: '#FFFFDA' }
                        ],
                    }, load: this.load.bind(this), legendSettings: {
                        visible: true,
                    } },
                    React.createElement(ej2_react_heatmap_1.Inject, { services: [ej2_react_heatmap_1.Legend, ej2_react_heatmap_1.Tooltip] })),
                React.createElement("div", { id: "source" },
                    "Source:",
                    React.createElement("a", { href: "https://data.worldbank.org", target: '_blank' }, "https://data.worldbank.org/"))),
            React.createElement("div", { className: "col-md-3 property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null, "Bubble Type:")),
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "LegendPosition", change: this.change.bind(this), ref: function (d) { return _this.dropElement = d; }, dataSource: this.droplist, fields: { text: 'value', value: 'value' }, text: "Size", value: "Size" })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the female participation rate of the total female population in the country\u2019s work force. In Bubble Heatmap, the data points can be visualized using bubble size, bubble shade and sector view types. In property panel, the options are available to change the view of the data points in the bubble Heatmap by means of dropdown.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to display the data points in bubble heatmap using multiple views such as bubble size, bubble shade and the sector. You can change the cell type to bubble by using the ",
                    React.createElement("code", null, "tileType"),
                    " property in ",
                    React.createElement("code", null, "cellSettings"),
                    ", and you can change the view of the bubble heatmap by using the bubbleType property in cellSettings."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Heatmap component features are segregated into individual feature-wise modules. To use a tooltip, inject the ",
                    React.createElement("code", null, "Tooltip "),
                    "  module using the ",
                    React.createElement("code", null, "Heatmap.Inject(Tooltip) "),
                    " method, and use a legend by injecting the ",
                    React.createElement("code", null, "Legend "),
                    "  module using the ",
                    React.createElement("code", null, "Heatmap.Inject(Legend) "),
                    "  method."))));
    };
    BubbleTypes.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    ;
    BubbleTypes.prototype.legendTooltip = function (args) {
        args.content = [args.xLabel + ' | ' + args.yLabel + ' : ' + args.value + ' %'];
    };
    ;
    return BubbleTypes;
}(sample_base_1.SampleBase));
exports.BubbleTypes = BubbleTypes;
