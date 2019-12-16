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
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_notifications_1 = require("@syncfusion/ej2-react-notifications");
require("./types.css");
var Types = /** @class */ (function (_super) {
    __extends(Types, _super);
    function Types() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.position = { X: 'Right' };
        _this.toasts = [
            { title: 'Warning!', content: 'There was a problem with your network connection.', cssClass: 'e-toast-warning', icon: 'e-warning toast-icons' },
            { title: 'Success!', content: 'Your message has been sent successfully.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' },
            { title: 'Error!', content: 'A problem has been occurred while submitting your data.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' },
            { title: 'Information!', content: 'Please read the comments carefully.', cssClass: 'e-toast-info', icon: 'e-info toast-icons' }
        ];
        return _this;
    }
    Types.prototype.create = function () {
        setTimeout(function () {
            this.toastObj.show(this.toasts[3]);
        }.bind(this), 200);
    };
    Types.prototype.infoClick = function () {
        this.toastObj.show(this.toasts[3]);
    };
    Types.prototype.warningClick = function () {
        this.toastObj.show(this.toasts[0]);
    };
    Types.prototype.successClick = function () {
        this.toastObj.show(this.toasts[1]);
    };
    Types.prototype.errorClick = function () {
        this.toastObj.show(this.toasts[2]);
    };
    Types.prototype.hideClick = function () {
        this.toastObj.hide('All');
    };
    Types.prototype.onclose = function (e) {
        if (e.toastContainer.childElementCount === 0) {
            this.hideTosat.element.style.display = 'none';
        }
    };
    Types.prototype.onbeforeOpen = function () {
        this.hideTosat.element.style.display = 'inline-block';
    };
    Types.prototype.render = function () {
        var _this = this;
        document.addEventListener('click', function (e) {
            if (!ej2_base_1.isNullOrUndefined(this.toastObj) && e.target !== this.infoBtn.element && e.target !== this.warnBtn.element && e.target !== this.successBtn.element && e.target !== this.errorBtn.element) {
                this.toastObj.hide('All');
            }
        }.bind(this));
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'col-lg-12 control-section toast-type-section' },
                React.createElement("div", { className: "e-sample-resize-container" },
                    React.createElement(ej2_react_notifications_1.ToastComponent, { ref: function (toast) { _this.toastObj = toast; }, id: 'toast_type', position: this.position, created: this.create.bind(this), close: this.onclose.bind(this), beforeOpen: this.onbeforeOpen.bind(this) }),
                    React.createElement("div", { id: 'toast_types' },
                        React.createElement("div", null,
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (scope) { _this.infoBtn = scope; }, cssClass: 'e-btn e-control e-info', id: 'info_Toast', onClick: this.infoClick.bind(this) }, "Info Message"),
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (scope) { _this.warnBtn = scope; }, cssClass: 'e-btn e-control e-warning', id: 'warning_Toast', onClick: this.warningClick.bind(this) }, "Warning Message"),
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (scope) { _this.successBtn = scope; }, cssClass: 'e-btn e-contro e-success', id: 'success_Toast', onClick: this.successClick.bind(this) }, "Success Message"),
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (scope) { _this.errorBtn = scope; }, cssClass: 'e-btn e-control e-danger', id: 'error_Toast', onClick: this.errorClick.bind(this) }, "Danger Message")),
                        React.createElement("div", { style: { paddingTop: '15px' } },
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-btn e-control', id: 'hideTosat', ref: function (btn) { _this.hideTosat = btn; }, onClick: this.hideClick.bind(this) }, "Hide All"))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates 4-predefined toast colors for various scenarios which can be using CSS class.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The toast supports the following 4 different essential colors for various situations. Here we have achieved success, danger, warning, info notifications with corresponding icon and text message. All the classes should be added with .e-toast class."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        "Information -  The ",
                        React.createElement("code", null, "e-toast-info"),
                        " class applies the color and background for showing toast information."),
                    React.createElement("li", null,
                        "Success -  The ",
                        React.createElement("code", null, "e-toast-success"),
                        " class applies the color and background for notifying success action."),
                    React.createElement("li", null,
                        "Warning -  The ",
                        React.createElement("code", null, "e-toast-warning"),
                        " class applies the color and background for showing warning message."),
                    React.createElement("li", null,
                        "Danger -  The ",
                        React.createElement("code", null, "e-toast-danger"),
                        " class applies the color and background for showing error/failure toast.")),
                React.createElement("p", null,
                    "More information about Toast can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/toast/getting-started/" }, "documentation section"),
                    "."))));
    };
    return Types;
}(sample_base_1.SampleBase));
exports.Types = Types;
