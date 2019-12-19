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
var Default = (function (_super) {
    __extends(Default, _super);
    function Default() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Default.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: "content-wrapper sample-mask" },
                    React.createElement("div", { className: "control-label" }, "Mobile Number"),
                    React.createElement(ej2_react_inputs_1.MaskedTextBoxComponent, { mask: '000-000-0000' }),
                    React.createElement("div", { className: "control-label" }, "Country ISO Code"),
                    React.createElement(ej2_react_inputs_1.MaskedTextBoxComponent, { mask: '>LL / LLL' }),
                    React.createElement("div", { className: "control-label" }, "D.O.B"),
                    React.createElement(ej2_react_inputs_1.MaskedTextBoxComponent, { mask: '00/00/0000' }),
                    React.createElement("div", { className: "control-label" }, "Product Key"),
                    React.createElement(ej2_react_inputs_1.MaskedTextBoxComponent, { mask: '>AAAAA-AAAAA-AAAAA-AAAAA' }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates that the default functionalities of MaskedTextBox component. Enter numeric value for \u201CMobile Number\u201D textbox then press tab key and then enter \u201CCountry ISO Code\u201D in alphabetic format, then type \u201CD.O.B\u201D in numeric format. Finally enter the \u201CProduct Key\u201D in alpha numeric format.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The ",
                    React.createElement("b", null, "MaskedTextBox"),
                    " is a textbox extended component that allows the user to enter only the valid input based on the provided ",
                    React.createElement("b", null,
                        React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/maskedtextbox/#mask", target: "_blank" }, "mask")),
                    ". It is used to get the input with specific formats like Phone number, Date, Time, IP, Social security number, etc."),
                React.createElement("p", null,
                    "MaskedTextBox supports the list of ",
                    React.createElement("b", null,
                        React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/maskedtextbox/mask-configuration/", target: "_blank" }, "mask elements")),
                    " based on the standard",
                    React.createElement("b", null,
                        React.createElement("a", { href: "https://msdn.microsoft.com/en-us/library/system.windows.forms.maskedtextbox.mask(v=vs.110).aspx", target: "_blank" }, " MSDN")),
                    " mask elements."),
                React.createElement("p", null,
                    "More information about the MaskedTextBox instantiation can be found in the ",
                    React.createElement("b", null,
                        React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/maskedtextbox/getting-started/", target: "_blank" }, "documentation")),
                    " section."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
