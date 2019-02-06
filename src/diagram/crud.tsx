import * as ReactDOM from 'react-dom';
import * as React from 'react';

import {
  DiagramComponent,
  NodeModel,
  randomId,
  ConnectorModel,
  Connector,
  NodeConstraints,
  HierarchicalTree,
  DataBinding,SnapConstraints,
  Inject,
  Node,
  ISelectionChangeEventArgs,
  IEndChangeEventArgs
} from '@syncfusion/ej2-react-diagrams';
import { SampleBase } from '../common/sample-base';
import {
  ToolbarComponent,
  ClickEventArgs
} from '@syncfusion/ej2-react-navigations';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import {
  DropDownListComponent,
  ChangeEventArgs
} from '@syncfusion/ej2-react-dropdowns';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

let diagramInstance: DiagramComponent;
let dialogInstance: DialogComponent;
let toolbarObj: ToolbarComponent;
let sourceID: string;
let targetID: string;
let sourceDropdown: DropDownListComponent;
let targetDropdown: DropDownListComponent;

let nodeData: { [key: string]: Object }[] = [];

interface DataInfo {
  Description: string;
  Color: string;
  Id: number;
}

export class Crud extends SampleBase<{}, {}> {
  private buttons;
  private fields: object = { text: 'Label', value: 'Name' };
  public content(data: any): JSX.Element {
    return (
      <div>
        <div className='showLabel'>
        <TextBoxComponent id='Description' floatLabelType={'Always'} placeholder={'Description'} />
        </div>
        <div className='showLabel' style={{ paddingTop: '14px' }}>
        <TextBoxComponent id='Color' floatLabelType={'Always'} placeholder={'Color'}/>
        </div>
        <div className='showDropdown'>
        <DropDownListComponent
          id='SourceId'
          ref={dropdown => (sourceDropdown = dropdown)}
          change={(args: ChangeEventArgs) => {
            sourceID = args.value as string;
          }}
          created={(args: Event) => {
            sourceDropdown.fields={ text: 'Label', value: 'Name' };
            sourceDropdown.dataSource= getDataSource();
            sourceDropdown.dataBind();
          }}
        />
        </div>
        <div className='showDropdown' style={{ paddingTop: '14px' }}>
        <DropDownListComponent
          id='TargetId'
          ref={dropdown => (targetDropdown = dropdown)}
          change={(args: ChangeEventArgs) => {
            targetID = args.value as string;
          }}
          created={(args: Event) => {
            targetDropdown.fields={ text: 'Label', value: 'Name' };
            targetDropdown.dataSource= getDataSource();
            targetDropdown.dataBind();
          }}
        />
        </div>
      </div>
    );
  }

  constructor(props) {
    super();
    this.buttons = [{
      click: this.dlgButtonClick,
      buttonModel: {
          content: 'Update',
          isPrimary: true
      }
  }];
  }

  private dlgButtonClick(): void {
    let dialogHeader: string = dialogInstance.header;
    let description: string = (document.getElementById('Description') as HTMLInputElement).value;
    let color: string = (document.getElementById('Color') as HTMLInputElement).value;
    let selectedItem: NodeModel | ConnectorModel;
    if (diagramInstance.selectedItems.nodes.length > 0) {
      selectedItem = diagramInstance.selectedItems.nodes[0];
    }
    if (diagramInstance.selectedItems.connectors.length > 0) {
      selectedItem = diagramInstance.selectedItems.connectors[0];
    }
    if (dialogHeader === 'Add') {
      let node: NodeModel | DataInfo = {
        id: 'node' + randomId(),
        style: { fill: color },
        Description: description,
        Color: color,
        Id: Math.floor(Math.random() * 1000 + 100)
      };
      let connector: ConnectorModel | DataInfo = {
        id: 'connector' + randomId(),
        sourceID: selectedItem.id,
        targetID: (node as Node).id,
        Id: Math.floor(Math.random() * 1000 + 100)
      };
      diagramInstance.add(node as NodeModel);
      diagramInstance.add(connector as ConnectorModel);
      diagramInstance.doLayout();
      diagramInstance.insertData();
      nodeData.push({ Name: (node as Node).id, Label: description });
      sourceDropdown.dataSource = getDataSource();
      sourceDropdown.dataBind();
      targetDropdown.dataSource = getDataSource();
      targetDropdown.dataBind();
    } else {
      if (selectedItem instanceof Connector) {
        selectedItem.sourceID = sourceID ? sourceID : selectedItem.sourceID;
        selectedItem.targetID = targetID ? targetID : selectedItem.targetID;
        diagramInstance.dataBind();
        diagramInstance.doLayout();
      } else {
        (selectedItem as DataInfo).Description = description;
        (selectedItem as DataInfo).Color = color;
        selectedItem.annotations[0].content = description;
        selectedItem.style.fill = color;
        diagramInstance.dataBind();
      }
      diagramInstance.updateData();
    }
    dialogInstance.hide();
  }

  public render(): JSX.Element {
    return (
      <div>
      <div className='control-section'>
        <div style= {{width: '100%', height: '10%'}}>
          <ToolbarComponent
            id='toolbar'
            ref={toolbar => (toolbarObj = toolbar)}
            items={[
              {
                tooltipText: 'Add',
                prefixIcon: 'e-ddb-crudicons e-add',
                id: 'Add',
                text: 'Add'
              },
              {
                type: 'Separator'
              },
              {
                tooltipText: 'Edit',
                prefixIcon: 'e-ddb-crudicons e-update',
                id: 'Edit',
                text: 'Edit'
              },
              {
                type: 'Separator'
              },
              {
                tooltipText: 'Delete',
                prefixIcon: 'e-ddb-crudicons e-delete',
                id: 'Delete',
                text: 'Delete'
              }
            ]}
            clicked={(args: ClickEventArgs) => {
              let selectedItem: NodeModel | ConnectorModel;
              if (diagramInstance.selectedItems.nodes.length > 0) {
                selectedItem = diagramInstance.selectedItems.nodes[0];
              }
              if (diagramInstance.selectedItems.connectors.length > 0) {
                selectedItem = diagramInstance.selectedItems.connectors[0];
              }
              if (selectedItem) {
                switch (args.item.tooltipText) {
                  case 'Add':
                    openDialog('Add', '', '', true);
                    break;
                  case 'Edit':
                    if (selectedItem instanceof Connector) {
                      let sourceNode: NodeModel = diagramInstance.getObject(selectedItem.sourceID);
                      let targetNode: NodeModel = diagramInstance.getObject(selectedItem.targetID);
                      openDialog('Edit', (sourceNode as DataInfo).Description, (targetNode as DataInfo).Description, false );
                    } else {
                      openDialog('Edit', (selectedItem as DataInfo).Description, (selectedItem as DataInfo).Color, true );
                    }
                    break;
                  case 'Delete':
                    diagramInstance.remove(selectedItem);
                    diagramInstance.doLayout();
                    diagramInstance.removeData();
                    let element: object = { Name: selectedItem.id, Label: (selectedItem as DataInfo).Description };
                    let index: number = nodeData.indexOf(element as { [key: string]: Object;});
                    nodeData.splice(index, 1);
                    sourceDropdown.dataSource = getDataSource();
                    sourceDropdown.dataBind();
                    targetDropdown.dataSource = getDataSource();
                    targetDropdown.dataBind();
                }
              }
            }}
            created={(args: Event) => {
              enableToolbarItems(false);
            }}
          />
        </div>
        <div style= {{width: '100%', height: '80%', borderWidth: '0 1px 1px 1px', borderStyle: 'solid', borderColor:'#D7D7D7'}}>
        <div id='diagram-space' className='sb-mobile-diagram'>
        <DiagramComponent
          id='diagram'
          ref={diagram => (diagramInstance = diagram)}
          width={'100%'}
          height={'600px'}
          snapSettings={{ constraints: SnapConstraints.None }}
          dataSourceSettings={{
            id: 'Name',
            //set an URL to perform CRUD operations with node in database
            crudAction: {
              read: 'https://js.syncfusion.com/demos/ejServices/api/Diagram/GetNodes',
              create: 'https://js.syncfusion.com/demos/ejServices/api/Diagram/AddNodes',
              update: 'https://js.syncfusion.com/demos/ejServices/api/Diagram/UpdateNodes',
              destroy: 'https://js.syncfusion.com/demos/ejServices/api/Diagram/DeleteNodes',
              customFields: ['Id', 'Description', 'Color']
            },
            connectionDataSource: {
              id: 'Name',
              sourceID: 'SourceNode',
              targetID: 'TargetNode',
              //set an URL to perform CRUD operations with connector in database
              crudAction: {
                read: 'https://js.syncfusion.com/demos/ejServices/api/Diagram/GetConnectors',
                create: 'https://js.syncfusion.com/demos/ejServices/api/Diagram/AddConnectors',
                update: 'https://js.syncfusion.com/demos/ejServices/api/Diagram/UpdateConnectors',
                destroy: 'https://js.syncfusion.com/demos/ejServices/api/Diagram/DeleteConnectors',
                customFields: ['Id']
              }
            }
          }}
          layout={{
            type: 'HierarchicalTree',
            verticalSpacing: 40,
          }}
          getNodeDefaults={(obj: Node) => {
            obj.width = 100;
            obj.height = 50;
            obj.shape = { type: 'Basic', shape: 'Rectangle' };
            obj.style = { strokeWidth: 1, strokeColor: '#DDDDDD' };
            return obj;
          }}
          getConnectorDefaults={(connector: Connector) => {
            connector.type = 'Orthogonal';
            connector.style.fill = '#707070';
            connector.style.strokeColor = '#707070';
            connector.targetDecorator = {
              style: {
              strokeColor: '#707070',
              fill: '#707070'
              },
            };
             return connector;
          }}
          selectionChange={(args: ISelectionChangeEventArgs) => {
            if (args.state === 'Changing') {
              if (args.newValue.length > 0) {
                if (args.newValue[0] instanceof Node) {
                  enableToolbarItems(true);
                } else {
                  toolbarObj.enableItems(document.getElementById(toolbarObj.items[0].id).parentElement,false);
                  toolbarObj.enableItems(document.getElementById(toolbarObj.items[2].id).parentElement,true);
                  toolbarObj.enableItems(document.getElementById(toolbarObj.items[4].id).parentElement,false);
                }
              } else {
                enableToolbarItems(false);
              }
            }
          }}
          sourcePointChange={(args: IEndChangeEventArgs) => {
            if (args.state === 'Completed') {
              if (!args.connector.targetID || !args.connector.sourceID) {
                args.cancel = true;
              }
            }
          }}
          targetPointChange={(args: IEndChangeEventArgs) => {
            if (args.state === 'Completed') {
              if (!args.connector.targetID || !args.connector.sourceID) {
                args.cancel = true;
              }
            }
          }}
          setNodeTemplate={(obj: NodeModel) => {
            obj.annotations = [{ style: { color: 'black' } }];
            obj.annotations[0].content = (obj as DataInfo).Description;
            obj.style = { fill: (obj as DataInfo).Color };
            if ((obj as DataInfo).Id === 1) {
              //delete constraints for an root node
              obj.constraints = NodeConstraints.Default & ~NodeConstraints.Delete;
            }
          }}
        >
           <Inject
                services={[DataBinding, HierarchicalTree]}
              />
              </DiagramComponent>
         </div>
    </div>
</div>

        <DialogComponent
          id='editDialog'
          ref={dialog => (dialogInstance = dialog)}
          width={'300px'}
          visible={false}
          isModal={true}
          showCloseIcon={true}
          content={this.content as any}
          buttons={this.buttons}
        />
        <div id='action-description'>
        <p>
        This sample demonstrates generating a diagram by reading data from the database, and updating it with newly inserted/updated/deleted nodes and connectors through web services.
       </p>
    </div>
  <div id='description'>
    <p>
        This example shows how the user reads the data source and performs add, edit, delete of data in the data source
        at runtime. The <code>crudAction</code> property of the <code>dataSourceSettings</code> and <code>crudAction</code> property of the
        <code>connectionDataSource</code> allow you to define the server-side method name for <code>create</code>, <code>read</code>, <code>update</code>, and
        <code>delete</code> operations.
    </p>
    <p>
        The <code>insertData</code> method is used to send the newly added/inserted data from client to server side. Likewise,
        <code>updateData</code> and <code>removeData</code> are used to send the updated and deleted diagram elements to the server.
    </p>
    <p style={{ fontWeight: 500 }}>Injecting Module</p>
    <p>
        The diagram component’s features are segregated into individual feature-wise modules. To generate diagrams from an external data source, inject <code>DataBinding</code> module using <code>provide: { [DataBinding] }</code> method. To automatically arrange the objects in an Hierarchical chart, inject <code>HierarchicalTree</code> module using <code>provide: { [HierarchicalTree] }</code> method.
    </p>
 </div>
      </div>
    );
  }
}

function enableToolbarItems(isEnableItem: boolean): void {
  toolbarObj.enableItems(document.getElementById(toolbarObj.items[0].id).parentElement,isEnableItem);
  toolbarObj.enableItems(document.getElementById(toolbarObj.items[2].id).parentElement,isEnableItem);
  toolbarObj.enableItems(document.getElementById(toolbarObj.items[4].id).parentElement,isEnableItem);
}

function openDialog( title: string, description: string, color: string, isNode: boolean) {
  dialogInstance.header = title;
  if (isNode) {
    hideClassElement('.showDropdown', 'none');
    hideClassElement('.showLabel', 'block');
    (document.getElementById('Description') as HTMLInputElement).value = description;
    (document.getElementById('Color') as HTMLInputElement).value = color;
  } else {
    hideClassElement('.showDropdown', 'block');
    hideClassElement('.showLabel', 'none');
    (document.getElementById('SourceId') as HTMLInputElement).value = description;
    (document.getElementById('TargetId') as HTMLInputElement).value = color;
  }
  dialogInstance.show();
}

function hideClassElement(className: string, display: string): void {
  let i;
  let showDropdown: NodeListOf<HTMLElement> = document.querySelectorAll(className);
  for (i = 0; i < showDropdown.length; i++) {
    showDropdown[i].style.display = display;
  }
}

function getDataSource() {
  let i: number;
  nodeData = [];
  for (i = 0; i < diagramInstance.nodes.length; i++) {
      let node: NodeModel = diagramInstance.nodes[i];
      let element: object = { Name: node.id, Label: (node as DataInfo).Description };
      nodeData.push(element as { [key: string]: Object; })
  }
  return nodeData;
}
