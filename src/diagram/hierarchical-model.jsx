import * as React from "react";
import { LayoutAnimation, HierarchicalTree, DataBinding, DiagramComponent, SnapConstraints, Inject, DiagramTools } from "@syncfusion/ej2-react-diagrams";
import { SampleBase } from "../common/sample-base";
import { DataManager } from "@syncfusion/ej2-data";
import { NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { hierarchicalTree } from './diagram-data';
const SAMPLE_CSS = `.image-pattern-style {
        background-color: white;
        background-size: contain;
        background-repeat: no-repeat;
        height: 75px;
        width: calc((100% - 12px) / 3);
        cursor: pointer;
        border: 1px solid #D5D5D5;
        background-position: center;
        float: left;
    }

    .image-pattern-style:hover {
        border-color: gray;
        border-width: 2px;
    }

    .property-panel-header {
      padding-top: 15px;
      padding-bottom: 15px;
    }

    .row {
        margin-left: 0px;
        margin-right: 0px;
    }

    .row-header {
        font-size: 13px;
        font-weight: 500;
    }

    .e-checkbox-wrapper .e-label {
        font-size: 12px;
    }

    .e-selected-style {
        border-color: #006CE6;
        border-width: 2px;
    }

    .diagram-control-pane .col-xs-6 {
        padding-left: 0px;
        padding-right: 0px;
    }`;
let diagramInstance;
let hSpacing;
let vSpacing;
let checkBoxObj;
export class HierarchicalModel extends SampleBase {
    rendereComplete() {
        //Click event for Appearance of the Property Panel.
        document.getElementById("appearance").onclick = (args) => {
            let target = args.target;
            if (target.className === "image-pattern-style") {
                switch (target.id) {
                    case "toptobottom":
                        updatelayout(target, "TopToBottom");
                        break;
                    case "bottomtotop":
                        updatelayout(target, "BottomToTop");
                        break;
                    case "lefttoright":
                        updatelayout(target, "LeftToRight");
                        break;
                    case "righttoleft":
                        updatelayout(target, "RightToLeft");
                        break;
                }
            }
        };
    }
    render() {
        return (<div className="control-pane diagram-control-pane">
        <style>{SAMPLE_CSS}</style>
        <div className="col-lg-8 control-section">
          <div className="content-wrapper" style={{ width: "100%" }}>
            <DiagramComponent id="diagram" ref={diagram => (diagramInstance = diagram)} width={"100%"} height={"499px"} snapSettings={{ constraints: SnapConstraints.None }} //configures data source settings
         dataSourceSettings={{
            //sets the fields to bind
            id: "Name",
            parentId: "Category",
            dataSource: new DataManager(hierarchicalTree),
            doBinding: (nodeModel, data, diagram) => {
                nodeModel.shape = {
                    type: "Text",
                    content: data.Name
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
         getNodeDefaults={(obj, diagram) => {
            return nodeDefaults(obj, diagram);
        }} getConnectorDefaults={(connector, diagram) => {
            return connectorDefaults(connector, diagram);
        }}>
              <Inject services={[DataBinding, HierarchicalTree, LayoutAnimation]}/>
            </DiagramComponent>
          </div>
        </div>

        <div className="col-lg-4 property-section">
          <div className="property-panel-header">Properties</div>
          <div className="row property-panel-content" id="appearance">
            <div className="row row-header">Appearance</div>
            <div className="row" style={{ paddingTop: "8px" }}>
              <div className="image-pattern-style e-selected-style" id="toptobottom" style={{
            backgroundImage: "url('src/diagram/Images/common-orientation/toptobottom.png')",
            marginRight: "3px"
        }}/>
              <div className="image-pattern-style" id="bottomtotop" style={{
            backgroundImage: "url('src/diagram/Images/common-orientation/bottomtotop.png')",
            marginRight: "3px"
        }}/>
              <div className="image-pattern-style" id="lefttoright" style={{
            backgroundImage: "url('src/diagram/Images/common-orientation/lefttoright.png')",
            margin: "0px 3px"
        }}/>
            </div>
            <div className="row" style={{ paddingTop: "8px" }}>
              <div className="image-pattern-style" id="righttoleft" style={{
            backgroundImage: "url('src/diagram/Images/common-orientation/righttoleft.png')",
            margin: "0px 3px"
        }}/>
            </div>
          </div>
          <div className="row  property-panel-content" style={{ paddingTop: "10px" }}>
            <div className="row row-header">Behavior</div>
            <div className="row" style={{ paddingTop: "8px" }}>
              <div style={{ display: "table", height: "35px" }} className="col-xs-6">
                <div style={{ display: "table-cell", verticalAlign: "middle" }}>
                  Horizontal Spacing
                </div>
              </div>
              <div className="col-xs-6">
                <NumericTextBoxComponent ref={hSpacingRef => (hSpacing = hSpacingRef)} id="hSpacing" style={{ width: "100%" }} min={20} max={60} step={2} value={40} change={() => {
            diagramInstance.layout.horizontalSpacing = Number(hSpacing.value);
            diagramInstance.dataBind();
        }}/>
              </div>
            </div>
            <div className="row" style={{ paddingTop: "8px" }}>
              <div style={{ display: "table", height: "35px" }} className="col-xs-6">
                <div style={{ display: "table-cell", verticalAlign: "middle" }}>
                  Vertical Spacing
                </div>
              </div>
              <div className="col-xs-6">
                <NumericTextBoxComponent ref={vSpacingRef => (vSpacing = vSpacingRef)} id="vSpacing" style={{ width: "100%" }} min={20} max={60} step={2} value={30} change={() => {
            diagramInstance.layout.verticalSpacing = Number(vSpacing.value);
            diagramInstance.dataBind();
        }}/>
              </div>
            </div>
          </div>
        </div>
        <div id="action-description">
          <p>
            This sample illustrates a generating hierarchical tree
            from right to left orientation with external data source.
          </p>
        </div>
        <div id="description">
          <p>
            In this example, you can see how to generate a hierarchical tree
            from external data sources. You can also customize the spacing
            between the objects in the tree. You can use the
            <code>horizontalSpacing</code> and
            <code>verticalSpacing</code> properties of
            <code>layout</code> to customize the space between the objects in
            the tree. You can use the
            <code>layoutOrientation</code> property of
            <code>layout</code> to change the orientation of the tree.
          </p>
          <p>
            To change the orientation of the tree, click the templates that are
            added to the property panel.
          </p>

          <p style={{ fontWeight: 500 }}>Injecting Module</p>
          <p>
            Diagram component's features are segregated into individual
            feature-wise modules. To generate diagrams from external data
            source, we need to Inject
            <code>DataBinding</code> module into <code>services</code>. To
            automatically arrange the objects in a hierarchical structure, we
            need to Inject
            <code>HierarchicalTree</code> module into <code>services</code>.
          </p>
          <br />
        </div>
      </div>);
    }
}
//sets node default value
function nodeDefaults(obj, diagram) {
    obj.style = {
        fill: "#659be5",
        strokeColor: "none",
        color: "white",
        strokeWidth: 2
    };
    obj.borderColor = "#3a6eb5";
    obj.backgroundColor = "#659be5";
    obj.shape.margin = { left: 5, right: 5, bottom: 5, top: 5 };
    obj.expandIcon = {
        height: 10,
        width: 10,
        shape: "None",
        fill: "lightgray",
        offset: { x: 0.5, y: 1 }
    };
    obj.expandIcon.verticalAlignment = "Auto";
    obj.expandIcon.margin = { left: 0, right: 0, top: 0, bottom: 0 };
    obj.collapseIcon.offset = { x: 0.5, y: 1 };
    obj.collapseIcon.verticalAlignment = "Auto";
    obj.collapseIcon.margin = { left: 0, right: 0, top: 0, bottom: 0 };
    obj.collapseIcon.height = 10;
    obj.collapseIcon.width = 10;
    obj.collapseIcon.padding.top = 5;
    obj.collapseIcon.shape = "None";
    obj.collapseIcon.fill = "lightgray";
    return obj;
}
//sets connector default value
function connectorDefaults(connector, diagram) {
    connector.targetDecorator.shape = "None";
    connector.type = "Orthogonal";
    connector.style.strokeColor = "#6d6d6d";
    connector.constraints = 0;
    connector.cornerRadius = 5;
    return connector;
}
//update the orientation of the Layout.
function updatelayout(target, orientation) {
    diagramInstance.layout.orientation = orientation;
    diagramInstance.dataBind();
    diagramInstance.doLayout();
}
