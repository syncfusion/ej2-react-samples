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
require("./positions.css");
var Positions = /** @class */ (function (_super) {
    __extends(Positions, _super);
    function Positions(props) {
        var _this = _super.call(this, props) || this;
        _this.position = { X: 'Right', Y: 'Bottom' };
        _this.target = document.body;
        _this.initialWid = '';
        _this.customFlag = false;
        _this.dropData = [
            { Id: 'topleft', Text: 'Top Left' },
            { Id: 'topright', Text: 'Top Right' },
            { Id: 'topcenter', Text: 'Top Center' },
            { Id: 'topfullwidth', Text: 'Top Full Width' },
            { Id: 'bottomleft', Text: 'Bottom Left' },
            { Id: 'bottomright', Text: 'Bottom Right' },
            { Id: 'bottomcenter', Text: 'Bottom Center' },
            { Id: 'bottomfullwidth', Text: 'Bottom Full Width' },
        ];
        _this.dropFields = { text: 'Text', value: 'Id' };
        _this.value = 'bottomright';
        _this.dropdownRef = function (element) {
            _this.dropdownEle = element;
        };
        _this.customChooseRef = function (element) {
            _this.customChooseEle = element;
        };
        _this.xPosRef = function (element) {
            _this.xPosEle = element;
        };
        _this.yPosRef = function (element) {
            _this.yPosEle = element;
        };
        return _this;
    }
    Positions.prototype.checkboxChange = function (e) {
        if (this.radio1.checked) {
            this.toastObj.hide('All');
            this.toastObj.target = '#toast_pos_target';
            this.toastShow(1000);
        }
    };
    Positions.prototype.toastShow = function (timeOutDelay) {
        setTimeout(function () {
            this.toastObj.show();
        }.bind(this), timeOutDelay);
    };
    Positions.prototype.checkboxChange1 = function (e) {
        if (this.radio2.checked) {
            this.toastObj.hide('All');
            this.toastObj.target = document.body;
            this.toastShow(1000);
        }
    };
    Positions.prototype.checkboxChange2 = function (e) {
        if (this.dropRadioObj.checked) {
            this.toastObj.hide('All');
            this.dropdownEle.style.display = 'table-cell';
            this.customChooseEle.style.display = 'none';
            this.setToastPosValue(this.dropDownObj.value.toString());
            this.customFlag = false;
            this.toastShow(1000);
        }
    };
    Positions.prototype.checkboxChange3 = function (e) {
        if (this.customRadioObj.checked) {
            this.toastObj.hide('All');
            this.dropdownEle.style.display = 'none';
            this.customChooseEle.style.display = 'table-cell';
            this.setcustomPosValue();
            this.customFlag = true;
            this.toastShow(1000);
        }
    };
    Positions.prototype.valueChange = function (e) {
        this.toastObj.hide('All');
        this.setToastPosValue(e.value.toString());
        this.toastShow(1000);
    };
    Positions.prototype.setcustomPosValue = function () {
        this.toastObj.width = this.initialWid;
        this.toastObj.position.X = parseInt(this.xPosEle.value, 10);
        this.toastObj.position.Y = parseInt(this.yPosEle.value, 10);
    };
    Positions.prototype.showBtnClick = function () {
        if (this.customFlag) {
            this.setcustomPosValue();
        }
        this.toastObj.show();
    };
    Positions.prototype.setToastPosValue = function (value) {
        this.toastObj.width = this.initialWid;
        switch (value) {
            case 'topleft':
                this.toastObj.position.X = 'Left';
                this.toastObj.position.Y = 'Top';
                break;
            case 'topright':
                this.toastObj.position.X = 'Right';
                this.toastObj.position.Y = 'Top';
                break;
            case 'topcenter':
                this.toastObj.position.X = 'Center';
                this.toastObj.position.Y = 'Top';
                break;
            case 'topfullwidth':
                this.toastObj.width = '100%';
                this.toastObj.position.X = 'Center';
                this.toastObj.position.Y = 'Top';
                break;
            case 'bottomleft':
                this.toastObj.position.X = 'Left';
                this.toastObj.position.Y = 'Bottom';
                break;
            case 'bottomright':
                this.toastObj.position.X = 'Right';
                this.toastObj.position.Y = 'Bottom';
                break;
            case 'bottomcenter':
                this.toastObj.position.X = 'Center';
                this.toastObj.position.Y = 'Bottom';
                break;
            case 'bottomfullwidth':
                this.toastObj.width = '100%';
                this.toastObj.position.X = 'Center';
                this.toastObj.position.Y = 'Bottom';
                break;
        }
    };
    Positions.prototype.hideBtnClick = function () {
        this.toastObj.hide('All');
    };
    Positions.prototype.created = function () {
        setTimeout(function () {
            this.toastShow(200);
            this.initialWid = this.toastObj.width.toString();
        }.bind(this), 200);
    };
    Positions.prototype.onclose = function (e) {
        if (e.toastContainer.childElementCount === 0) {
            this.toastBtnHide.element.style.display = 'none';
        }
    };
    Positions.prototype.onbeforeOpen = function () {
        this.toastBtnHide.element.style.display = 'inline-block';
    };
    Positions.prototype.render = function () {
        var _this = this;
        document.addEventListener('click', function (e) {
            if (!ej2_base_1.isNullOrUndefined(this.toastObj) && e.target !== this.toastBtnShow.element && this.toastObj.target === document.body) {
                this.toastObj.hide('All');
            }
        }.bind(this));
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'col-lg-12 control-section toast-pos-section' },
                React.createElement("div", { className: "e-sample-resize-container", id: "toast_pos_target" },
                    React.createElement(ej2_react_notifications_1.ToastComponent, { ref: function (toast) { _this.toastObj = toast; }, id: 'toast_pos', title: 'Matt sent you a friend request', content: 'You have a friend request yet to accept.', icon: 'e-laura', position: this.position, target: this.target, created: this.created.bind(this), close: this.onclose.bind(this), beforeOpen: this.onbeforeOpen.bind(this) }),
                    React.createElement("div", { id: "toast_pos_property" },
                        React.createElement("table", { style: { 'width': '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { 'padding': '25px 0 0 0' } },
                                            React.createElement(ej2_react_buttons_1.RadioButtonComponent, { ref: function (scope) { _this.dropRadioObj = scope; }, id: 'dropdownRadio', checked: true, label: 'Position', name: 'toastPos', value: "Position", change: this.checkboxChange2.bind(this) }))),
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { 'padding': '25px 0 0 0' } },
                                            React.createElement(ej2_react_buttons_1.RadioButtonComponent, { ref: function (scope) { _this.customRadioObj = scope; }, id: 'customRedio', label: 'Custom', name: 'toastPos', value: "Custom", change: this.checkboxChange3.bind(this) })))))),
                        React.createElement("div", { id: "dropdownChoose" },
                            React.createElement("div", { id: "dropdown", ref: this.dropdownRef, style: { paddingTop: '25px' } },
                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (dropdownlist) { _this.dropDownObj = dropdownlist; }, id: "position", dataSource: this.dropData, fields: this.dropFields, placeholder: "Select a position", change: this.valueChange.bind(this), value: this.value, index: 5, popupHeight: '200px' }))),
                        React.createElement("table", { style: { 'width': '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", { id: "customChoose", ref: this.customChooseRef, style: { display: 'none' } },
                                        React.createElement("form", { id: "formId", className: "form-horizontal" },
                                            React.createElement("div", { className: "e-row" },
                                                React.createElement("div", { className: "e-float-input" },
                                                    React.createElement("input", { className: "e-input", id: "xPos", ref: this.xPosRef, name: "Digits", defaultValue: "50", required: true }),
                                                    React.createElement("span", { className: "e-float-line" }),
                                                    React.createElement("label", { className: "e-float-text" }, "X Position"))),
                                            React.createElement("div", { className: "e-row" },
                                                React.createElement("div", { className: "e-float-input" },
                                                    React.createElement("input", { className: "e-input", id: "yPos", ref: this.yPosRef, name: "Digits", defaultValue: "50", required: true }),
                                                    React.createElement("span", { className: "e-float-line" }),
                                                    React.createElement("label", { className: "e-float-text" }, "Y Position")))))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { 'padding': '25px 0 0 0' } },
                                            React.createElement(ej2_react_buttons_1.RadioButtonComponent, { ref: function (scope) { _this.radio1 = scope; }, id: 'radio1', label: 'Target', name: 'toast', value: 'Target', change: this.checkboxChange.bind(this) }))),
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { 'padding': '25px 0 0 0' } },
                                            React.createElement(ej2_react_buttons_1.RadioButtonComponent, { ref: function (scope) { _this.radio2 = scope; }, id: 'radio2', checked: true, label: 'Global', name: 'toast', value: 'Global', change: this.checkboxChange1.bind(this) })))))),
                        React.createElement("div", { id: "toast_btn", style: { paddingTop: '25px' } },
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { className: "e-btn e-control", id: 'show_Toast', ref: function (btn) { _this.toastBtnShow = btn; }, style: { marginRight: '15px' }, onClick: this.showBtnClick.bind(this) }, "Show Toasts"),
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { className: "e-btn e-control", id: 'hideTosat', ref: function (btn) { _this.toastBtnHide = btn; }, onClick: this.hideBtnClick.bind(this) }, "Hide All"))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates the different positioning of the ",
                    React.createElement("code", null, "Toast"),
                    " based on the target given.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "Based on the use case toast can take the body element or any specific element as target. In this sample, with help of custom inputs toast can be positioned based on the target."),
                React.createElement("ul", null,
                    React.createElement("li", null, "Toast can be positioned in the 8 pre-defined places."),
                    React.createElement("li", null, "Custom option will enable to give X and Y values to align the toast based on the given inputs.")),
                React.createElement("p", null,
                    "More information about Toast can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/toast/getting-started/" }, "documentation section"),
                    "."))));
    };
    return Positions;
}(sample_base_1.SampleBase));
exports.Positions = Positions;
