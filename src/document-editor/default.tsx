import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import { TitleBar } from './title-bar';
import { GETTTING_STARTED } from './data';
import './default.component.css';
DocumentEditorContainerComponent.Inject(Toolbar);

// tslint:disable:max-line-length
export class Default extends SampleBase<{}, {}> {
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
                <p>This example demonstrates how to create, edit, and print Word documents (DOCX) online using document editor without any server-side dependencies.</p>
            </div>
            <div id="description">
                <p>In this example, you can create and edit Word documents online much faster and easier using intuitive UI options of the document editor. All independent features of the document editor component are defined as separate modules to help build a lightweight Word editor with the features you require.</p>
                <p style={{ 'display': 'block' }}>Features of document editor:</p>
                <ul>
                    <li>Create and edit: Opens and saves documents in native "Syncfusion Document Text (*.sfdt)" file format without any server-side dependencies. This helps build a purely client-side Word editor application.</li>
                    <li>Supported elements: Document elements like text, images, hyperlinks, tables, bookmarks, page numbers, tables of contents, headers, and footers.</li>
                    <li>Formatting: Text levels, paragraph levels, bullets and numbering, table levels, page settings, and styles.</li>
                    <li>Editing operations: Undo, redo, cut, copy, and paste.</li>
                    <li>Find and replace text within the document.</li>
                    <li>Interactions through touch, mouse, and keyboard.</li>
                </ul>
                <p style={{ 'display': 'block' }}> More information about the document editor features can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/document-editor/">documentation section.</a>
                </p>
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
        this.container.documentEditor.open(GETTTING_STARTED);
        this.container.documentEditor.documentName = 'Getting Started';
        this.titleBar.updateDocumentTitle();
        this.container.documentEditor.documentChange = (): void => {
            this.titleBar.updateDocumentTitle();
            this.container.documentEditor.focusIn();
        };
    }
}