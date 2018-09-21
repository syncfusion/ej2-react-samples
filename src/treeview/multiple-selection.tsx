import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import {TreeViewComponent} from '@syncfusion/ej2-react-navigations';
import './treeview.css';
export class MultiSelect extends SampleBase<{}, {}> {

public countries: { [key: string]: Object }[] = [
    { id: 1, name: 'Australia', hasChild: true, expanded: true },
    { id: 2, pid: 1, name: 'New South Wales' },
    { id: 3, pid: 1, name: 'Victoria', isSelected: true },
    { id: 4, pid: 1, name: 'South Australia', isSelected: true },
    { id: 6, pid: 1, name: 'Western Australia' },
    { id: 7, name: 'Brazil', hasChild: true },
    { id: 8, pid: 7, name: 'Paraná' },
    { id: 9, pid: 7, name: 'Ceará' },
    { id: 10, pid: 7, name: 'Acre' },
    { id: 11, name: 'China', hasChild: true },
    { id: 12, pid: 11, name: 'Guangzhou' },
    { id: 13, pid: 11, name: 'Shanghai' },
    { id: 14, pid: 11, name: 'Beijing' },
    { id: 15, pid: 11, name: 'Shantou' },
    { id: 16, name: 'France', hasChild: true },
    { id: 17, pid: 16, name: 'Pays de la Loire' },
    { id: 18, pid: 16, name: 'Aquitaine' },
    { id: 19, pid: 16, name: 'Brittany' },
    { id: 20, pid: 16, name: 'Lorraine' },
    { id: 21, name: 'India', hasChild: true },
    { id: 22, pid: 21, name: 'Assam' },
    { id: 23, pid: 21, name: 'Bihar' },
    { id: 24, pid: 21, name: 'Tamil Nadu' },
    { id: 25, pid: 21, name: 'Punjab' }
];
private fields: Object = { dataSource: this.countries,  id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild', selected: 'isSelected' };
private allowMultiSelection:boolean = true;

  render() {
    return (       
      <div className = 'control-pane'>
        <div className='control-section'>
          <div className='tree-control_wrapper'>
            {/* Render the TreeView with node multi select option */}
              <TreeViewComponent fields={this.fields} allowMultiSelection={this.allowMultiSelection}/>
          </div>
        </div>
        <div id="action-description">
            <p>This sample demonstrates the multiple node selection functionalities of the TreeView. To select multiple nodes, press the CTRL key and select the desired nodes; or select any node and by pressing SHIFT key select another node, this selects all the nodes in-between the selected nodes.</p>
        </div>
        <div id="description">
            <p>The <code>TreeView</code> component allows to select multiple nodes by enabling the <code>allowMultiSelection</code> property.</p>
            <p>In this demo, the TreeView is enabled with multiple selection</p>
            <p>For more information, refer to the <a href="http://ej2.syncfusion.com/react/documentation/treeview/multiple-selection.html" target="_blank">Multi Selection</a> section from the documentation.</p>
        </div>
      </div>
    )
  }
}
