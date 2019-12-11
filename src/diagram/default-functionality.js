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
require("./font-icons.css");
/**
 * Diagram Default sample
 */
//Initializes the nodes for the diagram
var nodes = [
    {
        id: "NewIdea",
        height: 60,
        offsetX: 300,
        offsetY: 80,
        shape: { type: "Flow", shape: "Terminator" },
        annotations: [
            {
                content: "Place Order"
            }
        ]
    },
    {
        id: "Meeting",
        height: 60,
        offsetX: 300,
        offsetY: 160,
        shape: { type: "Flow", shape: "Process" },
        annotations: [
            {
                content: "Start Transaction"
            }
        ]
    },
    {
        id: "BoardDecision",
        height: 60,
        offsetX: 300,
        offsetY: 240,
        shape: { type: "Flow", shape: "Process" },
        annotations: [
            {
                content: "Verification"
            }
        ]
    },
    {
        id: "Project",
        height: 60,
        offsetX: 300,
        offsetY: 330,
        shape: { type: "Flow", shape: "Decision" },
        annotations: [
            {
                content: "Credit card valid?"
            }
        ]
    },
    {
        id: "End",
        height: 60,
        offsetX: 300,
        offsetY: 430,
        shape: { type: "Flow", shape: "Decision" },
        annotations: [
            {
                content: "Funds available?"
            }
        ]
    },
    {
        id: "node11",
        height: 60,
        offsetX: 545,
        offsetY: 330,
        shape: { type: "Flow", shape: "Process" },
        annotations: [
            {
                content: "Enter payment method"
            }
        ]
    },
    {
        id: "transaction_entered",
        height: 60,
        offsetX: 300,
        offsetY: 630,
        shape: { type: "Flow", shape: "Terminator" },
        annotations: [
            {
                content: "Log transaction"
            }
        ]
    },
    {
        id: "node12",
        height: 60,
        offsetX: 480,
        offsetY: 630,
        shape: { type: "Flow", shape: "Process" },
        annotations: [
            {
                content: "Reconcile the entries"
            }
        ]
    },
    {
        id: "transaction_completed",
        height: 60,
        offsetX: 300,
        offsetY: 530,
        shape: { type: "Flow", shape: "Process" },
        annotations: [
            {
                content: "Complete Transaction"
            }
        ]
    },
    {
        id: "Data",
        height: 45,
        offsetX: 110,
        offsetY: 530,
        shape: { type: "Flow", shape: "Data" },
        annotations: [
            {
                content: "Send e-mail",
                margin: { left: 25, right: 25 }
            }
        ]
    },
    {
        id: "node10",
        height: 70,
        offsetX: 475,
        offsetY: 530,
        shape: { type: "Flow", shape: "DirectData" },
        annotations: [
            { content: "Customer Database", margin: { left: 25, right: 25 } }
        ]
    }
];
//Initializes the connector for the diagram
var connectors = [
    {
        id: "connector1",
        sourceID: "NewIdea",
        targetID: "Meeting"
    },
    { id: "connector2", sourceID: "Meeting", targetID: "BoardDecision" },
    { id: "connector3", sourceID: "BoardDecision", targetID: "Project" },
    {
        id: "connector4",
        sourceID: "Project",
        annotations: [{ content: "Yes", style: { fill: "white" } }],
        targetID: "End"
    },
    {
        id: "connector5",
        sourceID: "End",
        annotations: [{ content: "Yes", style: { fill: "white" } }],
        targetID: "transaction_completed"
    },
    {
        id: "connector6",
        sourceID: "transaction_completed",
        targetID: "transaction_entered"
    },
    { id: "connector7", sourceID: "transaction_completed", targetID: "Data" },
    { id: "connector8", sourceID: "transaction_completed", targetID: "node10" },
    {
        id: "connector9",
        sourceID: "node11",
        targetID: "Meeting",
        segments: [{ direction: "Top", type: 'Orthogonal', length: 120 }]
    },
    {
        id: "connector10",
        sourceID: "End",
        annotations: [{ content: "No", style: { fill: "white" } }],
        targetID: "node11",
        segments: [{ direction: "Right", type: 'Orthogonal', length: 100 }]
    },
    {
        id: "connector11",
        sourceID: "Project",
        annotations: [{ content: "No", style: { fill: "white" } }],
        targetID: "node11"
    },
    {
        id: "connector12",
        style: { strokeDashArray: "2,2" },
        sourceID: "transaction_entered",
        targetID: "node12"
    }
];
//Initialize the flowshapes for the symbol palatte
var flowshapes = [
    { id: "Terminator", shape: { type: "Flow", shape: "Terminator" } },
    { id: "Process", shape: { type: "Flow", shape: "Process" } },
    { id: "Decision", shape: { type: "Flow", shape: "Decision" } },
    { id: "Document", shape: { type: "Flow", shape: "Document" } },
    {
        id: "PreDefinedProcess",
        shape: { type: "Flow", shape: "PreDefinedProcess" }
    },
    { id: "PaperTap", shape: { type: "Flow", shape: "PaperTap" } },
    { id: "DirectData", shape: { type: "Flow", shape: "DirectData" } },
    { id: "SequentialData", shape: { type: "Flow", shape: "SequentialData" } },
    { id: "Sort", shape: { type: "Flow", shape: "Sort" } },
    { id: "MultiDocument", shape: { type: "Flow", shape: "MultiDocument" } },
    { id: "Collate", shape: { type: "Flow", shape: "Collate" } },
    { id: "SummingJunction", shape: { type: "Flow", shape: "SummingJunction" } },
    { id: "Or", shape: { type: "Flow", shape: "Or" } },
    { id: "InternalStorage", shape: { type: "Flow", shape: "InternalStorage" } },
    { id: "Extract", shape: { type: "Flow", shape: "Extract" } },
    { id: "ManualOperation", shape: { type: "Flow", shape: "ManualOperation" } },
    { id: "Merge", shape: { type: "Flow", shape: "Merge" } },
    {
        id: "OffPageReference",
        shape: { type: "Flow", shape: "OffPageReference" }
    },
    {
        id: "SequentialAccessStorage",
        shape: { type: "Flow", shape: "SequentialAccessStorage" }
    },
    { id: "Annotation", shape: { type: "Flow", shape: "Annotation" } },
    { id: "Annotation2", shape: { type: "Flow", shape: "Annotation2" } },
    { id: "Data", shape: { type: "Flow", shape: "Data" } },
    { id: "Card", shape: { type: "Flow", shape: "Card" } },
    { id: "Delay", shape: { type: "Flow", shape: "Delay" } }
];
//Initializes connector symbols for the symbol palette
var connectorSymbols = [
    {
        id: "Link1",
        type: "Orthogonal",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 60, y: 60 },
        targetDecorator: { shape: "Arrow" },
        style: { strokeWidth: 1 }
    },
    {
        id: "link3",
        type: "Orthogonal",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 60, y: 60 },
        style: { strokeWidth: 1 },
        targetDecorator: { shape: "None" }
    },
    {
        id: "Link21",
        type: "Straight",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 60, y: 60 },
        targetDecorator: { shape: "Arrow" },
        style: { strokeWidth: 1 }
    },
    {
        id: "link23",
        type: "Straight",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 60, y: 60 },
        style: { strokeWidth: 1 },
        targetDecorator: { shape: "None" }
    },
    {
        id: "link33",
        type: "Bezier",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 60, y: 60 },
        style: { strokeWidth: 1 },
        targetDecorator: { shape: "None" }
    }
];
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
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Default.prototype.rendereComplete = function () {
        addEvents();
    };
    Default.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { style: { width: "100%" } },
                    React.createElement("div", { className: "sb-mobile-palette-bar" },
                        React.createElement("div", { id: "palette-icon", style: { float: "right", role: "button" }, className: "e-ddb-icons1 e-toggle-palette" })),
                    React.createElement("div", { id: "palette-space", className: "sb-mobile-palette" },
                        React.createElement(ej2_react_diagrams_1.SymbolPaletteComponent, { id: "symbolpalette", expandMode: "Multiple", palettes: [
                                {
                                    id: "flow",
                                    expanded: true,
                                    symbols: flowshapes,
                                    iconCss: "e-diagram-icons1 e-diagram-flow",
                                    title: "Flow Shapes"
                                },
                                {
                                    id: "connectors",
                                    expanded: true,
                                    symbols: connectorSymbols,
                                    iconCss: "e-diagram-icons1 e-diagram-connector",
                                    title: "Connectors"
                                }
                            ], width: "100%", height: "700px", symbolHeight: 60, symbolWidth: 60, getNodeDefaults: function (symbol) {
                                if (symbol.id === "Terminator" ||
                                    symbol.id === "Process" ||
                                    symbol.id === "Delay") {
                                    symbol.width = 80;
                                    symbol.height = 40;
                                }
                                else if (symbol.id === "Decision" ||
                                    symbol.id === "Document" ||
                                    symbol.id === "PreDefinedProcess" ||
                                    symbol.id === "PaperTap" ||
                                    symbol.id === "DirectData" ||
                                    symbol.id === "MultiDocument" ||
                                    symbol.id === "Data") {
                                    symbol.width = 50;
                                    symbol.height = 40;
                                }
                                else {
                                    symbol.width = 50;
                                    symbol.height = 50;
                                }
                            }, symbolMargin: { left: 15, right: 15, top: 15, bottom: 15 }, getSymbolInfo: function (symbol) {
                                return { fit: true };
                            } })),
                    React.createElement("div", { id: "diagram-space", className: "sb-mobile-diagram" },
                        React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", width: "100%", height: "700px", snapSettings: {
                                horizontalGridlines: gridlines,
                                verticalGridlines: gridlines
                            }, nodes: nodes, connectors: connectors, getNodeDefaults: function (node) {
                                var obj = {};
                                if (obj.width === undefined) {
                                    obj.width = 145;
                                }
                                else {
                                    var ratio = 100 / obj.width;
                                    obj.width = 100;
                                    obj.height *= ratio;
                                }
                                obj.style = { fill: "#357BD2", strokeColor: "white" };
                                obj.annotations = [
                                    { style: { color: "white", fill: "transparent" } }
                                ];
                                //Set ports
                                obj.ports = getPorts(node);
                                return obj;
                            }, getConnectorDefaults: function (obj) {
                                if (obj.id.indexOf("connector") !== -1) {
                                    obj.type = "Orthogonal";
                                    obj.targetDecorator = {
                                        shape: "Arrow",
                                        width: 10,
                                        height: 10
                                    };
                                }
                            }, 
                            //Sets the Node style for DragEnter element.
                            dragEnter: function (args) {
                                var obj = args.element;
                                if (obj instanceof ej2_react_diagrams_1.Node) {
                                    var oWidth = obj.width;
                                    var oHeight = obj.height;
                                    var ratio = 100 / obj.width;
                                    obj.width = 100;
                                    obj.height *= ratio;
                                    obj.offsetX += (obj.width - oWidth) / 2;
                                    obj.offsetY += (obj.height - oHeight) / 2;
                                    obj.style = { fill: "#357BD2", strokeColor: "white" };
                                }
                            } })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the processing of an order placed using credit card with built-in flow shapes.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This example shows how to create a simple flow chart using the diagram control. The ",
                    React.createElement("code", null, "nodes"),
                    " property can be used to define different stages of a process. To define the flow between different stages, the ",
                    React.createElement("code", null, "connectors"),
                    " property can be used. The ",
                    React.createElement("code", null, "getNodeDefaults"),
                    " and",
                    " ",
                    React.createElement("code", null, "getConnectorDefaults"),
                    " properties define the default behavior of shapes and connectors."),
                React.createElement("p", null,
                    "To easily build flow diagrams, few shapes are predefined and added to symbol palette. You can drag-and-drop predefined shapes into the drawing area. The ",
                    React.createElement("code", null, "symbols"),
                    " property allows you to add predefined symbols to the palette."),
                React.createElement("p", null, "In this example, undo and redo support is enabled."),
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
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
function getPorts(obj) {
    var ports = [
        { id: "port1", shape: "Circle", offset: { x: 0, y: 0.5 } },
        { id: "port2", shape: "Circle", offset: { x: 0.5, y: 1 } },
        { id: "port3", shape: "Circle", offset: { x: 1, y: 0.5 } },
        { id: "port4", shape: "Circle", offset: { x: 0.5, y: 0 } }
    ];
    return ports;
}
var isMobile;
function addEvents() {
    isMobile = window.matchMedia('(max-width:550px)').matches;
    if (isMobile) {
        var paletteIcon = document.getElementById('palette-icon');
        if (paletteIcon) {
            paletteIcon.addEventListener('click', openPalette, false);
        }
    }
}
// custom code start
function openPalette() {
    var paletteSpace = document.getElementById('palette-space');
    isMobile = window.matchMedia('(max-width:550px)').matches;
    if (isMobile) {
        if (!paletteSpace.classList.contains('sb-mobile-palette-open')) {
            paletteSpace.classList.add('sb-mobile-palette-open');
        }
        else {
            paletteSpace.classList.remove('sb-mobile-palette-open');
        }
    }
}
// custom code end 
