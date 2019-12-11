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
 * RichTextEditor Iframe sample
 */
var React = require("react");
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./iframe.css");
var IFrame = /** @class */ (function (_super) {
    __extends(IFrame, _super);
    function IFrame() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.iframeSetting = {
            enable: true
        };
        // RichTextEditor items list
        _this.items = ['Bold', 'Italic', 'Underline', 'StrikeThrough',
            'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
            'LowerCase', 'UpperCase', 'SuperScript', 'SubScript', '|',
            'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
            'Outdent', 'Indent', '|',
            'CreateTable', 'CreateLink', 'Image', '|', 'ClearFormat', 'Print',
            'SourceCode', 'FullScreen', '|', 'Undo', 'Redo'
        ];
        //RichTextEditor ToolbarSettings
        _this.toolbarSettings = {
            items: _this.items
        };
        return _this;
    }
    IFrame.prototype.handleFullScreen = function (e) {
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
    IFrame.prototype.actionCompleteHandler = function () {
        var _this = this;
        setTimeout(function () { _this.rteObj.toolbarModule.refreshToolbarOverflow(); }, 400);
    };
    IFrame.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section', id: 'rteIFrame' },
                React.createElement("div", { className: "content-wrapper" },
                    React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "iframeRTE", ref: function (richtexteditor) { _this.rteObj = richtexteditor; }, height: '500px', actionBegin: this.handleFullScreen.bind(this), actionComplete: this.actionCompleteHandler.bind(this), toolbarSettings: this.toolbarSettings, iframeSettings: this.iframeSetting },
                        React.createElement("p", null, "The rich text editor component is WYSIWYG (\"what you see is what you get\") editor that provides the best user experience to create and update the content. Users can format their content using standard toolbar commands."),
                        React.createElement("p", null,
                            React.createElement("b", null, "Key features:")),
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement("p", null, "Provides <IFRAME> and <DIV> modes")),
                            React.createElement("li", null,
                                React.createElement("p", null, "Capable of handling markdown editing.")),
                            React.createElement("li", null,
                                React.createElement("p", null, "Contains a modular library to load the necessary functionality on demand.")),
                            React.createElement("li", null,
                                React.createElement("p", null, "Provides a fully customizable toolbar.")),
                            React.createElement("li", null,
                                React.createElement("p", null, "Provides HTML view to edit the source directly for developers.")),
                            React.createElement("li", null,
                                React.createElement("p", null, "Supports third-party library integration.")),
                            React.createElement("li", null,
                                React.createElement("p", null, "Allows preview of modified content before saving it.")),
                            React.createElement("li", null,
                                React.createElement("p", null, "Handles images, hyperlinks, video, hyperlinks, uploads, etc.")),
                            React.createElement("li", null,
                                React.createElement("p", null, "Contains undo/redo manager.")),
                            React.createElement("li", null,
                                React.createElement("p", null, "Creates bulleted and numbered lists."))),
                        React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Table, ej2_react_richtexteditor_1.QuickToolbar] })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates the default rendering of the rich text editor in ",
                    React.createElement("code", null, "iframe mode"),
                    ".")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The rich text editor is WYSIWYG (\"what you see is what you get\") editor that is used to create and edit content, and return valid HTML markup. The editor provides a standard toolbar to format content using its commands. The toolbar contains commands to align the text, insert link, insert image, insert list, undo/redo the operation, HTML view, and more."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "RichTextEditor component features are segregated into individual feature-wise modules. To use richtexteditor feature, we need to inject ",
                    React.createElement("code", null, "Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar"),
                    " modules into the services."))));
    };
    return IFrame;
}(sample_base_1.SampleBase));
exports.IFrame = IFrame;
