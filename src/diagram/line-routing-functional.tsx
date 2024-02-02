import * as ReactDOM from "react-dom";
import * as React from "react";
import {
  DiagramComponent,
  Diagram,
  NodeModel,
  ConnectorModel,
  Inject, LineRouting,
  PortVisibility,
  SnapConstraints,
  DiagramConstraints,
  ConnectorBridging
} from "@syncfusion/ej2-react-diagrams";
import { updateSampleSection } from "../common/sample-base";
 //Initialize Diagram Nodes
let nodes: NodeModel[] = [
  {
    id: 'start', offsetX: 115, offsetY: 110,
    shape: { type: 'Flow', shape: 'Terminator' },
    style: { fill: '#D5535D' },
    ports: [{ id: 'port1', offset: { x: 0.5, y: 0 }, visibility: PortVisibility.Hidden }],
    annotations: [{
      content: 'Start',
      style: { color: 'white' }
    }]
  },
  {
    id: 'process', offsetX: 115, offsetY: 255,
    shape: { type: 'Flow', shape: 'Process' },
    style: { fill: "#65B091" },
    annotations: [{
      content: 'Process',
      style: { color: 'white' }
    }]
  },
  {
    id: 'document', offsetX: 115, offsetY: 400,
    shape: { type: 'Flow', shape: 'Document' },
    style: { fill: "#5BA5F0" },
    ports: [{ id: 'port1', offset: { x: 0, y: 0.5 }, visibility: PortVisibility.Hidden }],
    annotations: [{
      content: 'Document',
      style: { color: 'white' }
    }]
  },
  {
    id: 'decision', offsetX: 390, offsetY: 110,
    shape: { type: 'Flow', shape: 'Decision' },
    style: { fill: "#9A8AF7" },
    annotations: [{
      content: 'Decision',
      style: { color: 'white' }
    }]
  },
  {
    id: 'document2', offsetX: 390, offsetY: 255,
    shape: { type: 'Flow', shape: 'Document' },
    style: { fill: "#5BA5F0" },
    annotations: [{
      content: 'Document',
      style: { color: 'white' }
    }]
  },
  {
    id: 'end', offsetX: 390, offsetY: 400,
    shape: { type: 'Flow', shape: 'Terminator' },
    style: { fill: "#9A8AF7" },
    annotations: [{
      content: 'End',
      style: { color: 'white' }
    }]
  },
  {
    id: 'process2', offsetX: 640, offsetY: 110,
    shape: { type: 'Flow', shape: 'Process' },
    style: { fill: "#65B091" },
    annotations: [{
      content: 'Process',
      style: { color: 'white' }
    }]
  },
  {
    id: 'card', offsetX: 640, offsetY: 255,
    shape: { type: 'Flow', shape: 'Card' },
    style: { fill: "#9A8AF7" },
    annotations: [{
      content: 'Card',
      style: { color: 'white' }
    }],
    ports: [
      { id: 'port1', offset: { x: 1, y: 0.5 }, visibility: PortVisibility.Hidden },
      { id: 'port2', offset: { x: 0.5, y: 1 }, visibility: PortVisibility.Hidden }
    ],
  }
];
 //Initialize Diagram Connectors
let connectors: ConnectorModel[] = [
  {
    id: 'Connector1', sourceID: 'start', targetID: 'process',
  },
  {
    id: 'Connector2', sourceID: 'process', targetID: 'document'
  },
  {
    id: 'Connector3', sourceID: 'document', targetID: 'end',
  },
  {
    id: 'Connector4', sourceID: 'start', targetID: 'decision'
  },
  {
    id: 'Connector5', sourceID: 'decision', targetID: 'process2',
  },
  {
    id: 'Connector6', sourceID: 'process2', targetID: 'card',
  },
  {
    id: 'Connector7', sourceID: 'process', targetID: 'document2'
  },
  {
    id: 'Connector8', sourceID: 'document2', targetID: 'card',
  },
  {
    id: 'Connector9', sourceID: 'start', sourcePortID: "port1",
    targetID: 'card', targetPortID: 'port1'
  },
  {
    id: 'Connector10', sourceID: 'card', sourcePortID: 'port2',
    targetID: 'document', targetPortID: 'port1'
  },
];

let diagramInstance: DiagramComponent;

function LineRoutingSample() {
  React.useEffect(() => {
    updateSampleSection();
    rendereComplete();
  }, [])
  function rendereComplete() {
    diagramInstance.fitToPage({ mode: 'Width' });
  }
  function getNodeDefaults(node: NodeModel): NodeModel {
    node.height = 50;
    if (node.id === 'decision') {
      node.height = 70;
    }
    node.width = 120;
    node.style = { strokeColor: 'transparent' };
    return node;
  }
  
  function getConnectorDefaults(connector: ConnectorModel): ConnectorModel {
    connector.type = 'Orthogonal';
    connector.style = { strokeColor: '#707070 ', strokeWidth: 1.25 };
    connector.targetDecorator = { style: { fill: '#707070 ', strokeColor: '#707070 ' } };
    return connector;
  }
    return (
      <div className="control-pane">
        <div className="control-section">
          <div className="content-wrapper" style={{ width: "100%" }}>
            <DiagramComponent
              id="diagram"
              ref={diagram => (diagramInstance = diagram)}
              width={"100%"}
              height={"499px"}
              snapSettings={{ constraints: SnapConstraints.None }}
              constraints={DiagramConstraints.Default | DiagramConstraints.LineRouting | DiagramConstraints.Bridging }
              nodes={nodes}
              connectors={connectors}
              getConnectorDefaults={getConnectorDefaults}
              getNodeDefaults={getNodeDefaults}
            >
              <Inject services={[LineRouting, ConnectorBridging]} />
            </DiagramComponent>
          </div>
        </div>
        <div id="action-description">
          <p>
            This sample visualizes the connectors that are automatically re-routing or moving away if any shape found on the connectors path.
          </p>
        </div>
        <div id="description">
          <p>
            This example shows how the connectors are automatically re-routing or moving away on dragging a shape near it. This can be achieved by the constraints property of the diagram and connector.
          </p>
        </div>
      </div >
    );
}
export default LineRoutingSample;