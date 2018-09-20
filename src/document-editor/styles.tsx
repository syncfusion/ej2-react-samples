import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import {
    DocumentEditorComponent, DocumentEditor, RequestNavigateEventArgs, ViewChangeEventArgs,
    Print, SfdtExport, WordExport, TextExport, Selection, Search, Editor, ImageResizer, EditorHistory,
    ContextMenu, OptionsPane, HyperlinkDialog, TableDialog, BookmarkDialog, TableOfContentsDialog,
    PageSetupDialog, StyleDialog, ListDialog, ParagraphDialog, BulletsAndNumberingDialog, FontDialog,
    TablePropertiesDialog, BordersAndShadingDialog, TableOptionsDialog, CellOptionsDialog, StylesDialog
} from '@syncfusion/ej2-react-documenteditor';
import { TitleBar } from './title-bar';
import { ToolBar } from './tool-bar';
import { StatusBar } from './status-bar';
import { TextProperties } from './text-properties-pane';
import { TableProperties } from './table-properties-pane';
import { ImageProperties } from './image-properties-pane';
import { DocumentLoader } from './document-loader';
import { HeaderFooterProperties } from './header-footer-pane';
import { TocProperties } from './table-of-contents-pane';
import { PropertiesPane } from './properties-pane';
import { TemplateLoader } from './template-loader';
import './default.component.css';
DocumentEditorComponent.Inject(Print, SfdtExport, WordExport, TextExport, Selection, Search, Editor, ImageResizer, EditorHistory, ContextMenu, OptionsPane, HyperlinkDialog, TableDialog, BookmarkDialog, TableOfContentsDialog, PageSetupDialog, StyleDialog, ListDialog, ParagraphDialog, BulletsAndNumberingDialog, FontDialog, TablePropertiesDialog, BordersAndShadingDialog, TableOptionsDialog, CellOptionsDialog, StylesDialog);

// tslint:disable:max-line-length
export class StylesView extends SampleBase<{}, {}> {
    public documenteditor: DocumentEditorComponent;
    public containerPanel: HTMLElement;
    public tocProperties: TocProperties;
    public headerFooter: HeaderFooterProperties;
    public fontProperties: TextProperties;
    public imageProperties: ImageProperties;
    public tableProperties: TableProperties;
    public propertiesPane: PropertiesPane;
    public toolbar: ToolBar;
    public titleBar: TitleBar;
    public statusBar: StatusBar;
    public rendereComplete(): void {
        this.containerPanel = document.getElementById('documenteditor_container_body');
        this.updateContainerSize();
        this.documenteditor.pageOutline = '#E0E0E0';
        this.documenteditor.acceptTab = true;
        this.documenteditor.resize();
        let tocProperties: TocProperties = new TocProperties(this.documenteditor);
        let headerFooter: HeaderFooterProperties = new HeaderFooterProperties(this.documenteditor);
        this.fontProperties = new TextProperties(this.documenteditor, 'textProperty');
        let imageProperties: ImageProperties = new ImageProperties(this.documenteditor);
        let tableProperties: TableProperties = new TableProperties(this.documenteditor, imageProperties, this.fontProperties);
        // tslint:disable-next-line:max-line-length
        let propertiesPane: PropertiesPane = new PropertiesPane(this.documenteditor, this.fontProperties, tableProperties, headerFooter, imageProperties, tocProperties);
        //Initializes document editor toolbar and events.
        // tslint:disable-next-line:max-line-length
        this.toolbar = new ToolBar(this.documenteditor, document.getElementById('documenteditor_toolbar'), propertiesPane);
        this.toolbar.documentLoader = new DocumentLoader(this.documenteditor);
        this.toolbar.templateLoader = new TemplateLoader();
        if (!this.toolbar.isReadOnly) {
            this.toolbar.updateUndoRedoBtn();
        }
        this.titleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), this.documenteditor, true);
        this.statusBar = new StatusBar(document.getElementById('documenteditor_statusbar'), this.documenteditor);
        this.onLoadDefault();
        this.documenteditor.selectionChange = () => {
            setTimeout(() => { this.onSelectionChange(); }, 20);
        };
        this.documenteditor.documentChange = (): void => {
            this.toolbar.updateUndoRedoBtn();
            this.toolbar.isContentChange = false;
            this.applyPageCountAndDocumentTitle();
            this.fontProperties.updateStyles();
        };
        this.documenteditor.contentChange = (): void => {
            this.toolbar.isContentChange = true;
            if (!this.toolbar.isReadOnly) {
                this.toolbar.updateUndoRedoBtn();
            }
            //Set page count
            this.statusBar.updatePageCount();
        };
        window.addEventListener('resize', (): void => { this.onWindowResize(); });
        if (!this.toolbar.isReadOnly) {
            this.toolbar.updateUndoRedoBtn();
        }
        this.updateContainerSize();
        this.documenteditor.resize();
        this.applyPageCountAndDocumentTitle();
        this.showPropertiesPaneOnInitial();
        this.documenteditor.requestNavigate = (args: RequestNavigateEventArgs) => {
            if (args.linkType !== 'Bookmark') {
                let link: string = args.navigationLink;
                if (args.localReference.length > 0) {
                    link += '#' + args.localReference;
                }
                window.open(link);
                args.isHandled = true;
            }
        };
        this.documenteditor.zoomFactorChange = (): void => {
            this.statusBar.updateZoomContent();
        };
        this.documenteditor.viewChange = (e: ViewChangeEventArgs): void => {
            this.statusBar.updatePageNumberOnViewChange(e);
        };
    }
    render() {
        return (<div>
            <div className="control-section">
                <div className="col-lg-12 col-sm-12 col-md-12 center">
                    Click the button to view the sample
                </div>
                <div className="col-lg-12 col-sm-12 col-md-12 center">
                    <a className="e-btn" id="newTab" onClick={this.newTabClick.bind(this)} target="_blank">Open in new tab</a>
                </div>
                <div id="wrapper">
                    <title>Essential JS 2 for React - DocumentEditor</title>
                    <div id="panel">
                        <div id='documenteditor_titlebar'></div>
                        <div id='documenteditor_toolbar'>
                        </div>
                        <div id="documenteditor_container_body" style={{ 'display': 'flex', 'position': 'relative' }}>
                            <DocumentEditorComponent id="container" ref={(scope) => { this.documenteditor = scope; }} style={{ 'width': '100%', 'height': '100%' }}
                                isReadOnly={false} enablePrint={true}
                                enableSelection={true} enableEditor={true} enableEditorHistory={true}
                                enableContextMenu={true} enableSearch={true} enableOptionsPane={true}
                                enableBookmarkDialog={true} enableBordersAndShadingDialog={true} enableFontDialog={true} enableTableDialog={true} enableParagraphDialog={true}
                                enableHyperlinkDialog={true} enableImageResizer={true} enableListDialog={true}
                                enablePageSetupDialog={true} enableSfdtExport={true}
                                enableStyleDialog={true} enableTableOfContentsDialog={true}
                                enableTableOptionsDialog={true} enableTablePropertiesDialog={true}
                                enableTextExport={true} enableWordExport={true} />
                        </div>
                        <div id="documenteditor_statusbar">
                        </div>
                    </div>
                    <div className="overlay" id="popup-overlay" style={{ display: 'block;' }}>
                    </div>
                    <div id='waiting-popup'>
                        <svg className="circular" height="40" width="40">
                            <circle className="circle-path" cx="25" cy="25" r="20" fill="none" stroke-width="6" stroke-miterlimit="10" />
                        </svg>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>This example demonstrates character and paragraph formatting using styles in the document editor. Both built-in styles (for example, heading styles) and custom styles can be added.</p>
            </div>
            <div id="description">
                <div>
                    <p>In this example, you can use, add, modify, or delete built-in and custom styles.</p>
                    <p style={{ 'display': 'block' }}> More information about the document editor features can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/document-editor/">documentation section.</a>
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

    newTabClick = (): void => {
        document.getElementById('newTab').setAttribute('href', location.href.split('#')[0] + 'document-editor/styles/index.html#fabric');
    }

    applyPageCountAndDocumentTitle = (): void => {
        //Sets Document name.
        this.titleBar.updateDocumentTitle();
        this.statusBar.updatePageCount();
    }
    updateContainerSize = (): void => {
        let titleBarDiv: HTMLElement = document.getElementById('documenteditor_titlebar');
        let statusBarDiv: HTMLElement = document.getElementById('documenteditor_statusbar');
        let toolBarDiv: HTMLElement = document.getElementById('documenteditor_toolbar');
        if (this.containerPanel && titleBarDiv && statusBarDiv && toolBarDiv) {
            this.containerPanel.style.height = (window.innerHeight -
                (titleBarDiv.offsetHeight + toolBarDiv.offsetHeight + statusBarDiv.offsetHeight)) + 'px';
        }
    }
    showPropertiesPaneOnInitial = (): void => {
        this.toolbar.showPropertiesPaneOnSelection();
    }
    onSelectionChange = (): void => {
        if (this.documenteditor.selection) {
            this.statusBar.startPage = this.documenteditor.selection.startPage;
            this.statusBar.updatePageNumber();
            this.toolbar.showPropertiesPaneOnSelection();
        }
    }
    onLoadDefault = (): void => {
        // tslint:disable
        let defaultDocument: object = { "sections": [{ "blocks": [{ "paragraphFormat": { "styleName": "Title" }, "inlines": [{ "text": "Styles" }] }, { "paragraphFormat": { "styleName": "Subtitle" }, "inlines": [{ "text": "A" }, { "text": " style is a collection of formatting instructions" }, { "text": " " }, { "text": "to provide a consistent look of the document" }, { "text": "." }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }, { "paragraphFormat": { "styleName": "Quote" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog" }, { "text": " [Quote]" }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "name": "_GoBack", "bookmarkType": 0 }, { "name": "_GoBack", "bookmarkType": 1 }] }, { "paragraphFormat": { "styleName": "Heading 1" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog " }, { "text": "[" }, { "text": "Heading 1" }, { "text": "]" }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }, { "paragraphFormat": { "styleName": "Heading 2" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog " }, { "text": "[" }, { "text": "Heading 2" }, { "text": "]" }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }, { "paragraphFormat": { "styleName": "Heading 3" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog" }, { "text": " " }, { "text": "[" }, { "text": "Heading 3" }, { "text": "]" }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }, { "paragraphFormat": { "styleName": "Heading 4" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog " }, { "text": "[Heading 4" }, { "text": "]" }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }, { "paragraphFormat": { "styleName": "Heading 5" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog " }, { "text": "[" }, { "text": "Heading 5" }, { "text": "]" }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }], "headersFooters": {}, "sectionFormat": { "headerDistance": 36.0, "footerDistance": 36.0, "pageWidth": 612.0, "pageHeight": 792.0, "leftMargin": 72.0, "rightMargin": 72.0, "topMargin": 72.0, "bottomMargin": 72.0, "differentFirstPage": false, "differentOddAndEvenPages": false } }], "characterFormat": { "fontSize": 11.0, "fontFamily": "Calibri" }, "paragraphFormat": { "afterSpacing": 8.0, "lineSpacing": 1.0791666507720947, "lineSpacingType": "Multiple" }, "background": { "color": "#FFFFFFFF" }, "styles": [{ "type": "Paragraph", "name": "Normal", "next": "Normal" }, { "type": "Paragraph", "name": "Heading 1", "basedOn": "Normal", "next": "Normal", "link": "Heading 1 Char", "characterFormat": { "fontSize": 16.0, "fontFamily": "Calibri Light", "fontColor": "#2F5496FF" }, "paragraphFormat": { "beforeSpacing": 12.0, "afterSpacing": 0.0, "outlineLevel": "Level1" } }, { "type": "Paragraph", "name": "Heading 2", "basedOn": "Normal", "next": "Normal", "link": "Heading 2 Char", "characterFormat": { "fontSize": 13.0, "fontFamily": "Calibri Light", "fontColor": "#2F5496FF" }, "paragraphFormat": { "beforeSpacing": 2.0, "afterSpacing": 0.0, "outlineLevel": "Level2" } }, { "type": "Paragraph", "name": "Heading 3", "basedOn": "Normal", "next": "Normal", "link": "Heading 3 Char", "characterFormat": { "fontSize": 12.0, "fontFamily": "Calibri Light", "fontColor": "#1F3763FF" }, "paragraphFormat": { "beforeSpacing": 2.0, "afterSpacing": 0.0, "outlineLevel": "Level3" } }, { "type": "Paragraph", "name": "Heading 4", "basedOn": "Normal", "next": "Normal", "link": "Heading 4 Char", "characterFormat": { "italic": true, "fontFamily": "Calibri Light", "fontColor": "#2F5496FF" }, "paragraphFormat": { "beforeSpacing": 2.0, "afterSpacing": 0.0, "outlineLevel": "Level4" } }, { "type": "Paragraph", "name": "Heading 5", "basedOn": "Normal", "next": "Normal", "link": "Heading 5 Char", "characterFormat": { "fontFamily": "Calibri Light", "fontColor": "#2F5496FF" }, "paragraphFormat": { "beforeSpacing": 2.0, "afterSpacing": 0.0, "outlineLevel": "Level5" } }, { "type": "Character", "name": "Default Paragraph Font" }, { "type": "Paragraph", "name": "Notes", "basedOn": "Normal", "next": "Normal", "characterFormat": { "bold": true }, "paragraphFormat": { "afterSpacing": 6.0, "lineSpacing": 1.0, "lineSpacingType": "Multiple" } }, { "type": "Paragraph", "name": "Quote", "basedOn": "Normal", "next": "Normal", "link": "Quote Char", "characterFormat": { "italic": true, "fontColor": "#404040FF" }, "paragraphFormat": { "leftIndent": 43.200000762939453, "rightIndent": 43.200000762939453, "beforeSpacing": 10.0, "textAlignment": "Center" } }, { "type": "Character", "name": "Quote Char", "basedOn": "Default Paragraph Font", "characterFormat": { "italic": true, "fontColor": "#404040FF" } }, { "type": "Paragraph", "name": "Title", "basedOn": "Normal", "next": "Normal", "link": "Title Char", "characterFormat": { "fontSize": 28.0, "fontFamily": "Calibri Light" }, "paragraphFormat": { "afterSpacing": 0.0, "lineSpacing": 1.0, "lineSpacingType": "Multiple" } }, { "type": "Character", "name": "Title Char", "basedOn": "Default Paragraph Font", "characterFormat": { "fontSize": 28.0, "fontFamily": "Calibri Light" } }, { "type": "Character", "name": "Heading 1 Char", "basedOn": "Default Paragraph Font", "characterFormat": { "fontSize": 16.0, "fontFamily": "Calibri Light", "fontColor": "#2F5496FF" } }, { "type": "Character", "name": "Heading 2 Char", "basedOn": "Default Paragraph Font", "characterFormat": { "fontSize": 13.0, "fontFamily": "Calibri Light", "fontColor": "#2F5496FF" } }, { "type": "Character", "name": "Heading 3 Char", "basedOn": "Default Paragraph Font", "characterFormat": { "fontSize": 12.0, "fontFamily": "Calibri Light", "fontColor": "#1F3763FF" } }, { "type": "Character", "name": "Heading 4 Char", "basedOn": "Default Paragraph Font", "characterFormat": { "italic": true, "fontFamily": "Calibri Light", "fontColor": "#2F5496FF" } }, { "type": "Character", "name": "Heading 5 Char", "basedOn": "Default Paragraph Font", "characterFormat": { "fontFamily": "Calibri Light", "fontColor": "#2F5496FF" } }, { "type": "Paragraph", "name": "Intense Quote", "basedOn": "Normal", "next": "Normal", "link": "Intense Quote Char", "characterFormat": { "italic": true, "fontColor": "#4472C4FF" }, "paragraphFormat": { "leftIndent": 43.200000762939453, "rightIndent": 43.200000762939453, "beforeSpacing": 18.0, "afterSpacing": 18.0, "textAlignment": "Center" } }, { "type": "Character", "name": "Intense Quote Char", "basedOn": "Default Paragraph Font", "characterFormat": { "italic": true, "fontColor": "#4472C4FF" } }, { "type": "Paragraph", "name": "Subtitle", "basedOn": "Normal", "next": "Normal", "link": "Subtitle Char", "characterFormat": { "fontColor": "#5A5A5AFF" }, "paragraphFormat": { "listFormat": { "listLevelNumber": 1 } } }, { "type": "Character", "name": "Subtitle Char", "basedOn": "Default Paragraph Font", "characterFormat": { "fontColor": "#5A5A5AFF" } }] };
        // tslint:enable        
        let waitingPopUp: HTMLElement = document.getElementById('waiting-popup');
        let popupOverlay: HTMLElement = document.getElementById('popup-overlay');
        waitingPopUp.style.display = 'block';
        this.documenteditor.open(JSON.stringify(defaultDocument));
        this.documenteditor.documentName = 'Styles';
        waitingPopUp.style.display = 'none';
        popupOverlay.style.display = 'none';
        this.documenteditor.focusIn();
        this.fontProperties.updateStyles();
    }
    onWindowResize = (): void => {
        this.updateContainerSize();
    }
}