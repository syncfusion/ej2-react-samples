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
var basicShapeModel = [
    {
        shape: { type: "Text", content: "Basic Shapes" },
        constraints: ej2_react_diagrams_1.NodeConstraints.PointerEvents,
        style: {
            fontSize: 16,
            fill: "None",
            fontFamily: "sans-serif",
            bold: true,
            strokeWidth: 0
        }
    },
    {
        shape: { type: "Basic", shape: "Rectangle" },
        annotations: [{ content: "Rectangle" }]
    },
    {
        shape: { type: "Basic", shape: "Ellipse" },
        annotations: [{ content: "Ellipse" }]
    },
    {
        shape: { type: "Basic", shape: "Triangle" },
        annotations: [{ content: "Triangle" }]
    },
    {
        shape: { type: "Basic", shape: "Plus" },
        annotations: [{ content: "Plus" }]
    },
    {
        shape: { type: "Basic", shape: "Star" },
        annotations: [{ content: "Star" }]
    },
    {
        shape: { type: "Basic", shape: "Pentagon" },
        annotations: [{ content: "Pentagon" }]
    },
    {
        shape: { type: "Basic", shape: "Heptagon" },
        annotations: [{ content: "Heptagon" }]
    },
    {
        shape: { type: "Basic", shape: "Octagon" },
        annotations: [{ content: "Octagon" }]
    },
    {
        shape: { type: "Basic", shape: "Trapezoid" },
        annotations: [{ content: "Trapezoid" }]
    },
    {
        shape: { type: "Basic", shape: "Decagon" },
        annotations: [{ content: "Decagon" }]
    },
    {
        shape: { type: "Basic", shape: "RightTriangle" },
        annotations: [{ content: "Right Triangle" }]
    },
    {
        shape: { type: "Basic", shape: "Parallelogram" },
        annotations: [{ content: "Parallelogram" }]
    }
];
var flowShapeModel = [
    {
        shape: { type: "Text", content: "Flow Shapes" },
        constraints: ej2_react_diagrams_1.NodeConstraints.PointerEvents,
        style: {
            fontSize: 16,
            fill: "None",
            fontFamily: "sans-serif",
            bold: true,
            strokeWidth: 0
        }
    },
    {
        shape: { type: "Flow", shape: "Terminator" },
        annotations: [{ content: "Terminator" }]
    },
    {
        shape: { type: "Flow", shape: "Process" },
        annotations: [{ content: "Process" }]
    },
    {
        shape: { type: "Flow", shape: "Decision" },
        annotations: [{ content: "Decision" }]
    },
    {
        shape: { type: "Flow", shape: "Document" },
        annotations: [{ content: "Document" }]
    },
    {
        shape: { type: "Flow", shape: "PreDefinedProcess" },
        annotations: [{ content: "Predefined Process" }]
    },
    {
        shape: { type: "Flow", shape: "PaperTap" },
        annotations: [{ content: "Paper Tape" }]
    },
    {
        shape: { type: "Flow", shape: "DirectData" },
        annotations: [{ content: "Direct Data" }]
    },
    {
        shape: { type: "Flow", shape: "SequentialData" },
        annotations: [{ content: "Direct Data" }]
    },
    {
        shape: { type: "Flow", shape: "Sort" },
        annotations: [{ content: "Sort" }]
    },
    {
        shape: { type: "Flow", shape: "MultiDocument" },
        annotations: [{ content: "Multi-Document" }]
    },
    {
        shape: { type: "Flow", shape: "Collate" },
        annotations: [{ content: "Collate" }]
    },
    {
        shape: { type: "Flow", shape: "SummingJunction" },
        annotations: [{ content: "Summing Junction" }]
    },
    {
        shape: { type: "Flow", shape: "Or" },
        annotations: [{ content: "Or" }]
    },
    {
        shape: { type: "Flow", shape: "InternalStorage" },
        annotations: [{ content: "Internal Storage" }]
    },
    {
        shape: { type: "Flow", shape: "Extract" },
        annotations: [{ content: "Extract" }]
    },
    {
        shape: { type: "Flow", shape: "ManualOperation" },
        annotations: [{ content: "Manual Operation" }]
    },
    {
        shape: { type: "Flow", shape: "Merge" },
        annotations: [{ content: "Merge" }]
    },
    {
        shape: { type: "Flow", shape: "OffPageReference" },
        annotations: [{ content: "Off-Page Reference" }]
    },
    {
        shape: { type: "Flow", shape: "SequentialAccessStorage" },
        annotations: [{ content: "Sequential Access Storage" }]
    },
    {
        shape: { type: "Flow", shape: "Data" },
        annotations: [{ content: "Data" }]
    },
    {
        shape: { type: "Flow", shape: "Card" },
        annotations: [{ content: "Card" }]
    }
];
var bpmnShapeModel = [
    {
        shape: { type: "Text", content: "BPMN Shapes" },
        constraints: ej2_react_diagrams_1.NodeConstraints.PointerEvents,
        style: {
            fontSize: 16,
            fill: "none",
            fontFamily: "sans-serif",
            bold: true,
            strokeWidth: 0
        }
    },
    {
        shape: {
            type: "Bpmn",
            shape: "Event",
            event: { event: "Start", trigger: "None" }
        },
        annotations: [{ content: "Start Event" }]
    },
    {
        shape: {
            type: "Bpmn",
            shape: "Event",
            event: { event: "Intermediate", trigger: "None" }
        },
        annotations: [{ content: "Intermediate Event" }]
    },
    {
        shape: {
            type: "Bpmn",
            shape: "Event",
            event: { event: "End", trigger: "None" }
        },
        annotations: [{ content: "End Event" }]
    },
    {
        shape: { type: "Bpmn", shape: "Gateway" },
        annotations: [{ content: "Gateway" }]
    },
    {
        shape: { type: "Bpmn", shape: "Activity", activity: { activity: "Task" } },
        annotations: [{ content: "Task" }]
    },
    {
        shape: {
            type: "Bpmn",
            shape: "Activity",
            activity: {
                activity: "SubProcess",
                subProcess: {
                    type: "Transaction",
                    transaction: {
                        success: { visible: false },
                        failure: { visible: false },
                        cancel: { visible: false }
                    }
                }
            }
        },
        annotations: [{ content: "Transaction" }]
    },
    {
        shape: { type: "Bpmn", shape: "Message" },
        annotations: [{ content: "Message" }]
    },
    {
        shape: { type: "Bpmn", shape: "DataObject" },
        annotations: [{ content: "Data Object" }]
    },
    {
        shape: { type: "Bpmn", shape: "DataSource" },
        annotations: [{ content: "Data Source" }]
    },
    {
        shape: { type: "Bpmn", shape: "Group" },
        annotations: [{ content: "Group" }]
    },
    {
        shape: { type: "Bpmn", shape: "TextAnnotation" },
        annotations: [{ content: "Text Annotation" }]
    }
];
var shape = [
    { shapeName: "Basic Shapes", shapeId: "Basic" },
    { shapeName: "Flow Shapes", shapeId: "Flow" },
    { shapeName: "BPMN Shapes", shapeId: "Bpmn" }
];
var SAMPLE_CSS = ".image-pattern-style {\n    background-color: white;\n    background-size: contain;\n    background-repeat: no-repeat;\n    height: 75px;\n    width: calc((100% - 12px) / 3);\n    cursor: pointer;\n    border: 1px solid #D5D5D5;\n    background-position: center;\n    float: left;\n}\n\n.row {\n    margin-left: 0px;\n    margin-right: 0px;\n}\n\n.row-header {\n    font-size: 13px;\n    font-weight: 500;\n}\n\n.property-panel-header {\n    color: rgba(0, 0, 0, .7)\n}\n}";
var diagramInstance;
var ShapeGallery = (function (_super) {
    __extends(ShapeGallery, _super);
    function ShapeGallery() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShapeGallery.prototype.rendereComplete = function () {
        diagramInstance.fitToPage({ mode: "Width" });
    };
    ShapeGallery.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { className: "content-wrapper", style: { width: "100%" } },
                    React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: "100%", height: "499px", snapSettings: { constraints: ej2_react_diagrams_1.SnapConstraints.None }, nodes: getNodes(), 
                        //Defines the default node and connector properties
                        getNodeDefaults: function (obj, diagram) {
                            return obj;
                        } },
                        React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.DataBinding, ej2_react_diagrams_1.BpmnDiagrams] })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates basic built-in shapes, such as basic shapes, flow shapes, and BPMN shapes.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This example shows how to define built-in shapes that are used to visualize geometric information, work flow, or a business flow diagrams. The ",
                    React.createElement("code", null, "shape"),
                    " property can be used to define the category of built-in shapes. Additionally, the",
                    React.createElement("code", null, "type"),
                    " property of the ",
                    React.createElement("code", null, "shape"),
                    " allows you to choose the type of the shape."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "The diagram component\u2019s features are segregated into individual feature-wise modules. To use the BPMN shapes, inject",
                    React.createElement("code", null, "BpmnDiagrams"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("br", null))));
    };
    return ShapeGallery;
}(sample_base_1.SampleBase));
exports.ShapeGallery = ShapeGallery;
function getNodes() {
    var nodes1 = basicShapeModel;
    nodes1 = nodes1.concat(flowShapeModel).concat(bpmnShapeModel);
    var offsetx = 60;
    var offsety = 50;
    var count = 1;
    for (var i = 0; i < nodes1.length; i++) {
        var node = nodes1[i];
        node.width = 40;
        node.height = 40;
        if (node.shape.type === "Flow") {
            var shapeType = node.shape.shape;
            if (shapeType === "Process" || shapeType === "Terminator") {
                node.height = 20;
            }
            else if (shapeType === "Decision") {
                node.height = 35;
            }
            else if (shapeType === "Document" ||
                shapeType === "DirectData" ||
                shapeType === "MultiDocument" ||
                shapeType === "PreDefinedProcess") {
                node.height = 30;
            }
        }
        node.offsetX = offsetx;
        node.offsetY = offsety;
        if (!(node.shape.type === "Text")) {
            node.annotations[0].verticalAlignment = "Top";
            node.annotations[0].offset = { y: 1 };
            node.annotations[0].margin = { top: 10 };
            offsetx = offsetx + 90;
            if (count % 10 === 0) {
                offsety = offsety + 100;
                offsetx = 60;
            }
            count++;
        }
        if (node.shape.type === "Text") {
            offsetx = 60;
            offsety = offsety + 50;
            count = 1;
            node.width = 150;
            node.height = 100;
            node.offsetX = 90;
            if (!(node.shape.content === "Basic Shapes")) {
                node.offsetX = 90;
                node.offsetY = offsety + 50;
                offsety = offsety + 100;
            }
        }
    }
    return nodes1;
}
