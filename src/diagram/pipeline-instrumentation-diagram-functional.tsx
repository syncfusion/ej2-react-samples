// Import necessary modules and components from Syncfusion and React libraries.
import * as React from "react";
import {
    DiagramComponent,
    Inject,
    UndoRedo,
    SnapConstraints,
    ConnectorBridging,
    NodeConstraints,
    DiagramTools,
    Diagram,
    PortVisibility,
    NodeModel,
    ConnectorModel,
    PointPortModel,
    FlipDirection,
    GradientModel,
    LinearGradientModel,
    RadialGradientModel
} from '@syncfusion/ej2-react-diagrams';
import { Switch } from '@syncfusion/ej2-buttons';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { LinearGauge, Annotations } from '@syncfusion/ej2-lineargauge';
import { updateSampleSection } from "../common/sample-base";

// Enable required functionalities in the Diagram component.
LinearGauge.Inject(Annotations);
Diagram.Inject(UndoRedo, ConnectorBridging);

// Declare variables to hold instances of the components.
let diagramInstance: DiagramComponent;
let numericBox: NumericTextBox;
let gauge: LinearGauge;
let checkbox: Switch;
let checkValve1CloseBtn: Switch;
let checkValve2CloseBtn: Switch;
let checkValve3CloseBtn: Switch;
let diagramCreated: boolean = false;

// Global state variables
let tankFlow1: boolean = true;
let tankFlow2: boolean = true;
let tankFlow3: boolean = true;
let pumpFlow: boolean = true;
let autoStopped: boolean = false;
let pressureInterval: any;
let inputTankOn: boolean = false;
const animationIntervals: Record<string, number> = {};
const gradualStopIntervals: Record<string, number> = {};

// System states - NEW ADDITIONS FROM JS SAMPLE
let isSystemLocked: boolean = false; // When pump is off, lock tank valves
let isStorageShutdown: boolean = false; // When storage is off but pump can still be controlled

// Gradient definitions for tanks
const tank1RadialGradient: GradientModel | LinearGradientModel | RadialGradientModel = {
    cx: 50, cy: 50, fx: 25, fy: 25, r: 50,
    stops: [{ color: 'white', offset: 0 }, { color: '#e88a25', offset: 100 }],
    type: 'Radial'
};

const tank2RadialGradient: GradientModel | LinearGradientModel | RadialGradientModel = {
    cx: 50, cy: 50, fx: 25, fy: 25, r: 50,
    stops: [{ color: 'white', offset: 0 }, { color: 'purple', offset: 100 }],
    type: 'Radial'
};

const tankGradientColor: GradientModel | LinearGradientModel | RadialGradientModel = {
    cx: 50, cy: 50, fx: 25, fy: 25, r: 50,
    stops: [{ color: 'white', offset: 0 }, { color: '#76b5c5', offset: 100 }],
    type: 'Radial'
};

const storagetankGradientColor: GradientModel | LinearGradientModel | RadialGradientModel = {
    cx: 50, cy: 50, fx: 50, fy: 50, r: 80,
    stops: [{ color: 'white', offset: 0 }, { color: '#CECECE', offset: 100 }],
    type: 'Radial'
};

// Main function to initialize the pipeline diagram
function initPipelineDiagram(): { nodes: NodeModel[], connectors: ConnectorModel[] } {
    const nodes: NodeModel[] = [
        {
            id: 'Chemical', offsetX: 720, offsetY: 20, 
            annotations: [{ content: 'Chemical Reactor System P&ID', style: { fontSize: 18, bold: true } }],
            shape: { type: 'Text' },
            constraints: NodeConstraints.Default & ~NodeConstraints.Select
        },
        {
            id: 'tank1Top', offsetX: 200, offsetY: 225, height: 50, width: 100,
            shape: { type: 'Basic', shape: 'Ellipse' },
            style: { gradient: tank1RadialGradient },
            constraints: NodeConstraints.Default & ~NodeConstraints.Select
        },
        {
            id: 'tank1Bottom', offsetX: 200, offsetY: 375, height: 50, width: 100,
            shape: { type: 'Basic', shape: 'Ellipse' },
            style: { gradient: tank1RadialGradient }
        },
        {
            id: 'tank1container', offsetX: 200, offsetY: 300, height: 150, width: 100,
            shape: { type: 'Basic', shape: 'Rectangle' },
            style: { gradient: tank1RadialGradient },
            annotations: [{ content: 'Tank1', style: { color: 'black' } }]
        },
        {
            id: 'Tank1Group',
            children: ['tank1Top', 'tank1Bottom', 'tank1container'],
            style: { fill: 'transparent', strokeColor: 'transparent', strokeWidth: 0 }
        },
        {
            id: 'tank2Top', offsetX: 370, offsetY: 225, height: 50, width: 100,
            shape: { type: 'Basic', shape: 'Ellipse' },
            style: { gradient: tank2RadialGradient }
        },
        {
            id: 'tank2Bottom', offsetX: 370, offsetY: 375, height: 50, width: 100,
            shape: { type: 'Basic', shape: 'Ellipse' },
            style: { gradient: tank2RadialGradient }
        },
        {
            id: 'tank2container', offsetX: 370, offsetY: 300, height: 150, width: 100,
            shape: { type: 'Basic', shape: 'Rectangle' },
            style: { gradient: tank2RadialGradient },
            annotations: [{ content: 'Tank2', style: { color: 'black' } }]
        },
        {
            id: 'Tank2Group',
            children: ['tank2Top', 'tank2Bottom', 'tank2container'],
            style: { fill: 'transparent', strokeColor: 'transparent', strokeWidth: 0 }
        },
        {
            id: 'tank3Top', offsetX: 750, offsetY: 325, height: 70, width: 170,
            shape: { type: 'Basic', shape: 'Ellipse' },
            style: { gradient: tankGradientColor }
        },
        {
            id: 'tank3Bottom', offsetX: 750, offsetY: 575, height: 70, width: 170,
            shape: { type: 'Basic', shape: 'Ellipse' },
            style: { gradient: tankGradientColor }
        },
        {
            id: 'reacterInletThread1', offsetX: 810, offsetY: 290, 
            shape: { type: 'Flow', shape: 'Data' }, height: 25, width: 35,
            rotateAngle: 10, style: { fill: '#469A22' }
        },
        {
            id: 'reacterInletThread2', offsetX: 750, offsetY: 278, 
            shape: { type: 'Basic', shape: 'Rectangle' }, height: 25, width: 15,
            style: { fill: '#656764' }
        },
        {
            id: 'reacterInletThread3', offsetX: 750, offsetY: 268, 
            shape: { type: 'Basic', shape: 'Rectangle' }, height: 10, width: 25,
            style: { fill: '#656764' }
        },
        {
            id: 'pressureGuageNode', offsetX: 600, offsetY: 130, style: { fill: 'green' }, height: 70, width: 70,
            shape: {
                type: 'HTML',
                content: `<div class="pressure-container" style="width:100%;height:100%">
                    <div class="pressure-indicator">
                        <div class="pressure-gauge">
                            <div class="needle" id="needle"></div>
                        </div>
                        <div class="pressure-value" id="pressureValue"> 0 PSI</div>
                    </div>
                </div>`
            }
        },
        {
            id: 'pumpBase', offsetX: 750, offsetY: 110,
            shape: { type: 'Flow', shape: 'SequentialAccessStorage' }, height: 100, width: 100,
            rotateAngle: 90, flip: FlipDirection.Vertical, style: { fill: '#E2EAF4' }
        },
        {
            id: 'pumpBody', offsetX: 750, offsetY: 110,
            shape: { type: 'Flow', shape: 'SequentialAccessStorage' }, height: 90, width: 90,
            rotateAngle: 90, style: { fill: '#E2EAF4' }
        },
        {
            id: 'pumpRotator', offsetX: 750, offsetY: 110, height: 50, width: 50,
            shape: {
                type: 'HTML',
                content: `<div style="display:flex;left: -25px;position: absolute;">
                    <div class="pump-container">
                        <div class="pump-body"></div>
                        <div class="fan-blades" id="fan">
                            <div class="blade"></div>
                            <div class="blade"></div>
                            <div class="hub"></div>
                        </div>
                    </div>
                    <div id="pumpCheckBoxContainer">
                        <input id="pumpCheckBox" type="checkbox"/>
                    </div>
                </div>`
            }
        },
        {
            id: 'pumpGroup', 
            children: ['pumpBase', 'pumpBody', 'pumpRotator'],
            style: { fill: 'transparent', strokeColor: 'transparent', strokeWidth: 0 }
        },
        {
            id: 'tank3container', offsetX: 750, offsetY: 450, height: 250, width: 170,
            shape: { type: 'Basic', shape: 'Rectangle' },
            style: { gradient: tankGradientColor },
            annotations: [{ content: 'STIRRED TANK \nREACTOR (STR)', style: { color: 'black', fontSize: 20, bold: true, italic: true } }]
        },
        {
            id: 'tank3cooler', offsetX: 750, offsetY: 490, height: 250, width: 185,
            shape: { type: 'Basic', shape: 'Rectangle', cornerRadius: 50 },
            style: { fill: "#3D58B0" }
        },
        {
            id: 'Tank3Group',
            children: ['tank3cooler', 'tank3Top', 'tank3Bottom', 'tank3container'],
            style: { fill: 'transparent', strokeColor: 'transparent', strokeWidth: 0 }
        },
        {
            id: 'coolantcontroller', offsetX: 500, offsetY: 650, height: 70, width: 150,
            annotations: [{
                content: 'Coolant Controller',
                style: { color: 'Orange', fontSize: 15, italic: true, bold: true },
                offset: { x: 0.5, y: 0.8 }
            }],
            shape: { type: 'Flow', shape: 'Card' },
            style: { fill: "#656874" }
        },
        {
            id: 'coolantValue', offsetX: 500, offsetY: 650, height: 60, width: 100,
            shape: {
                type: 'HTML',
                content: `<div><input id="numeric" type="text"/></div>`
            },
            style: { fill: "#656874" }
        },
        {
            id: 'thermometerNode', offsetX: 920, offsetY: 600, height: 100, width: 100,
            shape: {
                type: 'HTML',
                content: `<div style="width:100%;height:100%"><div id="thermometer"></div></div>`
            },
            style: { fill: "#656874" }
        },
        {
            id: 'controlvalve1', offsetX: 450, offsetY: 100, 
            shape: { type: 'Flow', shape: 'Process' }, height: 20, width: 10,
            style: { fill: '#65B091' }
        },
        {
            id: 'controlvalve2', offsetX: 420, offsetY: 115, 
            shape: { type: 'Flow', shape: 'Process' }, height: 25, width: 10,
            style: { fill: '#65B091' }
        },
        {
            id: 'controlvalve3', offsetX: 450, offsetY: 115, 
            shape: { type: 'Flow', shape: 'Process' }, height: 20, width: 50,
            style: { fill: '#65B091' }
        },
        {
            id: 'controlvalve4', offsetX: 480, offsetY: 115, 
            shape: { type: 'Flow', shape: 'Process' }, height: 25, width: 10,
            style: { fill: '#65B091' }
        },
        {
            id: 'controlvalve5', offsetX: 450, offsetY: 90, 
            shape: { type: 'Basic', shape: 'Ellipse' }, height: 5, width: 35,
            style: { fill: '#65B091' }
        },
        {
            id: 'controlvalveBox1', offsetX: 450, offsetY: 115, height: 15, width: 35,
            shape: {
                type: 'HTML',
                content: `<div style="height:100%;width:100%">
                    <div id="showFlowContainer1" style="background:#ffb734;height:100%;width:100%;border-radius: 3px;border:1px solid">
                    </div>
                    <div class="switch-container">
                        <div id="switch-buttons1">
                        </div>
                    </div>
                </div>`
            },
            style: { fill: '#65B091' }
        },
        {
            id: 'controlValveGroup1',
            children: ['controlvalve1', 'controlvalve2', 'controlvalve3', 'controlvalve4', 'controlvalve5', 'controlvalveBox1'],
            offsetX: 270, offsetY: 500,
            style: { fill: 'transparent', strokeColor: 'transparent', strokeWidth: 0 }
        },
        {
            id: 'controlvalve6', offsetX: 450, offsetY: 100, 
            shape: { type: 'Flow', shape: 'Process' }, height: 20, width: 10,
            style: { fill: '#65B091' }
        },
        {
            id: 'controlvalve7', offsetX: 420, offsetY: 115, 
            shape: { type: 'Flow', shape: 'Process' }, height: 25, width: 10,
            style: { fill: '#65B091' }
        },
        {
            id: 'controlvalve8', offsetX: 450, offsetY: 115, 
            shape: { type: 'Flow', shape: 'Process' }, height: 20, width: 50,
            style: { fill: '#65B091' }
        },
        {
            id: 'controlvalve9', offsetX: 480, offsetY: 115, 
            shape: { type: 'Flow', shape: 'Process' }, height: 25, width: 10,
            style: { fill: '#65B091' }
        },
        {
            id: 'controlvalve10', offsetX: 450, offsetY: 90, 
            shape: { type: 'Basic', shape: 'Ellipse' }, height: 5, width: 35,
            style: { fill: '#65B091' }
        },
        {
            id: 'controlvalveBox2', offsetX: 450, offsetY: 115, height: 15, width: 35,
            shape: {
                type: 'HTML',
                content: `<div style="height:100%;width:100%">
                   <div id="showFlowContainer2" style="background:#7C099C;height:100%;width:100%;border-radius: 3px;border:1px solid">
                   </div>
                   <div class="switch-container">
                        <div id="switch-buttons2">  </div>
                   </div>
               </div>`
            },
            style: { fill: '#65B091' }
        },
        {
            id: 'controlValveGroup2',
            children: ['controlvalve6', 'controlvalve7', 'controlvalve8', 'controlvalve9', 'controlvalve10', 'controlvalveBox2'],
            offsetX: 450, offsetY: 130,
            style: { fill: 'transparent', strokeColor: 'transparent', strokeWidth: 0 }
        },
        {
            id: 'reacterOutletThread1', offsetX: 855, offsetY: 407.5, 
            shape: { type: 'Basic', shape: 'Rectangle' }, height: 25, width: 15,
            style: { fill: '#C9B100' }
        },
        {
            id: 'reacterOutletThread2', offsetX: 845, offsetY: 407.5, 
            shape: { type: 'Basic', shape: 'Rectangle' }, height: 35, width: 25,
            style: { fill: '#C9B100' }
        },
        {
            id: 'controlvalve11', offsetX: 450, offsetY: 100, 
            shape: { type: 'Flow', shape: 'Process' }, height: 20, width: 10,
            style: { fill: '#65B091' }
        },
        {
            id: 'controlvalve12', offsetX: 420, offsetY: 115, 
            shape: { type: 'Flow', shape: 'Process' }, height: 25, width: 10,
            style: { fill: '#65B091' }
        },
        {
            id: 'controlvalve13', offsetX: 450, offsetY: 115, 
            shape: { type: 'Flow', shape: 'Process' }, height: 20, width: 50,
            style: { fill: '#65B091' }
        },
        {
            id: 'controlvalve14', offsetX: 480, offsetY: 115, 
            shape: { type: 'Flow', shape: 'Process' }, height: 25, width: 10,
            style: { fill: '#65B091' }
        },
        {
            id: 'controlvalve15', offsetX: 450, offsetY: 90, 
            shape: { type: 'Basic', shape: 'Ellipse' }, height: 5, width: 35,
            style: { fill: '#65B091' }
        },
        {
            id: 'controlvalveBox3', offsetX: 450, offsetY: 115, height: 15, width: 35,
            shape: {
                type: 'HTML',
                content: `<div style="height:100%;width:100%">
                   <div id="showFlowContainer3" style="background:red;height:100%;width:100%;border-radius: 3px;border:1px solid">
                   </div>
                   <div class="switch-container"> 
                        <div id="switch-buttons3">
                        </div>
                   </div>
               </div>`
            },
            style: { fill: '#65B091' }
        },
        {
            id: 'controlValveGroup3',
            children: ['controlvalve11', 'controlvalve12', 'controlvalve13', 'controlvalve14', 'controlvalve15', 'controlvalveBox3'],
            offsetX: 970, offsetY: 400,
            style: { fill: 'transparent', strokeColor: 'transparent', strokeWidth: 0 }
        },
        {
            id: 'mixer1', shape: { type: 'Basic', shape: 'Octagon' },
            offsetX: 550, offsetY: 230, height: 70, width: 70,
            annotations: [{ content: 'Mixer' }],
            style: {
                gradient: {
                    cx: 50, cy: 50, fx: 25, fy: 25, r: 50,
                    stops: [{ color: 'white', offset: 0 }, { color: '#415086', offset: 100 }],
                    type: 'Radial'
                }
            }
        },
        {
            id: 'temperatureAlarm', offsetX: 680, offsetY: 292, height: 30, width: 30,
            annotations: [{ content: "TA", rotationReference: 'Page', style: { bold: true } }],
            shape: { type: 'Flow', shape: 'DirectData' }, rotateAngle: 245,
            style: {
                gradient: {
                    cx: 50, cy: 50, fx: 25, fy: 25, r: 50,
                    stops: [{ color: 'white', offset: 0 }, { color: '#EA8257', offset: 100 }],
                    type: 'Radial'
                }
            }
        },
        {
            id: 'leveltransmitter', offsetX: 800, offsetY: 350, height: 30, width: 50,
            shape: { type: 'Flow', shape: 'Process' }, style: { fill: '#79247D' },
            annotations: [{ content: '54 L', style: { color: 'gold', bold: true } }]
        },
        {
            id: 'productInletThread1', offsetX: 1200, offsetY: 500, 
            shape: { type: 'Basic', shape: 'Rectangle' }, height: 10, width: 30,
            style: { fill: '#D47A39' }
        },
        {
            id: 'ProductTank', offsetX: 1200, offsetY: 600, height: 200, width: 200,
            shape: { type: 'Flow', shape: 'PreDefinedProcess' },
            style: { gradient: storagetankGradientColor },
            annotations: [
                { content: "Storage", offset: { x: 0.5, y: 0.1 } },
                { content: 'Tank', offset: { x: 0.5, y: 0.9 } }
            ]
        },
        {
            id: 'ProductTankQuantity', offsetX: 1200, offsetY: 600, height: 130, width: 100,
            shape: {
                type: "HTML",
                content: `<div class="product-container"><div class="product" id="productStorage"></div></div>`
            }
        },
        {
            id: 'pressureguage', offsetX: 1000, offsetY: 115, height: 10, width: 10,
            shape: {
                type: 'HTML',
                content: `<div style:"height:50px;width:50px"><div id="gauge1"></div></div>`
            },
            style: { fill: '#65B091' }
        }
    ];

    const connectors: ConnectorModel[] = [
        {
            id: 'Connector1', sourceID: 'Tank1Group', targetID: 'controlvalve2', 
            sourcePortID: "bottomPort", targetPortID: "inletLeftPort",
            style: { strokeColor: 'orange', strokeDashArray: '5,5' },
            addInfo: { animate: true }
        },
        {
            id: 'Connector2', sourceID: 'Tank2Group', targetID: 'controlvalve7', 
            sourcePortID: "topPort", targetPortID: "inletLeftPort",
            style: { strokeColor: '#7C099C' },
            addInfo: { animate: true }
        },
        {
            id: 'Connector3', sourceID: 'controlvalve4', targetID: 'mixer1',
            sourcePortID: "outletRightPort", targetPortID: "bottomPort", 
            style: { strokeColor: 'orange' },
            addInfo: { animate: true }
        },
        {
            id: 'Connector4', sourceID: 'controlvalve9', targetID: 'mixer1',
            sourcePortID: "outletRightPort", targetPortID: "topPort", 
            style: { strokeColor: '#7C099C' }, 
            addInfo: { animate: true }
        },
        {
            id: 'Connector5', sourceID: 'coolantcontroller', targetID: 'tank3cooler',
            sourcePortID: "outletRightPort", targetPortID: "inletLeftPort",
            style: { strokeColor: 'blue' }
        },
        {
            id: 'Connector6', sourceID: 'coolantcontroller', targetID: 'tank3cooler',
            sourcePortID: "inletLeftPort", targetPortID: "bottomPort",
            style: { strokeColor: '#d6185bff' }
        },
        {
            id: 'Connector9', sourceID: 'reacterOutletThread1', targetID: 'controlvalve12',
            sourcePortID: "outletRightPort", targetPortID: "inletLeftPort",
            style: { strokeColor: 'red' }, 
            addInfo: { animate: true }
        },
        {
            id: 'Connector10', sourceID: 'controlvalve14', targetID: 'productInletThread1',
            sourcePortID: "outletRightPort", targetPortID: "topPort",
            style: { strokeColor: 'red' }, 
            addInfo: { animate: true }
        },
        {
            id: 'Connector11', sourceID: 'mixer1', targetID: 'pumpBase', 
            sourcePortID: "outletRightPort", targetPortID: "pumpPort1",
            style: { strokeColor: '#8DC276' },
            addInfo: { animate: true }
        },
        {
            id: 'Connector12', sourceID: 'pumpBase', targetID: 'reacterInletThread1', 
            sourcePortID: "pumpPort2", targetPortID: "topPort", 
            style: { strokeColor: '#8DC276' },
            addInfo: { animate: true }
        },
        {
            id: 'Connector13', sourceID: 'mixer1', targetID: 'pressureGuageNode', 
            sourcePortID: "mixertopressureport", targetPortID: "pressuretomixerport",
            style: { strokeColor: 'black', strokeWidth: 1, strokeDashArray: '5,1' }
        },
        {
            id: 'Connector14', sourceID: 'Tank3Group', targetID: 'thermometerNode', 
            sourcePortID: "tankport10", targetPortID: "thermoPort",
            style: { strokeColor: 'black', strokeWidth: 1, strokeDashArray: '5,1' }
        }
    ];

    return { nodes, connectors };
}

// Function to set default values for nodes in the diagram
function getNodeDefaults(node: NodeModel): NodeModel {
    node.ports = getPorts(node.id as string);
    node.constraints = (NodeConstraints.Default | NodeConstraints.ReadOnly) & ~NodeConstraints.Select;
    node.addInfo = { valve: true };
    return node;
}

// Function to get ports based on node ID
function getPorts(nodeId: string): PointPortModel[] {
    let ports: any = [];
    if (nodeId !== "controlvalveBox1") {
        const stacticPorts = [
            { id: 'inletLeftPort', offset: { x: 0, y: 0.5 }, visibility: PortVisibility.Hidden },
            { id: 'outletRightPort', offset: { x: 1, y: 0.5 }, visibility: PortVisibility.Hidden },
            { id: 'topPort', offset: { x: 0.5, y: 0 }, visibility: PortVisibility.Hidden },
            { id: 'bottomPort', offset: { x: 0.5, y: 1 }, visibility: PortVisibility.Hidden }
        ];
        ports = stacticPorts;
        if (nodeId === "tank1") {
            ports.push(
                { id: 'tankPort1', offset: { x: 1, y: 0.2 }, visibility: PortVisibility.Visible },
                { id: 'tankPort2', offset: { x: 1, y: 0.8 }, visibility: PortVisibility.Visible }
            );
        } else if (nodeId === "mixer1") {
            ports.push({ id: 'mixertopressureport', offset: { x: 0.94, y: 0.1 }, visibility: PortVisibility.Hidden });
        } else if (nodeId === "pressureGuageNode") {
            ports.push({ id: 'pressuretomixerport', offset: { x: 0.7, y: 0.5 }, visibility: PortVisibility.Hidden });
        } else if (nodeId === "thermometerNode") {
            ports.push({ id: 'thermoPort', offset: { x: 0.2, y: 0.3 }, visibility: PortVisibility.Hidden });
        } else if (nodeId === "Tank3Group") {
            ports.push({ id: 'tankport10', offset: { x: 0.97, y: 0.8 }, visibility: PortVisibility.Hidden });
        } else if (nodeId === "pumpBase") {
            ports.push(
                { id: 'pumpPort1', offset: { x: 0.94, y: 0.1 }, visibility: PortVisibility.Hidden },
                { id: 'pumpPort2', offset: { x: 0.97, y: 0.95 }, visibility: PortVisibility.Hidden }
            );
        }
    }
    return ports;
}

// Function to set default values for connectors in the diagram
function getConnectorDefaults(connector: ConnectorModel): ConnectorModel {
    connector.type = 'Orthogonal';
    connector.cornerRadius = 3;
    if (connector.id === "Connector5" || connector.id === "Connector6") {
        connector.style = { strokeWidth: 5, strokeDashArray: "10,1" };
    } else {
        connector.style = { strokeWidth: 10 };
    }
    connector.targetDecorator = { shape: "None" };
    if (connector.id === "Connector13" || connector.id === "Connector14") {
        connector.style = { strokeWidth: 2, strokeDashArray: "10,1" };
        connector.type = "Straight";
    }
    return connector;
}

// Function to append HTML elements for controls
function appendHTMLElements(): void {
    appendTemperatureControl();
    setTimeout(function() {
        appendvalveControls();
    }, 10);
    addPumpCheckBox();
    appendCollantValue();
}

// Function to append valve controls
function appendvalveControls() {
    const valveButtons = ['valveButton1', 'valveButton2', 'valveButton3'];
    const switchContainers = ['switch-buttons1', 'switch-buttons2', 'switch-buttons3'];

    // Cleanup existing components
    valveButtons.forEach(function(id, index) {
        const existingInput = document.getElementById(id);
        if (existingInput) {
            const switchInstance = (existingInput as any).ej2_instances?.[0];
            if (switchInstance && switchInstance instanceof Switch) {
                switchInstance.destroy();
            }
            existingInput.remove();
        }

        const switchContainer = document.getElementById(switchContainers[index]);
        if (switchContainer) {
            while (switchContainer.firstChild) {
                switchContainer.firstChild.remove();
            }
        }
    });

    // Valve 1
    const newInput1 = document.createElement('input');
    newInput1.type = 'checkbox';
    newInput1.id = 'valveButton1';
    const container1 = document.getElementById('switch-buttons1');
    if (container1) container1.appendChild(newInput1);

    checkValve1CloseBtn = new Switch({
        checked: true,
        change: function(args: any) {
            if (isSystemLocked && args.checked) {
                isSystemLocked = false;
                inputTankOn = true;
                setTimeout(() => inputTankOn = false, 2000);
                startUpPump();
                startUpStorage();
            }
            valveStateClick1(args.checked ? 'Open' : 'Close');
        }
    });
    checkValve1CloseBtn.appendTo('#valveButton1');

    // Valve 2
    const newInput2 = document.createElement('input');
    newInput2.type = 'checkbox';
    newInput2.id = 'valveButton2';
    const container2 = document.getElementById('switch-buttons2');
    if (container2) container2.appendChild(newInput2);

    checkValve2CloseBtn = new Switch({
        checked: true,
        change: function(args: any) {
            if (isSystemLocked && args.checked) {
                isSystemLocked = false;
                inputTankOn = true;
                setTimeout(() => inputTankOn = false, 2000);
                startUpPump();
                startUpStorage();
            }
            valveStateClick2(args.checked ? 'Open' : 'Close');
        }
    });
    checkValve2CloseBtn.appendTo('#valveButton2');

    // Valve 3
    const newInput3 = document.createElement('input');
    newInput3.type = 'checkbox';
    newInput3.id = 'valveButton3';
    const container3 = document.getElementById('switch-buttons3');
    if (container3) container3.appendChild(newInput3);

    checkValve3CloseBtn = new Switch({
        checked: true,
        change: function(args: any) {
            if (!args.checked) {
                // Storage valve manually closed - shut down pump if running
                if (checkbox && checkbox.checked) {
                    checkbox.toggle(); // This will trigger shutDownPump()
                }
                shutDownStorage();
            } else {
                // Storage valve manually opened
                if (isSystemLocked || isStorageShutdown) {
                    // If system was locked, restart the entire system
                    startUpSystemFromStorage();
                } else if (pumpFlow && !isSystemLocked) {
                    // Normal operation - just start storage
                    startUpStorage();
                }
            }
            valveStateClick3(args.checked ? 'Open' : 'Close');
        }
    });
    checkValve3CloseBtn.appendTo('#valveButton3');
}

// Function to update valve state with enhanced logic
function updateValveState(flow: HTMLElement, text: string, valveNumber?: number) {
    if (!flow) return;

    if (text === "Close") {
        flow.style.background = "#e5e7eb";

        switch (flow.id) {
            case 'showFlowContainer1':
                tankFlow1 = false;
                animatePathFlow("Connector1_path", false, '#ffb734', true);
                setTimeout(function() {
                    animatePathFlow("Connector3_path", false, "#A7A2A2", true);
                }, 500);
                break;
            case 'showFlowContainer2':
                tankFlow2 = false;
                animatePathFlow("Connector2_path", false, '#7C099C', true);
                setTimeout(function() {
                    animatePathFlow("Connector4_path", false, "#A7A2A2", true);
                }, 500);
                break;
            case 'showFlowContainer3':
                tankFlow3 = false;
                animatePathFlow("Connector9_path", false, 'red', true);
                setTimeout(function() {
                    animatePathFlow("Connector10_path", false, "#A7A2A2", true);
                }, 500);
                startStorageAnimation(false);
                break;
        }

        // Check if both tank valves are closed
        if (valveNumber && valveNumber <= 2) {
            checkTankValveShutdown();
        }

    } else if (text === "Open") {
        // Check conditions for opening valves
        let canOpen = false;
        const valveNum = valveNumber || (flow.id === 'showFlowContainer1' ? 1 : 
                                       flow.id === 'showFlowContainer2' ? 2 : 3);

        if (valveNum <= 2) {
            // Tank valves can only open if pump is running and system is not locked
            canOpen = pumpFlow && !isSystemLocked && !isStorageShutdown;
        } else if (valveNum === 3) {
            // Storage valve can open if pump is running and system is not locked
            canOpen = pumpFlow && !isSystemLocked;
        }

        if (canOpen) {
            switch (flow.id) {
                case 'showFlowContainer1':
                    tankFlow1 = true;
                    flow.style.background = "#ffb734";
                    animatePathFlow("Connector1_path", true, '#ffb734');
                    setTimeout(function() { 
                        animatePathFlow("Connector3_path", true, "#ffb734"); 
                    }, 100);
                    break;
                case 'showFlowContainer2':
                    tankFlow2 = true;
                    flow.style.background = "#7C099C";
                    animatePathFlow("Connector2_path", true, '#7C099C');
                    setTimeout(function() { 
                        animatePathFlow("Connector4_path", true, "#7C099C"); 
                    }, 100);
                    break;
                case 'showFlowContainer3':
                    tankFlow3 = true;
                    flow.style.background = "red";
                    animatePathFlow("Connector9_path", true, 'red');
                    setTimeout(function() { 
                        animatePathFlow("Connector10_path", true, "red"); 
                    }, 100);
                    startStorageAnimation(true);
                    break;
            }
        }
    }
    checkFlowState();
}

// Valve control functions
function valveStateClick1(action: string) {
    const flow: HTMLElement = document.getElementById("showFlowContainer1") as HTMLElement;
    updateValveState(flow, action, 1);
}

function valveStateClick2(action: string) {
    const flow: HTMLElement = document.getElementById("showFlowContainer2") as HTMLElement;
    updateValveState(flow, action, 2);
}

function valveStateClick3(action: string) {
    const flow: HTMLElement = document.getElementById("showFlowContainer3") as HTMLElement;
    updateValveState(flow, action, 3);
}

// Function to run animations
function runAnimation() {
    addFlowAnimationClass();
    startConnectorAnimation();
    startPumpAnimation(true);
    startStorageAnimation(true);
    updatePressureAnimation(false);
}

// Function to add flow animation class
function addFlowAnimationClass() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes dashFlow {
            to { stroke-dashoffset: -15; }
        }
        .flow-animation {
            stroke-dasharray: 10, 10 !important;
            stroke-dashoffset: 0 !important;
            animation: dashFlow 1s linear infinite !important;
        }
    `;
    document.head.appendChild(style);
}

// Function to start pump animation
function startPumpAnimation(start: boolean) {
    const pumpElement = document.getElementById('fan');
    if (pumpElement) {
        if (start) {
            pumpElement.classList.add('rotate-animation');
        } else {
            pumpElement.classList.remove('rotate-animation');
        }
    }
}

// Function to start storage animation
function startStorageAnimation(on: boolean) {
    const storageElement = document.getElementById('productStorage');
    if (!storageElement) return;
    if (on) {
        storageElement.classList.remove('fill-animation', 'paused');
        void storageElement.offsetWidth;
        storageElement.classList.add('fill-animation');
    } else {
        storageElement.classList.add('paused');
    }
}

// Function to convert hex to RGB
function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
        : { r: 0, g: 0, b: 0 };
}

// Function to animate path flow - ENHANCED WITH BETTER CLEANUP
function animatePathFlow(pathId: string, animate: boolean, color?: string, slow?: boolean) {
    const dashArray = "10,5";
    const speed = 30;
    const path = document.getElementById(pathId);
    if (!path) return;

    // **FIRST: Clean up any existing intervals for this path**
    if (animationIntervals[pathId]) {
        clearInterval(animationIntervals[pathId]);
        delete animationIntervals[pathId];
    }
    if (gradualStopIntervals[pathId]) {
        clearInterval(gradualStopIntervals[pathId]);
        delete gradualStopIntervals[pathId];
    }

    if (animate) {
        let offsetAnim = 0;
        path.setAttribute("stroke", color as string);
        path.setAttribute("stroke-dasharray", dashArray);

        const intervalId = window.setInterval(function() {
            offsetAnim = (offsetAnim - 1) % 1000;
            path.setAttribute("stroke-dashoffset", offsetAnim.toString());
        }, speed);
        animationIntervals[pathId] = intervalId;
    } else {
        if (slow) {
            const currentColor = path.getAttribute('stroke') || color;
            let offsetStop = parseFloat(path.getAttribute("stroke-dashoffset") || "0");
            let step = 0;
            const steps = 30;
            const duration = 1000;
            const interval = duration / steps;
            const startColor = hexToRgb(currentColor as string);
            const endColor = hexToRgb(currentColor as string);

            gradualStopIntervals[pathId] = window.setInterval(function() {
                step++;
                offsetStop = (offsetStop - 1) % 1000;
                path.setAttribute("stroke-dashoffset", offsetStop.toString());
                const progress = step / steps;
                const r = Math.round(startColor.r + (endColor.r - startColor.r) * progress);
                const g = Math.round(startColor.g + (endColor.g - startColor.g) * progress);
                const b = Math.round(startColor.b + (endColor.b - startColor.b) * progress);
                path.setAttribute("stroke", color as string);

                if (step >= steps) {
                    // **CRITICAL: Complete cleanup when animation finishes**
                    clearInterval(gradualStopIntervals[pathId]);
                    delete gradualStopIntervals[pathId];
                    path.setAttribute("stroke", color as string); // Final color
                    path.setAttribute("stroke-dasharray", "none");
                    path.setAttribute("stroke-dashoffset", "0"); // Reset offset
                }
            }, interval);
        } else {
            // Immediate stop
            path.setAttribute("stroke", color || "black");
            path.setAttribute("stroke-dasharray", "none");
            path.setAttribute("stroke-dashoffset", "0");
        }
    }
}

// Function to start connector animation
function startConnectorAnimation() {
    const diagramConnectors = diagramInstance.connectors;
    for (let i = 0; i < diagramConnectors.length; i++) {
        const currentConnector = diagramConnectors[i];
        const sourceNode = diagramInstance.getObject(currentConnector.sourceID as string);
        if (sourceNode && (sourceNode as any).addInfo) {
            const isValveOpen = (sourceNode as any).addInfo.valve;
            if (isValveOpen && currentConnector.addInfo && ((currentConnector).addInfo as any).animate) {
                animatePathFlow(currentConnector.id + "_path", true, (currentConnector as any).style.strokeColor);
            }
        }
    }
}

// Function to append coolant value control
function appendCollantValue() {
    if (numericBox) {
        numericBox.destroy();
    }
    numericBox = new NumericTextBox({
        min: -50,
        max: 75,
        value: 12,
        step: 2,
        format: '##.##',
        change: function(args: any) {
            (gauge.axes[0] as any).pointers[0].value = 28 + args.value;
            (gauge.axes[0] as any).pointers[0].color = getColorFromTemperature(28 + args.value);
        }
    });
    numericBox.appendTo('#numeric');
}

// Function to add pump checkbox
function addPumpCheckBox() {
    if (checkbox) {
        checkbox.destroy();
    }
    checkbox = new Switch({
        checked: true,
        change: onCheckBoxChange
    });
    checkbox.appendTo('#pumpCheckBox');
}

// Function to append temperature control
function appendTemperatureControl() {
    if (gauge) {
        gauge.destroy();
    }
    gauge = new LinearGauge({
        height: "120px",
        container: {
            width: 4,
            height: 100,
            roundedCornerRadius: 5,
            type: 'Thermometer',
            border: { width: 1 }
        },
        background: 'transparent',
        axes: [{
            minimum: -20,
            maximum: 100,
            pointers: [{
                value: 40,
                height: 10,
                width: 4,
                placement: 'Center',
                offset: 0,
                markerType: 'Triangle',
                color: '#2674a5ff',
                type: 'Bar'
            }],
            line: { width: 0 },
            majorTicks: { height: 7, interval: 30 },
            minorTicks: { height: 0, interval: 5 },
            labelStyle: { font: { fontFamily: 'inherit' } }
        }],
        annotations: [{
            content: '<div style="font-size:13px;margin-left: 30px;margin-top: -50px;"> ^C </div>',
            axisIndex: 0,
            axisValue: 50,
            x: 0,
            y: 0, 
            zIndex: '1'
        }]
    });
    gauge.appendTo('#thermometer');
}

// Function to get color from temperature
function getColorFromTemperature(value: number): string {
    if (value < 30) return 'cyan';
    if (value < 60) return 'blue';
    if (value < 80) return 'orange';
    return 'red';
}

// Function to handle checkbox change - ENHANCED WITH SYSTEM LOGIC
function onCheckBoxChange(args: any) {
    if (args.checked) {
        startUpPump();
    } else {
        // Pump manually turned OFF
        shutDownPump();
    }
}

// ===== CORE SYSTEM LOGIC FUNCTIONS - FROM JS SAMPLE =====

function shutDownPump() {
    isSystemLocked = true;
    pumpFlow = false;

    // Stop pump animations
    startPumpAnimation(false);
    updatePressureAnimation(true);
    animatePathFlow("Connector11_path", false, '#A7A2A2', true);
    setTimeout(function() { 
        animatePathFlow("Connector12_path", false, "#A7A2A2", true); 
    }, 500);
    setTimeout(function() {
        if (checkValve3CloseBtn && checkValve3CloseBtn.checked) {
            checkValve3CloseBtn.toggle();
        }
    }, 600);
    setTimeout(function() { 
        // Close all valves including storage valve when pump shuts down
        if (checkValve1CloseBtn && checkValve1CloseBtn.checked) {
            checkValve1CloseBtn.toggle();
        }
        if (checkValve2CloseBtn && checkValve2CloseBtn.checked) {
            checkValve2CloseBtn.toggle();
        }
    }, 700);
}

function startUpPump() {
    isSystemLocked = false;  // Important: Reset system lock when pump starts
    isStorageShutdown = false;  // Reset storage shutdown state
    pumpFlow = true;

    // Start pump animations
    startPumpAnimation(true);
    updatePressureAnimation(false);
    animatePathFlow("Connector11_path", true, '#8DC276');
    setTimeout(function() { 
        animatePathFlow("Connector12_path", true, "#8DC276", true); 
    }, 500);
    setTimeout(function() {
        if (checkValve1CloseBtn && !checkValve1CloseBtn.checked && !inputTankOn) {
            checkValve1CloseBtn.toggle();
        }
        if (checkValve2CloseBtn && !checkValve2CloseBtn.checked && !inputTankOn) {
            checkValve2CloseBtn.toggle();
        }
    }, 600);
    setTimeout(function() {
        if (checkValve3CloseBtn && !checkValve3CloseBtn.checked) {
            checkValve3CloseBtn.toggle();
        }
        if (checkbox && !checkbox.checked) {
            checkbox.toggle();
        }
    }, 700);        
    autoStopped = false;
}

function shutDownStorage() {
    isStorageShutdown = true;
    // Stop storage animations
    animatePathFlow("Connector9_path", false, 'red', true);
    setTimeout(function() { 
        animatePathFlow("Connector10_path", false, "#A7A2A2", true); 
    }, 500);
    startStorageAnimation(false);
}

function startUpStorage() {
    isStorageShutdown = false;
    animatePathFlow("Connector9_path", true, 'red');
    setTimeout(function() { 
        animatePathFlow("Connector10_path", true, "red"); 
    }, 500);
    startStorageAnimation(true);
}

// NEW FUNCTION: Start entire system from storage valve
function startUpSystemFromStorage() {
    if (checkbox && !checkbox.checked) {
        checkbox.toggle();
    }
    if (checkValve1CloseBtn && !checkValve1CloseBtn.checked) {
        checkValve1CloseBtn.toggle();
    }
    if (checkValve2CloseBtn && !checkValve2CloseBtn.checked) {
        checkValve2CloseBtn.toggle();
    }
    animatePathFlow("Connector9_path", true, 'red');
    setTimeout(function() { 
        animatePathFlow("Connector10_path", true, "red"); 
    }, 500);
    startStorageAnimation(true);
    isSystemLocked = false;
    isStorageShutdown = false;
}

function checkTankValveShutdown() {
    // If both tank valves are manually closed, shut down entire system
    if (!tankFlow1 && !tankFlow2 && pumpFlow) {
        if (checkbox && checkbox.checked) {
            checkbox.toggle();
        }
        if (checkValve3CloseBtn && checkValve3CloseBtn.checked) {
            checkValve3CloseBtn.toggle();
        }
    }
}

// Function to check flow state
function checkFlowState() {
    if (!pumpFlow && tankFlow1 && tankFlow2) {
        autoStopped = true;
        setTimeout(function() {
            const flow1 = document.getElementById("showFlowContainer1");
            updateValveState(flow1 as any, "Close");
            const flow2 = document.getElementById("showFlowContainer2");
            updateValveState(flow2 as any, "Close");
        }, 3000);
    }
}

// Function to update pressure animation
function updatePressureAnimation(highPressureMode: boolean) {
    if (pressureInterval) {
        clearInterval(pressureInterval);
    }
    pressureInterval = setInterval(function() {
        let randomPressure: number;
        if (highPressureMode) {
            randomPressure = Math.floor(Math.random() * 16) + 90;
        } else {
            randomPressure = Math.floor(Math.random() * 21) + 20;
        }
        updatePressure(randomPressure);
    }, 2000);
}

// Function to update pressure
function updatePressure(psi: number) {
    const needle = document.getElementById('needle') as HTMLElement;
    const valueDisplay = document.getElementById('pressureValue') as HTMLElement;
    if (needle && valueDisplay) {
        psi = Math.max(0, Math.min(psi, 100));
        const angle = -90 + (psi / 100) * 90;
        needle.style.transform = `rotate(${angle}deg)`;
        valueDisplay.textContent = `${psi} PSI`;
    }
}

// PipelineInstrumentationDiagram component renders a pipeline diagram using Syncfusion's DiagramComponent.
function PipelineInstrumentationDiagram() {
    const [showDiagram, setShowDiagram] = React.useState(false);
    React.useEffect(() => {
        updateSampleSection();
        return function() {
            // Cleanup function
            if (pressureInterval) {
                clearInterval(pressureInterval);
            }
            Object.keys(animationIntervals).forEach(function(key) {
                clearInterval(animationIntervals[key]);
            });
            Object.keys(gradualStopIntervals).forEach(function(key) {
                clearInterval(gradualStopIntervals[key]);
            });
        };
    }, []);

    const pipelineModel = initPipelineDiagram();

    return (
        <div className="control-pane">
            <div className="control-section diagram-pipeline" style={{ width: "100%", opacity: showDiagram ? 1 : 0 }}>
                <style>
                    {`
                       .diagram-pipeline .product-container {
                            width: 100px;
                            height: 130px;
                            border: 2px solid #000;
                            position: relative;
                            overflow: hidden;
                        }

                        .diagram-pipeline .product {
                            background-color: red;
                            width: 100%;
                            height: 0;
                            position: absolute;
                            bottom: 0;
                            animation-fill-mode: forwards;
                        }

                        .diagram-pipeline .fill-animation {
                            animation: fillStorage 40s ease-in infinite forwards;
                            animation-play-state: running;
                        }

                        .diagram-pipeline .fill-animation.paused {
                            animation-play-state: paused;
                        }

                        @keyframes fillStorage {
                            from {
                                height: 0;
                            }
                            to {
                                height: 100%;
                            }
                        }

                        .diagram-pipeline .pump-container {
                            width: 100%;
                            height: 100%;
                            position: relative;
                            left: 25px;
                        }

                        .diagram-pipeline .pump-body {
                            width: 60px;
                            height: 60px;
                            background: radial-gradient(circle, #5c5c5c 0%, #2c2c2c 100%);
                            border-radius: 50%;
                            position: absolute;
                            top: -5px;
                            left: -5px;
                            border: 5px solid #4a4a4a;
                            box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.8);
                        }

                        .diagram-pipeline .fan-blades {
                            position: relative;
                            margin-top: 43%;
                            left: 40%;
                            transform: translate(-50%, -50%);
                            width: 60px;
                            height: 40px;
                        }

                        .diagram-pipeline .rotate-animation {
                            animation: rotateFanBlade 2s linear infinite;
                        }

                        .diagram-pipeline .blade {
                            position: absolute;
                            width: 15px;
                            height: 50px;
                            background: linear-gradient(to bottom, #bbb 0%, #888 100%);
                            top: calc(50% - 25px);
                            left: calc(50% - 7.5px);
                            border-radius: 8px;
                            transform-origin: center calc(100% - 25px);
                        }

                        .diagram-pipeline .blade:nth-child(1) {
                            transform: rotate(0deg);
                        }

                        .diagram-pipeline .blade:nth-child(2) {
                            transform: rotate(90deg);
                        }

                        .diagram-pipeline .blade:nth-child(3) {
                            transform: rotate(180deg);
                        }

                        .diagram-pipeline .blade:nth-child(4) {
                            transform: rotate(270deg);
                        }

                        .diagram-pipeline .hub {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            width: 20px;
                            height: 20px;
                            background: radial-gradient(circle, #aaa 0%, #666 100%);
                            border-radius: 50%;
                            z-index: 10;
                        }

                        @keyframes rotateFanBlade {
                            0% {
                                transform: translate(-50%, -50%) rotate(0deg);
                            }
                            100% {
                                transform: translate(-50%, -50%) rotate(360deg);
                            }
                        }

                        .diagram-pipeline .pressure-container {
                            display: flex;
                        }

                        .diagram-pipeline .pressure-indicator {
                            text-align: center;
                        }

                        .diagram-pipeline .pressure-gauge {
                            position: relative;
                            width: 70px;
                            height: 40px;
                            background: #ddd;
                            border-top-left-radius: 100px;
                            border-top-right-radius: 100px;
                            border: 1px solid black;
                            margin: auto;
                            overflow: hidden;
                        }

                        .diagram-pipeline .needle {
                            width: 4px;
                            height: 70px;
                            background: red;
                            transition: transform 0.5s ease-in-out;
                            margin-left: 33px;
                            margin-top: 5px;
                        }

                        .diagram-pipeline .pressure-value {
                            font-size: 12px;
                            margin-top: 10px;
                            margin-left: 20px;
                            color: #111827 !important;
                        }

                        .diagram-pipeline .switch-buttons {
                            display: block;
                            margin-top: 3px;
                        }

                        .diagram-pipeline .switch-container {
                            left: -10px;
                            top: 20px;
                            position: absolute;
                        }

                        .diagram-pipeline #pumpCheckBoxContainer {
                            position: relative;
                            top: 80px;
                            left: -35px;
                        }
                    `}
                </style>
                {/* Initializes and renders diagram control */}
                <DiagramComponent
                    id="diagram"
                    ref={(diagram) => (diagramInstance = diagram)}
                    width={'100%'}
                    height={'700px'}
                    nodes={pipelineModel.nodes}
                    connectors={pipelineModel.connectors}
                    tool={DiagramTools.ZoomPan}
                    snapSettings={{ constraints: SnapConstraints.None }}
                    getNodeDefaults={getNodeDefaults}
                    getConnectorDefaults={getConnectorDefaults}
                    created={() => {
                      appendHTMLElements();
                      diagramInstance.fitToPage({ canZoomOut: true });
                      // show diagram
                      setTimeout(()=>{
                          setShowDiagram(true);
                      }, 10)
                      setTimeout(function() {
                        runAnimation();
                        diagramCreated = true;
                      }, 500);
                    }}
                    load={()=>{
                            if (diagramCreated && diagramInstance) {
                              setTimeout(() => {
                                diagramInstance.fitToPage({ canZoomOut: true });
                                appendHTMLElements();
                                runAnimation();
                            });
                        }}
                      }
                >
                    <Inject services={[UndoRedo, ConnectorBridging]} />
                </DiagramComponent>
            </div>
            <div id="action-description">
                <p>
                    This sample visualizes a real-time chemical reactor system as an interactive Pipeline and Instrumentation Diagram (P&ID) using the Syncfusion<sup>®</sup> EJ2 React Diagram component, showcasing dynamic fluid flows, tank levels, pressure, and temperature.
                </p>
            </div>
            <div id="description">
                <p>
                    Users actively control valve operations and pump states to observe real-time fluid flow, tank level changes, dynamic pressure and temperature visualizations. Interactive toggles manage fluid flow between tanks, simulating operational conditions within an industrial process environment.
                </p>
                <br />
            </div>
        </div>
    );
}

export default PipelineInstrumentationDiagram;