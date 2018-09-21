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
export class HyperlinksAndBookmarksView extends SampleBase<{}, {}> {
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
                <p>This example demonstrates hyperlinks and bookmarks support in document editor. A file, mail, webpage, or bookmark can be added as a link to the text.</p>
            </div>
            <div id="description">
                <div>
                    <p>In this example, you can find all the link types that can be added to a text or portions of text in the document editor.</p>
                    <ul>
                        <li>Link that refers to a webpage.</li>
                        <li>Link that refers to a mail.</li>
                        <li>Link that refers to a bookmark.</li>
                    </ul>
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
        document.getElementById('newTab').setAttribute('href', location.href.split('#')[0] + 'document-editor/links-and-bookmarks/index.html#fabric');
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
        let defaultDocument: object = { "sections": [{ "blocks": [{ "characterFormat": { "fontColor": "#4472C4FF" }, "paragraphFormat": { "afterSpacing": 36.0, "styleName": "Normal" }, "inlines": [{ "name": "top", "bookmarkType": 0 }, { "text": "Hyperlinks and bookmarks", "characterFormat": { "fontSize": 18.0, "fontFamily": "Monotype Corsiva", "fontColor": "#4472C4FF" } }, { "name": "top", "bookmarkType": 1 }] }, { "paragraphFormat": { "styleName": "Heading 1" }, "inlines": [{ "text": "Heading 1" }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "Lorem ipsum dolor sit " }, { "text": "amet" }, { "text": ", " }, { "text": "consectetur" }, { "text": " " }, { "text": "adipiscing" }, { "text": " " }, { "text": "elit" }, { "text": ", " }, { "text": "sed" }, { "text": " do " }, { "text": "eiusmod" }, { "text": " " }, { "text": "tempor" }, { "text": " " }, { "text": "incididunt" }, { "text": " " }, { "text": "ut" }, { "text": " " }, { "text": "labore" }, { "text": " et dolore magna " }, { "text": "aliqua" }, { "text": ". Ut " }, { "text": "enim" }, { "text": " ad minim " }, { "text": "veniam" }, { "text": ", " }, { "text": "quis" }, { "text": " " }, { "text": "nostrud" }, { "text": " exercitation " }, { "text": "ullamco" }, { "text": " " }, { "text": "laboris" }, { "text": " nisi " }, { "text": "ut" }, { "text": " " }, { "text": "aliquip" }, { "text": " ex " }, { "text": "ea" }, { "text": " " }, { "text": "commodo" }, { "text": " " }, { "text": "consequat" }, { "text": "." }] }, { "paragraphFormat": { "beforeSpacing": 18.0, "afterSpacing": 18.0, "styleName": "Normal" }, "inlines": [{ "text": "For more information, kindly visit" }, { "text": " " }, { "hasFieldEnd": true, "fieldType": 0 }, { "text": "HYPERLINK \"https://www.syncfusion.com/\" " }, { "fieldType": 2 }, { "text": "our website", "characterFormat": { "styleName": "Hyperlink" } }, { "fieldType": 1 }, { "text": " [Link to external URL]." }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }, { "paragraphFormat": { "styleName": "Heading 2" }, "inlines": [{ "text": "Heading 2" }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "Lorem ipsum dolor sit " }, { "text": "amet" }, { "text": ", " }, { "text": "consectetur" }, { "text": " " }, { "text": "adipiscing" }, { "text": " " }, { "text": "elit" }, { "text": ", " }, { "text": "sed" }, { "text": " do " }, { "text": "eiusmod" }, { "text": " " }, { "text": "tempor" }, { "text": " " }, { "text": "incididunt" }, { "text": " " }, { "text": "ut" }, { "text": " " }, { "text": "labore" }, { "text": " et dolore magna " }, { "text": "aliqua" }, { "text": ". Ut " }, { "text": "enim" }, { "text": " ad minim " }, { "text": "veniam" }, { "text": ", " }, { "text": "quis" }, { "text": " " }, { "text": "nostrud" }, { "text": " exercitation " }, { "text": "ullamco" }, { "text": " " }, { "text": "laboris" }, { "text": " nisi " }, { "text": "ut" }, { "text": " " }, { "text": "aliquip" }, { "text": " ex " }, { "text": "ea" }, { "text": " " }, { "text": "commodo" }, { "text": " " }, { "text": "consequat" }, { "text": "." }] }, { "paragraphFormat": { "beforeSpacing": 18.0, "afterSpacing": 18.0, "styleName": "Normal" }, "inlines": [{ "text": "You can reach us through " }, { "hasFieldEnd": true, "fieldType": 0 }, { "text": "HYPERLINK \"mailto:info@syncfusion.com\" " }, { "fieldType": 2 }, { "text": "our mail", "characterFormat": { "styleName": "Hyperlink" } }, { "fieldType": 1 }, { "text": " [Link to mail]." }] }, { "paragraphFormat": { "beforeSpacing": 18.0, "afterSpacing": 18.0, "styleName": "Normal" }, "inlines": [{ "name": "_GoBack", "bookmarkType": 0 }, { "name": "_GoBack", "bookmarkType": 1 }] }, { "paragraphFormat": { "beforeSpacing": 18.0, "afterSpacing": 18.0, "styleName": "Normal" }, "inlines": [] }, { "paragraphFormat": { "beforeSpacing": 18.0, "afterSpacing": 18.0, "styleName": "Normal" }, "inlines": [] }, { "paragraphFormat": { "beforeSpacing": 18.0, "afterSpacing": 18.0, "styleName": "Normal" }, "inlines": [{ "text": "To the top, click " }, { "hasFieldEnd": true, "fieldType": 0 }, { "text": "HYPERLINK \\l \"top\"" }, { "fieldType": 2 }, { "text": "here", "characterFormat": { "styleName": "Hyperlink" } }, { "fieldType": 1 }, { "text": " [Link to bookmark]." }] }], "headersFooters": {}, "sectionFormat": { "headerDistance": 36.0, "footerDistance": 36.0, "pageWidth": 612.0, "pageHeight": 792.0, "leftMargin": 72.0, "rightMargin": 72.0, "topMargin": 72.0, "bottomMargin": 72.0, "differentFirstPage": false, "differentOddAndEvenPages": false } }], "characterFormat": { "fontSize": 11.0, "fontFamily": "Calibri" }, "paragraphFormat": { "afterSpacing": 8.0, "lineSpacing": 1.0791666507720947, "lineSpacingType": "Multiple" }, "background": { "color": "#FFFFFFFF" }, "styles": [{ "type": "Paragraph", "name": "Normal", "next": "Normal", "paragraphFormat": { "afterSpacing": 0.0, "lineSpacing": 1.0, "lineSpacingType": "Multiple" } }, { "type": "Paragraph", "name": "Heading 1", "basedOn": "Normal", "next": "Normal", "link": "Heading 1 Char", "characterFormat": { "fontSize": 16.0, "fontFamily": "Calibri Light", "fontColor": "#2F5496FF" }, "paragraphFormat": { "beforeSpacing": 12.0, "outlineLevel": "Level1" } }, { "type": "Paragraph", "name": "Heading 2", "basedOn": "Normal", "next": "Normal", "link": "Heading 2 Char", "characterFormat": { "fontSize": 13.0, "fontFamily": "Calibri Light", "fontColor": "#2F5496FF" }, "paragraphFormat": { "beforeSpacing": 2.0, "outlineLevel": "Level2" } }, { "type": "Character", "name": "Default Paragraph Font" }, { "type": "Paragraph", "name": "Notes", "basedOn": "Normal", "next": "Normal", "characterFormat": { "bold": true }, "paragraphFormat": { "afterSpacing": 6.0 } }, { "type": "Character", "name": "Hyperlink", "basedOn": "Default Paragraph Font", "characterFormat": { "underline": "Single", "fontColor": "#0563C1FF" } }, { "type": "Character", "name": "Unresolved Mention", "basedOn": "Default Paragraph Font", "characterFormat": { "fontColor": "#808080FF" } }, { "type": "Character", "name": "Heading 1 Char", "basedOn": "Default Paragraph Font", "characterFormat": { "fontSize": 16.0, "fontFamily": "Calibri Light", "fontColor": "#2F5496FF" } }, { "type": "Character", "name": "Heading 2 Char", "basedOn": "Default Paragraph Font", "characterFormat": { "fontSize": 13.0, "fontFamily": "Calibri Light", "fontColor": "#2F5496FF" } }, { "type": "Character", "name": "FollowedHyperlink", "basedOn": "Default Paragraph Font", "characterFormat": { "underline": "Single", "fontColor": "#954F72FF" } }] };
        // tslint:enable        
        let waitingPopUp: HTMLElement = document.getElementById('waiting-popup');
        let popupOverlay: HTMLElement = document.getElementById('popup-overlay');
        waitingPopUp.style.display = 'block';
        this.documenteditor.open(JSON.stringify(defaultDocument));
        this.documenteditor.documentName = 'Hyperlinks and Bookmarks';
        waitingPopUp.style.display = 'none';
        popupOverlay.style.display = 'none';
        this.documenteditor.focusIn();
        this.fontProperties.updateStyles();
    }
    onWindowResize = (): void => {
        this.updateContainerSize();
    }
}