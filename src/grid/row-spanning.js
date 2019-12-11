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
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var RowSpanning = /** @class */ (function (_super) {
    __extends(RowSpanning, _super);
    function RowSpanning() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.queryCellInfoEvent = function (args) {
            var data = args.data;
            switch (data.EmployeeID) {
                case 10001:
                    if (args.column.field === '9:00' || args.column.field === '2:30') {
                        args.colSpan = 2;
                    }
                    else if (args.column.field === '11:00') {
                        args.colSpan = 3;
                    }
                    else if (args.column.field === '1:00') {
                        args.colSpan = 3;
                        args.rowSpan = 10;
                    }
                    else if (args.column.field === '4:30') {
                        args.colSpan = 2;
                        args.rowSpan = 2;
                    }
                    else if (args.column.field === 'EmployeeName') {
                        args.rowSpan = 2;
                    }
                    break;
                case 10002:
                    if (args.column.field === '9:30') {
                        args.colSpan = 3;
                    }
                    else if (args.column.field === '11:00') {
                        args.colSpan = 4;
                    }
                    else if (args.column.field === '2:30') {
                        args.colSpan = 2;
                        args.rowSpan = 5;
                    }
                    else if (args.column.field === '3:30') {
                        args.colSpan = 2;
                    }
                    break;
                case 10003:
                    if (args.column.field === '9:00') {
                        args.colSpan = 3;
                        args.rowSpan = 2;
                    }
                    else if (args.column.field === '10:30' || args.column.field === '3:30' || args.column.field === '4:30') {
                        args.colSpan = 2;
                    }
                    else if (args.column.field === '11:30') {
                        args.colSpan = 3;
                    }
                    break;
                case 10004:
                    if (args.column.field === '11:00') {
                        args.colSpan = 4;
                    }
                    else if (args.column.field === '4:00') {
                        args.colSpan = 2;
                    }
                    break;
                case 10005:
                    if (args.column.field === '9:00') {
                        args.colSpan = 4;
                    }
                    else if (args.column.field === '11:30') {
                        args.colSpan = 3;
                    }
                    else if (args.column.field === '3:30') {
                        args.colSpan = 2;
                        args.rowSpan = 2;
                    }
                    else if (args.column.field === '4:30') {
                        args.colSpan = 2;
                    }
                    break;
                case 10006:
                    if (args.column.field === '9:00' || args.column.field === '4:30') {
                        args.colSpan = 2;
                    }
                    else if (args.column.field === '10:00') {
                        args.colSpan = 3;
                    }
                    else if (args.column.field === '11:30') {
                        args.colSpan = 3;
                    }
                    break;
                case 10007:
                    if (args.column.field === '9:00' || args.column.field === '10:30' || args.column.field === '3:00') {
                        args.colSpan = 2;
                    }
                    else if (args.column.field === '11:30' || args.column.field === '4:00') {
                        args.colSpan = 3;
                    }
                    break;
                case 10008:
                    if (args.column.field === '9:00' || args.column.field === '10:30') {
                        args.colSpan = 3;
                    }
                    else if (args.column.field === '2:30') {
                        args.colSpan = 3;
                        args.rowSpan = 2;
                    }
                    else if (args.column.field === '4:00') {
                        args.colSpan = 2;
                    }
                    break;
                case 10009:
                    if (args.column.field === '9:00') {
                        args.colSpan = 3;
                    }
                    else if (args.column.field === '11:30') {
                        args.colSpan = 3;
                        args.rowSpan = 2;
                    }
                    else if (args.column.field === '4:30') {
                        args.colSpan = 2;
                    }
                    break;
                case 10010:
                    if (args.column.field === '9:00' || args.column.field === '2:30' || args.column.field === '4:00') {
                        args.colSpan = 3;
                    }
                    else if (args.column.field === '10:30') {
                        args.colSpan = 2;
                    }
                    break;
            }
        };
        return _this;
    }
    RowSpanning.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.columnSpanData, queryCellInfo: this.queryCellInfoEvent.bind(this), allowTextWrap: true, height: 'auto', width: 'auto', gridLines: 'Both' },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'EmployeeID', headerText: 'Employee ID', width: '150', isPrimaryKey: true, textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'EmployeeName', headerText: 'Employee Name', width: '200' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: '9:00', headerText: '9:00 AM', width: '120' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: '9:30', headerText: '9:30 AM', width: '120' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: '10:00', headerText: '10:00 AM', width: '120' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: '10:30', headerText: '10:30 AM', width: '120' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: '11:00', headerText: '11:00 AM', width: '120' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: '11:30', headerText: '11:30 AM', width: '120' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: '12:00', headerText: '12:00 PM', width: '120' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: '12:30', headerText: '12:30 PM', width: '120' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: '1:00', headerText: '1:00 PM', width: '120' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: '1:30', headerText: '1:30 PM', width: '120' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: '2:00', headerText: '2:00 PM', width: '120' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: '2:30', headerText: '2:30 PM', width: '120' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: '3:00', headerText: '3:00 PM', width: '120' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: '3:30', headerText: '3:30 PM', width: '120' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: '4:00', headerText: '4:00 PM', width: '120' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: '4:30', headerText: '4:30 PM', width: '120' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: '5:00', headerText: '5:00 PM', width: '120' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the Grid component with the row spanning feature. In this sample, we have spanned row cells together.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Grid allows to span the row cells. In ",
                    React.createElement("a", { href: 'http://ej2.syncfusion.com/documentation/grid/api-queryCellInfoEventArgs.html?lang=typescript' },
                        React.createElement("code", null, "QueryCellInfo")),
                    "event, you can define the ",
                    React.createElement("code", null, "rowSpan"),
                    " attributes to span the cells."),
                React.createElement("p", null, "In this demo, Davolio cell is spanned to two rows in the EmployeeName column."),
                React.createElement("p", null, "Also Grid supports the spanning of rows and columns for same cells. Lunch Break cell is spanned to ten rows and three columns in the 1:00 column."),
                React.createElement("p", null,
                    "More information on the row drag and drop can be found in this",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation/grid/row#row-spanning" }, "documentation section"),
                    "."))));
    };
    return RowSpanning;
}(sample_base_1.SampleBase));
exports.RowSpanning = RowSpanning;
