import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { DocumentEditorComponent, DocumentEditor, ViewChangeEventArgs, Print } from '@syncfusion/ej2-react-documenteditor';
import { DocumentLoader } from './document-loader';
import { TitleBar } from './title-bar';
import { StatusBar } from './status-bar';
import { PRINT } from './data';
import './print.component.css';
DocumentEditorComponent.Inject(Print);

// tslint:disable:max-line-length
export class PrintView extends SampleBase<{}, {}> {

    public documenteditor: DocumentEditorComponent;
    public containerPanel: HTMLElement;
    public titleBar: TitleBar;
    public statusBar: StatusBar;
    public documentLoader: DocumentLoader;
    public rendereComplete(): void {
        this.containerPanel = document.getElementById('documenteditor_container_panel');
        this.updateContainerSize();
        this.documenteditor.pageOutline = '#E0E0E0';
        this.documenteditor.resize();
        this.documentLoader = new DocumentLoader(this.documenteditor);
        this.onLoadDefault();
        this.documenteditor.viewChange = (e: ViewChangeEventArgs) => {
            this.onViewChange(e);
        };
        this.documenteditor.documentChange = (): void => {
            this.applyPageCountAndDocumentTitle();
        };
        this.titleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), this.documenteditor, false);
        this.statusBar = new StatusBar(document.getElementById('documenteditor_statusbar'), this.documenteditor);
        this.applyPageCountAndDocumentTitle();
        document.getElementById('uploadfileButton').addEventListener('change', this.onFileChange);
        window.addEventListener('resize', this.updateContainerSize);
        document.getElementById('uploadfileButton').setAttribute('accept', '.doc,.docx,.rtf,.txt,.sfdt');
        this.documenteditor.zoomFactorChange = (): void => {
            this.statusBar.updateZoomContent();
        };
        window.addEventListener('resize', (): void => { this.updateContainerSize(); });
    }
    render() {
        return (<div className='control-pane'>
            <div className="control-section">
                <input type="file" id="uploadfileButton" style={{ position: 'fixed', left: '-100em' }} />
                <div id="panel">
                    <div id='documenteditor_titlebar' className="e-de-ctn-title">
                    </div>
                    <div id="documenteditor_container_panel" style={{ position: 'relative' }}>
                        <DocumentEditorComponent id="container" ref={(scope) => { this.documenteditor = scope; }} enablePrint={true} style={{ width: '100%', height: '100%' }} />
                    </div>
                    <div id="documenteditor_statusbar">
                    </div>
                    <div className="overlay" id="popup-overlay" style={{ display: 'block;' }}></div>
                    <div id="waiting-popup">
                        <svg className="circular" height="40" width="40">
                            <circle className="circle-path" cx="25" cy="25" r="20" fill="none" stroke-width="6" stroke-miterlimit="10" />
                        </svg>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates how to view and print Word documents online using document editor.</p>
            </div>
            <div id="description">
                <p>In this example, document editor is defined as lightweight by injecting only the modules that are necessary for opening
            and printing Word documents.
    </p>
                <p style={{ display: 'block' }}> Document editor provides the following document viewing features:
    </p>
                <ul>
                    <li>Open Word documents with document elements like text, images, hyperlinks, tables, bookmarks, page numbers, tables of contents, headers, and footers.</li>
                    <li>Scroll or navigate to specific pages.</li>
                    <li>Print Word documents.</li>
                </ul>
                <p style={{ display: 'block' }}> More information about the document editor features can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/document-editor/">documentation section.</a>

                </p>
            </div>
        </div>
        );
    }


    onFileChange = (args: any): void => {
        if (args.target.files[0]) {
            let path: any = args.target.files[0];
            if (path.name.substr(path.name.lastIndexOf('.')) === '.sfdt') {
                let fileReader: FileReader = new FileReader();
                fileReader.onload = (e: any) => {
                    let contents: any = e.target.result;
                    this.documenteditor.open(contents);
                };
                fileReader.readAsText(path);
                this.documenteditor.documentName = path.name.substr(0, path.name.lastIndexOf('.'));
            } else {
                this.documentLoader.loadFile(path);
            }
        }
        event.preventDefault();
    }
    onLoadDefault = (): void => {
        let waitingPopUp: HTMLElement = document.getElementById('waiting-popup');
        let overlay: HTMLElement = document.getElementById('popup-overlay');
        this.documentLoader.loadDefault(JSON.parse(PRINT));
        this.documenteditor.documentName = 'Getting Started';
        waitingPopUp.style.display = 'none';
        overlay.style.display = 'none';
    }
    updateContainerSize = (): void => {
        let titleBarDiv: HTMLElement = document.getElementById('documenteditor_titlebar');
        let statusBarDiv: HTMLElement = document.getElementById('documenteditor_statusbar');
        if (this.containerPanel && titleBarDiv && statusBarDiv) {
            this.containerPanel.style.height = (window.innerHeight -
                (titleBarDiv.offsetHeight + statusBarDiv.offsetHeight)) + 'px';
        }
    }
    applyPageCountAndDocumentTitle = (): void => {
        //Sets Document name.
        this.titleBar.updateDocumentTitle();
        this.statusBar.updatePageCount();
    }
    onViewChange = (args: ViewChangeEventArgs): void => {
        this.statusBar.updatePageNumberOnViewChange(args);
    }
}