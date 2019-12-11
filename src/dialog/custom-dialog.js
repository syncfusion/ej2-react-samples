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
require("./custom-dialog.css");
var Basic = /** @class */ (function (_super) {
    __extends(Basic, _super);
    function Basic(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            hideAlertDialog: false,
            hideConfirmDialog: false,
            hidePromptDialog: false
        };
        _this.alertButtonRef = function (element) {
            _this.alertButtonEle = element;
        };
        _this.confirmButtonRef = function (element) {
            _this.confirmButtonEle = element;
        };
        _this.promptButtonRef = function (element) {
            _this.promptButtonEle = element;
        };
        _this.spanRef = function (element) {
            _this.spanEle = element;
        };
        _this.alertButtons = [{
                // Click the footer buttons to hide the Dialog
                click: function () {
                    _this.setState({ hideAlertDialog: false });
                },
                buttonModel: { content: 'Dismiss', isPrimary: true }
            }];
        _this.confirmButton = [{
                click: function () {
                    _this.setState({ hideConfirmDialog: false });
                },
                buttonModel: { content: 'Yes', isPrimary: true }
            },
            {
                click: function () {
                    _this.setState({ hideConfirmDialog: false });
                },
                buttonModel: { content: 'No' }
            }];
        _this.promptButtons = [{
                click: function () {
                    _this.setState({ hidePromptDialog: false });
                },
                buttonModel: { content: 'Connect', isPrimary: true }
            },
            {
                click: function () {
                    _this.setState({ hidePromptDialog: false });
                },
                buttonModel: { content: 'Cancel' }
            }];
        _this.animationSettings = { effect: 'None' };
        return _this;
    }
    Basic.prototype.buttonClick = function (args) {
        if (args.target.innerHTML.toLowerCase() == 'alert') {
            this.setState({ hideAlertDialog: true });
        }
        else if (args.target.innerHTML.toLowerCase() == 'confirm') {
            this.setState({ hideConfirmDialog: true });
        }
        else if (args.target.innerHTML.toLowerCase() == 'prompt')
            this.setState({ hidePromptDialog: true });
    };
    Basic.prototype.dialogClose = function () {
        this.setState({
            hideAlertDialog: false,
            hideConfirmDialog: false,
            hidePromptDialog: false
        });
        this.alertButtonEle.style.display = 'inline-block';
        this.confirmButtonEle.style.display = 'inline-block';
        this.promptButtonEle.style.display = 'inline-block';
    };
    Basic.prototype.dialogOpen = function () {
        this.alertButtonEle.style.display = 'none';
        this.confirmButtonEle.style.display = 'none';
        this.promptButtonEle.style.display = 'none';
    };
    Basic.prototype.onFocus = function (args) {
        this.spanEle.classList.add('e-input-focus');
    };
    Basic.prototype.onBlur = function (args) {
        this.spanEle.classList.remove('e-input-focus');
    };
    Basic.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { id: 'target', className: 'col-lg-12 control-section dialog-target' },
                React.createElement("button", { className: "e-control e-btn dlgbtn", ref: this.alertButtonRef, onClick: this.buttonClick.bind(this), id: "alertBtn" }, "Alert"),
                React.createElement("button", { className: "e-control e-btn dlgbtn", ref: this.confirmButtonRef, onClick: this.buttonClick.bind(this), id: "confirmBtn" }, "Confirm"),
                React.createElement("button", { className: "e-control e-btn dlgbtn", ref: this.promptButtonRef, onClick: this.buttonClick.bind(this), id: "promptBtn" }, "Prompt"),
                React.createElement(ej2_react_popups_1.DialogComponent, { id: "alertDialog", header: 'Low Battery', visible: this.state.hideAlertDialog, animationSettings: this.animationSettings, width: '250px', content: '10% of battery remaining', ref: function (alertdialog) { return _this.alertDialogInstance = alertdialog; }, target: '#target', buttons: this.alertButtons, open: this.dialogOpen.bind(this), close: this.dialogClose.bind(this) }),
                React.createElement(ej2_react_popups_1.DialogComponent, { id: "confirmDialog", header: 'Delete Multiple Items', visible: this.state.hideConfirmDialog, showCloseIcon: true, animationSettings: this.animationSettings, width: '400px', content: 'Are you sure you want to permanently delete these items ?', ref: function (dialog) { return _this.confirmDialogInstance = dialog; }, target: '#target', buttons: this.confirmButton, open: this.dialogOpen.bind(this), close: this.dialogClose.bind(this) }),
                React.createElement(ej2_react_popups_1.DialogComponent, { id: "promptDialog", header: 'Join Wi-Fi network', visible: this.state.hidePromptDialog, showCloseIcon: true, animationSettings: this.animationSettings, width: '330px', ref: function (dialog) { return _this.promptDialogInstance = dialog; }, target: '#target', buttons: this.promptButtons, open: this.dialogOpen.bind(this), close: this.dialogClose.bind(this) },
                    React.createElement("table", null,
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null, "SSID:")),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("b", null, "AndroidAP"))),
                            React.createElement("tr", null,
                                React.createElement("td", null, "Password:")),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("span", { id: 'password', ref: this.spanRef, className: "e-input-group" },
                                        React.createElement("input", { type: "password", onFocus: this.onFocus.bind(this), onBlur: this.onBlur.bind(this), name: "Required", className: "e-input" })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates that you can create different types of custom dialogs such as alert, confirm, and prompt dialogs. The buttons \u201Calert\u201D, \u201Cconfirm\u201D, and \u201Cprompt\u201D are used to open the corresponding dialogs.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The dialog component is used to create alert, prompt, and confirmation dialogs using content, and buttons property. The content property accepts both string and HTML element as content."),
                React.createElement("ul", null,
                    React.createElement("li", null, "Alert - Used to show errors, warnings, and information that needs user awareness."),
                    React.createElement("li", null, "Prompt - Used to get input from the user."),
                    React.createElement("li", null, "Confirmation - Used to get approval from user that appears before any critical action.")),
                React.createElement("p", null,
                    "More information on the Dialog instantiation can be found in the ",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/dialog/getting-started/" }, "documentation section"),
                    "."))));
    };
    return Basic;
}(sample_base_1.SampleBase));
exports.Basic = Basic;
