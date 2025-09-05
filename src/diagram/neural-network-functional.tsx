import * as React from "react";
import {
  DiagramComponent,
  NodeModel,
  ConnectorModel,
  DiagramTools,
  SnapConstraints,
  NodeConstraints,
  ConnectorConstraints
} from "@syncfusion/ej2-react-diagrams";
import { updateSampleSection } from "../common/sample-base";

// --- Neural net data/configs ---
const layerSizes = [3, 5, 4, 2];
const layerNames = [
  "Input Layer",
  "Hidden Layer 1",
  "Hidden Layer 2",
  "Output Layer"
];
const layerColors = ["#0087EA", "#FE871F", "#7925E5", "#04AE45"];
const strokeColors = layerColors;
const nodeLabels = [
  ["Feature 1", "Feature 2", "Feature 3"],
  ["H1-1", "H1-2", "H1-3", "H1-4", "H1-5"],
  ["H2-1", "H2-2", "H2-3", "H2-4"],
  ["Output 1", "Output 2"]
];

// -- Utility functions for style etc. --
function getConnectionColor(weight: number) {
  return weight >= 0 ? "#2196f3" : "#f44336";
}
function getConnectionWidth(absWeight: number) {
  return Math.max(1, Math.min(3, absWeight * 3));
}

function makeLayerLabelNode(i: number): NodeModel {
  const color = layerColors[i];
  return {
    id: `label_${i}`,
    offsetX: 100 + i * 250,
    offsetY: 50,
    width: 150,
    height: 40,
    style: { fill: "transparent", strokeColor: "transparent" },
    annotations: [{
      template: (
        `<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;">
            <div style="width:12px;height:12px;border-radius:6px;background:${color};margin-right:10px;"></div>
            <span style="font-weight:bold;font-size:14px;color:#495057;">${layerNames[i]}</span>
        </div>`
      )
    }],
    constraints: NodeConstraints.Default & ~NodeConstraints.Select
  };
}

function makeNeuronNode(l: number, n: number): NodeModel {
  const nodeLabel = nodeLabels[l][n];
  return {
    id: `neuron_${l}_${n}`,
    width: 70,
    height: 70,
    offsetX: 100 + l * 250,
    offsetY: 120 + ((5 - layerSizes[l]) * 100 / 2) + n * 100,
    style: { fill: layerColors[l], strokeColor: strokeColors[l], strokeWidth: 2 },
    shape: { type: "Basic", shape: "Ellipse" },
    annotations: [{
      content: nodeLabel,
      style: { fontSize: 12, color: "white", bold: true }
    }],
    tooltip: {
      content: (
        `<div style="padding:8px 12px; border-radius:6px; font-family:'Segoe UI',sans-serif; min-width:160px;">
          <div style="font-weight:bold;font-size:13px;margin-bottom:4px;">
            🧠 Neuron Information
          </div>
          <hr style="margin:2px 0 5px 0;"/>
          <div style="font-size:13px;margin-bottom:2px;">
            <span style="font-weight:bold;">Layer:</span>
            <span >${layerNames[l]}</span>
          </div>
          <div style="font-size:13px;">
            <span style="font-weight:bold;">Neuron:</span>
            <span >${nodeLabel}</span>
          </div>
        </div>`
      ),
      position: "TopCenter"
    },
    constraints: NodeConstraints.Default | NodeConstraints.Tooltip
  };
}

function makeConnector(l: number, n: number, m: number, weight: number): ConnectorModel {
  const absWeight = Math.abs(weight);
  const weightColor = weight >= 0 ? "#2ecc71" : "#e74c3c";
  return {
    id: `conn_${l}_${n}_${m}`,
    sourceID: `neuron_${l}_${n}`,
    targetID: `neuron_${l + 1}_${m}`,
    type: "Straight",
    style: {
      strokeColor: getConnectionColor(weight),
      strokeWidth: getConnectionWidth(absWeight),
      opacity: 0.7
    },
    targetDecorator: {
      shape: "Arrow",
      style: {
        fill: getConnectionColor(weight),
        strokeColor: getConnectionColor(weight)
      }
    },
    annotations: [{
      content: String(weight),
      style: { fontSize: 13, color: "#495057", fill: "white" }
    }],
    tooltip: {
      content: (
        `<div style="padding:8px 12px; border-radius:6px; font-family:'Segoe UI',sans-serif; min-width:160px;">
          <div style="font-weight:bold;font-size:13px;margin-bottom:4px;">
            🔗 Connection Details
          </div>
          <hr style="margin:2px 0 5px 0;"/>
          <div style="font-size:13px;margin-bottom:2px;">
            <span style="font-weight:bold;">Weight:</span>
            <span style="color:${weightColor};font-weight:bold;">${weight}</span>
          </div>
          <div style="font-size:13px;margin-bottom:1px;">
            <span style="font-weight:bold;">From:</span>
            <span >neuron_${l}_${n}</span>
          </div>
          <div style="font-size:13px;">
            <span style="font-weight:bold;">To:</span>
            <span >neuron_${l + 1}_${m}</span>
          </div>
        </div>`
      ),
      position: "TopCenter"
    },
    constraints: ConnectorConstraints.Default | ConnectorConstraints.Tooltip
  };
}

// Deterministic random for demo (seed)
function seededRandom() {
  let s = 42;
  return function () {
    s = Math.sin(s) * 10000;
    return s - Math.floor(s);
  };
}

// --- Build Diagram once (outside render) ---
let nodes: NodeModel[] = [];
let connectors: ConnectorModel[] = [];
(function buildDiagramData() {
  // Layer labels
  for (let i = 0; i < layerNames.length; i++) nodes.push(makeLayerLabelNode(i));
  // Neurons
  for (let l = 0; l < layerSizes.length; l++)
    for (let n = 0; n < layerSizes[l]; n++) nodes.push(makeNeuronNode(l, n));
  // Connectors
  let random = seededRandom();
  for (let l = 0; l < layerSizes.length - 1; l++) {
    for (let n = 0; n < layerSizes[l]; n++) {
      for (let m = 0; m < layerSizes[l + 1]; m++) {
        let weight = Math.round((random() * 2 - 1) * 100) / 100;
        connectors.push(makeConnector(l, n, m, weight));
      }
    }
  }
})();

let diagramInstance: DiagramComponent;

function NeuralNetworkDiagram() {
  const [showDiagram, setShowDiagram] = React.useState(false);
  React.useEffect(() => {
    updateSampleSection();
    if (diagramInstance) diagramInstance.fitToPage();
  }, []);

  return (
    <div className="control-pane">
      <div className="control-section" style={{opacity: showDiagram ? 1 : 0}}>
        <div style={{ width: "100%" }}>
          <DiagramComponent
            id="diagram"
            ref={(diagram: DiagramComponent) => (diagramInstance = diagram!)}
            width={"100%"}
            height={"600px"}
            nodes={nodes}
            connectors={connectors}
            snapSettings={{ constraints: SnapConstraints.None }}
            tool={DiagramTools.ZoomPan}
            created={() => {
                if (diagramInstance) diagramInstance.fitToPage();
                setTimeout(()=>{
                    setShowDiagram(true);
                }, 10)
            }}
            load={() => {
              setTimeout(() => {
                  if (diagramInstance) {
                      diagramInstance.fitToPage({
                          canZoomIn: true,
                          margin: { left: 0, right: 20, top: 0, bottom: 90 }
                      });
                  }
              });
            }}
          />
        </div>
      </div>
      <div id="action-description">
        <p>
          This sample provides an interactive visualization of a neural network architecture using the Syncfusion<sup>®</sup> EJ2 React Diagram component. It displays multi-layered networks with configurable neurons, connections, and data flow patterns.
        </p>
      </div>
      <div id="description">
        <p>
          This multi-layered neural network visualizer allows users to explore input, hidden, and output layers with configurable neurons. Connections clearly display weight values—positive in blue, negative in red—with thickness indicating magnitude. Interactive tooltip provide detailed information.
        </p>
      </div>
    </div>
  );
}

export default NeuralNetworkDiagram;