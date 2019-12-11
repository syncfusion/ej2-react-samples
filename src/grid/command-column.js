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
var CommandColumnEdit = /** @class */ (function (_super) {
    __extends(CommandColumnEdit, _super);
    function CommandColumnEdit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, allowEditOnDblClick: false };
        _this.editparams = { params: { popupHeight: '300px' } };
        _this.validationRule = { required: true };
        _this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
            { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
            { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
            { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }];
        return _this;
    }
    CommandColumnEdit.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { id: 'gridcomp', dataSource: data_1.data, allowPaging: true, pageSettings: { pageCount: 5 }, editSettings: this.editSettings },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '120', textAlign: 'Right', isPrimaryKey: true, validationRules: this.validationRule }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '150', validationRules: this.validationRule }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '120', format: 'C2', textAlign: 'Right', editType: 'numericedit' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', editType: 'datepickeredit', format: 'yMd', width: '170' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '150', editType: 'dropdownedit', edit: this.editparams }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { headerText: 'Manage Records', width: '160', commands: this.commands })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.CommandColumn, ej2_react_grids_1.Edit] })),
                React.createElement("div", { id: "action-description" },
                    React.createElement("p", null, "This sample demonstrates CRUD operations in Grid using command column. You can perform CRUD operations as follows,"),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("code", null, "Edit"),
                            " - To edit record, double click a row or click Edit button from command column after selected a row "),
                        React.createElement("li", null,
                            React.createElement("code", null, "Delete"),
                            " - To delete record, click Delete button from command column after selected a row "),
                        React.createElement("li", null,
                            React.createElement("code", null, "Update"),
                            ",",
                            React.createElement("code", null, "Cancel"),
                            " - You can save or discard changes by click Update and cancel button from command column respectively"))),
                React.createElement("div", { id: "description" },
                    React.createElement("p", null,
                        "The Grid provides an option to render CRUD action buttons in a column by using the CommandColumn feature. The",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-column.html#commands-commandmodel" }, "columns->commands")),
                        " property accepts array of ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-commandModel.html" }, "CommandModel")),
                        " object. The predefined command button can be defined by using ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-commandModel.html#type-string" }, "type")),
                        " property."),
                    React.createElement("p", null, "The built-in command button are,"),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("code", null, "Edit")),
                        React.createElement("li", null,
                            React.createElement("code", null, "Delete")),
                        React.createElement("li", null,
                            React.createElement("code", null, "Cancel")),
                        React.createElement("li", null,
                            React.createElement("code", null, "Save"))),
                    React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
                    React.createElement("p", null,
                        "Grid features are segregated into individual feature-wise modules. To use commandColumn feature, we need to inject ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-page.html" }, "CommandColumn")),
                        " module into the ",
                        React.createElement("code", null, "services"),
                        "."),
                    React.createElement("p", null,
                        "More information on the commandcolumn configuration can be found in this",
                        React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/grid/edit/#command-column" }, "documentation section"),
                        ".")))));
    };
    return CommandColumnEdit;
}(sample_base_1.SampleBase));
exports.CommandColumnEdit = CommandColumnEdit;
