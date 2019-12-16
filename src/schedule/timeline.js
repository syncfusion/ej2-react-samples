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
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var dataSource = require("./datasource.json");
/**
 * Schedule timeline sample
 */
var TimelineView = /** @class */ (function (_super) {
    __extends(TimelineView, _super);
    function TimelineView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = ej2_base_1.extend([], dataSource.scheduleData.concat(dataSource.timelineData), null, true);
        return _this;
    }
    TimelineView.prototype.change = function (args) {
        this.scheduleObj.selectedDate = args.value;
        this.scheduleObj.dataBind();
    };
    TimelineView.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-9 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { height: '650px', ref: function (schedule) { return _this.scheduleObj = schedule; }, selectedDate: new Date(2019, 0, 10), eventSettings: { dataSource: this.data } },
                        React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineDay' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineWeek' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineWorkWeek' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineMonth' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Agenda' })),
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.TimelineViews, ej2_react_schedule_1.TimelineMonth, ej2_react_schedule_1.Agenda, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
            React.createElement("div", { className: 'col-lg-3 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", { className: 'col-md-4', style: { paddingTop: '8px' } }, "Current Date")),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", { className: 'datepicker-control-section' },
                                        React.createElement(ej2_react_calendars_1.DatePickerComponent, { value: new Date(2019, 0, 10), showClearButton: false, change: this.change.bind(this) })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This demo showcases how the timeline scheduler looks like with its default set of configurations.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null, "Like the vertical scheduler, timeline view has the similar view types such as    "),
                React.createElement("ul", null,
                    React.createElement("li", null, "Timeline Day"),
                    React.createElement("li", null, "Timeline Week"),
                    React.createElement("li", null, "Timeline WorkWeek"),
                    React.createElement("li", null, "Timeline Month")),
                React.createElement("p", null, "The Agenda and MonthAgenda views shares the same layout for both the vertical and timeline views."),
                React.createElement("p", null,
                    "To use any of the timeline views such as day, week and work week in your application, the common",
                    React.createElement("code", null, "TimelineViews"),
                    " module needs to be injected using",
                    React.createElement("code", null, "services"),
                    " property under ",
                    React.createElement("code", null, "Inject"),
                    " tag. If in case, the timeline month view needs to be utilized, then",
                    React.createElement("code", null, "TimelineMonth"),
                    " module needs to be injected."))));
    };
    return TimelineView;
}(sample_base_1.SampleBase));
exports.TimelineView = TimelineView;
