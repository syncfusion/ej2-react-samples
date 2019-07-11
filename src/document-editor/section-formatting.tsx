import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import { TitleBar } from './title-bar';
import { SECTION_FORMATTING } from './data';
import './default.component.css';
DocumentEditorContainerComponent.Inject(Toolbar);
// tslint:disable:max-line-length
export class SectionFormatView extends SampleBase<{}, {}> {
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
    onLoadDefault = (): void => {
        this.container.documentEditor.open(SECTION_FORMATTING);
        this.container.documentEditor.documentName = 'Section Formatting';
        this.titleBar.updateDocumentTitle();
        this.container.documentEditor.documentChange = (): void => {
            this.titleBar.updateDocumentTitle();
            this.container.documentEditor.focusIn();
        };
    }
}