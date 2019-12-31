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
var Range = (function (_super) {
    __extends(Range, _super);
    function Range() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.minDate = new Date(new Date().getFullYear(), new Date().getMonth(), 7);
        _this.maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), 27);
        _this.dateValue = new Date(new Date().getFullYear(), new Date().getMonth(), 14);
        return _this;
    }
    Range.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'datepicker-control-section' },
                    React.createElement(ej2_react_calendars_1.DatePickerComponent, { id: "calendar", min: this.minDate, max: this.maxDate, value: this.dateValue }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "Date Range sample illustrates the date selection within the specific range in a calendar by using min and max properties. Here, the date selection range was ",
                    React.createElement("code", null, "restricted"),
                    " within a range from 7th to 27th days in a month.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null, "Date Range sample illustrates the date selection within the specific range in a calendar by using min and max properties. Here, the date selection range was restricted within a range from 7th to 27th days in a month."),
                React.createElement("p", null,
                    "More information on the date range configuration can be found in the ",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/datepicker/date-range.html", target: "_blank" }, " documentation section"),
                    "."))));
    };
    return Range;
}(sample_base_1.SampleBase));
exports.Range = Range;
