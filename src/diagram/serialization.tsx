import * as ReactDOM from "react-dom";
import * as React from "react";
import {
    SymbolPaletteComponent,
    SymbolInfo,
    PointPortModel,
    DiagramComponent,
    NodeModel,
    ConnectorModel,
    Node,
    Diagram,
    GridlinesModel,
    IDragEnterEventArgs,
    FlowShapes,
    Segments,
    DecoratorShapes
} from "@syncfusion/ej2-react-diagrams";
import { SampleBase } from "../common/sample-base";
import {
    ToolbarComponent,
    ClickEventArgs
} from "@syncfusion/ej2-react-navigations";
import { UploaderComponent } from "@syncfusion/ej2-react-inputs";
import "./font-icons.css";

// Global variables to hold instances of Diagram and Palette components.
let diagramInstance: DiagramComponent;
let paletteSpaceInstance: HTMLElement;

// Predefined styles for different types of nodes in the diagram.
const nodeStyles = {
    terminator: { fill: "#d0f0f1", strokeColor: "#797979", height: 50, width: 100 },
    process: { fill: "#fbfdc5", strokeColor: "#797979", height: 50, width: 120 },
    decision: { fill: "#c5efaf", strokeColor: "#797979", height: 90, width: 120 },
    delay: { fill: "#f8eee5", strokeColor: "#797979", height: 50, width: 100 }
};

// Function to create a node with given parameters.
function createNode(id: string, offsetX: number, offsetY: number, shapeType: FlowShapes, content: string, style: any): NodeModel {
    return {
        id: id,
        height: style.height,
        width: style.width,
        offsetX: offsetX,
        offsetY: offsetY,
        shape: { type: "Flow", shape: shapeType },
        annotations: [{ content: content }],
        style: { fill: style.fill, strokeColor: style.strokeColor }
    };
};

// Initializing nodes for the diagram.
let nodes: NodeModel[] = [
    createNode("Start", 250, 60, "Terminator", "Start", nodeStyles.terminator),
    createNode("Alarm", 250, 160, "Process", "Alarm Rings", nodeStyles.process),
    createNode("Ready", 250, 260, "Decision", "Ready to Get Up?", nodeStyles.decision),
    createNode("Climb", 250, 370, "Process", "Climb Out of Bed", nodeStyles.process),
    createNode("End", 250, 460, "Terminator", "End", nodeStyles.terminator),
    createNode("Relay", 450, 160, "Delay", "Relay", nodeStyles.delay),
    createNode("Hit", 450, 260, "Process", "Hit Snooze Button", nodeStyles.process)
];

// Function to create a connector with given parameters.
function createConnector(id: string, sourceID: string, targetID: string, annotations?: any[]): ConnectorModel {
    return {
        id: id,
        sourceID: sourceID,
        targetID: targetID,
        annotations: annotations
    };
};

// Initializing connectors for the diagram.
let connectors: ConnectorModel[] = [
    createConnector("connector1", "Start", "Alarm"),
    createConnector("connector2", "Alarm", "Ready"),
    createConnector("connector3", "Ready", "Climb", [{ content: "Yes", style: { fill: "white" } }]),
    createConnector("connector4", "Climb", "End"),
    createConnector("connector5", "Ready", "Hit", [{ content: "No", style: { fill: "white" } }]),
    createConnector("connector6", "Hit", "Relay"),
    createConnector("connector7", "Relay", "Alarm")
];

// Gridline configuration for the diagram.
let interval: number[] = [
    1,
    9,
    0.25,
    9.75,
    0.25,
    9.75,
    0.25,
    9.75,
    0.25,
    9.75,
    0.25,
    9.75,
    0.25,
    9.75,
    0.25,
    9.75,
    0.25,
    9.75,
    0.25,
    9.75
];

let gridlines: GridlinesModel = {
    lineColor: "#e0e0e0",
    lineIntervals: interval
};

// Preparing flow shapes for the symbol palette.
const flowShapeTypes = [
    "Terminator", "Process", "Decision", "Document",
    "PreDefinedProcess", "PaperTap", "DirectData",
    "SequentialData", "Sort", "MultiDocument",
    "Collate", "SummingJunction", "Or", "InternalStorage",
    "Extract", "ManualOperation", "Merge", "OffPageReference",
    "SequentialAccessStorage", "Annotation", "Annotation2",
    "Data", "Card", "Delay"
];
let flowshapes: NodeModel[] = flowShapeTypes.map(type => ({ id: type, shape: { type: "Flow", shape: type } }));

// Function to create a connector symbol for the symbol palette.
function createConnectorSymbol(id: string, type: Segments, targetDecoratorShape: DecoratorShapes = "None"): ConnectorModel {
    let connector: ConnectorModel = {
        id,
        type,
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 40, y: 40 },
        style: { strokeWidth: 2, strokeColor: '#757575' }
    };

    if (targetDecoratorShape !== "None") {
        connector.targetDecorator = { shape: targetDecoratorShape, style: { strokeColor: '#757575', fill: '#757575' } };
    }
    else {
        connector.targetDecorator = { shape: "None" };
    }

    return connector;
}

// Initializing connector symbols for the symbol palette.
let connectorSymbols: ConnectorModel[] = [
    createConnectorSymbol("Link1", "Orthogonal", "Arrow"),
    createConnectorSymbol("link2", "Orthogonal"),
    createConnectorSymbol("Link3", "Straight", "Arrow"),
    createConnectorSymbol("link4", "Straight"),
    createConnectorSymbol("link5", "Bezier")
];

// CSS styles specific to this sample.
const SAMPLE_CSS = `
  .diagram-serialization .e-upload {
    display: none;
  }

  .diagram-serialization #palette-icon {
    display: none;
  }

  @media (max-width: 550px) {
      .diagram-serialization #palette-icon {
          display: inline-flex;
      }
  }
`;

export class Serialization extends SampleBase<{}, {}> {
    render() {
        return (
            <div className="control-pane diagram-serialization">
                <style>{SAMPLE_CSS}</style>
                <div className="control-section">
                    <ToolbarComponent
                        id="toolbar_diagram"
                        style={{ width: "100%", height: "10%", marginTop: "10px" }}
                        clicked={(args: ClickEventArgs) => {
                            switch (args.item.text) {
                                case "New":
                                    diagramInstance.clear();
                                    break;
                                case "Load":
                                    document.getElementsByClassName("e-file-select-wrap")[0].querySelector("button").click();
                                    break;
                                case null:
                                    if (args.item.id === 'palette-icon') openPalette();
                                    break;
                                default:
                                    download(diagramInstance.saveDiagram());
                            }
                        }}
                        items={[
                            {
                                id: 'palette-icon',
                                prefixIcon: 'e-ddb-icons2 e-toggle-palette',
                                align: 'Right',
                            },
                            {
                                text: "New",
                                tooltipText: "New",
                                prefixIcon: "e-diagram-icons e-diagram-new"
                            },
                            { type: "Separator" },
                            {
                                text: "Save",
                                tooltipText: "Save",
                                prefixIcon: "e-diagram-icons e-diagram-save"
                            },
                            { type: "Separator" },
                            {
                                text: "Load",
                                tooltipText: "Load",
                                prefixIcon: "e-diagram-icons e-diagram-open"
                            }
                        ]}
                    />
                    <div style={{ width: "100%", height: "80%" }}>
                        <div id="palettespace" ref={palettespace => (paletteSpaceInstance = palettespace)} className="sb-mobile-palette">
                            <SymbolPaletteComponent
                                id="symbolpalette"
                                expandMode="Multiple"
                                palettes={[
                                    {
                                        id: "flow",
                                        expanded: true,
                                        symbols: flowshapes,
                                        iconCss: "e-diagram-icons1 e-diagram-flow",
                                        title: "Flow Shapes"
                                    },
                                    {
                                        id: "connectors",
                                        expanded: true,
                                        symbols: connectorSymbols,
                                        iconCss: "e-diagram-icons1 e-diagram-connector",
                                        title: "Connectors"
                                    }
                                ]} //set default value for Node.
                                getNodeDefaults={(symbol: NodeModel): void => {
                                    const strokeColor = '#757575';
                                    const dimensions = {
                                        'Terminator': { width: 80, height: 40 },
                                        'Process': { width: 80, height: 40 },
                                        'Delay': { width: 80, height: 40 },
                                        'Decision': { width: 50, height: 40 },
                                        'Document': { width: 50, height: 40 },
                                        'PreDefinedProcess': { width: 50, height: 40 },
                                        'PaperTap': { width: 50, height: 40 },
                                        'DirectData': { width: 50, height: 40 },
                                        'MultiDocument': { width: 50, height: 40 },
                                        'Data': { width: 50, height: 40 },
                                    };

                                    symbol.style.strokeColor = strokeColor;
                                    symbol.width = dimensions[symbol.id] ? dimensions[symbol.id].width : 50;
                                    symbol.height = dimensions[symbol.id] ? dimensions[symbol.id].height : 50;
                                }}
                                symbolMargin={{ left: 15, right: 15, top: 15, bottom: 15 }}
                                getSymbolInfo={(symbol: NodeModel): SymbolInfo => {
                                    return { fit: true };
                                }}
                                width={"100%"}
                                height={"700px"}
                                symbolHeight={60}
                                symbolWidth={60}
                            />
                        </div>

                        <div id="diagram-space" className="sb-mobile-diagram">
                            <DiagramComponent
                                id="diagram"
                                ref={diagram => (diagramInstance = diagram)}
                                width={"100%"}
                                height={"645px"}
                                nodes={nodes}
                                snapSettings={{
                                    horizontalGridlines: gridlines,
                                    verticalGridlines: gridlines
                                }}
                                connectors={connectors}
                                getConnectorDefaults={(args: ConnectorModel, diagram: Diagram) => {
                                    args.targetDecorator.height = 5;
                                    args.targetDecorator.width = 5;
                                    args.style.strokeColor = "#797979";
                                    args.targetDecorator.style = {
                                        fill: "#797979",
                                        strokeColor: "#797979"
                                    };
                                    return args;
                                }}
                                //Sets the Node style for DragEnter element.
                                dragEnter={(args: IDragEnterEventArgs): void => {
                                    let obj: NodeModel = args.element as NodeModel;
                                    if (obj instanceof Node) {
                                        let ratio: number = 100 / obj.width;
                                        obj.width = 100;
                                        obj.height *= ratio;
                                    }
                                }}
                                // event triggers after the diagram elements finished loading using loadDiagram method
                                loaded={() => {
                                    setTimeout(() => {
                                        diagramInstance.select([diagramInstance.nodes[0]]);
                                    }, 100);
                                }}
                            />
                        </div>
                        <UploaderComponent
                            type="file"
                            id="fileupload"
                            asyncSettings={{
                                saveUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Save',
                                removeUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Remove'
                            }}
                            success={onUploadSuccess}
                        />
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample visualizes building diagrams interactively and editing
                        the saved diagrams. Symbol Palette is used to easily build diagrams.
                    </p>
                </div>
                <div id="description">
                    <p>
                        This example shows how to drag-and-drop shapes and connectors from
                        symbol palette to build diagrams. You can save the diagram as text
                        files and edit the pre-saved diagrams.
                        The <code>saveDiagram</code> method can be used to save the diagram as string. The<code>loadDiagram</code> method can be used to load the diagram from a string.The <code>loaded</code> event is triggered once the diagram has completely loaded, and the first node in the diagram has been selected during the event call. In this example, context menu and undo/redo features are enabled.
                    </p>

                    <p style={{ fontWeight: 500 }}>Injecting Module</p>
                    <p>
                        The diagram component’s features are segregated into individual
                        feature-wise modules. To enable undo/redo support, inject{" "}
                        <code>UndoRedo</code> module into <code>services</code>. To enable
                        context menu, inject <code>DiagramContextMenu</code> module into{" "}
                        <code>services</code>.
                    </p>
                    <p>
                        The uploader API control is used to load the JSON data into a diagram asynchronously. Define the properties
                        <code>saveUrl</code>, which will receive the uploaded files and save them on the server, and <code>removeUrl</code>,
                        which will receive the file information and handle the removal of files from the server.
                    </p>
                    <br />
                </div>
            </div>
        );
    }
}

function onUploadSuccess(args: { [key: string]: Object }): void {
    // Extracts the file from the upload success event arguments.
    const file = (args.file as { [key: string]: Object }).rawFile as Blob;
    // Creates a FileReader to read the content of the file.
    const reader = new FileReader();
    // Reads the content of the file as a text string.
    reader.readAsText(file);
    // Assigns the loadDiagram function to execute when the file read operation completes.
    reader.onloadend = loadDiagram;
}

// Load the diagram object from a JSON string.
function loadDiagram(event: ProgressEvent): void {
    // Extracts the text content from the FileReader event.
    const result = (event.target as FileReader).result as string;
    // Loads the diagram from the JSON string.
    diagramInstance.loadDiagram(result);
}

// Save the diagram object as a JSON file.
function download(data: string): void {
    // MIME type for JSON data.
    const mimeType = "data:text/json;charset=utf-8,";
    // Checks for MS browser to use the msSaveBlob method.
    if ((window.navigator as any).msSaveBlob) {
        // Creates a new Blob object containing the JSON data.
        const blob = new Blob([data], { type: mimeType });
        // Saves or opens the blob depending on the browser capability.
        (window.navigator as any).msSaveOrOpenBlob(blob, "Diagram.json");
    } else {
        // Encodes the JSON data as a data URL.
        const dataStr = mimeType + encodeURIComponent(data);
        // Creates an anchor element to facilitate downloading.
        const downloadAnchor = document.createElement("a");
        downloadAnchor.href = dataStr;
        downloadAnchor.download = "Diagram.json";
        document.body.appendChild(downloadAnchor);
        // Triggers the download process.
        downloadAnchor.click();
        // Removes the anchor element from the document.
        downloadAnchor.remove();
    }
}

// Toggle the visibility of the palette on mobile devices.
function openPalette(): void {
    // Checks if the current viewport width is less than or equal to 550 pixels.
    const isMobile = window.matchMedia('(max-width:550px)').matches;
    if (isMobile) {
        // Toggles the class to show or hide the palette.
        paletteSpaceInstance.classList.toggle('sb-mobile-palette-open');
    }
}
