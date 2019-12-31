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
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_inplace_editor_1 = require("@syncfusion/ej2-react-inplace-editor");
var React = require("react");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
require("./editor.component.css");
// tslint:disable:max-line-length
var UseCase = (function (_super) {
    __extends(UseCase, _super);
    function UseCase(props) {
        var _this = _super.call(this, props) || this;
        _this.popupSettings = { model: { width: 300 } };
        _this.multiValue = ['TypeScript', 'JavaScript'];
        // define the array of string
        _this.multiData = ['Android', 'JavaScript', 'jQuery', 'TypeScript', 'Angular', 'React', 'Vue', 'Ionic'];
        _this.textValidationRules = { Title: { required: [true, 'Enter valid title'] } };
        _this.textModel = { placeholder: 'Enter your question title' };
        _this.rteValidationRules = { rte: { required: [true, 'Enter valid comments'] } };
        _this.rteModel = {
            toolbarSettings: {
                enableFloating: false,
                items: ['Bold', 'Italic', 'Underline', 'FontColor', 'BackgroundColor',
                    'LowerCase', 'UpperCase', '|', 'OrderedList', 'UnorderedList']
            }
        };
        _this.selectValidationRules = { Tag: { required: [true, 'Enter valid tags'] } };
        _this.selectModel = { dataSource: _this.multiData, placeholder: 'Enter your tags', mode: 'Box', };
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
            if (_this.titleObj && _this.titleObj.element.querySelectorAll('.e-editable-open')) {
                _this.titleObj.enableEditMode = false;
            }
            if (_this.tagObj && _this.tagObj.element.querySelectorAll('.e-editable-open')) {
                _this.tagObj.enableEditMode = false;
            }
            if (_this.rteObj && _this.rteObj.element.querySelectorAll('.e-editable-open')) {
                _this.rteObj.enableEditMode = false;
            }
        };
        _this.inplaceEditorControlEle = null;
        _this.inplaceEditorControlRef = function (element) {
            _this.inplaceEditorControlEle = element;
        };
        return _this;
    }
    // Change event funtion for DropDownList component   
    UseCase.prototype.changeEditorMode = function (e) {
        var mode = this.editorMode.value;
        this.titleObj.mode = mode;
        this.tagObj.mode = mode;
        this.rteObj.mode = mode;
        this.titleObj.dataBind();
        this.tagObj.dataBind();
        this.rteObj.dataBind();
    };
    UseCase.prototype.selectionActionSuccess = function (e) {
        e.value = this.chipCreation(e.value.split(','));
    };
    UseCase.prototype.create = function () {
        this.rteObj.popupSettings.model.width = this.inplaceEditorControlEle.offsetWidth;
        this.chipOnCreate();
    };
    UseCase.prototype.chipOnCreate = function () {
        this.tagObj.element.querySelector('.e-editable-value').innerHTML = this.chipCreation(this.tagObj.value);
    };
    UseCase.prototype.chipCreation = function (data) {
        var value = '<div class="e-chip-list">';
        [].slice.call(data).forEach(function (val) {
            value += '<div class="e-chip"> <span class="e-chip-text"> ' + val + '</span></div>';
        });
        value += '</div>';
        return value;
    };
    UseCase.prototype.rendereComplete = function () {
        var _this = this;
        var rightPane = document.getElementById('right-pane');
        if (rightPane) {
            rightPane.addEventListener('scroll', function () {
                _this.scrollRightPane();
            });
        }
    };
    UseCase.prototype.componentWillUnmount = function () {
        var _this = this;
        var rightPane = document.getElementById('right-pane');
        if (rightPane) {
            rightPane.removeEventListener('scroll', function () {
                _this.scrollRightPane();
            });
        }
    };
    UseCase.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "col-lg-8 control-section inplace-editor-control-section form-layout", ref: this.inplaceEditorControlRef, id: 'inplace-editor-control' },
                React.createElement("div", { className: "content-wrapper", style: { marginBottom: "25px" } },
                    React.createElement("div", { id: "confirmation" },
                        React.createElement("div", { id: "submitDialog" }),
                        React.createElement("form", { id: "formId", className: "form-horizontal" },
                            React.createElement("div", { className: "form-group" },
                                React.createElement("label", { className: "col-sm-6 control-label", style: { textAlign: "left", fontSize: "14px", fontWeight: 400 } }, "Title"),
                                React.createElement(ej2_react_inplace_editor_1.InPlaceEditorComponent, { ref: function (title) { _this.titleObj = title; }, id: 'inplace_title_editor', "data-underline": 'false', mode: 'Inline', emptyText: 'Enter your question title', name: 'Title', value: 'Succinctly E-Book about TypeScript', validationRules: this.textValidationRules, model: this.textModel })),
                            React.createElement("div", { className: "form-group" },
                                React.createElement("label", { className: "col-sm-6 control-label", style: { textAlign: "left", fontSize: "14px", fontWeight: 400 } }, "Comments"),
                                React.createElement(ej2_react_inplace_editor_1.InPlaceEditorComponent, { ref: function (rte) { _this.rteObj = rte; }, id: 'inplace_comment_editor', "data-underline": 'false', mode: 'Inline', type: 'RTE', editableOn: 'EditIconClick', submitOnEnter: false, value: 'The extensive adoption of JavaScript for application development, and the ability to use HTML and JavaScript to create Windows Store apps, has made JavaScript a vital part of the Windows development ecosystem. Microsoft has done extensive work to make JavaScript easier to use.', emptyText: 'Enter your comment', name: 'rte', validationRules: this.rteValidationRules, model: this.rteModel, popupSettings: this.popupSettings },
                                    React.createElement(ej2_react_inplace_editor_1.Inject, { services: [ej2_react_inplace_editor_1.Rte] }))),
                            React.createElement("div", { className: "form-group" },
                                React.createElement("label", { className: "col-sm-6 control-label", style: { textAlign: "left", fontSize: "14px", fontWeight: 400 } }, "Tags"),
                                React.createElement(ej2_react_inplace_editor_1.InPlaceEditorComponent, { ref: function (tag) { _this.tagObj = tag; }, id: 'inplace_tag_editor', "data-underline": 'false', mode: 'Inline', type: 'MultiSelect', created: this.create.bind(this), value: this.multiValue, emptyText: 'Enter your tags', name: 'Tag', actionSuccess: this.selectionActionSuccess.bind(this), validationRules: this.selectValidationRules, model: this.selectModel },
                                    React.createElement(ej2_react_inplace_editor_1.Inject, { services: [ej2_react_inplace_editor_1.MultiSelect] }))))))),
            React.createElement("div", { className: 'col-lg-4 property-section', id: "editorProperty" },
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
                React.createElement("p", null, "The sample demonstrates In-place Editor component usage with a form element. Edit the values in place to update to the post.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This sample demonstrates the placing of following ",
                    React.createElement("code", null, "In-place Editor"),
                    "\u00A0controls with the default form"),
                React.createElement("p", null,
                    React.createElement("ul", null,
                        React.createElement("li", null, "TextBox"),
                        React.createElement("li", null, "RichTextEditor"),
                        React.createElement("li", null, "MultiSelect"))),
                React.createElement("p", null,
                    "More information on the ",
                    React.createElement("code", null, "In-place Editor"),
                    " instantiation can be found in the\u00A0",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/inplace-editor/getting-started/" }, "documentation section"),
                    "."))));
    };
    return UseCase;
}(sample_base_1.SampleBase));
exports.UseCase = UseCase;
