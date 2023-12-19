import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    DiagramComponent,
    Node,
    Diagram,
    ConnectorConstraints,
    AnnotationConstraints,
    SnapConstraints,
    SelectorConstraints,
    PortConstraints,
    PortVisibility,
    ConnectorEditing,
    DiagramContextMenu,
    Inject,
    Snapping,
    SnapSettingsModel,
    UndoRedo,
    NodeModel,
    UserHandleModel,
    ConnectorModel,
    IRotationEventArgs,
    UserHandleEventsArgs,
    ISelectionChangeEventArgs,
    Gridlines,
  } from '@syncfusion/ej2-react-diagrams';
import { SampleBase } from '../common/sample-base';
import {
    RadioButtonComponent,
    CheckBoxComponent,
  } from '@syncfusion/ej2-react-buttons';
  import {
    NumericTextBoxComponent,
    ColorPickerComponent,
  } from '@syncfusion/ej2-react-inputs';
  Diagram.Inject(Snapping, ConnectorEditing);
Diagram.Inject(UndoRedo);


let diagramInstance: DiagramComponent;
let checkboxObj: CheckBoxComponent;
let snapToObj:CheckBoxComponent;
let drawingNode:any;
  let fontSize:any;
  let fontColor:any;
  let fontSize1:any;
//Initializes the nodes for the diagram
let nodes:NodeModel[] = [
    {
      id: 'node_1',
      width: 100,
      height: 100,
      offsetX: 350,
      offsetY: 250,
      ports: [
        {
          id: 'port1',
          offset: { x: 0.5, y: 0.5 },
          visibility: PortVisibility.Visible,
          style: { fill: 'black' },
          constraints: PortConstraints.Default | PortConstraints.Draw,
        },
      ],
      annotations: [
        {
          id: 'annot1',
          content: 'Shape 1',
          offset: { x: 0.5, y: 1.2 },
          style: { bold: true },
        },
      ],
    },
    {
      id: 'node_2',
      width: 100,
      height: 100,
      offsetX: 650,
      offsetY: 250,
      ports: [
        {
          id: 'port11',
          offset: { x: 0.5, y: 0.5 },
          visibility: PortVisibility.Visible,
          style: { fill: 'black' },
          constraints: PortConstraints.Default | PortConstraints.Draw,
        },
        {
          id: 'port2',
          offset: { x: 0, y: 0.5 },
          visibility: PortVisibility.Visible,
          style: { fill: 'black' },
          constraints: PortConstraints.Default | PortConstraints.Draw,
          height: 100,
          width: 7,
        },
      ],
      annotations: [
        {
          id: 'annot1',
          content: 'Shape 2',
          offset: { x: 0.5, y: 1.2 },
          style: { bold: true },
        },
      ],
    },
    {
      id: 'node_3',
      width: 100,
      height: 100,
      offsetX: 500,
      offsetY: 400,
      annotations: [
        {
          id: 'annot1',
          content: 'Shape 3',
          offset: { x: 0.5, y: 1.2 },
          style: { bold: true },
        },
      ],
    },
  ];
  //Initializes the connector for the diagram
  let connectors:ConnectorModel[] = [
    {
      id: 'connector_1',
      sourceID: 'node_1',
      targetID: 'node_3',
      type: 'Orthogonal',
    },
  ];
  let handles:UserHandleModel[] = [
    {
      name: 'Clone',
      pathData:
        'M0,2.4879999 L0.986,2.4879999 0.986,9.0139999 6.9950027,9.0139999 6.9950027,10 0.986,10 C0.70400238,10 0.47000122,9.9060001 0.28100207,9.7180004 0.09400177,9.5300007 0,9.2959995 0,9.0139999 z M3.0050011,0 L9.0140038,0 C9.2960014,0 9.5300026,0.093999863 9.7190018,0.28199956 9.906002,0.47000027 10,0.70399952 10,0.986 L10,6.9949989 C10,7.2770004 9.906002,7.5160007 9.7190018,7.7110004 9.5300026,7.9069996 9.2960014,8.0049992 9.0140038,8.0049992 L3.0050011,8.0049992 C2.7070007,8.0049992 2.4650002,7.9069996 2.2770004,7.7110004 2.0890007,7.5160007 1.9950027,7.2770004 1.9950027,6.9949989 L1.9950027,0.986 C1.9950027,0.70399952 2.0890007,0.47000027 2.2770004,0.28199956 2.4650002,0.093999863 2.7070007,0 3.0050011,0 z',
      visible: true,
      offset: 1,
      side: 'Bottom',
      margin: { top: 0, bottom: 0, left: 0, right: 0 },
    },
    {
      name: 'Delete',
      pathData:
        'M0.54700077,2.2130003 L7.2129992,2.2130003 7.2129992,8.8800011 C7.2129992,9.1920013 7.1049975,9.4570007 6.8879985,9.6739998 6.6709994,9.8910007 6.406,10 6.0939997,10 L1.6659999,10 C1.3539997,10 1.0890004,9.8910007 0.87200136,9.6739998 0.65500242,9.4570007 0.54700071,9.1920013 0.54700077,8.8800011 z M2.4999992,0 L5.2600006,0 5.8329986,0.54600048 7.7599996,0.54600048 7.7599996,1.6660004 0,1.6660004 0,0.54600048 1.9270014,0.54600048 z',
      visible: true,
      offset: 0,
      side: 'Bottom',
      margin: { top: 0, bottom: 0, left: 0, right: 0 },
    },
    {
      name: 'Draw',
      pathData:
        'M3.9730001,0 L8.9730001,5.0000007 3.9730001,10.000001 3.9730001,7.0090005 0,7.0090005 0,2.9910006 3.9730001,2.9910006 z',
      visible: true,
      offset: 0.5,
      side: 'Right',
      margin: { top: 0, bottom: 0, left: 0, right: 0 },
    },
  ];
  
  const sample_css = `
  .row {
    margin-left: 0px;
    margin-right: 0px;
  }
    .db-prop-text-style {
      font-size: 13px;
      font-weight: normal;
      font-family: 'Calibri';
      margin-top: 25px;
    }
    .radio-text-style {
      font-size: 13px;
      font-weight: normal;
      font-family: 'Calibri';
      margin-top: 10px;
    }
    .text-content {
      margin-left: 10px;
    }
    .e-radio + label .e-label {
      font-size: 12px !important;
    }
    #properties_Container {
      /* background: #e3e3e3; */
      width: 300px;
      float: left;
      height: 600px;
      margin-top: 30px;
    }
    .e-colorpicker-wrapper
      .e-split-btn-wrapper
      .e-split-colorpicker.e-split-btn
      .e-selected-color
      .e-split-preview {
      width: 100px !important;
      margin-left: -40px !important;
    }
    .e-colorpicker-wrapper
      .e-split-btn-wrapper
      .e-split-colorpicker.e-split-btn {
      width: 110px !important;
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
  }`;
  
  export class SnappingSample extends SampleBase<{}, {}> {
    render() {
      return (
        <div className="control-pane diagram-control-pane">
        <style>{sample_css}</style>
        <div className="col-lg-8 control-section">
          <div className="content-wrapper" style={{ width: '100%' }}>
            <DiagramComponent
              id="diagram"
              ref={(diagram) => (diagramInstance = diagram)}
              width={'100%'}
              height={'645px'}
              nodes={nodes}
              drawingObject={{ type: 'Orthogonal' }}
              connectors={connectors}
              rulerSettings={{ showRulers: true }}
              selectedItems={{
                constraints: SelectorConstraints.UserHandle,
                userHandles: handles,
              }}
              scrollSettings={{
                //Sets the scroll limit
                scrollLimit: 'Infinity',
              }}
              contextMenuSettings={{
                show: true,
              }}
              created={() => {
                diagramInstance.fitToPage({ mode: 'Width' });
              }}
              getNodeDefaults={(obj:any) => {
                obj.style = { fill: 'orange', strokeColor: 'orange' };
                return obj;
              }}
              getConnectorDefaults={(connector:any) => {
                connector.constraints =
                  ConnectorConstraints.Default |
                  ConnectorConstraints.DragSegmentThumb;
                return connector;
              }}
              rotateChange={(args:IRotationEventArgs) => {
                if (args.state === 'Start' || args.state === 'Progress') {
                  diagramInstance.selectedItems = {
                    constraints:
                      SelectorConstraints.All & ~SelectorConstraints.UserHandle,
                  };
                }
                if (args.state === 'Completed') {
                  diagramInstance.selectedItems = {
                    constraints:
                      SelectorConstraints.All | SelectorConstraints.UserHandle,
                    userHandles: handles,
                  };
                }
              }}
              onUserHandleMouseDown={(args:UserHandleEventsArgs) => {
                switch (args.element.name) {
                  case 'Delete':
                    diagramInstance.remove();
                    break;
                  case 'Clone':
                    diagramInstance.paste(
                      diagramInstance.selectedItems.selectedObjects
                    );
                    break;
                  case 'Draw':
                    diagramInstance.drawingObject.shape = {};
                    (diagramInstance.drawingObject as any).type = (diagramInstance
                      .drawingObject as any).type
                      ? (diagramInstance.drawingObject as any).type
                      : 'Orthogonal';
                    (diagramInstance.drawingObject as any).sourceID = drawingNode.id;
                    diagramInstance.dataBind();
                    break;
                }
              }}
              selectionChange={(args:ISelectionChangeEventArgs) => {
                if (args.state === 'Changed') {
                  let selectedItems:any = diagramInstance.selectedItems.nodes;
                  selectedItems = selectedItems.concat(
                    (diagramInstance.selectedItems as any).connectors
                  );
                  if (selectedItems.length > 0) {
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
                      if (diagramInstance.selectedItems.nodes.length > 0) {
                        drawingNode =
                          diagramInstance.selectedItems.nodes[
                            diagramInstance.selectedItems.nodes.length - 1
                          ];
                      }
                    } else {
                      diagramInstance.selectedItems = {
                        constraints:
                          SelectorConstraints.All &
                          ~SelectorConstraints.UserHandle,
                      };
                    }
                  }
                }
              }}
              snapSettings={{ snapAngle: 5 }}
            >
              <Inject services={[DiagramContextMenu, UndoRedo, Snapping]} />
            </DiagramComponent>
          </div>
        </div>
  
        <div className="col-lg-4 property-section">
          <div id="properties_Container">
            <div className="property-panel-header"> Properties </div>
            <div className="db-prop-row">
              <div className="db-prop-text-style">
                <span className="db-prop-text-style text-content">
                  Snapping Interval
                </span>
                <div
                  className="db-text-input"
                  style={{ float: 'right', marginRight: '10px' }}
                >
                  <NumericTextBoxComponent
                    id="snappingInterval"
                    width={150}
                    value={20}
                    min={1}
                    step={1}
                    format="n0"
                    change={(args:any) => {
                      diagramInstance.snapSettings.horizontalGridlines.snapIntervals[0] =
                        args.value;
                      diagramInstance.snapSettings.verticalGridlines.snapIntervals[0] =
                        args.value;
                      (diagramInstance.snapSettings.horizontalGridlines as any).scaledIntervals[0] =
                        args.value;
                      (diagramInstance.snapSettings.verticalGridlines as any).scaledIntervals[0] =
                        args.value;
                      diagramInstance.dataBind();
                    }}
                    ref={(fontsize) => (fontSize = fontsize)}
                  />
                </div>
              </div>
              <div className="db-prop-text-style">
                <span className="db-prop-text-style text-content">
                  Snapping Angle
                </span>
                <div
                  className="db-text-input"
                  style={{ float: 'right', marginRight: '10px' }}
                >
                  <NumericTextBoxComponent
                    id="snappingAngle"
                    width={150}
                    value={5}
                    min={1}
                    step={1}
                    format="n0"
                    change={(args:any) => {
                      diagramInstance.snapSettings.snapAngle = args.value;
                      diagramInstance.dataBind();
                    }}
                    ref={(fontsize) => (fontSize1 = fontsize)}
                  />
                </div>
              </div>
              <div className="db-prop-text-style">
                <span className="db-prop-text-style text-content">
                  Snapping Line Color
                </span>
                <div
                  className="db-text-input"
                  style={{ float: 'right', margin: '1px' }}
                >
                  <ColorPickerComponent
                    id="snappingLineColor"
                    value="#07EDE1"
                    mode="Palette"
                    showButtons={false}
                    change={(args:any) => {
                      diagramInstance.snapSettings.snapLineColor = args.value;
                      diagramInstance.dataBind();
                    }}
                    ref={(fontcolor) => (fontColor = fontcolor)}
                  />
                </div>
              </div>
              <div className="db-prop-text-style">
                <div className="row" style={{ marginLeft: '10px' }}>
                  <CheckBoxComponent
                    id="showGridlines"
                    label={'Show Gridline'}
                    checked={true}
                    change={() => {
                      diagramInstance.snapSettings.constraints =
                        diagramInstance.snapSettings.constraints ^
                        SnapConstraints.ShowLines;
                      diagramInstance.dataBind();
                      scale();
                    }}
                    ref={(scope) => { checkboxObj = scope; }}
                  />
                </div>
              </div>
              <div className="db-prop-text-style" style={{ marginTop: '7px' }}>
                <div className="row" style={{ marginLeft: '10px' }}>
                  <CheckBoxComponent
                    id="snapToObject"
                    label={'Snapping To Objects'}
                    checked={true}
                    change={() => {
                      diagramInstance.snapSettings.constraints =
                        diagramInstance.snapSettings.constraints ^
                        SnapConstraints.SnapToObject;
                      diagramInstance.dataBind();
                      scale();
                    }}
                    ref={(scope) => { snapToObj = scope; }}
                  />
                </div>
              </div>
  
              <div className="db-prop-text-style">
                <div
                  className="db-prop-text-style text-content"
                  style={{ fontWeight: 'bold' }}
                >
                  Snapping To Lines
                </div>
              </div>
  
              <div className="row radio-text-style" style={{ marginLeft: '7px' }}>
                <div>
                  <RadioButtonComponent
                    id="radio1"
                    name="snapToLines"
                    checked={true}
                    value="Snap To Gridlines"
                    label="Snap To Gridlines"
                    change={(args:any) => {
                      snapToLines(args);
                    }}
                  />
                </div>
              </div>
              <div className="row radio-text-style" style={{ marginLeft: '7px' }}>
                <div>
                  <RadioButtonComponent
                    id="radio2"
                    name="snapToLines"
                    value="Snap To Horizontal Gridlines"
                    label="Snap To Horizontal Gridlines"
                    change={(args) => {
                      snapToLines(args);
                    }}
                  />
                </div>
              </div>
              <div className="row radio-text-style" style={{ marginLeft: '7px' }}>
                <div>
                  <RadioButtonComponent
                    id="radio3"
                    name="snapToLines"
                    value="Snap To Vertical Gridlines"
                    label="Snap To Vertical Gridlines"
                    change={(args:any) => {
                      snapToLines(args);
                    }}
                  />
                </div>
              </div>
              <div className="row radio-text-style" style={{ marginLeft: '7px' }}>
                <div>
                  <RadioButtonComponent
                    id="radio4"
                    name="snapToLines"
                    value="None"
                    label="None"
                    change={(args:any) => {
                      snapToLines(args);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="action-description">
            <p>
                This sample shows how diagram objects snap to the nearest intersection of gridlines or objects while being dragged or resized.
            </p>
        </div>
        <div id="description">
            <p>
                The <code>SnapInterval</code> property in snapSettings allows you to specify the interval at which objects should snap to a grid or other objects in the control.
            </p>
            <p>
                The <code>snapAngle</code> property in snapSettings allows you to define the snap angle by which the object needs to be rotated.
            </p>
            <p>
                The  <code>snapLineColor</code> property is used to set the color of the snap lines that appear when objects snap to a grid or other objects in the control.
            </p>
            <p>
                The <code>constraints</code> property controls the visibility of gridlines and enables or disables snapping. 
            </p>
            <br />
        </div>
      </div>
      );
    }
  }
  function scale() {
    (diagramInstance.snapSettings.horizontalGridlines as Gridlines).scaledIntervals[0] =
    fontSize.value;
    (diagramInstance.snapSettings.verticalGridlines as Gridlines).scaledIntervals[0] =
    fontSize.value;
    diagramInstance.dataBind();
  }
  function snapToLines(args:any) {
    if (checkboxObj.checked && snapToObj.checked) {
      diagramInstance.snapSettings.constraints = SnapConstraints.All;
    } else if (checkboxObj.checked && !snapToObj.checked) {
      diagramInstance.snapSettings.constraints =
        SnapConstraints.All & ~SnapConstraints.SnapToObject;
    } else if (!checkboxObj.checked && snapToObj.checked) {
      diagramInstance.snapSettings.constraints =
        SnapConstraints.All & ~SnapConstraints.ShowLines;
    } else if (!checkboxObj.checked && !snapToObj.checked) {
      diagramInstance.snapSettings.constraints =
        SnapConstraints.All &
        ~(SnapConstraints.ShowLines | SnapConstraints.SnapToObject);
    }
    switch (args.value) {
      case 'Snap To Gridlines':
        diagramInstance.snapSettings.constraints =
          SnapConstraints.All | SnapConstraints.SnapToLines;
        if (!checkboxObj.checked && !snapToObj.checked) {
          diagramInstance.snapSettings.constraints =
            SnapConstraints.All &
            ~(SnapConstraints.ShowLines | SnapConstraints.SnapToObject);
        } else if (!snapToObj.checked && checkboxObj.checked) {
          diagramInstance.snapSettings.constraints =
            SnapConstraints.All & ~SnapConstraints.SnapToObject;
        } else if (snapToObj.checked && !checkboxObj.checked) {
          diagramInstance.snapSettings.constraints =
            SnapConstraints.All & ~SnapConstraints.ShowLines;
        }
        break;
      case 'Snap To Horizontal Gridlines':
        diagramInstance.snapSettings.constraints =
          diagramInstance.snapSettings.constraints ^
          SnapConstraints.SnapToVerticalLines;
        break;
      case 'Snap To Vertical Gridlines':
        diagramInstance.snapSettings.constraints =
          diagramInstance.snapSettings.constraints ^
          SnapConstraints.SnapToHorizontalLines;
        break;
      case 'None':
        diagramInstance.snapSettings.constraints =
          SnapConstraints.All &
          ~(
            SnapConstraints.SnapToHorizontalLines |
            SnapConstraints.SnapToVerticalLines |
            SnapConstraints.SnapToLines
          );
        if (!checkboxObj.checked && !snapToObj.checked) {
          diagramInstance.snapSettings.constraints =
            SnapConstraints.All &
            ~(
              SnapConstraints.ShowLines |
              SnapConstraints.SnapToObject |
              SnapConstraints.SnapToHorizontalLines |
              SnapConstraints.SnapToVerticalLines |
              SnapConstraints.SnapToLines
            );
        } else if (checkboxObj.checked && !snapToObj.checked) {
          diagramInstance.snapSettings.constraints =
            SnapConstraints.All &
            ~(
              SnapConstraints.SnapToObject |
              SnapConstraints.SnapToHorizontalLines |
              SnapConstraints.SnapToVerticalLines |
              SnapConstraints.SnapToLines
            );
        } else if (!checkboxObj.checked && snapToObj.checked) {
          diagramInstance.snapSettings.constraints =
            SnapConstraints.All &
            ~(
              SnapConstraints.ShowLines |
              SnapConstraints.SnapToHorizontalLines |
              SnapConstraints.SnapToVerticalLines |
              SnapConstraints.SnapToLines
            );
        }
        break;
    }
    diagramInstance.dataBind();
    scale();
  }
