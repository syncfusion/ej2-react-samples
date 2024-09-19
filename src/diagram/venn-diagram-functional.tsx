import * as ReactDOM from "react-dom";
import * as React from "react";
import {
    SnapConstraints,
    DiagramComponent,
    NodeModel,
    BasicShapeModel,
    DiagramTools
} from "@syncfusion/ej2-react-diagrams";
import { updateSampleSection } from "../common/sample-base";

// Basic shape configuration for nodes
const basicShape: BasicShapeModel = { type: "Basic", shape: "Ellipse" };

// Creates a node with specified properties.
function createNode(id: string, offsetX: number, offsetY: number, width: number, height: number, annotations: any[], style: any) {
    return {
        id,
        offsetX,
        offsetY,
        width,
        height,
        shape: basicShape,
        annotations,
        style
    };
}

// Styles for different node categories
const styles = {
    dataScience: { fill: "#f2f2f2", strokeColor: "#acacac", strokeWidth: 1 },
    trignometry: { fill: "#feb42f", opacity: 0.2, strokeColor: "#feb42f" },
    expertise: { fill: "#6acbd4", opacity: 0.2, strokeColor: "#6acbd4" },
    programming: { fill: "#ed1d79", opacity: 0.2, strokeColor: "#ed1d79" }
};

// Nodes initialization with specific properties
let nodes: NodeModel[] = [
    createNode("datascience", 450, 232, 400, 400, [{ content: "Data Science", offset: { x: 0.5, y: 0.1 } }], styles.dataScience),
    createNode("trignometry", 515, 205, 200, 200, [
        { content: "Trignometry", offset: { x: 0.5, y: 0.4 }, horizontalAlignment: "Left" },
        { content: "Thesis", offset: { x: 0.45, y: 0.8 } }
    ], styles.trignometry),
    createNode("expertise", 445, 290, 200, 200, [{ content: "Expertise", offset: { x: 0.5, y: 0.7 }, verticalAlignment: "Top" }], styles.expertise),
    createNode("programming", 388, 205, 200, 200, [
        { content: "Programming", offset: { x: 0.5, y: 0.4 }, horizontalAlignment: "Right" },
        { content: "Assembly", offset: { x: 0.7, y: 0.35 }, horizontalAlignment: "Left" },
        { content: "Horizon", offset: { x: 0.7, y: 0.6 }, horizontalAlignment: "Left" },
        { content: "Middleware", offset: { x: 0.5, y: 0.8 } }
    ], styles.programming)
];

let diagramInstance: DiagramComponent;

function VennDiagram() {
    React.useEffect(() => {
        updateSampleSection();
        rendereComplete();
    }, [])

    // Adjusts the diagram view to fit the page
    function rendereComplete() {
        diagramInstance.fitToPage();
    }

    return (
        <div className="control-pane">
            <div className="control-section">
                <div className="content-wrapper" style={{ width: "100%" }}>
                    <DiagramComponent
                        id="diagram"
                        ref={diagram => (diagramInstance = diagram)}
                        width={"100%"}
                        height={"580"}
                        nodes={nodes}
                        snapSettings={{ constraints: SnapConstraints.None }}
                        tool={DiagramTools.ZoomPan}
                    />
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample visualizes classifications of data science using Venn
                    diagrams. Diagram nodes and annotations are used to define Venn
                    diagrams. Read only mode is enabled in this example.
                </p>
            </div>
            <div id="description">
                <p>
                    This example shows how to create a Venn diagram using diagram
                    control. In this example, zoom and pan options are enabled. The{" "}
                    <code>tool</code> property of the diagram control allows you to
                    enable/disable zoom and pan options.
                </p>
                <br />
            </div>
        </div>
    );
}
export default VennDiagram;
