import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { updateSampleSection } from '../common/sample-base';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { closest } from '@syncfusion/ej2-base';
import './drag-and-drop.css';
import * as dataSource from './dataSource/drag-data.json';

function Dragdrop() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    const data = dataSource as any;
    let listObj: ListViewComponent;
    let id: number = 1;
    // Render the first TreeView by mapping its fields property with data source properties
    const field: Object = { dataSource: data.dragData1, id: 'id', text: 'name', child: 'child' };
    const allowDragAndDrop: boolean = true;

    // Render the second TreeView by mapping its fields property with data source properties     
    const fields: Object = { dataSource: data.dragData2, id: 'id', text: 'name', child: 'child', selected: 'isSelected' };
    const allowDragAndDrops: boolean = true;

    function onDragStop(args: any): void {
        let targetEle: any = closest(args.target, '.e-droppable');
        targetEle = targetEle ? targetEle : args.target;
        // Check the target as ListView or not
        if (targetEle && targetEle.classList.contains('custom-list')) {
            args.cancel = true;
            let newData: { [key: string]: Object }[] = [];
            if (args.draggedNode.classList.contains('e-active')) {
                let dragNode: any = closest(args.draggedNode, '.e-treeview');
                let selNodes = dragNode.ej2_instances[0].selectedNodes;
                for (let i: number = 0, len: number = selNodes.length; i < len; i++) {
                    let nodeEle: Element = document.querySelector('[data-uid="' + selNodes[i] + '"]').querySelector('.e-list-text');
                    let nodeText: string = nodeEle.textContent;
                    let newNode: { [key: string]: Object } = { id: 'l' + id, text: nodeText, class: 'custom-delete', iconId: 'i' + id };
                    id++;
                    newData.push(newNode);
                }
            } else {
                let text: string = 'text';
                let nodeText: string = args.draggedNodeData[text] as string;
                let newNode: { [key: string]: Object } = { id: 'l' + id, text: nodeText, class: 'custom-delete', iconId: 'i' + id };
                id++;
                newData.push(newNode);
            }
            // Add collection of node to ListView
            listObj.addItem(newData, undefined);
        }
    }
    // Add the custom action for delete icon in ListView
    function onCreate() {
        document.getElementById('list').addEventListener('mousedown', (event: any) => {
            if (event.target.classList.contains('custom-delete')) {
                let node: Element = closest(event.target, 'li');
                listObj.removeItem(node);
            }
        });
        document.getElementById('overlay').addEventListener('mousedown', (event: any) => {
            document.getElementById('overlay').style.display = 'none';
        });
    }
    function actionBegin(): void {
        let listObj = this;
    }

    return (
        <div className="control-pane">
            <div className="col-lg-12 control-section custom-tree">
                <div className="control-wrapper">
                    <div className="col-lg-4 tree1-data">
                        <h4>TreeView-1</h4>
                        <div className="content">
                            <TreeViewComponent id='tree1' fields={field} nodeDragStop={onDragStop.bind(this)} created={onCreate.bind(this)} allowDragAndDrop={allowDragAndDrop} />
                        </div>
                    </div>
                    <div className="col-lg-4 tree2-data">
                        <h4>TreeView-2</h4>
                        <div className="content">
                            <TreeViewComponent id='tree2' fields={fields} nodeDragStop={onDragStop.bind(this)} allowDragAndDrop={allowDragAndDrops} />
                        </div>
                    </div>
                    <div className="col-lg-4 tree3-data">
                        <h4>ListView</h4>
                        <div className="content">
                            <div id="list">
                                <ListViewComponent id="list" className="e-droppable" dataSource={[]} ref={(list) => { listObj = list }} actionComplete={actionBegin.bind(this)} cssClass={'custom-list'} template="<div><span>${text}</span><span id=${iconId} class=${class}></span></div>" />
                            </div>
                        </div>
                    </div>
                    <div id="overlay">
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>This <a href="https://www.syncfusion.com/react-ui-components/react-treeview" target="_blank">React TreeView example</a> demonstrates the drag and drop functionality of TreeView. A drag and drop image is present at the top of the sample which hides on clicking the sample. To drag and drop node, select and drag the desired node and drop it on the target node or external container.</p>
            </div>
            <div id="description">
                <p>The <code>TreeView</code> component allows users to drag any node and drop it on any other node in the same or different tree using <code>allowDragAndDrop</code> property. Additionally, it supports dropping a tree node to an external container using <code>nodeDragStop</code> event of the TreeView</p>
                <p>For more information, you can refer to the <a href="https://ej2.syncfusion.com/react/documentation/treeview/drag-and-drop/" target="_blank">Drag and Drop</a> section from the documentation.</p>
            </div>
        </div>
    )
}
export default Dragdrop;