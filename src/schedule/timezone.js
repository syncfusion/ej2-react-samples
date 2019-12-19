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
var moment_timezone_1 = require("moment-timezone");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var dataSource = require("./datasource.json");
/**
 *  Schedule timezone events sample
 */
if (ej2_base_1.Browser.isIE) {
    ej2_react_schedule_1.Timezone.prototype.offset = function (date, timezone) {
        return moment_timezone_1.tz.zone(timezone).utcOffset(date.getTime());
    };
}
var TimeZone = (function (_super) {
    __extends(TimeZone, _super);
    function TimeZone() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fifaEvents = ej2_base_1.extend([], (dataSource.fifaEventsData), null, true);
        _this.timezone = new ej2_react_schedule_1.Timezone();
        _this.timeZoneOptions = [
            { text: '(UTC-05:00) Eastern Time', value: 'America/New_York' },
            { text: 'UTC', value: 'UTC' },
            { text: '(UTC+03:00) Moscow+00 - Moscow', value: 'Europe/Moscow' },
            { text: '(UTC+05:30) India Standard Time', value: 'Asia/Kolkata' },
            { text: '(UTC+08:00) Western Time - Perth', value: 'Australia/Perth' }
        ];
        _this.fields = { text: 'text', value: 'value' };
        return _this;
    }
    // Here remove the local offset from events
    TimeZone.prototype.onCreate = function () {
        for (var _i = 0, _a = this.fifaEvents; _i < _a.length; _i++) {
            var fifaEvent = _a[_i];
            var event_1 = fifaEvent;
            event_1.StartTime = this.timezone.removeLocalOffset(new Date(event_1.StartTime));
            event_1.EndTime = this.timezone.removeLocalOffset(new Date(event_1.EndTime));
        }
    };
    TimeZone.prototype.onEventRendered = function (args) {
        helper_1.applyCategoryColor(args, this.scheduleObj.currentView);
    };
    TimeZone.prototype.onTimeZoneChange = function (args) {
        this.scheduleObj.timezone = args.value;
        this.scheduleObj.dataBind();
    };
    TimeZone.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-9 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { width: '100%', height: '650px', ref: function (schedule) { return _this.scheduleObj = schedule; }, selectedDate: new Date(2018, 5, 20), timezone: 'UTC', workHours: { start: '11:00' }, eventSettings: { dataSource: this.fifaEvents }, created: this.onCreate.bind(this), eventRendered: this.onEventRendered.bind(this) },
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.Agenda, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
            React.createElement("div", { className: 'col-lg-3 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", { className: 'col-md-4', style: { paddingTop: '8px' } }, "Timezone")),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { style: { padding: '6px' }, value: 'UTC', popupWidth: '250px', fields: this.fields, dataSource: this.timeZoneOptions, change: this.onTimeZoneChange.bind(this) })))))))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This demo visualizes the 2018 FIFA football match scheduler which is depicted as events here. The timings of each event are associated with the timezone of the match location where it will be held. When the Scheduler time zone changes, the events in it displays according to the selected timezone's offset time difference.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "In this demo, the ",
                    React.createElement("code", null, "timezone"),
                    " of Scheduler is set to UTC and each events on it holds different ",
                    React.createElement("code", null, "startTimezone"),
                    " and ",
                    React.createElement("code", null, "endTimezone"),
                    " values, therefore the event timings will be converted based on timezone assigned to Scheduler and will be displayed appropriately in UTC timings."),
                React.createElement("p", null,
                    "When the user selects different timezone value listed out in a dropdown on properties panel, Scheduler will display the events accordingly to the selected timezone value as the selected timezone will be assigned to Scheduler ",
                    React.createElement("code", null, "timezone"),
                    " property."))));
    };
    return TimeZone;
}(sample_base_1.SampleBase));
exports.TimeZone = TimeZone;
