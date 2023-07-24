import * as ReactDOM from "react-dom";
import * as React from "react";
import {
  HierarchicalTree,
  Container,
  StackPanel,
  ImageElement,
  TextElement,
  TreeInfo,
  SnapConstraints,
  DiagramComponent,
  ConnectorModel,
  Node,
  Connector,
  Diagram,
  Inject,
  DataBinding,
  OverviewComponent,
  DiagramTools,
  ISelectionChangeEventArgs
} from "@syncfusion/ej2-react-diagrams";
import { SampleBase } from "../common/sample-base";
import { DataManager } from "@syncfusion/ej2-data";
import { data } from './overview-data';
import {
    ItemDirective,
    ItemsDirective,
    ToolbarComponent,
  } from '@syncfusion/ej2-react-navigations';


let diagramInstance: DiagramComponent;
let toolbarEditor:ToolbarComponent;
export class ZoomAndPan extends SampleBase<{}, {}> {
  render() {
    return (
      <div className="control-pane">
        <div className="col-lg-12 control-section">
          <div className="content-wrapper" style={{ width: "100%" }}>
            <div>
                <ToolbarComponent
                ref={(toolbar) => (toolbarEditor = toolbar)}
                id="toolbar_diagram"
                clicked={tooledit}
                >
                <ItemsDirective>
                <ItemDirective
                    prefixIcon="e-icons e-zoom-in"
                    tooltipText="Zoom In"
                />
                <ItemDirective
                    prefixIcon="e-icons e-zoom-out"
                    tooltipText="Zoom Out"
                />
                <ItemDirective type="Separator" />
                <ItemDirective
                    prefixIcon="e-icons e-mouse-pointer"
                    tooltipText="Select"
                />
                <ItemDirective
                    prefixIcon="e-icons e-pan"
                    tooltipText="Pan Tool"
                />
                <ItemDirective type="Separator" />
                <ItemDirective prefixIcon="e-icons e-reset" tooltipText="Reset" />
                <ItemDirective
                    prefixIcon="e-icons e-zoom-to-fit"
                    tooltipText="Fit To Page"
                />
                <ItemDirective type="Separator" />
                <ItemDirective
                    prefixIcon="e-icons e-bring-to-view"
                    tooltipText="Bring Into View"
                    disabled={true}
                />
                <ItemDirective
                    prefixIcon="e-icons e-bring-to-center"
                    tooltipText="Bring Into Center"
                    disabled={true}
                />
                </ItemsDirective>
            </ToolbarComponent>
            </div>
            <div>
                <DiagramComponent
                id="diagram"
                ref={diagram => (diagramInstance = diagram)}
                width={"100%"}
                height={"590px"}
                scrollSettings={{ scrollLimit: "Infinity" }} //Sets the constraints of the SnapSettings
                snapSettings={{ constraints: SnapConstraints.None }} //Configrues organizational chart layout
                layout={{
                    type: "OrganizationalChart",
                    margin: { top: 20 },
                    getLayoutInfo: (node: Node, tree: TreeInfo) => {
                    if (!tree.hasSubTree) {
                        tree.orientation = "Vertical";
                        tree.type = "Right";
                    }
                    }
                }}
                selectionChange={(args:ISelectionChangeEventArgs) => {
                  if (args.state === 'Changed') {
                    let selectedItems:any = diagramInstance.selectedItems.nodes;
                    if (selectedItems.length === 0) {
                      toolbarEditor.items[9].disabled = true;
                      toolbarEditor.items[10].disabled = true;
                    }
                    if (selectedItems.length === 1) {
                      toolbarEditor.items[9].disabled = false;
                      toolbarEditor.items[10].disabled = false;
                    }
                    if (selectedItems.length > 1) {
                      toolbarEditor.items[9].disabled = false;
                      toolbarEditor.items[10].disabled = false;
                    }
                  }
                }}
                 //Sets the parent and child relationship of DataSource.
                dataSourceSettings={{
                    id: "Id",
                    parentId: "ReportingPerson",
                    dataSource: new DataManager(data)
                }} //Sets the default values of Node
                getNodeDefaults={(obj: Node, diagram: Diagram) => {
                    obj.height = 50;
                    obj.style = { fill: "transparent", strokeWidth: 2 };
                    return obj;
                }} //Sets the default values of connector
                getConnectorDefaults={(
                    connector: ConnectorModel,
                    diagram: Diagram
                ) => {
                    connector.targetDecorator.shape = "None";
                    connector.type = "Orthogonal";
                    return connector;
                }}
                //customization of the node.
                setNodeTemplate={(obj: Node, diagram: Diagram): Container => {
                    return setNodeTemplate(obj, diagram);
                }}
                >
                <Inject services={[DataBinding, HierarchicalTree]} />
                </DiagramComponent>
            </div>
          </div>
        </div>
        <div id="action-description">
        <p>
            This sample illustrates how to zoom and pan in the diagram.
        </p>
        </div>
        <div id="description">
            <p>
                This example explains zooming, panning, reset, fit to page, bring into view, and bring to center. 
            </p>
            <p>
                The <code>fitToPage</code> method adjusts the zoom level of a diagram so that all its content is visible within the viewport.
            </p>
            <p>
                The <code>bringIntoView</code> method brings the specified rectangular or bounds region into the diagram viewport.
            </p>
            <p>
                The <code>bringToCenter</code> method brings the specified rectangular region of the diagram content to the center of the viewport. You can zoom in and out using the zoom method, and reset the zoom and scroller offsets to default values using the reset zoom method.
            </p>
            <p>
                In this sample,  use <code>pan</code>, <code>reset</code>, <code>zoomIn</code>, and <code>ZoomOut</code> options to pan, reset the zoom and zoomin/out the diagram. 
            </p>
            <br />
        </div>
      </div>
    );
  }
}

//Funtion to add the Template of the Node.
function setNodeTemplate(obj: Node, diagram: Diagram): Container {
  let content: StackPanel = new StackPanel();
  content.id = obj.id + "_outerstack";
  content.orientation = "Horizontal";
  content.style.strokeColor = "gray";
  content.padding = { left: 5, right: 10, top: 5, bottom: 5 };
  let image: ImageElement = new ImageElement();
  image.width = 50;
  image.height = 50;
  image.style.strokeColor = "none";
  image.source = (obj.data as EmployeeInfo).ImageUrl;
  image.id = obj.id + "_pic";
  let innerStack: StackPanel = new StackPanel();
  innerStack.style.strokeColor = "none";
  innerStack.margin = { left: 5, right: 0, top: 0, bottom: 0 };
  innerStack.id = obj.id + "_innerstack";

  let text: TextElement = new TextElement();
  text.content = (obj.data as EmployeeInfo).Name;
  text.style.color = "black";
  text.style.bold = true;
  text.style.strokeColor = "none";
  text.style.fill = "none";
  text.id = obj.id + "_text1";

  let desigText: TextElement = new TextElement();
  desigText.margin = { left: 0, right: 0, top: 5, bottom: 0 };
  desigText.content = (obj.data as EmployeeInfo).Designation;
  desigText.style.color = "black";
  desigText.style.strokeColor = "none";
  desigText.style.fill = "none";
  desigText.style.textWrapping = "Wrap";
  desigText.id = obj.id + "_desig";
  innerStack.children = [text, desigText];

  content.children = [image, innerStack];

  return content;
}
function tooledit(args:any) {
    switch (args.item.tooltipText) {
      case 'Zoom In':
        let zoomin:any = { type: 'ZoomIn', zoomFactor: 0.2 };
        diagramInstance.zoomTo(zoomin);
        break;
      case 'Zoom Out':
        let zoomout:any = { type: 'ZoomOut', zoomFactor: 0.2 };
        diagramInstance.zoomTo(zoomout);
        break;
      case 'Select':
        diagramInstance.clearSelection();
        diagramInstance.drawingObject = {};
        diagramInstance.tool =
          DiagramTools.SingleSelect | DiagramTools.MultipleSelect;
        break;
      case 'Pan Tool':
        diagramInstance.tool = DiagramTools.ZoomPan;
        break;
      case 'Reset':
        diagramInstance.reset();
        break;
      case 'Fit To Page':
        diagramInstance.fitToPage();
        break;
      case 'Bring Into View':
        if (diagramInstance.selectedItems.nodes.length > 0) {
        let bound:any = diagramInstance.selectedItems.nodes[0].wrapper.bounds;
        diagramInstance.bringIntoView(bound);
        }
        break;
      case 'Bring Into Center':
        if (diagramInstance.selectedItems.nodes.length > 0) {
        let bounds:any = diagramInstance.selectedItems.nodes[0].wrapper.bounds;
        diagramInstance.bringToCenter(bounds);
        }
        break;
    }
  }

export interface EmployeeInfo {
  Name: string;
  Designation: string;
  ImageUrl: string;
}
