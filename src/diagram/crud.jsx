import * as React from 'react';
import { DiagramComponent, Connector, NodeConstraints, HierarchicalTree, DataBinding, SnapConstraints, Inject, Node } from '@syncfusion/ej2-react-diagrams';
import { SampleBase } from '../common/sample-base';
import { ToolbarComponent } from '@syncfusion/ej2-react-navigations';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
let diagramInstance;
let dialogInstance;
let toolbarObj;
let sourceID;
let targetID;
let sourceDropdown;
let targetDropdown;
let nodeData = [];
export class Crud extends SampleBase {
    constructor(props) {
        super();
        this.fields = { text: 'Label', value: 'Name' };
        this.buttons = [{
                click: this.dlgButtonClick,
                buttonModel: {
                    content: 'Update',
                    isPrimary: true
                }
            }];
    }
    content(data) {
        return (<div>
        <div className='showLabel'>
        <TextBoxComponent id='Description' floatLabelType={'Always'} placeholder={'Description'}/>
        </div>
        <div className='showLabel' style={{ paddingTop: '14px' }}>
        <TextBoxComponent id='Color' floatLabelType={'Always'} placeholder={'Color'}/>
        </div>
        <div className='showDropdown'>
        <DropDownListComponent id='SourceId' ref={dropdown => (sourceDropdown = dropdown)} change={(args) => {
            sourceID = args.value;
        }} created={(args) => {
            sourceDropdown.fields = { text: 'Label', value: 'Name' };
            sourceDropdown.dataSource = getDataSource();
            sourceDropdown.dataBind();
        }}/>
        </div>
        <div className='showDropdown' style={{ paddingTop: '14px' }}>
        <DropDownListComponent id='TargetId' ref={dropdown => (targetDropdown = dropdown)} change={(args) => {
            targetID = args.value;
        }} created={(args) => {
            targetDropdown.fields = { text: 'Label', value: 'Name' };
            targetDropdown.dataSource = getDataSource();
            targetDropdown.dataBind();
        }}/>
        </div>
      </div>);
    }
    render() {
        return (<div>
      <div className='control-section'>
        <div style={{ width: '100%', height: '10%' }}>
          <ToolbarComponent id='toolbar_diagram' ref={toolbar => (toolbarObj = toolbar)} items={[
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
        ]} clicked={(args) => {
            let selectedItem;
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
                            let sourceNode = diagramInstance.getObject(selectedItem.sourceID);
                            let targetNode = diagramInstance.getObject(selectedItem.targetID);
                            openDialog('Edit', sourceNode.Description, targetNode.Description, false);
                        }
                        else {
                            openDialog('Edit', selectedItem.Description, selectedItem.Color, true);
                        }
                        break;
                    case 'Delete':
                        diagramInstance.remove(selectedItem);
                        diagramInstance.doLayout();
                        diagramInstance.removeData();
                        let element = { Name: selectedItem.id, Label: selectedItem.Description };
                        let index = nodeData.indexOf(element);
                        nodeData.splice(index, 1);
                        sourceDropdown.dataSource = getDataSource();
                        sourceDropdown.dataBind();
                        targetDropdown.dataSource = getDataSource();
                        targetDropdown.dataBind();
                }
            }
        }} created={(args) => {
            enableToolbarItems(false);
        }}/>
        </div>
        <div style={{ width: '100%', height: '80%', borderWidth: '0 1px 1px 1px', borderStyle: 'solid', borderColor: '#D7D7D7' }}>
        <div id='diagram-space' className='sb-mobile-diagram'>
        <DiagramComponent id='diagram' ref={diagram => (diagramInstance = diagram)} width={'100%'} height={'600px'} snapSettings={{ constraints: SnapConstraints.None }} dataSourceSettings={{
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
        }} layout={{
            type: 'HierarchicalTree',
            verticalSpacing: 40,
        }} getNodeDefaults={(obj) => {
            obj.width = 100;
            obj.height = 50;
            obj.shape = { type: 'Basic', shape: 'Rectangle' };
            obj.style = { strokeWidth: 1, strokeColor: '#DDDDDD' };
            return obj;
        }} getConnectorDefaults={(connector) => {
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
        }} selectionChange={(args) => {
            if (args.state === 'Changing') {
                if (args.newValue.length > 0) {
                    if (args.newValue[0] instanceof Node) {
                        enableToolbarItems(true);
                    }
                    else {
                        toolbarObj.enableItems(document.getElementById(toolbarObj.items[0].id).parentElement, false);
                        toolbarObj.enableItems(document.getElementById(toolbarObj.items[2].id).parentElement, true);
                        toolbarObj.enableItems(document.getElementById(toolbarObj.items[4].id).parentElement, false);
                    }
                }
                else {
                    enableToolbarItems(false);
                }
            }
        }} sourcePointChange={(args) => {
            if (args.state === 'Completed') {
                if (!args.connector.targetID || !args.connector.sourceID) {
                    args.cancel = true;
                }
            }
        }} targetPointChange={(args) => {
            if (args.state === 'Completed') {
                if (!args.connector.targetID || !args.connector.sourceID) {
                    args.cancel = true;
                }
            }
        }} setNodeTemplate={(obj) => {
            obj.annotations = [{ style: { color: 'black' } }];
            obj.annotations[0].content = obj.Description;
            obj.style = { fill: obj.Color };
            if (obj.Id === 1) {
                //delete constraints for an root node
                obj.constraints = NodeConstraints.Default & ~NodeConstraints.Delete;
            }
        }}>
           <Inject services={[DataBinding, HierarchicalTree]}/>
              </DiagramComponent>
         </div>
    </div>
</div>

        <DialogComponent id='editDialog' ref={dialog => (dialogInstance = dialog)} width={'300px'} visible={false} isModal={true} showCloseIcon={true} content={this.content} buttons={this.buttons}/>
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
        The diagram component’s features are segregated into individual feature-wise modules. To generate diagrams from an external data source, inject <code>DataBinding</code> module using <code>provide: {[DataBinding]}</code> method. To automatically arrange the objects in an Hierarchical chart, inject <code>HierarchicalTree</code> module using <code>provide: {[HierarchicalTree]}</code> method.
    </p>
 </div>
      </div>);
    }
}
function getDataSource() {
    let i;
    nodeData = [];
    for (i = 0; i < diagramInstance.nodes.length; i++) {
        let node = diagramInstance.nodes[i];
        let element = { Name: node.id, Label: node.Description };
        nodeData.push(element);
    }
    return nodeData;
}
