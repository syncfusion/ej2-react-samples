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
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var EditTemplate = /** @class */ (function (_super) {
    __extends(EditTemplate, _super);
    function EditTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
        _this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Row',
            newRowPosition: 'Below' };
        _this.taskIDRule = { required: true, number: true };
        _this.priorityRule = { required: true };
        _this.dateRule = { date: true };
        _this.durationRule = { number: true, min: 0 };
        _this.editparams2 = { params: { format: 'n' } };
        _this.editTemplate = {
            create: function () {
                _this.elem = document.createElement('input');
                return _this.elem;
            },
            read: function () {
                return _this.autoCompleteobj.value;
            },
            destroy: function () {
                _this.autoCompleteobj.destroy();
            },
            write: function (args) {
                _this.autoCompleteobj = new ej2_react_dropdowns_1.AutoComplete({
                    dataSource: _this.treegridObj.grid.dataSource,
                    fields: { value: 'taskName' },
                    value: args.rowData[args.column.field]
                });
                _this.autoCompleteobj.appendTo(_this.elem);
            }
        };
        return _this;
    }
    EditTemplate.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: 'subtasks', height: '400', editSettings: this.editSettings, toolbar: this.toolbarOptions, ref: function (treegrid) { return _this.treegridObj = treegrid; } },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskID', headerText: 'Task ID', width: '80', textAlign: 'Right', validationRules: this.taskIDRule, isPrimaryKey: true }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskName', headerText: 'Task Name', width: '200', edit: this.editTemplate }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'startDate', headerText: 'Start Date', width: '140', textAlign: 'Right', editType: 'datepickeredit', format: 'yMd', validationRules: this.dateRule, type: 'date' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'duration', headerText: 'Duration', width: '90', editType: 'numericedit', textAlign: 'Right', validationRules: this.durationRule, edit: this.editparams2 }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'progress', headerText: 'Progress', width: '90', textAlign: 'Right', editType: 'numericedit', validationRules: this.durationRule, edit: this.editparams2 }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'priority', headerText: 'Priority', width: '90', textAlign: 'Right', editType: 'stringedit', validationRules: this.priorityRule })),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Edit, ej2_react_treegrid_1.Toolbar] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This samples demonstrates the TreeGrid Cell Edit template feature. Using Cell Edit Template feature we have rendered the AutoComplete component for \u201C",
                    React.createElement("b", null, "Task Name"),
                    "\u201D column.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The cell edit template is used to add a custom component for a particular column by invoking the following functions:"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "create"),
                        " - It is used to create the element at the time of initialization."),
                    React.createElement("li", null,
                        React.createElement("code", null, "write"),
                        " - It is used to create the custom component or assign default value at the time of editing."),
                    React.createElement("li", null,
                        React.createElement("code", null, "read"),
                        " - It is used to read the value from the component at the time of save."),
                    React.createElement("li", null,
                        React.createElement("code", null, "destroy"),
                        " - It is used to destroy the component.")),
                React.createElement("p", null,
                    "In this demo, we have rendered the AutoComplete component for \u201CTask Name\u201D column of TreeGrid using ",
                    React.createElement("code", null, "edit"),
                    " property."),
                React.createElement("p", null,
                    React.createElement("br", null),
                    " More information about Cell Edit template can be found in this documentation section."))));
    };
    return EditTemplate;
}(sample_base_1.SampleBase));
exports.EditTemplate = EditTemplate;
