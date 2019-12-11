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
require("./default-style.css");
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Default.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'daterangepicker-control-section' },
                    React.createElement(ej2_react_calendars_1.DateRangePickerComponent, null))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "The following sample demonstrates the default functionalities of the DateRangePicker. Today's date is always highlighted in the popup calendar and it get focused if there's no selected date. Select a date range from the popup calendar and the selected ",
                    React.createElement("code", null, "date range"),
                    " will be displayed in the DateRangePicker element.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    React.createElement("code", null, "DateRangePicker"),
                    " is an interactive component that allows the user to select a range from the calendar, or to set a range value."),
                React.createElement("p", null,
                    "More information on the DateRangePicker instantiation can be found in the",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/daterangepicker/getting-started/", target: "_blank" }, " documentation section"),
                    "."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
