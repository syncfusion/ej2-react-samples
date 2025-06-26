// Import necessary modules from React and Syncfusion React Diagrams
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
  DiagramComponent,
  Node, Diagram, UndoRedo,
  NodeModel, ConnectorModel,
  BpmnDiagrams, DiagramTools,
  NodeConstraints, UserHandleModel,
  SymbolPalette, SymbolPaletteComponent,
} from '@syncfusion/ej2-react-diagrams';
import { SampleBase } from '../common/sample-base';
import { SwitchComponent } from '@syncfusion/ej2-react-buttons';
import { ItemDirective, ItemsDirective, ToolbarComponent } from '@syncfusion/ej2-react-navigations';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

// Inject necessary modules into DiagramComponent
Diagram.Inject(UndoRedo, BpmnDiagrams);
SymbolPalette.Inject(BpmnDiagrams);


// Declare variables for diagram instance, toolbar instance, and workflow management
let diagramInstance: DiagramComponent;
let toolbarEditor: ToolbarComponent;
let flowInterval: any;
let flowTimeOut1: any;
let flowTimeOut2: any;
let switchTooltipRef: any;
let switchRef: any;
let switchContainerRef: any;
let symbolPaletteRef: any;

let isPaused = false;
let animationIntervals = [];
let connectorBeforeAnimationColor = "#B0B0B0";
let connectorDuringAnimationColor = "#FF7F50";
let connectorAfterAnimationColor = "green";
let connectorAnnotationColor = "#32CD32";
let nodeStrokeBeforeAnimationColor = "black";
let nodeStrokeAfterAnimationColor = "green";
let isEditMode = false;

//Initializes the nodes for the diagram
let nodes: NodeModel[] = [
  {
    id: "start",
    offsetX: 100,
    offsetY: 380,
    shape: {
      type: "Bpmn",
      shape: "Event",
      event: { event: "Start", trigger: "None" },
    },
    annotations: [{ content: "Start" }],
  },
  {
    id: "liquidInput",
    offsetX: 300,
    offsetY: 280,
    shape: {
      type: "Bpmn",
      shape: "Activity",
      activity: { activity: "Task" },
    },
    annotations: [{ content: "Liquid Input" }],
  },
  {
    id: "dryInput",
    offsetX: 300,
    offsetY: 480,
    shape: {
      type: "Bpmn",
      shape: "Activity",
      activity: { activity: "Task" },
    },
    annotations: [{ content: "Dry Input" }],
  },
  {
    id: "condensed",
    offsetX: 500,
    offsetY: 180,
    shape: {
      type: "Bpmn",
      shape: "Activity",
      activity: { activity: "Task" },
    },
    annotations: [{ content: "Condensed" }],
  },
  {
    id: "cream",
    offsetX: 500,
    offsetY: 260,
    shape: {
      type: "Bpmn",
      shape: "Activity",
      activity: { activity: "Task" },
    },
    annotations: [{ content: "Cream" }],
  },
  {
    id: "caneSugar",
    offsetX: 500,
    offsetY: 340,
    shape: {
      type: "Bpmn",
      shape: "Activity",
      activity: { activity: "Task" },
    },
    annotations: [{ content: "Cane Sugar" }],
  },
  {
    id: "water",
    offsetX: 500,
    offsetY: 420,
    shape: {
      type: "Bpmn",
      shape: "Activity",
      activity: { activity: "Task" },
    },
    annotations: [{ content: "Water" }],
  },
  {
    id: "ingredients",
    offsetX: 500,
    offsetY: 500,
    shape: {
      type: "Bpmn",
      shape: "Activity",
      activity: { activity: "Task" },
    },
    annotations: [{ content: "Ingredients" }],
  },
  {
    id: "flavour",
    offsetX: 500,
    offsetY: 580,
    shape: {
      type: "Bpmn",
      shape: "Activity",
      activity: { activity: "Task" },
    },
    annotations: [{ content: "Flavour" }],
  },
  {
    id: "fruitsAndNuts",
    offsetX: 500,
    offsetY: 660,
    shape: {
      type: "Bpmn",
      shape: "Activity",
      activity: { activity: "Task" },
    },
    annotations: [{ content: "Fruits and Nuts" }],
  },
  {
    id: "blending",
    offsetX: 700,
    offsetY: 380,
    shape: {
      type: "Bpmn",
      shape: "Activity",
      activity: { activity: "Task" },
    },
    annotations: [{ content: "Blending" }],
  },
  {
    id: "coolingAging",
    offsetX: 840,
    offsetY: 380,
    shape: {
      type: "Bpmn",
      shape: "Activity",
      activity: { activity: "Task" },
    },
    annotations: [{ content: "Cooling/Aging" }],
  },
  {
    id: "packaging",
    offsetX: 980,
    offsetY: 380,
    shape: {
      type: "Bpmn",
      shape: "Activity",
      activity: { activity: "Task" },
    },
    annotations: [{ content: "Packaging" }],
  },
  {
    id: "storageDistribution",
    width: 140,
    offsetX: 1130,
    offsetY: 380,
    shape: {
      type: "Bpmn",
      shape: "Activity",
      activity: { activity: "Task" },
    },
    annotations: [{ content: "Storage/Distribution" }],
  },
  {
    id: "end",
    offsetX: 1260,
    offsetY: 380,
    shape: {
      type: "Bpmn",
      shape: "Event",
      event: { event: "End", trigger: "None" },
    },
    annotations: [{ content: "End" }],
  },
];

//Initializes the connectors for the diagram
let connectors: ConnectorModel[] = [
  { id: "c1", sourceID: "start", targetID: "liquidInput" },
  { id: "c2", sourceID: "start", targetID: "dryInput" },
  { id: "c3", sourceID: "liquidInput", targetID: "condensed" },
  { id: "c4", sourceID: "liquidInput", targetID: "cream" },
  { id: "c5", sourceID: "liquidInput", targetID: "caneSugar" },
  { id: "c6", sourceID: "liquidInput", targetID: "water" },
  { id: "c7", sourceID: "liquidInput", targetID: "ingredients" },
  { id: "c8", sourceID: "dryInput", targetID: "flavour" },
  { id: "c9", sourceID: "dryInput", targetID: "fruitsAndNuts" },
  { id: "c10", sourceID: "condensed", targetID: "blending" },
  { id: "c11", sourceID: "cream", targetID: "blending" },
  { id: "c12", sourceID: "caneSugar", targetID: "blending" },
  { id: "c13", sourceID: "water", targetID: "blending" },
  { id: "c14", sourceID: "ingredients", targetID: "blending" },
  { id: "c15", sourceID: "flavour", targetID: "blending" },
  { id: "c16", sourceID: "fruitsAndNuts", targetID: "blending" },
  { id: "c17", sourceID: "blending", targetID: "coolingAging" },
  { id: "c18", sourceID: "coolingAging", targetID: "packaging" },
  { id: "c19", sourceID: "packaging", targetID: "storageDistribution" },
  { id: "c20", sourceID: "storageDistribution", targetID: "end" },
];

// User handles for the diagram
let userHandles: UserHandleModel[] = [
  {
    name: "delete",
    pathData:
      "M0.97,3.04 L12.78,3.04 L12.78,12.21 C12.78,12.64,12.59,13,12.2,13.3 C11.82,13.6,11.35,13.75,10.8,13.75 L2.95,13.75 C2.4,13.75,1.93,13.6,1.55,13.3 C1.16,13,0.97,12.64,0.97,12.21 Z M4.43,0 L9.32,0 L10.34,0.75 L13.75,0.75 L13.75,2.29 L0,2.29 L0,0.75 L3.41,0.75 Z",
    tooltip: { content: "Delete Node" },
    side: "Bottom",
    offset: 0.5,
    margin: { bottom: 5 },
    disableConnectors: true,
  },
  {
    name: "drawConnector",
    pathData:
      "M6.09,0 L13.75,6.88 L6.09,13.75 L6.09,9.64 L0,9.64 L0,4.11 L6.09,4.11 Z",
    tooltip: { content: "Draw Connector" },
    side: "Right",
    offset: 0.5,
    margin: { right: 5 },
    disableConnectors: true,
  },
  {
    name: "stopAnimation",
    pathData: "M4.75,0.75 L9.25,0.75 L9.25,9.25 L4.75,9.25 Z", // Stop icon
    tooltip: { content: "Enable Animation" },
    disableNodes: true
  },
];

// CSS styles for custom elements in the diagram
const sample_css = `
.diagram-workflow #toolbarContainer {
  display: flex;
  align-items: center;
  height: 62px !important;
  width: 100% !important;
  position: relative;  
  justify-content: center;
}
.diagram-workflow #toolbar {
  width: 80% !important;
  height: 62px !important;
  flex-grow: 1;
}
.diagram-workflow #toolbar_diagram {
  height: 62px !important;
}
.diagram-workflow #toggleSwitchContainer {
  width: 20% !important;
  height: 62px !important;
  display: flex;
  justify-content: center;
  margin-left: auto;
  background: #f9fafb
}
.diagram-workflow #toolbar .e-toolbar-item{
  padding: 0px !important;
}
.diagram-workflow #symbolPalette {
  overflow: hidden !important;
  height: 100%; 
  display: flex;
  align-items: center;
  margin-top: 15px;
}
.diagram-workflow #symbolPaletteComponent_container{
  border: none !important;
}
.diagram-workflow #symbolPalette_container{
  border: none !important;
}
.diagram-workflow #symbolPalette .e-acrdn-header{
  display: none;
}
.diagram-workflow #symbolPalette .e-acrdn-content{
  padding: 0;
  background-color: transparent !important;
}
.diagram-workflow #symbolPalette .e-remove-palette{
  background-color: transparent !important;
}
.diagram-workflow #symbolPalette .e-accordion{
  background-color: transparent !important;
}
.diagram-workflow #symbolPalette .e-accordion .e-acrdn-item.e-selected.e-select.e-active{
  background-color: transparent !important;
}
.diagram-workflow #diagramContainer {
    flex: 1;
}
.diagram-workflow #diagram {
    width: 100%;
    height: 100%;
    border: 1px solid transparent;
}
.diagram-workflow #switch-container{
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0; 
    margin-right: 10px;
    margin-top: 15px;
}
/* To display the loading sign */
  .diagram-workflow .diagram-loading-indicator {
    border: 4px solid #e6ffe6;
    border-top: 4px solid green;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    animation: spin 2s linear infinite;
  }

/* To display the success sign */
.diagram-workflow .diagram-tick {
  display: none;
  animation: showTick 0.5s forwards;
  width: 14px;
  height: 14px;
  padding: 1px;
  line-height: 1;
  color: white;
  border-radius: 50%;
  background-color:green;
}
.diagram-workflow .e-play {
  content: '\e70C';
}
/* To display the failure sign */
.diagram-workflow .cross {
display: none;
animation: showTick 0.5s 0.2s forwards;
font-size: 10px;
width:15px;height:15px;
padding-left: 4.5px;
padding-top: 2.5px;
line-height: 1;
color: white;
border-radius: 50%;
background-color:red;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes showTick {
  0% { opacity: 0; transform: scale(0.5); }
  100% { opacity: 1; transform: scale(1); }
}
  `;

// symbol palette template
const paletteTemplate = () => (
  <aside
    id="symbolPalette"
    style={{
      display: isEditMode ? "flex" : "none",
      height: "100%",
      alignItems: "center",
      border: "none",
    }}
  >
    <SymbolPaletteComponent
      id="symbolPaletteComponent"
      ref={(symbolPaletteComponent: any) => (symbolPaletteRef = symbolPaletteComponent)}
      width="100%"
      height="62px"
      symbolHeight={45}
      symbolWidth={45}
      enableAnimation={false}
      // showHeader={false}
      palettes={[
        {
          id: "BPMN",
          expanded: true,
          symbols: [
            {
              id: "Start",
              shape: { type: "Bpmn", shape: "Event" },
              annotations: [{ content: "Start" }],
              tooltip: { content: "Start", relativeMode: "Object" },
              constraints: NodeConstraints.Default | NodeConstraints.Tooltip,
            },
            {
              id: "Decision",
              shape: { type: "Bpmn", shape: "Gateway" },
              annotations: [{ content: "Decision" }],
              tooltip: { content: "Decision", relativeMode: "Object" },
              constraints: NodeConstraints.Default | NodeConstraints.Tooltip,
            },
            {
              id: "Task",
              shape: { type: "Bpmn", shape: "Activity" },
              annotations: [{ content: "Task" }],
              tooltip: { content: "Task", relativeMode: "Object" },
              constraints: NodeConstraints.Default | NodeConstraints.Tooltip,
            },
            {
              id: "End",
              shape: {
                type: "Bpmn",
                shape: "Event",
                event: { event: "End", trigger: "None" },
              },
              annotations: [{ content: "End" }],
              tooltip: { content: "End", relativeMode: "Object" },
              constraints: NodeConstraints.Default | NodeConstraints.Tooltip,
            },
          ],
          iconCss: "",
        },
      ]}
      getSymbolInfo={() => ({ fit: true })}
      paletteExpanding={(args) => { args.cancel = true; }}
    />
  </aside>
);

// React component for the BPMN workflow editor
export class WorkFlowEditor extends SampleBase<{}, {}> {
  render() {
    return (
      <div className="control-pane diagram-workflow">
        <style>{sample_css}</style>
        <div className="col-lg-12 control-section">
          <div style={{ width: "100%" }}>
            <div id='toolbarContainer'>
              <div id='toolbar'>
                <ToolbarComponent
                  ref={(toolbar: any) => (toolbarEditor = toolbar)}
                  id="toolbar_diagram"
                  clicked={tooledit}
                  overflowMode="Popup"
                >
                  <ItemsDirective>
                    <ItemDirective id="New" tooltipText="New Diagram" text="New" prefixIcon="e-icons e-circle-add" />
                    <ItemDirective id="Open" tooltipText="Open Diagram" text="Open" prefixIcon="e-icons e-folder-open" />
                    <ItemDirective id="Save" tooltipText="Save Diagram" text="Save" prefixIcon="e-icons e-save" />
                    <ItemDirective type="Separator" />
                    <ItemDirective id="Execute" tooltipText="Start Workflow" text="Execute" prefixIcon="e-icons e-play" width={90} overflow= "Show" />
                    <ItemDirective id="Reset" tooltipText="Reset View/State" text="Reset" prefixIcon="e-icons e-reset" overflow= "Show" />
                    <ItemDirective id="Delete" tooltipText="Delete Selected" text="Delete" prefixIcon="e-icons e-trash" />
                    <ItemDirective type="Separator" />
                    <ItemDirective id="Select" tooltipText="Select Tool" text="Select" prefixIcon="e-icons e-mouse-pointer" overflow= "Show" />
                    <ItemDirective id="Pan" tooltipText="Pan Tool" text="Pan" prefixIcon="e-icons e-pan" overflow= "Show" />
                    <ItemDirective type="Separator" />
                    <ItemDirective id="palette" template={paletteTemplate} overflow= "Show" />
                  </ItemsDirective>
                </ToolbarComponent>
              </div>
              <div id='toggleSwitchContainer'>
                <div id="switch-container" ref={(switchContainer: any) => (switchContainerRef = switchContainer)}>
                  <span id="editLabel" style={{ fontSize: '14px', marginRight: '6px' }}>Edit</span>
                  <TooltipComponent
                    id="switch_tooltip_diagram"
                    ref={(switchTooltip: any) => (switchTooltipRef = switchTooltip)}
                    content="Enable Editing"
                    position="TopCenter"
                  >
                    <SwitchComponent
                      id="DiagramToggleSwitch"
                      ref={(DiagramToggleSwitch: any) => (switchRef = DiagramToggleSwitch)}
                      checked={isEditMode}
                      change={(args) => switchChange(args.checked)}
                    />
                  </TooltipComponent>
                </div>
              </div>
            </div>
            <div>
              <DiagramComponent
                id="diagram"
                ref={(diagram: any) => (diagramInstance = diagram)}
                width={"100%"}
                height={"645px"}
                nodes={nodes}
                connectors={connectors}
                tool={DiagramTools.ZoomPan}
                scrollSettings={{ scrollLimit: "Infinity", canAutoScroll: true }}
                selectedItems={{ userHandles: userHandles }}
                getNodeDefaults={(node: Node, diagram: Diagram) => {
                  // restrict rotation and hide thumbs
                  node.constraints = (NodeConstraints.Default & ~NodeConstraints.Rotate) | NodeConstraints.HideThumbs;
                  // Set default width and height
                  if (typeof node.width === "undefined" || typeof node.height === "undefined") {
                    var dimensions = {
                      Event: { width: 60, height: 60 },
                      Gateway: { width: 90, height: 70 },
                      Activity: { width: 90, height: 50 },
                    };
                    var shapeType = (node.shape as any).shape;
                    if (typeof node.width === "undefined") {
                      node.width = dimensions[shapeType].width;
                    }
                    if (typeof node.height === "undefined") {
                      node.height = dimensions[shapeType].height;
                    }
                  }
                  return node;

                }} //Sets the default values of connector
                getConnectorDefaults={(connector: ConnectorModel, diagram: Diagram) => {
                  // Configure the connector with a straight type
                  connector.type = "Straight";

                  // connector initial color style, before animation
                  connector.style.strokeColor =
                    connector.targetDecorator.style.strokeColor =
                    connector.targetDecorator.style.fill =
                    connectorBeforeAnimationColor;

                  // connector annotation, that will be animated during the workflow animation
                  connector.annotations = [
                    {
                      content: "",
                      height: 16,
                      width: 16,
                      offset: 0,
                      style: { fill: "transparent", fontSize: 24 },
                    },
                  ];
                  return connector;
                }}
                selectionChange={(args) => {
                  if (args.state !== "Changed") return;
                  var connector = diagramInstance.selectedItems.connectors[0];
                  var handle = null;
                  for (var i = 0; i < diagramInstance.selectedItems.userHandles.length; i++) {
                    if (diagramInstance.selectedItems.userHandles[i].name === "stopAnimation") {
                      handle = diagramInstance.selectedItems.userHandles[i];
                      break;
                    }
                  }
                  if (connector && handle) {
                    var isStopped =
                      connector.addInfo && (connector.addInfo as any).stopAnimation === true;
                    if (isStopped) {
                      handle.pathData = "M2,0 L10,8 L2,16 L2,0 Z"; // Play icon (start animation)
                    } else {
                      handle.pathData = "M5.25,1.25 L8.75,1.25 L8.75,8.75 L5.25,8.75 Z"; // Stop icon
                    }
                    if (isStopped) {
                      handle.tooltip.content = "Enable Animation";
                    } else {
                      handle.tooltip.content = "Disable Animation";
                    }
                    handle.visible = true;
                  } else if (handle) {
                    handle.visible = false;
                  }
                }}
                onUserHandleMouseDown={(args) => {
                  var handleName = args.element.name;
                  switch (handleName) {
                    case "delete":
                      diagramInstance.remove(diagramInstance.selectedItems.nodes[0]);
                      break;
                    case "drawConnector":
                      var sourceNode = diagramInstance.selectedItems.nodes[0];
                      if (!sourceNode) return;
                      diagramInstance.drawingObject = { type: "Straight", sourceID: sourceNode.id };
                      diagramInstance.tool = DiagramTools.DrawOnce;
                      break;
                    case "stopAnimation":
                      var connector = diagramInstance.selectedItems.connectors[0];
                      if (connector) {
                        if (!connector.addInfo) connector.addInfo = {};
                        (connector.addInfo as any).stopAnimation = !(connector.addInfo as any).stopAnimation;

                        // Update path and tooltip
                        var handle = diagramInstance.selectedItems.userHandles.find(function (h) {
                          return h.name === "stopAnimation";
                        });
                        if (handle) {
                          var isStopped = (connector.addInfo as any).stopAnimation;

                          if (isStopped) {
                            handle.pathData = "M2,0 L10,8 L2,16 L2,0 Z"; // Play icon
                            handle.tooltip.content = "Enable Animation";
                          } else {
                            handle.pathData = "M4.75,0.75 L9.25,0.75 L9.25,9.25 L4.75,9.25 Z"; // Stop icon
                            handle.tooltip.content = "Disable Animation";
                          }
                        }
                      }
                      break;
                  }
                }}
                created={() => {
                  diagramInstance.fitToPage({ region: 'Content', mode: 'Width' });
                  applyModeState(false);
                  updateTooltipContent(false);
                }}
              >
              </DiagramComponent>
            </div>
          </div>
        </div>
        <div id="action-description">
          <p>
            This sample provides a visual representation of a streamlined workflow diagram built using the Syncfusion<sup>®</sup> EJ2 Diagram control with BPMN shapes.
          </p>
        </div>
        <div id="description">
          <p>
            This sample demonstrates how to build an animated workflow diagram using BPMN nodes, connectors, and annotations. The diagram simulates a workflow execution process, where clicking the <code>Execute</code> button triggers animated connectors and loading indicators on nodes that transition to checkmarks upon successful completion. The sample also includes options to pause, resume, stop, and reset the workflow. The <code>Reset</code> button restores the diagram to its initial state. Users can enhance the workflow by dragging BPMN elements from the symbol palette, with zoom and pan functionalities enabled for interactive navigation.
          </p>
        </div>
      </div>
    );
  }
}

// function to handle toolbar items click
function tooledit(args: any) {
  switch (args.item && args.item.text) {
    case 'New':
      updateExecuteButton("Execute");
      clearAnimationIntervals();
      diagramInstance.clear();
      break;
    case 'Open':
      document.getElementById("fileInput").click();
      break;
    case 'Save':
      saveDiagram();
      break;
    case 'Execute':
    case 'Pause':
    case 'Resume':
      diagramInstance.clearSelection();
      startWorkflow();
      break;
    case 'Reset':
      resetWorkflow();
      updateExecuteButton("Execute");
      break;
    case 'Delete':
      diagramInstance.remove();
      break;
    case 'Select':
      diagramInstance.tool = DiagramTools.MultipleSelect;
      break;
    case 'Pan':
      diagramInstance.tool = DiagramTools.ZoomPan;
      break;
  }
}
// start Workflow animation
function startWorkflow() {
  // PAUSE state if running
  if (!isPaused && animationIntervals.length) {
    isPaused = true;
    updateExecuteButton("Resume");
    clearAnimationIntervals();
    return;
  }

  // RESUME state if paused
  if (isPaused) {
    isPaused = false;
    updateExecuteButton("Pause");
    resumeWorkflow();
    return;
  }

  // EXECUTE state to start from start
  isPaused = false;
  resetWorkflow();
  updateExecuteButton("Pause");

  // find the "start" nodes in the diagram, as animation only works from "start" nodes
  var startNodes = diagramInstance.nodes.filter(function (node) {
    return (
      node.shape &&
      node.shape.type === "Bpmn" &&
      (node.shape as any).shape === "Event" &&
      (node.shape as any).event.event === "Start"
    );
  });
  if (startNodes.length === 0) {
    console.error("No start nodes found.");
    return;
  }
  startNodes.forEach(function (startNode) {
    animateNode(startNode.id);
  });
}

// Resume Workflow animation from the last paused state
function resumeWorkflow() {
  diagramInstance.connectors.forEach(function (connector) {
    // Retrieve the last annotation of the connector
    var lastAnn = connector.annotations[connector.annotations.length - 1];
    // Check if the annotation offset is within the animation range
    if (lastAnn && lastAnn.offset > 0 && lastAnn.offset < 0.9) {
      // Restore the annotations that need to be visible
      lastAnn.content = "●";
      if (lastAnn.style) lastAnn.style.color = connectorAnnotationColor;

      // Get the source node of the connector and check if it s a start event node
      var sourceNode = diagramInstance.getObject(connector.sourceID);
      var isStartNode =
        sourceNode &&
        (sourceNode as any).shape &&
        (sourceNode as any).shape.type === "Bpmn" &&
        (sourceNode as any).shape.shape === "Event" &&
        (sourceNode as any).shape.event &&
        (sourceNode as any).shape.event.event === "Start";

      // If the source node is a start node or already completed node, continue the animation
      if (
        isStartNode ||
        (sourceNode &&
          (sourceNode as any).style.strokeColor === nodeStrokeAfterAnimationColor)
      ) {
        // Animate the connector and the target node
        animateConnector(connector, function (targetId) {
          var targetNode = diagramInstance.getObject(targetId);
          if (targetNode) {
            createLoadingAnimation(targetNode);
            setTimeout(function () {
              completeNodeAnimation(targetNode);
              animateNode(targetId);
            }, 1000);
          }
        });
      }
    }
  });
}

// Function to animate a node and its connected nodes
function animateNode(nodeId: any) {
  // Filter connectors originating from the node
  var currentConnectors = diagramInstance.connectors.filter(function (conn) {
    return conn.sourceID === nodeId;
  });

  currentConnectors.forEach(function (connector) {
    // Check if additional info contains "stopAnimation"
    if (!(connector.addInfo && (connector.addInfo as any).stopAnimation === true)) {
      animateConnector(connector, function (targetNodeId) {
        var targetNode = diagramInstance.getObject(targetNodeId);

        // Start loading animation for the target node
        if (targetNode) {
          createLoadingAnimation(targetNode);

          flowTimeOut1 = setTimeout(function () {
            // Hide all loading indicators
            Array.prototype.slice
              .call(document.getElementsByClassName("diagram-loading-indicator"))
              .forEach(function (el) {
                el.style.display = "none";
              });
            // Show all tick indicators
            Array.prototype.slice
              .call(document.getElementsByClassName("diagram-tick"))
              .forEach(function (el) {
                el.style.display = "block";
              });

            (targetNode as any).style.strokeColor = nodeStrokeAfterAnimationColor;
            diagramInstance.dataBind();

            // Check if the target node is a BPMN "End" event node
            if (
              (targetNode as any).shape &&
              (targetNode as any).shape.type === "Bpmn" &&
              (targetNode as any).shape.shape === "Event" &&
              (targetNode as any).shape.event &&
              (targetNode as any).shape.event.event === "End"
            ) {
              // Reset toolbar for new execution
              updateExecuteButton("Execute");
              animationIntervals.length = 0; // Clear animation intervals
            } else {
              // Recursively animate connected nodes
              animateNode(targetNodeId);
            }
          }, 1000);
        }
      });
    }
  });
}

// Function to animate a connector and execute a callback upon completion
function animateConnector(connector: ConnectorModel, callback: any) {
  var lastAnn = connector.annotations[connector.annotations.length - 1];
  lastAnn.offset = lastAnn.offset || 0.02; // Initialize or set the offset
  lastAnn.content = "●"; // Set visual marker, to show the flow
  lastAnn.style.color = connectorAnnotationColor; // Set annotation marker color
  diagramInstance.dataBind();

  // Start interval to animate the connector
  var flowInterval = setInterval(function () {
    if (isPaused) {
      return; // Pause animation if the workflow is paused
    }
    // Continue animation if the offset hasn't reached the end
    if (lastAnn.offset < 0.9) {
      lastAnn.offset += 0.025;
      connector.style.strokeColor =
        connector.targetDecorator.style.strokeColor =
        connector.targetDecorator.style.fill =
        connectorDuringAnimationColor; // Change color during animation
      diagramInstance.dataBind();
    } else {
      // Animation complete, clean up and execute the callback
      clearInterval(flowInterval);
      lastAnn.style.color = "transparent";
      connector.style.strokeColor =
        connector.targetDecorator.style.strokeColor =
        connector.targetDecorator.style.fill =
        connectorAfterAnimationColor; // Set after animation color for connector
      diagramInstance.dataBind();
      callback(connector.targetID); // Execute callback with target node ID
    }
  }, 120); // Interval of 120ms for the animation steps

  // Add the interval to the list of active animations
  animationIntervals.push(flowInterval);
}

// Function to create and add a loading animation annotation to a node
function createLoadingAnimation(targetNode: any) {
  if (!targetNode || !targetNode.annotations) {
    return;
  }
  // HTML template for the loading animation and a hidden tick indicator
  var htmlTemplate = '<div style="display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start; margin-left: -3px; margin-top: -3px;"><div class="diagram-loading-indicator"></div><div class="diagram-tick" style="display: none;"><i class="e-icons e-check"></i></div></div>';

  // adding annotation with the template to the node
  var annotation: any = {
    template: htmlTemplate,
    offset: { x: 0, y: 0 },
    verticalAlignment: "Top",
    horizontalAlignment: "Left",
    style: { fill: "transparent" },
  };

  diagramInstance.addLabels(targetNode, [annotation]);
}

// Function to show complete status for the given node
function completeNodeAnimation(node: any) {
  // Hide all loading indicators
  document.querySelectorAll(".diagram-loading-indicator").forEach(function (el: any) {
    el.style.display = "none";
  });

  // Display all tick elements as visible
  document.querySelectorAll(".diagram-tick").forEach(function (el: any) {
    el.style.display = "block";
  });

  // Update the stroke color for the node to indicate completion
  if (node.style) {
    node.style.strokeColor = nodeStrokeAfterAnimationColor;
  }

  // Update the diagram to reflect changes
  diagramInstance.dataBind();
}

function resetWorkflow() {
  // Set pause state to false
  isPaused = false;
  // clear any existing timeouts
  clearTimeout(flowTimeOut1);
  clearTimeout(flowTimeOut2);
  // Clear any running animation intervals
  clearAnimationIntervals();
  // Remove all custom animations and tick indicators
  document.querySelectorAll(".diagram-loading-indicator, .diagram-tick").forEach(function (el) {
    el.remove();
  });
  // Restore all nodes to their default styles
  diagramInstance.nodes.forEach(function (node) {
    if (node.style) node.style.strokeColor = nodeStrokeBeforeAnimationColor;
  });
  // Restore all connectors to their default styles
  diagramInstance.connectors.forEach(function (connector) {
    connector.style.strokeColor =
      connector.targetDecorator.style.strokeColor =
      connector.targetDecorator.style.fill =
      connectorBeforeAnimationColor;

    // Reset connector annotations to initial state
    connector.annotations.forEach(function (ann) {
      ann.offset = 0; // start position
      ann.content = ""; // Reset content
      ann.style.color = connectorAnnotationColor; // initial state color
    });
  });

  diagramInstance.dataBind(); // Ensure all changes are applied
}

// Function to clear all active animation intervals
function clearAnimationIntervals() {
  // Stop all timers stored in animationIntervals
  animationIntervals.forEach(clearInterval);
  // Reset the array to remove all interval references
  animationIntervals.length = 0;
}

// Hidden file input for opening json files
var input = document.createElement("input");
input.type = "file";
input.accept = ".json";
input.id = "fileInput";
input.style.display = "none";
document.body.appendChild(input);

input.addEventListener("change", function (e) {
  var file = (e.target as any).files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function (evt) {
    var json = JSON.parse(evt.target.result as any);
    diagramInstance.loadDiagram(json);
    diagramInstance.fitToPage();
    updateExecuteButton("Execute");
    clearAnimationIntervals();
    diagramInstance.tool = DiagramTools.ZoomPan;
    input.value = "";
  };
  reader.readAsText(file);
});

// Update the execute button's text and tooltip based on the workflow state
function updateExecuteButton(state: string) {
  var btn = toolbarEditor.items[4];
  var states = {
    Pause: {
      id: "Pause",
      text: "Pause",
      tooltipText: "Pause Workflow",
      prefixIcon: "e-icons e-pause",
    },
    Resume: {
      id: "Resume",
      text: "Resume",
      tooltipText: "Resume Workflow",
      prefixIcon: "e-icons e-play",
    },
    Execute: {
      id: "Execute",
      text: "Execute",
      tooltipText: "Start Workflow",
      prefixIcon: "e-icons e-play",
    },
  };

  var newState = states[state] || states.Execute;
  Object.assign(btn, newState);
}

// save the current diagram in json format
function saveDiagram() {
  var fileName = "Diagram.json";
  var jsonData = diagramInstance.saveDiagram();
  var blob = new Blob([jsonData], { type: "application/json" });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// functions on toggle switch change
function switchChange(args: any) {
  isEditMode = args;
  applyModeState(args);
  updateTooltipContent(args);
}

// function to update tooltip content based on switch state
function updateTooltipContent(isChecked: boolean) {
  if (switchTooltipRef) {
    if (isChecked) {
      switchTooltipRef.content = "Disable Editing";
    } else {
      switchTooltipRef.content = "Enable Editing";
    }
  }
}

// function to enable or disable tool bar buttons based on editing mode
function applyModeState(isEditMode: boolean) {
  var buttonsToToggle = ["Select", "Delete", "Save"];

  if (toolbarEditor) {
    toolbarEditor.items.forEach(function (item) {
      if (buttonsToToggle.includes(item.id)) {
        item.disabled = !isEditMode;
      }
    });
    // Hide last separator in toolbar if palette is hidden
    var items = toolbarEditor.items;
    var lastSepIndex = items.findIndex(function (item) {
      return item.type === "Separator" && items.indexOf(item) > 7;
    });
    if (lastSepIndex !== -1) {
      items[lastSepIndex].visible = isEditMode;
    }
    toolbarEditor.refresh();
    const paletteEl = document.getElementById('symbolPalette');
    if (paletteEl) {
      paletteEl.style.display = isEditMode ? 'flex' : 'none';
    }
    diagramInstance.tool = isEditMode ? DiagramTools.MultipleSelect : DiagramTools.ZoomPan;
  }
}

// update the label color based on toolbar button color
var toolbarButton = document.querySelector(".e-toolbar-item button");
if (toolbarButton) {
  var buttonStyle = window.getComputedStyle(toolbarButton);
  var buttonColor = buttonStyle.color;
  var editLabel = document.getElementById("editLabel");
  editLabel.style.color = buttonColor;
}