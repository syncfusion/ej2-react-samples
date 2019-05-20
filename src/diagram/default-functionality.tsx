import * as ReactDOM from "react-dom";
import * as React from "react";
import {
  DiagramComponent,
  SymbolInfo,
  IDragEnterEventArgs,
  SymbolPaletteComponent,
  NodeModel,
  ConnectorModel,
  PointPortModel,
  Node,
  Connector,
  GridlinesModel
} from "@syncfusion/ej2-react-diagrams";
import { SampleBase } from "../common/sample-base";
import "./font-icons.css";


/**
 * Diagram Default sample
 */

//Initializes the nodes for the diagram
let nodes: NodeModel[] = [
  {
    id: "NewIdea",
    height: 60,
    offsetX: 300,
    offsetY: 80,
    shape: { type: "Flow", shape: "Terminator" },
    annotations: [
      {
        content: "Place Order"
      }
    ]
  },
  {
    id: "Meeting",
    height: 60,
    offsetX: 300,
    offsetY: 160,
    shape: { type: "Flow", shape: "Process" },
    annotations: [
      {
        content: "Start Transaction"
      }
    ]
  },
  {
    id: "BoardDecision",
    height: 60,
    offsetX: 300,
    offsetY: 240,
    shape: { type: "Flow", shape: "Process" },
    annotations: [
      {
        content: "Verification"
      }
    ]
  },
  {
    id: "Project",
    height: 60,
    offsetX: 300,
    offsetY: 330,
    shape: { type: "Flow", shape: "Decision" },
    annotations: [
      {
        content: "Credit card valid?"
      }
    ]
  },
  {
    id: "End",
    height: 60,
    offsetX: 300,
    offsetY: 430,
    shape: { type: "Flow", shape: "Decision" },
    annotations: [
      {
        content: "Funds available?"
      }
    ]
  },
  {
    id: "node11",
    height: 60,
    offsetX: 545,
    offsetY: 330,
    shape: { type: "Flow", shape: "Process" },
    annotations: [
      {
        content: "Enter payment method"
      }
    ]
  },
  {
    id: "transaction_entered",
    height: 60,
    offsetX: 300,
    offsetY: 630,
    shape: { type: "Flow", shape: "Terminator" },
    annotations: [
      {
        content: "Log transaction"
      }
    ]
  },
  {
    id: "node12",
    height: 60,
    offsetX: 480,
    offsetY: 630,
    shape: { type: "Flow", shape: "Process" },
    annotations: [
      {
        content: "Reconcile the entries"
      }
    ]
  },
  {
    id: "transaction_completed",
    height: 60,
    offsetX: 300,
    offsetY: 530,
    shape: { type: "Flow", shape: "Process" },
    annotations: [
      {
        content: "Complete Transaction"
      }
    ]
  },
  {
    id: "Data",
    height: 45,
    offsetX: 110,
    offsetY: 530,
    shape: { type: "Flow", shape: "Data" },
    annotations: [
      {
        content: "Send e-mail",
        margin: { left: 25, right: 25 }
      }
    ]
  },
  {
    id: "node10",
    height: 70,
    offsetX: 475,
    offsetY: 530,
    shape: { type: "Flow", shape: "DirectData" },
    annotations: [
      { content: "Customer Database", margin: { left: 25, right: 25 } }
    ]
  }
];
//Initializes the connector for the diagram
let connectors: ConnectorModel[] = [
  {
    id: "connector1",
    sourceID: "NewIdea",
    targetID: "Meeting"
  },
  { id: "connector2", sourceID: "Meeting", targetID: "BoardDecision" },
  { id: "connector3", sourceID: "BoardDecision", targetID: "Project" },
  {
    id: "connector4",
    sourceID: "Project",
    annotations: [{ content: "Yes", style: { fill: "white" } }],
    targetID: "End"
  },
  {
    id: "connector5",
    sourceID: "End",
    annotations: [{ content: "Yes", style: { fill: "white" } }],
    targetID: "transaction_completed"
  },
  {
    id: "connector6",
    sourceID: "transaction_completed",
    targetID: "transaction_entered"
  },
  { id: "connector7", sourceID: "transaction_completed", targetID: "Data" },
  { id: "connector8", sourceID: "transaction_completed", targetID: "node10" },
  {
    id: "connector9",
    sourceID: "node11",
    targetID: "Meeting",
    segments: [{ direction: "Top", type: 'Orthogonal', length: 120 }]
  },
  {
    id: "connector10",
    sourceID: "End",
    annotations: [{ content: "No", style: { fill: "white" } }],
    targetID: "node11",
    segments: [{ direction: "Right", type: 'Orthogonal', length: 100 }]
  },
  {
    id: "connector11",
    sourceID: "Project",
    annotations: [{ content: "No", style: { fill: "white" } }],
    targetID: "node11"
  },
  {
    id: "connector12",
    style: { strokeDashArray: "2,2" },
    sourceID: "transaction_entered",
    targetID: "node12"
  }
];

//Initialize the flowshapes for the symbol palatte
let flowshapes: NodeModel[] = [
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
  { id: "Data", shape: { type: "Flow", shape: "Data" } },
  { id: "Card", shape: { type: "Flow", shape: "Card" } },
  { id: "Delay", shape: { type: "Flow", shape: "Delay" } }
];

//Initializes connector symbols for the symbol palette
let connectorSymbols: ConnectorModel[] = [
  {
    id: "Link1",
    type: "Orthogonal",
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 60, y: 60 },
    targetDecorator: { shape: "Arrow" },
    style: { strokeWidth: 1 }
  },
  {
    id: "link3",
    type: "Orthogonal",
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 60, y: 60 },
    style: { strokeWidth: 1 },
    targetDecorator: { shape: "None" }
  },
  {
    id: "Link21",
    type: "Straight",
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 60, y: 60 },
    targetDecorator: { shape: "Arrow" },
    style: { strokeWidth: 1 }
  },
  {
    id: "link23",
    type: "Straight",
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 60, y: 60 },
    style: { strokeWidth: 1 },
    targetDecorator: { shape: "None" }
  },
  {
    id: "link33",
    type: "Bezier",
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 60, y: 60 },
    style: { strokeWidth: 1 },
    targetDecorator: { shape: "None" }
  }
];
let interval: number[];
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
let gridlines: GridlinesModel = {
  lineColor: "#e0e0e0",
  lineIntervals: interval
};

export class Default extends SampleBase<{}, {}> {
  rendereComplete() {
    addEvents();
  }
  render() {
    return (
      <div className="control-pane">
        <div className="control-section">
          <div style={{ width: "100%" }}>
            <div className="sb-mobile-palette-bar">
              <div id="palette-icon" style={{ float: "right", role: "button" }} className="e-ddb-icons1 e-toggle-palette"></div>
            </div>
            <div
              id="palette-space" className="sb-mobile-palette"
            >
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
                ]}
                width={"100%"}
                height={"700px"}
                symbolHeight={60}
                symbolWidth={60}
                getNodeDefaults={(symbol: NodeModel): void => {
                  if (
                    symbol.id === "Terminator" ||
                    symbol.id === "Process" ||
                    symbol.id === "Delay"
                  ) {
                    symbol.width = 80;
                    symbol.height = 40;
                  } else if (
                    symbol.id === "Decision" ||
                    symbol.id === "Document" ||
                    symbol.id === "PreDefinedProcess" ||
                    symbol.id === "PaperTap" ||
                    symbol.id === "DirectData" ||
                    symbol.id === "MultiDocument" ||
                    symbol.id === "Data"
                  ) {
                    symbol.width = 50;
                    symbol.height = 40;
                  } else {
                    symbol.width = 50;
                    symbol.height = 50;
                  }
                }}
                symbolMargin={{ left: 15, right: 15, top: 15, bottom: 15 }}
                getSymbolInfo={(symbol: NodeModel): SymbolInfo => {
                  return { fit: true };
                }}
                
              />
            </div>
            <div
              id="diagram-space" className="sb-mobile-diagram"
            >
              <DiagramComponent
                id="diagram"
                width={"100%"}
                height={"700px"}
                snapSettings={{
                  horizontalGridlines: gridlines,
                  verticalGridlines: gridlines
                }}
                nodes={nodes}
                connectors={connectors} //Sets the default values of a node
                getNodeDefaults={(node: NodeModel) => {
                  let obj: NodeModel = {};
                  if (obj.width === undefined) {
                    obj.width = 145;
                  } else {
                    let ratio: number = 100 / obj.width;
                    obj.width = 100;
                    obj.height *= ratio;
                  }
                  obj.style = { fill: "#357BD2", strokeColor: "white" };
                  obj.annotations = [
                    { style: { color: "white", fill: "transparent" } }
                  ];

                  //Set ports
                  obj.ports = getPorts(node);
                  return obj;
                }} //Sets the default values of a connector
                getConnectorDefaults={(obj: Connector) => {
                  if (obj.id.indexOf("connector") !== -1) {
                    obj.type = "Orthogonal";
                    obj.targetDecorator = {
                      shape: "Arrow",
                      width: 10,
                      height: 10
                    };
                  }
                }}
                //Sets the Node style for DragEnter element.
                dragEnter={(args: IDragEnterEventArgs): void => {
                  let obj: NodeModel = args.element as NodeModel;
                  if (obj instanceof Node) {
                    let oWidth: number = obj.width;
                    let oHeight: number = obj.height;
                    let ratio: number = 100 / obj.width;
                    obj.width = 100;
                    obj.height *= ratio;
                    obj.offsetX += (obj.width - oWidth) / 2;
                    obj.offsetY += (obj.height - oHeight) / 2;
                    obj.style = { fill: "#357BD2", strokeColor: "white" };
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div id="action-description">
          <p>
            This sample visualizes the processing of an order placed using
            credit card with built-in flow shapes.
          </p>
        </div>
        <div id="description">
          <p>
            This example shows how to create a simple flow chart using the
            diagram control. The <code>nodes</code> property can be used to
            define different stages of a process. To define the flow between
            different stages, the <code>connectors</code> property can be used.
            The <code>getNodeDefaults</code> and{" "}
            <code>getConnectorDefaults</code> properties define the default
            behavior of shapes and connectors.
          </p>

          <p>
            To easily build flow diagrams, few shapes are predefined and added
            to symbol palette. You can drag-and-drop predefined shapes into the
            drawing area. The <code>symbols</code> property allows you to add
            predefined symbols to the palette.
          </p>

          <p>In this example, undo and redo support is enabled.</p>
          <p style={{ fontWeight: 500 }}>Injecting Module</p>
          <p>
            The diagram component’s features are segregated into individual
            feature-wise modules. To enable undo and redo support, inject{" "}
            <code>UndoRedo</code> module into <code>services</code>.
          </p>
          <br />
        </div>
      </div>
    );
  }
}

function getPorts(obj: NodeModel): PointPortModel[] {
  let ports: PointPortModel[] = [
    { id: "port1", shape: "Circle", offset: { x: 0, y: 0.5 } },
    { id: "port2", shape: "Circle", offset: { x: 0.5, y: 1 } },
    { id: "port3", shape: "Circle", offset: { x: 1, y: 0.5 } },
    { id: "port4", shape: "Circle", offset: { x: 0.5, y: 0 } }
  ];
  return ports;
}
let isMobile: boolean;

function addEvents(): void {
  isMobile = window.matchMedia('(max-width:550px)').matches;
  if (isMobile) {
    let paletteIcon: HTMLElement = document.getElementById('palette-icon');
    if (paletteIcon) {
      paletteIcon.addEventListener('click', openPalette, false);
    }
  }
}
// custom code start
function openPalette(): void {
  let paletteSpace: HTMLElement = document.getElementById('palette-space');
  isMobile = window.matchMedia('(max-width:550px)').matches;
  if (isMobile) {
    if (!paletteSpace.classList.contains('sb-mobile-palette-open')) {
      paletteSpace.classList.add('sb-mobile-palette-open');
    } else {
      paletteSpace.classList.remove('sb-mobile-palette-open');
    }
  }
}
// custom code end