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
var ColumnSpanning = (function (_super) {
    __extends(ColumnSpanning, _super);
    function ColumnSpanning() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.queryCellInfoEvent = function (args) {
            var data = args.data;
            switch (data.EmployeeID) {
                case 10001:
                    if (args.column.field === '9:00' || args.column.field === '2:30' || args.column.field === '4:30') {
                        args.colSpan = 2;
                    }
                    else if (args.column.field === '11:00') {
                        args.colSpan = 3;
                    }
                    break;
                case 10002:
                    if (args.column.field === '9:30' || args.column.field === '2:30' ||
                        args.column.field === '4:30') {
                        args.colSpan = 3;
                    }
                    else if (args.column.field === '11:00') {
                        args.colSpan = 4;
                    }
                    break;
                case 10003:
                    if (args.column.field === '9:00' || args.column.field === '11:30') {
                        args.colSpan = 3;
                    }
                    else if (args.column.field === '10:30' || args.column.field === '3:30' ||
                        args.column.field === '4:30' || args.column.field === '2:30') {
                        args.colSpan = 2;
                    }
                    break;
                case 10004:
                    if (args.column.field === '9:00') {
                        args.colSpan = 3;
                    }
                    else if (args.column.field === '11:00') {
                        args.colSpan = 4;
                    }
                    else if (args.column.field === '4:00' || args.column.field === '2:30') {
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
                    else if (args.column.field === '3:30' || args.column.field === '4:30' || args.column.field === '2:30') {
                        args.colSpan = 2;
                    }
                    break;
                case 10006:
                    if (args.column.field === '9:00' || args.column.field === '4:30' ||
                        args.column.field === '2:30' || args.column.field === '3:30') {
                        args.colSpan = 2;
                    }
                    else if (args.column.field === '10:00' || args.column.field === '11:30') {
                        args.colSpan = 3;
                    }
                    break;
                case 10007:
                    if (args.column.field === '9:00' || args.column.field === '3:00' || args.column.field === '10:30') {
                        args.colSpan = 2;
                    }
                    else if (args.column.field === '11:30' || args.column.field === '4:00') {
                        args.colSpan = 3;
                    }
                    break;
                case 10008:
                    if (args.column.field === '9:00' || args.column.field === '10:30' || args.column.field === '2:30') {
                        args.colSpan = 3;
                    }
                    else if (args.column.field === '4:00') {
                        args.colSpan = 2;
                    }
                    break;
                case 10009:
                    if (args.column.field === '9:00' || args.column.field === '11:30') {
                        args.colSpan = 3;
                    }
                    else if (args.column.field === '4:30' || args.column.field === '2:30') {
                        args.colSpan = 2;
                    }
                    break;
                case 100010:
                    if (args.column.field === '9:00' || args.column.field === '2:30' ||
                        args.column.field === '4:00' || args.column.field === '11:30') {
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
    ColumnSpanning.prototype.render = function () {
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
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: '2:30', headerText: '2:30 PM', width: '120' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: '3:00', headerText: '3:00 PM', width: '120' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: '3:30', headerText: '3:30 PM', width: '120' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: '4:00', headerText: '4:00 PM', width: '120' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: '4:30', headerText: '4:30 PM', width: '120' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: '5:00', headerText: '5:00 PM', width: '120' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the Grid component with the column spanning feature. In this sample, we have spanned multiple adjacent cells together.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Grid allows to span the multiple adjacent cells. In ",
                    React.createElement("a", { href: 'http://ej2.syncfusion.com/react/documentation/grid/api-queryCellInfoEventArgs.html' },
                        React.createElement("code", null, "QueryCellInfo")),
                    " event, you can define the ",
                    React.createElement("code", null, "colSpan"),
                    " attribute to span the cells."),
                React.createElement("p", null,
                    "In this demo, Employee ",
                    React.createElement("b", null, "Davolio"),
                    " doing analysis from 9.00 AM to 10.00 AM, so that the cells have been spanned and Employee ",
                    React.createElement("b", null, "Buchamann"),
                    " doing support work from 9.30 AM to 11.00 AM, so that the cells have been spanned."))));
    };
    return ColumnSpanning;
}(sample_base_1.SampleBase));
exports.ColumnSpanning = ColumnSpanning;
