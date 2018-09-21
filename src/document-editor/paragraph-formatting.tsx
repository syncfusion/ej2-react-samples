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
export class ParagraphFormatView extends SampleBase<{}, {}> {
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
                <p>This example demonstrates paragraph formatting options in document editor such as indentation, spacing, and text alignment.</p>
            </div>
            <div id="description">
                <div>
                    <p>In this example, paragraph formatting features in the document editor can be found.</p>
                    <ul>
                        <li>Indentation: Left, right, first line, and hanging.</li>
                        <li>Text alignment: Left, right, center, and justified.</li>
                        <li>Paragraph spacing–before and after the paragraph.</li>
                        <li>Line spacing.</li>
                        <li>List format.</li>
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
        document.getElementById('newTab').setAttribute('href', location.href.split('#')[0] + 'document-editor/paragraph-formatting/index.html#fabric');
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
        let defaultDocument: object = { "sections": [{ "blocks": [{ "characterFormat": { "fontColor": "#4472C4FF" }, "paragraphFormat": { "afterSpacing": 36.0, "styleName": "Normal" }, "inlines": [{ "text": "List of text alignment options", "characterFormat": { "fontSize": 18.0, "fontFamily": "Monotype Corsiva", "fontColor": "#4472C4FF" } }] }, { "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" }, "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "Left-aligned", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }] }, { "characterFormat": { "fontFamily": "Calibri" }, "paragraphFormat": { "afterSpacing": 18.0, "styleName": "Normal" }, "inlines": [{ "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo ", "characterFormat": { "fontFamily": "Calibri" } }, { "text": "consequat.", "characterFormat": { "fontFamily": "Calibri" } }] }, { "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" }, "paragraphFormat": { "beforeSpacing": 18.0, "textAlignment": "Center", "styleName": "Normal" }, "inlines": [{ "text": "Centered", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }] }, { "characterFormat": { "fontFamily": "Calibri" }, "paragraphFormat": { "afterSpacing": 18.0, "textAlignment": "Center", "styleName": "Normal" }, "inlines": [{ "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", "characterFormat": { "fontFamily": "Calibri" } }] }, { "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" }, "paragraphFormat": { "beforeSpacing": 18.0, "textAlignment": "Right", "styleName": "Normal" }, "inlines": [{ "text": "Right-", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }, { "text": "aligned", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }] }, { "characterFormat": { "fontFamily": "Calibri" }, "paragraphFormat": { "afterSpacing": 18.0, "textAlignment": "Right", "styleName": "Normal" }, "inlines": [{ "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut a", "characterFormat": { "fontFamily": "Calibri" } }, { "text": "liquip ex ea commodo consequat.", "characterFormat": { "fontFamily": "Calibri" } }] }, { "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" }, "paragraphFormat": { "beforeSpacing": 18.0, "textAlignment": "Justify", "styleName": "Normal" }, "inlines": [{ "text": "Justified", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }] }, { "characterFormat": { "fontFamily": "Calibri" }, "paragraphFormat": { "afterSpacing": 18.0, "textAlignment": "Justify", "styleName": "Normal" }, "inlines": [{ "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat", "characterFormat": { "fontFamily": "Calibri" } }, { "text": ".", "characterFormat": { "fontFamily": "Calibri" } }] }, { "characterFormat": { "fontFamily": "Calibri" }, "paragraphFormat": { "afterSpacing": 8.0, "lineSpacing": 1.0791666507720947, "lineSpacingType": "Multiple", "styleName": "Normal" }, "inlines": [{ "text": " ", "characterFormat": { "fontFamily": "Calibri" } }] }, { "characterFormat": { "fontColor": "#4472C4FF" }, "paragraphFormat": { "afterSpacing": 36.0, "styleName": "Normal" }, "inlines": [{ "text": "List of indentation options", "characterFormat": { "fontSize": 18.0, "fontFamily": "Monotype Corsiva", "fontColor": "#4472C4FF" } }] }, { "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" }, "paragraphFormat": { "leftIndent": 36.0, "textAlignment": "Justify", "styleName": "Normal" }, "inlines": [{ "text": "Left indent is 48 pixels", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }] }, { "characterFormat": { "fontFamily": "Calibri" }, "paragraphFormat": { "leftIndent": 36.0, "afterSpacing": 18.0, "textAlignment": "Justify", "styleName": "Normal" }, "inlines": [{ "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo", "characterFormat": { "fontFamily": "Calibri" } }, { "text": " consequat.", "characterFormat": { "fontFamily": "Calibri" } }] }, { "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" }, "paragraphFormat": { "rightIndent": 36.0, "textAlignment": "Justify", "styleName": "Normal" }, "inlines": [{ "text": "Right", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }, { "text": " indent is 48 pixels", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }] }, { "characterFormat": { "fontFamily": "Calibri" }, "paragraphFormat": { "rightIndent": 36.0, "afterSpacing": 18.0, "textAlignment": "Justify", "styleName": "Normal" }, "inlines": [{ "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", "characterFormat": { "fontFamily": "Calibri" } }] }, { "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" }, "paragraphFormat": { "firstLineIndent": 36.0, "textAlignment": "Justify", "styleName": "Normal" }, "inlines": [{ "text": "First line ", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }, { "text": "indent is 48 pixels", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }] }, { "characterFormat": { "fontFamily": "Calibri" }, "paragraphFormat": { "firstLineIndent": 36.0, "afterSpacing": 18.0, "textAlignment": "Justify", "styleName": "Normal" }, "inlines": [{ "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", "characterFormat": { "fontFamily": "Calibri" } }] }, { "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" }, "paragraphFormat": { "leftIndent": 36.0, "firstLineIndent": -36.0, "textAlignment": "Justify", "styleName": "Normal" }, "inlines": [{ "text": "Hanging", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }, { "text": " indent is 48 pixels", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }] }, { "characterFormat": { "fontFamily": "Calibri" }, "paragraphFormat": { "leftIndent": 36.0, "firstLineIndent": -36.0, "afterSpacing": 18.0, "textAlignment": "Justify", "styleName": "Normal" }, "inlines": [{ "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", "characterFormat": { "fontFamily": "Calibri" } }] }, { "characterFormat": { "fontFamily": "Calibri" }, "paragraphFormat": { "afterSpacing": 8.0, "lineSpacing": 1.0791666507720947, "lineSpacingType": "Multiple", "styleName": "Normal" }, "inlines": [{ "text": " ", "characterFormat": { "fontFamily": "Calibri" } }] }, { "characterFormat": { "fontColor": "#4472C4FF" }, "paragraphFormat": { "afterSpacing": 36.0, "styleName": "Normal" }, "inlines": [{ "text": "List of line spacing options", "characterFormat": { "fontSize": 18.0, "fontFamily": "Monotype Corsiva", "fontColor": "#4472C4FF" } }] }, { "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" }, "paragraphFormat": { "lineSpacing": 2.0, "lineSpacingType": "Multiple", "textAlignment": "Justify", "styleName": "Normal" }, "inlines": [{ "text": "Double line spacing", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }] }, { "characterFormat": { "fontFamily": "Calibri" }, "paragraphFormat": { "afterSpacing": 18.0, "lineSpacing": 2.0, "lineSpacingType": "Multiple", "textAlignment": "Justify", "styleName": "Normal" }, "inlines": [{ "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ali", "characterFormat": { "fontFamily": "Calibri" } }, { "name": "_GoBack", "bookmarkType": 0 }, { "name": "_GoBack", "bookmarkType": 1 }, { "text": "quip ex ea commodo consequat.", "characterFormat": { "fontFamily": "Calibri" } }] }, { "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" }, "paragraphFormat": { "lineSpacing": 18.0, "lineSpacingType": "AtLeast", "textAlignment": "Justify", "styleName": "Normal" }, "inlines": [{ "text": "Line spacing", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }, { "text": " is", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }, { "text": " at least", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }, { "text": " ", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }, { "text": "24", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }, { "text": " pixels", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }] }, { "characterFormat": { "fontFamily": "Calibri" }, "paragraphFormat": { "afterSpacing": 18.0, "lineSpacing": 18.0, "lineSpacingType": "AtLeast", "textAlignment": "Justify", "styleName": "Normal" }, "inlines": [{ "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", "characterFormat": { "fontFamily": "Calibri" } }] }, { "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" }, "paragraphFormat": { "lineSpacing": 15.0, "lineSpacingType": "Exactly", "textAlignment": "Justify", "styleName": "Normal" }, "inlines": [{ "text": "Line spacing", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }, { "text": " is ", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }, { "text": "exactly 20", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }, { "text": " pixels", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }] }, { "characterFormat": { "fontFamily": "Calibri" }, "paragraphFormat": { "afterSpacing": 18.0, "lineSpacing": 15.0, "lineSpacingType": "Exactly", "textAlignment": "Justify", "styleName": "Normal" }, "inlines": [{ "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", "characterFormat": { "fontFamily": "Calibri" } }] }, { "characterFormat": { "fontFamily": "Calibri" }, "paragraphFormat": { "leftIndent": 36.0, "afterSpacing": 18.0, "lineSpacing": 15.0, "lineSpacingType": "Exactly", "textAlignment": "Justify", "styleName": "Normal" }, "inlines": [{ "text": " " }] }, { "characterFormat": { "fontColor": "#4472C4FF" }, "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "List of paragraph", "characterFormat": { "fontSize": 18.0, "fontFamily": "Monotype Corsiva", "fontColor": "#4472C4FF" } }, { "text": " ", "characterFormat": { "fontSize": 18.0, "fontFamily": "Monotype Corsiva", "fontColor": "#4472C4FF" } }, { "text": "spacing options", "characterFormat": { "fontSize": 18.0, "fontFamily": "Monotype Corsiva", "fontColor": "#4472C4FF" } }] }, { "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" }, "paragraphFormat": { "beforeSpacing": 18.0, "afterSpacing": 12.0, "styleName": "Normal" }, "inlines": [{ "text": "Spacing before the paragraph is 24 pixels and after the paragraph is 16 pixels", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }] }, { "characterFormat": { "fontFamily": "Calibri" }, "paragraphFormat": { "beforeSpacing": 18.0, "afterSpacing": 12.0, "styleName": "Normal" }, "inlines": [{ "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", "characterFormat": { "fontFamily": "Calibri" } }] }, { "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" }, "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "No spacing before and after the paragraph", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }] }, { "characterFormat": { "fontFamily": "Calibri" }, "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", "characterFormat": { "fontFamily": "Calibri" } }] }], "headersFooters": {}, "sectionFormat": { "headerDistance": 36.0, "footerDistance": 36.0, "pageWidth": 612.0, "pageHeight": 792.0, "leftMargin": 72.0, "rightMargin": 72.0, "topMargin": 72.0, "bottomMargin": 72.0, "differentFirstPage": false, "differentOddAndEvenPages": false } }], "characterFormat": { "fontSize": 11.0, "fontFamily": "Calibri" }, "paragraphFormat": { "afterSpacing": 8.0, "lineSpacing": 1.0791666507720947, "lineSpacingType": "Multiple" }, "background": { "color": "#FFFFFFFF" }, "styles": [{ "type": "Paragraph", "name": "Normal", "next": "Normal", "characterFormat": { "fontSize": 12.0, "fontFamily": "Times New Roman" }, "paragraphFormat": { "afterSpacing": 0.0, "lineSpacing": 1.0, "lineSpacingType": "Multiple" } }, { "type": "Character", "name": "Default Paragraph Font" }, { "type": "Paragraph", "name": "Notes", "basedOn": "Normal", "next": "Normal", "characterFormat": { "bold": true }, "paragraphFormat": { "afterSpacing": 6.0 } }] };
        // tslint:enable        
        let waitingPopUp: HTMLElement = document.getElementById('waiting-popup');
        let popupOverlay: HTMLElement = document.getElementById('popup-overlay');
        waitingPopUp.style.display = 'block';
        this.documenteditor.open(JSON.stringify(defaultDocument));
        this.documenteditor.documentName = 'Paragraph Formatting';
        waitingPopUp.style.display = 'none';
        popupOverlay.style.display = 'none';
        this.documenteditor.focusIn();
        this.fontProperties.updateStyles();
    }
    onWindowResize = (): void => {
        this.updateContainerSize();
    }
}