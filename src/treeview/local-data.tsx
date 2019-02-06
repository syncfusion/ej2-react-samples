import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import {TreeViewComponent} from '@syncfusion/ej2-react-navigations';
import './local-data.css';
import * as dataSource from './dataSource.json';

const SAMPLE_CSS = `
.control-section {
    overflow: auto;
}`;

export class LocalData extends SampleBase<{}, {}> {
  data = dataSource as any;
  // Hierarchical data source for TreeView component
  private fields: object = { dataSource: this.data.hierarchicalData, id: 'code', text: 'name', child: 'countries' };

  // Self-referential list data source for TreeView component
  private listfields: object = { dataSource: this.data.localData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };

  render() {
    return (       
      <div className = 'control-pane'>
        <style>
            {SAMPLE_CSS}
        </style>
        <div className='control-section'>
          <div className='col-lg-6 nested-data'>
            <div className='content'>
              <h4>Hierarchical Data</h4>
              <TreeViewComponent id='tree' fields={this.fields} />
            </div>
          </div>
          <div className='col-lg-6 list-data'>
            <div className='content'>
              <h4>List Data</h4>
              <TreeViewComponent id='listtree' fields={this.listfields} />
            </div>
          </div>
        </div>
        <div id="action-description">
            <p>This sample demonstrates the binding of local data to the TreeView. Click on node to select it, and click on icon or double click on node to expand/collapse it.</p>
        </div>
        <div id="description">
            <p>The TreeView component loads the data through the <code>dataSource</code> property, where the data can be either local data or remote data. In case of local data, the data structure can be hierarchical data or list data (with self-referential format i.e., mapped with the <b>id</b> and <b>parentID</b> fields).</p>
            <p>In this demo, the first TreeView is bound with the hierarchical data that contains array of nested objects. And the second TreeView is bound with the list type data where the parent-child relation is referred by the <b>id</b> and <b>parentID</b> mapping fields.</p>
            <p>For more information, you can refer to the <a href="http://ej2.syncfusion.com/react/documentation/treeview/data-binding.html" target="_blank">Data Binding</a> section from the documentation.</p>
        </div>
      </div>
    )
  }
}
