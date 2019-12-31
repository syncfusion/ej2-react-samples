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
var ForeignKeyColumn = (function (_super) {
    __extends(ForeignKeyColumn, _super);
    function ForeignKeyColumn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
        _this.validationRules = { required: true };
        return _this;
    }
    ForeignKeyColumn.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.orderDetails.slice(), allowPaging: true, ref: function (grid) { return _this.gridInstance = grid; }, allowFiltering: true, allowSorting: true, editSettings: { allowEditing: true, allowDeleting: true, allowAdding: true }, filterSettings: { type: 'Menu' }, toolbar: this.toolbarOptions },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '120', textAlign: 'Right', validationRules: this.validationRules, isPrimaryKey: true }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerID', headerText: 'Customer Name', width: '150', validationRules: this.validationRules, foreignKeyValue: 'ContactName', foreignKeyField: 'CustomerID', dataSource: data_1.customerData }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '100', format: 'C2', textAlign: 'Right', editType: 'numericedit' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipName', headerText: 'Ship Name', width: '170' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '150', editType: 'dropdownedit' })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Filter, ej2_react_grids_1.Page, ej2_react_grids_1.Edit, ej2_react_grids_1.Sort, ej2_react_grids_1.ForeignKey, ej2_react_grids_1.Toolbar] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "In this sample,",
                    React.createElement("b", null, "Customer Name"),
                    "column is a foreign column. You can perform filtering, sorting or editing in the foreign key column.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "Grid has option to show foreign key columns. It can be enabled by setting",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-column.html#datasource-object---datamanager" }, "column.dataSource ")),
                    "property with either local or remote data and column field and text can be defined by using",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-column.html#foreignkeyfield-string" }, "column.foreignKeyField")),
                    " and",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-column.html#foreignkeyvalue-string" }, "column.foreignKeyValue")),
                    " properties."),
                React.createElement("p", { style: { fontWeight: 500 } },
                    React.createElement("b", null, "Injecting Module:")),
                React.createElement("p", null,
                    "Grid features are segregated into individual feature-wise modules. To use foreign key column feature, we need to inject ",
                    React.createElement("code", null, " ForeignKey "),
                    " module into the ",
                    React.createElement("code", null, "services"),
                    "."))));
    };
    return ForeignKeyColumn;
}(sample_base_1.SampleBase));
exports.ForeignKeyColumn = ForeignKeyColumn;
