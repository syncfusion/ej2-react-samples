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
 * Diagram swimlane sample
 */
var diagram;
var darkColor = '#C7D4DF';
var lightColor = '#f5f5f5';
var pathData = 'M 120 24.9999 C 120 38.8072 109.642 50 96.8653 50 L 23.135' +
    ' 50 C 10.3578 50 0 38.8072 0 24.9999 L 0 24.9999 C' +
    '0 11.1928 10.3578 0 23.135 0 L 96.8653 0 C 109.642 0 120 11.1928 120 24.9999 Z';
var middle = 0;
var port = [
    { id: 'Port1', offset: { x: 0, y: 0.5 }, visibility: ej2_react_diagrams_1.PortVisibility.Connect | ej2_react_diagrams_1.PortVisibility.Hover, constraints: ej2_react_diagrams_1.PortConstraints.Draw },
    { id: 'Port2', offset: { x: 0.5, y: 0 }, visibility: ej2_react_diagrams_1.PortVisibility.Connect | ej2_react_diagrams_1.PortVisibility.Hover, constraints: ej2_react_diagrams_1.PortConstraints.Draw },
    { id: 'Port3', offset: { x: 1, y: 0.5 }, visibility: ej2_react_diagrams_1.PortVisibility.Connect | ej2_react_diagrams_1.PortVisibility.Hover, constraints: ej2_react_diagrams_1.PortConstraints.Draw },
    { id: 'Port4', offset: { x: 0.5, y: 1 }, visibility: ej2_react_diagrams_1.PortVisibility.Connect | ej2_react_diagrams_1.PortVisibility.Hover, constraints: ej2_react_diagrams_1.PortConstraints.Draw }
];
var SAMPLE_CSS = ".sb-mobile-palette {\n  width: 195px;\n            height: 559px;\n            float: left;\n}\n #palette-space {\n  border: 1px solid rgba(0, 0, 0, 0.12);\n}";
var nodes = [
    {
        id: 'swimlane',
        shape: {
            type: 'SwimLane',
            header: {
                annotation: { content: 'SALES PROCESS FLOW CHART', style: { fill: 'transparent' } },
                height: 50, style: { fontSize: 11 },
                orientation: 'Horizontal',
            },
            lanes: [
                {
                    id: 'stackCanvas1',
                    header: {
                        annotation: { content: 'Consumer' }, width: 50,
                        style: { fontSize: 11 }
                    },
                    height: 100,
                    children: [
                        {
                            id: 'node1',
                            annotations: [
                                {
                                    content: 'Consumer learns \n of product',
                                    style: { fontSize: 11 }
                                }
                            ],
                            margin: { left: 60, top: 30 },
                            height: 40, width: 100, ports: port
                        },
                        {
                            id: 'node2',
                            shape: { type: 'Flow', shape: 'Decision' },
                            annotations: [
                                {
                                    content: 'Does \n Consumer want \nthe product',
                                    style: { fontSize: 11 }
                                }
                            ],
                            margin: { left: 200, top: 20 },
                            height: 60, width: 120, ports: port
                        },
                        {
                            id: 'node3',
                            annotations: [
                                {
                                    content: 'No sales lead',
                                    style: { fontSize: 11 }
                                }
                            ],
                            margin: { left: 370, top: 30 }, shape: { type: 'Path', data: pathData },
                            height: 40, width: 100, ports: port
                        },
                        {
                            id: 'node4',
                            annotations: [
                                {
                                    content: 'Sell to consumer',
                                    style: { fontSize: 11 }
                                }
                            ],
                            margin: { left: 510, top: 30 },
                            height: 40, width: 100, ports: port
                        }
                    ],
                },
                {
                    id: 'stackCanvas2',
                    header: {
                        annotation: { content: 'Marketing' }, width: 50,
                        style: { fontSize: 11 }
                    },
                    height: 100,
                    children: [
                        {
                            id: 'node5',
                            annotations: [{ content: 'Create marketing campaigns' }],
                            margin: { left: 60, top: 20 },
                            height: 40, width: 100, ports: port
                        },
                        {
                            id: 'node6',
                            annotations: [{ content: 'Marketing finds sales leads' }],
                            margin: { left: 210, top: 20 },
                            height: 40, width: 100, ports: port
                        }
                    ],
                },
                {
                    id: 'stackCanvas3',
                    header: {
                        annotation: { content: 'Sales' }, width: 50,
                        style: { fontSize: 11 }
                    },
                    height: 100,
                    children: [
                        {
                            id: 'node7',
                            annotations: [{ content: 'Sales receives lead' }],
                            margin: { left: 210, top: 30 },
                            height: 40, width: 100, ports: port
                        }
                    ],
                },
                {
                    id: 'stackCanvas4',
                    header: {
                        annotation: { content: 'Success' }, width: 50,
                        style: { fontSize: 11 }
                    },
                    height: 100,
                    children: [
                        {
                            id: 'node8',
                            annotations: [{ content: 'Success helps \n retain consumer \n as a customer' }],
                            margin: { left: 510, top: 20 },
                            height: 50, width: 100, ports: port
                        }
                    ],
                },
            ],
            phases: [
                {
                    id: 'phase1', offset: 170,
                    header: { content: { content: 'Phase' } }
                }
            ],
            phaseSize: 20,
        },
        offsetX: 360, offsetY: 320,
        height: 100,
        width: 650
    },
];
//Initializes the connectors for the diagram.
var connectors = [
    {
        id: 'connector1', sourceID: 'node1',
        targetID: 'node2'
    },
    {
        id: 'connector2', sourceID: 'node2',
        targetID: 'node3', annotations: [{ content: 'No', style: { fill: 'white' } }]
    },
    {
        id: 'connector3', sourceID: 'node4',
        targetID: 'node8'
    },
    {
        id: 'connector4', sourceID: 'node2',
        targetID: 'node6', annotations: [{ content: 'Yes', style: { fill: 'white' } }]
    },
    {
        id: 'connector5', sourceID: 'node5',
        targetID: 'node1'
    },
    {
        id: 'connector6', sourceID: 'node6',
        targetID: 'node7'
    },
    {
        id: 'connector7', sourcePortID: 'Port1', targetPortID: 'Port3', sourceID: 'node4',
        targetID: 'node7',
    },
];
//Initialize the palettes for the symbol palatte
var palettes = [
    {
        id: 'flow', expanded: true, title: 'Flow Shapes', symbols: [
            {
                id: 'Terminator', addInfo: { tooltip: 'Terminator' }, width: 50, height: 60, shape: { type: 'Flow', shape: 'Terminator' }, style: { strokeWidth: 1 }, ports: [
                    { offset: { x: 0, y: 0.5 }, visibility: ej2_react_diagrams_1.PortVisibility.Connect | ej2_react_diagrams_1.PortVisibility.Hover, constraints: ej2_react_diagrams_1.PortConstraints.Draw },
                    { offset: { x: 0.5, y: 0 }, visibility: ej2_react_diagrams_1.PortVisibility.Connect | ej2_react_diagrams_1.PortVisibility.Hover, constraints: ej2_react_diagrams_1.PortConstraints.Draw },
                    { offset: { x: 1, y: 0.5 }, visibility: ej2_react_diagrams_1.PortVisibility.Connect | ej2_react_diagrams_1.PortVisibility.Hover, constraints: ej2_react_diagrams_1.PortConstraints.Draw },
                    { offset: { x: 0.5, y: 1 }, visibility: ej2_react_diagrams_1.PortVisibility.Connect | ej2_react_diagrams_1.PortVisibility.Hover, constraints: ej2_react_diagrams_1.PortConstraints.Draw }
                ]
            },
            {
                id: 'Process', addInfo: { tooltip: 'Process' }, width: 50, height: 60, shape: { type: 'Flow', shape: 'Process' }, style: { strokeWidth: 1 }, ports: [
                    { offset: { x: 0, y: 0.5 }, visibility: ej2_react_diagrams_1.PortVisibility.Connect | ej2_react_diagrams_1.PortVisibility.Hover, constraints: ej2_react_diagrams_1.PortConstraints.Draw },
                    { offset: { x: 0.5, y: 0 }, visibility: ej2_react_diagrams_1.PortVisibility.Connect | ej2_react_diagrams_1.PortVisibility.Hover, constraints: ej2_react_diagrams_1.PortConstraints.Draw },
                    { offset: { x: 1, y: 0.5 }, visibility: ej2_react_diagrams_1.PortVisibility.Connect | ej2_react_diagrams_1.PortVisibility.Hover, constraints: ej2_react_diagrams_1.PortConstraints.Draw },
                    { offset: { x: 0.5, y: 1 }, visibility: ej2_react_diagrams_1.PortVisibility.Connect | ej2_react_diagrams_1.PortVisibility.Hover, constraints: ej2_react_diagrams_1.PortConstraints.Draw }
                ]
            },
            {
                id: 'Decision', addInfo: { tooltip: 'Decision' }, width: 50, height: 50, shape: { type: 'Flow', shape: 'Decision' }, style: { strokeWidth: 1 }, ports: [
                    { offset: { x: 0, y: 0.5 }, visibility: ej2_react_diagrams_1.PortVisibility.Connect | ej2_react_diagrams_1.PortVisibility.Hover, constraints: ej2_react_diagrams_1.PortConstraints.Draw },
                    { offset: { x: 0.5, y: 0 }, visibility: ej2_react_diagrams_1.PortVisibility.Connect | ej2_react_diagrams_1.PortVisibility.Hover, constraints: ej2_react_diagrams_1.PortConstraints.Draw },
                    { offset: { x: 1, y: 0.5 }, visibility: ej2_react_diagrams_1.PortVisibility.Connect | ej2_react_diagrams_1.PortVisibility.Hover, constraints: ej2_react_diagrams_1.PortConstraints.Draw },
                    { offset: { x: 0.5, y: 1 }, visibility: ej2_react_diagrams_1.PortVisibility.Connect | ej2_react_diagrams_1.PortVisibility.Hover, constraints: ej2_react_diagrams_1.PortConstraints.Draw }
                ]
            },
            {
                id: 'Document', addInfo: { tooltip: 'Document' }, width: 50, height: 50, shape: { type: 'Flow', shape: 'Document' }, style: { strokeWidth: 1 }, ports: [
                    { offset: { x: 0, y: 0.5 }, visibility: ej2_react_diagrams_1.PortVisibility.Connect | ej2_react_diagrams_1.PortVisibility.Hover, constraints: ej2_react_diagrams_1.PortConstraints.Draw },
                    { offset: { x: 0.5, y: 0 }, visibility: ej2_react_diagrams_1.PortVisibility.Connect | ej2_react_diagrams_1.PortVisibility.Hover, constraints: ej2_react_diagrams_1.PortConstraints.Draw },
                    { offset: { x: 1, y: 0.5 }, visibility: ej2_react_diagrams_1.PortVisibility.Connect | ej2_react_diagrams_1.PortVisibility.Hover, constraints: ej2_react_diagrams_1.PortConstraints.Draw },
                    { offset: { x: 0.5, y: 1 }, visibility: ej2_react_diagrams_1.PortVisibility.Connect | ej2_react_diagrams_1.PortVisibility.Hover, constraints: ej2_react_diagrams_1.PortConstraints.Draw }
                ]
            },
            {
                id: 'PreDefinedProcess', addInfo: { tooltip: 'Predefined process' }, width: 50, height: 50, shape: { type: 'Flow', shape: 'PreDefinedProcess' }, ports: [
                    { offset: { x: 0, y: 0.5 }, visibility: ej2_react_diagrams_1.PortVisibility.Connect | ej2_react_diagrams_1.PortVisibility.Hover, constraints: ej2_react_diagrams_1.PortConstraints.Draw },
                    { offset: { x: 0.5, y: 0 }, visibility: ej2_react_diagrams_1.PortVisibility.Connect | ej2_react_diagrams_1.PortVisibility.Hover, constraints: ej2_react_diagrams_1.PortConstraints.Draw },
                    { offset: { x: 1, y: 0.5 }, visibility: ej2_react_diagrams_1.PortVisibility.Connect | ej2_react_diagrams_1.PortVisibility.Hover, constraints: ej2_react_diagrams_1.PortConstraints.Draw },
                    { offset: { x: 0.5, y: 1 }, visibility: ej2_react_diagrams_1.PortVisibility.Connect | ej2_react_diagrams_1.PortVisibility.Hover, constraints: ej2_react_diagrams_1.PortConstraints.Draw }
                ], style: { strokeWidth: 1 }
            },
            {
                id: 'data', width: 50, height: 50, addInfo: { tooltip: 'Data' }, shape: { type: 'Flow', shape: 'Data' }, ports: [
                    { offset: { x: 0, y: 0.5 }, visibility: ej2_react_diagrams_1.PortVisibility.Connect | ej2_react_diagrams_1.PortVisibility.Hover, constraints: ej2_react_diagrams_1.PortConstraints.Draw },
                    { offset: { x: 0.5, y: 0 }, visibility: ej2_react_diagrams_1.PortVisibility.Connect | ej2_react_diagrams_1.PortVisibility.Hover, constraints: ej2_react_diagrams_1.PortConstraints.Draw },
                    { offset: { x: 1, y: 0.5 }, visibility: ej2_react_diagrams_1.PortVisibility.Connect | ej2_react_diagrams_1.PortVisibility.Hover, constraints: ej2_react_diagrams_1.PortConstraints.Draw },
                    { offset: { x: 0.5, y: 1 }, visibility: ej2_react_diagrams_1.PortVisibility.Connect | ej2_react_diagrams_1.PortVisibility.Hover, constraints: ej2_react_diagrams_1.PortConstraints.Draw }
                ], style: { strokeWidth: 1 }
            },
        ]
    },
    {
        id: 'swimlaneShapes', expanded: true,
        title: 'Swimlane Shapes',
        symbols: [
            {
                id: 'stackCanvas1', addInfo: { tooltip: 'Horizontal swimlane' },
                shape: {
                    type: 'SwimLane', lanes: [
                        {
                            id: 'lane1',
                            style: { strokeColor: 'black' }, height: 60, width: 150,
                            header: { width: 50, height: 50, style: { strokeColor: 'black', fontSize: 11 } },
                        }
                    ],
                    orientation: 'Horizontal', isLane: true
                },
                height: 60,
                width: 140,
                offsetX: 70,
                offsetY: 30,
            }, {
                id: 'stackCanvas2', addInfo: { tooltip: 'Vertical swimlane' },
                shape: {
                    type: 'SwimLane',
                    lanes: [
                        {
                            id: 'lane1',
                            style: { strokeColor: 'black' }, height: 150, width: 60,
                            header: { width: 50, height: 50, style: { strokeColor: 'black', fontSize: 11 } },
                        }
                    ],
                    orientation: 'Vertical', isLane: true
                },
                height: 140,
                width: 60,
                // style: { fill: '#f5f5f5' },
                offsetX: 70,
                offsetY: 30,
            }, {
                id: 'verticalPhase', addInfo: { tooltip: 'Vertical phase' },
                shape: {
                    type: 'SwimLane',
                    phases: [{ style: { strokeWidth: 1, strokeDashArray: '3,3', strokeColor: '#A9A9A9' }, }],
                    annotations: [{ text: '' }],
                    orientation: 'Vertical', isPhase: true
                },
                height: 60,
                width: 140
            }, {
                id: 'horizontalPhase', addInfo: { tooltip: 'Horizontal phase' },
                shape: {
                    type: 'SwimLane',
                    phases: [{ style: { strokeWidth: 1, strokeDashArray: '3,3', strokeColor: '#A9A9A9' }, }],
                    annotations: [{ text: '' }],
                    orientation: 'Horizontal', isPhase: true
                },
                height: 60,
                width: 140
            }
        ]
    },
    {
        id: 'connectors', expanded: true, symbols: [
            {
                id: 'Link1', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
                targetDecorator: { shape: 'Arrow' }, style: { strokeWidth: 1 }
            },
            {
                id: 'Link2', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
                targetDecorator: { shape: 'Arrow' }, style: { strokeWidth: 1, strokeDashArray: '4 4' }
            },
            {
                id: 'Link21', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
                targetDecorator: { shape: 'Arrow' }, style: { strokeWidth: 1 }
            },
            {
                id: 'Link22', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
                targetDecorator: { shape: 'Arrow' }, style: { strokeWidth: 1, strokeDashArray: '4 4' }
            }
        ], title: 'Connectors'
    }
];
var contextMenu = {
    show: true, items: [
        {
            text: 'Copy', id: 'Copy', target: '.e-diagramcontent', iconCss: 'e-menu-icon e-icons e-copy'
        },
        {
            text: 'Cut', id: 'Cut', target: '.e-diagramcontent', iconCss: 'e-menu-icon e-icons e-cut'
        },
        {
            text: 'Paste', id: 'Paste', target: '.e-diagramcontent', iconCss: 'e-menu-icon e-icons e-paste'
        },
        {
            text: 'InsertLaneBefore', id: 'InsertLaneBefore', target: '.e-diagramcontent',
        },
        {
            text: 'InsertLaneAfter', id: 'InsertLaneAfter', target: '.e-diagramcontent',
        }
    ],
    showCustomMenuOnly: true,
};
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
var diagramInstance;
var SwimLane = /** @class */ (function (_super) {
    __extends(SwimLane, _super);
    function SwimLane() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SwimLane.prototype.rendereComplete = function () {
        addEvents();
    };
    SwimLane.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { style: { width: "100%" } },
                    React.createElement("div", { className: "sb-mobile-palette-bar" },
                        React.createElement("div", { id: "palette-icon", style: { float: "right", role: "button" }, className: "e-ddb-icons1 e-toggle-palette" })),
                    React.createElement("div", { id: "palette-space", className: "sb-mobile-palette" },
                        React.createElement(ej2_react_diagrams_1.SymbolPaletteComponent, { id: "symbolpalette", expandMode: "Multiple", palettes: palettes, width: "100%", height: "560px", symbolHeight: 48, symbolWidth: 48, symbolMargin: { left: 8, right: 8, top: 8, bottom: 8 }, getSymbolInfo: function (symbol) {
                                return { tooltip: symbol.addInfo ? symbol.addInfo['tooltip'] : symbol.id };
                            } })),
                    React.createElement("div", { id: "diagram-space", className: "sb-mobile-diagram" },
                        React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: "100%", height: "560px", snapSettings: { constraints: ej2_react_diagrams_1.SnapConstraints.None }, nodes: nodes, connectors: connectors, getNodeDefaults: function (node) {
                                node.style.strokeColor = "#717171";
                                return node;
                            }, getConnectorDefaults: function (connector) {
                                if (connector.id.indexOf("Link21") !== -1) {
                                    connector.type = 'Straight';
                                }
                                else if (connector.id.indexOf("Link22") !== -1) {
                                    connector.type = 'Straight';
                                }
                                else {
                                    connector.type = 'Orthogonal';
                                }
                                connector.style.strokeColor = "#717171";
                                connector.sourceDecorator.style.strokeColor = "#717171";
                                connector.targetDecorator.style.strokeColor = "#717171";
                                connector.sourceDecorator.style.fill = "#717171";
                                connector.targetDecorator.style.fill = "#717171";
                                return connector;
                            }, contextMenuSettings: contextMenu, contextMenuOpen: contextMenuOpen, contextMenuClick: contextMenuClick, 
                            //Sets the Node properties for DragEnter element.
                            dragEnter: function (args) {
                                var obj = args.element;
                                var shape = obj.shape;
                                if (shape.isLane) {
                                    if (shape.orientation === "Horizontal") {
                                        shape.lanes[0].height = 100;
                                        shape.lanes[0].width = 500;
                                    }
                                    else if (shape.orientation === "Vertical") {
                                        shape.lanes[0].height = 500;
                                        shape.lanes[0].width = 100;
                                    }
                                }
                            } },
                            React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.UndoRedo, ej2_react_diagrams_1.DiagramContextMenu] }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualize the sales processing flow chart with the help of built-in swimlane shapes.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This sample shows how an order process works with each entity  involved in the process assigned a lane that contains all the activities for which they are responsible. The ",
                    React.createElement("code", null, "type"),
                    " property of the ",
                    React.createElement("code", null, "shape"),
                    " allows us to choose the swimlane shape type. Using the ",
                    React.createElement("code", null, "children"),
                    " property of the lane, we can add the nodes inside the lanes. We can also create the swimlane interactively using the swimlane shapes from the symbol palette."),
                React.createElement("br", null))));
    };
    return SwimLane;
}(sample_base_1.SampleBase));
exports.SwimLane = SwimLane;
var isMobile;
// let centerX: number = this.bounds.width / 2;
// middle = this.centerX - 50;
function addEvents() {
    isMobile = window.matchMedia('(max-width:550px)').matches;
    if (isMobile) {
        var paletteIcon = document.getElementById('palette-icon');
        if (paletteIcon) {
            paletteIcon.addEventListener('click', openPalette, false);
        }
    }
}
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
function contextMenuOpen(args) {
    diagram = diagramInstance;
    for (var _i = 0, _a = args.items; _i < _a.length; _i++) {
        var item = _a[_i];
        if ((diagram.selectedItems.connectors.length + diagram.selectedItems.nodes.length) > 0) {
            if (item.id === 'InsertLaneBefore' || item.id === 'InsertLaneAfter') {
                if (diagram.selectedItems.connectors.length || (diagram.selectedItems.nodes.length && !diagram.selectedItems.nodes[0].isLane)) {
                    args.hiddenItems.push(item.text);
                }
            }
        }
        else {
            args.hiddenItems.push(item.text);
        }
    }
}
function contextMenuClick(args) {
    diagram = diagramInstance;
    if (args.item.id === 'InsertLaneBefore' || args.item.id === 'InsertLaneAfter') {
        if (diagram.selectedItems.nodes.length > 0 && diagram.selectedItems.nodes[0].isLane) {
            var index = void 0;
            var node = diagram.selectedItems.nodes[0];
            var swimlane = diagram.getObject(diagram.selectedItems.nodes[0].parentId);
            var shape = swimlane.shape;
            var existingLane = ej2_react_diagrams_1.cloneObject(shape.lanes[0]);
            var newLane = {
                id: ej2_react_diagrams_1.randomId(),
                header: {
                    width: existingLane.header.width, height: existingLane.header.height,
                    style: existingLane.header.style
                },
                style: existingLane.style,
                height: existingLane.height, width: existingLane.width,
            };
            if (shape.orientation === 'Horizontal') {
                var exclude = 0;
                exclude += (shape.header) ? 1 : 0;
                exclude += (shape.phases.length) ? 1 : 0;
                index = node.rowIndex - exclude;
                newLane.header.width = existingLane.header.width;
                newLane.header.height = existingLane.height;
            }
            else {
                index = node.columnIndex - (shape.phases.length) ? 1 : 0;
                newLane.header.width = existingLane.width;
                newLane.header.height = existingLane.header.height;
            }
            if (args.item.id === 'InsertLaneBefore') {
                diagram.addLanes(swimlane, [newLane], index);
            }
            else {
                diagram.addLanes(swimlane, [newLane], index + 1);
            }
            diagram.clearSelection();
        }
    }
    else if (args.item.id === 'Cut') {
        diagram.cut();
    }
    else if (args.item.id === 'Copy') {
        diagram.copy();
        diagram.paste();
    }
    else if (args.item.id === 'Paste') {
        diagram.paste();
    }
}
