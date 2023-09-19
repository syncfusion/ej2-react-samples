import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import { TitleBar } from './title-bar';
import './default.component.css';
DocumentEditorContainerComponent.Inject(Toolbar);
// tslint:disable:max-line-length
const DocumentEditorChart = () => {
    useEffect(() => {
        updateSampleSection();
        rendereComplete();
    }, [])
    let hostUrl: string =
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
        container.current.documentEditor.documentName = "Product Report";
        titleBar.updateDocumentTitle();
        container.current.documentChange = (): void => {
            titleBar.updateDocumentTitle();
            container.current.documentEditor.focusIn();
        };
    };
    const rendereComplete = (): void => {
        window.onbeforeunload = function () {
            return "Want to save your changes?";
        };
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
                <p>This example shows chart preservation support in document editor.</p>
            </div>
            <div id="description">
                <div>
                    <p>
                        With Document Editor, you can see the chart reports from your word
                        document
                    </p>
                    <p style={{ display: "block" }}>
                        {" "}
                        More information about the document editor features can be found in
                        this{" "}
                        <a
                            target="_blank"
                            href="https://ej2.syncfusion.com/react/documentation/document-editor/chart/"
                        >
                            documentation section.
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
export default DocumentEditorChart;