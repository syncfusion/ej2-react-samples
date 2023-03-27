import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import { TitleBar } from './title-bar';
import './default.component.css';
DocumentEditorContainerComponent.Inject(Toolbar);

// tslint:disable:max-line-length
export class TableFormatView extends SampleBase<{}, {}> {
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
                <p>This example demonstrates table formatting options in document editor such as cell margins, cell spacing, horizontal merge, vertical merge, border styles, background color, and more.</p>
            </div>
            <div id="description">
                <div>
                    <p>In this example, you can find all the table formatting features.</p>
                    <ul>
                        <li>Cell margins and cell spacing..</li>
                        <li>Horizontal and vertical cell merge.</li>
                        <li>Borders and shading.</li>
                    </ul>
                    <p style={{ 'display': 'block' }}> More information about the document editor features can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/document-editor/table-format/">documentation section.</a>
                    </p>
                </div>
            </div>
        </div>);
    }
    onLoadDefault = (): void => {
        // tslint:disable
        let defaultDocument: object ={"sfdt":"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"};
        // tslint:enable        
        this.container.documentEditor.open(JSON.stringify(defaultDocument));
        this.container.documentEditor.documentName = 'Table Formatting';
        this.titleBar.updateDocumentTitle();
        this.container.documentChange = (): void => {
        this.titleBar.updateDocumentTitle();
        this.container.documentEditor.focusIn();
        };
    }
}