import * as ReactDOM from "react-dom";
import * as React from "react";
import "./font-icons.css";
import {
  DiagramComponent,
  Diagram,
  Inject,
  DataBinding,
  ISelectionChangeEventArgs,
  UndoRedo,
  BpmnDiagrams,
  NodeConstraints,
  NodeModel,
  IHistoryChangeArgs
} from "@syncfusion/ej2-react-diagrams";
import { SampleBase } from "../common/sample-base";
import {
    ToolbarComponent,
  } from '@syncfusion/ej2-react-navigations';
  Diagram.Inject(DataBinding, UndoRedo, BpmnDiagrams);

let diagramInstance: DiagramComponent;
let toolbarEditor:ToolbarComponent;
//Initializes the nodes for the diagram
let nodes:NodeModel[] = [
    {
      shape: { type: 'Text', content: 'Select the below shapes' },
      constraints: NodeConstraints.PointerEvents,
      style: {
        fontSize: 10,
        fill: 'None',
        fontFamily: 'sans-serif',
        strokeWidth: 0,
      },
      offsetX: 150,
      offsetY: 40,
    },
    {
      id: 'node1',
      width: 60,
      height: 40,
      offsetX: 150,
      offsetY: 100,
      style: { fill: '#DAEBFF', strokeColor: 'white' },
    },
    {
      id: 'node2',
      width: 80,
      height: 40,
      offsetX: 150,
      offsetY: 170,
      style: { fill: '#F5E0F7', strokeColor: 'white' },
    },
    {
      id: 'node3',
      width: 100,
      height: 40,
      offsetX: 150,
      offsetY: 240,
      style: { fill: '#E0E5BB', strokeColor: 'white' },
    },
    {
      shape: {
        type: 'Text',
        content:
          'Try Alignment Commandss(AlignRight, AlignLeft \n and AlignCenter)',
      },
      constraints: NodeConstraints.PointerEvents,
      style: {
        fontSize: 10,
        fill: 'None',
        fontFamily: 'sans-serif',
        strokeWidth: 0,
      },
      offsetX: 150,
      offsetY: 310,
    },
    {
      shape: { type: 'Text', content: 'Select the below shapes' },
      constraints: NodeConstraints.PointerEvents,
      style: {
        fontSize: 10,
        fill: 'None',
        fontFamily: 'sans-serif',
        strokeWidth: 0,
      },
      offsetX: 150,
      offsetY: 380,
    },
    {
      id: 'node4',
      width: 40,
      height: 60,
      offsetX: 80,
      offsetY: 470,
      style: { fill: '#DAEBFF', strokeColor: 'white' },
    },
    {
      id: 'node5',
      width: 40,
      height: 80,
      offsetX: 160,
      offsetY: 470,
      style: { fill: '#F5E0F7', strokeColor: 'white' },
    },
    {
      id: 'node6',
      width: 40,
      height: 100,
      offsetX: 240,
      offsetY: 470,
      style: { fill: '#E0E5BB', strokeColor: 'white' },
    },
    {
      shape: {
        type: 'Text',
        content:
          'Try Alignment Commandss(AlignTop, AlignBottom \n and AlignMiddle)',
      },
      constraints: NodeConstraints.PointerEvents,
      style: {
        fontSize: 10,
        fill: 'None',
        fontFamily: 'sans-serif',
        strokeWidth: 0,
      },
      offsetX: 150,
      offsetY: 550,
    },
    {
      shape: { type: 'Text', content: 'Select the below shapes' },
      constraints: NodeConstraints.PointerEvents,
      style: {
        fontSize: 10,
        fill: 'None',
        fontFamily: 'sans-serif',
        strokeWidth: 0,
      },
      offsetX: 550,
      offsetY: 40,
    },
    {
      id: 'node7',
      width: 80,
      height: 40,
      offsetX: 475,
      offsetY: 100,
      style: { fill: '#DAEBFF', strokeColor: 'white' },
    },
    {
      id: 'node8',
      width: 80,
      height: 40,
      offsetX: 625,
      offsetY: 100,
      style: { fill: '#F5E0F7', strokeColor: 'white' },
    },
    {
      id: 'node9',
      width: 80,
      height: 40,
      offsetX: 595,
      offsetY: 180,
      style: { fill: '#E0E5BB', strokeColor: 'white' },
    },
    {
      shape: { type: 'Text', content: 'Try SpaceAcross Commands' },
      constraints: NodeConstraints.PointerEvents,
      style: {
        fontSize: 10,
        fill: 'None',
        fontFamily: 'sans-serif',
        strokeWidth: 0,
      },
      offsetX: 550,
      offsetY: 240,
    },
    {
      shape: { type: 'Text', content: 'Select the below shapes' },
      constraints: NodeConstraints.PointerEvents,
      style: {
        fontSize: 10,
        fill: 'None',
        fontFamily: 'sans-serif',
        strokeWidth: 0,
      },
      offsetX: 550,
      offsetY: 320,
    },
    {
      id: 'node10',
      width: 80,
      height: 40,
      offsetX: 475,
      offsetY: 400,
      style: { fill: '#DAEBFF', strokeColor: 'white' },
    },
    {
      id: 'node11',
      width: 80,
      height: 40,
      offsetX: 475,
      offsetY: 500,
      style: { fill: '#F5E0F7', strokeColor: 'white' },
    },
    {
      id: 'node12',
      width: 80,
      height: 40,
      offsetX: 625,
      offsetY: 430,
      style: { fill: '#E0E5BB', strokeColor: 'white' },
    },
    {
      shape: { type: 'Text', content: 'Try SpaceAcross Commands' },
      constraints: NodeConstraints.PointerEvents,
      style: {
        fontSize: 10,
        fill: 'None',
        fontFamily: 'sans-serif',
        strokeWidth: 0,
      },
      offsetX: 550,
      offsetY: 550,
    },
    {
      shape: { type: 'Text', content: 'Select the below shapes' },
      constraints: NodeConstraints.PointerEvents,
      style: {
        fontSize: 10,
        fill: 'None',
        fontFamily: 'sans-serif',
        strokeWidth: 0,
      },
      offsetX: 950,
      offsetY: 40,
    },
    {
      id: 'RightTriangle',
      width: 100,
      height: 100,
      offsetX: 950,
      offsetY: 120,
      style: { fill: '#E0E5BB', strokeColor: 'white' },
      shape: { type: 'Basic', shape: 'RightTriangle' },
    },
    {
      shape: { type: 'Text', content: 'Try Flip Commands' },
      constraints: NodeConstraints.PointerEvents,
      style: {
        fontSize: 10,
        fill: 'None',
        fontFamily: 'sans-serif',
        strokeWidth: 0,
      },
      offsetX: 950,
      offsetY: 240,
    },
    {
      shape: { type: 'Text', content: 'Select the below shapes' },
      constraints: NodeConstraints.PointerEvents,
      style: {
        fontSize: 10,
        fill: 'None',
        fontFamily: 'sans-serif',
        strokeWidth: 0,
      },
      offsetX: 950,
      offsetY: 300,
    },
    {
      id: 'node14',
      width: 60,
      height: 20,
      offsetX: 950,
      offsetY: 350,
      style: { fill: '#DAEBFF', strokeColor: 'white' },
    },
    {
      id: 'node15',
      width: 80,
      height: 40,
      offsetX: 950,
      offsetY: 420,
      style: { fill: '#F5E0F7', strokeColor: 'white' },
    },
    {
      id: 'node16',
      width: 100,
      height: 50,
      offsetX: 950,
      offsetY: 500,
      style: { fill: '#E0E5BB', strokeColor: 'white' },
    },
    {
      shape: { type: 'Text', content: 'Try Sizing Commands' },
      constraints: NodeConstraints.PointerEvents,
      style: {
        fontSize: 10,
        fill: 'None',
        fontFamily: 'sans-serif',
        strokeWidth: 0,
      },
      offsetX: 950,
      offsetY: 550,
    },
  ];
  let toolbarItems:any = [
    {
      prefixIcon: 'e-icons e-cut',
      tooltipText: 'Cut',
      disabled: true,
    },
    {
      prefixIcon: 'e-icons e-copy',
      tooltipText: 'Copy',
      disabled: true,
    },
    {
      prefixIcon: 'e-icons e-paste',
      tooltipText: 'Paste',
      disabled: true,
    },
    {
      prefixIcon: 'e-icons e-undo',
      tooltipText: 'Undo',
      disabled: true,
    },
    {
      prefixIcon: 'e-icons e-redo',
      tooltipText: 'Redo',
      disabled: true,
    },
    {
      type: 'Separator',
    },
    {
      prefixIcon: 'sf-diagram-icon-align-left-1',
      tooltipText: 'Align Left',
      disabled: true,
    },
    {
      prefixIcon: 'sf-diagram-icon-align-center-1',
      tooltipText: 'Align Center',
      disabled: true,
    },
    {
      prefixIcon: 'sf-diagram-icon-align-right-1',
      tooltipText: 'Align Right',
      disabled: true,
    },
    {
      prefixIcon: 'sf-diagram-icon-align-top-1',
      tooltipText: 'Align Top',
      disabled: true,
    },
    {
      prefixIcon: 'sf-diagram-icon-align-middle-1',
      tooltipText: 'Align Middle',
      disabled: true,
    },
    {
      prefixIcon: 'sf-diagram-icon-align-bottom-1',
      tooltipText: 'Align Bottom',
      disabled: true,
    },
    {
      type: 'Separator',
    },
    {
      prefixIcon: 'e-icons e-transform-right',
      tooltipText: 'Rotate Right',
      disabled: true,
    },
    {
      prefixIcon: 'e-icons e-transform-left',
      tooltipText: 'Rotate Left',
      disabled: true,
    },
    {
      type: 'Separator',
    },
    {
      prefixIcon: 'e-icons e-flip-vertical',
      tooltipText: 'Flip Vertical',
      disabled: true,
    },
    {
      prefixIcon: 'e-icons e-flip-horizontal',
      tooltipText: 'Flip Horizontal',
      disabled: true,
    },
    {
      type: 'Separator',
    },
    {
      prefixIcon: 'sf-diagram-icon-distribute-horizontal',
      tooltipText: 'Distribute Objects Horizontally',
      disabled: true,
    },
    {
      prefixIcon: 'sf-diagram-icon-distribute-vertical',
      tooltipText: 'Distribute Objects Vertically',
      disabled: true,
    },
    {
      type: 'Separator',
    },
    {
      prefixIcon: 'sf-diagram-icon-same-width',
      tooltipText: 'Same Width',
      disabled: true,
    },
    {
      prefixIcon: 'sf-diagram-icon-same-height',
      tooltipText: 'Same Height',
      disabled: true,
    },
    {
      prefixIcon: 'sf-diagram-icon-same-size',
      tooltipText: 'Same Size',
      disabled: true,
    },
  ];
export class CommandsSample extends SampleBase<{}, {}> {
  render() {
    return (
        <div className="control-pane">
        <div className="control-section">
          <div className="db-toolbar-container">
            <ToolbarComponent
              ref={(toolbar) => (toolbarEditor = toolbar)}
              id="toolbar_diagram"
              clicked={toolbarClick}
              items={toolbarItems}
              overflowMode={'Scrollable'}
              width={'100%'}
            ></ToolbarComponent>
          </div>
          <div style={{ width: '100%' }}>
            <DiagramComponent
              id="diagram"
              ref={(diagram) => (diagramInstance = diagram)}
              width={'100%'}
              height={'800px'}
              rulerSettings={{ showRulers: true }}
              nodes={nodes}
              historyChange={(args:IHistoryChangeArgs) => {
                historyChange(args);
              }}
              selectionChange={(args:ISelectionChangeEventArgs) => {
                selectionChange(args);
              }}
            >
              <Inject services={[UndoRedo, DataBinding, BpmnDiagrams]} />
            </DiagramComponent>
          </div>
        </div>
        <div id="action-description">
        <p>
            This example illustrates the various commands supported in the diagram control.
        </p>
        </div>
        <div id="description">
            <p>
                The align commands enable you to align selected objects such as nodes and connectors with respect to the selection boundary. The alignment options are left, right, center, middle, top, and bottom. Use the <code>align</code> method with the four mentioned parameters to align objects.
            </p>
            <p>
                The sizing command changes the size of selected nodes with respect to the first selected object. The sizing options are same size (same height and width), same width, and same height. Use the <code>sameSize</code> method and pass <code>SizingOptions</code> such as height, width, and size as a parameter in it.
            </p>
            <p> 
                The distribute command is used to equally space the nodes vertically or horizontally within the selected boundary. Use the <code>distribute</code> method with the <code>DistributeOptions</code> as the parameter.
            </p>
            <p>
                The clipboard commands are used to cut, copy, or paste   selected elements. The <code>cut</code> command removes the selected diagram elements and copies them to the clipboard; <code>copy</code> duplicates the selected diagram elements and copies them to the clipboard; and <code>paste</code> adds diagram elements from the clipboard to the diagram.
                The flip command is used to give a horizontal or vertical mirror image of the selected node. Use <code>flip</code> and <code>flipMode</code> properties to flip a node along with the port and label.
            </p>
            <br />
        </div>
      </div>
    );
  }
}
function historyChange(args:any) {
    // Check if undo stack is empty or not
    if (diagramInstance.historyManager.undoStack.length > 0) {
      toolbarEditor.items[3].disabled = false;
    } else {
      toolbarEditor.items[3].disabled = true;
    }
    // Check if redo stack is empty or not
    if (diagramInstance.historyManager.redoStack.length > 0) {
      toolbarEditor.items[4].disabled = false;
    } else {
      toolbarEditor.items[4].disabled = true;
    }
  }

  function selectionChange(args:any) {
    if (args.state === 'Changed') {
      if (args.type === 'Addition') {
        if (args.newValue.length > 0) {
          onClickDisable(false, args.newValue);
        }
      } else {
        onClickDisable(true, args.newValue);
      }
    }
  }

  function onClickDisable(args:any, selectedItems:any) {
    if (args === false) {
      toolbarEditor.items[0].disabled = false;
      toolbarEditor.items[1].disabled = false;
      toolbarEditor.items[13].disabled = false;
      toolbarEditor.items[14].disabled = false;
      if (selectedItems.length === 1) {
        toolbarEditor.items[16].disabled =
          selectedItems[0].id === 'RightTriangle' ? false : true;
        toolbarEditor.items[17].disabled =
          selectedItems[0].id === 'RightTriangle' ? false : true;
        disableCommonItems(true);
      } else if (selectedItems.length > 1) {
        disableCommonItems(false);
      }
    } else {
      toolbarEditor.items[0].disabled = true;
      toolbarEditor.items[1].disabled = true;
      toolbarEditor.items[13].disabled = true;
      toolbarEditor.items[14].disabled = true;
      toolbarEditor.items[16].disabled = true;
      toolbarEditor.items[17].disabled = true;
      disableCommonItems(true);
    }
  }
  function disableCommonItems(args:any) {
    toolbarEditor.items[6].disabled = args;
    toolbarEditor.items[7].disabled = args;
    toolbarEditor.items[8].disabled = args;
    toolbarEditor.items[9].disabled = args;
    toolbarEditor.items[10].disabled = args;
    toolbarEditor.items[11].disabled = args;
    toolbarEditor.items[19].disabled = args;
    toolbarEditor.items[20].disabled = args;
    toolbarEditor.items[22].disabled = args;
    toolbarEditor.items[23].disabled = args;
    toolbarEditor.items[24].disabled = args;
  }
  function toolbarClick(args:any) {
    var item = args.item.tooltipText;
    switch (args.item.tooltipText) {
      case 'Cut':
        diagramInstance.cut();
        toolbarEditor.items[2].disabled = false;
        break;
      case 'Copy':
        diagramInstance.copy();
        toolbarEditor.items[2].disabled = false;
        break;
      case 'Paste':
        diagramInstance.paste();
        break;
      case 'Undo':
        diagramInstance.undo();
        break;
      case 'Redo':
        diagramInstance.redo();
        break;
      case 'Align Left':
      case 'Align Right':
      case 'Align Top':
      case 'Align Bottom':
      case 'Align Middle':
      case 'Align Center':
        var alignType = item.replace('Align', '');
        var alignType1 = alignType.charAt(0).toUpperCase() + alignType.slice(1);
        diagramInstance.align(alignType1.trim());
        break;
      case 'Rotate Right':
        diagramInstance.rotate(diagramInstance.selectedItems, 90);
        break;
      case 'Rotate Left':
        diagramInstance.rotate(diagramInstance.selectedItems, -90);
        break;
      case 'Flip Vertical':
        flipObjects(item);
        break;
      case 'Flip Horizontal':
        flipObjects(item);
        break;
      case 'Distribute Objects Horizontally':
        diagramInstance.distribute('RightToLeft');
        break;
      case 'Distribute Objects Vertically':
        diagramInstance.distribute('BottomToTop');
        break;
      case 'Same Width':
        diagramInstance.sameSize('Width', diagramInstance.selectedItems.nodes);
        break;
      case 'Same Height':
        diagramInstance.sameSize('Height', diagramInstance.selectedItems.nodes);
        break;
      case 'Same Size':
        diagramInstance.sameSize('Size', diagramInstance.selectedItems.nodes);
        break;
    }
  }

  function flipObjects(flipType:any) {
    let selectedObjects:any = diagramInstance.selectedItems.nodes.concat(
      (diagramInstance.selectedItems as any).connectors
    );
    for (let i = 0; i < selectedObjects.length; i++) {
      selectedObjects[i].flip =
        flipType === 'Flip Horizontal' ? 'Horizontal' : 'Vertical';
    }
    diagramInstance.dataBind();
  }