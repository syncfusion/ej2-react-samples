import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { updateSampleSection } from '../common/sample-base';
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import { TitleBar } from './title-bar';
import './default.component.css';
DocumentEditorContainerComponent.Inject(Toolbar);
// tslint:disable:max-line-length
function CharacterFormatView() {
    React.useEffect(() => {
        updateSampleSection();
        rendereComplete();
    }, [])
    const hostUrl: string = 'https://services.syncfusion.com/react/production/api/documenteditor/';
    let container: DocumentEditorContainerComponent;
    let titleBar: TitleBar;
    function rendereComplete(): void {
        window.onbeforeunload = function () {
            return 'Want to save your changes?';
        }
        container.documentEditor.pageOutline = '#E0E0E0';
        container.documentEditor.acceptTab = true;
        container.documentEditor.resize();
        titleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), container.documentEditor, true);
        onLoadDefault();
    }
    return (<div className='control-pane'>
        <div className='control-section'>
            <div id='documenteditor_titlebar' className="e-de-ctn-title"></div>
            <div id="documenteditor_container_body">
                <DocumentEditorContainerComponent id="container" ref={(scope) => { container = scope; }} style={{ 'display': 'block' }}
                    height={'590px'} serviceUrl={hostUrl} enableToolbar={true} locale='en-US' />
            </div>
        </div>
        <div id="action-description">
            <p>This example demonstrates the character formatting options in DocumentEditor such as bold, italic, underline, strikethrough, subscript, superscript, font, font size, font color, and highlight color.</p>
        </div>
        <div id="description">
            <div>
                <p>In this example, you can find character formatting features in the document editor.</p>
                <ul>
                    <li>Bold and Italic.</li>
                    <li>Underline.</li>
                    <li>Single strike and double strikes.</li>
                    <li>Superscript and subscript.</li>
                    <li>Font and highlight colors.</li>
                    <li>Different fonts and sizes.</li>
                </ul>
                <p style={{ 'display': 'block' }}> More information about the document editor features can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/document-editor/text-format/">documentation section.</a>
                </p>
            </div>
        </div>
    </div>);
    function onLoadDefault(): void {
        // tslint:disable
        let defaultDocument: object = {"sfdt":"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"};
        // tslint:enable        
        container.documentEditor.open(JSON.stringify(defaultDocument));
        container.documentEditor.documentName = 'Character Formatting';
        titleBar.updateDocumentTitle();
        container.documentChange = (): void => {
            titleBar.updateDocumentTitle();
            container.documentEditor.focusIn();
        };
    }
}
export default CharacterFormatView;