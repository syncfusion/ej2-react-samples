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
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
require("./font-icons.css");
var diagramInstance;
//Initializes the nodes for the diagram
var nodes = [
    {
        id: "Start",
        height: 50,
        width: 100,
        offsetX: 250,
        offsetY: 60,
        shape: { type: "Flow", shape: "Terminator" },
        annotations: [
            {
                content: "Start"
            }
        ],
        style: { fill: "#d0f0f1", strokeColor: "#797979" }
    },
    {
        id: "Alarm",
        height: 50,
        width: 100,
        offsetX: 250,
        offsetY: 160,
        shape: { type: "Flow", shape: "Process" },
        annotations: [
            {
                content: "Alarm Rings"
            }
        ],
        style: { fill: "#fbfdc5", strokeColor: "#797979" }
    },
    {
        id: "Ready",
        height: 80,
        width: 100,
        offsetX: 250,
        offsetY: 260,
        shape: { type: "Flow", shape: "Decision" },
        annotations: [
            {
                content: "Ready to Get Up?",
                margin: { top: 25, left: 10, right: 10, bottom: 10 }
            }
        ],
        style: { fill: "#c5efaf", strokeColor: "#797979" }
    },
    {
        id: "Climb",
        height: 50,
        width: 100,
        offsetX: 250,
        offsetY: 370,
        shape: { type: "Flow", shape: "Process" },
        annotations: [
            {
                content: "Climb Out of Bed"
            }
        ],
        style: { fill: "#fbfdc5", strokeColor: "#797979" }
    },
    {
        id: "End",
        height: 50,
        width: 100,
        offsetX: 250,
        offsetY: 460,
        shape: { type: "Flow", shape: "Terminator" },
        annotations: [
            {
                content: "End"
            }
        ],
        style: { fill: "#d0f0f1", strokeColor: "#797979" }
    },
    {
        id: "Relay",
        height: 50,
        width: 100,
        offsetX: 450,
        offsetY: 160,
        shape: { type: "Flow", shape: "Delay" },
        annotations: [
            {
                content: "Relay"
            }
        ],
        style: { fill: "#f8eee5", strokeColor: "#797979" }
    },
    {
        id: "Hit",
        height: 50,
        width: 100,
        offsetX: 450,
        offsetY: 260,
        shape: { type: "Flow", shape: "Process" },
        annotations: [
            {
                content: "Hit Snooze Button",
                margin: { top: 10, left: 10, right: 10, bottom: 10 }
            }
        ],
        style: { fill: "#fbfdc5", strokeColor: "#797979" }
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
//Initializes the connector for the diagram
var connectors = [
    {
        id: "connector1",
        sourceID: "Start",
        targetID: "Alarm"
    },
    { id: "connector2", sourceID: "Alarm", targetID: "Ready" },
    {
        id: "connector3",
        sourceID: "Ready",
        targetID: "Climb",
        annotations: [{ content: "Yes", style: { fill: "white" } }]
    },
    { id: "connector4", sourceID: "Climb", targetID: "End" },
    {
        id: "connector5",
        sourceID: "Ready",
        targetID: "Hit",
        annotations: [{ content: "No", style: { fill: "white" } }]
    },
    { id: "connector6", sourceID: "Hit", targetID: "Relay" },
    { id: "connector7", sourceID: "Relay", targetID: "Alarm" }
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
    { id: "data", shape: { type: "Flow", shape: "Data" } },
    { id: "Card", shape: { type: "Flow", shape: "Card" } },
    { id: "Delay", shape: { type: "Flow", shape: "Delay" } }
];
//Initializes connector symbols for the symbol palette
var connectorSymbols = [
    {
        id: "Link1",
        type: "Orthogonal",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 40, y: 40 },
        targetDecorator: { shape: "Arrow" },
        style: { strokeWidth: 2 }
    },
    {
        id: "link2",
        type: "Orthogonal",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 40, y: 40 },
        style: { strokeWidth: 2 },
        targetDecorator: { shape: "None" }
    },
    {
        id: "Link3",
        type: "Straight",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 40, y: 40 },
        targetDecorator: { shape: "Arrow" },
        style: { strokeWidth: 2 }
    },
    {
        id: "link4",
        type: "Straight",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 40, y: 40 },
        style: { strokeWidth: 2 },
        targetDecorator: { shape: "None" }
    },
    {
        id: "link5",
        type: "Bezier",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 40, y: 40 },
        style: { strokeWidth: 2 },
        targetDecorator: { shape: "None" }
    }
];
var SAMPLE_CSS = "\n  .e-upload {\n    display: none;\n  }\n\n  #palette-icon {\n    display: none;\n  }\n\n  @media (max-width: 550px) {\n      #palette-icon {\n          display: inline-flex;\n      }\n  }\n";
var Serialization = (function (_super) {
    __extends(Serialization, _super);
    function Serialization() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Serialization.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "control-section" },
                React.createElement(ej2_react_navigations_1.ToolbarComponent, { id: "toolbar_diagram", style: { width: "100%", height: "10%", marginTop: "10px" }, clicked: function (args) {
                        if (args.item.text === "New") {
                            diagramInstance.clear();
                        }
                        else if (args.item.text === "Load") {
                            document
                                .getElementsByClassName("e-file-select-wrap")[0]
                                .querySelector("button")
                                .click();
                        }
                        else if (args.item.id === 'palette-icon') {
                            openPalette();
                        }
                        else {
                            download(diagramInstance.saveDiagram());
                        }
                    }, items: [
                        {
                            id: 'palette-icon',
                            prefixIcon: 'e-ddb-icons2 e-toggle-palette',
                            align: 'Right',
                        },
                        {
                            text: "New",
                            tooltipText: "New",
                            prefixIcon: "e-diagram-icons e-diagram-new"
                        },
                        { type: "Separator" },
                        {
                            text: "Save",
                            tooltipText: "Save",
                            prefixIcon: "e-diagram-icons e-diagram-save"
                        },
                        { type: "Separator" },
                        {
                            text: "Load",
                            tooltipText: "Load",
                            prefixIcon: "e-diagram-icons e-diagram-open"
                        }
                    ] }),
                React.createElement("div", { style: { width: "100%", height: "80%" } },
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
                            ], getNodeDefaults: function (symbol) {
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
                            }, width: "100%", height: "700px", symbolHeight: 60, symbolWidth: 60 })),
                    React.createElement("div", { id: "diagram-space", className: "sb-mobile-diagram" },
                        React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: "100%", height: "645px", nodes: nodes, snapSettings: {
                                horizontalGridlines: gridlines,
                                verticalGridlines: gridlines
                            }, connectors: connectors, getConnectorDefaults: function (args, diagram) {
                                args.targetDecorator.height = 5;
                                args.targetDecorator.width = 5;
                                args.style.strokeColor = "#797979";
                                args.targetDecorator.style = {
                                    fill: "#797979",
                                    strokeColor: "#797979"
                                };
                                return args;
                            }, 
                            //Sets the Node style for DragEnter element.
                            dragEnter: function (args) {
                                var obj = args.element;
                                if (obj instanceof ej2_react_diagrams_1.Node) {
                                    var ratio = 100 / obj.width;
                                    obj.width = 100;
                                    obj.height *= ratio;
                                }
                            } })),
                    React.createElement(ej2_react_inputs_1.UploaderComponent, { type: "file", id: "fileupload", asyncSettings: {
                            saveUrl: "https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save",
                            removeUrl: "https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove"
                        }, success: onUploadSuccess }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes building diagrams interactively and editing the saved diagrams. Symbol Palette is used to easily build diagrams.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This example shows how to drag-and-drop shapes and connectors from symbol palette to build diagrams. You can save the diagram as text files and edit the pre-saved diagrams. The ",
                    React.createElement("code", null, "saveDiagram"),
                    " ",
                    "method can be used to save the diagram as string. The",
                    " ",
                    React.createElement("code", null, "loadDiagram"),
                    " method can be used to load the diagram from a string. In this example, context menu and undo/redo features are enabled."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "The diagram component\u2019s features are segregated into individual feature-wise modules. To enable undo/redo support, inject",
                    " ",
                    React.createElement("code", null, "UndoRedo"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    ". To enable context menu, inject ",
                    React.createElement("code", null, "DiagramContextMenu"),
                    " module into",
                    " ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("br", null))));
    };
    return Serialization;
}(sample_base_1.SampleBase));
exports.Serialization = Serialization;
function onUploadSuccess(args) {
    var file1 = args.file;
    var file = file1.rawFile;
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = loadDiagram;
}
//Load the diagraming object.
function loadDiagram(event) {
    diagramInstance.loadDiagram(event.target.result);
}
//save the diagram object in json data.
function download(data) {
    if (window.navigator.msSaveBlob) {
        var blob = new Blob([data], { type: "data:text/json;charset=utf-8," });
        window.navigator.msSaveOrOpenBlob(blob, "Diagram.json");
    }
    else {
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(data);
        var a = document.createElement("a");
        a.href = dataStr;
        a.download = "Diagram.json";
        document.body.appendChild(a);
        a.click();
        a.remove();
    }
}
//create and add ports for Node.
function getPorts(obj) {
    var ports = [
        { id: "port1", shape: "Circle", offset: { x: 0, y: 0.5 } },
        { id: "port2", shape: "Circle", offset: { x: 0.5, y: 1 } },
        { id: "port3", shape: "Circle", offset: { x: 1, y: 0.5 } },
        { id: "port4", shape: "Circle", offset: { x: 0.5, y: 0 } }
    ];
    var additionalports = [
        { id: "port2", shape: "Circle", offset: { x: 0.5, y: 1 } },
        { id: "port4", shape: "Circle", offset: { x: 0.5, y: 0 } }
    ];
    if (obj.id === "Data") {
        return additionalports;
    }
    else {
        return ports;
    }
}
function openPalette() {
    var isMobile;
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
