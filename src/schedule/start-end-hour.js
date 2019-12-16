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
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var dataSource = require("./datasource.json");
/**
 * Schedule start and end hour sample
 */
var DayHourLimit = /** @class */ (function (_super) {
    __extends(DayHourLimit, _super);
    function DayHourLimit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = ej2_base_1.extend([], dataSource.employeeEventData, null, true);
        return _this;
    }
    DayHourLimit.prototype.onSubmit = function () {
        var start = document.getElementById('startTime');
        var end = document.getElementById('endTime');
        this.scheduleObj.startHour = start.value;
        this.scheduleObj.endHour = end.value;
    };
    DayHourLimit.prototype.onEventRendered = function (args) {
        helper_1.applyCategoryColor(args, this.scheduleObj.currentView);
    };
    DayHourLimit.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-9 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { width: '100%', height: '650px', ref: function (schedule) { return _this.scheduleObj = schedule; }, startHour: '08:00', endHour: '20:00', selectedDate: new Date(2018, 1, 15), eventSettings: { dataSource: this.data }, workHours: { highlight: false }, eventRendered: this.onEventRendered.bind(this) },
                        React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Day' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Week' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineDay' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineWeek' })),
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.TimelineViews, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
            React.createElement("div", { className: 'col-lg-3 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", { className: 'col-md-4', style: { paddingTop: '8px' } }, "Start Hour")),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", { className: 'timepicker-control-section range' },
                                        React.createElement(ej2_react_calendars_1.TimePickerComponent, { id: 'startTime', width: 100, value: new Date(2000, 0, 1, 8), format: 'HH:mm' })))),
                            React.createElement("tr", { id: '', style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", { className: 'col-md-4', style: { paddingTop: '8px' } }, "End Hour")),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", { className: 'timepicker-control-section range' },
                                        React.createElement(ej2_react_calendars_1.TimePickerComponent, { id: 'endTime', width: 100, value: new Date(2000, 0, 1, 20), format: 'HH:mm' })))),
                            React.createElement("tr", { id: '', style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", { className: 'evtbtn', style: { paddingBottom: '10px' } },
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'submit', title: 'Submit', onClick: this.onSubmit.bind(this) }, "Submit")))))))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This demo depicts how to restrict the start and end hours of Schedule, thus limiting it to display only the given hour range.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "In this demo, the Scheduler is made to display from 8 AM to 8 PM and the rest of the hours are hidden, as it is restricted to start from ",
                    React.createElement("code", null, "08:00"),
                    " hours and end on ",
                    React.createElement("code", null, "20:00"),
                    " hours by setting to ",
                    React.createElement("code", null, "startHour"),
                    " and ",
                    React.createElement("code", null, "endHour"),
                    " properties respectively."))));
    };
    return DayHourLimit;
}(sample_base_1.SampleBase));
exports.DayHourLimit = DayHourLimit;
