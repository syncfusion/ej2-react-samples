import * as ReactDOM from "react-dom";
import * as React from "react";
import {
    PrintAndExport,
    IExportOptions,
    DiagramComponent,
    NodeModel,
    ConnectorModel,
    BasicShapes,
    Diagram,
    Inject,
    FileFormats,
    SnapConstraints
} from "@syncfusion/ej2-react-diagrams";
import { SampleBase } from "../common/sample-base";
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

// Helper function to create a node with common properties
function createNode(
    id: string,
    width: number, height: number,
    offsetX: number, offsetY: number,
    strokeColor: string, fillColor: string,
    content: string, shape: BasicShapes = 'Rectangle'): NodeModel {
    return {
        id,
        width,
        height,
        offsetX,
        offsetY,
        shape: { type: 'Basic', shape: shape },
        style: { strokeColor: strokeColor, fill: fillColor },
        annotations: [{ content }]
    };
}

// Initialize Diagram Nodes with helper function
let nodes: NodeModel[] = [
    createNode('sourceNode1', 100, 50, 120, 100, '#868686', '#d5f5d5', 'Source Document'),
    createNode('censusNode2', 100, 75, 120, 200, '#8f908f', '#e2f3fa', 'Census Record', 'Diamond'),
    createNode('booksNode3', 100, 75, 120, 325, '#8f908f', '#e2f3fa', 'Books and Magazine', 'Diamond'),
    createNode('recordNode4', 125, 50, 320, 200, '#868686', '#d5f5d5', 'Record Template'),
    createNode('traditionalNode5', 125, 50, 320, 325, '#868686', '#d5f5d5', 'Traditional Template'),
    createNode('nontraditionalNode6', 135, 50, 120, 425, '#a8a8a8', '#faebee', 'Nontraditional'),
    createNode('Radial1', 125, 50, 850, 225, '#a8a8a8', '#fef0db', 'Health Fitness', 'Ellipse'),
    createNode('Radial2', 125, 75, 850, 100, '#a8a8a8', '#faebee', 'Diet', 'Ellipse'),
    createNode('Radial3', 125, 75, 1025, 175, '#a8a8a8', '#faebee', 'Flexibility', 'Ellipse'),
    createNode('Radial4', 125, 75, 1000, 350, '#a8a8a8', '#faebee', 'Muscular Endurance', 'Ellipse'),
    createNode('Radial5', 125, 75, 675, 175, '#a8a8a8', '#faebee', 'Cardiovascular Strength', 'Ellipse'),
    createNode('Radial6', 125, 75, 770, 350, '#a8a8a8', '#faebee', 'Muscular Strength', 'Ellipse')
];

// Helper function to create a connector with common properties
function createConnector(id: string, sourceID: string, targetID: string, content: string = 'Yes'): ConnectorModel {
    return {
        id,
        sourceID,
        targetID,
        annotations: content ? [{ content, style: { fill: 'White' } }] : []
    };
}

// Initialize Diagram Connectors with helper function
let connectors: ConnectorModel[] = [
    createConnector('flowChartConnector1', 'sourceNode1', 'censusNode2', ''),
    createConnector('flowChartConnector2', 'censusNode2', 'booksNode3', 'No'),
    createConnector('flowChartConnector3', 'booksNode3', 'nontraditionalNode6', 'No'),
    createConnector('flowChartConnector4', 'censusNode2', 'recordNode4'),
    createConnector('flowChartConnector5', 'booksNode3', 'traditionalNode5'),
    createConnector('RadialConnector1', 'Radial1', 'Radial2'),
    createConnector('RadialConnector2', 'Radial1', 'Radial3'),
    createConnector('RadialConnector3', 'Radial1', 'Radial4'),
    createConnector('RadialConnector4', 'Radial1', 'Radial5'),
    createConnector('RadialConnector5', 'Radial1', 'Radial6')
];

// Global variables to hold instances of Diagram and CheckBox components.
let diagramInstance: DiagramComponent;
let checkBoxObj: CheckBoxComponent;

const exportItems: ItemModel[] = [
    { text: "JPG" },
    { text: "PNG" },
    { text: "SVG" }
];

// CSS styles specific to this sample.
const SAMPLE_CSS = `   .e-bigger #toolbar_diagram .e-icons.e-caret,
#toolbar_diagram .e-icons.e-caret {
    font-size: 12px;
    margin-right: 0px;
}`;
export class PrintExport extends SampleBase<{}, {}> {
    rendereComplete() {
        diagramInstance.fitToPage();
    }

    render() {
        function contentTemplate() {
            return (<DropDownButtonComponent items={exportItems}
                iconCss="e-diagram-icons e-diagram-export"
                content="Export"
                select={onSelectExportFormat} >
            </DropDownButtonComponent>);
        }

        function checkboxTemplate() {
            return (<CheckBoxComponent id="checkBox" checked={false}
                ref={checkBox => (checkBoxObj = checkBox)}
                label="Multiple Page">
            </CheckBoxComponent>);
        }

        return (
            <div className="control-pane">
                <style>{SAMPLE_CSS}</style>
                <div className="control-section">
                    <div  style={{ width: "100%" }}>
                        {/* create and add printing and exporting option in ToolBar. */}
                        <ToolbarComponent
                            style={{ width: "100%", height: "10%", marginTop: "10px" }}
                            id="toolbar_diagram"
                            clicked={onItemClick}
                        >
                            <ItemsDirective>
                                <ItemDirective type="Input" text="Export" template={contentTemplate} />
                                <ItemDirective type={"Button"} text="Print" prefixIcon="e-diagram-icons e-diagram-print" />
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
                            getConnectorDefaults={(connector: ConnectorModel, diagram: Diagram) => {
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
}

// Click event to perform printing the diagram objects.
function onItemClick(args: ClickEventArgs): void {
    if (args.item.text === "Print") {
        const printOptions: IExportOptions = {
            mode: "Data",
            region: "PageSettings",
            multiplePage: checkBoxObj.checked,
            margin: { left: 0, top: 0, bottom: 0, right: 0 }
        };
        diagramInstance.print(printOptions);
    }
}

// Export the diagram object based on the format.
function onSelectExportFormat(args: MenuEventArgs): void {
    const exportOptions: IExportOptions = {
        format: args.item.text as FileFormats,
        mode: "Download",
        region: "PageSettings",
        multiplePage: checkBoxObj.checked,
        fileName: "Export",
        margin: { left: 0, top: 0, bottom: 0, right: 0 }
    };
    diagramInstance.exportDiagram(exportOptions);
}
