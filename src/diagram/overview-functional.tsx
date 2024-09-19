import * as ReactDOM from "react-dom";
import * as React from "react";
import {
    HierarchicalTree,
    Container,
    StackPanel,
    ImageElement,
    TextElement,
    TreeInfo,
    SnapConstraints,
    DiagramComponent,
    ConnectorModel,
    Node,
    Diagram,
    Inject,
    DataBinding,
    OverviewComponent,
    DiagramTools
} from "@syncfusion/ej2-react-diagrams";
import { updateSampleSection } from "../common/sample-base";
import { DataManager } from "@syncfusion/ej2-data";
import { data } from './overview-data';

let diagramInstance: DiagramComponent;

function Overview() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])

    // Funtion to add the Template of the Node.
    function setNodeTemplate(obj: Node, diagram: Diagram): Container {

        // Create the outer container for the node content.
        let content: StackPanel = new StackPanel();
        content.id = obj.id + "_outerstack";
        content.orientation = "Horizontal";
        content.style.strokeColor = "gray";
        content.padding = { left: 5, right: 10, top: 5, bottom: 5 };

        // Create an image element for the employee picture.
        let image: ImageElement = new ImageElement();
        image.width = 50;
        image.height = 50;
        image.style.strokeColor = "none";
        image.source = (obj.data as EmployeeInfo).ImageUrl;
        image.id = obj.id + "_pic";

        // Create an inner stack panel for text elements (name and designation).
        let innerStack: StackPanel = new StackPanel();
        innerStack.style.strokeColor = "none";
        innerStack.margin = { left: 5, right: 0, top: 0, bottom: 0 };
        innerStack.id = obj.id + "_innerstack";

        // Create a text element for the employee name.
        let text: TextElement = new TextElement();
        text.content = (obj.data as EmployeeInfo).Name;
        text.style.color = "black";
        text.style.bold = true;
        text.style.strokeColor = "none";
        text.style.fill = "none";
        text.id = obj.id + "_text1";

        // Create a text element for the employee designation.
        let desigText: TextElement = new TextElement();
        desigText.margin = { left: 0, right: 0, top: 5, bottom: 0 };
        desigText.content = (obj.data as EmployeeInfo).Designation;
        desigText.style.color = "black";
        desigText.style.strokeColor = "none";
        desigText.style.fill = "none";
        desigText.style.textWrapping = "Wrap";
        desigText.id = obj.id + "_desig";

        innerStack.children = [text, desigText];
        content.children = [image, innerStack];

        return content;
    }

    // Function to determine layout info
    function layoutInfo(node: Node, tree: TreeInfo): void {
        if (!tree.hasSubTree) {
            tree.orientation = "Vertical";
            tree.type = "Right";
        }
    }

    // Function to set default values for nodes
    function nodeDefaults(obj: Node, diagram: Diagram): Node {
        obj.height = 50;
        obj.style = { fill: "transparent", strokeWidth: 2 };
        return obj;
    }

    // Function to set default values for connectors
    function connectorDefaults(connector: ConnectorModel, diagram: Diagram): ConnectorModel {
        connector.targetDecorator.shape = "None";
        connector.type = "Orthogonal";
        return connector;
    }

    return (
        <div className="control-pane">
            <div className="col-lg-12 control-section">
                <div className="content-wrapper">
                    <DiagramComponent
                        id="diagram"
                        ref={diagram => (diagramInstance = diagram)}
                        width={"100%"}
                        height={"590px"}
                        tool={DiagramTools.ZoomPan}
                        scrollSettings={{ scrollLimit: "Infinity" }} //Sets the constraints of the SnapSettings
                        snapSettings={{ constraints: SnapConstraints.None }} //Configrues organizational chart layout
                        layout={{
                            type: "OrganizationalChart",
                            margin: { top: 20 },
                            getLayoutInfo: layoutInfo
                        }} //Sets the parent and child relationship of DataSource.
                        dataSourceSettings={{
                            id: "Id",
                            parentId: "ReportingPerson",
                            dataSource: new DataManager(data)
                        }}
                        getNodeDefaults={nodeDefaults}
                        getConnectorDefaults={connectorDefaults}
                        setNodeTemplate={setNodeTemplate}
                    >
                        <Inject services={[DataBinding, HierarchicalTree]} />
                    </DiagramComponent>
                </div>
            </div>
            <div
                className="col-lg-4"
                style={{
                    width: "50%",
                    padding: "0px",
                    right: "30px",
                    bottom: "20px",
                    border: "#eeeeee",
                    borderStyle: "solid",
                    boxShadow: "0px 2px 2px rgba(0,0,0,0.3)",
                    background: "#f7f7f7",
                    position: "absolute"
                }}
            >
                <OverviewComponent
                    id="overview"
                    style={{ top: "30px" }}
                    sourceID="diagram"
                    width={"100%"}
                    height={"150px"}
                />
            </div>
            <div id="action-description">
                <p>
                    This sample visualizes an organizational structure along with an
                    overview for easily navigating the large organizational structure
                    using Overview control.
                </p>
            </div>
            <div id="description">
                <p>
                    This example shows how to render the overview control and how to
                    display a preview (overall view) of the entire content of a diagram.
                    This helps you look at the overall picture of a large diagram and
                    also to navigate (pan or zoom) to a particular position of the page.
                    The <code>sourceID</code> property can be used to map the diagram
                    control with overview.
                </p>
                <br />
            </div>
        </div>
    );
}
export interface EmployeeInfo {
    Name: string;
    Designation: string;
    ImageUrl: string;
}
export default Overview;