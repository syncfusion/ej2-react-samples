import * as React from "react";
import { StackPanel, ComplexHierarchicalTree, randomId, TextElement, HierarchicalTree, DataBinding, DiagramComponent, SnapConstraints, Inject, DiagramTools } from "@syncfusion/ej2-react-diagrams";
import { SampleBase } from "../common/sample-base";
import { DataManager } from "@syncfusion/ej2-data";
import { pertChartData } from './diagram-data';
function getTextElement(text, alignment, width, valignment) {
    let textElement = new TextElement();
    textElement.content = text;
    textElement.id = randomId();
    textElement.width = width;
    textElement.height = 25;
    textElement.horizontalAlignment = alignment;
    textElement.verticalAlignment = valignment;
    textElement.style.strokeWidth = 1;
    textElement.style.strokeColor = "#b5b5b5";
    textElement.style.fill = "transparent";
    textElement.style.color = "#3c3c3c";
    textElement.relativeMode = "Object";
    return textElement;
}
let sDate = "startDate";
let eDate = "endDate";
let duration = "duration";
let addRows = (column, node) => {
    column.children.push(getTextElement(node.data[sDate], "Left", 70));
    column.children.push(getTextElement(node.data[duration], "Center", 30));
    column.children.push(getTextElement(node.data[eDate], "Right", 70));
};
let diagramInstance;
export class PertChart extends SampleBase {
    rendereComplete() {
        diagramInstance.fitToPage();
    }
    render() {
        return (<div className="control-pane">
        <div className="control-section">
          <div style={{ width: "100%" }}>
            <DiagramComponent id="diagram" ref={diagram => (diagramInstance = diagram)} width={"100%"} height={"499px"} snapSettings={{ constraints: SnapConstraints.None }} dataSourceSettings={{
            id: "id",
            parentId: "Category",
            dataSource: new DataManager(pertChartData),
            doBinding: (nodeModel, data, diagram) => {
                let shape = "shape";
                let name = "id";
                /* tslint:disable:no-string-literal */
                nodeModel["shape"] = { type: "Text" };
            }
        }} layout={{
            type: "ComplexHierarchicalTree",
            orientation: "LeftToRight",
            verticalSpacing: 100,
            horizontalSpacing: 70
        }} //Sets the default values of connector
         getConnectorDefaults={(connector, diagram) => {
            connector.type = "Straight";
            connector.style.strokeColor = "#979797";
            connector.targetDecorator.width = 10;
            connector.targetDecorator.height = 10;
            connector.targetDecorator.style = {
                fill: "#979797",
                strokeColor: "#979797"
            };
            return connector;
        }} 
        //used to customize template of the node.
        setNodeTemplate={(node) => {
            return getNodeTemplate(node);
        }} tool={DiagramTools.ZoomPan}>
              <Inject services={[
            DataBinding,
            HierarchicalTree,
            ComplexHierarchicalTree
        ]}/>
            </DiagramComponent>
          </div>
        </div>
        <div id="action-description">
          <p>
            This sample visualizes a project development process using Program
            Evaluation Review Technique (PERT). Complex hierarchical tree layout
            algorithm is used to automatically arrange the nodes.
          </p>
        </div>
        <div id="description">
          <p>
            This example shows how to generate a PERT chart from an external
            data source. The <code>dataSourceSettings</code> property can be
            used to map an external data source with the diagram control. The{" "}
            <code>layout</code> property can be used to automatically position
            the nodes. In this example, the nodes are arranged from left to
            right of the diagram. The <code>orientation</code> property can be
            used to define the orientation of the layouts.
          </p>

          <p style={{ fontWeight: 500 }}>Injecting Module</p>
          <p>
            The diagram component’s features are segregated into individual
            feature-wise modules. To generate diagrams from an external data
            source, inject <code>DataBinding</code> module into{" "}
            <code>services</code>. To automatically arrange the objects in a
            PERT Chart, inject
            <code>ComplexHierarchicalTree</code> module into{" "}
            <code>services</code>.
          </p>
          <br />
        </div>
      </div>);
    }
}
//customization of the node template.
function getNodeTemplate(node) {
    let table = new StackPanel();
    table.style.fill = "#0069d9";
    table.id = randomId();
    table.orientation = "Vertical";
    let nameKey = "id";
    let stack = new StackPanel();
    stack.children = [];
    stack.id = randomId();
    stack.height = 25;
    stack.orientation = "Horizontal";
    stack.style.fill = "white";
    stack.horizontalAlignment = "Stretch";
    addRows(stack, node);
    table.children = [
        getTextElement(node.data[nameKey], "Stretch", 170, "Stretch"),
        stack
    ];
    table.children[0].style.color = "white";
    table.children[0].style.fontSize = 14;
    return table;
}
