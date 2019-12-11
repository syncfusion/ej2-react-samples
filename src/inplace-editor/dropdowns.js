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
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_inplace_editor_1 = require("@syncfusion/ej2-react-inplace-editor");
var sample_base_1 = require("../common/sample-base");
require("./dropdowns.component.css");
// tslint:disable:max-line-length
var DropDowns = /** @class */ (function (_super) {
    __extends(DropDowns, _super);
    function DropDowns() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.popupSettings = { model: { width: 'auto' } };
        _this.multiValue = ['Canada', 'Bermuda'];
        // define the array of string
        _this.dropDownData = ['Australia', 'Bermuda', 'Canada', 'Cameroon', 'Denmark', 'Finland', 'Greenland', 'Poland'];
        _this.dropDownModel = { dataSource: _this.dropDownData, placeholder: 'Find a country' };
        _this.autoCompleteModel = { dataSource: _this.dropDownData, placeholder: ' Type to search country' };
        _this.comboBoxModel = { dataSource: _this.dropDownData, placeholder: 'Find a country' };
        _this.multiSelectModel = { dataSource: _this.dropDownData, placeholder: 'Choose the countries', mode: 'Box', width: 150 };
        // Mapping DropDownList dataSource property
        _this.editorData = [
            { 'value': 'inline', 'text': 'Inline' }, { 'value': 'popup', 'text': 'Popup' }
        ];
        // Mapping DropDownList fields property
        _this.dropDownFields = { text: 'text', value: 'value' };
        // Mapping DropDownList value property
        _this.dropDownVal = 'inline';
        _this.scrollRightPane = function () {
            var mode = document.getElementById('editorMode').value;
            if (mode === 'Inline') {
                return;
            }
            if (_this.editObj && (_this.editObj.element.querySelectorAll('.e-editable-open').length > 0)) {
                _this.editObj.enableEditMode = false;
            }
            if (_this.multiObj && (_this.multiObj.element.querySelectorAll('.e-editable-open').length > 0)) {
                _this.multiObj.enableEditMode = false;
            }
            if (_this.dropObj && (_this.dropObj.element.querySelectorAll('.e-editable-open').length > 0)) {
                _this.dropObj.enableEditMode = false;
            }
            if (_this.comboObbj && (_this.comboObbj.element.querySelectorAll('.e-editable-open').length > 0)) {
                _this.comboObbj.enableEditMode = false;
            }
        };
        return _this;
    }
    // Change event funtion for DropDownList component   
    DropDowns.prototype.changeEditorMode = function (e) {
        var mode = this.editorMode.value;
        this.editObj.mode = mode;
        this.multiObj.mode = mode;
        this.comboObbj.mode = mode;
        this.dropObj.mode = mode;
        this.editObj.dataBind();
        this.multiObj.dataBind();
        this.comboObbj.dataBind();
        this.dropObj.dataBind();
    };
    DropDowns.prototype.rendereComplete = function () {
        var _this = this;
        var rightPane = document.getElementById('right-pane');
        if (rightPane) {
            rightPane.addEventListener('scroll', function () {
                _this.scrollRightPane();
            });
        }
    };
    DropDowns.prototype.componentWillUnmount = function () {
        var _this = this;
        var rightPane = document.getElementById('right-pane');
        if (rightPane) {
            rightPane.removeEventListener('scroll', function () {
                _this.scrollRightPane();
            });
        }
    };
    DropDowns.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "col-lg-8 control-section inplace-control-section drop-down-layout" },
                React.createElement("div", { className: "control_wrapper" },
                    React.createElement("table", null,
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("label", { className: "control-label" }, "DropDownList ")),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_inplace_editor_1.InPlaceEditorComponent, { ref: function (drop) { _this.dropObj = drop; }, id: 'dropdownEle', mode: 'Inline', type: 'DropDownList', value: 'Canada', model: this.dropDownModel }))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("label", { className: "control-label" }, "AutoComplete ")),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_inplace_editor_1.InPlaceEditorComponent, { ref: function (edit) { _this.editObj = edit; }, id: 'autoCompleteEle', mode: 'Inline', type: 'AutoComplete', value: 'Australia', model: this.autoCompleteModel },
                                        React.createElement(ej2_react_inplace_editor_1.Inject, { services: [ej2_react_inplace_editor_1.AutoComplete] })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("label", { className: "control-label" }, "ComboBox ")),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_inplace_editor_1.InPlaceEditorComponent, { ref: function (combo) { _this.comboObbj = combo; }, id: 'comboBoxEle', mode: 'Inline', type: 'ComboBox', value: 'Finland', model: this.comboBoxModel },
                                        React.createElement(ej2_react_inplace_editor_1.Inject, { services: [ej2_react_inplace_editor_1.ComboBox] })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("label", { className: "control-label" }, "MultiSelect ")),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_inplace_editor_1.InPlaceEditorComponent, { ref: function (multi) { _this.multiObj = multi; }, id: 'multiSelectEle', mode: 'Inline', type: 'MultiSelect', value: this.multiValue, model: this.multiSelectModel, popupSettings: this.popupSettings },
                                        React.createElement(ej2_react_inplace_editor_1.Inject, { services: [ej2_react_inplace_editor_1.MultiSelect] })))))))),
            React.createElement("div", { className: 'col-lg-4 property-section', id: "dropdownProperty" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties", className: "property-panel-table" },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Mode")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (drop) { _this.editorMode = drop; }, id: 'editorMode', className: 'form-control', dataSource: this.editorData, fields: this.dropDownFields, value: this.dropDownVal, width: '90%', change: this.changeEditorMode.bind(this) })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the usage of drop-down components such as AutoComplete, ComboBox, DropDownList, and MultiSelect. Click on the dotted input element to switch to the editable state of the corresponding integrated component.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This sample illustrates the way to integrate drop-down components with ",
                    React.createElement("code", null, "In-place Editor"),
                    ". The applicable types of components are:"),
                React.createElement("p", null,
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("code", null, "DropDownList")),
                        React.createElement("li", null,
                            React.createElement("code", null, "AutoComplete")),
                        React.createElement("li", null,
                            React.createElement("code", null, "ComboBox")),
                        React.createElement("li", null,
                            React.createElement("code", null, "MultiSelect")))),
                React.createElement("p", null, "The above components and their features are editable in place and can be customized with the model properties of the specific component."),
                React.createElement("p", null,
                    "More information on the ",
                    React.createElement("code", null, "In-place Editor"),
                    " instantiation can be found in the\u00A0",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/inplace-editor/getting-started/" }, "documentation section"),
                    "."))));
    };
    return DropDowns;
}(sample_base_1.SampleBase));
exports.DropDowns = DropDowns;
