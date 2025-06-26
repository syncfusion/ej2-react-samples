import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { DocumentEditorContainerComponent, Toolbar, Ribbon } from '@syncfusion/ej2-react-documenteditor';
import { TitleBar } from './title-bar';
import './default.component.css';
import { SwitchComponent } from '@syncfusion/ej2-react-buttons';
DocumentEditorContainerComponent.Inject(Toolbar,Ribbon);
// tslint:disable:max-line-length
const AutoShapesComponent = () => {
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
        let defaultDocument: object = {"sfdt":"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"};
        // tslint:enable
        container.current.documentEditor.open(JSON.stringify(defaultDocument));
        container.current.documentEditor.documentName = "Auto Shapes";
        container.current.documentEditorSettings.showRuler = true;
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
        container.current.documentEditor.pageOutline = "#E0E0E0";
        container.current.documentEditor.acceptTab = true;
        container.current.documentEditor.resize();
        titleBar = new TitleBar(
            document.getElementById("documenteditor_titlebar"),
            container.current.documentEditor,
            true
        );
        onLoadDefault();
        titleBar.showButtons(false);
    };
    const change = (args):void=>{
        if (args.checked) {
            container.current.toolbarMode = 'Ribbon';
        }
        else {
            container.current.toolbarMode = 'Toolbar';
        }
        titleBar.showButtons(container.current.toolbarMode != 'Ribbon')
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
                        ref={container}
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
                <p>This sample shows the preservation of auto shapes and group shapes in Document Editor.</p>
            </div>
            <div id="description">
                <p>With Document Editor, you can view the auto shapes and group shapes present in your Word Document.</p>
                <p>List of shapes preserved:</p>
                <ul>
                    <li>Lines</li>
                    <li>Rectangles</li>
                    <li>Basic shapes</li>
                    <li>Block arrows</li>
                    <li>Equation shapes</li>
                    <li>Flowcharts</li>
                    <li>Stars and banners</li>
                </ul>
                <p>More information about the Document Editor features can be found in this
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/document-editor/shapes"> documentation section.</a>
                </p>
            </div>
        </div>
    );
}
export default AutoShapesComponent;
