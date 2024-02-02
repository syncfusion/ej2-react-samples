import * as ReactDOM from "react-dom";
import * as React from "react";
import {
  BasicShapeModel,
  Keys,
  Node,
  Connector,
  DiagramContextMenu,
  HierarchicalTree,
  DataBinding,
  KeyModifiers,
  DiagramComponent,
  CommandManagerModel,
  Diagram,
  NodeModel,
  UndoRedo,
  ConnectorModel,
  Inject,
  SnapConstraints
} from "@syncfusion/ej2-react-diagrams";
import { SampleBase } from "../common/sample-base";
import { DataManager } from "@syncfusion/ej2-data";
import { Point } from "@syncfusion/ej2-diagrams/src/diagram/primitives/point";
import { keyBoardData } from './diagram-data';


export interface DataInfo {
  [key: string]: string;
}

let node: NodeModel;
let shape: BasicShapeModel = {
  type: "Basic",
  shape: "Ellipse",
  cornerRadius: 10
};
let diagramInstance: DiagramComponent;

export class KeyBoardInteraction extends SampleBase<{}, {}> {
  render() {
    return (
      <div className="control-pane">
        <div className="col-lg-8 control-section">
          <div className="content-wrapper" style={{ width: "100%" }}>
            <DiagramComponent
              ref={diagram => (diagramInstance = diagram)}
              id="diagram"
              width={"100%"}
              height={"645"}
              snapSettings={{ constraints: SnapConstraints.None }}
              contextMenuSettings={{ show: true }}
              getNodeDefaults={this.nodeDefaults.bind(this)}
              layout={{ type: "HierarchicalTree" }}
              dataSourceSettings={{
                id: "id",
                parentId: "ancestor",
                dataSource: new DataManager(keyBoardData as JSON[]),
                doBinding: (nodeModel: NodeModel, data: DataInfo) => {
                  nodeModel.annotations = [
                    {
                      /* tslint:disable:no-string-literal */
                      content: data["id"],
                      style: { color: "white" }
                    }
                  ];
                  nodeModel.style = {
                    strokeColor:
                      "transparent" /* tslint:disable:no-string-literal */,
                    fill: data["fill"]
                  };
                }
              }}
              commandManager={this.getCommandManagerSettings()}
            >
              <Inject
                services={[
                  UndoRedo,
                  DiagramContextMenu,
                  HierarchicalTree,
                  DataBinding
                ]}
              />
            </DiagramComponent>
          </div>
        </div>

        <div className="col-lg-4 property-section">
          <div>
            <h4 className="property-panel-header">Built-In Commands</h4>
            <div className="property-panel-content">
              <table id="property1" style={{ fontSize: "12px" }}>
                <tbody>
                  <tr>
                    <td style={{ width: "60%" }}>
                      <h5>Command</h5>
                    </td>
                    <td style={{ width: "40%" }}>
                      <h5>Gesture</h5>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "61%" }}>Select All </td>
                    <td style={{ width: "39%" }}>Ctrl + A</td>
                  </tr>
                  <tr>
                    <td style={{ width: "60%" }}>Cut</td>
                    <td style={{ width: "40%" }}>Ctrl + X</td>
                  </tr>
                  <tr>
                    <td style={{ width: "60%" }}>Copy</td>
                    <td style={{ width: "40%" }}>Ctrl + C</td>
                  </tr>
                  <tr>
                    <td style={{ width: "60%" }}>Paste</td>
                    <td style={{ width: "40%" }}>Ctrl + V</td>
                  </tr>
                  <tr>
                    <td style={{ width: "60%;" }}>Undo</td>
                    <td style={{ width: "40%" }}>Ctrl + Z</td>
                  </tr>
                  <tr>
                    <td style={{ width: "60%" }}>Redo</td>
                    <td style={{ width: "40%" }}>Ctrl + Y</td>
                  </tr>
                  <tr>
                    <td style={{ width: "60%" }}>Delete</td>
                    <td style={{ width: "40%" }}>Delete</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h4 className="property-panel-header">Custom Commands</h4>
            <div className="property-panel-content">
              <table id="property2" style={{ fontSize: "12px;" }}>
                <tbody>
                  <tr>
                    <td style={{ width: "60%" }}>
                      <h5>Command
                      </h5>
                    </td>
                    <td style={{ width: "40%" }}>
                      <h5>Gesture</h5>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "60%" }}>Group</td>
                    <td style={{ width: "40%" }}>Ctrl + G</td>
                  </tr>
                  <tr>
                    <td style={{ width: "60%" }}>Ungroup</td>
                    <td style={{ width: "40%" }}>Ctrl + U</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h4 className="property-panel-header">Modified Commands</h4>
            <div className="property-panel-content">
              <table id="property3" style={{ fontSize: "12px" }}>
                <tbody>
                  <tr>
                    <td style={{ width: "70%" }}>
                      <h5>Command</h5>
                    </td>
                    <td style={{ width: "30%" }}>
                      <h5>Gesture</h5>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "60%" }}>Navigate to Parent Node </td>
                    <td style={{ width: "40%" }}>Up Arrow</td>
                  </tr>
                  <tr>
                    <td style={{ width: "60%" }}>Navigate to Child Node </td>
                    <td style={{ width: "40%" }}>Down Arrow</td>
                  </tr>
                  <tr>
                    <td style={{ width: "60%" }}>Navigate to Previous Child </td>
                    <td style={{ width: "40%" }}>Left Arrow</td>
                  </tr>
                  <tr>
                    <td style={{ width: "60%" }}>Navigate to Next Child </td>
                    <td style={{ width: "40%" }}>Right Arrow</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
        <div id="action-description">
          <p>
            This sample illustrates interaction with diagram control using
            shortcut keys. Command Manager support is used to manage keyboard
            interactions.
          </p>
        </div>
        <div id="description">
          <p>
            This example shows how to interact with the diagram control using
            shortcut keys. The
            <code>commandManager</code> property can be used to map the commands
            with key gestures. In this example, along with the built-in commands
            a few custom commands are added and a few built-in commands (nudge)
            are overridden. That is, when the arrow keys are pressed, selection
            will be navigated instead of moving the selected objects. The
            different kinds of interactions and the corresponding key gestures
            are listed in the property panel.
          </p>
          <br />
        </div>
      </div>
    );
  }

  public nodeDefaults(obj: Node): Node {
    if (!obj.children) {
      obj.shape = shape;
      obj.width = 70;
      obj.height = 70;
    }
    return obj;
  }

  //Custom command for Diagraming elements.
  public getCommandManagerSettings(): CommandManagerModel {
    let commandManager: CommandManagerModel = {
      commands: [
        {
          name: "customGroup",
          canExecute: (): boolean => {
            if (
              diagramInstance.selectedItems.nodes.length > 0 ||
              diagramInstance.selectedItems.connectors.length > 0
            ) {
              return true;
            }
            return false;
          },
          execute: (): void => {
            diagramInstance.group();
          },
          gesture: { key: Keys.G, keyModifiers: KeyModifiers.Control }
        },
        {
          name: "customUnGroup",
          canExecute: (): boolean => {
            if (diagramInstance.selectedItems.nodes[0].children) {
              return true;
            }
            return false;
          },
          execute: (): void => {
            diagramInstance.unGroup();
          },
          gesture: { key: Keys.U, keyModifiers: KeyModifiers.Control }
        },
        {
          name: "navigationDown",
          canExecute: (): boolean => {
            return true;
          },
          execute: (): void => {
            this.navigateToChild();
          },
          gesture: { key: Keys.Down }
        },
        {
          name: "navigationUp",
          canExecute: (): boolean => {
            return true;
          },
          execute: (): void => {
            this.navigateToParent();
          },
          gesture: { key: Keys.Up }
        },
        {
          name: "navigationLeft",
          canExecute: (): boolean => {
            return true;
          },
          execute: (): void => {
            this.navigateToRightSibling();
          },
          gesture: { key: Keys.Right }
        },
        {
          name: "navigationRight",
          canExecute: (): boolean => {
            return true;
          },
          execute: (): void => {
            this.navigateToLeftSibling();
          },
          gesture: { key: Keys.Left }
        }
      ]
    };
    return commandManager;
  }

  //Navigation for Child Node
  public navigateToChild(): void {
    let parent: Node = diagramInstance.selectedItems.nodes[0] as Node;
    if (parent.outEdges && parent.outEdges.length > 0) {
      let connectorId: string = parent.outEdges[0];
      let child: NodeModel[] = this.getChildNode(connectorId);
      if (child) {
        diagramInstance.clearSelection();
        diagramInstance.select(child);
      }
    }
  }

  //Navigation for parent Node
  public navigateToParent(): void {
    let child: Node = diagramInstance.selectedItems.nodes[0] as Node;
    if (child.inEdges && child.inEdges.length > 0) {
      let connectorId: string = child.inEdges[0];
      let parent: NodeModel[] = this.getParentNode(connectorId);
      if (parent) {
        diagramInstance.clearSelection();
        diagramInstance.select(parent);
      }
    }
  }

  //Navigation for RightSibling Node
  public navigateToRightSibling(): void {
    let child: Node = diagramInstance.selectedItems.nodes[0] as Node;
    if (child.inEdges && child.inEdges.length > 0) {
      let connectorId: string = child.inEdges[0];
      let nextConnectorId: string;
      let parent: NodeModel[] = this.getParentNode(connectorId);
      for (let i: number = 0; i < (parent[0] as Node).outEdges.length; i++) {
        if ((parent[0] as Node).outEdges[i] === connectorId) {
          nextConnectorId = (parent[0] as Node).outEdges[i + 1];
        }
      }
      let rightSibling: NodeModel[] = this.getChildNode(nextConnectorId);
      if (rightSibling) {
        diagramInstance.clearSelection();
        diagramInstance.select(rightSibling);
      }
    }
  }

  //Navigation for LeftSibling Node
  public navigateToLeftSibling(): void {
    let child: Node = diagramInstance.selectedItems.nodes[0] as Node;
    if (child.inEdges && child.inEdges.length > 0) {
      let connectorId: string = child.inEdges[0];
      let prevConnectorId: string;
      let parent: NodeModel[] = this.getParentNode(connectorId);
      for (let i: number = 0; i < (parent[0] as Node).outEdges.length; i++) {
        if ((parent[0] as Node).outEdges[i] === connectorId) {
          prevConnectorId = (parent[0] as Node).outEdges[i - 1];
        }
      }
      let rightSibling: NodeModel[] = this.getChildNode(prevConnectorId);
      if (rightSibling) {
        diagramInstance.clearSelection();
        diagramInstance.select(rightSibling);
      }
    }
  }

  //Get child node elements
  public getChildNode(name: string): NodeModel[] {
    let childNode: NodeModel[] = [];
    let connector: ConnectorModel = diagramInstance.getObject(
      name
    ) as ConnectorModel;
    if (connector) {
      childNode.push(diagramInstance.getObject(
        connector.targetID
      ) as NodeModel);
    }
    return childNode;
  }

  //Get parent node elements
  public getParentNode(name: string): NodeModel[] {
    let parentNode: NodeModel[] = [];
    let connector: ConnectorModel = diagramInstance.getObject(
      name
    ) as ConnectorModel;
    if (connector) {
      parentNode.push(diagramInstance.getObject(
        connector.sourceID
      ) as NodeModel);
    }
    return parentNode;
  }
}
