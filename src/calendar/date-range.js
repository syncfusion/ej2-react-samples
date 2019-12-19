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
var sample_base_1 = require("../common/sample-base");
require("./daterange-style.css");
var Range = (function (_super) {
    __extends(Range, _super);
    function Range() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.minDate = new Date(new Date().getFullYear(), new Date().getMonth(), 7);
        _this.maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), 27);
        return _this;
    }
    Range.prototype.onchange = function (args) {
        /*Displays selected date in the label*/
        document.getElementById('date_label').textContent = 'Selected Value: ' + args.value.toLocaleDateString();
    };
    Range.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'calendar-control-section', style: { overflow: 'auto' } },
                    React.createElement(ej2_react_calendars_1.CalendarComponent, { id: "calendar", min: this.minDate, max: this.maxDate, change: this.onchange }),
                    React.createElement("label", { id: 'date_label' }, "Selected Value:"))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "In the following sample, a specific date ranges from 7th to 27th of a month has been set to select from the Calendar. All the other dates are out of range and ",
                    React.createElement("code", null, "restricted"),
                    " to set or select.")),
            React.createElement("div", { id: 'description' },
                "Date Range sample illustrates the date selection within a specific range in a calendar by using min and max properties. Here, the date selection range was resricted within  a range from 7th to 27th days in a month.",
                React.createElement("p", null,
                    "More information on the calendar instantiation can be found in this ",
                    React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/calendar/date-range/' }, "documentation"),
                    " section."))));
    };
    return Range;
}(sample_base_1.SampleBase));
exports.Range = Range;
