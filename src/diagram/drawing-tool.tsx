import * as ReactDOM from "react-dom";
import * as React from "react";
import {
  DiagramComponent,
  NodeModel,
  BasicShapes,
  SnapSettingsModel,
  SnapConstraints,
  TextModel,
  PathModel,
  ImageModel,
  DiagramTools,
  UndoRedo,
  GridlinesModel,
  Snapping,
  ConnectorModel,
  PointPortModel,
  PortConstraints,
  PortVisibility,
  PointModel,
  BasicShape,
  Inject,
  ConnectorEditing
} from "@syncfusion/ej2-react-diagrams";
import { SampleBase } from "../common/sample-base";
import {
  CheckBoxComponent,
  ChangeEventArgs
} from "@syncfusion/ej2-react-buttons";


let node: NodeModel;
let diagramInstance: DiagramComponent;
let appearanceInstance: HTMLElement;
let checkedInstance: CheckBoxComponent;
let interval: number[]=[
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
let snapSettings: SnapSettingsModel = {
  snapObjectDistance: 5,
  constraints:
    SnapConstraints.SnapToObject |
    SnapConstraints.SnapToLines |
    SnapConstraints.ShowLines,
  horizontalGridlines: gridlines,
  verticalGridlines: gridlines
};
const SAMPLE_CSS = `
/* For changing drawing shapes in property panel */
.diagram-drawingTool .image-pattern-style {
        background-color: white;
        background-size: contain;
        background-repeat: no-repeat;
        height: 45px;
        width: calc((100% - 12px) / 3);
        cursor: pointer;
        border: 1px solid #D5D5D5;
        background-position: center;
        float: left;
    }

    .diagram-drawingTool .image-pattern-style:hover {
        border-color: gray;
        border-width: 2px;
    }

    .diagram-drawingTool .row {
        margin-left: 0px;
        margin-right: 0px;
    }

    .diagram-drawingTool .row-header {
        font-size: 12px;
        font-weight: 500;
    }

    .diagram-drawingTool .e-checkbox-wrapper .e-label {
        font-size: 12px;
    }

    .diagram-drawingTool .property-panel-header {
        padding-top: 15px;
        padding-bottom: 5px
    }

    .diagram-drawingTool .e-selected-style {
        border-color: #006CE6;
        border-width: 2px;
    }

    .diagram-drawingTool .control-section {
        padding-top: 0px;
        padding-bottom: 0px;
        padding-right: 0px;
    }

`;

export class DrawingTools extends SampleBase<{}, {}> {
  rendereComplete() {
     // Default shape on load
    SetShape("Rectangle");
    diagramInstance.tool = DiagramTools.ContinuousDraw;
    diagramInstance.dataBind();
    //Click Event used to decide the drawing object.
    appearanceInstance.onclick = (args: MouseEvent) => {
      let target: HTMLElement = args.target as HTMLElement;
      let selectedElement: HTMLCollection = document.getElementsByClassName(
        "e-selected-style"
      );
      if (
        selectedElement.length &&
        target.id !== "" &&
        target.id !== "checked"
      ) {
        selectedElement[0].classList.remove("e-selected-style");
      }
      if (!target.classList.contains("e-selected-style")) {
        target.classList.add("e-selected-style");
      }
      if (target.className === "image-pattern-style e-selected-style") {
        switch (target.id) {
          case "shape1":
            SetShape("Rectangle");
            break;
          case "shape2":
            SetShape("Ellipse");
            break;
          case "shape3":
            SetShape("Hexagon");
            break;
          case "shape4":
            SetShape("Pentagon");
            break;
          case "shape5":
            SetShape("Triangle");
            break;
          case "straight":
            setdrawobject(null, { type: "Straight" });
            break;
          case "ortho":
            setdrawobject(null, { type: "Orthogonal" });
            break;
          case "cubic":
            setdrawobject(null, { type: "Bezier" });
            break;
          case "freehand":
            setdrawobject(null, { type: "Freehand" });
            break;
          case "path":
            getPathShape();
            target.classList.add("e-selected-style");
            break;
          case "image":
            getImageNode();
            break;
          case "svg":
            getSVGNode();
            break;
          case "text":
            getTextNode();
            break;
          default:
            if (
              selectedElement.length &&
              target.id !== "" &&
              target.id !== "checked"
            ) {
              selectedElement[0].classList.remove("e-selected-style");
            }
        }
      }
    };
  }
  render() {
    return (
      <div className="diagram-drawingTool">
      <div className="control-pane diagram-control-pane">
        <style>{SAMPLE_CSS}</style>
        <div className="col-lg-8 control-section">
          <div className="content-wrapper" style={{ width: "100%" }}>
            <DiagramComponent
              id="diagram"
              ref={diagram => (diagramInstance = diagram)}
              width={"100%"}
              height={"540px"}
              snapSettings={snapSettings}
              rulerSettings={{ showRulers: true }}
              //Sets the default values of a node
              getNodeDefaults={(node: NodeModel) => {
                let obj: NodeModel = node;
                let basicShape: BasicShape = node.shape as BasicShape;
                if (
                  basicShape.shape === "Rectangle" ||
                  basicShape.shape === "Ellipse"
                ) {
                  obj.ports = getPorts(node);
                } else if (basicShape.shape === "Hexagon") {
                  obj.ports = getHexagonPorts(node);
                } else if (basicShape.shape === "Pentagon") {
                  obj.ports = getPentagonPorts(node);
                } else if (basicShape.type === "Path") {
                  obj.ports = getPathPorts(node);
                }
              }}
            />
            <Inject services={[UndoRedo, Snapping,ConnectorEditing]} />
          </div>
        </div>

        <div className="col-lg-4  property-section">
          <div className="property-panel-header">Properties</div>
          <div className="row property-panel-content"  id="appearance" ref={appearance=>(appearanceInstance=appearance)}>
            <div className="row row-header" style={{ paddingTop: "10px" }}>
              Shapes
            </div>
            <div className="row" style={{ paddingTop: "8px" }}>
              <div
                title="Retangle"
                className="image-pattern-style e-selected-style"
                id="shape1"
                style={{
                  backgroundImage:
                    "url('src/diagram/Images/drawingTool/basicshape/DrawingTool_1.png')",
                  marginRight: "3px"
                }}
              />
              <div
                title="Ellipse"
                className="image-pattern-style"
                id="shape2"
                style={{
                  backgroundImage:
                    "url('src/diagram/Images/drawingTool/basicshape/DrawingTool_2.png')",
                  margin: "0px 3px"
                }}
              />
              <div
                title="Hexagon"
                className="image-pattern-style"
                id="shape3"
                style={{
                  backgroundImage:
                    "url('src/diagram/Images/drawingTool/basicshape/DrawingTool_3.png')"
                }}
              />
            </div>
            <div className="row" style={{ paddingTop: "8px" }}>
              <div
                title="Pentagon"
                className="image-pattern-style"
                id="shape4"
                style={{
                  backgroundImage:
                    "url('src/diagram/Images/drawingTool/basicshape/DrawingTool_4.png')",
                  marginRight: "3px"
                }}
              />
              <div
                title="Triangle"
                className="image-pattern-style"
                id="shape5"
                style={{
                  backgroundImage:
                    "url('src/diagram/Images/drawingTool/basicshape/DrawingTool_5.png')",
                  margin: "0px 3px"
                }}
              />
              <div
                title="Path"
                className="image-pattern-style"
                id="path"
                style={{
                  backgroundImage:
                    "url('src/diagram/Images/drawingTool/DrawingTool_6.png')"
                }}
              />
            </div>
            <div className="row" style={{ paddingTop: "8px" }}>
              <div
                title="Image"
                className="image-pattern-style"
                id="image"
                style={{
                  backgroundImage:
                    "url('src/diagram/Images/drawingTool/DrawingTool_7.png')",
                  marginRight: "3px"
                }}
              />
              <div
                title="SVG"
                className="image-pattern-style"
                id="svg"
                style={{
                  backgroundImage:
                    "url('src/diagram/Images/drawingTool/DrawingTool_8.png')",
                  marginRight: "3px"
                }}
              />
              <div
                title="Text"
                className="image-pattern-style"
                id="text"
                style={{
                  backgroundImage:
                    "url('src/diagram/Images/drawingTool/DrawingTool_9.png')",
                  marginRight: "3px"
                }}
              />
            </div>
            <div className="row row-header" style={{ paddingTop: "10px" }}>
              Connector
            </div>
            <div className="row" style={{ paddingTop: "8px" }}>
              <div
                className="image-pattern-style"
                id="straight"
                style={{
                  backgroundImage:
                    "url('src/diagram/Images/drawingTool/connector/Connectors_1.png')",
                  marginRight: "3px"
                }}
              />
              <div
                className="image-pattern-style"
                id="ortho"
                style={{
                  backgroundImage:
                    "url('src/diagram/Images/drawingTool/connector/Connectors_2.png')",
                  margin: "0px 3px"
                }}
              />
              <div
                className="image-pattern-style"
                id="cubic"
                style={{
                  backgroundImage:
                    "url('src/diagram/Images/drawingTool/connector/Connectors_3.png')"
                }}
              />
            </div>
            <div className="row" style={{ paddingTop: "8px" }}>
              <div
                  className="image-pattern-style"
                  id="freehand"
                  style={{
                    backgroundImage:
                      "url('src/diagram/Images/connector/freehand.png')"
                  }}
                />
          </div>
            <div className="row property-panel-content" style={{ paddingTop: "10px" }}>
              <CheckBoxComponent
                 id="checked" ref={checked=>(checkedInstance=checked)} 
                label="Continuous Draw"
                checked={true}
                change={onChange}
              />
            </div>
          </div>
        </div>

        <div id="action-description">
          <p>
            This sample visualizes how to build a diagram interactively using
            drawing tools. Continuous draw option, snapping, and undo/redo
            support are enabled to easily draw diagrams. Rulers, gridlines, and
            snapping options are enabled to easily align objects.
          </p>
        </div>
        <div id="description">
          <p>
            This example shows how to draw shapes and connections interactively.
            In addition to that, rulers, gridlines, and snapping options are
            enabled to assist drawing. The <code>tool</code> property can be
            used to enable drawing. Add <code>DrawOnce</code> or{" "}
            <code>ContinousDraw</code> option to the
            <code>tool</code> property of the diagram. The{" "}
            <code>drawingObject</code> property can be used to define a
            shape/connector to be drawn.
          </p>

          <p>
            Few shape and connector templates are added in the palette. To draw
            basic shapes and connectors, click the templates in the palette. For
            polygon shapes, a corner/point will be added to the polygon for each
            mouse left button click. Drawing will be completed either on mouse
            right button click or double click.
          </p>

          <p style={{ fontWeight: 500 }}>Injecting Module</p>
          <p>
            The diagram component’s features are segregated into individual
            feature-wise modules. To enable undo and redo support, inject{" "}
            <code>UndoRedo</code> module into <code>services</code>.
          </p>
          <br />
        </div>
      </div>
      </div>
    );
  }
}

function onChange(args: ChangeEventArgs): void {
  diagramInstance.tool = args.checked
    ? DiagramTools.ContinuousDraw
    : DiagramTools.DrawOnce;
}

//Enable drawing object.
function setdrawobject(node: NodeModel, connector: ConnectorModel): void {
  if (!checkedInstance.checked) {
    diagramInstance.tool = DiagramTools.DrawOnce;
  }
  if (connector == null) {
    diagramInstance.drawingObject = node;
  } else {
    diagramInstance.drawingObject = connector;
  }
  diagramInstance.dataBind();
}
//Enable drawing Tool.
function enableTool(): void {
  if (!checkedInstance.checked) {
    diagramInstance.tool = DiagramTools.DrawOnce;
  }
  diagramInstance.dataBind();
}

//Set the Shape of the drawing Object.
function SetShape(obj: string): void {
  let drawingshape:
    | NodeModel
    | PathModel
    | ImageModel
    | TextModel
    | ConnectorModel
    | BasicShapes;
  drawingshape = { type: "Basic", shape: obj } as NodeModel;
  node = {
    shape: drawingshape as NodeModel
  };
  diagramInstance.drawingObject = node;
  enableTool();
}
//Set TextNode Shape.
function getTextNode(): void {
  let drawingshape:
    | NodeModel
    | PathModel
    | ImageModel
    | TextModel
    | ConnectorModel;
  drawingshape = { type: "Text" };
  node = {
    shape: drawingshape
  };
  setdrawobject(node, null);
}
//Set SVG Node
function getSVGNode(): void {
  // tslint:disable-next-line:max-line-length
  let drawingshape:
    | NodeModel
    | PathModel
    | ImageModel
    | TextModel
    | ConnectorModel;
  drawingshape = {
    type: "Native",
    content: getPath()
  };
  node = {
    shape: drawingshape
  };
  setdrawobject(node, null);
}

function getPath(): string {
  let str: string =
    '<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="350.000000pt" ' +
    'height="229.000000pt" viewBox="0 0 350.000000 229.000000" ' +
    'preserveAspectRatio="xMidYMid meet"> <metadata>' +
    " Created by potrace 1.11, written by Peter Selinger 2001-2013" +
    ' </metadata> <g transform="translate(0.000000,229.000000) scale(0.100000,-0.100000)"' +
    ' fill="#de6ca9" stroke="none"><path d="M0 1145 l0 -1145 1750 0 1750 0 0 1145 0 1145' +
    " -1750 0 -1750 0 0 -1145z m1434 186 c19 -8 26 -18 26 -37 0 -24 -3 -26" +
    " -27 -19 -16 3 -58 9 -94 12 -63 5 -67 4 -88 -23 -23 -29 -21 -60 6 -81 8" +
    " -6 47 -19 86 -29 55 -13 80 -25 106 -51 31 -31 33 -37 29 -88 -8 -94 -69" +
    " -133 -193 -122 -90 7 -115 20 -115 58 0 26 3 30 18 24 91 -38 168 -41 204" +
    " -8 23 21 23 75 1 96 -10 8 -49 23 -88 33 -88 22 -135 63 -135 118 0 92 67 140" +
    " 181 131 31 -2 68 -9 83 -14z m854 -6 c38 -15 42 -21 42 -51 l0 -33 -47 25" +
    " c-41 22 -58 25 -115 22 -58 -3 -72 -8 -97 -32 -79 -75 -59 -259 32 -297 35" +
    " -15 106 -18 150 -6 26 7 27 10 27 67 l0 60 -50 0 c-47 0 -50 2 -50 25 0 25" +
    " 1 25 80 25 l81 0 -3 -97 -3 -98 -40 -20 c-22 -10 -65 -21 -95 -23 -153 -11" +
    " -242 74 -243 230 0 145 93 235 233 224 30 -2 74 -12 98 -21z m-638 -169 l67" +
    " -178 40 103 c22 57 53 139 69 182 28 75 29 77 62 77 19 0 32 -4 30 -9 -1 -5" +
    " -39 -104 -83 -220 l-80 -211 -37 0 c-35 0 -37 2 -56 53 -11 28 -48 124 -81 " +
    '211 -34 87 -61 163 -61 168 0 5 14 8 32 6 31 -3 32 -5 98 -182z" />' +
    "</g> </svg>";
  return str;
}
function getImageNode(): void {
  let drawingshape:
    | NodeModel
    | PathModel
    | ImageModel
    | TextModel
    | ConnectorModel;
  drawingshape = { type: "Image", source: "./src/diagram/employee.png" };
  node = {
    shape: drawingshape
  };
  setdrawobject(node, null);
}
function getPathShape(): void {
  // tslint:disable-next-line:max-line-length
  let drawingshape:
    | NodeModel
    | PathModel
    | ImageModel
    | TextModel
    | ConnectorModel;
  drawingshape = {
    type: "Path",
    data:
      "M540.3643,137.9336L546.7973,159.7016L570.3633,159.7296L550.7723,171.9366L558.9053,194.9966L540.3643,179.4996L521.8223,194.9966L529.9553,171.9366L510.3633,159.7296L533.9313,159.7016L540.3643,137.9336z"
  };
  node = {
    shape: drawingshape
  };
  setdrawobject(node, null);
}
function getPorts(obj: NodeModel): PointPortModel[] {
  let ports: PointPortModel[] = [
    createPort("port1", { x: 0, y: 0.5 }),
    createPort("port2", { x: 0.5, y: 1 }),
    createPort("port3", { x: 1, y: 0.5 }),
    createPort("port4", { x: 0.5, y: 0 })
  ];
  return ports;
}
function getPathPorts(obj: NodeModel): PointPortModel[] {
  let ports: PointPortModel[] = [
    createPort("port1", { x: 0.5, y: 0 }),
    createPort("port2", { x: 0, y: 0.39 }),
    createPort("port3", { x: 1, y: 0.39 }),
    createPort("port4", { x: 0.2, y: 1 }),
    createPort("port5", { x: 0.8, y: 1 })
  ];
  return ports;
}
function getHexagonPorts(obj: NodeModel): PointPortModel[] {
  let ports: PointPortModel[] = [
    createPort("port1", { x: 0, y: 0.5 }),
    createPort("port2", { x: 0.5, y: 0 }),
    createPort("port3", { x: 0.3, y: 0 }),
    createPort("port4", { x: 0.7, y: 0 }),
    createPort("port5", { x: 1, y: 0.5 }),
    createPort("port6", { x: 0.5, y: 1 }),
    createPort("port7", { x: 0.3, y: 1 }),
    createPort("port8", { x: 0.7, y: 1 })
  ];
  return ports;
}
function getPentagonPorts(obj: NodeModel): PointPortModel[] {
  let ports: PointPortModel[] = [
    createPort("port1", { x: 0.5, y: 0 }),
    createPort("port2", { x: 0, y: 0.4 }),
    createPort("port3", { x: 1, y: 0.4 }),
    createPort("port4", { x: 0.2, y: 1 }),
    createPort("port5", { x: 0.85, y: 1 })
  ];
  return ports;
}
function createPort(id: string, offset: PointModel): PointPortModel {
  let port: PointPortModel = {
    id: id,
    shape: "Square",
    offset: offset,
    constraints: PortConstraints.Draw,
    visibility: PortVisibility.Hover
  };
  return port;
}
