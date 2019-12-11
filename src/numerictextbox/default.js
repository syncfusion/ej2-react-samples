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
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
require("./sample.css");
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Default.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: "content-wrapper format-wrapper sample-numeric" },
                    React.createElement("div", { className: "control-label" }, "Numeric TextBox"),
                    React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: 10 }),
                    React.createElement("div", { className: "control-label" }, "Percentage TextBox"),
                    React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { format: 'p2', value: 0.5, min: 0, max: 1, step: 0.01 }),
                    React.createElement("div", { className: "control-label" }, "Currency TextBox"),
                    React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { format: 'c2', value: 100 }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the default functionalities of the Numeric TextBox. Type a value in the input element to change the value dynamically, or press up/down arrow button to increase/decrease the value with a predefined step value.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The NumericTextBox component is used to get the number inputs from the user. The input values can be increased or decreased with a predefined step value."),
                React.createElement("p", null,
                    "In this demo, the default NumericTextBox is rendered with the percent and currency formats as specified in ",
                    React.createElement("a", { href: "https://msdn.microsoft.com/en-us/library/dwhawy9k.aspx", target: "_blank" }, "MSDN"),
                    "."),
                React.createElement("p", null,
                    "More information on the NumericTextBox instantiation can be found in the ",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/numerictextbox/getting-started/", target: "_blank" }, "documentation section"),
                    "."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
