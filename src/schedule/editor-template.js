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
require("./editor-template.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
/**
 * Schedule editor template sample
 */
var EditorTemplate = /** @class */ (function (_super) {
    __extends(EditorTemplate, _super);
    function EditorTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = ej2_base_1.extend([], dataSource.doctorsEventData, null, true);
        return _this;
    }
    EditorTemplate.prototype.onEventRendered = function (args) {
        switch (args.data.EventType) {
            case 'Requested':
                args.element.style.backgroundColor = '#F57F17';
                break;
            case 'Confirmed':
                args.element.style.backgroundColor = '#7fa900';
                break;
            case 'New':
                args.element.style.backgroundColor = '#8e24aa';
                break;
        }
    };
    EditorTemplate.prototype.onActionBegin = function (args) {
        if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
            var data = args.data instanceof Array ? args.data[0] : args.data;
            if (!this.scheduleObj.isSlotAvailable(data.StartTime, data.EndTime)) {
                args.cancel = true;
            }
        }
    };
    EditorTemplate.prototype.editorTemplate = function (props) {
        return ((props !== undefined) ? React.createElement("table", { className: "custom-event-editor", style: { width: '100%', cellpadding: '5' } },
            React.createElement("tbody", null,
                React.createElement("tr", null,
                    React.createElement("td", { className: "e-textlabel" }, "Summary"),
                    React.createElement("td", { style: { colspan: '4' } },
                        React.createElement("input", { id: "Summary", className: "e-field e-input", type: "text", name: "Subject", style: { width: '100%' } }))),
                React.createElement("tr", null,
                    React.createElement("td", { className: "e-textlabel" }, "Status"),
                    React.createElement("td", { style: { colspan: '4' } },
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "EventType", placeholder: 'Choose status', "data-name": 'EventType', className: "e-field", style: { width: '100%' }, dataSource: ['New', 'Requested', 'Confirmed'] }))),
                React.createElement("tr", null,
                    React.createElement("td", { className: "e-textlabel" }, "From"),
                    React.createElement("td", { style: { colspan: '4' } },
                        React.createElement(ej2_react_calendars_1.DateTimePickerComponent, { id: "StartTime", format: 'dd/MM/yy hh:mm a', "data-name": "StartTime", value: new Date(props.startTime || props.StartTime), className: "e-field" }))),
                React.createElement("tr", null,
                    React.createElement("td", { className: "e-textlabel" }, "To"),
                    React.createElement("td", { style: { colspan: '4' } },
                        React.createElement(ej2_react_calendars_1.DateTimePickerComponent, { id: "EndTime", format: 'dd/MM/yy hh:mm a', "data-name": "EndTime", value: new Date(props.endTime || props.EndTime), className: "e-field" }))),
                React.createElement("tr", null,
                    React.createElement("td", { className: "e-textlabel" }, "Reason"),
                    React.createElement("td", { style: { colspan: '4' } },
                        React.createElement("textarea", { id: "Description", className: "e-field e-input", name: "Description", rows: 3, cols: 50, style: { width: '100%', height: '60px !important', resize: 'vertical' } }))))) : React.createElement("div", null));
    };
    EditorTemplate.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-12 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { width: '100%', height: '650px', selectedDate: new Date(2018, 1, 15), ref: function (schedule) { return _this.scheduleObj = schedule; }, eventSettings: { dataSource: this.data }, editorTemplate: this.editorTemplate.bind(this), actionBegin: this.onActionBegin.bind(this), showQuickInfo: false, eventRendered: this.onEventRendered.bind(this) },
                        React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Day' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Week' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'WorkWeek' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' })),
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This demo illustrates the way of customizing the default editor window with custom template option and the customized design is automatically replaced onto the usual event editor. Here, a doctor's daily appointment with his patients is listed out and shaded with specific color based on its status.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "In this demo, the event window is customized based on the doctor's required appointment related fields which can be achieved by making use of the ",
                    React.createElement("code", null, "editorTemplate"),
                    " API. Here, the custom design is built with the required fields through the script template and its type should be ",
                    React.createElement("code", null, "text/x-template"),
                    "."),
                React.createElement("p", null,
                    "Each field defined through it should contain the ",
                    React.createElement("code", null, "e-field"),
                    " class, so as to allow the processing of those fields in the default event object from internal source. The ID of this customized script template section is assigned to the ",
                    React.createElement("code", null, "editorTemplate"),
                    " option, so that this customized fields will be replaced onto the default editor window."),
                React.createElement("p", null,
                    "As we are using our Syncfusion sub-components within this editor in this demo, therefore the custom defined form elements needs to be configured as required Syncfusion components such as DropDownList and DateTimePicker which needs to be done within the ",
                    React.createElement("code", null, "popupOpen"),
                    " event. This particular step can be skipped, if the user needs to simply use the normal form design with applicable fields."),
                React.createElement("p", null,
                    "Within the ",
                    React.createElement("code", null, "eventRendered"),
                    " event that triggers before every appointment getting rendered on the Scheduler user interface, the colors for the appointments are set based on its status which is retrieved from the appointment data."),
                React.createElement("p", null,
                    "The additional restriction has been added to the Scheduler cells such that if a cell already contains an appointment \u2013 then it should be prevented to book with multiple appointments on the same time for which the ",
                    React.createElement("code", null, "isSlotAvailable"),
                    " method is used. This method returns true, if the underlying cell is available for adding new events by checking whether it already has any events in it."))));
    };
    return EditorTemplate;
}(sample_base_1.SampleBase));
exports.EditorTemplate = EditorTemplate;
