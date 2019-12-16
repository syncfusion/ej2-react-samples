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
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./monthpicker-style.css");
var MonthPicker = /** @class */ (function (_super) {
    __extends(MonthPicker, _super);
    function MonthPicker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.start = 'Year';
        _this.depth = 'Year';
        return _this;
    }
    MonthPicker.prototype.onchange = function (args) {
        var intl = new ej2_base_1.Internationalization();
        var value = intl.formatDate(args.value, { type: 'dateTime', format: 'MMMM y' });
        /*Displays selected date in the label*/
        document.getElementById('date_label').textContent = 'Selected Value: ' + value;
    };
    MonthPicker.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'calendar-control-section', style: { overflow: 'auto' } },
                    React.createElement(ej2_react_calendars_1.CalendarComponent, { change: this.onchange, start: this.start, depth: this.depth }),
                    React.createElement("label", { id: 'date_label' }, "Selected Value:"))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "The following sample demonstrates the Calendar component acting as a month picker. It allows you to select values in terms of months.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The Calendar has the ",
                    React.createElement("code", null, "Start"),
                    " and the ",
                    React.createElement("code", null, "Depth"),
                    " properties that provide options to restrict users from navigating to any Calendar view (year, month, or decade). "),
                React.createElement("p", null,
                    "More information on the Calendar Start/Depth can be found in the",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/calendar/#start", target: "_blank" }, "Start"),
                    "|",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/calendar/#depth", target: "_blank" }, "Depth"),
                    " documentation section."))));
    };
    return MonthPicker;
}(sample_base_1.SampleBase));
exports.MonthPicker = MonthPicker;
