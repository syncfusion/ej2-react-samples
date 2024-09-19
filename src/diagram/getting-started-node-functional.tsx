// Importing necessary modules from React, ReactDOM, and Syncfusion Diagram library
import * as ReactDOM from "react-dom";
import * as React from "react";
import {
  DiagramComponent,
  Diagram,
  Inject,
  NodeModel,
  UndoRedo,
  ConnectorModel,
  PointModel,
  NodeConstraints,
  ConnectorConstraints,
  SnapConstraints,
  GradientType,
  ShadowModel,
  GradientModel,
  LinearGradientModel,
  RadialGradientModel,
  ISelectionChangeEventArgs
} from "@syncfusion/ej2-react-diagrams";
import { updateSampleSection } from "../common/sample-base";
import { Point } from "@syncfusion/ej2-diagrams/src/diagram/primitives/point";
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import {
  CheckBox,
  ChangeEventArgs as CheckBoxChangeEventArgs
} from "@syncfusion/ej2-react-buttons";

//Initializes the nodes for the diagram
let sdlc: SdlcNodeModel[] = [
  { id: "sdlc", addInfo : {text: "SDLC"}},
  { id: "analysis", addInfo :{text: "Analysis"}},
  { id: "design", addInfo :{text: "Design"}},
  { id: "implement", addInfo :{text: "Implement"}},
  { id: "deploy",  addInfo :{text: "Deploy"}},
  { id: "support", addInfo :{text: "Support"}},
];

//arranges the nodes in a circular path
let count: number = 5;
let space: number = 80;
let radius: number = (count * 100 + space * count) / (2 * Math.PI);
sdlc[0].offsetX = 300;
sdlc[0].offsetY = 300;
let delta: number = 360 / 5;
let angle: number = 270;
for (let i: number = 1; i < 6; i++) {
  let offset: PointModel = Point.transform({ x: 300, y: 300 }, angle, radius);
  sdlc[i].offsetX = offset.x;
  sdlc[i].offsetY = offset.y;
  angle += delta;
}

//Initializes the connector for the diagram
let connections: ConnectorModel[] = [];

for (let i: number = 1; i < 6; i++) {
  connections.push({ sourceID: sdlc[i].id, targetID: sdlc[(i % 5) + 1].id });
}

// CSS styles for the sample
const SAMPLE_CSS = `.image-pattern-style {
        background-color: white;
        background-size: contain;
        background-repeat: no-repeat;
        height: 75px;
        width: calc((100% - 12px) / 3);
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

    .e-selected-style {
        border-color: #006CE6;
        border-width: 2px;
    }

    .e-checkbox-wrapper .e-label {
        font-size: 12px;
    }`;

// Variables for diagram instance, nodes, and components
let diagramInstance: DiagramComponent;
let node: NodeModel;
let aspectRatioInstance : CheckBoxComponent;
let appearanceInstance : HTMLElement;
// Interface for additional node properties
interface SdlcNodeModel extends NodeModel {
  addInfo : object;
}
// Functional component for rendering the diagram and properties panel
function GettingStartedNodes() {
  // useEffect hook to call updateSampleSection and rendereComplete functions on component mount
  React.useEffect(() => {
    updateSampleSection();
    rendereComplete();
  }, []);
  // Function to handle completion of rendering
  function rendereComplete() {
    diagramInstance.fitToPage();

    //Click event for Appearance of the Property Panel
    appearanceInstance.onclick = (args: MouseEvent) => {
      let target: HTMLElement = args.target as HTMLElement;

      let selectedElement: HTMLCollection = document.getElementsByClassName(
        "e-selected-style"
      );
      if (selectedElement.length) {
        selectedElement[0].classList.remove("e-selected-style");
      }
      if (target.className === "image-pattern-style") {
        for (let i: number = 0; i < diagramInstance.nodes.length; i++) {
          node = diagramInstance.nodes[i];
          switch (target.id) {
            case "preview0":
              applyStyle(
                node,
                0,
                undefined,
                ~NodeConstraints.Shadow,
                undefined,
                undefined,
                target
              );
              break;
            case "preview1":
              applyStyle(
                node,
                2,
                undefined,
                ~NodeConstraints.Shadow,
                undefined,
                undefined,
                target
              );
              break;
            case "preview2":
              applyStyle(
                node,
                2,
                "5 5",
                ~NodeConstraints.Shadow,
                undefined,
                undefined,
                target
              );
              break;
            case "preview3":
              applyStyle(
                node,
                2,
                "5 5",
                ~NodeConstraints.Shadow,
                "Radial",
                undefined,
                target
              );
              break;
            case "preview4":
              let shadow: ShadowModel = {
                angle: 45,
                distance: 15,
                opacity: 0.3,
                color: "grey"
              };
              applyStyle(
                node,
                2,
                "5 5",
                NodeConstraints.Shadow,
                undefined,
                shadow,
                target
              );
              break;
          }
        }
      }
    };
  }
  //Function to apply  customStyle for Node.
  function applyStyle( //it is in dedicated line here.
    node: NodeModel,
    width: number,
    array: string,
    con: NodeConstraints,
    type: GradientType,
    sh: ShadowModel,
    target: HTMLElement
  ): void {
    node.style.fill = "#37909A";
    node.style.strokeWidth = width;
    node.style.strokeColor = "#024249";
    node.style.strokeDashArray = array;
    if (!type) {
      node.style.gradient.type = "None";
    } else {
      let gradient: GradientModel | LinearGradientModel | RadialGradientModel;
      gradient = {
        cx: 50,
        cy: 50,
        fx: 50,
        fy: 50,
        stops: [
          { color: "#00555b", offset: 0 },
          { color: "#37909A", offset: 90 }
        ],
        type: "Radial"
      };
      node.style.gradient = gradient;
    }
    if (con & NodeConstraints.Shadow) {
      node.shadow = { angle: 45, distance: 15, opacity: 0.3, color: "grey" };
      node.constraints |= con;
    } else {
      node.constraints &= con;
    }
    diagramInstance.dataBind();
    target.classList.add("e-selected-style");
  }
  
  //Enable or disable the Aspect Ratio Constraints for Node.
  function setNodeAspectConstraints(args: CheckBoxChangeEventArgs): void {
    for (let i: number = 0; i < diagramInstance.nodes.length; i++) {
      let node: NodeModel = diagramInstance.nodes[i];
      if ( args.checked) {
        node.constraints |= NodeConstraints.AspectRatio;
      } else {
        node.constraints &= ~NodeConstraints.AspectRatio;
      }
      diagramInstance.dataBind();
    }
  }
  //Enable or disable the Lock Constraints for Node.
  function setLockConstraints(args: CheckBoxChangeEventArgs): void {
    for (let i: number = 0; i < diagramInstance.nodes.length; i++) {
      let node: NodeModel = diagramInstance.nodes[i];
      if (args.checked) {
        node.constraints &= ~(NodeConstraints.Resize | NodeConstraints.Rotate | NodeConstraints.Drag | NodeConstraints.Delete);
        node.constraints |= NodeConstraints.ReadOnly;
      } else {
        node.constraints |= NodeConstraints.Default & ~(NodeConstraints.ReadOnly);
      }
    }
    diagramInstance.dataBind();
    for (let i: number = 0; i < diagramInstance.connectors.length; i++) {
      let connector = diagramInstance.connectors[i];
        if (args.checked) {
          connector.constraints &= ~(ConnectorConstraints.DragSourceEnd | ConnectorConstraints.DragTargetEnd | ConnectorConstraints.Drag | ConnectorConstraints.Delete);
          connector.constraints |= ConnectorConstraints.ReadOnly;
        } else {
          connector.constraints |= ConnectorConstraints.Default & ~ConnectorConstraints.ReadOnly;
        }
      } 
    diagramInstance.dataBind();
    
}
   // Return the JSX structure for the component
  return (
    <div className="control-pane">
      <style>{SAMPLE_CSS}</style>
      <div className="col-lg-8 control-section">
        <div className="content-wrapper" style={{ width: "100%" }}>
          <DiagramComponent
            id="diagram"
            ref={diagram => (diagramInstance = diagram)}
            width={"100%"}
            height={"645px"}
            nodes={sdlc}
            connectors={connections}
            getNodeDefaults={(obj: NodeModel) => {
              //Sets the default values of a node
              
              obj.width = 100;
              obj.height = 100;
              obj.shape = { type: "Basic", shape: "Ellipse" };
              obj.style = { fill: "#37909A", strokeColor: "#024249" };
              obj.annotations = [
                {
                  content: ((obj as SdlcNodeModel).addInfo as any).text,
                  margin: { left: 10, right: 10 },
                  style: {
                    color: "white",
                    fill: "none",
                    strokeColor: "none",
                    bold: true
                  }
                }
              ];
              return obj;
            
            }}
            getConnectorDefaults={(obj: ConnectorModel) => {
              //Sets the default values of a Connector
              obj.targetDecorator.style = {
                fill: "#024249",
                strokeColor: "#024249"
              };
              return { style: { strokeColor: "#024249", strokeWidth: 2 } };
            }}
            snapSettings={{ constraints: SnapConstraints.None }}
            selectionChange={(args:ISelectionChangeEventArgs) =>{
              if (args.state === 'Changed'){
              if (diagramInstance.selectedItems.nodes.length > 1 || diagramInstance.selectedItems.connectors.length > 0) {
                aspectRatioInstance.disabled = true;
              }
              else {
                aspectRatioInstance.disabled = false;
              }
            }
          }}
          >
            <Inject services={[UndoRedo]} />
          </DiagramComponent>
        </div>
      </div>
      <div
        className="col-lg-4 property-section"
      >
        <div className="property-panel-header">Properties</div>
        <div className="row property-panel-content" id="appearance" ref={appearance => (appearanceInstance = appearance)}>
          <div className="row row-header" style={{ paddingTop: "8px" }}>
            Appearance
          </div>
          <div className="row" style={{ paddingTop: "3px" }}>
            <div
              className="image-pattern-style"
              id="preview0"
              style={{
                backgroundImage: "url('src/diagram/Images/node/Nodes_1.png')",
                marginRight: "3px"
              }}
            />
            <div
              className="image-pattern-style"
              id="preview1"
              style={{
                backgroundImage: "url('src/diagram/Images/node/Nodes_2.png')",
                marginRight: "0px 3px"
              }}
            />
            <div
              className="image-pattern-style"
              id="preview2"
              style={{
                backgroundImage: "url('src/diagram/Images/node/Nodes_3.png')",
                margin: "0px 3px"
              }}
            />
          </div>
          <div className="row" style={{ paddingTop: "3px" }}>
            <div
              className="image-pattern-style"
              id="preview3"
              style={{
                backgroundImage: "url('src/diagram/Images/node/Nodes_4.png')",
                marginRight: "3px"
              }}
            />
            <div
              className="image-pattern-style"
              id="preview4"
              style={{
                backgroundImage: "url('src/diagram/Images/node/Nodes_5.png')",
                margin: "3px"
              }}
            />
          </div>
        </div>
        <div className="row property-panel-content" style={{ paddingTop: "10px" }}>
          <div className="row row-header">Behavior</div>
          <div className="row" style={{ paddingTop: "8px" }}>
            {/* Enable or disable the AspectRatio for Node. */}
            <CheckBoxComponent
              checked={false}
              label="Aspect ratio"
              id="aspectRatio"
              ref={aspectRatio => (aspectRatioInstance = aspectRatio)}
              change={setNodeAspectConstraints}
            />
          </div>
          <div className="row" style={{ paddingTop: "8px" }}>
            {/* Enable or disable the Interaction for Node. */}
            <CheckBoxComponent
              checked={false}
              label="Lock"
              id="lock"
              change={setLockConstraints}
            />
          </div>
        </div>
      </div>
      <div id="action-description">
        <p>
          This sample visualizes the different stages of a software
          development life cycle using a circular flow diagram. Customizing
          the appearance of the nodes is illustrated in this example.
        </p>
      </div>
      <div id="description">
        <p>
          This example shows how to add nodes to a diagram control and how to
          customize the appearance of the nodes. The
          <code>style</code> property of the node can be used to customize the
          appearance of the nodes.
        </p>

        <p>
          To change the appearance, click different styles in the property
          panel.
        </p>

        <p>
          Here, you can see how to lock nodes to disable editing and how to
          enable proportional resizing. The
          <code>constraints</code> property of the node allows you to
          enable/disable editing and proportional resizing.
        </p>
        <br />
      </div>
    </div>
  );
}
export default GettingStartedNodes;
