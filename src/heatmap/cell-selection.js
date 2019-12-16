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
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
// custom code start
var SAMPLE_CSS = "\n#control-container {\n    padding: 0px !important;\n}\n#source{\n    float: right; margin-right: 10p\n}";
// custom code end
/**
 * Heatmap CellSelection sample
 */
var CellSelection = /** @class */ (function (_super) {
    __extends(CellSelection, _super);
    function CellSelection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CellSelection.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("div", { className: 'col-md-9 control-section' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement(ej2_react_heatmap_1.HeatMapComponent, { id: 'heatmap-container', style: { height: '300px' }, ref: function (t) { return _this.heatmap = t; }, titleSettings: {
                        text: 'Top export products 2014-2018, Value in USD million'
                    }, xAxis: {
                        labels: ['Cereals', 'Meat', 'Spices', 'Tea', 'Edible Oil', 'Dairy Products', 'Wheat'],
                    }, yAxis: {
                        labels: ['2014', '2015', '2016', '2017', '2018']
                    }, dataSource: data.cellSelectionData, allowSelection: true, showTooltip: true, load: this.loads.bind(this), cellSelected: this.cellSelected.bind(this), paletteSettings: {
                        palette: [
                            { color: '#3C5E62 ' },
                            { color: '#86C843 ' }
                        ],
                    } },
                    React.createElement(ej2_react_heatmap_1.Inject, { services: [ej2_react_heatmap_1.Tooltip] })),
                React.createElement(ej2_react_charts_1.ChartComponent, { id: "container1", style: { height: '300px' }, ref: function (t) { return _this.chart = t; }, primaryXAxis: { valueType: 'Category', interval: 1, majorGridLines: { width: 0 } }, chartArea: { border: { width: 0 } }, primaryYAxis: {
                        majorGridLines: { width: 0 },
                        majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' }
                    }, series: data.chartData, load: this.load.bind(this), tooltip: {
                        enable: true
                    } },
                    React.createElement(ej2_react_heatmap_1.Inject, { services: [ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Legend, ej2_react_charts_1.DataLabel, ej2_react_charts_1.Category, ej2_react_charts_1.Tooltip] })),
                React.createElement("div", { id: "source" },
                    "Source:",
                    React.createElement("a", { href: "https://en.wikipedia.org/wiki/List_of_countries_by_oil_production", target: "_blank" }, "https://en.wikipedia.org/ "))),
            React.createElement("div", { className: "col-md-3 property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "clearSelection", onClick: this.Change.bind(this) }, "Clear Selection")))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the revenue from the top exported products between the year 2014 and 2018, valued in USD million")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to selected the cell in heat map and render the column chart based on selected data."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Heatmap component features are segregated into individual feature-wise modules. To use a tooltip, inject the ",
                    React.createElement("code", null, "Tooltip"),
                    " module using the ",
                    React.createElement("code", null, "Heatmap.Inject(Tooltip)"),
                    " method, and use a legend by injecting the ",
                    React.createElement("code", null, "Legend"),
                    " module using the",
                    React.createElement("code", null, "Heatmap.Inject(Legend)"),
                    " method."))));
    };
    CellSelection.prototype.cellSelected = function (args) {
        var data = args.data;
        var length = data.length;
        var xAxis = [];
        var flag = [];
        var series = [];
        var i;
        var columnData = {};
        for (i = 0; i < length; i++) {
            if (xAxis.indexOf(data[i].xLabel) === -1) {
                xAxis.push(data[i].xLabel);
                flag.push(false);
            }
        }
        for (i = 0; i < length; i++) {
            var index = xAxis.indexOf(data[i].xLabel);
            if (!flag[index]) {
                flag[index] = true;
                var column = {};
                column.type = 'Column';
                column.xName = 'x';
                column.yName = 'y';
                column.width = 2;
                column.name = data[i].xLabel;
                column.marker = { dataLabel: { visible: false } };
                column.dataSource = [];
                columnData = {};
                columnData.x = data[i].yLabel;
                columnData.y = data[i].value;
                column.dataSource.push(columnData);
                series.push(column);
            }
            else {
                columnData = {};
                columnData.x = data[i].yLabel;
                columnData.y = data[i].value;
                series[index].dataSource.push(columnData);
            }
        }
        this.chart.series = series;
        this.chart.refresh();
    };
    ;
    CellSelection.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    CellSelection.prototype.loads = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    ;
    CellSelection.prototype.Change = function (args) {
        this.heatmap.clearSelection();
        this.chart.series = data.chartData;
        this.chart.refresh();
    };
    ;
    return CellSelection;
}(sample_base_1.SampleBase));
exports.CellSelection = CellSelection;
