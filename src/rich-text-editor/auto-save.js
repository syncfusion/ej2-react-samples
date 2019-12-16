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
/**
 * RichTextEditor Auto Save sample
 */
var React = require("react");
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var sample_base_1 = require("../common/sample-base");
require("./auto-save.css");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
var AutoSave = /** @class */ (function (_super) {
    __extends(AutoSave, _super);
    function AutoSave(props) {
        var _this = _super.call(this, props) || this;
        // RichTextEditor items list
        _this.items = ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments',
            'OrderedList', 'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode', 'Undo', 'Redo'];
        //RichTextEditor ToolbarSettings
        _this.toolbarSettings = {
            items: _this.items
        };
        _this.savingRef = function (element) {
            _this.savingEle = element;
        };
        _this.savedRef = function (element) {
            _this.savedEle = element;
        };
        return _this;
    }
    AutoSave.prototype.updateStatus = function () {
        var _this = this;
        this.savingEle.style.display = 'block';
        this.savedEle.style.display = 'none';
        setTimeout(function () {
            _this.savingEle.style.display = 'none';
            _this.savedEle.style.display = 'block';
        }, 500);
    };
    AutoSave.prototype.onChange = function (e) {
        var _this = this;
        if (e.checked) {
            this.rteObj.saveInterval = 5000;
        }
        else {
            this.rteObj.saveInterval = 0;
            setTimeout(function () {
                _this.savingEle.style.display = 'none';
                _this.savedEle.style.display = 'none';
            }, 500);
        }
    };
    AutoSave.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'col-lg-8' },
                React.createElement("div", { className: 'control-section', id: "rteAPI" },
                    React.createElement("div", { className: 'rte-control-section' },
                        React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "autoSaveRTE", ref: function (richtexteditor) { _this.rteObj = richtexteditor; }, enablePersistence: true, placeholder: 'Start to type a content to save', saveInterval: 5000, toolbarSettings: this.toolbarSettings, change: this.updateStatus.bind(this) },
                            React.createElement("div", null,
                                React.createElement("p", null, "Type or edit the content to be saved automatically in the editor")),
                            React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.QuickToolbar] })),
                        React.createElement("div", { id: 'statusEle', className: 'current-status' },
                            React.createElement("div", { id: 'saving', ref: this.savingRef, style: { display: 'none' } },
                                React.createElement("div", { className: "e-icons e-icon-refresh" }, " "),
                                React.createElement("p", { className: 'status-text' }, " Saving changes")),
                            React.createElement("div", { id: 'saved', ref: this.savedRef, style: { display: 'none' } },
                                React.createElement("span", { className: "e-icons e-icon-tick" }, " "),
                                React.createElement("p", { className: 'status-text' }, "Changes saved")))))),
            React.createElement("div", { className: 'col-lg-4 property-section', id: "rteAPIProperty" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("label", { htmlFor: "checked", style: { padding: "10px 72px 10px 0" } }, " Auto Save "),
                    React.createElement(ej2_react_buttons_1.SwitchComponent, { id: "checked", ref: function (scope) { _this.switchObj = scope; }, change: this.onChange.bind(this), checked: true }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "Demonstrates how to save the Rich Text Editor\u2019s content automatically with periodic interval. When you type or edit the content, it will be saved automatically by every 5 seconds. ")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The Rich Text Editor provides options to save its content automatically using the \u2018saveInterval\u2019 property. By default, the save interval time has 10 seconds from built-in support, but it can be customizable as per the application needs. The interval is calculated based on editing the content and does not considered on idle state."),
                React.createElement("p", null, "We have configured save interval as 5 seconds in this example. You can save the content in server also using this \u2018auto save\u2019 option."),
                React.createElement("p", null, "When you disable this 'Auto Save' option in a sample, the value will be saved on focus-out from the editor."),
                React.createElement("p", null, "Rich Text Editor content will be automatically saved when you focus out the editor."))));
    };
    return AutoSave;
}(sample_base_1.SampleBase));
exports.AutoSave = AutoSave;
