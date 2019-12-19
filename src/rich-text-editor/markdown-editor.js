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
 * RichTextEditor markdown overview sample
 */
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var Marked = require("marked");
var React = require("react");
var sample_base_1 = require("../common/sample-base");
require("./markdown-editor.css");
var MarkDown = (function (_super) {
    __extends(MarkDown, _super);
    function MarkDown() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // set the value to RichTextEditor
        _this.template = "The sample is added to showcase **markdown editing**.\n\nType or edit the content and apply formatting to view markdown formatted content.\n    \nWe can add our own custom formation syntax for the Markdown formation, [sample link](https://ej2.syncfusion.com/home/).\n    \nThe third-party library <b>Marked</b> is used in this sample to convert markdown into HTML content";
        // RichTextEditor items list
        _this.items = ['Bold', 'Italic', 'StrikeThrough', '|',
            'Formats', 'OrderedList', 'UnorderedList', 'SuperScript', 'SubScript', '|',
            'CreateLink', 'Image', 'CreateTable', '|',
            {
                tooltipText: 'Preview',
                template: '<button id="preview-code" class="e-tbar-btn e-control e-btn e-icon-btn">' +
                    '<span class="e-btn-icon e-md-preview e-icons"></span></button>'
            }, '|', 'Undo', 'Redo'];
        //RichTextEditor ToolbarSettings
        _this.toolbarSettings = {
            items: _this.items
        };
        _this.formatter = new ej2_react_richtexteditor_1.MarkdownFormatter({ listTags: { 'OL': '1., 2., 3.' } });
        return _this;
    }
    MarkDown.prototype.markdownConversion = function () {
        if (this.mdsource.classList.contains('e-active')) {
            var id = this.rteObj.getID() + 'html-view';
            var htmlPreview = this.rteObj.element.querySelector('#' + id);
            htmlPreview.innerHTML = Marked(this.rteObj.contentModule.getEditPanel().value);
        }
    };
    MarkDown.prototype.fullPreview = function () {
        var id = this.rteObj.getID() + 'html-preview';
        var htmlPreview = this.rteObj.element.querySelector('#' + id);
        if (this.mdsource.classList.contains('e-active')) {
            this.mdsource.classList.remove('e-active');
            this.mdsource.parentElement.title = 'Preview';
            this.textArea.style.display = 'block';
            htmlPreview.style.display = 'none';
        }
        else {
            this.mdsource.classList.add('e-active');
            if (!htmlPreview) {
                htmlPreview = ej2_base_1.createElement('div', { className: 'e-content e-pre-source' });
                htmlPreview.id = id;
                this.textArea.parentNode.appendChild(htmlPreview);
            }
            this.textArea.style.display = 'none';
            htmlPreview.style.display = 'block';
            htmlPreview.innerHTML = Marked(this.rteObj.contentModule.getEditPanel().value);
            this.mdsource.parentElement.title = 'Code View';
        }
    };
    MarkDown.prototype.rendereComplete = function () {
        var _this = this;
        this.textArea = this.rteObj.contentModule.getEditPanel();
        this.textArea.addEventListener('keyup', function (e) {
            _this.markdownConversion();
        });
        this.mdsource = document.getElementById('preview-code');
        this.mdsource.addEventListener('click', function (e) {
            _this.fullPreview();
            if (e.currentTarget.classList.contains('e-active')) {
                _this.rteObj.disableToolbarItem(['Bold', 'Italic', 'StrikeThrough', 'OrderedList',
                    'UnorderedList', 'SuperScript', 'SubScript', 'CreateLink', 'Image', 'CreateTable', 'Formats', 'Undo', 'Redo']);
            }
            else {
                _this.rteObj.enableToolbarItem(['Bold', 'Italic', 'StrikeThrough', 'OrderedList',
                    'UnorderedList', 'SuperScript', 'SubScript', 'CreateLink', 'Image', 'CreateTable', 'Formats', 'Undo', 'Redo']);
            }
        });
    };
    MarkDown.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { id: "markdownSample", className: 'control-pane' },
            React.createElement("div", { className: 'control-section', id: "rteMarkdown" },
                React.createElement("div", { className: "content-wrapper" },
                    React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "markdownRTE", ref: function (richtexteditor) { _this.rteObj = richtexteditor; }, editorMode: 'Markdown', height: '250px', valueTemplate: this.template, formatter: this.formatter, toolbarSettings: this.toolbarSettings },
                        React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.MarkdownEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.QuickToolbar, ej2_react_richtexteditor_1.Table] })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates markdown editing in the rich text editor with complete features.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The rich text editor supports markdown editing when the ",
                    React.createElement("code", null, "editorMode"),
                    " is set to mode property of the RichTextEditor"),
                React.createElement("p", null, "The editor\u2019s toolbar contains commands to format the markdown content. The toolbar consists of:"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Lists"),
                        " - Ordered and unordered list types."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Links"),
                        " - A hyperlink can be inserted into the editor for quick access to related information."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Image"),
                        " - Inserts and manages images."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Alignment"),
                        " - Aligns the content with left, center, and right margins."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Format"),
                        " \u2013 Formats the sentence in different ways such as heading level, quotation, and code snippet"),
                    React.createElement("li", null,
                        React.createElement("code", null, "Styles"),
                        " \u2013 Allows you to apply inline styles to the selected content like bold, italic, and more."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Tables"),
                        " \u2013 Allows you to insert a table with header.")),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "RichTextEditor component features are segregated into individual feature-wise modules. To use richtexteditor feature, we need to inject ",
                    React.createElement("code", null, "Toolbar, Link, Image, MarkdownEditor, QuickToolbar, Table"),
                    " modules into the services."),
                React.createElement("p", null,
                    "The third-party library ",
                    React.createElement("code", null, "Marked"),
                    " is used in this sample to convert markdown into HTML content."))));
    };
    return MarkDown;
}(sample_base_1.SampleBase));
exports.MarkDown = MarkDown;
