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
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
require("./inline.css");
var Inline = (function (_super) {
    __extends(Inline, _super);
    function Inline() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inlineMode = {
            enable: true,
            onSelection: true
        };
        _this.format = {
            width: 'auto'
        };
        _this.fontFamily = {
            width: 'auto'
        };
        // RichTextEditor items list
        _this.items = ['Bold', 'Italic', 'Underline',
            'Formats', '-', 'Alignments', 'OrderedList', 'UnorderedList',
            'CreateLink'];
        //RichTextEditor ToolbarSettings
        _this.toolbarSettings = {
            items: _this.items
        };
        return _this;
    }
    Inline.prototype.change = function (args) {
        this.rteObj.inlineMode.onSelection = args.checked;
    };
    Inline.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section', id: 'rteInline' },
                React.createElement("div", { className: 'col-lg-8' },
                    React.createElement("div", { className: "content-wrapper" },
                        React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "inlineRTE", ref: function (richtexteditor) { _this.rteObj = richtexteditor; }, inlineMode: this.inlineMode, toolbarSettings: this.toolbarSettings, format: this.format, fontFamily: this.fontFamily },
                            React.createElement("p", null,
                                "The sample is configured with inline mode of editor. Initially, the editor is rendered without a ",
                                React.createElement("a", { href: "https://ej2.syncfusion.com/home/", target: '_blank' }, "toolbar"),
                                ". The toolbar becomes visible only when the content is selected."),
                            React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.QuickToolbar, ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Toolbar] })))),
                React.createElement("div", { className: 'col-lg-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: "property", title: "Properties" },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, label: 'Show on Selection', ref: function (scope) { _this.checkboxObj = scope; }, change: this.change.bind(this) }))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the toolbar show on inline mode. Toolbar show while selection on the below editable content and it hide on focus out from edit area.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The rich text editor provides an option to display toolbar on demand using mode property. Set mode as inline to enable inline editor. The toolbar becomes visible only when the content is selected"),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "RichTextEditor component features are segregated into individual feature-wise modules. To use richtexteditor feature, we need to inject ",
                    React.createElement("code", null, "Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar"),
                    " modules into the services."))));
    };
    return Inline;
}(sample_base_1.SampleBase));
exports.Inline = Inline;
