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
    Default.prototype.onchange = function (args) {
        /*Displays selected date in the label*/
        document.getElementById('date_label').textContent = 'Selected Value: ' + args.value.toLocaleDateString();
    };
    Default.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'calendar-control-section', style: { overflow: 'auto' } },
                    React.createElement(ej2_react_calendars_1.CalendarComponent, { change: this.onchange }),
                    React.createElement("label", { id: 'date_label' }, "Selected Value:"))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "The following sample demonstrates the default functionalities of the Calendar. Today's date is always ",
                    React.createElement("code", null, "highlighted"),
                    " in the Calendar and it get ",
                    React.createElement("code", null, "focused"),
                    " if there is no selected date. Click/Touch the desired date from the Calendar and the selected date will be displayed in the below label.")),
            React.createElement("div", { id: 'description' },
                "A Calendar is a graphical user interface component which provides the multi-view representation to display and select a date. Also, provide options to navigate in different levels of views like month, year, decade.",
                React.createElement("p", null,
                    "More information on the calendar instantiation can be found in this ",
                    React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/calendar/getting-started/' }, "documentation"),
                    " section."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
