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
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
require("./range-style.css");
var Range = /** @class */ (function (_super) {
    __extends(Range, _super);
    function Range() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isStartTimeChange = true;
        return _this;
    }
    Range.prototype.rendereComplete = function () {
        this.endTimeInput = document.getElementById('maxtimepick');
    };
    Range.prototype.changeTime = function () {
        /*To determine whether we have selected business hours or not*/
        this.isStartTimeChange = false;
        if (this.checkObj.checked) {
            /*Business hours*/
            this.startObject.value = new Date('9/6/2017 9:00');
            this.endObject.enabled = true;
            this.endObject.value = new Date('9/6/2017 18:00');
            this.startObject.readonly = true;
            this.endObject.readonly = true;
        }
        else {
            this.endObject.value = null;
            this.startObject.value = null;
            this.endTimeInput.value = '';
            this.startObject.readonly = false;
            this.endObject.readonly = false;
            this.endObject.enabled = false;
        }
    };
    Range.prototype.onEnableEndTime = function (args) {
        /*Enables end time if start time is selected*/
        if (this.isStartTimeChange) {
            this.endObject.enabled = true;
            this.endObject.value = null;
            this.endTimeInput.value = '';
            this.value = new Date(args.value);
            this.value.setMinutes(this.value.getMinutes() + this.endObject.step);
            this.endObject.min = this.value;
        }
        else {
            this.isStartTimeChange = true;
        }
    };
    Range.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane range' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'timepicker-control-section range' },
                    React.createElement(ej2_react_calendars_1.TimePickerComponent, { id: "mintimepick", ref: function (mintimepick) { _this.startObject = mintimepick; }, change: this.onEnableEndTime.bind(this) })),
                React.createElement("div", { className: 'timepicker-control-section range' },
                    React.createElement(ej2_react_calendars_1.TimePickerComponent, { id: "maxtimepick", enabled: false, ref: function (maxtimepick) { _this.endObject = maxtimepick; } })),
                React.createElement("div", { className: 'timepicker-control-section range' },
                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "checkbox", ref: function (checkbox) { _this.checkObj = checkbox; }, label: "Business Hours", change: this.changeTime.bind(this) }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "Select a start time from the first TimePicker and then the second TimePicker will be enabled. Select an end time from the second TimePicker to get a ",
                    React.createElement("code", null, "time range"),
                    ". Click/Touch the Business Hours checkbox to change both the TimePickers to ",
                    React.createElement("code", null, "read-only"),
                    " state.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null, "Time Range sample illustrates the appointment time selection scenario with the start and end time option. Here, two TimePicker components are used to select the start and end time."),
                React.createElement("p", null,
                    "Before the start time selection, the end time TimePicker is in disable state. When the start time is selected, then you will be able to select the end time or else, need to select the entire business hours 9:00 to 18:00 from the ",
                    React.createElement("code", null, "Business Hours"),
                    " option. Once the options are checked, both the TimePicker components goes to readonly state."),
                React.createElement("p", null,
                    "More information about time range restriction can be found in the  ",
                    React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/timepicker/time-range/' }, "documentation"),
                    "  section."))));
    };
    return Range;
}(sample_base_1.SampleBase));
exports.Range = Range;
