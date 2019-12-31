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
var DialogEdit = (function (_super) {
    __extends(DialogEdit, _super);
    function DialogEdit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toolbarOptions = ['Add', 'Edit', 'Delete'];
        _this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
        _this.editparams = { params: { popupHeight: '300px' } };
        _this.validationRules = { required: true };
        _this.orderidRules = { required: true, number: true };
        _this.pageSettings = { pageCount: 5 };
        return _this;
    }
    DialogEdit.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.data, toolbar: this.toolbarOptions, allowPaging: true, editSettings: this.editSettings, pageSettings: this.pageSettings },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '120', textAlign: 'Right', validationRules: this.orderidRules, isPrimaryKey: true }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '150', validationRules: this.validationRules }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '120', format: 'C2', textAlign: 'Right', editType: 'numericedit' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', editType: 'datepickeredit', format: 'yMd', width: '170' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '150', editType: 'dropdownedit', edit: this.editparams })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.Toolbar, ej2_react_grids_1.Edit] })),
                React.createElement("div", { id: "action-description" },
                    React.createElement("p", null, "This sample demonstrates CRUD operations in Grid. You can perform CRUD operations as follows,"),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("code", null, "Add"),
                            " -  To add new record, click Add toolbar button "),
                        React.createElement("li", null,
                            React.createElement("code", null, "Edit"),
                            " - To edit record, double click a row or click toolbar Edit button after selected a row "),
                        React.createElement("li", null,
                            React.createElement("code", null, "Delete"),
                            " - To delete record, click toolbar Delete button after selected a row "),
                        React.createElement("li", null,
                            React.createElement("code", null, "Update"),
                            ",",
                            React.createElement("code", null, "Cancel"),
                            " - You can save or discard changes by click toolbar Update and cancel button respectively"))),
                React.createElement("div", { id: "description" },
                    React.createElement("p", null,
                        " The Grid supports CRUD operations. This CRUD operations can be configured in Grid using",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-editSettings.html" }, "editSettings")),
                        ". Also, it has different modes to manipulate the datasource."),
                    React.createElement("p", null, "The available modes are,"),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("code", null, "Normal")),
                        React.createElement("li", null,
                            React.createElement("code", null, "Dialog")),
                        React.createElement("li", null,
                            React.createElement("code", null, "Batch"))),
                    React.createElement("p", null,
                        "In this demo, Dialog mode is enabled for editing by defining ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-editSettings.html#mode-string" }, "editSettings.mode")),
                        " as ",
                        React.createElement("code", null, "dialog"),
                        ". You can start editing by double clicking a row or clicking on toolbar's ",
                        React.createElement("code", null, "Edit"),
                        "button, then the currently selected row will be shown on a dialog and you can change the row values and save edited data to the datasource."),
                    React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
                    React.createElement("p", null,
                        "Grid features are segregated into individual feature-wise modules. To use editing feature, we need to inject",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-edit.html" }, "Edit")),
                        " module into the ",
                        React.createElement("code", null, "services"),
                        ".")))));
    };
    return DialogEdit;
}(sample_base_1.SampleBase));
exports.DialogEdit = DialogEdit;
