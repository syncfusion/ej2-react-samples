import * as ReactDOM from "react-dom";
import * as React from "react";
import {
    Diagram,
    Node,
    ConnectorEditing,
    NodeConstraints,
    DiagramComponent,
    ConnectorConstraints,
    SelectorConstraints,
    AnnotationConstraints,
    DiagramConstraints,
    DiagramContextMenu,
    Inject,
    UndoRedo,
    UserHandleModel,
    NodeModel,
    ConnectorModel,
    ISelectionChangeEventArgs,
    ToolBase,
  } from '@syncfusion/ej2-react-diagrams';
import { updateSampleSection } from "../common/sample-base";
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
Diagram.Inject(ConnectorEditing);


let diagramInstance: DiagramComponent;
const SAMPLE_CSS = `.image-pattern-style {
    background-color: white;
    background-size: contain;
    background-repeat: no-repeat;
    height: 75px;
    width: calc((100% - 12px) / 3);
    cursor: pointer;
    border: 1px solid #d5d5d5;
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
    font-size: 13px;
    font-weight: 500;
  }

  .e-selected-style {
    border-color: #006ce6;
    border-width: 2px;
  }

  .e-checkbox-wrapper .e-label {
    font-size: 12px;
  }`;
let handles:UserHandleModel[]  = [
    {
      name: 'delete',
      pathData:
        'M 7.04 22.13 L 92.95 22.13 L 92.95 88.8 C 92.95 91.92 91.55 94.58 88.76 96.74 C 85.97 98.91 82.55 100 78.52 100 L 21.48 100 C 17.45 100 14.03 98.91 11.24 96.74 C 8.45 94.58 7.04 91.92 7.04 88.8 z M 32.22 0 L 67.78 0 L 75.17 5.47 L 100 5.47 L 100 16.67 L 0 16.67 L 0 5.47 L 24.83 5.47 z',
      visible: true,
      offset: 0.5,
      side: 'Bottom',
      margin: { top: 0, bottom: 0, left: 0, right: 0 },
    },
  ];
  //Initialize Diagram Nodes
  let nodes:NodeModel[] = [
    {
      id: 'textNode1',
      // Position of the node
      offsetX: 340,
      offsetY: 50,
      // Size of the node
      width: 500,
      height: 50,
      //Sets type of the node
      shape: {
        type: 'Text',
        content:
          'Use Node Constraints to restrict end-users from performing certain operations on Node.',
      },
      //Customizes the appearances such as text, font, fill, and stroke.
      style: {
        strokeColor: 'none',
        fill: 'none',
        color: 'black',
        textAlign: 'Center',
      },
      constraints: NodeConstraints.None,
    },
    {
      id: 'rectangle',
      offsetX: 80,
      offsetY: 160,
      width: 80,
      height: 65,
      // style: { fill: '#6BA5D7', strokeColor: 'white' },
      shape: { type: 'Basic', shape: 'Rectangle' },
      annotations: [{ content: 'Selection = False' }],
      constraints: NodeConstraints.Default & ~NodeConstraints.Select,
    },
    {
      id: 'ellipse',
      offsetX: 190,
      offsetY: 160,
      width: 80,
      height: 80,
      // style: { fill: '#6BA5D7', strokeColor: 'white' },
      shape: { type: 'Basic', shape: 'Ellipse', cornerRadius: 10 },
      annotations: [{ content: 'Dragging = False' }],
      constraints: NodeConstraints.Default & ~NodeConstraints.Drag,
    },
    {
      id: 'heptagon',
      offsetX: 295,
      offsetY: 160,
      width: 80,
      height: 80,
      // style: { fill: '#6BA5D7', strokeColor: 'white' },
      shape: { type: 'Basic', shape: 'Heptagon' },
      annotations: [{ content: 'Delete = False' }],
      constraints: NodeConstraints.Default & ~NodeConstraints.Delete,
    },
    {
      id: 'directData',
      offsetX: 410,
      offsetY: 160,
      width: 80,
      height: 80,
      rotateAngle: -45,
      // style: { fill: '#6BA5D7', strokeColor: 'white' },
      shape: { type: 'Flow', shape: 'DirectData' },
      annotations: [{ content: 'Rotate = False' }],
      constraints: NodeConstraints.Default & ~NodeConstraints.Rotate,
    },
    {
      id: 'Plus',
      offsetX: 530,
      offsetY: 160,
      width: 80,
      height: 80,
      // style: { fill: '#6BA5D7', strokeColor: 'white' },
      shape: { type: 'Basic', shape: 'Plus' },
      annotations: [
        {
          content: 'TextEdit = False',
          constraints: AnnotationConstraints.ReadOnly,
        },
      ],
    },
    {
      id: 'decision',
      offsetX: 630,
      offsetY: 160,
      width: 80,
      height: 80,
      // style: { fill: '#6BA5D7', strokeColor: 'white' },
      shape: { type: 'Flow', shape: 'Decision' },
      annotations: [{ content: 'Resizing = False' }],
      constraints: NodeConstraints.Default & ~NodeConstraints.Resize,
    },
    {
      id: 'textNode2',
      // Position of the node
      offsetX: 350,
      offsetY: 280,
      // Size of the node
      width: 550,
      height: 50,
      //Sets type of the node
      shape: {
        type: 'Text',
        content:
          'Use Connector Constraints to restrict end-users from performing certain operations on Connector.',
      },
      //Customizes the appearances such as text, font, fill, and stroke.
      style: {
        strokeColor: 'none',
        fill: 'none',
        color: 'black',
        textAlign: 'Center',
      },
      constraints: NodeConstraints.None,
    },
  ];
  //Initialize Diagram connectors
  let connectors:ConnectorModel[] = [
    {
      id: 'select',
      type: 'Orthogonal',
      annotations: [
        {
          content: 'Selection = False',
          horizontalAlignment: 'Right',
          verticalAlignment: 'Bottom',
        },
      ],
      constraints: ConnectorConstraints.Default & ~ConnectorConstraints.Select,
      style: {
        strokeColor: '#6BA5D7',
        fill: '#6BA5D7',
        strokeWidth: 2,
      },
      targetDecorator: {
        style: {
          fill: '#6BA5D7',
          strokeColor: '#6BA5D7',
        },
      },
      sourcePoint: {
        x: 40,
        y: 350,
      },
      targetPoint: {
        x: 120,
        y: 430,
      },
    },
    {
      id: 'connector2',
      type: 'Orthogonal',
      annotations: [
        {
          content: 'Dragging = True',
          horizontalAlignment: 'Right',
          verticalAlignment: 'Bottom',
        },
      ],
      constraints:
        ConnectorConstraints.Default |
        ConnectorConstraints.DragSegmentThumb |
        ConnectorConstraints.Drag,
      style: {
        strokeColor: '#6BA5D7',
        fill: '#6BA5D7',
        strokeWidth: 2,
      },
      targetDecorator: {
        style: {
          fill: '#6BA5D7',
          strokeColor: '#6BA5D7',
        },
      },
      sourcePoint: {
        x: 140,
        y: 350,
      },
      targetPoint: {
        x: 220,
        y: 430,
      },
    },
    {
      id: 'delete',
      type: 'Orthogonal',
      annotations: [
        {
          content: 'Delete = False',
          horizontalAlignment: 'Right',
          verticalAlignment: 'Bottom',
        },
      ],
      constraints:
        (ConnectorConstraints.Default | ConnectorConstraints.DragSegmentThumb) &
        ~(ConnectorConstraints.Delete | ConnectorConstraints.Drag),
      style: {
        strokeColor: '#6BA5D7',
        fill: '#6BA5D7',
        strokeWidth: 2,
      },
      targetDecorator: {
        style: {
          fill: '#6BA5D7',
          strokeColor: '#6BA5D7',
        },
      },
      sourcePoint: {
        x: 250,
        y: 350,
      },
      targetPoint: {
        x: 320,
        y: 430,
      },
    },
    {
      id: 'endThumb',
      type: 'Orthogonal',
      annotations: [
        {
          content: 'EndThumb = False',
          horizontalAlignment: 'Right',
          verticalAlignment: 'Bottom',
        },
      ],
      constraints:
        SelectorConstraints.All &
        ~(
          SelectorConstraints.ConnectorSourceThumb |
          SelectorConstraints.ConnectorTargetThumb
        ),
      style: {
        strokeColor: '#6BA5D7',
        fill: '#6BA5D7',
        strokeWidth: 2,
      },
      targetDecorator: {
        style: {
          fill: '#6BA5D7',
          strokeColor: '#6BA5D7',
        },
      },
      sourcePoint: {
        x: 360,
        y: 350,
      },
      targetPoint: {
        x: 440,
        y: 430,
      },
    },
    {
      id: 'draggable',
      type: 'Orthogonal',
      annotations: [
        {
          content: 'EndDraggable = False',
          horizontalAlignment: 'Right',
          verticalAlignment: 'Bottom',
        },
      ],
      constraints:
        (ConnectorConstraints.Default | ConnectorConstraints.DragSegmentThumb) &
        ~(
          ConnectorConstraints.DragSourceEnd | ConnectorConstraints.DragTargetEnd
        ),
      style: {
        strokeColor: '#6BA5D7',
        fill: '#6BA5D7',
        strokeWidth: 2,
      },
      targetDecorator: {
        style: {
          fill: '#6BA5D7',
          strokeColor: '#6BA5D7',
        },
      },
      sourcePoint: {
        x: 460,
        y: 350,
      },
      targetPoint: {
        x: 540,
        y: 430,
      },
    },
    {
      id: 'segmentThumb',
      type: 'Orthogonal',
      annotations: [
        {
          content: 'SegmentThumb = False',
          horizontalAlignment: 'Right',
          verticalAlignment: 'Bottom',
        },
      ],
      constraints: ConnectorConstraints.Default & ~ConnectorConstraints.Drag,
      style: {
        strokeColor: '#6BA5D7',
        fill: '#6BA5D7',
        strokeWidth: 2,
      },
      targetDecorator: {
        style: {
          fill: '#6BA5D7',
          strokeColor: '#6BA5D7',
        },
      },
      sourcePoint: {
        x: 580,
        y: 350,
      },
      targetPoint: {
        x: 660,
        y: 430,
      },
    },
  ];

function ConstraintsSample() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
    
  function getTool(action: string): ToolBase {
    let tool: ToolBase;
    if (action === 'delete') {
        diagramInstance.remove();
    }
    return tool;
  }
  function Zoomchanged(args:any) {
    diagramInstance.constraints =
      diagramInstance.constraints ^ DiagramConstraints.Zoom;
  }
  function undoRedo(args:any) {
    diagramInstance.constraints =
      diagramInstance.constraints ^ DiagramConstraints.UndoRedo;
  }

  function textedit(args:any) {
      for (let i = 0; i < diagramInstance.nodes.length; i++) {
        var node = diagramInstance.nodes[i];
        for (let j = 0; j < node.annotations.length; j++) {
          if (node.annotations[j].content) {
            if (args.checked) {
              if (node.id !== 'Plus') {
                node.annotations[j].constraints =
                  node.annotations[j].constraints ^
                  AnnotationConstraints.ReadOnly;
              }
            } else {
              node.annotations[j].constraints =
                node.annotations[j].constraints | AnnotationConstraints.ReadOnly;
            }
          }
        }
      }
      for (let x = 0; x < diagramInstance.connectors.length; x++) {
        var connector = diagramInstance.connectors[x];
        for (let y = 0; y < connector.annotations.length; y++) {
          if (connector.annotations[y].content) {
            if (args.checked) {
              if (connector.id === 'select') {
                connector.constraints =
                  connector.constraints & ~ConnectorConstraints.Select;
              } else {
                connector.annotations[y].constraints =
                  connector.annotations[y].constraints ^
                  AnnotationConstraints.ReadOnly;
              }
            } else {
              connector.annotations[y].constraints =
                connector.annotations[y].constraints ^
                AnnotationConstraints.ReadOnly;
            }
          }
        }
      }
    diagramInstance.dataBind();
  }
  function contextmenu(args:any) {
    if (args.checked) {
      diagramInstance.contextMenuSettings.show = true;
      diagramInstance.refresh();
    } else {
      diagramInstance.contextMenuSettings.show = false;
    }
    diagramInstance.dataBind();
  }
  function selectable(args:any) {
    for (let i:number = 0; i < diagramInstance.nodes.length; i++) {
      let node = diagramInstance.nodes[i];
      if (node.id != 'rectangle') {
        if (args.checked) {
          node.constraints = node.constraints | NodeConstraints.Select;
        } else {
          node.constraints = node.constraints & ~NodeConstraints.Select;
        }
      }
      diagramInstance.dataBind();
    }
    for (let j:number = 0; j < diagramInstance.connectors.length; j++) {
      let connector = diagramInstance.connectors[j];
      if (connector.id != 'select') {
        if (args.checked) {
          connector.constraints =
            connector.constraints | ConnectorConstraints.Select;
        } else {
          connector.constraints =
            connector.constraints & ~ConnectorConstraints.Select;
        }
      }
      diagramInstance.dataBind();
    }
  }
  function draggablee(args:any) {
    for (let i:number = 0; i < diagramInstance.nodes.length; i++) {
      let nodes = diagramInstance.nodes[i];
      if (args.checked) {
        if (nodes.id === 'ellipse') {
          nodes.constraints = NodeConstraints.Default & ~NodeConstraints.Drag;
        } else {
          nodes.constraints = nodes.constraints | NodeConstraints.Drag;
        }
      } else {
        nodes.constraints = nodes.constraints & ~NodeConstraints.Drag;
      }
      diagramInstance.dataBind();
    }
    for (let j:number = 0; j < diagramInstance.connectors.length; j++) {
      let connectors = diagramInstance.connectors[j];
      if (args.checked) {
        connectors.constraints =
          connectors.constraints | ConnectorConstraints.Drag;
      } else {
        connectors.constraints =
          connectors.constraints & ~ConnectorConstraints.Drag;
      }
      diagramInstance.dataBind();
    }
  }
 
  return (
    <div className="control-pane diagram-control-pane">
    <style>{SAMPLE_CSS}</style>
    <div className="col-lg-9 control-section">
      <div
        className="content-wrapper"
        style={{ width: '100%', background: 'white' }}
      >
        <DiagramComponent
          id="diagram"
          ref={(diagram) => (diagramInstance = diagram)}
          width={'100%'}
          height={645}
          nodes={nodes}
          connectors={connectors}
          selectedItems={{
            constraints: SelectorConstraints.UserHandle,
            userHandles: handles,
          }}
          contextMenuSettings={{
            show: true,
          }}
          rulerSettings={{ showRulers: true }}
          getCustomTool={getTool}
          created={() => {
            for (let i = 0; i < diagramInstance.connectors.length; i++) {
              if (diagramInstance.connectors[i].id === 'endThumb') {
                diagramInstance.connectors[i].constraints =
                  (ConnectorConstraints.Default |
                    ConnectorConstraints.DragSegmentThumb) &
                  ~ConnectorConstraints.Drag;
              }
            }
          }}
          selectionChange={(args:ISelectionChangeEventArgs) => {
            {
              if (args.state === 'Changing') {
                if (args.type === 'Addition') {
                  if (args.newValue[0].id === 'endThumb') {
                    diagramInstance.selectedItems.constraints =
                      SelectorConstraints.All &
                      ~(
                        SelectorConstraints.ConnectorSourceThumb |
                        SelectorConstraints.ConnectorTargetThumb
                      );
                  } else {
                    diagramInstance.selectedItems.constraints =
                      SelectorConstraints.All;
                  }
                } else {
                  diagramInstance.selectedItems.constraints =
                    SelectorConstraints.All;
                }
              }
              if (args.state === 'Changed') {
                if (
                  args.newValue.length > 0 &&
                  args.newValue[0] instanceof Node
                ) {
                  diagramInstance.selectedItems = {
                    constraints:
                      SelectorConstraints.All |
                      SelectorConstraints.UserHandle,
                    userHandles: handles,
                  };
                } else {
                  if (args.newValue.length > 0 && args.newValue[0].id !== 'endThumb') {
                    diagramInstance.selectedItems = {
                      constraints:
                        SelectorConstraints.All &
                        ~SelectorConstraints.UserHandle,
                    };
                  } else {
                    diagramInstance.selectedItems = {
                      constraints:
                        SelectorConstraints.All &
                        ~(
                          SelectorConstraints.UserHandle |
                          SelectorConstraints.ConnectorSourceThumb |
                          SelectorConstraints.ConnectorTargetThumb
                        ),
                    };
                  }
                }
              }
            }
          }}
        >
          <Inject services={[DiagramContextMenu, UndoRedo]} />
        </DiagramComponent>
      </div>
    </div>
    <div className="col-lg-2 property-section">
      <div className="property-panel-header">Diagram Constraints</div>
      <div
        className="row property-panel-content"
        style={{ paddingTop: '10px' }}
      >
        <div className="row" style={{ paddingTop: '8px' }}>
          <CheckBoxComponent
            checked={true}
            label="Zooming"
            id="zooming"
            change={Zoomchanged}
          />
        </div>
        <div className="row" style={{ paddingTop: '8px' }}>
          <CheckBoxComponent
            checked={true}
            label="Undo/Redo"
            id="undoRedo"
            change={undoRedo}
          />
        </div>
        <div className="row" style={{ paddingTop: '8px' }}>
          <CheckBoxComponent
            checked={true}
            label="Text Edit"
            id="textedit"
            change={textedit}
          />
        </div>
        <div className="row" style={{ paddingTop: '8px' }}>
          <CheckBoxComponent
            checked={true}
            label="Context Menu"
            id="contextmenu"
            change={contextmenu}
          />
        </div>
        <div className="row" style={{ paddingTop: '8px' }}>
          <CheckBoxComponent
            checked={true}
            label="Selectable"
            id="selectable"
            change={selectable}
          />
        </div>
        <div className="row" style={{ paddingTop: '8px' }}>
          <CheckBoxComponent
            checked={true}
            label="Draggable"
            id="draggablee"
            change={draggablee}
          />
        </div>
      </div>
    </div>
    <div id="action-description">
    <p>
        This sample illustrates how node constraints are used to restrict end-users from performing certain operations on nodes and connector constraints are used to restrict end-users from performing certain operation on connectors.
    </p>
    </div>
    <div id="description">
    <p>
        This sample illustrates how node constraints are used to restrict end-users from performing certain operations on nodes and connector constraints are used to restrict end-users from performing certain operation on connectors.
    </p>
    <p>
        The <code>NodeConstraints</code> property allows you to enable or disable node behaviors like select, drag, resize, rotate, and delete. 
    </p>
    <p> 
        The <code>ConnectorConstraints</code> property allows you to enable or disable connector behaviors like select, drag, delete, drag source end, and drag target end. 
    </p>
    <p>
        The <code>AnnotationConstraints</code> property allows you to enable or disable the annotation behavior, text editing.
    </p>
    <p>
        Using the <code>DiagramConstraints</code> property, enable or disable certain features of the diagram like zoom, undo/redo, context menu, drag, and select.
    </p>
    <br />
    </div>
  </div>
  );
}
export default ConstraintsSample;
