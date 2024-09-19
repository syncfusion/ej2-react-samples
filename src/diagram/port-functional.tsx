// Import React and necessary components from Syncfusion's EJ2 React Diagrams library for building the diagram.
import * as React from "react";
import {
    PointPortModel,
    PortVisibility,
    PortShapes,
    DiagramComponent,
    NodeModel,
    ConnectorModel,
    BasicShapeModel,
    Node,
    Connector,
} from "@syncfusion/ej2-react-diagrams";
import { updateSampleSection } from "../common/sample-base";
import {
    ChangeEventArgs,
    DropDownListComponent,
    CheckBoxSelection,
    Inject
} from "@syncfusion/ej2-react-dropdowns";
import {
    NumericTextBoxComponent,
    ChangeEventArgs as NumericChangeEventArgs,
    ColorPickerComponent,
    ColorPickerEventArgs
} from "@syncfusion/ej2-react-inputs";

// Global variables for diagram and property panel instances, and UI components.
let diagramInstance: DiagramComponent;
let propertypanelInstance: HTMLElement;
let portVisibilityDrop: DropDownListComponent;
let portFillDrop: ColorPickerComponent;
let portBorderDrop: ColorPickerComponent;
let portShapeDrop: DropDownListComponent;
let portSizeNum: NumericTextBoxComponent;
let portWidthNum: NumericTextBoxComponent;

// Creates a node with specified properties and ports.
function createNode(id: string, offsetX: number, offsetY: number, annotationContent: string, ports: CustomPort[]): NodeModel {
    return {
        id: id,
        offsetX: offsetX,
        offsetY: offsetY,
        annotations: [{ content: annotationContent }],
        ports: ports
    };
}

// Creates a connector linking two ports of different nodes.
function createConnector(id: string, sourceID: string, sourcePortID: string, targetID: string, targetPortID: string): ConnectorModel {
    return {
        id: id,
        sourceID: sourceID,
        sourcePortID: sourcePortID,
        targetID: targetID,
        targetPortID: targetPortID
    };
}

// Creates a port with specified properties.
function createPort(id: string, shape: PortShapes, offsetX: number, offsetY: number, text: string): CustomPort {
    return {
        id: id,
        shape: shape,
        offset: { x: offsetX, y: offsetY },
        height: 8,
        width: 8,
        visibility: PortVisibility.Visible,
        text: text
    };
}

// Predefined ports for nodes.
let node1Port: CustomPort[] = [
    createPort('port1', 'Circle', 0, 0.5, 'In - 1'),
    createPort('port2', 'Circle', 1, 0.5, 'OUT - 1'),
    createPort('port3', 'Circle', 0.25, 1, 'In - 2'),
    createPort('port4', 'Circle', 0.5, 1, 'OUT - 2'),
    createPort('port5', 'Circle', 0.75, 1, 'In - 3')
];

let node2Port: CustomPort[] = [
    createPort('port6', 'Circle', 0, 0.5, 'In - 1'),
    createPort('port7', 'Circle', 1, 0.35, 'OUT - 1'),
    createPort('port8', 'Circle', 1, 0.70, 'In - 2'),
    createPort('port9', 'Circle', 0.5, 1, 'OUT - 2')
];

let node3Port: CustomPort[] = [
    createPort('port10', 'Circle', 0, 0.5, 'Out - 1'),
    createPort('port11', 'Circle', 0.5, 0, 'In - 1'),
    createPort('port12', 'Circle', 0.5, 1, 'OUT - 2')
];

let node4Port: CustomPort[] = [
    createPort('port13', 'Circle', 0, 0.5, 'In - 1'),
    createPort('port14', 'Circle', 0.5, 0, 'In - 2'),
    createPort('port15', 'Circle', 0.5, 1, 'OUT - 1')
];

let node5Port: CustomPort[] = [
    createPort('port16', 'Circle', 0, 0.5, 'out - 1'),
    createPort('port17', 'Circle', 0.5, 0, 'In - 1'),
    createPort('port18', 'Circle', 1, 0.5, 'OUT - 2')
];

let node6Port: CustomPort[] = [
    createPort('port19', 'Circle', 0, 0.35, 'In - 1'),
    createPort('port20', 'Circle', 0.5, 1, 'Out - 1')
];

let node7Port: CustomPort[] = [
    createPort('port21', 'Circle', 0.5, 0, 'In - 1'),
    createPort('port22', 'Circle', 0.5, 1, 'Out - 1')
];

// Basic shapes for nodes.
let shape1: BasicShapeModel = { type: "Basic", shape: "Rectangle" };
let shape2: BasicShapeModel = { type: "Basic", shape: "Diamond" };

// Node definitions for the diagram.
let nodes: NodeModel[] = [
    createNode('node1', 100, 100, 'Publisher', node1Port),
    createNode('node2', 300, 100, 'Completed Book', node2Port),
    createNode('node3', 300, 200, '1st Review', node3Port),
    createNode('node4', 300, 300, 'Legal Terms', node4Port),
    createNode('node5', 300, 400, '2nd Review', node5Port),
    createNode('node6', 500, 100, 'Board', node6Port),
    createNode('node7', 500, 200, 'Approval', node7Port)
];

// Connector definitions for the diagram.
let connectors: ConnectorModel[] = [
    createConnector('connector1', 'node1', 'port2', 'node2', 'port6'),
    createConnector('connector2', 'node1', 'port4', 'node4', 'port13'),
    createConnector('connector3', 'node2', 'port9', 'node3', 'port11'),
    createConnector('connector4', 'node2', 'port7', 'node6', 'port19'),
    createConnector('connector5', 'node3', 'port10', 'node1', 'port5'),
    createConnector('connector6', 'node3', 'port12', 'node4', 'port14'),
    createConnector('connector7', 'node4', 'port15', 'node5', 'port17'),
    createConnector('connector8', 'node5', 'port18', 'node2', 'port8'),
    createConnector('connector9', 'node5', 'port16', 'node1', 'port3'),
    createConnector('connector10', 'node6', 'port20', 'node7', 'port21'),
    createConnector('connector11', 'node7', 'port22', 'node1', 'port1')
];

// Port visibility options for the dropdown.
let visibility: { [key: string]: Object }[] = [
    { PortVisibility: PortVisibility.Visible, text: "Visible" },
    { PortVisibility: PortVisibility.Hidden, text: "Hidden" },
    { PortVisibility: PortVisibility.Hover, text: "Hover" },
    { PortVisibility: PortVisibility.Connect, text: "Connect" }
];

// Port shape options for the dropdown.
let shape: { [key: string]: Object }[] = [
    { shape: "X", text: "X" },
    { shape: "Circle", text: "Circle" },
    { shape: "Square", text: "Square" },
    { shape: "Custom", text: "Custom" }
];

// CSS styles for the property panel.
const sample_css = ` 
.sb-child-row {
  margin-top: 8px;
}

.property-panel-header {
  padding-top: 15px;
  padding-bottom: 15px;
}

.property-section .e-remove-selection{
  cursor: not-allowed;
}

.row-header {
  font-size: 13px;
  font-weight: 500;
  padding-left: 10px
}

.e-remove-selection .property-section-content {
  pointer-events: none;
}`;

// Handles changes in selection within the diagram.
// It updates the property panel based on the selected node's port properties.
function onSelectionChange(args: any): void {
    if (args.state === "Changed") {
        let selectedElement: HTMLCollection = document.getElementsByClassName("e-remove-selection");
        if (args.newValue) {
            if (!propertypanelInstance.classList.contains("e-remove-selection")) {
                propertypanelInstance.classList.add("e-remove-selection");
            }
            if (args.newValue[0] instanceof Node && selectedElement.length) {
                selectedElement[0].classList.remove("e-remove-selection");
                let port: PointPortModel = getSelectedPort()[0];
                // Update UI components with the selected port's properties.
                portVisibilityDrop.value = port.visibility;
                portVisibilityDrop.dataBind();
                portFillDrop.value = port.style.fill;
                portFillDrop.dataBind();
                portBorderDrop.value = port.style.strokeColor;
                portBorderDrop.dataBind();
                portShapeDrop.value = port.shape;
                portShapeDrop.dataBind();
                portSizeNum.value = port.height;
                portSizeNum.dataBind();
                portWidthNum.value = port.style.strokeWidth;
                portWidthNum.dataBind();
            }
        }
    }
}

// Retrieves the ports of the currently selected node in the diagram.
function getSelectedPort(): PointPortModel[] {
    let node: NodeModel = diagramInstance.selectedItems.nodes[0];
    let port: PointPortModel[] = [];
    if (node) {
        port = node.ports;
    }
    return port;
}

// Updates the visibility of the selected port(s) based on the user's selection in the dropdown.
function onPortVisibilityChange(args): void {
    let port: PointPortModel[] = getSelectedPort();
    if (port) {
        for (let j: number = 0; j < port.length; j++) {
            port[j].visibility = portVisibilityDrop.value as PortVisibility;
            diagramInstance.dataBind();
        }
    }
}

// Updates the shape of the selected port(s) based on the user's selection in the dropdown.
function onPortShapeChange(args: ChangeEventArgs): void {
    let port: PointPortModel[] = getSelectedPort();
    for (let j: number = 0; j < port.length; j++) {
        switch (portShapeDrop.value) {
            case "X":
                port[j].shape = "X";
                break;
            case "Circle":
                port[j].shape = "Circle";
                break;
            case "Square":
                port[j].shape = "Square";
                break;
            case "Custom":
                port[j].shape = "Custom";
                port[j].pathData = "M6.805,0L13.61,10.703L0,10.703z";
                break;
        }
        diagramInstance.dataBind();
    }
}

// Applies the selected style (size or stroke width) to the selected port(s).
function applyPortStyle(value: string): void {
    let port: PointPortModel[] = getSelectedPort();
    for (let j: number = 0; j < port.length; j++) {
        if (value === "size" && portSizeNum) {
            port[j].height = portSizeNum.value;
            port[j].width = portSizeNum.value;
        } else if (value === "strokewidth" && portWidthNum) {
            port[j].style.strokeWidth = portWidthNum.value;
        }
    }
    diagramInstance.dataBind();
}

export interface CustomPort extends PointPortModel {
    text: string;
}
// Component for Port
function Port() {
    React.useEffect(() => {
        updateSampleSection();
        rendereComplete();
    }, [])

    // This method is called after the component is rendered.
    // It fits the diagram content within the diagram viewport and selects the first node.
    function rendereComplete() {
        diagramInstance.fitToPage();
        diagramInstance.select([diagramInstance.nodes[0]]);
    }

    // Renders the diagram and property panel UI components.
    return (
        <div className="control-pane">
            <style>{sample_css}</style>
            <div className="col-lg-8 control-section">
                {/* Initializes and renders diagram control */}
                <DiagramComponent
                    id="diagram"
                    ref={diagram => (diagramInstance = diagram)}
                    width={"100%"}
                    height={580}
                    nodes={nodes}
                    connectors={connectors}
                    selectionChange={onSelectionChange}
                    snapSettings={{ constraints: 0 }}
                    // Sets default properties for nodes, including shape, size, and style.
                    getNodeDefaults={(node: Node) => {
                        // Initialize shape based on node ID.
                        if (node.id === "node1" || node.id === "node2" ||
                            node.id === "node4" || node.id === "node6") {
                            node.shape = shape1;
                        } else if (node.id === "node3" || node.id === "node5" ||
                            node.id === "node7") {
                            node.shape = shape2;
                        }
                        // Sets height, width, and style for nodes.
                        node.height = 65;
                        node.width = 100;
                        node.style = { fill: "#ebf8fb", strokeColor: "#baeaf5" };
                        // Sets styles for the ports of the node.
                        node.ports.forEach(port => {
                            port.style = {
                                fill: "#366f8c",
                                strokeColor: "#366f8c"
                            };
                            port.width = 6;
                            port.height = 6;
                        });
                        // Sets style for the node annotations.
                        node.annotations[0].style = {
                            bold: true,
                            fontSize: 13,
                            color: "black"
                        };
                    }}
                    // Sets default properties for connectors, including type and style.
                    getConnectorDefaults={(connector: Connector) => {
                        // Defines type and style of the connectors.
                        connector.type = "Orthogonal";
                        connector.style = { strokeColor: "#8cdcef", strokeWidth: 1 };
                        // Sets the target decorator style.
                        connector.targetDecorator = {
                            width: 5,
                            height: 5,
                            style: { fill: "#8cdcef", strokeColor: "#8cdcef" }
                        };
                    }}
                />
            </div>

            <div className="col-lg-4 property-section">
                <div className="property-panel-header">Properties</div>
                <div className="property-panel-content">
                    <div id="propertypanel" className="e-remove-selection" ref={propertypanel => (propertypanelInstance = propertypanel)}>
                        <div className="property-section-content">
                            <div className="row row-header" style={{ fontSize: "13px" }}>
                                Port Customization
                            </div>
                            <div className="row sb-child-row">
                                <div className="col-lg-6">
                                    <div style={{ paddingBottom: "8px" }}>Visibility</div>
                                    <div>
                                        {/* Dropdown for selecting port visibility */}
                                        <DropDownListComponent
                                            id="portsVisiblity"
                                            enabled={true}
                                            dataSource={visibility}
                                            fields={{ value: "PortVisibility", text: "text" }}
                                            change={onPortVisibilityChange}
                                            ref={(portVisibilityref) => { portVisibilityDrop = portVisibilityref }}
                                        >
                                            <Inject services={[CheckBoxSelection]} />
                                        </DropDownListComponent>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div style={{ paddingBottom: "8px" }}>Shape</div>
                                    <div>
                                        {/* Dropdown for selecting port shape */}
                                        <DropDownListComponent
                                            id="shape"
                                            enabled={true}
                                            placeholder="Select a Shape"
                                            dataSource={shape}
                                            value="Circle"
                                            fields={{ value: "shape", text: "text" }}
                                            change={onPortShapeChange}
                                            ref={portShapeDropref =>
                                                (portShapeDrop = portShapeDropref)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row sb-child-row">
                                <div className="col-lg-6">
                                    <div style={{ paddingBottom: "8px" }}>Fill Color</div>
                                    <div style={{ paddingBottom: "8px" }}>
                                        {/* Color picker for selecting port fill color */}
                                        <ColorPickerComponent
                                            id="fillcolor"
                                            value="#000"
                                            disabled={false}
                                            change={(arg: ColorPickerEventArgs) => {
                                                let port: PointPortModel[] = getSelectedPort();
                                                port.forEach(p => {
                                                    p.style.fill = arg.currentValue.rgba;
                                                });
                                            }}
                                            ref={fillcolor => (portFillDrop = fillcolor)}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div style={{ paddingBottom: "8px" }}>Stroke Color</div>
                                    <div style={{ paddingBottom: "8px" }}>
                                        {/* Color picker for selecting port stroke color */}
                                        <ColorPickerComponent
                                            id="strokecolor"
                                            value="#000"
                                            disabled={false}
                                            change={(arg: ColorPickerEventArgs) => {
                                                let port: PointPortModel[] = getSelectedPort();
                                                port.forEach(p => {
                                                    p.style.strokeColor = arg.currentValue.rgba;
                                                });
                                            }}
                                            ref={strokecolor => (portBorderDrop = strokecolor)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row sb-child-row">
                                <div className="col-lg-6">
                                    <div style={{ paddingBottom: "8px" }}>Stroke Width</div>
                                    <div style={{ paddingBottom: "8px" }}>
                                        {/* NumericTextBox for selecting port stroke width */}
                                        <NumericTextBoxComponent
                                            ref={widthRef => (portWidthNum = widthRef)}
                                            id="width"
                                            enabled={true}
                                            format={"###.##"}
                                            value={1}
                                            step={0.5}
                                            change={(args: NumericChangeEventArgs) => {
                                                applyPortStyle("strokewidth");
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div style={{ paddingBottom: "8px" }}>Size</div>
                                    <div style={{ paddingBottom: "8px" }}>
                                        {/* NumericTextBox for selecting port size */}
                                        <NumericTextBoxComponent
                                            ref={sizeRef => (portSizeNum = sizeRef)}
                                            id="size"
                                            enabled={true}
                                            format={"###.##"}
                                            value={6}
                                            step={1}
                                            change={(args: NumericChangeEventArgs) => {
                                                applyPortStyle("size");
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample visualizes the process flow of publishing a book using
                    connection points. Connection points are static points over the
                    shapes that allow creating connections to the shapes. Customizing
                    the size and appearance of the connection points is illustrated in
                    this example.
                </p>
            </div>
            <div id="description">
                <p>
                    This example shows how to add connection ports to shapes. The{" "}
                    <code>ports</code> property of the node defines the static
                    connection ports. The <code>offset</code>,
                    <code>horizontalAlignment</code>, <code>verticalAlignment</code> and{" "}
                    <code>margin</code> properties of the ports define its position.
                </p>
                <p>
                    The <code>style</code> property of the port can be used to customize
                    its appearance. The <code>visibility</code> property can also be
                    used to define when the connection ports should be visible.
                </p>

                <p>
                    In this example, the appearance and visibility of the ports can be
                    customized using the options added to the property panel.
                </p>
            </div>
        </div>
    );
}
export default Port;