import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { closest } from '@syncfusion/ej2-base';
import './drag-and-drop.css';
import * as dataSource from './dataSource/drag-data.json';
export class Dragdrop extends SampleBase {
    constructor() {
        super(...arguments);
        this.data = dataSource;
        this.id = 1;
        // Render the first TreeView by mapping its fields property with data source properties
        this.field = { dataSource: this.data.dragData1, id: 'id', text: 'name', child: 'child' };
        this.allowDragAndDrop = true;
        // Render the second TreeView by mapping its fields property with data source properties     
        this.fields = { dataSource: this.data.dragData2, id: 'id', text: 'name', child: 'child', selected: 'isSelected' };
        this.allowDragAndDrops = true;
    }
    onDragStop(args) {
        let targetEle = closest(args.target, '.e-droppable');
        targetEle = targetEle ? targetEle : args.target;
        // Check the target as ListView or not
        if (targetEle && targetEle.classList.contains('custom-list')) {
            args.cancel = true;
            let newData = [];
            if (args.draggedNode.classList.contains('e-active')) {
                var dragNode = closest(args.draggedNode, '.e-treeview');
                var selNodes = dragNode.ej2_instances[0].selectedNodes;
                for (let i = 0, len = selNodes.length; i < len; i++) {
                    let nodeEle = document.querySelector('[data-uid="' + selNodes[i] + '"]').querySelector('.e-list-text');
                    let nodeText = nodeEle.textContent;
                    let newNode = { id: 'l' + this.id, text: nodeText, class: 'custom-delete', iconId: 'i' + this.id };
                    this.id++;
                    newData.push(newNode);
                }
            }
            else {
                let text = 'text';
                let nodeText = args.draggedNodeData[text];
                let newNode = { id: 'l' + this.id, text: nodeText, class: 'custom-delete', iconId: 'i' + this.id };
                this.id++;
                newData.push(newNode);
            }
            // Add collection of node to ListView
            this.listObj.addItem(newData, undefined);
        }
    }
    // Add the custom action for delete icon in ListView
    onCreate() {
        document.getElementById('list').addEventListener('mousedown', (event) => {
            if (event.target.classList.contains('custom-delete')) {
                let node = closest(event.target, 'li');
                this.listObj.removeItem(node);
            }
        });
        document.getElementById('overlay').addEventListener('mousedown', (event) => {
            document.getElementById('overlay').style.display = 'none';
        });
    }
    actionBegin() {
        var listObj = this;
    }
    render() {
        return (<div className="control-pane">
            
            <div className="col-lg-12 control-section custom-tree">
              <div className="control-wrapper">
                <div className="col-lg-4 tree1-data">
                    <h4>TreeView-1</h4>
                    <div className="content">
                        <TreeViewComponent id='tree1' fields={this.field} nodeDragStop={this.onDragStop.bind(this)} created={this.onCreate.bind(this)} allowDragAndDrop={this.allowDragAndDrop}/>
                    </div>
                </div>
                <div className="col-lg-4 tree2-data">
                    <h4>TreeView-2</h4>
                    <div className="content">
                        <TreeViewComponent id='tree2' fields={this.fields} nodeDragStop={this.onDragStop.bind(this)} allowDragAndDrop={this.allowDragAndDrops}/>
                    </div>
                </div>
                <div className="col-lg-4 tree3-data">
                    <h4>ListView</h4>
                    <div className="content">
                        <div id="list">
                        <ListViewComponent id="list" className="e-droppable" dataSource={[]} ref={(list) => { this.listObj = list; }} actionComplete={this.actionBegin.bind(this)} cssClass={'custom-list'} template="<div><span>${text}</span><span id=${iconId} class=${class}></span></div>"/> 
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
                <p>For more information, you can refer to the <a href="https://ej2.syncfusion.com/react/documentation/treeview/drag-and-drop/" target="_blank">Drag and Drop</a> section from the documentation.</p>
            </div>
        </div>);
    }
}
