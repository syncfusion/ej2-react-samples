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
import { SampleBase } from "../common/sample-base";
import { DataManager } from "@syncfusion/ej2-data";

export interface DataInfo {
    [key: string]: string;
}

export class RemoteData extends SampleBase<{}, {}> {
    // Keep stable identities across renders
    private dataManager: DataManager;
    private layout: {
        type: "HierarchicalTree";
        margin: { left: number; right: number; top: number; bottom: number };
        verticalSpacing: number;
    };
    private getNodeDefaults: (node: Node) => void;
    private getConnectorDefaults: (connector: Connector) => void;
    private doBinding: (nodeModel: NodeModel, data: DataInfo) => void;
    private dataSourceSettings: {
        id: string;
        parentId: string;
        dataSource: DataManager;
        doBinding: (nodeModel: NodeModel, data: DataInfo) => void;
    };

    constructor(props: {}) {
        super(props);

        // 1) Create DataManager once
        this.dataManager = new DataManager({
            url: "https://services.syncfusion.com/react/production/api/RemoteData",
            crossDomain: true
        });

        // 2) Create layout once
        this.layout = {
            type: "HierarchicalTree",
            margin: { left: 0, right: 0, top: 100, bottom: 0 },
            verticalSpacing: 40
        };

        // 3) Stable callbacks
        this.getNodeDefaults = (node: Node) => {
            node.width = 80;
            node.height = 40;
            node.shape = { type: "Basic", shape: "Rectangle" };
            node.style = { fill: "#048785", strokeColor: "Transparent" };
        };

        this.getConnectorDefaults = (connector: Connector) => {
            connector.type = "Orthogonal";
            connector.style.strokeColor = "#048785";
            connector.targetDecorator.shape = "None";
        };

        this.doBinding = (nodeModel: NodeModel, data: DataInfo) => {
            nodeModel.annotations = [
                {
                    content: data["Label"],
                    style: { color: "white" }
                }
            ];
        };

        // 4) dataSourceSettings with stable identity
        this.dataSourceSettings = {
            id: "Id",
            parentId: "ParentId",
            dataSource: this.dataManager,
            doBinding: this.doBinding
        };
    }

    render() {
        return (
            <div className="control-pane">
                <div className="control-section">
                    <DiagramComponent
                        id="diagram"
                        width={"100%"}
                        height={"490"}
                        layout={this.layout}
                        getNodeDefaults={this.getNodeDefaults}
                        getConnectorDefaults={this.getConnectorDefaults}
                        dataSourceSettings={this.dataSourceSettings}
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
}
