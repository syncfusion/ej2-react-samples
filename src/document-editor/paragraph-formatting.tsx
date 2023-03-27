import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import { TitleBar } from './title-bar';

import './default.component.css';
DocumentEditorContainerComponent.Inject(Toolbar);
// tslint:disable:max-line-length
export class ParagraphFormatView extends SampleBase<{}, {}> {
    private hostUrl: string = 'https://services.syncfusion.com/react/production/api/documenteditor/';
    public container: DocumentEditorContainerComponent;
    public titleBar: TitleBar;
    public rendereComplete(): void {
        window.onbeforeunload = function () {
            return 'Want to save your changes?';
        }
        this.container.documentEditor.pageOutline = '#E0E0E0';
        this.container.documentEditor.acceptTab = true;
        this.container.documentEditorSettings.showHiddenMarks = true;
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
                    <p style={{ 'display': 'block' }}> More information about the document editor features can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/document-editor/paragraph-format/">documentation section.</a>
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
        this.container.documentEditor.documentName = 'Paragraph formatting';
        this.titleBar.updateDocumentTitle();
        this.container.documentChange = (): void => {
        this.titleBar.updateDocumentTitle();
        this.container.documentEditor.focusIn();
        };
    }
}