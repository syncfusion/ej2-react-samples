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
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var WorkingTimeRange = /** @class */ (function (_super) {
    __extends(WorkingTimeRange, _super);
    function WorkingTimeRange() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isTimeUpdated = false;
        _this.taskFields = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            progress: 'Progress',
            dependency: 'Predecessor',
            child: 'subtasks'
        };
        _this.timelineSettings = {
            topTier: {
                unit: 'Day',
            },
            bottomTier: {
                unit: 'Hour',
            }
        };
        _this.durationUnit = 'hour';
        _this.labelSettings = {
            leftLabel: 'TaskName'
        };
        _this.projectStartDate = new Date('04/02/2019');
        _this.projectEndDate = new Date('04/28/2019');
        return _this;
    }
    WorkingTimeRange.prototype.updateTime = function () {
        var defaultDate = "08/08/2016", startDate = new Date(defaultDate), endDate = new Date(defaultDate);
        var decPlace = this.workStartTime.value - Math.floor(this.workStartTime.value);
        startDate.setHours(this.workStartTime.value);
        startDate.setMinutes(decPlace * 60);
        decPlace = this.workEndTime.value - Math.floor(this.workEndTime.value);
        endDate.setHours(this.workEndTime.value);
        endDate.setMinutes(decPlace * 60);
        /*Validate time value and update the time range*/
        if (startDate.getTime() < endDate.getTime() && this.isTimeUpdated == false) {
            var workingTime = [{ from: this.workStartTime.value, to: this.workEndTime.value }];
            this.ganttInstance.dayWorkingTime = workingTime;
            this.isTimeUpdated = false;
        }
        else {
            this.isTimeUpdated = true;
            this.workStartTime.value = this.ganttInstance.dayWorkingTime[0].from;
            this.workEndTime.value = this.ganttInstance.dayWorkingTime[this.ganttInstance.dayWorkingTime.length - 1].to;
        }
        this.isTimeUpdated = false;
    };
    ;
    WorkingTimeRange.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-lg-8' },
                    React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'WorkingTimeRange', ref: function (gantt) { return _this.ganttInstance = gantt; }, dataSource: data_1.workTimeRange, highlightWeekends: true, taskFields: this.taskFields, labelSettings: this.labelSettings, height: '410px', timelineSettings: this.timelineSettings, durationUnit: this.durationUnit, projectStartDate: this.projectStartDate, projectEndDate: this.projectEndDate },
                        React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection, ej2_react_gantt_1.DayMarkers] }))),
                React.createElement("div", { className: 'col-lg-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: "property", className: "property-panel-table", title: "Properties", style: { width: '100%' } },
                            React.createElement("colgroup", null,
                                React.createElement("col", { style: { width: '55%' } }),
                                React.createElement("col", { style: { width: '45%' } })),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '55%' } },
                                    React.createElement("div", null, "Work Start Time")),
                                React.createElement("td", { style: { width: '45%' } },
                                    React.createElement("div", { style: { paddingTop: '0px' } },
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: function (NumericTextBox) { return _this.workStartTime = NumericTextBox; }, value: 8, min: 0, max: 24, showSpinButton: true, step: 0.5, change: this.updateTime.bind(this) })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '55%' } },
                                    React.createElement("div", null, "Work End Time")),
                                React.createElement("td", { style: { width: '45%' } },
                                    React.createElement("div", { style: { paddingTop: '0px' } },
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: function (NumericTextBox) { return _this.workEndTime = NumericTextBox; }, value: 17, min: 0, max: 24, showSpinButton: true, step: 0.5, change: this.updateTime.bind(this) })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the support for changing the working hours in a day. The selected start and end hours from the property panel will be applied to each task available in the project.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render a Gantt chart with the provided data source and customizable working hours in a day. You can split the working hours in a day to one or more range. So, You can also provide the ",
                    React.createElement("code", null, "dayWorkingTime"),
                    " property value as array of object collection. Gantt chart also supports different ",
                    React.createElement("code", null, "durationUnit"),
                    " values as follows:",
                    React.createElement("li", null,
                        React.createElement("code", null, "day")),
                    React.createElement("li", null,
                        React.createElement("code", null, "hour")),
                    React.createElement("li", null,
                        React.createElement("code", null, "minute"))),
                React.createElement("p", null,
                    "Given duration in dataSource will be considered with this unit. In this demo, the ",
                    React.createElement("code", null, "hour"),
                    " unit is used to render taskbars in day hour timeline mode. Gantt chart supports only 24hours format as of now. The working hours will differ between organizations. This feature will be helpful to keep track of each task and resource task status based on the working time of company."),
                React.createElement("p", null,
                    "Gantt component features are segregated into individual feature-wise modules. To use a selection support and event markers we need to inject the",
                    React.createElement("code", null, "Selection"),
                    ", ",
                    React.createElement("code", null, "DayMarkers"),
                    " modules."))));
    };
    return WorkingTimeRange;
}(sample_base_1.SampleBase));
exports.WorkingTimeRange = WorkingTimeRange;
