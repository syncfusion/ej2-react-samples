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
var Command = (function (_super) {
    __extends(Command, _super);
    function Command() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Row' };
        _this.taskIDRule = { required: true, number: true };
        _this.taskNameRule = { required: true };
        _this.dateRule = { date: true };
        _this.durationRule = { number: true, min: 0 };
        _this.editparams2 = { params: { format: 'n' } };
        _this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
            { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
            { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
            { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }];
        return _this;
    }
    Command.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: 'subtasks', height: '400', editSettings: this.editSettings },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskID', headerText: 'Task ID', width: '80', textAlign: 'Right', validationRules: this.taskIDRule, isPrimaryKey: true }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskName', headerText: 'Task Name', width: '200', validationRules: this.taskNameRule }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'startDate', headerText: 'Start Date', width: '140', textAlign: 'Right', editType: 'datepickeredit', format: 'yMd', validationRules: this.dateRule, type: 'date' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'duration', headerText: 'Duration', width: '90', editType: 'numericedit', textAlign: 'Right', validationRules: this.durationRule, edit: this.editparams2 }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'progress', headerText: 'Progress', width: '90', textAlign: 'Right', editType: 'numericedit', validationRules: this.durationRule, edit: this.editparams2 }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { headerText: 'Manage Records', width: '160', commands: this.commands })),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Edit, ej2_react_treegrid_1.CommandColumn] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates CRUD operations in TreeGrid using command column. You can perform CRUD operations as follows,"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Edit"),
                        " - To edit record, double click a row or click Edit button from command column after selected a row."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Delete"),
                        " - To delete record, click Delete button from command column after selected a row."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Update, Cancel"),
                        " -You can save or discard changes by click Update and Cancel button from command column respectively."))),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The TreeGrid provides an option to render CRUD action buttons in a column by using the ",
                    React.createElement("b", null, "CommandColumn"),
                    " feature. The ",
                    React.createElement("code", null, "columns->commands"),
                    " property accepts array of CommandModel object. The predefined command button can be defined by using type property."),
                React.createElement("p", null, "The built-in command button are,"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Edit ")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Delete")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Cancel")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Save"))),
                React.createElement("p", null, "Injecting Module:"),
                React.createElement("p", null,
                    "TreeGrid features are segregated into individual feature-wise modules. To use editing feature, we need to inject ",
                    React.createElement("code", null, "Edit"),
                    " module into the ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null, "More information on the selection configuration can be found in this documentation section."))));
    };
    return Command;
}(sample_base_1.SampleBase));
exports.Command = Command;
