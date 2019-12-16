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
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_notifications_1 = require("@syncfusion/ej2-react-notifications");
var ej2_base_2 = require("@syncfusion/ej2-base");
require("./templates.css");
var Templates = /** @class */ (function (_super) {
    __extends(Templates, _super);
    function Templates(props) {
        var _this = _super.call(this, props) || this;
        _this.cusPosition = { X: 'Right' };
        _this.tempPosition = !ej2_base_2.Browser.isDevice ? { X: 'Right', Y: 'Bottom' } : { X: 'Center', Y: 'Top' };
        _this.tempTarget = !ej2_base_2.Browser.isDevice ? document.body : '#toast_template_target';
        _this.template = '<div class="e-toast-template">${if(image)}<img class="e-toast-icon e-toast-image" src="${image.url}" />${/if} ${if(from || subject)}<div class="e-toast-message">${if(from)}<div class="e-toast-title">${from}</div>${/if} ${if(subject)}<div class="e-toast-content">${subject}</div>${/if}</div>${/if}</div>';
        _this.toastData = [
            { from: ' Anjolie Stokes', subject: 'Networking Referral', image: { url: 'src/toast/resource/laura.png' }, },
            { from: ' Ila Russo', subject: 'Business dinner invitation', image: { url: 'src/toast/resource/janat.png' }, },
            { from: ' Camden Mcmillan', subject: 'Reference Request - Cameran Hester', image: { url: 'src/toast/resource/camden.png' }, },
            { from: ' Chase Solomon', subject: 'New business relationship confirmation', image: { url: 'src/toast/resource/chase.png' }, },
            {
                from: ' Inga Scott', subject: 'Application for Sales Associate', image: { url: 'src/toast/resource/michael.png' },
            }
        ];
        _this.cusAnimation = {
            hide: { effect: 'SlideRightOut' },
            show: { effect: 'SlideRightIn' }
        };
        _this.toastFlag = 0;
        _this.snoozeFlag = false;
        _this.waterMark = 'Select a snooze time';
        _this.height = '200px';
        _this.value = '2min';
        _this.snoozeData = [
            { value: '2min', text: '2 minutes' },
            { value: '5min', text: '5 minutes' },
            { value: '10min', text: '10 minutes' }
        ];
        _this.snoozeRef = function (element) {
            _this.snoozeEle = element;
        };
        _this.dismissRef = function (element) {
            _this.dismissEle = element;
        };
        return _this;
    }
    Templates.prototype.remainderClick = function () {
        var obj = this.cardTemplateFn(this.toastData[this.toastFlag])[0];
        this.toastObjEmail.show({ template: obj.outerHTML });
        ++this.toastFlag;
        if (this.toastFlag === (this.toastData.length)) {
            this.toastFlag = 0;
        }
    };
    Templates.prototype.alarmClick = function () {
        this.toastObj.show();
    };
    Templates.prototype.onOpenToast = function () {
        this.snoozeEle.addEventListener('click', function () {
            this.snoozeFlag = true;
            this.toastObj.hide();
        }.bind(this));
        this.dismissEle.addEventListener('click', function () {
            this.toastObj.hide();
        }.bind(this));
        document.addEventListener('click', function (e) {
            var closestEle = ej2_base_2.closest(e.target, '.e-toast-container');
            if (!ej2_base_1.isNullOrUndefined(this.toastObj) && e.target !== this.AlarmTurnOn.element && e.target !== this.toastMailRemainder.element && closestEle !== this.toastObj.element && closestEle !== this.toastObjEmail.element) {
                this.toastObj.hide('All');
                this.toastObjEmail.hide('All');
            }
        }.bind(this));
    };
    Templates.prototype.onToastClose = function () {
        this.AlarmTurnOn.element.style.display = 'inline-block';
        if (this.snoozeFlag) {
            this.toastObj.show({ timeOut: (parseInt(this.listObj.value.toString(), 10) * 60000) });
            this.snoozeFlag = false;
        }
    };
    Templates.prototype.onToastBeforeOpen = function (e) {
        this.AlarmTurnOn.element.style.display = 'none';
    };
    Templates.prototype.listChange = function (e) {
        this.snoozeFlag = true;
        this.toastObj.hide();
    };
    Templates.prototype.cardTemplateFn = function (data) {
        return ej2_base_2.compile(this.template.trim())(data);
    };
    Templates.prototype.toastObjCreate = function () {
        setTimeout(function () {
            this.toastObj.show();
        }.bind(this), 200);
    };
    Templates.prototype.toastObjEmailCreate = function () {
        setTimeout(function () {
            this.toastObjEmail.show({ template: this.cardTemplateFn(this.toastData[this.toastFlag])[0].outerHTML });
            ++this.toastFlag;
        }.bind(this), 200);
    };
    Templates.prototype.render = function () {
        var _this = this;
        function templatedata() {
            var _this = this;
            return (React.createElement("div", { id: "template_toast_ele" },
                React.createElement("div", { id: 'template_toast' },
                    React.createElement("div", { className: "horizontal-align" },
                        React.createElement("div", { className: 'e-icons toast-icons e-alarm' }),
                        React.createElement("div", { className: 'toast-content' },
                            React.createElement("div", { className: 'toast-title' }, "Weekend Alarm"),
                            React.createElement("div", { className: 'toast-message' }, " With traffic, its likely to take 45 minutes to get to jenny's 24th Birthday Bash at Hillside Bar, 454 E. Olive Way by 10:00PM "))),
                    React.createElement("img", { src: "./src/toast/resource/map.jpg", width: "100%", height: "70%" }),
                    React.createElement("div", { className: "snooze" }, " Snooze for "),
                    React.createElement("div", { id: 'snoozedropDown' },
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "snoozeDD", dataSource: this.snoozeData, ref: function (dropdownlist) { _this.listObj = dropdownlist; }, change: this.listChange.bind(this), placeholder: this.waterMark, value: this.value, popupHeight: this.height })),
                    React.createElement("div", { className: "snoozeBtn" },
                        React.createElement("button", { id: "snooze", ref: this.snoozeRef, className: 'e-btn e-flat e-primary', style: { marginRight: '15px' } }, " Snooze "),
                        React.createElement("button", { id: "dismiss", ref: this.dismissRef, className: 'e-btn e-flat e-primary' }, " Dismiss ")))));
        }
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'col-lg-12 control-section toast-template-section' },
                React.createElement("div", { className: "e-sample-resize-container" },
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { id: "reminder" },
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { className: "e-btn", ref: function (btn) { _this.toastMailRemainder = btn; }, id: 'toast_mail_remainder', onClick: this.remainderClick.bind(this) }, " Mail Reminder"),
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { className: "e-btn", ref: function (btn) { _this.AlarmTurnOn = btn; }, id: 'Alarm_turn_on', onClick: this.alarmClick.bind(this) }, "Turn on Alarm"))),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                            React.createElement(ej2_react_notifications_1.ToastComponent, { ref: function (toast) { _this.toastObjEmail = toast; }, id: 'toast_custom', position: this.cusPosition, animation: this.cusAnimation, newestOnTop: true, showCloseButton: true, timeOut: 0, created: this.toastObjEmailCreate.bind(this) })),
                        React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                            React.createElement(ej2_react_notifications_1.ToastComponent, { ref: function (scope) { _this.toastObj = scope; }, id: 'toast_template', position: this.tempPosition, target: this.tempTarget, template: templatedata.bind(this), extendedTimeout: 0, timeOut: 120000, open: this.onOpenToast.bind(this), close: this.onToastClose.bind(this), beforeOpen: this.onToastBeforeOpen.bind(this), created: this.toastObjCreate.bind(this) }),
                            React.createElement("div", { id: "toast_template_target" }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the Template rendering of the Toast. Static HTML toast to display an alarm notification which can be snoozed or dismissed and Dynamic template rendered using template engine to display mail remainders.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "This sample illustrates the way to display the template content on the toast. With the usage of Template, the user can format and structure the HTML content to be displayed on the toast as per their application needs."),
                React.createElement("ul", null,
                    React.createElement("li", null, "Alarm toast is integrated with button and drop-down list that allows to set timeOut for toast and close it."),
                    React.createElement("li", null, "Dynamic toast opened based on the data source given to add mail reminder notifications and it can be hidden using the close button available.")),
                React.createElement("p", null,
                    "More information about Toast can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/toast/getting-started/" }, "documentation section"),
                    "."))));
    };
    return Templates;
}(sample_base_1.SampleBase));
exports.Templates = Templates;
