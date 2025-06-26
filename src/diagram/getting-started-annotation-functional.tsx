import * as React from "react";
import {
  DiagramComponent,
  NodeModel,
  AnnotationModel,
  ConnectorModel,
  Node,
  Connector,
  TextStyleModel,
  ISelectionChangeEventArgs,
  ConnectorConstraints,
  VerticalAlignment,
  HorizontalAlignment,
  ShapeAnnotationModel, AnnotationConstraints,
  SnapConstraints
} from "@syncfusion/ej2-react-diagrams";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { ButtonComponent, CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import {
  NumericTextBoxComponent,
  ColorPickerComponent,
  ColorPickerEventArgs
} from "@syncfusion/ej2-react-inputs";
import { updateSampleSection } from "../common/sample-base";
import "./font-icons.css";

//Initializes the nodes for the diagram
let nodes: NodeModel[] = [
  {
    id: "industry",
    offsetX: 280,
    offsetY: 250,
    annotations: [{ content: "Industry Competitors" }]
  },
  {
    id: "potential",
    offsetX: 280,
    offsetY: 110,
    annotations: [{ content: "Potential Entrants" }]
  },
  {
    id: "suplier",
    offsetX: 90,
    offsetY: 250,
    annotations: [{ content: "Suppliers" }]
  },
  {
    id: "substitutes",
    offsetX: 280,
    offsetY: 390,
    annotations: [{ content: "Substitutes" }]
  },
  {
    id: "buyers",
    offsetX: 470,
    offsetY: 250,
    annotations: [{ content: "Buyers" }]
  }
];

//Initializes the connector for the diagram
let connectors: ConnectorModel[] = [
  {
    id: "connector1",
    sourceID: "potential",
    targetID: "industry"
  },
  {
    id: "connector2",
    sourceID: "suplier",
    targetID: "industry"
  },
  {
    id: "connector3",
    sourceID: "substitutes",
    targetID: "industry"
  },
  {
    id: "connector4",
    sourceID: "buyers",
    targetID: "industry"
  },
  {
    id: "connector5",
    sourceID: "potential",
    targetID: "buyers",
    segments: [{ direction: "Right", type: 'Orthogonal', length: 60 }],
    targetDecorator: { shape: "None" }
  },
  {
    id: "connector6",
    sourceID: "buyers",
    targetID: "substitutes",
    segments: [{ direction: "Bottom", type: 'Orthogonal', length: 120 }],
    targetDecorator: { shape: "None" }
  },
  {
    id: "connector7",
    targetID: "suplier",
    sourceID: "substitutes",
    segments: [{ direction: "Left", type: 'Orthogonal', length: 60 }],
    targetDecorator: { shape: "None" }
  },
  {
    id: "connector9",
    sourceID: "suplier",
    targetID: "potential",
    segments: [{ direction: "Top", type: 'Orthogonal', length: 120 }],
    targetDecorator: { shape: "None" }
  }
];

//Font dropdown options
let fontType: { [key: string]: Object }[] = [
  { type: "Arial", text: "Arial" },
  { type: "Aharoni", text: "Aharoni" },
  { type: "Bell MT", text: "Bell MT" },
  { type: "Fantasy", text: "Fantasy" },
  { type: "Times New Roman", text: "Times New Roman" },
  { type: "Segoe UI", text: "Segoe UI" },
  { type: "Verdana", text: "Verdana" }
];

//Teamplate dropdown options
let templateList: { [key: string]: Object }[] = [
  { value: "none", text: "None" },
  { value: "industry", text: "Industry Competitors" },
  { value: "suppliers", text: "Suppliers" },
  { value: "potential", text: "Potential Entrants" },
  { value: "buyers", text: "Buyers" },
  { value: "substitutes", text: "Substitutes" }
];


let diagramInstance: DiagramComponent;
let node: NodeModel;
let fontFamily: DropDownListComponent;
let fontSize: NumericTextBoxComponent;
let fontColor: ColorPickerComponent;
let bold: ButtonComponent;
let italic: ButtonComponent;
let underLine: ButtonComponent;
let templateData: DropDownListComponent;
let propertyPanelInstance : HTMLElement;
let appearanceInstance : HTMLElement;
let labelConstraintsInstance: HTMLElement;

const sample_css = `.diagram-annotation .diagram-property-tab .image-pattern-style {
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

.diagram-annotation .diagram-property-tab .image-pattern-style:hover {
  border-color: gray;
  border-width: 2px;
}

.diagram-annotation .e-remove-selection .property-section-content {
  pointer-events: none;
}

.diagram-annotation .diagram-property-tab .column-style {
  display: table;
  height: 35px;
  padding-right: 4px;
  padding-left: 0px;
  width: calc((100% - 12px) / 3);
}

.diagram-annotation .diagram-property-tab .row {
  margin-left: 0px;
  margin-right: 0px;
  cursor: pointer;
}

.diagram-annotation .diagram-property-tab .row-header {
  font-size: 15px;
  font-weight: 500;
}
.diagram-annotation .property-section .e-remove-selection {
  cursor: not-allowed;
}
.diagram-annotation .diagram-property-tab .property-panel-header {
  padding-top: 15px;
  padding-bottom: 15px;
}

.diagram-annotation .diagram-property-tab .e-checkbox-wrapper .e-label {
  font-size: 12px;
}

.diagram-annotation .diagram-property-tab .e-selected-style {
  border-color: #006CE6;
  border-width: 2px;
}

.diagram-annotation .diagram-control-pane .col-xs-6 {
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 5px;
}`;
//Apply the appearence of the Annotation
function changed(value: string): void {
  for (let i: number = 0; i < diagramInstance.selectedItems.nodes.length; i++) {
    var node = diagramInstance.selectedItems.nodes[i];
    var annotationStyle = node.annotations[0].style as TextStyleModel;
      if (value === "fontsize") {
        annotationStyle.fontSize = fontSize.value;
      } else if (value === "underline") {
        annotationStyle.textDecoration = annotationStyle.textDecoration === 'Underline' ? 'None' : 'Underline';
      } else if (value === "fontfamily") {
        annotationStyle.fontFamily = fontFamily.value.toString();
      } else if (value === "bold") {
        annotationStyle.bold = !annotationStyle.bold;
      } else if (value === "italic") {
        annotationStyle.italic = !annotationStyle.italic;
      } else if (value === 'template') {
        if (templateData.value.toString() === 'none') {
          node.annotations[0].template = '';
          node.annotations[0].width = undefined;
          node.annotations[0].height = undefined;
        } else {
          node.annotations[0].width = 25;
          node.annotations[0].height = 25;
          node.annotations[0].template =
            '<img src="src/diagram/Images/annotation/' + templateData.value.toString() + '.svg" style="width:100%;height:100%" />';
        }
      } else if (value === 'interaction') {
        let annotation: ShapeAnnotationModel = node.annotations[0];
        if (annotation && annotation.constraints) {
          annotation.constraints = annotation.constraints ^ AnnotationConstraints.Interaction;
        }
      }
      diagramInstance.dataBind();
    }
  }
//Update the Annotation Position based on the selection
function updateAnnotationPosition(id: string): void {
  let target: HTMLElement = document.getElementById(id);
  for (let i: number = 0; i < diagramInstance.selectedItems.nodes.length; i++) {
    node = diagramInstance.selectedItems.nodes[i];
    //we can refactor this code using a method
      let annotation: ShapeAnnotationModel = node.annotations[0];
      switch (target.id) {
        case "left":
          setAnnotationPosition(annotation, 0, 0, "Top", "Left", target);
          break;
        case "right":
          setAnnotationPosition(annotation, 1, 0, "Top", "Right", target);
          break;
        case "bottomLeft":
          setAnnotationPosition(annotation, 0, 1, "Bottom", "Left", target);
          break;
        case "bottomRight":
          setAnnotationPosition(annotation, 1, 1, "Bottom", "Right", target);
          break;
        case "center":
          setAnnotationPosition(
            annotation,
            0.5,
            0.5,
            "Center",
            "Center",
            target
          );
          break;
        case "bottomCenter":
          setAnnotationPosition(annotation, 0.5, 1, "Top", "Center", target);
          break;
      }
    }
  }
//set the Annotation Position
function setAnnotationPosition( //it is in dedicated line here.
  annotation: ShapeAnnotationModel,
  offsetX: number,
  offsetY: number,
  verticalAlignment: VerticalAlignment,
  horizontalAlignment: HorizontalAlignment,
  target: HTMLElement
): void {
  annotation.offset.x = offsetX;
  annotation.offset.y = offsetY;
  annotation.verticalAlignment = verticalAlignment;
  annotation.horizontalAlignment = horizontalAlignment;
  if (verticalAlignment === "Top" && horizontalAlignment === "Left") {
    annotation.margin = { left: 3, top: 3 };
  } else if (verticalAlignment === "Top" && horizontalAlignment === "Right") {
    annotation.margin = { right: 3, top: 3 };
  } else if (verticalAlignment === "Bottom" && horizontalAlignment === "Left") {
    annotation.margin = { left: 3, bottom: 3 };
  } else if (verticalAlignment === "Bottom" && horizontalAlignment === "Right") {
    annotation.margin = { right: 3, bottom: 3 };
  }
  target.classList.add("e-selected-style");
}
//Enable or disable the property panel
function enablePropertyPanel(arg: ISelectionChangeEventArgs): void {
  let appearance: HTMLElement = propertyPanelInstance;
  let selectedElement: HTMLCollection = document.getElementsByClassName(
    "e-remove-selection"
  );
  //Checks for selection of new node
  if (arg.newValue) {
    if (arg.newValue[0] instanceof Node) {
      if (selectedElement.length > 0) {
        selectedElement[0].classList.remove("e-remove-selection");
      }
    } else {
      if (!appearance.classList.contains("e-remove-selection")) {
        appearance.classList.add("e-remove-selection");
      }
    }
  }
}

// Sample initialize
function GettingStartedAnnotation() {
  // React useEffect hook to run once on component mount
  React.useEffect(() => {
    updateSampleSection();
    rendereComplete(); // Call rendereComplete function
  }, [])
  const fields: object = { text: 'text', value: 'value' };

   // Function to complete rendering actions
  function rendereComplete() {
    // Fit the diagram instance to the page
    diagramInstance.fitToPage();
    // Select the first node in the diagramInstance
    diagramInstance.select([diagramInstance.nodes[0]]);
    // Set onclick event handler for bold.element
    bold.element.onclick = () => {
      changed("bold");
    };
    // Set onclick event handler for italic.element
    italic.element.onclick = () => {
      changed("italic");
    };
    // Set onclick event handler for underLine.element
    underLine.element.onclick = () => {
      changed("underline");
    };
    //Click event for Appearance of the Property Panel
    appearanceInstance.onclick = (args: MouseEvent) => {
      let target: HTMLElement = args.target as HTMLElement;
      let selectedElement: HTMLCollection = document.getElementsByClassName(
        "e-selected-style"
      );
      // Remove 'e-selected-style' class from any element that has it
      if (selectedElement.length) {
        selectedElement[0].classList.remove("e-selected-style");
      }
      // Handle click action based on target's className
      if (target.className === "image-pattern-style") {
        updateAnnotationPosition(target.id);
      }
    };
  }
  return (
    <div className="control-pane diagram-control-pane diagram-annotation">
      <style>{sample_css}</style>
      <div className="col-lg-8 control-section">
        <div  style={{ width: "100%" }}>
          <DiagramComponent
            id="diagram"
            ref={diagram => (diagramInstance = diagram)}
            width={"100%"}
            height={"565px"}
            nodes={nodes}
            connectors={connectors}
            selectionChange={(arg: ISelectionChangeEventArgs) => {
              if (arg.state === "Changed") {
                let selectedElement: HTMLCollection = document.getElementsByClassName(
                  "e-selected-style"
                );
                if (selectedElement.length) {
                  selectedElement[0].classList.remove("e-selected-style");
                }
                //Checks for selection of new node
                if (arg.newValue[0]) {
                  let node: NodeModel = arg.newValue[0] as NodeModel;
                  if (node.annotations && node.annotations.length > 0) {
                    if (
                      node.annotations[0].offset.x === 0 &&
                      node.annotations[0].offset.y === 0
                    ) {
                      updateAnnotationPosition("left");
                    } else if (
                      node.annotations[0].offset.x === 1 &&
                      node.annotations[0].offset.y === 0
                    ) {
                      updateAnnotationPosition("right");
                    } else if (
                      node.annotations[0].offset.x === 1 &&
                      node.annotations[0].offset.y === 0
                    ) {
                      updateAnnotationPosition("right");
                    } else if (
                      node.annotations[0].offset.x === 0 &&
                      node.annotations[0].offset.y === 1
                    ) {
                      updateAnnotationPosition("bottomLeft");
                    } else if (
                      node.annotations[0].offset.x === 1 &&
                      node.annotations[0].offset.y === 1
                    ) {
                      updateAnnotationPosition("bottomRight");
                    } else if (
                      node.annotations[0].offset.x === 0.5 &&
                      node.annotations[0].offset.y === 0.5
                    ) {
                      updateAnnotationPosition("center");
                    } else if (
                      node.annotations[0].offset.x === 0.5 &&
                      node.annotations[0].offset.y === 1
                    ) {
                      updateAnnotationPosition("bottomCenter");
                    }
                    const hasInteraction = (node.annotations[0].constraints & AnnotationConstraints.Interaction) === AnnotationConstraints.Interaction;
                    (labelConstraintsInstance as any).disabled = false;
                    (labelConstraintsInstance as any).checked = hasInteraction;
                  } else {
                    (labelConstraintsInstance as any).disabled = true;
                    (labelConstraintsInstance as any).checked = false;
                  }
                } else {
                    // No node selected - disable checkbox
                    (labelConstraintsInstance as any).disabled = true;
                    (labelConstraintsInstance as any).checked = false;
                }
                enablePropertyPanel(arg);
              }
            }}
            //Sets the default values of a node
            getNodeDefaults={(node: NodeModel) => {
              let obj: NodeModel = {
                width: 130,
                height: 50,
                style: {
                  fill: "#D5EDED",
                  strokeColor: "#7DCFC9",
                  strokeWidth: 1
                },
                shape: { cornerRadius: 5 }
              };
              return obj;
            }}
            //Sets the default values of a connector
            getConnectorDefaults={(obj: Connector) => {
              obj.type = "Orthogonal";
              obj.constraints = ConnectorConstraints.None;
            }}
            snapSettings={{ constraints: SnapConstraints.None }}
          />
        </div>
      </div>

      <div className="col-lg-4 property-section diagram-property-tab">
        <div className="property-panel-header">Properties</div>
        <div style={{cursor : 'not-allowed'}}>
        <div id="propertypanel" className="e-remove-selection" ref={propertyPanelRef => (propertyPanelInstance = propertyPanelRef)}>
          <div className="property-section-content">
            <div className="row property-panel-content" id="appearance" ref={appearance => (appearanceInstance = appearance)}>
              <div className="row row-header">Alignment</div>
              <div className="row">
                <div className="row" style={{ paddingTop: "8px" }}>
                  <div
                    className="image-pattern-style"
                    id="left"
                    style={{
                      backgroundImage:
                        "url('src/diagram/Images/annotation/Annotation_1.png')",
                      marginRight: "4px"
                    }}
                  />
                  <div
                    className="image-pattern-style"
                    id="right"
                    style={{
                      backgroundImage:
                        "url('src/diagram/Images/annotation/Annotation_2.png')",
                      margin: "0px 4px"
                    }}
                  />
                  <div
                    className="image-pattern-style"
                    id="bottomLeft"
                    style={{
                      backgroundImage:
                        "url('src/diagram/Images/annotation/Annotation_3.png')"
                    }}
                  />
                </div>
                <div className="row" style={{ paddingTop: "8px" }}>
                  <div
                    className="image-pattern-style"
                    id="bottomRight"
                    style={{
                      backgroundImage:
                        "url('src/diagram/Images/annotation/Annotation_4.png')",
                      margin: "0px 4px"
                    }}
                  />
                  <div
                    className="image-pattern-style"
                    id="center"
                    style={{
                      backgroundImage:
                        "url('src/diagram/Images/annotation/Annotation_5.png')",
                      marginRight: "4px"
                    }}
                  />
                  <div
                    className="image-pattern-style"
                    id="bottomCenter"
                    style={{
                      backgroundImage:
                        "url('src/diagram/Images/annotation/Annotation_6.png')"
                    }}
                  />
                </div>
              </div>

              <div className="row property-panel-content" style={{ paddingTop: "10px", overflow: "hidden" }}>
                <div className="row row-header">Appearance</div>
                <div className="row" style={{ paddingTop: "8px" }}>
                  <div className="col-xs-4 column-style">
                    <ButtonComponent
                      style={{ width: "100%" }}
                      id="bold"
                      iconCss={"e-diagram-icons e-diagram-bold"}
                      ref={boldref => (bold = boldref)}
                      aria-label="bold"
                    >
                      {" "}
                    </ButtonComponent>
                  </div>
                  <div className="col-xs-4 column-style">
                    <ButtonComponent
                      style={{ width: "100%" }}
                      id="italic"
                      iconCss={"e-diagram-icons e-diagram-italic"}
                      ref={italicref => (italic = italicref)}
                      aria-label="italic"
                    >
                      {" "}
                    </ButtonComponent>
                  </div>
                  <div className="col-xs-4 column-style">
                    <ButtonComponent
                      style={{ width: "100%" }}
                      id="underline"
                      iconCss={"e-diagram-icons e-diagram-underline"}
                      ref={underLineref => (underLine = underLineref)}
                      aria-label="underline"
                    >
                      {" "}
                    </ButtonComponent>
                  </div>
                </div>
                <div className="row" style={{ paddingTop: "8px" }}>
                  <div className="col-xs-4 column-style">
                    <ColorPickerComponent
                      id="fontcolor"
                      value="#000"
                      change={(arg: ColorPickerEventArgs) => {
                        for (
                          let i: number = 0;
                          i < diagramInstance.selectedItems.nodes.length;
                          i++
                        ) {
                          node = diagramInstance.selectedItems.nodes[i];
                            (node.annotations[0]
                              .style as TextStyleModel).color =
                              arg.currentValue.rgba;
                        }
                      }}
                      ref={fontcolor => (fontColor = fontcolor)}
                    />
                  </div>
                  <div className="col-xs-4 column-style">
                    <NumericTextBoxComponent
                      id="fontSize"
                      value={12}
                      min={1}
                      max={50}
                      step={1}
                      format="##.##"
                      change={() => {
                        changed("fontsize");
                      }}
                      ref={fontsize => (fontSize = fontsize)}
                      aria-label="font-size-textBox"
                    />
                  </div>
                  <div className="col-xs-4 column-style">
                    <DropDownListComponent
                      id="fontfamily"
                      popupWidth={150}
                      width={"100%"}
                      placeholder={"Select a font type"}
                      index={0}
                      dataSource={fontType}
                      change={() => {
                        changed("fontfamily");
                      }}
                      ref={fontfamily => (fontFamily = fontfamily)}
                    />
                  </div>
                </div>
                <div className="row" style={{ paddingTop: "10px" }}>
                  <div className="row row-header">
                    Templates
                  </div>
                  <div className="row col-xs-8" style={{ paddingLeft: "0px", paddingTop: "8px" }}>
                    <DropDownListComponent
                      id="diagramAnnotationTemplate"
                      fields={fields}
                      popupWidth={200}
                      width={"100%"}
                      placeholder={"Select a template"}
                      dataSource={templateList}
                      change={() => {
                        changed("template");
                      }}
                      ref={template => (templateData = template)}
                    />
                  </div>
                </div>
                <div className="row" style={{ paddingTop: "10px" }}>
                  <div className="row row-header">
                    Behaviour
                  </div>
                  <div className="row" style={{ paddingTop: "8px" }}>
                    <CheckBoxComponent
                      id="labelConstraints"
                      label={"Label constraints"}
                      checked={false}
                      change={() => { changed("interaction"); }}
                      ref = {labelConstraints => (labelConstraintsInstance = labelConstraints)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      <div id="action-description">
        <p>
          This sample illustrates the competitive environment of a business
          through five forces chart. The elements of the five force chart is
          described using nodes and annotations. Customizing the position and
          appearance of the annotation is illustrated in this example.
        </p>
      </div>
      <div id="description">
        <p>
          This example shows how to add textual descriptions to shapes and how
          to position them over the shapes. The
          <code>annotations</code> property of the node can be used to add
          descriptions.
        </p>

        <p>
          The <code>offset</code>, <code>horizontalAlignment</code>, and<code>
            verticalAlignment
          </code>{" "}
          properties of the annotation can be used to customize the position
          of the descriptions. The <code>bold</code>,<code>italic</code>,{" "}
          <code>fontSize</code>, and <code>fontFamily</code> properties can be
          used to customize the appearance of the descriptions.
        </p>

        <p>
          To change the position of the descriptions, select a node and choose
          the template in the property panel.
        </p>
        <br />
      </div>
    </div>
  );
}
export default GettingStartedAnnotation;