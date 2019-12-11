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
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var nodes = [];
var port1 = { id: 'port1', offset: { x: 0.5, y: 1 } };
var port = { id: 'port', offset: { x: 1, y: 0.5 } };
nodes.push(CreateNodes('node1', 100, 125, 'Terminator', 'Begin', 100, 35));
nodes.push(CreateNodes('node2', 300, 125, 'Process', 'Specify collection', 120, 25, [port]));
nodes.push(CreateNodes('node3', 500, 125, 'Decision', 'Particulars \n required?', 100, 50, [port1]));
nodes.push(CreateNodes('node4', 730, 125, 'Process', 'Specify particulars', 90, 25));
nodes.push(CreateNodes('node5', 500, 225, 'Process', 'Design collection', 100, 25, [port]));
nodes.push(CreateNodes('node6', 500, 320, 'Process', 'Cluster of events', 100, 25));
nodes.push(CreateNodes('node7', 500, 420, 'Process', 'Start the process', 100, 25));
nodes.push(CreateNodes('node8', 730, 320, 'Process', 'Record and analyze \n results', 170, 25, [port]));
nodes.push(CreateNodes('node9', 730, 420, 'Terminator', 'End ', 100, 35));
var connectors = [];
connectors.push(CreateConnector('connector1', 'node1', 'node2', ''));
connectors.push(CreateConnector('connector2', 'node2', 'node3', ''));
connectors.push(CreateConnector('connector3', 'node3', 'node4', 'Yes'));
connectors.push(CreateConnector('connector4', 'node3', 'node5', 'No'));
connectors.push(CreateConnector('connector5', 'node5', 'node6', ''));
connectors.push(CreateConnector('connector6', 'node6', 'node7', ''));
connectors.push(CreateConnector('connector7', 'node8', 'node6', ''));
connectors.push(CreateConnector('connector8', 'node7', 'node9', ''));
connectors.push(CreateConnector('connector10', 'node4', 'node5', '', 'Orthogonal', 'Bottom', 'port', 220));
var SAMPLE_CSS = "\n#flowExecitionPropertySection .row {\n            margin-left: 0px;\n            margin-right: 0px;\n        }\n\n        #flowExecitionPropertySection .col-xs-7 {\n            width: 300px;\n        }\n\n        #flowExecitionPropertySection .col-xs-7 {\n            padding-left: 0px;\n            padding-right: 0px;\n        }\n\n        #flowExecitionControlSection.content-wrapper {\n            border: 1px solid #D7D7D7;\n        }\n";
var diagramInstance;
var FlowExecution = /** @class */ (function (_super) {
    __extends(FlowExecution, _super);
    function FlowExecution() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FlowExecution.prototype.renderComplete = function () {
        diagramInstance.select([diagramInstance.nodes[2]]);
        diagramInstance.selectionChange = function (arg) {
            applyChanges(selectedButton);
        };
    };
    FlowExecution.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane1" },
            React.createElement("div", { className: "col-lg-8 control-section" },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { id: "flowExecitionControlSection", className: "content-wrapper", style: { width: "100%" } },
                    React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: "100%", height: "600px", nodes: nodes, snapSettings: { constraints: ej2_react_diagrams_1.SnapConstraints.None }, connectors: connectors, created: function (args) {
                            diagramInstance.select([diagramInstance.nodes[2]]);
                        }, selectionChange: function (args) {
                            applyChanges(selectedButton);
                        } },
                        React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.DataBinding] })))),
            React.createElement("div", { id: "flowExecitionPropertySection", className: "col-lg-4 property-section" },
                React.createElement("div", { className: "property-panel-header" }, " Choose a flow"),
                React.createElement("div", { className: "row property-panel-content", id: "appearance" },
                    React.createElement("div", { className: "row property-panel-content" },
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "col-xs-7" },
                                React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "UnhighlightAll", name: 'radio', value: 'UnhighlightAll', label: 'None', change: function (args) {
                                        buttonChange(args);
                                    } }))),
                        React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                            React.createElement("div", { className: "col-xs-7" },
                                React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "LinksInto", name: 'radio', value: 'LinksInto', label: 'Incoming connections', change: function (args) {
                                        buttonChange(args);
                                    } }))),
                        React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                            React.createElement("div", { className: "col-xs-7" },
                                React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "LinksOutOf", name: 'radio', value: 'LinksOutOf', label: 'Outgoing connections', change: function (args) {
                                        buttonChange(args);
                                    } }))),
                        React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                            React.createElement("div", { className: "col-xs-7" },
                                React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "LinksConnected", name: 'radio', value: 'LinksConnected', label: 'Incoming and outgoing connections', change: function (args) {
                                        buttonChange(args);
                                    }, checked: true }))),
                        React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                            React.createElement("div", { className: "col-xs-7" },
                                React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "NodesInto", name: 'radio', value: 'NodesInto', label: 'Incoming nodes', change: function (args) {
                                        buttonChange(args);
                                    } }))),
                        React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                            React.createElement("div", { className: "col-xs-7" },
                                React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "NodesOutOf", name: 'radio', value: 'NodesOutOf', label: 'Outgoing nodes', change: function (args) {
                                        buttonChange(args);
                                    } }))),
                        React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                            React.createElement("div", { className: "col-xs-7" },
                                React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "NodesConnected", name: 'radio', value: 'NodesConnected', label: 'Incoming and outgoing nodes', change: function (args) {
                                        buttonChange(args);
                                    } }))),
                        React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                            React.createElement("div", { className: "col-xs-7" },
                                React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "NodesReachable", name: 'radio', value: 'NodesReachable', label: 'Adjacent nodes', change: function (args) {
                                        buttonChange(args);
                                    } })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates how we can process and get the consecutive nodes and connectors respectively.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "We can get the inward connections and outward connections of the node using ",
                    React.createElement("code", null, "inEdges"),
                    " and ",
                    React.createElement("code", null, "outEdges"),
                    "        properties of the node. By using this connector\u2019s name collection, we can find the node using ",
                    React.createElement("code", null, "getObject"),
                    ". And also, we can get the nodes connected on the connector using ",
                    React.createElement("code", null, "sourceNode"),
                    " and ",
                    React.createElement("code", null, "targetNode"),
                    "        properties of the connector. method can be used to print the diagrams."),
                React.createElement("br", null))));
    };
    return FlowExecution;
}(sample_base_1.SampleBase));
exports.FlowExecution = FlowExecution;
function CreateConnector(name, source, target, content, type, direction, targePort, length) {
    var connector = {};
    connector.id = name;
    connector.sourceID = source;
    connector.targetID = target;
    connector.style = { strokeWidth: 2 };
    var annotation = {};
    annotation.content = content;
    annotation.style = { fill: 'white' };
    connector.annotations = [annotation];
    connector.style.strokeColor = '#8D8D8D';
    connector.targetDecorator = {};
    connector.targetDecorator.style = {};
    connector.targetDecorator.style.strokeColor = '#8D8D8D';
    connector.targetDecorator.style.fill = '#8D8D8D';
    if (targePort) {
        connector.targetPortID = targePort;
    }
    var segment = {};
    if (type) {
        connector.type = type;
        segment.direction = direction;
        segment.type = type;
        segment.length = length;
        connector.segments = [segment];
    }
    return connector;
}
function CreateNodes(name, offsetX, offsetY, shape, content, width, height, ports) {
    var node = {};
    node.id = name;
    node.offsetX = offsetX;
    node.width = 150;
    node.height = 50;
    node.offsetY = offsetY;
    var annotations = {};
    annotations.content = content;
    node.annotations = [annotations];
    node.shape = { type: 'Flow', shape: shape };
    node.style = { fill: '#FBF6E1', strokeColor: '#E8DFB6', strokeWidth: 2 };
    if (ports) {
        node.ports = ports;
    }
    return node;
}
var highLightedObjects = [];
var selectedButton = 'LinksConnected';
function buttonChange(args) {
    applyChanges(args.event.srcElement.id);
    selectedButton = args.event.srcElement.id;
}
function applyChanges(id) {
    Unhighlight();
    switch (id) {
        case 'LinksInto':
            linkedIn();
            break;
        case 'LinksOutOf':
            LinksOut();
            break;
        case 'LinksConnected':
            LinksConnector();
            break;
        case 'NodesInto':
            NodesIn();
            break;
        case 'NodesOutOf':
            NodesOut();
            break;
        case 'NodesConnected':
            NodesConnect();
            break;
        case 'NodesReachable':
            NodeReachable();
            break;
    }
}
function linkedIn() {
    if (diagramInstance.selectedItems.nodes.length) {
        var node = diagramInstance.selectedItems.nodes[0].inEdges;
        for (var i = 0; i < node.length; i++) {
            var index = diagramInstance.connectors.indexOf(diagramInstance.nameTable[node[i]]);
            highLightedObjects.push(node[i]);
            diagramInstance.connectors[index].style.strokeColor = '#1413F8';
            diagramInstance.connectors[index].targetDecorator.style.strokeColor = '#1413F8';
            diagramInstance.connectors[index].targetDecorator.style.fill = '#1413F8';
            diagramInstance.dataBind();
        }
    }
}
function LinksOut() {
    if (diagramInstance.selectedItems.nodes.length) {
        var node = diagramInstance.selectedItems.nodes[0].outEdges;
        for (var i = 0; i < node.length; i++) {
            var index = diagramInstance.connectors.indexOf(diagramInstance.nameTable[node[i]]);
            highLightedObjects.push(node[i]);
            diagramInstance.connectors[index].style.strokeColor = '#1413F8';
            diagramInstance.connectors[index].targetDecorator.style.strokeColor = '#1413F8';
            diagramInstance.connectors[index].targetDecorator.style.fill = '#1413F8';
            diagramInstance.dataBind();
        }
    }
}
function LinksConnector() {
    LinksOut();
    linkedIn();
}
function NodesIn() {
    if (diagramInstance.selectedItems.nodes.length) {
        var node = diagramInstance.selectedItems.nodes[0].inEdges;
        for (var i = 0; i < node.length; i++) {
            var nodeId = diagramInstance.nameTable[node[i]].sourceID;
            highLightedObjects.push(nodeId);
            var index = diagramInstance.nodes.indexOf(diagramInstance.nameTable[nodeId]);
            diagramInstance.nodes[index].style.strokeColor = '#1413F8';
            diagramInstance.dataBind();
        }
    }
}
function NodesOut() {
    if (diagramInstance.selectedItems.nodes.length) {
        var node = diagramInstance.selectedItems.nodes[0].outEdges;
        for (var i = 0; i < node.length; i++) {
            var nodeId = diagramInstance.nameTable[node[i]].targetID;
            highLightedObjects.push(nodeId);
            var index = diagramInstance.nodes.indexOf(diagramInstance.nameTable[nodeId]);
            diagramInstance.nodes[index].style.strokeColor = '#1413F8';
            diagramInstance.dataBind();
        }
    }
}
function NodesConnect() {
    NodesOut();
    NodesIn();
}
function NodeReachable() {
    if (diagramInstance.selectedItems.nodes.length) {
        var connectors_1 = diagramInstance.selectedItems.nodes[0].outEdges;
        var nodeList = foundNode(connectors_1, []);
        for (var i = 0; i < nodeList.length; i++) {
            var index = diagramInstance.connectors.indexOf(diagramInstance.nameTable[nodeList[i]]);
            highLightedObjects.push(nodeList[i]);
            diagramInstance.connectors[index].style.strokeColor = '#1413F8';
            diagramInstance.connectors[index].targetDecorator.style.strokeColor = '#1413F8';
            diagramInstance.connectors[index].targetDecorator.style.fill = '#1413F8';
            diagramInstance.dataBind();
        }
    }
}
function foundNode(list, nodeList) {
    for (var i = 0; i < list.length; i++) {
        var connector = diagramInstance.nameTable[list[i]];
        if (nodeList.indexOf(connector.id) > -1) {
            break;
        }
        if (!connector.annotations[0] || (connector.annotations[0] && connector.annotations[0].content !== 'No')) {
            nodeList.push(connector.id);
        }
        if (diagramInstance.nameTable[connector.targetID].outEdges.length) {
            if (list.indexOf(connector.targetID) === -1) {
                foundNode(diagramInstance.nameTable[connector.targetID].outEdges, nodeList);
            }
        }
    }
    return nodeList;
}
function Unhighlight() {
    for (var i = highLightedObjects.length - 1; i >= 0; i--) {
        if (diagramInstance.nameTable[highLightedObjects[i]] instanceof ej2_react_diagrams_1.Node) {
            var index = diagramInstance.nodes.indexOf(diagramInstance.nameTable[highLightedObjects[i]]);
            diagramInstance.nodes[index].style.strokeColor = '#E8DFB6';
            diagramInstance.dataBind();
        }
        else {
            var index = diagramInstance.connectors.indexOf(diagramInstance.nameTable[highLightedObjects[i]]);
            diagramInstance.connectors[index].style.strokeColor = '#8D8D8D';
            diagramInstance.connectors[index].targetDecorator.style.strokeColor = '#8D8D8D';
            diagramInstance.connectors[index].targetDecorator.style.fill = '#8D8D8D';
            diagramInstance.dataBind();
        }
    }
    highLightedObjects = [];
}
