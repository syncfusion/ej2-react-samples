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
        return (React.createElement("div", { className: 'control-pane default' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'timepicker-control-section' },
                    React.createElement(ej2_react_calendars_1.TimePickerComponent, null))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "The following sample demonstrates the default functionalities of the TimePicker. Click/Touch the TimePicker popup icon to select a desired time and the selected time value will be displayed in the TimePicker element.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "A ",
                    React.createElement("code", null, "TimePicker"),
                    " is an interactive component that provides an option to select a value from popup list or set a desired time value."),
                React.createElement("p", null,
                    " \tMore information about TimePicker and it's configuration can be found in the  ",
                    React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/timepicker/getting-started/#adding-timepicker-component-to-the-application' }, "documentation"),
                    "  section."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
