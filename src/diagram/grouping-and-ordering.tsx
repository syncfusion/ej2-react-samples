import * as ReactDOM from "react-dom";
import * as React from "react";
import {
  DiagramComponent,
  NodeModel,
  Node,
  ISelectionChangeEventArgs,
  SymbolPaletteComponent,
  SelectorConstraints,
  UserHandleModel,
  UserHandleEventsArgs,
} from "@syncfusion/ej2-react-diagrams";
import { SampleBase } from "../common/sample-base";
import "./font-icons.css";
import { ItemDirective, ItemsDirective, ToolbarComponent } from "@syncfusion/ej2-react-navigations";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { ColorPickerComponent, NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs";

let diagramInstance: DiagramComponent;
let toolbarEditor:ToolbarComponent;
let nodes: NodeModel[] = [
    {
      id: 'Diamond',
      // Position of the node
      offsetX: 350,
      offsetY: 250,
      // Size of the node
      width: 100,
      height: 100,
      shape: { type: 'Basic', shape: 'Diamond' },
      annotations: [
        {
          content: 'Decision',
        },
      ],
    },
    {
      id: 'ellipse',
      // Position of the node
      offsetX: 150,
      offsetY: 250,
      // Size of the node
      width: 100,
      height: 60,
      shape: { type: 'Basic', shape: 'Ellipse' },
      annotations: [
        {
          content: 'Start/Stop',
        },
      ],
    },
    {
      id: 'node1',
      // Position of the node
      offsetX: 150,
      offsetY: 100,
      // Size of the node
      width: 100,
      height: 55,
      shape: { type: 'Basic', shape: 'Rectangle' },
    },
    {
      id: 'node2',
      // Position of the node
      offsetX: 350,
      offsetY: 100,
      // Size of the node
      width: 90,
      height: 55,
      // style: { fill: '#6BA5D7', strokeColor: 'white' },
      shape: { type: 'Basic', shape: 'Rectangle', cornerRadius: 5 },
    },
    {
      id: 'group',
      children: ['node1', 'node2'],
      padding: { left: 10, right: 10, top: 10, bottom: 10 },
      annotations: [
        {
          content: 'Group 1',
        },
      ],
    },
    {
      id: 'rectangle',
      // Position of the node
      offsetX: 150,
      offsetY: 400,
      // Size of the node
      width: 100,
      height: 60,
      shape: { type: 'Basic', shape: 'Rectangle' },
      annotations: [
        {
          content: 'Process',
        },
      ],
    },
  ];
  
  //Initialize the flowshapes for the symbol palatte
  let basicShapes: NodeModel[] = [
    {
      id: 'Rectangle',
      shape: { type: 'Basic', shape: 'Rectangle' },
      style: { strokeWidth: 2 },
    },
    {
      id: 'Ellipse',
      shape: { type: 'Basic', shape: 'Ellipse' },
      style: { strokeWidth: 2 },
    },
    {
      id: 'Hexagon',
      shape: { type: 'Basic', shape: 'Hexagon' },
      style: { strokeWidth: 2 },
    },
    {
      id: 'Parallelogram',
      shape: { type: 'Basic', shape: 'Parallelogram' },
      style: { strokeWidth: 2 },
    },
    {
      id: 'Triangle',
      shape: { type: 'Basic', shape: 'Triangle' },
      style: { strokeWidth: 2 },
    },
    {
      id: 'Plus',
      shape: { type: 'Basic', shape: 'Plus' },
      style: { strokeWidth: 2 },
    },
    {
      id: 'Star',
      shape: { type: 'Basic', shape: 'Star' },
      style: { strokeWidth: 2 },
    },
    {
      id: 'Pentagon',
      shape: { type: 'Basic', shape: 'Pentagon' },
      style: { strokeWidth: 2 },
    },
    {
      id: 'Heptagon',
      shape: { type: 'Basic', shape: 'Heptagon' },
      style: { strokeWidth: 2 },
    },
    {
      id: 'Octagon',
      shape: { type: 'Basic', shape: 'Octagon' },
      style: { strokeWidth: 2 },
    },
    {
      id: 'Trapezoid',
      shape: { type: 'Basic', shape: 'Trapezoid' },
      style: { strokeWidth: 2 },
    },
    {
      id: 'Decagon',
      shape: { type: 'Basic', shape: 'Decagon' },
      style: { strokeWidth: 2 },
    },
    {
      id: 'RightTriangle',
      shape: { type: 'Basic', shape: 'RightTriangle' },
      style: { strokeWidth: 2 },
    },
    {
      id: 'Cylinder',
      shape: { type: 'Basic', shape: 'Cylinder' },
      style: { strokeWidth: 2 },
    },
    {
      id: 'Diamond',
      shape: { type: 'Basic', shape: 'Diamond' },
      style: { strokeWidth: 2 },
    },
  ];
  
  let handles:UserHandleModel[]  = [
    {
      name: 'Clone',
      pathData:
        'M0,2.4879999 L0.986,2.4879999 0.986,9.0139999 6.9950027,9.0139999 6.9950027,10 0.986,10 C0.70400238,10 0.47000122,9.9060001 0.28100207,9.7180004 0.09400177,9.5300007 0,9.2959995 0,9.0139999 z M3.0050011,0 L9.0140038,0 C9.2960014,0 9.5300026,0.093999863 9.7190018,0.28199956 9.906002,0.47000027 10,0.70399952 10,0.986 L10,6.9949989 C10,7.2770004 9.906002,7.5160007 9.7190018,7.7110004 9.5300026,7.9069996 9.2960014,8.0049992 9.0140038,8.0049992 L3.0050011,8.0049992 C2.7070007,8.0049992 2.4650002,7.9069996 2.2770004,7.7110004 2.0890007,7.5160007 1.9950027,7.2770004 1.9950027,6.9949989 L1.9950027,0.986 C1.9950027,0.70399952 2.0890007,0.47000027 2.2770004,0.28199956 2.4650002,0.093999863 2.7070007,0 3.0050011,0 z',
      tooltip: { content: 'Clone' },
      visible: true,
      offset: 1,
      side: 'Bottom',
      margin: { top: 0, bottom: 0, left: 0, right: 0 },
    },
    {
      name: 'Delete',
      pathData:
        'M0.54700077,2.2130003 L7.2129992,2.2130003 7.2129992,8.8800011 C7.2129992,9.1920013 7.1049975,9.4570007 6.8879985,9.6739998 6.6709994,9.8910007 6.406,10 6.0939997,10 L1.6659999,10 C1.3539997,10 1.0890004,9.8910007 0.87200136,9.6739998 0.65500242,9.4570007 0.54700071,9.1920013 0.54700077,8.8800011 z M2.4999992,0 L5.2600006,0 5.8329986,0.54600048 7.7599996,0.54600048 7.7599996,1.6660004 0,1.6660004 0,0.54600048 1.9270014,0.54600048 z',
      tooltip: { content: 'Delete' },
      visible: true,
      offset: 0,
      side: 'Bottom',
      margin: { top: 0, bottom: 0, left: 0, right: 0 },
    },
    {
      name: 'Draw',
      pathData:
        'M3.9730001,0 L8.9730001,5.0000007 3.9730001,10.000001 3.9730001,7.0090005 0,7.0090005 0,2.9910006 3.9730001,2.9910006 z',
      tooltip: { content: 'Draw' },
      visible: true,
      offset: 0.5,
      side: 'Right',
      margin: { top: 0, bottom: 0, left: 0, right: 0 },
    },
  ];
  
  let drawingNode:any;
let fontColor:any;
let fontFamily:any;
let fontSize:any;
let fontType = [
  { type: 'Arial', text: 'Arial' },
  { type: 'Aharoni', text: 'Aharoni' },
  { type: 'Bell MT', text: 'Bell MT' },
  { type: 'Fantasy', text: 'Fantasy' },
  { type: 'Segoe UI', text: 'Segoe UI' },
  { type: 'Times New Roman', text: 'Times New Roman' },
  { type: 'Verdana', text: 'Verdana' },
];
let fields = { value: 'type', text: 'text' };
const sample_css = `.db-toolbar-container {
    width: 100% ;
   height: 44px;
}
.db-palette-parent {
    background-color:#fafafa;
    width: 255px!important;
    float: left;
    height:calc(100% - 28px);
}
.db-diagram-container {
    width:calc(100% - 260px);
    height: 100%;
    float: right;
}
.e-toolbar .e-toolbar-items .e-toolbar-item.tb-item-selected .e-tbar-btn.e-btn,
.e-toolbar .e-toolbar-items .e-toolbar-item .e-dropdown-btn.tb-item-selected {
    background: #5f6161;
}

.e-toolbar .e-toolbar-items .e-toolbar-item.tb-item-selected .e-tbar-btn .e-icons.e-btn-icon,
.e-toolbar .e-toolbar-items .e-toolbar-item .e-dropdown-btn.tb-item-selected .e-btn-icon {
    color: #ffffff;
}`;



export class GroupandOrder extends SampleBase<{}, {}> {
  rendereComplete() {
    addEvents();
  }
  render() {
    return (
        <div className="control-pane">
        <style>{sample_css}</style>
        <div className="control-section">
          <div style={{ width: '100%' }}>
            <div className="db-toolbar-container">
            <ToolbarComponent
                ref={(toolbar) => (toolbarEditor = toolbar)}

                id="toolbar_diagram"
                clicked={tooledit}
            >
                <ItemsDirective>
                <ItemDirective
                    prefixIcon="e-icons e-group-1"
                    tooltipText="Group"
                    disabled={true}
                />
                <ItemDirective
                    prefixIcon="e-icons e-ungroup-1"
                    tooltipText="UnGroup"
                    disabled={true}
                />
                <ItemDirective type="Separator" />
                <ItemDirective
                    prefixIcon="e-icons e-bring-forward"
                    tooltipText="Bring Forward"
                    disabled={true}
                />
                <ItemDirective
                    prefixIcon="e-icons e-bring-to-front"
                    tooltipText="Bring To Front"
                    disabled={true}
                />
                <ItemDirective
                    prefixIcon="e-icons e-send-backward"
                    tooltipText="Send Backward"
                    disabled={true}
                />
                <ItemDirective
                    prefixIcon="e-icons e-send-to-back"
                    tooltipText="Send To Back"
                    disabled={true}
                />
                <ItemDirective
                    type="Separator"
                    template='<div style="margin-left:1px;"></div>'
                />
                <ItemDirective
                    type="Input"
                    align="Left"
                    tooltipText="Font Style"
                    // disabled={true}
                    template={fontFamilyChange}
                />
                <ItemDirective
                    type="Separator"
                    template='<div style="margin-left:5px;"></div>'
                />
                <ItemDirective
                    tooltipText="Font Size"
                    align="Left"
                    // disabled={true}
                    template={fontSizeChange}
                />
                <ItemDirective
                    tooltipText="Bold"
                    prefixIcon="e-icons e-bold"
                    cssClass="tb-item-start"
                    disabled={true}
                />
                <ItemDirective
                    tooltipText="Italic"
                    prefixIcon="e-icons e-italic"
                    cssClass="tb-item-middle"
                    disabled={true}
                />
                <ItemDirective
                    tooltipText="Underline"
                    prefixIcon="e-icons e-underline"
                    cssClass="tb-item-end"
                    disabled={true}
                />
                <ItemDirective
                    tooltipText="Font Color"
                    align="Left"
                    template={fontColors}
                    // disabled={true}
                />
                </ItemsDirective>
            </ToolbarComponent>
            </div>
            <div className="sb-mobile-palette-bar">
              <div
                id="palette-icon"
                style={{ float: 'right' }}
                className="e-ddb-icons1 e-toggle-palette"
              ></div>
            </div>
            <div id="palette-space" className="db-palette-parent">
              <SymbolPaletteComponent
                id="symbolpalette"
                expandMode="Multiple"
                palettes={[
                  {
                    id: 'Basic',
                    expanded: true,
                    symbols: basicShapes,
                    title: 'Basic Shapes',
                  },
                ]}
                width={'100%'}
                height={'500px'}
                symbolHeight={50}
                symbolWidth={50}
                symbolMargin={{ left: 5, right: 5, top: 5, bottom: 10 }}
              />
            </div>
            <div id="diagram-space" className="db-diagram-container">
              <DiagramComponent
                id="diagram"
                ref={(diagram) => (diagramInstance = diagram)}
                width={'100%'}
                height={'500px'}
                selectedItems={{
                  constraints: SelectorConstraints.UserHandle,
                  userHandles: handles,
                }}
                rulerSettings={{ showRulers: true }}
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
                      diagramInstance.selectedItems.connectors
                    );
                    if (selectedItems.length === 0) {
                      toolbarEditor.items[0].disabled = true;
                      toolbarEditor.items[1].disabled = true;
                      toolbarEditor.items[3].disabled = true;
                      toolbarEditor.items[4].disabled = true;
                      toolbarEditor.items[5].disabled = true;
                      toolbarEditor.items[6].disabled = true;
                    //   toolbarEditor.items[8].disabled = true;
                    //   toolbarEditor.items[10].disabled = true;
                      toolbarEditor.items[11].disabled = true;
                      toolbarEditor.items[12].disabled = true;
                      toolbarEditor.items[13].disabled = true;
                    //   toolbarEditor.items[14].disabled = true;
                    }
                    if (selectedItems.length === 1) {
                      enableItems();
                      disableMultiselectedItems(selectedItems);
  
                      if (
                        selectedItems[0].children !== undefined &&
                        selectedItems[0].children.length > 0
                      ) {
                        toolbarEditor.items[1].disabled = false;
                        disableMultiselectedItems(selectedItems);
                      } else {
                        toolbarEditor.items[1].disabled = true;
                      }
                    }
                    if (selectedItems.length > 1) {
                      enableItems();
                      toolbarEditor.items[0].disabled = false;
                      toolbarEditor.items[1].disabled = true;
                      disableMultiselectedItems(selectedItems);
                    }
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
                }}
                drawingObject={{ type: 'Orthogonal' }}
                nodes={nodes} //Sets the default values of a node
              />
            </div>
          </div>
        </div>
        <div id="action-description">
        <p>
            This sample illustrates how to group, ungroup, and order commands with the diagram.
        </p>
        </div>
        <div id="description">
            <p>
                The <code>group</code> method groups diagram nodes and connectors into a single entity.
            </p>
            <p>
                The <code>unGroup</code> method ungroups nodes and/or connectors that have been previously grouped together using the group method.
            </p>
            <p> 
                The <code>moveForward</code> and <code>bringToFront</code> methods adjust the visual order of nodes or connectors within a diagram. This method takes a single parameter that specifies the node or connector that you want to bring forward in the order. 
            </p>
            <p>
                The <code>sendBackward</code> and <code>sendToBack</code> method allows you to send a selected object to the back of the z-order (the order in which objects are stacked on top of one another).
            </p>
            <p>
                In this sample, node annotation styles such as font family, font size, bold, italic, underline, and fontcolor can be customized.
            </p>
            <br />
        </div>
      </div>
    );
  }
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

  function tooledit(args:any) {
    switch (args.item.tooltipText) {
      case 'Group':
        diagramInstance.group();
        toolbarEditor.items[0].disabled = true;
        toolbarEditor.items[1].disabled = false;
        break;
      case 'UnGroup':
        diagramInstance.unGroup();
        break;
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
      case 'Bold':
        updateAnnotationValue('bold', args.value, null);
        break;
      case 'Italic':
        updateAnnotationValue('italic', args.value, null);
        break;
      case 'Underline':
        updateAnnotationValue('underline', args.value, null);
        break;
    }
    diagramInstance.dataBind();
  }

  function updateAnnotationValue(
    value:any,
    fontSize?:any,
    fontFamily?:any,
  ) {
    for (let i:number = 0; i < diagramInstance.selectedItems.nodes.length; i++) {
      let node = diagramInstance.selectedItems.nodes[i];
      for (let j:number = 0; j < node.annotations.length; j++) {
        let annotationstyle:any = node.annotations[j].style;
        if (value === 'fontsize') {
          annotationstyle.fontSize = fontSize;
        } else if (value === 'fontfamily') {
          annotationstyle.fontFamily = fontFamily.toString();
        } else if (value === 'bold') {
          annotationstyle.bold = !annotationstyle.bold;
        } else if (value === 'italic') {
          annotationstyle.italic = !annotationstyle.italic;
        } else if (value === 'underline') {
          if (annotationstyle.textDecoration === 'None') {
            annotationstyle.textDecoration = 'Underline';
          } else {
            annotationstyle.textDecoration = 'None';
          }
        }
        diagramInstance.dataBind();
      }
    }
  }

  function enableItems() {
    toolbarEditor.items[3].disabled = false;
    toolbarEditor.items[4].disabled = false;
    toolbarEditor.items[5].disabled = false;
    toolbarEditor.items[6].disabled = false;
  }

  function disableMultiselectedItems(selectedItems:any) {
    for (let i:number = 0; i < selectedItems.length; i++) {
      if (selectedItems[i].annotations[0] !== undefined) {
        // toolbarEditor.items[8].disabled = false;
        // toolbarEditor.items[10].disabled = false;
        toolbarEditor.items[11].disabled = false;
        toolbarEditor.items[12].disabled = false;
        toolbarEditor.items[13].disabled = false;
        // toolbarEditor.items[14].disabled = false;
      } else {
        // toolbarEditor.items[8].disabled = true;
        // toolbarEditor.items[10].disabled = true;
        toolbarEditor.items[11].disabled = true;
        toolbarEditor.items[12].disabled = true;
        toolbarEditor.items[13].disabled = true;
        // toolbarEditor.items[14].disabled = true;
      }
    }
}

  function fontFamilyChange() {
    return (
      <div className="col-xs-4 column-style">
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
  function fontSizeChange() {
    return (
      <div className="col-xs-4 column-style">
        <NumericTextBoxComponent
          id="fontSize"
          width={'90px'}
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
  function fontColors() {
    return (
      <div className="col-xs-4 column-style">
        <ColorPickerComponent
          id="fontcolor"
          value="#000"
          mode="Palette"
          change={(arg) => {
            for (
              let i:number = 0;
              i < diagramInstance.selectedItems.nodes.length;
              i++
            ) {
              let nodes:any = diagramInstance.selectedItems.nodes[i];
              for (let j:number = 0; j < nodes.annotations.length; j++) {
                nodes.annotations[j].style.color = arg.currentValue.rgba;
                diagramInstance.dataBind();
              }
            }
          }}
          ref={(fontcolor) => (fontColor = fontcolor)}
        />
      </div>
    );
  }