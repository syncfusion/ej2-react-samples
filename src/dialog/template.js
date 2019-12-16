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
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var sample_base_1 = require("../common/sample-base");
require("./template.css");
var Template = /** @class */ (function (_super) {
    __extends(Template, _super);
    function Template(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            hideDialog: true
        };
        _this.buttonElement = null;
        _this.buttonRef = function (element) {
            _this.buttonElement = element;
        };
        return _this;
    }
    Template.prototype.header = function () {
        return (React.createElement("div", null,
            React.createElement("span", { className: "e-avatar template-image e-avatar-xsmall e-avatar-circle" }),
            React.createElement("div", { id: "dlg-template", title: "Nancy", className: "e-icon-settings" }, "Nancy")));
    };
    Template.prototype.footerTemplate = function () {
        return (React.createElement("div", null,
            React.createElement("input", { id: "inVal", className: "e-input", type: "text", placeholder: "Enter your message here!" }),
            React.createElement("button", { id: "sendButton", className: "e-control e-btn e-primary", "data-ripple": "true" }, "Send")));
    };
    Template.prototype.content = function () {
        return (React.createElement("div", { className: "dialogContent" },
            React.createElement("span", { className: "dialogText" }, "Greetings Nancy! When will you share me the source files of the project?")));
    };
    Template.prototype.buttonClick = function () {
        this.setState({ hideDialog: true });
    };
    Template.prototype.dialogClose = function () {
        this.setState({ hideDialog: false });
        this.buttonElement.style.display = 'inline-block';
    };
    Template.prototype.dialogOpen = function () {
        this.setState({ hideDialog: true });
        this.buttonElement.style.display = 'none';
    };
    Template.prototype.updateTextValue = function () {
        var enteredVal = document.getElementById('inVal');
        var dialogTextElement = document.getElementsByClassName('dialogText')[0];
        if (enteredVal.value !== '') {
            dialogTextElement.innerHTML = enteredVal.value;
        }
        enteredVal.value = '';
    };
    Template.prototype.rendereComplete = function () {
        var _this = this;
        this.proxy = this;
        this.dialogInstance.target = document.getElementById('target');
        document.getElementById('sendButton').onkeydown = function (e) {
            if (e.keyCode === 13) {
                _this.updateTextValue();
            }
        };
        document.getElementById('inVal').onkeydown = function (e) {
            if (e.keyCode === 13) {
                _this.updateTextValue();
            }
        };
        document.getElementById('sendButton').onclick = function () {
            _this.updateTextValue();
        };
    };
    Template.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { id: 'target', className: 'col-lg-12 target-element' },
                    React.createElement("button", { className: "e-control e-btn dlgbtn dlgbtn-position", ref: this.buttonRef, onClick: this.buttonClick.bind(this) }, "Open"),
                    React.createElement(ej2_react_popups_1.DialogComponent, { header: this.header, footerTemplate: this.footerTemplate, content: this.content, showCloseIcon: true, ref: function (dialog) { return _this.dialogInstance = dialog; }, target: '#target', width: '437px', open: this.dialogOpen.bind(this), close: this.dialogClose.bind(this), height: '255px', visible: this.state.hideDialog }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates the template functionalities of the dialog component. The dialog's header and footer is configured with HTML template. The typed content will be replaced every time when clicking the \"send\" button.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The dialog component displays HTML template content on the header and footer. The user can set any HTML element as header and footer with the usage of content and footer template properties."),
                React.createElement("p", null,
                    "More information on the modal behavior of Dialog can be found in the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/dialog/template/" }, "documentation section"),
                    "."))));
    };
    return Template;
}(sample_base_1.SampleBase));
exports.Template = Template;
