import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { DocumentEditorContainerComponent, Toolbar, Ribbon } from '@syncfusion/ej2-react-documenteditor';
import { TitleBar } from './title-bar';
import './default.component.css';
import { SwitchComponent } from '@syncfusion/ej2-react-buttons';
DocumentEditorContainerComponent.Inject(Toolbar,Ribbon);
// tslint:disable:max-line-length
const HeadersAndFootersView = () => {
    useEffect(() => {
        updateSampleSection();
        rendereComplete();
    }, [])
    let hostUrl: string =
        "https://services.syncfusion.com/react/production/api/documenteditor/";
    let container: DocumentEditorContainerComponent;
    let titleBar: TitleBar;
    const onLoadDefault = (): void => {
        // tslint:disable
        let defaultDocument: object = {
            sfdt: "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",
        };
        // tslint:enable
        container.documentEditor.open(JSON.stringify(defaultDocument));
        container.documentEditor.documentName = "Headers and Footers";
        container.documentEditor.documentEditorSettings.showRuler = true;
        titleBar.updateDocumentTitle();
        container.documentChange = (): void => {
            titleBar.updateDocumentTitle();
            container.documentEditor.focusIn();
        };
    };
    const rendereComplete = (): void => {
        window.onbeforeunload = function () {
            return "Want to save your changes?";
        };
        container.documentEditor.pageOutline = "#E0E0E0";
        container.documentEditor.acceptTab = true;
        container.documentEditor.resize();
        titleBar = new TitleBar(
            document.getElementById("documenteditor_titlebar"),
            container.documentEditor,
            true
        );
       onLoadDefault();
titleBar.showButtons(false);
    };
    const change = (args):void=>{
        if (args.checked) {
            container.toolbarMode = 'Ribbon';
        }
        else {
            container.toolbarMode = 'Toolbar';
        }
        titleBar.showButtons(container.toolbarMode != 'Ribbon')
    }
    return (
        <div className="control-pane">
            <div className="control-section">
                <div className="flex-container">
                                  <label className="switchLabel" htmlFor="toolbarSwitch">Ribbon UI</label>
                            <div className="e-message render-mode-info">
                                <span className="e-msg-icon render-mode-info-icon" title="Turn OFF to switch from Ribbon to toolbar UI"></span>
                            </div>
                                <SwitchComponent cssClass="buttonSwitch" id="toolbarSwitch" change={change} checked={true}></SwitchComponent>
                                </div>
                <div id="documenteditor_titlebar" className="e-de-ctn-title"></div>
                <div id="documenteditor_container_body">
                    <DocumentEditorContainerComponent
                        id="container"
                        ref={(scope) => {
                            container = scope;
                        }}
                        style={{ display: "block" }}
                        height={"590px"}
                        toolbarMode= {"Ribbon"}
                        serviceUrl={hostUrl}
                        enableToolbar={true}
                        locale="en-US"
                    />
                </div>
            </div>
            <div id="action-description">
                <p>
                    This example demonstrates header and footer support in document
                    editor. Different headers and footers can be added to the first page,
                    odd pages, and even pages.
                </p>
            </div>
            <div id="description">
                <div>
                    <p>Header and footer features in document editor.</p>
                    <ul>
                        <li>Header and footer for the first page of the document.</li>
                        <li>Header and footer for even pages of the document.</li>
                        <li>Header and footer for odd pages of the document.</li>
                    </ul>
                    <p style={{ display: "block" }}>
                        {" "}
                        More information about the document editor features can be found in
                        this{" "}
                        <a
                            target="_blank"
                            href="https://ej2.syncfusion.com/react/documentation/document-editor/header-footer/"
                        >
                            documentation section.
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
export default HeadersAndFootersView;
