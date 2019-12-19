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
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
var helper_1 = require("./helper");
require("./schedule-component.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var dataSource = require("./datasource.json");
/**
 * Schedule Work days sample
 */
var WorkDays = (function (_super) {
    __extends(WorkDays, _super);
    function WorkDays() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = ej2_base_1.extend([], dataSource.employeeEventData, null, true);
        _this.workDays = [1, 3, 5];
        _this.workDaysOptions = [
            { text: 'Mon, Wed, Fri', value: '1,3,5' },
            { text: 'Mon, Tue, Wed, Thu, Fri', value: '1,2,3,4,5' },
            { text: 'Tue, Wed, Thu, Fri', value: '2,3,4,5' },
            { text: 'Thu, Fri, Sat, Mon, Tue', value: '4,5,6,1,2' }
        ];
        _this.dayOfWeekOptions = [
            { text: 'Sunday', value: 0 },
            { text: 'Monday', value: 1 },
            { text: 'Tuesday', value: 2 },
            { text: 'Wednesday', value: 3 },
            { text: 'Thursday', value: 4 },
            { text: 'Friday', value: 5 },
            { text: 'Saturday', value: 6 }
        ];
        _this.fields = { text: 'text', value: 'value' };
        return _this;
    }
    WorkDays.prototype.onWorkDaysChange = function (args) {
        this.scheduleObj.workDays = args.value.toString().split(',').map(Number);
        this.scheduleObj.dataBind();
    };
    WorkDays.prototype.onDayOfWeekChange = function (args) {
        this.scheduleObj.firstDayOfWeek = args.value;
        this.scheduleObj.dataBind();
    };
    WorkDays.prototype.onEventRendered = function (args) {
        helper_1.applyCategoryColor(args, this.scheduleObj.currentView);
    };
    WorkDays.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-9 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { width: '100%', height: '650px', ref: function (schedule) { return _this.scheduleObj = schedule; }, workHours: { start: '08:00' }, currentView: 'WorkWeek', selectedDate: new Date(2018, 1, 15), eventSettings: { dataSource: this.data }, workDays: this.workDays, eventRendered: this.onEventRendered.bind(this) },
                        React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Week' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'WorkWeek' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineWeek' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineMonth' })),
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.TimelineViews, ej2_react_schedule_1.TimelineMonth, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
            React.createElement("div", { className: 'col-lg-3 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", { className: 'col-md-4', style: { paddingTop: '8px' } }, "Work days")),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { style: { padding: '6px' }, value: '1,3,5', dataSource: this.workDaysOptions, fields: this.fields, change: this.onWorkDaysChange.bind(this), popupWidth: '180px' })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", { className: 'col-md-4', style: { paddingTop: '8px' } }, "First day of week")),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { style: { padding: '6px' }, value: 0, dataSource: this.dayOfWeekOptions, fields: this.fields, change: this.onDayOfWeekChange.bind(this) })))))))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This demo showcases how to set customized working days as well as first day of a week on Schedule.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "In this demo, the working days of a week can be set on Scheduler using the ",
                    React.createElement("code", null, "workDays"),
                    " property which accepts the collection of day indexes (from 0 to 6) of a week. By default, it is set to ",
                    React.createElement("code", null, "[1, 2, 3, 4, 5]"),
                    " and in this demo, it has been set to ",
                    React.createElement("code", null, "[1, 3, 5]"),
                    " which means that ",
                    React.createElement("code", null, "Monday, Wednesday, Friday"),
                    "is being set as working days of a week and is visually differentiated from non-working days. The working hours usually applies only on these given working days."),
                React.createElement("p", null,
                    "The first day of the week can also be set on the Scheduler by making use of the ",
                    React.createElement("code", null, "firstDayOfWeek"),
                    " property, doing so which will make the Scheduler to start with that day."),
                React.createElement("p", null,
                    React.createElement("strong", null, "Note: "),
                    " Here, Sunday is always denoted as 0, Monday as 1 and so on."))));
    };
    return WorkDays;
}(sample_base_1.SampleBase));
exports.WorkDays = WorkDays;
