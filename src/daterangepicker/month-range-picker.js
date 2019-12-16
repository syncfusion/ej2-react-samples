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
require("./monthrangepicker-style.css");
var MonthRangePicker = /** @class */ (function (_super) {
    __extends(MonthRangePicker, _super);
    function MonthRangePicker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.start = 'Year';
        _this.depth = 'Year';
        return _this;
    }
    MonthRangePicker.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'daterangepicker-control-section' },
                    React.createElement(ej2_react_calendars_1.DateRangePickerComponent, { format: 'MMM/yyyy hh:mm a', start: this.start, depth: this.depth }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "The following sample demonstrates the DateRangePicker component acting as a month range picker. It allows you to select values within the range of months.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "DateRangePicker has the ",
                    React.createElement("code", null, "Start"),
                    " and the ",
                    React.createElement("code", null, "Depth"),
                    " properties that provide options to restrict users from navigating to any Calendar view (year, month, or decade)."))));
    };
    return MonthRangePicker;
}(sample_base_1.SampleBase));
exports.MonthRangePicker = MonthRangePicker;
