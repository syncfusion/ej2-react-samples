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
require("./multiple-dialogs.css");
var MultipleDialogs = (function (_super) {
    __extends(MultipleDialogs, _super);
    function MultipleDialogs(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            hideDialog1: true,
            hideDialog2: false
        };
        _this.buttonRef = function (element) {
            _this.buttonEle = element;
        };
        _this.dlgButton = [{
                click: function () {
                    _this.setState({ hideDialog2: true });
                },
                buttonModel: { content: 'Next', isPrimary: true }
            }];
        _this.dlg2Button = [{
                click: function () {
                    _this.setState({ hideDialog2: false });
                },
                buttonModel: { content: 'Close', isPrimary: true }
            }];
        _this.animationSettings = { effect: 'None' };
        return _this;
    }
    MultipleDialogs.prototype.buttonClick = function (args) {
        this.setState({ hideDialog1: true });
    };
    MultipleDialogs.prototype.dialogClose = function () {
        this.setState({ hideDialog1: false });
        this.buttonEle.style.display = 'inline-block';
    };
    MultipleDialogs.prototype.dialogClose2 = function () {
        this.setState({ hideDialog2: false });
        this.buttonEle.style.display = 'none';
    };
    MultipleDialogs.prototype.dialogOpen = function () {
        this.buttonEle.style.display = 'none';
    };
    MultipleDialogs.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { id: 'target', className: 'col-lg-12 control-section dialog-target' },
                React.createElement("button", { className: 'e-control e-btn dlgbtn', ref: this.buttonRef, onClick: this.buttonClick.bind(this), id: 'dialogBtn' }, "Open Dialog"),
                React.createElement(ej2_react_popups_1.DialogComponent, { id: 'multipleDialog', header: 'First Dialog', visible: this.state.hideDialog1, showCloseIcon: true, animationSettings: this.animationSettings, width: '330px', ref: function (defaultDialog) { return _this.defaultDialogInstance = defaultDialog; }, target: '#target', buttons: this.dlgButton, open: this.dialogOpen.bind(this), close: this.dialogClose.bind(this) },
                    React.createElement("p", null, "This is the first dialog and acts as a parent dialog, you can open the second (child) dialog by clicking \"Next\".")),
                React.createElement(ej2_react_popups_1.DialogComponent, { id: 'secondDialog', isModal: true, header: 'Second Dialog', showCloseIcon: true, visible: this.state.hideDialog2, animationSettings: this.animationSettings, width: '285px', ref: function (secondDialog) { return _this.secondDialogInstance = secondDialog; }, target: '#target', buttons: this.dlg2Button, open: this.dialogOpen.bind(this), close: this.dialogClose2.bind(this) },
                    React.createElement("p", null, "This is the second dialog and act as a child dialog.")),
                React.createElement("div", { id: "action-description" },
                    React.createElement("p", null, "This example demonstrates how to display multiple dialogs one over the other. The second dialog is configured with draggable behavior to adjust its position. You can invoke the second dialog from first dialog's button. Enable the \"open dialog\" button to reopen the dialog if the first dialog is closed.")),
                React.createElement("div", { id: "description" },
                    React.createElement("p", null,
                        "You can configure the dialog as a parent and child, and invoke the child dialog from its parent dialog. In addition, multiple dialogs can be shown at a time in a page. The Z- index order will be controlled automatically in the browser and manually using the",
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/dialog/#zindex" }, " zIndex "),
                        " property.")))));
    };
    return MultipleDialogs;
}(sample_base_1.SampleBase));
exports.MultipleDialogs = MultipleDialogs;
