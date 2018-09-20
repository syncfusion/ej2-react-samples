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
export class TableOfContentsView extends SampleBase<{}, {}> {
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
                <p>This example demonstrates table of contents support in document editor. Many options are available for including table of contents such as hyperlink, page number, right-aligned tabs, and styles.</p>
            </div>
            <div id="description">
                <div>
                    <p>In this example, you can find table of content options in document editor.</p>
                    <ul>
                        <li>Include hyperlink: A link with bookmark reference to the content will be included.</li>
                        <li>Include page number: The page number of the content will be included.</li>
                        <li>Right-aligned tabs: The page number will be right-aligned to the content.</li>
                        <li>Heading levels: The range of heading levels to be included in the table can be customized.</li>
                        <li>Styles: The style for each level of the table can be customized.</li>
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
        document.getElementById('newTab').setAttribute('href', location.href.split('#')[0] + 'document-editor/table-of-contents/index.html#fabric');
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
        let defaultDocument: object = { "sections": [{ "blocks": [{ "paragraphFormat": { "styleName": "Title" }, "inlines": [{ "text": "ASP.NET Core Succinctly" }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }, { "characterFormat": { "fontSize": 16.0, "fontColor": "#4472C4FF" }, "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "Table of Contents", "characterFormat": { "fontSize": 16.0, "fontColor": "#4472C4FF" } }] }, { "paragraphFormat": { "styleName": "TOC 1", "tabs": [{ "tabJustification": "Right", "position": 467.5, "tabLeader": "Dot", "deletePosition": 0.0 }] }, "inlines": [{ "hasFieldEnd": true, "fieldType": 0 }, { "text": " TOC \\o \"1-3\" \\h \\z " }, { "fieldType": 2 }, { "hasFieldEnd": true, "fieldType": 0 }, { "text": "HYPERLINK \\l \"_Toc523388455\"" }, { "fieldType": 2 }, { "text": "Chapter 1 Introduction to ASP.NET Core", "characterFormat": {} }, { "text": "\t" }, { "hasFieldEnd": true, "fieldType": 0 }, { "text": " PAGEREF _Toc523388455 \\h " }, { "fieldType": 2 }, { "text": "1" }, { "fieldType": 1 }, { "fieldType": 1 }] }, { "paragraphFormat": { "styleName": "TOC 1", "tabs": [{ "tabJustification": "Right", "position": 467.5, "tabLeader": "Dot", "deletePosition": 0.0 }] }, "inlines": [{ "hasFieldEnd": true, "fieldType": 0 }, { "text": "HYPERLINK \\l \"_Toc523388456\"" }, { "fieldType": 2 }, { "text": "Chapter 2 What are .NET Core and ASP.NET Core?", "characterFormat": {} }, { "text": "\t" }, { "hasFieldEnd": true, "fieldType": 0 }, { "text": " PAGEREF _Toc523388456 \\h " }, { "fieldType": 2 }, { "text": "1" }, { "fieldType": 1 }, { "fieldType": 1 }] }, { "paragraphFormat": { "styleName": "TOC 2", "tabs": [{ "tabJustification": "Right", "position": 467.5, "tabLeader": "Dot", "deletePosition": 0.0 }] }, "inlines": [{ "hasFieldEnd": true, "fieldType": 0 }, { "text": "HYPERLINK \\l \"_Toc523388457\"" }, { "fieldType": 2 }, { "text": ".NET Core", "characterFormat": {} }, { "text": "\t" }, { "hasFieldEnd": true, "fieldType": 0 }, { "text": " PAGEREF _Toc523388457 \\h " }, { "fieldType": 2 }, { "text": "1" }, { "fieldType": 1 }, { "fieldType": 1 }] }, { "paragraphFormat": { "styleName": "TOC 2", "tabs": [{ "tabJustification": "Right", "position": 467.5, "tabLeader": "Dot", "deletePosition": 0.0 }] }, "inlines": [{ "hasFieldEnd": true, "fieldType": 0 }, { "text": "HYPERLINK \\l \"_Toc523388458\"" }, { "fieldType": 2 }, { "text": "ASP.NET Core", "characterFormat": {} }, { "text": "\t" }, { "hasFieldEnd": true, "fieldType": 0 }, { "text": " PAGEREF _Toc523388458 \\h " }, { "fieldType": 2 }, { "text": "1" }, { "fieldType": 1 }, { "fieldType": 1 }] }, { "paragraphFormat": { "styleName": "TOC 1", "tabs": [{ "tabJustification": "Right", "position": 467.5, "tabLeader": "Dot", "deletePosition": 0.0 }] }, "inlines": [{ "hasFieldEnd": true, "fieldType": 0 }, { "text": "HYPERLINK \\l \"_Toc523388459\"" }, { "fieldType": 2 }, { "text": "Chapter 3 Getting Started with .NET Core", "characterFormat": {} }, { "text": "\t" }, { "hasFieldEnd": true, "fieldType": 0 }, { "text": " PAGEREF _Toc523388459 \\h " }, { "fieldType": 2 }, { "text": "2" }, { "fieldType": 1 }, { "fieldType": 1 }] }, { "paragraphFormat": { "styleName": "TOC 2", "tabs": [{ "tabJustification": "Right", "position": 467.5, "tabLeader": "Dot", "deletePosition": 0.0 }] }, "inlines": [{ "hasFieldEnd": true, "fieldType": 0 }, { "text": "HYPERLINK \\l \"_Toc523388460\"" }, { "fieldType": 2 }, { "text": "Installing .NET Core on Windows", "characterFormat": {} }, { "text": "\t" }, { "hasFieldEnd": true, "fieldType": 0 }, { "text": " PAGEREF _Toc523388460 \\h " }, { "fieldType": 2 }, { "text": "2" }, { "fieldType": 1 }, { "fieldType": 1 }] }, { "paragraphFormat": { "styleName": "TOC 2", "tabs": [{ "tabJustification": "Right", "position": 467.5, "tabLeader": "Dot", "deletePosition": 0.0 }] }, "inlines": [{ "hasFieldEnd": true, "fieldType": 0 }, { "text": "HYPERLINK \\l \"_Toc523388461\"" }, { "fieldType": 2 }, { "text": "Installing .NET Core on a Mac (or Linux)", "characterFormat": {} }, { "text": "\t" }, { "hasFieldEnd": true, "fieldType": 0 }, { "text": " PAGEREF _Toc523388461 \\h " }, { "fieldType": 2 }, { "text": "2" }, { "fieldType": 1 }, { "fieldType": 1 }] }, { "paragraphFormat": { "styleName": "TOC 1", "tabs": [{ "tabJustification": "Right", "position": 467.5, "tabLeader": "Dot", "deletePosition": 0.0 }] }, "inlines": [{ "hasFieldEnd": true, "fieldType": 0 }, { "text": "HYPERLINK \\l \"_Toc523388462\"" }, { "fieldType": 2 }, { "text": "A Look at the Future", "characterFormat": {} }, { "text": "\t" }, { "hasFieldEnd": true, "fieldType": 0 }, { "text": " PAGEREF _Toc523388462 \\h " }, { "fieldType": 2 }, { "text": "2" }, { "fieldType": 1 }, { "fieldType": 1 }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "fieldType": 1 }, { "name": "_GoBack", "bookmarkType": 0 }, { "name": "_GoBack", "bookmarkType": 1 }] }, { "paragraphFormat": { "styleName": "Heading 1" }, "inlines": [{ "name": "_Toc523387945", "bookmarkType": 0 }, { "name": "_Toc523388455", "bookmarkType": 0 }, { "text": "Chapter 1 Introduction to ASP.NET Core" }, { "name": "_Toc523387945", "bookmarkType": 1 }, { "name": "_Toc523388455", "bookmarkType": 1 }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "ASP.NET Core is the web development framework that comes together with the new .NET Core and, besides all the new features, also adopts a significantly new approach to web development. The first chapter starts by going through the history of Microsoft's web stack to show the motivations that led to this framework. Later, it moves to more practical matters, like showing you how to get started with .NET Core and describing the foundations of the framework." }] }, { "paragraphFormat": { "styleName": "Heading 1" }, "inlines": [{ "name": "_Toc523387946", "bookmarkType": 0 }, { "name": "_Toc523388456", "bookmarkType": 0 }, { "text": "Chapter 2 What are .NET Core and ASP.NET Core?" }, { "name": "_Toc523387946", "bookmarkType": 1 }, { "name": "_Toc523388456", "bookmarkType": 1 }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "Before trying to understand the reason for its existence, let's first try to define what .NET Core and ASP.NET Core are." }] }, { "paragraphFormat": { "styleName": "Heading 2" }, "inlines": [{ "name": "_Toc523387947", "bookmarkType": 0 }, { "name": "_Toc523388457", "bookmarkType": 0 }, { "text": ".NET Core" }, { "name": "_Toc523387947", "bookmarkType": 1 }, { "name": "_Toc523388457", "bookmarkType": 1 }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "The framework .NET Core 1.1 a is modular, cross-platform, cloud-optimized version of the .NET Framework, consisting of the CoreCLR and the implementation of the .NET Standard Library 1.6. One of the main features of this library is the ability to install only the features that are needed for the application you are building, reducing its footprint and the possibility of installing the library itself within the application. This makes it possible for applications built with different versions to co-exist on the same machine without the compatibility problems typical of the full .NET Framework." }] }, { "paragraphFormat": { "styleName": "Heading 2" }, "inlines": [{ "name": "_Toc523387948", "bookmarkType": 0 }, { "name": "_Toc523388458", "bookmarkType": 0 }, { "text": "ASP.NET Core" }, { "name": "_Toc523387948", "bookmarkType": 1 }, { "name": "_Toc523388458", "bookmarkType": 1 }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "ASP.NET Core is a complete rewrite of ASP.NET, built with the goal of being cross-platform, completely open-source, and without the limitations of backward compatibility. Like .NET Core, ASP.NET Core is also built with a modular approach. This means the application you build can include only the needed features without taking on additional burdens. This is made possible by the new startup and execution environment, based on the Open Web Interface for .NET (OWIN) standard. In addition, ASP.NET Core comes with many interesting features that we are going to see throughout the book, like an integrated " }, { "text": "dependency injection system and a new application framework that unifies the programming models of ASP.NET MVC and Web API." }] }, { "paragraphFormat": { "styleName": "Heading 1" }, "inlines": [{ "name": "_Toc523387949", "bookmarkType": 0 }, { "name": "_Toc523388459", "bookmarkType": 0 }, { "text": "Chapter 3 " }, { "text": "Getting Started with .NET Core" }, { "name": "_Toc523387949", "bookmarkType": 1 }, { "name": "_Toc523388459", "bookmarkType": 1 }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "Now that it is clear what ASP.NET Core and .NET Core are, and why they were created, it's time to look at how to install them and how to build a simple application with them." }] }, { "paragraphFormat": { "styleName": "Heading 2" }, "inlines": [{ "name": "_Toc523387950", "bookmarkType": 0 }, { "name": "_Toc523388460", "bookmarkType": 0 }, { "text": "Installing .NET Core on Windows" }, { "name": "_Toc523387950", "bookmarkType": 1 }, { "name": "_Toc523388460", "bookmarkType": 1 }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "Installing on Windows is pretty easy. With Visual Studio 2017, chances are you already installed it. If not, go back to the Visual Studio Installer and make sure you have the .NET Core workload selected." }] }, { "paragraphFormat": { "styleName": "Heading 2" }, "inlines": [{ "name": "_Toc523387951", "bookmarkType": 0 }, { "name": "_Toc523388461", "bookmarkType": 0 }, { "text": "Installing .NET Core on a Mac (or Linux)" }, { "name": "_Toc523387951", "bookmarkType": 1 }, { "name": "_Toc523388461", "bookmarkType": 1 }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "The beauty of .NET Core is that it can also be installed on a Mac (or Linux, for that matter) without relying on third-party frameworks, as was needed before with Mono." }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "Each distribution of Linux has its own individual way of installing, but in the end, the process boils down to the same principles:" }] }, { "paragraphFormat": { "styleName": "List Paragraph", "listFormat": { "listLevelNumber": 0, "listId": 0 } }, "inlines": [{ "text": "Install prerequisites and configure the package manager of your distribution." }] }, { "paragraphFormat": { "styleName": "List Paragraph", "listFormat": { "listLevelNumber": 0, "listId": 0 } }, "inlines": [{ "text": "Invoke the package manager to download and install .NET Core and its tools." }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "You can read instructions specific to your distribution on the official .NET Core website. As an example, we’ll show you how to install on a Mac." }] }, { "characterFormat": { "italic": true }, "paragraphFormat": { "textAlignment": "Center", "styleName": "Normal" }, "inlines": [{ "text": "Code Listing 3-1", "characterFormat": { "italic": true } }] }, { "rows": [{ "rowFormat": { "allowBreakAcrossPages": true, "isHeader": false, "height": 0.0, "heightType": "AtLeast", "borders": { "left": { "lineStyle": "None", "lineWidth": 0.0, "shadow": false, "space": 0.0, "hasNoneStyle": false }, "right": { "lineStyle": "None", "lineWidth": 0.0, "shadow": false, "space": 0.0, "hasNoneStyle": false }, "top": { "lineStyle": "None", "lineWidth": 0.0, "shadow": false, "space": 0.0, "hasNoneStyle": false }, "bottom": { "lineStyle": "None", "lineWidth": 0.0, "shadow": false, "space": 0.0, "hasNoneStyle": false }, "vertical": { "lineStyle": "None", "lineWidth": 0.0, "shadow": false, "space": 0.0, "hasNoneStyle": false }, "horizontal": { "lineStyle": "None", "lineWidth": 0.0, "shadow": false, "space": 0.0, "hasNoneStyle": false }, "diagonalDown": { "lineStyle": "None", "lineWidth": 0.0, "shadow": false, "space": 0.0, "hasNoneStyle": false }, "diagonalUp": { "lineStyle": "None", "lineWidth": 0.0, "shadow": false, "space": 0.0, "hasNoneStyle": false } } }, "cells": [{ "blocks": [{ "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": ">brew update" }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": ">brew install openssl" }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": ">ln -s /usr/local/opt/openssl/lib/libcrypto.1.0.0.dylib /usr/local/lib/" }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": ">ln -s /usr/local/opt/openssl/lib/libssl.1.0.0.dylib /usr/local/lib/" }] }], "cellFormat": { "columnSpan": 1, "rowSpan": 1, "preferredWidth": 467.5, "preferredWidthType": "Point", "verticalAlignment": "Top", "isSamePaddingAsTable": true, "borders": { "left": { "lineStyle": "None", "lineWidth": 0.0, "shadow": false, "space": 0.0, "hasNoneStyle": false }, "right": { "lineStyle": "None", "lineWidth": 0.0, "shadow": false, "space": 0.0, "hasNoneStyle": false }, "top": { "lineStyle": "None", "lineWidth": 0.0, "shadow": false, "space": 0.0, "hasNoneStyle": false }, "bottom": { "lineStyle": "None", "lineWidth": 0.0, "shadow": false, "space": 0.0, "hasNoneStyle": false }, "vertical": { "lineStyle": "None", "lineWidth": 0.0, "shadow": false, "space": 0.0, "hasNoneStyle": false }, "horizontal": { "lineStyle": "None", "lineWidth": 0.0, "shadow": false, "space": 0.0, "hasNoneStyle": false }, "diagonalDown": { "lineStyle": "None", "lineWidth": 0.0, "shadow": false, "space": 0.0, "hasNoneStyle": false }, "diagonalUp": { "lineStyle": "None", "lineWidth": 0.0, "shadow": false, "space": 0.0, "hasNoneStyle": false } } } }] }], "title": null, "description": null, "tableFormat": { "allowAutoFit": true, "leftIndent": 0.0, "tableAlignment": "Left", "preferredWidthType": "Auto", "borders": { "left": { "lineStyle": "Single", "lineWidth": 0.5, "shadow": false, "space": 0.0, "hasNoneStyle": false }, "right": { "lineStyle": "Single", "lineWidth": 0.5, "shadow": false, "space": 0.0, "hasNoneStyle": false }, "top": { "lineStyle": "Single", "lineWidth": 0.5, "shadow": false, "space": 0.0, "hasNoneStyle": false }, "bottom": { "lineStyle": "Single", "lineWidth": 0.5, "shadow": false, "space": 0.0, "hasNoneStyle": false }, "vertical": { "lineStyle": "Single", "lineWidth": 0.5, "shadow": false, "space": 0.0, "hasNoneStyle": false }, "horizontal": { "lineStyle": "Single", "lineWidth": 0.5, "shadow": false, "space": 0.0, "hasNoneStyle": false }, "diagonalDown": { "lineStyle": "None", "lineWidth": 0.0, "shadow": false, "space": 0.0, "hasNoneStyle": false }, "diagonalUp": { "lineStyle": "None", "lineWidth": 0.0, "shadow": false, "space": 0.0, "hasNoneStyle": false } } } }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "Once all these prerequisites have been installed, you can download and install the official SDK for macOS by downloading it from the " }, { "hasFieldEnd": true, "fieldType": 0 }, { "text": "HYPERLINK \"https://www.microsoft.com/net/core\" " }, { "fieldType": 2 }, { "text": "official .NET Core website", "characterFormat": { "styleName": "Hyperlink" } }, { "fieldType": 1 }, { "text": "." }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "On Linux and Mac, you do not have Visual Studio to develop apps, but you can use the .NET Core SDK or Visual Studio Code, which is a lightweight, extensible, cross-platform text editor built by Microsoft and the community. The last chapter of this book covers in detail each of the tools with which you can build .NET Core apps." }] }, { "paragraphFormat": { "styleName": "Heading 1" }, "inlines": [{ "name": "_Toc523387952", "bookmarkType": 0 }, { "name": "_Toc523388462", "bookmarkType": 0 }, { "text": "A Look at the Future" }, { "name": "_Toc523387952", "bookmarkType": 1 }, { "name": "_Toc523388462", "bookmarkType": 1 }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "The release of .NET Core has been a very difficult one, with many delays and changes in direction. While the framework is stable, with .NET Core 1.1 released in November 2016, the tooling is still in development." }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "When we wrote this book, we relied on previews that were made available at the Connect(); event of November 2016, so some of the screenshots or procedures in the examples might be different from what is currently available." }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "What can we expect for the future of .NET Core?" }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "First, unlike previous frameworks, we have to expect a continuous release of enhanced tools, both for the CLI and for the tooling inside Visual Studio. Second, on the framework side, there will be the second big release of .NET Core 2.0, implementing .NET Standard 2.0." }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "But rest assured that Microsoft sees .NET Core as the future of .NET for the next 10 years, so this is the right time to jump in and start learning this new technology." }] }], "headersFooters": {}, "sectionFormat": { "headerDistance": 36.0, "footerDistance": 36.0, "pageWidth": 612.0, "pageHeight": 792.0, "leftMargin": 72.0, "rightMargin": 72.0, "topMargin": 72.0, "bottomMargin": 72.0, "differentFirstPage": false, "differentOddAndEvenPages": false } }], "characterFormat": { "fontSize": 11.0, "fontFamily": "Calibri" }, "paragraphFormat": { "afterSpacing": 8.0, "lineSpacing": 1.0791666507720947, "lineSpacingType": "Multiple" }, "lists": [{ "listId": 0, "abstractListId": 0 }], "abstractLists": [{ "abstractListId": 0, "levels": [{ "listLevelPattern": "Bullet", "followCharacter": "Tab", "numberFormat": "", "characterFormat": { "fontFamily": "Symbol" }, "paragraphFormat": { "leftIndent": 36.0, "firstLineIndent": -18.0 } }, { "listLevelPattern": "Bullet", "followCharacter": "Tab", "numberFormat": "o", "characterFormat": { "fontFamily": "Courier New" }, "paragraphFormat": { "leftIndent": 72.0, "firstLineIndent": -18.0 } }, { "listLevelPattern": "Bullet", "followCharacter": "Tab", "numberFormat": "", "characterFormat": { "fontFamily": "Wingdings" }, "paragraphFormat": { "leftIndent": 108.0, "firstLineIndent": -18.0 } }, { "listLevelPattern": "Bullet", "followCharacter": "Tab", "numberFormat": "", "characterFormat": { "fontFamily": "Symbol" }, "paragraphFormat": { "leftIndent": 144.0, "firstLineIndent": -18.0 } }, { "listLevelPattern": "Bullet", "followCharacter": "Tab", "numberFormat": "o", "characterFormat": { "fontFamily": "Courier New" }, "paragraphFormat": { "leftIndent": 180.0, "firstLineIndent": -18.0 } }, { "listLevelPattern": "Bullet", "followCharacter": "Tab", "numberFormat": "", "characterFormat": { "fontFamily": "Wingdings" }, "paragraphFormat": { "leftIndent": 216.0, "firstLineIndent": -18.0 } }, { "listLevelPattern": "Bullet", "followCharacter": "Tab", "numberFormat": "", "characterFormat": { "fontFamily": "Symbol" }, "paragraphFormat": { "leftIndent": 252.0, "firstLineIndent": -18.0 } }, { "listLevelPattern": "Bullet", "followCharacter": "Tab", "numberFormat": "o", "characterFormat": { "fontFamily": "Courier New" }, "paragraphFormat": { "leftIndent": 288.0, "firstLineIndent": -18.0 } }, { "listLevelPattern": "Bullet", "followCharacter": "Tab", "numberFormat": "", "characterFormat": { "fontFamily": "Wingdings" }, "paragraphFormat": { "leftIndent": 324.0, "firstLineIndent": -18.0 } }] }], "background": { "color": "#FFFFFFFF" }, "styles": [{ "type": "Paragraph", "name": "Normal", "next": "Normal" }, { "type": "Paragraph", "name": "Heading 1", "basedOn": "Normal", "next": "Normal", "link": "Heading 1 Char", "characterFormat": { "fontSize": 16.0, "fontFamily": "Calibri Light", "fontColor": "#2F5496FF" }, "paragraphFormat": { "beforeSpacing": 12.0, "afterSpacing": 0.0, "outlineLevel": "Level1" } }, { "type": "Paragraph", "name": "Heading 2", "basedOn": "Normal", "next": "Normal", "link": "Heading 2 Char", "characterFormat": { "fontSize": 13.0, "fontFamily": "Calibri Light", "fontColor": "#2F5496FF" }, "paragraphFormat": { "beforeSpacing": 2.0, "afterSpacing": 0.0, "outlineLevel": "Level2" } }, { "type": "Character", "name": "Default Paragraph Font" }, { "type": "Paragraph", "name": "Notes", "basedOn": "Normal", "next": "Normal", "characterFormat": { "bold": true }, "paragraphFormat": { "afterSpacing": 6.0, "lineSpacing": 1.0, "lineSpacingType": "Multiple" } }, { "type": "Character", "name": "Heading 1 Char", "basedOn": "Default Paragraph Font", "characterFormat": { "fontSize": 16.0, "fontFamily": "Calibri Light", "fontColor": "#2F5496FF" } }, { "type": "Character", "name": "Heading 2 Char", "basedOn": "Default Paragraph Font", "characterFormat": { "fontSize": 13.0, "fontFamily": "Calibri Light", "fontColor": "#2F5496FF" } }, { "type": "Paragraph", "name": "List Paragraph", "basedOn": "Normal", "next": "List Paragraph", "paragraphFormat": { "leftIndent": 36.0 } }, { "type": "Character", "name": "Hyperlink", "basedOn": "Default Paragraph Font", "characterFormat": { "underline": "Single", "fontColor": "#0563C1FF" } }, { "type": "Character", "name": "Unresolved Mention", "basedOn": "Default Paragraph Font", "characterFormat": { "fontColor": "#808080FF" } }, { "type": "Paragraph", "name": "Title", "basedOn": "Normal", "next": "Normal", "link": "Title Char", "characterFormat": { "fontSize": 28.0, "fontFamily": "Calibri Light" }, "paragraphFormat": { "afterSpacing": 0.0, "lineSpacing": 1.0, "lineSpacingType": "Multiple" } }, { "type": "Character", "name": "Title Char", "basedOn": "Default Paragraph Font", "characterFormat": { "fontSize": 28.0, "fontFamily": "Calibri Light" } }, { "type": "Paragraph", "name": "TOC Heading", "basedOn": "Heading 1", "next": "Normal", "paragraphFormat": { "outlineLevel": "BodyText" } }, { "type": "Paragraph", "name": "TOC 1", "basedOn": "Normal", "next": "Normal", "paragraphFormat": { "afterSpacing": 5.0 } }, { "type": "Paragraph", "name": "TOC 2", "basedOn": "Normal", "next": "Normal", "paragraphFormat": { "leftIndent": 11.0, "afterSpacing": 5.0 } }] }
        // tslint:enable        
        let waitingPopUp: HTMLElement = document.getElementById('waiting-popup');
        let popupOverlay: HTMLElement = document.getElementById('popup-overlay');
        waitingPopUp.style.display = 'block';
        this.documenteditor.open(JSON.stringify(defaultDocument));
        this.documenteditor.documentName = 'Table of Contents';
        waitingPopUp.style.display = 'none';
        popupOverlay.style.display = 'none';
        this.documenteditor.focusIn();
        this.fontProperties.updateStyles();
    }
    onWindowResize = (): void => {
        this.updateContainerSize();
    }
}