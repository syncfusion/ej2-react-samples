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
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_notifications_1 = require("@syncfusion/ej2-react-notifications");
require("./default.css");
var Default = (function (_super) {
    __extends(Default, _super);
    function Default() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.position = { X: 'Right' };
        return _this;
    }
    Default.prototype.create = function () {
        setTimeout(function () {
            this.toastObj.show({
                title: 'Adaptive Tiles Meeting', content: 'Conference Room 01 / Building 135 10:00 AM',
                icon: 'e-meeting',
            });
        }.bind(this), 200);
    };
    Default.prototype.hideBtnClick = function () {
        this.toastObj.hide('All');
    };
    Default.prototype.showBtnClick = function () {
        this.toastObj.show();
    };
    Default.prototype.onclose = function (e) {
        if (e.toastContainer.childElementCount === 0) {
            this.toastBtnHide.element.style.display = 'none';
        }
    };
    Default.prototype.onbeforeOpen = function () {
        this.toastBtnHide.element.style.display = 'inline-block';
    };
    Default.prototype.rendereComplete = function () {
        document.addEventListener('click', function (e) {
            if (!ej2_base_1.isNullOrUndefined(this.toastObj) && e.target !== this.toastBtnShow.element) {
                this.toastObj.hide('All');
            }
        }.bind(this));
    };
    Default.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section col-lg-12 toast-default-section' },
                React.createElement("div", { className: "e-sample-resize-container" },
                    React.createElement(ej2_react_notifications_1.ToastComponent, { ref: function (toast) { _this.toastObj = toast; }, id: 'toast_default', position: this.position, created: this.create.bind(this), close: this.onclose.bind(this), beforeOpen: this.onbeforeOpen.bind(this) }),
                    React.createElement("div", { id: "toastBtnDefault", style: { margin: 'auto', textAlign: 'center' } },
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'toastBtnShow', ref: function (btn) { _this.toastBtnShow = btn; }, className: 'e-btn', onClick: this.showBtnClick.bind(this) }, "Show Toasts"),
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'toastBtnHide', ref: function (btn) { _this.toastBtnHide = btn; }, className: 'e-btn', onClick: this.hideBtnClick.bind(this) }, "Hide All")))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates the basic layout of a ",
                    React.createElement("code", null, "Toast"),
                    " to show simple notification and hide them.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "Toast"),
                    " is a notification pop-up used to display on the desired position with required message and header icons."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        "The header text is set using ",
                        React.createElement("code", null, "title"),
                        " property."),
                    React.createElement("li", null,
                        "Information to be displayed is set using ",
                        React.createElement("code", null, "content"),
                        " property.")),
                React.createElement("p", null,
                    "More information about Toast can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/toast/getting-started/" }, "documentation section"),
                    "."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
