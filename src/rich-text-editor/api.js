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
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var React = require("react");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
require("./api.css");
var RTEApi = (function (_super) {
    __extends(RTEApi, _super);
    function RTEApi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Numericvalue = 1000;
        _this.min = 555;
        _this.max = 2000;
        _this.format = 'n0';
        _this.numericChange = function (e) {
            _this.rteObj.maxLength = e.value;
        };
        _this.readonlyChecked = false;
        _this.readonlyChange = function (args) {
            _this.rteObj.readonly = args.checked;
        };
        _this.enableChecked = true;
        _this.enableChange = function (args) {
            _this.rteObj.enabled = args.checked;
        };
        _this.htmlChecked = false;
        _this.htmlChange = function (args) {
            _this.rteObj.enableHtmlEncode = args.checked;
        };
        _this.getValue = function () {
            alert(_this.rteObj.value);
        };
        _this.getSelection = function () {
            alert(_this.rteObj.getSelection());
        };
        _this.selectAll = function () {
            _this.rteObj.selectAll();
        };
        return _this;
    }
    RTEApi.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'col-lg-8' },
                React.createElement("div", { className: 'control-section', id: "rteAPI" },
                    React.createElement("div", { className: 'rte-control-section' },
                        React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "API", ref: function (richtexteditor) { _this.rteObj = richtexteditor; }, showCharCount: true, maxLength: 1000 },
                            React.createElement("p", null, "RichTextEditor is a WYSIWYG editing control which will reduce the effort for users while trying to express their formatting word content as HTML or Markdown format."),
                            React.createElement("p", null,
                                React.createElement("b", null, "API\u2019s:")),
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    React.createElement("p", null, "maxLength - allows to restrict the maximum length to be entered.")),
                                React.createElement("li", null,
                                    React.createElement("p", null, "readOnly - allows to change it as non-editable state.")),
                                React.createElement("li", null,
                                    React.createElement("p", null, "enabled - enable or disable the RTE component.")),
                                React.createElement("li", null,
                                    React.createElement("p", null, "enableHtmlEncode - Get the encoded string value through value property and source code panel")),
                                React.createElement("li", null,
                                    React.createElement("p", null, "getValue - get the value of RTE.")),
                                React.createElement("li", null,
                                    React.createElement("p", null, "getSelection - get the selected text of RTE.")),
                                React.createElement("li", null,
                                    React.createElement("p", null, "selectAll - select all content in RTE."))),
                            React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Count, ej2_react_richtexteditor_1.QuickToolbar] }))))),
            React.createElement("div", { className: 'col-lg-4 property-section', id: "rteAPIProperty" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties", style: { width: '100%', margin: '10px' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { style: { padding: '8px', width: '50%' } },
                                    React.createElement("div", null, "Max Length ")),
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingLeft: '10px' } },
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: "maxlength", min: this.min, max: this.max, format: this.format, change: this.numericChange.bind(this), value: this.Numericvalue })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { padding: '8px', width: '50%' } },
                                    React.createElement("div", null, "Readonly")),
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingLeft: '10px' } },
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "readonly", checked: this.readonlyChecked, change: this.readonlyChange.bind(this) })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { padding: '8px', width: '50%' } },
                                    React.createElement("div", null, "Enable")),
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingLeft: '10px' } },
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "enable", checked: this.enableChecked, change: this.enableChange.bind(this) })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { padding: '8px', width: '50%' } },
                                    React.createElement("div", null, "Enable HTML Encode ")),
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingLeft: '10px' } },
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "enablehtml", checked: this.htmlChecked, change: this.htmlChange.bind(this) })))),
                            React.createElement("tr", null,
                                React.createElement("td", null),
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingTop: '10px' } },
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "getVal", ref: function (btn) { _this.getVal = btn; }, onClick: this.getValue.bind(this), className: "btn btn-default" }, "Get Value")))),
                            React.createElement("tr", null,
                                React.createElement("td", null),
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingTop: '10px' } },
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "selectHtml", ref: function (btn) { _this.selectHtml = btn; }, onClick: this.getSelection.bind(this), className: "btn btn-default" }, "Get Selection")))),
                            React.createElement("tr", null,
                                React.createElement("td", null),
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingTop: '10px' } },
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "selectall", ref: function (btn) { _this.selectall = btn; }, onClick: this.selectAll.bind(this), className: "btn btn-default" }, "Select All ")))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrate the usage of API in RichTextEditor, use the properties panel to change the maximum length, read only mode, disable status, to get value, enable HTML encode, select all content and get selected HTML from the RichTextEditor.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this demos, Ensuring the API'S behavious by doing"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        "Change the value of ",
                        React.createElement("code", null, "maxLength"),
                        " textbox to change maximum Length of character."),
                    React.createElement("li", null,
                        "Click the ",
                        React.createElement("code", null, "readOnly"),
                        " check box to enable/disable editable and non-editable mode of the RTE."),
                    React.createElement("li", null,
                        "Click the ",
                        React.createElement("code", null, "enabled"),
                        " check box to enable/disable the RTE component."),
                    React.createElement("li", null,
                        "Click the ",
                        React.createElement("code", null, "enableHtmlEncode"),
                        " check box to enableHtmlEncode/disableHtmlEncode the RTE component."),
                    React.createElement("li", null,
                        "Click the ",
                        React.createElement("code", null, "getValue"),
                        " button which shows the RTE values in the alert window."),
                    React.createElement("li", null,
                        "Click the ",
                        React.createElement("code", null, "getSelection"),
                        " button which shows the selectedText in the alert window."),
                    React.createElement("li", null,
                        "Click the ",
                        React.createElement("code", null, "selectAll"),
                        " button selecting all text content in the RTE.")),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "RichTextEditor component features are segregated into individual feature-wise modules. To use richtexteditor feature, we need to inject ",
                    React.createElement("code", null, "Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar"),
                    " modules into the services."))));
    };
    return RTEApi;
}(sample_base_1.SampleBase));
exports.RTEApi = RTEApi;
