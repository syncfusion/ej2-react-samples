// Import React and necessary components from Syncfusion's EJ2 React Diagrams library for building the diagram.
import * as React from "react";
import {
    Node,
    Connector,
    HierarchicalTree,
    DataBinding,
    DiagramComponent,
    NodeModel,
    Inject,
    DiagramTools
} from "@syncfusion/ej2-react-diagrams";
import { updateSampleSection } from "../common/sample-base";
import { DataManager } from "@syncfusion/ej2-data";

export interface DataInfo {
    [key: string]: string;
}

function RemoteData() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])

    return (
        <div className="control-pane">
            <div className="control-section">
                {/* Initializes and renders diagram control */}
                <DiagramComponent
                    id="diagram"
                    width={"100%"}
                    height={"490"}
                    layout={{
                        type: "HierarchicalTree",
                        margin: { left: 0, right: 0, top: 100, bottom: 0 },
                        verticalSpacing: 40,
                    }}
                    // Set default properties for nodes
                    getNodeDefaults={(node: Node) => {
                        node.width = 80;
                        node.height = 40;
                        // Initialize node shape
                        node.shape = { type: "Basic", shape: "Rectangle" };
                        node.style = { fill: "#048785", strokeColor: "Transparent" };
                    }}
                    // Set default properties for connectors
                    getConnectorDefaults={(connector: Connector) => {
                        connector.type = "Orthogonal";
                        connector.style.strokeColor = "#048785";
                        connector.targetDecorator.shape = "None";
                    }}
                    // Configure the data source for the diagram
                    dataSourceSettings={{
                        id: "Id",
                        parentId: "ParentId",
                        dataSource: new DataManager({
                            url: "https://services.syncfusion.com/react/production/api/RemoteData",
                            crossDomain: true
                        }),
                        // Bind external data to node properties
                        doBinding: (nodeModel: NodeModel, data: DataInfo) => {
                            nodeModel.annotations = [{
                                content: data["Label"],
                                style: { color: "white" }
                            }];
                        }
                    }}
                    // Disable all interactions except zoom/pan
                    tool={DiagramTools.ZoomPan}
                    snapSettings={{ constraints: 0 }}
                >
                    <Inject services={[DataBinding, HierarchicalTree]} />
                </DiagramComponent>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates binding remote data with the diagram using
                    the Data Manager support.
                </p>
            </div>
            <div id="description">
                <p>
                    This example shows how to generate a diagram from remote data such
                    as REST APIs. The
                    <code>dataSourceSettings</code> property can be used to map an
                    external data source with the diagram control. The
                    <code>id</code> property of
                    <code>dataSourceSettings</code> can be used to define a unique field
                    of an external data. The
                    <code>parentId</code> property can be used to define the
                    relationship between objects. The
                    <code>dataManager</code> property can be used to fetch data from web
                    services.
                </p>

                <p style={{ fontWeight: 500 }}>Injecting Module</p>
                <p>
                    The diagram component’s features are segregated into individual
                    feature-wise modules. To generate diagrams from an external data
                    source, inject
                    <code>DataBinding</code> module into <code>services</code>. To
                    automatically arrange the objects in a hierarchical structure,
                    inject
                    <code>DataBinding</code> module into <code>services</code>.
                </p>
                <br />
            </div>
        </div>
    );
}
export default RemoteData;
