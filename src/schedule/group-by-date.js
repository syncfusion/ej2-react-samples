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
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
/**
 * schedule resources group-bydate sample
 */
var GroupByDate = (function (_super) {
    __extends(GroupByDate, _super);
    function GroupByDate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = ej2_base_1.extend([], dataSource.resourceData, null, true);
        _this.resourceData = [
            { text: 'Alice', id: 1, color: '#1aaa55' },
            { text: 'Smith', id: 2, color: '#7fa900' },
        ];
        return _this;
    }
    GroupByDate.prototype.render = function () {
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-12 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { width: '100%', height: '650px', selectedDate: new Date(2018, 3, 1), eventSettings: {
                            dataSource: this.data, fields: {
                                subject: { title: 'Task', name: 'Subject' },
                                location: { title: 'Project Name', name: 'Location' },
                                description: { title: 'Comments', name: 'Description' }
                            }
                        }, group: { byDate: true, resources: ['Owners'] } },
                        React.createElement(ej2_react_schedule_1.ResourcesDirective, null,
                            React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'TaskId', title: 'Assignee', name: 'Owners', allowMultiple: true, dataSource: this.resourceData, textField: 'text', idField: 'id', colorField: 'color' })),
                        React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Day' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Week' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Agenda' })),
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.Month, ej2_react_schedule_1.Agenda, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This demo illustrates the daily tasks of two employees grouped by date-wise.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this demo, there are 2 resources defined namely",
                    React.createElement("strong", null, "Alice"),
                    " and",
                    React.createElement("strong", null, "Smith"),
                    " under the resource",
                    React.createElement("code", null, "dataSource"),
                    ". The Scheduler can be switched to group by date, by setting",
                    React.createElement("code", null, "true"),
                    " to the option",
                    React.createElement("code", null, "byDate"),
                    " within the",
                    React.createElement("code", null, "group"),
                    " property."))));
    };
    return GroupByDate;
}(sample_base_1.SampleBase));
exports.GroupByDate = GroupByDate;
