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
require("./monthpicker-style.css");
var MonthPicker = /** @class */ (function (_super) {
    __extends(MonthPicker, _super);
    function MonthPicker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.start = 'Year';
        _this.depth = 'Year';
        _this.format = 'MMMM y';
        _this.dateValue = new Date();
        return _this;
    }
    MonthPicker.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'datepicker-control-section' },
                    React.createElement(ej2_react_calendars_1.DatePickerComponent, { value: this.dateValue, start: this.start, depth: this.depth, format: this.format }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "The following sample demonstrates the DatePicker component acting as a month picker. It allows you to select values in terms of months.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "DatePicker has the ",
                    React.createElement("code", null, "Start"),
                    " and the ",
                    React.createElement("code", null, "Depth"),
                    " properties that provide options to restrict users from navigating to any Calendar view (year, month, or decade). "),
                React.createElement("p", null,
                    "More information on the DatePicker Start/Depth can be found in the",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/datepicker/date-views/#start-and-depth-view", target: "_blank" }, " documentation section"),
                    "."))));
    };
    return MonthPicker;
}(sample_base_1.SampleBase));
exports.MonthPicker = MonthPicker;
