// Importing React and necessary components from Syncfusion's EJ2 React Diagrams library for building the UML Activity diagram.
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
    UmlActivityShapes,
    Shapes,
} from "@syncfusion/ej2-react-diagrams";
import { updateSampleSection } from "../common/sample-base";

// Creates a UML activity node with specified properties
const createNode = (
    id: string,
    offsetX: number,
    offsetY: number,
    shapeType: UmlActivityShapes,
    width: number = 40,
    height: number = 40,
    content: string = ''
): NodeModel => ({
    id,
    width,
    height,
    offsetX,
    offsetY,
    shape: { type: "UmlActivity", shape: shapeType },
    annotations: content ? [{ content }] : []
});

// Initializes nodes representing the flow of a customer service call process
let nodes: NodeModel[] = [
    createNode("Start", 300, 20, "InitialNode"),
    createNode("ReceiveCall", 300, 100, "Action", 105, 40, "Receive Customer Call"),
    createNode("ForkNode", 300, 170, "ForkNode", 70, 10),
    createNode("Determine", 190, 250, "Action", 105, 40, "Determine Type of Call"),
    createNode("Log", 410, 250, "Action", 105, 40, "Customer Logging a Call"),
    createNode("Decision", 190, 350, "Decision", 50, 50),
    createNode("transfer_sales", 100, 450, "Action", 105, 40, "Transfer the Call to Sales"),
    createNode("transfer_desk", 280, 450, "Action", 105, 40, "Transfer the Call to Help Desk"),
    createNode("MergeNode", 190, 540, "MergeNode", 50, 50),
    createNode("JoinNode", 300, 630, "JoinNode", 70, 10),
    createNode("CloseCall", 300, 710, "Action", 105, 40, "Close Call"),
    createNode("FinalNode", 300, 800, "FinalNode")
];

// Creates a UML activity diagram connector with specified properties
const createConnector = (
    id: string,
    sourceID: string,
    targetID: string,
    sourcePortID: string = "",
    targetPortID: string = "",
    additionalProps: any = {}
): ConnectorModel => ({
    id,
    sourceID,
    targetID,
    sourcePortID,
    targetPortID,
    ...additionalProps
});

// Defines common segments for connectors
const commonSegments = {
    orthogonalShort: [{ type: "Orthogonal", length: 20, direction: "Bottom" }],
    orthogonalLongLeft: [{ type: "Orthogonal", length: 50, direction: "Left" }],
    orthogonalLongRight: [{ type: "Orthogonal", length: 50, direction: "Right" }],
    orthogonalBottom: [{ type: "Orthogonal", length: 50, direction: "Bottom" }]
};

// Initializes connectors for transitions between activities
let connectors: ConnectorModel[] = [
    createConnector("connector1", "Start", "ReceiveCall"),
    createConnector("connector2", "ReceiveCall", "ForkNode"),
    createConnector("connector3", "ForkNode", "Determine", "port1", "portTop", {
        segments: [...commonSegments.orthogonalShort, ...commonSegments.orthogonalLongLeft]
    }),
    createConnector("connector4", "ForkNode", "Log", "port2", "portTop", {
        segments: [...commonSegments.orthogonalShort, ...commonSegments.orthogonalLongRight]
    }),
    createConnector("connector5", "Determine", "Decision"),
    createConnector("connector6", "Decision", "transfer_sales", "portLeft", "portTop", {
        shape: { type: "UmlActivity", flow: "Association" },
        annotations: [{
            id: "connector6Label", content: "type=New Customer", offset: 0.715,
            style: { fill: "white", color: "black", textWrapping: 'NoWrap' }
        }]
    }),
    createConnector("connector7", "Decision", "transfer_desk", "portRight", "portTop", {
        shape: { type: "UmlActivity", flow: "Association" },
        annotations: [{
            id: "connector7Label", content: "type=Existing Customer", offset: 0.75,
            style: { fill: "white", color: "black", textWrapping: 'NoWrap' }
        }]
    }),
    createConnector("connector8", "transfer_sales", "MergeNode", "portBottom", "portLeft", {
        segments: commonSegments.orthogonalBottom
    }),
    createConnector("connector9", "transfer_desk", "MergeNode", "portBottom", "portRight", {
        segments: commonSegments.orthogonalBottom
    }),
    createConnector("connector10", "MergeNode", "JoinNode", "portBottom", "port3"),
    createConnector("connector11", "Log", "JoinNode", "portBottom", "port4", {
        segments: [
            { type: "Orthogonal", length: 265, direction: "Bottom" },
            ...commonSegments.orthogonalLongLeft
        ]
    }),
    createConnector("connector12", "JoinNode", "CloseCall"),
    createConnector("connector13", "CloseCall", "FinalNode")
];

// Holds instances of DiagramComponent and HTMLElement for diagram manipulation and UI interaction
let diagramInstance: DiagramComponent;
let diagramSpaceInstance: HTMLElement;
let paletteIconInstance: HTMLElement;
let paletteSpaceInstance: HTMLElement;

// Initializes an array of UML activity shapes for the symbol palette
const umlActivityShapes: NodeModel[] = [
    'Action', 'Decision', 'MergeNode', 'InitialNode', 'FinalNode', 'ForkNode',
    'JoinNode', 'TimeEvent', 'AcceptingEvent', 'SendSignal', 'ReceiveSignal',
    'StructuredNode', 'Note'
].map(shape => ({ id: shape, shape: { type: 'UmlActivity', shape } }));

// Defines a base connector symbol to standardize connector creation
const baseConnector: Partial<ConnectorModel> = {
    sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
    targetDecorator: { shape: 'Arrow', style: { strokeColor: '#757575', fill: '#757575' } },
    style: { strokeWidth: 2, strokeColor: '#757575' }
};

// Initializes connector symbols with varying styles for the symbol palette
let connectorSymbols: ConnectorModel[] = [
    { ...baseConnector, id: 'Link1', type: 'Orthogonal' },
    { ...baseConnector, id: 'Link2', type: 'Orthogonal', style: { ...baseConnector.style, strokeDashArray: '4 4' } },
    { ...baseConnector, id: 'Link3', type: 'Straight' }
];

// CSS styles for the diagram editor's layout, enhancing mobile responsiveness
const SAMPLE_CSS = `
.diagram-UML .sb-mobile-palette {
  width: 210px;
  height: 100%;
  float: left;
}

.diagram-UML .sb-mobile-palette-bar {
  display: none;
}

.diagram-UML .sb-mobile-diagram {
  width: calc(100% - 212px);
  height: 100%;
  float: left;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-left: none;
}

@media (max-width: 550px) {

  .diagram-UML .sb-mobile-palette {
      z-index: 19;
      position: absolute;
      display: none;
      transition: transform 300ms linear, visibility 0s linear 300ms;
      width: 39%;
      height: 100%;
  }

  .diagram-UML .sb-mobile-palette-bar {
      display: block;
      width: 100%;
      background: #fafafa;
      padding: 10px 10px;
      border: 0.5px solid #e0e0e0;
      min-height: 40px;
  }

  .diagram-UML .sb-mobile-diagram {
      width: 100%;
      height: 100%;
      float: left;
      left: 0px;
  }

  .diagram-UML #paletteIcon {
      font-size: 20px;
  }
}

.diagram-UML .sb-mobile-palette-open {
  position: absolute;
  display: block;
  right: 15px;
}

.diagram-UML .e-toggle-palette::before {
  content: "\e700"
}`;

// Define the function UmlActivityDiagram
function UmlActivityDiagram() {
    React.useEffect(() => {
        // Call functions to update sample section and render completion
        updateSampleSection();
        rendereComplete();
    }, [])

    // Adds mobile-specific event listeners and centers the diagram upon rendering completion.
    function rendereComplete() {
        addMobileEvents();
        let rect: DOMRect = diagramSpaceInstance.getBoundingClientRect();
        let panX: number = (rect.width - rect.x) / 2;
        // Pan diagram to center horizontally
        diagramInstance.pan(panX, 0);
    }

    // Determines the port positions for a node based on its type.
    function getNodePorts(node: NodeModel): PointPortModel[] {
        if (node.id === 'ForkNode' || node.id === 'JoinNode') {
            // Ports for ForkNode and JoinNode
            let node2Ports: PointPortModel[] = [
                { id: 'port1', offset: { x: 0.2, y: 1 } },
                { id: 'port2', offset: { x: 0.8, y: 1 } },
                { id: 'port3', offset: { x: 0.2, y: 0 } },
                { id: 'port4', offset: { x: 0.8, y: 0 } },
            ];
            return node2Ports;
        } else {
            let ports: PointPortModel[] = [
                // Default ports for other nodes
                { id: 'portLeft', offset: { x: 0, y: 0.5 } },
                { id: 'portRight', offset: { x: 1, y: 0.5 } },
                { id: 'portBottom', offset: { x: 0.5, y: 1 } },
                { id: 'portTop', offset: { x: 0.5, y: 0 } },
            ];
            return ports;
        }
    }

    // Indicates whether the current device is mobile based on the screen width.
    let isMobile: boolean;

    // Adds event listeners for mobile-specific interactions.
    function addMobileEvents(): void {
        isMobile = window.matchMedia('(max-width:550px)').matches;
        // Check if device is mobile
        if (isMobile && paletteIconInstance) {
            paletteIconInstance.addEventListener('click', togglePalette, false);
        }
    }

    // Toggles the symbol palette's visibility on mobile devices.
    function togglePalette(): void {
        isMobile = window.matchMedia('(max-width:550px)').matches;
        if (isMobile) {
            if (!paletteSpaceInstance.classList.contains('sb-mobile-palette-open')) {
                // Open palette
                paletteSpaceInstance.classList.add('sb-mobile-palette-open');
            } else {
                // Close palette
                paletteSpaceInstance.classList.remove('sb-mobile-palette-open');
            }
        }
    }

    // Renders the UML Activity Diagram component.
    return (
        <div className="control-pane diagram-UML">
            {/* Injects CSS styles for layout */}
            <style>{SAMPLE_CSS}</style>
            <div className="control-section">
                <div id="umlActivityDiagram" style={{ width: "100%", height: "521px" }}>
                    {/* Mobile palette bar for toggling symbol palette */}
                    <div className="sb-mobile-palette-bar">
                        <div id="paletteIcon" ref={paletteIcon => (paletteIconInstance = paletteIcon)}
                            style={{ float: "right" }} className="e-ddb-icons1 e-toggle-palette"></div>
                    </div>
                    <div id="paletteSpace" ref={paletteSpace => (paletteSpaceInstance = paletteSpace)} className="sb-mobile-palette" >
                        {/* Symbol Palette Component for UML activity shapes and connectors */}
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
                                    symbols: connectorSymbols,
                                    title: "Connectors"
                                }
                            ]}
                            width={"100%"}
                            height={"505px"}
                            // Sets the default values for nodes
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
                        >
                            <Inject services={[UndoRedo]} />
                        </SymbolPaletteComponent>
                    </div>

                    <div id="diagramSpace" ref={diagramSpace => (diagramSpaceInstance = diagramSpace)} className="sb-mobile-diagram" >
                        {/* Diagram Component for UML Activity Diagram */}
                        <DiagramComponent
                            id="diagram"
                            ref={diagram => (diagramInstance = diagram)}
                            width={"100%"}
                            height={"100%"}
                            nodes={nodes}
                            connectors={connectors}
                            snapSettings={{ constraints: SnapConstraints.None }}
                            // Sets the default values for nodes
                            getNodeDefaults={(node: NodeModel) => {
                                node.ports = getNodePorts(node);
                                if (node.ports) {
                                    for (let i: number = 0; i < node.ports.length; i++) {
                                        node.ports[i].visibility = PortVisibility.Hidden;
                                    }
                                }
                                if (node.id === 'Start' || node.id === 'ForkNode' || node.id === 'JoinNode' || node.id === 'FinalNode') {
                                    node.style.fill = '#444';
                                }
                                node.style.strokeColor = '#444';
                                return node;
                            }}
                            // Sets the default values for connectors
                            getConnectorDefaults={(connector: Connector) => {
                                if (connector.id.indexOf('connector') !== -1) {
                                    connector.type = 'Orthogonal'; connector.cornerRadius = 10;
                                    connector.targetDecorator = { shape: 'OpenArrow', style: { strokeColor: '#444', fill: '#444' } };
                                }
                            }}
                        >
                            <Inject services={[UndoRedo]} />
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
