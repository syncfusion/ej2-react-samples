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
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
var helper_1 = require("./helper");
require("./schedule-component.css");
var ej2_dropdowns_1 = require("@syncfusion/ej2-dropdowns");
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
/**
 *  Schedule editor custom fields sample
 */
var EditorCustomField = (function (_super) {
    __extends(EditorCustomField, _super);
    function EditorCustomField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = ej2_base_1.extend([], dataSource.eventsData, null, true);
        return _this;
    }
    EditorCustomField.prototype.onPopupOpen = function (args) {
        if (args.type === 'Editor') {
            // Create required custom elements in initial time
            if (!args.element.querySelector('.custom-field-row')) {
                var row = ej2_base_1.createElement('div', { className: 'custom-field-row' });
                var formElement = args.element.querySelector('.e-schedule-form');
                formElement.firstChild.insertBefore(row, formElement.firstChild.firstChild);
                var container = ej2_base_1.createElement('div', { className: 'custom-field-container' });
                var inputEle = ej2_base_1.createElement('input', {
                    className: 'e-field', attrs: { name: 'EventType' }
                });
                container.appendChild(inputEle);
                row.appendChild(container);
                var drowDownList = new ej2_dropdowns_1.DropDownList({
                    dataSource: [
                        { text: 'Public Event', value: 'public-event' },
                        { text: 'Maintenance', value: 'maintenance' },
                        { text: 'Commercial Event', value: 'commercial-event' },
                        { text: 'Family Event', value: 'family-event' }
                    ],
                    fields: { text: 'text', value: 'value' },
                    value: args.data.EventType,
                    floatLabelType: 'Always', placeholder: 'Event Type'
                });
                drowDownList.appendTo(inputEle);
                inputEle.setAttribute('name', 'EventType');
            }
        }
    };
    EditorCustomField.prototype.onEventRendered = function (args) {
        helper_1.applyCategoryColor(args, this.scheduleObj.currentView);
    };
    EditorCustomField.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-12 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { width: '100%', height: '650px', selectedDate: new Date(2018, 1, 15), ref: function (t) { return _this.scheduleObj = t; }, eventSettings: { dataSource: this.data }, popupOpen: this.onPopupOpen.bind(this), eventRendered: this.onEventRendered.bind(this) },
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.Agenda, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null,
                    "This demo shows how to add additional fields to the default editor window. Here, an additional field ",
                    React.createElement("code", null, "Event Type"),
                    " has been added to the default event editor and its value is processed accordingly.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "In this demo, the additional field is added to the default event editor by making use of the",
                    React.createElement("code", null, "popupOpen"),
                    " event which gets triggered before the event editor getting opened on Scheduler.",
                    React.createElement("code", null, "popupOpen"),
                    " is a client-side event that triggers before any of the popups getting opened on Scheduler."),
                React.createElement("p", null,
                    "Here, the additional field (any of the form elements) is needed to be provided with the common class",
                    React.createElement("code", null, "e-field"),
                    ", so as to handle and process those additional data into the default event object."))));
    };
    return EditorCustomField;
}(sample_base_1.SampleBase));
exports.EditorCustomField = EditorCustomField;
