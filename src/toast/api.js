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
var ej2_react_notifications_1 = require("@syncfusion/ej2-react-notifications");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
require("./api.css");
var Api = (function (_super) {
    __extends(Api, _super);
    function Api(props) {
        var _this = _super.call(this, props) || this;
        _this.position = { X: 'Right', Y: 'Bottom' };
        _this.prevDuplicates = false;
        _this.showData = [
            { Id: 'ease', Text: 'Ease' },
            { Id: 'linear', Text: 'Linear' }
        ];
        _this.animationData = [
            { Id: 'SlideBottomIn', Effect: 'Slide Bottom In' },
            { Id: 'FadeIn', Effect: 'Fade In' },
            { Id: 'FadeZoomIn', Effect: 'Fade Zoom In' },
            { Id: 'FadeZoomOut', Effect: 'Fade Zoom Out' },
            { Id: 'FlipLeftDownIn', Effect: 'Flip Left Down In' },
            { Id: 'FlipLeftDownOut', Effect: 'Flip Left Down Out' },
            { Id: 'FlipLeftUpIn', Effect: 'Flip Left Up In' },
            { Id: 'FlipLeftUpOut', Effect: 'Flip Left Up Out' },
            { Id: 'FlipRightDownIn', Effect: 'Flip Right Down In' },
            { Id: 'FlipRightDownOut', Effect: 'Flip Right Down Out' },
            { Id: 'FlipRightUpIn', Effect: 'Flip Right Up In' },
            { Id: 'FlipRightUpOut', Effect: 'Flip Right Up Out' },
            { Id: 'SlideBottomOut', Effect: 'Slide Bottom Out' },
            { Id: 'SlideLeftIn', Effect: 'Slide Left In' },
            { Id: 'SlideLeftOut', Effect: 'Slide Left Out' },
            { Id: 'SlideRightIn', Effect: 'Slide Right In' },
            { Id: 'SlideRightOut', Effect: 'Slide Right Out' },
            { Id: 'SlideTopIn', Effect: 'Slide Top In' },
            { Id: 'SlideTopOut', Effect: 'Slide Top Out' },
            { Id: 'ZoomIn', Effect: 'Zoom In' },
            { Id: 'ZoomOut', Effect: 'Zoom Out' }
        ];
        _this.animationData1 = [
            { Id: 'SlideBottomOut', Effect: 'Slide Bottom Out' },
            { Id: 'FadeIn', Effect: 'Fade In' },
            { Id: 'FadeZoomIn', Effect: 'Fade Zoom In' },
            { Id: 'FadeZoomOut', Effect: 'Fade Zoom Out' },
            { Id: 'FlipLeftDownIn', Effect: 'Flip Left Down In' },
            { Id: 'FlipLeftDownOut', Effect: 'Flip Left Down Out' },
            { Id: 'FlipLeftUpIn', Effect: 'Flip Left Up In' },
            { Id: 'FlipLeftUpOut', Effect: 'Flip Left Up Out' },
            { Id: 'FlipRightDownIn', Effect: 'Flip Right Down In' },
            { Id: 'FlipRightDownOut', Effect: 'Flip Right Down Out' },
            { Id: 'FlipRightUpIn', Effect: 'Flip Right Up In' },
            { Id: 'FlipRightUpOut', Effect: 'Flip Right Up Out' },
            { Id: 'SlideBottomIn', Effect: 'Slide Bottom In' },
            { Id: 'SlideLeftIn', Effect: 'Slide Left In' },
            { Id: 'SlideLeftOut', Effect: 'Slide Left Out' },
            { Id: 'SlideRightIn', Effect: 'Slide Right In' },
            { Id: 'SlideRightOut', Effect: 'Slide Right Out' },
            { Id: 'SlideTopIn', Effect: 'Slide Top In' },
            { Id: 'SlideTopOut', Effect: 'Slide Top Out' },
            { Id: 'ZoomIn', Effect: 'Zoom In' },
            { Id: 'ZoomOut', Effect: 'Zoom Out' }
        ];
        _this.showFields = { text: 'Text', value: 'Id' };
        _this.animationFields = { text: 'Effect', value: 'Id' };
        _this.easeValue = 'ease';
        _this.animationValue = 'SlideBottomIn';
        _this.animationHideValue = 'SlideBottomOut';
        _this.toastInputTitleRef = function (element) {
            _this.toastInputTitleEle = element;
        };
        _this.toastInputContentRef = function (element) {
            _this.toastInputContentEle = element;
        };
        _this.showDurationRef = function (element) {
            _this.showDurationEle = element;
        };
        _this.hideDurationRef = function (element) {
            _this.hideDurationEle = element;
        };
        _this.timeOutRef = function (element) {
            _this.timeOutEle = element;
        };
        return _this;
    }
    Api.prototype.closeOnChange = function (e) {
        e.checked ? this.toastObj.showCloseButton = true : this.toastObj.showCloseButton = false;
    };
    Api.prototype.OnProgressChange = function (e) {
        e.checked ? this.toastObj.showProgressBar = true : this.toastObj.showProgressBar = false;
    };
    Api.prototype.closeNewestOnChange = function (e) {
        e.checked ? this.toastObj.newestOnTop = true : this.toastObj.newestOnTop = false;
    };
    Api.prototype.OnPrevDubChange = function (e) {
        this.prevDuplicates = e.checked;
    };
    Api.prototype.OnactionBtnChange = function (e) {
        if (e.checked) {
            this.toastObj.buttons = [{ model: { content: '<div class="e-toast-btn"> Click Here </div>' }, click: this.onActionBtnClick }];
        }
        else {
            this.toastObj.buttons = [];
        }
    };
    Api.prototype.onActionBtnClick = function (e) {
        alert('Action button is clicked');
    };
    Api.prototype.showToast = function () {
        var title = this.toastInputTitleEle.value;
        var content = this.toastInputContentEle.value;
        if (title === '' && content === '') {
            content = 'You have created a Toast message';
        }
        var showDuration = parseInt(this.showDurationEle.value, 10);
        var hideDuration = parseInt(this.hideDurationEle.value, 10);
        var timeOut = parseInt(this.timeOutEle.value, 10);
        this.toastObj.show({
            title: title, content: content, timeOut: timeOut,
            animation: {
                show: { duration: showDuration },
                hide: { duration: hideDuration }
            }
        });
    };
    Api.prototype.onShowEase = function () {
        this.toastObj.animation.show.easing = this.dropDownListShowEase.value.toString();
    };
    Api.prototype.showChange = function () {
        this.toastObj.animation.show.effect = this.dropDownListShow.value;
    };
    Api.prototype.hideChange = function () {
        this.toastObj.animation.hide.effect = this.dropDownListHide.value;
    };
    Api.prototype.onHideEase = function () {
        this.toastObj.animation.hide.easing = this.dropDownListHideEase.value.toString();
    };
    Api.prototype.showBtnClick = function () {
        this.showToast();
    };
    Api.prototype.hideBtnClick = function () {
        this.toastObj.hide('All');
    };
    Api.prototype.onbeforeOpen = function (e) {
        this.toastBtnHide.element.style.display = 'inline-block';
        if (this.prevDuplicates) {
            e.cancel = this.preventDuplicate(e);
        }
    };
    Api.prototype.onclose = function (e) {
        if (e.toastContainer.childElementCount === 0) {
            this.toastBtnHide.element.style.display = 'none';
        }
    };
    Api.prototype.preventDuplicate = function (e) {
        var toastEle = e.element;
        var toasts = e.toastObj.element.children;
        for (var i = 0; i < toasts.length; i++) {
            var toastTitle = toasts[i].querySelector('.e-toast-title');
            var toastMessage = toasts[i].querySelector('.e-toast-message');
            if (toastTitle && toastTitle.isEqualNode(toastEle.querySelector('.e-toast-title'))) {
                return true;
            }
            if (!toastTitle && toastMessage && toastMessage.isEqualNode(toastEle.querySelector('.e-toast-message'))) {
                return true;
            }
        }
        return false;
    };
    Api.prototype.rendereComplete = function () {
        document.addEventListener('click', function (e) {
            if (!ej2_base_1.isNullOrUndefined(this.toastObj) && e.target !== this.toastBtnShow.element) {
                this.toastObj.hide('All');
            }
        }.bind(this));
    };
    Api.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "col-lg-12 control-section toast-api-section" },
                React.createElement("div", { className: "e-sample-resize-container" },
                    React.createElement(ej2_react_notifications_1.ToastComponent, { ref: function (toast) { _this.toastObj = toast; }, id: 'toastApi', position: this.position, close: this.onclose.bind(this), beforeOpen: this.onbeforeOpen.bind(this), newestOnTop: true }),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-lg-6 padding" },
                            React.createElement("div", { className: "input-form" },
                                React.createElement("div", { className: "e-float-input" },
                                    React.createElement("input", { id: "toast_input_title", ref: this.toastInputTitleRef, className: 'e-input', required: true }),
                                    React.createElement("span", { className: "e-float-line" }),
                                    React.createElement("label", { className: "e-float-text" }, "Enter the title"))),
                            React.createElement("div", { className: "input-form" },
                                React.createElement("div", { className: "e-float-input" },
                                    React.createElement("textarea", { className: 'e-input', ref: this.toastInputContentRef, id: 'toast_input_content', rows: 3, required: true }),
                                    React.createElement("label", { className: "e-float-text" }, "Enter the content"))),
                            React.createElement("div", { className: "group-form e-group" },
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'closeButton', label: 'Show Close Button', change: this.closeOnChange.bind(this) })),
                            React.createElement("div", { className: "group-form e-group" },
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'progressBar', label: 'Show Progress Bar', change: this.OnProgressChange.bind(this) })),
                            React.createElement("div", { className: "group-form e-group" },
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'newestOnTop', checked: true, label: 'Newest On Top', change: this.closeNewestOnChange.bind(this) })),
                            React.createElement("div", { className: "group-form e-group" },
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'prevDuplicates', label: 'Prevent Duplicates', change: this.OnPrevDubChange.bind(this) })),
                            React.createElement("div", { className: "group-form e-group" },
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'actionButtons', label: 'Action Buttons', change: this.OnactionBtnChange.bind(this) })),
                            React.createElement("div", { className: "input-form" },
                                React.createElement("div", { className: "e-float-input e-input-group" },
                                    React.createElement("input", { className: "e-input", id: "timeOut", ref: this.timeOutRef, name: "Digits", defaultValue: "5000", required: true }),
                                    React.createElement("span", { className: "e-float-line" }),
                                    React.createElement("label", { className: "e-float-text" }, "TimeOut")))),
                        React.createElement("div", { className: "col-lg-6 padding" },
                            React.createElement("div", { className: "input-form" },
                                React.createElement("h4", null, " Show Animation"),
                                React.createElement("div", { className: "e-float-input" },
                                    React.createElement("input", { className: "e-input", id: "showDuration", ref: this.showDurationRef, defaultValue: "400", required: true }),
                                    React.createElement("span", { className: "e-float-line" }),
                                    React.createElement("label", { className: "e-float-text" }, "Duration"))),
                            React.createElement("div", { className: "input-form" },
                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (dropdownlist) { _this.dropDownListShowEase = dropdownlist; }, id: "ShowEasing", dataSource: this.showData, fields: this.showFields, placeholder: "Select an Easing", change: this.onShowEase.bind(this), value: this.easeValue })),
                            React.createElement("div", { className: "input-form" },
                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (dropdownlist) { _this.dropDownListShow = dropdownlist; }, id: "ShowAnimation", dataSource: this.animationData, fields: this.animationFields, placeholder: "Select an Animation", change: this.showChange.bind(this), value: this.animationValue })),
                            React.createElement("div", { className: "input-form e-group" },
                                React.createElement("h4", null, " Hide Animation"),
                                React.createElement("div", { className: "e-float-input" },
                                    React.createElement("input", { className: "e-input", id: "hideDuration", ref: this.hideDurationRef, defaultValue: "400", required: true }),
                                    React.createElement("span", { className: "e-float-line" }),
                                    React.createElement("label", { className: "e-float-text" }, "Duration"))),
                            React.createElement("div", { className: "input-form" },
                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (dropdownlist) { _this.dropDownListHideEase = dropdownlist; }, id: "HideEasing", dataSource: this.showData, fields: this.showFields, placeholder: "Select an Easing", change: this.onHideEase.bind(this), value: this.easeValue })),
                            React.createElement("div", { className: "input-form" },
                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (dropdownlist) { _this.dropDownListHide = dropdownlist; }, id: "HideAnimation", dataSource: this.animationData1, fields: this.animationFields, placeholder: "Select an Animation", change: this.hideChange.bind(this), value: this.animationHideValue })))),
                    React.createElement("div", { className: "row center" },
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'toastBtnShow', ref: function (btn) { _this.toastBtnShow = btn; }, className: 'e-btn e-primary', onClick: this.showBtnClick.bind(this), style: { marginRight: '15px' } }, "Show Toasts"),
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'toastBtnHide', ref: function (btn) { _this.toastBtnHide = btn; }, className: 'e-btn e-primary', onClick: this.hideBtnClick.bind(this), style: { display: 'none' } }, " Hide All")))),
            React.createElement("br", null),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates all the API functionalities available in ",
                    React.createElement("code", null, "Toast."))),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this sample, with help of text inputs toast header ",
                    React.createElement("code", null, "title"),
                    " and ",
                    React.createElement("code", null, "content"),
                    " text can be provided."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Action Buttons"),
                        " \u2013 Provide support to add a button inside toast to interact with it."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Prevent Duplicates"),
                        " \u2013 Disable the user to create same toast message multiple times."),
                    React.createElement("li", null,
                        React.createElement("code", null, "TimeOut"),
                        " \u2013 Allows to set time in millisecond to close toast."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Progress Bar"),
                        " \u2013 Visualizes the time out of toast as an indicator."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Animation"),
                        " \u2013 Enables to define the toast show and hide animation."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Close button"),
                        " \u2013 Show close button to hide toast irrespective of time out.")),
                React.createElement("p", null,
                    "More information about Toast can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/toast/getting-started/" }, "documentation section"),
                    "."))));
    };
    return Api;
}(sample_base_1.SampleBase));
exports.Api = Api;
