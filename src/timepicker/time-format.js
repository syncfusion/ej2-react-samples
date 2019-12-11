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
require("./format-style.css");
var Format = /** @class */ (function (_super) {
    __extends(Format, _super);
    function Format() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.value = new Date();
        _this.interval = 60;
        _this.customFormat = 'HH:mm';
        return _this;
    }
    Format.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane format' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'timepicker-control-section' },
                    React.createElement(ej2_react_calendars_1.TimePickerComponent, { value: this.value, step: this.interval, format: this.customFormat }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "The TimePicker has been customized with 24-hour format with 60 minutes ",
                    React.createElement("code", null, "interval"),
                    ". Click/Touch the TimePicker popup icon to a select a time from 00:00 to 23:00 from the TimePicker popup.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "TimePicker provides an option to customize the display format of the time value using the",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/timepicker/getting-started/#setting-the-time-format", target: "_blank" }, "format"),
                    "property. It accepts ",
                    React.createElement("a", { href: "https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings", target: "_blank" }, " standard "),
                    React.createElement("a", { href: "https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings", target: "_blank" }, " custom date and time format strings"),
                    "as specified in MSDN."),
                React.createElement("p", null,
                    " Here, the time value displayed in 24-hour format with ",
                    React.createElement("code", null, " 60 "),
                    " minute step interval. To know more about custom time formatting, refer the",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/base/internationalization/#custom-formats", target: "_blank" }, " Parsing and formatting"),
                    " section. By default, TimePicker component is formatted with `en` (English) culture."),
                React.createElement("p", null,
                    "More information about TimePicker and it's configuration can be found in the",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/timepicker/getting-started/#create-a-simple-timepicker", target: "_blank" }, " documentation section"),
                    "."))));
    };
    return Format;
}(sample_base_1.SampleBase));
exports.Format = Format;
