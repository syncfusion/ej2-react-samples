import * as ReactDOM from "react-dom";
import * as React from "react";
import {
  Node,
  DiagramElement,
  DiagramComponent,
  Diagram,
  NodeModel,
  ConnectorModel,
  HistoryEntry,
  Inject,
  UndoRedo,
  IHistoryChangeArgs,
  SnapConstraints
} from "@syncfusion/ej2-react-diagrams";
import { DataManager } from "@syncfusion/ej2-data";
import { SampleBase } from "../common/sample-base";
import { ButtonComponent, CheckBoxComponent, ChangeArgs } from "@syncfusion/ej2-react-buttons";
import {
  NumericTextBoxComponent,
  ChangeEventArgs
} from "@syncfusion/ej2-react-inputs";
import { ListViewComponent } from "@syncfusion/ej2-react-lists";
let SAMPLE_CSS = `#historyPropertySection .row {
            margin-left: 0px;
            margin-right: 0px;
        }
        #historyControlSection.content-wrapper {
            border: 1px solid #D7D7D7;
        }

        #historyPropertySection .listbox {
            width: 100%;
            height: 50%;
        }

        #historyPropertySection .property-panel-content div:not(.heading) {
         padding: 0px;
        }

        #historyPropertySection .heading {
            color: #807f7f;
            font-size: 15px;
            height: 50px;
            width: 100%;
            border-bottom: 1px solid #d9dedd;
            padding: 10px;
        }`
//Initialize Diagram Nodes
let nodes: NodeModel[] = [
  {
    id: 'node1', offsetX: 400, offsetY: 30, style: { fill: '#FFB2B2', strokeColor: '#FFB2B2' }, width: 70, height: 40,
    shape: { type: 'Flow', shape: 'Terminator' },
    annotations: [{ id: 'label1', content: 'Start' }],
  },
  {
    id: 'node2', offsetX: 400, offsetY: 100, style: { fill: '#DCDCDC', strokeColor: '#DCDCDC' },
    shape: { type: 'Flow', shape: 'Process' }, annotations: [{ id: 'label1', content: 'Design' }],
    ports: [{ id: 'designPort', offset: { x: 0, y: 0.5 } }]
  },
  {
    id: 'node3', offsetX: 400, offsetY: 180, style: { fill: '#DCDCDC', strokeColor: '#DCDCDC' },
    annotations: [{ id: 'label1', content: 'Coding' }],
    shape: { type: 'Flow', shape: 'Process' }, ports: [{ id: 'codingPort', offset: { x: 0, y: 0.5 } }]
  },
  {
    id: 'node4', offsetX: 400, offsetY: 260, style: { fill: '#DCDCDC', strokeColor: '#DCDCDC' },
    annotations: [{ id: 'label1', content: 'Testing' }], shape: { type: 'Flow', shape: 'Process' }
  },
  {
    id: 'node5', offsetX: 400, offsetY: 340, style: { fill: '#A2D8B0', strokeColor: '#A2D8B0' }, width: 80, height: 60,
    annotations: [{ id: 'label1', content: 'Errors?' }], shape: { type: 'Flow', shape: 'Decision' }
  },
  {
    id: 'node6', offsetX: 400, offsetY: 430, style: { fill: '#FFB2B2', strokeColor: '#FFB2B2' }, width: 70, height: 40,
    annotations: [{ id: 'label1', content: 'End' }], shape: { type: 'Flow', shape: 'Terminator' }
  },
  {
    id: 'node7', width: 100, offsetX: 220, offsetY: 180, style: { fill: '#A2D8B0', strokeColor: '#A2D8B0' }, height: 60,
    annotations: [{ id: 'label1', content: 'Design Error?' }], shape: { type: 'Flow', shape: 'Decision' },
    ports: [
      { id: 'porterror', offset: { x: 0.5, y: 0 } },
      { id: 'portcoding', offset: { x: 1, y: 0.5 } },
      { id: 'portdesign', offset: { x: 0.5, y: 1 } }
    ]
  }
];
//Initialize Diagram Connectors
let connectors: ConnectorModel[] = [
  { id: 'connector1', sourceID: 'node1', targetID: 'node2' },
  { id: 'connector2', sourceID: 'node2', targetID: 'node3' },
  { id: 'connector3', sourceID: 'node3', targetID: 'node4' },
  { id: 'connector4', sourceID: 'node4', targetID: 'node5' },
  {
    id: 'connector5', sourceID: 'node5', targetID: 'node6',
    annotations: [{ content: 'No', style: { fill: 'white' } }]
  },
  {
    id: 'connector6', sourceID: 'node5', targetID: 'node7', type: 'Orthogonal',
    segments: [{ type: 'Orthogonal', length: 150, direction: 'Left' }],
    annotations: [{ content: 'Yes', style: { fill: 'white' } }]
  },
  {
    id: 'connector7', sourceID: 'node7', targetID: 'node3', sourcePortID: 'portcoding',
    targetPortID: 'codingPort', type: 'Orthogonal',
    segments: [{ type: 'Orthogonal', length: 10, direction: 'Left' }],
    annotations: [{ content: 'No', style: { fill: 'white' } }]
  },
  {
    id: 'connector8', sourceID: 'node7', targetID: 'node2', sourcePortID: 'porterror',
    targetPortID: 'designPort', type: 'Orthogonal',
    annotations: [{ content: 'Yes', style: { fill: 'white' } }]
  }
];

let diagramInstance: DiagramComponent;
let clearHistory: ButtonComponent;
let startActionInstance: ButtonComponent;
let endGroupAction: ButtonComponent;
let redoListInstance: ListViewComponent;
let undoListInstance: ListViewComponent;
let undoInstance: ButtonComponent;
let redoInstance: ButtonComponent;

export class HistoryManager extends SampleBase<{}, {}> {
  rendereComplete() {
    diagramInstance.fitToPage({ mode: 'Height' });
    document.getElementById("undo").onclick = (args: MouseEvent) => {
      diagramInstance.undo();
    }
    document.getElementById("redo").onclick = (args: MouseEvent) => {
      diagramInstance.redo();
    }
    document.getElementById("StackLimit").onclick = (args: MouseEvent) => {
      diagramInstance.setStackLimit((args as any).value);
    }
    document.getElementById("startGroupAction").onclick = (args: MouseEvent) => {
      startAction();
    }
    document.getElementById("clearHistory").onclick = (args: MouseEvent) => {
      diagramInstance.clearHistory();
      getValue();
    }
  }
  render() {
    return (
      <div className="control-pane1">
        <div className="col-lg-8 control-section">
          <div id="historyControlSection" className="content-wrapper" style={{ width: "100%" }}>
            <style>{SAMPLE_CSS}</style>
            <DiagramComponent
              id="diagram"
              ref={diagram => (diagramInstance = diagram)}
              width={"100%"}
              height={"600px"}
              snapSettings={{ constraints: SnapConstraints.None }}
              nodes={nodes}
              connectors={connectors}
              getConnectorDefaults={getConnectorDefaults}
              historyChange={(arg: IHistoryChangeArgs) => {
                getValue();
              }
              }
              getNodeDefaults={(obj: NodeModel) => {
                obj.annotations[0].style.color = '#717171';
                return obj;
              }}
            >
              <Inject services={[UndoRedo]} />
            </DiagramComponent>
          </div>
        </div>
        <div id="historyPropertySection" className="col-lg-4 property-section" style={{ paddingRight: "0px" }}>
          <div className="property-panel-header">
            History manager settings
    </div>
          <div className="row property-panel-content" id="appearance">
            <div className="row property-panel-content">
              <div className="row" >
                <div className="listbox" style={{ height: "100%", border: "1px solid #e0e0e0" }}>
                  <div className="heading" style={{ height: "40px" }}>
                    <span>
                      Undo Stack
                        </span>
                    <div style={{ float: "right", marginTop: "-5px" }}>
                      <ButtonComponent id="undo" style={{ width: "100%" }} disabled={true} ref={undoList => (undoInstance = undoList)}>
                        Undo
                     </ButtonComponent >
                    </div>
                  </div>
                  <div id='undoList'></div>
                  <ListViewComponent
                    id='undoList'
                    height={'180px'}
                    ref={undoList => (undoListInstance = undoList)}
                  >
                  </ListViewComponent>
                </div>
              </div>
              <div className="row" style={{ paddingTop: "8px" }}>
                <div className="listbox" style={{ height: "100%", border: "1px solid #e0e0e0" }}>
                  <div className="heading" style={{ height: "40px" }}>
                    <span>
                      Redo Stack
                        </span>
                    <div style={{ float: "right", marginTop: "-5px" }}>
                      <ButtonComponent id="redo" style={{ width: "100%" }} disabled={true} ref={redoList => (redoInstance = redoList)}>
                        Redo
                            </ButtonComponent >
                    </div>
                  </div>
                  <ListViewComponent
                    id='redoList'
                    height={'180px'}
                    ref={redoList => (redoListInstance = redoList)}

                  >
                  </ListViewComponent>
                </div>
              </div>
              <div className="row" style={{ paddingTop: "10px" }}>
                <div style={{ display: "table", height: "35px", paddingLeft: "0px" }} className="col-xs-6">
                  <div style={{ display: "table-cell", verticalAlign: "middle" }}>Stack Limit</div>
                </div>
                <div className="col-xs-6" style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                  <NumericTextBoxComponent id="StackLimit" value={0} min={0} max={50} width='100%' format='##.##' step={1}
                  ></NumericTextBoxComponent >
                </div>
              </div>
              <div className="row" style={{ paddingTop: "10px" }}>
                <div className="col-xs-6" style={{ paddingLeft: "0px" }}>
                  <ButtonComponent  ref={startGroupAction => (startActionInstance = startGroupAction)} id="startGroupAction" title='startGroupAction' style={{ width: "100%", overflow: "hidden", textOverflow: "ellipsis" }} isToggle={true} >
                    Start Group Action
                    </ButtonComponent ></div>
                <div className="col-xs-6" title='clearHistory' style={{ paddingLeft: "0px", paddingRight: "0px" }}   >
                  <ButtonComponent id="clearHistory" style={{ width: "100%" }}>
                    Clear History
                    </ButtonComponent >
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="action-description">
          <p>
          This sample demonstrates viewing, deleting, limiting diagram history and groups diagram actions and stores it as
        a single entry in the history manager.
    </p>
        </div>
        <div id="description">
          <p>
            Diagram history are being handle all the diagram history. Using <code>stackLimit</code> property of the history manager
        we limit the no. of entries can be stored on the diagram history. Also, we can get the list of entries in the undo
        list and redo list using <code>undoStack</code> and <code>redoStack</code>. Also diagram history manager have the
        option to group the action as the single entry by the help of the <code>startGroupAction</code> and <code>endGroupAction</code>        public
        Api. Also, we can add the custom entries to the diagram history. method can be used to print the diagrams.
          </p>

        </div>
      </div >
    );
  }
}
function getConnectorDefaults(connector: ConnectorModel): ConnectorModel {
  connector.type = 'Orthogonal';
  connector.style.strokeColor = "#717171";
  connector.sourceDecorator.style.strokeColor = "#717171";
  connector.targetDecorator.style.strokeColor = "#717171";
  connector.sourceDecorator.style.fill = "#717171";
  connector.targetDecorator.style.fill = "#717171";
  return connector;
}
function getValue(): void {
  let undoStack: HistoryEntry[] = diagramInstance.historyManager.undoStack;
  let redoStack: HistoryEntry[] = diagramInstance.historyManager.redoStack;
  let undo: {}[] = [];
  for (let i: number = 0; i < undoStack.length; i++) {
    undo.push({ 'text': undoStack[i].type, 'value': undoStack[i].type });
  }

  let redo: {}[] = [];
  for (let i: number = 0; i < redoStack.length; i++) {
    redo.push({ 'text': redoStack[i].type, 'value': redoStack[i].type });
  }

  let itemsCount: number = diagramInstance.historyManager.stackLimit ? diagramInstance.historyManager.stackLimit : 0;
  undoListInstance.dataSource = undo;
  (undoListInstance.fields as any) = { text: 'text', value: 'text' };
  (undoListInstance as any).index = 0;
  undoListInstance.dataBind();
  undoInstance.disabled = undo.length ? false : true;
  redoInstance.disabled = redo.length ? false : true;
  redoListInstance.dataSource = redo;
  (redoListInstance.fields as any) = { text: 'text', value: 'text' };
  (redoListInstance as any).index = 0;
  redoListInstance.dataBind();
}
function startAction(): void {
  if (startActionInstance.element.classList.contains('e-active')) {
    startActionInstance.content = 'End Group Action';
    diagramInstance.startGroupAction();
  } else {
    diagramInstance.endGroupAction();
    startActionInstance.content = 'Start Group Action';
  }
};
