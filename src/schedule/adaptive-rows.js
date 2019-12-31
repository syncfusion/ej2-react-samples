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
require("./adaptive-rows.css");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var dataSource = require("./datasource.json");
var ej2_base_1 = require("@syncfusion/ej2-base");
/**
 * schedule adaptive rows sample
 */
var AdaptiveRows = (function (_super) {
    __extends(AdaptiveRows, _super);
    function AdaptiveRows() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = ej2_base_1.extend([], dataSource.roomData, null, true);
        _this.ownerData = [
            { text: 'Room A', id: 1, color: '#98AFC7' },
            { text: 'Room B', id: 2, color: '#99c68e' },
            { text: 'Room C', id: 3, color: '#C2B280' },
            { text: 'Room D', id: 4, color: '#3090C7' },
            { text: 'Room E', id: 5, color: '#95b9' },
            { text: 'Room F', id: 6, color: '#95b9c7' },
            { text: 'Room G', id: 7, color: '#deb887' },
            { text: 'Room H', id: 8, color: '#3090C7' },
            { text: 'Room I', id: 9, color: '#98AFC7' },
            { text: 'Room J', id: 10, color: '#778899' }
        ];
        return _this;
    }
    AdaptiveRows.prototype.onChange = function (args) {
        this.scheduleObj.rowAutoHeight = args.checked;
    };
    AdaptiveRows.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-9 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { cssClass: 'adaptive-rows', ref: function (schedule) { return _this.scheduleObj = schedule; }, width: '100%', height: '650px', selectedDate: new Date(2018, 7, 1), rowAutoHeight: true, eventSettings: {
                            dataSource: this.data,
                            fields: {
                                id: 'Id',
                                subject: { title: 'Summary', name: 'Subject' },
                                location: { title: 'Location', name: 'Location' },
                                description: { title: 'Comments', name: 'Description' },
                                startTime: { title: 'From', name: 'StartTime' },
                                endTime: { title: 'To', name: 'EndTime' }
                            }
                        }, group: { enableCompactView: false, resources: ['MeetingRoom'] } },
                        React.createElement(ej2_react_schedule_1.ResourcesDirective, null,
                            React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'RoomId', title: 'Room Type', name: 'MeetingRoom', allowMultiple: true, dataSource: this.ownerData, textField: 'text', idField: 'id', colorField: 'color' })),
                        React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineDay' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineWeek' })),
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.TimelineViews, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
            React.createElement("div", { className: 'col-lg-3 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '100%' } },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'adaptive-rows', checked: true, label: 'Row Auto Height', change: this.onChange.bind(this) }))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example showcases how the work-cells of Scheduler auto-adjust its height based on the number of appointments present in those time ranges.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, ",
                    React.createElement("code", null, "rowAutoHeight"),
                    " property is set as ",
                    React.createElement("code", null, "true"),
                    " to auto-adjust the height of work cells based on the number of appointments present in the same time ranges. Also, this functionality is applicable only on all the timeline views as well as on the calendar month view. When this option is disabled, the height of the work cells remains static and at the time of exceeding appointments count, the ",
                    React.createElement("code", null, "+n more"),
                    " text indicator will be shown at the bottom of the cells."))));
    };
    return AdaptiveRows;
}(sample_base_1.SampleBase));
exports.AdaptiveRows = AdaptiveRows;
