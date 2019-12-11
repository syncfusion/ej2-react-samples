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
/**
 * Sample for sparkline in grid
 */
var React = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_source_1 = require("./data-source");
var sample_base_1 = require("../common/sample-base");
ej2_base_1.enableRipple(true);
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var SparkGrid = /** @class */ (function (_super) {
    __extends(SparkGrid, _super);
    function SparkGrid() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // custom code end
        _this.lineData = [
            [0, 6, 4, 1, 3, 2, 5],
            [5, 4, 6, 3, 1, 2, 0],
            [6, 4, 0, 3, 2, 5, 1],
            [4, 6, 3, 0, 1, 2, 5],
            [3, 5, 6, 4, 0, 1, 2],
            [1, 3, 4, 2, 5, 0, 6],
            [2, 4, 0, 3, 5, 6, 1],
            [5, 4, 6, 3, 1, 2, 0],
            [0, 6, 4, 1, 3, 2, 5],
            [6, 4, 0, 3, 2, 5, 1],
            [4, 6, 3, 0, 1, 2, 5],
            [3, 5, 6, 4, 0, 1, 2],
            [1, 3, 4, 2, 5, 0, 6],
            [2, 4, 0, 3, 5, 6, 1],
            [5, 4, 6, 3, 1, 2, 0],
            [0, 6, 4, 1, 3, 2, 5],
            [6, 4, 0, 3, 2, 5, 1],
            [4, 6, 3, 0, 1, 2, 5],
            [2, 4, 0, 3, 5, 6, 1],
            [3, 5, 6, 4, 0, 1, 2],
            [1, 3, 4, 2, 5, 0, 6]
        ];
        _this.columnData = [
            [0, 6, -4, 1, -3, 2, 5],
            [5, -4, 6, 3, -1, 2, 0],
            [6, 4, 0, 3, -2, 5, 1],
            [4, -6, 3, 0, 1, -2, 5],
            [3, 5, -6, -4, 0, 1, 2],
            [1, -3, 4, -2, 5, 0, 6],
            [2, 4, 0, -3, 5, -6, 1],
            [5, 4, -6, 3, 1, -2, 0],
            [0, -6, 4, 1, -3, 2, 5],
            [6, 4, 0, -3, 2, -5, 1],
            [4, 6, -3, 0, 1, 2, 5],
            [3, -5, -6, 4, 0, 1, 2],
            [1, 3, -4, -2, 5, 0, 6],
            [2, -4, 0, -3, 5, 6, 1],
            [5, 4, -6, 3, 1, -2, 0],
            [0, 6, 4, -1, -3, 2, 5],
            [6, -4, 0, -3, 2, 5, 1],
            [4, 6, -3, 0, -1, 2, 5],
            [6, 4, 0, -3, 2, -5, 1],
            [3, 5, 6, -4, 0, 1, 2],
            [1, 3, -4, 2, -5, 0, 6]
        ];
        _this.getSparkData = function (type, count) {
            if (type === 'line') {
                return _this.lineData[count];
            }
            else {
                return _this.columnData[count];
            }
        };
        return _this;
    }
    // custom code start
    SparkGrid.prototype.load = function (args) {
        var theme = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.sparkline.theme = (theme.charAt(0).toUpperCase() + theme.slice(1));
    };
    SparkGrid.prototype.renderSparkline = function () {
        var _this = this;
        setTimeout(function () {
            for (var i = 1; i < 21; i++) {
                var line = new ej2_react_charts_1.SparklineComponent({
                    height: '50px',
                    width: '150px',
                    lineWidth: 2,
                    valueType: 'Numeric',
                    fill: '#3C78EF',
                    dataSource: _this.getSparkData('line', i)
                });
                line.appendTo('#spkline' + i);
                var column = new ej2_react_charts_1.SparklineComponent({
                    height: '50px',
                    width: '150px',
                    type: 'Column',
                    valueType: 'Numeric',
                    fill: '#3C78EF',
                    negativePointColor: '#f7a816',
                    dataSource: _this.getSparkData('column', i)
                });
                column.appendTo('#spkarea' + i);
                var winloss = new ej2_react_charts_1.SparklineComponent({
                    height: '50px',
                    width: '150px',
                    type: 'WinLoss',
                    valueType: 'Numeric',
                    fill: '#3C78EF',
                    tiePointColor: 'darkgray',
                    negativePointColor: '#f7a816',
                    dataSource: _this.getSparkData('column', i)
                });
                winloss.appendTo('#spkwl' + i);
            }
            // tslint:disable-next-line:align 
        }, 500);
    };
    SparkGrid.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_source_1.orderdata, resizing: this.renderSparkline.bind(this), load: this.renderSparkline.bind(this), allowSelection: false, enableHover: true, height: '400' },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'EmployeeID', headerText: 'ID', textAlign: 'Right', width: '40' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerID', headerText: 'Name', width: '60' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', width: '65', format: 'yMd', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '70' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { headerText: 'Tax per annum', template: function (props) {
                                return (React.createElement("div", { id: "spkline" + props.EmployeeID }));
                            }, textAlign: 'Center', width: '100' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { headerText: 'One Day Index', template: function (props) {
                                return (React.createElement("div", { id: "spkarea" + props.EmployeeID }));
                            }, textAlign: 'Center', width: '100' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { headerText: 'Year GR', template: function (props) {
                                return (React.createElement("div", { id: "spkwl" + props.EmployeeID }));
                            }, textAlign: 'Center', width: '100' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates rendering sparklines in data grid control.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render sparkline inside the data grid control."))));
    };
    return SparkGrid;
}(sample_base_1.SampleBase));
exports.SparkGrid = SparkGrid;
