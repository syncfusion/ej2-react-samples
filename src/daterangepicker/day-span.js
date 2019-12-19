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
require("./dayspan-style.css");
var DaySpan = (function (_super) {
    __extends(DaySpan, _super);
    function DaySpan() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.minDays = 5;
        _this.maxDays = 10;
        return _this;
    }
    DaySpan.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'daterangepicker-control-section' },
                    React.createElement(ej2_react_calendars_1.DateRangePickerComponent, { minDays: this.minDays, maxDays: this.maxDays }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "In this sample, your date range selection is restricted to select ",
                    React.createElement("code", null, "minimum"),
                    " five days and ",
                    React.createElement("code", null, "maximum"),
                    " ten days.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "DateRangePicker has ",
                    React.createElement("code", null, "minDays"),
                    " and ",
                    React.createElement("code", null, "maxDays"),
                    " supports to force the user to select the minimum and maximum number of days in the range. Only the values in this range will be enabled."),
                React.createElement("p", null, "For example, in some hotel booking website, we need to book rooms that includes packages like minimum 3 days to maximum 5 days. For this scenario this feature can be used."),
                React.createElement("p", null,
                    "More information on the DateRangePicker minDays/maxDays support can be found in the",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/daterangepicker/range-selection/#range-span", target: "_blank" }, " documentation section"),
                    "."))));
    };
    return DaySpan;
}(sample_base_1.SampleBase));
exports.DaySpan = DaySpan;
