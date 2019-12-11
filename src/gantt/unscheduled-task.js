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
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
require("./unscheduled.css");
var UnscheduledTask = /** @class */ (function (_super) {
    __extends(UnscheduledTask, _super);
    function UnscheduledTask() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.taskFields = {
            id: 'TaskId',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
        };
        _this.editSettings = {
            allowAdding: true,
            allowEditing: true,
        };
        _this.toolbar = [{ text: 'Insert task', tooltipText: 'Insert task at top', id: 'toolbarAdd', prefixIcon: 'e-add-icon tb-icons' }];
        _this.labelSettings = {
            leftLabel: 'TaskName',
            rightLabel: 'TaskType'
        };
        _this.splitterSettings = {
            columnIndex: 4
        };
        _this.columns = [
            { field: 'TaskId', width: 75 },
            { field: 'TaskName', width: 80 },
            { field: 'StartDate', width: 120 },
            { field: 'EndDate', width: 120 },
            { field: 'Duration', width: 90 },
            { field: 'TaskType', visible: false }
        ];
        _this.projectStartDate = new Date('01/01/2019');
        _this.projectEndDate = new Date('01/20/2019');
        return _this;
    }
    UnscheduledTask.prototype.toolbarClickEvent = function () {
        var data = {
            Duration: null,
            StartDate: null,
            EndDate: null,
            TaskType: ''
        };
        this.ganttInstance.addRecord(data);
    };
    UnscheduledTask.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'Unscheduled', ref: function (gantt) { return _this.ganttInstance = gantt; }, dataSource: data_1.unscheduledData, taskFields: this.taskFields, height: '410px', editSettings: this.editSettings, allowSelection: true, toolbar: this.toolbar, labelSettings: this.labelSettings, allowUnscheduledTasks: true, toolbarClick: this.toolbarClickEvent.bind(this), splitterSettings: this.splitterSettings, columns: this.columns, projectStartDate: this.projectStartDate, projectEndDate: this.projectEndDate },
                    React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Toolbar, ej2_react_gantt_1.Edit, ej2_react_gantt_1.Selection] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the support for displaying unscheduled tasks in Gantt and adding empty rows using the custom toolbar button.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Unscheduled tasks are tasks in a project that are not scheduled with proper dates or duration at the commencement of the project. These tasks can be scheduled properly at any time during project implementation based on factors such as resource availability, dependent tasks, and more. This example shows how to display the unscheduled tasks in Gantt by enabling the ",
                    React.createElement("code", null, "allowUnscheuldedTasks"),
                    " property. This also shows how to add an empty row in Gantt by using a custom toolbar button click action. By using the ",
                    React.createElement("code", null, "toolbarClick"),
                    " event and ",
                    React.createElement("code", null, "addRecord"),
                    " method, an empty row can be added at the top of the rows with undefined task details."),
                React.createElement("p", null,
                    "Gantt component features are segregated into individual feature-wise modules. To use a toolbar and add support, inject the ",
                    React.createElement("code", null, "Toolbar"),
                    " and ",
                    React.createElement("code", null, "Edit"),
                    " module. To use a selection, inject the ",
                    React.createElement("code", null, "Selection"),
                    " module."))));
    };
    return UnscheduledTask;
}(sample_base_1.SampleBase));
exports.UnscheduledTask = UnscheduledTask;
