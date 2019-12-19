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
var Baseline = (function (_super) {
    __extends(Baseline, _super);
    function Baseline() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.taskFields = {
            id: 'TaskId',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            baselineStartDate: 'BaselineStartDate',
            baselineEndDate: 'BaselineEndDate'
        };
        _this.projectStartDate = new Date('03/05/2018 09:30:00 AM');
        _this.projectEndDate = new Date('03/05/2018 07:00:00 PM');
        _this.timelineSettings = {
            timelineUnitSize: 65,
            topTier: {
                unit: 'None',
            },
            bottomTier: {
                unit: 'Minutes',
                count: 15,
                format: 'hh:mm a'
            }
        };
        _this.dayWorkingTime = [{ from: 0, to: 24 }];
        _this.template = _this.tooltipTemplate;
        _this.tooltipSettings = {
            taskbar: _this.template.bind(_this),
        };
        return _this;
    }
    Baseline.prototype.tooltipTemplate = function (props) {
        return (React.createElement("table", null,
            React.createElement("tbody", null,
                React.createElement("tr", null,
                    React.createElement("td", { colSpan: 3 }, props.TaskName)),
                React.createElement("tr", null,
                    React.createElement("td", null, " Start Time "),
                    " ",
                    React.createElement("td", null, ":"),
                    React.createElement("td", null, this.ganttInstance.getFormatedDate(props.StartDate))),
                React.createElement("tr", null,
                    React.createElement("td", null, " End Time"),
                    " ",
                    React.createElement("td", null, ":"),
                    React.createElement("td", null, this.ganttInstance.getFormatedDate(props.EndDate))),
                React.createElement("tr", null,
                    React.createElement("td", null, " Planned start time"),
                    " ",
                    React.createElement("td", null, ":"),
                    React.createElement("td", null, this.ganttInstance.getFormatedDate(props.BaselineStartDate))),
                React.createElement("tr", null,
                    React.createElement("td", null, " Planned end time"),
                    " ",
                    React.createElement("td", null, ":"),
                    React.createElement("td", null, this.ganttInstance.getFormatedDate(props.BaselineEndDate))))));
    };
    ;
    Baseline.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'Baseline', ref: function (gantt) { return _this.ganttInstance = gantt; }, dataSource: data_1.baselineData, renderBaseline: true, dateFormat: 'hh:mm a', treeColumnIndex: 1, allowSelection: true, projectStartDate: this.projectStartDate, projectEndDate: this.projectEndDate, taskFields: this.taskFields, timelineSettings: this.timelineSettings, includeWeekend: true, height: '410px', tooltipSettings: this.tooltipSettings, durationUnit: 'Minute', dayWorkingTime: this.dayWorkingTime },
                    React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', headerText: 'Service Name', width: '250', clipMode: 'EllipsisWithTooltip' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'BaselineStartDate', headerText: 'Planned start time' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'BaselineEndDate', headerText: 'Planned end time' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate', headerText: 'Start time' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'EndDate', headerText: 'End time' })),
                    React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection] })),
                React.createElement("div", { style: { float: 'right', margin: '10px' } },
                    "Source:",
                    React.createElement("a", { href: "https://en.wikipedia.org/wiki/Service_(motor_vehicle)", target: '_blank' }, "https://en.wikipedia.org/"))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the complete service schedule for a car. Baselines are enabled in this sample to view the deviation between the planned dates and actual dates.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The baseline feature enables the user to view the deviation between the planned dates and the actual dates of the tasks in a project. Baselines can be enabled in Gantt chart by enabling the ",
                    React.createElement("code", null, "renderBaseline"),
                    "property along with mapping the data source values for ",
                    React.createElement("code", null, "baselineStartDate"),
                    " and ",
                    React.createElement("code", null, "baselineEndDate"),
                    "properties. The baseline will appear for all type of tasks in the project such as child tasks, parent tasks and also for milestones. You can change the color for the baselines using ",
                    React.createElement("code", null, "baselineColor"),
                    " property."),
                React.createElement("p", null,
                    "Gantt component features are segregated into individual feature-wise modules. To use a selection support, inject the",
                    React.createElement("code", null, "Selection"),
                    " module."))));
    };
    return Baseline;
}(sample_base_1.SampleBase));
exports.Baseline = Baseline;
