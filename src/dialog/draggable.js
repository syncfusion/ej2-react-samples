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
require("./draggable.css");
var Draggable = (function (_super) {
    __extends(Draggable, _super);
    function Draggable(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            hideDialog: true
        };
        _this.buttonRef = function (element) {
            _this.buttonEle = element;
        };
        _this.dialogClose = _this.dialogClose.bind(_this);
        _this.dialogOpen = _this.dialogOpen.bind(_this);
        _this.animationSettings = { effect: 'None' };
        return _this;
    }
    Draggable.prototype.buttonClick = function (args) {
        this.setState({ hideDialog: true });
    };
    Draggable.prototype.dialogClose = function () {
        this.setState({ hideDialog: false });
        this.buttonEle.style.display = 'inline-block';
    };
    Draggable.prototype.dialogOpen = function () {
        this.setState({ hideDialog: true });
        this.buttonEle.style.display = 'none';
    };
    Draggable.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { id: 'target', className: 'col-lg-12 control-section dialog-draggable' },
                React.createElement("button", { className: 'e-control e-btn dlgbtn', ref: this.buttonRef, onClick: this.buttonClick.bind(this), id: 'dialogBtn' }, "Open Dialog"),
                React.createElement(ej2_react_popups_1.DialogComponent, { id: 'dialogDraggable', header: 'Drag Me!!!', isModal: true, showCloseIcon: true, allowDragging: true, animationSettings: this.animationSettings, width: '300px', target: '#target', visible: this.state.hideDialog, open: this.dialogOpen, close: this.dialogClose }, "This is a dialog with draggable support."),
                React.createElement("div", { id: "action-description" },
                    React.createElement("p", null, "This example demonstrates the drag-and-drop operation of the dialog component. To begin drag-and-drop operation, select a dialog's header using mouse and dropping them in the desired location. The dialog can be draggable within the sample container. Enable the \"open dialog\" button to reopen the dialog if it is closed.")),
                React.createElement("div", { id: "description" },
                    React.createElement("p", null,
                        "A drag-and-drop operation is enabled using the ",
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/dialog/#allowdragging" }, "allowDragging "),
                        " property. when you configure the ",
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/dialog/#target" }, "target"),
                        " property, the dialog can be draggable within its target container alone. The drag-and-drop feature is used to reposition the dialog dynamically."),
                    React.createElement("p", null,
                        "More information on the draggable operation of Dialog can be found in the ",
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/dialog/getting-started/#draggable" }, "documentation section"),
                        ".")))));
    };
    return Draggable;
}(sample_base_1.SampleBase));
exports.Draggable = Draggable;
