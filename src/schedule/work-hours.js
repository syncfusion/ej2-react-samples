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
 * Schedule Work Hour sample
 */
var WorkHours = /** @class */ (function (_super) {
    __extends(WorkHours, _super);
    function WorkHours() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = ej2_base_1.extend([], dataSource.employeeEventData, null, true);
        return _this;
    }
    WorkHours.prototype.onSubmit = function () {
        var start = document.getElementById('startTime');
        var end = document.getElementById('endTime');
        this.scheduleObj.workHours.start = start.value;
        this.scheduleObj.workHours.end = end.value;
    };
    WorkHours.prototype.onEventRendered = function (args) {
        helper_1.applyCategoryColor(args, this.scheduleObj.currentView);
    };
    WorkHours.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-9 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { width: '100%', height: '650px', ref: function (schedule) { return _this.scheduleObj = schedule; }, selectedDate: new Date(2018, 1, 15), eventSettings: { dataSource: this.data }, workHours: { highlight: true, start: '08:00', end: '20:00' }, eventRendered: this.onEventRendered.bind(this) },
                        React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Day' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Week' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'WorkWeek' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineWeek' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineMonth' })),
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.TimelineViews, ej2_react_schedule_1.TimelineMonth, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
            React.createElement("div", { className: 'col-lg-3 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", { className: 'col-md-4', style: { paddingTop: '8px' } }, "Work Start")),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", { className: 'timepicker-control-section range' },
                                        React.createElement(ej2_react_calendars_1.TimePickerComponent, { id: 'startTime', width: 100, value: new Date(2000, 0, 1, 8), format: 'HH:mm' })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", { className: 'col-md-4', style: { paddingTop: '8px' } }, "Work End")),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", { className: 'timepicker-control-section range' },
                                        React.createElement(ej2_react_calendars_1.TimePickerComponent, { id: 'endTime', width: 100, value: new Date(2000, 0, 1, 20), format: 'HH:mm' })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", { className: 'evtbtn', style: { paddingBottom: '10px' } },
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'submit', title: 'Submit', onClick: this.onSubmit.bind(this) }, "Submit")))))))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This demo showcases how to set the required working hours on Schedule, thus visually highlighting the cells underlying the given work hour range.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "In this demo, the work hours are set by using the ",
                    React.createElement("code", null, "workHours"),
                    " property and it usually applies only on the working days defined for the Schedule. It can either be highlighted or not by defining the ",
                    React.createElement("code", null, "highlight"),
                    " option within the ",
                    React.createElement("code", null, "workHours"),
                    " property. The working hour range can be defined by making use of the ",
                    React.createElement("code", null, "start"),
                    " and ",
                    React.createElement("code", null, "end"),
                    " option available within the ",
                    React.createElement("code", null, "workHours"),
                    " property."),
                React.createElement("p", null,
                    "To set discontinuous working hours on a day, then the default ",
                    React.createElement("code", null, "workHours"),
                    " on Scheduler needs to be disabled by setting false to ",
                    React.createElement("code", null, "highlight"),
                    " option within it. Then, make use of the ",
                    React.createElement("code", null, "setWorkHours"),
                    " method which accepts the days collection and the start & end hour values as parameters."))));
    };
    return WorkHours;
}(sample_base_1.SampleBase));
exports.WorkHours = WorkHours;
