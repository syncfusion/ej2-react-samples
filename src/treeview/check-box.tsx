import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import {TreeViewComponent} from '@syncfusion/ej2-react-navigations';
import './treeview.css';
import * as dataSource from './dataSource.json';

export class Checkbox extends SampleBase<{}, {}> {
  data = dataSource as any;
  private fields: Object = { dataSource: this.data.checkboxData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };
  private showCheckBox: boolean = true;
  render() {
    return (       
      <div className = 'control-pane'>
        <div className='control-section'>
        <div className='tree-control_wrapper'>
        {/* Render the TreeView with checkboxes */}
            <TreeViewComponent fields={this.fields} showCheckBox={this.showCheckBox}/>
        </div>
        </div>
        <div id="action-description">
            <p>This sample demonstrates the CheckBox functionalities of the TreeView. Click on any parent node's CheckBox to check/uncheck the node and its child nodes. The parent node's checked state will be determined by its child nodes checked state.</p>
        </div>
        <div id="description">
            <p>The <code>TreeView</code> component can be rendered with checkbox on the left side of each tree node. This allows the user to check more than one nodes, and this can be enabled by the <code>showCheckBox</code> property.</p>
            <p>In this demo, the TreeView is populated with checkbox enabled.</p>
            <p>For more information, you can refer to the <a href="http://ej2.syncfusion.com/react/documentation/treeview/check-box.html" target="_blank">Checkboxes</a> section from the documentation.</p>
        </div>
      </div>
    )
  }
}