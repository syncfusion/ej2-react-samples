import * as ReactDOM from "react-dom";
import * as React from "react";
import {
  DiagramComponent,
  SymbolInfo,
  IDragEnterEventArgs,
  SymbolPaletteComponent,
  NodeModel,
  ConnectorModel,
  PointPortModel,
  Node,
  Connector,
  GridlinesModel,
  IExportOptions,
  DiagramTools,
  NodeConstraints,
  ConnectorConstraints,
  IHistoryChangeArgs,
  ISelectionChangeEventArgs,
  IScrollChangeEventArgs,
  PrintAndExport,
  UndoRedo,
  Inject
} from "@syncfusion/ej2-react-diagrams";
import { updateSampleSection } from "../common/sample-base";
import "./font-icons.css";
import { ToolbarComponent } from "@syncfusion/ej2-react-navigations";
import { DropDownButton } from "@syncfusion/ej2-react-splitbuttons";
import { UploaderComponent } from "@syncfusion/ej2-react-inputs";


/**
 * Diagram Default sample
 */
// Function to create nodes
function createFlowNode(
  id,
  offsetX,
  offsetY,
  shape,
  content,
  height = 60,
  margin = null
) {
  return {
    id,
    height, // Custom height for the node, default is 60 if not provided
    offsetX,
    offsetY,
    shape: { type: "Flow", shape },
    annotations: [
      {
        content,
        ...(margin && { margin }) // Conditionally spread the margin property if it exists
      }
    ]
  };
}

// Initializing nodes
let nodes: any = [
  createFlowNode("NewIdea", 300, 80, "Terminator", "Place Order"),
  createFlowNode("Meeting", 300, 160, "Process", "Start Transaction"),
  createFlowNode("BoardDecision", 300, 240, "Process", "Verification"),
  createFlowNode("Project", 300, 330, "Decision", "Credit card valid?"),
  createFlowNode("End", 300, 430, "Decision", "Funds available?"),
  createFlowNode("Payment_method", 545, 330, "Process", "Enter payment method"),
  createFlowNode("transaction_entered", 300, 630, "Terminator", "Log transaction"),
  createFlowNode("Reconcile_entries", 480, 630, "Process", "Reconcile the entries"),
  createFlowNode("transaction_completed", 300, 530, "Process", "Complete Transaction"),
  createFlowNode("Data", 110, 530, "Data", "Send e-mail", 45, { left: 25, right: 25 }), // Custom height of 45 with margin
  createFlowNode("Database", 475, 530, "DirectData", "Customer Database", 70, { left: 25, right: 25 }) // Custom height of 70 with margin
]

// Function to create connectors
function createConnector(
  id,
  sourceID,
  targetID,
  annotations = [],
  type = 'Straight',
  segments = [],
  style={}
) {
  return {
    id,
    sourceID,
    targetID,
    annotations,
    type,
    segments,
    style
  };
}
// Initializing connectors
let connectors: any = [
  createConnector("connector1", "NewIdea", "Meeting"),
  createConnector("connector2", "Meeting", "BoardDecision"),
  createConnector("connector3", "BoardDecision", "Project"),
  createConnector("connector4", "Project", "End", [{ content: "Yes", style: { fill: "white" } }]),
  createConnector("connector5", "End", "transaction_completed", [{ content: "Yes", style: { fill: "white" } }]),
  createConnector("connector6", "transaction_completed", "transaction_entered"),
  createConnector("connector7", "transaction_completed", "Data"),
  createConnector("connector8", "transaction_completed", "Database"),
  createConnector("connector9", "Payment_method", "Meeting", [], 'Orthogonal', [{ direction: "Top", type: 'Orthogonal', length: 120 }]),
  createConnector("connector10", "End", "Payment_method", [{ content: "No", style: { fill: "white" } }], 'Orthogonal', [{ direction: "Right", type: 'Orthogonal', length: 100 }]),
  createConnector("connector11", "Project", "Payment_method", [{ content: "No", style: { fill: "white" } }]),
  createConnector("connector12", "transaction_entered", "Reconcile_entries", [], 'Straight', [],{ strokeDashArray: "2,2"})
];

//Initialize the flowshapes for the symbol palatte
let flowshapes: NodeModel[] = [
  { id: "Terminator", shape: { type: "Flow", shape: "Terminator" } },
  { id: "Process", shape: { type: "Flow", shape: "Process" } },
  { id: "Decision", shape: { type: "Flow", shape: "Decision" } },
  { id: "Document", shape: { type: "Flow", shape: "Document" } },
  {
    id: "PreDefinedProcess",
    shape: { type: "Flow", shape: "PreDefinedProcess" }
  },
  { id: "PaperTap", shape: { type: "Flow", shape: "PaperTap" } },
  { id: "DirectData", shape: { type: "Flow", shape: "DirectData" } },
  { id: "SequentialData", shape: { type: "Flow", shape: "SequentialData" } },
  { id: "Sort", shape: { type: "Flow", shape: "Sort" } },
  { id: "MultiDocument", shape: { type: "Flow", shape: "MultiDocument" } },
  { id: "Collate", shape: { type: "Flow", shape: "Collate" } },
  { id: "SummingJunction", shape: { type: "Flow", shape: "SummingJunction" } },
  { id: "Or", shape: { type: "Flow", shape: "Or" } },
  { id: "InternalStorage", shape: { type: "Flow", shape: "InternalStorage" } },
  { id: "Extract", shape: { type: "Flow", shape: "Extract" } },
  { id: "ManualOperation", shape: { type: "Flow", shape: "ManualOperation" } },
  { id: "Merge", shape: { type: "Flow", shape: "Merge" } },
  {
    id: "OffPageReference",
    shape: { type: "Flow", shape: "OffPageReference" }
  },
  {
    id: "SequentialAccessStorage",
    shape: { type: "Flow", shape: "SequentialAccessStorage" }
  },
  { id: "Annotation", shape: { type: "Flow", shape: "Annotation" } },
  { id: "Annotation2", shape: { type: "Flow", shape: "Annotation2" } },
  { id: "Data", shape: { type: "Flow", shape: "Data" } },
  { id: "Card", shape: { type: "Flow", shape: "Card" } },
  { id: "Delay", shape: { type: "Flow", shape: "Delay" } }
];

// function to create a connector symbol for the palette
function paletteConnectorSymbols(
  id: string,
  type: "Orthogonal" | "Straight" | "Bezier",
  targetDecoratorShape: "Arrow" | "None" = "Arrow",
  strokeColor: string = '#757575'
): ConnectorModel {
  return {
    id,
    type,
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 60, y: 60 },
    style: { strokeWidth: 1, strokeColor },
    targetDecorator: { shape: targetDecoratorShape, style: { strokeColor, fill: strokeColor } }
  };
}

// Initializes connector symbols for the symbol palette
let connectorSymbols: ConnectorModel[] = [
  paletteConnectorSymbols("Link1", "Orthogonal"),
  paletteConnectorSymbols("link2", "Orthogonal", "None"),
  paletteConnectorSymbols("Link3", "Straight"),
  paletteConnectorSymbols("lin4", "Straight", "None"),
  paletteConnectorSymbols("link5", "Bezier", "None")
];
let interval: number[];
interval = [
  1, 9, 0.25, 9.75, 0.25,
  9.75, 0.25, 9.75, 0.25,
  9.75, 0.25, 9.75, 0.25,
  9.75, 0.25, 9.75, 0.25,
  9.75, 0.25, 9.75
];
let gridlines: GridlinesModel = {
  lineColor: "#e0e0e0",
  lineIntervals: interval
};

let diagramInstance: DiagramComponent;
let toolbarEditor: ToolbarComponent;
let toolbarItems: any = [
  { prefixIcon: 'e-icons e-circle-add', tooltipText: 'New Diagram', id: 'New_Diagram' },
  { prefixIcon: 'e-icons e-folder-open', tooltipText: 'Open Diagram', id: 'Open_diagram' },
  { prefixIcon: 'e-icons e-save', tooltipText: 'Save Diagram', id: 'Save' },
  { prefixIcon: 'e-print e-icons', tooltipText: 'Print Diagram', id: 'Print' },
  { type: 'Input', tooltipText: 'Export Diagram', template: '<button id="diagramexportBtn" style="width:100%;"></button>', id: 'Export' },

  { type: 'Separator' },

  { disabled: true, prefixIcon: 'e-cut e-icons', tooltipText: 'Cut', cssClass: 'tb-item-middle tb-item-lock-category', id: 'Cut' },
  { disabled: true, prefixIcon: 'e-copy e-icons', tooltipText: 'Copy', cssClass: 'tb-item-middle tb-item-lock-category', id: 'Copy' },
  { prefixIcon: 'e-icons e-paste', tooltipText: 'Paste', disabled: true, id: 'Paste' },

  { type: 'Separator' },

  { disabled: true, prefixIcon: 'e-icons e-undo', tooltipText: 'Undo', id: 'Undo' },
  { disabled: true, prefixIcon: 'e-icons e-redo', tooltipText: 'Redo', id: 'Redo' },

  { type: 'Separator', },

  { prefixIcon: 'e-pan e-icons', tooltipText: 'Pan Tool', cssClass: 'tb-item-start pan-item', id: 'Pan_tool' },
  { prefixIcon: 'e-mouse-pointer e-icons', tooltipText: 'Select Tool', cssClass: 'tb-item-middle tb-item-selected', id: 'Select_tool' },
  { tooltipText: 'Change Connector Type', template: '<button id="conTypeBtn" style="width:100%;"></button>', cssClass: 'tb-item-middle', id: 'Draw_con' },
  { tooltipText: 'Draw Shapes', template: '<button id="shapesBtn" style="width:100%;"></button>', cssClass: 'tb-item-middle', id: 'Draw_shapes' },
  { prefixIcon: 'e-caption e-icons', tooltipText: 'Text Tool', cssClass: 'tb-item-end', id: 'Text_tool' },

  { type: 'Separator', },

  { disabled: true, prefixIcon: 'e-icons e-lock', tooltipText: 'Lock', cssClass: 'tb-item-middle tb-item-lock-category', id: 'Lock' },
  { disabled: true, prefixIcon: 'e-trash e-icons', tooltipText: 'Delete', cssClass: 'tb-item-middle tb-item-lock-category', id: 'Delete' },

  { type: 'Separator', align: 'Center' },

  { disabled: true, type: 'Input', tooltipText: 'Align Objects', template: '<button id="alignBtn" style="width:100%;"></button>', cssClass: 'tb-item-middle  tb-item-align-category', id: 'Align_objects' },
  { disabled: true, type: 'Input', tooltipText: 'Distribute Objects', template: '<button id="distributeBtn" style="width:100%;"></button>', cssClass: 'tb-item-middle tb-item-space-category', id: 'Distribute_objects' },

  { type: 'Separator', },

  { disabled: true, type: 'Input', tooltipText: 'Order Commands', template: '<button id="orderBtn" style="width:100%;"></button>', cssClass: 'tb-item-middle tb-item-lock-category', id: 'Order' },

  { type: 'Separator' },

  { disabled: true, type: 'Input', tooltipText: 'Group/Ungroup', template: '<button id="groupBtn" style="width:100%;"></button>', cssClass: 'tb-item-middle tb-item-align-category', id: 'Group' },
  { type: 'Separator' },
  { disabled: true, type: 'Input', tooltipText: 'Rotate', template: '<button id="rotateBtn" style="width:100%;"></button>', cssClass: 'tb-item-middle tb-item-lock-category', id: 'Rotate' },
  { type: 'Separator' },
  { disabled: true, type: 'Input', tooltipText: 'Flip', template: '<button id="flipBtn" style="width:100%;"></button>', cssClass: 'tb-item-middle tb-item-lock-category', id: 'Flip' },
  { type: 'Separator' },
  {
    cssClass: 'tb-item-end tb-zoom-dropdown-btn', id: 'Zoom', template: '<button id="btnZoomIncrement"></button>',
  },
];
function Default() {
  React.useEffect(() => {
    updateSampleSection();
    rendereComplete();
  }, [])
  function rendereComplete() {
    addEvents();
    diagramInstance.fitToPage();
  }
  //Create and add ports for node.
  function getPorts(): PointPortModel[] {
    let ports: PointPortModel[] = [
      { id: "port1", shape: "Circle", offset: { x: 0, y: 0.5 } },
      { id: "port2", shape: "Circle", offset: { x: 0.5, y: 1 } },
      { id: "port3", shape: "Circle", offset: { x: 1, y: 0.5 } },
      { id: "port4", shape: "Circle", offset: { x: 0.5, y: 0 } }
    ];
    return ports;
  }

  //To handle toolbar click
  function toolbarClick(args: any) {
    let item = args.item.tooltipText;
    switch (item) {
      case 'Undo':
        diagramInstance.undo();
        break;
      case 'Redo':
        diagramInstance.redo();
        break;
      case 'Lock':
        lockObject(args);
        break;
      case 'Cut':
        diagramInstance.cut();
        var pasteIndex = toolbarEditor.items.findIndex(item => item.id === 'Paste');
        if (pasteIndex !== -1) {
          toolbarEditor.items[pasteIndex].disabled = false;
        }
        break;
      case 'Copy':
        diagramInstance.copy();
        var pasteIndex = toolbarEditor.items.findIndex(item => item.id === 'Paste');
        if (pasteIndex !== -1) {
          toolbarEditor.items[pasteIndex].disabled = false;
        }
        break;
      case 'Paste':
        diagramInstance.paste();
        break;
      case 'Delete':
        diagramInstance.remove();
        break;
      case 'Select Tool':
        diagramInstance.clearSelection();
        diagramInstance.tool = DiagramTools.Default;
        break;
      case 'Text Tool':
        diagramInstance.clearSelection();
        diagramInstance.selectedItems.userHandles = [];
        diagramInstance.drawingObject = { shape: { type: 'Text' } };
        diagramInstance.tool = DiagramTools.ContinuousDraw;
        break;
      case 'Pan Tool':
        diagramInstance.clearSelection();
        diagramInstance.tool = DiagramTools.ZoomPan;
        break;
      case 'New Diagram':
        diagramInstance.clear();
        historyChange(args);
        break;
      case 'Print Diagram':
        printDiagram(args);
        break;
      case 'Save Diagram':
        download(diagramInstance.saveDiagram());
        break;
      case 'Open Diagram':
        document
          .getElementsByClassName('e-file-select-wrap')[0]
          .querySelector('button')
          .click();
        break;
    }
    diagramInstance.dataBind();
  }

  //To print diagram 
  function printDiagram(args: any) {
    const options: IExportOptions = {
      mode: 'Download',
      region: 'Content',
      multiplePage: diagramInstance.pageSettings.multiplePage,
      pageHeight: diagramInstance.pageSettings.height,
      pageWidth: diagramInstance.pageSettings.width,
    };
    diagramInstance.print(options);
  }
  //To enable toolbar items.
  function enableItems() {
    const itemIds = ['Cut', 'Copy', 'Lock', 'Delete', 'Order', 'Rotate', 'Flip'];
    itemIds.forEach(itemId => {
      const item = toolbarEditor.items.find(item => item.id === itemId);
      if (item) {
        item.disabled = false;
      }
    });
  }
  //To disable toolbar items while multiselection.
  function disableMultiselectedItems() {
    const itemIds = ['Align_objects', 'Distribute_objects', 'Group'];
    itemIds.forEach(itemId => {
      const item = toolbarEditor.items.find(item => item.id === itemId);
      if (item) {
        item.disabled = true;
      }
    });
  }

  let asyncSettings: any;
  //To handle selection of connectors.
  function onConnectorSelect(args: any) {
    diagramInstance.clearSelection();
    diagramInstance.drawingObject = { type: args.item.text };
    diagramInstance.tool = DiagramTools.ContinuousDraw;
    diagramInstance.selectedItems.userHandles = [];
    diagramInstance.dataBind();
  }
  //To handle selection of shapes.
  function onShapesSelect(args: any) {
    diagramInstance.clearSelection();
    diagramInstance.drawingObject = { shape: { shape: args.item.text } };
    diagramInstance.tool = DiagramTools.ContinuousDraw;
    diagramInstance.selectedItems.userHandles = [];
    diagramInstance.dataBind();
  }
  //Export the diagraming object based on the format.
  function onselectExport(args: any) {
    const exportOptions: IExportOptions = {
      format: args.item.text,
      mode: 'Download',
      region: 'PageSettings',
      fileName: 'Export',
      margin: { left: 0, top: 0, bottom: 0, right: 0 }
    };
    diagramInstance.exportDiagram(exportOptions);
  }
  //To perform group and ungroup diagram objects.
  function onSelectGroup(args: any) {
    if (args.item.text === 'Group') {
      diagramInstance.group();
    }
    else if (args.item.text === 'Ungroup') {
      diagramInstance.unGroup();
    }
  }
  //To align selelcted diagram objects.
  function onSelectAlignObjects(args: any) {
    let item: any = args.item.text;
    let alignType = item.replace('Align', '');
    let alignType1 = alignType.charAt(0).toUpperCase() + alignType.slice(1);
    diagramInstance.align(alignType1.trim());
  }
  //To distribute selected objects horizontally and vertically.
  function onSelectDistributeObjects(args: any) {
    args.item.text === 'Distribute Objects Vertically'
      ? diagramInstance.distribute('BottomToTop')
      : diagramInstance.distribute('RightToLeft');
  }
  //To execute order commands
  function onSelectOrder(args: any) {
    switch (args.item.text) {
      case 'Bring Forward':
        diagramInstance.moveForward();
        break;
      case 'Bring To Front':
        diagramInstance.bringToFront();
        break;
      case 'Send Backward':
        diagramInstance.sendBackward();
        break;
      case 'Send To Back':
        diagramInstance.sendToBack();
        break;
    }
  }
  //To Rotate the selected diagram objects.
  function onSelectRotate(args: any) {
    args.item.text === 'Rotate Clockwise'
      ? diagramInstance.rotate(diagramInstance.selectedItems, 90)
      : diagramInstance.rotate(diagramInstance.selectedItems, -90);
  }

  function onSelectFlip(args: any) {
    flipObjects(args.item.text);
  }

  // To flip diagram objects
  function flipObjects(flipType: any) {
    let selectedObjects = diagramInstance.selectedItems.nodes.concat((diagramInstance.selectedItems as any).connectors);
    for (let i: number = 0; i < selectedObjects.length; i++) {
      selectedObjects[i].flip = flipType === 'Flip Horizontal' ? 'Horizontal' : 'Vertical';
    }
    diagramInstance.dataBind();
  }
  //Function to download the diagram.
  function download(data: any) {
    if ((window.navigator as any).msSaveBlob) {
      let blob: Blob = new Blob([data], { type: 'data:text/json;charset=utf-8,' });
      (window.navigator as any).msSaveOrOpenBlob(blob, 'Diagram.json');
    }
    else {
      let dataString = 'data:text/json;charset=utf-8,' + encodeURIComponent(data);
      let ele = document.createElement('a');
      ele.href = dataString;
      ele.download = 'Diagram.json';
      document.body.appendChild(ele);
      ele.click();
      ele.remove();
    }
  }
  //To lock and unlock selected objects
  function lockObject(args: any) {
    let isChecked;
    for (let i: number = 0; i < diagramInstance.selectedItems.nodes.length; i++) {
      let node = diagramInstance.selectedItems.nodes[i];
      if (node.constraints & NodeConstraints.Drag) {
        node.constraints = NodeConstraints.PointerEvents | NodeConstraints.Select | NodeConstraints.ReadOnly;
        isChecked = true;
      } else {
        node.constraints = NodeConstraints.Default;
        isChecked = false;
      }
    }
    for (let j: number = 0; j < diagramInstance.selectedItems.connectors.length; j++) {
      let connector = diagramInstance.selectedItems.connectors[j];
      if (connector.constraints & ConnectorConstraints.Drag) {
        connector.constraints = ConnectorConstraints.PointerEvents | ConnectorConstraints.Select | ConnectorConstraints.ReadOnly;
        isChecked = true;
      } else {
        connector.constraints = ConnectorConstraints.Default;
        isChecked = false;
      }
    }
    updateToolbarState(isChecked);
    diagramInstance.dataBind();
  }
  // Function to update the toolbar state based on selected nodes constraints
  function updateToolbarState(isLocked) {
    const itemIds = ['Cut', 'Copy', 'Delete', 'Order', 'Rotate', 'Flip'];
    itemIds.forEach(itemId => {
      const item = toolbarEditor.items.find(item => item.id === itemId);
      if (item) {
        item.disabled = isLocked;
      }
    });
    var Index = toolbarEditor.items.findIndex(item => item.id === 'Lock');
    if (Index !== -1) {
      toolbarEditor.items[Index].disabled = false;
    }
  }


  //To change diagram zoom.
  function zoomChange(args: any) {
    let zoomCurrentValue: any = (document.getElementById("btnZoomIncrement") as any).ej2_instances[0];
    let currentZoom: any = diagramInstance.scrollSettings.currentZoom;
    let zoom: any = {};
    switch (args.item.text) {
      case 'Zoom In':
        diagramInstance.zoomTo({ type: 'ZoomIn', zoomFactor: 0.2 });
        zoomCurrentValue.content = (diagramInstance.scrollSettings.currentZoom * 100).toFixed() + '%';
        break;
      case 'Zoom Out':
        diagramInstance.zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });
        zoomCurrentValue.content = (diagramInstance.scrollSettings.currentZoom * 100).toFixed() + '%';
        break;
      case 'Zoom to Fit':
        zoom.zoomFactor = 1 / currentZoom - 1;
        diagramInstance.zoomTo(zoom);
        zoomCurrentValue.content = diagramInstance.scrollSettings.currentZoom;
        break;
      case 'Zoom to 50%':
        if (currentZoom === 0.5) {
          currentZoom = 0;
          zoom.zoomFactor = (0.5 / currentZoom) - 1;
          diagramInstance.zoomTo(zoom);
        }
        else {
          zoom.zoomFactor = (0.5 / currentZoom) - 1;
          diagramInstance.zoomTo(zoom);
        }
        break;
      case 'Zoom to 100%':
        if (currentZoom === 1) {
          currentZoom = 0;
          zoom.zoomFactor = (1 / currentZoom) - 1;
          diagramInstance.zoomTo(zoom);
        }
        else {
          zoom.zoomFactor = (1 / currentZoom) - 1;
          diagramInstance.zoomTo(zoom);
        }
        break;
      case 'Zoom to 200%':
        if (currentZoom === 2) {
          currentZoom = 0;
          zoom.zoomFactor = (2 / currentZoom) - 1;
          diagramInstance.zoomTo(zoom);
        }
        else {
          zoom.zoomFactor = (2 / currentZoom) - 1;
          diagramInstance.zoomTo(zoom);
        }
        break;
    }

    zoomCurrentValue.content = Math.round(diagramInstance.scrollSettings.currentZoom * 100) + ' %';

  }

  let isMobile: boolean;
  function addEvents(): void {
    isMobile = window.matchMedia('(max-width:550px)').matches;
    if (isMobile) {
      let paletteIcon: HTMLElement = document.getElementById('palette-icon');
      if (paletteIcon) {
        paletteIcon.addEventListener('click', openPalette, false);
      }
    }
  }

  function openPalette(): void {
    let paletteSpace: HTMLElement = document.getElementById('palette-space');
    isMobile = window.matchMedia('(max-width:550px)').matches;
    if (isMobile) {
      if (!paletteSpace.classList.contains('sb-mobile-palette-open')) {
        paletteSpace.classList.add('sb-mobile-palette-open');
      } else {
        paletteSpace.classList.remove('sb-mobile-palette-open');
      }
    }
  }
  //To refresh the overflow of the toolbar after a delay.
  function refreshOverflow() {
    setTimeout(() => {
      toolbarEditor.refreshOverflow();
    }, 100);
  }
  asyncSettings = {
    saveUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Remove'
  };
  //set up uploaded file and call loadDiagram.
  function onUploadSuccess(args: any) {
    let file = args.file;
    let rawFile = file.rawFile;
    let reader = new FileReader();
    reader.readAsText(rawFile);
    reader.onloadend = loadDiagram;
  }

  //Load the diagraming object.
  function loadDiagram(event: any) {
    diagramInstance.loadDiagram(event.target.result);
  }

  //To enable and disable undo/redo button.
  function historyChange(args: any) {
    const undoItem = toolbarEditor.items.find(item => item.id === 'Undo');
    if (undoItem) {
      undoItem.disabled = diagramInstance.historyManager.undoStack.length > 0 ? false : true;
    }
    const redoItem = toolbarEditor.items.find(item => item.id === 'Redo');
    if (redoItem) {
      redoItem.disabled = diagramInstance.historyManager.redoStack.length > 0 ? false : true;
    }
  }
  return (
    <div className="control-pane">
      <div className="control-section">
        <div style={{ width: "100%" }}>
          <div style={{ display: 'none' }}>
            <UploaderComponent
              id="fileUpload"
              type="file"
              showFileList={false}
              asyncSettings={asyncSettings}
              success={onUploadSuccess}
            ></UploaderComponent>
          </div>
          <div className="db-toolbar-container">
            <ToolbarComponent
              ref={(toolbar) => (toolbarEditor = toolbar)}
              id="toolbar_diagram"
              created={() => {
                if (diagramInstance !== undefined) {
                  let conTypeBtn: any = new DropDownButton({
                    items: [
                      { text: 'Straight', iconCss: 'e-icons e-line' },
                      { text: 'Orthogonal', iconCss: 'sf-diagram-icon-orthogonal' },
                      { text: 'Bezier', iconCss: 'sf-diagram-icon-bezier' }
                    ], iconCss: 'e-diagram-icons1 e-diagram-connector e-icons',
                    select: function (args) { onConnectorSelect(args) }
                  });
                  conTypeBtn.appendTo('#conTypeBtn');
                  let btnZoomIncrement: any = new DropDownButton({
                    items: [
                      { text: 'Zoom In' }, { text: 'Zoom Out' }, { text: 'Zoom to Fit' }, { text: 'Zoom to 50%' },
                      { text: 'Zoom to 100%' }, { text: 'Zoom to 200%' }], content: Math.round(diagramInstance.scrollSettings.currentZoom * 100) + ' %', select: zoomChange,
                  });
                  btnZoomIncrement.appendTo('#btnZoomIncrement');
                  let shapesBtn: any = new DropDownButton({
                    items: [
                      { text: 'Rectangle', iconCss: 'e-rectangle e-icons' },
                      { text: 'Ellipse', iconCss: ' e-circle e-icons' },
                      { text: 'Polygon', iconCss: 'e-line e-icons' }
                    ], iconCss: 'e-shapes e-icons',
                    select: function (args) { onShapesSelect(args) }
                  });
                  shapesBtn.appendTo('#shapesBtn');
                  let exportBtn: any = new DropDownButton({
                    items: [
                      { text: 'JPG' }, { text: 'PNG' }, { text: 'SVG' }
                    ], iconCss: 'e-icons e-export', select: function (args) { onselectExport(args) },
                  });
                  exportBtn.appendTo('#diagramexportBtn');

                  let groupBtn: any = new DropDownButton({
                    items: [
                      { text: 'Group', iconCss: 'e-icons e-group-1' }, { text: 'Ungroup', iconCss: 'e-icons e-ungroup-1' }
                    ], iconCss: 'e-icons e-group-1', select: function (args) { onSelectGroup(args) }
                  })
                  groupBtn.appendTo('#groupBtn');
                  let alignBtn: any = new DropDownButton({
                    items: [
                      { iconCss: 'sf-diagram-icon-align-left-1', text: 'Align Left', },
                      { iconCss: 'sf-diagram-icon-align-center-1', text: 'Align Center', },
                      { iconCss: 'sf-diagram-icon-align-right-1', text: 'Align Right', },
                      { iconCss: 'sf-diagram-icon-align-top-1', text: 'Align Top', },
                      { iconCss: 'sf-diagram-icon-align-middle-1', text: 'Align Middle', },
                      { iconCss: 'sf-diagram-icon-align-bottom-1', text: 'Align Bottom', },
                    ], iconCss: 'e-icons e-restart-at-1', select: function (args) { onSelectAlignObjects(args) }
                  })
                  alignBtn.appendTo('#alignBtn');

                  let distributeBtn: any = new DropDownButton({
                    items: [
                      { iconCss: 'sf-diagram-icon-distribute-horizontal', text: 'Distribute Objects Vertically', },
                      { iconCss: 'sf-diagram-icon-distribute-vertical', text: 'Distribute Objects Horizontally', },
                    ], iconCss: 'e-icons e-stroke-width', select: function (args) { onSelectDistributeObjects(args) }
                  });
                  distributeBtn.appendTo('#distributeBtn');
                  let orderBtn: any = new DropDownButton({
                    items: [
                      { iconCss: 'e-icons e-bring-forward', text: 'Bring Forward' },
                      { iconCss: 'e-icons e-bring-to-front', text: 'Bring To Front' },
                      { iconCss: 'e-icons e-send-backward', text: 'Send Backward' },
                      { iconCss: 'e-icons e-send-to-back', text: 'Send To Back' }
                    ], iconCss: 'e-icons e-order', select: function (args) { onSelectOrder(args) }
                  });
                  orderBtn.appendTo('#orderBtn');
                  let rotateBtn: any = new DropDownButton({
                    items: [
                      { iconCss: 'e-icons e-transform-right', text: 'Rotate Clockwise' },
                      { iconCss: 'e-icons e-transform-left', text: 'Rotate Counter-Clockwise' }
                    ], iconCss: 'e-icons e-repeat', select: function (args) { onSelectRotate(args) }
                  });
                  rotateBtn.appendTo('#rotateBtn');
                  let flipBtn: any = new DropDownButton({
                    items: [
                      { iconCss: 'e-icons e-flip-horizontal', text: 'Flip Horizontal' },
                      { iconCss: 'e-icons e-flip-vertical', text: 'Flip Vertical' }
                    ], iconCss: 'e-icons e-flip-horizontal', select: function (args) { onSelectFlip(args) }
                  });
                  flipBtn.appendTo('#flipBtn');
                  refreshOverflow();
                }
              }}
              clicked={toolbarClick}
              items={toolbarItems}
              overflowMode={'Scrollable'}
              width={'100%'}
            >
            </ToolbarComponent>
          </div>
          <div className="sb-mobile-palette-bar">
            <div id="palette-icon" style={{ float: "right" }} className="e-ddb-icons1 e-toggle-palette"></div>
          </div>
          <div
            id="palette-space" className="sb-mobile-palette"
          >
            <SymbolPaletteComponent
              id="symbolpalette"
              expandMode="Multiple"
              palettes={[
                {
                  id: "flow",
                  expanded: true,
                  symbols: flowshapes,
                  iconCss: "e-diagram-icons1 e-diagram-flow",
                  title: "Flow Shapes"
                },
                {
                  id: "connectors",
                  expanded: true,
                  symbols: connectorSymbols,
                  iconCss: "e-diagram-icons1 e-diagram-connector",
                  title: "Connectors"
                }
              ]}
              width={"100%"}
              height={"700px"}
              symbolHeight={60}
              symbolWidth={60}
              enableSearch={true}
              getNodeDefaults={(symbol: NodeModel): void => {
                if (
                  symbol.id === "Terminator" ||
                  symbol.id === "Process" ||
                  symbol.id === "Delay"
                ) {
                  symbol.width = 80;
                  symbol.height = 40;
                } else if (
                  symbol.id === "Decision" ||
                  symbol.id === "Document" ||
                  symbol.id === "PreDefinedProcess" ||
                  symbol.id === "PaperTap" ||
                  symbol.id === "DirectData" ||
                  symbol.id === "MultiDocument" ||
                  symbol.id === "Data"
                ) {
                  symbol.width = 50;
                  symbol.height = 40;
                } else {
                  symbol.width = 50;
                  symbol.height = 50;
                }
                symbol.style.strokeColor = '#757575'
              }}
              symbolMargin={{ left: 15, right: 15, top: 15, bottom: 15 }}
              getSymbolInfo={(symbol: NodeModel): SymbolInfo => {
                return { fit: true };
              }}

            />
          </div>
          <div
            id="diagram-space" className="sb-mobile-diagram"
          >
            <DiagramComponent
              id="diagram"
              ref={diagram => (diagramInstance = diagram)}
              width={"100%"}
              height={"700px"}
              snapSettings={{
                horizontalGridlines: gridlines,
                verticalGridlines: gridlines
              }}
              nodes={nodes}
              connectors={connectors} //Sets the default values of a node
              getNodeDefaults={(node: NodeModel) => {
                if (node.width === undefined) {
                  node.width = 145;
                }
                node.style = { fill: '#357BD2', strokeColor: 'white' };
                for (let i: number = 0; i < node.annotations.length; i++) {
                  node.annotations[i].style = {
                    color: 'white',
                    fill: 'transparent',
                  };
                }
                //Set ports
                node.ports = getPorts();
                return node;
              }} //Sets the default values of a connector
              getConnectorDefaults={(obj: Connector) => {
                if (obj.id.indexOf("connector") !== -1) {
                  obj.targetDecorator = {
                    shape: "Arrow",
                    width: 10,
                    height: 10
                  };
                }
              }}
              scrollChange={(args: IScrollChangeEventArgs) => {
                if (args.panState !== 'Start') {
                  let zoomCurrentValue: any =
                    (document.getElementById('btnZoomIncrement') as any)
                      .ej2_instances[0];
                  zoomCurrentValue.content =
                    Math.round(
                      diagramInstance.scrollSettings.currentZoom * 100
                    ) + ' %';
                }
              }}
              historyChange={(args: IHistoryChangeArgs) => {
                historyChange(args);
              }}
              selectionChange={(args: ISelectionChangeEventArgs) => {
                if (args.state === 'Changed') {
                  let selectedItems = diagramInstance.selectedItems.nodes;
                  selectedItems = selectedItems.concat(
                    (diagramInstance.selectedItems as any).connectors
                  );
                  if (selectedItems.length === 0) {
                    const itemIds = ['Cut', 'Copy', 'Lock', 'Delete', 'Order', 'Rotate', 'Flip'];
                    itemIds.forEach(itemId => {
                      const item = toolbarEditor.items.find(item => item.id === itemId);
                      if (item) {
                        item.disabled = true;
                      }
                    });
                    disableMultiselectedItems();
                  }
                  if (selectedItems.length === 1) {
                    enableItems();
                    disableMultiselectedItems();
                    if (selectedItems[0].children !== undefined && selectedItems[0].children.length > 0) {
                      var Index = toolbarEditor.items.findIndex(item => item.id === 'Group');
                      if (Index !== -1) {
                        toolbarEditor.items[Index].disabled = false;
                      }
                    }
                    else {
                      var Index = toolbarEditor.items.findIndex(item => item.id === 'Group');
                      if (Index !== -1) {
                        toolbarEditor.items[Index].disabled = true;
                      }
                    }
                  }

                  if (selectedItems.length > 1) {
                    enableItems();
                    const itemIds = ['Align_objects', 'Group'];
                    itemIds.forEach(itemId => {
                      const item = toolbarEditor.items.find(item => item.id === itemId);
                      if (item) {
                        item.disabled = false;
                      }
                    });
                    //To enable distribute objcets when selected items length is greater than 2
                    if (selectedItems.length > 2) {
                      var Index = toolbarEditor.items.findIndex(item => item.id === 'Distribute_objects');
                      if (Index !== -1) {
                        toolbarEditor.items[Index].disabled = false;
                      }
                    }
                    else {
                      var Index = toolbarEditor.items.findIndex(item => item.id === 'Distribute_objects');
                      if (Index !== -1) {
                        toolbarEditor.items[Index].disabled = true;
                      }
                    }
                  }
                }
              }}
              //Sets the Node style for DragEnter element.
              dragEnter={(args: IDragEnterEventArgs): void => {
                let obj: NodeModel = args.element as NodeModel;
                if (obj instanceof Node) {
                  let objWidth: number = obj.width;
                  let objHeight: number = obj.height;
                  let ratio: number = 100 / obj.width;
                  obj.width = 100;
                  obj.height *= ratio;
                  obj.offsetX += (obj.width - objWidth) / 2;
                  obj.offsetY += (obj.height - objHeight) / 2;
                  obj.style = { fill: "#357BD2", strokeColor: "white" };
                }
              }}
            >
              <Inject services={[PrintAndExport, UndoRedo]} />
            </DiagramComponent>
          </div>
        </div>
      </div>
      <div id="action-description">
        <p>
          This sample visualizes the processing of an order placed using
          credit card with built-in flow shapes.
        </p>
      </div>
      <div id="description">
        <p>
          This example shows how to create a simple flow chart using the
          diagram control. The <code>nodes</code> property can be used to
          define different stages of a process. To define the flow between
          different stages, the <code>connectors</code> property can be used.
          The <code>getNodeDefaults</code> and{" "}
          <code>getConnectorDefaults</code> properties define the default
          behavior of shapes and connectors.
        </p>

        <p>
          To easily build flow diagrams, few shapes are predefined and added
          to symbol palette. You can drag-and-drop predefined shapes into the
          drawing area. The <code>symbols</code> property allows you to add
          predefined symbols to the palette.
        </p>

        <p>In this example, undo and redo support is enabled.</p>
        <p style={{ fontWeight: 500 }}>Injecting Module</p>
        <p>
          The diagram component’s features are segregated into individual
          feature-wise modules. To enable undo and redo support, inject{" "}
          <code>UndoRedo</code> module into <code>services</code>.
        </p>
        <br />
      </div>
    </div>
  );
}
export default Default;