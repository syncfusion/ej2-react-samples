import * as React from "react";
import { SymbolPaletteComponent, DiagramComponent, Node } from "@syncfusion/ej2-react-diagrams";
import { SampleBase } from "../common/sample-base";
import { ToolbarComponent } from "@syncfusion/ej2-react-navigations";
import { UploaderComponent } from "@syncfusion/ej2-react-inputs";
import "./font-icons.css";
let diagramInstance;
//Initializes the nodes for the diagram
let nodes = [
    {
        id: "Start",
        height: 50,
        width: 100,
        offsetX: 250,
        offsetY: 60,
        shape: { type: "Flow", shape: "Terminator" },
        annotations: [
            {
                content: "Start"
            }
        ],
        style: { fill: "#d0f0f1", strokeColor: "#797979" }
    },
    {
        id: "Alarm",
        height: 50,
        width: 100,
        offsetX: 250,
        offsetY: 160,
        shape: { type: "Flow", shape: "Process" },
        annotations: [
            {
                content: "Alarm Rings"
            }
        ],
        style: { fill: "#fbfdc5", strokeColor: "#797979" }
    },
    {
        id: "Ready",
        height: 80,
        width: 100,
        offsetX: 250,
        offsetY: 260,
        shape: { type: "Flow", shape: "Decision" },
        annotations: [
            {
                content: "Ready to Get Up?",
                margin: { top: 25, left: 10, right: 10, bottom: 10 }
            }
        ],
        style: { fill: "#c5efaf", strokeColor: "#797979" }
    },
    {
        id: "Climb",
        height: 50,
        width: 100,
        offsetX: 250,
        offsetY: 370,
        shape: { type: "Flow", shape: "Process" },
        annotations: [
            {
                content: "Climb Out of Bed"
            }
        ],
        style: { fill: "#fbfdc5", strokeColor: "#797979" }
    },
    {
        id: "End",
        height: 50,
        width: 100,
        offsetX: 250,
        offsetY: 460,
        shape: { type: "Flow", shape: "Terminator" },
        annotations: [
            {
                content: "End"
            }
        ],
        style: { fill: "#d0f0f1", strokeColor: "#797979" }
    },
    {
        id: "Relay",
        height: 50,
        width: 100,
        offsetX: 450,
        offsetY: 160,
        shape: { type: "Flow", shape: "Delay" },
        annotations: [
            {
                content: "Relay"
            }
        ],
        style: { fill: "#f8eee5", strokeColor: "#797979" }
    },
    {
        id: "Hit",
        height: 50,
        width: 100,
        offsetX: 450,
        offsetY: 260,
        shape: { type: "Flow", shape: "Process" },
        annotations: [
            {
                content: "Hit Snooze Button",
                margin: { top: 10, left: 10, right: 10, bottom: 10 }
            }
        ],
        style: { fill: "#fbfdc5", strokeColor: "#797979" }
    }
];
let interval;
interval = [
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
let gridlines = {
    lineColor: "#e0e0e0",
    lineIntervals: interval
};
//Initializes the connector for the diagram
let connectors = [
    {
        id: "connector1",
        sourceID: "Start",
        targetID: "Alarm"
    },
    { id: "connector2", sourceID: "Alarm", targetID: "Ready" },
    {
        id: "connector3",
        sourceID: "Ready",
        targetID: "Climb",
        annotations: [{ content: "Yes", style: { fill: "white" } }]
    },
    { id: "connector4", sourceID: "Climb", targetID: "End" },
    {
        id: "connector5",
        sourceID: "Ready",
        targetID: "Hit",
        annotations: [{ content: "No", style: { fill: "white" } }]
    },
    { id: "connector6", sourceID: "Hit", targetID: "Relay" },
    { id: "connector7", sourceID: "Relay", targetID: "Alarm" }
];
//Initialize the flowshapes for the symbol palatte
let flowshapes = [
    { id: "Terminator", shape: { type: "Flow", shape: "Terminator" } },
    { id: "Process", shape: { type: "Flow", shape: "Process" } },
    { id: "Decision", shape: { type: "Flow", shape: "Decision" } },
    { id: "Document", shape: { type: "Flow", shape: "Document" } },
    {
        id: "PreDefinedProcess",
        shape: { type: "Flow", shape: "PreDefinedProcess" }
    },
    { id: "PaperTap", shape: { type: "Flow", shape: "PaperTap" } },
    { id: "DirectData", shape: { type: "Flow", shape: "DirectData" } },
    { id: "SequentialData", shape: { type: "Flow", shape: "SequentialData" } },
    { id: "Sort", shape: { type: "Flow", shape: "Sort" } },
    { id: "MultiDocument", shape: { type: "Flow", shape: "MultiDocument" } },
    { id: "Collate", shape: { type: "Flow", shape: "Collate" } },
    { id: "SummingJunction", shape: { type: "Flow", shape: "SummingJunction" } },
    { id: "Or", shape: { type: "Flow", shape: "Or" } },
    { id: "InternalStorage", shape: { type: "Flow", shape: "InternalStorage" } },
    { id: "Extract", shape: { type: "Flow", shape: "Extract" } },
    { id: "ManualOperation", shape: { type: "Flow", shape: "ManualOperation" } },
    { id: "Merge", shape: { type: "Flow", shape: "Merge" } },
    {
        id: "OffPageReference",
        shape: { type: "Flow", shape: "OffPageReference" }
    },
    {
        id: "SequentialAccessStorage",
        shape: { type: "Flow", shape: "SequentialAccessStorage" }
    },
    { id: "Annotation", shape: { type: "Flow", shape: "Annotation" } },
    { id: "Annotation2", shape: { type: "Flow", shape: "Annotation2" } },
    { id: "data", shape: { type: "Flow", shape: "Data" } },
    { id: "Card", shape: { type: "Flow", shape: "Card" } },
    { id: "Delay", shape: { type: "Flow", shape: "Delay" } }
];
//Initializes connector symbols for the symbol palette
let connectorSymbols = [
    {
        id: "Link1",
        type: "Orthogonal",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 40, y: 40 },
        targetDecorator: { shape: "Arrow" },
        style: { strokeWidth: 2 }
    },
    {
        id: "link2",
        type: "Orthogonal",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 40, y: 40 },
        style: { strokeWidth: 2 },
        targetDecorator: { shape: "None" }
    },
    {
        id: "Link3",
        type: "Straight",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 40, y: 40 },
        targetDecorator: { shape: "Arrow" },
        style: { strokeWidth: 2 }
    },
    {
        id: "link4",
        type: "Straight",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 40, y: 40 },
        style: { strokeWidth: 2 },
        targetDecorator: { shape: "None" }
    },
    {
        id: "link5",
        type: "Bezier",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 40, y: 40 },
        style: { strokeWidth: 2 },
        targetDecorator: { shape: "None" }
    }
];
const SAMPLE_CSS = `
  .e-upload {
    display: none;
  }

  #palette-icon {
    display: none;
  }

  @media (max-width: 550px) {
      #palette-icon {
          display: inline-flex;
      }
  }
`;
export class Serialization extends SampleBase {
    render() {
        return (<div className="control-pane">
        <style>{SAMPLE_CSS}</style>
        <div className="control-section">
          <ToolbarComponent id="toolbar_diagram" style={{ width: "100%", height: "10%", marginTop: "10px" }} clicked={(args) => {
            if (args.item.text === "New") {
                diagramInstance.clear();
            }
            else if (args.item.text === "Load") {
                document
                    .getElementsByClassName("e-file-select-wrap")[0]
                    .querySelector("button")
                    .click();
            }
            else if (args.item.id === 'palette-icon') {
                openPalette();
            }
            else {
                download(diagramInstance.saveDiagram());
            }
        }} items={[
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
        ]}/>
          <div style={{ width: "100%", height: "80%" }}>
            <div id="palette-space" className="sb-mobile-palette">
              <SymbolPaletteComponent id="symbolpalette" expandMode="Multiple" palettes={[
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
         getNodeDefaults={(symbol) => {
            if (symbol.id === "Terminator" ||
                symbol.id === "Process" ||
                symbol.id === "Delay") {
                symbol.width = 80;
                symbol.height = 40;
            }
            else if (symbol.id === "Decision" ||
                symbol.id === "Document" ||
                symbol.id === "PreDefinedProcess" ||
                symbol.id === "PaperTap" ||
                symbol.id === "DirectData" ||
                symbol.id === "MultiDocument" ||
                symbol.id === "Data") {
                symbol.width = 50;
                symbol.height = 40;
            }
            else {
                symbol.width = 50;
                symbol.height = 50;
            }
        }} symbolMargin={{ left: 15, right: 15, top: 15, bottom: 15 }} getSymbolInfo={(symbol) => {
            return { fit: true };
        }} width={"100%"} height={"700px"} symbolHeight={60} symbolWidth={60}/>
            </div>

            <div id="diagram-space" className="sb-mobile-diagram">
              <DiagramComponent id="diagram" ref={diagram => (diagramInstance = diagram)} width={"100%"} height={"645px"} nodes={nodes} snapSettings={{
            horizontalGridlines: gridlines,
            verticalGridlines: gridlines
        }} connectors={connectors} getConnectorDefaults={(args, diagram) => {
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
        dragEnter={(args) => {
            let obj = args.element;
            if (obj instanceof Node) {
                let ratio = 100 / obj.width;
                obj.width = 100;
                obj.height *= ratio;
            }
        }}/>
            </div>
            <UploaderComponent type="file" id="fileupload" asyncSettings={{
            saveUrl: "https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save",
            removeUrl: "https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove"
        }} success={onUploadSuccess}/>
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
            files and edit the pre-saved diagrams. The <code>saveDiagram</code>{" "}
            method can be used to save the diagram as string. The{" "}
            <code>loadDiagram</code> method can be used to load the diagram from
            a string. In this example, context menu and undo/redo features are
            enabled.
          </p>

          <p style={{ fontWeight: 500 }}>Injecting Module</p>
          <p>
            The diagram component’s features are segregated into individual
            feature-wise modules. To enable undo/redo support, inject{" "}
            <code>UndoRedo</code> module into <code>services</code>. To enable
            context menu, inject <code>DiagramContextMenu</code> module into{" "}
            <code>services</code>.
          </p>
          <br />
        </div>
      </div>);
    }
}
function onUploadSuccess(args) {
    let file1 = args.file;
    let file = file1.rawFile;
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = loadDiagram;
}
//Load the diagraming object.
function loadDiagram(event) {
    diagramInstance.loadDiagram(event.target.result);
}
//save the diagram object in json data.
function download(data) {
    if (window.navigator.msSaveBlob) {
        var blob = new Blob([data], { type: "data:text/json;charset=utf-8," });
        window.navigator.msSaveOrOpenBlob(blob, "Diagram.json");
    }
    else {
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(data);
        var a = document.createElement("a");
        a.href = dataStr;
        a.download = "Diagram.json";
        document.body.appendChild(a);
        a.click();
        a.remove();
    }
}
//create and add ports for Node.
function getPorts(obj) {
    let ports = [
        { id: "port1", shape: "Circle", offset: { x: 0, y: 0.5 } },
        { id: "port2", shape: "Circle", offset: { x: 0.5, y: 1 } },
        { id: "port3", shape: "Circle", offset: { x: 1, y: 0.5 } },
        { id: "port4", shape: "Circle", offset: { x: 0.5, y: 0 } }
    ];
    let additionalports = [
        { id: "port2", shape: "Circle", offset: { x: 0.5, y: 1 } },
        { id: "port4", shape: "Circle", offset: { x: 0.5, y: 0 } }
    ];
    if (obj.id === "Data") {
        return additionalports;
    }
    else {
        return ports;
    }
}
function openPalette() {
    let isMobile;
    let paletteSpace = document.getElementById('palette-space');
    isMobile = window.matchMedia('(max-width:550px)').matches;
    if (isMobile) {
        if (!paletteSpace.classList.contains('sb-mobile-palette-open')) {
            paletteSpace.classList.add('sb-mobile-palette-open');
        }
        else {
            paletteSpace.classList.remove('sb-mobile-palette-open');
        }
    }
}
