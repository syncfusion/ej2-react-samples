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
var Editing = /** @class */ (function (_super) {
    __extends(Editing, _super);
    function Editing() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.taskFields = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            progress: 'Progress',
            dependency: 'Predecessor',
            child: 'subtasks',
            notes: 'info',
            resourceInfo: 'resources'
        };
        _this.editSettings = {
            allowAdding: true,
            allowEditing: true,
            allowDeleting: true,
            allowTaskbarEditing: true,
            showDeleteConfirmDialog: true
        };
        _this.splitterSettings = {
            columnIndex: 2
        };
        _this.projectStartDate = new Date('03/25/2019');
        _this.projectEndDate = new Date('07/28/2019');
        _this.gridLines = 'Both';
        _this.toolbar = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'];
        _this.timelineSettings = {
            topTier: {
                unit: 'Week',
                format: 'MMM dd, y',
            },
            bottomTier: {
                unit: 'Day',
            },
        };
        _this.labelSettings = {
            leftLabel: 'TaskName',
            rightLabel: 'resources'
        };
        _this.eventMarkerDay1 = new Date('4/17/2019');
        _this.eventMarkerDay2 = new Date('5/3/2019');
        _this.eventMarkerDay3 = new Date('6/7/2019');
        _this.eventMarkerDay4 = new Date('7/16/2019');
        return _this;
    }
    Editing.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'Editing', dataSource: data_1.editingData, dateFormat: 'MMM dd, y', treeColumnIndex: 1, allowSelection: true, showColumnMenu: false, highlightWeekends: true, allowUnscheduledTasks: true, projectStartDate: this.projectStartDate, projectEndDate: this.projectEndDate, taskFields: this.taskFields, timelineSettings: this.timelineSettings, labelSettings: this.labelSettings, splitterSettings: this.splitterSettings, height: '410px', editSettings: this.editSettings, gridLines: this.gridLines, toolbar: this.toolbar, resourceNameMapping: 'resourceName', resourceIDMapping: 'resourceId', resources: data_1.editingResources },
                    React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID', width: '60' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', headerText: 'Job Name', width: '250', clipMode: 'EllipsisWithTooltip' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Predecessor' })),
                    React.createElement(ej2_react_gantt_1.EditDialogFieldsDirective, null,
                        React.createElement(ej2_react_gantt_1.EditDialogFieldDirective, { type: 'General', headerText: 'General' }),
                        React.createElement(ej2_react_gantt_1.EditDialogFieldDirective, { type: 'Dependency' }),
                        React.createElement(ej2_react_gantt_1.EditDialogFieldDirective, { type: 'Resources' }),
                        React.createElement(ej2_react_gantt_1.EditDialogFieldDirective, { type: 'Notes' })),
                    React.createElement(ej2_react_gantt_1.EventMarkersDirective, null,
                        React.createElement(ej2_react_gantt_1.EventMarkerDirective, { day: this.eventMarkerDay1, label: 'Project approval and kick-off' }),
                        React.createElement(ej2_react_gantt_1.EventMarkerDirective, { day: this.eventMarkerDay2, label: 'Foundation inspection' }),
                        React.createElement(ej2_react_gantt_1.EventMarkerDirective, { day: this.eventMarkerDay3, label: 'Site manager inspection' }),
                        React.createElement(ej2_react_gantt_1.EventMarkerDirective, { day: this.eventMarkerDay4, label: 'Property handover and sign-off' })),
                    React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Edit, ej2_react_gantt_1.Selection, ej2_react_gantt_1.Toolbar, ej2_react_gantt_1.DayMarkers] })),
                React.createElement("div", { style: { float: 'right', margin: '10px' } },
                    "Source:",
                    React.createElement("a", { href: "https://en.wikipedia.org/wiki/Construction", target: '_blank' }, "https://en.wikipedia.org/"))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample visualizes the various phases involved in constructing a residential house, from testing the soil to handing over the fully constructed property to the owner. This sample also demonstrates CRUD operations in Gantt chart. You can perform CRUD operations as follows,",
                    React.createElement("li", null,
                        React.createElement("code", null, "Add"),
                        " - To add new task, click Add toolbar button"),
                    React.createElement("li", null,
                        React.createElement("code", null, "Edit "),
                        "- To edit a task, double click a row or double click a taskbar or click toolbar Edit button after selected a row"),
                    React.createElement("li", null,
                        React.createElement("code", null, "Delete"),
                        " - To delete a task, click toolbar Delete button after selected a row"),
                    React.createElement("li", null,
                        React.createElement("code", null, "Update,Cancel"),
                        " - You can save or discard changes by click toolbar Update and Cancel button respectively"))),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This CRUD operations can be configured in Gantt chart using ",
                    React.createElement("code", null, "editSettings"),
                    " and",
                    React.createElement("code", null, "allowTaskbarEditing"),
                    ". Gantt chart has two modes to manipulate the datasource",
                    React.createElement("li", null,
                        React.createElement("code", null, "Auto")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Dialog")),
                    "In this demo, ",
                    React.createElement("code", null, "Auto"),
                    " mode is enabled for editing. On the TreeGrid side, you can start editing any row by double clicking on it or clicking on toolbar\u2019s Edit button, then the currently selected row will be changed to edited state. On the chart side, you can edit the tasks using edit dialog by double clicking on the taskbars and you can edit the dependency connector lines using drag and drop action with connector line points available on the either side of taskbar."),
                React.createElement("p", null,
                    "Gantt component features are segregated into individual feature-wise modules. To use editing feature, inject the",
                    React.createElement("code", null, "Edit"),
                    " module. To use a selection feature, inject the ",
                    React.createElement("code", null, "Selection"),
                    " module."))));
    };
    return Editing;
}(sample_base_1.SampleBase));
exports.Editing = Editing;
