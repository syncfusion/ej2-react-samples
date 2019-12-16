import * as React from "react";
import { DiagramComponent, SymbolPaletteComponent, PortConstraints, SnapConstraints, PortVisibility, Inject, UndoRedo, DiagramContextMenu, 
//private method
randomId, cloneObject, } from "@syncfusion/ej2-react-diagrams";
import { SampleBase } from "../common/sample-base";
import "./font-icons.css";
/**
 * Diagram swimlane sample
 */
let diagram;
let darkColor = '#C7D4DF';
let lightColor = '#f5f5f5';
let pathData = 'M 120 24.9999 C 120 38.8072 109.642 50 96.8653 50 L 23.135' +
    ' 50 C 10.3578 50 0 38.8072 0 24.9999 L 0 24.9999 C' +
    '0 11.1928 10.3578 0 23.135 0 L 96.8653 0 C 109.642 0 120 11.1928 120 24.9999 Z';
let middle = 0;
let port = [
    { id: 'Port1', offset: { x: 0, y: 0.5 }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw },
    { id: 'Port2', offset: { x: 0.5, y: 0 }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw },
    { id: 'Port3', offset: { x: 1, y: 0.5 }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw },
    { id: 'Port4', offset: { x: 0.5, y: 1 }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw }
];
const SAMPLE_CSS = `.sb-mobile-palette {
  width: 195px;
            height: 559px;
            float: left;
}
 #palette-space {
  border: 1px solid rgba(0, 0, 0, 0.12);
}`;
let nodes = [
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
let connectors = [
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
let palettes = [
    {
        id: 'flow', expanded: true, title: 'Flow Shapes', symbols: [
            {
                id: 'Terminator', addInfo: { tooltip: 'Terminator' }, width: 50, height: 60, shape: { type: 'Flow', shape: 'Terminator' }, style: { strokeWidth: 1 }, ports: [
                    { offset: { x: 0, y: 0.5 }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw },
                    { offset: { x: 0.5, y: 0 }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw },
                    { offset: { x: 1, y: 0.5 }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw },
                    { offset: { x: 0.5, y: 1 }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw }
                ]
            },
            {
                id: 'Process', addInfo: { tooltip: 'Process' }, width: 50, height: 60, shape: { type: 'Flow', shape: 'Process' }, style: { strokeWidth: 1 }, ports: [
                    { offset: { x: 0, y: 0.5 }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw },
                    { offset: { x: 0.5, y: 0 }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw },
                    { offset: { x: 1, y: 0.5 }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw },
                    { offset: { x: 0.5, y: 1 }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw }
                ]
            },
            {
                id: 'Decision', addInfo: { tooltip: 'Decision' }, width: 50, height: 50, shape: { type: 'Flow', shape: 'Decision' }, style: { strokeWidth: 1 }, ports: [
                    { offset: { x: 0, y: 0.5 }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw },
                    { offset: { x: 0.5, y: 0 }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw },
                    { offset: { x: 1, y: 0.5 }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw },
                    { offset: { x: 0.5, y: 1 }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw }
                ]
            },
            {
                id: 'Document', addInfo: { tooltip: 'Document' }, width: 50, height: 50, shape: { type: 'Flow', shape: 'Document' }, style: { strokeWidth: 1 }, ports: [
                    { offset: { x: 0, y: 0.5 }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw },
                    { offset: { x: 0.5, y: 0 }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw },
                    { offset: { x: 1, y: 0.5 }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw },
                    { offset: { x: 0.5, y: 1 }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw }
                ]
            },
            {
                id: 'PreDefinedProcess', addInfo: { tooltip: 'Predefined process' }, width: 50, height: 50, shape: { type: 'Flow', shape: 'PreDefinedProcess' }, ports: [
                    { offset: { x: 0, y: 0.5 }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw },
                    { offset: { x: 0.5, y: 0 }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw },
                    { offset: { x: 1, y: 0.5 }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw },
                    { offset: { x: 0.5, y: 1 }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw }
                ], style: { strokeWidth: 1 }
            },
            {
                id: 'data', width: 50, height: 50, addInfo: { tooltip: 'Data' }, shape: { type: 'Flow', shape: 'Data' }, ports: [
                    { offset: { x: 0, y: 0.5 }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw },
                    { offset: { x: 0.5, y: 0 }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw },
                    { offset: { x: 1, y: 0.5 }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw },
                    { offset: { x: 0.5, y: 1 }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw }
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
let contextMenu = {
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
let interval;
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
let gridlines = {
    lineColor: "#e0e0e0",
    lineIntervals: interval
};
let diagramInstance;
export class SwimLane extends SampleBase {
    rendereComplete() {
        addEvents();
    }
    render() {
        return (<div className="control-pane">
        <style>{SAMPLE_CSS}</style>
        <div className="control-section">
          <div style={{ width: "100%" }}>
            <div className="sb-mobile-palette-bar">
              <div id="palette-icon" style={{ float: "right", role: "button" }} className="e-ddb-icons1 e-toggle-palette"></div>
            </div>
            <div id="palette-space" className="sb-mobile-palette">
              <SymbolPaletteComponent id="symbolpalette" expandMode="Multiple" palettes={palettes} width={"100%"} height={"560px"} symbolHeight={48} symbolWidth={48} symbolMargin={{ left: 8, right: 8, top: 8, bottom: 8 }} getSymbolInfo={(symbol) => {
            return { tooltip: symbol.addInfo ? symbol.addInfo['tooltip'] : symbol.id };
        }}/>
            </div>
            <div id="diagram-space" className="sb-mobile-diagram">
              <DiagramComponent id="diagram" ref={diagram => (diagramInstance = diagram)} width={"100%"} height={"560px"} snapSettings={{ constraints: SnapConstraints.None }} nodes={nodes} connectors={connectors} //Sets the default values of a connector
         getNodeDefaults={(node) => {
            node.style.strokeColor = "#717171";
            return node;
        }} getConnectorDefaults={(connector) => {
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
        }} contextMenuSettings={contextMenu} contextMenuOpen={contextMenuOpen} contextMenuClick={contextMenuClick} 
        //Sets the Node properties for DragEnter element.
        dragEnter={(args) => {
            let obj = args.element;
            let shape = obj.shape;
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
        }}>
                <Inject services={[UndoRedo, DiagramContextMenu]}/>
              </DiagramComponent>
            </div>
          </div>
        </div>
        <div id="action-description">
          <p>
            This sample visualize the sales processing flow chart with the help of built-in swimlane shapes.
          </p>
        </div>
        <div id="description">
          <p>
            This sample shows how an order process works with each entity  involved in the process
            assigned a lane that contains all the activities for which they are responsible.
           The <code>type</code> property of the <code>shape</code> allows us to choose the swimlane shape type.
           Using the <code>children</code> property of the lane, we can add the nodes inside the lanes.
                            We can also create the swimlane interactively using the swimlane shapes from the symbol palette.
          </p>
          <br />
        </div>
      </div>);
    }
}
let isMobile;
// let centerX: number = this.bounds.width / 2;
// middle = this.centerX - 50;
function addEvents() {
    isMobile = window.matchMedia('(max-width:550px)').matches;
    if (isMobile) {
        let paletteIcon = document.getElementById('palette-icon');
        if (paletteIcon) {
            paletteIcon.addEventListener('click', openPalette, false);
        }
    }
}
function openPalette() {
    let paletteSpace = document.getElementById('palette-space');
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
    for (let item of args.items) {
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
            let index;
            let node = diagram.selectedItems.nodes[0];
            let swimlane = diagram.getObject(diagram.selectedItems.nodes[0].parentId);
            let shape = swimlane.shape;
            let existingLane = cloneObject(shape.lanes[0]);
            let newLane = {
                id: randomId(),
                header: {
                    width: existingLane.header.width, height: existingLane.header.height,
                    style: existingLane.header.style
                },
                style: existingLane.style,
                height: existingLane.height, width: existingLane.width,
            };
            if (shape.orientation === 'Horizontal') {
                let exclude = 0;
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
