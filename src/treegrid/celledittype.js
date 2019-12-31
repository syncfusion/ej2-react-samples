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
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var EditType = (function (_super) {
    __extends(EditType, _super);
    function EditType() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
        _this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, showDeleteConfirmDialog: true, mode: 'Row',
            newRowPosition: 'Above' };
        _this.editparams = { params: { popupHeight: '300px' } };
        _this.validationRule = { required: true };
        _this.validationRule1 = { date: true };
        _this.validationRule2 = { required: true, number: true };
        _this.editparams2 = { params: { format: 'n' } };
        _this.pageSettings = { pageCount: 5 };
        _this.format = { type: 'dateTime', format: 'M/d/y hh:mm a' };
        return _this;
    }
    EditType.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: 'subtasks', height: '400', editSettings: this.editSettings, pageSettings: this.pageSettings, toolbar: this.toolbarOptions },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskID', headerText: 'Task ID', width: '80', textAlign: 'Right', validationRules: this.validationRule, isPrimaryKey: true }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskName', headerText: 'Task Name', width: '150', validationRules: this.validationRule }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'startDate', headerText: 'Start Date', width: '170', textAlign: 'Right', editType: 'datetimepickeredit', format: this.format, validationRules: this.validationRule1 }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'duration', headerText: 'Duration', width: '90', editType: 'numericedit', textAlign: 'Right', validationRules: this.validationRule2, edit: this.editparams2 }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'progress', headerText: 'Progress', width: '90', textAlign: 'Right', editType: 'dropdownedit', edit: this.editparams }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'priority', headerText: 'Priority', width: '90', textAlign: 'Right', editType: 'dropdownedit', edit: this.editparams })),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page, ej2_react_treegrid_1.Edit, ej2_react_treegrid_1.Toolbar] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the supported cell edit types of TreeGrid columns. The list of cell edit types are as follows,"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "NumericTextBox"),
                        " component for integers, double, and decimal data types."),
                    React.createElement("li", null,
                        React.createElement("code", null, "TextBox"),
                        " component for string data type."),
                    React.createElement("li", null,
                        React.createElement("code", null, "DropDownList"),
                        " component for list data type."),
                    React.createElement("li", null,
                        React.createElement("code", null, "DatePicker"),
                        " component for date data type."),
                    React.createElement("li", null,
                        React.createElement("code", null, "DateTimePicker"),
                        " component for dateTime data type."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Checkbox"),
                        " component for boolean data type"))),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "columns.editType"),
                    "  is used to customize the edit type of the particular column. You can set the columns editType based on data type of the column."),
                React.createElement("p", null, "In this sample, we show the following editTypes for the TreeGrid columns"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "NumericTextBox")),
                    React.createElement("li", null,
                        React.createElement("code", null, "TextBox")),
                    React.createElement("li", null,
                        React.createElement("code", null, "DropDownList")),
                    React.createElement("li", null,
                        React.createElement("code", null, "DatePicker")),
                    React.createElement("li", null,
                        React.createElement("code", null, "DateTimePicker")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Checkbox"))),
                React.createElement("p", null, "Injecting Module:"),
                React.createElement("p", null,
                    "TreeGrid features are segregated into individual feature-wise modules. To use editing feature, we need to inject",
                    React.createElement("code", null, "Edit"),
                    "module into the ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null, "More information on the selection configuration can be found in this documentation section."))));
    };
    return EditType;
}(sample_base_1.SampleBase));
exports.EditType = EditType;
