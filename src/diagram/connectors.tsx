import * as ReactDOM from "react-dom";
import * as React from "react";
import {
  Node,
  TextElement,
  HierarchicalTree,
  ConnectorConstraints,
  Segments,
  SelectorConstraints,
  DiagramComponent,
  randomId,
  Inject,
  ConnectorEditing,
  DecoratorShapes,
  SegmentThumbShapes
} from "@syncfusion/ej2-react-diagrams";
import {
  StackPanel,
  PointPortModel,
  Connector,
  BasicShapeModel
} from "@syncfusion/ej2-react-diagrams";
import {
  Diagram,
  NodeModel,
  ConnectorModel,
  PortVisibility
} from "@syncfusion/ej2-react-diagrams";
import {
  ChangeEventArgs,
  DropDownListComponent,
  DropDownList,
} from "@syncfusion/ej2-react-dropdowns";
import {
  ColorPickerComponent,
  ColorPickerEventArgs
} from "@syncfusion/ej2-react-inputs";
import { SampleBase } from "../common/sample-base";
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";

let diagramInstance: DiagramComponent;

//Initialize shape
let shape: BasicShapeModel = {
  type: "Basic",
  shape: "Rectangle",
  cornerRadius: 10
};
//Initialize Diagram Nodes
let nodes: NodeModel[] = [
  { id: "node1", annotations: [{ content: "Promotion" }] },
  { id: "node2", annotations: [{ content: "Lead" }] },
  { id: "node3", annotations: [{ content: "Account" }] },
  { id: "node4", annotations: [{ content: "Information" }] },
  { id: "node5", annotations: [{ content: "Opportunity" }] },
  { id: "node6", offsetX: 540, offsetY: 290, excludeFromLayout: true }
];
//Initialize Diagram connectors
let connectors: ConnectorModel[] = [
  { id: "connectr", sourceID: "node1", targetID: "node2" },
  {
    id: "connectr1",
    sourceID: "node2",
    sourcePortID: "port1",
    targetID: "node3",
    targetPortID: "portIn"
  },
  {
    id: "connectr2",
    sourceID: "node2",
    sourcePortID: "port2",
    targetID: "node4",
    targetPortID: "portIn"
  },
  {
    id: "connectr3",
    sourceID: "node2",
    sourcePortID: "port3",
    targetID: "node5",
    targetPortID: "portIn"
  },
  {
    id: "connectr4",
    sourceID: "node6",
    sourcePortID: "port4",
    targetID: "node3",
    targetPortID: "portOut"
  },
  {
    id: "connectr5",
    sourceID: "node6",
    sourcePortID: "port5",
    targetID: "node4",
    targetPortID: "portOut"
  },
  {
    id: "connectr7",
    sourceID: "node6",
    sourcePortID: "port6",
    targetID: "node5",
    targetPortID: "portOut"
  }
];

const SAMPLE_CSS = `.image-pattern-style {
        background-color: white;
        background-size: contain;
        background-repeat: no-repeat;
        height: 45px;
        width: calc((100% - 13px) / 3);
        cursor: pointer;
        border: 1px solid #D5D5D5;
        background-position: center;
        float: left;
    }

    .image-pattern-style:hover {
        border-color: gray;
        border-width: 2px;
    }

    .row {
        margin-left: 0px;
        margin-right: 0px;
    }

    .row-header {
        font-size: 13px;
        font-weight: 500;
    }

    .e-checkbox-wrapper .e-label {
        font-size: 12px;
    }

    .e-selected-style {
        border-color: #006CE6;
        border-width: 2px;
    }

    .e-colorpicker-wrapper .e-split-btn-wrapper .e-split-colorpicker.e-split-btn .e-selected-color .e-split-preview{
        width: 100px!important;
        margin-left: -40px!important;
    }
    .e-colorpicker-wrapper .e-split-btn-wrapper .e-split-colorpicker.e-split-btn{
        width: 110px!important;
    }

    label{
      display: inline-block;
      font-size: 13px;
      font-weight: 400;
      width: 100%;
      margin-top: auto;
    }`;

let decoratorshape = [
      { shape: 'None', text: 'None' },
      { shape: 'Square', text: 'Square' },
      { shape: 'Circle', text: 'Circle' },
      { shape: 'Diamond', text: 'Diamond' },
      { shape: 'Arrow', text: 'Arrow' },
      { shape: 'OpenArrow', text: 'Open Arrow' },
      { shape: 'Fletch', text: 'Fletch' },
      { shape: 'OpenFetch', text: 'OpenFetch' },
      { shape: 'IndentedArrow', text: 'Indented Arrow' },
      { shape: 'OutdentedArrow', text: 'Outdented Arrow' },
      { shape: 'DoubleArrow', text: 'Double Arrow' }
  ];
export class Connectors extends SampleBase<{}, {}> {
  private node: NodeModel;
  private connector: ConnectorModel;

  private lock(): void {
    let lock: HTMLInputElement = document.getElementById(
      "lock"
    ) as HTMLInputElement;
    for (let i: number = 0; i < diagramInstance.connectors.length; i++) {
      this.connector = diagramInstance.connectors[i];
      if (lock.checked) {
        this.connector.constraints &= ~(
          ConnectorConstraints.DragSourceEnd |
          ConnectorConstraints.DragTargetEnd |
          ConnectorConstraints.DragSegmentThumb
        );
        this.connector.constraints |= ConnectorConstraints.ReadOnly;
      } else {
        this.connector.constraints |=
          (ConnectorConstraints.Default|ConnectorConstraints.DragSegmentThumb) & ~ConnectorConstraints.ReadOnly;
      }
      diagramInstance.dataBind();
    }
  }
  rendereComplete() {
    diagramInstance.fitToPage();
    document.getElementById("appearance").onclick = (args: MouseEvent) => {
      let target: HTMLElement = args.target as HTMLElement;
      let selectedElement: HTMLCollection = document.getElementsByClassName(
        "e-selected-style"
      );
      if (selectedElement.length) {
        selectedElement[0].classList.remove("e-selected-style");
      }
      if (target.className === "image-pattern-style") {
        switch (target.id) {
          case "normalconnector1":
            defaultConnectorStyle("Straight", target);
            break;
          case "normalconnector2":
            defaultConnectorStyle("Orthogonal", target);
            break;
          case "normalconnector3":
            defaultConnectorStyle("Bezier", target);
            break;
          case "connector1withstroke":
            applyConnectorStyle(false, false, false, "Straight", target);
            break;
          case "connector2withstroke":
            applyConnectorStyle(false, false, false, "Orthogonal", target);
            break;
          case "connector3withstroke":
            applyConnectorStyle(false, false, false, "Bezier", target);
            break;
          case "connector1withdasharray":
            applyConnectorStyle(true, false, false, "Straight", target);
            break;
          case "connector2withdasharray":
            applyConnectorStyle(true, false, false, "Orthogonal", target);
            break;
          case "connector3withdasharray":
            applyConnectorStyle(true, false, false, "Bezier", target);
            break;
          case "cornerradious":
            applyConnectorStyle(false, false, true, "Orthogonal", target);
            break;
          case "sourcedecorator":
            applyConnectorStyle(false, true, false, "Straight", target);
            break;
          case "sourcedecoratorwithdasharray":
            applyConnectorStyle(true, true, false, "Straight", target);
            break;
        }
      }
    };
  }
  render() {
    return (
      <div className="control-pane diagram-control-pane">
        <style>{SAMPLE_CSS}</style>
        <div className="col-lg-9 control-section">
          <div className="content-wrapper" style={{width:"100%",background: "white"}}>
            <DiagramComponent
              id="diagram"
              ref={diagram => (diagramInstance = diagram)}
              width={"100%"}
              height={580}
              nodes={nodes}
              connectors={connectors}
              selectedItems={{
                constraints:
                  SelectorConstraints.ConnectorSourceThumb |
                  SelectorConstraints.ConnectorTargetThumb
              }}
              //Configrues hierarchical tree layout
              layout={{
                type: "HierarchicalTree",
                orientation: "LeftToRight",
                verticalSpacing: 75,
                margin: { left: 30, right: 0, top: 0, bottom: 0 }
              }}
              snapSettings={{ constraints: 0 }}
              //Sets the default values of nodes
              getNodeDefaults={(obj: Node) => {
                if (obj.id !== "node1") {
                  //Set ports
                  obj.ports = getPorts(obj);
                }
                if (obj.id !== "node6") {
                  obj.shape = shape;
                  obj.width = 80;
                  obj.style.strokeWidth = 2;
                  obj.style.strokeColor = "#6F409F";
                  obj.height = 35;
                }
              }}
              //Sets the default values of connector
              getConnectorDefaults={(obj: Connector) => {
                obj.type = "Bezier";
                obj.style.strokeColor = "#6f409f";
                obj.style.strokeWidth = 2;
                obj.targetDecorator = {
                  style: {
                    strokeColor: "#6f409f",
                    fill: "#6f409f"
                  }
                };
                obj.segments = [
                  {
                      type: 'Bezier',
                  }
              ],
              obj.constraints = ConnectorConstraints.Default | ConnectorConstraints.DragSegmentThumb 
              }}
              //Customize the content of the node
              setNodeTemplate={(obj: NodeModel): StackPanel => {
                if (obj.id === "node6") {
                  return setNodeTemplate();
                }
                return null;
              }}
            >
              <Inject services={[HierarchicalTree]} />
            </DiagramComponent>
          </div>
        </div>
        <div className="col-lg-3 property-section">
          <div className="property-panel-header">Properties</div>
          <div className="row property-panel-content" id="appearance">
            <div className="row row-header"><b>Connector types</b></div>
            <div className="row" style={{ paddingTop: "8px" }}>
              <div
                className="image-pattern-style"
                id="normalconnector1"
                style={{
                  backgroundImage:
                    "url('src/diagram/Images/connector/Connectors_1.png')",
                  marginRight: "3px"
                }}
              />
              <div
                className="image-pattern-style"
                id="normalconnector2"
                style={{
                  backgroundImage:
                    "url('src/diagram/Images/connector/Connectors_2.png')",
                  margin: "0px 3px"
                }}
              />
              <div
                className="image-pattern-style"
                id="normalconnector3"
                style={{
                  backgroundImage:
                    "url('src/diagram/Images/connector/Connectors_3.png')",
                    marginLeft: "3px"
                }}
              />
            </div>
            <div className="row" style={{ paddingTop: "8px" }}>
              <div
                className="image-pattern-style"
                id="connector1withstroke"
                style={{
                  backgroundImage:
                    "url('src/diagram/Images/connector/Connectors_4.png')",
                  marginRight: "3px"
                }}
              />
              <div
                className="image-pattern-style"
                id="connector2withstroke"
                style={{
                  backgroundImage:
                    "url('src/diagram/Images/connector/Connectors_5.png')",
                  margin: "0px 3px"
                }}
              />
              <div
                className="image-pattern-style"
                id="connector3withstroke"
                style={{
                  backgroundImage:
                    "url('src/diagram/Images/connector/Connectors_6.png')",
                    marginLeft: "3px"
                }}
              />
            </div>
            <div className="row" style={{ paddingTop: "8px" }}>
              <div
                className="image-pattern-style"
                id="connector1withdasharray"
                style={{
                  backgroundImage:
                    "url('src/diagram/Images/connector/Connectors_7.png')",
                  margin: "3px"
                }}
              />
              <div
                className="image-pattern-style"
                id="connector2withdasharray"
                style={{
                  backgroundImage:
                    "url('src/diagram/Images/connector/Connectors_8.png')",
                  marginRight: "0px 3px"
                }}
              />
              <div
                className="image-pattern-style"
                id="connector3withdasharray"
                style={{
                  backgroundImage:
                    "url('src/diagram/Images/connector/Connectors_9.png')",
                    marginLeft: "3px"
                }}
              />
            </div>
            <div className="row" style={{ paddingTop: "8px" }}>
              <div
                className="image-pattern-style"
                id="cornerradious"
                style={{
                  backgroundImage:
                    "url('src/diagram/Images/connector/Connectors_10.png')",
                  marginRight: "3px"
                }}
              />
              <div
                className="image-pattern-style"
                id="sourcedecorator"
                style={{
                  backgroundImage:
                    "url('src/diagram/Images/connector/Connectors_11.png')",
                  margin: "0px 3px"
                }}
              />
              <div
                className="image-pattern-style"
                id="sourcedecoratorwithdasharray"
                style={{
                  backgroundImage:
                    "url('src/diagram/Images/connector/Connectors_12.png')",
                    marginLeft: "3px"
                }}
              />
            </div>
          </div>
          <div className="row property-panel-content" id="decorators" style={{paddingTop: "10px"}}>
            <div className="row row-header" style={{paddingTop: "8px"}}>
              <b>Decorators</b>
            </div>
            <div className="row" style={{paddingTop: "8px", display:'flex'}}>
              <label>Source Decorators</label>
              <div>
                <DropDownListComponent id="sourceDecorator2" value="None" dataSource={decoratorshape} change={srcDecShapeChange}/>
              </div>
            </div>
            <div className="row" style={{paddingTop: "8px", display:'flex'}}>
              <label>Target Decorators</label>
              <div>
                <DropDownListComponent id="targetDecorator" value="None" dataSource={decoratorshape} change={tarDecShapeChange}/>
              </div>
            </div>
            <div className="row" style={{paddingTop: "8px", display:'flex'}}>
              <label>Segment Decorators</label>
              <div>
                <DropDownListComponent id="segmentDecorator" value="None" dataSource={decoratorshape} change={segDecShapeChange}/>
              </div>
            </div>
          </div>
          <div className="row property-panel-content" style={{ paddingTop: "8px"}}>
            <div className="row row-header">
              <b>Appearance</b>
            </div>
            <div className="row" style={{ paddingTop: "10px", display:'flex' }}>
            <label>Line color</label>
            <ColorPickerComponent id="color" mode="Palette" showButtons={false} modeSwitcher={true} value="#6F409F"
                change={(args) => {
                  for (let i = 0; i < diagramInstance.connectors.length; i++) {
                    diagramInstance.connectors[i].style.strokeColor = args.currentValue.hex;
                    diagramInstance.connectors[i].targetDecorator.style.strokeColor = args.currentValue.hex;
                    diagramInstance.connectors[i].targetDecorator.style.fill = args.currentValue.hex;
                    diagramInstance.connectors[i].sourceDecorator.style.strokeColor = args.currentValue.hex;
                    diagramInstance.connectors[i].sourceDecorator.style.fill = args.currentValue.hex;
                  }
                  diagramInstance.dataBind();
                }
                } />
            </div>
          </div>
        </div>

        <div id="action-description">
          <p>
            This sample visualizes the data flow in a marketing process using
            predefined shapes and connectors. Different types of connectors and
            decorators are used to customize the appearance, path, and direction
            of the data flow.
          </p>
        </div>
        <div id="description">
          <p>
            In this example, you can see how to add connectors to connect the
            shapes and how to customize the appearance of the connectors. You
            can use the <code>style</code> property of the connector to
            customize its stroke style. You can use the
            <code>cornerRadius</code> property to add connectors with rounded
            corners.
          </p>

          <p>
            To change the appearance, click different styles in the property
            panel.
          </p>

          <p>
            In this example, the shapes are automatically arranged
            using hierarchical tree layout.
          </p>

          <p style={{ fontWeight: 500 }}>Injecting Module</p>

          <p>
            Diagram component's features are segregated into individual
            feature-wise modules. To automatically arrange the shapes, we need
            to Inject <code>HierarchicalTree</code> module into{" "}
            <code>services</code>.
          </p>
          <br />
        </div>
      </div>
    );
  }
}

//Customize the content of the node
function setNodeTemplate(): StackPanel {
  let canvas: StackPanel = new StackPanel();
  canvas.children = [];
  canvas.id = randomId();
  canvas.style.strokeWidth = 0;
  canvas.style.fill = "#e6e0eb";
  canvas.children.push(getTextElement("Events", "#a6a1e0"));
  canvas.children.push(getTextElement("Emails", "#db8ec9"));
  canvas.children.push(getTextElement("Calls", "#db8ec9"));
  canvas.children.push(getTextElement("Smart Contents", "#db8ec9"));
  return canvas;
}

//creation of the TextElement.
function getTextElement(text: string, color: string): TextElement {
  let textElement: TextElement = new TextElement();
  textElement.id = randomId();
  textElement.width = 80;
  textElement.height = 35;
  textElement.content = text;
  textElement.style.fill = "#6f409f";
  textElement.style.color = "white";
  textElement.style.strokeColor = "#6f409f";
  textElement.cornerRadius = 5;
  textElement.margin = { top: 10, bottom: 10, left: 10, right: 10 };
  textElement.relativeMode = "Object";
  return textElement;
}
//creation of Port for Node.
function getPorts(obj: Node): PointPortModel[] {
  if (obj.id === "node2") {
    let node2Ports: PointPortModel[] = [
      {
        id: "port1",
        offset: { x: 1, y: 0.25 },
        visibility: PortVisibility.Hidden
      },
      {
        id: "port2",
        offset: { x: 1, y: 0.5 },
        visibility: PortVisibility.Hidden
      },
      {
        id: "port3",
        offset: { x: 1, y: 0.75 },
        visibility: PortVisibility.Hidden
      }
    ];
    return node2Ports;
  } else if (obj.id === "node6") {
    let node6Ports: PointPortModel[] = [
      {
        id: "port4",
        offset: { x: 0, y: 0.46 },
        visibility: PortVisibility.Hidden
      },
      {
        id: "port5",
        offset: { x: 0, y: 0.5 },
        visibility: PortVisibility.Hidden
      },
      {
        id: "port6",
        offset: { x: 0, y: 0.54 },
        visibility: PortVisibility.Hidden
      }
    ];
    return node6Ports;
  } else {
    let ports: PointPortModel[] = [
      {
        id: "portIn",
        offset: { x: 0, y: 0.5 },
        visibility: PortVisibility.Hidden
      },
      {
        id: "portOut",
        offset: { x: 1, y: 0.5 },
        visibility: PortVisibility.Hidden
      }
    ];
    return ports;
  }
}

//ConnectorStyle customization
function applyConnectorStyle(
  dashedLine: boolean,
  sourceDec: boolean,
  isRounded: boolean,
  type: Segments,
  target: HTMLElement
): void {
  for (let i: number = 0; i < diagramInstance.connectors.length; i++) {
    diagramInstance.connectors[i].style.strokeWidth = 2;
    diagramInstance.connectors[i].type = type;
    if (isRounded) {
      diagramInstance.connectors[i].cornerRadius = 5;
    }
    if (sourceDec) {
      diagramInstance.connectors[i].sourceDecorator = {
        style: {
          strokeColor: diagramInstance.connectors[i].style.strokeColor,
          fill: diagramInstance.connectors[i].style.strokeColor,
          strokeWidth: 2
        },
        shape: "Circle"
      };
      (document.getElementById('sourceDecorator2') as any).value='Circle';
    } else {
      diagramInstance.connectors[i].sourceDecorator = { shape: "None" };
      (document.getElementById('sourceDecorator2') as any).value='None';
    }
    if (dashedLine) {
      diagramInstance.connectors[i].style.strokeDashArray = "5,5";
    } else {
      diagramInstance.connectors[i].style.strokeDashArray = "";
    }
    diagramInstance.connectors[i].targetDecorator = {
      style: {
        strokeColor: diagramInstance.connectors[i].style.strokeColor,
        fill: diagramInstance.connectors[i].style.strokeColor,
        strokeWidth: 2
      },
      shape: "Arrow"
    };
    (document.getElementById('targetDecorator') as any).value='Arrow';
    diagramInstance.dataBind();
  }
  target.classList.add("e-selected-style");
}
//ConnectorStyle customization
function defaultConnectorStyle(type: Segments, target: HTMLElement): void {
  for (let i: number = 0; i < diagramInstance.connectors.length; i++) {
    diagramInstance.connectors[i].style.strokeWidth = 1;
    diagramInstance.connectors[i].type = type;
    diagramInstance.connectors[i].sourceDecorator = { shape: "None" };
    diagramInstance.connectors[i].style.strokeDashArray = "";
    diagramInstance.connectors[i].targetDecorator = {
      style: {
        strokeColor: diagramInstance.connectors[i].style.strokeColor,
        fill: diagramInstance.connectors[i].style.strokeColor,
        strokeWidth: 1
      },
      shape: "Arrow"
    };
    diagramInstance.dataBind();
    (document.getElementById('targetDecorator') as any).value='Arrow';
  }
  target.classList.add("e-selected-style");
}

function srcDecShapeChange(args:any)
{
    for (let i = 0; i < diagramInstance.connectors.length; i++) {
      diagramInstance.connectors[i].sourceDecorator = {
         shape: args.itemData.shape,
         style:{
                strokeColor:  diagramInstance.connectors[i].style.strokeColor,
                fill:  diagramInstance.connectors[i].style.strokeColor,
         }
        };
    }
    diagramInstance.dataBind();
   
}
function tarDecShapeChange(args:any)
{
    for (let i = 0; i < diagramInstance.connectors.length; i++) {
      diagramInstance.connectors[i].targetDecorator = {
            shape: args.itemData.shape,
            style: {
                strokeColor: diagramInstance.connectors[i].style.strokeColor,
                fill:  diagramInstance.connectors[i].style.strokeColor,
            }
        };
        diagramInstance.dataBind();
    }   
}
function segDecShapeChange(args:any)
{
    for (let i = 0; i < diagramInstance.connectors.length; i++) {
      diagramInstance.segmentThumbShape = args.itemData.shape;  
    } 
    diagramInstance.dataBind();  
}
