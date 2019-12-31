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
require("./preset-style.css");
var Presets = (function (_super) {
    __extends(Presets, _super);
    function Presets() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.today = new Date(new Date().toDateString());
        _this.weekStart = new Date(new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 7) % 7)).toDateString());
        _this.weekEnd = new Date(new Date(new Date().setDate(new Date(new Date().setDate((new Date().getDate()
            - (new Date().getDay() + 7) % 7))).getDate() + 6)).toDateString());
        _this.monthStart = new Date(new Date(new Date().setDate(1)).toDateString());
        _this.monthEnd = _this.today;
        _this.lastStart = new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)).toDateString());
        _this.lastEnd = _this.today;
        _this.yearStart = new Date(new Date(new Date().setDate(new Date().getDate() - 365)).toDateString());
        _this.yearEnd = _this.today;
        return _this;
    }
    Presets.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'datepicker-control-section' },
                    React.createElement(ej2_react_calendars_1.DateRangePickerComponent, { placeholder: 'Select a range' },
                        React.createElement(ej2_react_calendars_1.PresetsDirective, null,
                            React.createElement(ej2_react_calendars_1.PresetDirective, { label: "This Week", start: this.weekStart, end: this.weekEnd }),
                            React.createElement(ej2_react_calendars_1.PresetDirective, { label: "This Month", start: this.monthStart, end: this.monthEnd }),
                            React.createElement(ej2_react_calendars_1.PresetDirective, { label: "Last Month", start: this.lastStart, end: this.lastEnd }),
                            React.createElement(ej2_react_calendars_1.PresetDirective, { label: "Last Year", start: this.yearStart, end: this.yearEnd }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "Click/Touch the DateRangePicker popup icon to view and select the list of custom preset ranges. Select the custom range option which is provided at the end of this list to open date range picker popup calendar for selecting custom ranges.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "DateRangePicker"),
                    " component has presets support to display the collection of required ranges in the popup element. User can select a required range from the list and the selected range value will be updated in the component."),
                React.createElement("p", null,
                    "More information on the DateRangePicker presets support can be found in the",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/daterangepicker/customization/#preset-ranges", target: "_blank" }, "documentation section"),
                    "."))));
    };
    return Presets;
}(sample_base_1.SampleBase));
exports.Presets = Presets;
