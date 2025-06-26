import * as ReactDOM from "react-dom";
import * as React from "react";
import {
  ToolBase,
  MoveTool,
  randomId,
  SelectorConstraints,
  cloneObject,
  MouseEventArgs,
  IElement,
  UserHandleModel,
  DiagramComponent,
  NodeModel,
  ConnectorModel,
  Node,
  Diagram,
  Side,
  ISelectionChangeEventArgs,
  SnapConstraints,
  Connector
} from "@syncfusion/ej2-react-diagrams";
import { SampleBase } from "../common/sample-base";

const SAMPLE_CSS = `.diagram-userhandle .image-pattern-style {
        background-color: white;
        background-size: contain;
        background-repeat: no-repeat;
        height: 50px;
        width: calc((100% - 18px) / 3);
        cursor: pointer;
        border: 1px solid #D5D5D5;
        background-position: center;
        float: left;
    }
    .diagram-userhandle .e-remove-selection .property-section-content {
      pointer-events: none;
    }
      .diagram-userhandle .property-section .e-remove-selection {
      cursor: not-allowed;
    }
    .diagram-userhandle .image-pattern-style:hover {
        border-color: gray;
        border-width: 2px;
    }

    .diagram-userhandle .row {
        margin: 10px 0px 0px 0px;
    }

    .diagram-userhandle .e-selected-style {
        border-color: #006CE6;
        border-width: 2px;
    }

    .diagram-userhandle .row-header {
        font-size: 15px;
        font-weight: 500;
        margin-top: 10px
    }

    .diagram-userhandle .property-panel-header {
        padding-top: 2px;
        padding-bottom: 5px;
    }

   .diagram-userhandle .e-checkbox-wrapper .e-label {
        font-size: 12px;
    }

   .diagram-userhandle .container-fluid {
        padding-left: 0px;
    }

   .diagram-userhandle .diagram-control-pane .col-xs-6 {
        padding-left: 0px;
        padding-right: 0px;
        padding-top: 5px;
    }`;

let diagramInstance: Diagram;
let appearanceInstance: any;
let patternInstance: any;

// Define the collection of nodes in the diagram.
let nodes: NodeModel[] = [
  {
    id: "NewIdea",
    width: 150,
    height: 60,
    offsetX: 300,
    offsetY: 60,
    shape: { type: "Flow", shape: "Terminator" },
    annotations: [{ content: "New idea identified" }]
  },
  {
    id: "Meeting",
    width: 150,
    height: 60,
    offsetX: 300,
    offsetY: 155,
    shape: { type: "Flow", shape: "Process" },
    annotations: [{ content: "Meeting with board" }]
  },
  {
    id: "BoardDecision",
    width: 150,
    height: 110,
    offsetX: 300,
    offsetY: 280,
    shape: { type: "Flow", shape: "Decision" },
    annotations: [{ content: "Board decides \n whether to proceed" }]
  },
  {
    id: "Project",
    width: 150,
    height: 100,
    offsetX: 300,
    offsetY: 430,
    shape: { type: "Flow", shape: "Decision" },
    annotations: [{ content: "Find Project manager" }]
  },
  {
    id: "End",
    width: 150,
    height: 60,
    offsetX: 300,
    offsetY: 555,
    shape: { type: "Flow", shape: "Process" },
    annotations: [{ content: "Implement and Deliver" }]
  },
  {
    id: "Decision",
    width: 250,
    height: 60,
    offsetX: 550,
    offsetY: 60,
    shape: { type: "Flow", shape: "Card" },
    annotations: [{ content: "Decision process for new software ideas" }],
    fixedUserHandles: [{ padding: { left: 2, right: 2, top: 2, bottom: 2 }, offset:{x:1.1,y:0.5}, width: 20, height: 20,}]
  },
  {
    id: "Reject",
    width: 150,
    height: 60,
    offsetX: 550,
    offsetY: 280,
    shape: { type: "Flow", shape: "Process" },
    annotations: [{ content: "Reject" }]
  },
  {
    id: "Resources",
    width: 150,
    height: 60,
    offsetX: 550,
    offsetY: 430,
    shape: { type: "Flow", shape: "Process" },
    annotations: [{ content: "Hire new resources" }]
  }
];

// Define the collection of connectors in the diagram.
let connectors: ConnectorModel[] = [
  {
    id: "connector1",
    type: "Straight",
    sourceID: "NewIdea",
    targetID: "Meeting"
  },
  {
    id: "connector2",
    type: "Straight",
    sourceID: "Meeting",
    targetID: "BoardDecision"
  },
  {
    id: "connector3",
    type: "Straight",
    sourceID: "BoardDecision",
    targetID: "Project"
  },
  { id: "connector4", type: "Straight", sourceID: "Project", targetID: "End" },
  {
    id: "connector5",
    type: "Straight",
    sourceID: "BoardDecision",
    targetID: "Reject"
  },
  {
    id: "connector6",
    type: "Straight",
    sourceID: "Project",
    targetID: "Resources"
  }
];

// Define the collection of user handles for nodes in the diagram.
let handles: UserHandleModel[] = [
  {
    name: "clone",
    pathData:
      "M60.3,18H27.5c-3,0-5.5,2.4-5.5,5.5v38.2h5.5V23.5h32.7V18z M68.5,28.9h-30c-3," +
      "0-5.5,2.4-5.5,5.5v38.2c0,3,2.4,5.5,5.5,5.5h30c3,0,5.5-2.4,5.5-5.5V34.4C73.9,31.4,71.5,28.9,68.5,28.9z " +
      "M68.5,72.5h-30V34.4h30V72.5z",
    visible: true,
    offset: 0,
    side: "Bottom",
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
    pathColor: "white"
  }
];

export class UserHandle extends SampleBase<{}, {}> {
  rendereComplete() {
    diagramInstance.fitToPage();
    diagramInstance.select([diagramInstance.nodes[0]]);
    appearanceInstance.onclick = (args: MouseEvent) => {
      let target: HTMLElement = args.target as HTMLElement;
      let selectedElement: HTMLCollection = document.getElementsByClassName(
        "e-selected-style"
      );
      if (selectedElement.length) {
        selectedElement[0].classList.remove("e-selected-style");
      }
      if (target.className === "image-pattern-style") {
        switch (target.id) {
          case "left":
            setUserHandlePosition(0, "Bottom", target);
            break;
          case "right":
            setUserHandlePosition(1, "Bottom", target);
            break;
          case "topr":
            setUserHandlePosition(0, "Right", target);
            break;
        }
      }
      diagramInstance.dataBind();
    };
    patternInstance.onclick = (args: MouseEvent) => {
      let target: HTMLElement = args.target as HTMLElement;
      let selectedElement: HTMLCollection = document.getElementsByClassName(
        "e-selected-style"
      );
      if (selectedElement.length) {
        selectedElement[0].classList.remove("e-selected-style");
      }
      if (target.className === "image-pattern-style") {
        switch (target.id) {
          case "pattern1":
            applyUserHandleStyle("#1E90FF", target);
            break;
          case "pattern2":
            applyUserHandleStyle("#3CB371", target);
            break;
          case "pattern3":
            applyUserHandleStyle("#FF6347", target);
            break;
        }
      }
      diagramInstance.dataBind();
    };
  }
  render() {
    return (
      <div className="control-pane ">
        <style>{SAMPLE_CSS}</style>
        <div
          className="col-lg-8 control-section"
        >
          <div  style={{ width: "100%" }}>
            <DiagramComponent
              id="diagram"
              ref={diagram => (diagramInstance = diagram)}
              width={"100%"}
              height={"600px"}
              nodes={nodes}
              connectors={connectors}
              selectedItems={{
                constraints: SelectorConstraints.UserHandle,
                userHandles: handles
              }}
              snapSettings={{ constraints: SnapConstraints.None }}
              //set Node default value
              getNodeDefaults={(node: Node) => {
                return {
                  style: { fill: "#578CA9", strokeColor: "none" },
                  annotations: [{ style: { color: "white" } }]
                };
              }}
              fixedUserHandleTemplate={fixedUserHandleTemplate.bind(this)}
              fixedUserHandleClick={()=>{
              diagramInstance.select([diagramInstance.nameTable['Decision']]);
              diagramInstance.remove();
              }}
              //set CustomTool
              getCustomTool={getTool}
              // Enable or disable the property panel based on the selection.
              selectionChange={(arg: ISelectionChangeEventArgs) => {
                let propertyAppearance: HTMLElement = document.getElementById("propertypanel");
                let getSelectedElement: HTMLCollection = document.getElementsByClassName(
                  "e-remove-selection"
                );
                if (arg.newValue) {
                  // Check if the item in newValue is either a Node or Connector
                  if ((arg.newValue[0] instanceof Node) || (arg.newValue[0] instanceof Connector)) {
                    if(getSelectedElement.length > 0) {
                      getSelectedElement[0].classList.remove("e-remove-selection");
                   }
                  } else {
                    if (!propertyAppearance.classList.contains("e-remove-selection")) {
                      propertyAppearance.classList.add("e-remove-selection");
                    }
                  }
                } 
              }}
            >
            </DiagramComponent>
          </div>
        </div>
          <div
            className="col-lg-4 property-section diagram-userhandle"
          >
             <div id="propertypanel" className="e-remove-selection">
             <div className="property-section-content">
            <div className="property-panel-header">Properties</div>
            <div className="row property-panel-content" id="appearance" ref={(appearance) => (appearanceInstance = appearance)}>
              <div className="row row-header">Alignment</div>
              <div className="row" style={{ paddingTop: "8px" }}>
                <div
                  className="image-pattern-style e-selected-style"
                  id="left"
                  style={{
                    backgroundImage:
                      "url('src/diagram/Images/user-handle/bottoml.png')",
                    marginRight: "4px"
                  }}
                />
                <div
                  className="image-pattern-style"
                  id="right"
                  style={{
                    backgroundImage:
                      "url('src/diagram/Images/user-handle/bottomr.png')",
                    margin: "0px 4px"
                  }}
                />
                <div
                  className="image-pattern-style"
                  id="topr"
                  style={{
                    backgroundImage:
                      "url('src/diagram/Images/user-handle/topr.png')"
                  }}
                />
              </div>
            </div>
            <div className="row property-panel-content" id="pattern" ref={(pattern) => (patternInstance = pattern)}>
              <div className="row row-header">Appearance</div>
              <div className="row" style={{ paddingTop: "8px" }}>
                <div
                  className="image-pattern-style"
                  id="pattern1"
                  style={{
                    backgroundImage:
                      "url('src/diagram/Images/user-handle/pattern1.png')",
                    marginRight: "4px"
                  }}
                />
                <div
                  className="image-pattern-style"
                  id="pattern2"
                  style={{
                    backgroundImage:
                      "url('src/diagram/Images/user-handle/pattern2.png')",
                    margin: "0px 4px"
                  }}
                />
                <div
                  className="image-pattern-style"
                  id="pattern3"
                  style={{
                    backgroundImage:
                      "url('src/diagram/Images/user-handle/pattern3.png')"
                  }}
                />
              </div>
            </div>
            </div>
          </div>
        </div>
        <div id="action-description">
          <p>
            This sample visualizes a simple flow diagram along with options to
            execute the frequently used commands using user handles.
          </p>
        </div>
        <div id="description">
          <p>
            User handles are icons that are placed around the node to run the
            frequently used commands. This example shows how to render and
            configure user handles and how to interact with the diagram using user handles. The <code>userHandles</code> property of the <code>selectedItems</code> can be used to add user handles to the diagram.<code> fixedUserHandleTemplate</code> property of the diagram provides template support for customizing fixed user handles and we provide the HTML  button to delete the node.Click the templates in the property
            panel, to customize the size, position, and appearance of the user handles.
          </p>
          <br />
        </div>
      </div>
    );
  }
}
// Define the clone tool for copying Nodes/Connectors.
class CloneTool extends MoveTool {
  public mouseDown(args: MouseEventArgs): void {
    let newObject: any;
    if (diagramInstance.selectedItems.nodes.length > 0) {
      newObject = cloneObject(
        diagramInstance.selectedItems.nodes[0]
      ) as NodeModel;
    } else {
      newObject = cloneObject(
        diagramInstance.selectedItems.connectors[0]
      ) as ConnectorModel;
    }
    newObject.id += randomId();
    diagramInstance.paste([newObject]);
    if(diagramInstance.selectedItems.connectors.length > 0)
      {
        args.source = diagramInstance.connectors[
          diagramInstance.connectors.length - 1
        ] as IElement;
      }
    else{
      args.source = diagramInstance.nodes[
        diagramInstance.nodes.length - 1
      ] as IElement;
    }
    args.sourceWrapper = args.source.wrapper;
    super.mouseDown(args);
    this.inAction = true;
  }
}

// Enable the clone tool for UserHandle.
function getTool(action: string): ToolBase {
  let tool: ToolBase;
  if (action === "clone") {
    tool = new CloneTool(diagramInstance.commandHandler);
  }
  return tool;
}
//set the position of the userhandle.
function setUserHandlePosition(
  offset: number,
  side: Side,
  target: HTMLElement
): void {
  diagramInstance.selectedItems.userHandles[0].offset = offset;
  diagramInstance.selectedItems.userHandles[0].side = side;
  target.classList.add("e-selected-style");
}
//set the style of the userhandle.
function applyUserHandleStyle(bgcolor: string, target: HTMLElement): void {
  diagramInstance.selectedItems.userHandles[0].backgroundColor = bgcolor;
  diagramInstance.selectedItems.userHandles[0].pathColor = "White";
  target.classList.add("e-selected-style");
}
function fixedUserHandleTemplate(props) {
  return(<div style={{ width: '100%', height: '100%' }}>
  <button style={{backgroundColor: 'black', borderRadius: '50%', width: '25px', height: '25px', border: 'none', cursor: 'context-menu', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: `url(https://ej2.syncfusion.com/react/demos/src/diagram/Images/user-handle/delete.png)`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
  </button>
  </div>)
}
