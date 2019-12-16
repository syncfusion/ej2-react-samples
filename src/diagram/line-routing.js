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
var SAMPLE_CSS = ".image-pattern-style {\n  background-color: white;\n  background-size: contain;\n  background-repeat: no-repeat;\n  height: 75px;\n  width: calc((100% - 12px) / 3);\n  cursor: pointer;\n  border: 1px solid #D5D5D5;\n  background-position: center;\n  float: left;\n}\n\n.row {\n  margin-left: 0px;\n  margin-right: 0px;\n}\n\n.row-header {\n  font-size: 13px;\n  font-weight: 500;\n}\n\n.property-panel-header {\n  color: rgba(0, 0, 0, .7)\n}\n}";
var nodes = [
    {
        id: 'start', offsetX: 115, offsetY: 110,
        shape: { type: 'Flow', shape: 'Terminator' },
        style: { fill: '#D5535D' },
        ports: [{ id: 'port1', offset: { x: 0.5, y: 0 }, visibility: ej2_react_diagrams_1.PortVisibility.Hidden }],
        annotations: [{
                content: 'Start'
            }]
    },
    {
        id: 'process', offsetX: 115, offsetY: 255,
        shape: { type: 'Flow', shape: 'Process' },
        style: { fill: "#65B091" },
        annotations: [{
                content: 'Process'
            }]
    },
    {
        id: 'document', offsetX: 115, offsetY: 400,
        shape: { type: 'Flow', shape: 'Document' },
        style: { fill: "#5BA5F0" },
        ports: [{ id: 'port1', offset: { x: 0, y: 0.5 }, visibility: ej2_react_diagrams_1.PortVisibility.Hidden }],
        annotations: [{
                content: 'Document'
            }]
    },
    {
        id: 'decision', offsetX: 390, offsetY: 110,
        shape: { type: 'Flow', shape: 'Decision' },
        style: { fill: "#9A8AF7" },
        annotations: [{
                content: 'Decision'
            }]
    },
    {
        id: 'document2', offsetX: 390, offsetY: 255,
        shape: { type: 'Flow', shape: 'Document' },
        style: { fill: "#5BA5F0" },
        annotations: [{
                content: 'Document'
            }]
    },
    {
        id: 'end', offsetX: 390, offsetY: 400,
        shape: { type: 'Flow', shape: 'Terminator' },
        style: { fill: "#9A8AF7" },
        annotations: [{
                content: 'End'
            }]
    },
    {
        id: 'process2', offsetX: 640, offsetY: 110,
        shape: { type: 'Flow', shape: 'Process' },
        style: { fill: "#65B091" },
        annotations: [{
                content: 'Process'
            }]
    },
    {
        id: 'card', offsetX: 640, offsetY: 255,
        shape: { type: 'Flow', shape: 'Card' },
        style: { fill: "#9A8AF7" },
        annotations: [{
                content: 'Card',
            }],
        ports: [
            { id: 'port1', offset: { x: 1, y: 0.5 }, visibility: ej2_react_diagrams_1.PortVisibility.Hidden },
            { id: 'port2', offset: { x: 0.5, y: 1 }, visibility: ej2_react_diagrams_1.PortVisibility.Hidden }
        ],
    }
];
var connectors = [
    {
        id: 'Connector1', sourceID: 'start', targetID: 'process',
    },
    {
        id: 'Connector2', sourceID: 'process', targetID: 'document'
    },
    {
        id: 'Connector3', sourceID: 'document', targetID: 'end',
    },
    {
        id: 'Connector4', sourceID: 'start', targetID: 'decision'
    },
    {
        id: 'Connector5', sourceID: 'decision', targetID: 'process2',
    },
    {
        id: 'Connector6', sourceID: 'process2', targetID: 'card',
    },
    {
        id: 'Connector7', sourceID: 'process', targetID: 'document2'
    },
    {
        id: 'Connector8', sourceID: 'document2', targetID: 'card',
    },
    {
        id: 'Connector9', sourceID: 'start', sourcePortID: "port1",
        targetID: 'card', targetPortID: 'port1'
    },
    {
        id: 'Connector10', sourceID: 'card', sourcePortID: 'port2',
        targetID: 'document', targetPortID: 'port1'
    },
];
var diagramInstance;
var LineRoutingSample = /** @class */ (function (_super) {
    __extends(LineRoutingSample, _super);
    function LineRoutingSample() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LineRoutingSample.prototype.rendereComplete = function () {
        diagramInstance.fitToPage({ mode: 'Width' });
    };
    LineRoutingSample.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { className: "content-wrapper", style: { width: "100%" } },
                    React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: "100%", height: "499px", snapSettings: { constraints: ej2_react_diagrams_1.SnapConstraints.None }, constraints: ej2_react_diagrams_1.DiagramConstraints.Default | ej2_react_diagrams_1.DiagramConstraints.LineRouting, nodes: nodes, connectors: connectors, getConnectorDefaults: getConnectorDefaults, getNodeDefaults: getNodeDefaults },
                        React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.LineRouting] })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the connectors that are automatically re-routing or moving away if any shape found on the connectors path.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "This example shows how the connectors are automatically re-routing or moving away on dragging a shape near it. This can be achieved by the constraints property of the diagram and connector."))));
    };
    return LineRoutingSample;
}(sample_base_1.SampleBase));
exports.LineRoutingSample = LineRoutingSample;
function getNodeDefaults(node) {
    node.height = 50;
    if (node.id === 'decision') {
        node.height = 70;
    }
    node.width = 120;
    node.style = { strokeColor: 'transparent' };
    return node;
}
function getConnectorDefaults(connector) {
    connector.type = 'Orthogonal';
    connector.style = { strokeColor: '#707070 ', strokeWidth: 1.25 };
    connector.targetDecorator = { style: { fill: '#707070 ', strokeColor: '#707070 ' } };
    return connector;
}
