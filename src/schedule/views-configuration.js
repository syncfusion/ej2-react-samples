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
require("./views-configuration.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
/**
 *  Schedule view based configuration sample
 */
var ViewConfigurations = /** @class */ (function (_super) {
    __extends(ViewConfigurations, _super);
    function ViewConfigurations() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = ej2_base_1.extend([], dataSource.fifaEventsData, null, true);
        _this.instance = new ej2_base_1.Internationalization();
        _this.resourceData = [
            { GroupText: 'Group A', GroupId: 1, GroupColor: '#1aaa55' },
            { GroupText: 'Group B', GroupId: 2, GroupColor: '#357cd2' }
        ];
        return _this;
    }
    ViewConfigurations.prototype.getTimeString = function (value) {
        return this.instance.formatDate(value, { skeleton: 'Hm' });
    };
    ViewConfigurations.prototype.agendaTemplate = function (props) {
        return (React.createElement("div", null,
            React.createElement("div", { className: "subject " }, props.Subject),
            (props.Description !== null && props.Description !== undefined && props.Description !== "") ?
                React.createElement("div", { className: "group" }, props.Description) : "",
            React.createElement("div", { className: "location" },
                this.getTimeString(props.StartTime),
                (props.City !== null && props.City !== undefined && props.City !== "") ? ", " + props.City : "")));
    };
    ViewConfigurations.prototype.monthEventTemplate = function (props) {
        return (React.createElement("div", { className: "subject" }, props.Subject));
    };
    ViewConfigurations.prototype.onEventRendered = function (args) {
        helper_1.applyCategoryColor(args, this.scheduleObj.currentView);
    };
    ViewConfigurations.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-12 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { cssClass: 'schedule-views-config', width: '100%', height: '650px', ref: function (t) { return _this.scheduleObj = t; }, currentView: 'Month', selectedDate: new Date(2018, 5, 20), eventSettings: { dataSource: this.data, fields: { location: { name: 'City' } } }, eventRendered: this.onEventRendered.bind(this) },
                        React.createElement(ej2_react_schedule_1.ResourcesDirective, null,
                            React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'GroupId', title: 'Owner', name: 'Owners', dataSource: this.resourceData, textField: 'GroupText', idField: 'GroupId', colorField: 'GroupColor' })),
                        React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Day', startHour: '07:00', endHour: '18:00' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Week', startHour: '09:00', endHour: '19:00', showWeekend: false, timeScale: { interval: 60, slotCount: 4 } }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month', group: { resources: ['Owners'] }, eventTemplate: this.monthEventTemplate.bind(this) }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Agenda', eventTemplate: this.agendaTemplate.bind(this) })),
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.Month, ej2_react_schedule_1.Agenda, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This demo illustrates how to customize each view with specific configurations like applying event template on agenda view, setting different start/end hour to day and week views and enabling grouping in month view. It also shows how to hide the weekend days and to set different time intervals on week view.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "In this demo, the  ",
                    React.createElement("code", null, "views"),
                    " property is defined to accept the array of view options and therefore for each view, it is possible to set different configurations. In day view, the the ",
                    React.createElement("code", null, "startHour"),
                    " is set to 7 and ",
                    React.createElement("code", null, "endHour"),
                    " set to 18 whereas in week view, the same is set as 9 and 19 respectively. Also, the ",
                    React.createElement("code", null, "showWeekend"),
                    " property is set to false only on week view along with different timescale interval. The customized template is applied to the events on Agenda view and on month view, the grouping functionality is enabled by setting",
                    React.createElement("code", null, "group"),
                    " property."))));
    };
    return ViewConfigurations;
}(sample_base_1.SampleBase));
exports.ViewConfigurations = ViewConfigurations;
