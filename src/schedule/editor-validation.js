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
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
/**
 *  Schedule editor validation sample
 */
var EditorFieldValidation = (function (_super) {
    __extends(EditorFieldValidation, _super);
    function EditorFieldValidation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = ej2_base_1.extend([], dataSource.scheduleData, null, true);
        _this.fields = {
            subject: { name: 'Subject', validation: { required: true } },
            location: {
                name: 'Location', validation: {
                    required: true,
                    regex: ['^[a-zA-Z0-9- ]*$', 'Special character(s) not allowed in this field']
                }
            },
            description: {
                name: 'Description', validation: {
                    required: true, minLength: 5, maxLength: 500
                }
            },
            startTime: { name: 'StartTime', validation: { required: true } },
            endTime: { name: 'EndTime', validation: { required: true } }
        };
        return _this;
    }
    EditorFieldValidation.prototype.onEventRendered = function (args) {
        helper_1.applyCategoryColor(args, this.scheduleObj.currentView);
    };
    EditorFieldValidation.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-scetion' },
            React.createElement("div", { className: 'col-lg-12 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { width: '100%', height: '550px', selectedDate: new Date(2019, 0, 10), ref: function (t) { return _this.scheduleObj = t; }, eventSettings: { dataSource: this.data, fields: this.fields }, eventRendered: this.onEventRendered.bind(this) },
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This demo shows the way of adding default and custom validation rules to the editor fields of Scheduler.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "In this demo, the specific fields of Scheduler editor window such as",
                    React.createElement("code", null, "subject"),
                    ",",
                    React.createElement("code", null, "location"),
                    ",",
                    React.createElement("code", null, "description"),
                    ",",
                    React.createElement("code", null, "startTime"),
                    " and",
                    React.createElement("code", null, "endTime"),
                    " are made to undergo validation such that if it is left as blank, then the default required validation message will be displayed in a separate tooltip, on clicking a save button."),
                React.createElement("p", null,
                    "Additionally, the regex condition has been added to the ",
                    React.createElement("code", null, "location"),
                    " field, so that if any special characters are typed into it, then the custom validation message will be displayed. The ",
                    React.createElement("code", null, "description"),
                    " field has been validated to restrict the character count to be typed into it between 5 and 500 and not beyond that. This validation can be given by making use of the ",
                    React.createElement("code", null, "validation"),
                    " API available within each ",
                    React.createElement("code", null, "fields"),
                    " of ",
                    React.createElement("code", null, "eventSettings"),
                    " property."),
                React.createElement("p", null, "Apart from this validation feature, the built-in validation has been provided to the start and end time fields - so that, when the selected end time occurs before the start time, a validation message will be displayed as well as when some unwanted characters are typed into the date fields, the invalid date message will be alerted."))));
    };
    return EditorFieldValidation;
}(sample_base_1.SampleBase));
exports.EditorFieldValidation = EditorFieldValidation;
