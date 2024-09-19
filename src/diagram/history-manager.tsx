import * as ReactDOM from "react-dom";
import * as React from "react";
import {
    DiagramComponent,
    NodeModel,
    ConnectorModel,
    HistoryEntry,
    Inject,
    UndoRedo,
    IHistoryChangeArgs,
    SnapConstraints,
    FlowShapes
} from "@syncfusion/ej2-react-diagrams";
import { SampleBase } from "../common/sample-base";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { ListViewComponent } from "@syncfusion/ej2-react-lists";

// CSS for the history property section
let SAMPLE_CSS = `#historyPropertySection .row {
            margin-left: 0px;
            margin-right: 0px;
        }
        #historyControlSection.content-wrapper {
            border: 1px solid #D7D7D7;
        }

        #historyPropertySection .listbox {
            width: 100%;
            height: 50%;
        }

        #historyPropertySection .property-panel-content div:not(.heading) {
         padding: 0px;
        }

        #historyPropertySection .heading {
            color: #4e4949;
            font-size: 15px;
            height: 50px;
            width: 100%;
            border-bottom: 1px solid #d9dedd;
            padding: 10px;
        }`

// Helper function to create a NodeModel with default parameters
function createNode(
    id: string,
    offsetX: number,
    offsetY: number,
    fill: string,
    strokeColor: string,
    shape: FlowShapes,
    content: string,
    width: number = 70,
    height: number = 40,
    ports: any[] = []): NodeModel {
    return {
        id,
        offsetX,
        offsetY,
        style: { fill, strokeColor },
        width,
        height,
        shape: { type: 'Flow', shape: shape },
        annotations: [{ content }],
        ports
    };
}

// Initialize Diagram Nodes using the createNode function
let nodes: NodeModel[] = [
    createNode('node1', 400, 30, '#FFB2B2', '#FFB2B2', 'Terminator', 'Start'),
    createNode('node2', 400, 100, '#DCDCDC', '#DCDCDC', 'Process', 'Design', undefined, undefined, [{ id: 'designPort', offset: { x: 0, y: 0.5 } }]),
    createNode('node3', 400, 180, '#DCDCDC', '#DCDCDC', 'Process', 'Coding', undefined, undefined, [{ id: 'codingPort', offset: { x: 0, y: 0.5 } }]),
    createNode('node4', 400, 260, '#DCDCDC', '#DCDCDC', 'Process', 'Testing'),
    createNode('node5', 400, 340, '#A2D8B0', '#A2D8B0', 'Decision', 'Errors?', 80, 60),
    createNode('node6', 400, 430, '#FFB2B2', '#FFB2B2', 'Terminator', 'End'),
    createNode('node7', 220, 180, '#A2D8B0', '#A2D8B0', 'Decision', 'Design Error?', 100, 60, [
        { id: 'porterror', offset: { x: 0.5, y: 0 } },
        { id: 'portcoding', offset: { x: 1, y: 0.5 } },
        { id: 'portdesign', offset: { x: 0.5, y: 1 } }
    ])
];

// Helper function to create a ConnectorModel with default parameters
function createConnector(
    id: string,
    sourceID: string,
    targetID: string,
    annotations: any[],
    segments: any[] = [],
    sourcePortID: string = '',
    targetPortID: string = ''): ConnectorModel {
    return {
        id,
        sourceID,
        targetID,
        annotations,
        type: 'Orthogonal',
        segments,
        sourcePortID,
        targetPortID
    };
}

// Common labels for connectors
let noLabel = [{ content: 'No', style: { fill: 'white' } }];
let yesLabel = [{ content: 'Yes', style: { fill: 'white' } }];

// Initialize Diagram Connectors using the createConnector function
let connectors: ConnectorModel[] = [
    createConnector('connector1', 'node1', 'node2', []),
    createConnector('connector2', 'node2', 'node3', []),
    createConnector('connector3', 'node3', 'node4', []),
    createConnector('connector4', 'node4', 'node5', []),
    createConnector('connector5', 'node5', 'node6', noLabel),
    createConnector('connector6', 'node5', 'node7', yesLabel, [{ type: 'Orthogonal', length: 150, direction: 'Left' }]),
    createConnector('connector7', 'node7', 'node3', noLabel, [{ type: 'Orthogonal', length: 10, direction: 'Left' }], 'portcoding', 'codingPort'),
    createConnector('connector8', 'node7', 'node2', yesLabel, [], 'porterror', 'designPort')
];

// Declare variables for components and diagram instance
let diagramInstance: DiagramComponent;
let clearHistory: ButtonComponent;
let startActionInstance: ButtonComponent;
let endGroupAction: ButtonComponent;
let redoListInstance: ListViewComponent;
let undoListInstance: ListViewComponent;
let undoInstance: ButtonComponent;
let redoInstance: ButtonComponent;

// Define the React component for managing diagram history
export class HistoryManager extends SampleBase<{}, {}> {
    // Method called after rendering completes to fit diagram to page and setup event listeners
    rendereComplete() {
        diagramInstance.fitToPage({ mode: 'Height' });

        // Simplify event listener assignments
        const eventListeners: { [id: string]: (args?: any) => void } = {
            "undo": () => diagramInstance.undo(),
            "redo": () => diagramInstance.redo(),
            "StackLimit": (args?: any) => diagramInstance.setStackLimit((args as any).currentTarget.value),
            "startGroupAction": () => toggleGroupAction(),
            "clearHistory": () => {
                diagramInstance.clearHistory();
                updateHistoryLists();
            }
        };

        Object.keys(eventListeners).forEach(id => {
            document.getElementById(id).onclick = eventListeners[id] as any;
        });
    }

    // Method to render the component UI
    render() {
        return (
            <div className="control-pane1">
                <div className="col-lg-8 control-section">
                    <div id="historyControlSection" className="content-wrapper" style={{ width: "100%" }}>
                        <style>{SAMPLE_CSS}</style>
                        <DiagramComponent
                            id="diagram"
                            ref={diagram => (diagramInstance = diagram)}
                            width={"100%"}
                            height={"600px"}
                            snapSettings={{ constraints: SnapConstraints.None }}
                            nodes={nodes}
                            connectors={connectors}
                            getConnectorDefaults={getConnectorDefaults}
                            historyChange={(arg: IHistoryChangeArgs) => {
                                updateHistoryLists();
                            }}
                            getNodeDefaults={(obj: NodeModel) => {
                                obj.annotations[0].style.color = '#717171';
                                return obj;
                            }}
                        >
                            <Inject services={[UndoRedo]} />
                        </DiagramComponent>
                    </div>
                </div>
                <div id="historyPropertySection" className="col-lg-4 property-section" style={{ paddingRight: "0px" }}>
                    <div className="property-panel-header">
                        History manager settings
                    </div>
                    <div className="row property-panel-content" id="appearance">
                        <div className="row property-panel-content">
                            <div className="row">
                                <div className="listbox" style={{ height: "100%", border: "1px solid #e0e0e0" }}>
                                    <div className="heading" style={{ height: "40px" }}>
                                        <span>Undo Stack</span>
                                        <div style={{ float: "right", marginTop: "-5px" }}>
                                            <ButtonComponent id="undo" style={{ width: "100%" }} disabled={true} ref={undoBtn => (undoInstance = undoBtn)}>
                                                Undo
                                            </ButtonComponent>
                                        </div>
                                    </div>
                                    <div id='undoList'></div>
                                    <ListViewComponent
                                        id='undoList'
                                        height={'180px'}
                                        ref={undoList => (undoListInstance = undoList)}
                                    />
                                </div>
                            </div>
                            <div className="row" style={{ paddingTop: "8px" }}>
                                <div className="listbox" style={{ height: "100%", border: "1px solid #e0e0e0" }}>
                                    <div className="heading" style={{ height: "40px" }}>
                                        <span>Redo Stack</span>
                                        <div style={{ float: "right", marginTop: "-5px" }}>
                                            <ButtonComponent id="redo" style={{ width: "100%" }} disabled={true} ref={redoBtn => (redoInstance = redoBtn)}>
                                                Redo
                                            </ButtonComponent>
                                        </div>
                                    </div>
                                    <ListViewComponent
                                        id='redoList'
                                        height={'180px'}
                                        ref={redoList => (redoListInstance = redoList)}
                                    />
                                </div>
                            </div>
                            <div className="row" style={{ paddingTop: "10px" }}>
                                <div style={{ display: "table", height: "35px", paddingLeft: "0px" }} className="col-xs-6">
                                    <div style={{ display: "table-cell", verticalAlign: "middle" }}>Stack Limit</div>
                                </div>
                                <div className="col-xs-6" style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                                    <NumericTextBoxComponent id="StackLimit" value={0} min={0} max={50} width='100%' format='##.##' step={1} onChange={handleStackLimitChange} />
                                </div>
                            </div>
                            <div className="row" style={{ paddingTop: "10px" }}>
                                <div className="col-xs-6" style={{ paddingLeft: "0px" }}>
                                    <ButtonComponent ref={startGroupActionBtn => (startActionInstance = startGroupActionBtn)} id="startGroupAction" title='startGroupAction' style={{ width: "100%", overflow: "hidden", textOverflow: "ellipsis" }} isToggle={true}>
                                        Start Group Action
                                    </ButtonComponent>
                                </div>
                                <div className="col-xs-6" title='clearHistory' style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                                    <ButtonComponent id="clearHistory" style={{ width: "100%" }}>
                                        Clear History
                                    </ButtonComponent>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates viewing, deleting, limiting diagram history and groups diagram actions and stores it as
                        a single entry in the history manager.
                    </p>
                </div>
                <div id="description">
                    <p>
                        Diagram history are being handle all the diagram history. Using <code>stackLimit</code> property of the history manager
                        we limit the no. of entries can be stored on the diagram history. Also, we can get the list of entries in the undo
                        list and redo list using <code>undoStack</code> and <code>redoStack</code>. Also diagram history manager have the
                        option to group the action as the single entry by the help of the <code>startGroupAction</code> and <code>endGroupAction</code>        public
                        Api. Also, we can add the custom entries to the diagram history. method can be used to print the diagrams.
                    </p>

                </div>
            </div>
        );
    }
}

// Function to define default properties for connectors
function getConnectorDefaults(connector: ConnectorModel): ConnectorModel {
    connector.type = 'Orthogonal';
    connector.style.strokeColor = "#717171";
    connector.sourceDecorator.style.strokeColor = "#717171";
    connector.targetDecorator.style.strokeColor = "#717171";
    connector.sourceDecorator.style.fill = "#717171";
    connector.targetDecorator.style.fill = "#717171";
    return connector;
}

// Function to update lists and button states based on history
function updateHistoryLists(): void {
    // Simplify the process of creating data sources for undo and redo lists
    const createDataSource = (stack: HistoryEntry[]) => stack.map(entry => ({ 'text': entry.type, 'value': entry.type }));

    const undoDataSource = createDataSource(diagramInstance.historyManager.undoStack);
    const redoDataSource = createDataSource(diagramInstance.historyManager.redoStack);

    undoListInstance.dataSource = undoDataSource;
    (undoListInstance.fields as any) = { text: 'text', value: 'text' };
    (undoListInstance as any).index = 0;
    undoListInstance.dataBind();
    undoInstance.disabled = !undoDataSource.length;

    redoListInstance.dataSource = redoDataSource;
    (redoListInstance.fields as any) = { text: 'text', value: 'text' };
    (redoListInstance as any).index = 0;
    redoListInstance.dataBind();
    redoInstance.disabled = !redoDataSource.length;
}

// Toggle between starting and ending a group action
function toggleGroupAction(): void {
    if (startActionInstance.element.classList.contains('e-active')) {
        startActionInstance.content = 'End Group Action';
        diagramInstance.startGroupAction();
    } else {
        diagramInstance.endGroupAction();
        startActionInstance.content = 'Start Group Action';
    }
}

const handleStackLimitChange = (event) => {
    const newValue = event.target.value;
    diagramInstance.setStackLimit(newValue);
};