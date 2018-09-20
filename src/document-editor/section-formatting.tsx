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
export class SectionFormatView extends SampleBase<{}, {}> {
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
                <p>This example demonstrates section formatting options in document editor such as page margins, page size, header distance from top, and footer distance from bottom.</p>
            </div>
            <div id="description">
                <div>
                    <p>Section formatting features in document editor.</p>
                    <ul>
                        <li>Page size and page margins.</li>
                        <li>Header distance from the top.</li>
                        <li>Footer distance from the bottom.</li>
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
        document.getElementById('newTab').setAttribute('href', location.href.split('#')[0] + 'document-editor/section-formatting/index.html#fabric');
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
        let defaultDocument: object = { "sections": [{ "blocks": [{ "paragraphFormat": { "styleName": "Title" }, "inlines": [{ "text": "First Section" }] }, { "paragraphFormat": { "styleName": "Subtitle" }, "inlines": [{ "text": "Size " }, { "text": "816x1056" }, { "text": "px" }, { "text": " (Portrait)" }] }, { "paragraphFormat": { "styleName": "Subtitle" }, "inlines": [{ "text": "Margin 96px (" }, { "text": "top and bottom) " }, { "text": "72px (left and right)" }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "Lorem ipsum dolor sit " }, { "text": "amet" }, { "text": ", " }, { "text": "consectetur" }, { "text": " " }, { "text": "adipiscing" }, { "text": " " }, { "text": "elit" }, { "text": ", " }, { "text": "sed" }, { "text": " do " }, { "text": "eiusmod" }, { "text": " " }, { "text": "tempor" }, { "text": " " }, { "text": "incididunt" }, { "text": " " }, { "text": "ut" }, { "text": " " }, { "text": "labore" }, { "text": " et dolore magna " }, { "text": "aliqua" }, { "text": ". Ut " }, { "text": "enim" }, { "text": " ad minim " }, { "text": "veniam" }, { "text": ", " }, { "text": "quis" }, { "text": " " }, { "text": "nostrud" }, { "text": " exercitation " }, { "text": "ullamco" }, { "text": " " }, { "text": "laboris" }, { "text": " nisi " }, { "text": "ut" }, { "text": " " }, { "text": "aliquip" }, { "text": " ex " }, { "text": "ea" }, { "text": " " }, { "text": "commodo" }, { "text": " " }, { "text": "consequat" }, { "text": ". Duis " }, { "text": "aute" }, { "text": " " }, { "text": "irure" }, { "text": " dolor in " }, { "text": "reprehenderit" }, { "text": " in " }, { "text": "voluptate" }, { "text": " " }, { "text": "velit" }, { "text": " " }, { "text": "esse" }, { "text": " " }, { "text": "cillum" }, { "text": " dolore " }, { "text": "eu" }, { "text": " " }, { "text": "fugiat" }, { "text": " " }, { "text": "nulla" }, { "text": " " }, { "text": "pariatur" }, { "text": ". " }, { "text": "Excepteur" }, { "text": " " }, { "text": "sint" }, { "text": " " }, { "text": "occaecat" }, { "text": " " }, { "text": "cupidatat" }, { "text": " non " }, { "text": "proident" }, { "text": ", " }, { "text": "sunt" }, { "text": " in culpa qui " }, { "text": "officia" }, { "text": " " }, { "text": "deserunt" }, { "text": " " }, { "text": "mollit" }, { "text": " " }, { "text": "anim" }, { "text": " id " }, { "text": "est" }, { "text": " " }, { "text": "laborum" }, { "text": "." }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "Sed" }, { "text": " " }, { "text": "ut" }, { "text": " " }, { "text": "perspiciatis" }, { "text": " " }, { "text": "unde" }, { "text": " " }, { "text": "omnis" }, { "text": " " }, { "text": "iste" }, { "text": " " }, { "text": "natus" }, { "text": " error sit " }, { "text": "voluptatem" }, { "text": " " }, { "text": "accusantium" }, { "text": " " }, { "text": "doloremque" }, { "text": " " }, { "text": "laudantium" }, { "text": ", " }, { "text": "totam" }, { "text": " rem " }, { "text": "aperiam" }, { "text": ", " }, { "text": "eaque" }, { "text": " " }, { "text": "ipsa" }, { "text": " " }, { "text": "quae" }, { "text": " ab " }, { "text": "illo" }, { "text": " " }, { "text": "inventore" }, { "text": " " }, { "text": "veritatis" }, { "text": " et quasi " }, { "text": "architecto" }, { "text": " " }, { "text": "beatae" }, { "text": " vitae dicta " }, { "text": "sunt" }, { "text": " " }, { "text": "explicabo" }, { "text": ". Nemo " }, { "text": "enim" }, { "text": " " }, { "text": "ipsam" }, { "text": " " }, { "text": "voluptatem" }, { "text": " " }, { "text": "quia" }, { "text": " " }, { "text": "voluptas" }, { "text": " sit " }, { "text": "aspernatur" }, { "text": " " }, { "text": "aut" }, { "text": " " }, { "text": "odit" }, { "text": " " }, { "text": "aut" }, { "text": " fugit, " }, { "text": "sed" }, { "text": " " }, { "text": "quia" }, { "text": " " }, { "text": "consequuntur" }, { "text": " " }, { "text": "magni" }, { "text": " " }, { "text": "dolores" }, { "text": " " }, { "text": "eos" }, { "text": " qui " }, { "text": "ratione" }, { "text": " " }, { "text": "voluptatem" }, { "text": " " }, { "text": "sequi" }, { "text": " " }, { "text": "nesciunt" }, { "text": ". " }, { "text": "Neque" }, { "text": " " }, { "text": "porro" }, { "text": " " }, { "text": "quisquam" }, { "text": " " }, { "text": "est" }, { "text": ", qui " }, { "text": "dolorem" }, { "text": " ipsum " }, { "text": "quia" }, { "text": " dolor sit " }, { "text": "amet" }, { "text": ", " }, { "text": "consectetur" }, { "text": ", " }, { "text": "adipisci" }, { "text": " " }, { "text": "velit" }, { "text": ", " }, { "text": "sed" }, { "text": " " }, { "text": "quia" }, { "text": " non " }, { "text": "numquam" }, { "text": " " }, { "text": "eius" }, { "text": " " }, { "text": "modi" }, { "text": " " }, { "text": "tempora" }, { "text": " " }, { "text": "incidunt" }, { "text": " " }, { "text": "ut" }, { "text": " " }, { "text": "labore" }, { "text": " et dolore " }, { "text": "magnam" }, { "text": " " }, { "text": "aliquam" }, { "text": " " }, { "text": "quaerat" }, { "text": " " }, { "text": "voluptatem" }, { "text": ". Ut " }, { "text": "enim" }, { "text": " ad minima " }, { "text": "veniam" }, { "text": ", " }, { "text": "quis" }, { "text": " nostrum " }, { "text": "exercitationem" }, { "text": " " }, { "text": "ullam" }, { "text": " corporis " }, { "text": "suscipit" }, { "text": " " }, { "text": "laboriosam" }, { "text": ", nisi " }, { "text": "ut" }, { "text": " " }, { "text": "aliquid" }, { "text": " ex " }, { "text": "ea" }, { "text": " " }, { "text": "commodi" }, { "text": " " }, { "text": "consequatur" }, { "text": "? " }, { "text": "Quis" }, { "text": " " }, { "text": "autem" }, { "text": " " }, { "text": "vel" }, { "text": " " }, { "text": "eum" }, { "text": " " }, { "text": "iure" }, { "text": " " }, { "text": "reprehenderit" }, { "text": " qui in " }, { "text": "ea" }, { "text": " " }, { "text": "voluptate" }, { "text": " " }, { "text": "velit" }, { "text": " " }, { "text": "esse" }, { "text": " " }, { "text": "quam" }, { "text": " nihil " }, { "text": "molestiae" }, { "text": " " }, { "text": "consequatur" }, { "text": ", " }, { "text": "vel" }, { "text": " " }, { "text": "illum" }, { "text": " qui " }, { "text": "dolorem" }, { "text": " " }, { "text": "eum" }, { "text": " " }, { "text": "fugiat" }, { "text": " quo " }, { "text": "voluptas" }, { "text": " " }, { "text": "nulla" }, { "text": " " }, { "text": "pariatur" }, { "text": "?" }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "At " }, { "text": "vero" }, { "text": " " }, { "text": "eos" }, { "text": " et " }, { "text": "accusamus" }, { "text": " et " }, { "text": "iusto" }, { "text": " " }, { "text": "odio" }, { "text": " " }, { "text": "dignissimos" }, { "text": " " }, { "text": "ducimus" }, { "text": " qui " }, { "text": "blanditiis" }, { "text": " " }, { "text": "praesentium" }, { "text": " " }, { "text": "voluptatum" }, { "text": " " }, { "text": "deleniti" }, { "text": " " }, { "text": "atque" }, { "text": " " }, { "text": "corrupti" }, { "text": " quos " }, { "text": "dolores" }, { "text": " et " }, { "text": "quas" }, { "text": " " }, { "text": "molestias" }, { "text": " " }, { "text": "excepturi" }, { "text": " " }, { "text": "sint" }, { "text": " " }, { "text": "occaecati" }, { "text": " " }, { "text": "cupiditate" }, { "text": " " }, { "text": "non provident" }, { "text": ", " }, { "text": "similique" }, { "text": " " }, { "text": "sunt" }, { "text": " in culpa qui " }, { "text": "officia" }, { "text": " " }, { "text": "deserunt" }, { "text": " " }, { "text": "mollitia" }, { "text": " animi, id " }, { "text": "est" }, { "text": " " }, { "text": "laborum" }, { "text": " et " }, { "text": "dolorum" }, { "text": " " }, { "text": "fuga" }, { "text": ". Et " }, { "text": "harum" }, { "text": " " }, { "text": "quidem" }, { "text": " rerum facilis " }, { "text": "est" }, { "text": " et " }, { "text": "expedita" }, { "text": " " }, { "text": "distinctio" }, { "text": ". Nam libero tempore, cum " }, { "text": "soluta" }, { "text": " nobis " }, { "text": "est" }, { "text": " " }, { "text": "eligendi" }, { "text": " " }, { "text": "optio" }, { "text": " " }, { "text": "cumque" }, { "text": " nihil " }, { "text": "impedit" }, { "text": " quo minus id quod " }, { "text": "maxime" }, { "text": " " }, { "text": "placeat" }, { "text": " " }, { "text": "facere" }, { "text": " " }, { "text": "possimus" }, { "text": ", " }, { "text": "omnis" }, { "text": " " }, { "text": "voluptas" }, { "text": " " }, { "text": "assumenda" }, { "text": " " }, { "text": "est" }, { "text": ", " }, { "text": "omnis" }, { "text": " dolor " }, { "text": "repellendus" }, { "text": ". " }, { "text": "Temporibus" }, { "text": " " }, { "text": "autem" }, { "text": " " }, { "text": "quibusdam" }, { "text": " et " }, { "text": "aut" }, { "text": " " }, { "text": "officiis" }, { "text": " " }, { "text": "debitis" }, { "text": " " }, { "text": "aut" }, { "text": " rerum " }, { "text": "necessitatibus" }, { "text": " " }, { "text": "saepe" }, { "text": " " }, { "text": "eveniet" }, { "text": " " }, { "text": "ut" }, { "text": " et " }, { "text": "voluptates" }, { "text": " " }, { "text": "repudiandae" }, { "text": " " }, { "text": "sint" }, { "text": " et " }, { "text": "molestiae" }, { "text": " non " }, { "text": "recusandae" }, { "text": ". " }, { "text": "Itaque" }, { "text": " " }, { "text": "earum" }, { "text": " rerum hic " }, { "text": "tenetur" }, { "text": " a " }, { "text": "sapiente" }, { "text": " " }, { "text": "delectus" }, { "text": ", " }, { "text": "ut" }, { "text": " " }, { "text": "aut" }, { "text": " " }, { "text": "reiciendis" }, { "text": " " }, { "text": "voluptatibus" }, { "text": " " }, { "text": "maiores" }, { "text": " alias " }, { "text": "consequatur" }, { "text": " " }, { "text": "aut" }, { "text": " " }, { "text": "perferendis" }, { "text": " " }, { "text": "doloribus" }, { "text": " " }, { "text": "asperiores" }, { "text": " " }, { "text": "repellat" }, { "text": "." }] }], "headersFooters": { "header": { "blocks": [{ "paragraphFormat": { "textAlignment": "Right", "styleName": "Header" }, "inlines": [{ "text": "Header distance from top is 72px" }] }] }, "footer": { "blocks": [{ "paragraphFormat": { "textAlignment": "Right", "styleName": "Footer", "tabs": [{ "tabJustification": "Left", "position": 0.0, "tabLeader": "None", "deletePosition": 234.0 }] }, "inlines": [{ "text": "Footer distance from bottom is 48px" }] }] } }, "sectionFormat": { "headerDistance": 54.0, "footerDistance": 36.0, "pageWidth": 595.29998779296875, "pageHeight": 841.9000244140625, "leftMargin": 54.0, "rightMargin": 54.0, "topMargin": 72.0, "bottomMargin": 72.0, "differentFirstPage": false, "differentOddAndEvenPages": false } }, { "blocks": [{ "paragraphFormat": { "styleName": "Title" }, "inlines": [{ "text": "Second Section" }] }, { "paragraphFormat": { "styleName": "Subtitle" }, "inlines": [{ "text": "Size 1056x816px (Landscape)" }, { "name": "_GoBack", "bookmarkType": 0 }, { "name": "_GoBack", "bookmarkType": 1 }] }, { "paragraphFormat": { "styleName": "Subtitle" }, "inlines": [{ "text": "Margin 48px (on all sides)" }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "Lorem ipsum dolor sit " }, { "text": "amet" }, { "text": ", " }, { "text": "consectetur" }, { "text": " " }, { "text": "adipiscing" }, { "text": " " }, { "text": "elit" }, { "text": ", " }, { "text": "sed" }, { "text": " do " }, { "text": "eiusmod" }, { "text": " " }, { "text": "tempor" }, { "text": " " }, { "text": "incididunt" }, { "text": " " }, { "text": "ut" }, { "text": " " }, { "text": "labore" }, { "text": " et dolore magna " }, { "text": "aliqua" }, { "text": ". Ut " }, { "text": "enim" }, { "text": " ad minim " }, { "text": "veniam" }, { "text": ", " }, { "text": "quis" }, { "text": " " }, { "text": "nostrud" }, { "text": " exercitation " }, { "text": "ullamco" }, { "text": " " }, { "text": "laboris" }, { "text": " nisi " }, { "text": "ut" }, { "text": " " }, { "text": "aliquip" }, { "text": " ex " }, { "text": "ea" }, { "text": " " }, { "text": "commodo" }, { "text": " " }, { "text": "consequat" }, { "text": ". Duis " }, { "text": "aute" }, { "text": " " }, { "text": "irure" }, { "text": " dolor in " }, { "text": "reprehenderit" }, { "text": " in " }, { "text": "voluptate" }, { "text": " " }, { "text": "velit" }, { "text": " " }, { "text": "esse" }, { "text": " " }, { "text": "cillum" }, { "text": " dolore " }, { "text": "eu" }, { "text": " " }, { "text": "fugiat" }, { "text": " " }, { "text": "nulla" }, { "text": " " }, { "text": "pariatur" }, { "text": ". " }, { "text": "Excepteur" }, { "text": " " }, { "text": "sint" }, { "text": " " }, { "text": "occaecat" }, { "text": " " }, { "text": "cupidatat" }, { "text": " non " }, { "text": "proident" }, { "text": ", " }, { "text": "sunt" }, { "text": " in culpa qui " }, { "text": "officia" }, { "text": " " }, { "text": "deserunt" }, { "text": " " }, { "text": "mollit" }, { "text": " " }, { "text": "anim" }, { "text": " id " }, { "text": "est" }, { "text": " " }, { "text": "laborum" }, { "text": "." }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "Sed" }, { "text": " " }, { "text": "ut" }, { "text": " " }, { "text": "perspiciatis" }, { "text": " " }, { "text": "unde" }, { "text": " " }, { "text": "omnis" }, { "text": " " }, { "text": "iste" }, { "text": " " }, { "text": "natus" }, { "text": " error sit " }, { "text": "voluptatem" }, { "text": " " }, { "text": "accusantium" }, { "text": " " }, { "text": "doloremque" }, { "text": " " }, { "text": "laudantium" }, { "text": ", " }, { "text": "totam" }, { "text": " rem " }, { "text": "aperiam" }, { "text": ", " }, { "text": "eaque" }, { "text": " " }, { "text": "ipsa" }, { "text": " " }, { "text": "quae" }, { "text": " ab " }, { "text": "illo" }, { "text": " " }, { "text": "inventore" }, { "text": " " }, { "text": "veritatis" }, { "text": " et quasi " }, { "text": "architecto" }, { "text": " " }, { "text": "beatae" }, { "text": " vitae dicta " }, { "text": "sunt" }, { "text": " " }, { "text": "explicabo" }, { "text": ". Nemo " }, { "text": "enim" }, { "text": " " }, { "text": "ipsam" }, { "text": " " }, { "text": "voluptatem" }, { "text": " " }, { "text": "quia" }, { "text": " " }, { "text": "voluptas" }, { "text": " sit " }, { "text": "aspernatur" }, { "text": " " }, { "text": "aut" }, { "text": " " }, { "text": "odit" }, { "text": " " }, { "text": "aut" }, { "text": " fugit, " }, { "text": "sed" }, { "text": " " }, { "text": "quia" }, { "text": " " }, { "text": "consequuntur" }, { "text": " " }, { "text": "magni" }, { "text": " " }, { "text": "dolores" }, { "text": " " }, { "text": "eos" }, { "text": " qui " }, { "text": "ratione" }, { "text": " " }, { "text": "voluptatem" }, { "text": " " }, { "text": "sequi" }, { "text": " " }, { "text": "nesciunt" }, { "text": ". " }, { "text": "Neque" }, { "text": " " }, { "text": "porro" }, { "text": " " }, { "text": "quisquam" }, { "text": " " }, { "text": "est" }, { "text": ", qui " }, { "text": "dolorem" }, { "text": " ipsum " }, { "text": "quia" }, { "text": " dolor sit " }, { "text": "amet" }, { "text": ", " }, { "text": "consectetur" }, { "text": ", " }, { "text": "adipisci" }, { "text": " " }, { "text": "velit" }, { "text": ", " }, { "text": "sed" }, { "text": " " }, { "text": "quia" }, { "text": " non " }, { "text": "numquam" }, { "text": " " }, { "text": "eius" }, { "text": " " }, { "text": "modi" }, { "text": " " }, { "text": "tempora" }, { "text": " " }, { "text": "incidunt" }, { "text": " " }, { "text": "ut" }, { "text": " " }, { "text": "labore" }, { "text": " et dolore " }, { "text": "magnam" }, { "text": " " }, { "text": "aliquam" }, { "text": " " }, { "text": "quaerat" }, { "text": " " }, { "text": "voluptatem" }, { "text": ". Ut " }, { "text": "enim" }, { "text": " ad minima " }, { "text": "veniam" }, { "text": ", " }, { "text": "quis" }, { "text": " nostrum " }, { "text": "exercitationem" }, { "text": " " }, { "text": "ullam" }, { "text": " corporis " }, { "text": "suscipit" }, { "text": " " }, { "text": "laboriosam" }, { "text": ", nisi " }, { "text": "ut" }, { "text": " " }, { "text": "aliquid" }, { "text": " ex " }, { "text": "ea" }, { "text": " " }, { "text": "commodi" }, { "text": " " }, { "text": "consequatur" }, { "text": "? " }, { "text": "Quis" }, { "text": " " }, { "text": "autem" }, { "text": " " }, { "text": "vel" }, { "text": " " }, { "text": "eum" }, { "text": " " }, { "text": "iure" }, { "text": " " }, { "text": "reprehenderit" }, { "text": " qui in " }, { "text": "ea" }, { "text": " " }, { "text": "voluptate" }, { "text": " " }, { "text": "velit" }, { "text": " " }, { "text": "esse" }, { "text": " " }, { "text": "quam" }, { "text": " nihil " }, { "text": "molestiae" }, { "text": " " }, { "text": "consequatur" }, { "text": ", " }, { "text": "vel" }, { "text": " " }, { "text": "illum" }, { "text": " qui " }, { "text": "dolorem" }, { "text": " " }, { "text": "eum" }, { "text": " " }, { "text": "fugiat" }, { "text": " quo " }, { "text": "voluptas" }, { "text": " " }, { "text": "nulla" }, { "text": " " }, { "text": "pariatur" }, { "text": "?" }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "At " }, { "text": "vero" }, { "text": " " }, { "text": "eos" }, { "text": " et " }, { "text": "accusamus" }, { "text": " et " }, { "text": "iusto" }, { "text": " " }, { "text": "odio" }, { "text": " " }, { "text": "dignissimos" }, { "text": " " }, { "text": "ducimus" }, { "text": " qui " }, { "text": "blanditiis" }, { "text": " " }, { "text": "praesentium" }, { "text": " " }, { "text": "voluptatum" }, { "text": " " }, { "text": "deleniti" }, { "text": " " }, { "text": "atque" }, { "text": " " }, { "text": "corrupti" }, { "text": " quos " }, { "text": "dolores" }, { "text": " et " }, { "text": "quas" }, { "text": " " }, { "text": "molestias" }, { "text": " " }, { "text": "excepturi" }, { "text": " " }, { "text": "sint" }, { "text": " " }, { "text": "occaecati" }, { "text": " " }, { "text": "cupiditate" }, { "text": " " }, { "text": "non provident" }, { "text": ", " }, { "text": "similique" }, { "text": " " }, { "text": "sunt" }, { "text": " in culpa qui " }, { "text": "officia" }, { "text": " " }, { "text": "deserunt" }, { "text": " " }, { "text": "mollitia" }, { "text": " animi, id " }, { "text": "est" }, { "text": " " }, { "text": "laborum" }, { "text": " et " }, { "text": "dolorum" }, { "text": " " }, { "text": "fuga" }, { "text": ". Et " }, { "text": "harum" }, { "text": " " }, { "text": "quidem" }, { "text": " rerum facilis " }, { "text": "est" }, { "text": " et " }, { "text": "expedita" }, { "text": " " }, { "text": "distinctio" }, { "text": ". Nam libero tempore, cum " }, { "text": "soluta" }, { "text": " nobis " }, { "text": "est" }, { "text": " " }, { "text": "eligendi" }, { "text": " " }, { "text": "optio" }, { "text": " " }, { "text": "cumque" }, { "text": " nihil " }, { "text": "impedit" }, { "text": " quo minus id quod " }, { "text": "maxime" }, { "text": " " }, { "text": "placeat" }, { "text": " " }, { "text": "facere" }, { "text": " " }, { "text": "possimus" }, { "text": ", " }, { "text": "omnis" }, { "text": " " }, { "text": "voluptas" }, { "text": " " }, { "text": "assumenda" }, { "text": " " }, { "text": "est" }, { "text": ", " }, { "text": "omnis" }, { "text": " dolor " }, { "text": "repellendus" }, { "text": ". " }, { "text": "Temporibus" }, { "text": " " }, { "text": "autem" }, { "text": " " }, { "text": "quibusdam" }, { "text": " et " }, { "text": "aut" }, { "text": " " }, { "text": "officiis" }, { "text": " " }, { "text": "debitis" }, { "text": " " }, { "text": "aut" }, { "text": " rerum " }, { "text": "necessitatibus" }, { "text": " " }, { "text": "saepe" }, { "text": " " }, { "text": "eveniet" }, { "text": " " }, { "text": "ut" }, { "text": " et " }, { "text": "voluptates" }, { "text": " " }, { "text": "repudiandae" }, { "text": " " }, { "text": "sint" }, { "text": " et " }, { "text": "molestiae" }, { "text": " non " }, { "text": "recusandae" }, { "text": ". " }, { "text": "Itaque" }, { "text": " " }, { "text": "earum" }, { "text": " rerum hic " }, { "text": "tenetur" }, { "text": " a " }, { "text": "sapiente" }, { "text": " " }, { "text": "delectus" }, { "text": ", " }, { "text": "ut" }, { "text": " " }, { "text": "aut" }, { "text": " " }, { "text": "reiciendis" }, { "text": " " }, { "text": "voluptatibus" }, { "text": " " }, { "text": "maiores" }, { "text": " alias " }, { "text": "consequatur" }, { "text": " " }, { "text": "aut" }, { "text": " " }, { "text": "perferendis" }, { "text": " " }, { "text": "doloribus" }, { "text": " " }, { "text": "asperiores" }, { "text": " " }, { "text": "repellat" }, { "text": "." }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }], "headersFooters": { "header": { "blocks": [{ "paragraphFormat": { "textAlignment": "Right", "styleName": "Header" }, "inlines": [{ "text": "Header distance from top is 24px" }] }] }, "footer": { "blocks": [{ "paragraphFormat": { "textAlignment": "Right", "styleName": "Footer", "tabs": [{ "tabJustification": "Left", "position": 0.0, "tabLeader": "None", "deletePosition": 234.0 }] }, "inlines": [{ "text": "Footer distance from bottom is 24px" }] }] } }, "sectionFormat": { "headerDistance": 18.0, "footerDistance": 18.0, "pageWidth": 792.0, "pageHeight": 612.0, "leftMargin": 36.0, "rightMargin": 36.0, "topMargin": 36.0, "bottomMargin": 36.0, "differentFirstPage": false, "differentOddAndEvenPages": false } }], "characterFormat": { "fontSize": 11.0, "fontFamily": "Calibri" }, "paragraphFormat": { "afterSpacing": 8.0, "lineSpacing": 1.0791666507720947, "lineSpacingType": "Multiple" }, "background": { "color": "#FFFFFFFF" }, "styles": [{ "type": "Paragraph", "name": "Normal", "next": "Normal" }, { "type": "Character", "name": "Default Paragraph Font" }, { "type": "Paragraph", "name": "Notes", "basedOn": "Normal", "next": "Normal", "characterFormat": { "bold": true }, "paragraphFormat": { "afterSpacing": 6.0, "lineSpacing": 1.0, "lineSpacingType": "Multiple" } }, { "type": "Paragraph", "name": "Title", "basedOn": "Normal", "next": "Normal", "link": "Title Char", "characterFormat": { "fontSize": 28.0, "fontFamily": "Calibri Light" }, "paragraphFormat": { "afterSpacing": 0.0, "lineSpacing": 1.0, "lineSpacingType": "Multiple" } }, { "type": "Character", "name": "Title Char", "basedOn": "Default Paragraph Font", "characterFormat": { "fontSize": 28.0, "fontFamily": "Calibri Light" } }, { "type": "Paragraph", "name": "Subtitle", "basedOn": "Normal", "next": "Normal", "link": "Subtitle Char", "characterFormat": { "fontColor": "#5A5A5AFF" }, "paragraphFormat": { "listFormat": { "listLevelNumber": 1 } } }, { "type": "Character", "name": "Subtitle Char", "basedOn": "Default Paragraph Font", "characterFormat": { "fontColor": "#5A5A5AFF" } }, { "type": "Paragraph", "name": "Header", "basedOn": "Normal", "next": "Normal", "link": "Header Char", "paragraphFormat": { "afterSpacing": 0.0, "lineSpacing": 1.0, "lineSpacingType": "Multiple", "tabs": [{ "tabJustification": "Center", "position": 234.0, "tabLeader": "None", "deletePosition": 0.0 }, { "tabJustification": "Right", "position": 468.0, "tabLeader": "None", "deletePosition": 0.0 }] } }, { "type": "Character", "name": "Header Char", "basedOn": "Default Paragraph Font" }, { "type": "Paragraph", "name": "Footer", "basedOn": "Normal", "next": "Normal", "link": "Footer Char", "paragraphFormat": { "afterSpacing": 0.0, "lineSpacing": 1.0, "lineSpacingType": "Multiple", "tabs": [{ "tabJustification": "Center", "position": 234.0, "tabLeader": "None", "deletePosition": 0.0 }, { "tabJustification": "Right", "position": 468.0, "tabLeader": "None", "deletePosition": 0.0 }] } }, { "type": "Character", "name": "Footer Char", "basedOn": "Default Paragraph Font" }] };
        // tslint:enable        
        let waitingPopUp: HTMLElement = document.getElementById('waiting-popup');
        let popupOverlay: HTMLElement = document.getElementById('popup-overlay');
        waitingPopUp.style.display = 'block';
        this.documenteditor.open(JSON.stringify(defaultDocument));
        this.documenteditor.documentName = 'Section Formatting';
        waitingPopUp.style.display = 'none';
        popupOverlay.style.display = 'none';
        this.documenteditor.focusIn();
        this.fontProperties.updateStyles();
    }
    onWindowResize = (): void => {
        this.updateContainerSize();
    }
}