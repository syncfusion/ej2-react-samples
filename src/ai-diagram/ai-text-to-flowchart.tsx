import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    DiagramComponent, NodeModel, ConnectorModel,
    SymbolInfo, IDragEnterEventArgs, GridlinesModel, PaletteModel, Node,
    DataBinding, PrintAndExport, FlowchartLayout, Inject,
    SymbolPaletteComponent
} from '@syncfusion/ej2-react-diagrams';
import {
    Connector, DiagramTools, FileFormats, FlowShapeModel,
    IExportOptions, IScrollChangeEventArgs, PathAnnotationModel
} from '@syncfusion/ej2-react-diagrams';
import { ButtonComponent, FabComponent } from '@syncfusion/ej2-react-buttons';
import { DataManager } from "@syncfusion/ej2-data";
import { convertTextToFlowchart } from './ai-flowchart';
import { flowchartData, flowShapes, exportItems, zoomMenuItems, connectorSymbols } from './datasource';
import { ClickEventArgs, ItemDirective, ItemsDirective, ToolbarComponent } from '@syncfusion/ej2-react-navigations';
import { DropDownButtonComponent, MenuEventArgs } from '@syncfusion/ej2-react-splitbuttons';
import { InputEventArgs, TextBoxComponent, UploaderComponent } from '@syncfusion/ej2-react-inputs';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { useEffect } from 'react';
import './smart-flowchart.css';

function AiSmartFlowchart() {
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
                    convertTextToFlowchart(textBox.value, diagram);
                }
            }
        });
    }, []);
    //Sets the Node style for DragEnter element.
    function dragEnter(args: IDragEnterEventArgs): void {
        let obj: NodeModel = args.element as NodeModel;
        if (obj instanceof Node) {
            let oWidth: number = obj.width;
            let oHeight: number = obj.height;
            let ratio: number = 100 / obj.width;
            obj.width = 100;
            obj.height *= ratio;
            obj.offsetX += (obj.width - oWidth) / 2;
            obj.offsetY += (obj.height - oHeight) / 2;
            obj.style = { fill: '#357BD2', strokeColor: 'white' };
        }
    }

    function getSymbolDefaults(symbol: NodeModel): void {
        symbol.style = { strokeColor: '#757575' };
        const wideSymbols = new Set(['Terminator', 'Process', 'Delay']);
        const mediumSymbols = new Set(['Decision', 'Document', 'PreDefinedProcess', 'PaperTap', 'DirectData', 'MultiDocument', 'Data']);
        if (wideSymbols.has((symbol as Node).id)) {
            symbol.width = 80;
            symbol.height = 40;
        } else if (mediumSymbols.has((symbol as Node).id)) {
            symbol.width = 50;
            symbol.height = 40;
        } else {
            symbol.width = 50;
            symbol.height = 50;
        }
    }

    function getSymbolInfo(): SymbolInfo {
        return { fit: true };
    }
    let interval: number[] = [
        1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75
    ];

    let gridlines: GridlinesModel = { lineColor: '#e0e0e0', lineIntervals: interval };

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
        diagram.loadDiagram(event.target.result);
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

    let palettes: PaletteModel[] = [
        { id: 'flow', expanded: true, symbols: flowShapes, iconCss: 'ai-e-ddb-icons e-flow', title: 'Flow Shapes' },
        { id: 'connectors', expanded: true, symbols: connectorSymbols, iconCss: 'ai-e-ddb-icons e-connector', title: 'Connectors' }
    ];

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
                <ButtonComponent
                    id="btn2" style={{ flex: 1, overflow: 'visible', borderRadius: '8px', marginBottom: '10px' }}
                    onClick={() => {
                        dialog.hide();
                        convertTextToFlowchart("Flowchart for online shopping", diagram);
                    }}
                >Flowchart for online shopping</ButtonComponent>
                <ButtonComponent 
                    onClick={() => {
                        dialog.hide();
                        convertTextToFlowchart("Flowchart for Mobile banking registration", diagram);
                    }}
                    id="btn1" style={{ flex: 1, overflow: 'visible', borderRadius: '8px', marginBottom: '10px' }}>Flowchart for Mobile banking registration</ButtonComponent>
                <ButtonComponent
                    onClick={() => {
                        dialog.hide();
                        convertTextToFlowchart("Flowchart for Bus ticket booking", diagram);
                    }}
                    id="btn3" style={{ flex: 1, overflow: 'visible', borderRadius: '8px', marginBottom: '10px' }}>Flowchart for Bus ticket booking</ButtonComponent>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                    <TextBoxComponent type="text" id="textBox" className="db-openai-textbox" style={{ flex: 1 }}
                        ref={textboxObj => textBox = textboxObj as TextBoxComponent}
                        placeholder='Please enter your prompt here...' width={450} input={onTextBoxChange}
                    />
                    <ButtonComponent id="db-send"
                        ref={btn => sendButton = btn as ButtonComponent}
                        onClick={() => {
                            if (textBox.value) {
                                dialog.hide();
                                convertTextToFlowchart(textBox.value, diagram)
                            }
                        }}
                        iconCss='e-icons e-send' isPrimary={true} disabled={false}
                        style={{ marginLeft: '5px', height: '32px', width: '32px', paddingTop: '4px', paddingLeft: '6px'}}></ButtonComponent>
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
                                            items={exportItems} iconCss='ai-e-ddb-icons e-export' select={function (args: any) { onselectExport(args); }}
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
                    <div className="sb-mobile-palette-bar">
                        <div id="palette-icon" role="button" className="e-ddb-icons1 e-toggle-palette"></div>
                    </div>
                    <div id="palette-space" className="sb-mobile-palette">
                        <SymbolPaletteComponent
                            id="symbolpalette"
                            expandMode="Multiple"
                            palettes={palettes}
                            width="100%"
                            height="900px"
                            symbolHeight={60}
                            symbolWidth={60}
                            symbolMargin={{ left: 15, right: 15, top: 15, bottom: 15 }}
                            getNodeDefaults={getSymbolDefaults}
                            getSymbolInfo={getSymbolInfo}
                        />
                    </div>
                    <div id="diagram-space" className="sb-mobile-diagram">
                        <DiagramComponent
                            ref={diagramObj => diagram = diagramObj as DiagramComponent}
                            id="diagram"
                            width="100%"
                            height="900px"
                            rulerSettings={{ showRulers: true }}
                            tool={DiagramTools.Default}
                            snapSettings={{ horizontalGridlines: gridlines, verticalGridlines: gridlines }}
                            scrollSettings={{ scrollLimit: 'Infinity' }}
                            layout={{
                                type: 'Flowchart',
                                orientation: 'TopToBottom',
                                flowchartLayoutSettings: {
                                    yesBranchDirection: 'LeftInFlow',
                                    noBranchDirection: 'RightInFlow',
                                    yesBranchValues: ['Yes', 'True'],
                                    noBranchValues: ['No', 'False']
                                },
                                verticalSpacing: 50,
                                horizontalSpacing: 50
                            } as any}
                            dataSourceSettings={{
                                id: 'id',
                                parentId: 'parentId',
                                dataManager: new DataManager(flowchartData)
                            }}
                            scrollChange={(args: IScrollChangeEventArgs) => {
                                if (args.panState !== 'Start') {
                                    let zoomCurrentValue: any = (document.getElementById("btnZoomIncrement") as any).ej2_instances[0];
                                    zoomCurrentValue.content = Math.round(diagram.scrollSettings.currentZoom! * 100) + ' %';
                                }
                            }}
                            getNodeDefaults={(node: NodeModel): NodeModel => {
                                if (node.width === undefined) {
                                    node.width = 150;
                                    node.height = 50;
                                }
                                if ((node.shape as FlowShapeModel).type === 'Flow' && (node.shape as FlowShapeModel).shape === 'Decision') {
                                    node.width = 120;
                                    node.height = 100;
                                }
                                return node;
                            }}
                            getConnectorDefaults={(connector: Connector): ConnectorModel => {
                                connector.type = 'Orthogonal';
                                if (connector.annotations && connector.annotations.length > 0) {
                                    (connector.annotations as PathAnnotationModel[])[0]!.style!.fill = 'white';
                                }
                                return connector;
                            }}
                            dragEnter={dragEnter}
                        >
                            <Inject services={[DataBinding, PrintAndExport, FlowchartLayout]} />
                        </DiagramComponent>
                    </div>
                </div>
                <div id='container'>
                    <DialogComponent
                        ref={dialogObj => dialog = dialogObj as DialogComponent}
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
                    <div className="loading-text">Generating Flowchart...</div>
                </div>
        </>
    )
}

export default AiSmartFlowchart;