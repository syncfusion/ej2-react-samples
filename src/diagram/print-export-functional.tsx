import * as ReactDOM from "react-dom";
import * as React from "react";
import {
  PrintAndExport,
  IExportOptions,
  DiagramComponent,
  NodeModel,
  ConnectorModel,
  BasicShapeModel,
  Node,
  Connector,
  Diagram,
  Inject,
  FileFormats,
  SnapConstraints
} from "@syncfusion/ej2-react-diagrams";
import { updateSampleSection } from "../common/sample-base";
import {
  ToolbarComponent,
  ClickEventArgs,
  ItemsDirective,
  ItemDirective
} from "@syncfusion/ej2-react-navigations";
import {
  DropDownListComponent,
  ChangeEventArgs
} from "@syncfusion/ej2-react-dropdowns";
import { CheckBoxComponent, ButtonComponent } from "@syncfusion/ej2-react-buttons";
import {
  DropDownButtonComponent,
  ItemModel,
  MenuEventArgs
} from "@syncfusion/ej2-react-splitbuttons";
import "./font-icons.css";

let shape: BasicShapeModel = {
  type: "Basic",
  shape: "Rectangle",
  cornerRadius: 10
};

let nodes: NodeModel[] = [
  {
    id: "sourceNode1",
    width: 100,
    height: 50,
    offsetX: 120,
    offsetY: 100,
    style: { strokeColor: "#868686", fill: "#d5f5d5" },
    annotations: [
      {
        content: "Source Document",
        margin: { left: 15, right: 15, bottom: 15, top: 15 }
      }
    ]
  },
  {
    id: "censusNode2",
    width: 100,
    height: 75,
    offsetX: 120,
    offsetY: 200,
    shape: { type: "Basic", shape: "Diamond" },
    style: { strokeColor: "#8f908f", fill: "#e2f3fa" },
    annotations: [
      {
        content: "Census Record",
        margin: { left: 15, right: 15, bottom: 15, top: 15 }
      }
    ]
  },
  {
    id: "booksNode3",
    width: 100,
    height: 75,
    offsetX: 120,
    offsetY: 325,
    shape: { type: "Basic", shape: "Diamond" },
    style: { strokeColor: "#8f908f", fill: "#e2f3fa" },
    annotations: [{ content: "Books and Magazine" }]
  },
  {
    id: "recordNode4",
    width: 125,
    height: 50,
    offsetX: 320,
    offsetY: 200,
    style: { strokeColor: "#868686", fill: "#d5f5d5" },
    annotations: [{ content: "Record Template" }]
  },
  {
    id: "traditionalNode5",
    width: 125,
    height: 50,
    offsetX: 320,
    offsetY: 325,
    style: { strokeColor: "#868686", fill: "#d5f5d5" },
    annotations: [{ content: "Traditional Template" }]
  },
  {
    id: "nontraditionalNode6",
    width: 135,
    height: 50,
    offsetX: 120,
    offsetY: 425,
    style: { strokeColor: "#a8a8a8", fill: "#faebee" },
    annotations: [{ content: "Nontraditional" }]
  },
  {
    id: "Radial1",
    width: 125,
    height: 50,
    offsetX: 850,
    offsetY: 225,
    shape: { type: "Basic", shape: "Ellipse" },
    style: { strokeColor: "#a8a8a8", fill: "#fef0db" },
    annotations: [{ content: "Health Fitness" }]
  },
  {
    id: "Radial2",
    width: 125,
    height: 75,
    offsetX: 850,
    offsetY: 100,
    shape: { type: "Basic", shape: "Ellipse" },
    style: { strokeColor: "#a8a8a8", fill: "#faebee" },
    annotations: [{ content: "Diet" }]
  },
  {
    id: "Radial3",
    width: 125,
    height: 75,
    offsetX: 1025,
    offsetY: 175,
    shape: { type: "Basic", shape: "Ellipse" },
    style: { strokeColor: "#a8a8a8", fill: "#faebee" },
    annotations: [{ content: "Flexibility" }]
  },
  {
    id: "Radial4",
    width: 125,
    height: 75,
    offsetX: 1000,
    offsetY: 350,
    shape: { type: "Basic", shape: "Ellipse" },
    style: { strokeColor: "#a8a8a8", fill: "#faebee" },
    annotations: [{ content: "Muscular Endurance" }]
  },
  {
    id: "Radial5",
    width: 125,
    height: 75,
    offsetX: 675,
    offsetY: 175,
    shape: { type: "Basic", shape: "Ellipse" },
    style: { strokeColor: "#a8a8a8", fill: "#faebee" },
    annotations: [{ content: "Cardiovascular Strength" }]
  },
  {
    id: "Radial6",
    width: 125,
    height: 75,
    offsetX: 770,
    offsetY: 350,
    shape: { type: "Basic", shape: "Ellipse" },
    style: { strokeColor: "#a8a8a8", fill: "#faebee" },
    annotations: [{ content: "Muscular Strength" }]
  }
];

let connectors: ConnectorModel[] = [
  {
    id: "flowChartConnector1",
    sourceID: "sourceNode1",
    targetID: "censusNode2"
  },
  {
    id: "flowChartConnector2",
    sourceID: "censusNode2",
    targetID: "booksNode3",
    annotations: [{ content: "No", style: { fill: "White" } }]
  },
  {
    id: "flowChartConnector3",
    sourceID: "booksNode3",
    targetID: "nontraditionalNode6",
    annotations: [{ content: "No", style: { fill: "White" } }]
  },
  {
    id: "flowChartConnector4",
    sourceID: "censusNode2",
    targetID: "recordNode4",
    annotations: [{ content: "Yes", style: { fill: "White" } }]
  },
  {
    id: "flowChartConnector5",
    sourceID: "booksNode3",
    targetID: "traditionalNode5",
    annotations: [{ content: "Yes", style: { fill: "White" } }]
  },
  {
    id: "RadialConnector1",
    sourceID: "Radial1",
    targetID: "Radial2",
    annotations: [{ content: "Yes", style: { fill: "White" } }]
  },
  {
    id: "RadialConnector2",
    sourceID: "Radial1",
    targetID: "Radial3",
    annotations: [{ content: "Yes", style: { fill: "White" } }]
  },
  {
    id: "RadialConnector3",
    sourceID: "Radial1",
    targetID: "Radial4",
    annotations: [{ content: "Yes", style: { fill: "White" } }]
  },
  {
    id: "RadialConnector4",
    sourceID: "Radial1",
    targetID: "Radial5",
    annotations: [{ content: "Yes", style: { fill: "White" } }]
  },
  {
    id: "RadialConnector5",
    sourceID: "Radial1",
    targetID: "Radial6",
    annotations: [{ content: "Yes", style: { fill: "White" } }]
  }
];

let diagramInstance: DiagramComponent;
let checkBoxObj: CheckBoxComponent;
let exportOptions: IExportOptions = {};

let items: ItemModel[] = [
  {
    text: "JPG"
  },
  {
    text: "PNG"
  },
  {
    text: "BMP"
  },
  {
    text: "SVG"
  }
];




const SAMPLE_CSS = `   .e-bigger #toolbar_diagram .e-icons.e-caret,
#toolbar_diagram .e-icons.e-caret {
    font-size: 12px;
    margin-right: 0px;
}

#custombtn {
    padding: 4px 0px 2px 4px;
}`;
function PrintExport() {
  React.useEffect(() => {
    updateSampleSection();
    rendereComplete();
  }, [])
  function rendereComplete() {
    diagramInstance.fitToPage();
  }
  function contentTemplate() {
    return (<DropDownButtonComponent items={items}
      iconCss="e-diagram-icons e-diagram-export"
      content="Export"
      select={onselect} >

    </DropDownButtonComponent>);
  }
  function checkboxTemplate() {
    return (<CheckBoxComponent id="checkBox" checked={false}
      ref={checkBox => (checkBoxObj = checkBox)}
      label="Multiple Page" >

    </CheckBoxComponent>);
  }
  function newFunction(): string {
    return "Export";
  }

  //click event to perform printing the diagraming objects.
  function onItemClick(args: ClickEventArgs): void {
    let printOptions: IExportOptions = {};
    switch (args.item.text) {
      case "Print":
        {
          printOptions.mode = "Data";
          printOptions.region = "PageSettings";
          printOptions.multiplePage = checkBoxObj.checked;
          printOptions.margin = { left: 0, top: 0, bottom: 0, right: 0 };
          diagramInstance.print(printOptions);
        }
        break;
    }
  }

  //Export the diagraming object based on the format.
  function onselect(args: MenuEventArgs): void {
    let exportOptions: IExportOptions = {};
    switch (args.item.text) {
      case "JPG":
        exportOptions.format = args.item.text as FileFormats;
        break;
      case "PNG":
        exportOptions.format = args.item.text as FileFormats;
        break;
      case "BMP":
        exportOptions.format = args.item.text as FileFormats;
        break;
      case "SVG":
        exportOptions.format = args.item.text as FileFormats;
        break;
    }
    exportOptions.mode = "Download";
    exportOptions.region = "PageSettings";
    exportOptions.multiplePage = checkBoxObj.checked;
    exportOptions.fileName = "Export";
    exportOptions.margin = { left: 0, top: 0, bottom: 0, right: 0 };
    diagramInstance.exportDiagram(exportOptions);
  }
  return (
    <div className="control-pane">
      <style>SAMPLE_CSS</style>
      <div
        className="control-section"
      >
        <div className="content-wrapper" style={{ width: "100%" }}>
          {/* create and add printing and exporting option in ToolBar. */}
          <ToolbarComponent
            style={{ width: "100%", height: "10%", marginTop: "10px" }}
            id="toolbar_diagram"
            clicked={onItemClick}
          >
            <ItemsDirective>
              <ItemDirective type="Input" text="Export"
                template={contentTemplate} >

              </ItemDirective>
              <ItemDirective type={"Button"} text="Print"
                prefixIcon="e-diagram-icons e-diagram-print" />
              <ItemDirective type={"Input"} template={checkboxTemplate} />
            </ItemsDirective>
          </ToolbarComponent>
          {/* initialization of the Diagram. */}
          <DiagramComponent
            id="diagram"
            ref={diagram => (diagramInstance = diagram)}
            width={"100%"}
            height={"580px"}
            nodes={nodes}
            connectors={connectors}
            snapSettings={{ constraints: SnapConstraints.None }}
            pageSettings={{ width: 550, height: 500, multiplePage: true }}
            getConnectorDefaults={(
              connector: ConnectorModel,
              diagram: Diagram
            ) => {
              connector.style.strokeColor = "#6d6d6d";
              return connector;
            }}
          >
            <Inject services={[PrintAndExport]} />
          </DiagramComponent>
        </div>
      </div>
      <div id="action-description">
        <p>
          This sample demonstrates printing and exporting the diagram as
          images.
        </p>
      </div>
      <div id="description">
        <p>
          This example shows how to print the diagram and how to export the
          diagram as image (*.jpg, *.png, and *bmp) and in SVG format. The{" "}
          <code>exportDiagram</code> method can be used to export the diagram.
          The <code>exportDiagram</code> method takes the exporting options
          (file formats, mode of export, and the region to export) as input.
          The <code>print</code> method can be used to print the diagrams.
        </p>
        <br />
      </div>
    </div>
  );
}
export default PrintExport;