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
 * RichTextEditor markdown preview sample
 */
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var Marked = require("marked");
var React = require("react");
var sample_base_1 = require("../common/sample-base");
require("./markdown-editor-preview.css");
var Preview = /** @class */ (function (_super) {
    __extends(Preview, _super);
    function Preview() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // set the value to RichTextEditor
        _this.value = "In RichTextEditor , you click the toolbar buttons to format the words and the changes are visible immediately. \nMarkdown is not like that. When you format the word in Markdown format, you need to add Markdown syntax to the word to indicate which words \nand phrases should look different from each other\n    \nRichTextEditor supports markdown editing when the editorMode set as **markdown** and using both *keyboard interaction* and *toolbar action*, you can apply the formatting to text.\n    \nWe can add our own custom formation syntax for the Markdown formation, [sample link](https://ej2.syncfusion.com/home/).\n    \nThe third-party library <b>Marked</b> is used in this sample to convert markdown into HTML content";
        // RichTextEditor items list
        _this.items = ['Bold', 'Italic', 'StrikeThrough', '|', 'Formats', 'OrderedList', 'UnorderedList', '|', 'CreateLink', 'Image', 'CreateTable', '|',
            {
                tooltipText: 'Preview', template: '<button id="preview-code" class="e-tbar-btn e-control e-btn e-icon-btn">' +
                    '<span class="e-btn-icon e-md-preview e-icons"></span></button>'
            },
            {
                tooltipText: 'Split Editor', template: '<button id="MD_Preview" class="e-tbar-btn e-control e-btn e-icon-btn">' +
                    '<span class="e-btn-icon e-view-side e-icons"></span></button>'
            }, 'FullScreen', '|', 'Undo', 'Redo'];
        //RichTextEditor ToolbarSettings
        _this.toolbarSettings = {
            items: _this.items
        };
        return _this;
    }
    Preview.prototype.markdownConversion = function () {
        if (this.mdSplit.classList.contains('e-active')) {
            var id = this.rteObj.getID() + 'html-view';
            var htmlPreview = this.rteObj.element.querySelector('#' + id);
            this.htmlPreview.innerHTML = Marked(this.rteObj.contentModule.getEditPanel().value);
        }
    };
    Preview.prototype.fullPreview = function (e) {
        var id = this.rteObj.getID() + 'html-preview';
        this.htmlPreview = this.rteObj.element.querySelector('#' + id);
        if ((this.mdsource.classList.contains('e-active') || this.mdSplit.classList.contains('e-active')) && e.mode) {
            this.mdsource.classList.remove('e-active');
            this.mdSplit.classList.remove('e-active');
            this.mdsource.parentElement.title = 'Preview';
            this.textArea.style.display = 'block';
            this.textArea.style.width = '100%';
            this.htmlPreview.style.display = 'none';
        }
        else {
            this.mdsource.classList.add('e-active');
            this.mdSplit.classList.add('e-active');
            if (!this.htmlPreview) {
                this.htmlPreview = ej2_base_1.createElement('div', { className: 'e-content' });
                this.htmlPreview.id = id;
                this.textArea.parentNode.appendChild(this.htmlPreview);
            }
            if (e.type === 'preview') {
                this.textArea.style.display = 'none';
                this.htmlPreview.classList.add('e-pre-source');
            }
            else {
                this.htmlPreview.classList.remove('e-pre-source');
                this.textArea.style.width = '50%';
            }
            this.htmlPreview.style.display = 'block';
            this.htmlPreview.innerHTML = Marked(this.rteObj.contentModule.getEditPanel().value);
            this.mdsource.parentElement.title = 'Code View';
        }
    };
    Preview.prototype.rendereComplete = function () {
        var _this = this;
        this.textArea = this.rteObj.contentModule.getEditPanel();
        this.textArea.addEventListener('keyup', function (e) { _this.markdownConversion(); });
        var rteObj = this.rteObj;
        this.mdsource = document.getElementById('preview-code');
        this.mdsource.addEventListener('click', function (e) {
            _this.fullPreview({ mode: true, type: 'preview' });
            if (e.currentTarget.classList.contains('e-active')) {
                rteObj.disableToolbarItem(['Bold', 'Italic', 'StrikeThrough', '|',
                    'Formats', 'OrderedList', 'UnorderedList', '|',
                    'CreateLink', 'Image', 'CreateTable', 'Undo', 'Redo']);
                e.currentTarget.parentElement.nextElementSibling.classList.add('e-overlay');
            }
            else {
                rteObj.enableToolbarItem(['Bold', 'Italic', 'StrikeThrough', '|',
                    'Formats', 'OrderedList', 'UnorderedList', '|',
                    'CreateLink', 'Image', 'CreateTable', 'Undo', 'Redo']);
                e.currentTarget.parentElement.nextElementSibling.classList.remove('e-overlay');
            }
        });
        this.mdSplit = document.getElementById('MD_Preview');
        this.mdSplit.addEventListener('click', function (e) {
            if (rteObj.element.classList.contains('e-rte-full-screen')) {
                _this.fullPreview({ mode: true, type: '' });
            }
            _this.mdsource.classList.remove('e-active');
            if (!rteObj.element.classList.contains('e-rte-full-screen')) {
                rteObj.showFullScreen();
            }
        });
    };
    Preview.prototype.actionComplete = function (e) {
        if (e.targetItem === 'Maximize' && ej2_base_1.isNullOrUndefined(e.args)) {
            this.fullPreview({ mode: true, type: '' });
        }
        else if (!this.mdSplit.parentElement.classList.contains('e-overlay')) {
            if (e.targetItem === 'Minimize') {
                this.textArea.style.display = 'block';
                this.textArea.style.width = '100%';
                if (this.htmlPreview) {
                    this.htmlPreview.style.display = 'none';
                }
                this.mdSplit.classList.remove('e-active');
                this.mdsource.classList.remove('e-active');
            }
            this.markdownConversion();
        }
        this.rteObj.toolbarModule.refreshToolbarOverflow();
    };
    Preview.prototype.handleFullScreen = function (e) {
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
    Preview.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section', id: "rtePreview" },
                React.createElement("div", { className: "content-wrapper" },
                    React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "markdownPreview", actionBegin: this.handleFullScreen.bind(this), actionComplete: this.actionComplete.bind(this), editorMode: 'Markdown', height: '300px', ref: function (richtexteditor) { _this.rteObj = richtexteditor; }, value: this.value, toolbarSettings: this.toolbarSettings },
                        React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.MarkdownEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.QuickToolbar, ej2_react_richtexteditor_1.Table] })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates how to preview markdown changes in rich text editor. Type or edit the display text, and apply format to view the preview of markdown. You can preview the markdown changes immediately in the preview area.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The rich text editor allows you to preview markdown changes immediately using ",
                    React.createElement("code", null, "preview"),
                    ". The third-party library ",
                    React.createElement("code", null, "Marked"),
                    " is used in this sample to convert markdown into HTML content."))));
    };
    return Preview;
}(sample_base_1.SampleBase));
exports.Preview = Preview;
