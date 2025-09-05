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
import { updateSampleSection } from "../common/sample-base";
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

// Holds an instance of the DiagramComponent for global access
let diagramInstance: DiagramComponent;

// Sets default properties for nodes
function setNodeDefaults(node: Node): Node {
    if (!node.children) {
        node.shape = shape;
        node.width = 70;
        node.height = 70;
    }
    return node;
}

// Configures the command manager with custom and modified keyboard shortcuts
function getCommandManagerSettings(): CommandManagerModel {
    return {
        commands: [
            createCommand("customGroup", Keys.G, KeyModifiers.Control, () => groupItems(), canGroupItems),
            createCommand("customUnGroup", Keys.U, KeyModifiers.Control, () => unGroupItems(), canUnGroupItems),
            createCommand("navigationDown", Keys.Down, undefined, () => navigateLevels(true), alwaysTrue),
            createCommand("navigationUp", Keys.Up, undefined, () => navigateLevels(false), alwaysTrue),
            createCommand("navigationLeft", Keys.Left, undefined, () => navigateToSiblings(false), alwaysTrue),
            createCommand("navigationRight", Keys.Right, undefined, () => navigateToSiblings(true), alwaysTrue)
        ]
    };
}

// Creates a command with specified properties
function createCommand(name: string, key: Keys, keyModifiers: KeyModifiers, execute: () => void, canExecute: () => boolean): CommandModel {
    return { name, gesture: { key, keyModifiers }, canExecute, execute };
}

// Checks if grouping of selected items is possible
function canGroupItems(): boolean {
    return diagramInstance.selectedItems.nodes.length > 0 || diagramInstance.selectedItems.connectors.length > 0;
}

// Groups the selected items in the diagram
function groupItems(): void {
    diagramInstance.group();
}

// Checks if ungrouping of selected items is possible
function canUnGroupItems(): boolean {
    return diagramInstance.selectedItems.nodes[0]?.children !== undefined;
}

// Ungroups the selected items in the diagram
function unGroupItems(): void {
    diagramInstance.unGroup();
}

// Always returns true, used as a default for command execution
function alwaysTrue(): boolean {
    return true;
}

// Navigates to the child or parent node of the selected node
function navigateLevels(isParent: boolean): void {
    let selectedNode: Node = diagramInstance.selectedItems.nodes[0] as Node;
    if (selectedNode) {
        let connectorId: string = isParent ? selectedNode.outEdges[0] : selectedNode.inEdges[0];
        let altNode: NodeModel[] = isParent ? getChildNode(connectorId) : getParentNode(connectorId);
        diagramInstance.select(altNode);
    }
}

// Navigates to the sibling node of the selected node based on direction
function navigateToSiblings(isRightSibling: boolean): void {
    let selectedNode: Node = diagramInstance.selectedItems.nodes[0] as Node;
    if (selectedNode) {
        let connectorId: string = selectedNode.inEdges[0];
        let altConnectorId: string = '';
        let parentNode: NodeModel = getParentNode(connectorId)[0];
        if (parentNode) {
            for (let i: number = 0; i < (parentNode as Node).outEdges.length; i++) {
                if ((parentNode as Node).outEdges[i] === connectorId) {
                    altConnectorId = isRightSibling ? (parentNode as Node).outEdges[i + 1] : (parentNode as Node).outEdges[i - 1];
                }
            }
            let siblingNode: NodeModel[] = getChildNode(altConnectorId);
            diagramInstance.select(siblingNode);
        }
    }
}

// Retrieves child node elements based on connector ID
function getChildNode(connectorId: string): NodeModel[] {
    let childNode: NodeModel[] = [];
    let connector: ConnectorModel = diagramInstance.getObject(connectorId) as ConnectorModel;
    if (connector) {
        childNode.push(diagramInstance.getObject(connector.targetID) as NodeModel);
    }
    return childNode;
}

// Retrieves parent node elements based on connector ID
function getParentNode(connectorId: string): NodeModel[] {
    let parentNode: NodeModel[] = [];
    let connector: ConnectorModel = diagramInstance.getObject(connectorId) as ConnectorModel;
    if (connector) {
        parentNode.push(diagramInstance.getObject(connector.sourceID) as NodeModel);
    }
    return parentNode;
}

// Renders a table of commands and their keyboard gestures
function renderCommandTable(title, commands) {
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
const sample_css = `
  .diagram-keyboard .property-panel-content td{
       padding: 2px 0px;
  }`;
// Functional component for keyboard interaction
function KeyBoardInteraction() {
    // useEffect hook to perform side effects when the component mounts
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    // Renders the component UI.
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
                        getNodeDefaults={setNodeDefaults.bind(this)}
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
                        commandManager={getCommandManagerSettings()}
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
                {renderCommandTable("Built-In Commands", [
                    { command: "Select All", gesture: "Ctrl + A" },
                    { command: "Cut", gesture: "Ctrl + X" },
                    { command: "Copy", gesture: "Ctrl + C" },
                    { command: "Paste", gesture: "Ctrl + V" },
                    { command: "Undo", gesture: "Ctrl + Z" },
                    { command: "Redo", gesture: "Ctrl + Y" },
                    { command: "Delete", gesture: "Delete" },
                ])}
                {renderCommandTable("Custom Commands", [
                    { command: "Group", gesture: "Ctrl + G" },
                    { command: "Ungroup", gesture: "Ctrl + U" },
                ])}
                {renderCommandTable("Modified Commands", [
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
export default KeyBoardInteraction;