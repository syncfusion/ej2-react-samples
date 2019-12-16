import * as React from "react";
import { HierarchicalTree, StackPanel, ImageElement, TextElement, SnapConstraints, DiagramComponent, Inject, DataBinding, OverviewComponent, DiagramTools } from "@syncfusion/ej2-react-diagrams";
import { SampleBase } from "../common/sample-base";
import { DataManager } from "@syncfusion/ej2-data";
import { data } from './overview-data';
let diagramInstance;
export class Overview extends SampleBase {
    render() {
        return (<div className="control-pane">
        <div className="col-lg-12 control-section">
          <div className="content-wrapper">
            <DiagramComponent id="diagram" ref={diagram => (diagramInstance = diagram)} width={"100%"} height={"590px"} tool={DiagramTools.ZoomPan} scrollSettings={{ scrollLimit: "Infinity" }} //Sets the constraints of the SnapSettings
         snapSettings={{ constraints: SnapConstraints.None }} //Configrues organizational chart layout
         layout={{
            type: "OrganizationalChart",
            margin: { top: 20 },
            getLayoutInfo: (node, tree) => {
                if (!tree.hasSubTree) {
                    tree.orientation = "Vertical";
                    tree.type = "Right";
                }
            }
        }} //Sets the parent and child relationship of DataSource.
         dataSourceSettings={{
            id: "Id",
            parentId: "ReportingPerson",
            dataSource: new DataManager(data)
        }} //Sets the default values of Node
         getNodeDefaults={(obj, diagram) => {
            obj.height = 50;
            obj.style = { fill: "transparent", strokeWidth: 2 };
            return obj;
        }} //Sets the default values of connector
         getConnectorDefaults={(connector, diagram) => {
            connector.targetDecorator.shape = "None";
            connector.type = "Orthogonal";
            return connector;
        }} 
        //customization of the node.
        setNodeTemplate={(obj, diagram) => {
            return setNodeTemplate(obj, diagram);
        }}>
              <Inject services={[DataBinding, HierarchicalTree]}/>
            </DiagramComponent>
          </div>
        </div>
        <div className="col-lg-4" style={{
            width: "50%",
            padding: "0px",
            right: "30px",
            bottom: "20px",
            border: "#eeeeee",
            borderStyle: "solid",
            boxShadow: "0px 2px 2px rgba(0,0,0,0.3)",
            background: "#f7f7f7",
            position: "absolute"
        }}>
          <OverviewComponent id="overview" style={{ top: "30px" }} sourceID="diagram" width={"100%"} height={"150px"}/>
        </div>
        <div id="action-description">
          <p>
            This sample visualizes an organizational structure along with an
            overview for easily navigating the large organizational structure
            using Overview control.
          </p>
        </div>
        <div id="description">
          <p>
            This example shows how to render the overview control and how to
            display a preview (overall view) of the entire content of a diagram.
            This helps you look at the overall picture of a large diagram and
            also to navigate (pan or zoom) to a particular position of the page.
            The <code>sourceID</code> property can be used to map the diagram
            control with overview.
          </p>
          <br />
        </div>
      </div>);
    }
}
//Funtion to add the Template of the Node.
function setNodeTemplate(obj, diagram) {
    let content = new StackPanel();
    content.id = obj.id + "_outerstack";
    content.orientation = "Horizontal";
    content.style.strokeColor = "gray";
    content.padding = { left: 5, right: 10, top: 5, bottom: 5 };
    let image = new ImageElement();
    image.width = 50;
    image.height = 50;
    image.style.strokeColor = "none";
    image.source = obj.data.ImageUrl;
    image.id = obj.id + "_pic";
    let innerStack = new StackPanel();
    innerStack.style.strokeColor = "none";
    innerStack.margin = { left: 5, right: 0, top: 0, bottom: 0 };
    innerStack.id = obj.id + "_innerstack";
    let text = new TextElement();
    text.content = obj.data.Name;
    text.style.color = "black";
    text.style.bold = true;
    text.style.strokeColor = "none";
    text.style.fill = "none";
    text.id = obj.id + "_text1";
    let desigText = new TextElement();
    desigText.margin = { left: 0, right: 0, top: 5, bottom: 0 };
    desigText.content = obj.data.Designation;
    desigText.style.color = "black";
    desigText.style.strokeColor = "none";
    desigText.style.fill = "none";
    desigText.style.textWrapping = "Wrap";
    desigText.id = obj.id + "_desig";
    innerStack.children = [text, desigText];
    content.children = [image, innerStack];
    return content;
}
