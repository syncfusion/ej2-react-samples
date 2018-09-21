import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import {TreeViewComponent} from '@syncfusion/ej2-react-navigations';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { closest } from '@syncfusion/ej2-base';
import './drag-and-drop.css';
export class Dragdrop extends SampleBase<{}, {}> {
private listObj: ListViewComponent;
public id:number=1;
// Hierarchical data source for first TreeView component  
public productTeam1: { [key: string]: Object }[] = [
   {
            id: 't1', name: 'ASP.NET MVC Team', expanded: true,
            child: [
                { id: 't2' , pid: 't1', name: 'Smith'},
                { id: 't3', pid: 't1', name: 'Johnson' },
                { id: 't4', pid: 't1', name: 'Anderson' },
            ]
        },
        {
            id: 't5', name: 'Windows Team',  expanded: true,
            child: [
                { id: 't6', pid: 't5', name: 'Clark' },
                { id: 't7', pid: 't5', name: 'Wright' },
                { id: 't8', pid: 't5', name: 'Lopez' },
            ]
        },
];
// Render the first TreeView by mapping its fields property with data source properties
private field: Object = { dataSource: this.productTeam1,  id: 'id', text: 'name', child: 'child' };
private allowDragAndDrop:boolean = true;
// Hierarchical data source for second TreeView component
public productTeam2: { [key: string]: Object }[] = [
        {
            id: 't9' , name: 'Web Team',expanded: true,
            child: [
                { id: 't11' , pid: 't9' , name: 'Joshua' },
                { id: 't12', pid: 't9' , name: 'Matthew' },
                { id: 't13', pid: 't9' , name: 'David' },
            ]
        },
        {
            id: 't14', name: 'Build Team', expanded: true,
            child: [
                { id: 't15' , pid: 't14' , name: 'Ryan' },
                { id: 't16' , pid: 't14' , name: 'Justin' },
                { id: 't17' , pid: 't14', name: 'Robert' },
            ]
        },
];
// Render the second TreeView by mapping its fields property with data source properties     
private fields: Object = { dataSource: this.productTeam2,  id: 'id', text: 'name', child: 'child', selected: 'isSelected' };
private allowDragAndDrops:boolean = true;

public onDragStop(args: any): void {
	    let targetEle: any = closest(args.target, '.e-droppable');
        targetEle = targetEle ? targetEle : args.target;
        // Check the target as ListView or not
        if (targetEle && targetEle.classList.contains('custom-list')) {
            args.cancel = true;
            let newData: { [key: string]: Object }[] = [];
            if (args.draggedNode.classList.contains('e-active')) {
                var dragNode: any = closest(args.draggedNode, '.e-treeview');
                var selNodes = dragNode.ej2_instances[0].selectedNodes;
                for (let i: number = 0, len: number = selNodes.length; i < len; i++) {
                    let nodeEle: Element = document.querySelector('[data-uid="' + selNodes[i] + '"]').querySelector('.e-list-text');
                    let nodeText: string = nodeEle.textContent;
                    let newNode: { [key: string]: Object } = { id: 'l' +this.id, text: nodeText, class: 'custom-delete', iconId: 'i' + this.id };
                    this.id++;
                    newData.push(newNode);
                }
            } else {
                let text: string = 'text';
                let nodeText: string = args.draggedNodeData[text] as string;
                let newNode: { [key: string]: Object } = { id: 'l' + this.id, text: nodeText, class: 'custom-delete', iconId: 'i' + this.id };
                this.id++;
                newData.push(newNode);
            }
            // Add collection of node to ListView
            this.listObj.addItem(newData, undefined);
            }
        }
    // Add the custom action for delete icon in ListView
public onCreate(){
    document.getElementById('list').addEventListener('mousedown', (event: any) => {
        if (event.target.classList.contains('custom-delete')) {
            let node: Element = closest(event.target, 'li');
            this.listObj.removeItem(node);
        }
    });
    document.getElementById('overlay').addEventListener('mousedown', (event: any) => {
        document.getElementById('overlay').style.display = 'none';
     });
}
public actionBegin(): void { 
       var listObj=this;
    }
render() {
    return (  
        <div className = "control-pane">
            
            <div className="col-lg-12 control-section custom-tree">
              <div className= "control-wrapper">
                <div className="col-lg-4 tree1-data">
                    <h4>TreeView-1</h4>
                    <div className="content">
                        <TreeViewComponent id='tree1' fields={this.field}  nodeDragStop={this.onDragStop.bind(this)} created={this.onCreate.bind(this)} allowDragAndDrop={this.allowDragAndDrop} />
                    </div>
                </div>
                <div className="col-lg-4 tree2-data">
                    <h4>TreeView-2</h4>
                    <div className="content">
                        <TreeViewComponent id='tree2' fields={this.fields}   nodeDragStop={this.onDragStop.bind(this)} allowDragAndDrop={this.allowDragAndDrops} />
                    </div>
                </div>
                <div className="col-lg-4 tree3-data">
                    <h4>ListView</h4>
                    <div className="content">
                        <div id="list">
                        <ListViewComponent id="list" className="e-droppable" dataSource={ [] }ref={(list) => { this.listObj = list }} actionComplete={this.actionBegin.bind(this)} cssClass={'custom-list'} template="<div><span>${text}</span><span id=${iconId} class=${class}></span></div>" /> 
                        </div>
                    </div>
                </div>
                <div id="overlay">
                </div>
              </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the drag and drop functionality of TreeView. A drag and drop image is present at the top of the sample which hides on clicking the sample. To drag and drop node, select and drag the desired node and drop it on the target node or external container.</p>
            </div>
            <div id="description">
                <p>The <code>TreeView</code> component allows users to drag any node and drop it on any other node in the same or different tree using <code>allowDragAndDrop</code> property. Additionally, it supports dropping a tree node to an external container using <code>nodeDragStop</code> event of the TreeView</p>
                <p>For more information, you can refer to the <a href="http://ej2.syncfusion.com/react/documentation/treeview/drag-and-drop.html" target="_blank">Drag and Drop</a> section from the documentation.</p>
            </div>
        </div>
    )
  }
}
