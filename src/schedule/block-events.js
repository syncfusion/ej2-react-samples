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
require("./block-events.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
/**
 * schedule block events sample
 */
var BlockEvents = (function (_super) {
    __extends(BlockEvents, _super);
    function BlockEvents() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = ej2_base_1.extend([], dataSource.blockData, null, true);
        _this.employeeData = [
            { Text: 'Alice', Id: 1, GroupId: 1, Color: '#bbdc00', Designation: 'Content writer' },
            { Text: 'Nancy', Id: 2, GroupId: 2, Color: '#9e5fff', Designation: 'Designer' },
            { Text: 'Robert', Id: 3, GroupId: 1, Color: '#bbdc00', Designation: 'Software Engineer' },
            { Text: 'Robson', Id: 4, GroupId: 2, Color: '#9e5fff', Designation: 'Support Engineer' },
            { Text: 'Laura', Id: 5, GroupId: 1, Color: '#bbdc00', Designation: 'Human Resource' },
            { Text: 'Margaret', Id: 6, GroupId: 2, Color: '#9e5fff', Designation: 'Content Analyst' }
        ];
        return _this;
    }
    BlockEvents.prototype.getEmployeeName = function (value) {
        return value.resourceData[value.resource.textField];
    };
    BlockEvents.prototype.getEmployeeImage = function (value) {
        var resourceName = this.getEmployeeName(value);
        return resourceName.toLowerCase();
    };
    BlockEvents.prototype.getEmployeeDesignation = function (value) {
        return value.resourceData.Designation;
    };
    BlockEvents.prototype.resourceHeaderTemplate = function (props) {
        return (React.createElement("div", { className: "template-wrap" },
            React.createElement("div", { className: "employee-category" },
                React.createElement("div", { className: "employee-image " + this.getEmployeeImage(props) }),
                React.createElement("div", { className: "employee-name" }, this.getEmployeeName(props)),
                React.createElement("div", { className: "employee-designation" }, this.getEmployeeDesignation(props)))));
    };
    BlockEvents.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-12 control-section' },
                React.createElement("div", { className: 'control-wrapper drag-sample-wrapper' },
                    React.createElement("div", { className: "schedule-container" },
                        React.createElement(ej2_react_schedule_1.ScheduleComponent, { ref: function (schedule) { return _this.scheduleObj = schedule; }, cssClass: 'block-events', width: '100%', height: '650px', selectedDate: new Date(2018, 7, 1), currentView: 'TimelineDay', resourceHeaderTemplate: this.resourceHeaderTemplate.bind(this), eventSettings: {
                                dataSource: this.data
                            }, group: { enableCompactView: false, resources: ['Employee'] } },
                            React.createElement(ej2_react_schedule_1.ResourcesDirective, null,
                                React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'EmployeeId', title: 'Employees', name: 'Employee', allowMultiple: true, dataSource: this.employeeData, textField: 'Text', idField: 'Id', colorField: 'Color' })),
                            React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                                React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Day' }),
                                React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineDay' }),
                                React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineMonth' })),
                            React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.TimelineViews, ej2_react_schedule_1.TimelineMonth, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example shows how to block specific time intervals or days on the Scheduler.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, few blocked events are defined to block the specific time range with the text \u201CUnavailable\u201D. No events can be created on those blocked time range as well as edited through it. These blocked events can be defined by setting ",
                    React.createElement("code", null, "isBlock"),
                    " field to true within the ",
                    React.createElement("code", null, "eventSettings"),
                    " and assigned altogether with the events ",
                    React.createElement("code", null, "dataSource"),
                    "."))));
    };
    return BlockEvents;
}(sample_base_1.SampleBase));
exports.BlockEvents = BlockEvents;
