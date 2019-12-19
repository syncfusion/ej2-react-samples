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
var Exporting = (function (_super) {
    __extends(Exporting, _super);
    function Exporting() {
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
            resourceInfo: 'resources'
        };
        _this.splitterSettings = {
            columnIndex: 2
        };
        _this.projectStartDate = new Date('03/25/2019');
        _this.projectEndDate = new Date('07/28/2019');
        _this.gridLines = 'Both';
        _this.toolbar = ['ExcelExport', 'CsvExport'];
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
        return _this;
    }
    Exporting.prototype.toolbarClick = function (args) {
        if (args.item.id === "GanttExport_excelexport") {
            this.ganttInstance.excelExport();
        }
        else if (args.item.id === "GanttExport_csvexport") {
            this.ganttInstance.csvExport();
        }
    };
    Exporting.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'GanttExport', ref: function (gantt) { return _this.ganttInstance = gantt; }, dataSource: data_1.editingData, dateFormat: 'MMM dd, y', treeColumnIndex: 1, allowExcelExport: true, allowSelection: true, showColumnMenu: false, highlightWeekends: true, allowUnscheduledTasks: true, projectStartDate: this.projectStartDate, projectEndDate: this.projectEndDate, splitterSettings: this.splitterSettings, taskFields: this.taskFields, timelineSettings: this.timelineSettings, labelSettings: this.labelSettings, toolbarClick: this.toolbarClick.bind(this), height: '410px', gridLines: this.gridLines, toolbar: this.toolbar, resourceNameMapping: 'resourceName', resourceIDMapping: 'resourceId', resources: data_1.editingResources },
                    React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID', width: '60' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', width: '250' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'EndDate' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Predecessor' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'resources' })),
                    React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection, ej2_react_gantt_1.Toolbar, ej2_react_gantt_1.ExcelExport] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates client-side exporting of the Gantt, which allows you to export Gantt data to Excel and CSV formats. Using the Gantt toolbar buttons, you can export Gantt data to the desired format. ")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "Gantt supports client-side exporting, which allows you to export its data to the Excel and CSV formats. "),
                React.createElement("p", null,
                    "In this demo, we have defined actions in the ",
                    React.createElement("code", null, "toolbarClick"),
                    " event to export the Gantt data using the ",
                    React.createElement("code", null, "excelExport"),
                    " and ",
                    React.createElement("code", null, "csvExport"),
                    " methods."),
                React.createElement("p", null, "Injecting Module:"),
                React.createElement("p", null,
                    "To use Excel and CSV export features, inject the ",
                    React.createElement("code", null, "ExcelExport"),
                    " module using the ",
                    React.createElement("code", null, "Gantt.Inject(ExcelExport)"),
                    " method. "))));
    };
    return Exporting;
}(sample_base_1.SampleBase));
exports.Exporting = Exporting;
