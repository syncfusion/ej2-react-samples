// Importing necessary modules from React, ReactDOM, and Syncfusion Diagram library
import * as ReactDOM from "react-dom";
import * as React from "react";
import {
  // Syncfusion Diagram components and utilities
  MindMap as MindMapModule,
  HierarchicalTree,
  ConnectorConstraints,
  DiagramConstraints,
  ToolBase,
  MouseEventArgs,
  randomId,
  ISelectionChangeEventArgs,
  PointPort,
  UserHandleModel,
  SelectorConstraints,
  SnapConstraints,
  PointPortModel,
  PortVisibility,
  DiagramComponent,
  NodeConstraints,
  NodeModel,
  ConnectorModel,
  Node,
  Connector,
  Diagram,
  DiagramTools,
  Inject,
  DataBinding,
  Side,
  MarginModel,
  HorizontalAlignment,
  VerticalAlignment,
  TextModel
} from "@syncfusion/ej2-react-diagrams";

// Importing base components and data management utilities
import { SampleBase } from "../common/sample-base";
import { DataManager, Query } from "@syncfusion/ej2-data";
import { mindMap } from './diagram-data';

// Initialize data manager with mindMap data and query
let items: DataManager = new DataManager(
  mindMap as JSON[],
  new Query().take(7)// Limiting data to first 7 items
);

let diagramInstance: Diagram;

// React component for rendering the Mind Map sample
export class MindMap extends SampleBase<{}, {}> {
  // Method called after rendering completes
  rendereComplete() {
    diagramInstance.fitToPage();
  }
    // Render method for displaying the diagram
  render() {
    return (
      <div className="control-pane">
        <div className="control-section">
        <div className="content-wrapper" style={{width: "100%"}}>
             {/* Syncfusion DiagramComponent for displaying the mind map */}
            <DiagramComponent
              ref={diagram => (diagramInstance = diagram)}
              id="diagram"
              style={{ width: "74%", height: "550px", float: "left" }}
              width={"100%"}
              height={"550px"}
              constraints={
                DiagramConstraints.Default & ~DiagramConstraints.UndoRedo
              }
              snapSettings={{ constraints: SnapConstraints.None }}
              tool={DiagramTools.SingleSelect}
              layout={{
                type: "MindMap",
                orientation:'Horizontal',
                getBranch: (node: NodeModel, nodes: NodeModel[]) => {
                  return ((node as Node).data as EmployeeInfo).branch;
                },
                horizontalSpacing: 50
              }}
              //Selectionchange event for Node and connector
              selectionChange={(arg: ISelectionChangeEventArgs) => {
                if (arg.state === "Changing") {
                  if (arg.newValue[0] instanceof Node) {
                    for (let handle of diagramInstance.selectedItems
                      .userHandles) {
                      handle.visible = true;
                    }
                    if (
                      ((arg.newValue[0] as Node).data as EmployeeInfo)
                        .branch === "Left" ||
                      ((arg.newValue[0] as Node).data as EmployeeInfo)
                        .branch === "subLeft"
                    ) {
                      hideUserHandle("leftHandle");
                      changeUserHandlePosition("leftHandle");
                    } else if (
                      ((arg.newValue[0] as Node).data as EmployeeInfo)
                        .branch === "Right" ||
                      ((arg.newValue[0] as Node).data as EmployeeInfo)
                        .branch === "subRight"
                    ) {
                      hideUserHandle("rightHandle");
                      changeUserHandlePosition("rightHandle");
                    } else if (
                      ((arg.newValue[0] as Node).data as EmployeeInfo)
                        .branch === "Root"
                    ) {
                      hideUserHandle("delete");
                    }
                  } else {
                    hideUserHandle("leftHandle");
                    hideUserHandle("rightHandle");
                    hideUserHandle("delete");
                  }
                }
              }}
              selectedItems={{
                constraints: SelectorConstraints.UserHandle,
                userHandles: handle
              }}
              dataSourceSettings={{
                id: "id",
                parentId: "parentId",
                dataSource: items,
                root: String(1)
              }}
              //sets node default value
              getNodeDefaults={(obj: Node) => {
                obj.constraints =
                  NodeConstraints.Default & ~NodeConstraints.Drag;
                if (
                  (obj.data as EmployeeInfo).branch === "Left" ||
                  (obj.data as EmployeeInfo).branch === "Right" ||
                  (obj.data as EmployeeInfo).branch === "Root"
                ) {
                  obj.shape = { type: "Basic", shape: "Ellipse" };
                  obj.borderColor =
                    "black"; /* tslint:disable:no-string-literal */
                  obj.style = {
                    fill:
                      (obj.data as EmployeeInfo).branch === "Root"
                        ? "#E74C3C"
                        : "#F39C12",
                    strokeColor: "none",
                    strokeWidth: 2
                  };
                  obj.annotations = [
                    {
                      content: (obj.data as EmployeeInfo).Label,
                      margin: { left: 10, right: 10, top: 10, bottom: 10 },
                      style: { color: "white" }
                    }
                  ];
                  let port: PointPortModel[] = getPort();
                  for (let i: number = 0; i < port.length; i++) {
                    obj.ports.push(new PointPort(obj, "ports", port[i], true));
                  }
                } else {
                  let color: string; /* tslint:disable:no-string-literal */
                  if (
                    (obj.data as EmployeeInfo).branch === "Right" ||
                    (obj.data as EmployeeInfo).branch === "subRight"
                  ) {
                    color = "#8E44AD";
                  } else {
                    color = "#3498DB";
                  }
                  obj.shape = { type: "Basic", shape: "Rectangle" };
                  obj.style = { fill: color, strokeWidth: 0 };
                  obj.minWidth = 100;
                  obj.height = 4;
                  let port: PointPortModel[] = getPort();
                  for (let i: number = 0; i < port.length; i++) {
                    obj.ports.push(new PointPort(obj, "ports", port[i], true));
                  }
                  obj.annotations = [
                    {
                      content: (obj.data as EmployeeInfo).Label,
                      offset: { x: 0.5, y: 0 },
                      verticalAlignment: "Bottom"
                    }
                  ];
                  (obj.shape as TextModel).margin = {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                  };
                }
                return obj;
              }}
              //sets connector default value
              getConnectorDefaults={(
                connector: ConnectorModel,
                diagram: Diagram
              ) => {
                connector.type = "Bezier";
                connector.targetDecorator = { shape: "None" };
                let sourceNode: Node = diagram.getObject(
                  connector.sourceID
                ) as Node;
                let targetNode: Node = diagram.getObject(
                  connector.targetID
                ) as Node;
                if (
                  (targetNode.data as EmployeeInfo).branch === "Right" ||
                  (targetNode.data as EmployeeInfo).branch === "subRight"
                ) {
                  connector.sourcePortID = sourceNode.ports[0].id;
                  connector.targetPortID = targetNode.ports[1].id;
                  connector.style = { strokeWidth: 5, strokeColor: "#8E44AD" };
                } else if (
                  (targetNode.data as EmployeeInfo).branch === "Left" ||
                  (targetNode.data as EmployeeInfo).branch === "subLeft"
                ) {
                  connector.sourcePortID = sourceNode.ports[1].id;
                  connector.targetPortID = targetNode.ports[0].id;
                  connector.style = { strokeWidth: 5, strokeColor: "#3498DB" };
                }
                connector.constraints &= ~ConnectorConstraints.Select;
                return connector;
              }}
              
              // Method to get custom tool based on action
              getCustomTool={getTool}
              scrollSettings={{
                //Sets the scroll padding
                padding: { left: 50, right: 50 }
              }}
            >
              <Inject
                services={[DataBinding, MindMapModule, HierarchicalTree]}
              />
            </DiagramComponent>
            <input
              id="palette"
              style={{ visibility: "hidden", position: "absolute" }}
              type="color"
              name="favcolor"
              value="#000000"
            />
          </div>
        </div>
        <div id="action-description">
          <p>
            This sample demonstrates the concept of creativity using mind map
            layout algorithm. User handles are used to extend the mind map
            interactively.
          </p>
        </div>
        <div id="description">
          <p>
            This example shows how to generate a mind map from an external data
            source. The <code>type</code> property of the <code>layout</code>{" "}
            can be used to enable the mind map layout algorithm. The
            <code>getBranch</code> property can also be used to define the
            branches at both left and right sides.
          </p>

          <p style={{ fontWeight: 500 }}>Injecting Module</p>
          <p>
            The diagram component’s features are segregated into individual
            feature-wise modules. To generate diagrams from an external data
            source, inject <code>DataBinding</code> module into{" "}
            <code>services</code>. To automatically generate a mind map, inject
            <code>Mindmap</code> module into <code>services</code>.
          </p>
          <br />
        </div>
      </div>
    );
  }
}

//creation of the Ports
function getPort(): PointPortModel[] {
  let port: PointPortModel[] = [
    {
      id: "port1",
      offset: { x: 0, y: 0.5 },
      visibility: PortVisibility.Hidden,
      style: { fill: "black" }
    },
    {
      id: "port2",
      offset: { x: 1, y: 0.5 },
      visibility: PortVisibility.Hidden,
      style: { fill: "black" }
    }
  ];
  return port;
}

// Function to add a new node
function addNode(): NodeModel {
  let obj: NodeModel = {};
  obj.id = randomId();
  obj.data = {};
  (obj.data as EmployeeInfo).Label = "Node";
  return obj;
}

// Function to handle text edit value and add a new node and connector
function getTextEditValue(selectObject:any, node:any){
  let connector:any = addConnector(selectObject, node);
  diagramInstance.clearSelection();
 var newNode  = diagramInstance.add(node);
 diagramInstance.add(connector);
 diagramInstance.doLayout();
 diagramInstance.bringIntoView(newNode .wrapper.bounds);
 diagramInstance.select([diagramInstance.nameTable[newNode.id]]);
 diagramInstance.startTextEdit(diagramInstance.selectedItems.nodes[0]);
}

// Function to add a connector
function addConnector(source: NodeModel, target: NodeModel): ConnectorModel {
  let connector: ConnectorModel = {};
  connector.id = randomId();
  connector.sourceID = source.id;
  connector.targetID = target.id;
  return connector;
}
// Function to get custom tool based on action (leftHandle, rightHandle, delete)
function getTool(action: string): ToolBase {
  let tool: ToolBase;
  if (action === "leftHandle") {
    tool = new LeftExtendTool(diagramInstance.commandHandler);
  } else if (action === "rightHandle") {
    tool = new RightExtendTool(diagramInstance.commandHandler);
  } else if (action === "delete") {
    tool = new DeleteClick(diagramInstance.commandHandler);
  }
  return tool;
}

// Custom tool class for left extension tool
class LeftExtendTool extends ToolBase {
  public mouseDown(args: MouseEventArgs): void {
    super.mouseDown(args);
    this.inAction = true;
  }
  public mouseUp(args: MouseEventArgs): void {
    if (this.inAction) {
      let selectedObject: any = this.commandHandler.getSelectedObject();
      if (selectedObject[0]) {
        if (selectedObject[0] instanceof Node) {
          let node: NodeModel = addNode();
          if ((selectedObject[0].data as EmployeeInfo).branch === "Root") {
            (node.data as EmployeeInfo).branch = "Right";
          } else if (
            (selectedObject[0].data as EmployeeInfo).branch === "Right" ||
            (selectedObject[0].data as EmployeeInfo).branch === "subRight"
          ) {
            (node.data as EmployeeInfo).branch = "subRight";
          }
          getTextEditValue(selectedObject[0], node);
        }
      }
    }
  }
}

// Custom tool class for right extension tool
class RightExtendTool extends ToolBase {
  //mouseDown event
  public mouseDown(args: MouseEventArgs): void {
    super.mouseDown(args);
    this.inAction = true;
  }
  //mouseDown event
  public mouseUp(args: MouseEventArgs): void {
    if (this.inAction) {
      let selectedObject: any = this.commandHandler.getSelectedObject();
      if (selectedObject[0]) {
        if (selectedObject[0] instanceof Node) {
          let node: NodeModel = addNode();
          if ((selectedObject[0].data as EmployeeInfo).branch === "Root") {
            (node.data as EmployeeInfo).branch = "Left";
          } else if (
            (selectedObject[0].data as EmployeeInfo).branch === "Left" ||
            (selectedObject[0].data as EmployeeInfo).branch === "subLeft"
          ) {
            (node.data as EmployeeInfo).branch = "subLeft";
          }
          getTextEditValue(selectedObject[0], node);
        }
      }
    }
  }
}

// Custom tool class for delete tool
class DeleteClick extends ToolBase {
  //mouseDown event
  public mouseDown(args: MouseEventArgs): void {
    super.mouseDown(args);
    this.inAction = true;
  }
  //mouseup event
  public mouseUp(args: MouseEventArgs): void {
    if (this.inAction) {
      let selectedObject: any = this.commandHandler.getSelectedObject();
      if (selectedObject[0]) {
        if (selectedObject[0] instanceof Node) {
          let node: Node = selectedObject[0] as Node;
          this.removeSubChild(node);
        }
        diagramInstance.doLayout();
      }
    }
  }
  //Function to Remove the subchild Elements
  private removeSubChild(node: Node): void {
    for (let i: number = node.outEdges.length - 1; i >= 0; i--) {
      let connector: Connector = diagramInstance.getObject(
        node.outEdges[i]
      ) as Connector;
      let childNode: Node = diagramInstance.getObject(
        connector.targetID
      ) as Node;
      if (childNode.outEdges.length > 0) {
        this.removeSubChild(childNode);
      } else {
        diagramInstance.remove(childNode);
      }
    }
    diagramInstance.remove(node);
  }
}
//Function to hide the require userhandle.
function hideUserHandle(name: string): void {
  for (let handle of diagramInstance.selectedItems.userHandles) {
    if (handle.name === name) {
      handle.visible = false;
    }
  }
}

// Definition of left arrow path,right arrow path,delete icon path for user handle
let leftarrow: string =
  "M11.924,6.202 L4.633,6.202 L4.633,9.266 L0,4.633 L4.632,0 L4.632,3.551 L11.923,3.551 L11.923,6.202Z";
let rightarrow: string =
  "M0,3.063 L7.292,3.063 L7.292,0 L11.924,4.633 L7.292,9.266 L7.292,5.714 L0.001,5.714 L0.001,3.063Z";
let deleteicon: string =
  "M 7.04 22.13 L 92.95 22.13 L 92.95 88.8 C 92.95 91.92 91.55 94.58 88.76" +
  "96.74 C 85.97 98.91 82.55 100 78.52 100 L 21.48 100 C 17.45 100 14.03 98.91 11.24 96.74 C 8.45 94.58 7.04" +
  "91.92 7.04 88.8 z M 32.22 0 L 67.78 0 L 75.17 5.47 L 100 5.47 L 100 16.67 L 0 16.67 L 0 5.47 L 24.83 5.47 z";

// Definition of user handles with their respective properties
let leftuserhandle: UserHandleModel = setUserHandle(
  //it is in dedicated line here.
  "leftHandle",
  leftarrow,
  "Left",
  1,
  { top: 0, bottom: 0, left: 0, right: 10 },
  "Left",
  "Top"
);
let rightuserhandle: UserHandleModel = setUserHandle(
  //it is in dedicated line here.
  "rightHandle",
  rightarrow,
  "Right",
  1,
  { top: 0, bottom: 0, left: 10, right: 0 },
  "Right",
  "Top"
);
let deleteuserhandle: UserHandleModel = setUserHandle(
  //it is in dedicated line here.
  "delete",
  deleteicon,
  "Top",
  0.5,
  { top: 0, bottom: 10, left: 0, right: 0 },
  "Center",
  "Center"
);
let handle: UserHandleModel[] = [
  leftuserhandle,
  rightuserhandle,
  deleteuserhandle
];
//set and creation of the Userhandle.
function setUserHandle( //it is in dedicated line here.
  name: string,
  pathData: string,
  side: Side,
  offset: number,
  margin: MarginModel,
  HorizontalAlignment: HorizontalAlignment,
  VerticalAlignment: VerticalAlignment
): UserHandleModel {
  let userhandle: UserHandleModel = {
    name: name,
    pathData: pathData,
    backgroundColor: "black",
    pathColor: "white",
    side: side,
    offset: offset,
    margin: margin,
    horizontalAlignment: HorizontalAlignment,
    verticalAlignment: VerticalAlignment
  };
  return userhandle;
}
//Change the Position of the UserHandle.
function changeUserHandlePosition(change: string): void {
  for (let handle of diagramInstance.selectedItems.userHandles) {
    if (handle.name === "delete" && change === "leftHandle") {
      applyHandle(
        handle,
        "Left",
        1,
        { top: 0, bottom: 0, left: 0, right: 10 },
        "Left",
        "Top"
      );
    } else if (handle.name === "delete" && change === "rightHandle") {
      applyHandle(
        handle,
        "Right",
        1,
        { top: 0, bottom: 0, left: 10, right: 0 },
        "Right",
        "Top"
      );
    }
  }
}
//set the value for UserHandle element.
function applyHandle( //it is in dedicated line here.
  handle: UserHandleModel,
  side: Side,
  offset: number,
  margin: MarginModel,
  HorizontalAlignment: HorizontalAlignment,
  VerticalAlignment: VerticalAlignment
): void {
  handle.side = side;
  handle.offset = offset;
  handle.margin = margin;
  handle.horizontalAlignment = HorizontalAlignment;
  handle.verticalAlignment = VerticalAlignment;
}

// Interface for defining employee information
export interface EmployeeInfo {
  branch: string;
  color: string;
  Left: string;
  Right: string;
  Root: string;
  Label: string;
}
