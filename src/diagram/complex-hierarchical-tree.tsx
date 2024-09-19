import * as ReactDOM from "react-dom";
import * as React from "react";
import {
    Node,
    Connector,
    ComplexHierarchicalTree,
    DataBinding, LineDistribution,
    DiagramComponent, ConnectionPointOrigin,
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
import {
    CheckBox,
    ChangeEventArgs as CheckBoxChangeEventArgs
} from "@syncfusion/ej2-react-buttons";
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import { multiParentData } from './diagram-data';

const SAMPLE_CSS = `
/* For orientation and subtree alignment in property panel*/
.image-pattern-style {
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
let propertyPanelInstance: HTMLElement;

export class ComplexHierarchicalModel extends SampleBase<{}, {}> {

    // Function to lock or unlock connector overlapping
    private lockConnectorOverlapping(args: CheckBoxChangeEventArgs): void {
        diagramInstance.layout.connectionPointOrigin = args.checked
            ? ConnectionPointOrigin.DifferentPoint
            : ConnectionPointOrigin.SamePoint;
    }

    rendereComplete() {
        // Fit the diagram to the available space
        diagramInstance.fitToPage();

        // Handle clicks on the property panel layout buttons
        propertyPanelInstance.onclick = (args: MouseEvent) => {
            let target: HTMLElement = args.target as HTMLElement;
            let selectedElement: HTMLCollection = document.getElementsByClassName("e-selected-style");
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
                    <div className="content-wrapper" style={{ width: "100%" }}>
                        <DiagramComponent
                            id="diagram"
                            ref={diagram => (diagramInstance = diagram)}
                            width={"100%"}
                            height={580}
                            layout={
                                {
                                    type: "ComplexHierarchicalTree",
                                    connectionPointOrigin: ConnectionPointOrigin.DifferentPoint,
                                    horizontalSpacing: 40,
                                    verticalSpacing: 40,
                                    orientation: "TopToBottom",
                                    margin: { left: 10, right: 0, top: 50, bottom: 0 }
                                } //Configrues hierarchical tree layout
                            }
                            getNodeDefaults={(obj: Node) => getNodeDefaults(obj)} // Call getNodeDefaults method
                            getConnectorDefaults={(connector: Connector) => getConnectorDefaults(connector)} // Call getConnectorDefaults method
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
                            <Inject services={[DataBinding, ComplexHierarchicalTree, LineDistribution]} />
                        </DiagramComponent>
                    </div>
                </div>

                <div className="col-lg-4 property-section">
                    <div className="property-panel-header">Layout Settings</div>
                    <div className="row property-panel-content" id="appearance" ref={appearance => (propertyPanelInstance = appearance)} style={{ paddingTop: "10px" }}>
                        <div className="row row-header">Orientation</div>
                        <div className="row" style={{ paddingTop: "8px" }}>
                            {["toptobottom", "bottomtotop", "lefttoright"].map((id, index) => (
                                <div
                                    className={`image-pattern-style${index === 0 ? "e-selected-style" : ""}`}
                                    id={id}
                                    style={{
                                        backgroundImage: `url('src/diagram/Images/common-orientation/${id}.png')`,
                                        marginRight: "3px",
                                    }}
                                />
                            ))}
                        </div>
                        <div className="row" style={{ paddingTop: "8px" }}>
                            <div
                                className="image-pattern-style"
                                id="righttoleft"
                                style={{
                                    backgroundImage:
                                        "url('src/diagram/Images/common-orientation/righttoleft.png')",
                                    marginRight: "3px"
                                }}
                            />
                        </div>
                    </div>
                    <div className="row property-panel-content" style={{ paddingTop: "10px" }}>
                        <div className="row row-header">Behaviour</div>
                        {[
                            { id: "marginLeft", label: "Margin X", value: 10 },
                            { id: "marginTop", label: "Margin Y", value: 50 },
                            { id: "horizontalSpacing", label: "Horizontal Spacing", value: 40 },
                            { id: "verticalSpacing", label: "Vertical Spacing", value: 40 },
                        ].map(({ id, label, value }) => (
                            <div className="row" style={{ paddingTop: "8px" }}>
                                <div style={{ display: "table", height: "35px", paddingLeft: "0px" }} className="col-xs-5">
                                    <div style={{ display: "table-cell", verticalAlign: "middle" }}>{label}</div>
                                </div>
                                <div className="col-xs-7">
                                    <NumericTextBoxComponent
                                        id={id}
                                        value={value}
                                        step={1}
                                        format={"##.##"}
                                        change={(args: ChangeEventArgs) => {
                                            updateLayoutProperty(id, args.value);
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                        <div className="row property-panel-content" style={{ paddingTop: "10px" }}>
                            <div className="row" style={{ paddingTop: "8px" }}>
                                <CheckBoxComponent
                                    checked={true}
                                    label="Prevent Connector Overlapping"
                                    id="lock"
                                    change={this.lockConnectorOverlapping.bind(this)}
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

function getNodeDefaults(node: Node): void {
    node.width = 40;
    node.height = 40;
    node.shape = {
        type: "Basic",
        shape: "Rectangle",
        cornerRadius: 7
    };
}

function getConnectorDefaults(connector: Connector): void {
    connector.type = "Orthogonal";
    connector.cornerRadius = 7;
    connector.targetDecorator.height = 7;
    connector.targetDecorator.width = 7;
    connector.style.strokeColor = "#6d6d6d";
}

// Apply the orientation for multiple parent layout.
function updateLayout(target: HTMLElement, orientation: LayoutOrientation): void {
    diagramInstance.layout.orientation = orientation;
    diagramInstance.dataBind();
    diagramInstance.doLayout();
    target.classList.add("e-selected-style");
}

// Function to update the layout margins and spacing
function updateLayoutProperty(property: string, value: number): void {
    switch (property) {
        case "marginLeft":
            diagramInstance.layout.margin.left = value;
            break;
        case "marginTop":
            diagramInstance.layout.verticalAlignment = 'Top';
            diagramInstance.layout.margin.top = value;
            break;
        case "horizontalSpacing":
            diagramInstance.layout.horizontalSpacing = value;
            break;
        case "verticalSpacing":
            diagramInstance.layout.verticalSpacing = value;
            break;
    }
    diagramInstance.dataBind();
}
