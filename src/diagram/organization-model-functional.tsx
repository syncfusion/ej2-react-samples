import * as ReactDOM from "react-dom";
import * as React from "react";
import {
  TreeInfo,
  Node,
  SubTreeOrientation,
  LayoutOrientation,
  SubTreeAlignments,
  LayoutAnimation,
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
import { updateSampleSection } from "../common/sample-base";
import { DataManager } from "@syncfusion/ej2-data";
import { Point } from "@syncfusion/ej2-diagrams/src/diagram/primitives/point";
import { NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { localBindData } from './diagram-data';

export interface EmployeeInfo {
  Role: string;
  color: string;
}

export interface EmployeeInfo {
  Name: string;
}

const SAMPLE_CSS = `.image-pattern-style {
        background-color: white;
        background-size: contain;
        background-repeat: no-repeat;
        height: 75px;
        width: calc((100% - 18px) / 3);
        cursor: pointer;
        border: 1px solid #D5D5D5;
        background-position: center;
        float: left;
    }

    .image-pattern-style:hover {
        border-color: gray;
        border-width: 2px;
    }

    .row {
        margin-left: 0px;
        margin-right: 0px;
    }

    .row-header {
        font-size: 13px;
        font-weight: 500;
    }

    .row-header1 {
        font-size: 12px;
        padding-left: 2px;
        font-weight: 400;
    }

    .property-panel-header {
      padding-top: 15px;
      padding-bottom: 15px;
    }

    .e-selected-orientation-style {
        border-color: #006CE6;
        border-width: 2px;
    }

    .e-selected-pattern-style {
        border-color: #006CE6;
        border-width: 2px;
    }

    .e-checkbox-wrapper .e-label {
        font-size: 12px;
    }

    .diagram-control-pane .col-xs-6 {
        padding-left: 0px;
        padding-right: 0px;
    }`;

let diagramInstance: DiagramComponent;
let hSpacing: NumericTextBoxComponent;
let vSpacing: NumericTextBoxComponent;
let orien: LayoutOrientation;
let typ: SubTreeAlignments;

function OrganizationModel() {
  React.useEffect(() => {
    updateSampleSection();
    rendereComplete();
  }, [])
  function rendereComplete() {
    //Click Event for orientation of the PropertyPanel.
    document.getElementById("orientation").onclick = (args: MouseEvent) => {
      let target: HTMLElement = args.target as HTMLElement;
      let selectedElement: HTMLCollection = document.getElementsByClassName(
        "e-selected-orientation-style"
      );
      if (selectedElement.length) {
        selectedElement[0].classList.remove("e-selected-orientation-style");
      }
      if (!target.classList.contains("e-selected-orientation-style")) {
        target.classList.add("e-selected-orientation-style");
      }
      if (
        target.className === "image-pattern-style e-selected-orientation-style"
      ) {
        switch (target.id) {
          case "toptobottom":
            diagramInstance.layout.orientation = "TopToBottom";
            break;
          case "bottomtotop":
            diagramInstance.layout.orientation = "BottomToTop";
            break;
          case "lefttoright":
            diagramInstance.layout.orientation = "LeftToRight";
            break;
          case "righttoleft":
            diagramInstance.layout.orientation = "RightToLeft";
            break;
          default:
            if (selectedElement.length) {
              selectedElement[0].classList.remove(
                "e-selected-orientation-style"
              );
            }
        }
        diagramInstance.dataBind();
        diagramInstance.doLayout();
      }
    };
    //Click Event for pattern of the PropertyPanel.
    document.getElementById("pattern").onclick = (args: MouseEvent) => {
      let target: HTMLElement = args.target as HTMLElement;
      let selectedpatternElement: HTMLCollection = document.getElementsByClassName(
        "e-selected-pattern-style"
      );
      if (selectedpatternElement.length) {
        selectedpatternElement[0].classList.remove("e-selected-pattern-style");
      }
      if (!target.classList.contains("e-selected-pattern-style")) {
        target.classList.add("e-selected-pattern-style");
      }
      if (target.className === "image-pattern-style e-selected-pattern-style") {
        switch (target.id) {
          case "pattern1":
            orien = "Vertical".toString() as LayoutOrientation;
            typ = "Alternate" as SubTreeAlignments;
            break;
          case "pattern2":
            orien = "Vertical".toString() as LayoutOrientation;
            typ = "Left" as SubTreeAlignments;
            break;
          case "pattern3":
            orien = "Vertical".toString() as LayoutOrientation;
            typ = "Left" as SubTreeAlignments;
            break;
          case "pattern4":
            orien = "Vertical".toString() as LayoutOrientation;
            typ = "Right" as SubTreeAlignments;
            break;
          case "pattern5":
            orien = "Vertical".toString() as LayoutOrientation;
            typ = "Right" as SubTreeAlignments;
            break;
          case "pattern6":
            orien = "Horizontal".toString() as LayoutOrientation;
            typ = "Balanced" as SubTreeAlignments;
            break;
          case "pattern7":
            orien = "Horizontal".toString() as LayoutOrientation;
            typ = "Center" as SubTreeAlignments;
            break;
          case "pattern8":
            orien = "Horizontal".toString() as LayoutOrientation;
            typ = "Left" as SubTreeAlignments;
            break;
          case "pattern9":
            orien = "Horizontal".toString() as LayoutOrientation;
            typ = "Right" as SubTreeAlignments;
            break;
          default:
            if (selectedpatternElement.length) {
              selectedpatternElement[0].classList.remove(
                "e-selected-pattern-style"
              );
            }
        }
        diagramInstance.layout.getLayoutInfo = (
          node: Node,
          options: TreeInfo
        ) => {
          if (target.id === "pattern4" || target.id === "pattern3") {
            options.offset = -50;
          }
          if (orien) {
            getLayoutInfo(node, options, orien, typ);
          }
        };

        diagramInstance.dataBind();
        diagramInstance.doLayout();
      }
    };
  }
  //set orientation and type of the Layout.
  function getLayoutInfo(
    node: Node,
    options: TreeInfo,
    orientation: LayoutOrientation,
    type: SubTreeAlignments
  ): void {
    /* tslint:disable:no-string-literal */
    if ((node.data as DataInfo)["Role"] === "General Manager") {
      options.assistants.push(options.children[0]);
      options.children.splice(0, 1);
    }
    if (!options.hasSubTree) {
      options.orientation = orientation as SubTreeOrientation;
      options.type = type;
    }
  }

  //sets default value for Node.
  function nodeDefaults(obj: Node, diagram: Diagram): Node {
    obj.backgroundColor = (obj.data as EmployeeInfo).color;
    obj.style = { fill: "none", strokeColor: "none", color: "white" };
    obj.expandIcon = {
      height: 10,
      width: 10,
      shape: "None",
      fill: "lightgray",
      offset: { x: 0.5, y: 1 }
    };
    obj.expandIcon.verticalAlignment = "Center";
    obj.expandIcon.margin = { left: 0, right: 0, top: 0, bottom: 0 };
    obj.collapseIcon.offset = { x: 0.5, y: 1 };
    obj.collapseIcon.verticalAlignment = "Center";
    obj.collapseIcon.margin = { left: 0, right: 0, top: 0, bottom: 0 };
    obj.collapseIcon.height = 10;
    obj.collapseIcon.width = 10;
    obj.collapseIcon.shape = "None";
    obj.collapseIcon.fill = "lightgray";
    obj.width = 120;
    obj.height = 30;
    return obj;
  }

  //sets default value for Connector.
  function connectorDefaults(
    connector: ConnectorModel,
    diagram: Diagram
  ): ConnectorModel {
    connector.targetDecorator.shape = "None";
    connector.type = "Orthogonal";
    connector.constraints = 0;
    connector.cornerRadius = 0;
    return connector;
  }
  return (
    <div className="control-pane diagram-control-pane">
      <style>{SAMPLE_CSS}</style>
      <div className="col-lg-8 control-section">
        <div className="content-wrapper" style={{ width: "100%" }}>
          <DiagramComponent
            id="diagram"
            ref={diagram => (diagramInstance = diagram)}
            width={"100%"}
            height={"700px"}
            snapSettings={{ constraints: SnapConstraints.None }}
            //configures data source settings
            dataSourceSettings={{
              id: "Id",
              parentId: "Manager",
              dataSource: new DataManager(localBindData as JSON[]),
              doBinding: (
                nodeModel: NodeModel,
                data: object,
                diagram: Diagram
              ) => {
                nodeModel.shape = {
                  type: "Text",
                  content: (data as EmployeeInfo).Role,
                  margin: { left: 10, right: 10, top: 10, bottom: 10 }
                };
              }
            }}
            //Disables all interactions except zoom/pan
            tool={DiagramTools.ZoomPan}
            //Configures automatic layout
            layout={{
              type: "OrganizationalChart",
              getLayoutInfo: (node: Node, options: TreeInfo) => {
                /* tslint:disable:no-string-literal */
                if ((node.data as DataInfo)["Role"] === "General Manager") {
                  options.assistants.push(options.children[0]);
                  options.children.splice(0, 1);
                }
                if (!options.hasSubTree) {
                  options.type = "Right";
                }
              }
            }}
            //Defines the default node and connector properties
            getNodeDefaults={(obj: Node, diagram: Diagram) => {
              /* tslint:disable:no-string-literal */
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
      </div>

      <div
        className="col-lg-4 property-section"
        style={{ float: "right", height: "80%" }}
      >
        <div className="property-panel-header">Properties</div>
        <div className="row property-panel-content" id="appearance">
          <div className="row" style={{ paddingTop: "10px" }}>
            <div className="row row-header">Orientation</div>
            <div id="orientation">
              <div className="row" style={{ paddingTop: "8px" }}>
                <div
                  className="image-pattern-style e-selected-orientation-style"
                  id="toptobottom"
                  style={{
                    backgroundImage:
                      "url('src/diagram/Images/common-orientation/toptobottom.png')",
                    marginRight: "3px"
                  }}
                />
                <div
                  className="image-pattern-style"
                  id="bottomtotop"
                  style={{
                    backgroundImage:
                      "url('src/diagram/Images/common-orientation/bottomtotop.png')",
                    margin: "0px 3px"
                  }}
                />
                <div
                  className="image-pattern-style"
                  id="lefttoright"
                  style={{
                    backgroundImage:
                      "url('src/diagram/Images/common-orientation/lefttoright.png')",
                    marginRight: "0px 3px"
                  }}
                />
              </div>
              <div className="row" style={{ paddingTop: "8px" }}>
                <div
                  className="image-pattern-style"
                  id="righttoleft"
                  style={{
                    backgroundImage:
                      "url('src/diagram/Images/common-orientation/righttoleft.png')",
                    margin: "0px 3px"
                  }}
                />
              </div>
            </div>
            <div className="row row-header" style={{ paddingTop: "10px" }}>
              Subtree Alignment
            </div>
            <div id="pattern">
              <div className="row" style={{ paddingTop: "8px" }}>
                <div
                  className="image-pattern-style"
                  id="pattern1"
                  style={{
                    backgroundImage:
                      "url('src/diagram/patternimages/Pattern_1.png')",
                    marginRight: "3px"
                  }}
                />
                <div
                  className="image-pattern-style e-selected-pattern-style"
                  id="pattern2"
                  style={{
                    backgroundImage:
                      "url('src/diagram/patternimages/Pattern_2.png')",
                    marginRight: "3px"
                  }}
                />
                <div
                  className="image-pattern-style"
                  id="pattern5"
                  style={{
                    backgroundImage:
                      "url('src/diagram/patternimages/Pattern_5.png')",
                    margin: "0px 3px"
                  }}
                />
              </div>
              <div className="row" style={{ paddingTop: "8px" }}>
                <div
                  className="image-pattern-style"
                  id="pattern6"
                  style={{
                    backgroundImage:
                      "url('src/diagram/patternimages/Pattern_6.png')",
                    marginRight: "3px"
                  }}
                />
                <div
                  className="image-pattern-style"
                  id="pattern7"
                  style={{
                    backgroundImage:
                      "url('src/diagram/patternimages/Pattern_7.png')",
                    marginRight: "3px"
                  }}
                />
                <div
                  className="image-pattern-style"
                  id="pattern8"
                  style={{
                    backgroundImage:
                      "url('src/diagram/patternimages/Pattern_8.png')",
                    margin: "0px 3px"
                  }}
                />
              </div>
              <div className="row" style={{ paddingTop: "8px" }}>
                <div
                  className="image-pattern-style"
                  id="pattern9"
                  style={{
                    backgroundImage:
                      "url('src/diagram/patternimages/Pattern_9.png')",
                    margin: "0px 3px"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row property-panel-content" style={{ paddingTop: "10px" }}>
          <div className="row row-header">Behavior</div>
          <div className="row" style={{ paddingTop: "8px" }}>
            <div
              style={{ display: "table", height: "35px" }}
              className="col-xs-6"
            >
              <div style={{ display: "table-cell", verticalAlign: "middle" }}>
                Horizontal Spacing
              </div>
            </div>
            <div className="col-xs-6">
              <NumericTextBoxComponent
                ref={hSpacingRef => (hSpacing = hSpacingRef)}
                id="hSpacing"
                style={{ width: "100%" }}
                min={20}
                max={60}
                step={2}
                value={30}
                change={() => {
                  diagramInstance.layout.horizontalSpacing = Number(
                    hSpacing.value
                  );
                  diagramInstance.dataBind();
                }}
              />
            </div>
          </div>
          <div className="row" style={{ paddingTop: "8px" }}>
            <div
              style={{ display: "table", height: "35px" }}
              className="col-xs-6"
            >
              <div style={{ display: "table-cell", verticalAlign: "middle" }}>
                Vertical Spacing
              </div>
            </div>
            <div className="col-xs-6">
              <NumericTextBoxComponent
                ref={vSpacingRef => (vSpacing = vSpacingRef)}
                id="vSpacing"
                style={{ width: "100%" }}
                min={20}
                max={60}
                step={2}
                value={30}
                change={() => {
                  diagramInstance.layout.verticalSpacing = Number(
                    vSpacing.value
                  );
                  diagramInstance.dataBind();
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div id="action-description">
        <p>
          This sample illustrates a simple business management structure that
          is built from an external data source. Hierarchical tree layout
          algorithm is used to build organizational charts. Customizing the
          orientation and structure of the organizational chart is illustrated
          in this example.
        </p>
      </div>
      <div id="description">
        <p>
          This example shows how to generate an organizational chart from an
          external data source. The spacing between the objects can also be
          customized in the chart. The <code>horizontalSpacing</code> and{" "}
          <code>verticalSpacing</code> properties of
          <code>layout</code> can be used to customize the space between
          objects in a tree. The <code>layoutOrientation</code> property of
          <code>layout</code> can be used to change the orientation of the
          chart. The <code>getLayoutInfo</code> property of
          <code>layout</code> can be used to customize the tree structure. To
          change the tree structure, choose any template in the palette.
        </p>

        <p style={{ fontWeight: 500 }}>Injecting Module</p>
        <p>
          The diagram component’s features are segregated into individual
          feature-wise modules. To generate diagrams from an external data
          source, inject
          <code>DataBinding</code> module into <code>services</code>. To
          automatically arrange the objects in an organizational chart, inject
          <code>HierarchicalTree</code> module into <code>services</code>.
        </p>
        <br />
      </div>
    </div>
  );
}
export interface DataInfo {
  [key: string]: string;
}
export default OrganizationModel;
