import * as ReactDOM from "react-dom";
import * as React from "react";
import {

  SymbolPaletteComponent,
  SymbolInfo,
  Diagram,
  NodeModel,
  Connector,
  ConnectorModel,
  NodeConstraints,
  BpmnShapeModel,
  BpmnGatewayModel,
  ContextMenuSettingsModel,
  DiagramComponent,
  BpmnShape,
  BpmnLoops,
  BpmnTriggers,
  DiagramBeforeMenuOpenEventArgs,
  BpmnBoundary,
  BpmnDataObjects,
  BpmnTasks,
  BpmnGateways,
  IDragEnterEventArgs,
  Inject,
  BpmnDiagrams,
  UndoRedo,
  DiagramContextMenu,
  DataBinding,
} from "@syncfusion/ej2-react-diagrams";
import { SampleBase } from "../common/sample-base";
import { Point } from "@syncfusion/ej2-diagrams/src/diagram/primitives/point";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { ExpandMode } from "@syncfusion/ej2-react-navigations";
import {
  CheckBoxComponent,
  ChangeEventArgs
} from "@syncfusion/ej2-react-buttons";
import { MenuEventArgs } from "@syncfusion/ej2-navigations";
import "./bpmnIcons.css";
let diagram: Diagram;
let nodes: NodeModel[] = [
  {
    id: 'start', width: 40, height: 40, offsetX: 35, offsetY: 230, shape: {
      type: 'Bpmn', shape: 'Event',
      event: { event: 'Start' }
    }
  },
  {
    id: 'subProcess', width: 520, height: 250, offsetX: 355, offsetY: 230,
    constraints: NodeConstraints.Default | NodeConstraints.AllowDrop,
    shape: {
      shape: 'Activity', type: 'Bpmn',
      activity: {
        activity: 'SubProcess', subProcess: {
          type: 'Transaction', collapsed: false,
          processes: ['processesStart', 'service', 'compensation', 'processesTask',
            'error', 'processesEnd', 'user', 'subProcessesEnd']
        }
      }
    }
  },
  {
    id: 'hazardEnd', width: 40, height: 40, offsetX: 305, offsetY: 420, shape: {
      type: 'Bpmn', shape: 'Event',
      event: { event: 'End' },
    }, annotations: [{
      id: 'label2', content: 'Hazard',
      style: { fill: 'white', color: 'black' }, verticalAlignment: 'Top', margin: { top: 20 }
    }]
  },
  {
    id: 'cancelledEnd', width: 40, height: 40, offsetX: 545, offsetY: 420, shape: {
      type: 'Bpmn', shape: 'Event',
      event: { event: 'End' },
    }, annotations: [{
      id: 'cancelledEndLabel2', content: 'Cancelled',
      style: { fill: 'white', color: 'black' }, verticalAlignment: 'Top', margin: { top: 20 }
    }]
  },
  {
    id: 'end', width: 40, height: 40, offsetX: 665, offsetY: 230, shape: {
      type: 'Bpmn', shape: 'Event',
      event: { event: 'End' }
    },
  },
  {
    id: 'processesStart', width: 30, height: 30, shape: {
      type: 'Bpmn', shape: 'Event',
      event: { event: 'Start' }
    }, margin: { left: 40, top: 80 }
  },
  {
    id: 'service', style: { fill: '#6FAAB0' }, width: 95, height: 70,
    shape: {
      type: 'Bpmn', shape: 'Activity', activity: {
        activity: 'Task', task: {
          type: 'Service',
          loop: 'parallelmultiinstance',
        },
      },
    }, annotations: [{
      id: 'serviceLabel2', content: 'Book hotel', offset: { x: 0.50, y: 0.50 },
      style: { color: 'white', }
    }], margin: { left: 110, top: 20 },
  },
  {
    id: 'compensation', width: 30, height: 30,
    shape: {
      type: 'Bpmn', shape: 'Event',
      event: { event: 'Intermediate', trigger: 'Compensation' }
    }, margin: { left: 170, top: 100 }
  },
  {
    id: 'processesTask', style: { fill: '#F6B53F' }, width: 95, height: 70,
    shape: {
      type: 'Bpmn', shape: 'Activity', activity: {
        activity: 'Task', task: {
          type: 'Service',
        },
      },
    }, annotations: [{
      id: 'serviceLabel2', content: 'Charge credit card', offset: { x: 0.50, y: 0.60 },
      style: { color: 'white' }
    }], margin: { left: 290, top: 20 },
  },
  {
    id: 'error', width: 30, height: 30,
    shape: {
      type: 'Bpmn', shape: 'Event',
      event: {
        event: 'Intermediate', trigger: 'Error'
      }
    }, margin: { left: 350, top: 100 }
  },
  {
    id: 'processesEnd', width: 30, height: 30, shape: {
      type: 'Bpmn', shape: 'Event',
      event: { event: 'End' }
    }, margin: { left: 440, top: 80 }
  },
  {
    id: 'user', style: { fill: '#E94649' }, width: 90, height: 80,
    shape: {
      type: 'Bpmn', shape: 'Activity', activity: {
        activity: 'Task', task: {
          type: 'User', Compensation: true, offset: { x: 0.50, y: 1 }
        },
      },
    }, annotations: [{
      id: 'serviceLabel2', content: 'Cancel hotel reservation', offset: { x: 0.50, y: 0.60 },
      style: { color: 'white' }
    }], margin: { left: 240, top: 160 },
  },
  {
    id: 'subProcessesEnd', width: 30, height: 30, shape: {
      type: 'Bpmn', shape: 'Event',
      event: { event: 'End' }
    }, margin: { left: 440, top: 210 }
  },
];
let connectors: ConnectorModel[] = [
  { id: 'connector1', sourceID: 'start', targetID: 'subProcess' },
  { id: 'connector2', sourceID: 'subProcess', sourcePortID: 'success', targetID: 'end' },
  {
    id: 'connector3', sourceID: 'subProcess', sourcePortID: 'failure', targetID: 'hazardEnd', type: 'Orthogonal',
    segments: [{ type: 'Orthogonal', length: 50, direction: 'Bottom' }],
    annotations: [{
      id: 'connector3Label2', content: 'Booking system failure', offset: 0.50,
      style: { fill: 'white' }
    }]
  },
  {
    id: 'connector4', sourceID: 'subProcess', sourcePortID: 'cancel', targetID: 'cancelledEnd', type: 'Orthogonal',
    segments: [{ type: 'Orthogonal', length: 50, direction: 'Bottom' }],
  },
  { id: 'connector5', sourceID: 'processesStart', targetID: 'service', type: 'Orthogonal', },
  { id: 'connector6', sourceID: 'service', targetID: 'processesTask' },
  { id: 'connector7', sourceID: 'processesTask', targetID: 'processesEnd', type: 'Orthogonal', },
  {
    id: 'connector8', sourceID: 'compensation', targetID: 'user', type: 'Orthogonal',
    shape: {
      type: 'Bpmn',
      flow: 'association',
      association: 'Directional'
    }, style: {
      strokeDashArray: '2,2'
    },
    segments: [{ type: 'Orthogonal', length: 30, direction: 'Bottom' },
    { type: 'Orthogonal', length: 80, direction: 'Right' }]
  },
  {
    id: 'connector9', sourceID: 'error', targetID: 'subProcessesEnd', type: 'Orthogonal',
    annotations: [{
      id: 'connector9Label2', content: 'Cannot charge card', offset: 0.50,
      style: { fill: 'white', color: 'black' }
    }],
    segments: [{ type: 'Orthogonal', length: 50, direction: 'Bottom' }]
  }
];
let bpmnShapes: NodeModel[] = [
  {
    id: 'Start', width: 35, height: 35, shape: {
      type: 'Bpmn', shape: 'Event',
      event: { event: 'Start' }
    }
  },
  {
    id: 'NonInterruptingIntermediate', width: 35, height: 35, shape: {
      type: 'Bpmn', shape: 'Event',
      event: { event: 'NonInterruptingIntermediate' }
    },
  },
  {
    id: 'End', width: 35, height: 35, offsetX: 665, offsetY: 230, shape: {
      type: 'Bpmn', shape: 'Event',
      event: { event: 'End' }
    },
  },
  {
    id: 'Task', width: 35, height: 35, offsetX: 700, offsetY: 700,
    shape: {
      type: 'Bpmn', shape: 'Activity', activity: {
        activity: 'Task',
      },
    }
  },
  {
    id: 'Transaction', width: 35, height: 35, offsetX: 300, offsetY: 100,
    constraints: NodeConstraints.Default | NodeConstraints.AllowDrop,
    shape: {
      type: 'Bpmn', shape: 'Activity',
      activity: {
        activity: 'SubProcess', subProcess: {
          type: 'Transaction', transaction: {
            cancel: { visible: false }, failure: { visible: false }, success: { visible: false }
          }
        }
      }
    }
  }, {
    id: 'Task_Service', width: 35, height: 35, offsetX: 700, offsetY: 700,
    shape: {
      type: 'Bpmn', shape: 'Activity', activity: {
        activity: 'Task', task: { type: 'Service' }
      },
    }
  },
  {
    id: 'Gateway', width: 35, height: 35, offsetX: 100, offsetY: 100,
    shape: { type: 'Bpmn', shape: 'Gateway', gateway: { type: 'Exclusive' } },
  },
  {
    id: 'DataObject', width: 35, height: 35, offsetX: 500, offsetY: 100,
    shape: { type: 'Bpmn', shape: 'DataObject', dataObject: { collection: false, type: 'None' } }
  }, {
    id: 'subProcess', width: 520, height: 250, offsetX: 355, offsetY: 230,
    constraints: NodeConstraints.Default | NodeConstraints.AllowDrop,
    shape: {
      shape: 'Activity', type: 'Bpmn',
      activity: {
        activity: 'SubProcess', subProcess: {
          type: 'Transaction', collapsed: false,
          processes: [], transaction: {
            cancel: { visible: false }, failure: { visible: false }, success: { visible: false }
          }
        }
      }
    }
  },
];
let contextMenu: ContextMenuSettingsModel = {
  show: true, items: [
    {
      text: 'Ad-Hoc', id: 'Adhoc',
      items: [{ text: 'None', iconCss: 'e-bpmn-icons e-None', id: 'AdhocNone' },
      { iconCss: 'e-bpmn-icons e-adhoc', text: 'Ad-Hoc', id: 'AdhocAdhoc' }]
    }, {
      text: 'Loop', id: 'Loop',
      items: [{ text: 'None', iconCss: 'e-bpmn-icons e-None', id: 'LoopNone' },
      { text: 'Standard', iconCss: 'e-bpmn-icons e-Loop', id: 'Standard' },
      { text: 'Parallel Multi-Instance', iconCss: 'e-bpmn-icons e-ParallelMI', id: 'ParallelMultiInstance' },
      { text: 'Sequence Multi-Instance', iconCss: 'e-bpmn-icons e-SequentialMI', id: 'SequenceMultiInstance' }]
    }, {
      text: 'Compensation', id: 'taskCompensation',
      items: [{ text: 'None', iconCss: 'e-bpmn-icons e-None', id: 'CompensationNone' },
      { iconCss: 'e-bpmn-icons e-Compensation', text: 'Compensation', id: 'CompensationCompensation' }]
    }, {
      text: 'Activity-Type', id: 'Activity-Type',
      items: [{ text: 'Collapsed sub-process', iconCss: 'e-bpmn-icons e-SubProcess', id: 'CollapsedSubProcess' },
      { iconCss: 'e-bpmn-icons e-Task', text: 'Expanded sub-process', id: 'ExpandedSubProcess' }]
    }, {
      text: 'Boundry', id: 'Boundry',
      items: [{ text: 'Default', iconCss: 'e-bpmn-icons e-Default', id: 'Default' },
      { text: 'Call', iconCss: 'e-bpmn-icons e-Call', id: 'BoundryCall' },
      { text: 'Event', iconCss: 'e-bpmn-icons e-Event', id: 'BoundryEvent' }]
    }, {
      text: 'Data Object', id: 'DataObject',
      items: [{ text: 'None', iconCss: 'e-bpmn-icons e-None', id: 'DataObjectNone' },
      { text: 'Input', iconCss: 'e-bpmn-icons e-DataInput', id: 'Input' },
      { text: 'Output', iconCss: 'e-bpmn-icons e-DataOutput', id: 'Output' }]
    }, {
      text: 'Collection', id: 'collection',
      items: [{ text: 'None', iconCss: 'e-bpmn-icons e-None', id: 'collectionNone' },
      { text: 'Collection', iconCss: 'e-bpmn-icons e-ParallelMI', id: 'Collectioncollection' }]
    }, {
      text: 'Call', id: 'DeftCall',
      items: [{ text: 'None', iconCss: 'e-bpmn-icons e-None', id: 'CallNone' },
      { text: 'Call', iconCss: 'e-bpmn-icons e-CallActivity', id: 'CallCall' }]
    }, {
      text: 'Trigger Result', id: 'TriggerResult',
      items: [{ text: 'None', id: 'TriggerNone', iconCss: 'e-bpmn-icons e-None' },
      { text: 'Message', id: 'Message', iconCss: 'e-bpmn-icons e-InMessage' },
      { text: 'Multiple', id: 'Multiple', iconCss: 'e-bpmn-icons e-InMultiple' },
      { text: 'Parallel', id: 'Parallel', iconCss: 'e-bpmn-icons e-InParallelMultiple' },
      { text: 'Signal', id: 'Signal', iconCss: 'e-bpmn-icons e-InSignal' },
      { text: 'Timer', id: 'Timer', iconCss: 'e-bpmn-icons e-InTimer' },
      { text: 'Cancel', id: 'Cancel', iconCss: 'e-bpmn-icons e-CancelEnd' },
      { text: 'Escalation', id: 'Escalation', iconCss: 'e-bpmn-icons e-InEscalation' },
      { text: 'Error', id: 'Error', iconCss: 'e-bpmn-icons e-InError' },
      { text: 'Compensation', id: 'triggerCompensation', iconCss: 'e-bpmn-icons e-InCompensation' },
      { text: 'Terminate', id: 'Terminate', iconCss: 'e-bpmn-icons e-TerminateEnd' },
      { text: 'Conditional', id: 'Conditional', iconCss: 'e-bpmn-icons e-InConditional' },
      { text: 'Link', id: 'Link', iconCss: 'e-bpmn-icons e-ThrowLinkin' }
      ]
    },
    {
      text: 'Event Type', id: 'EventType',
      items: [{ text: 'Start', id: 'Start', iconCss: 'e-bpmn-icons e-NoneStart', },
      { text: 'NonInterruptingStart', id: 'NonInterruptingStart', iconCss: 'e-bpmn-icons e-' },
      { text: 'Intermediate', id: 'Intermediate', iconCss: 'e-bpmn-icons e-InterruptingNone' },
      { text: 'ThrowingIntermediate', id: 'ThrowingIntermediate', iconCss: 'e-bpmn-icons e-' },
      { text: 'NonInterruptingIntermediate', id: 'NonInterruptingIntermediate', iconCss: 'e-bpmn-icons e-' },
      { text: 'End', id: 'End', iconCss: 'e-bpmn-icons e-NoneEnd' }]
    }, {
      text: 'Task Type', id: 'TaskType',
      items: [
        { text: 'None', id: 'TaskNone', iconCss: 'e-bpmn-icons e-None' },
        { text: 'Service', id: 'Service', iconCss: 'e-bpmn-icons e-ServiceTask' },
        { text: 'BusinessRule', id: 'BusinessRule', iconCss: 'e-bpmn-icons e-BusinessRule' },
        { text: 'InstantiatingReceive', id: 'InstantiatingReceive', iconCss: 'e-bpmn-icons e-InMessage' },
        { text: 'Manual', id: 'Manual', iconCss: 'e-bpmn-icons e-ManualCall' },
        { text: 'Receive', id: 'Receive', iconCss: 'e-bpmn-icons e-InMessage' },
        { text: 'Script', id: 'Script', iconCss: 'e-bpmn-icons e-ScriptCall' },
        { text: 'Send', id: 'Send', iconCss: 'e-bpmn-icons e-InMessage' },
        { text: 'User', id: 'User', iconCss: 'e-bpmn-icons e-UserCall' },
      ]
    }, {
      text: 'GateWay', id: 'GateWay',
      iconCss: 'e-bpmn-icons e-Gateway', items: [
        { text: 'None', id: 'GatewayNone', iconCss: 'e-bpmn-icons e-None' },
        { text: 'Exclusive', iconCss: 'e-bpmn-icons e-ExclusiveGatewayWithMarker', id: 'Exclusive' },
        { text: 'Inclusive', iconCss: 'e-bpmn-icons e-InclusiveGateway', id: 'Inclusive' },
        { text: 'Parallel', iconCss: 'e-bpmn-icons e-ParallelGateway', id: 'GatewayParallel' },
        { text: 'Complex', iconCss: 'e-bpmn-icons e-ComplexGateway', id: 'Complex' },
        { text: 'EventBased', iconCss: 'e-bpmn-icons e-EventBasedGateway', id: 'EventBased' },
        { text: 'ExclusiveEventBased', iconCss: 'e-bpmn-icons e-ExclusiveEventBased', id: 'ExclusiveEventBased' },
        { text: 'ParallelEventBased', iconCss: 'e-bpmn-icons e-ParallelEventBasedGatewaytostart', id: 'ParallelEventBased' }
      ]
    },
  ],
  showCustomMenuOnly: true,
};
const sample_style = ` .property-panel-table div {
    padding-left: 0px;
}`;
let diagramInstance: DiagramComponent;

export class BpmnEditor extends SampleBase<{}, {}> {
  rendereComplete() {
    diagramInstance.fitToPage({ mode: 'Width' });
    addEvents();
  }
  render() {
    return (
      <div className="control-panel">
        <div className="control-section">
          <div style={{ width: "100%", height: "100%" }}>
            <div className="sb-mobile-palette-bar">
              <div id="palette-icon" style= {{float: "right" ,role: "button"}} className="e-ddb-icons1 e-toggle-palette"></div>
            </div>
            <div
              id="palette-space"
              className="sb-mobile-palette"
            >
              <SymbolPaletteComponent
                id="symbolpalette"
                expandMode="Multiple"
                palettes={[
                  {
                    id: "Bpmn",
                    expanded: true,
                    symbols: bpmnShapes,
                    iconCss: "e-diagram-icons1 e-diagram-Bpmn",
                    title: "Bpmn Shapes"
                  },
                  {
                    id: "connectors",
                    expanded: true,
                    symbols: getConnectors(),
                    iconCss: "e-diagram-icons1 e-diagram-connector",
                    title: "Connectors"
                  }
                ]}
                width={"400"}
                height={"550px"}
                symbolHeight={60}
                symbolWidth={60}
                getNodeDefaults={(symbol: NodeModel): void => {
                  {/* if (
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
                  } */}
                }}
                symbolMargin={{ left: 15, right: 15, top: 15, bottom: 15 }}
                getSymbolInfo={(symbol: NodeModel): SymbolInfo => {
                  return { fit: true };
                }}
              ><Inject services={[BpmnDiagrams, UndoRedo, DiagramContextMenu, DataBinding]} />
              </SymbolPaletteComponent>
            </div>

            <div
              id="diagram-space"
              className="sb-mobile-diagram sb-bpmn-editor"
            >
              <DiagramComponent
                id="diagram"
                ref={diagram => (diagramInstance = diagram)}
                width={"100%"}
                height={"100%"}
                snapSettings={{ constraints: 0 }}
                nodes={nodes}
                connectors={connectors} //Sets the default values of a node
                contextMenuSettings={contextMenu}
                // tslint:disable-next-line:max-func-body-length
                contextMenuOpen={function (args: DiagramBeforeMenuOpenEventArgs) {
                  let hiddenId: string[] = [];
                  if (args.element.className !== "e-menu-parent e-ul ") {
                    hiddenId = ['Adhoc', 'Loop', 'taskCompensation', 'Activity-Type', 'Boundry', 'DataObject', 'collection', 'DeftCall', 'TriggerResult', 'EventType', 'TaskType',
                      'GateWay'];
                  }
                  for (let item of args.items) {
                    diagram = diagramInstance;
                    if (diagram.selectedItems.nodes.length) {
                      if ((diagram.selectedItems.nodes[0].shape as BpmnShape).shape !== 'DataObject'
                        && (diagram.selectedItems.nodes[0].shape as BpmnShape).shape !== 'Gateway') {
                        if (item.text === 'Ad-Hoc') {
                          if (((diagram.selectedItems.nodes[0].shape as BpmnShape).activity.activity === 'SubProcess')) {
                            hiddenId.splice(hiddenId.indexOf(item.id), 1);
                          }
                        }
                        if (item.text === 'Loop' || item.text === 'Compensation' || item.text === 'Activity-Type') {
                          if (((diagram.selectedItems.nodes[0].shape as BpmnShape).shape === 'DataObject') ||
                            ((diagram.selectedItems.nodes[0].shape as BpmnShape).shape === 'Activity') ||
                            (diagram.selectedItems.nodes[0].shape as BpmnShape).shape === 'Gateway') {
                            hiddenId.splice(hiddenId.indexOf(item.id), 1);
                          }
                        }
                        if (item.text === 'Boundry') {
                          if (((diagram.selectedItems.nodes[0].shape as BpmnShape).activity.activity === 'SubProcess')) {
                            hiddenId.splice(hiddenId.indexOf(item.id), 1);
                          }
                        }
                      }
                      if (item.text === 'Data Object') {
                        if (((diagram.selectedItems.nodes[0].shape as BpmnShape).shape === 'DataObject')) {
                          hiddenId.splice(hiddenId.indexOf(item.id), 1);
                        }
                      }
                      if (item.text === 'Collection') {
                        if (((diagram.selectedItems.nodes[0].shape as BpmnShape).shape === 'DataObject')) {
                          hiddenId.splice(hiddenId.indexOf(item.id), 1);
                        }
                      }
                      if (item.text === 'Call') {
                        if (((diagram.selectedItems.nodes[0].shape as BpmnShape).shape === 'Activity')
                          && ((diagram.selectedItems.nodes[0].shape as BpmnShape).activity.activity === 'Task')) {
                          hiddenId.splice(hiddenId.indexOf(item.id), 1);
                        }
                      }
                      if (item.text === 'Trigger Result') {
                        if (((diagram.selectedItems.nodes[0].shape as BpmnShape).shape === 'Event')) {
                          hiddenId.splice(hiddenId.indexOf(item.id), 1);
                        }
                      }
                      if (item.text === 'Event Type') {
                        if (((diagram.selectedItems.nodes[0].shape as BpmnShape).shape === 'Event')) {
                          hiddenId.splice(hiddenId.indexOf(item.id), 1);
                        }
                      }
                      if (item.text === 'Task Type') {
                        if (((diagram.selectedItems.nodes[0].shape as BpmnShape).shape === 'Activity')
                          && ((diagram.selectedItems.nodes[0].shape as BpmnShape).activity.activity === 'Task')) {
                          hiddenId.splice(hiddenId.indexOf(item.id), 1);
                        }
                      }
                      if (item.text === 'GateWay') {
                        if (((diagram.selectedItems.nodes[0].shape as BpmnShape).shape === 'Gateway')) {
                          hiddenId.splice(hiddenId.indexOf(item.id), 1);
                        }
                      }
                      if (diagram.selectedItems.nodes.length > 0 && args.parentItem && args.parentItem.id === "TriggerResult" &&
                        (diagram.selectedItems.nodes[0].shape as BpmnShape).shape === 'Event') {
                        let shape: BpmnShape = (diagram.selectedItems.nodes[0].shape as BpmnShape)

                        if (item.text !== 'None' && (item.text === shape.event.event ||
                          item.text === shape.event.trigger)) {
                          hiddenId.push(item.id);
                        }
                        if (shape.event.event === 'Start') {
                          if (item.text === 'Cancel' || item.text === 'Terminate' || item.text === 'Link') {
                            hiddenId.push(item.id);
                          }
                        }
                        if (shape.event.event === 'NonInterruptingStart' || item.text === 'Link') {
                          if (item.text === 'Cancel' || item.text === 'Terminate' || item.text === 'Compensation' || item.text === 'Error' ||
                            item.text === 'None') {
                            hiddenId.push(item.id);
                          }
                        }
                        if (shape.event.event === 'Intermediate') {
                          if (item.text === 'Terminate') {
                            hiddenId.push(item.id);
                          }
                        }
                        if (shape.event.event === 'NonInterruptingIntermediate') {
                          if (item.text === 'Cancel' || item.text === 'Terminate' || item.text === 'Compensation' || item.text === 'Error' ||
                            item.text === 'None' || item.text === 'Link') {
                            hiddenId.push(item.id);
                          }
                        }
                        if (shape.event.event === 'ThrowingIntermediate') {
                          if (item.text === 'Cancel' || item.text === 'Terminate' || item.text === 'Timer' || item.text === 'Error' ||
                            item.text === 'None' || item.text === 'Pareller' || item.text === 'Conditional') {
                            hiddenId.push(item.id);
                          }
                        }
                        if (shape.event.event === 'End') {
                          if (item.text === 'Parallel' || item.text === 'Timer' || item.text === 'Conditional' || item.text === 'Link') {
                            hiddenId.push(item.id);
                          }
                        }
                      }
                      if (diagram.selectedItems.nodes.length > 0 && args.parentItem && args.parentItem.id === "EventType" &&
                        (diagram.selectedItems.nodes[0].shape as BpmnShape).shape === 'Event') {
                        if ((item.text === (diagram.selectedItems.nodes[0].shape as BpmnShape).event.event)) {
                          hiddenId.push(item.id);
                        }
                      }


                    }
                  }
                  args.hiddenItems = hiddenId;
                }
                }
                // tslint:disable-next-line:max-func-body-length
                contextMenuClick={function (args: MenuEventArgs) {
                  if (args.item.id === 'AdhocNone' || args.item.id === 'AdhocAdhoc') {
                    if ((diagram.selectedItems.nodes.length + diagram.selectedItems.connectors.length) > 0) {
                      (diagram.selectedItems.nodes[0].shape as BpmnShape).activity.subProcess.adhoc = args.item.id === 'AdhocNone' ? false : true;
                    }
                    if (args.item.id === 'AdhocNone' || args.item.id === 'AdhocAdhoc') {

                      if ((diagram.selectedItems.nodes[0].shape as BpmnShape).activity.activity === 'Task') {
                        (diagram.selectedItems.nodes[0].shape as BpmnShape).activity.task.loop =
                          ((document.getElementById('loop') as HTMLSelectElement).value as BpmnLoops);
                      }
                      if ((diagram.selectedItems.nodes[0].shape as BpmnShape).activity.activity === 'SubProcess') {
                        (diagram.selectedItems.nodes[0].shape as BpmnShape).activity.subProcess.loop =
                          ((document.getElementById('loop') as HTMLSelectElement).value as BpmnLoops);
                      }
                    }
                  }
                  if (args.item.id === 'Start' || args.item.id === 'NonInterruptingStart' || args.item.id === 'Intermediate'
                    || args.item.id === 'ThrowingIntermediate' || args.item.id === 'NonInterruptingIntermediate' || args.item.id === 'End') {
                    if ((diagram.selectedItems.nodes.length + diagram.selectedItems.connectors.length) > 0) {
                      (diagram.selectedItems.nodes[0].shape as BpmnShape).event.event = args.item.id;
                    }
                  }

                  if (args.item.id === 'TriggerNone' || args.item.id === 'Message' || args.item.id === 'Multiple'
                    || args.item.id === 'Parallel' || args.item.id === 'Signal' || args.item.id === 'Timer' || args.item.id === 'Cancel' ||
                    args.item.id === 'Escalation' || args.item.id === 'Link' || args.item.id === 'Error' || args.item.id === 'triggerCompensation'
                    || args.item.id === 'Conditional' || args.item.id === 'Terminate') {
                    if ((diagram.selectedItems.nodes.length + diagram.selectedItems.connectors.length) > 0) {
                      let trigger = args.item.id;
                      trigger = (args.item.id === 'TriggerNone') ? 'None' : (args.item.id === 'triggerCompensation') ? 'Compensation' : args.item.id;
                      (diagram.selectedItems.nodes[0].shape as BpmnShape).event.trigger = (args.item.text as BpmnTriggers);
                    }
                  }
                  if (args.item.id === 'LoopNone' || args.item.id === 'Standard' || args.item.id === 'ParallelMultiInstance'
                    || args.item.id === 'SequenceMultiInstance') {
                    let loop: string = (args.item.id === 'LoopNone' as BpmnLoops) ? 'None' : args.item.id
                    if ((diagram.selectedItems.nodes.length + diagram.selectedItems.connectors.length) > 0) {
                      if ((diagram.selectedItems.nodes[0].shape as BpmnShape).activity.activity === 'Task') {
                        (diagram.selectedItems.nodes[0].shape as BpmnShape).activity.task.loop = loop as BpmnLoops;
                      }
                      if ((diagram.selectedItems.nodes[0].shape as BpmnShape).activity.activity === 'SubProcess') {
                        (diagram.selectedItems.nodes[0].shape as BpmnShape).activity.subProcess.loop = loop as BpmnLoops;
                      }
                    }
                  }
                  if (args.item.id === 'CompensationCompensation' || args.item.id === 'CompensationNone') {
                    let Compensation: boolean = (args.item.id === 'CompensationNone') ? false : true;
                    if ((diagram.selectedItems.nodes.length + diagram.selectedItems.connectors.length) > 0) {
                      if ((diagram.selectedItems.nodes[0].shape as BpmnShape).activity.activity === 'Task') {
                        (diagram.selectedItems.nodes[0].shape as BpmnShape).activity.task.compensation = Compensation
                      }
                      if ((diagram.selectedItems.nodes[0].shape as BpmnShape).activity.activity === 'SubProcess') {
                        (diagram.selectedItems.nodes[0].shape as BpmnShape).activity.subProcess.compensation = Compensation;

                      }
                    }
                  }
                  if (args.item.id === 'CallNone' || args.item.id === 'CallCall') {
                    let Compensation: boolean = (args.item.id === 'CallNone') ? false : true;
                    if ((diagram.selectedItems.nodes.length + diagram.selectedItems.connectors.length) > 0) {
                      if ((diagram.selectedItems.nodes[0].shape as BpmnShape).activity.activity === 'Task') {
                        (diagram.selectedItems.nodes[0].shape as BpmnShape).activity.task.call = Compensation
                      }

                    }
                  }
                  if (args.item.id === 'CollapsedSubProcess' || args.item.id === 'Task' || args.item.id === 'ExpandedSubProcess') {
                    if (args.item.id === 'ExpandedSubProcess') {
                      (diagram.selectedItems.nodes[0].shape as BpmnShape).activity.activity = 'SubProcess';
                      (diagram.selectedItems.nodes[0].shape as BpmnShape).activity.subProcess.collapsed = false;
                    } else if (args.item.id === 'Task') {
                      (diagram.selectedItems.nodes[0].shape as BpmnShape).activity.activity = 'Task';
                      (diagram.selectedItems.nodes[0].shape as BpmnShape).activity.task.type = 'None';
                    } else {
                      (diagram.selectedItems.nodes[0].shape as BpmnShape).activity.activity = 'SubProcess';
                      (diagram.selectedItems.nodes[0].shape as BpmnShape).activity.subProcess.collapsed = true;
                    }
                  }
                  if (args.item.id === 'AdhocNone' || args.item.id === 'AdhocAdhoc') {
                    let adhoc: boolean = (args.item.id === 'AdhocNone') ? false : true;
                    (diagram.selectedItems.nodes[0].shape as BpmnShape).activity.subProcess.adhoc = adhoc;
                  }
                  if (args.item.id === 'Default' || args.item.id === 'BoundryEvent' || args.item.id === 'BoundryCall') {
                    let call: string = args.item.id;
                    if (args.item.id !== 'Default') {
                      call = (args.item.id === 'BoundryEvent') ? 'Event' : 'Call';
                    }
                    (diagram.selectedItems.nodes[0].shape as BpmnShape).activity.subProcess.boundary = call as BpmnBoundary;
                  }
                  if (args.item.id === 'DataObjectNone' || args.item.id === 'Output' || args.item.id === 'Input') {
                    let call: string = args.item.id;
                    if (args.item.id === 'DataObjectNone') {
                      call = 'None';
                    }
                    (diagram.selectedItems.nodes[0].shape as BpmnShape).dataObject.type = call as BpmnDataObjects;
                  }
                  if (args.item.id === 'Collectioncollection' || args.item.id === 'collectionNone') {
                    let call: boolean = (args.item.id === 'Collectioncollection') ? true : false;
                    (diagram.selectedItems.nodes[0].shape as BpmnShape).dataObject.collection = call;
                  }
                  if (args.item.id === 'TaskNone' || args.item.id === 'Service' || args.item.id === 'BusinessRule'
                    || args.item.id === 'InstantiatingReceive' || args.item.id === 'Manual' || args.item.id === 'Receive' || args.item.id === 'BusinessRule'
                    || args.item.id === 'Script' || args.item.id === 'Send' || args.item.id === 'User' || args.item.id === 'Receive'
                    || args.item.id === 'Service' || args.item.id === 'InstantiatingReceive') {
                    let task: string = args.item.id;
                    if (task === 'TaskNone') { task = 'None' }
                    if ((diagram.selectedItems.nodes.length + diagram.selectedItems.connectors.length) > 0) {
                      if ((diagram.selectedItems.nodes[0].shape as BpmnShape).activity.activity === 'Task') {
                        (diagram.selectedItems.nodes[0].shape as BpmnShape).activity.task.type = task as BpmnTasks;
                      }
                    }
                  }
                  if (args.item.id === 'GateWayNone' || args.item.id === 'Exclusive' || args.item.id === 'Inclusive'
                    || args.item.id === 'GatewayParallel' || args.item.id === 'Complex' || args.item.id === 'EventBased' || args.item.id === 'ExclusiveEventBased'
                    || args.item.id === 'ParallelEventBased') {
                    let task: string = args.item.id;
                    if (task === 'GateWayNone') { task = 'None' };
                    if (task === 'GatewayParallel') { task = 'Parallel' };
                    if ((diagram.selectedItems.nodes.length + diagram.selectedItems.connectors.length) > 0) {
                      if ((diagram.selectedItems.nodes[0].shape as BpmnShape).shape === 'Gateway') {
                        (diagram.selectedItems.nodes[0].shape as BpmnShape).gateway.type = task as BpmnGateways;
                      }
                    }
                  }
                  diagram.dataBind();

                }}
                dragEnter={(args: IDragEnterEventArgs): void => {
                  let obj: NodeModel = args.element as NodeModel;
                  if (obj instanceof Node) {
                    if (!(obj.shape as BpmnShape).activity.subProcess.collapsed) {
                      (obj.shape as BpmnShape).activity.subProcess.transaction.cancel.visible = true;
                      (obj.shape as BpmnShape).activity.subProcess.transaction.failure.visible = true;
                      (obj.shape as BpmnShape).activity.subProcess.transaction.success.visible = true;
                    } else {
                      let oWidth: number = obj.width;
                      let oHeight: number = obj.height;
                      let ratio: number = 100 / obj.width;
                      obj.width = 100;
                      obj.height *= ratio;
                      obj.offsetX += (obj.width - oWidth) / 2;
                      obj.offsetY += (obj.height - oHeight) / 2;
                    }
                  }
                }
                }
              ><Inject services={[BpmnDiagrams, UndoRedo, DiagramContextMenu, DataBinding]} />
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
}
function getConnectors(): ConnectorModel[] {

  let connectorSymbols: ConnectorModel[] = [
    {
      id: 'Link1', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
      targetDecorator: { shape: 'Arrow' }, style: { strokeWidth: 2 }
    },
    {
      id: 'Link2', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
      targetDecorator: { shape: 'Arrow' }, style: { strokeWidth: 2, strokeDashArray: '4 4' }
    },
    {
      id: 'Link3', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
      targetDecorator: { shape: 'Arrow' }, style: { strokeWidth: 2 }
    },
    {
      id: 'link4', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 }, type: 'Orthogonal',
      shape: {
        type: 'Bpmn',
        flow: 'Association',
        association: 'Directional'
      }, style: {
        strokeDashArray: '2,2'
      },
    },
  ];
  return connectorSymbols;
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
