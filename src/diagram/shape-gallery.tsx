import * as ReactDOM from "react-dom";
import * as React from "react";
import {
    BpmnDiagrams,
    SnapConstraints,
    DiagramComponent,
    NodeModel,
    Node,
    Diagram,
    Inject,
    DataBinding,
    FlowShapes,
    TextModel,
    ShapeModel,
    FlowShapeModel,
    NodeConstraints
} from "@syncfusion/ej2-react-diagrams";
import { SampleBase } from "../common/sample-base";

// Function to create a text node
const createTextNode = (content: string): NodeModel => ({
    shape: { type: "Text", content },
    constraints: NodeConstraints.PointerEvents,
    style: {
        fontSize: 16,
        fill: "None",
        fontFamily: "sans-serif",
        bold: true,
        strokeWidth: 0
    }
});

// Function to create a shape node
const createShapeNode = (type: string, shape: string, content: string, additionalProps?: any): NodeModel => ({
    shape: { type, shape, ...additionalProps },
    annotations: [{ content }]
});

// Basic shape models
const basicShapes: string[] = [
    "Rectangle", "Ellipse", "Triangle", "Plus", "Star", "Pentagon",
    "Heptagon", "Octagon", "Trapezoid", "Decagon", "RightTriangle", "Parallelogram"
];

const basicShapeModels: NodeModel[] = [
    createTextNode("Basic Shapes"),
    ...basicShapes.map(shape => createShapeNode("Basic", shape, shape))
];

// Flow shape models
const flowShapes: { shape: string, content: string }[] = [
    { shape: "Terminator", content: "Terminator" },
    { shape: "Process", content: "Process" },
    { shape: "Decision", content: "Decision" },
    { shape: "Document", content: "Document" },
    { shape: "PreDefinedProcess", content: "Predefined Process" },
    { shape: "PaperTap", content: "Paper Tape" },
    { shape: "DirectData", content: "Direct Data" },
    { shape: "SequentialData", content: "Sequential Data" },
    { shape: "Sort", content: "Sort" },
    { shape: "MultiDocument", content: "Multi-Document" },
    { shape: "Collate", content: "Collate" },
    { shape: "SummingJunction", content: "Summing Junction" },
    { shape: "Or", content: "Or" },
    { shape: "InternalStorage", content: "Internal Storage" },
    { shape: "Extract", content: "Extract" },
    { shape: "ManualOperation", content: "Manual Operation" },
    { shape: "Merge", content: "Merge" },
    { shape: "OffPageReference", content: "Off-Page Reference" },
    { shape: "SequentialAccessStorage", content: "Sequential Access Storage" },
    { shape: "Data", content: "Data" },
    { shape: "Card", content: "Card" }
];

const flowShapeModels: NodeModel[] = [
    createTextNode("Flow Shapes"),
    ...flowShapes.map(({ shape, content }) => createShapeNode("Flow", shape, content))
];

// BPMN shape models
const bpmnShapes: { shape: string, content: string, event?: any, activity?: any, subProcess?: any }[] = [
    { shape: "Event", content: "Start Event", event: { event: "Start", trigger: "None" } },
    { shape: "Event", content: "Intermediate Event", event: { event: "Intermediate", trigger: "None" } },
    { shape: "Event", content: "End Event", event: { event: "End", trigger: "None" } },
    { shape: "Gateway", content: "Gateway" },
    { shape: "Activity", content: "Task", activity: { activity: "Task" } },
    { shape: "Activity", content: "Transaction", activity: { activity: "SubProcess", subProcess: { type: "Transaction", transaction: { success: { visible: false }, failure: { visible: false }, cancel: { visible: false } } } } },
    { shape: "Message", content: "Message" },
    { shape: "DataObject", content: "Data Object" },
    { shape: "DataSource", content: "Data Source" },
    { shape: "Group", content: "Group" },
    { shape: "TextAnnotation", content: "Text Annotation" }
];

const bpmnShapeModels: NodeModel[] = [
    createTextNode("BPMN Shapes"),
    ...bpmnShapes.map(({ shape, content, event, activity, subProcess }) => createShapeNode("Bpmn", shape, content, { event, activity, subProcess }))
];

const allShapeModels: NodeModel[] = [
    ...basicShapeModels,
    ...flowShapeModels,
    ...bpmnShapeModels
];

let diagramInstance: DiagramComponent;

export class ShapeGallery extends SampleBase<{}, {}> {
    rendereComplete() {
        diagramInstance.fitToPage({ mode: "Height" });
    }
    render() {
        return (
            <div className="control-panel">
                <div
                    className="control-section"
                >
                    <div className="content-wrapper" style={{ width: "100%" }}>
                        <DiagramComponent
                            id="diagram"
                            ref={diagram => (diagramInstance = diagram)}
                            width={"100%"}
                            height={"800px"}
                            snapSettings={{ constraints: SnapConstraints.None }}
                            nodes={getNodes()}
                            //Defines the default node and connector properties
                            getNodeDefaults={(obj: Node, diagram: Diagram) => {
                                return obj;
                            }}
                        >
                            <Inject services={[DataBinding, BpmnDiagrams]} />
                        </DiagramComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample illustrates basic built-in shapes, such as basic shapes,
                        flow shapes, and BPMN shapes.
                    </p>
                </div>
                <div id="description">
                    <p>
                        This example shows how to define built-in shapes that are used to
                        visualize geometric information, work flow, or a business flow
                        diagrams. The <code>shape</code> property can be used to define the
                        category of built-in shapes. Additionally, the
                        <code>type</code> property of the <code>shape</code> allows you to
                        choose the type of the shape.
                    </p>
                    <p style={{ fontWeight: 500 }}>Injecting Module</p>

                    <p>
                        The diagram component’s features are segregated into individual
                        feature-wise modules. To use the BPMN shapes, inject
                        <code>BpmnDiagrams</code> module into <code>services</code>.
                    </p>
                    <br />
                </div>
            </div>
        );
    }
}

// To set default values for different types of nodes.
function getNodes() {
    const nodes = allShapeModels;
    let offsetx: number = 60;
    let offsety: number = 50;
    let count: number = 1;

    const updateFlowShapeHeight = (shapeType: FlowShapes): number => {
        switch (shapeType) {
            case 'Process':
            case 'Terminator':
            case 'Document':
            case 'DirectData':
            case 'MultiDocument':
            case 'PreDefinedProcess':
                return 30;
            case 'Decision':
                return 35;
            default:
                return 40;
        }
    };

    nodes.forEach((node: NodeModel) => {
        node.width = 40;
        node.height = 40;

        if (node.shape.type === 'Flow') {
            node.height = updateFlowShapeHeight((node.shape as FlowShapeModel).shape);
        }

        node.offsetX = offsetx;
        node.offsetY = offsety;

        if (node.shape.type !== 'Text') {
            node.annotations[0].verticalAlignment = 'Top';
            node.annotations[0].offset = { y: 1 };
            node.annotations[0].margin = { top: 8 };

            offsetx += 90;
            if (count % 10 === 0) {
                offsety += 100;
                offsetx = 60;
            }
            count++;
        } else {
            offsetx = 60;
            offsety += 50;
            count = 1;
            node.width = 150;
            node.height = 50;
            node.offsetX = 90;

            if ((node.shape as TextModel).content !== 'Basic Shapes') {
                node.offsetY = offsety + 50;
                offsety += 100;
            }
        }
    });

    return nodes;
}

export interface GalleryInfo {
    type: string;
    shape: string;
    text: string;
}
