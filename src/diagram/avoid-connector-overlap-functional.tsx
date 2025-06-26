import * as React from "react";

import {
    AvoidLineOverlapping,
    ConnectorModel,
    DiagramComponent,
    DiagramConstraints,
    DiagramTools,
    Inject, LineRouting,
    NodeModel,
    PointPortModel,
    PortVisibility,
    ShapeAnnotationModel,
    SnapConstraints,
    Snapping
} from "@syncfusion/ej2-react-diagrams";
import { updateSampleSection } from "../common/sample-base";

function create1to16Node(id: string, x: number, y: number, width: number, height: number): NodeModel {
    const node = createNode(id, x, y, width, height);
    addShape(node, 1, 16);
    addPorts(node, 1, 'in');
    addPorts(node, 16, 'out');
    addPortsLabels(node, 16, 'out');
    return node;
}

function create16to1Node(id: string, x: number, y: number, width: number, height: number): NodeModel {
    const node = createNode(id, x, y, width, height);
    addShape(node, 16, 1);
    addPorts(node, 16, 'in');
    addPorts(node, 1, 'out');
    addPortsLabels(node, 16, 'in');
    return node;
}

function create9to5Node(id: string, x: number, y: number, width: number, height: number): NodeModel {
    const leftLabels = ['A_0', 'A_1', 'A_2', 'A_3', 'B_0', 'B_1', 'B_2', 'B_3', 'Cin'];
    const rightLabels = ['S_0', 'S_1', 'S_2', 'S_3', 'Cout'];
    const node = createNode(id, x, y, width, height, '4 Bit\nRCA');
    addShape(node, 9, 5);
    addPorts(node, 9, 'in');
    addPorts(node, 5, 'out', 9);
    addPortsLabels(node, 9, 'in', leftLabels);
    addPortsLabels(node, 5, 'out', rightLabels, 9);
    return node;
}

function createInputNode(id: string, x: number, y: number, width: number, height: number, label: string): NodeModel {
    const node = createNode(id, x, y, width, height, label);
    addShape(node, 0, 1);
    addPorts(node, 1, 'out');
    const annotation = node.annotations[0];
    annotation.offset = { x: (width - 25) / (2 * width), y: 0.5 };
    return node;
}

function createOutputNode(id: string, x: number, y: number, width: number, height: number, label: string): NodeModel {
    const node = createNode(id, x, y, width, height, label);
    addShape(node, 1, 0);
    addPorts(node, 1, 'in');
    const annotation = node.annotations[0];
    annotation.offset = { x: 1 - ((width - 25) / (2 * width)), y: 0.5 };
    return node;
}

function addShape(node: NodeModel, inCount: number, outCount: number): void {
    const maxCount = Math.max(inCount, outCount);
    const rightX = outCount === 0 ? node.width : node.width - 25;
    let pathData = `M ${rightX} 0 `;
    if (outCount > 1) {
        for (let i = 1; i <= outCount; i++) {
            const portY = ((i / maxCount) - (1 / (2 * maxCount))) * node.height;
            pathData += `L ${rightX} ${portY} L ${node.width} ${portY} L ${rightX} ${portY} `;
        }
    } else if (outCount === 1) {
        pathData += `L ${rightX} ${node.height * 0.5} L ${node.width} ${node.height * 0.5} L ${rightX} ${node.height * 0.5} `;
    }

    const leftX = inCount === 0 ? 0 : 25;
    pathData += `L ${rightX} ${node.height} L ${leftX} ${node.height} `;
    if (inCount > 1) {
        for (let i = inCount; i >= 1; i--) {
            const portY = ((i / maxCount) - (1 / (2 * maxCount))) * node.height;
            pathData += `L ${leftX} ${portY} L 0 ${portY} L ${leftX} ${portY} `;
        }
    } else if (inCount === 1) {
        pathData += `L ${leftX} ${node.height * 0.5} L 0 ${node.height * 0.5} L ${leftX} ${node.height * 0.5} `;
    }

    pathData += `L ${leftX} 0 Z`;
    node.shape = { type: 'Path', data: pathData };
}

function addPorts(node: NodeModel, count: number, side: string, factor?: number): void {
    if (factor === undefined) {
        factor = count;
    }
    if (count > 1) {
        for (let i = 1; i <= count; i++) {
            const port: PointPortModel = {
                id: `${node.id}_${side}_${(i - 1)}`,
                offset: { x: side === 'out' ? 1 : 0, y: (i / factor) - (1 / (2 * factor)) },
                visibility: PortVisibility.Visible,
                shape: 'Circle',
                style: { fill: 'black' },
                width: 8,
                height: 8
            };
            node.ports.push(port);
        }
    } else {
        const port: PointPortModel = {
            id: `${node.id}_${side}_0`,
            offset: { x: side === 'out' ? 1 : 0, y: 0.5 },
            visibility: PortVisibility.Visible,
            shape: 'Circle',
            style: { fill: 'black' },
            width: 8,
            height: 8
        };
        node.ports.push(port);
    }
}

function addPortsLabels(node: NodeModel, count: number, side: string, labels?: string[], factor?: number): void {
    if (factor === undefined) {
        factor = count;
    }
    const x = side === 'out' ? (node.width - 25 * 0.5) / node.width : (25 * 0.5) / node.width;
    for (let i = 1; i <= count; i++) {
        const label: ShapeAnnotationModel = {
            content: labels ? labels[i - 1] : `${i - 1}`,
            offset: { x: x, y: (i / factor) - (1 / (2 * factor)) },
            style: { fontSize: 7 },
            verticalAlignment: 'Bottom',
            margin: { bottom: 2 }
        };
        node.annotations.push(label);
    }
}

function createNode(id: string, x: number, y: number, width: number, height: number, label?: string): NodeModel {
    const shapeStyle = { strokeColor: "black", strokeWidth: 2 };
    const diagramNode: NodeModel = {
        id: id,
        offsetX: x,
        offsetY: y,
        width: width,
        height: height,
        style: shapeStyle,
        shape: { type: 'Basic' },
        ports: [] as PointPortModel[],
        annotations: [] as ShapeAnnotationModel[]
    };
    if (label) {
        const annotation: ShapeAnnotationModel = { content: label, style: { fontSize: 14 } };
        diagramNode.annotations.push(annotation);
    }
    return diagramNode;
}

function createConnector(id: string, sourceId: string, targetId: string, sourcePortIndex: number, targetPortIndex: number,
    strokeColor: string | null = null): ConnectorModel {
    let color = strokeColor ? strokeColor : "green";
    if (color === 'lightGreen') {
        color = '#1AD81A'
    } else if (color === 'green') {
        color = '#005100'
    }
    const diagramConnector: ConnectorModel = {
        id: id,
        cornerRadius: 5,
        sourceID: sourceId,
        targetID: targetId,
        sourcePortID: sourceId + '_out_' + sourcePortIndex,
        targetPortID: targetId + '_in_' + targetPortIndex,
        type: 'Orthogonal',
        segments: [{ type: 'Orthogonal' }],
        style: { strokeColor: color, strokeWidth: 2 },
        targetDecorator: { shape: 'None' }
    };
    return diagramConnector;
}


let nodes: NodeModel[] = [
    create1to16Node('node1', 205, 180, 80, 240),
    create1to16Node('node2', 205, 427.5, 80, 240),
    create9to5Node('node3', 415, 127.5, 100, 135),
    create9to5Node('node4', 415, 367.5, 100, 135),
    create9to5Node('node5', 615, 127.5, 100, 135),
    create9to5Node('node6', 615, 367.5, 100, 135),
    create16to1Node('node7', 820, 240, 80, 240),
    createInputNode('node8', 70, 40, 80, 30, 'Cin'),
    createInputNode('node9', 70, 180, 80, 30, 'A'),
    createInputNode('node10', 70, 427.5, 80, 30, 'B'),
    createOutputNode('node11', 950, 240, 80, 30, 'S'),
    createOutputNode('node12', 950, 367.5, 80, 30, 'Cout')
];
let connectors: ConnectorModel[] = [
    createConnector('connector01', 'node8', 'node3', 0, 8, 'lightGreen'),
    createConnector('connector02', 'node9', 'node1', 0, 0, 'orange'),
    createConnector('connector03', 'node10', 'node2', 0, 0, 'orange'),
    createConnector('connector04', 'node7', 'node11', 0, 0, 'orange'),
    createConnector('connector05', 'node6', 'node12', 4, 0),
    createConnector('connector06', 'node3', 'node5', 4, 8),
    createConnector('connector07', 'node5', 'node4', 4, 8, 'lightGreen'),
    createConnector('connector08', 'node4', 'node6', 4, 8),

    createConnector('connector1', 'node1', 'node3', 0, 0),
    createConnector('connector2', 'node1', 'node3', 1, 1),
    createConnector('connector3', 'node1', 'node3', 2, 2),
    createConnector('connector4', 'node1', 'node3', 3, 3),
    createConnector('connector5', 'node1', 'node5', 4, 0, 'lightGreen'),
    createConnector('connector6', 'node1', 'node5', 5, 1),
    createConnector('connector7', 'node1', 'node5', 6, 2),
    createConnector('connector8', 'node1', 'node5', 7, 3, 'lightGreen'),
    createConnector('connector9', 'node1', 'node4', 8, 0, 'lightGreen'),
    createConnector('connector10', 'node1', 'node4', 9, 1, 'lightGreen'),
    createConnector('connector11', 'node1', 'node4', 10, 2),
    createConnector('connector12', 'node1', 'node4', 11, 3, 'lightGreen'),
    createConnector('connector13', 'node1', 'node6', 12, 0),
    createConnector('connector14', 'node1', 'node6', 13, 1, 'lightGreen'),
    createConnector('connector15', 'node1', 'node6', 14, 2, 'lightGreen'),
    createConnector('connector16', 'node1', 'node6', 15, 3),
    createConnector('connector17', 'node2', 'node3', 0, 4, 'lightGreen'),
    createConnector('connector18', 'node2', 'node3', 1, 5, 'lightGreen'),
    createConnector('connector19', 'node2', 'node3', 2, 6),
    createConnector('connector20', 'node2', 'node3', 3, 7),
    createConnector('connector21', 'node2', 'node5', 4, 4, 'lightGreen'),
    createConnector('connector22', 'node2', 'node5', 5, 5, 'lightGreen'),
    createConnector('connector23', 'node2', 'node5', 6, 6, 'lightGreen'),
    createConnector('connector24', 'node2', 'node5', 7, 7, 'lightGreen'),
    createConnector('connector25', 'node2', 'node4', 8, 4),
    createConnector('connector26', 'node2', 'node4', 9, 5, 'lightGreen'),
    createConnector('connector27', 'node2', 'node4', 10, 6),
    createConnector('connector28', 'node2', 'node4', 11, 7),
    createConnector('connector29', 'node2', 'node6', 12, 4, 'lightGreen'),
    createConnector('connector30', 'node2', 'node6', 13, 5),
    createConnector('connector31', 'node2', 'node6', 14, 6),
    createConnector('connector32', 'node2', 'node6', 15, 7),
    createConnector('connector33', 'node3', 'node7', 0, 0),
    createConnector('connector34', 'node3', 'node7', 1, 1),
    createConnector('connector35', 'node3', 'node7', 2, 2, 'lightGreen'),
    createConnector('connector36', 'node3', 'node7', 3, 3),
    createConnector('connector37', 'node5', 'node7', 0, 4),
    createConnector('connector38', 'node5', 'node7', 1, 5),
    createConnector('connector39', 'node5', 'node7', 2, 6),
    createConnector('connector40', 'node5', 'node7', 3, 7, 'lightGreen'),
    createConnector('connector41', 'node4', 'node7', 0, 8),
    createConnector('connector42', 'node4', 'node7', 1, 9),
    createConnector('connector43', 'node4', 'node7', 2, 10, 'lightGreen'),
    createConnector('connector44', 'node4', 'node7', 3, 11),
    createConnector('connector45', 'node6', 'node7', 0, 12),
    createConnector('connector46', 'node6', 'node7', 1, 13),
    createConnector('connector47', 'node6', 'node7', 2, 14),
    createConnector('connector48', 'node6', 'node7', 3, 15, 'lightGreen')
];

let diagramInstance: DiagramComponent;

function AvoidConnectorOverlapDiagram() {

    React.useEffect(() => {
        updateSampleSection();
        rendereComplete();
    }, [])
    /**
     * Adjusts the diagram view to fit the page on render completion.
     */
    function rendereComplete() {
        diagramInstance.fitToPage();
    }

    return (
        <div className="control-pane">
            <div className="control-section">
                <div  style={{ width: "100%" }}>
                    <DiagramComponent
                        id="diagram"
                        ref={diagram => (diagramInstance = diagram)}
                        width={"100%"}
                        height={"580"}
                        snapSettings={{ constraints: SnapConstraints.None }}
                        constraints={DiagramConstraints.Default | DiagramConstraints.LineRouting | DiagramConstraints.AvoidLineOverlapping}
                        nodes={nodes}
                        connectors={connectors}
                        tool={DiagramTools.ZoomPan}
                    >
                        <Inject services={[LineRouting, AvoidLineOverlapping, Snapping]}></Inject>
                    </DiagramComponent>
                </div>
            </div>
            <div id="action-description">
                <p>
                This sample visualizes the connectors that automatically adjust to minimize visual overlap, ensuring clear and distinct representations of connections within the diagram.
                </p>
            </div>
            <div id="description">
                <p>
                    This example showcases a circuit diagram created using the Syncfusion<sup>®</sup> Diagram control. It
                    demonstrates the
                    <code><a target="_blank" className="code"
                        href="https://ej2.syncfusion.com/react/documentation/diagram/constraints#diagram-constraints">AvoidLineOverlapping</a></code>
                    feature, which ensures that connectors do not visually overlap by automatically adjusting line segments for
                    better visualization of connections.
                </p>
                <br />
                <p>
                    To use this feature we need to inject the <code>AvoidLineOverlapping</code> module in our diagram project into
                    <code>services</code> and enable the <b>AvoidLineOverlapping</b> feature in the
                    <code><a target="_blank" className="code"
                        href="https://ej2.syncfusion.com/react/documentation/diagram/constraints#diagram-constraints">DiagramConstraints</a></code> property.
                </p>
            </div>
        </div>
    );
}
export default AvoidConnectorOverlapDiagram;
