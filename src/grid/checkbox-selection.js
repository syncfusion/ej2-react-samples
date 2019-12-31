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
var CheckboxSelection = (function (_super) {
    __extends(CheckboxSelection, _super);
    function CheckboxSelection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectionsettings = { persistSelection: true };
        _this.toolbarOptions = ['Delete'];
        _this.editSettings = { allowDeleting: true };
        return _this;
    }
    CheckboxSelection.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.data, ref: function (grid) { return _this.gridInstance = grid; }, enableHover: false, allowPaging: true, pageSettings: { pageCount: 5 }, selectionSettings: this.selectionsettings, toolbar: this.toolbarOptions, editSettings: this.editSettings },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { type: 'checkbox', width: '50' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', isPrimaryKey: true, headerText: 'Order ID', width: '120', textAlign: "Right" }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '150' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', width: '130', format: 'yMd', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '120', format: 'C2', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShippedDate', headerText: 'Shipped Date', width: '130', format: "yMd", textAlign: "Right" })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.Selection, ej2_react_grids_1.Toolbar, ej2_react_grids_1.Edit] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the selection functionality of the Grid using checkbox selection, To select and unselect all rows use header checkbox. To select/unselect particular row, click the desired row. Delete one or more records using the toolbar delete button")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Grid multiple selection can be achieved with help of checkbox in each row. To render checkbox in each grid row, you need to define column type as ",
                    React.createElement("code", null, "checkbox"),
                    " using",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-column.html#type-string" }, "columns->type")),
                    " property."),
                React.createElement("p", null,
                    "Selection can be persisted on all the operations using",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-selectionSettings.html#persistselection-boolean" }, "selectionSettings-> persistSelection")),
                    " property. For persisting selection on the Grid, any one of the column should be defined as a primary key using",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-column.html#isprimarykey-boolean" }, "columns->isPrimaryKey")),
                    " property."),
                React.createElement("p", null,
                    "In this demo, Grid multiple selection has been enabled with selection persistance. You can also delete multiple records, by clicking the toolbar\u2019s ",
                    React.createElement("code", null, "Delete"),
                    " button after selecting the checkboxes."),
                React.createElement("p", null,
                    "More information on the checkbox selection configuration can be found in this ",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/grid/selection.html#checkbox-selection" }, "documentation section"),
                    "."))));
    };
    return CheckboxSelection;
}(sample_base_1.SampleBase));
exports.CheckboxSelection = CheckboxSelection;
