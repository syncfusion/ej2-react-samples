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
var Format = (function (_super) {
    __extends(Format, _super);
    function Format() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Format.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: "content-wrapper format-wrapper sample-numeric" },
                    React.createElement("div", { className: "control-label" }, "Enter the distance"),
                    React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { format: '###.### km', value: 250, min: 0 }),
                    React.createElement("div", { className: "control-label" }, "Enter the tax"),
                    React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { format: "### \'%\'", min: 0, value: 25, max: 100 }),
                    React.createElement("div", { className: "control-label" }, "Enter the amount"),
                    React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { format: '$ ###.##', min: 0, value: 1025 }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the custom format functionalities of the Numeric TextBox. The value of Numeric TextBox will be displayed with defined custom format while type a value or change a value using up/down buttons in the input boxes.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The NumericTextBox provides an option to customize the display format of the numeric value using the ",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/numerictextbox#format", target: "_blank" }, "format"),
                    " property. It accepts the ",
                    React.createElement("a", { href: "https://msdn.microsoft.com/en-us/library/dwhawy9k.aspx", target: "_blank" }, "standard numeric format string"),
                    " and ",
                    React.createElement("a", { href: "https://msdn.microsoft.com/en-us/library/0c899ak8.aspx", target: "_blank" }, "custom numeric format string"),
                    " as specified in MSDN. The formatted value displays when the component is not focused."),
                React.createElement("p", null, "In this demo, NumericTextBox control renders with the custom format ###.## km."),
                React.createElement("p", null,
                    "More information on the format configuration can be found in the ",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/numerictextbox/getting-started/#formatting-the-value", target: "_blank" }, "documentation section"),
                    "."))));
    };
    return Format;
}(sample_base_1.SampleBase));
exports.Format = Format;
