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
require("./format-style.css");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var startValue = new Date(new Date().setDate(1));
var endValue = new Date(new Date().setDate(20));
var Format = (function (_super) {
    __extends(Format, _super);
    function Format() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataTypes = [
            { value: 'dd\'\/\'MMM\'\/\'yy hh:mm a', text: 'dd/MMM/yy hh:mm a' },
            { value: 'yyyy\'\/\'MM\'\/\'dd HH:mm', text: 'yyyy/MM/dd HH:mm' },
            { value: 'dd\'\/\'MMMM\'\/\'yyyy', text: 'dd/MMMM/yyyy' },
        ];
        _this.fields = { value: 'value', text: 'text' };
        _this.waterMark = 'Format';
        _this.floatLabelType = 'Auto';
        _this.index = 0;
        return _this;
    }
    /*Apply selected format to the component*/
    Format.prototype.onChange = function () {
        var format = this.listObj.value;
        this.daterangepickerInstance.format = format;
        this.daterangepickerInstance.separator = (this.listObj.text === 'yyyy/MM/dd HH:mm') ? 'to' : '-';
    };
    Format.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-lg-8' },
                    React.createElement("div", { className: 'daterangepicker-control-section format' },
                        React.createElement(ej2_react_calendars_1.DateRangePickerComponent, { format: 'dd/MMM/yy hh:mm a', ref: function (calendar) { return _this.daterangepickerInstance = calendar; }, startDate: startValue, endDate: endValue }))),
                React.createElement("div", { id: "format", className: 'col-lg-3 property-section' },
                    React.createElement("div", null,
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "dateFormats", dataSource: this.dataTypes, fields: this.fields, floatLabelType: this.floatLabelType, index: this.index, ref: function (dropdownlist) { _this.listObj = dropdownlist; }, placeholder: this.waterMark, change: this.onChange.bind(this) })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "In this sample, the DateRangePicker has been configured with the ",
                    React.createElement("code", null, " dd/MMM/yy hh:mm a"),
                    " date time format. To change this current date time format, go to the properties panel at the right side and select a date format from the dropdown options. For mobile mode touch the icon at the right side and select a date time format from the dropdown options.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "Format sample illustrates the support of custom date format in the DateRangePicker component by using the ",
                    React.createElement("code", null, "format"),
                    " property. You can also change the date format by selecting it from the format options in the properties panel."),
                React.createElement("p", null,
                    " More information on the date format configuration can be found in the ",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/daterangepicker/globalization/#date-format", target: "_blank" }, " documentation section"),
                    "."))));
    };
    return Format;
}(sample_base_1.SampleBase));
exports.Format = Format;
