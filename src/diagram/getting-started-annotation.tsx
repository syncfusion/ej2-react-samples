import * as ReactDOM from "react-dom";
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
import { SampleBase } from "../common/sample-base";
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

let fontType: { [key: string]: Object }[] = [
  { type: "Arial", text: "Arial" },
  { type: "Aharoni", text: "Aharoni" },
  { type: "Bell MT", text: "Bell MT" },
  { type: "Fantasy", text: "Fantasy" },
  { type: "Times New Roman", text: "Times New Roman" },
  { type: "Segoe UI", text: "Cubic Bezier" },
  { type: '"Verdana") ', text: "Cubic Bezaier" }
];

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

const sample_css = `.image-pattern-style {
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

.e-remove-selection .property-section-content {
  pointer-events: none;
}

.column-style {
  display: table;
  height: 35px;
  padding-right: 4px;
  padding-left: 0px;
  width: calc((100% - 12px) / 3);
}

.row {
  margin-left: 0px;
  margin-right: 0px;
}

.row-header {
  font-size: 15px;
  font-weight: 500;
}
.property-section .e-remove-selection {
  cursor: not-allowed;
}
.property-panel-header {
  padding-top: 15px;
  padding-bottom: 15px;
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
  padding-top: 5px;
}
.e-btn {
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0), 0 2px 2px 0 rgba(0, 0, 0, 0), 0 1px 5px 0 rgba(0, 0, 0, 0);
}

.e-bigger .e-btn.e-small.e-icon-btn {
  padding: 0px;
}`;
export class GettingStartedAnnotation extends SampleBase<{}, {}> {
  private fields: object = { text: 'text', value: 'value' };

  rendereComplete() {
    diagramInstance.fitToPage();
    diagramInstance.select([diagramInstance.nodes[0]]);
    bold.element.onclick = () => {
      changed("bold");
    };
    italic.element.onclick = () => {
      changed("italic");
    };
    underLine.element.onclick = () => {
      changed("underline");
    };
    //Click event for Appearance of the Property Panel
    document.getElementById("appearance").onclick = (args: MouseEvent) => {
      let target: HTMLElement = args.target as HTMLElement;
      let selectedElement: HTMLCollection = document.getElementsByClassName(
        "e-selected-style"
      );
      if (selectedElement.length) {
        selectedElement[0].classList.remove("e-selected-style");
      }
      if (target.className === "image-pattern-style") {
        updatePosition(target.id);
      }
    };
  }
  render() {
    return (
      <div className="control-pane diagram-control-pane">
        <style>{sample_css}</style>
        <div className="col-lg-8 control-section">
        <div className="content-wrapper" style={{width: "100%"}}>
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
                if (arg.newValue[0]) {
                  let node: NodeModel = arg.newValue[0] as NodeModel;
                  let annotations: AnnotationModel[] = node.annotations;
                  if (
                    node.annotations[0].offset.x === 0 &&
                    node.annotations[0].offset.y === 0
                  ) {
                    updatePosition("left");
                  } else if (
                    node.annotations[0].offset.x === 1 &&
                    node.annotations[0].offset.y === 0
                  ) {
                    updatePosition("right");
                  } else if (
                    node.annotations[0].offset.x === 1 &&
                    node.annotations[0].offset.y === 0
                  ) {
                    updatePosition("right");
                  } else if (
                    node.annotations[0].offset.x === 0 &&
                    node.annotations[0].offset.y === 1
                  ) {
                    updatePosition("bottoml");
                  } else if (
                    node.annotations[0].offset.x === 1 &&
                    node.annotations[0].offset.y === 1
                  ) {
                    updatePosition("bottomr");
                  } else if (
                    node.annotations[0].offset.x === 0.5 &&
                    node.annotations[0].offset.y === 0.5
                  ) {
                    updatePosition("center");
                  } else if (
                    node.annotations[0].offset.x === 0.5 &&
                    node.annotations[0].offset.y === 1
                  ) {
                    updatePosition("bottomcenter_top");
                  }
                }
                enableOptions(arg);
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

        <div className="col-lg-4 property-section">
          <div className="property-panel-header">Properties</div>
          <div id="propertypanel" className="e-remove-selection">
            <div className="property-section-content">
              <div className="row property-panel-content" id="appearance">
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
                      id="bottoml"
                      style={{
                        backgroundImage:
                          "url('src/diagram/Images/annotation/Annotation_3.png')"
                      }}
                    />
                  </div>
                  <div className="row" style={{ paddingTop: "8px" }}>
                    <div
                      className="image-pattern-style"
                      id="bottomr"
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
                      id="bottomcenter_top"
                      style={{
                        backgroundImage:
                          "url('src/diagram/Images/annotation/Annotation_6.png')"
                      }}
                    />
                  </div>
                </div>

                <div className="row property-panel-content" style={{ paddingTop: "10px" , overflow: "hidden"}}>
                  <div className="row row-header">Appearance</div>
                  <div className="row" style={{ paddingTop: "8px" }}>
                    <div className="col-xs-4 column-style">
                      <ButtonComponent
                        style={{ width: "100%" }}
                        id="bold"
                        iconCss={"e-diagram-icons e-diagram-bold"}
                        ref={boldref => (bold = boldref)}
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
                            for (
                              let j: number = 0;
                              j < node.annotations.length;
                              j++
                            ) {
                              (node.annotations[j]
                                .style as TextStyleModel).color =
                                arg.currentValue.rgba;
                            }
                          }
                        }}
                        ref={fontcolor => (fontColor = fontcolor)}
                      />
                    </div>
                    <div className="col-xs-4 column-style">
                      <NumericTextBoxComponent
                        id="fontSize"
                        value={12}
                        min={0}
                        max={50}
                        step={1}
                        format="##.##"
                        change={() => {
                          changed("fontsize");
                        }}
                        ref={fontsize => (fontSize = fontsize)}
                      />
                    </div>
                    <div className="col-xs-4 column-style">
                      <DropDownListComponent
                        id="fontfamily"
                        popupWidth={150}
                        width={"100%"}
                        placeholder={"select a font type"}
                        index={0}
                        dataSource={fontType}
                        change={() => {
                          changed("fontfamily");
                        }}
                        ref={fontfamily => (fontFamily = fontfamily)}
                      />
                    </div>
                  </div>
                  <div className="row" style= {{paddingTop: "10px"}}>
                     <div className="row row-header"> 
                         Templates 
                     </div>
                  <div className="row col-xs-8" style= {{paddingLeft: "0px", paddingTop: "8px"}}>
                  <DropDownListComponent
                        id="template"
                        fields={this.fields}
                        popupWidth={200}
                        width={"100%"}
                        placeholder={"select a template"}
                        dataSource={templateList}
                        change={() => {
                          changed("template");
                        }}
                        ref={template => (templateData = template)}
                      />
                 </div>
               </div>
              <div className="row" style={{paddingTop: "10px"}}>
                <div className="row row-header"> 
                    Behaviour
                </div>
              <div className="row" style= {{paddingTop: "8px"}}>
                <CheckBoxComponent
                  id="labelConstraints"
                  label={"labelConstraints"}
                  checked={false}
                  change={() => {
                    changed("interaction");
                  }}
                  />
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
}

//Apply the appearence of the Annotation
function changed(value: string): void {
  for (let i: number = 0; i < diagramInstance.selectedItems.nodes.length; i++) {
    node = diagramInstance.selectedItems.nodes[i];
    for (let j: number = 0; j < node.annotations.length; j++) {
      if (value === "fontsize") {
        (node.annotations[j].style as TextStyleModel).fontSize = fontSize.value;
      } else if (value === "underline") {
        (node.annotations[j].style as TextStyleModel).textDecoration =
          "Underline";
      } else if (value === "fontfamily") {
        (node.annotations[j]
          .style as TextStyleModel).fontFamily = fontFamily.value.toString();
      } else if (value === "bold") {
        (node.annotations[j].style as TextStyleModel).bold = true;
      } else if (value === "italic") {
        (node.annotations[j].style as TextStyleModel).italic = true;
      }else if (value === 'template') {
        if (templateData.value.toString() === 'none') {
            node.annotations[j].template = '';
            node.annotations[j].width = undefined;
            node.annotations[j].height = undefined;
        } else {
             node.annotations[j].width = 25;
             node.annotations[j].height = 25;
             node.annotations[j].template =
                 '<img src="src/diagram/Images/annotation/' + templateData.value.toString() + '.svg" style="width:100%;height:100%" />';
          }
      } else if (value === 'interaction') {
        let annot: ShapeAnnotationModel = node.annotations[j];
        if (annot && annot.constraints) {
          annot.constraints = annot.constraints ^ AnnotationConstraints.Interaction;
        }
      }
      diagramInstance.dataBind();
    }
  }
}
//Update the Annotation Position based on the selection
function updatePosition(id: string): void {
  let target: HTMLElement = document.getElementById(id);
  for (let i: number = 0; i < diagramInstance.selectedItems.nodes.length; i++) {
    node = diagramInstance.selectedItems.nodes[i];
    //we can refactor this code using a method
    for (let j: number = 0; j < node.annotations.length; j++) {
      let annotation: ShapeAnnotationModel = node.annotations[j];
      switch (target.id) {
        case "left":
          setAnnotationPosition(annotation, 0, 0, "Top", "Left", target);
          break;
        case "right":
          setAnnotationPosition(annotation, 1, 0, "Top", "Right", target);
          break;
        case "bottoml":
          setAnnotationPosition(annotation, 0, 1, "Bottom", "Left", target);
          break;
        case "bottomr":
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
        case "bottomcenter_top":
          setAnnotationPosition(annotation, 0.5, 1, "Top", "Center", target);
          break;
      }
    }
  }
}
//set the Annotation Position
function setAnnotationPosition( //it is in dedicated line here.
  annotation: ShapeAnnotationModel,
  offsetX: number,
  offsetY: number,
  vAlignment: VerticalAlignment,
  hAlignment: HorizontalAlignment,
  target: HTMLElement
): void {
  annotation.offset.x = offsetX;
  annotation.offset.y = offsetY;
  annotation.verticalAlignment = vAlignment;
  annotation.horizontalAlignment = hAlignment;
  if (vAlignment === "Top" && hAlignment === "Left") {
    annotation.margin = { left: 3, top: 3 };
  } else if (vAlignment === "Top" && hAlignment === "Right") {
    annotation.margin = { right: 3, top: 3 };
  } else if (vAlignment === "Bottom" && hAlignment === "Left") {
    annotation.margin = { left: 3, bottom: 3 };
  } else if (vAlignment === "Bottom" && hAlignment === "Right") {
    annotation.margin = { right: 3, bottom: 3 };
  }
  // custom code start
  target.classList.add("e-selected-style");
  // custom code end
}
//Enable or disable the property panel
// custom code start
function enableOptions(arg: ISelectionChangeEventArgs): void {
  let appearance: HTMLElement = document.getElementById("propertypanel");
  let selectedElement: HTMLCollection = document.getElementsByClassName(
    "e-remove-selection"
  );
  if (arg.newValue) {
    if (arg.newValue[0] instanceof Node) {
      if(selectedElement.length > 0) {
        selectedElement[0].classList.remove("e-remove-selection");
     }
    } else {
      if (!appearance.classList.contains("e-remove-selection")) {
        appearance.classList.add("e-remove-selection");
      }
    }
  }
}
// custom code end