import * as ReactDOM from "react-dom";
import * as React from "react";
import {
  DiagramComponent,
  NodeConstraints,
  SnapConstraints,
  NodeModel,
  ConnectorModel,
  BasicShapeModel,
  Node,
  Connector,
  Diagram,
  DiagramTools,
  Inject,
  DataBinding,
  RadialTree,
  ZoomOptions
} from "@syncfusion/ej2-react-diagrams";
import { SampleBase } from "../common/sample-base";
import { DataManager } from "@syncfusion/ej2-data";
import {
  ToolbarComponent,
  ClickEventArgs
} from "@syncfusion/ej2-react-navigations";
import { radialTree } from './diagram-data';

import "./font-icons.css";

export interface DataInfo {
  [key: string]: string;
}

let diagramInstance: DiagramComponent;

export class Radial extends SampleBase<{}, {}> {
  rendereComplete() {
    diagramInstance.fitToPage();
  }
  render() {
    return (
      <div className="control-panel">
        <div className="control-section">
        <div className="content-wrapper" style={{ width: "100%" }}>
            {/* create and add ZoomIn,ZoomOut and Reset options in ToolBar. */}
            <ToolbarComponent
              id="toolbar_diagram"
              clicked={onItemClick}
              items={[
                {
                  type: "Button",
                  tooltipText: "ZoomIn",
                  text: "Zoom In",
                  prefixIcon: "e-diagram-icons e-diagram-zoomin"
                },
                { type: "Separator" },
                {
                  type: "Button",
                  tooltipText: "ZoomOut",
                  text: "Zoom Out",
                  prefixIcon: "e-diagram-icons e-diagram-zoomout"
                },
                { type: "Separator" },
                {
                  type: "Button",
                  tooltipText: "Reset",
                  text: "Reset",
                  prefixIcon: "e-diagram-icons e-diagram-reset"
                }
              ]}
            />
            <DiagramComponent
              id="diagram"
              ref={diagram => (diagramInstance = diagram)}
              width={"100%"}
              height={"600px"}
              snapSettings={{ constraints: SnapConstraints.None }} //configures data source settings
              dataSourceSettings={{
                //sets the fields to bind
                id: "Id",
                parentId: "ReportingPerson",
                dataSource: new DataManager(radialTree as JSON[]), //binds the data with the nodes
                doBinding: (
                  nodeModel: NodeModel,
                  data: DataInfo,
                  diagram: Diagram
                ) => {
                  nodeModel.annotations = [
                    {
                      content: data.Name,
                      style:
                        data.Id === "parent"
                          ? { color: "white", fontSize: 50 }
                          : { color: "black", fontSize: 20 }
                    }
                  ];
                  nodeModel.constraints =
                    (NodeConstraints.Default &
                      ~NodeConstraints.InheritTooltip) |
                    NodeConstraints.Tooltip;
                  nodeModel.tooltip = {
                    content: data.Name + "<br/>" + data.Designation,
                    relativeMode: "Object",
                    position: "TopCenter",
                    showTipPointer: true
                  };
                  if (data.Designation === "Managing Director") {
                    nodeModel.width = 400;
                    nodeModel.height = 400;
                    nodeModel.shape = { shape: "Ellipse" } as BasicShapeModel;
                    nodeModel.style = { fill: "black" };
                  } else if (data.Designation === "Project Manager") {
                    nodeModel.width = 130;
                    nodeModel.height = 130;
                    nodeModel.height = 130;
                    nodeModel.style = { fill: "#f8ab52" };
                  } else {
                    nodeModel.width = 100;
                    nodeModel.height = 100;
                    nodeModel.shape = { shape: "Ellipse" } as BasicShapeModel;
                    nodeModel.style = { fill: "#afeeee" };
                  }
                }
              }} //Disables all interactions except zoom/pan
              tool={DiagramTools.ZoomPan} //Configures automatic layout
              layout={{
                type: "RadialTree",
                verticalSpacing: 30,
                horizontalSpacing: 20,
                root: "Category"
              }} //Defines the default node and connector properties
              getNodeDefaults={(obj: Node, diagram: Diagram) => {
                return obj;
              }}
              getConnectorDefaults={(
                connector: ConnectorModel,
                diagram: Diagram
              ) => {
                connector.type = "Straight";
                return connector;
              }}
            >
              <Inject services={[DataBinding, RadialTree]} />
            </DiagramComponent>
          </div>
        </div>
        <div id="action-description">
          <p>
            This sample demonstrates a huge organizational structure using a
            compact layout model. Radial tree layout algorithm is used to build
            such a layout.
          </p>
        </div>
        <div id="description">
          <p>
            This example shows how to visualize a complex hierarchical data
            using radial tree layout algorithm that arranges the nodes in a
            circular structure. The <code>type</code> property of the layout can
            be used to enable radial tree layout. The spacing between the
            objects can also be customized in the tree. The{" "}
            <code>horizontalSpacing</code> and <code>verticalSpacing</code>{" "}
            properties of <code>layout</code> can be used to customize the space
            between the objects in a tree.
          </p>

          <p style={{ fontWeight: 500 }}>Injecting Module</p>
          <p>
            The diagram component’s features are segregated into individual
            feature-wise modules. To generate diagrams from an external data
            source, inject <code>DataBinding</code> module into{" "}
            <code>services</code>. To automatically arrange the objects in a
            radial structure, inject <code>RadialTree</code> module into{" "}
            <code>services</code>.
          </p>
          <br />
        </div>
      </div>
    );
  }
  public nodeDefaults(obj: Node): Node {
    return obj;
  }

  public connectorDefaults(obj: Connector): Connector {
    obj.type = "Straight";
    return obj;
  }
}

//based on the option, Click event to perform ZoomIn,ZoomOut and Reset.
function onItemClick(args: ClickEventArgs): void {
  switch (args.item.text) {
    case "Zoom In":
      let zoomin: ZoomOptions = { type: "ZoomIn", zoomFactor: 0.2 };
      diagramInstance.zoomTo(zoomin);
      break;
    case "Zoom Out":
      let zoomout: ZoomOptions = { type: "ZoomOut", zoomFactor: 0.2 };
      diagramInstance.zoomTo(zoomout);
      break;
    case "Reset":
      diagramInstance.reset();
      diagramInstance.fitToPage();
      break;
  }
}
