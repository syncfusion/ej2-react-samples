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
var ej2_react_documenteditor_1 = require("@syncfusion/ej2-react-documenteditor");
var title_bar_1 = require("./title-bar");
require("./default.component.css");
ej2_react_documenteditor_1.DocumentEditorContainerComponent.Inject(ej2_react_documenteditor_1.Toolbar);
// tslint:disable:max-line-length
var StylesView = (function (_super) {
    __extends(StylesView, _super);
    function StylesView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hostUrl = 'https://ej2services.syncfusion.com/production/web-services/';
        _this.onLoadDefault = function () {
            // tslint:disable
            var defaultDocument = { "sections": [{ "blocks": [{ "paragraphFormat": { "styleName": "Title" }, "inlines": [{ "text": "Styles" }] }, { "paragraphFormat": { "styleName": "Subtitle" }, "inlines": [{ "text": "A" }, { "text": " style is a collection of formatting instructions" }, { "text": " " }, { "text": "to provide a consistent look of the document" }, { "text": "." }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }, { "paragraphFormat": { "styleName": "Quote" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog" }, { "text": " [Quote]" }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "name": "_GoBack", "bookmarkType": 0 }, { "name": "_GoBack", "bookmarkType": 1 }] }, { "paragraphFormat": { "styleName": "Heading 1" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog " }, { "text": "[" }, { "text": "Heading 1" }, { "text": "]" }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }, { "paragraphFormat": { "styleName": "Heading 2" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog " }, { "text": "[" }, { "text": "Heading 2" }, { "text": "]" }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }, { "paragraphFormat": { "styleName": "Heading 3" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog" }, { "text": " " }, { "text": "[" }, { "text": "Heading 3" }, { "text": "]" }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }, { "paragraphFormat": { "styleName": "Heading 4" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog " }, { "text": "[Heading 4" }, { "text": "]" }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }, { "paragraphFormat": { "styleName": "Heading 5" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog " }, { "text": "[" }, { "text": "Heading 5" }, { "text": "]" }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }], "headersFooters": {}, "sectionFormat": { "headerDistance": 36.0, "footerDistance": 36.0, "pageWidth": 612.0, "pageHeight": 792.0, "leftMargin": 72.0, "rightMargin": 72.0, "topMargin": 72.0, "bottomMargin": 72.0, "differentFirstPage": false, "differentOddAndEvenPages": false } }], "characterFormat": { "fontSize": 11.0, "fontFamily": "Calibri" }, "paragraphFormat": { "afterSpacing": 8.0, "lineSpacing": 1.0791666507720947, "lineSpacingType": "Multiple" }, "background": { "color": "#FFFFFFFF" }, "styles": [{ "type": "Paragraph", "name": "Normal", "next": "Normal" }, { "type": "Paragraph", "name": "Heading 1", "basedOn": "Normal", "next": "Normal", "link": "Heading 1 Char", "characterFormat": { "fontSize": 16.0, "fontFamily": "Calibri Light", "fontColor": "#2F5496FF" }, "paragraphFormat": { "beforeSpacing": 12.0, "afterSpacing": 0.0, "outlineLevel": "Level1" } }, { "type": "Paragraph", "name": "Heading 2", "basedOn": "Normal", "next": "Normal", "link": "Heading 2 Char", "characterFormat": { "fontSize": 13.0, "fontFamily": "Calibri Light", "fontColor": "#2F5496FF" }, "paragraphFormat": { "beforeSpacing": 2.0, "afterSpacing": 0.0, "outlineLevel": "Level2" } }, { "type": "Paragraph", "name": "Heading 3", "basedOn": "Normal", "next": "Normal", "link": "Heading 3 Char", "characterFormat": { "fontSize": 12.0, "fontFamily": "Calibri Light", "fontColor": "#1F3763FF" }, "paragraphFormat": { "beforeSpacing": 2.0, "afterSpacing": 0.0, "outlineLevel": "Level3" } }, { "type": "Paragraph", "name": "Heading 4", "basedOn": "Normal", "next": "Normal", "link": "Heading 4 Char", "characterFormat": { "italic": true, "fontFamily": "Calibri Light", "fontColor": "#2F5496FF" }, "paragraphFormat": { "beforeSpacing": 2.0, "afterSpacing": 0.0, "outlineLevel": "Level4" } }, { "type": "Paragraph", "name": "Heading 5", "basedOn": "Normal", "next": "Normal", "link": "Heading 5 Char", "characterFormat": { "fontFamily": "Calibri Light", "fontColor": "#2F5496FF" }, "paragraphFormat": { "beforeSpacing": 2.0, "afterSpacing": 0.0, "outlineLevel": "Level5" } }, { "type": "Character", "name": "Default Paragraph Font" }, { "type": "Paragraph", "name": "Notes", "basedOn": "Normal", "next": "Normal", "characterFormat": { "bold": true }, "paragraphFormat": { "afterSpacing": 6.0, "lineSpacing": 1.0, "lineSpacingType": "Multiple" } }, { "type": "Paragraph", "name": "Quote", "basedOn": "Normal", "next": "Normal", "link": "Quote Char", "characterFormat": { "italic": true, "fontColor": "#404040FF" }, "paragraphFormat": { "leftIndent": 43.200000762939453, "rightIndent": 43.200000762939453, "beforeSpacing": 10.0, "textAlignment": "Center" } }, { "type": "Character", "name": "Quote Char", "basedOn": "Default Paragraph Font", "characterFormat": { "italic": true, "fontColor": "#404040FF" } }, { "type": "Paragraph", "name": "Title", "basedOn": "Normal", "next": "Normal", "link": "Title Char", "characterFormat": { "fontSize": 28.0, "fontFamily": "Calibri Light" }, "paragraphFormat": { "afterSpacing": 0.0, "lineSpacing": 1.0, "lineSpacingType": "Multiple" } }, { "type": "Character", "name": "Title Char", "basedOn": "Default Paragraph Font", "characterFormat": { "fontSize": 28.0, "fontFamily": "Calibri Light" } }, { "type": "Character", "name": "Heading 1 Char", "basedOn": "Default Paragraph Font", "characterFormat": { "fontSize": 16.0, "fontFamily": "Calibri Light", "fontColor": "#2F5496FF" } }, { "type": "Character", "name": "Heading 2 Char", "basedOn": "Default Paragraph Font", "characterFormat": { "fontSize": 13.0, "fontFamily": "Calibri Light", "fontColor": "#2F5496FF" } }, { "type": "Character", "name": "Heading 3 Char", "basedOn": "Default Paragraph Font", "characterFormat": { "fontSize": 12.0, "fontFamily": "Calibri Light", "fontColor": "#1F3763FF" } }, { "type": "Character", "name": "Heading 4 Char", "basedOn": "Default Paragraph Font", "characterFormat": { "italic": true, "fontFamily": "Calibri Light", "fontColor": "#2F5496FF" } }, { "type": "Character", "name": "Heading 5 Char", "basedOn": "Default Paragraph Font", "characterFormat": { "fontFamily": "Calibri Light", "fontColor": "#2F5496FF" } }, { "type": "Paragraph", "name": "Intense Quote", "basedOn": "Normal", "next": "Normal", "link": "Intense Quote Char", "characterFormat": { "italic": true, "fontColor": "#4472C4FF" }, "paragraphFormat": { "leftIndent": 43.200000762939453, "rightIndent": 43.200000762939453, "beforeSpacing": 18.0, "afterSpacing": 18.0, "textAlignment": "Center" } }, { "type": "Character", "name": "Intense Quote Char", "basedOn": "Default Paragraph Font", "characterFormat": { "italic": true, "fontColor": "#4472C4FF" } }, { "type": "Paragraph", "name": "Subtitle", "basedOn": "Normal", "next": "Normal", "link": "Subtitle Char", "characterFormat": { "fontColor": "#5A5A5AFF" }, "paragraphFormat": { "listFormat": { "listLevelNumber": 1 } } }, { "type": "Character", "name": "Subtitle Char", "basedOn": "Default Paragraph Font", "characterFormat": { "fontColor": "#5A5A5AFF" } }] };
            // tslint:enable        
            _this.container.documentEditor.open(JSON.stringify(defaultDocument));
            _this.container.documentEditor.documentName = 'Styles';
            _this.titleBar.updateDocumentTitle();
            _this.container.documentChange = function () {
                _this.titleBar.updateDocumentTitle();
                _this.container.documentEditor.focusIn();
            };
        };
        return _this;
    }
    StylesView.prototype.rendereComplete = function () {
        this.container.serviceUrl = this.hostUrl + 'api/documenteditor/';
        this.container.documentEditor.pageOutline = '#E0E0E0';
        this.container.documentEditor.acceptTab = true;
        this.container.documentEditor.resize();
        this.titleBar = new title_bar_1.TitleBar(document.getElementById('documenteditor_titlebar'), this.container.documentEditor, true);
        this.onLoadDefault();
    };
    StylesView.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { id: 'documenteditor_titlebar', className: "e-de-ctn-title" }),
                React.createElement("div", { id: "documenteditor_container_body" },
                    React.createElement(ej2_react_documenteditor_1.DocumentEditorContainerComponent, { id: "container", ref: function (scope) { _this.container = scope; }, style: { 'display': 'block', 'height': '590px' }, enableToolbar: true, locale: 'en-US' }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates character and paragraph formatting using styles in the document editor. Both built-in styles (for example, heading styles) and custom styles can be added.")),
            React.createElement("div", { id: "description" },
                React.createElement("div", null,
                    React.createElement("p", null, "In this example, you can use, add, modify, or delete built-in and custom styles."),
                    React.createElement("p", { style: { 'display': 'block' } },
                        " More information about the document editor features can be found in this ",
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/document-editor/" }, "documentation section.")))),
            React.createElement("script", null, window.onbeforeunload = function () {
                return 'Want to save your changes?';
            })));
    };
    return StylesView;
}(sample_base_1.SampleBase));
exports.StylesView = StylesView;
