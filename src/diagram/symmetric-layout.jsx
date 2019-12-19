import * as React from "react";
import { SymmetricLayout as SymmetricalLayoutModule, DataBinding, DiagramComponent, SnapConstraints, Inject, DiagramTools } from "@syncfusion/ej2-react-diagrams";
import { SampleBase } from "../common/sample-base";
import { DataManager } from "@syncfusion/ej2-data";
import { NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { data } from './diagram-data';
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
let springLength;
let springfactor;
let maxiteration;
export class SymmetricLayout extends SampleBase {
    rendereComplete() {
        //used to apply the alignment of the layout.
        document.getElementById("refresh").onclick = () => {
            diagramInstance.layout.springLength = springLength.value;
            diagramInstance.layout.springFactor = springfactor.value;
            diagramInstance.layout.maxIteration = maxiteration.value;
            diagramInstance.doLayout();
        };
    }
    render() {
        return (<div className="control-pane">
        <div className="col-lg-8 control-section">
          <div className="content-wrapper">
            <DiagramComponent id="diagram" ref={diagram => (diagramInstance = diagram)} width={"100%"} height={"550px"} layout={{
            type: "SymmetricalLayout",
            springLength: 80,
            springFactor: 0.8,
            maxIteration: 500,
            margin: { left: 20, top: 20 }
        }} 
        //Sets the parent and child relationship of DataSource.
        dataSourceSettings={{
            id: "Id",
            parentId: "Source",
            dataSource: new DataManager(data)
        }} 
        //Sets the constraints of the SnapSettings
        snapSettings={{ constraints: SnapConstraints.None }} 
        //Sets the default values of Node
        getNodeDefaults={(obj, diagram) => {
            obj.height = 20;
            obj.width = 20;
            obj.style = { fill: "transparent", strokeWidth: 2 };
            return obj;
        }} 
        //Sets the default values of connector
        getConnectorDefaults={(connector, diagram) => {
            connector.targetDecorator.shape = "None";
            connector.type = "Straight";
            return connector;
        }} setNodeTemplate={(obj, diagram) => {
            setNodeTemplate(obj, diagram);
        }} tool={DiagramTools.ZoomPan}>
              <Inject services={[DataBinding, SymmetricalLayoutModule]}/>
            </DiagramComponent>
          </div>
        </div>

        <div className="col-lg-4 property-section">
          <div className="property-panel-header">Properties</div>
          <table id="property">
            <tr>
              <td style={{ width: "30%" }}> Spring Length </td>
              <td style={{ width: "60%" }}>
                <NumericTextBoxComponent id="springlength" ref={lenref => (springLength = lenref)} format={"###.##"} value={80} step={1}/>
              </td>
            </tr>
            <tr>
              <td style={{ width: "30%" }}>Spring Factor</td>
              <td style={{ width: "60%" }}>
                <NumericTextBoxComponent id="springfactor" ref={lenref => (springfactor = lenref)} format={"###.##"} value={0.8} step={0.1}/>
              </td>
            </tr>
            <tr>
              <td style={{ width: "30%" }}>Maximum Iteration</td>
              <td style={{ width: "60%" }}>
                <NumericTextBoxComponent id="maxiteration" ref={lenref => (maxiteration = lenref)} format={"###.##"} value={500} step={1}/>
              </td>
            </tr>
            <tr>
              <td style={{ width: "50%" }}/>
              <td style={{ width: "50%" }}>
                <ButtonComponent id="refresh">Refresh</ButtonComponent>
              </td>
            </tr>
          </table>
        </div>
        <div id="action-description">
          <p>
            This sample visualizes a simple network template using symmetrical
            layout algorithm.
          </p>
        </div>
        <div id="description">
          <p>
            This view is well suited for large networks and is commonly used in
            network component diagrams. It is typically used with simple
            straight line links. This example shows how to arrange nodes in a
            symmetrical structure. The
            <code>layout</code> property of the diagram can be used to enable
            it.
          </p>

          <p style={{ fontWeight: 500 }}>Injecting Module</p>
          <p>
            The diagram component’s features are segregated into individual
            feature-wise modules. To generate diagrams from an external data
            source, inject <code>DataBinding</code> module into{" "}
            <code>services</code>. To automatically arrange the objects in a
            symmetrical structure, inject <code>SymmetricalLayout</code> module
            into <code>services</code>.
          </p>
          <br />
        </div>
      </div>);
    }
}
//Funtion to add the Template of the Node.
function setNodeTemplate(obj, diagram) {
    let shape = { type: "Basic", shape: "Ellipse" };
    if (!obj.data.Type ||
        obj.data.Type === "Server") {
        obj.width = 30;
        obj.height = 30;
        obj.shape = {
            type: "Native",
            content: '<svg width="50" height="65"><g id="Server2_shape" fill="transparent" stroke="transparent" stroke-width="1"' +
                ' opacity="1" stroke-dasharray="" transform="translate(-15.517241379310343,-2.6329421835819375),' +
                'scale(1.7241379310344827,1.3774530437803194)" width="50" height="65"><g><g xmlns="http://www.w3.org/2000/svg">' +
                '<polygon fill="#DBD5DA" points="37.3,7.3 19.4,17.8 9.8,12.1 9.2,12.9 19,18.7 19,49 20,49 20,18.5 37.8,8.1  ">' +
                '</polygon>    <polygon fill="#E5DCE1" points="36.3,7.8 28.2,2.6 10.5,12.5 19.5,17.8  "></polygon> <polygon' +
                ' fill="#BBB5B9" points="20,18.5 37,8.6 36.9,38.4 20,47.9  "></polygon> <polygon fill="#DBD2D7" ' +
                'points="10,13.4 19,18.7 19,48.2 10,42.7  "></polygon>    <path fill="#656666" d="M19.2,49.1c-0.5,' +
                "0-0.9-0.1-1.3-0.4L10.2,44C9.4,43.5,9,42.7,9,41.8V13.6c0-0.9,0.5-1.7,1.3-2.2l16.7-9.2   c0.8-0.4,1.8-0.4," +
                "2.5,0.1L36.8,7C37.6,7.5,38,8.2,38,9.1l-0.1,28.4c0,0.9-0.5,1.7-1.3,2.2l-16.2,9.1C20.1,49,19.6,49.1,19.2,49.1z " +
                "M28.1,2.9c-0.3,0-0.5,0.1-0.7,0.2l-16.6,9.2c-0.5,0.3-0.8,0.8-0.8,1.3v28.2c0,0.5,0.3,1,0.7,1.3l7.7,4.8c0.5,0.3," +
                '1.1,0.3,1.5,0  l16.2-9.1c0.5-0.3,0.8-0.8,0.8-1.3L37,9.1c0-0.5-0.3-1-0.7-1.3L29,3.2C28.7,3,28.4,2.9,28.1,2.9z">' +
                '</path><ellipse fill="#656666"  cx="14.3" cy="40.2" rx="0.6" ry="1.1"></ellipse> <polygon fill="#656666" ' +
                'points="10.9,22.6 10.9,22.6 10.9,22.6  "></polygon> <polygon fill="#656666" class="st4ed" points="11.9,' +
                '22 11.9,23.2 16.7,26 16.7,24.9 "></polygon><polygon fill="#656666" points="10.9,18.9 10.9,18.9 10.9,18.9"></polygon>' +
                '<polygon fill="#656666" points="11.9,18.4 11.9,19.5 16.7,22.4 16.7,21.2  "></polygon></g></g></g></svg>'
        };
    }
    else {
        obj.shape = shape;
        obj.style = { fill: "orange" };
    }
}
