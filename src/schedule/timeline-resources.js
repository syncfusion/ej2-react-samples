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
require("./timeline-resources.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
/**
 * schedule room scheduler sample
 */
var TimelineResource = /** @class */ (function (_super) {
    __extends(TimelineResource, _super);
    function TimelineResource() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = ej2_base_1.extend([], dataSource.roomData, null, true);
        _this.instance = new ej2_base_1.Internationalization();
        _this.ownerData = [
            { text: 'Jammy', id: 1, color: '#ea7a57', capacity: 20, type: 'Conference' },
            { text: 'Tweety', id: 2, color: '#7fa900', capacity: 7, type: 'Cabin' },
            { text: 'Nestle', id: 3, color: '#5978ee', capacity: 5, type: 'Cabin' },
            { text: 'Phoenix', id: 4, color: '#fec200', capacity: 15, type: 'Conference' },
            { text: 'Mission', id: 5, color: '#df5286', capacity: 25, type: 'Conference' },
            { text: 'Hangout', id: 6, color: '#00bdae', capacity: 10, type: 'Cabin' },
            { text: 'Rick Roll', id: 7, color: '#865fcf', capacity: 20, type: 'Conference' },
            { text: 'Rainbow', id: 8, color: '#1aaa55', capacity: 8, type: 'Cabin' },
            { text: 'Swarm', id: 9, color: '#df5286', capacity: 30, type: 'Conference' },
            { text: 'Photogenic', id: 10, color: '#710193', capacity: 25, type: 'Conference' }
        ];
        return _this;
    }
    TimelineResource.prototype.getRoomName = function (value) {
        return value.resourceData[value.resource.textField];
    };
    TimelineResource.prototype.getRoomType = function (value) {
        return value.resourceData.type;
    };
    TimelineResource.prototype.getRoomCapacity = function (value) {
        return value.resourceData.capacity;
    };
    TimelineResource.prototype.isReadOnly = function (endDate) {
        return (endDate < new Date(2018, 6, 31, 0, 0));
    };
    TimelineResource.prototype.resourceHeaderTemplate = function (props) {
        return (React.createElement("div", { className: "template-wrap" },
            React.createElement("div", { className: "room-name" }, this.getRoomName(props)),
            React.createElement("div", { className: "room-type" }, this.getRoomType(props)),
            React.createElement("div", { className: "room-capacity" }, this.getRoomCapacity(props))));
    };
    TimelineResource.prototype.onActionBegin = function (args) {
        if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
            var data = void 0;
            if (args.requestType === 'eventCreate') {
                data = args.data[0];
            }
            else if (args.requestType === 'eventChange') {
                data = args.data;
            }
            if (!this.scheduleObj.isSlotAvailable(data)) {
                args.cancel = true;
            }
        }
    };
    TimelineResource.prototype.onEventRendered = function (args) {
        var data = args.data;
        if (this.isReadOnly(data.EndTime)) {
            args.element.setAttribute('aria-readonly', 'true');
            args.element.classList.add('e-read-only');
        }
    };
    TimelineResource.prototype.onRenderCell = function (args) {
        if (args.element.classList.contains('e-work-cells')) {
            if (args.date < new Date(2018, 6, 31, 0, 0)) {
                args.element.setAttribute('aria-readonly', 'true');
                args.element.classList.add('e-read-only-cells');
            }
        }
        if (args.elementType === 'emptyCells' && args.element.classList.contains('e-resource-left-td')) {
            var target = args.element.querySelector('.e-resource-text');
            target.innerHTML = '<div class="name">Rooms</div><div class="type">Type</div><div class="capacity">Capacity</div>';
        }
    };
    TimelineResource.prototype.onPopupOpen = function (args) {
        var data = args.data;
        if (args.type === 'QuickInfo' || args.type === 'Editor' || args.type === 'RecurrenceAlert' || args.type === 'DeleteAlert') {
            var target = (args.type === 'RecurrenceAlert' ||
                args.type === 'DeleteAlert') ? data.element[0] : args.target;
            if (!ej2_base_1.isNullOrUndefined(target) && target.classList.contains('e-work-cells')) {
                if ((target.classList.contains('e-read-only-cells')) ||
                    (!this.scheduleObj.isSlotAvailable(data))) {
                    args.cancel = true;
                }
            }
            else if (!ej2_base_1.isNullOrUndefined(target) && target.classList.contains('e-appointment') &&
                (this.isReadOnly(data.EndTime))) {
                args.cancel = true;
            }
        }
    };
    TimelineResource.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-12 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { cssClass: 'timeline-resource', ref: function (schedule) { return _this.scheduleObj = schedule; }, width: '100%', height: '650px', selectedDate: new Date(2018, 7, 1), workHours: { start: '08:00', end: '18:00' }, timeScale: { interval: 60, slotCount: 1 }, resourceHeaderTemplate: this.resourceHeaderTemplate.bind(this), eventSettings: {
                            dataSource: this.data,
                            fields: {
                                id: 'Id',
                                subject: { title: 'Summary', name: 'Subject' },
                                location: { title: 'Location', name: 'Location' },
                                description: { title: 'Comments', name: 'Description' },
                                startTime: { title: 'From', name: 'StartTime' },
                                endTime: { title: 'To', name: 'EndTime' }
                            }
                        }, eventRendered: this.onEventRendered.bind(this), popupOpen: this.onPopupOpen.bind(this), actionBegin: this.onActionBegin.bind(this), renderCell: this.onRenderCell.bind(this), group: { enableCompactView: false, resources: ['MeetingRoom'] } },
                        React.createElement(ej2_react_schedule_1.ResourcesDirective, null,
                            React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'RoomId', title: 'Room Type', name: 'MeetingRoom', allowMultiple: true, dataSource: this.ownerData, textField: 'text', idField: 'id', colorField: 'color' })),
                        React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineDay' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineWeek' })),
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.TimelineViews, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This demo showcases the scheduler that lists out the meeting rooms of an office and its availability. The slots which are already booked and the lunch time can\u2019t be allowed for any new bookings. Also, the existing bookings which were made on past dates were not allowed to edit as well as the new bookings on those past dates will also be not allowed.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Here, the timeline view is grouped with single level of resources by making use of the",
                    React.createElement("code", null, "group"),
                    " property. Also, the lunch time blocking is done by block event. The event editor and popup is prevented to open on those blocked time slots as well as on the past bookings by making use of the",
                    React.createElement("code", null, "popupOpen"),
                    " event. The",
                    React.createElement("code", null, "eventRendered"),
                    " event is utilized in order to make the bookings done on past dates as read-only. To block more than one bookings per slot, the",
                    React.createElement("code", null, "isSlotAvailable"),
                    " method is used. Also, the resource header displayed at the left panel is customized to render as columns with the help of",
                    React.createElement("code", null, "resourceHeaderTemplate"),
                    ". The tooltip for resource header is customized by defining the",
                    React.createElement("code", null, "headerTooltipTemplate"),
                    " property within the",
                    React.createElement("code", null, "group"),
                    " API."),
                React.createElement("p", null,
                    React.createElement("b", null, "Note:"),
                    " The dates which lies beyond the current date set to scheduler through",
                    React.createElement("code", null, "selectedDate"),
                    " property is considered as the past dates here in this sample."))));
    };
    return TimelineResource;
}(sample_base_1.SampleBase));
exports.TimelineResource = TimelineResource;
