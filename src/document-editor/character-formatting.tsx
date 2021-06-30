import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import { TitleBar } from './title-bar';

import './default.component.css';
DocumentEditorContainerComponent.Inject(Toolbar);

// tslint:disable:max-line-length
export class CharacterFormatView extends SampleBase<{}, {}> {
    private hostUrl: string = 'https://ej2services.syncfusion.com/production/web-services/';
    public container: DocumentEditorContainerComponent;
    public titleBar: TitleBar;
    public rendereComplete(): void {
        this.container.serviceUrl = this.hostUrl + 'api/documenteditor/';
        this.container.documentEditor.pageOutline = '#E0E0E0';
        this.container.documentEditor.acceptTab = true;
        this.container.documentEditor.resize();
        this.titleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), this.container.documentEditor, true);
        this.onLoadDefault();
    }
    render() {
        return (<div className='control-pane'>
            <div className='control-section'>
                <div id='documenteditor_titlebar' className="e-de-ctn-title"></div>
                <div id="documenteditor_container_body">
                    <DocumentEditorContainerComponent id="container" ref={(scope) => { this.container = scope; }} style={{ 'display': 'block' }}
                        height={'590px'} enableToolbar={true} locale='en-US'  />
                </div>
            </div>
            <div id="action-description">
                <p>This example demonstrates the character formatting options in DocumentEditor such as bold, italic, underline, strikethrough, subscript, superscript, font, font size, font color, and highlight color.</p>
            </div>
            <div id="description">
                <div>
                    <p>In this example, you can find character formatting features in the document editor.</p>
                    <ul>
                        <li>Bold and Italic.</li>
                        <li>Underline.</li>
                        <li>Single strike and double strikes.</li>
                        <li>Superscript and subscript.</li>
                        <li>Font and highlight colors.</li>
                        <li>Different fonts and sizes.</li>
                    </ul>
                    <p style={{ 'display': 'block' }}> More information about the document editor features can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/document-editor/text-format/">documentation section.</a>
                    </p>
                </div>
            </div>
            <script>{
                window.onbeforeunload = function () {
                    return 'Want to save your changes?';
                }
            }
            </script>
        </div>);
    }

    onLoadDefault = (): void => {
        // tslint:disable
        let defaultDocument: object = { "sections": [{ "blocks": [{ "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "List of text formatting options", "characterFormat": { "fontSize": 18.0, "fontFamily": "Monotype Corsiva" } }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "Bold", "characterFormat": { "bold": true } }] }, { "characterFormat": { "bold": true }, "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }, { "characterFormat": { "fontColor": "#00B0F0FF" }, "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "C", "characterFormat": { "fontColor": "#CC99FFFF" } }, { "text": "o", "characterFormat": { "fontColor": "#333333FF" } }, { "text": "l", "characterFormat": { "fontColor": "#FF6600FF" } }, { "text": "o", "characterFormat": { "fontColor": "#3366FFFF" } }, { "text": "r", "characterFormat": { "fontColor": "#FF9900FF" } }, { "text": "e", "characterFormat": { "fontColor": "#FF6600FF" } }, { "text": "d", "characterFormat": { "fontColor": "#808080FF" } }] }, { "characterFormat": { "fontColor": "#00B0F0FF" }, "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }, { "characterFormat": { "bold": true }, "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "Double", "characterFormat": { "strikethrough": "DoubleStrike" } }, { "text": " ", "characterFormat": { "strikethrough": "DoubleStrike" } }, { "text": "Strike", "characterFormat": { "strikethrough": "DoubleStrike" } }] }, { "characterFormat": { "strikethrough": "DoubleStrike" }, "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }, { "characterFormat": { "fontColor": "#ED7D31FF" }, "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "Highlighted", "characterFormat": { "highlightColor": "Turquoise", "fontColor": "#ED7D31FF" } }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "Italicized", "characterFormat": { "italic": true } }] }, { "characterFormat": { "italic": true }, "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "Strikeout ", "characterFormat": { "strikethrough": "SingleStrike" } }] }, { "characterFormat": { "strikethrough": "SingleStrike" }, "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }, { "characterFormat": { "strikethrough": "SingleStrike" }, "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "Some" }, { "text": "Sub", "characterFormat": { "baselineAlignment": "Subscript" } }, { "text": "s", "characterFormat": { "baselineAlignment": "Subscript" } }, { "text": "cript", "characterFormat": { "baselineAlignment": "Subscript" } }, { "text": " ", "characterFormat": { "baselineAlignment": "Subscript" } }] }, { "characterFormat": { "baselineAlignment": "Subscript" }, "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }, { "characterFormat": { "baselineAlignment": "Subscript" }, "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "Some" }, { "text": "Super", "characterFormat": { "baselineAlignment": "Superscript" } }, { "text": "s", "characterFormat": { "baselineAlignment": "Superscript" } }, { "text": "cript", "characterFormat": { "baselineAlignment": "Superscript" } }, { "text": " ", "characterFormat": { "baselineAlignment": "Superscript" } }] }, { "characterFormat": { "baselineAlignment": "Superscript" }, "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }, { "characterFormat": { "underline": "Single" }, "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "Underline", "characterFormat": { "underline": "Single" } }, { "text": "d", "characterFormat": { "underline": "Single" } }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": " " }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "Text with different fonts and sizes", "characterFormat": { "fontSize": 18.0, "fontFamily": "Monotype Corsiva" } }] }, { "characterFormat": { "underline": "Double", "fontSize": 11.0, "fontFamily": "Book Antiqua", "fontColor": "#7028E8FF" }, "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }, { "paragraphFormat": { "beforeSpacing": 6.0, "afterSpacing": 6.0, "styleName": "Normal" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog [Book Antiqua", "characterFormat": { "fontSize": 11.0, "fontFamily": "Book Antiqua", "fontColor": "#7028E8FF" } }, { "text": "]", "characterFormat": { "fontSize": 11.0, "fontFamily": "Book Antiqua", "fontColor": "#7028E8FF" } }] }, { "paragraphFormat": { "beforeSpacing": 6.0, "afterSpacing": 6.0, "styleName": "Normal" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog ", "characterFormat": { "fontFamily": "Bitstream Vera Sans", "fontColor": "#F1C084FF" } }, { "text": "[Bitstream Vera Sans]", "characterFormat": { "fontFamily": "Bitstream Vera Sans", "fontColor": "#F1C084FF" } }] }, { "paragraphFormat": { "beforeSpacing": 6.0, "afterSpacing": 6.0, "styleName": "Normal" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog ", "characterFormat": { "fontSize": 13.0, "fontFamily": "Comic Sans MS", "fontColor": "#BD5DCDFF" } }, { "text": "[Comic Sans MS]", "characterFormat": { "fontSize": 13.0, "fontFamily": "Comic Sans MS", "fontColor": "#BD5DCDFF" } }] }, { "paragraphFormat": { "beforeSpacing": 6.0, "afterSpacing": 6.0, "styleName": "Normal" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog ", "characterFormat": { "fontSize": 14.0, "fontFamily": "Microsoft Sans Serif", "fontColor": "#4D72EEFF" } }, { "text": "[Microsoft Sans Serif]", "characterFormat": { "fontSize": 14.0, "fontFamily": "Microsoft Sans Serif", "fontColor": "#4D72EEFF" } }] }, { "paragraphFormat": { "beforeSpacing": 6.0, "afterSpacing": 6.0, "styleName": "Normal" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog", "characterFormat": { "fontSize": 15.0, "fontFamily": "Batang", "fontColor": "#335388FF" } }, { "text": " [", "characterFormat": { "fontSize": 15.0, "fontFamily": "Batang", "fontColor": "#335388FF" } }, { "text": "Batang", "characterFormat": { "fontSize": 15.0, "fontFamily": "Batang", "fontColor": "#335388FF" } }, { "text": "]", "characterFormat": { "fontSize": 15.0, "fontFamily": "Batang", "fontColor": "#335388FF" } }] }, { "characterFormat": { "fontSize": 16.0, "fontFamily": "Arial", "fontColor": "#31B463FF" }, "paragraphFormat": { "beforeSpacing": 6.0, "afterSpacing": 6.0, "styleName": "Normal" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog ", "characterFormat": { "fontSize": 16.0, "fontFamily": "Arial", "fontColor": "#31B463FF" } }, { "text": "[Arial]", "characterFormat": { "fontSize": 16.0, "fontFamily": "Arial", "fontColor": "#31B463FF" } }] }, { "characterFormat": { "fontSize": 16.0 }, "paragraphFormat": { "beforeSpacing": 6.0, "afterSpacing": 6.0, "styleName": "Normal" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog [Book Antiqua]", "characterFormat": { "fontSize": 16.0, "fontFamily": "Book Antiqua", "fontColor": "#7028E8FF" } }] }, { "characterFormat": { "fontSize": 15.0 }, "paragraphFormat": { "beforeSpacing": 6.0, "afterSpacing": 6.0, "styleName": "Normal" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog [Bitstream Vera Sans]", "characterFormat": { "fontSize": 15.0, "fontFamily": "Bitstream Vera Sans", "fontColor": "#F1C084FF" } }] }, { "characterFormat": { "fontSize": 14.0 }, "paragraphFormat": { "beforeSpacing": 6.0, "afterSpacing": 6.0, "styleName": "Normal" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog [Comic Sans MS]", "characterFormat": { "fontSize": 14.0, "fontFamily": "Comic Sans MS", "fontColor": "#BD5DCDFF" } }, { "name": "_GoBack", "bookmarkType": 0 }, { "name": "_GoBack", "bookmarkType": 1 }] }, { "characterFormat": { "fontSize": 13.0 }, "paragraphFormat": { "beforeSpacing": 6.0, "afterSpacing": 6.0, "styleName": "Normal" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog [Microsoft Sans Serif]", "characterFormat": { "fontSize": 13.0, "fontFamily": "Microsoft Sans Serif", "fontColor": "#4D72EEFF" } }] }, { "characterFormat": { "fontSize": 11.0 }, "paragraphFormat": { "beforeSpacing": 6.0, "afterSpacing": 6.0, "styleName": "Normal" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog", "characterFormat": { "fontFamily": "Batang", "fontColor": "#335388FF" } }, { "text": " [", "characterFormat": { "fontFamily": "Batang", "fontColor": "#335388FF" } }, { "text": "Batang", "characterFormat": { "fontFamily": "Batang", "fontColor": "#335388FF" } }, { "text": "]", "characterFormat": { "fontFamily": "Batang", "fontColor": "#335388FF" } }] }, { "characterFormat": { "fontSize": 10.0 }, "paragraphFormat": { "beforeSpacing": 6.0, "afterSpacing": 6.0, "styleName": "Normal" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog [Arial]", "characterFormat": { "fontSize": 11.0, "fontFamily": "Arial", "fontColor": "#31B463FF" } }] }], "headersFooters": {}, "sectionFormat": { "headerDistance": 36.0, "footerDistance": 36.0, "pageWidth": 612.0, "pageHeight": 792.0, "leftMargin": 72.0, "rightMargin": 72.0, "topMargin": 72.0, "bottomMargin": 72.0, "differentFirstPage": false, "differentOddAndEvenPages": false } }], "characterFormat": { "fontFamily": "Times New Roman" }, "background": { "color": "#FFFFFFFF" }, "styles": [{ "type": "Paragraph", "name": "Normal", "next": "Normal", "characterFormat": { "fontSize": 12.0 } }, { "type": "Character", "name": "Default Paragraph Font" }] };
        // tslint:enable        
        this.container.documentEditor.open(JSON.stringify(defaultDocument));
        this.container.documentEditor.documentName = 'Character Formatting';
        this.titleBar.updateDocumentTitle();
        this.container.documentChange = (): void => {
        this.titleBar.updateDocumentTitle();
        this.container.documentEditor.focusIn();
        };
    }
}