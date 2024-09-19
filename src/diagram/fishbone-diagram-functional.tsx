// Import React and necessary components from Syncfusion's EJ2 React Diagrams library for building the Fishbone diagram.
import * as React from "react";
import {
    HierarchicalTree,
    DataBinding,
    DiagramComponent,
    NodeModel,
    ConnectorModel,
    Connector,
    SnapConstraints,
    DecoratorModel,
    Inject,
    DiagramTools
} from "@syncfusion/ej2-react-diagrams";
import { updateSampleSection } from "../common/sample-base";

// Creates a node with specified properties
const createNode = (id: string, height: number, width: number, offsetX: number, offsetY: number, content: string): NodeModel => ({
    id,
    height,
    width,
    offsetX,
    offsetY,
    annotations: [{ content: content, style: { color: 'white' } }],
    shape: { type: 'Path', data: 'M 10 0 L 166 0 L 156 44 L 0 44 z' },
    style: { fill: '#39AFA9', strokeColor: 'black' }
});

// Creates an ellipse node with specified properties
const createEllipseNode = (id: string, height: number, width: number, offsetX: number, offsetY: number, content: string = "", fill: string = "white", strokeColor = '#A52A2A'): NodeModel => ({
    id,
    width,
    height,
    offsetX,
    offsetY,
    annotations: [{ content: content, style: { color: 'white' } }],
    shape: { type: 'Basic', shape: 'Ellipse' },
    style: { fill: fill, strokeColor: strokeColor }
});

// Creates a text node with specified properties
const createTextNode = (id: string, height: number, width: number, offsetX: number, offsetY: number, content: string): NodeModel => ({
    id,
    width,
    height,
    offsetX,
    offsetY,
    style: { fill: 'transparent', strokeWidth: 0 },
    shape: { type: 'Text', content: content }
});

// Initializes nodes representing key elements in a Fishbone diagram, such as causes and sub-causes
let nodes: NodeModel[] = [
    createNode('Equipment', 40, 120, 300, 80, 'Equipment'),
    createNode('Environment', 40, 120, 450, 80, 'Environment'),
    createNode('Person', 40, 120, 600, 80, 'Person'),
    createNode('Materials', 40, 120, 300, 600, 'Materials'),
    createNode('Machine', 40, 120, 450, 600, 'Machine'),
    createNode('Methods', 40, 120, 600, 600, 'Methods'),
    createEllipseNode('ellipse1', 20, 20, 290, 130),
    createEllipseNode('ellipse2', 20, 20, 323, 183),
    createEllipseNode('ellipse3', 20, 20, 354, 237),
    createEllipseNode('ellipse4', 20, 20, 440, 130),
    createEllipseNode('ellipse5', 20, 20, 470, 182),
    createEllipseNode('ellipse6', 20, 20, 590, 130),
    createEllipseNode('ellipse7', 20, 20, 622, 179),
    createEllipseNode('ellipse8', 20, 20, 660, 221),
    createEllipseNode('ellipse9', 20, 20, 694, 264),
    createEllipseNode('ellipse10', 20, 20, 354, 460),
    createEllipseNode('ellipse11', 20, 20, 590, 530),
    createEllipseNode('ellipse12', 20, 20, 660, 460),
    createEllipseNode('ellipse13', 20, 20, 440, 530),
    createEllipseNode('ellipse14', 20, 20, 510, 460),
    createEllipseNode('ellipse15', 20, 20, 290, 530),
    createEllipseNode('Colorellipse1', 50, 50, 717, 310),
    createEllipseNode('Colorellipse2', 50, 50, 560, 310),
    createEllipseNode('Colorellipse3', 50, 50, 390, 310),
    createEllipseNode('Colorellipse4', 50, 50, 220, 310),
    createEllipseNode('Colorellipse5', 90, 140, 900, 310, 'Productivity Increase', "#39AFA9", 'black'),
    createTextNode('TextPrograms', 20, 90, 189, 130, 'Text Programs'),
    createTextNode('VentilatorsSound', 20, 120, 359, 130, 'Ventilators Sound'),
    createTextNode('Education', 20, 70, 500, 130, 'Education'),
    createTextNode('DataBooks', 20, 70, 213, 183, 'DataBooks'),
    createTextNode('Fixtures', 20, 70, 240, 237, 'Fixtures'),
    createTextNode('Noise', 20, 70, 390, 182, 'Noise'),
    createTextNode('Motivation', 20, 70, 535, 182, 'Motivation'),
    createTextNode('Tiredness', 20, 70, 565, 224, 'Tiredness'),
    createTextNode('Storer', 20, 70, 606, 264, 'Storer'),
    createTextNode('Computer', 20, 70, 260, 460, 'Computer'),
    createTextNode('Quality', 20, 120, 417, 460, 'Quality of Element'),
    createTextNode('Order', 20, 70, 562, 460, 'Order'),
    createTextNode('Software', 20, 70, 225, 530, 'Software'),
    createTextNode('Procurement', 20, 70, 358, 530, 'Procurement'),
    createTextNode('Standardization', 20, 90, 501, 530, 'Standardization'),

];

// Creates a connector model with customizable style and annotations.
const createConnector = (
    id: string, lineDashArray: string, source: string, target: string, strokeColor: string): ConnectorModel => ({
        id: id,
        sourceID: source,
        targetID: target,
        style: {
            strokeColor: strokeColor,
            strokeWidth: 2,
            strokeDashArray: lineDashArray,
        }
    });

// Initializes connectors to define relationships between elements in the Fishbone diagram.
let connectors: ConnectorModel[] = [
    createConnector('connector01', '5,5', 'Equipment', 'ellipse1', '#A52A2A'),
    createConnector('connector02', '5,5', 'ellipse1', 'ellipse2', '#A52A2A'),
    createConnector('connector03', '5,5', 'ellipse2', 'ellipse3', '#A52A2A'),
    createConnector('connector04', '5,5', 'ellipse3', 'Colorellipse3', '#A52A2A'),
    createConnector('connector05', '5,5', 'Environment', 'ellipse4', '#A52A2A'),
    createConnector('connector06', '5,5', 'ellipse4', 'ellipse5', '#A52A2A'),
    createConnector('connector07', '5,5', 'ellipse4', 'ellipse5', '#A52A2A'),
    createConnector('connector08', '5,5', 'ellipse5', 'Colorellipse2', '#A52A2A'),
    createConnector('connector09', '5,5', 'Person', 'ellipse6', '#A52A2A'),
    createConnector('connector10', '5,5', 'ellipse6', 'ellipse7', '#A52A2A'),
    createConnector('connector11', '5,5', 'ellipse7', 'ellipse8', '#A52A2A'),
    createConnector('connector12', '5,5', 'ellipse8', 'ellipse9', '#A52A2A'),
    createConnector('connector13', '5,5', 'ellipse9', 'Colorellipse1', '#A52A2A'),
    createConnector('connector14', '5,5', 'Materials', 'ellipse15', '#A52A2A'),
    createConnector('connector15', '5,5', 'ellipse15', 'ellipse10', '#A52A2A'),
    createConnector('connector16', '5,5', 'ellipse10', 'Colorellipse3', '#A52A2A'),
    createConnector('connector17', '5,5', 'Machine', 'ellipse13', '#A52A2A'),
    createConnector('connector18', '5,5', 'ellipse13', 'ellipse14', '#A52A2A'),
    createConnector('connector19', '5,5', 'ellipse14', 'Colorellipse2', '#A52A2A'),
    createConnector('connector20', '5,5', 'Methods', 'ellipse11', '#A52A2A'),
    createConnector('connector21', '5,5', 'ellipse11', 'ellipse12', '#A52A2A'),
    createConnector('connector22', '5,5', 'ellipse12', 'Colorellipse1', '#A52A2A'),
    createConnector('connector23', '', 'Colorellipse4', 'Colorellipse3', '#000000'),
    createConnector('connector24', '', 'Colorellipse3', 'Colorellipse2', '#000000'),
    createConnector('connector25', '', 'Colorellipse2', 'Colorellipse1', '#000000'),
    createConnector('connector26', '', 'Colorellipse1', 'Colorellipse5', '#000000'),
    createConnector('connector27', '5,5', 'TextPrograms', 'ellipse1', '#A52A2A'),
    createConnector('connector28', '5,5', 'DataBooks', 'ellipse2', '#A52A2A'),
    createConnector('connector29', '5,5', 'Fixtures', 'ellipse3', '#A52A2A'),
    createConnector('connector30', '5,5', 'VentilatorsSound', 'ellipse4', '#A52A2A'),
    createConnector('connector31', '5,5', 'Noise', 'ellipse5', '#A52A2A'),
    createConnector('connector32', '5,5', 'Education', 'ellipse6', '#A52A2A'),
    createConnector('connector33', '5,5', 'Motivation', 'ellipse7', '#A52A2A'),
    createConnector('connector34', '5,5', 'Tiredness', 'ellipse8', '#A52A2A'),
    createConnector('connector35', '5,5', 'Storer', 'ellipse9', '#A52A2A'),
    createConnector('connector36', '5,5', 'Software', 'ellipse15', '#A52A2A'),
    createConnector('connector37', '5,5', 'Computer', 'ellipse10', '#A52A2A'),
    createConnector('connector38', '5,5', 'Procurement', 'ellipse13', '#A52A2A'),
    createConnector('connector39', '5,5', 'Quality', 'ellipse14', '#A52A2A'),
    createConnector('connector40', '5,5', 'Order', 'ellipse12', '#A52A2A'),
    createConnector('connector41', '5,5', 'Standardization', 'ellipse11', '#A52A2A')
];

// Define a variable to hold an instance of the DiagramComponent
let diagramInstance: DiagramComponent;

// Define the function FishBone
function Fishbone() {
    React.useEffect(() => {
        // Call functions to update sample section and render completion
        updateSampleSection();
        renderComplete();
    }, [])

    // Adjusts the diagram view to fit the width of the page after rendering is complete.
    function renderComplete() {
        diagramInstance.fitToPage({ mode: 'Width' });
    }

    // Renders the Fishbone diagram component with predefined settings.
    return (
        <div className="control-pane">
            <div className="control-section">
                <div style={{ width: "100%" }}>
                    {/* Initializes the DiagramComponent for the Fishbone diagram. */}
                    <DiagramComponent
                        id="diagram"
                        ref={diagram => (diagramInstance = diagram)}
                        width={"100%"}
                        height={"700px"}
                        snapSettings={{ constraints: SnapConstraints.None }}
                        nodes={nodes}
                        connectors={connectors}
                        // Sets default properties for connectors.
                        getConnectorDefaults={(connector: Connector) => {
                            connector.targetDecorator = { shape: 'Arrow', width: 5, height: 5 } as DecoratorModel;
                            // Customizes target decorator style for specific connectors.
                            if (connector.id !== 'connector23' && connector.id !== 'connector24' &&
                                connector.id !== 'connector25' && connector.id !== 'connector26') {
                                connector.targetDecorator.style = { strokeColor: '#A52A2A', fill: '#A52A2A' };
                            }
                        }}
                        tool={DiagramTools.ZoomPan}
                    >
                        <Inject services={[DataBinding, HierarchicalTree]} />
                    </DiagramComponent>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample visually represents a simple fishbone diagram (Ishikawa).
                    Diagram nodes and annotations are used to define fishbone diagrams. Read-only mode is enabled here.
                </p>
            </div>
            <div id="description">
                <p>
                    This sample shows how to create a fishbone diagram (Ishikawa) using diagram control.
                    Here, zoom and pan options are enabled. The tool property of the diagram control
                    allows you to enable or disable zoom and pan options.

                </p>

                <p style={{ fontWeight: 500 }}>Injecting Module</p>
                <p>
                    The diagram component’s features are segregated into individual
                    feature-wise modules. To generate diagrams from an external data
                    source, inject <code>DataBinding</code> module using{" "}
                    <code>Diagram.Inject(DataBinding)</code> method. To automatically
                    arrange the objects in a hierarchical structure, inject{" "}
                    <code>HierarchicalTree</code> module into <code>services</code>.
                </p>
                <br />
            </div>
        </div>
    );
}
export default Fishbone;