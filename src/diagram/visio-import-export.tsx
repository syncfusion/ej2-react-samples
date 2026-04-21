import * as ReactDOM from "react-dom";
import * as React from "react";
import {
  DiagramComponent, IDragEnterEventArgs, SymbolPaletteComponent, FlowShapes,
  NodeModel, ConnectorModel, Node, DiagramTools, SymbolInfo,
  ISelectionChangeEventArgs, ImportAndExportVisio, IImportingEventArgs,
  BpmnDiagrams, UndoRedo, Inject
} from "@syncfusion/ej2-react-diagrams";
import { SampleBase } from "../common/sample-base";
import "./font-icons.css";
import { ToolbarComponent, ItemsDirective, ItemDirective, ItemModel } from "@syncfusion/ej2-react-navigations";
import { DropDownButtonComponent } from "@syncfusion/ej2-react-splitbuttons";
import { UploaderComponent, FileInfo } from "@syncfusion/ej2-react-inputs";
import { ToastComponent } from '@syncfusion/ej2-react-notifications';


/**
 * Visio Import/Export
 */

// Helper method to create a process node
function createNode(id: string, content: string, offsetY: number, shape: FlowShapes = 'Process',
  offsetX: number = 400, width: number = 100, height: number = 50, ports?: any[]): NodeModel {
  const node: NodeModel = {
    id,
    shape: { type: 'Flow', shape },
    style: { fill: '#357BD2', strokeColor: 'white' },
    annotations: [{ content, style: { color: 'white' } }],
    offsetX,
    offsetY,
    width,
    height,
    ...(ports && { ports }),
  };

  return node;
}

// Helper method to create a connector
function createConnector(id: string, sourceID: string, targetID: string,
  annotation?: string, sourcePortID?: string, targetPortID?: string): ConnectorModel {
  return {
    id,
    sourceID,
    targetID,
    type: 'Orthogonal',
    ...(annotation && {
      annotations: [{
        content: annotation,
        alignment: annotation === 'Yes' ? 'After' : 'Before',
        displacement: annotation === 'Yes' ? { x: 5, y: 0 } : { x: 5, y: 5 },
      }],
    }),
    ...(sourcePortID && { sourcePortID }),
    ...(targetPortID && { targetPortID }),
  };
}

// Define the nodes using helper method
const nodes: NodeModel[] = [
  createNode('start', 'Start', 80, 'Terminator'),
  createNode('draft', 'Draft', 180, 'Process', 400, 100, 50, [
      { id: 'rightport', offset: { x: 1, y: 0.5 } },
  ]),
  createNode('approvedDecision', 'Approved?', 280, 'Decision', 400, 120, 60),
  createNode('revise', 'Revise', 280, 'Process', 600, 100, 50, [
      { id: 'rightport', offset: { x: 1, y: 0.5 } },
  ]),
  createNode('copyedit', 'Copyedit', 400),
  createNode('proof', 'Proof', 500),
  createNode('finalrevise', 'Revise', 600),
  createNode('finalize', 'Finalize', 700),
  createNode('publish', 'Publish', 800, 'Terminator')
];

// Define the connectors using helper method
const connectors: ConnectorModel[] = [
  createConnector('connector1', 'start', 'draft'),
  createConnector('connector2', 'draft', 'approvedDecision'),
  createConnector('connector3', 'approvedDecision', 'copyedit', 'Yes'),
  createConnector('connector4', 'approvedDecision', 'revise', 'No'),
  createConnector('connector5', 'revise', 'draft', undefined, 'rightport', 'rightport'),
  createConnector('connector6', 'copyedit', 'proof'),
  createConnector('connector7', 'proof', 'finalrevise'),
  createConnector('connector8', 'finalrevise', 'finalize'),
  createConnector('connector9', 'finalize', 'publish'),
];


// Define the palette nodes for "Flow Shapes"
const flowShapes: NodeModel[] = [
  { id: 'Process', shape: { type: 'Flow', shape: 'Process' } },
  { id: 'Decision', shape: { type: 'Flow', shape: 'Decision' } },
  { id: 'Document', shape: { type: 'Flow', shape: 'Document' } },
  { id: 'Terminator', shape: { type: 'Flow', shape: 'Terminator' } },
  { id: 'PredefinedProcess', shape: { type: 'Flow', shape: 'PreDefinedProcess' } },
  { id: 'Data', shape: { type: 'Flow', shape: 'Data' } },
  { id: 'DirectData', shape: { type: 'Flow', shape: 'DirectData' } },
  { id: 'InternalStorage', shape: { type: 'Flow', shape: 'InternalStorage' } },
  { id: 'ManualInput', shape: { type: 'Flow', shape: 'ManualInput' } },
  { id: 'ManualOperation', shape: { type: 'Flow', shape: 'ManualOperation' } },
];

// Define the palette nodes for "Basic Shapes"
const basicShapes: NodeModel[] = [
  { id: 'Rectangle', shape: { type: 'Basic', shape: 'Rectangle' } },
  { id: 'Ellipse', shape: { type: 'Basic', shape: 'Ellipse' } },
  { id: 'Hexagon', shape: { type: 'Basic', shape: 'Hexagon' } },
  { id: 'Parallelogram', shape: { type: 'Basic', shape: 'Parallelogram' } },
  { id: 'Pentagon', shape: { type: 'Basic', shape: 'Pentagon' } },
  { id: 'Heptagon', shape: { type: 'Basic', shape: 'Heptagon' } },
  { id: 'Octagon', shape: { type: 'Basic', shape: 'Octagon' } },
  { id: 'Triangle', shape: { type: 'Basic', shape: 'Triangle' } },
  { id: 'Star', shape: { type: 'Basic', shape: 'Star' } },
  { id: 'Plus', shape: { type: 'Basic', shape: 'Plus' } },
];

// Define the palette connectors for "Connectors"
const paletteConnectors: ConnectorModel[] = [
  {
    id: 'Link1', type: 'Orthogonal',
    targetDecorator: { shape: 'Arrow', style: { strokeColor: '#757575', fill: '#757575' } },
  },
  {
    id: 'Link2', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
    targetDecorator: { shape: 'None' }
  },
  {
    id: 'Link3', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
    targetDecorator: { shape: 'Arrow', style: { strokeColor: '#757575', fill: '#757575' } },
  },
  {
    id: 'Link4', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
    targetDecorator: { shape: 'None' }
  },
  {
    id: 'Link5', type: 'Bezier', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
    targetDecorator: { shape: 'None' }
  },
];

let selectedItems: any[];
let diagramInstance: DiagramComponent;
let uploaderInstance: UploaderComponent;
let toolbarEditor: ToolbarComponent;
let toastInstance: ToastComponent;

let connectorData = [
  { text: 'Straight', iconCss: 'e-icons e-line' },
  { text: 'Orthogonal', iconCss: 'sf-diagram-icon-orthogonal' },
  { text: 'Bezier', iconCss: 'sf-diagram-icon-bezier' }
]
let shapeData = [
  { text: 'Rectangle', iconCss: 'e-rectangle e-icons' },
  { text: 'Ellipse', iconCss: ' e-circle e-icons' },
]

export class VisioImportExport extends SampleBase<{}, {}> {
  rendereComplete() {
    addEvents();
    setTimeout(() => {
      // show diagram
      const container = document.querySelector('.visio-import-container') as HTMLElement;
      if (container) {
        container.style.opacity = '1';
      }
    }, 10);
    diagramInstance.fitToPage();
  }
  connector = () => {
    return (<div><DropDownButtonComponent
      items={connectorData}
      cssClass="tb-item-middle"
      iconCss="e-diagram-icons1 e-diagram-connector e-icons"

      select={onConnectorSelect}></DropDownButtonComponent ></div>);
  };
  shapes = () => {
    return (<div><DropDownButtonComponent
      items={shapeData}
      cssClass="tb-item-middle"
      iconCss="e-shapes e-icons"
      select={onShapesSelect}></DropDownButtonComponent ></div>);
  };

  render() {
    return (
      <div className="control-pane">
        <div className="control-section visio-import-container" style={{ opacity: 0 }}>
          <div style={{ width: "100%" }}>
            <div>
              <input
                id="vsdxInput"
                type="file"
                accept=".vsdx"
                style={{ display: 'none', position: 'absolute', left: '-9999px', width: 0, height: 0, opacity: 0 }}
              />
            </div>
            <div className="db-toolbar-container">
              <ToolbarComponent
                ref={(toolbar) => (toolbarEditor = toolbar)}
                id="toolbar_diagram"
                clicked={toolbarClick}
                overflowMode={'Scrollable'}
                width={'100%'}
              >
                <ItemsDirective>
                  <ItemDirective prefixIcon='e-icons e-circle-add' tooltipText='New Diagram' align="Left" id="New_Diagram" />
                  <ItemDirective prefixIcon='e-icons e-import' tooltipText='Import Visio (.vsdx)' align="Left" id="Import" />
                  <ItemDirective prefixIcon='e-icons e-export' tooltipText='Export as Visio (.vsdx)' align="Left" id="Export" />
                  <ItemDirective type='Separator' />
                  <ItemDirective type="Input" tooltipText='Draw Connectors' align="Left" id="Draw_con" template={this.connector} />
                  <ItemDirective type="Input" tooltipText='Draw Shapes' align="Left" id="Draw_shapes" template={this.shapes} />
                  <ItemDirective type='Separator' />
                  <ItemDirective disabled={true} prefixIcon='e-cut e-icons' tooltipText='Cut'
                    cssClass='tb-item-middle tb-item-lock-category'
                    align="Left" id="Cut" />
                  <ItemDirective disabled={true} prefixIcon='e-copy e-icons' tooltipText='Copy'
                    cssClass='tb-item-middle tb-item-lock-category'
                    align="Left" id="Copy" />
                  <ItemDirective disabled={true} prefixIcon='e-icons e-paste' tooltipText='Paste' cssClass='tb-item-middle tb-item-lock-category'
                    align="Left" id="Paste" />
                  <ItemDirective type='Separator' />
                  <ItemDirective disabled={true} prefixIcon='e-icons e-undo' tooltipText='Undo'
                    align="Left" id="Undo" />
                  <ItemDirective disabled={true} prefixIcon='e-icons e-redo' tooltipText='Redo'
                    align="Left" id="Redo" />
                  <ItemDirective type='Separator' />
                  <ItemDirective disabled={true} prefixIcon='e-trash e-icons' tooltipText='Delete'
                    cssClass='tb-item-middle tb-item-lock-category'
                    align="Left" id="Delete" />
                </ItemsDirective>
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
                    id: 'flowShapesPalette',
                    expanded: true,
                    symbols: flowShapes,
                    title: 'Flow Shapes',
                    iconCss: 'e-ddb-icons e-flow'
                  },
                  {
                    id: 'basicShapesPalette',
                    expanded: false,
                    symbols: basicShapes,
                    title: 'Basic Shapes',
                    iconCss: 'e-ddb-icons e-basic'
                  },
                  {
                    id: 'connectorsPalette',
                    expanded: false,
                    symbols: paletteConnectors,
                    title: 'Connectors',
                    iconCss: 'e-ddb-icons e-diagram-connector'
                  },
                ]}
                width={"100%"}
                height={"700px"}
                symbolHeight={50}
                symbolWidth={50}
                getSymbolInfo={(symbol: NodeModel): SymbolInfo => {
                  return { fit: true };
                }}
                getNodeDefaults={(symbol: NodeModel): void => {
                  symbol.style = { fill: '#357BD2', strokeColor: 'white' };
                  symbol.width = 40;
                  symbol.height = 40;
                }}
                getConnectorDefaults={(connector: ConnectorModel): void => {
                  connector.sourcePoint = { x: 0, y: 0 };
                  connector.targetPoint = { x: 60, y: 60 };
                  connector.style = { strokeWidth: 1, strokeColor: '#757575' };
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
                nodes={nodes}
                connectors={connectors}
                diagramImporting={diagramImporting}
                diagramExporting={diagramExporting}
                historyChange={historyChange}
                selectionChange={(args: ISelectionChangeEventArgs) => {
                  if (args.state === 'Changed') {
                    selectedItems = diagramInstance.selectedItems.nodes;
                    selectedItems = selectedItems.concat(
                      (diagramInstance.selectedItems as any).connectors
                    );

                    if (selectedItems.length === 0) {
                      updateToolbarItems(['Cut', 'Copy', 'Delete'], true);
                    }
                    else {
                      updateToolbarItems(['Cut', 'Copy', 'Delete'], false);
                    }
                  }
                }}
                //Sets the Node style for DragEnter element.
                dragEnter={(args: IDragEnterEventArgs): void => {
                  let obj = args.element;
                  if (obj instanceof Node) {
                    let objWidth: number = obj.width;
                    let objHeight: number = obj.height;
                    let ratio: number = 100 / obj.width;
                    obj.width = 100;
                    obj.height *= ratio;
                    obj.offsetX += (obj.width - objWidth) / 2;
                    obj.offsetY += (obj.height - objHeight) / 2;
                  }
                }}
              >
                <Inject services={[BpmnDiagrams, UndoRedo, ImportAndExportVisio]} />
              </DiagramComponent>
            </div>
            <ToastComponent
              ref={toast => toastInstance = toast}
              id="toast"
              position={{ X: "Right", Y: "Bottom" }}>
            </ToastComponent>
          </div>
        </div>
        <div id="action-description">
          <p>
            This sample demonstrates how to import and export Visio diagrams using the Syncfusion<sup>®</sup> EJ2 React Diagram. Any Visio file (.vsdx) can be imported to visualize and edit workflows, and the customized diagram can then be exported back to Visio format (.vsdx) for seamless collaboration and interoperability.
          </p>
          <p>
            <b>NOTE: This feature is currently experimental. Some functionalities may be limited or may not work as expected. We welcome you to try it out and share your <a href="https://www.syncfusion.com/feedback" target="_blank">feedback</a> as we continue to refine and improve it.</b>
          </p>
        </div>
        <div id="description">
          <p>
            The Visio file (.vsdx) can be imported through the "Import Visio" option in the toolbar using the <code>importFromVisio</code> method, and the customized file can be exported back to Visio format (.vsdx) through the "Export as Visio" option in the toolbar using the <code>exportToVisio</code> method. Once the file is imported, elements on the canvas can be edited using features such as <b>Cut</b>, <b>Copy</b>, <b>Paste</b>, <b>Drag</b>, <b>Resize</b>, <b>Delete</b>, <b>Draw Connectors and Shapes</b>, <b>Undo</b>, <b>Redo</b>, and other advanced options for complete customization.

            <br />

            Toast notifications are displayed during Visio file import and export operations to indicate statuses such as <b>started</b>, <b>completed</b>, or <b>failed</b>, using events like <code>diagramImporting</code> and <code>diagramExporting</code>.
          </p>
        </div>
      </div>
    );
  }
}

let isMobile: boolean;
//Adds EventListener based on device's viewport width.
function addEvents(): void {
  isMobile = window.matchMedia('(max-width:550px)').matches;
  if (isMobile) {
    let paletteIcon: HTMLElement = document.getElementById('palette-icon');
    if (paletteIcon) {
      paletteIcon.addEventListener('click', openPalette, false);
    }
  }
}
//Toggles the visibility of the palette space on mobile devices when the palette icon is clicked.
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
    case 'Cut':
      diagramInstance.cut();
      updateToolbarItems(["Paste"], false);
      break;
    case 'Copy':
      diagramInstance.copy();
      updateToolbarItems(["Paste"], false);
      break;
    case 'Paste':
      diagramInstance.paste();
      break;
    case 'Delete':
      diagramInstance.remove();
      break;
    case 'New Diagram':
      diagramInstance.clear();
      historyChange();
      break;
    case 'Export as Visio (.vsdx)':
      diagramInstance.exportToVisio();
      break;
    case 'Import Visio (.vsdx)':
      let vsdxInput: HTMLInputElement = document.getElementById('vsdxInput') as HTMLInputElement;
      if (vsdxInput) {
        vsdxInput.click();
        //When a user chooses a .vsdx file, this function imports it into the diagram
        vsdxInput.addEventListener('change', async (event) => {
          const file = (event.target as any).files?.[0];
          if (!file) return;
          await diagramInstance.importFromVisio(file);
          diagramInstance.width = '100%';
          diagramInstance.height = '700px';
          vsdxInput.value = '';
        });
      }
      break;
  }
  diagramInstance.dataBind();
}

//To handle selection of drawing connectors.
function onConnectorSelect(args: any) {
  diagramInstance.clearSelection();
  diagramInstance.drawingObject = { type: args.item.text } as ConnectorModel;
  diagramInstance.tool = DiagramTools.DrawOnce;
  diagramInstance.dataBind();
}
//To handle selection of drawing shapes.
function onShapesSelect(args: any) {
  diagramInstance.clearSelection();
  diagramInstance.drawingObject = {
    shape: { shape: args.item.text },
    style: { fill: '#357BD2', strokeColor: 'white' }
  } as NodeModel;
  diagramInstance.tool = DiagramTools.DrawOnce;
  diagramInstance.dataBind();
}


// Enable or disable specific toolbar items
function updateToolbarItems(itemIds: string[], disabled: boolean) {
  itemIds.forEach((itemId) => {
    const item = toolbarEditor.items.find((item: ItemModel) => item.id === itemId);
    if (item) {
      item.disabled = disabled;
    }
  });
}

let asyncSettings: any = {
  saveUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Save',
  removeUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Remove'
};

//set up uploaded file
async function onUploadSuccess(args: any): Promise<void> {
  let fileObj: FileInfo = args.file;
  let rawFile: File = fileObj.rawFile as File;
  await diagramInstance.importFromVisio(rawFile);
  diagramInstance.width = '100%';
  diagramInstance.height = '700px';
  uploaderInstance.clearAll();
}


//To enable and disable undo/redo button.
function historyChange() {
  updateToolbarItems(["Undo"], diagramInstance.historyManager.undoStack.length === 0);
  updateToolbarItems(["Redo"], diagramInstance.historyManager.redoStack.length === 0);
}

function diagramImporting(args: IImportingEventArgs) {
  toastInstance.timeOut = 0;
  toastInstance.showCloseButton = false;
  if (args.status === "started") {
    updateToolbarItems(['Export', 'Import'], true); // Disable buttons
    toastInstance.hide();
    toastInstance.timeOut = 1000;
    toastInstance.title = 'Importing Diagram';
    toastInstance.content = 'The Visio diagram is being imported. Please wait...';
    toastInstance.cssClass = 'e-toast-info';
    toastInstance.show();
  }
  else if (args.status === "completed") {
    toastInstance.showCloseButton = true;
    toastInstance.timeOut = 3000;
    toastInstance.title = 'Import Complete';
    toastInstance.content = 'The Visio diagram has been imported successfully.';
    toastInstance.cssClass = 'e-toast-success';
    toastInstance.show();
    updateToolbarItems(['Export', 'Import'], false); // Enable buttons
  }
  else if (args.status === "failed") {
    toastInstance.showCloseButton = true;
    toastInstance.timeOut = 3000;
    toastInstance.title = 'Import Failed';
    toastInstance.content = 'There was an error importing the Visio diagram.';
    toastInstance.cssClass = 'e-toast-danger';
    toastInstance.show();
    updateToolbarItems(['Export', 'Import'], false); // Enable buttons
  }
}

function diagramExporting(args: IImportingEventArgs) {
  toastInstance.timeOut = 0;
  toastInstance.showCloseButton = false;
  if (args.status === "started") {
    updateToolbarItems(['Export', 'Import'], true); // Disable buttons
    toastInstance.hide();
    toastInstance.timeOut = 1000;
    toastInstance.title = 'Exporting Diagram';
    toastInstance.content = 'The diagram is being exported to Visio format. Please wait...';
    toastInstance.cssClass = 'e-toast-info';
    toastInstance.show();
  }
  else if (args.status === "completed") {
    toastInstance.showCloseButton = true;
    toastInstance.timeOut = 3000;
    toastInstance.title = 'Export Complete';
    toastInstance.content = 'The diagram has been exported to Visio format successfully.';
    toastInstance.cssClass = 'e-toast-success';
    toastInstance.show();
    updateToolbarItems(['Export', 'Import'], false); // Enable buttons
  }
  else if (args.status === "failed") {
    toastInstance.showCloseButton = true;
    toastInstance.timeOut = 3000;
    toastInstance.title = 'Export Failed';
    toastInstance.content = 'There was an error exporting the diagram to Visio format.';
    toastInstance.cssClass = 'e-toast-danger';
    toastInstance.show();
    updateToolbarItems(['Export', 'Import'], false); // Enable buttons
  }
}