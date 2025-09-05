// Import React and necessary components from Syncfusion's EJ2 React Diagrams library for building the diagram.
import * as React from "react";
import {
    BasicShapeModel,
    Keys,
    Node,
    DiagramContextMenu,
    HierarchicalTree,
    DataBinding,
    KeyModifiers,
    DiagramComponent,
    CommandManagerModel,
    CommandModel,
    NodeModel,
    UndoRedo,
    ConnectorModel,
    Inject,
    SnapConstraints
} from "@syncfusion/ej2-react-diagrams";
import { SampleBase } from "../common/sample-base";
import { DataManager } from "@syncfusion/ej2-data";
import { keyBoardData } from './diagram-data';

export interface DataInfo {
    [key: string]: string;
}

// Define the basic shape for nodes
let shape: BasicShapeModel = {
    type: "Basic",
    shape: "Ellipse",
    cornerRadius: 10
};

// Holds an instance of the DiagramComponent for global access within the class
let diagramInstance: DiagramComponent;
const sample_css = `
  .diagram-keyboard .property-panel-content td{
       padding: 2px 0px;
  }`;
// Class component for keyboard interaction with the diagram
export class KeyBoardInteraction extends SampleBase<{}, {}> {
    // Renders the component UI.
    render() {
        return (
            <div className="control-pane diagram-keyboard">
                <style>{sample_css}</style>
                <div className="col-lg-8 control-section">
                    <div  style={{ width: "100%" }}>
                        {/* Initializes and renders diagram control */}
                        <DiagramComponent
                            ref={diagram => (diagramInstance = diagram)}
                            id="diagram"
                            width={"100%"}
                            height={"645"}
                            snapSettings={{ constraints: SnapConstraints.None }}
                            contextMenuSettings={{ show: true }}
                            getNodeDefaults={this.setNodeDefaults.bind(this)}
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
                                        strokeColor: "transparent" /* tslint:disable:no-string-literal */,
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
                    {this.renderCommandTable("Built-In Commands", [
                        { command: "Select All", gesture: "Ctrl + A" },
                        { command: "Cut", gesture: "Ctrl + X" },
                        { command: "Copy", gesture: "Ctrl + C" },
                        { command: "Paste", gesture: "Ctrl + V" },
                        { command: "Undo", gesture: "Ctrl + Z" },
                        { command: "Redo", gesture: "Ctrl + Y" },
                        { command: "Delete", gesture: "Delete" },
                    ])}
                    {this.renderCommandTable("Custom Commands", [
                        { command: "Group", gesture: "Ctrl + G" },
                        { command: "Ungroup", gesture: "Ctrl + U" },
                    ])}
                    {this.renderCommandTable("Modified Commands", [
                        { command: "Navigate to Parent Node", gesture: "Up Arrow" },
                        { command: "Navigate to Child Node", gesture: "Down Arrow" },
                        { command: "Navigate to Previous Child", gesture: "Left Arrow" },
                        { command: "Navigate to Next Child", gesture: "Right Arrow" },
                    ])}
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

    // Sets default properties for nodes
    public setNodeDefaults(node: Node): Node {
        if (!node.children) {
            node.shape = shape;
            node.width = 70;
            node.height = 70;
        }
        return node;
    }

    // Configures the command manager with custom and modified keyboard shortcuts
    private getCommandManagerSettings(): CommandManagerModel {
        return {
            commands: [
                this.createCommand("customGroup", Keys.G, KeyModifiers.Control, () => this.groupSelectedItems(), this.canGroupItems),
                this.createCommand("customUnGroup", Keys.U, KeyModifiers.Control, () => this.unGroupItems(), this.canUnGroupItems),
                this.createCommand("navigationDown", Keys.Down, undefined, () => this.navigateLevels(true), this.alwaysTrue),
                this.createCommand("navigationUp", Keys.Up, undefined, () => this.navigateLevels(false), this.alwaysTrue),
                this.createCommand("navigationLeft", Keys.Left, undefined, () => this.navigateToSiblings(false), this.alwaysTrue),
                this.createCommand("navigationRight", Keys.Right, undefined, () => this.navigateToSiblings(true), this.alwaysTrue)
            ]
        };
    }

    // Creates a command with specified properties
    public createCommand(name: string, key: Keys, keyModifiers: KeyModifiers, execute: () => void, canExecute: () => boolean): CommandModel {
        return { name, gesture: { key, keyModifiers }, canExecute, execute };
    }

    // Checks if grouping of selected items is possible
    public canGroupItems(): boolean {
        return diagramInstance.selectedItems.nodes.length > 0 || diagramInstance.selectedItems.connectors.length > 0;
    }

    // Groups the selected items in the diagram
    public groupSelectedItems(): void {
        diagramInstance.group();
    }

    // Checks if ungrouping of selected items is possible
    public canUnGroupItems(): boolean {
        return diagramInstance.selectedItems.nodes[0]?.children !== undefined;
    }

    // Ungroups the selected items in the diagram
    public unGroupItems(): void {
        diagramInstance.unGroup();
    }

    // Always returns true, used as a default for command execution
    private alwaysTrue(): boolean {
        return true;
    }

    // Navigates to the child or parent node of the selected node
    public navigateLevels(isParent: boolean): void {
        let selectedNode: Node = diagramInstance.selectedItems.nodes[0] as Node;
        if (selectedNode) {
            let connectorId: string = isParent ? selectedNode.outEdges[0] : selectedNode.inEdges[0];
            let altNode: NodeModel[] = isParent ? this.getChildNode(connectorId) : this.getParentNode(connectorId);
            diagramInstance.select(altNode);
        }
    }

    // Navigates to the sibling node of the selected node based on direction
    public navigateToSiblings(isRightSibling: boolean): void {
        let selectedNode: Node = diagramInstance.selectedItems.nodes[0] as Node;
        if (selectedNode) {
            let connectorId: string = selectedNode.inEdges[0];
            let altConnectorId: string = '';
            let parentNode: NodeModel = this.getParentNode(connectorId)[0];
            if (parentNode) {
                for (let i: number = 0; i < (parentNode as Node).outEdges.length; i++) {
                    if ((parentNode as Node).outEdges[i] === connectorId) {
                        altConnectorId = isRightSibling ? (parentNode as Node).outEdges[i + 1] : (parentNode as Node).outEdges[i - 1];
                    }
                }
                let siblingNode: NodeModel[] = this.getChildNode(altConnectorId);
                diagramInstance.select(siblingNode);
            }
        }
    }

    // Retrieves child node elements based on connector ID
    public getChildNode(connectorId: string): NodeModel[] {
        let childNode: NodeModel[] = [];
        let connector: ConnectorModel = diagramInstance.getObject(connectorId) as ConnectorModel;
        if (connector) {
            childNode.push(diagramInstance.getObject(connector.targetID) as NodeModel);
        }
        return childNode;
    }

    // Retrieves parent node elements based on connector ID
    public getParentNode(connectorId: string): NodeModel[] {
        let parentNode: NodeModel[] = [];
        let connector: ConnectorModel = diagramInstance.getObject(connectorId) as ConnectorModel;
        if (connector) {
            parentNode.push(diagramInstance.getObject(connector.sourceID) as NodeModel);
        }
        return parentNode;
    }

    // Renders a table of commands and their keyboard gestures
    public renderCommandTable(title: string, commands: { command: string; gesture: string }[]): JSX.Element {
        return (
            <div>
                <h4 className="property-panel-header">{title}</h4>
                <div className="property-panel-content">
                    <table style={{ fontSize: "12px" }}>
                        <tr>
                            <td style={{ width: "70%" }}><h5>Command</h5></td>
                            <td style={{ width: "30%" }}><h5>Gesture</h5></td>
                        </tr>
                        {commands.map((cmd, index) => (
                            <tr key={index}>
                                <td style={{ width: "70%" }}>{cmd.command}</td>
                                <td style={{ width: "30%" }}>{cmd.gesture}</td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        );
    }
}