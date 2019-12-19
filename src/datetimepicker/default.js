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
var Default = (function (_super) {
    __extends(Default, _super);
    function Default() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Default.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'datetimepicker-control-section' },
                    React.createElement(ej2_react_calendars_1.DateTimePickerComponent, null))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "The following sample demonstrates the default functionalities of the DateTimePicker. Enter the value in input text box or Click/Touch the date and time popup icon to select the desired value.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "DateTimePicker"),
                    " is a graphical user interface component that allows the user to select, or to enter a date time value."),
                React.createElement("p", null,
                    "More information on the DateTimePicker instantiation can be found in the",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/datetimepicker/getting-started/", target: "_blank" }, " documentation section"),
                    "."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
