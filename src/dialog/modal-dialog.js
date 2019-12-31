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
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
require("./modal-dialog.css");
var Modal = (function (_super) {
    __extends(Modal, _super);
    function Modal(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            hideDialog: true
        };
        _this.buttonRef = function (element) {
            _this.buttonEle = element;
        };
        _this.animationSettings = { effect: 'None' };
        _this.buttons = [{
                // Click the footer buttons to hide the Dialog
                click: function () {
                    _this.dialogInstance.hide();
                },
                // Accessing button component properties by buttonModel property
                buttonModel: {
                    //Enables the primary button
                    isPrimary: true,
                    content: 'OK'
                }
            }];
        return _this;
    }
    // function to handle the CheckBox change event
    Modal.prototype.onChange = function (args) {
        var _this = this;
        if (args.checked) {
            this.dialogInstance.overlayClick = function () {
                _this.setState({ hideDialog: false });
            };
        }
        else {
            this.dialogInstance.overlayClick = function () {
                _this.setState({ hideDialog: true });
            };
        }
    };
    // To Open dialog
    Modal.prototype.buttonClick = function () {
        this.setState({ hideDialog: true });
    };
    Modal.prototype.dialogClose = function () {
        this.setState({ hideDialog: false });
        this.buttonEle.style.display = 'inline-block';
    };
    Modal.prototype.dialogOpen = function () {
        this.buttonEle.style.display = 'none';
    };
    Modal.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section modal-dialog-target' },
                React.createElement("div", { id: 'target', className: 'col-lg-8' },
                    React.createElement("button", { className: "e-control e-btn dlgbtn dlgbtn-position", ref: this.buttonRef, onClick: this.buttonClick.bind(this) }, "Open"),
                    React.createElement(ej2_react_popups_1.DialogComponent, { id: "modalDialog", isModal: true, buttons: this.buttons, header: 'Software Update', width: '335px', content: 'Your current software version is up to date.', ref: function (dialog) { return _this.dialogInstance = dialog; }, target: '#target', visible: this.state.hideDialog, open: this.dialogOpen.bind(this), close: this.dialogClose.bind(this), animationSettings: this.animationSettings })),
                React.createElement("div", { className: 'col-lg-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table table-width' },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", { className: 'table-td' },
                                        React.createElement("div", { className: 'dialog-td-font' }, "Close on overlay click")),
                                    React.createElement("td", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: false, ref: function (scope) { _this.checkboxObj = scope; }, change: this.onChange.bind(this) })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates that the modal behavior of dialog component. Choose \"close on overlay\" option from property panel to decide whether the dialog can be closed when clicking overlay. Click \"open\" to show the dialog again, if it is in closed state.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The modal dialog prevents to access the parent application. So, the user should interact with the dialog before continuing with the parent application."),
                React.createElement("p", null,
                    "More information on the modal behavior of Dialog can be found in the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/dialog/getting-started/#modal-dialog" }, "documentation section"),
                    "."))));
    };
    return Modal;
}(sample_base_1.SampleBase));
exports.Modal = Modal;
