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
require("./multi-style.css");
var MultipleSelection = (function (_super) {
    __extends(MultipleSelection, _super);
    function MultipleSelection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectedValues = [new Date(new Date().getFullYear(), new Date().getMonth(), 10), new Date(new Date().getFullYear(), new Date().getMonth(), 15),
            new Date(new Date().getFullYear(), new Date().getMonth(), 25)];
        return _this;
    }
    MultipleSelection.prototype.onchange = function () {
        var element = document.getElementById('multiSelect');
        element.innerHTML = '';
        for (var index = 0; index < this.calendarInstance.values.length; index++) {
            element.insertBefore(document.createTextNode(this.calendarInstance.values[index].toString()), element.childNodes[0]);
            element.insertBefore(document.createElement('br'), element.childNodes[0]);
        }
    };
    MultipleSelection.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "col-lg-12 control-section" },
            React.createElement("div", { id: "control_wrapper", className: "col-lg-6 col-sm-8 col-md-8 multiselectWrapper" },
                React.createElement("div", { className: 'calendar-control-section', style: { overflow: 'auto' } },
                    React.createElement(ej2_react_calendars_1.CalendarComponent, { id: "calendar", isMultiSelection: true, values: this.selectedValues, ref: function (scope) { _this.calendarInstance = scope; }, change: this.onchange.bind(this), created: this.onchange.bind(this) }))),
            React.createElement("div", { className: "valuesWrapper col-lg-6 col-sm-8 col-md-8" },
                React.createElement("h5", null, "Selected values"),
                React.createElement("div", { className: "contentValue" },
                    React.createElement("div", { id: "multiSelect" }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "The following sample demonstrates the multiple date selection functionalities of the Calendar. Click /Touch the desired date from the Calendar and the selected date will be added to the values property of the calendar.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Multi selection sample demonstrates, how to enable and select the multiple date in a calendar by using",
                    React.createElement("code", null, "isMultiSelection"),
                    " and",
                    React.createElement("code", null, "values"),
                    " properties . Here 10, 15 and 25 date's are selected."),
                React.createElement("p", null,
                    "More information on the calendar instantiation can be found in this",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/calendar/multi-select/#multi-selection", target: "_blank" }, "documentation section"),
                    "."))));
    };
    return MultipleSelection;
}(sample_base_1.SampleBase));
exports.MultipleSelection = MultipleSelection;
