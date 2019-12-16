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
var DateRange = /** @class */ (function (_super) {
    __extends(DateRange, _super);
    function DateRange() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.minDate = new Date('1/15/2017');
        _this.maxDate = new Date('12/20/2017');
        return _this;
    }
    DateRange.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'daterangepicker-control-section' },
                    React.createElement(ej2_react_calendars_1.DateRangePickerComponent, { min: this.minDate, max: this.maxDate }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "In this sample, the date ranges from ",
                    React.createElement("code", null, "Jan 15, 2017 - Dec 20, 2017"),
                    " have been set. All the other dates are out of range and ",
                    React.createElement("code", null, "restricted"),
                    " to set or select.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "DateRangePicker has ",
                    React.createElement("code", null, "min"),
                    " and ",
                    React.createElement("code", null, "max"),
                    " supports to restrict the user to select a value from the given range. Only the values in this range will be enabled. In this sample, we have specified ",
                    React.createElement("code", null, "min"),
                    " range as ",
                    React.createElement("code", null, "Jan 15, 2017"),
                    " and ",
                    React.createElement("code", null, "max"),
                    " range as ",
                    React.createElement("code", null, "Dec 20, 2017"),
                    ". User will be able to select the values between this range only."),
                React.createElement("p", null,
                    "More information on the DateRangePicker min/max support can be found in the",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/daterangepicker/range-selection/#restrict-the-range-within-a-range", target: "_blank" }, " documentation section"),
                    "."))));
    };
    return DateRange;
}(sample_base_1.SampleBase));
exports.DateRange = DateRange;
