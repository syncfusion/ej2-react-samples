import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import { TitleBar } from './title-bar';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import './default.component.css';
import { GETTTING_STARTED } from './data';
DocumentEditorContainerComponent.Inject(Toolbar);

// tslint:disable:max-line-length
export class DocumentEditorAutoSave extends SampleBase<{}, {}> {
    private hostUrl: string = 'https://ej2services.syncfusion.com/development/web-services/';
    public container: DocumentEditorContainerComponent;
    public titleBar: TitleBar;

    public contentChanged: boolean = false;
    public rendereComplete(): void {
        this.container.serviceUrl = this.hostUrl + 'api/documenteditor/';
        this.container.documentEditor.pageOutline = '#E0E0E0';
        this.container.documentEditor.acceptTab = true;
        this.container.documentEditor.resize();
        this.titleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), this.container.documentEditor, true);
        this.onLoadDefault();

        setInterval(() => {
            if (this.contentChanged) {
                //You can save the document as below
                this.container.documentEditor.saveAsBlob('Docx').then((blob: Blob) => {
                    let exportedDocumment: Blob = blob;
                    //Now, save the document where ever you want.
                    /* tslint:disable */
                    let span: HTMLElement = document.createElement('span');
                    let date: Date = new Date();
                    let time: string = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                    span.innerHTML = 'Auto saved at <b>' + time + '</b><hr>';
                    let log: HTMLElement = document.getElementById('AutosaveLog');
                    log.insertBefore(span, log.firstChild);
                });
                this.contentChanged = false;
            }
        }, 15000);

        this.container.contentChange = (): void => {
            this.contentChanged = true;
        };
    }
    public clearLog() {
        document.getElementById('AutosaveLog').innerHTML = '';
    }
    render() {
        return (<div className='control-pane'>
            <div className="col-lg-9 control-section">
                <div id='documenteditor_titlebar' className="e-de-ctn-title"></div>
                <div id="documenteditor_container_body">
                    <DocumentEditorContainerComponent id="container" ref={(scope) => { this.container = scope; }} style={{ 'display': 'block', 'height': '590px' }}
                        enableToolbar={true} locale='en-US' />
                </div>
            </div>
            <div className="col-lg-3 property-section">
                <div className="property-panel-header">Auto save log</div>
                <table id="property" title="Auto save log">
                    <tr>
                        <td>
                            <div className="eventarea" style={{ 'height': '150px', 'overflow': 'auto' }}>
                                <span className="AutosaveLog" id="AutosaveLog" style={{ 'word-break': 'normal' }}></span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="evtbtn" style={{ 'padding-bottom': '10px', 'paddingLeft': '50px' }}>
                                <ButtonComponent id="clear" onClick={this.clearLog.bind(this)}>Clear</ButtonComponent>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div id="action-description">
                <p>This example demonstrates how to enable auto save functionality in documenteditor.</p>
            </div>
            <div id="description">
                <div>
                    <p>In this example, you can automically save the edited content in regular interval of time.</p>
                    <p>It helps reduce the risk of data loss by saving an open document automatically at customized intervals.</p>
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
        </div >);
    }

    onLoadDefault = (): void => {
        this.container.documentEditor.open(GETTTING_STARTED);
        this.container.documentEditor.documentName = 'Getting Started';
        this.titleBar.updateDocumentTitle();
        this.container.documentEditor.documentChange = (): void => {
            this.titleBar.updateDocumentTitle();
            this.container.documentEditor.focusIn();
        };
    }
}