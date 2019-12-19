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
require("./schedule-component.css");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
/**
 * Schedule Year view sample
 */
var Year = (function (_super) {
    __extends(Year, _super);
    function Year() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = _this.generateEvents();
        _this.orientationOptions = [
            { text: 'Horizontal', value: 'Horizontal' },
            { text: 'Vertical', value: 'Vertical' }
        ];
        _this.fields = { text: 'text', value: 'value' };
        return _this;
    }
    Year.prototype.orientationChange = function (args) {
        this.scheduleObj.views = [{ option: 'TimelineYear', orientation: args.value }];
        this.scheduleObj.dataBind();
    };
    Year.prototype.onEventRendered = function (args) {
        this.applyEventColor(args);
    };
    Year.prototype.generateEvents = function (count, yearCount, date) {
        if (count === void 0) { count = 250; }
        if (yearCount === void 0) { yearCount = 5; }
        if (date === void 0) { date = new Date(); }
        var names = [
            'Bering Sea Gold', 'Technology', 'Maintenance', 'Meeting', 'Travelling', 'Annual Conference', 'Birthday Celebration',
            'Farewell Celebration', 'Wedding Aniversary', 'Alaska: The Last Frontier', 'Deadest Catch', 'Sports Day',
            'MoonShiners', 'Close Encounters', 'HighWay Thru Hell', 'Daily Planet', 'Cash Cab', 'Basketball Practice',
            'Rugby Match', 'Guitar Class', 'Music Lessons', 'Doctor checkup', 'Brazil - Mexico', 'Opening ceremony', 'Final presentation'
        ];
        var colors = [
            '#ff8787', '#9775fa', '#748ffc', '#3bc9db', '#69db7c',
            '#fdd835', '#748ffc', '#9775fa', '#df5286', '#7fa900',
            '#fec200', '#5978ee', '#00bdae', '#ea80fc'
        ];
        var startDate = new Date(date.getFullYear() - 2, 0, 1);
        var endDate = new Date(date.getFullYear() + 2, 11, 31);
        var dateCollections = [];
        for (var a = 0, id = 1; a < count; a++) {
            var start = new Date(Math.random() * (endDate.getTime() - startDate.getTime()) + startDate.getTime());
            var end = new Date(new Date(start.getTime()).setHours(start.getHours() + 1));
            var nCount = Math.floor(Math.random() * names.length);
            var n = Math.floor(Math.random() * colors.length);
            dateCollections.push({
                Id: id,
                Subject: names[nCount],
                StartTime: new Date(start.getTime()),
                EndTime: new Date(end.getTime()),
                IsAllDay: (id % 10) ? true : false,
                EventColor: colors[n]
            });
            id++;
        }
        return dateCollections;
    };
    Year.prototype.applyEventColor = function (args) {
        var eventColor = args.data.EventColor;
        if (!args.element || !eventColor) {
            return;
        }
        else {
            args.element.style.backgroundColor = eventColor;
        }
    };
    Year.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-9 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { width: '100%', height: '555px', ref: function (schedule) { return _this.scheduleObj = schedule; }, currentView: 'WorkWeek', eventSettings: { dataSource: this.data }, eventRendered: this.onEventRendered.bind(this) },
                        React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineYear', displayName: 'Horizontal Year' })),
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.TimelineYear] })))),
            React.createElement("div", { className: 'col-lg-3 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", { className: 'col-md-4', style: { paddingTop: '8px' } }, "Orientation")),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { style: { padding: '6px' }, value: 'Horizontal', dataSource: this.orientationOptions, fields: this.fields, change: this.orientationChange.bind(this), popupWidth: '180px' })))))))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This demo showcases how the scheduler looks like in Year view with its default set of configurations.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "This demo showcases how the scheduler looks like in Year view with its default set of configurations. In this demo, the active view of Scheduler is set to",
                    React.createElement("code", null, "Vertical Year"),
                    " and ",
                    React.createElement("code", null, "Horizontal Year"),
                    " view options are provided to",
                    React.createElement("code", null, "views"),
                    " property."),
                React.createElement("p", null,
                    React.createElement("strong", null, "Module Injection")),
                React.createElement("p", null,
                    "To work with Year view on Scheduler \u2013 it is necessary to inject the TimelineYear module like using ",
                    React.createElement("code", null, "services"),
                    " property under ",
                    React.createElement("code", null, "Inject"),
                    " tag."))));
    };
    return Year;
}(sample_base_1.SampleBase));
exports.Year = Year;
