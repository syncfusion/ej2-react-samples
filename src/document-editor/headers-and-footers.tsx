import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import { TitleBar } from './title-bar';
import { HEADER_AND_FOOTER } from './data';
import './default.component.css';
DocumentEditorContainerComponent.Inject(Toolbar);

// tslint:disable:max-line-length
export class HeadersAndFootersView extends SampleBase<{}, {}> {
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
                    <DocumentEditorContainerComponent id="container" ref={(scope) => { this.container = scope; }} style={{ 'display': 'block', 'height': '590px' }}
                        enableToolbar={true} locale='en-US' />
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
    onLoadDefault = (): void => {
        this.container.documentEditor.open(HEADER_AND_FOOTER);
        this.container.documentEditor.documentName = 'Headers and Footers';
        this.titleBar.updateDocumentTitle();
        this.container.documentEditor.documentChange = (): void => {
            this.titleBar.updateDocumentTitle();
            this.container.documentEditor.focusIn();
        };
    }
}