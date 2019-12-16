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
require("./animation.css");
var Animation = /** @class */ (function (_super) {
    __extends(Animation, _super);
    function Animation(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            hideDialog: true
        };
        _this.dlgButton = [{
                click: _this.dialogButtonClick.bind(_this),
                buttonModel: { content: 'Hide', isPrimary: true }
            }];
        _this.buttonClick = _this.buttonClick.bind(_this);
        _this.animationSettings = { effect: 'Zoom' };
        return _this;
    }
    Animation.prototype.dialogButtonClick = function () {
        this.setState({ hideDialog: false });
    };
    Animation.prototype.dialogClose = function () {
        this.setState({ hideDialog: false });
    };
    Animation.prototype.buttonClick = function (args) {
        var dialog = this.defaultDialogInstance;
        var effects = args.target.id;
        var txt = args.target.parentElement.innerText;
        txt = (txt === 'Zoom In/Out') ? 'Zoom In or Out' : txt;
        dialog.content = 'The dialog is configured with animation effect. It is opened or closed with "' + txt + '" animation.';
        dialog.animationSettings = { effect: effects, duration: 400 };
        this.setState({ hideDialog: true });
    };
    Animation.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { id: 'target', className: 'col-lg-12 control-section dialog-target' },
                React.createElement("div", { id: 'customization' },
                    React.createElement("div", { className: 'animate' },
                        React.createElement("button", { className: 'e-control e-btn e-outline e-primary', onClick: this.buttonClick.bind(this), id: 'Zoom' }, "Zoom")),
                    React.createElement("div", { className: 'animate' },
                        React.createElement("button", { className: 'e-control e-btn e-outline e-primary', onClick: this.buttonClick.bind(this), id: 'FlipXDown' }, "FlipX Down")),
                    React.createElement("div", { className: 'animate' },
                        React.createElement("button", { className: 'e-control e-btn e-outline e-primary', onClick: this.buttonClick.bind(this), id: 'FlipXUp' }, "FlipX Up")),
                    React.createElement("div", { className: 'animate' },
                        React.createElement("button", { className: 'e-control e-btn e-outline e-primary', onClick: this.buttonClick.bind(this), id: 'FlipYLeft' }, "FlipY Left")),
                    React.createElement("div", { className: 'animate' },
                        React.createElement("button", { className: 'e-control e-btn e-outline e-primary', onClick: this.buttonClick.bind(this), id: 'FlipYRight' }, "FlipY Right"))),
                React.createElement(ej2_react_popups_1.DialogComponent, { id: 'AnimationDialog', isModal: true, header: 'Animation Dialog', showCloseIcon: true, animationSettings: this.animationSettings, width: '285px', ref: function (defaultDialog) { return _this.defaultDialogInstance = defaultDialog; }, target: '#target', buttons: this.dlgButton, visible: this.state.hideDialog, beforeClose: this.dialogClose.bind(this) },
                    React.createElement("span", null, "The dialog is configured with animation effect. It is opened or closed with \"Zoom In or Out\" animation.")),
                React.createElement("div", { id: "action-description" },
                    React.createElement("p", null, "This example demonstrates how to open or close the dialog with animation effects by clicking the appropriate button.")),
                React.createElement("div", { id: "description" },
                    React.createElement("p", null,
                        "The dialog can be opened or closed with animation effect using the ",
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/dialog/#animationsettings" }, "animationSettings"),
                        " property. You can also customize the duration of animation and delay to begin animation. Disables the dialog's animation by setting the animation effect as none."),
                    React.createElement("p", null,
                        "More information on the animation effect of Dialog can be found in the ",
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/dialog/animation/" }, "documentation section"),
                        ".")))));
    };
    return Animation;
}(sample_base_1.SampleBase));
exports.Animation = Animation;
