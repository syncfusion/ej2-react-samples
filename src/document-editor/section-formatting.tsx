import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import { TitleBar } from './title-bar';

import './default.component.css';
DocumentEditorContainerComponent.Inject(Toolbar);
// tslint:disable:max-line-length
export class SectionFormatView extends SampleBase<{}, {}> {
    private hostUrl: string = 'https://services.syncfusion.com/react/production/api/documenteditor/';
    public container: DocumentEditorContainerComponent;
    public titleBar: TitleBar;
    public rendereComplete(): void {
        window.onbeforeunload = function () {
            return 'Want to save your changes?';
        }
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
                    <DocumentEditorContainerComponent id="container" ref={(scope) => { this.container = scope; }} style={{ 'display': 'block' }}
                       height={'590px'} serviceUrl={this.hostUrl} enableToolbar={true} locale='en-US'  />
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
                    <p style={{ 'display': 'block' }}> More information about the document editor features can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/document-editor/section-format/">documentation section.</a>
                    </p>
                </div>
            </div>
        </div>);
    }
    onLoadDefault = (): void => {
        // tslint:disable
        let defaultDocument: object = {"sfdt":"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"};
        // tslint:enable        
        this.container.documentEditor.open(JSON.stringify(defaultDocument));
        this.container.documentEditor.documentName = 'Section Formatting';
        this.titleBar.updateDocumentTitle();
        this.container.documentChange = (): void => {
        this.titleBar.updateDocumentTitle();
        this.container.documentEditor.documentEditorSettings.showRuler = true;
        this.container.documentEditor.focusIn();
        };
    }
}