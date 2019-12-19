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
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
require("./radio-button.css");
var RadioButton = (function (_super) {
    __extends(RadioButton, _super);
    function RadioButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RadioButton.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'radiobutton-control' },
                    React.createElement("h4", null, "Select a payment method"),
                    React.createElement("div", { className: 'row' },
                        React.createElement(ej2_react_buttons_1.RadioButtonComponent, { checked: true, label: 'Credit/Debit card', name: 'payment', value: "credit/debit" })),
                    React.createElement("div", { className: 'row' },
                        React.createElement(ej2_react_buttons_1.RadioButtonComponent, { label: 'Net Banking', name: 'payment', value: "netbanking" })),
                    React.createElement("div", { className: 'row' },
                        React.createElement(ej2_react_buttons_1.RadioButtonComponent, { label: 'Cash on Delivery', name: 'payment', value: "cashondelivery" })),
                    React.createElement("div", { className: 'row' },
                        React.createElement(ej2_react_buttons_1.RadioButtonComponent, { label: 'Other Wallets', name: 'payment', value: "others" })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the default functionalities of the RadioButton. Select the payment mode by clicking the desired RadioButton element.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "RadioButton is a graphical user interface element that allows to select one option from the choices. It contains checked and unchecked state."),
                React.createElement("p", null,
                    "In this sample, Credit/Debit Card option is checked by default, and it can be achieved by using the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/radio-button/#checked" },
                        React.createElement("code", null, "checked")),
                    " property."),
                React.createElement("p", null,
                    "More information about RadioButton can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/radio-button/getting-started" }, "documentation section"),
                    "."))));
    };
    return RadioButton;
}(sample_base_1.SampleBase));
exports.RadioButton = RadioButton;
