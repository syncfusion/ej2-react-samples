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
var shape = [
    { shapeName: "BasicShape", shapeId: "Basic" },
    { shapeName: "FlowShape", shapeId: "Flow" },
    { shapeName: "Connector", shapeId: "Segment" },
    { shapeName: "Path", shapeId: "Path" },
    { shapeName: "Image", shapeId: "Image" },
    { shapeName: "SVG", shapeId: "SVG" },
    { shapeName: "Text", shapeId: "Text" }
];
var basic = [
    "Rectangle",
    "Ellipse",
    "Hexagon",
    "Parallelogram",
    "Triangle",
    "Plus",
    "Star",
    "Pentagon",
    "Heptagon",
    "Octagon",
    "Trapezoid",
    "Decagon",
    "RightTriangle",
    "Cylinder",
    "Diamond"
];
var flow = [
    "Process",
    "Decision",
    "Document",
    "PreDefinedProcess",
    "Terminator",
    "PaperTap",
    "DirectData",
    "SequentialData"
];
var connector = ["Straight", "Orthogonal"];
var node;
var diagramInstance;
var interval;
interval = [
    1,
    9,
    0.25,
    9.75,
    0.25,
    9.75,
    0.25,
    9.75,
    0.25,
    9.75,
    0.25,
    9.75,
    0.25,
    9.75,
    0.25,
    9.75,
    0.25,
    9.75,
    0.25,
    9.75
];
var gridlines = {
    lineColor: "#e0e0e0",
    lineIntervals: interval
};
var snapSettings = {
    snapObjectDistance: 5,
    constraints: ej2_react_diagrams_1.SnapConstraints.SnapToObject |
        ej2_react_diagrams_1.SnapConstraints.SnapToLines |
        ej2_react_diagrams_1.SnapConstraints.ShowLines,
    horizontalGridlines: gridlines,
    verticalGridlines: gridlines
};
var SAMPLE_CSS = ".image-pattern-style {\n        background-color: white;\n        background-size: contain;\n        background-repeat: no-repeat;\n        height: 45px;\n        width: calc((100% - 12px) / 3);\n        cursor: pointer;\n        border: 1px solid #D5D5D5;\n        background-position: center;\n        float: left;\n    }\n\n    .image-pattern-style:hover {\n        border-color: gray;\n        border-width: 2px;\n    }\n\n    .row {\n        margin-left: 0px;\n        margin-right: 0px;\n    }\n\n    .row-header {\n        font-size: 12px;\n        font-weight: 500;\n    }\n\n    .e-checkbox-wrapper .e-label {\n        font-size: 12px;\n    }\n\n    .property-panel-header {\n        padding-top: 15px;\n        padding-bottom: 5px\n    }\n\n    .e-selected-style {\n        border-color: #006CE6;\n        border-width: 2px;\n    }\n\n    .control-section {\n        padding-top: 0px;\n        padding-bottom: 0px;\n        padding-right: 0px;\n    }\n\n    .container-fluid {\n        padding-left: 0px;\n    }\n\n    .diagram-control-pane .col-xs-6 {\n        padding-left: 0px;\n        padding-right: 0px;\n    }";
var DrawingTools = (function (_super) {
    __extends(DrawingTools, _super);
    function DrawingTools() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DrawingTools.prototype.rendereComplete = function () {
        SetShape("Rectangle");
        diagramInstance.tool = ej2_react_diagrams_1.DiagramTools.ContinuousDraw;
        diagramInstance.dataBind();
        //Click Event used to decide the drawing object.
        document.getElementById("appearance").onclick = function (args) {
            var target = args.target;
            var selectedElement = document.getElementsByClassName("e-selected-style");
            // custom code start
            if (selectedElement.length &&
                target.id !== "" &&
                target.id !== "checked") {
                selectedElement[0].classList.remove("e-selected-style");
            }
            if (!target.classList.contains("e-selected-style")) {
                target.classList.add("e-selected-style");
            }
            // custom code end
            if (target.className === "image-pattern-style e-selected-style") {
                switch (target.id) {
                    case "shape1":
                        SetShape("Rectangle");
                        break;
                    case "shape2":
                        SetShape("Ellipse");
                        break;
                    case "shape3":
                        SetShape("Hexagon");
                        break;
                    case "shape4":
                        SetShape("Pentagon");
                        break;
                    case "shape5":
                        SetShape("Polygon");
                        break;
                    case "straight":
                        setdrawobject(null, { type: "Straight" });
                        break;
                    case "ortho":
                        setdrawobject(null, { type: "Orthogonal" });
                        break;
                    case "cubic":
                        setdrawobject(null, { type: "Bezier" });
                        break;
                    case "path":
                        getPathShape();
                        target.classList.add("e-selected-style");
                        break;
                    case "image":
                        getImageNode();
                        break;
                    case "svg":
                        getSVGNode();
                        break;
                    case "text":
                        getTextNode();
                        break;
                    default:
                        if (selectedElement.length &&
                            target.id !== "" &&
                            target.id !== "checked") {
                            selectedElement[0].classList.remove("e-selected-style");
                        }
                }
            }
        };
    };
    DrawingTools.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane diagram-control-pane" },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "col-lg-8 control-section" },
                React.createElement("div", { className: "content-wrapper", style: { width: "100%" } },
                    React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: "100%", height: "540px", snapSettings: snapSettings, rulerSettings: { showRulers: true }, 
                        //Sets the default values of a node
                        getNodeDefaults: function (node) {
                            var obj = node;
                            var basicShape = node.shape;
                            if (basicShape.shape === "Rectangle" ||
                                basicShape.shape === "Ellipse") {
                                obj.ports = getPorts(node);
                            }
                            else if (basicShape.shape === "Hexagon") {
                                obj.ports = getHexagonPorts(node);
                            }
                            else if (basicShape.shape === "Pentagon") {
                                obj.ports = getPentagonPorts(node);
                            }
                            else if (basicShape.type === "Path") {
                                obj.ports = getPathPorts(node);
                            }
                        } }),
                    React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.UndoRedo, ej2_react_diagrams_1.Snapping] }))),
            React.createElement("div", { className: "col-lg-4  property-section" },
                React.createElement("div", { className: "property-panel-header" }, "Properties"),
                React.createElement("div", { className: "row property-panel-content", id: "appearance" },
                    React.createElement("div", { className: "row row-header", style: { paddingTop: "10px" } }, "Shapes"),
                    React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                        React.createElement("div", { title: "Retangle", className: "image-pattern-style e-selected-style", id: "shape1", style: {
                                backgroundImage: "url('src/diagram/Images/drawingTool/basicshape/DrawingTool_1.png')",
                                marginRight: "3px"
                            } }),
                        React.createElement("div", { title: "Ellipse", className: "image-pattern-style", id: "shape2", style: {
                                backgroundImage: "url('src/diagram/Images/drawingTool/basicshape/DrawingTool_2.png')",
                                margin: "0px 3px"
                            } }),
                        React.createElement("div", { title: "Hexagon", className: "image-pattern-style", id: "shape3", style: {
                                backgroundImage: "url('src/diagram/Images/drawingTool/basicshape/DrawingTool_3.png')"
                            } })),
                    React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                        React.createElement("div", { title: "Pentagon", className: "image-pattern-style", id: "shape4", style: {
                                backgroundImage: "url('src/diagram/Images/drawingTool/basicshape/DrawingTool_4.png')",
                                marginRight: "3px"
                            } }),
                        React.createElement("div", { title: "Polygon", className: "image-pattern-style", id: "shape5", style: {
                                backgroundImage: "url('src/diagram/Images/drawingTool/basicshape/DrawingTool_5.png')",
                                margin: "0px 3px"
                            } }),
                        React.createElement("div", { title: "Path", className: "image-pattern-style", id: "path", style: {
                                backgroundImage: "url('src/diagram/Images/drawingTool/DrawingTool_6.png')"
                            } })),
                    React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                        React.createElement("div", { title: "Image", className: "image-pattern-style", id: "image", style: {
                                backgroundImage: "url('src/diagram/Images/drawingTool/DrawingTool_7.png')",
                                marginRight: "3px"
                            } }),
                        React.createElement("div", { title: "SVG", className: "image-pattern-style", id: "svg", style: {
                                backgroundImage: "url('src/diagram/Images/drawingTool/DrawingTool_8.png')",
                                marginRight: "3px"
                            } }),
                        React.createElement("div", { title: "Text", className: "image-pattern-style", id: "text", style: {
                                backgroundImage: "url('src/diagram/Images/drawingTool/DrawingTool_9.png')",
                                marginRight: "3px"
                            } })),
                    React.createElement("div", { className: "row row-header", style: { paddingTop: "10px" } }, "Connector"),
                    React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                        React.createElement("div", { className: "image-pattern-style", id: "straight", style: {
                                backgroundImage: "url('src/diagram/Images/drawingTool/connector/Connectors_1.png')",
                                marginRight: "3px"
                            } }),
                        React.createElement("div", { className: "image-pattern-style", id: "ortho", style: {
                                backgroundImage: "url('src/diagram/Images/drawingTool/connector/Connectors_2.png')",
                                margin: "0px 3px"
                            } }),
                        React.createElement("div", { className: "image-pattern-style", id: "cubic", style: {
                                backgroundImage: "url('src/diagram/Images/drawingTool/connector/Connectors_3.png')"
                            } })),
                    React.createElement("div", { className: "row property-panel-content", style: { paddingTop: "10px" } },
                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "checked", label: "Continuous Draw", checked: true, change: onChange })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes how to build a diagram interactively using drawing tools. Continuous draw option, snapping, and undo/redo support are enabled to easily draw diagrams. Rulers, gridlines, and snapping options are enabled to easily align objects.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This example shows how to draw shapes and connections interactively. In addition to that, rulers, gridlines, and snapping options are enabled to assist drawing. The ",
                    React.createElement("code", null, "tool"),
                    " property can be used to enable drawing. Add ",
                    React.createElement("code", null, "DrawOnce"),
                    " or",
                    " ",
                    React.createElement("code", null, "ContinousDraw"),
                    " option to the",
                    React.createElement("code", null, "tool"),
                    " property of the diagram. The",
                    " ",
                    React.createElement("code", null, "drawingObject"),
                    " property can be used to define a shape/connector to be drawn."),
                React.createElement("p", null, "Few shape and connector templates are added in the palette. To draw basic shapes and connectors, click the templates in the palette. For polygon shapes, a corner/point will be added to the polygon for each mouse left button click. Drawing will be completed either on mouse right button click or double click."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "The diagram component\u2019s features are segregated into individual feature-wise modules. To enable undo and redo support, inject",
                    " ",
                    React.createElement("code", null, "UndoRedo"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("br", null))));
    };
    return DrawingTools;
}(sample_base_1.SampleBase));
exports.DrawingTools = DrawingTools;
function onChange(args) {
    diagramInstance.tool = args.checked
        ? ej2_react_diagrams_1.DiagramTools.ContinuousDraw
        : ej2_react_diagrams_1.DiagramTools.DrawOnce;
}
//Enable drawing object.
function setdrawobject(node, connector) {
    var continuousDraw = document.getElementById("checked");
    if (!continuousDraw.checked) {
        diagramInstance.tool = ej2_react_diagrams_1.DiagramTools.DrawOnce;
    }
    if (connector == null) {
        diagramInstance.drawingObject = node;
    }
    else {
        diagramInstance.drawingObject = connector;
    }
    diagramInstance.dataBind();
}
//Enable drawing Tool.
function enableTool() {
    var continuousDraw = document.getElementById("checked");
    if (!continuousDraw.checked) {
        diagramInstance.tool = ej2_react_diagrams_1.DiagramTools.DrawOnce;
    }
    diagramInstance.dataBind();
}
//Set the Shape of the drawing Object.
function SetShape(obj) {
    var drawingshape;
    drawingshape = { type: "Basic", shape: obj };
    node = {
        shape: drawingshape
    };
    diagramInstance.drawingObject = node;
    enableTool();
}
//Set TextNode Shape.
function getTextNode() {
    var drawingshape;
    drawingshape = { type: "Text" };
    node = {
        shape: drawingshape
    };
    setdrawobject(node, null);
}
//Set SVG Node
function getSVGNode() {
    // tslint:disable-next-line:max-line-length
    var drawingshape;
    drawingshape = {
        type: "Native",
        content: getPath()
    };
    node = {
        shape: drawingshape
    };
    setdrawobject(node, null);
}
function getPath() {
    var str = '<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="350.000000pt" ' +
        'height="229.000000pt" viewBox="0 0 350.000000 229.000000" ' +
        'preserveAspectRatio="xMidYMid meet"> <metadata>' +
        " Created by potrace 1.11, written by Peter Selinger 2001-2013" +
        ' </metadata> <g transform="translate(0.000000,229.000000) scale(0.100000,-0.100000)"' +
        ' fill="#de6ca9" stroke="none"><path d="M0 1145 l0 -1145 1750 0 1750 0 0 1145 0 1145' +
        " -1750 0 -1750 0 0 -1145z m1434 186 c19 -8 26 -18 26 -37 0 -24 -3 -26" +
        " -27 -19 -16 3 -58 9 -94 12 -63 5 -67 4 -88 -23 -23 -29 -21 -60 6 -81 8" +
        " -6 47 -19 86 -29 55 -13 80 -25 106 -51 31 -31 33 -37 29 -88 -8 -94 -69" +
        " -133 -193 -122 -90 7 -115 20 -115 58 0 26 3 30 18 24 91 -38 168 -41 204" +
        " -8 23 21 23 75 1 96 -10 8 -49 23 -88 33 -88 22 -135 63 -135 118 0 92 67 140" +
        " 181 131 31 -2 68 -9 83 -14z m854 -6 c38 -15 42 -21 42 -51 l0 -33 -47 25" +
        " c-41 22 -58 25 -115 22 -58 -3 -72 -8 -97 -32 -79 -75 -59 -259 32 -297 35" +
        " -15 106 -18 150 -6 26 7 27 10 27 67 l0 60 -50 0 c-47 0 -50 2 -50 25 0 25" +
        " 1 25 80 25 l81 0 -3 -97 -3 -98 -40 -20 c-22 -10 -65 -21 -95 -23 -153 -11" +
        " -242 74 -243 230 0 145 93 235 233 224 30 -2 74 -12 98 -21z m-638 -169 l67" +
        " -178 40 103 c22 57 53 139 69 182 28 75 29 77 62 77 19 0 32 -4 30 -9 -1 -5" +
        " -39 -104 -83 -220 l-80 -211 -37 0 c-35 0 -37 2 -56 53 -11 28 -48 124 -81 " +
        '211 -34 87 -61 163 -61 168 0 5 14 8 32 6 31 -3 32 -5 98 -182z" />' +
        "</g> </svg>";
    return str;
}
function getImageNode() {
    var drawingshape;
    drawingshape = { type: "Image", source: "./src/diagram/employee.png" };
    node = {
        shape: drawingshape
    };
    setdrawobject(node, null);
}
function getPathShape() {
    // tslint:disable-next-line:max-line-length
    var drawingshape;
    drawingshape = {
        type: "Path",
        data: "M540.3643,137.9336L546.7973,159.7016L570.3633,159.7296L550.7723,171.9366L558.9053,194.9966L540.3643,179.4996L521.8223,194.9966L529.9553,171.9366L510.3633,159.7296L533.9313,159.7016L540.3643,137.9336z"
    };
    node = {
        shape: drawingshape
    };
    setdrawobject(node, null);
}
function getPorts(obj) {
    var ports = [
        createPort("port1", { x: 0, y: 0.5 }),
        createPort("port2", { x: 0.5, y: 1 }),
        createPort("port3", { x: 1, y: 0.5 }),
        createPort("port4", { x: 0.5, y: 0 })
    ];
    return ports;
}
function getPathPorts(obj) {
    var ports = [
        createPort("port1", { x: 0.5, y: 0 }),
        createPort("port2", { x: 0, y: 0.39 }),
        createPort("port3", { x: 1, y: 0.39 }),
        createPort("port4", { x: 0.2, y: 1 }),
        createPort("port5", { x: 0.8, y: 1 })
    ];
    return ports;
}
function getHexagonPorts(obj) {
    var ports = [
        createPort("port1", { x: 0, y: 0.5 }),
        createPort("port2", { x: 0.5, y: 0 }),
        createPort("port3", { x: 0.3, y: 0 }),
        createPort("port4", { x: 0.7, y: 0 }),
        createPort("port5", { x: 1, y: 0.5 }),
        createPort("port6", { x: 0.5, y: 1 }),
        createPort("port7", { x: 0.3, y: 1 }),
        createPort("port8", { x: 0.7, y: 1 })
    ];
    return ports;
}
function getPentagonPorts(obj) {
    var ports = [
        createPort("port1", { x: 0.5, y: 0 }),
        createPort("port2", { x: 0, y: 0.4 }),
        createPort("port3", { x: 1, y: 0.4 }),
        createPort("port4", { x: 0.2, y: 1 }),
        createPort("port5", { x: 0.85, y: 1 })
    ];
    return ports;
}
function createPort(id, offset) {
    var port = {
        id: id,
        shape: "Square",
        offset: offset,
        constraints: ej2_react_diagrams_1.PortConstraints.Draw,
        visibility: ej2_react_diagrams_1.PortVisibility.Hover
    };
    return port;
}
