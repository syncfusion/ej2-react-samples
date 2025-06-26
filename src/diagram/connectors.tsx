import * as ReactDOM from "react-dom";
import * as React from "react";
import {
  Node,
  TextElement,
  HierarchicalTree,
  ConnectorConstraints,
  Segments,
  SelectorConstraints,
  SnapConstraints,
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
  ColorPickerEventArgs,
  NumericTextBoxComponent
} from "@syncfusion/ej2-react-inputs";
import { SampleBase } from "../common/sample-base";
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
Diagram.Inject(ConnectorEditing);

let diagramInstance: DiagramComponent;
let sourceDecoratorDropDown: DropDownListComponent;
let targetDecoratorDropDown: DropDownListComponent;
let appearanceElement: HTMLElement;
let segmentDecoratorSizeNumericTextBox: NumericTextBoxComponent;

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
  { id: "connector", sourceID: "node1", targetID: "node2" },
  {
    id: "connector1",
    sourceID: "node2",
    sourcePortID: "port1",
    targetID: "node3",
    targetPortID: "portIn"
  },
  {
    id: "connector2",
    sourceID: "node2",
    sourcePortID: "port2",
    targetID: "node4",
    targetPortID: "portIn"
  },
  {
    id: "connector3",
    sourceID: "node2",
    sourcePortID: "port3",
    targetID: "node5",
    targetPortID: "portIn"
  },
  {
    id: "connector4",
    sourceID: "node6",
    sourcePortID: "port4",
    targetID: "node3",
    targetPortID: "portOut"
  },
  {
    id: "connector5",
    sourceID: "node6",
    sourcePortID: "port5",
    targetID: "node4",
    targetPortID: "portOut"
  },
  {
    id: "connector7",
    sourceID: "node6",
    sourcePortID: "port6",
    targetID: "node5",
    targetPortID: "portOut"
  }
];

const SAMPLE_CSS = `
/* For connector type and style change in property panel*/
      .diagram-connector .image-pattern-style {
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

    .diagram-connector .image-pattern-style:hover {
        border-color: gray;
        border-width: 2px;
    }

    .diagram-connector .row {
        margin-left: 0px;
        margin-right: 0px;
    }

    .diagram-connector .row-header {
        font-size: 13px;
        font-weight: 500;
    }

    .diagram-connector .e-selected-style {
        border-color: #006CE6;
        border-width: 2px;
    }

    .diagram-connector label{
      display: inline-block;
      font-size: 13px;
      font-weight: 400;
      width: 100%;
      margin-top: auto;
    }`;

// Shape collection of the decorators.
let decoratorShape = [
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

  rendereComplete() {
    diagramInstance.fitToPage();
    //Click Event for Appearance of the layout.
    appearanceElement.onclick = (args: MouseEvent) => {
      let target: HTMLElement = args.target as HTMLElement;
      let selectedElement: HTMLCollection = document.getElementsByClassName(
        "e-selected-style"
      );
      if (selectedElement.length) {
        selectedElement[0].classList.remove("e-selected-style");
      }
      if (target.className === "image-pattern-style") {
        switch (target.id) {
          case "straightConnector":
            defaultConnectorStyle("Straight", target);
            break;
          case "orthogonalConnector":
            defaultConnectorStyle("Orthogonal", target);
            break;
          case "bezierConnector":
            defaultConnectorStyle("Bezier", target);
            break;
          case "straightConnectorWithStroke":
            applyConnectorStyle(false, false, false, "Straight", target);
            break;
          case "orthogonalConnectorWithStroke":
            applyConnectorStyle(false, false, false, "Orthogonal", target);
            break;
          case "bezierConnectorWithStroke":
            applyConnectorStyle(false, false, false, "Bezier", target);
            break;
          case "straightConnectorWithDasharray":
            applyConnectorStyle(true, false, false, "Straight", target);
            break;
          case "orthogonalConnectorWithDasharray":
            applyConnectorStyle(true, false, false, "Orthogonal", target);
            break;
          case "bezierConnectorWithDasharray":
            applyConnectorStyle(true, false, false, "Bezier", target);
            break;
          case "cornerRadius":
            applyConnectorStyle(false, false, true, "Orthogonal", target);
            break;
          case "sourceDecorators":
            applyConnectorStyle(false, true, false, "Straight", target);
            break;
          case "sourceDecoratorWithDasharray":
            applyConnectorStyle(true, true, false, "Straight", target);
            break;
        }
      }
    };
  }
  render() {
    return (
      <div className="control-pane diagram-connector">
        <style>{SAMPLE_CSS}</style>
        <div className="col-lg-8 control-section">
          <div  style={{width:"100%",background: "white"}}>
            <DiagramComponent
              id="diagram"
              ref={diagram => (diagramInstance = diagram)}
              width={"100%"}
              height={580}
              nodes={nodes}
              connectors={connectors}
              segmentThumbSize={10}
              selectionChange={() => {
                if (diagramInstance.selectedItems.connectors.length > 0) {
                  (segmentDecoratorSizeNumericTextBox as any).enabled = true;
                }
                else{
                  (segmentDecoratorSizeNumericTextBox as any).enabled = false;
                }
              }}
              //Configrues hierarchical tree layout
              layout={{
                type: "HierarchicalTree",
                orientation: "LeftToRight",
                verticalSpacing: 75,
                margin: { left: 30, right: 0, top: 0, bottom: 0 }
              }}
              snapSettings={{ constraints: SnapConstraints.None }}
              // Sets the default values of nodes
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
        <div className="col-lg-4 property-section">
          <div className="property-panel-header">Properties</div>
          <div className="row property-panel-content" id="appearance" ref={appearance => (appearanceElement = appearance)}>
            <div className="row row-header"><b>Connector types</b></div>
            <div className="row" style={{ paddingTop: "8px" }}>
              <div
                className="image-pattern-style"
                id="straightConnector"
                style={{
                  backgroundImage:
                    "url('src/diagram/Images/connector/Connectors_1.png')",
                  marginRight: "3px"
                }}
              />
              <div
                className="image-pattern-style"
                id="orthogonalConnector"
                style={{
                  backgroundImage:
                    "url('src/diagram/Images/connector/Connectors_2.png')",
                  margin: "0px 3px"
                }}
              />
              <div
                className="image-pattern-style"
                id="bezierConnector"
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
                id="straightConnectorWithStroke"
                style={{
                  backgroundImage:
                    "url('src/diagram/Images/connector/Connectors_4.png')",
                  marginRight: "3px"
                }}
              />
              <div
                className="image-pattern-style"
                id="orthogonalConnectorWithStroke"
                style={{
                  backgroundImage:
                    "url('src/diagram/Images/connector/Connectors_5.png')",
                  margin: "0px 3px"
                }}
              />
              <div
                className="image-pattern-style"
                id="bezierConnectorWithStroke"
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
                id="straightConnectorWithDasharray"
                style={{
                  backgroundImage:
                    "url('src/diagram/Images/connector/Connectors_7.png')",
                  marginRight: "3px"
                }}
              />
              <div
                className="image-pattern-style"
                id="orthogonalConnectorWithDasharray"
                style={{
                  backgroundImage:
                    "url('src/diagram/Images/connector/Connectors_8.png')",
                  margin: "0px 3px"
                }}
              />
              <div
                className="image-pattern-style"
                id="bezierConnectorWithDasharray"
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
                id="cornerRadius"
                style={{
                  backgroundImage:
                    "url('src/diagram/Images/connector/Connectors_10.png')",
                  marginRight: "3px"
                }}
              />
              <div
                className="image-pattern-style"
                id="sourceDecorators"
                style={{
                  backgroundImage:
                    "url('src/diagram/Images/connector/Connectors_11.png')",
                  margin: "0px 3px"
                }}
              />
              <div
                className="image-pattern-style"
                id="sourceDecoratorWithDasharray"
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
                <DropDownListComponent id="sourceDecorator" ref={sourceDecorator => (sourceDecoratorDropDown = sourceDecorator)} value="None" dataSource={decoratorShape} change={sourceDecoratorShapeChange}/>
              </div>
            </div>
            <div className="row" style={{paddingTop: "8px", display:'flex'}}>
              <label>Target Decorators</label>
              <div>
                <DropDownListComponent id="targetDecorator" ref={targetDecorator => (targetDecoratorDropDown = targetDecorator)} value="None" dataSource={decoratorShape} change={targetDecoratorShapeChange}/>
              </div>
            </div>
            <div className="row" style={{paddingTop: "8px", display:'flex'}}>
              <label>Segment Decorators</label>
              <div>
                <DropDownListComponent id="segmentDecorator" value="None" dataSource={decoratorShape} change={segmentDecoratorShapeChange}/>
              </div>
            </div>
          </div>
          <div className="row property-panel-content" id="decorators" style={{ paddingTop: "10px" }}>
            <div className="row row-header" style={{ paddingTop: "8px" }}>
              <b>Decorators Size</b>
            </div>
            <div className="row" style={{ paddingTop: "8px", display: 'flex' }}>
              <label>Source Decorators Size</label>
              <div>
                <NumericTextBoxComponent id="sourceDecoratorSize" enabled={true} format={"###.##"} value={12} step={1} max={20} min={10} change={sourceDecoratorSizeChange}/>
              </div>
            </div>
            <div className="row" style={{ paddingTop: "8px", display: 'flex' }}>
              <label>Target Decorators Size</label>
              <div>
                <NumericTextBoxComponent id="targetDecoratorSize" enabled={true} format={"###.##"} value={12} step={1} max={20} min={10} change={targetDecoratorSizeChange}/>
              </div>
            </div>
            <div className="row" style={{ paddingTop: "8px", display: 'flex' }}>
              <label>Segment Decorators Size</label>
              <div>
                <NumericTextBoxComponent id="segmentDecoratorSize" ref={segmentDecoratorSize => (segmentDecoratorSizeNumericTextBox = segmentDecoratorSize)} enabled={false} format={"###.##"} value={12} step={1} max={20} min={10} change={segmentDecoratorSizeChange}/>
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
          To change the appearance, click on different styles in the property panel to modify the connector type, decorator shapes, and decorator sizes.
          The <code>type</code> property of the connector defines its segment type. The <code>shape</code> property specifies the shapes for the source, target, and segment decorators. You can adjust the size of the source and target decorators by setting their
          <code>width</code>and <code>height</code>. Additionally, the<code>segmentThumbSize</code>property allows you to modify the size of the segment decorator when the connector is selected.
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
  sourceDecorator: boolean,
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
    if (sourceDecorator) {
      diagramInstance.connectors[i].sourceDecorator = {
        style: {
          strokeColor: diagramInstance.connectors[i].style.strokeColor,
          fill: diagramInstance.connectors[i].style.strokeColor,
          strokeWidth: 2
        },
        shape: "Circle"
      };
      (sourceDecoratorDropDown as any).value='Circle';
    } else {
      diagramInstance.connectors[i].sourceDecorator = { shape: "None" };
      (sourceDecoratorDropDown as any).value='None';
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
    (targetDecoratorDropDown as any).value='Arrow';
    diagramInstance.dataBind();
    diagramInstance.updateSelector();
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
    (targetDecoratorDropDown as any).value='Arrow';
  }
  target.classList.add("e-selected-style");
}

//Change Source decorator shape
function sourceDecoratorShapeChange(args:any)
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
//Change target decorator shape
function targetDecoratorShapeChange(args:any)
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
//Change segment decorator shape
function segmentDecoratorShapeChange(args:any)
{
    for (let i = 0; i < diagramInstance.connectors.length; i++) {
      diagramInstance.segmentThumbShape = args.itemData.shape;  
    } 
    diagramInstance.dataBind();  
}
//Change Source decorator size
function sourceDecoratorSizeChange(args: any) {
  for (let i = 0; i < diagramInstance.connectors.length; i++) {
      diagramInstance.connectors[i].sourceDecorator.width = args.value;
      diagramInstance.connectors[i].sourceDecorator.height = args.value;
  }
  diagramInstance.dataBind();
}
//Change target decorator size
function targetDecoratorSizeChange(args: any) {
  for (let i = 0; i < diagramInstance.connectors.length; i++) {
      diagramInstance.connectors[i].targetDecorator.width = args.value;
      diagramInstance.connectors[i].targetDecorator.height = args.value;
  }
  diagramInstance.dataBind();
}
//Change segment decorator size
function segmentDecoratorSizeChange(args: any) {
  let connector = diagramInstance.selectedItems.connectors[0];
  diagramInstance.segmentThumbSize = args.value;
  diagramInstance.clearSelection();
  diagramInstance.select([diagramInstance.nameTable[connector.id]]);
  diagramInstance.dataBind();
}
