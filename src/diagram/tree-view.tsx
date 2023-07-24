import * as ReactDOM from "react-dom";
import * as React from "react";
import {
  DiagramComponent,
  IDragEnterEventArgs,
  NodeModel,
  ConnectorModel,
  Node,
  NodeConstraints,
  ISelectionChangeEventArgs,
  UndoRedo,
  Inject,
  SnapConstraints,
  DataBinding,
  HierarchicalTree,
  Diagram,
  IClickEventArgs,
  ITextEditEventArgs,
  IDropEventArgs,
} from "@syncfusion/ej2-react-diagrams";
import { SampleBase } from "../common/sample-base";
import { DataManager, Query } from '@syncfusion/ej2-data';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import "./font-icons.css";
import { TreeViewComponent } from "@syncfusion/ej2-react-navigations";

let diagramInstance: DiagramComponent;

let workingData:object[] = [
    { Name: 'Plant Manager', Id: '1', hasChild: true, expanded: true },
    {
      Name: 'Production Manager',
      Id: '2',
      ParentId: '1',
      hasChild: true,
      expanded: true,
    },
    {
      Name: 'Control Room',
      Id: '3',
      ParentId: '2',
      hasChild: true,
      expanded: true,
    },
    { Name: 'Foreman1', Id: '4', ParentId: '3', hasChild: true, expanded: true },
    { Name: 'Craft Personnel5', Id: '5', ParentId: '4' },
    { Name: 'Craft Personnel6', Id: '6', ParentId: '4' },
    {
      Name: 'Plant Operator',
      Id: '7',
      ParentId: '2',
      hasChild: true,
      expanded: true,
    },
    { Name: 'Foreman2', Id: '8', ParentId: '7', hasChild: true, expanded: true },
    { Name: 'Craft Personnel7', Id: '9', ParentId: '8' },
    { Name: 'Administrative Officer', Id: '10', ParentId: '1' },
    {
      Name: 'Maintenance Manager',
      Id: '11',
      ParentId: '1',
      hasChild: true,
      expanded: true,
    },
    {
      Name: 'Electrical Supervisor',
      Id: '12',
      ParentId: '11',
      hasChild: true,
      expanded: true,
    },
    { Name: 'Craft Personnel1', Id: '13', ParentId: '12' },
    { Name: 'Craft Personnel2', Id: '14', ParentId: '12' },
    {
      Name: 'Mechanical Supervisor',
      Id: '15',
      ParentId: '11',
      hasChild: true,
      expanded: true,
    },
    { Name: 'Craft Personnel3', Id: '16', ParentId: '15' },
    { Name: 'Craft Personnel4', Id: '17', ParentId: '15' },
  ];
  let items: DataManager = new DataManager(workingData as JSON[], new Query().take(7));
  let index = 1;
  let btnobj:ButtonComponent;
  let addobj:ButtonComponent;
  let treeObj:TreeViewComponent;
  let targetNodeId:any;
  let elementNodeId:any;
  let fields:Object  = {
    dataSource: workingData,
    id: 'Id',
    text: 'Name',
    parentID: 'ParentId',
    hasChildren: 'hasChild',
  };


export class TreeviewSample extends SampleBase<{}, {}> {
  rendereComplete() {
  }
  render() {
    return (
    <div className="control-pane">
      <div className="control-section row uploadpreview">
        <div style={{ width: '100%', height: '50px', marginBottom: '5px' }}>
          <div className="group-button" style={{ width: '70%', float: 'left' }}>
            <ButtonComponent
              ref={(scope) => {
                addobj = scope;
              }}
              isPrimary={true}
              created={created1}
              onClick={add}
            >
              Add Node
            </ButtonComponent>
            <ButtonComponent
              ref={(scope) => {
                btnobj = scope;
              }}
              created={created2}
              isPrimary={true}
              onClick={remove}
            >
              Delete Node
            </ButtonComponent>
          </div>
          <div style={{ width: '30%', float: 'right', fontSize: '16px' }}>
            <div
              className="col-xs-9 db-col-right db-prop-text-style"
              style={{ paddingTop: '10px' }}
            >
              <span style={{ marginLeft: '10px' }}>
                Diagram Binding with Treeview
              </span>
            </div>
            <div className="col-xs-3 db-col-left">
              <svg height="45" width="47">
                <path
                  d="M27.573,21.885726 C26.039659,21.885726 24.796639,23.128786 24.796639,24.662178 L24.796639,37.3311 C24.796639,38.864491 26.039659,40.107552 27.573,40.107552 L40.064701,40.107552 C41.598042,40.107552 42.841061,38.864491 42.841061,37.3311 L42.841061,24.662178 C42.841061,23.128786 41.598042,21.885726 40.064701,21.885726 z M3.9060001,2.3436508 C2.9710598,2.3436508 2.2131386,3.1015863 2.2131386,4.0365477 L2.2131386,11.76122 C2.2131386,12.69618 2.9710598,13.454117 3.9060001,13.454117 L11.522699,13.454117 C12.457641,13.454117 13.21556,12.69618 13.21556,11.76122 L13.21556,4.0365477 C13.21556,3.1015863 12.457641,2.3436508 11.522699,2.3436508 z M2.7341995,0 L12.8898,0 C14.399857,0 15.624,1.2241688 15.624,2.7342587 L15.624,12.737741 C15.624,14.247831 14.399857,15.472 12.8898,15.472 L8.75,15.472 8.75,29.653 21.167,29.653 21.167,22.526347 C21.167,20.049711 23.174645,18.042 25.6512,18.042 L42.306801,18.042 C44.783356,18.042 46.791,20.049711 46.791,22.526347 L46.791,38.932653 C46.791,41.40929 44.783356,43.417 42.306801,43.417 L25.6512,43.417 C23.174645,43.417 21.167,41.40929 21.167,38.932653 L21.167,32.403 7.3190002,32.403 C6.5596085,32.403 5.9440002,31.787392 5.9440002,31.028 5.9440002,30.933076 5.953619,30.840399 5.9719353,30.75089 L6,30.641743 6,15.472 2.7341995,15.472 C1.2241421,15.472 0,14.247831 0,12.737741 L0,2.7342587 C0,1.2241688 1.2241421,0 2.7341995,0 z"
                  fill="#FF8FABCA"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="content-wrapper" style={{ width: '100%' }}>
          <div
            id="palette-space"
            style={{
              width: '27%',
              float: 'left',
              height: '700px',
              overflow: 'hidden',
            }}
          >
            <div id="tree" style={{ width: '90%' }}>
              <TreeViewComponent
                fields={fields}
                ref={(treeview) => {
                  treeObj = treeview;
                }}
                allowEditing={true}
                keyPress={keyPress}
                nodeEdited={nodeEdited}
                nodeSelected={nodeSelected}
                allowDragAndDrop={true}
                nodeClicked={nodeClicked}
              />
            </div>
          </div>
          <div id="diagram-space" style={{ width: '72%', float: 'right' }}>
            <DiagramComponent
              id="diagram"
              ref={(diagram) => (diagramInstance = diagram)}
              width={'100%'}
              height={'700px'}
              snapSettings={{ constraints: SnapConstraints.None }}
              dataSourceSettings={{
                id: 'Id',
                parentId: 'ParentId',
                dataSource: items,
                doBinding: (  nodeModel: NodeModel,
                    data: object,
                    diagram: Diagram) => {
                  nodeModel.id = (data as any).Id;
                },
              }}
              layout={{
                type: 'HierarchicalTree',
                verticalSpacing: 50,
                horizontalSpacing: 40,
                enableAnimation: true,
              }}
              getNodeDefaults={(node:Node) => {
                node.width = 100;
                node.height = 40;
                node.style = {
                  strokeWidth: 1,
                  strokeColor: 'whitesmoke',
                  fill: 'CornflowerBlue',
                };
                node.annotations = [
                  { content: (node.data as any).Name, style: { color: 'white' } },
                ];
                node.constraints =
                  NodeConstraints.Default | NodeConstraints.AllowDrop;
                return node;
              }} //Sets the default values of a connector
              getConnectorDefaults={(obj:ConnectorModel) => {
                obj.type = 'Orthogonal';
                obj.style = { strokeColor: 'CornflowerBlue' };
                obj.targetDecorator = {
                  shape: 'Arrow',
                  height: 10,
                  width: 10,
                  style: { fill: 'CornflowerBlue', strokeColor: 'white' },
                };
              }}
              selectionChange={(args:ISelectionChangeEventArgs) => {
                if (args.state === 'Changed') {
                  if (args.type === 'Addition') {
                    btnobj.disabled = false;
                    addobj.disabled = false;
                  } else {
                    btnobj.disabled = true;
                    addobj.disabled = true;
                  }
                }
              }}
              click={(args:IClickEventArgs) => {
                if (args.element instanceof Node) {
                  treeObj.selectedNodes = [(args.element as any).data.Id];
                }
              }}
              textEdit={(args:ITextEditEventArgs) => {
                setTimeout(function () {
                  if (args.annotation) {
                    elementNodeId = args.element.id;
                    let tempData:any = workingData.filter(checkElementData);
                    let node = treeObj.getNode(tempData[0].Id);
                    treeObj.updateNode(tempData[0].Id, args.annotation.content);
                  }
                }, 0);
              }}
              drop={(args:IDropEventArgs) => {
                let connector:any;
                let tempData:any;
                setTimeout(function () {
                  targetNodeId = (args.target as any).id;
                  tempData = workingData.filter(checkData);
                  if (tempData.length > 0) {
                    tempData[0].hasChild = true;
                    tempData[0].expanded = true;
                  }
                  if ((args.element as any).inEdges.length === 0) {
                    let id:any = (args.element as any).id;
                    let item:any = {
                      Name: (args.element as any).annotations[0].content,
                      Id: (args.element as any).id,
                      ParentId: targetNodeId,
                      hasChild: false,
                      expanded: false,
                    };
                    treeObj.addNodes([item], targetNodeId, null);
                    connector = { sourceID: targetNodeId, targetID: id };
                    diagramInstance.add(connector);
                    diagramInstance.doLayout();
                    index++;
                    workingData.push(item);
                  } else {
                    connector = diagramInstance.getObject(
                      (args.element as any).inEdges[0]
                    );
                    connector.sourceID = targetNodeId;
                    diagramInstance.dataBind();
                    diagramInstance.doLayout();
                    elementNodeId = (args.element as any).id;
                    tempData = workingData.filter(checkElementData);
                    tempData[0].ParentId = targetNodeId;
                    treeObj.fields = {
                      dataSource: workingData as any,
                      id: 'Id',
                      text: 'Name',
                      parentID: 'ParentId',
                      hasChildren: 'hasChild',
                    };
                    treeObj.refresh();
                  }
                }, 0);
              }}
              dragEnter={(args:IDragEnterEventArgs) => {
                let lable:any = '';
                if (args.dragData) {
                  lable = (args.dragData as any).text;
                }
                let node = {
                  id: 'node' + index,
                  data: { Name: lable, Id: 'node' + index },
                  annotations: [{ content: lable }],
                };
                args.dragItem = node;
              }}
            >
              <Inject services={[UndoRedo, DataBinding, HierarchicalTree]} />
            </DiagramComponent>
          </div>
        </div>
      </div>
       <div id="action-description">
            <p>
                This example illustrates how to create a tree view and a diagram with a datasource. It provides support for selecting, adding, deleting, dragging and dropping, and editing annotations of the nodes during runtime. These actions will be reflected in the corresponding nodes of the tree view component. 
            </p>
       </div>
        <div id="description">
            <p>
                When a node is added or removed in a Diagram during runtime, the added or removed node is reflected in the tree view component. When an annotation in the diagram is changed it should also be updated in the treeView by using treeview updateNode method. When editing a text in a treeview, use selectedItems to update it in the diagram. You can drag text from the treeview and drop it onto the node in the diagram. Also, you can perform drag and drop operations in the diagram.   
            </p>
            <br />
        </div>
    </div>
    );
  }
}

function add():any {
    let nodeId:any;
    if (diagramInstance.selectedItems.nodes.length > 0) {
      nodeId = diagramInstance.selectedItems.nodes[0].id;
      addNode(nodeId);
    } else if (treeObj.selectedNodes.length > 0) {
      nodeId = treeObj.selectedNodes[0];
      addNode(nodeId);
    }
  }

  function remove():any{
    let nodeId:any;
    if (diagramInstance.selectedItems.nodes.length > 0) {
      nodeId = diagramInstance.selectedItems.nodes[0].id;
      removeSubChild(diagramInstance.selectedItems.nodes[0], true);
      diagramInstance.doLayout();
    } else if (treeObj.selectedNodes.length > 0) {
      nodeId = treeObj.selectedNodes[0];
      treeObj.removeNodes([nodeId]);
      let node = diagramInstance.getObject(nodeId);
      removeSubChild(node, false);
    }
    for (let i:number = workingData.length - 1; i >= 0; i--) {
      if ((workingData[i] as any).id === nodeId) {
        workingData.splice(i, 1);
      }
    }
    diagramInstance.doLayout();
  }

  function removeSubChild(node:any, canDelete:any) {
    let childNode:any;
    let connector:any;
    for (let i:number = node.outEdges.length - 1; i >= 0; i--) {
      connector = diagramInstance.getObject(node.outEdges[i]);
      childNode = diagramInstance.getObject(connector.targetID);
      if (childNode != null && childNode.outEdges.length > 0) {
        removeSubChild(childNode, canDelete);
      } else {
        diagramInstance.remove(childNode);
        if (canDelete) {
          treeObj.removeNodes([childNode.id]);
        }
        for (let j:number = workingData.length - 1; j >= 0; j--) {
          if ((workingData[j] as any).id === childNode.id) {
            workingData.splice(j, 1);
          }
        }
      }
    }
    for (let k:number = node.inEdges.length - 1; k >= 0; k--) {
    let connector:any = diagramInstance.getObject(node.inEdges[k]);
      let childNode:any = diagramInstance.getObject(connector.sourceID);
      let index:any = childNode.outEdges.indexOf(connector.id);
      if (childNode.outEdges.length > 1 && index === 0) {
        index = childNode.outEdges.length;
      }
      if (index > 0) {
        let node1:any = childNode.outEdges[index - 1];
        let connector1:any = diagramInstance.getObject(node1);
        let node2 = diagramInstance.getObject(
            (connector1 as any).targetID);
        diagramInstance.select([node2]);
      } else {
        diagramInstance.select([childNode]);
      }
    }
    diagramInstance.remove(node);
    if (canDelete) {
      treeObj.removeNodes([node.id]);
    }
    for (let t:number = workingData.length - 1; t >= 0; t--) {
      if ((workingData[t] as any).id === node.id) {
        workingData.splice(t, 1);
      }
    }
  }

  function filterNodeData(a:any) {
    return a.data.Id === targetNodeId;
  }

  function addNode(nodeId:any) {
    targetNodeId = nodeId ? nodeId : treeObj.selectedNodes[0];
    let tempData:any = workingData.filter(checkData);
    tempData[0].hasChild = true;
    tempData[0].expanded = true;
    let id:any = 'tree_' + index;
    let item:any = {
      Name: 'Node',
      Id: id,
      ParentId: targetNodeId,
      hasChild: false,
      expanded: false,
    };
    treeObj.addNodes([item], targetNodeId, null);
    treeObj.beginEdit(id);
    let node:any = { id: id, data: item };
    let targetId:any;
    if (diagramInstance.selectedItems.nodes.length > 0) {
      targetId = diagramInstance.selectedItems.nodes[0].id;
    } else {
      let temp:any = diagramInstance.nodes.filter(filterNodeData);
      targetId = temp[0].id;
    }
    let connector:any = { sourceID: targetId, targetID: id };
    diagramInstance.add(node);
    diagramInstance.add(connector);
    diagramInstance.doLayout();
    index++;
    workingData.push(item);
  }

  function nodeSelected(args:any) {
    btnobj.disabled = false;
    addobj.disabled = false;
  }

  function nodeClicked(args:any) {
    let node:any = diagramInstance.getObject(treeObj.selectedNodes[0]);
    diagramInstance.select([node]);
  }

  // Key Press Event
  function keyPress(args:any) {
    if (args.event.key === 'Enter') {
      add();
    }
  }

  function nodeEdited(args:any) {
    let node:any = diagramInstance.getObject(args.nodeData.id);
    node.annotations[0].content = args.newText;
    treeObj.selectedNodes = [args.nodeData.id];
  }

  function checkData(a:any) {
    return a.Id === targetNodeId;
  }

  function checkElementData(a:any) {
    return a.Id === elementNodeId;
  }
  function created1() {
    addobj.disabled = true;
  }
  function created2() {
    btnobj.disabled = true;
  }