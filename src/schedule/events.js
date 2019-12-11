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
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var dataSource = require("./datasource.json");
/**
 * Schedule events sample
 */
var Events = /** @class */ (function (_super) {
    __extends(Events, _super);
    function Events() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = ej2_base_1.extend([], dataSource.scheduleData, null, true);
        return _this;
    }
    Events.prototype.onEventRendered = function (args) {
        helper_1.applyCategoryColor(args, this.scheduleObj.currentView);
    };
    Events.prototype.onClear = function () {
        document.getElementById('EventLog').innerHTML = '';
    };
    Events.prototype.onCreate = function () {
        this.appendElement('Schedule <b>Load</b> event called<hr>');
    };
    Events.prototype.onActionBegin = function () {
        this.appendElement('Schedule <b>Action Begin</b> event called<hr>');
    };
    Events.prototype.onActionComplete = function () {
        this.appendElement('Schedule <b>Action Complete</b> event called<hr>');
    };
    Events.prototype.onActionFailure = function () {
        this.appendElement('Schedule <b>Action Failure</b> event called<hr>');
    };
    Events.prototype.onCellDoubleClick = function () {
        this.appendElement('SChedule <b>Cell Double Click</b> event called<hr>');
    };
    Events.prototype.onCellClick = function () {
        this.appendElement('Schedule <b>Cell Click</b> event called<hr>');
    };
    Events.prototype.onNavigating = function () {
        this.appendElement('Schedule <b>Navigating</b> event called<hr>');
    };
    Events.prototype.onDestroyed = function () {
        this.appendElement('Schedule <b>Destroyed</b> event called<hr>');
    };
    Events.prototype.onEventClick = function () {
        this.appendElement('Schedule <b>Event Click</b> event called<hr>');
    };
    Events.prototype.onPopupOpen = function () {
        this.appendElement('Schedule <b>Popup Open</b> event called<hr>');
    };
    Events.prototype.appendElement = function (html) {
        var span = document.createElement('span');
        span.innerHTML = html;
        var log = document.getElementById('EventLog');
        log.insertBefore(span, log.firstChild);
    };
    Events.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-9 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { ref: function (schedule) { return _this.scheduleObj = schedule; }, width: '100%', height: '650px', selectedDate: new Date(2019, 0, 10), eventSettings: { dataSource: this.data }, created: this.onCreate.bind(this), eventRendered: this.onEventRendered.bind(this), actionBegin: this.onActionBegin.bind(this), actionComplete: this.onActionComplete.bind(this), actionFailure: this.onActionFailure.bind(this), cellClick: this.onCellClick.bind(this), cellDoubleClick: this.onCellDoubleClick.bind(this), destroyed: this.onDestroyed.bind(this), navigating: this.onNavigating.bind(this), eventClick: this.onEventClick.bind(this), popupOpen: this.onPopupOpen.bind(this) },
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.Agenda, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
            React.createElement("div", { className: 'col-lg-3 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Event Trace' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '250px' } },
                                React.createElement("td", null,
                                    React.createElement("div", { className: 'eventarea', style: { height: '245px', overflow: 'auto' } },
                                        React.createElement("span", { className: 'EventLog', id: 'EventLog', style: { wordBreak: 'normal' } })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", { className: 'evtbtn', style: { paddingBottom: '10px' } },
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { title: 'Clear', onClick: this.onClear.bind(this) }, "Clear")))))))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This demo illustrates the client-side events that triggers on respective Scheduler actions and the same is being displayed on the event trace panel.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null, "In this demo, the client-side events that triggers based on the action taking place in Scheduler has been demonstrated. The user can make use of these events, if at some point they need to perform some custom actions or any needed additional customizations on the available Scheduler features."))));
    };
    return Events;
}(sample_base_1.SampleBase));
exports.Events = Events;
