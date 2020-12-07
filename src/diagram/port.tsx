import * as ReactDOM from "react-dom";
import * as React from "react";
import {
  PointPortModel,
  PortVisibility,
  DiagramComponent,
  NodeModel,
  ConnectorModel,
  BasicShapeModel,
  Node,
  Connector,
  Diagram
} from "@syncfusion/ej2-react-diagrams";
import { SampleBase } from "../common/sample-base";
import {
  ChangeEventArgs,
  DropDownListComponent
} from "@syncfusion/ej2-react-dropdowns";
import {
  MultiSelectComponent,
  MultiSelectChangeEventArgs
} from "@syncfusion/ej2-react-dropdowns";
import {
  NumericTextBoxComponent,
  ChangeEventArgs as NumericChangeEventArgs,
  ColorPickerComponent,
  ColorPickerEventArgs
} from "@syncfusion/ej2-react-inputs";

let diagramInstance: DiagramComponent;
let portDrop: DropDownListComponent;
let portVisibilityDrop: MultiSelectComponent;
let portFillDrop: DropDownListComponent;
let portBorderDrop: DropDownListComponent;
let portShapeDrop: DropDownListComponent;
let portSizeNum: NumericTextBoxComponent;
let portWidthNum: NumericTextBoxComponent;

//Initializes the ports for the diagram
let node1Port: CustomPort[] = [
  {
    id: "port1",
    shape: "Circle",
    offset: { x: 0, y: 0.5 },
    height: 8,
    width: 8,
    visibility: PortVisibility.Visible,
    text: "In - 1"
  },
  {
    id: "port2",
    shape: "Circle",
    offset: { x: 1, y: 0.5 },
    height: 8,
    width: 8,
    visibility: PortVisibility.Visible,
    text: "OUT - 1"
  },
  {
    id: "port3",
    shape: "Circle",
    offset: { x: 0.25, y: 1 },
    height: 8,
    width: 8,
    visibility: PortVisibility.Visible,
    text: "In - 2"
  },
  {
    id: "port4",
    shape: "Circle",
    offset: { x: 0.5, y: 1 },
    height: 8,
    width: 8,
    visibility: PortVisibility.Visible,
    text: "OUT - 2"
  },
  {
    id: "port5",
    shape: "Circle",
    offset: { x: 0.75, y: 1 },
    height: 8,
    width: 8,
    visibility: PortVisibility.Visible,
    text: "In - 3"
  }
];

let node2Port: CustomPort[] = [
  {
    id: "port6",
    shape: "Circle",
    offset: { x: 0, y: 0.5 },
    height: 8,
    width: 8,
    visibility: PortVisibility.Visible,
    text: "In - 1"
  },
  {
    id: "port7",
    shape: "Circle",
    offset: { x: 1, y: 0.35 },
    height: 8,
    width: 8,
    visibility: PortVisibility.Visible,
    text: "OUT - 1"
  },
  {
    id: "port8",
    shape: "Circle",
    offset: { x: 1, y: 0.7 },
    height: 8,
    width: 8,
    visibility: PortVisibility.Visible,
    text: "In - 2"
  },
  {
    id: "port9",
    shape: "Circle",
    offset: { x: 0.5, y: 1 },
    height: 8,
    width: 8,
    visibility: PortVisibility.Visible,
    text: "OUT - 2"
  }
];

let node3Port: CustomPort[] = [
  {
    id: "port10",
    shape: "Circle",
    offset: { x: 0, y: 0.5 },
    height: 8,
    width: 8,
    visibility: PortVisibility.Visible,
    text: "Out - 1"
  },
  {
    id: "port11",
    shape: "Circle",
    offset: { x: 0.5, y: 0 },
    height: 8,
    width: 8,
    visibility: PortVisibility.Visible,
    text: "In - 1"
  },
  {
    id: "port12",
    shape: "Circle",
    offset: { x: 0.5, y: 1 },
    height: 8,
    width: 8,
    visibility: PortVisibility.Visible,
    text: "OUT - 2"
  }
];

let node4Port: CustomPort[] = [
  {
    id: "port13",
    shape: "Circle",
    offset: { x: 0, y: 0.5 },
    height: 8,
    width: 8,
    visibility: PortVisibility.Visible,
    text: "In - 1"
  },
  {
    id: "port14",
    shape: "Circle",
    offset: { x: 0.5, y: 0 },
    height: 8,
    width: 8,
    visibility: PortVisibility.Visible,
    text: "In - 2"
  },
  {
    id: "port15",
    shape: "Circle",
    offset: { x: 0.5, y: 1 },
    height: 8,
    width: 8,
    visibility: PortVisibility.Visible,
    text: "OUT - 1"
  }
];

let node5Port: CustomPort[] = [
  {
    id: "port16",
    shape: "Circle",
    offset: { x: 0, y: 0.5 },
    height: 8,
    width: 8,
    visibility: PortVisibility.Visible,
    text: "out - 1"
  },
  {
    id: "port17",
    shape: "Circle",
    offset: { x: 0.5, y: 0 },
    height: 8,
    width: 8,
    visibility: PortVisibility.Visible,
    text: "In - 1"
  },
  {
    id: "port18",
    shape: "Circle",
    offset: { x: 1, y: 0.5 },
    height: 8,
    width: 8,
    visibility: PortVisibility.Visible,
    text: "OUT - 2"
  }
];

let node6Port: CustomPort[] = [
  {
    id: "port19",
    shape: "Circle",
    offset: { x: 0, y: 0.35 },
    height: 8,
    width: 8,
    visibility: PortVisibility.Visible,
    text: "In - 1"
  },
  {
    id: "port20",
    shape: "Circle",
    offset: { x: 0.5, y: 1 },
    height: 8,
    width: 8,
    visibility: PortVisibility.Visible,
    text: "Out - 1"
  }
];

let node7Port: CustomPort[] = [
  {
    id: "port21",
    shape: "Circle",
    offset: { x: 0.5, y: 0 },
    height: 8,
    width: 8,
    visibility: PortVisibility.Visible,
    text: "In - 1"
  },
  {
    id: "port22",
    shape: "Circle",
    offset: { x: 0.5, y: 1 },
    height: 8,
    width: 8,
    visibility: PortVisibility.Visible,
    text: "Out - 1"
  }
];

let shape1: BasicShapeModel = { type: "Basic", shape: "Rectangle" };

let shape2: BasicShapeModel = { type: "Basic", shape: "Diamond" };

let nodes: NodeModel[] = [
  {
    id: "node1",
    offsetX: 100,
    offsetY: 100,
    annotations: [{ content: "Publisher" }],
    ports: node1Port
  },
  {
    id: "node2",
    offsetX: 300,
    offsetY: 100,
    annotations: [{ content: "Completed Book", margin: { left: 5, right: 5 } }],
    ports: node2Port
  },
  {
    id: "node3",
    offsetX: 300,
    offsetY: 200,
    annotations: [{ content: "1st Review" }],
    ports: node3Port
  },
  {
    id: "node4",
    offsetX: 300,
    offsetY: 300,
    annotations: [{ content: "Legal Terms" }],
    ports: node4Port
  },
  {
    id: "node5",
    offsetX: 300,
    offsetY: 400,
    annotations: [{ content: "2nd Review" }],
    ports: node5Port
  },
  {
    id: "node6",
    offsetX: 500,
    offsetY: 100,
    annotations: [{ content: "Board" }],
    ports: node6Port
  },
  {
    id: "node7",
    offsetX: 500,
    offsetY: 200,
    annotations: [{ content: "Approval" }],
    ports: node7Port
  }
];
let connectors: ConnectorModel[] = [
  {
    id: "connector1",
    sourceID: "node1",
    sourcePortID: "port2",
    targetID: "node2",
    targetPortID: "port6"
  },
  {
    id: "connector2",
    sourceID: "node1",
    sourcePortID: "port4",
    targetID: "node4",
    targetPortID: "port13"
  },
  {
    id: "connector3",
    sourceID: "node2",
    sourcePortID: "port9",
    targetID: "node3",
    targetPortID: "port11"
  },
  {
    id: "connector4",
    sourceID: "node2",
    sourcePortID: "port7",
    targetID: "node6",
    targetPortID: "port19"
  },
  {
    id: "connector5",
    sourceID: "node3",
    sourcePortID: "port10",
    targetID: "node1",
    targetPortID: "port5"
  },
  {
    id: "connector6",
    sourceID: "node3",
    sourcePortID: "port12",
    targetID: "node4",
    targetPortID: "port14"
  },
  {
    id: "connector7",
    sourceID: "node4",
    sourcePortID: "port15",
    targetID: "node5",
    targetPortID: "port17"
  },
  {
    id: "connector8",
    sourceID: "node5",
    sourcePortID: "port18",
    targetID: "node2",
    targetPortID: "port8"
  },
  {
    id: "connector9",
    sourceID: "node5",
    sourcePortID: "port16",
    targetID: "node1",
    targetPortID: "port3"
  },
  {
    id: "connector10",
    sourceID: "node6",
    sourcePortID: "port20",
    targetID: "node7",
    targetPortID: "port21"
  },
  {
    id: "connector11",
    sourceID: "node7",
    sourcePortID: "port22",
    targetID: "node1",
    targetPortID: "port1"
  }
];
let fillColor: ColorPickerComponent;
let strokeColor: ColorPickerComponent;
//Visibility collection of the Port.
let visibility: { [key: string]: Object }[] = [
  { PortVisibility: PortVisibility.Visible, text: "Visible" },
  { PortVisibility: PortVisibility.Hidden, text: "Hidden" },
  { PortVisibility: PortVisibility.Hover, text: "Hover" },
  { PortVisibility: PortVisibility.Connect, text: "Connect" }
];

//Color collection of the Port.
let color: { [key: string]: Object }[] = [
  { text: "White", color: "white" },
  { text: "#008080", color: "#008080" },
  { text: "#E4B123", color: "#E4B123" },
  { text: "#F05023", color: "#F05023" },
  { text: "#3CB549", color: "#3CB549" },
  { text: "#D572AD", color: "#D572AD" },
  { text: "Black", color: "black" },
  { text: "Goldenrod", color: "goldenrod" },
  { text: "Indigo", color: "indigo" },
  { text: "Chocolate", color: "chocolate" },
  { text: "DarkGoldenRod", color: "darkgoldenrod" },
  { text: "FireBrick", color: "firebrick" },
  { text: "DarkRed", color: "darkred" }
];

//Shape collection of the Port.
let shape: { [key: string]: Object }[] = [
  { shape: "X", text: "X" },
  { shape: "Circle", text: "Circle" },
  { shape: "Square", text: "Square" },
  { shape: "Custom", text: "Custom" }
];
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
export class Port extends SampleBase<{}, {}> {
  rendereComplete() {
    diagramInstance.fitToPage();
    diagramInstance.select([diagramInstance.nodes[0]]);
  }
  render() {
    return (
      <div className="control-pane">
        <style>{sample_css}</style>
        <div className="col-lg-8 control-section">
          <DiagramComponent
            id="diagram"
            ref={diagram => (diagramInstance = diagram)}
            width={"100%"}
            height={580}
            nodes={nodes}
            connectors={connectors}
            selectionChange={selectChange}
            snapSettings={{ constraints: 0 }}
            getNodeDefaults={(obj: Node) => {
              //Sets the default values of nodes
              //Initialize shape
              if (
                obj.id === "node1" ||
                obj.id === "node2" ||
                obj.id === "node4" ||
                obj.id === "node6"
              ) {
                obj.shape = shape1;
              } else if (
                obj.id === "node3" ||
                obj.id === "node5" ||
                obj.id === "node7"
              ) {
                obj.shape = shape2;
              }
              //sets height and width for nodes
              obj.height = 65;
              obj.width = 100;
              obj.style = { fill: "#ebf8fb", strokeColor: "#baeaf5" };
              for (let i: number = 0; i < obj.ports.length; i++) {
                //sets styles for the ports
                obj.ports[i].style = {
                  fill: "#366f8c",
                  strokeColor: "#366f8c"
                };
                obj.ports[i].width = 6;
                obj.ports[i].height = 6;
              }
              obj.annotations[0].style = {
                bold: true,
                fontSize: 13,
                color: "black"
              };
            }}
            getConnectorDefaults={(connector: Connector) => {
              //Sets the default values of connector
              //defines type of the connectors
              connector.type = "Orthogonal";
              connector.style = { strokeColor: "#8cdcef", strokeWidth: 1 };
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
            <div id="propertypanel" className="e-remove-selection">
              <div className="property-section-content">
                <div className="row row-header" style={{ fontSize: "13px" }}>
                  Port Customization
              </div>
                <div className="row sb-child-row">
                  <div className="col-lg-6">
                    <div style={{ paddingBottom: "8px" }}>Visibility</div>
                    <div>
                      {/* Enable or disable the visibility of the Port */}
                      <MultiSelectComponent
                        id="portsVisiblity"
                        enabled={true}
                        dataSource={visibility}
                        fields={{ value: "PortVisibility", text: "text" }}
                        mode="CheckBox"
                        showSelectAll={true}
                        showDropDownIcon={true}
                        popupHeight={"280px"}
                        popupWidth={"180px"}
                        change={portVisibilityDropOnChange}
                        ref={portVisibilityref =>
                          (portVisibilityDrop = portVisibilityref)
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div style={{ paddingBottom: "8px" }}>Shape</div>
                    <div>
                      {/* DropDownList is used to apply the shape of the Port. */}
                      <DropDownListComponent
                        id="shape"
                        enabled={true}
                        placeholder="Select a Shape"
                        dataSource={shape}
                        value="Circle"
                        fields={{ value: "shape", text: "text" }}
                        change={portShapeDropOnChange}
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
                      {/* DropDownList is used to apply the fill color of the Port. */}
                      <ColorPickerComponent
                        id="fillcolor"
                        value="#000"
                        disabled={false}
                        change={(arg: ColorPickerEventArgs) => {
                          let port: PointPortModel[] = getPort();
                          for (let j: number = 0; j < port.length; j++) {
                            port[j].style.fill = arg.currentValue.rgba;
                          }
                        }}
                        ref={fillcolor => (fillColor = fillcolor)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div style={{ paddingBottom: "8px" }}>Stroke Color</div>
                    <div style={{ paddingBottom: "8px" }}>
                      {/* DropDownList is used to apply the fill color of the Port. */}
                      <ColorPickerComponent
                        id="strokecolor"
                        value="#000"
                        disabled={false}
                        change={(arg: ColorPickerEventArgs) => {
                          let port: PointPortModel[] = getPort();
                          for (let j: number = 0; j < port.length; j++) {
                            port[j].style.strokeColor = arg.currentValue.rgba;
                          }
                        }}
                        ref={strokecolor => (strokeColor = strokecolor)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row sb-child-row">
                  <div className="col-lg-6">
                    <div style={{ paddingBottom: "8px" }}>Stroke Width</div>
                    <div style={{ paddingBottom: "8px" }}>
                      {/* NumericTextBox is used to apply the StrokeWidth of the Port. */}
                      <NumericTextBoxComponent
                        ref={widthRef => (portWidthNum = widthRef)}
                        id="width"
                        enabled={true}
                        format={"###.##"}
                        value={1}
                        step={0.5}
                        change={(args: NumericChangeEventArgs) => {
                          applyportstyle("strokewidth");
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div style={{ paddingBottom: "8px" }}>Size</div>
                    <div style={{ paddingBottom: "8px" }}>
                      {/* NumericTextBox is used to apply the size of the Port. */}
                      <NumericTextBoxComponent
                        ref={sizeRef => (portSizeNum = sizeRef)}
                        id="size"
                        enabled={true}
                        format={"###.##"}
                        value={6}
                        step={1}
                        change={(args: NumericChangeEventArgs) => {
                          applyportstyle("size");
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
}

function selectChange(args: any): void {
  if (args.state === "Changed") {
    let appearance: HTMLElement = document.getElementById("propertypanel");
    let selectedElement: HTMLCollection = document.getElementsByClassName(
      "e-remove-selection"
    );
    if (args.newValue) {
      if (!appearance.classList.contains("e-remove-selection")) {
        appearance.classList.add("e-remove-selection");
      }
      if (args.newValue[0] instanceof Node && selectedElement.length) {
        selectedElement[0].classList.remove("e-remove-selection");
        let port: PointPortModel[] = getPort();
        portVisibilityDrop.value = [] as number[];
        if (PortVisibility.Visible & port[0].visibility) {
          portVisibilityDrop.value.push(PortVisibility.Visible);
        }
        if (PortVisibility.Hidden & port[0].visibility) {
          portVisibilityDrop.value.push(PortVisibility.Hidden);
        }
        if (PortVisibility.Hover & port[0].visibility) {
          portVisibilityDrop.value.push(PortVisibility.Hover);
        }
        if (PortVisibility.Connect & port[0].visibility) {
          portVisibilityDrop.value.push(PortVisibility.Connect);
        }
        if (portVisibilityDrop.value.length === 0) {
          portVisibilityDrop.placeholder = 'Select Visibility';
        }
        portVisibilityDrop.dataBind();
        portFillDrop.value = port[0].style.fill;
        portFillDrop.dataBind();
        portBorderDrop.value = port[0].style.strokeColor;
        portBorderDrop.dataBind();
        portShapeDrop.value = port[0].shape;
        portShapeDrop.dataBind();
        portSizeNum.value = port[0].height;
        portSizeNum.dataBind();
        portWidthNum.value = port[0].style.strokeWidth;
        portWidthNum.dataBind();
      }
    }
  }
}
//get the port for the selected node.
function getPort(): PointPortModel[] {
  let node: NodeModel = diagramInstance.selectedItems.nodes[0];
  let port: PointPortModel[];
  if (node) {
    port = node.ports;
  }
  return port;
}

//change the Visibility of the Port.
function portVisibilityDropOnChange(args: MultiSelectChangeEventArgs): void {
  let port: PointPortModel[] = getPort();
  if (port) {
    for (let j: number = 0; j < port.length; j++) {
      port[j].visibility = 0;
      for (let i: number = 0; i < args.value.length; i++) {
        port[j].visibility += args.value[i] as PortVisibility;
      }
      diagramInstance.dataBind();
    }
  }
}
//change the shape of the Port.
function portShapeDropOnChange(args: ChangeEventArgs): void {
  let port: PointPortModel[] = getPort();
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

//set the appearence of the Port.
function applyportstyle(value: string): void {
  let port: PointPortModel[] = getPort();
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