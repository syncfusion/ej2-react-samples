import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import { TitleBar } from './title-bar';
import './default.component.css';
DocumentEditorContainerComponent.Inject(Toolbar);
// tslint:disable:max-line-length
const CharacterFormatView = () => {
    useEffect(() => {
        updateSampleSection();
        rendereComplete();
    }, [])
    const hostUrl: string =
        "https://services.syncfusion.com/react/production/api/documenteditor/";
    let container = useRef<DocumentEditorContainerComponent>(null);
    let titleBar: TitleBar;
    const onLoadDefault = (): void => {
        // tslint:disable
        let defaultDocument: object = {
            sfdt: "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",
        };
        // tslint:enable
        container.current.documentEditor.open(JSON.stringify(defaultDocument));
        container.current.documentEditor.documentName = "Character Formatting";
        titleBar.updateDocumentTitle();
        container.current.documentChange = (): void => {
            titleBar.updateDocumentTitle();
            container.current.documentEditor.focusIn();
        };
    };
    const rendereComplete = (): void => {
        window.onbeforeunload = () => {
            return "Want to save your changes?";
        };
        container.current.documentEditor.pageOutline = "#E0E0E0";
        container.current.documentEditor.acceptTab = true;
        container.current.documentEditor.resize();
        titleBar = new TitleBar(
            document.getElementById("documenteditor_titlebar"),
            container.current.documentEditor,
            true
        );
        onLoadDefault();
    };
    return (
        <div className="control-pane">
            <div className="control-section">
                <div id="documenteditor_titlebar" className="e-de-ctn-title"></div>
                <div id="documenteditor_container_body">
                    <DocumentEditorContainerComponent
                        id="container"
                        ref={container}
                        style={{ display: "block" }}
                        height={"590px"}
                        serviceUrl={hostUrl}
                        enableToolbar={true}
                        locale="en-US"
                    />
                </div>
            </div>
            <div id="action-description">
                <p>
                    This example demonstrates the character formatting options in
                    DocumentEditor such as bold, italic, underline, strikethrough,
                    subscript, superscript, font, font size, font color, and highlight
                    color.
                </p>
            </div>
            <div id="description">
                <div>
                    <p>
                        In this example, you can find character formatting features in the
                        document editor.
                    </p>
                    <ul>
                        <li>Bold and Italic.</li>
                        <li>Underline.</li>
                        <li>Single strike and double strikes.</li>
                        <li>Superscript and subscript.</li>
                        <li>Font and highlight colors.</li>
                        <li>Different fonts and sizes.</li>
                    </ul>
                    <p style={{ display: "block" }}>
                        {" "}
                        More information about the document editor features can be found in
                        this{" "}
                        <a
                            target="_blank"
                            href="https://ej2.syncfusion.com/react/documentation/document-editor/text-format/"
                        >
                            documentation section.
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
export default CharacterFormatView;
