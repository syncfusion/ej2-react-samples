import * as ReactDOM from "react-dom";
import * as React from "react";
import {
  Node,
  Connector,
  ComplexHierarchicalTree,
  DataBinding,
  DiagramComponent,
  Diagram,
  NodeModel,
  Inject,
  DiagramTools,
  LayoutOrientation
} from "@syncfusion/ej2-react-diagrams";
import { SampleBase } from "../common/sample-base";
import { DataManager } from "@syncfusion/ej2-data";
import {
  NumericTextBoxComponent,
  ChangeEventArgs
} from "@syncfusion/ej2-react-inputs";
import { multiParentData, DataInfo } from './diagram-data';

const SAMPLE_CSS = `.image-pattern-style {
    background-color: white;
    background-size: contain;
    background-repeat: no-repeat;
    height: 50px;
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
    font-size: 15px;
    font-weight: 500;
}

.e-selected-style {
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

export interface DataInfo {
  [key: string]: string;
}

let diagramInstance: DiagramComponent;
let marginTopObj: NumericTextBoxComponent;
let marginLeftObj: NumericTextBoxComponent;
let horizontalSpacingObj: NumericTextBoxComponent;
let verticalSpacingObj: NumericTextBoxComponent;

export class ComplexHierarchicalModel extends SampleBase<{}, {}> {
  rendereComplete() {
    diagramInstance.fitToPage();
    //Click Event for Appearance of the layout.
    document.getElementById("appearance").onclick = (args: MouseEvent) => {
      let target: HTMLElement = args.target as HTMLElement;
      // custom code start
      let selectedElement: HTMLCollection = document.getElementsByClassName(
        "e-selected-style"
      );
      // custom code end
      if (selectedElement.length) {
        selectedElement[0].classList.remove("e-selected-style");
      }
      if (target.className === "image-pattern-style") {
        switch (target.id) {
          case "toptobottom":
            updateLayout(target, "TopToBottom");
            break;
          case "bottomtotop":
            updateLayout(target, "BottomToTop");
            break;
          case "lefttoright":
            updateLayout(target, "LeftToRight");
            break;
          case "righttoleft":
            updateLayout(target, "RightToLeft");
            break;
        }
      }
    };
  }
  render() {
    return (
      <div className="control-pane diagram-control-pane">
        <style>{SAMPLE_CSS}</style>
        <div className="col-lg-8 control-section">
          <div className="content-wrapper" style={{width : "100%"}}>
            <DiagramComponent
              id="diagram"
              ref={diagram => (diagramInstance = diagram)}
              width={"100%"}
              height={580}
              layout={
                {
                  type: "ComplexHierarchicalTree",
                  horizontalSpacing: 40,
                  verticalSpacing: 40,
                  orientation: "TopToBottom",
                  margin: { left: 10, right: 0, top: 50, bottom: 0 }
                } //Configrues hierarchical tree layout
              }
              getNodeDefaults={(obj: Node) => {
                //Sets the default values of nodes
                obj.width = 40;
                obj.height = 40;
                //Initialize shape
                obj.shape = {
                  type: "Basic",
                  shape: "Rectangle",
                  cornerRadius: 7
                };
              }}
              getConnectorDefaults={(connector: Connector) => {
                //Sets the default values of connector
                connector.type = "Orthogonal";
                connector.cornerRadius = 7;
                connector.targetDecorator.height = 7;
                connector.targetDecorator.width = 7;
                connector.style.strokeColor = "#6d6d6d";
              }}
              dataSourceSettings={{
                id: "Name",
                parentId: "ReportingPerson",
                dataSource: new DataManager(multiParentData as JSON[]),
                doBinding: (
                  nodeModel: NodeModel,
                  data: DataInfo,
                  diagram: Diagram
                ) => {
                  //Configures data source
                  //binds the external data with node
                  /* tslint:disable:no-string-literal */
                  nodeModel.style = {
                    fill: data["fillColor"],
                    strokeWidth: 1,
                    strokeColor: data["border"]
                  };
                }
              }}
              tool={
                DiagramTools.ZoomPan //Disables all interactions except zoom/pan
              }
              snapSettings={{ constraints: 0 }}
            >
              <Inject services={[DataBinding, ComplexHierarchicalTree]} />
            </DiagramComponent>
          </div>
        </div>

        <div className="col-lg-4 property-section">
          <div className="property-panel-header">Layout Settings</div>
          <div className="row property-panel-content" id="appearance"  style={{ paddingTop: "10px" }}>
            <div className="row row-header">Orientation</div>
            <div className="row" style={{ paddingTop: "8px" }}>
              <div
                className="image-pattern-style  e-selected-style"
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
                  marginRight: "3px"
                }}
              />
              <div
                className="image-pattern-style"
                id="lefttoright"
                style={{
                  backgroundImage:
                    "url('src/diagram/Images/common-orientation/lefttoright.png')",
                  margin: "0px 3px"
                }}
              />
            </div>
            <div className="row"  style={{ paddingTop: "8px" }}>
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
          <div className="row property-panel-content"  style={{ paddingTop: "10px" }}>
            <div className="row row-header">Behaviour</div>
            <div className="row" style={{ paddingTop: "8px" }}>
              <div
                style={{ display: "table", height: "35px", paddingLeft: "0px" }}
                className="col-xs-5"
              >
                <div style={{ display: "table-cell", verticalAlign: "middle" }}>
                  Margin X
                </div>
              </div>
              <div className="col-xs-7">
                {/* used NumericTextBox for left margin of the layout. */}
                <NumericTextBoxComponent
                  ref={marginLeftObjRef => (marginLeftObj = marginLeftObjRef)}
                  id="marginLeft"
                  value={10}
                  step={1}
                  format={"##.##"}
                  change={(args: ChangeEventArgs) => {
                    update("left");
                  }}
                />
              </div>
            </div>
            <div className="row" style={{ paddingTop: "8px" }}>
              <div
                style={{ display: "table", height: "35px", paddingLeft: "0px" }}
                className="col-xs-5"
              >
                <div style={{ display: "table-cell", verticalAlign: "middle" }}>
                  Margin Y
                </div>
              </div>
              <div className="col-xs-7">
                {/* used NumericTextBox for top margin of the layout. */}
                <NumericTextBoxComponent
                  ref={marginTopObjRef => (marginTopObj = marginTopObjRef)}
                  id="marginTop"
                  value={50}
                  step={1}
                  format={"##.##"}
                  change={(args: ChangeEventArgs) => {
                    update("top");
                  }}
                />
              </div>
            </div>
            <div className="row" style={{ paddingTop: "8px" }}>
              <div
                style={{ display: "table", height: "35px", paddingLeft: "0px" }}
                className="col-xs-5"
              >
                <div style={{ display: "table-cell", verticalAlign: "middle" }}>
                  Horizontal Spacing
                </div>
              </div>
              <div className="col-xs-7">
                {/* used NumericTextBox for horizontalspacing of the layout. */}
                <NumericTextBoxComponent
                  ref={horizontalSpacingObjRef =>
                    (horizontalSpacingObj = horizontalSpacingObjRef)
                  }
                  id="horiontal"
                  value={40}
                  step={1}
                  format={"##.##"}
                  change={(args: ChangeEventArgs) => {
                    update("hspacing");
                  }}
                />
              </div>
            </div>
            <div className="row" style={{ paddingTop: "8px" }}>
              <div
                style={{ display: "table", height: "35px", paddingLeft: "0px" }}
                className="col-xs-5"
              >
                <div style={{ display: "table-cell", verticalAlign: "middle" }}>
                  Vertical Spacing
                </div>
              </div>
              <div className="col-xs-7">
                {/* used NumericTextBox for verticalspacing of the layout. */}
                <NumericTextBoxComponent
                  ref={verticalSpacingObjRef =>
                    (verticalSpacingObj = verticalSpacingObjRef)
                  }
                  id="vertical"
                  value={40}
                  step={1}
                  format={"##.##"}
                  change={(args: ChangeEventArgs) => {
                    update("vspacing");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div id="action-description">
          <p>
            This sample demonstrates a complex hierarchical template that is
            built from an external data source using complex hierarchical tree
            algorithm.
          </p>
        </div>
        <div id="description">
          <p>
            In this example, you can see how to generate a complex hierarchical
            tree from external data sources. You can also customize spacing
            between the objects in the tree. You can use the
            <code>horizontalSpacing</code> and <code>verticalSpacing</code>{" "}
            properties of <code>layout</code> to customize the space between the
            objects in the tree. You can use the <code>layoutOrientation</code>{" "}
            property of
            <code>layout</code> to change the orientation of the tree.
          </p>
          <p>
            To change the orientation of the tree, click the templates in the
            property panel.
          </p>

          <p style={{ fontWeight: 500 }}>Injecting Module</p>
          <p>
            Diagram component's features are segregated into individual
            feature-wise modules. To generate diagrams from an external data
            source, we need to Inject <code>DataBinding</code> module into{" "}
            <code>services</code>. To automatically arrange the objects in a
            hierarchical structure, we need to Inject{" "}
            <code>ComplexHierarchicalTree</code> module into{" "}
            <code>services</code>.
          </p>
          <br />
        </div>
      </div>
    );
  }
}
//Apply the orientation for multiple parent layout.
function updateLayout(
  target: HTMLElement,
  orientation: LayoutOrientation
): void {
  diagramInstance.layout.orientation = orientation;
  diagramInstance.dataBind();
  diagramInstance.doLayout();
  target.classList.add("e-selected-style");
}

//Apply the Alignment for the layout.
function update(value: string): void {
  if (value === "left") {
    diagramInstance.layout.margin.left = marginLeftObj.value;
  } else if (value === "top") {
    diagramInstance.layout.margin.top = marginTopObj.value;
  } else if (value === "hspacing") {
    diagramInstance.layout.horizontalSpacing = horizontalSpacingObj.value;
  } else if (value === "vspacing") {
    diagramInstance.layout.verticalSpacing = verticalSpacingObj.value;
  }
  diagramInstance.dataBind();
}
