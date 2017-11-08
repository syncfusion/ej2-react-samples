import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import {TreeViewComponent} from '@syncfusion/ej2-react-navigations';
import './treeview.css';
export class Dragdrop extends SampleBase<{}, {}> {

public productTeam: { [key: string]: Object }[] = [
   {
            id: 1, name: 'ASP.NET MVC Team', expanded: true,
            child: [
                { id: 2, pid: 1, name: 'Smith', isSelected: true },
                { id: 3, pid: 1, name: 'Johnson', isSelected: true },
                { id: 4, pid: 1, name: 'Anderson' },
            ]
        },
        {
            id: 5, name: 'Windows Team',
            child: [
                { id: 6, pid: 5, name: 'Clark' },
                { id: 7, pid: 5, name: 'Wright' },
                { id: 8, pid: 5, name: 'Lopez' },
            ]
        },
        {
            id: 9, name: 'Web Team',
            child: [
                { id: 11, pid: 9, name: 'Joshua' },
                { id: 12, pid: 9, name: 'Matthew' },
                { id: 13, pid: 9, name: 'David' },
            ]
        },
        {
            id: 14, name: 'Build Team',
            child: [
                { id: 15, pid: 14, name: 'Ryan' },
                { id: 16, pid: 14, name: 'Justin' },
                { id: 17, pid: 14, name: 'Robert' },
            ]
        },
        {
            id: 18, name: 'WPF Team',
            child: [
                { id: 19, pid: 18, name: 'Brown' },
                { id: 20, pid: 18, name: 'Johnson' },
                { id: 21, pid: 18, name: 'Miller' },
            ]
        }
];
private fields: Object = { dataSource: this.productTeam,  id: 'id', text: 'name', child: 'child', selected: 'isSelected' };
private allowMultiSelection:boolean = true;
private allowDragAndDrop:boolean = true;

  render() {
    return (       
      <div className = 'control-pane'>
        <div className='control-section'>
        <div className='control_wrapper'>
        {/* Render the TreeView with multi selection and drag and drop option */}
            <TreeViewComponent fields={this.fields} allowMultiSelection={this.allowMultiSelection} allowDragAndDrop={this.allowDragAndDrop}/>
        </div>
        </div>
        <div id="action-description">
            <p>This sample demonstrates the drag and drop functionality of the TreeView. To drag-and-drop single node, drag the desired node and drop under the target node by releasing the mouse. To drag-and-drop multiple nodes, select and drag the desired nodes and then drop it to the target node. The dragged nodes will be dropped as the same level under the target node.</p>
        </div>
        <div id="description">
            <p>The <code>TreeView</code> component allows the user to drag any node and drop the child or sibling to any other nodes. This is enabled by the <code>allowDragAndDrop</code> property.</p>
            <p>In this demo, TreeView is enabled with multiple selection, and drag and drop.</p>    
            <p>For more information, you can refer to the <a href="http://ej2.syncfusion.com/react/documentation/treeview/drag-drop.html" target="_blank">Drag and Drop</a> section from the documentation.</p>
        </div>
      </div>
    )
  }
}
