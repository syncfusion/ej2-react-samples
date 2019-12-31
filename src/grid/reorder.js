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
var Reordering = (function (_super) {
    __extends(Reordering, _super);
    function Reordering() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Reordering.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.employeeData, allowReordering: true },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'EmployeeID', headerText: 'Employee ID', width: '120', textAlign: "Right" }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FirstName', headerText: 'Name', width: '140' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Title', headerText: 'Title', width: '170' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'HireDate', headerText: 'Hired Date', width: '120', format: 'yMd', textAlign: "Right" }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ReportsTo', headerText: 'Reports To', width: '120' })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Reorder] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates reordering of the Grid columns. You can reorder columns by simply drag and drop in the desired column position.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "Reordering can be enabled by setting  ",
                    React.createElement("code", null,
                        React.createElement("a", { target: '_blank', className: 'code', href: 'http://ej2.syncfusion.com/react/documentation/grid/api-grid.html#allowreordering-boolean' }, "allowReordering")),
                    " property as true. Reordering can be done by drag and drop the column header from one index to another index within the Grid."),
                React.createElement("p", null, "The location in which the column to be placed, will be indicated by two arrows symbols."),
                React.createElement("p", null, "In this demo, you can reorder columns by drag and drop the column to the desired column."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
                React.createElement("p", null,
                    "Grid component features are segregated into individual feature-wise modules. To use Reordering feature, we need to inject ",
                    React.createElement("code", null, "Reorder"),
                    " modeule into the ",
                    React.createElement("code", null, "services")),
                React.createElement("p", null,
                    "More information on the Reordering feature configuration can be found in this",
                    React.createElement("a", { target: '_blank', href: 'http://ej2.syncfusion.com/react/documentation/grid/api-grid.html#allowreordering-boolean' }, " documentation section"),
                    "."))));
    };
    return Reordering;
}(sample_base_1.SampleBase));
exports.Reordering = Reordering;
