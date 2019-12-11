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
var ej2_react_pivotview_1 = require("@syncfusion/ej2-react-pivotview");
var sample_base_1 = require("../common/sample-base");
var ej2_heatmap_1 = require("@syncfusion/ej2-heatmap");
var pivotData = require("./pivot-data/Pivot_Data.json");
require("./pivot-chart.css");
/**
 * PivotView Sample with Selection feature with Heatmap integration.
 */
/* tslint:disable */
var Pivot_Data = pivotData.data;
var dataSourceSettings = {
    enableSorting: true,
    columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
    rows: [{ name: 'Country' }, { name: 'Products' }],
    valueSortSettings: { headerDelimiter: ' - ' },
    dataSource: Pivot_Data,
    expandAll: true,
    values: [{ name: 'Sold', caption: 'Units Sold' }],
    filters: []
};
var Integration = /** @class */ (function (_super) {
    __extends(Integration, _super);
    function Integration() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onInit = true;
        _this.measureList = {};
        _this.xLabels = [];
        _this.yLabels = [];
        _this.jsonDataSource = [];
        return _this;
    }
    Integration.prototype.onDataBound = function () {
        if (this.onInit) {
            this.pivotObj.grid.selectionModule.selectCellsByRange({ cellIndex: 1, rowIndex: 1 }, { cellIndex: 3, rowIndex: 4 });
        }
    };
    Integration.prototype.onSelected = function (args) {
        this.selectedCells = args.selectedCellsInfo;
        if (this.selectedCells && this.selectedCells.length > 0) {
            this.frameSeries();
            this.heatmapUpdate();
        }
    };
    Integration.prototype.frameSeries = function () {
        var columnGroupObject = {};
        this.xLabels = [];
        this.yLabels = [];
        this.jsonDataSource = [];
        for (var _i = 0, _a = this.selectedCells; _i < _a.length; _i++) {
            var cell = _a[_i];
            if (cell.measure !== '') {
                var columnSeries = (this.pivotObj.dataSourceSettings.values.length > 1 && this.measureList[cell.measure]) ?
                    (cell.columnHeaders.toString() + ' ~ ' + this.measureList[cell.measure]) : cell.columnHeaders.toString();
                columnSeries = columnSeries == '' && cell.measure != '' ? 'Grand Total' : columnSeries;
                var rHeaders = cell.rowHeaders == '' && cell.currentCell.axis != 'column' ? 'Grand Total' : cell.rowHeaders.toString();
                if (columnGroupObject[columnSeries]) {
                    columnGroupObject[columnSeries].push({ x: rHeaders.toString(), y: Number(cell.value) });
                }
                else {
                    columnGroupObject[columnSeries] = [{ x: rHeaders.toString(), y: Number(cell.value) }];
                    this.yLabels.push(columnSeries);
                }
                if (this.xLabels.indexOf(rHeaders.toString()) == -1) {
                    this.xLabels.push(rHeaders.toString());
                }
            }
        }
        var _loop_1 = function (xcnt) {
            var xName = this_1.xLabels[xcnt];
            var row = { 'xMember': xName };
            for (var ycnt = 0; ycnt < this_1.yLabels.length; ycnt++) {
                var YName = this_1.yLabels[ycnt];
                var col = columnGroupObject[YName].filter(function (item) { return item.x == xName; });
                row[YName] = col.length > 0 ? col[0].y : '';
            }
            this_1.jsonDataSource.push(row);
        };
        var this_1 = this;
        for (var xcnt = 0; xcnt < this.xLabels.length; xcnt++) {
            _loop_1(xcnt);
        }
    };
    Integration.prototype.heatmapUpdate = function () {
        if (this.onInit) {
            this.onInit = false;
            ej2_heatmap_1.HeatMap.Inject(ej2_heatmap_1.Adaptor, ej2_heatmap_1.Legend, ej2_heatmap_1.Tooltip);
            this.heatmap = new ej2_heatmap_1.HeatMap({
                titleSettings: {
                    text: 'Sales Analysis'
                },
                legendSettings: {
                    position: 'Top'
                },
                xAxis: {
                    title: { text: this.pivotObj.dataSourceSettings.rows.map(function (args) { return args.caption || args.name; }).join(' ~ ') },
                    labels: this.xLabels,
                    labelRotation: 315
                },
                yAxis: {
                    title: { text: this.pivotObj.dataSourceSettings.values.map(function (args) { return args.caption || args.name; }).join(' ~ ') },
                    labels: this.yLabels,
                },
                dataSource: this.jsonDataSource,
                dataSourceSettings: {
                    isJsonData: true,
                    adaptorType: 'Table',
                    xDataMapping: 'xMember',
                },
                load: function (args) {
                    var selectedTheme = location.hash.split('/')[1];
                    selectedTheme = selectedTheme ? selectedTheme : 'Material';
                    args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
                },
            }, '#heatmap');
        }
        else {
            this.heatmap.dataSource = this.jsonDataSource;
            this.heatmap.xAxis = {
                title: { text: this.pivotObj.dataSourceSettings.rows.map(function (args) { return args.caption || args.name; }).join(' ~ ') },
                labels: this.xLabels,
                labelRotation: 315
            };
            this.heatmap.yAxis = {
                title: { text: this.pivotObj.dataSourceSettings.values.map(function (args) { return args.caption || args.name; }).join(' ~ ') },
                labels: this.yLabels
            };
            this.heatmap.refresh();
        }
    };
    Integration.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'col-lg-12 control-section', style: { overflow: 'auto' } },
                React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView', ref: function (d) { return _this.pivotObj = d; }, dataSourceSettings: dataSourceSettings, width: '100%', height: '300', dataBound: this.onDataBound.bind(this), cellSelected: this.onSelected.bind(this), gridSettings: {
                        columnWidth: 120, allowSelection: true,
                        selectionSettings: { mode: 'Cell', type: 'Multiple', cellSelectionMode: 'Box' }
                    } }),
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("div", { id: "heatmap", style: { height: '450px' } })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates rendering Heatmap control by providing desired data from a pivot table on selection. Not only Heatmap, but any other control (including third party) can be used for this purpose.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this sample, the cell selection feature is enabled with the api ",
                    React.createElement("code", null, "allowSelection"),
                    " property and its type and mode are configured using the",
                    React.createElement("code", null, "selectionSettings"),
                    " property. The ",
                    React.createElement("code", null, "cellSelected"),
                    " event gets fired on every selection operation performed in the pivot table. This event returns the selected cell information, like row header name, column header name, measure name, and value. Based on this information, the heatmap will be plotted."))));
    };
    return Integration;
}(sample_base_1.SampleBase));
exports.Integration = Integration;
