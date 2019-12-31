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
var ej2_react_inplace_editor_1 = require("@syncfusion/ej2-react-inplace-editor");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
require("./inplace.component.css");
// tslint:disable:max-line-length
var Default = (function (_super) {
    __extends(Default, _super);
    function Default() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.textModel = { placeholder: 'Enter employee name' };
        _this.popupSettings = { title: 'Enter Employee Name' };
        _this.numericModel = { format: 'c2', value: 100, placeholder: 'Currency format' };
        _this.maskModel = { mask: '000-000-0000' };
        // Mapping DropDownList dataSource property
        _this.dropDownData = [
            { 'value': 'Inline', 'text': 'Inline' }, { 'value': 'popup', 'text': 'Popup' }
        ];
        // Mapping DropDownList fields property
        _this.dropDownFields = { text: 'text', value: 'value' };
        // Mapping DropDownList value property
        _this.dropDownVal = 'Inline';
        // Mapping DropDownList dataSource property
        _this.editableData = [
            { 'value': 'Click', 'text': 'Click' }, { 'value': 'DblClick', 'text': 'Double Click' }, { 'value': 'EditIconClick', 'text': 'Edit Icon Click' }
        ];
        // Mapping DropDownList fields property
        _this.editableFields = { text: 'text', value: 'value' };
        // Mapping DropDownList value property
        _this.editableVal = 'Click';
        _this.scrollRightPane = function () {
            var mode = document.getElementById('editorMode').value;
            if (mode === 'Inline') {
                return;
            }
            if (_this.textObj && (_this.textObj.element.querySelectorAll('.e-editable-open').length > 0)) {
                _this.textObj.enableEditMode = false;
            }
            if (_this.numericObj && (_this.numericObj.element.querySelectorAll('.e-editable-open').length > 0)) {
                _this.numericObj.enableEditMode = false;
            }
            if (_this.maskObj && (_this.maskObj.element.querySelectorAll('.e-editable-open').length > 0)) {
                _this.maskObj.enableEditMode = false;
            }
        };
        return _this;
    }
    // Change event funtion for DropDownList component   
    Default.prototype.changeEditorMode = function (e) {
        var mode = this.editorMode.value;
        this.textObj.mode = this.numericObj.mode = this.maskObj.mode = mode;
        this.textObj.dataBind();
        this.numericObj.dataBind();
        this.maskObj.dataBind();
    };
    Default.prototype.rendereComplete = function () {
        var _this = this;
        var rightPane = document.getElementById('right-pane');
        if (rightPane) {
            rightPane.addEventListener('scroll', function () {
                _this.scrollRightPane();
            });
        }
    };
    Default.prototype.componentWillUnmount = function () {
        var _this = this;
        var rightPane = document.getElementById('right-pane');
        if (rightPane) {
            rightPane.removeEventListener('scroll', function () {
                _this.scrollRightPane();
            });
        }
    };
    // Change event funtion for DropDownList component   
    Default.prototype.onEditableOn = function (e) {
        var editableValue = this.editableon.value;
        this.textObj.editableOn = this.numericObj.editableOn = this.maskObj.editableOn = editableValue;
        this.textObj.dataBind();
        this.numericObj.dataBind();
        this.maskObj.dataBind();
    };
    // Change event funtion for CheckBox component
    Default.prototype.onChange = function (e) {
        e.checked ? this.textObj.showButtons = this.numericObj.showButtons = this.maskObj.showButtons = true : this.textObj.showButtons = this.numericObj.showButtons = this.maskObj.showButtons = false;
    };
    // Change event funtion for CheckBox component
    Default.prototype.onChangeEnable = function (e) {
        e.checked ? this.textObj.disabled = this.numericObj.disabled = this.maskObj.disabled = true : this.textObj.disabled = this.numericObj.disabled = this.maskObj.disabled = false;
    };
    Default.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "col-lg-8 control-section inplace-control-section default_layout" },
                React.createElement("div", { className: "control_wrapper" },
                    React.createElement("table", null,
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("label", { className: "control-label", style: { textAlign: 'left', fontSize: '14px', fontWeight: 400 } }, "TextBox ")),
                            React.createElement("td", null,
                                React.createElement(ej2_react_inplace_editor_1.InPlaceEditorComponent, { ref: function (text) { _this.textObj = text; }, id: 'textboxEle', mode: 'Inline', type: 'Text', value: 'Andrew', model: this.textModel, popupSettings: this.popupSettings }))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("label", { className: "control-label", style: { textAlign: 'left', fontSize: '14px', fontWeight: 400 } }, "NumericTextBox ")),
                            React.createElement("td", null,
                                React.createElement(ej2_react_inplace_editor_1.InPlaceEditorComponent, { ref: function (numeric) { _this.numericObj = numeric; }, id: 'numericTextBoxEle', mode: 'Inline', type: 'Numeric', value: '$100.00', model: this.numericModel }))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("label", { className: "control-label", style: { textAlign: 'left', fontSize: '14px', fontWeight: 400 } }, "MaskedTextBox ")),
                            React.createElement("td", null,
                                React.createElement(ej2_react_inplace_editor_1.InPlaceEditorComponent, { ref: function (mask) { _this.maskObj = mask; }, id: 'maskedTextBoxEle', mode: 'Inline', type: 'Mask', value: '012-345-6789', model: this.maskModel })))))),
            React.createElement("div", { className: 'col-lg-4 property-section', id: "defaultProperty" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties", className: "property-panel-table" },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Mode")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (edit) { _this.editorMode = edit; }, id: 'editorMode', className: 'form-control', dataSource: this.dropDownData, fields: this.dropDownFields, value: this.dropDownVal, width: '90%', change: this.changeEditorMode.bind(this) })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Editable On")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (edit) { _this.editableon = edit; }, id: 'editableon', className: 'form-control', dataSource: this.editableData, fields: this.editableFields, value: this.editableVal, width: '90%', change: this.onEditableOn.bind(this) })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Show Buttons")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'showbuttons', checked: true, labelPosition: 'Before', change: this.onChange.bind(this) })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Disable")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'editorEnable', checked: false, labelPosition: 'Before', change: this.onChangeEnable.bind(this) })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the default functionalities of the In-place Editor control. Click on the dotted input element to switch to the editable state and save or cancel it by clicking the actions buttons.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "In-place Editor"),
                    " component is used to edit values in place and update them to the server."),
                React.createElement("p", null,
                    React.createElement("code", null, "In-place Editor"),
                    " modes can be switched by selecting the appropriate values provided in a drop-down. The applicable editor positions are as follows:"),
                React.createElement("p", null,
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/inplace-editor/#mode" }, "Inline")),
                        React.createElement("li", null,
                            React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/inplace-editor/#mode" }, "Pop-up")))),
                React.createElement("p", null,
                    "The edit on modes of In-place editor can be switched by selecting the appropriate values provided in a drop-down. The applicable modes are as follows:",
                    React.createElement("ul", null,
                        React.createElement("li", null, "Click - Editor opens the edit input with single click of textbox."),
                        React.createElement("li", null, "DblClick - Editor opens the edit input with double click of textbox."),
                        React.createElement("li", null, "EditIconClick - Edit mode can be open with the use of edit icon only which is visible on hover of textbox."))),
                React.createElement("p", null,
                    "The Save and Cancel buttons of the ",
                    React.createElement("code", null, "In-place Editor"),
                    " control can be shown or hidden by switching the Show Button check box state. If the action buttons are hidden, then you can save the data by clicking outside the target or by pressing the Enter key. You can cancel the edit request by pressing the Esc key."),
                React.createElement("p", null,
                    "More information on the ",
                    React.createElement("code", null, "In-place Editor"),
                    " instantiation can be found in the\u00A0",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/inplace-editor/getting-started/" }, "documentation section"),
                    "."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
