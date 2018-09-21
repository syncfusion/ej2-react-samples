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
export class HeadersAndFootersView extends SampleBase<{}, {}> {
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
                <p>This example demonstrates header and footer support in document editor. Different headers and footers can be added to the first page, odd pages, and even pages.</p>
            </div>
            <div id="description">
                <div>
                    <p>Header and footer features in document editor.</p>
                    <ul>
                        <li>Header and footer for the first page of the document.</li>
                        <li>Header and footer for even pages of the document.</li>
                        <li>Header and footer for odd pages of the document.</li>
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
        document.getElementById('newTab').setAttribute('href', location.href.split('#')[0] + 'document-editor/headers-and-footers/index.html#fabric');
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
        let defaultDocument: object = { "sections": [{ "blocks": [{ "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "Lorem ipsum dolor sit " }, { "text": "amet" }, { "text": ", " }, { "text": "consectetur" }, { "text": " " }, { "text": "adipiscing" }, { "text": " " }, { "text": "elit" }, { "text": ", " }, { "text": "sed" }, { "text": " do " }, { "text": "eiusmod" }, { "text": " " }, { "text": "tempor" }, { "text": " " }, { "text": "incididunt" }, { "text": " " }, { "text": "ut" }, { "text": " " }, { "text": "labore" }, { "text": " et dolore magna " }, { "text": "aliqua" }, { "text": ". Ut " }, { "text": "enim" }, { "text": " ad minim " }, { "text": "veniam" }, { "text": ", " }, { "text": "quis" }, { "text": " " }, { "text": "nostrud" }, { "text": " exercitation " }, { "text": "ullamco" }, { "text": " " }, { "text": "laboris" }, { "text": " nisi " }, { "text": "ut" }, { "text": " " }, { "text": "aliquip" }, { "text": " ex " }, { "text": "ea" }, { "text": " " }, { "text": "commodo" }, { "text": " " }, { "text": "consequat" }, { "text": ". Duis " }, { "text": "aute" }, { "text": " " }, { "text": "irure" }, { "text": " dolor in " }, { "text": "reprehenderit" }, { "text": " in " }, { "text": "voluptate" }, { "text": " " }, { "text": "velit" }, { "text": " " }, { "text": "esse" }, { "text": " " }, { "text": "cillum" }, { "text": " dolore " }, { "text": "eu" }, { "text": " " }, { "text": "fugiat" }, { "text": " " }, { "text": "nulla" }, { "text": " " }, { "text": "pariatur" }, { "text": ". " }, { "text": "Excepteur" }, { "text": " " }, { "text": "sint" }, { "text": " " }, { "text": "occaecat" }, { "text": " " }, { "text": "cupidatat" }, { "text": " non " }, { "text": "proident" }, { "text": ", " }, { "text": "sunt" }, { "text": " in culpa qui " }, { "text": "officia" }, { "text": " " }, { "text": "deserunt" }, { "text": " " }, { "text": "mollit" }, { "text": " " }, { "text": "anim" }, { "text": " id " }, { "text": "est" }, { "text": " " }, { "text": "laborum" }, { "text": "." }] }, { "paragraphFormat": { "lineSpacing": 1.0791666507720947, "lineSpacingType": "Multiple", "styleName": "Normal" }, "inlines": [{ "text": "\f" }, { "name": "_GoBack", "bookmarkType": 0 }, { "name": "_GoBack", "bookmarkType": 1 }] }, { "characterFormat": { "fontFamily": "Comic Sans MS" }, "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "Lorem ipsum dolor sit ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "amet", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": ", ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "consectetur", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": " ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "adipiscing", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": " ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "elit", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": ", ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "sed", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": " do ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "eiusmod", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": " ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "tempor", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": " ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "incididunt", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": " ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "ut", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": " ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "labore", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": " et dolore magna ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "aliqua", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": ". Ut ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "enim", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": " ad minim ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "veniam", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": ", ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "quis", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": " ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "nostrud", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": " exercitation ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "ullamco", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": " ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "laboris", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": " nisi ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "ut", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": " ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "aliquip", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": " ex ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "ea", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": " ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "commodo", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": " ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "consequat", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": ". Duis ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "aute", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": " ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "irure", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": " dolor in ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "reprehenderit", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": " in ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "voluptate", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": " ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "velit", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": " ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "esse", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": " ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "cillum", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": " dolore ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "eu", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": " ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "fugiat", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": " ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "nulla", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": " ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "pariatur", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": ". ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "Excepteur", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": " ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "sint", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": " ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "occaecat", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": " ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "cupidatat", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": " non ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "proident", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": ", ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "sunt", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": " in culpa qui ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "officia", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": " ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "deserunt", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": " ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "mollit", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": " ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "anim", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": " id ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "est", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": " ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "laborum", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": ".", "characterFormat": { "fontFamily": "Comic Sans MS" } }] }, { "paragraphFormat": { "lineSpacing": 1.0791666507720947, "lineSpacingType": "Multiple", "styleName": "Normal" }, "inlines": [{ "text": "\f" }] }, { "characterFormat": { "fontFamily": "Book Antiqua" }, "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "Lorem ipsum dolor sit ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "amet", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": ", ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "consectetur", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": " ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "adipiscing", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": " ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "elit", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": ", ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "sed", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": " do ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "eiusmod", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": " ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "tempor", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": " ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "incididunt", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": " ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "ut", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": " ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "labore", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": " et dolore magna ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "aliqua", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": ". Ut ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "enim", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": " ad minim ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "veniam", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": ", ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "quis", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": " ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "nostrud", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": " exercitation ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "ullamco", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": " ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "laboris", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": " nisi ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "ut", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": " ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "aliquip", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": " ex ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "ea", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": " ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "commodo", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": " ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "consequat", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": ". Duis ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "aute", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": " ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "irure", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": " dolor in ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "reprehenderit", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": " in ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "voluptate", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": " ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "velit", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": " ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "esse", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": " ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "cillum", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": " dolore ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "eu", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": " ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "fugiat", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": " ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "nulla", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": " ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "pariatur", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": ". ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "Excepteur", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": " ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "sint", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": " ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "occaecat", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": " ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "cupidatat", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": " non ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "proident", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": ", ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "sunt", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": " in culpa qui ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "officia", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": " ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "deserunt", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": " ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "mollit", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": " ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "anim", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": " id ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "est", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": " ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "laborum", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": ".", "characterFormat": { "fontFamily": "Book Antiqua" } }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }], "headersFooters": { "header": { "blocks": [{ "characterFormat": { "fontSize": 18.0, "fontFamily": "Book Antiqua" }, "paragraphFormat": { "textAlignment": "Right", "styleName": "Header" }, "inlines": [{ "text": "This is odd page header.", "characterFormat": { "fontSize": 18.0, "fontFamily": "Book Antiqua" } }] }] }, "footer": { "blocks": [{ "characterFormat": { "fontFamily": "Book Antiqua" }, "paragraphFormat": { "styleName": "Footer", "tabs": [{ "tabJustification": "Left", "position": 0.0, "tabLeader": "None", "deletePosition": 234.0 }] }, "inlines": [{ "text": "This is odd page footer", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "\t", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "text": "Page ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "hasFieldEnd": true, "fieldType": 0 }, { "text": " PAGE   \\* MERGEFORMAT ", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "fieldType": 2 }, { "text": "1", "characterFormat": { "fontFamily": "Book Antiqua" } }, { "fieldType": 1 }] }] }, "evenHeader": { "blocks": [{ "characterFormat": { "fontSize": 18.0, "fontFamily": "Comic Sans MS" }, "paragraphFormat": { "textAlignment": "Right", "styleName": "Header" }, "inlines": [{ "text": "This is even page header", "characterFormat": { "fontSize": 18.0, "fontFamily": "Comic Sans MS" } }] }] }, "evenFooter": { "blocks": [{ "characterFormat": { "fontFamily": "Comic Sans MS" }, "paragraphFormat": { "styleName": "Footer", "tabs": [{ "tabJustification": "Left", "position": 0.0, "tabLeader": "None", "deletePosition": 234.0 }] }, "inlines": [{ "text": "This is even page footer", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "\t", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "text": "Page ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "hasFieldEnd": true, "fieldType": 0 }, { "text": " PAGE   \\* MERGEFORMAT ", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "fieldType": 2 }, { "text": "1", "characterFormat": { "fontFamily": "Comic Sans MS" } }, { "fieldType": 1 }] }] }, "firstPageHeader": { "blocks": [{ "characterFormat": { "fontSize": 20.0 }, "paragraphFormat": { "textAlignment": "Right", "styleName": "Normal" }, "inlines": [{ "text": "This is first page header", "characterFormat": { "fontSize": 20.0 } }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }] }, "firstPageFooter": { "blocks": [{ "paragraphFormat": { "styleName": "Footer", "tabs": [{ "tabJustification": "Left", "position": 0.0, "tabLeader": "None", "deletePosition": 234.0 }] }, "inlines": [{ "text": "This is first page footer" }, { "text": "\t" }, { "text": "Page " }, { "hasFieldEnd": true, "fieldType": 0 }, { "text": " PAGE   \\* MERGEFORMAT " }, { "fieldType": 2 }, { "text": "1" }, { "fieldType": 1 }] }] } }, "sectionFormat": { "headerDistance": 36.0, "footerDistance": 36.0, "pageWidth": 612.0, "pageHeight": 792.0, "leftMargin": 72.0, "rightMargin": 72.0, "topMargin": 72.0, "bottomMargin": 72.0, "differentFirstPage": true, "differentOddAndEvenPages": true } }], "characterFormat": { "fontSize": 11.0, "fontFamily": "Calibri" }, "paragraphFormat": { "afterSpacing": 8.0, "lineSpacing": 1.0791666507720947, "lineSpacingType": "Multiple" }, "background": { "color": "#FFFFFFFF" }, "styles": [{ "type": "Paragraph", "name": "Normal", "next": "Normal", "paragraphFormat": { "lineSpacing": 1.0666667222976685, "lineSpacingType": "Multiple" } }, { "type": "Character", "name": "Default Paragraph Font" }, { "type": "Paragraph", "name": "Notes", "basedOn": "Normal", "next": "Normal", "characterFormat": { "bold": true }, "paragraphFormat": { "afterSpacing": 6.0, "lineSpacing": 1.0, "lineSpacingType": "Multiple" } }, { "type": "Paragraph", "name": "Header", "basedOn": "Normal", "next": "Normal", "link": "Header Char", "paragraphFormat": { "afterSpacing": 0.0, "lineSpacing": 1.0, "lineSpacingType": "Multiple", "tabs": [{ "tabJustification": "Center", "position": 234.0, "tabLeader": "None", "deletePosition": 0.0 }, { "tabJustification": "Right", "position": 460.0, "tabLeader": "None", "deletePosition": 0.0 }] } }, { "type": "Character", "name": "Header Char", "basedOn": "Default Paragraph Font" }, { "type": "Paragraph", "name": "Footer", "basedOn": "Normal", "next": "Normal", "link": "Footer Char", "paragraphFormat": { "afterSpacing": 0.0, "lineSpacing": 1.0, "lineSpacingType": "Multiple", "tabs": [{ "tabJustification": "Center", "position": 234.0, "tabLeader": "None", "deletePosition": 0.0 }, { "tabJustification": "Right", "position": 460.0, "tabLeader": "None", "deletePosition": 0.0 }] } }, { "type": "Character", "name": "Footer Char", "basedOn": "Default Paragraph Font" }, { "type": "Paragraph", "name": "Title", "basedOn": "Normal", "next": "Normal", "link": "Title Char", "characterFormat": { "fontSize": 28.0, "fontFamily": "Calibri Light" }, "paragraphFormat": { "afterSpacing": 0.0, "lineSpacing": 1.0, "lineSpacingType": "Multiple" } }, { "type": "Character", "name": "Title Char", "basedOn": "Default Paragraph Font", "characterFormat": { "fontSize": 28.0, "fontFamily": "Calibri Light" } }] };
        // tslint:enable        
        let waitingPopUp: HTMLElement = document.getElementById('waiting-popup');
        let popupOverlay: HTMLElement = document.getElementById('popup-overlay');
        waitingPopUp.style.display = 'block';
        this.documenteditor.open(JSON.stringify(defaultDocument));
        this.documenteditor.documentName = 'Headers and Footers';
        waitingPopUp.style.display = 'none';
        popupOverlay.style.display = 'none';
        this.documenteditor.focusIn();
        this.fontProperties.updateStyles();
    }
    onWindowResize = (): void => {
        this.updateContainerSize();
    }
}