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
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
require("./sample.css");
var Formats = /** @class */ (function (_super) {
    __extends(Formats, _super);
    function Formats() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Prompt character options
        _this.promptData = [
            { prompt: '_' },
            { prompt: '#' },
            { prompt: '@' },
            { prompt: '*' },
        ];
        _this.ddlFields = { text: 'prompt', value: 'prompt' };
        return _this;
    }
    // Bind event on Dropdown List change
    Formats.prototype.onDdlChange = function (args) {
        // 'promptChar' on the Masked Textbox has been updated
        this.maskInstance.setProperties({ promptChar: this.listObj.value });
        // Masked and un-masked values will be updated
        document.getElementById('val1').innerHTML = this.maskInstance.value;
        document.getElementById('val2').innerHTML = this.maskInstance.getMaskedValue();
    };
    Formats.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: ' col-lg-8' },
                    React.createElement("div", { className: "content-wrapper sample-mask" },
                        React.createElement("div", { className: "control-label" }, "Formats"),
                        React.createElement(ej2_react_inputs_1.MaskedTextBoxComponent, { mask: '(999)-999-9999', floatLabelType: 'Never', created: this.onCreated.bind(this), change: this.maskChange, ref: function (mask) { return _this.maskInstance = mask; } }))),
                React.createElement("div", { className: 'col-lg-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: "property", title: "Properties", className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '50%' } },
                                        React.createElement("div", null, "Mask")),
                                    React.createElement("td", { style: { width: '50%', paddingRight: '0px' } },
                                        React.createElement("div", { style: { maxWidth: '200px' } },
                                            React.createElement("input", { id: "input1", type: "text", className: 'e-input', onKeyUp: this.sampleKeyUp.bind(this) })))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '50%' } },
                                        React.createElement("div", null, "Prompt Character")),
                                    React.createElement("td", { style: { width: '50%', paddingRight: '0px' } },
                                        React.createElement("div", { style: { maxWidth: '200px' } },
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "ddlelement", dataSource: this.promptData, ref: function (dropdownlist) { _this.listObj = dropdownlist; }, fields: this.ddlFields, value: '_', change: this.onDdlChange.bind(this), popupHeight: "220px" })))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '50%' } },
                                        React.createElement("div", null, "Value")),
                                    React.createElement("td", { style: { width: '50%', paddingRight: '0px' } },
                                        React.createElement("div", { id: "val1" }))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '50%', paddingTop: '5px', paddingBottom: '10px' } },
                                        React.createElement("div", null, "Masked Value")),
                                    React.createElement("td", { style: { width: '50%', paddingRight: '0px', paddingTop: '5px', paddingBottom: '10px' } },
                                        React.createElement("div", { id: "val2" })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates that the different formats can be applied to MaskedTextBox component. You can customize the mask and prompt character values in the property panel.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Here, the \"Value\" and \"Masked Value\" labels from the properties panel returns the raw value (unmasked value) and masked value of the MaskedTextBox component. You can also get these raw value and masked value anytime through the ",
                    React.createElement("b", null,
                        React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/maskedtextbox/#value", target: "_blank" }, "value")),
                    " property and ",
                    React.createElement("b", null,
                        React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/maskedtextbox/#getmaskedvalue", target: "_blank" }, "getMaskedValue")),
                    " method."))));
    };
    Formats.prototype.onCreated = function () {
        document.getElementById('input1').value = this.maskInstance.mask;
        document.getElementById('val2').innerHTML = this.maskInstance.getMaskedValue();
    };
    Formats.prototype.maskChange = function (args) {
        document.getElementById('val1').innerHTML = args.value;
        document.getElementById('val2').innerHTML = args.maskedValue;
    };
    Formats.prototype.sampleKeyUp = function () {
        var ele1 = document.getElementById('input1');
        var start = ele1.selectionStart;
        var end = ele1.selectionEnd;
        this.maskInstance.setProperties({ mask: document.getElementById('input1').value });
        document.getElementById('val1').innerHTML = this.maskInstance.value;
        document.getElementById('val2').innerHTML = this.maskInstance.getMaskedValue();
        ele1.setSelectionRange(start, end);
    };
    return Formats;
}(sample_base_1.SampleBase));
exports.Formats = Formats;
