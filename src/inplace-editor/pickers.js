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
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_inplace_editor_1 = require("@syncfusion/ej2-react-inplace-editor");
var React = require("react");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
require("./pickers.component.css");
// tslint:disable:max-line-length
var Pickers = (function (_super) {
    __extends(Pickers, _super);
    function Pickers() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dateValue = new Date('5/23/2017');
        _this.dateTimeValue = new Date('5/23/2017 12:00 PM');
        _this.dateRangeValue = [new Date('5/23/2017'), new Date('7/5/2017')];
        _this.datePickerModel = { placeholder: 'Select a date' };
        _this.timePickerModel = { placeholder: 'Select a time', value: new Date('5/23/2017,12:00 PM') };
        _this.dateTimePickerModel = { placeholder: 'Select a date and time' };
        _this.dateRangePickerModel = { placeholder: 'Select a date range' };
        // Mapping DropDownList dataSource property
        _this.editorData = [
            { 'value': 'inline', 'text': 'Inline' }, { 'value': 'popup', 'text': 'Popup' }
        ];
        // Mapping DropDownList fields property
        _this.dropDownFields = { text: 'text', value: 'value' };
        // Mapping DropDownList value property
        _this.dropDownVal = 'inline';
        _this.scrollRightPane = function () {
            var mode = document.getElementById('editorMode').value;
            if (mode === 'Inline') {
                return;
            }
            if (_this.dateObj && (_this.dateObj.element.querySelectorAll('.e-editable-open').length > 0)) {
                _this.dateObj.enableEditMode = false;
            }
            if (_this.timeObj && (_this.timeObj.element.querySelectorAll('.e-editable-open').length > 0)) {
                _this.timeObj.enableEditMode = false;
            }
            if (_this.dateTimeObj && (_this.dateTimeObj.element.querySelectorAll('.e-editable-open').length > 0)) {
                _this.dateTimeObj.enableEditMode = false;
            }
            if (_this.dateRangeObj && (_this.dateRangeObj.element.querySelectorAll('.e-editable-open').length > 0)) {
                _this.dateRangeObj.enableEditMode = false;
            }
        };
        return _this;
    }
    // Change event funtion for DropDownList component   
    Pickers.prototype.changeEditorMode = function (e) {
        var mode = this.editorMode.value;
        this.dateObj.mode = mode;
        this.timeObj.mode = mode;
        this.dateTimeObj.mode = mode;
        this.dateRangeObj.mode = mode;
        this.dateObj.dataBind();
        this.timeObj.dataBind();
        this.dateTimeObj.dataBind();
        this.dateRangeObj.dataBind();
    };
    Pickers.prototype.rendereComplete = function () {
        var _this = this;
        var rightPane = document.getElementById('right-pane');
        if (rightPane) {
            rightPane.addEventListener('scroll', function () {
                _this.scrollRightPane();
            });
        }
    };
    Pickers.prototype.componentWillUnmount = function () {
        var _this = this;
        var rightPane = document.getElementById('right-pane');
        if (rightPane) {
            rightPane.removeEventListener('scroll', function () {
                _this.scrollRightPane();
            });
        }
    };
    Pickers.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "col-lg-8 control-section inplace-control-section pickers-layout" },
                React.createElement("div", { className: "control_wrapper form-horizontal" },
                    React.createElement("table", null,
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("label", { className: "control-label", style: { textAlign: 'left', fontSize: '14px', fontWeight: 400 } }, "DatePicker ")),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_inplace_editor_1.InPlaceEditorComponent, { ref: function (date) { _this.dateObj = date; }, id: 'datePickerEle', mode: 'Inline', type: 'Date', value: this.dateValue, model: this.datePickerModel }))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("label", { className: "control-label", style: { textAlign: 'left', fontSize: '14px', fontWeight: 400 } }, "TimePicker ")),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_inplace_editor_1.InPlaceEditorComponent, { ref: function (time) { _this.timeObj = time; }, id: 'timePickerEle', mode: 'Inline', type: 'Time', value: this.dateValue, model: this.timePickerModel },
                                        React.createElement(ej2_react_inplace_editor_1.Inject, { services: [ej2_react_inplace_editor_1.TimePicker] })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("label", { className: "control-label", style: { textAlign: 'left', fontSize: '14px', fontWeight: 400 } }, "DateTimePicker ")),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_inplace_editor_1.InPlaceEditorComponent, { ref: function (dateTime) { _this.dateTimeObj = dateTime; }, id: 'dateTimePickerEle', mode: 'Inline', type: 'DateTime', value: this.dateTimeValue, model: this.dateTimePickerModel }))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("label", { className: "control-label", style: { textAlign: 'left', fontSize: '14px', fontWeight: 400 } }, "DateRangePicker ")),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_inplace_editor_1.InPlaceEditorComponent, { ref: function (dateRange) { _this.dateRangeObj = dateRange; }, id: 'dateRangePickerEle', mode: 'Inline', type: 'DateRange', value: this.dateRangeValue, model: this.dateRangePickerModel },
                                        React.createElement(ej2_react_inplace_editor_1.Inject, { services: [ej2_react_inplace_editor_1.DateRangePicker] })))))))),
            React.createElement("div", { className: 'col-lg-4 property-section', id: "pickerProperty" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties", className: "property-panel-table" },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Mode")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (drop) { _this.editorMode = drop; }, id: 'editorMode', className: 'form-control', dataSource: this.editorData, fields: this.dropDownFields, value: this.dropDownVal, width: '90%', change: this.changeEditorMode.bind(this) })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the usage of picker components such as Date, Time, DateTime, and DateRange. Click on the dotted input element to switch to the editable state of the corresponding integrated component.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This sample illustrates the way to integrate picker components with the ",
                    React.createElement("code", null, "In-place Editor"),
                    " control. The applicable types of components are:"),
                React.createElement("p", null,
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("code", null, "DatePicker")),
                        React.createElement("li", null,
                            React.createElement("code", null, "TimePicker")),
                        React.createElement("li", null,
                            React.createElement("code", null, "DateTimePicker")),
                        React.createElement("li", null,
                            React.createElement("code", null, "DateRangePicker")))),
                React.createElement("p", null, "The above components and their features are editable in place and can be customized with the model properties of the specific component."),
                React.createElement("p", null,
                    "More information on the ",
                    React.createElement("code", null, "In-place Editor"),
                    " instantiation can be found in the\u00A0",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/inplace-editor/getting-started/" }, "documentation section"),
                    "."))));
    };
    return Pickers;
}(sample_base_1.SampleBase));
exports.Pickers = Pickers;
