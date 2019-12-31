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
var property_pane_1 = require("../common/property-pane");
require("./sample.css");
var Range = (function (_super) {
    __extends(Range, _super);
    function Range() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Range.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: ' col-lg-8' },
                    React.createElement("div", { className: "content-wrapper format-wrapper sample-numeric" },
                        React.createElement("div", { className: "control-label" }, "Numeric TextBox"),
                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { min: 10, max: 100, value: 15, ref: function (numeric) { return _this.numericInstance = numeric; } }))),
                React.createElement("div", { className: 'col-lg-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: "property", title: "Properties", className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", null, "Min Value ")),
                                React.createElement("td", { style: { width: '70%', paddingRight: '10px' } },
                                    React.createElement("div", null,
                                        React.createElement("input", { id: "min", type: "number", inputMode: "numeric", className: "form-control" })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", null, "Max Value ")),
                                React.createElement("td", { style: { width: '70%', paddingRight: '10px' } },
                                    React.createElement("div", null,
                                        React.createElement("input", { id: "max", type: "number", inputMode: "numeric", className: "form-control" })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", null, "Increment Step ")),
                                React.createElement("td", { style: { width: '70%', paddingRight: '10px' } },
                                    React.createElement("div", null,
                                        React.createElement("input", { id: "step", type: "number", inputMode: "numeric", max: 100, min: 0, className: "form-control" })))),
                            React.createElement("tr", null,
                                React.createElement("td", null),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement("button", { id: "buttonApply", className: "e-btn-small btn btn-primary", style: { marginBottom: '10px' }, onClick: this.applyRange.bind(this) }, "Apply")))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the range validation functionalities of the Numeric TextBox. Change the min, max and step values and click on apply button to change the property values in Numeric TextBox.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The NumericTextBox has the options to restrict the input value between a specific range using the ",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/numerictextbox#min", target: "_blank" }, "min"),
                    ", ",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/numerictextbox#max", target: "_blank" }, "max"),
                    ", and ",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/numerictextbox#strictmode", target: "_blank" }, "strictMode"),
                    " properties."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        "When you enable the ",
                        React.createElement("b", null, "strictMode"),
                        " property, the value will automatically change within a range on passing the out-of-range values."),
                    React.createElement("li", null,
                        "When you disable the ",
                        React.createElement("b", null, "strictMode"),
                        " property, the NumericTextBox component allows the out-of-range value with the highlighted textbox to indicate the given value is wrong.")),
                React.createElement("p", null, "In this demo, numeric textbox is restricted between 10 to 100 through the min and max properties. So you can enter only the value between this range."),
                React.createElement("p", null,
                    "More information on the range validation configuration can be found in the ",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/numerictextbox/getting-started/#range-validation", target: "_blank" }, "documentation section"),
                    "."))));
    };
    Range.prototype.rendereComplete = function () {
        /**custom render complete function */
        document.getElementById('min').value = '10';
        document.getElementById('max').value = '100';
        document.getElementById('step').value = '1';
    };
    Range.prototype.applyRange = function () {
        var min = parseFloat(document.getElementById('min').value);
        var max = parseFloat(document.getElementById('max').value);
        var step = parseFloat(document.getElementById('step').value);
        this.numericInstance.min = min;
        this.numericInstance.max = max;
        this.numericInstance.step = step;
    };
    return Range;
}(sample_base_1.SampleBase));
exports.Range = Range;
