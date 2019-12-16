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
var property_pane_1 = require("../common/property-pane");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
require("./sample.css");
var Multiline = /** @class */ (function (_super) {
    __extends(Multiline, _super);
    function Multiline(props) {
        var _this = _super.call(this, props) || this;
        _this.value = 'Auto';
        _this.floatData = [
            { Id: 'Auto', Label: 'Auto' },
            { Id: 'Never', Label: 'Never' },
            { Id: 'Always', Label: 'Always' }
        ];
        _this.fields = { text: 'Label', value: 'Id' };
        return _this;
    }
    Multiline.prototype.enabledHandler = function (args) {
        this.textareaObj.enabled = !args.checked;
    };
    Multiline.prototype.readonlyHandler = function (args) {
        this.textareaObj.readonly = args.checked;
    };
    Multiline.prototype.floatHandler = function (args) {
        switch (args.value) {
            case 'Auto':
                this.textareaObj.floatLabelType = 'Auto';
                break;
            case 'Always':
                this.textareaObj.floatLabelType = 'Always';
                break;
            case 'Never':
                this.textareaObj.floatLabelType = 'Never';
                break;
        }
    };
    Multiline.prototype.rowHandler = function (args) {
        this.textareaObj.addAttributes({ rows: args.value });
    };
    Multiline.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane multiline' },
            React.createElement("div", { className: 'control-section row multilinepreview' },
                React.createElement("div", { className: 'col-lg-8' },
                    React.createElement("div", { className: 'multiline-wrapper' },
                        React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: 'default', multiline: true, floatLabelType: "Auto", placeholder: "Enter your address", ref: function (scope) { _this.textareaObj = scope; } }))),
                React.createElement("div", { className: 'col-lg-4 property-section', id: "multiline" },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: "property", title: "Properties", className: 'multiline-property' },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", { className: 'left-side' }, "FLoat label type"),
                                    React.createElement("td", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "float", value: this.value, dataSource: this.floatData, ref: function (dropdownlist) { _this.floatLabelObj = dropdownlist; }, fields: this.fields, change: this.floatHandler.bind(this), placeholder: "Select float type" }))),
                                React.createElement("tr", null,
                                    React.createElement("td", { className: 'left-side' }, "Disabled"),
                                    React.createElement("td", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: false, ref: function (scope) { _this.enabledObj = scope; }, change: this.enabledHandler.bind(this) }))),
                                React.createElement("tr", null,
                                    React.createElement("td", { className: 'left-side' }, "Read only"),
                                    React.createElement("td", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: false, ref: function (scope) { _this.readonlyObj = scope; }, change: this.readonlyHandler.bind(this) }))),
                                React.createElement("tr", null,
                                    React.createElement("td", { className: 'left-side' }, "Rows"),
                                    React.createElement("td", null,
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { format: '##', value: 2, min: 1, max: 20, step: 1, change: this.rowHandler.bind(this) })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates the multiline functionalities of the textbox component. Enter or fill the textbox with multiple rows of text. Choose the corresponding option from the property panel to update the multiline textbox.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The Multiline Textbox is used to edit or display multiple lines of text that helps you to accept address, description, comments, feedbacks, and more in a form. In this sample, rendered multiline textbox from ",
                    React.createElement("b", null, "textarea"),
                    " tag and the following options are available to customize it:"),
                React.createElement("ul", null,
                    React.createElement("li", null, "Choose float label types either 'Never', 'Always', or 'Auto' to float the placeholder text."),
                    React.createElement("li", null, "To make a read-only multiline textbox, check the \"read-only\" option."),
                    React.createElement("li", null, "Disable the textbox by unchecking an \"enabled\" option."),
                    React.createElement("li", null, "Change the number of rows count to restrict the length of the input.")),
                React.createElement("p", null, "Note: After resizing the multiline textbox manually, the selected rows option from the property panel is not updated to the multiline textbox."))));
    };
    return Multiline;
}(sample_base_1.SampleBase));
exports.Multiline = Multiline;
