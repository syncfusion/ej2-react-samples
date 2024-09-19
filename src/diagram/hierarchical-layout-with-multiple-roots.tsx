import * as ReactDOM from "react-dom";
import * as React from "react";
import {
  Node,
  HierarchicalTree,
  DataBinding,
  DiagramComponent,
  Diagram,
  NodeModel,
  ConnectorModel,
  SnapConstraints,
  Inject,
  DiagramTools,
  TextModel,
  ShapeStyleModel,
  TextStyleModel
} from "@syncfusion/ej2-react-diagrams";
import { SampleBase } from "../common/sample-base";
import { DataManager } from "@syncfusion/ej2-data";
import { Query } from "@syncfusion/ej2-data";

export interface EmployeeInfo {
    Label: string;
  }
  let diagramInstance: DiagramComponent;
  //Initialize dataSource for diagram
  let data:Object[] = [
    { id: 1, Label: 'Production Manager' ,color :'#1c5b9b'},
    { id: 2, Label: 'Control Room', parentId: 1 ,color : '#18c1be'},
    { id: 3, Label: 'Plant Operator', parentId: 1 ,color : '#18c1be'},
    { id: 4, Label: 'Foreman', parentId: 2 ,color : '#17a573'},
    { id: 5, Label: 'Foreman', parentId: 3 ,color : '#17a573'},
    { id: 6, Label: 'Craft Personnel', parentId: 4 ,color : '#73bb34'},
    { id: 7, Label: 'Craft Personnel', parentId: 4 ,color : '#73bb34'},
    { id: 8, Label: 'Craft Personnel', parentId: 5 ,color : '#73bb34'},
    { id: 9, Label: 'Craft Personnel', parentId: 5 ,color : '#73bb34'},
    { id: 10, Label: 'Administrative Officer' ,color :'#1c5b9b'},
    { id: 11, Label: 'Security Supervisor', parentId: 10 ,color : '#18c1be'},
    { id: 12, Label: 'HR Supervisor', parentId: 10 ,color : '#18c1be'},
    { id: 13, Label: 'Reception Supervisor', parentId: 10 ,color : '#18c1be'},
    { id: 14, Label: 'Securities', parentId: 11 ,color : '#17a573'},
    { id: 15, Label: 'HR Officer', parentId: 12 ,color : '#17a573'},
    { id: 16, Label: 'Receptionist', parentId: 13 ,color : '#17a573'},
    { id: 17, Label: 'Maintainence Manager' ,color :'#1c5b9b'},
    { id: 18, Label: 'Electrical Supervisor', parentId: 17 ,color : '#18c1be'},
    { id: 19, Label: 'Mechanical Supervisor', parentId: 17 ,color : '#18c1be'},
    { id: 20, Label: 'Craft Personnel', parentId: 18 ,color : '#17a573'},
    { id: 21, Label: 'Craft Personnel', parentId: 19 ,color : '#17a573'},
  ];
  let items: DataManager = new DataManager(data as JSON[], new Query().take(7));
  
  export class HierarchicalLayoutWithMultipleRoots extends SampleBase<{}, {}> {
    render() {
      return (
        <div className="control-pane diagram-control-pane">
            <div className="content-wrapper" style={{ width: "100%" }}>
              <DiagramComponent
                id="diagram"
                ref={diagram => (diagramInstance = diagram)}
                width={"100%"}
                height={"499px"}
                snapSettings={{ constraints: SnapConstraints.None }} 
                //configures data source settings
                dataSourceSettings={{
                  //sets the fields to bind
                  id: "id",
                  parentId: "parentId",
                  dataSource: items, //Bind the data to the nodes
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
                }}  
                //Disable all interactions except zoom and pan
                tool={DiagramTools.ZoomPan} 
                //Configures automatic layout
                layout={{
                  type: "HierarchicalTree",
                  verticalSpacing: 30,
                  horizontalSpacing: 40
                }} //Defines the default node and connector properties
                getNodeDefaults={(obj: Node) => {
                  return nodeDefaults(obj);
                }}
                getConnectorDefaults={(
                  connector: ConnectorModel
                ) => {
                  return connectorDefaults(connector);
                }}
              >
                <Inject
                  services={[DataBinding, HierarchicalTree]}
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
  }
  
  //sets node default value
  function nodeDefaults(obj: Node): Node {
      (obj.style as ShapeStyleModel).fill = (obj.data as any).color;
      obj.backgroundColor = (obj.data as any).color;
      (obj.style as TextStyleModel).color = 'white';
      (obj.style as ShapeStyleModel).strokeWidth = 2;  
      obj.width = 75;
      obj.height = 35;
      (obj.shape as TextModel).margin = { left: 5, right: 5, bottom: 5, top: 5 };
      return obj;
  }
  
  //sets connector default value
  function connectorDefaults(
    connector: ConnectorModel
  ): ConnectorModel {
    connector.type = "Orthogonal";
    connector.style = { strokeColor: 'CornflowerBlue' };
    connector.targetDecorator = { shape: 'Arrow', height: 10, width: 10, style: { fill: 'CornflowerBlue', strokeColor: 'white' } };
    return connector;
  }