"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_diagrams_1 = require("@syncfusion/ej2-react-diagrams");
var sample_base_1 = require("../common/sample-base");
var ej2_data_1 = require("@syncfusion/ej2-data");
var diagram_data_1 = require("./diagram-data");
var node;
var shape = {
    type: "Basic",
    shape: "Ellipse",
    cornerRadius: 10
};
var diagramInstance;
var SAMPLE_CSS = ".control-section {\n  padding-top: 0px;\n  padding-bottom: 0px;\n  padding-right: 0px;\n  padding-left: 0px;\n}\n\n.container-fluid {\n  padding-left: 0px;\n}\n\n.property-panel-content {\n  padding-top: 0px !important;\n}\n\n@media (max-width: 550px) {\n  .property-panel-content {\n      padding-top: 0px !important;\n  }\n}";
var KeyBoardInteraction = (function (_super) {
    __extends(KeyBoardInteraction, _super);
    function KeyBoardInteraction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KeyBoardInteraction.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("div", { className: "col-lg-8 control-section" },
                React.createElement("div", { className: "content-wrapper", style: { width: "100%" } },
                    React.createElement(ej2_react_diagrams_1.DiagramComponent, { ref: function (diagram) { return (diagramInstance = diagram); }, id: "diagram", width: "100%", height: "645", snapSettings: { constraints: ej2_react_diagrams_1.SnapConstraints.None }, contextMenuSettings: { show: true }, getNodeDefaults: this.nodeDefaults.bind(this), layout: { type: "HierarchicalTree" }, dataSourceSettings: {
                            id: "id",
                            parentId: "ancestor",
                            dataSource: new ej2_data_1.DataManager(diagram_data_1.keyBoardData),
                            doBinding: function (nodeModel, data) {
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
                        }, commandManager: this.getCommandManagerSettings() },
                        React.createElement(ej2_react_diagrams_1.Inject, { services: [
                                ej2_react_diagrams_1.UndoRedo,
                                ej2_react_diagrams_1.DiagramContextMenu,
                                ej2_react_diagrams_1.HierarchicalTree,
                                ej2_react_diagrams_1.DataBinding
                            ] })))),
            React.createElement("div", { className: "col-lg-4 property-section" },
                React.createElement("div", null,
                    React.createElement("h4", { className: "property-panel-header" }, "Built-In Commands"),
                    React.createElement("div", { className: "property-panel-content" },
                        React.createElement("table", { id: "property1", style: { fontSize: "12px" } },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: "60%" } },
                                        React.createElement("h5", null, "Command")),
                                    React.createElement("td", { style: { width: "40%" } },
                                        React.createElement("h5", null, "Gesture"))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: "61%" } }, "Select All "),
                                    React.createElement("td", { style: { width: "39%" } }, "Ctrl + A")),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: "60%" } }, "Cut"),
                                    React.createElement("td", { style: { width: "40%" } }, "Ctrl + X")),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: "60%" } }, "Copy"),
                                    React.createElement("td", { style: { width: "40%" } }, "Ctrl + C")),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: "60%" } }, "Paste"),
                                    React.createElement("td", { style: { width: "40%" } }, "Ctrl + V")),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: "60%;" } }, "Undo"),
                                    React.createElement("td", { style: { width: "40%" } }, "Ctrl + Z")),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: "60%" } }, "Redo"),
                                    React.createElement("td", { style: { width: "40%" } }, "Ctrl + Y")),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: "60%" } }, "Delete"),
                                    React.createElement("td", { style: { width: "40%" } }, "Delete")))))),
                React.createElement("div", null,
                    React.createElement("h4", { className: "property-panel-header" }, "Custom Commands"),
                    React.createElement("div", { className: "property-panel-content" },
                        React.createElement("table", { id: "property2", style: { fontSize: "12px;" } },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: "60%" } },
                                        React.createElement("h5", null, "Command")),
                                    React.createElement("td", { style: { width: "40%" } },
                                        React.createElement("h5", null, "Gesture"))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: "60%" } }, "Group"),
                                    React.createElement("td", { style: { width: "40%" } }, "Ctrl + G")),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: "60%" } }, "Ungroup"),
                                    React.createElement("td", { style: { width: "40%" } }, "Ctrl + U")))))),
                React.createElement("div", null,
                    React.createElement("h4", { className: "property-panel-header" }, "Modified Commands"),
                    React.createElement("div", { className: "property-panel-content" },
                        React.createElement("table", { id: "property3", style: { fontSize: "12px" } },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: "70%" } },
                                        React.createElement("h5", null, "Command")),
                                    React.createElement("td", { style: { width: "30%" } },
                                        React.createElement("h5", null, "Gesture"))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: "60%" } }, "Navigate to Parent Node "),
                                    React.createElement("td", { style: { width: "40%" } }, "Up Arrow")),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: "60%" } }, "Navigate to Child Node "),
                                    React.createElement("td", { style: { width: "40%" } }, "Down Arrow")),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: "60%" } }, "Navigate to Previous Child "),
                                    React.createElement("td", { style: { width: "40%" } }, "Left Arrow")),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: "60%" } }, "Navigate to Next Child "),
                                    React.createElement("td", { style: { width: "40%" } }, "Right Arrow"))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates interaction with diagram control using shortcut keys. Command Manager support is used to manage keyboard interactions.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This example shows how to interact with the diagram control using shortcut keys. The",
                    React.createElement("code", null, "commandManager"),
                    " property can be used to map the commands with key gestures. In this example, along with the built-in commands a few custom commands are added and a few built-in commands (nudge) are overridden. That is, when the arrow keys are pressed, selection will be navigated instead of moving the selected objects. The different kinds of interactions and the corresponding key gestures are listed in the property panel."),
                React.createElement("br", null))));
    };
    KeyBoardInteraction.prototype.nodeDefaults = function (obj) {
        if (!obj.children) {
            obj.shape = shape;
            obj.width = 70;
            obj.height = 70;
        }
        return obj;
    };
    //Custom command for Diagraming elements.
    KeyBoardInteraction.prototype.getCommandManagerSettings = function () {
        var _this = this;
        var commandManager = {
            commands: [
                {
                    name: "customGroup",
                    canExecute: function () {
                        if (diagramInstance.selectedItems.nodes.length > 0 ||
                            diagramInstance.selectedItems.connectors.length > 0) {
                            return true;
                        }
                        return false;
                    },
                    execute: function () {
                        diagramInstance.group();
                    },
                    gesture: { key: ej2_react_diagrams_1.Keys.G, keyModifiers: ej2_react_diagrams_1.KeyModifiers.Control }
                },
                {
                    name: "customUnGroup",
                    canExecute: function () {
                        if (diagramInstance.selectedItems.nodes[0].children) {
                            return true;
                        }
                        return false;
                    },
                    execute: function () {
                        diagramInstance.unGroup();
                    },
                    gesture: { key: ej2_react_diagrams_1.Keys.U, keyModifiers: ej2_react_diagrams_1.KeyModifiers.Control }
                },
                {
                    name: "navigationDown",
                    canExecute: function () {
                        return true;
                    },
                    execute: function () {
                        _this.navigateToChild();
                    },
                    gesture: { key: ej2_react_diagrams_1.Keys.Down }
                },
                {
                    name: "navigationUp",
                    canExecute: function () {
                        return true;
                    },
                    execute: function () {
                        _this.navigateToParent();
                    },
                    gesture: { key: ej2_react_diagrams_1.Keys.Up }
                },
                {
                    name: "navigationLeft",
                    canExecute: function () {
                        return true;
                    },
                    execute: function () {
                        _this.navigateToRighttSibling();
                    },
                    gesture: { key: ej2_react_diagrams_1.Keys.Right }
                },
                {
                    name: "navigationRight",
                    canExecute: function () {
                        return true;
                    },
                    execute: function () {
                        _this.navigateToLeftSibling();
                    },
                    gesture: { key: ej2_react_diagrams_1.Keys.Left }
                }
            ]
        };
        return commandManager;
    };
    //Navigation for Child Node
    KeyBoardInteraction.prototype.navigateToChild = function () {
        var parent = diagramInstance.selectedItems.nodes[0];
        var connectorId = parent.outEdges[0];
        var child = this.getChildNode(connectorId);
        if (child) {
            diagramInstance.clearSelection();
            diagramInstance.select(child);
        }
    };
    //Navigation for parent Node
    KeyBoardInteraction.prototype.navigateToParent = function () {
        var child = diagramInstance.selectedItems.nodes[0];
        if (child.inEdges && child.inEdges.length > 0) {
            var connectorId = child.inEdges[0];
            var parent_1 = this.getParentNode(connectorId);
            if (parent_1) {
                diagramInstance.clearSelection();
                diagramInstance.select(parent_1);
            }
        }
    };
    //Navigation for RightSibling Node
    KeyBoardInteraction.prototype.navigateToRighttSibling = function () {
        var child = diagramInstance.selectedItems.nodes[0];
        var connectorId = child.inEdges[0];
        var nextConnectorId;
        var parent = this.getParentNode(connectorId);
        for (var i = 0; i < parent[0].outEdges.length; i++) {
            if (parent[0].outEdges[i] === connectorId) {
                nextConnectorId = parent[0].outEdges[i + 1];
            }
        }
        var rightSibling = this.getChildNode(nextConnectorId);
        if (rightSibling) {
            diagramInstance.clearSelection();
            diagramInstance.select(rightSibling);
        }
    };
    //Navigation for LeftSibling Node
    KeyBoardInteraction.prototype.navigateToLeftSibling = function () {
        var child = diagramInstance.selectedItems.nodes[0];
        var connectorId = child.inEdges[0];
        var prevConnectorId;
        var parent = this.getParentNode(connectorId);
        for (var i = 0; i < parent[0].outEdges.length; i++) {
            if (parent[0].outEdges[i] === connectorId) {
                prevConnectorId = parent[0].outEdges[i - 1];
            }
        }
        var rightSibling = this.getChildNode(prevConnectorId);
        if (rightSibling) {
            diagramInstance.clearSelection();
            diagramInstance.select(rightSibling);
        }
    };
    //Get child node elements
    KeyBoardInteraction.prototype.getChildNode = function (name) {
        var childNode = [];
        var connector = diagramInstance.getObject(name);
        if (connector) {
            childNode.push(diagramInstance.getObject(connector.targetID));
        }
        return childNode;
    };
    //Get parent node elements
    KeyBoardInteraction.prototype.getParentNode = function (name) {
        var parentNode = [];
        var connector = diagramInstance.getObject(name);
        if (connector) {
            parentNode.push(diagramInstance.getObject(connector.sourceID));
        }
        return parentNode;
    };
    return KeyBoardInteraction;
}(sample_base_1.SampleBase));
exports.KeyBoardInteraction = KeyBoardInteraction;
