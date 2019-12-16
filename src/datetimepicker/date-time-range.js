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
require("./range-style.css");
var Range = /** @class */ (function (_super) {
    __extends(Range, _super);
    function Range() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.minDate = new Date(new Date().getFullYear(), new Date().getMonth(), 7, 10);
        _this.maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), 27, 22, 30);
        _this.dateValue = new Date(new Date().getFullYear(), new Date().getMonth(), 14, 10, 30);
        return _this;
    }
    Range.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'datetimepicker-control-section' },
                    React.createElement(ej2_react_calendars_1.DateTimePickerComponent, { id: "calendar", min: this.minDate, max: this.maxDate, value: this.dateValue }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "In the following sample, a specific datetime ranges from 7th 10:00 AM to 27th 10:30 PM of the current month has been set to select from the Calendar. All the other dates are out of range and ",
                    React.createElement("code", null, "restricted"),
                    " to set or select.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null, "Date Range sample illustrates the date selection within the specific range in a calendar and time popup list by using min and max properties. Here, the date selection range was restricted within a range from 7th 10AM to 27th 10:30 PM days in a month."),
                React.createElement("p", null,
                    "More information on the date range configuration can be found in the ",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/datetimepicker/date-time-range/", target: "_blank" }, " documentation section"),
                    "."))));
    };
    return Range;
}(sample_base_1.SampleBase));
exports.Range = Range;
