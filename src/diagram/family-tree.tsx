import * as ReactDOM from "react-dom";
import * as React from "react";
import {
  Node,
  Canvas,
  PathElement,
  HorizontalAlignment,
  DiagramElement,
  TextElement,
  PortVisibility,
  HierarchicalTree,
  DataBinding,
  DiagramComponent,
  Diagram,
  NodeModel,
  ConnectorModel,
  SnapConstraints,
  Inject,
  DiagramTools
} from "@syncfusion/ej2-react-diagrams";
import { SampleBase } from "../common/sample-base";
import { DataManager } from "@syncfusion/ej2-data";
import { Point } from "@syncfusion/ej2-diagrams/src/diagram/primitives/point";

export let familyData: object[] = [
  { Name: "Andrew", branch: "root", spouse: "Maria Anders" },
  { Name: "Janet", spouse: "Nancy Cruz", Category: "Andrew" },
  { Name: "Brian", spouse: "Donald Watt", Category: "Andrew" },
  { Name: "Kathleen", spouse: "Starr Barnette", Category: "Andrew" },

  { Name: "Thomas Hardy", spouse: "Patricia Joe", Category: "Janet" },
  { Name: "Melanie", spouse: "Anne Barnette", Category: "Janet" },

  { Name: "Francisco Yangi", spouse: "Christina kaff", Category: "Brian" },
  {
    Name: "Janine Labrune",
    spouse: "Elizabeth Roel",
    Category: "Thomas Hardy"
  },
  { Name: "Mario Pontes", spouse: "Yoshi Latimer", Category: "Thomas Hardy" },

  { Name: "Peter Citeaux", spouse: "Ann Devoon", Category: "Francisco Yangi" },
  {
    Name: "Martine Rancé",
    spouse: "Elizabeth Mary",
    Category: "Francisco Yangi"
  },
  { Name: "Yang", spouse: "Lino Rodri", Category: "Martine Rancé" },
  { Name: "Philip Cramer", spouse: "Pedro Afonso", Category: "Philip Cramer" }
];

export interface DataInfo {
  [key: string]: string;
}

export class FamilyTree extends SampleBase<{}, {}> {
  render() {
    return (
      <div className="control-pane">
        <div className="control-section">
          <div style={{ width: "100%" }}>
            <DiagramComponent
              id="diagram"
              width={"100%"}
              height={"499px"}
              snapSettings={{ constraints: SnapConstraints.None }}
              //Configures data source
              dataSourceSettings={{
                id: "Name",
                parentId: "Category",
                dataManager: new DataManager(familyData as JSON[]),
                //binds the external data with node
                doBinding: (
                  nodeModel: NodeModel,
                  data: DataInfo,
                  diagram: Diagram
                ) => {
                  let key: string = "shape";
                  let name: string = "Name";
                  /* tslint:disable:no-string-literal */
                  nodeModel.shape = { type: "Text", content: data[name] };
                }
              }}
              //Configrues hierarchical tree layout
              layout={{
                type: "HierarchicalTree",
                verticalSpacing: 45,
                horizontalSpacing: 15
              }}
              //Sets the default values of nodes
              getNodeDefaults={(obj: Node, diagram: Diagram) => {
                obj.backgroundColor = "#e8ebef";
                obj.ports = [
                  {
                    id: "port1",
                    shape: "Circle",
                    offset: { x: 0.5, y: 0.51 },
                    height: 4,
                    width: 4,
                    visibility: PortVisibility.Visible,
                    style: {
                      fill: "black"
                    }
                  }
                ];
                return obj;
              }}
              //Sets the default values of connector
              getConnectorDefaults={(
                connector: ConnectorModel,
                diagram: Diagram
              ) => {
                connector.type = "Orthogonal";
                connector.sourcePortID = "port1";
                connector.targetDecorator = { shape: "None" };
                return connector;
              }}
              //Customizes the content of the node
              setNodeTemplate={(node: NodeModel) => {
                return getNodeTemplate(node);
              }}
              tool={DiagramTools.ZoomPan}
            >
              <Inject services={[DataBinding, HierarchicalTree]} />
            </DiagramComponent>
          </div>
        </div>
        <div id="action-description">
          <p>This sample visualizes the generations of a family.</p>
        </div>
        <div id="description">
          <p>
            This example shows how to build a hierarchical tree from an external
            data source. The <code>dataSourceSettings</code> property can be
            used to map an external data source with diagram control. The{" "}
            <code>layout</code> property can be used to automatically arrange
            the nodes.
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
}

//Creation of TextElement
function getTextElement(
  text: string,
  color: string,
  alignment: HorizontalAlignment
): DiagramElement {
  let textElement: TextElement = new TextElement();
  textElement.width = 60;
  textElement.height = 35;
  textElement.content = text;
  textElement.style.fill = color;
  textElement.horizontalAlignment = alignment;
  textElement.style.strokeColor = "none";
  textElement.relativeMode = "Object";
  return textElement;
}

//Creation of PathElement
function getPathElement(data: string): PathElement {
  let pathElement: PathElement = new PathElement();
  pathElement.data = data;
  pathElement.style.strokeColor = " black";
  pathElement.style.strokeWidth = 1;
  pathElement.verticalAlignment = "Center";
  pathElement.relativeMode = "Object";
  return pathElement;
}

//Customizes the content of the node
function getNodeTemplate(node: NodeModel): Canvas {
  let canvas: Canvas = new Canvas();
  canvas.children = [];
  canvas.width = 140;
  canvas.style.strokeWidth = 0;
  canvas.style.fill = "transparent";
  canvas.margin = { left: 5, right: 5, top: 5, bottom: 5 };
  canvas.children.push(getPathElement("M 0 100 L 140 100 "));
  let nameKey: string = "Name";
  let spouseNameKey: string = "spouse";
  /* tslint:disable:no-string-literal */
  canvas.children.push(
    getTextElement((node.data as DataInfo)[nameKey], "#c8c8f5", "Left")
  );
  /* tslint:disable:no-string-literal */
  canvas.children.push(
    getTextElement((node.data as DataInfo)[spouseNameKey], "#f3bcd7", "Right")
  );
  return canvas;
}
