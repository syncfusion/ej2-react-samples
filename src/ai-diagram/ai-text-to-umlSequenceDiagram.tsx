import {
    DiagramComponent, NodeModel, PrintAndExport, Inject,
    DiagramTools, FileFormats,
    IExportOptions, IScrollChangeEventArgs
} from '@syncfusion/ej2-react-diagrams';
import { UmlSequenceParticipant, UmlSequenceFragment,} from '@syncfusion/ej2-diagrams';
import { ButtonComponent, FabComponent } from '@syncfusion/ej2-react-buttons';
import { convertTextToUmlSequenceDiagram } from './ai-umlSequenceDiagram';
import { sequenceModel, exportItems, zoomMenuItems } from './datasource';
import { ClickEventArgs, ItemDirective, ItemsDirective, ToolbarComponent } from '@syncfusion/ej2-react-navigations';
import { DropDownButtonComponent, MenuEventArgs } from '@syncfusion/ej2-react-splitbuttons';
import { InputEventArgs, TextBoxComponent, UploaderComponent } from '@syncfusion/ej2-react-inputs';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { useEffect } from 'react';
import './smart-umlSequenceDiagram.css';
import { from } from 'form-data';
import * as React from 'react';

function AiSmartUmlSequenceDiagram() {
    let diagram: DiagramComponent;
    let dialog: DialogComponent;
    let msgBtn1: ButtonComponent;
    let msgBtn2: ButtonComponent;
    let msgBtn3: ButtonComponent;
    let textBox: TextBoxComponent;
    let sendButton: ButtonComponent;
    useEffect(() => {
        // Add keypress event listener to the document
        document.addEventListener('keypress', function (event) {
            if (event.key === 'Enter' && document.activeElement === textBox.element) {
                if (textBox.value !== '') {
                    dialog.hide();
                    convertTextToUmlSequenceDiagram(textBox.value, diagram);
                }
            }
        });
    }, []);

    function printDiagram() {
        let options: IExportOptions = {};
        options.mode = 'Download';
        options.region = 'Content';
        options.multiplePage = diagram.pageSettings.multiplePage;
        options.pageHeight = diagram.pageSettings.height;
        options.pageWidth = diagram.pageSettings.width;
        diagram.print(options);
    }
    function toolbarClick(args: ClickEventArgs) {
        let item = args.item.tooltipText;
        switch (item) {
            case 'Select Tool':
                diagram.clearSelection();
                diagram.tool = DiagramTools.Default;
                break;
            case 'Pan Tool':
                diagram.clearSelection();
                diagram.tool = DiagramTools.ZoomPan;
                break;
            case 'New Diagram':
                diagram.clear();
                break;
            case 'Print Diagram':
                printDiagram();
                break;
            case 'Save Diagram':
                download(diagram.saveDiagram());
                break;
            case 'Open Diagram':
                (document.getElementsByClassName('e-file-select-wrap') as any)[0]
                    .querySelector('button')
                    .click();
                break;
        }
        diagram.dataBind();
    }
    function zoomChange(args: MenuEventArgs) {
        const zoomCurrentValue: DropDownButtonComponent = (document.getElementById("btnZoomIncrement") as any).ej2_instances[0];
        const currentZoom: number = diagram.scrollSettings.currentZoom!;
        let zoomFactor: number;
        switch (args.item.text) {
            case 'Zoom In':
                diagram.zoomTo({ type: 'ZoomIn', zoomFactor: 0.2 });
                break;
            case 'Zoom Out':
                diagram.zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });
                break;
            case 'Zoom to Fit':
                zoomFactor = 1 / currentZoom - 1;
                diagram.zoomTo({ zoomFactor });
                break;
            case 'Zoom to 50%':
                zoomFactor = 0.5 / currentZoom - 1;
                diagram.zoomTo({ zoomFactor });
                break;
            case 'Zoom to 100%':
                zoomFactor = 1 / currentZoom - 1;
                diagram.zoomTo({ zoomFactor });
                break;
            case 'Zoom to 200%':
                zoomFactor = 2 / currentZoom - 1;
                diagram.zoomTo({ zoomFactor });
                break;
        }

        zoomCurrentValue.content = Math.round(diagram.scrollSettings.currentZoom! * 100) + '%';
    }

    //Export the diagraming object based on the format.
    function onselectExport(args: MenuEventArgs) {
        let exportOptions: IExportOptions = {};
        exportOptions.format = args.item.text as FileFormats;
        exportOptions.mode = 'Download';
        exportOptions.region = 'PageSettings';
        exportOptions.fileName = 'Export';
        exportOptions.margin = { left: 0, top: 0, bottom: 0, right: 0 };
        diagram.exportDiagram(exportOptions);
    }
    function onUploadSuccess(args: any) {
        let file = args.file;
        let rawFile = file.rawFile;
        let reader = new FileReader();
        reader.readAsText(rawFile);
        reader.onloadend = loadDiagram;
    }
    function loadDiagram(event: any) {
        diagram.model = {fragments:[],messages:[],participants:[]};
        diagram.loadDiagram(event.target.result);
        diagram.fitToPage();
    }


    function download(data: string) {
        if ((window.navigator as any).msSaveBlob) {
            let blob: Blob = new Blob([data], { type: 'data:text/json;charset=utf-8,' });
            (window.navigator as any).msSaveOrOpenBlob(blob, 'Diagram.json');
        }
        else {
            let dataString = 'data:text/json;charset=utf-8,' + encodeURIComponent(data);
            let ele = document.createElement('a');
            ele.href = dataString;
            ele.download = 'Diagram.json';
            document.body.appendChild(ele);
            ele.click();
            ele.remove();
        }
    }

    function onTextBoxChange(args: InputEventArgs) {
        if (args.value !== '') {
            sendButton.disabled = false;
        } else {
            sendButton.disabled = true;
        }
    }

    const dialogContent = () => {
        return (
            <>
                <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>Suggested Prompts</p>
                <ButtonComponent ref={(btn1: ButtonComponent) => msgBtn1 = btn1 as ButtonComponent}
                    onClick={() => {
                        dialog.hide();
                        convertTextToUmlSequenceDiagram('Sequence Diagram for ATM Transaction Process', diagram);
                    }}
                    id="btn1" style={{ flex: 1, overflow: 'visible', borderRadius: '8px', marginBottom: '10px' }}
                >Sequence Diagram for ATM Transaction Process</ButtonComponent>

                <ButtonComponent
                    ref={(btn2: ButtonComponent) => msgBtn2 = btn2 as ButtonComponent}
                    id="btn2" style={{ flex: 1, overflow: 'visible', borderRadius: '8px', marginBottom: '10px' }}
                    onClick={() => {
                        dialog.hide();
                        convertTextToUmlSequenceDiagram('Sequence Diagram for User Authentication and Authorization', diagram);
                    }}
                >Sequence Diagram for User Authentication and Authorization</ButtonComponent>
                
                <ButtonComponent
                    ref={(btn3: ButtonComponent) => msgBtn3 = btn3 as ButtonComponent}
                    onClick={() => {
                        dialog.hide();
                        convertTextToUmlSequenceDiagram('Sequence Diagram for Medical Appointment Scheduling', diagram);
                    }}
                    id="btn3" style={{ flex: 1, overflow: 'visible', borderRadius: '8px', marginBottom: '10px' }}
                >Sequence Diagram for Medical Appointment Scheduling</ButtonComponent>
                
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                    <TextBoxComponent type="text" id="textBox" className="db-openai-textbox" style={{ flex: 1 }}
                        ref={(textboxObj: TextBoxComponent) => textBox = textboxObj as TextBoxComponent}
                        placeholder='Please enter your prompt here...' width={450} input={onTextBoxChange}
                    />
                    <ButtonComponent id="db-send"
                        ref={(btn: ButtonComponent) => sendButton = btn as ButtonComponent}
                        onClick={() => {
                            if (textBox.value) {
                            dialog.hide();
                            convertTextToUmlSequenceDiagram(textBox.value, diagram)
                            }
                        }}
                        iconCss='e-icons e-send' isPrimary={true} disabled={false}
                        style={{ marginLeft: '5px', height: '32px', width: '32px',paddingTop: '4px', paddingLeft: '6px' }}></ButtonComponent>
                </div>
            </>
        );
    }

    return (
        <>
                <link href="https://ej2.syncfusion.com/javascript/demos/src/diagram/styles/diagram-common.css" rel="stylesheet" />
                <div className="main">
                    <div className="diagram-upload-file">
                        <UploaderComponent
                            type="file"
                            id="fileupload"
                            name="UploadFiles"
                            asyncSettings={{
                                saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
                                removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
                            }}
                            success={onUploadSuccess}
                            showFileList={false}
                        />
                    </div>
                    <div className="db-toolbar-editor">
                        <div className="db-toolbar-container">
                            <ToolbarComponent id="toolbarEditor"
                                clicked={toolbarClick}
                                width='100%' height={49}
                            >
                                <ItemsDirective>
                                    <ItemDirective prefixIcon='e-icons e-circle-add' tooltipText='New Diagram' />
                                    <ItemDirective prefixIcon='e-icons e-folder-open' tooltipText='Open Diagram' />
                                    <ItemDirective prefixIcon='e-icons e-save' tooltipText='Save Diagram' />
                                    <ItemDirective prefixIcon='e-print e-icons' tooltipText='Print Diagram' />
                                    <ItemDirective type='Input' tooltipText='Export Diagram'
                                        template={() => <DropDownButtonComponent id="exportBtn" style={{ width: '100%' }}
                                            items={exportItems} iconCss='a-e-ddb-icons e-export' select={function (args: any) { onselectExport(args); }}
                                        ></DropDownButtonComponent>}
                                    />
                                    <ItemDirective prefixIcon='e-pan e-icons' tooltipText='Pan Tool' cssClass='tb-item-start pan-item' />
                                    <ItemDirective prefixIcon='e-mouse-pointer e-icons' tooltipText='Select Tool' cssClass='tb-item-middle tb-item-selected' />
                                    <ItemDirective cssClass='tb-item-end tb-zoom-dropdown-btn' align='Right'
                                        template={() => <DropDownButtonComponent id="btnZoomIncrement"
                                            items={zoomMenuItems} content={Math.round(diagram.scrollSettings.currentZoom! * 100) + ' %'} select={zoomChange}
                                        ></DropDownButtonComponent>}
                                    />
                                </ItemsDirective>
                            </ToolbarComponent>
                        </div>
                    </div>
                    <div id="uml-aidiagarm" style={{ marginTop: '5px', marginLeft: '5px', marginRight: '5px', border: '1px solid #b0b0b0' }}>
                        <DiagramComponent
                            ref={(diagramObj: DiagramComponent) => diagram = diagramObj as DiagramComponent}
                            id="diagram"
                            width="100%"
                            height="900px"
                            tool={DiagramTools.ZoomPan}
                            model={sequenceModel}
                            getNodeDefaults={(node: NodeModel) => {
                                // participant node
                                if (node.data instanceof UmlSequenceParticipant) {
                                    if (!((node.data as any).isActor)) {
                                        if (node.annotations && node.annotations[0] && node.annotations[0].style) {
                                            node.annotations[0].style.color = 'white';
                                        }
                                    }
                                }    // fragment node
                                else if (node.data instanceof UmlSequenceFragment) {
                                    node.style = { strokeColor: 'cornflowerblue' };
                                }
                            }}
                            scrollChange={(args: IScrollChangeEventArgs) => {
                                if (args.panState !== 'Start') {
                                    let zoomCurrentValue: any = (document.getElementById("btnZoomIncrement") as any).ej2_instances[0];
                                    zoomCurrentValue.content = Math.round(diagram.scrollSettings.currentZoom! * 100) + ' %';
                                }
                            }}
                        >
                            <Inject services={[PrintAndExport]} />
                        </DiagramComponent>
                    </div>
                </div>
                <div id='container'>
                    <DialogComponent
                        ref={(dialogObj: DialogComponent) => dialog = dialogObj as DialogComponent}
                        id='dialog'
                        header='<span class="e-icons e-assistview-icon" style="color: black;width:20px; font-size: 16px;"></span> AI Assist'
                        showCloseIcon={true}
                        isModal={true}
                        content={dialogContent}
                        target={document.getElementById('control-section') as HTMLElement}
                        width='540px'
                        visible={false}
                        height='310px'
                    />
                </div>
                <FabComponent id="ai-assist"
                    isPrimary={true} content='AI Assist' iconCss='e-icons e-assistview-icon' target="#diagram"
                    onClick={() => { dialog.show(); }}
                ></FabComponent>

                {/* Loading indicator container */}
                <div id="loadingContainer" className="loading-container">
                    <div className="loading-indicator"></div>
                    <div className="loading-text">Generating Sequence Diagram...</div>
                </div>
        </>
    )
}

export default AiSmartUmlSequenceDiagram