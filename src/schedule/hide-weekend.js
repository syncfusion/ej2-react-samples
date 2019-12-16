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
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var dataSource = require("./datasource.json");
/**
 *  Schedule hide non-working days sample
 */
ej2_react_dropdowns_1.MultiSelectComponent.Inject(ej2_react_dropdowns_1.CheckBoxSelection);
var HideWeekend = /** @class */ (function (_super) {
    __extends(HideWeekend, _super);
    function HideWeekend() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = ej2_base_1.extend([], dataSource.employeeEventData, null, true);
        _this.weekDays = [
            { Name: 'Sunday', Value: '0' },
            { Name: 'Monday', Value: '1' },
            { Name: 'Tuesday', Value: '2' },
            { Name: 'Wednesday', Value: '3' },
            { Name: 'Thursday', Value: '4' },
            { Name: 'Friday', Value: '5' },
            { Name: 'Saturday', Value: '6' }
        ];
        // maps the appropriate column to fields property
        _this.localFields = { text: 'Name', value: 'Value' };
        _this.value = ['1', '3', '4', '5'];
        return _this;
    }
    HideWeekend.prototype.onChange = function () {
        if (this.btnObj.element.classList.contains('e-active')) {
            this.btnObj.content = 'Hide';
            this.scheduleObj.showWeekend = true;
        }
        else {
            this.btnObj.content = 'Show';
            this.scheduleObj.showWeekend = false;
        }
    };
    HideWeekend.prototype.onMultiSelectChange = function (args) {
        var value = args.value.slice(0).map(Number).sort();
        this.scheduleObj.workDays = value.length === 0 ? [0] : value;
        this.scheduleObj.dataBind();
    };
    HideWeekend.prototype.OnEventRendered = function (args) {
        helper_1.applyCategoryColor(args, this.scheduleObj.currentView);
    };
    HideWeekend.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-9 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { width: '100%', height: '650px', ref: function (t) { return _this.scheduleObj = t; }, workDays: [1, 3, 4, 5], workHours: { start: '08:00' }, selectedDate: new Date(2018, 1, 15), eventSettings: { dataSource: this.data }, showWeekend: false, eventRendered: this.OnEventRendered.bind(this) },
                        React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Day' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Week' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineWeek' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineMonth' })),
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.Month, ej2_react_schedule_1.TimelineViews, ej2_react_schedule_1.TimelineMonth, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
            React.createElement("div", { className: 'col-lg-3 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { id: '', style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", { className: 'col-md-4', style: { paddingTop: '8px' } }, "Working days")),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", { className: 'multi-prop' },
                                        React.createElement("div", { className: 'workdayscheckbox', style: { paddingBottom: '10px' } },
                                            React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: 'workdayscheckbox', dataSource: this.weekDays, fields: this.localFields, mode: 'CheckBox', value: this.value, showDropDownIcon: true, showClearButton: false, popupWidth: 180, change: this.onMultiSelectChange.bind(this) }))))),
                            React.createElement("tr", { id: '', style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", { className: 'col-md-4', style: { paddingTop: '8px' } }, "Non-Working days")),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", { className: 'evtbtn', style: { paddingBottom: '10px' } },
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { title: 'Show/hide weekend', ref: function (scope) { _this.btnObj = scope; }, isToggle: true, onClick: this.onChange.bind(this) }, "Show")))))))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This demo depicts the way to show or hide the weekend days of a week on Scheduler. The days whichever not specified in working days collections will be taken into consideration as weekend days.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "In this demo, the ",
                    React.createElement("code", null, "showWeekend"),
                    " property is used either to show or hide the weekend days of a week and it is not applicable on ",
                    React.createElement("code", null, "workweek"),
                    " view. By default, it is set to ",
                    React.createElement("code", null, "true"),
                    ". The days which are not a part of the working days collection of a Scheduler are usually considered as weekend days here."),
                React.createElement("p", null,
                    "Here, the working days are defined as ",
                    React.createElement("code", null, "[1, 3, 4, 5]"),
                    " on Scheduler. Therefore, the remaining days (0, 2, 6 \u2013 Sunday, Tuesday and Saturday) are considered as weekend days and will be hidden from the views as the ",
                    React.createElement("code", null, "showWeekend"),
                    " property is set to false."))));
    };
    return HideWeekend;
}(sample_base_1.SampleBase));
exports.HideWeekend = HideWeekend;
