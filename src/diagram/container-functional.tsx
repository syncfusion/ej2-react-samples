import * as ReactDOM from 'react-dom';
import * as React from "react";
import {
  DiagramComponent,
  NodeModel,
  ConnectorModel,
  Diagram,
  Inject,
  DiagramConstraints,
  UndoRedo,
  Snapping,
  ConnectorBridging,
  ISelectionChangeEventArgs
} from "@syncfusion/ej2-react-diagrams";
import { ToolbarComponent } from '@syncfusion/ej2-react-navigations';
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { NumericTextBoxComponent, ColorPickerComponent, ColorPickerEventArgs } from "@syncfusion/ej2-react-inputs";
import { updateSampleSection } from "../common/sample-base";

Diagram.Inject(Snapping, UndoRedo, ConnectorBridging);

let diagramInstance: DiagramComponent;
let toolbarEditor: ToolbarComponent;
let node: NodeModel;
let fontFamily: DropDownListComponent;
let fontSize: NumericTextBoxComponent;
let fontColor: ColorPickerComponent;
let bold: ButtonComponent;
let italic: ButtonComponent;
let underLine: ButtonComponent;
let selectedItems: any[];

function createNode(id: string, offsetX: number, offsetY: number, height: number,
  width: number, content: string, marginX: number = 0, marginY: number = 0): NodeModel {
  var ports = [];
  if (id == "node5") {
    ports = [
      { id: "port1", offset: { x: 0.9, y: 0 } },
    ];
  }
  if (id == "node6") {

    ports = [
      { id: "port1", offset: { x: 0.9, y: 0 } },
    ];
  }
  if (id == "node13") {

    ports = [
      { id: "port2", offset: { x: 1, y: 0.5 } },
    ];
  }
  if (id == "node15") {

    ports = [
      { id: "port2", offset: { x: 1, y: 0.5 } },
    ];
  }
  if (id == "node3") {

    ports = [
      { id: "port3", offset: { x: 0.25, y: 1 } },
      { id: "port4", offset: { x: 0.5, y: 1 } },
      { id: "port5", offset: { x: 0.75, y: 1 } },
    ];
  }
  if (id == "node7") {
    ports = [
      { id: "port1", offset: { x: 0, y: 0.5 } },
      { id: "port2", offset: { x: 1, y: 0.5 } },
    ];
  }
  if (id == "node8") {
    ports = [
      { id: "port3", offset: { x: 0.25, y: 1 } },
      { id: "port5", offset: { x: 0.75, y: 1 } },
    ];
  }

  return {
    id: id,
    offsetX: offsetX,
    offsetY: offsetY,
    margin: { left: marginX || 0, top: marginY || 0 },
    width: width,
    height: height,
    style: { fill: 'white', strokeColor: '#2546BB', strokeWidth: 1 },
    shape: {
      type: 'Basic', shape: 'Rectangle',
      cornerRadius: 4
    },
    annotations: [{
      content: content,
      style: { color: '#343434' },
      horizontalAlignment: 'Center',
    }],
    ports: ports
  };
}

// Initialize the nodes
const nodes: NodeModel[] = [
  createNode("node1", 300, 300, 60, 100, "HTTP Traffic"),
  createNode("node2", 500, 300, 60, 100, "Ingestion service", 50, 30),
  createNode("node3", 650, 300, 60, 100, "Workflow service", 200, 30),
  createNode("node4", 500, 415, 60, 100, "Package service", 50, 150),
  createNode("node5", 650, 415, 60, 150, "Drone Scheduler service", 175, 150),
  createNode("node6", 800, 415, 60, 100, "Delivery service", 350, 150),
  createNode("node7", 580, 130, 60, 90, "Azure Service Bus"),
  createNode("node8", 815, 130, 60, 100, "Managed Identities"),
  createNode("node9", 1000, 130, 60, 100, "Azure Key Vault"),
  createNode("node10", 500, 550, 60, 100, "Azure Cosmos DB for MongoDB API"),
  createNode("node11", 650, 550, 60, 100, "Azure Cosmos DB"),
  createNode("node12", 800, 550, 60, 100, "Azure Cache for Redis"),
  createNode("node13", 1040, 255, 60, 100, "Azure Application Insights"),
  createNode("node14", 1140, 350, 60, 100, "Azure Monitor"),
  createNode("node15", 1040, 445, 60, 100, "Azure Log Analytics workspace"),
  {
    id: 'container', width: 520, height: 300, offsetX: 660, offsetY: 350,
    shape: {
      type: 'Container',
      header: {
        annotation: {
          content: 'Azure Container Apps Environment',
          style: { fontSize: 18, bold: true, fill: 'transparent', strokeColor: 'transparent' },
        },
        height: 40,
        style: { fontSize: 18, bold: true, fill: 'transparent', strokeColor: 'transparent' },
      },
      children: ["node2", "node3", "node4", "node5", "node6"]
    },
    style: { fill: '#E9EEFF', strokeColor: '#2546BB', strokeWidth: 1 }
  },
];

// Helper function to create connectors with consistent styling
function createConnector(id: string, sourceID: string, targetID: string, sourcePortID: string = '',
  targetPortID: string = '', sourceDecorator: any = null): ConnectorModel {
  return {
    id: id,
    type: 'Orthogonal',
    sourceID: sourceID,
    targetID: targetID,
    sourcePortID: sourcePortID,
    targetPortID: targetPortID,
    style: { strokeColor: "#5E5E5E", strokeWidth: 1 },
    sourceDecorator: sourceDecorator,
    targetDecorator: {
      style: {
        fill: "#5E5E5E",
        strokeColor: "#5E5E5E",
        strokeWidth: 1
      }
    }
  };
};

const connectors: ConnectorModel[] = [
  createConnector("connector1", "node1", "node2"),
  createConnector("connector2", "node4", "node10"),
  createConnector("connector3", "node5", "node11"),
  createConnector("connector4", "node6", "node12"),
  createConnector("connector5", "node8", "node9"),
  createConnector("connector6", "container", "node13"),
  createConnector("connector7", "container", "node15"),
  createConnector("connector8", "node3", "node4", 'port3'),
  createConnector("connector9", "node3", "node5", 'port4'),
  createConnector("connector10", "node3", "node6", 'port5'),
  createConnector("connector11", "node2", "node7", "", 'port1'),
  createConnector("connector12", "node7", "node3", 'port2'),
  createConnector("connector13", "node13", "node14", 'port2'),
  createConnector("connector14", "node15", "node14", 'port2'),
  createConnector("connector16", "node8", "node5", 'port3', 'port1', { style: { fill: "#5E5E5E", strokeColor: "#5E5E5E", strokeWidth: 1 } }),
  createConnector("connector17", "node8", "node6", 'port5', 'port1', { style: { fill: "#5E5E5E", strokeColor: "#5E5E5E", strokeWidth: 1 } })
];

function CommandsSample() {

  // React useEffect hook to run once on component mount
  React.useEffect(() => {
    updateSampleSection();
    rendereComplete(); // Call rendereComplete function
  }, [])
  // Function to complete rendering actions
  function rendereComplete() {
    // Fit the diagram instance to the page
    diagramInstance.fitToPage();
  }

  // Variables for managing diagram drawing state and font properties.
  let fontColor: any;
  let fontFamily: any;
  let fontSize: any;

  //Font dropdown option
  let fontType: { [key: string]: Object }[] = [
    { type: 'Arial', text: 'Arial' },
    { type: 'Aharoni', text: 'Aharoni' },
    { type: 'Bell MT', text: 'Bell MT' },
    { type: 'Fantasy', text: 'Fantasy' },
    { type: 'Segoe UI', text: 'Segoe UI' },
    { type: 'Times New Roman', text: 'Times New Roman' },
    { type: 'Verdana', text: 'Verdana' }
  ];
  let fields = { value: 'type', text: 'text' };

  // Initialize toolbar items with icons, tooltips, and other properties.
  let toolbarItems: any = [
    { id: 'FontStyle', tooltipText: 'Font Style', type: 'Input', align: 'Left', disabled: true, template: renderFontFamilyDropdown },
    { id: 'FontSize', tooltipText: 'Font Size', align: 'Left', disabled: true, template: renderFontSizeNumericBox },
    { id: 'Bold', tooltipText: 'Bold', prefixIcon: 'e-icons e-bold', disabled: true, cssClass: 'tb-item-start' },
    { id: 'Italic', tooltipText: 'Italic', prefixIcon: 'e-icons e-italic', disabled: true, cssClass: 'tb-item-middle' },
    { id: 'Underline', tooltipText: 'Underline', prefixIcon: 'e-icons e-underline', disabled: true, cssClass: 'tb-item-end' },
    { id: 'FontColor', tooltipText: 'Font Color', align: 'Left', disabled: true, template: renderFontColorPicker }
  ];

  // selection change method to update toolar items
  function selectionChange(args: ISelectionChangeEventArgs) {
    if (args.state === 'Changed') {
      selectedItems = this.selectedItems.nodes.concat(this.selectedItems.connectors);
      let hasAnnotation: boolean;
      selectedItems.forEach((item: any) => {
        if (item.shape.type === 'Container') {
          hasAnnotation = (item.shape as any).header.annotation ? true : false;
        }
        else {
          hasAnnotation = selectedItems.some((item: any) => item.annotations && item.annotations.length > 0);
        }
      });
      const toolbarItems = ['FontStyle', 'FontSize', 'Bold', 'Italic', 'Underline', 'FontColor'];
      toolbarItems.forEach(id => {
        const item = toolbarEditor.items.find((item: any) => item.id === id);
        if (item) {
          item.disabled = !hasAnnotation;
        }
      });
    }
  }

  // Executes actions based on the toolbar item clicked.
  function handleToolbarClick(args: any) {
    // Switch based on the tooltip text of the item
    switch (args.item.tooltipText) {
      // Toggle bold style for selected annotation(s)
      case 'Bold':
        updateAnnotationValue('bold', args.value, null);
        break;

      // Toggle italic style for selected annotation(s)
      case 'Italic':
        updateAnnotationValue('italic', args.value, null);
        break;

      // Toggle underline style for selected annotation(s)
      case 'Underline':
        updateAnnotationValue('underline', args.value, null);
        break;
    }
    diagramInstance.dataBind();
  }

  // Updates annotation style attributes based on the provided value.
  function updateAnnotationValue(value: any, fontSize?: any, fontFamily?: any) {
    // Iterate through selected nodes and connectors in the diagram
    for (let i: number = 0; i < selectedItems.length; i++) {
      let object = selectedItems[i];
      const annotations = (object.shape.type === 'Container') ? [(object.shape as any).header.annotation] : object.annotations || [];
      // Iterate through annotations of each node
      for (let j: number = 0; j < annotations.length; j++) {
        let annotationStyle: any = annotations[j].style;

        // Update style attributes based on the provided value
        if (value === 'fontsize') {
          annotationStyle.fontSize = fontSize;
        } else if (value === 'fontfamily') {
          annotationStyle.fontFamily = fontFamily.toString();
        } else if (value === 'bold') {
          annotationStyle.bold = !annotationStyle.bold;
        } else if (value === 'italic') {
          annotationStyle.italic = !annotationStyle.italic;
        } else if (value === 'underline') {
          annotationStyle.textDecoration = annotationStyle.textDecoration === 'None' ? 'Underline' : 'None';
        }
      }
    }

    diagramInstance.dataBind();
  }

  // Renders a dropdown for font family selection.
  function renderFontFamilyDropdown() {
    return (
      <div className="col-xs-4 column-style" style={{ marginLeft: '4px' }}>
        <DropDownListComponent
          id="fontfamily"
          popupWidth={150}
          width={'150px'}
          fields={fields}
          placeholder={'select a font type'}
          index={0}
          dataSource={fontType}
          change={(args) => {
            updateAnnotationValue('fontfamily', null, args.value.toString());
          }}
          ref={(fontfamily) => (fontFamily = fontfamily)}
        />
      </div>
    );
  }

  // Renders a numeric textbox for font size selection.
  function renderFontSizeNumericBox() {
    return (
      <div className="col-xs-4 column-style">
        <NumericTextBoxComponent
          id="fontSize"
          width={'110px'}
          value={12}
          min={1}
          max={30}
          step={2}
          format="##.##"
          change={(args) => {
            updateAnnotationValue('fontsize', args.value);
          }}
          ref={(fontsize) => (fontSize = fontsize)}
        />
      </div>
    );
  }

  // Renders a color picker for font color selection.
  function renderFontColorPicker() {
    return (
      <div className="col-xs-4 column-style">
        <ColorPickerComponent
          id="fontcolor"
          value="#000"
          mode="Palette"
          change={(arg) => {
            selectedItems.forEach((object: any) => {
              if (object.shape.type === 'Container') {
                (object.shape as any).header.annotation.style.color = arg.currentValue.rgba;
              } else {
                object.annotations.forEach((annotation: any) => {
                  annotation.style.color = arg.currentValue.rgba;
                });
              }
            });
            diagramInstance.dataBind();
          }}
          ref={(fontcolor) => (fontColor = fontcolor)}
        />
      </div>
    );
  }

  return (
    <div className="control-pane diagram-control-pane">
      <div style={{ width: "100%" }}>
        <div className="db-toolbar-container">
          {/* Renders toolbar items */}
          <ToolbarComponent
            ref={(toolbar) => (toolbarEditor = toolbar)}
            id="toolbar_diagram"
            clicked={handleToolbarClick}
            items={toolbarItems} >
          </ToolbarComponent>
        </div>
        <DiagramComponent
          id="diagram"
          ref={(diagram) => (diagramInstance = diagram)}
          width={'100%'}
          height={'700px'}
          nodes={nodes}
          connectors={connectors}
          selectionChange={selectionChange}
          constraints={DiagramConstraints.Default | DiagramConstraints.Bridging}
          rulerSettings={{ showRulers: true, dynamicGrid: true }}
        >
          <Inject services={[UndoRedo, Snapping, ConnectorBridging]} />
        </DiagramComponent>
      </div>
      <div id="action-description">
          <p>
              This sample visualizes a structured process flow by grouping related elements using built-in container shapes.
          </p>
      </div>
      <div id="description">
          <p>
              This sample demonstrates how a process can be organized using containers that group related elements together.
              Setting the <code>type</code>  property of a shape to Container enables the grouping behavior. Nodes can be
              added inside the container using the <code>children</code> property. Additionally, containers can be created
              interactively by dragging container shapes from the symbol palette into the diagram.
          </p>
          <br />
      </div>
    </div>
  );

}

export default CommandsSample;
