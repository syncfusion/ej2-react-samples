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
export class BulletsAndNumberingView extends SampleBase<{}, {}> {
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
                <p>This example demonstrates bullets and numbering support in document editor. Both single list and multi-level lists are supported.</p>
            </div>
            <div id="description">
                <div>
                    <p>In this example, you can use, add, or modify the list formatting in document editor.</p>
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
        document.getElementById('newTab').setAttribute('href', location.href.split('#')[0] + 'document-editor/bullets-and-numbering/index.html#fabric');
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
        let defaultDocument: object ={"sections":[{"blocks":[{"characterFormat":{"fontColor":"#4472C4FF"},"paragraphFormat":{"afterSpacing":36.0,"styleName":"Normal"},"inlines":[{"text":"Types of Animals","characterFormat":{"fontSize":18.0,"fontFamily":"Monotype Corsiva","fontColor":"#4472C4FF"}}]},{"characterFormat":{"bold":true},"paragraphFormat":{"styleName":"List Paragraph","listFormat":{"listLevelNumber":0,"listId":0}},"inlines":[{"text":"Mammals","characterFormat":{"bold":true}}]},{"paragraphFormat":{"styleName":"List Paragraph","listFormat":{"listLevelNumber":1,"listId":0}},"inlines":[{"text":"body covered by hair or fur"}]},{"paragraphFormat":{"styleName":"List Paragraph","listFormat":{"listLevelNumber":1,"listId":0}},"inlines":[{"text":"warm-blooded"}]},{"paragraphFormat":{"styleName":"List Paragraph","listFormat":{"listLevelNumber":1,"listId":0}},"inlines":[{"text":"have a backbone"}]},{"paragraphFormat":{"styleName":"List Paragraph","listFormat":{"listLevelNumber":1,"listId":0}},"inlines":[{"text":"produce milk"}]},{"paragraphFormat":{"styleName":"List Paragraph","listFormat":{"listLevelNumber":1,"listId":0}},"inlines":[{"text":"Examples"}]},{"paragraphFormat":{"styleName":"List Paragraph","listFormat":{"listLevelNumber":2,"listId":0}},"inlines":[{"text":"Tiger"}]},{"paragraphFormat":{"styleName":"List Paragraph","listFormat":{"listLevelNumber":2,"listId":0}},"inlines":[{"text":"Bat"}]},{"characterFormat":{"bold":true},"paragraphFormat":{"styleName":"List Paragraph","listFormat":{"listLevelNumber":0,"listId":0}},"inlines":[{"text":"Reptiles","characterFormat":{"bold":true}}]},{"paragraphFormat":{"styleName":"List Paragraph","listFormat":{"listLevelNumber":1,"listId":0}},"inlines":[{"text":"body covered by scales"}]},{"paragraphFormat":{"styleName":"List Paragraph","listFormat":{"listLevelNumber":1,"listId":0}},"inlines":[{"text":"cold-blooded"}]},{"paragraphFormat":{"styleName":"List Paragraph","listFormat":{"listLevelNumber":1,"listId":0}},"inlines":[{"text":"have a backbone"}]},{"paragraphFormat":{"styleName":"List Paragraph","listFormat":{"listLevelNumber":1,"listId":0}},"inlines":[{"text":"most lay "},{"text":"hard-shelled"},{"text":" eggs on land"}]},{"paragraphFormat":{"styleName":"List Paragraph","listFormat":{"listLevelNumber":1,"listId":0}},"inlines":[{"text":"Examples"}]},{"paragraphFormat":{"styleName":"List Paragraph","listFormat":{"listLevelNumber":2,"listId":0}},"inlines":[{"text":"Snake"}]},{"paragraphFormat":{"styleName":"List Paragraph","listFormat":{"listLevelNumber":2,"listId":0}},"inlines":[{"text":"Lizard"}]},{"characterFormat":{"bold":true},"paragraphFormat":{"styleName":"List Paragraph","listFormat":{"listLevelNumber":0,"listId":0}},"inlines":[{"text":"Birds","characterFormat":{"bold":true}}]},{"paragraphFormat":{"styleName":"List Paragraph","listFormat":{"listLevelNumber":1,"listId":0}},"inlines":[{"text":"body covered by feathers"}]},{"paragraphFormat":{"styleName":"List Paragraph","listFormat":{"listLevelNumber":1,"listId":0}},"inlines":[{"text":"warm-blooded"}]},{"paragraphFormat":{"styleName":"List Paragraph","listFormat":{"listLevelNumber":1,"listId":0}},"inlines":[{"text":"have a backbone"}]},{"paragraphFormat":{"styleName":"List Paragraph","listFormat":{"listLevelNumber":1,"listId":0}},"inlines":[{"text":"lay eggs"}]},{"paragraphFormat":{"styleName":"List Paragraph","listFormat":{"listLevelNumber":1,"listId":0}},"inlines":[{"text":"Examples"}]},{"paragraphFormat":{"styleName":"List Paragraph","listFormat":{"listLevelNumber":2,"listId":0}},"inlines":[{"text":"Pigeon"}]},{"paragraphFormat":{"styleName":"List Paragraph","listFormat":{"listLevelNumber":2,"listId":0}},"inlines":[{"text":"Hen"}]},{"characterFormat":{"bold":true},"paragraphFormat":{"styleName":"List Paragraph","listFormat":{"listLevelNumber":0,"listId":0}},"inlines":[{"text":"Insects","characterFormat":{"bold":true}}]},{"paragraphFormat":{"styleName":"List Paragraph","listFormat":{"listLevelNumber":1,"listId":0}},"inlines":[{"text":"most are small air-breathing animals"}]},{"paragraphFormat":{"styleName":"List Paragraph","listFormat":{"listLevelNumber":1,"listId":0}},"inlines":[{"text":"6 legs"}]},{"paragraphFormat":{"styleName":"List Paragraph","listFormat":{"listLevelNumber":1,"listId":0}},"inlines":[{"text":"2 antennae"}]},{"paragraphFormat":{"styleName":"List Paragraph","listFormat":{"listLevelNumber":1,"listId":0}},"inlines":[{"text":"3 body sections (head, thorax, abdomen)"}]},{"paragraphFormat":{"styleName":"List Paragraph","listFormat":{"listLevelNumber":1,"listId":0}},"inlines":[{"text":"Examples"},{"name":"_GoBack","bookmarkType":0},{"name":"_GoBack","bookmarkType":1}]},{"paragraphFormat":{"styleName":"List Paragraph","listFormat":{"listLevelNumber":2,"listId":0}},"inlines":[{"text":"Butterfly"}]},{"paragraphFormat":{"styleName":"List Paragraph","listFormat":{"listLevelNumber":2,"listId":0}},"inlines":[{"text":"Spider"}]},{"characterFormat":{"bold":true},"paragraphFormat":{"styleName":"List Paragraph","listFormat":{"listLevelNumber":0,"listId":0}},"inlines":[{"text":"Aquatic Animals","characterFormat":{"bold":true}}]},{"paragraphFormat":{"styleName":"List Paragraph","listFormat":{"listLevelNumber":1,"listId":0}},"inlines":[{"text":"most have gills"}]},{"paragraphFormat":{"styleName":"List Paragraph","listFormat":{"listLevelNumber":1,"listId":0}},"inlines":[{"text":"found in lakes, rivers, and oceans"}]},{"paragraphFormat":{"styleName":"List Paragraph","listFormat":{"listLevelNumber":1,"listId":0}},"inlines":[{"text":"Examples"}]},{"paragraphFormat":{"styleName":"List Paragraph","listFormat":{"listLevelNumber":2,"listId":0}},"inlines":[{"text":"Blue Shark"}]},{"paragraphFormat":{"styleName":"List Paragraph","listFormat":{"listLevelNumber":2,"listId":0}},"inlines":[{"text":"Fish"}]}],"headersFooters":{},"sectionFormat":{"headerDistance":36.0,"footerDistance":36.0,"pageWidth":612.0,"pageHeight":792.0,"leftMargin":72.0,"rightMargin":72.0,"topMargin":72.0,"bottomMargin":72.0,"differentFirstPage":false,"differentOddAndEvenPages":false}}],"characterFormat":{"fontSize":11.0,"fontFamily":"Calibri"},"paragraphFormat":{"afterSpacing":8.0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple"},"lists":[{"listId":0,"abstractListId":0}],"abstractLists":[{"abstractListId":0,"levels":[{"startAt":1,"restartLevel":0,"listLevelPattern":"Arabic","followCharacter":"Tab","numberFormat":"%1.","characterFormat":{"bold":true,"italic":false},"paragraphFormat":{"leftIndent":18.0,"firstLineIndent":-18.0}},{"startAt":1,"restartLevel":1,"listLevelPattern":"Arabic","followCharacter":"Tab","numberFormat":"%1.%2.","characterFormat":{"bold":false,"italic":true},"paragraphFormat":{"leftIndent":39.599998474121094,"firstLineIndent":-21.600000381469727}},{"listLevelPattern":"Bullet","followCharacter":"Tab","numberFormat":"","characterFormat":{"fontFamily":"Symbol"},"paragraphFormat":{"leftIndent":61.200000762939453,"firstLineIndent":-25.200000762939453}},{"startAt":1,"restartLevel":3,"listLevelPattern":"Arabic","followCharacter":"Tab","numberFormat":"%1.%2.%3.%4.","paragraphFormat":{"leftIndent":86.4000015258789,"firstLineIndent":-32.400001525878906}},{"startAt":1,"restartLevel":4,"listLevelPattern":"Arabic","followCharacter":"Tab","numberFormat":"%1.%2.%3.%4.%5.","paragraphFormat":{"leftIndent":111.59999847412109,"firstLineIndent":-39.599998474121094}},{"startAt":1,"restartLevel":5,"listLevelPattern":"Arabic","followCharacter":"Tab","numberFormat":"%1.%2.%3.%4.%5.%6.","paragraphFormat":{"leftIndent":136.80000305175781,"firstLineIndent":-46.799999237060547}},{"startAt":1,"restartLevel":6,"listLevelPattern":"Arabic","followCharacter":"Tab","numberFormat":"%1.%2.%3.%4.%5.%6.%7.","paragraphFormat":{"leftIndent":162.0,"firstLineIndent":-54.0}},{"startAt":1,"restartLevel":7,"listLevelPattern":"Arabic","followCharacter":"Tab","numberFormat":"%1.%2.%3.%4.%5.%6.%7.%8.","paragraphFormat":{"leftIndent":187.19999694824219,"firstLineIndent":-61.200000762939453}},{"startAt":1,"restartLevel":8,"listLevelPattern":"Arabic","followCharacter":"Tab","numberFormat":"%1.%2.%3.%4.%5.%6.%7.%8.%9.","paragraphFormat":{"leftIndent":216.0,"firstLineIndent":-72.0}}]}],"background":{"color":"#FFFFFFFF"},"styles":[{"type":"Paragraph","name":"Normal","next":"Normal"},{"type":"Character","name":"Default Paragraph Font"},{"type":"Paragraph","name":"Notes","basedOn":"Normal","next":"Normal","characterFormat":{"bold":true},"paragraphFormat":{"afterSpacing":6.0,"lineSpacing":1.0,"lineSpacingType":"Multiple"}},{"type":"Paragraph","name":"List Paragraph","basedOn":"Normal","next":"List Paragraph","paragraphFormat":{"leftIndent":36.0}}]};
        // tslint:enable        
        let waitingPopUp: HTMLElement = document.getElementById('waiting-popup');
        let popupOverlay: HTMLElement = document.getElementById('popup-overlay');
        waitingPopUp.style.display = 'block';
        this.documenteditor.open(JSON.stringify(defaultDocument));
        this.documenteditor.documentName = 'Bullets and Numbering';
        waitingPopUp.style.display = 'none';
        popupOverlay.style.display = 'none';
        this.documenteditor.focusIn();
        this.fontProperties.updateStyles();
    }
    onWindowResize = (): void => {
        this.updateContainerSize();
    }
}