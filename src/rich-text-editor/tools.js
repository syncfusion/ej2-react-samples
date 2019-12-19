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
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var ej2_base_2 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var CodeMirror = require("codemirror");
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/css/css.js");
require("codemirror/mode/htmlmixed/htmlmixed.js");
require("./tools.css");
var Overview = (function (_super) {
    __extends(Overview, _super);
    function Overview() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // RichTextEditor items list
        _this.items = ['Bold', 'Italic', 'Underline', 'StrikeThrough',
            'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
            'LowerCase', 'UpperCase', '|',
            'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
            'Outdent', 'Indent', 'SuperScript', 'SubScript', '|',
            'CreateTable', 'CreateLink', 'Image', '|', 'ClearFormat', 'Print',
            'SourceCode', 'FullScreen', '|', 'Undo', 'Redo'
        ];
        //RichTextEditor ToolbarSettings
        _this.toolbarSettings = {
            items: _this.items
        };
        return _this;
    }
    Overview.prototype.mirrorConversion = function (e) {
        this.textArea = this.rteObj.contentModule.getEditPanel();
        var id = this.rteObj.getID() + 'mirror-view';
        var mirrorView = this.rteObj.element.querySelector('#' + id);
        var charCount = this.rteObj.element.querySelector('.e-rte-character-count');
        if (e.targetItem === 'Preview') {
            this.textArea.style.display = 'block';
            mirrorView.style.display = 'none';
            this.textArea.innerHTML = this.myCodeMirror.getValue();
            charCount.style.display = 'block';
        }
        else {
            if (!mirrorView) {
                mirrorView = ej2_base_2.createElement('div', { className: 'e-content' });
                mirrorView.id = id;
                this.textArea.parentNode.appendChild(mirrorView);
            }
            else {
                mirrorView.innerHTML = '';
            }
            this.textArea.style.display = 'none';
            mirrorView.style.display = 'block';
            this.renderCodeMirror(mirrorView, this.rteObj.value);
            charCount.style.display = 'none';
        }
    };
    Overview.prototype.renderCodeMirror = function (mirrorView, content) {
        this.myCodeMirror = CodeMirror(mirrorView, {
            value: content,
            lineNumbers: true,
            mode: 'text/html',
            lineWrapping: true,
        });
    };
    Overview.prototype.handleFullScreen = function (e) {
        var sbCntEle = document.querySelector('.sb-content.e-view');
        var sbHdrEle = document.querySelector('.sb-header.e-view');
        var leftBar;
        var transformElement;
        if (ej2_base_1.Browser.isDevice) {
            leftBar = document.querySelector('#right-sidebar');
            transformElement = document.querySelector('.sample-browser.e-view.e-content-animation');
        }
        else {
            leftBar = document.querySelector('#left-sidebar');
            transformElement = document.querySelector('#right-pane');
        }
        if (e.targetItem === 'Maximize') {
            if (ej2_base_1.Browser.isDevice && ej2_base_1.Browser.isIos) {
                ej2_base_1.addClass([sbCntEle, sbHdrEle], ['hide-header']);
            }
            ej2_base_1.addClass([leftBar], ['e-close']);
            ej2_base_1.removeClass([leftBar], ['e-open']);
            if (!ej2_base_1.Browser.isDevice) {
                transformElement.style.marginLeft = '0px';
            }
            transformElement.style.transform = 'inherit';
        }
        else if (e.targetItem === 'Minimize') {
            if (ej2_base_1.Browser.isDevice && ej2_base_1.Browser.isIos) {
                ej2_base_1.removeClass([sbCntEle, sbHdrEle], ['hide-header']);
            }
            ej2_base_1.removeClass([leftBar], ['e-close']);
            if (!ej2_base_1.Browser.isDevice) {
                ej2_base_1.addClass([leftBar], ['e-open']);
                transformElement.style.marginLeft = leftBar.offsetWidth + 'px';
            }
            transformElement.style.transform = 'translateX(0px)';
        }
    };
    Overview.prototype.actionCompleteHandler = function (e) {
        var _this = this;
        if (e.targetItem && (e.targetItem === 'SourceCode' || e.targetItem === 'Preview')) {
            this.rteObj.sourceCodeModule.getPanel().style.display = 'none';
            this.mirrorConversion(e);
        }
        else {
            setTimeout(function () { _this.rteObj.toolbarModule.refreshToolbarOverflow(); }, 400);
        }
    };
    Overview.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section', id: "rteTools" },
                React.createElement("div", { className: 'rte-control-section' },
                    React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "toolsRTE", ref: function (richtexteditor) { _this.rteObj = richtexteditor; }, showCharCount: true, actionBegin: this.handleFullScreen.bind(this), actionComplete: this.actionCompleteHandler.bind(this), maxLength: 2000, toolbarSettings: this.toolbarSettings },
                        React.createElement("div", null,
                            React.createElement("p", null,
                                "The rich text editor is WYSIWYG (\"what you see is what you get\") editor useful to create and edit content, and return the valid ",
                                React.createElement("a", { href: 'https://ej2.syncfusion.com/home/', target: '_blank' }, "HTML markup"),
                                " or ",
                                React.createElement("a", { href: 'https://ej2.syncfusion.com/home/', target: '_blank' }, "markdown"),
                                " of the content"),
                            " ",
                            React.createElement("p", null,
                                React.createElement("b", null, "Toolbar")),
                            React.createElement("ol", null,
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("p", null, "Toolbar contains commands to align the text, insert link, insert image, insert list, undo/redo operations, HTML view, etc")),
                                React.createElement("li", null,
                                    React.createElement("p", null, "Toolbar is fully customizable "))),
                            " ",
                            React.createElement("p", null,
                                React.createElement("b", null, "Links")),
                            React.createElement("ol", null,
                                React.createElement("li", null,
                                    React.createElement("p", null, "You can insert a hyperlink with its corresponding dialog ")),
                                React.createElement("li", null,
                                    React.createElement("p", null, "Attach a hyperlink to the displayed text. ")),
                                React.createElement("li", null,
                                    React.createElement("p", null, "Customize the quick toolbar based on the hyperlink "),
                                    " ")),
                            React.createElement("p", null,
                                React.createElement("b", null, "Image.")),
                            React.createElement("ol", null,
                                React.createElement("li", null,
                                    React.createElement("p", null, "Allows you to insert images from an online source as well as the local computer "),
                                    " "),
                                React.createElement("li", null,
                                    React.createElement("p", null, "You can upload an image")),
                                React.createElement("li", null,
                                    React.createElement("p", null, "Provides an option to customize quick toolbar for an image"))),
                            React.createElement("img", { alt: "Logo", src: "./src/rich-text-editor/images/RTEImage-Feather.png", style: { width: '300px' } })),
                        React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Count, ej2_react_richtexteditor_1.QuickToolbar, ej2_react_richtexteditor_1.Table] })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the full features of rich text editor that includes all the tools and functionalities.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This sample used ",
                    React.createElement("code", null, "Code mirror"),
                    " plugins helps to highlight the HTML content and when changes happens in code view, the same has been reflected in preview mode. "),
                React.createElement("p", null, "The editor\u2019s toolbar contains commands to format the content. The toolbar consists of:"),
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
                        React.createElement("code", null, "Table"),
                        " - Inserts and manages Tables."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Alignment"),
                        " - Aligns the content with left, center, and right margins."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Undo/Redo"),
                        " - Allows undo/redo operations."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Indent/ Outdent"),
                        " - Increases/decreases the indent level of the content."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Font"),
                        " - Able to do styling on text like font family, size, fore color and background color."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Lower / Upper case"),
                        " \u2013 Changes the casing of the selected text."),
                    React.createElement("li", null,
                        React.createElement("code", null, "SubScript / SuperScript"),
                        " - Makes the selected text as subscript (lower)/superscript(upper)."),
                    React.createElement("li", null,
                        React.createElement("code", null, "FullScreen"),
                        " - Stretches the editor to the maximum width and height of the browser window."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Format"),
                        " \u2013 Formats the sentence in different ways such as heading level, quotation, and code snippet"),
                    React.createElement("li", null,
                        React.createElement("code", null, "Styles"),
                        " \u2013 Allows you to apply inline styles to the selected content like bold, italic, and more."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Insert Code"),
                        " - Allows you to apply code format to the selected parent nodes. In the above sample, the style for the code format ('pre' tag) is applied by adding the background color.")),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "RichTextEditor component features are segregated into individual feature-wise modules. To use richtexteditor feature, we need to inject ",
                    React.createElement("code", null, "Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar, Table"),
                    " modules into the services."))));
    };
    return Overview;
}(sample_base_1.SampleBase));
exports.Overview = Overview;
