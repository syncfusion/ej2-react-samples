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
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var WorkWeek = /** @class */ (function (_super) {
    __extends(WorkWeek, _super);
    function WorkWeek() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.workDays = [
            { id: 'Sunday', day: 'Sunday' },
            { id: 'Monday', day: 'Monday' },
            { id: 'Tuesday', day: 'Tuesday' },
            { id: 'Wednesday', day: 'Wednesday' },
            { id: 'Thursday', day: 'Thursday' },
            { id: 'Friday', day: 'Friday' },
            { id: 'Saturday', day: 'Saturday' },
        ];
        _this.defaultValue = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
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
        _this.labelSettings = {
            leftLabel: 'TaskName'
        };
        _this.workWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        _this.projectStartDate = new Date('03/24/2019');
        _this.projectEndDate = new Date('07/06/2019');
        return _this;
    }
    WorkWeek.prototype.select = function (args) {
        var workingDays = ej2_base_1.extend([], this.multiselectObj.value, [], true);
        workingDays.push(args.itemData.day);
        this.ganttInstance.workWeek = workingDays;
    };
    ;
    WorkWeek.prototype.removed = function (args) {
        var index = this.ganttInstance.workWeek.indexOf(args.itemData.day);
        if (index !== -1) {
            this.ganttInstance.workWeek = this.multiselectObj.value;
        }
    };
    ;
    WorkWeek.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-lg-8' },
                    React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'WorkWeek', ref: function (gantt) { return _this.ganttInstance = gantt; }, dataSource: data_1.projectNewData, highlightWeekends: true, taskFields: this.taskFields, labelSettings: this.labelSettings, height: '410px', projectStartDate: this.projectStartDate, projectEndDate: this.projectEndDate },
                        React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection, ej2_react_gantt_1.DayMarkers] }))),
                React.createElement("div", { className: 'col-lg-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: "property", className: "property-panel-table", title: "Properties", style: { width: '100%' } },
                            React.createElement("colgroup", null,
                                React.createElement("col", { style: { width: '30%' } }),
                                React.createElement("col", { style: { width: '70%' } })),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", null,
                                        React.createElement("h5", null, "Working Days"))),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", { style: { paddingTop: '0px' } },
                                        React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { ref: function (multiselect) { return _this.multiselectObj = multiselect; }, id: "WorkWeek", mode: "CheckBox", value: this.defaultValue, dataSource: this.workDays, showDropDownIcon: true, popupHeight: '350px', fields: { text: 'day', value: 'id' }, select: this.select.bind(this), removed: this.removed.bind(this) },
                                            React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_dropdowns_1.CheckBoxSelection] }))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the support for changing different set of working days in a week. The selected working days in drop down list will be applied to Gantt chart.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render a Gantt chart with the provided data source and customizable array of working days. These working days alone will be considered for taskbar rendering and duration calculations."),
                React.createElement("p", null,
                    "The working days in your project can be customized using the ",
                    React.createElement("code", null, "workWeek"),
                    " property and the selected days in the dropdown list available in the property panel will be applied to Gantt chart. You can get to know the working days in the Gantt chart timeline by the highlighted weekend days. This can be enabled by using the ",
                    React.createElement("code", null, "highlightWeekends"),
                    " property"),
                React.createElement("p", null,
                    "Gantt component features are segregated into individual feature-wise modules. To use a selection support and event markers we need to inject the",
                    React.createElement("code", null, "Selection"),
                    ", ",
                    React.createElement("code", null, "DayMarkers"),
                    " modules."))));
    };
    return WorkWeek;
}(sample_base_1.SampleBase));
exports.WorkWeek = WorkWeek;
