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
var sample_base_1 = require("../common/sample-base");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_inputs_1 = require("@syncfusion/ej2-inputs");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
require("./file-upload-with-forms.css");
var Formsupport = (function (_super) {
    __extends(Formsupport, _super);
    function Formsupport(props) {
        var _this = _super.call(this, props) || this;
        _this.inputRefElement = null;
        _this.inputRef = function (element) {
            _this.inputRefElement = element;
        };
        _this.animationSettings = { effect: 'Zoom' };
        _this.autoUpload = false;
        _this.allowedExtensions = 'image/*';
        _this.multiple = false;
        return _this;
    }
    // Uploader component
    Formsupport.prototype.rendereComplete = function () {
        var input = document.querySelectorAll('.e-input-group .e-input,.e-float-input.e-input-group input');
        var inputIcon = document.querySelectorAll('.e-input-group-icon');
        var _loop_1 = function (i) {
            { }
            input[i].addEventListener('focus', function () {
                getParentNode(input[i]).classList.add('e-input-focus');
            });
            { }
            input[i].addEventListener('blur', function () {
                getParentNode(input[i]).classList.remove('e-input-focus');
            });
        };
        for (var i = 0; i < input.length; i++) {
            _loop_1(i);
        }
        for (var i = 0; i < inputIcon.length; i++) {
            { }
            inputIcon[i].addEventListener('mousedown', function () {
                this.classList.add('e-input-btn-ripple');
            });
            { }
            inputIcon[i].addEventListener('mouseup', function () {
                var ele = this;
                setTimeout(function () { ele.classList.remove('e-input-btn-ripple'); }, 500);
            });
        }
        function getParentNode(element) {
            var parentNode = element.parentNode;
            if (parentNode.classList.contains('e-input-in-wrap')) {
                return parentNode.parentNode;
            }
            return parentNode;
        }
        document.getElementById('browse').onclick = function () {
            document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
            return false;
        };
        this.formValidator = {
            // Defines the validation rules
            rules: {
                'name': {
                    required: [true, '* Enter your name']
                },
                'email': {
                    required: [true, '* Please enter valid email']
                },
                'upload': {
                    required: [true, '* Select any file']
                },
                'mobile': {
                    required: [true, '* Enter your mobile number']
                }
            }
        };
        this.formObject = new ej2_inputs_1.FormValidator('#formTemp', this.formValidator);
    };
    ;
    Formsupport.prototype.onSubmitClick = function () {
        if (this.formObject.validate()) {
            this.formObject.element.reset();
            this.dialogInstance.show();
        }
    };
    Formsupport.prototype.onFileSelected = function (args) {
        this.inputElement = this.inputRefElement;
        this.inputElement.value = args.filesData[0].name;
        this.inputElement.classList.remove('e-error');
        this.inputElement.classList.remove('e-valid');
        this.inputElement.removeAttribute('aria-invalid');
        this.inputElement.setAttribute('aria-invalid', 'false');
    };
    Formsupport.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section col-lg-12 uploadpreview' },
                React.createElement("h4", { className: "form-title" }, "Photo Contest"),
                React.createElement("div", { className: "control_wrapper uploader-form", id: "control_wrapper" },
                    React.createElement("form", { id: "formTemp", method: "post" },
                        React.createElement("div", { className: "form-group" },
                            React.createElement("div", { className: "e-float-input" },
                                React.createElement("input", { type: "text", id: "name", name: "name", "data-msg-containerid": "nameError" }),
                                React.createElement("span", { className: "e-float-line" }),
                                React.createElement("label", { className: "e-float-text e-label-top", htmlFor: "name" }, "Name")),
                            React.createElement("div", { id: "nameError" })),
                        React.createElement("div", { className: "form-group" },
                            React.createElement("div", { className: "e-float-input" },
                                React.createElement("input", { type: "email", id: "Email", name: "email", "data-msg-containerid": "mailError" }),
                                React.createElement("span", { className: "e-float-line" }),
                                React.createElement("label", { className: "e-float-text e-label-top", htmlFor: "email" }, "Email")),
                            React.createElement("div", { id: "mailError" })),
                        React.createElement("div", { className: "form-group" },
                            React.createElement("div", { className: "e-float-input", id: "mobile-no" },
                                React.createElement("input", { type: "number", id: "mobileno", name: "mobile", "data-msg-containerid": "noError" }),
                                React.createElement("span", { className: "e-float-line" }),
                                React.createElement("label", { className: "e-float-text e-label-top", htmlFor: "mobile" }, "Mobile no")),
                            React.createElement("div", { id: "noError" })),
                        React.createElement("div", { className: "form-group" },
                            React.createElement("div", { className: "e-float-input upload-area" },
                                React.createElement("input", { type: "text", readOnly: true, id: "upload", ref: this.inputRef, name: "upload", "data-msg-containerid": "uploadError" }),
                                React.createElement("button", { id: "browse", className: "e-control e-btn e-info" }, "Browse..."),
                                React.createElement("span", { className: "e-float-line" }),
                                React.createElement("label", { className: "e-float-text e-label-top" }, "Choose a file")),
                            React.createElement("div", { id: "uploadError" }),
                            React.createElement(ej2_react_inputs_1.UploaderComponent, { id: 'fileUpload', type: 'file', ref: function (scope) { _this.uploadObj = scope; }, selected: this.onFileSelected.bind(this), autoUpload: this.autoUpload, allowedExtensions: this.allowedExtensions, multiple: this.multiple })),
                        React.createElement("div", { className: "form-group" },
                            React.createElement("div", { className: "e-float-input" },
                                React.createElement("textarea", { className: "address-field", id: "Address", name: "Address" }),
                                React.createElement("span", { className: "e-float-line" }),
                                React.createElement("label", { className: "e-float-text e-label-top" }, "Address"))),
                        React.createElement("div", { className: "submitBtn" },
                            React.createElement("button", { className: "submit-btn e-btn", id: "submit-btn", onClick: this.onSubmitClick.bind(this) }, "Submit"),
                            React.createElement("div", { className: "desc" },
                                React.createElement("span", null, "*This button is not a submit type and the form submit handled from externally."))))),
                React.createElement(ej2_react_popups_1.DialogComponent, { id: "defaultdialog", isModal: true, header: 'Success', showCloseIcon: true, visible: false, content: 'Your details have been updated successfully, Thank you.', animationSettings: this.animationSettings, width: '50%', ref: function (dialog) { return _this.dialogInstance = dialog; }, target: '.control-section' })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, " This sample demonstrates the Uploader component supported with HTML form upload.Fill the mandatory details in a form and click the submit button. ")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The Uploader component works in synchronous mode using HTML form.When the end-user submits the form, the selected files are submitted to server with the ",
                    React.createElement("code", null, "name"),
                    " attribute of input element."),
                React.createElement("p", null,
                    "More information on the form support can be found on this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/uploader/form-support/" }, " documentation section"),
                    "."))));
    };
    return Formsupport;
}(sample_base_1.SampleBase));
exports.Formsupport = Formsupport;
