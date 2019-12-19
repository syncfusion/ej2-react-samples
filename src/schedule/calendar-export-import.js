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
require("./calendar-export-import.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var dataSource = require("./datasource.json");
/**
 * Schedule ICS Export and Import sample
 */
var CalendarImportExport = (function (_super) {
    __extends(CalendarImportExport, _super);
    function CalendarImportExport(props) {
        var _this = _super.call(this, props) || this;
        _this.multiple = false;
        _this.showFileList = false;
        _this.allowedExtensions = '.ics';
        _this.data = ej2_base_1.extend([], dataSource.scheduleData, null, true);
        return _this;
    }
    CalendarImportExport.prototype.onClick = function () {
        this.scheduleObj.exportToICalendar();
    };
    CalendarImportExport.prototype.onSelect = function (args) {
        this.scheduleObj.importICalendar(args.event.target.files[0]);
    };
    CalendarImportExport.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-9 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { width: '100%', height: '650px', ref: function (schedule) { return _this.scheduleObj = schedule; }, selectedDate: new Date(2019, 0, 10), eventSettings: { dataSource: this.data } },
                        React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Day' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Week' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'WorkWeek' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Agenda' })),
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.Agenda, ej2_react_schedule_1.ICalendarExport, ej2_react_schedule_1.ICalendarImport, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
            React.createElement("div", { className: 'col-lg-3 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", { className: 'col-md-12', style: { paddingTop: '8px' } }, "Export as iCalendar")),
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", { className: 'evtbtn', style: { paddingBottom: '10px' } },
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'ics-export', title: 'Export', onClick: this.onClick.bind(this) }, "Export")))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", { className: 'col-md-12', style: { paddingTop: '8px' } }, "Import iCalendar file")),
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement(ej2_react_inputs_1.UploaderComponent, { id: 'fileUpload', type: 'file', allowedExtensions: this.allowedExtensions, cssClass: 'calendar-import', buttons: { browse: 'Choose file' }, multiple: this.multiple, showFileList: this.showFileList, selected: this.onSelect.bind(this) }))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example showcases how to export the Scheduler events to a calendar (.ics) file, as well as how to import events from an .ics file (downloaded from any of the calendars like Google or Outlook) into our Scheduler.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, the Scheduler events can be exported to a calendar (.ics) file by making use of the ",
                    React.createElement("code", null, "exportToICalendar"),
                    " public method. By default, the calendar is exported with a file name ",
                    React.createElement("code", null, "Calendar.ics"),
                    ". To change this file name on export, pass the custom string value as ",
                    React.createElement("code", null, "fileName"),
                    " to get the file downloaded with this provided name. The events from external calendars can also be imported into Scheduler by making use of the ",
                    React.createElement("code", null, "importICalendar"),
                    " method. This method accepts the blob object of an .ics file to be imported as a mandatory argument."),
                React.createElement("p", null,
                    React.createElement("strong", null, "Module Injection")),
                React.createElement("p", null,
                    "To start using the export and import ICS functionality in Scheduler, we need to inject ",
                    React.createElement("code", null, "ICalendarExport"),
                    " and ",
                    React.createElement("code", null, "ICalendarImport"),
                    " modules into the services."))));
    };
    return CalendarImportExport;
}(sample_base_1.SampleBase));
exports.CalendarImportExport = CalendarImportExport;
