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
var property_pane_1 = require("../common/property-pane");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var NormalEdit = (function (_super) {
    __extends(NormalEdit, _super);
    function NormalEdit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
        _this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, newRowPosition: 'Top' };
        _this.editparams = { params: { popupHeight: '300px' } };
        _this.validationRule = { required: true };
        _this.orderidRules = { required: true, number: true };
        _this.pageSettings = { pageCount: 5 };
        _this.format = { type: 'dateTime', format: 'M/d/y hh:mm a' };
        _this.droplist = [
            { text: 'Top', value: 'Top' },
            { text: 'Bottom', value: 'Bottom' }
        ];
        return _this;
    }
    NormalEdit.prototype.actionBegin = function (args) {
        if (args.requestType === 'save') {
            if (this.gridInstance.pageSettings.currentPage !== 1 && this.gridInstance.editSettings.newRowPosition === 'Top') {
                args.index = (this.gridInstance.pageSettings.currentPage * this.gridInstance.pageSettings.pageSize) - this.gridInstance.pageSettings.pageSize;
            }
            else if (this.gridInstance.editSettings.newRowPosition === 'Bottom') {
                args.index = (this.gridInstance.pageSettings.currentPage * this.gridInstance.pageSettings.pageSize) - 1;
            }
        }
    };
    NormalEdit.prototype.ddChange = function () {
        this.gridInstance.editSettings.newRowPosition = this.dropDownInstance.value;
    };
    NormalEdit.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-md-9' },
                    React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.orderDataSource, ref: function (grid) { return _this.gridInstance = grid; }, toolbar: this.toolbarOptions, allowPaging: true, editSettings: this.editSettings, pageSettings: this.pageSettings, actionBegin: this.actionBegin.bind(this) },
                        React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '140', textAlign: 'Right', validationRules: this.orderidRules, isPrimaryKey: true }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '150', validationRules: this.validationRule }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '140', format: 'C2', textAlign: 'Right', editType: 'numericedit' }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', editType: 'datetimepickeredit', format: this.format, width: '160' }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '150', editType: 'dropdownedit', edit: this.editparams })),
                        React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.Toolbar, ej2_react_grids_1.Edit] }))),
                React.createElement("div", { className: 'col-md-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%', marginBottom: '20px' } },
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Add New Row Position")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "newRowPosition", width: "120px", index: 0, change: this.ddChange.bind(this), ref: function (d) { return _this.dropDownInstance = d; }, dataSource: this.droplist, fields: { text: 'text', value: 'value' } }))))))),
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
                            " - You can save or discard changes by click toolbar Update and cancel button respectively")),
                    React.createElement("p", null,
                        "By default, a new row will be added at the top of the grid. You can change it by setting ",
                        React.createElement("code", null, "editSettings.newRowPosition"),
                        " as ",
                        React.createElement("code", null, "Bottom"))),
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
                        "In this demo, Normal mode is enabled for editing. You can start edit any row by double clicking on it or clicking on toolbar\u2019s",
                        React.createElement("code", null, "Edit"),
                        " button, then the currently selected row will be changed to edited state. You can change the row values and save edited data to datasource."),
                    React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
                    React.createElement("p", null,
                        "Grid features are segregated into individual feature-wise modules. To use editing feature, we need to inject",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-edit.html" }, "Edit")),
                        " module into the ",
                        React.createElement("code", null, "services"),
                        ".")))));
    };
    return NormalEdit;
}(sample_base_1.SampleBase));
exports.NormalEdit = NormalEdit;
