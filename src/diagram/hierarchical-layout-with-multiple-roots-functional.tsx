import * as ReactDOM from "react-dom";
import * as React from "react";
import {
    Node,
    LayoutAnimation,
    HierarchicalTree,
    DataBinding,
    DiagramComponent,
    Diagram,
    NodeModel,
    ConnectorModel,
    SnapConstraints,
    Inject,
    DiagramTools,
    TextModel
} from "@syncfusion/ej2-react-diagrams";
import { updateSampleSection } from "../common/sample-base";
import { DataManager } from "@syncfusion/ej2-data";
import { Query } from "@syncfusion/ej2/data";


export interface EmployeeInfo {
    Label: string;
}


let diagramInstance: DiagramComponent;
let data:Object[] = [
    { id: 1, Label: 'Production Manager' },
    { id: 2, Label: 'Control Room', parentId: 1 },
    { id: 3, Label: 'Plant Operator', parentId: 1 },
    { id: 4, Label: 'Foreman', parentId: 2 },
    { id: 5, Label: 'Foreman', parentId: 3 },
    { id: 6, Label: 'Craft Personnel', parentId: 4 },
    { id: 7, Label: 'Craft Personnel', parentId: 4 },
    { id: 8, Label: 'Craft Personnel', parentId: 5 },
    { id: 9, Label: 'Craft Personnel', parentId: 5 },
    { id: 10, Label: 'Administrative Officer' },
    { id: 11, Label: 'Security Supervisor', parentId: 10 },
    { id: 12, Label: 'HR Supervisor', parentId: 10 },
    { id: 13, Label: 'Reception Supervisor', parentId: 10 },
    { id: 14, Label: 'Securities', parentId: 11 },
    { id: 15, Label: 'HR Officer', parentId: 12 },
    { id: 16, Label: 'Receptionist', parentId: 13 },
    { id: 17, Label: 'Maintainence Manager' },
    { id: 18, Label: 'Electrical Supervisor', parentId: 17 },
    { id: 19, Label: 'Mechanical Supervisor', parentId: 17 },
    { id: 20, Label: 'Craft Personnel', parentId: 18 },
    { id: 21, Label: 'Craft Personnel', parentId: 19 },
  ];
  let items: DataManager = new DataManager(data as JSON[], new Query().take(7));

function HierarchicalLayoutWithMultipleRoots() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
    
  //sets node default value
  function nodeDefaults(obj: Node, diagram: Diagram): Node {
    if (
        (obj.data as any).id === 1 ||
        (obj.data as any).id === 10 ||
        (obj.data as any).id === 17
      ) {
        obj.style = {
          fill: '#1c5b9b',
          strokeColor: 'none',
          color: 'white',
          strokeWidth: 2,
        };
        obj.borderColor = '#1c5b9b';
        obj.backgroundColor = '#1c5b9b';
      } else if (
        (obj.data as any).id === 2 ||
        (obj.data as any).id === 3 ||
        (obj.data as any).id === 11 ||
        (obj.data as any).id === 12 ||
        (obj.data as any).id === 13 ||
        (obj.data as any).id === 18 ||
        (obj.data as any).id === 19
      ) {
        obj.style = {
          fill: '#18c1be',
          strokeColor: '#18c1be',
          color: 'white',
          strokeWidth: 2,
        };
        obj.borderColor = '#18c1be';
        obj.backgroundColor = '#18c1be';
      } else if (
        (obj.data as any).id === 4 ||
        (obj.data as any).id === 5 ||
        (obj.data as any).id === 14 ||
        (obj.data as any).id === 15 ||
        (obj.data as any).id === 16 ||
        (obj.data as any).id === 20 ||
        (obj.data as any).id === 21
      ) {
        obj.style = {
          fill: '#17a573',
          strokeColor: 'none',
          color: 'white',
          strokeWidth: 2,
        };
        obj.borderColor = '#17a573';
        obj.backgroundColor = '#17a573';
      } else {
        obj.style = {
          fill: '#73bb34',
          strokeColor: 'none',
          color: 'white',
          strokeWidth: 2,
        };
        obj.borderColor = '#73bb34';
        obj.backgroundColor = '#73bb34';
      }
      obj.width = 75;
      obj.height = 35;
      (obj.shape as TextModel).margin = { left: 5, right: 5, bottom: 5, top: 5 };
      return obj;
  }
  
  //sets connector default value
  function connectorDefaults(
    connector: ConnectorModel,
    diagram: Diagram
  ): ConnectorModel {
    connector.type = "Orthogonal";
    return connector;
  }
 
  return (
        <div className="control-pane diagram-control-pane">
            <div className="content-wrapper" style={{ width: "100%" }}>
            <DiagramComponent
                id="diagram"
                ref={diagram => (diagramInstance = diagram)}
                width={"100%"}
                height={"499px"}
                snapSettings={{ constraints: SnapConstraints.None }} //configures data source settings
                dataSourceSettings={{
                //sets the fields to bind
                id: "id",
                parentId: "parentId",
                dataSource: items, //binds the data with the nodess
                doBinding: (
                    nodeModel: NodeModel,
                    data: object,
                    diagram: Diagram
                ) => {
                    nodeModel.shape = {
                    type: "Text",
                    content: (data as EmployeeInfo).Label
                    };
                }
                }} //Disables all interactions except zoom/pan
                tool={DiagramTools.ZoomPan} //Configures automatic layout
                layout={{
                type: "HierarchicalTree",
                verticalSpacing: 30,
                horizontalSpacing: 40,
                enableAnimation: true
                }} //Defines the default node and connector properties
                getNodeDefaults={(obj: Node, diagram: Diagram) => {
                return nodeDefaults(obj, diagram);
                }}
                getConnectorDefaults={(
                connector: ConnectorModel,
                diagram: Diagram
                ) => {
                return connectorDefaults(connector, diagram);
                }}
            >
                <Inject
                services={[DataBinding, HierarchicalTree, LayoutAnimation]}
                />
            </DiagramComponent>
                </div>
                <div id="action-description">
                <p>
                    This sample illustrates the structure of an Electricity Sector using complex hierarchical layout with multiple roots.
                </p> 
            </div>
            <div id="description">
                <p>
                    This example shows how to create a complex hierarchical layout with multiple root nodes.
                </p>
            </div>
    </div>
  );
}
export default HierarchicalLayoutWithMultipleRoots;
