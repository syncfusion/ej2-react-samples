

import * as ReactDOM from "react-dom";
import * as React from "react";
import {
  SnapConstraints,
  PortVisibility,
  SymbolPaletteComponent,
  SymbolInfo,
  NodeModel,
  Connector,
  ConnectorModel,
  PointPortModel,
  DiagramComponent,
  Inject,
  UndoRedo,
  Rect
} from "@syncfusion/ej2-react-diagrams";
import { updateSampleSection } from "../common/sample-base";
//import { ExpandMode } from "@syncfusion/ej2-react-navigations";

//Initialize Diagram Nodes
let nodes: NodeModel[] = [{
  id: "Start",
  height: 40,
  width: 40,
  offsetX: 300,
  offsetY: 20,
  shape: { type: "UmlActivity", shape: "InitialNode" }
},
{
  id: "ReceiveCall",
  height: 40,
  width: 105,
  offsetX: 300,
  offsetY: 100,
  shape: { type: "UmlActivity", shape: "Action" },
  annotations: [{ content: "Receive Customer Call" }]
},
{
  id: "node2",
  height: 10,
  width: 70,
  offsetX: 300,
  offsetY: 170,
  shape: { type: "UmlActivity", shape: "ForkNode" }
},
{
  id: "Determine",
  height: 40,
  width: 105,
  offsetX: 190,
  offsetY: 250,
  shape: { type: "UmlActivity", shape: "Action" },
  annotations: [{ content: "Determine Type of Call" }]
},
{
  id: "Log",
  height: 40,
  width: 105,
  offsetX: 410,
  offsetY: 250,
  shape: { type: "UmlActivity", shape: "Action" },
  annotations: [{ content: "Customer Logging a Call" }]
},
{
  id: "node5",
  height: 50,
  width: 50,
  offsetX: 190,
  offsetY: 350,
  shape: { type: "UmlActivity", shape: "Decision" }
},
{
  id: "transfer_sales",
  height: 40,
  width: 105,
  offsetX: 100,
  offsetY: 450,
  shape: { type: "UmlActivity", shape: "Action" },
  annotations: [{ content: "Transfer the Call to Sales" }]
},
{
  id: "transfer_desk",
  height: 40,
  width: 105,
  offsetX: 280,
  offsetY: 450,
  shape: { type: "UmlActivity", shape: "Action" },
  annotations: [{ content: "Transfer the Call to Help Desk" }]
},
{
  id: "node8",
  height: 50,
  width: 50,
  offsetX: 190,
  offsetY: 540,
  shape: { type: "UmlActivity", shape: "MergeNode" }
},
{
  id: "node9",
  height: 10,
  width: 70,
  offsetX: 300,
  offsetY: 630,
  shape: { type: "UmlActivity", shape: "JoinNode" }
},
{
  id: "CloseCall",
  height: 40,
  width: 105,
  offsetX: 300,
  offsetY: 710,
  shape: { type: "UmlActivity", shape: "Action" },
  annotations: [{ content: "Close Call", margin: { left: 25, right: 25 } }]
},
{
  id: "node11",
  height: 40,
  width: 40,
  offsetX: 300,
  offsetY: 800,
  shape: { type: "UmlActivity", shape: "FinalNode" }
}];
//Initializes the connector for the diagram
let connectors: ConnectorModel[] = [
  {
    id: "connector1",
    sourceID: "Start",
    targetID: "ReceiveCall"
  },
  {
    id: "connector2",
    sourceID: "ReceiveCall",
    targetID: "node2"
  },
  {
    id: "connector3",
    sourceID: "node2",
    targetID: "Determine",
    sourcePortID: "port1",
    targetPortID: "portTop",
    segments: [
      { type: "Orthogonal", length: 20, direction: "Bottom" },
      { type: "Orthogonal", length: 50, direction: "Left" }
    ]
  },
  {
    id: "connector4",
    sourceID: "node2",
    targetID: "Log",
    sourcePortID: "port2",
    targetPortID: "portTop",
    segments: [
      { type: "Orthogonal", length: 20, direction: "Bottom" },
      { type: "Orthogonal", length: 50, direction: "Right" }
    ]
  },
  { id: "connector5", sourceID: "Determine", targetID: "node5" },
  {
    id: "connector6",
    sourceID: "node5",
    targetID: "transfer_sales",
    sourcePortID: "portLeft",
    targetPortID: "portTop",
    shape: {
      type: "UmlActivity",
      flow: "Association"
    },
    annotations: [
      {
        id: "connector6Label",
        content: "type=New Customer",
        offset: 0.715,
        style: { fill: "white", color: "black", textWrapping: 'NoWrap' }
      }
    ]
  },
  {
    id: "connector7",
    sourceID: "node5",
    targetID: "transfer_desk",
    sourcePortID: "portRight",
    targetPortID: "portTop",
    shape: {
      type: "UmlActivity",
      flow: "Association"
    },
    annotations: [
      {
        id: "connector7Label",
        content: "type=Existing Customer",
        offset: 0.75,
        style: { fill: "white", color: "black", textWrapping: 'NoWrap' }
      }
    ]
  },
  {
    id: "connector8",
    sourceID: "transfer_sales",
    targetID: "node8",
    sourcePortID: "portBottom",
    targetPortID: "portLeft",
    segments: [{ type: "Orthogonal", length: 50, direction: "Bottom" }]
  },
  {
    id: "connector9",
    sourceID: "transfer_desk",
    targetID: "node8",
    sourcePortID: "portBottom",
    targetPortID: "portRight",
    segments: [{ type: "Orthogonal", length: 50, direction: "Bottom" }]
  },
  {
    id: "connector10",
    sourceID: "node8",
    targetID: "node9",
    sourcePortID: "portBottom",
    targetPortID: "port3"
  },
  {
    id: "connector11",
    sourceID: "Log",
    targetID: "node9",
    sourcePortID: "portBottom",
    targetPortID: "port4",
    segments: [
      { type: "Orthogonal", length: 265, direction: "Bottom" },
      { type: "Orthogonal", length: 50, direction: "Left" }
    ]
  },
  { id: "connector12", sourceID: "node9", targetID: "CloseCall" },
  { id: "connector13", sourceID: "CloseCall", targetID: "node11" }
];

let diagramInstance: DiagramComponent;

let umlActivityShapes: NodeModel[] = [
  { id: 'Action', shape: { type: 'UmlActivity', shape: 'Action' } },
  { id: 'Decision', shape: { type: 'UmlActivity', shape: 'Decision' } },
  { id: 'MergeNode', shape: { type: 'UmlActivity', shape: 'MergeNode' } },
  { id: 'InitialNode', shape: { type: 'UmlActivity', shape: 'InitialNode' } },
  { id: 'FinalNode', shape: { type: 'UmlActivity', shape: 'FinalNode' } },
  { id: 'ForkNode', shape: { type: 'UmlActivity', shape: 'ForkNode' } },
  { id: 'JoinNode', shape: { type: 'UmlActivity', shape: 'JoinNode' } },
  { id: 'TimeEvent', shape: { type: 'UmlActivity', shape: 'TimeEvent' } },
  { id: 'AcceptingEvent', shape: { type: 'UmlActivity', shape: 'AcceptingEvent' } },
  { id: 'SendSignal', shape: { type: 'UmlActivity', shape: 'SendSignal' } },
  { id: 'ReceiveSignal', shape: { type: 'UmlActivity', shape: 'ReceiveSignal' } },
  { id: 'StructuredNode', shape: { type: 'UmlActivity', shape: 'StructuredNode' } },
  { id: 'Note', shape: { type: 'UmlActivity', shape: 'Note' } },
];

const SAMPLE_CSS = `
.sb-mobile-palette {
  width: 210px;
  height: 100%;
  float: left;
}

.sb-mobile-palette-bar {
  display: none;
}

.sb-mobile-diagram {
  width: calc(100% - 212px);
  height: 100%;
  float: left;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-left: none;
}

.container-fluid {
  padding-bottom: 15px;
}

@media (max-width: 550px) {

  .sb-mobile-palette {
      z-index: 19;
      position: absolute;
      display: none;
      transition: transform 300ms linear, visibility 0s linear 300ms;
      width: 39%;
      height: 100%;
  }

  .sb-mobile-palette-bar {
      display: block;
      width: 100%;
      background: #fafafa;
      padding: 10px 10px;
      border: 0.5px solid #e0e0e0;
      min-height: 40px;
  }

  .sb-mobile-diagram {
      width: 100%;
      height: 100%;
      float: left;
      left: 0px;
  }

  #palette-icon {
      font-size: 20px;
  }
}

.sb-mobile-palette-open {
  position: absolute;
  display: block;
  right: 15px;
}


.e-toggle-palette::before {
  content: "\e700"
}`;
function UmlActivityDiagram() {
  React.useEffect(() => {
    updateSampleSection();
    rendereComplete();
  }, [])
  function rendereComplete() {
    addEvents();
    let rect: DOMRect = document.getElementById('diagram-space').getBoundingClientRect();
    let panX: number = (rect.width - rect.x) / 2;
    diagramInstance.pan(panX, 0);
  }
  function getConnectors(): ConnectorModel[] {

    let connectorSymbols: ConnectorModel[] = [
      {
        id: 'Link1', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
        targetDecorator: { shape: 'Arrow', style: { strokeColor: '#757575', fill: '#757575' } }, style: { strokeWidth: 2, strokeColor: '#757575' }
      },
      {
        id: 'Link2', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
        targetDecorator: { shape: 'Arrow', style: { strokeColor: '#757575', fill: '#757575' } }, style: { strokeWidth: 2, strokeDashArray: '4 4', strokeColor: '#757575' }
      },
      {
        id: 'Link3', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
        targetDecorator: { shape: 'Arrow', style: { strokeColor: '#757575', fill: '#757575' } }, style: { strokeWidth: 2, strokeColor: '#757575' }
      }
    ];
    return connectorSymbols;
  }

  //Create and add ports for node.
  function getNodePorts(obj: NodeModel): PointPortModel[] {
    if (obj.id === 'node2' || obj.id === 'node9') {
      let node2Ports: PointPortModel[] = [
        { id: 'port1', offset: { x: 0.2, y: 1 } },
        { id: 'port2', offset: { x: 0.8, y: 1 } },
        { id: 'port3', offset: { x: 0.2, y: 0 } },
        { id: 'port4', offset: { x: 0.8, y: 0 } },
      ];
      return node2Ports;
    } else {
      let ports: PointPortModel[] = [
        { id: 'portLeft', offset: { x: 0, y: 0.5 } },
        { id: 'portRight', offset: { x: 1, y: 0.5 } },
        { id: 'portBottom', offset: { x: 0.5, y: 1 } },
        { id: 'portTop', offset: { x: 0.5, y: 0 } },
      ];
      return ports;
    }
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
  return (
    <div className="control-pane">
      <style>{SAMPLE_CSS}</style>
      <div className="control-section">
        <div id="umlActivityDiagram" style={{ width: "100%", height: "521px" }}>
          <div className="sb-mobile-palette-bar">
            <div id="palette-icon" style={{ float: "right" }} className="e-ddb-icons1 e-toggle-palette"></div>
          </div>
          <div
            id="palette-space"
            className="sb-mobile-palette"
          >
            <SymbolPaletteComponent
              id="symbolpalette"
              expandMode="Multiple"
              palettes={[
                {
                  id: "umlActivity",
                  expanded: true,
                  symbols: umlActivityShapes,
                  title: "UML Shapes"
                },
                {
                  id: "connectors",
                  expanded: true,
                  symbols: getConnectors(),
                  title: "Connectors"
                }
              ]}
              width={"100%"}
              height={"505px"}
              //Sets the default values of node
              getNodeDefaults={(symbol: NodeModel): void => {
                if (symbol.id === 'JoinNode') {
                  symbol.width = 20; symbol.height = 50;
                } else if (symbol.id === 'ForkNode') {
                  symbol.width = 50; symbol.height = 20;
                } else if (symbol.id === 'Decision' || symbol.id === 'MergeNode') {
                  symbol.width = 50; symbol.height = 40;
                } else {
                  symbol.width = 50; symbol.height = 50;
                }
                if (symbol.id === 'InitialNode' || symbol.id === 'FinalNode' || symbol.id === 'JoinNode' || symbol.id === 'ForkNode') {
                  symbol.style.fill = '#757575';
                }
                symbol.style.strokeColor = '#757575';
              }}
              symbolHeight={55}
              symbolWidth={55}
              symbolMargin={{ left: 15, right: 15, top: 15, bottom: 15 }}
              getSymbolInfo={(symbol: NodeModel): SymbolInfo => {
                return { fit: true };
              }}
            ><Inject services={[UndoRedo]} />
            </SymbolPaletteComponent>
          </div>

          <div
            id="diagram-space"
            className="sb-mobile-diagram"
          >
            <DiagramComponent
              id="diagram"
              ref={diagram => (diagramInstance = diagram)}
              width={"100%"}
              height={"100%"}
              nodes={nodes}
              connectors={connectors}
              snapSettings={{ constraints: SnapConstraints.None }}
              getNodeDefaults={(obj: NodeModel) => {
                obj.ports = getNodePorts(obj);
                if (obj.ports) {
                  for (let i: number = 0; i < obj.ports.length; i++) {
                    obj.ports[i].visibility = PortVisibility.Hidden;
                  }
                }
                if (obj.id === 'Start' || obj.id === 'node2' || obj.id === 'node9' || obj.id === 'node11') {
                  obj.style.fill = '#444';
                }
                obj.style.strokeColor = '#444';
                return obj;
              }} //Sets the default values of a connector
              getConnectorDefaults={(obj: Connector) => {
                if (obj.id.indexOf('connector') !== -1) {
                  obj.type = 'Orthogonal'; obj.cornerRadius = 10;
                  obj.targetDecorator = { shape: 'OpenArrow', style: { strokeColor: '#444', fill: '#444' } };
                }
              }}
            ><Inject services={[UndoRedo]} />
            </DiagramComponent>
          </div>
        </div>
      </div>
      <div id="action-description">
        <p>
          This sample represents the message flow from one activity to another in customer service using built-in UML activity shapes
        </p>
      </div>
      <div id="description">
        <p>
          This example shows how to create activity shapes using diagram <code>UMLActivity</code> shapes. The   <code>type</code> property of the
          <code>shape</code> can be used to create <code>UMLActivity</code> nodes. The <code>shape</code> property of the shape allows you to create UML
          activity shapes.
        </p>
        <br />
      </div>
    </div>
  );
}
export default UmlActivityDiagram;
