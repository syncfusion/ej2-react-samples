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
require("./islamic-calendar.css");
var IslamicCalendar = (function (_super) {
    __extends(IslamicCalendar, _super);
    function IslamicCalendar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.globalize = new ej2_base_1.Internationalization('en');
        _this.calendarMode = 'Islamic';
        return _this;
    }
    IslamicCalendar.prototype.valueChange = function (args) {
        document.getElementById('date_label').textContent = 'Selected Value: ' + this.globalize.formatDate(args.value, { type: 'date', format: 'ddMMMyyyy', calendar: 'islamic' });
    };
    IslamicCalendar.prototype.disableDate = function (args) {
        /*Date need to be disabled*/
        if (args.date.getDate() === 2 || args.date.getDate() === 10 || args.date.getDate() === 28) {
            args.isDisabled = true;
        }
        if (args.date.getDate() === 13) {
            var span = void 0;
            span = document.createElement('span');
            args.element.children[0].className += 'e-day sf-icon-cup highlight';
            ej2_base_1.addClass([args.element], ['special', 'e-day', 'dinner']);
            args.element.setAttribute('data-val', ' Dinner !');
            args.element.appendChild(span);
        }
        if (args.date.getDate() === 23) {
            args.element.children[0].className += 'e-day sf-icon-start highlight';
            var span = void 0;
            span = document.createElement('span');
            span.setAttribute('class', 'sf-icons-star highlight');
            //use the imported method to add the multiple classes to the given element
            ej2_base_1.addClass([args.element], ['special', 'e-day', 'holiday']);
            args.element.setAttribute('data-val', ' Holiday !');
            args.element.appendChild(span);
        }
    };
    IslamicCalendar.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'calendar-control-section', style: { overflow: 'auto' } },
                    React.createElement(ej2_react_calendars_1.CalendarComponent, { calendarMode: this.calendarMode, renderDayCell: this.disableDate.bind(this), change: this.valueChange },
                        React.createElement(ej2_react_calendars_1.Inject, { services: [ej2_react_calendars_1.Islamic] })),
                    React.createElement("label", { id: 'date_label' }, "Selected Value:"))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "The following sample demonstrates the hijri(islamic) calendar with disabled dates and special dates. In desktop mode, hover over the special day to know the special information about the day.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "Islamic calendar"),
                    " is a extended feature which renders the calendar components based on the hijri calendar year. Also, we can globalize the hijri calendar to arabic culture."),
                React.createElement("p", null,
                    "More information on the customization can be found in this ",
                    React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/calendar/customization/#day-cell-format' }, " documentation"),
                    " section."))));
    };
    return IslamicCalendar;
}(sample_base_1.SampleBase));
exports.IslamicCalendar = IslamicCalendar;
