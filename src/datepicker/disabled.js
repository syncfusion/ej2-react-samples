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
require("./datepicker-component.css");
var Disabled = (function (_super) {
    __extends(Disabled, _super);
    function Disabled() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Disabled.prototype.disabledDate = function (args) {
        if (args.date.getDay() === 0 || args.date.getDay() === 6) {
            /*set 'true' to disable the weekends*/
            args.isDisabled = true;
        }
    };
    Disabled.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'datepicker-control-section' },
                    React.createElement(ej2_react_calendars_1.DatePickerComponent, { renderDayCell: this.disabledDate }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "In the following sample, all the weekends (Saturday and Sunday) of a month are disabled, and these dates are ",
                    React.createElement("code", null, "restricted"),
                    " to set or select in the DatePicker.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "Disabled Dates sample demonstrates how to disable specific dates in the DatePicker by using ",
                    React.createElement("code", null, "renderDayCell"),
                    "        event. This event gets triggered on each day cell element creation, that allows you to customize, or disable specific dates in the DatePicker. Here the weekend dates are disabled by using renderDayCell."),
                React.createElement("p", null,
                    "More information on the disabled dates can be found in the",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/datepicker/customization/", target: "_blank" }, " documentation section"),
                    "."))));
    };
    return Disabled;
}(sample_base_1.SampleBase));
exports.Disabled = Disabled;
