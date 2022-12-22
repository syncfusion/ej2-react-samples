import * as ReactDOM from "react-dom";
import * as React from "react";
import {
  Node,
  Connector,
  HierarchicalTree,
  DataBinding,
  DiagramComponent,
  Diagram,
  NodeModel,
  ConnectorModel,
  Inject,
  DiagramTools
} from "@syncfusion/ej2-react-diagrams";
import { updateSampleSection } from "../common/sample-base";
import { DataManager } from "@syncfusion/ej2-data";
import { Point } from "@syncfusion/ej2-diagrams/src/diagram/primitives/point";
import { species } from './diagram-data';


export interface DataInfo {
  [key: string]: string;
}

function LocalData() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  return (
    <div className="control-pane">
      <div
        className="control-section"
      >
        <div className="content-wrapper" style={{ width: "100%" }}>
          <DiagramComponent
            id="diagram"
            width={"100%"}
            height={"490"}
            //Configures data source
            dataSourceSettings={{
              id: "Name",
              parentId: "Category",
              dataSource: new DataManager(species),
              //binds the external data with node
              doBinding: (
                nodeModel: NodeModel,
                data: DataInfo,
                diagram: Diagram
              ) => {
                nodeModel.annotations = [
                  {
                    /* tslint:disable:no-string-literal */
                    content: data["Name"],
                    style: { color: "black" }
                  }
                ];
                /* tslint:disable:no-string-literal */
                nodeModel.style = {
                  fill: "#ffeec7",
                  strokeColor: "#f5d897",
                  strokeWidth: 1
                };
              }
            }}
            //Configrues organizational chart layout
            layout={{
              type: "HierarchicalTree",
              horizontalSpacing: 15,
              verticalSpacing: 50,
              margin: { top: 10, left: 10, right: 10, bottom: 0 }
            }}
            //Sets the default values of nodes
            getNodeDefaults={(obj: Node, diagram: Diagram) => {
              //Initialize shape
              obj.shape = { type: "Basic", shape: "Rectangle" };
              obj.style = { strokeWidth: 1 };
              obj.width = 95;
              obj.height = 30;
            }}
            //Sets the default values of connector
            getConnectorDefaults={(
              connector: ConnectorModel,
              diagram: Diagram
            ) => {
              connector.type = "Orthogonal";
              connector.style.strokeColor = "#4d4d4d";
              connector.targetDecorator.shape = "None";
            }}
            //Disables all interactions except zoom/pan
            tool={DiagramTools.ZoomPan}
            snapSettings={{ constraints: 0 }}
          >
            <Inject services={[DataBinding, HierarchicalTree]} />
          </DiagramComponent>
        </div>
      </div>
      <div id="action-description">
        <p>
          This sample visualizes the classifications of species using
          hierarchical tree layout algorithm. Data Manager support is used to
          bind data with the diagram.
        </p>
      </div>
      <div id="description">
        <p>
          This example shows how to generate a diagram from the saved data.
          The <code>dataSourceSettings</code> property can be used to map an
          external data source with the diagram control. The
          <code>id</code> property of <code>dataSourceSettings</code> can be
          used to define a unique field of an external data. The
          <code>parentId</code> property can be used to define the
          relationship between the objects.
        </p>

        <p style={{ fontWeight: 500 }}>Injecting Module</p>
        <p>
          The diagram component’s features are segregated into individual
          feature-wise modules. To generate diagrams from an external data
          source, inject <code>DataBinding</code> module into{" "}
          <code>services</code>. To automatically arrange the objects in a
          hierarchical structure, inject
          <code>DataBinding</code> module into <code>services</code>.
        </p>
        <br />
      </div>
    </div>
  );
}

export interface EmployeeInfo {
  Role: string;
  color: string;
}
export default LocalData;
