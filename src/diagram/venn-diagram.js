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
//Initialize shape
var shape = { type: "Basic", shape: "Ellipse" };
//Initialize Diagram Nodes
var nodes = [
    {
        id: "datascience",
        offsetX: 450,
        offsetY: 232,
        width: 400,
        height: 400,
        annotations: [
            {
                content: "Data Science",
                offset: { x: 0.5, y: 0.1 }
            }
        ],
        shape: shape,
        style: { fill: "#f2f2f2", strokeColor: "#acacac", strokeWidth: 1 }
    },
    {
        id: "trignometry",
        offsetX: 515,
        offsetY: 205,
        width: 200,
        height: 200,
        shape: shape,
        annotations: [
            {
                content: "Trignometry",
                offset: { x: 0.5, y: 0.4 },
                horizontalAlignment: "Left"
            },
            { content: "Thesis", offset: { x: 0.45, y: 0.8 } }
        ],
        style: { fill: "#feb42f", opacity: 0.2, strokeColor: "#feb42f" }
    },
    {
        id: "expertise",
        offsetX: 445,
        offsetY: 290,
        width: 200,
        height: 200,
        shape: shape,
        annotations: [
            {
                content: "Expertise",
                offset: { x: 0.5, y: 0.7 },
                verticalAlignment: "Top"
            }
        ],
        style: { fill: "#6acbd4", opacity: 0.2, strokeColor: "#6acbd4" }
    },
    {
        id: "programming",
        offsetX: 388,
        offsetY: 205,
        width: 200,
        height: 200,
        annotations: [
            {
                content: "Programming ",
                offset: { x: 0.5, y: 0.4 },
                horizontalAlignment: "Right"
            },
            {
                content: "Assembly",
                offset: { x: 0.7, y: 0.35 },
                horizontalAlignment: "Left"
            },
            {
                content: "Horizon",
                offset: { x: 0.7, y: 0.6 },
                horizontalAlignment: "Left"
            },
            { content: "Middleware", offset: { x: 0.5, y: 0.8 } }
        ],
        shape: shape,
        style: { fill: "#ed1d79", opacity: 0.2, strokeColor: "#ed1d79" }
    }
];
var diagramInstance;
var VennDiagram = (function (_super) {
    __extends(VennDiagram, _super);
    function VennDiagram() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VennDiagram.prototype.rendereComplete = function () {
        diagramInstance.fitToPage();
    };
    VennDiagram.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { className: "content-wrapper", style: { width: "100%" } },
                    React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: "100%", height: "580", nodes: nodes, snapSettings: { constraints: ej2_react_diagrams_1.SnapConstraints.None }, tool: ej2_react_diagrams_1.DiagramTools.ZoomPan }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes classifications of data science using Venn diagrams. Diagram nodes and annotations are used to define Venn diagrams. Read only mode is enabled in this example.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This example shows how to create a Venn diagram using diagram control. In this example, zoom and pan options are enabled. The",
                    " ",
                    React.createElement("code", null, "tool"),
                    " property of the diagram control allows you to enable/disable zoom and pan options."),
                React.createElement("br", null))));
    };
    return VennDiagram;
}(sample_base_1.SampleBase));
exports.VennDiagram = VennDiagram;
