import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { DropDownTreeComponent } from '@syncfusion/ej2-react-dropdowns';
import './local-data.css';
import * as dataSource from './local-data.json';

const LocalData = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const data = dataSource as any;
  // Hierarchical data source for Dropdown Tree component
  const fields: object = { dataSource: data.hierarchicalData, value: 'code', text: 'name', child: 'countries' };
  // Self-referential list data source for Dropdown Tree component
  const listfields: object = { dataSource: data.localData, value: 'id', parentValue: 'pid', text: 'name', hasChildren: 'hasChild' };

  return (
    <div className='control-pane'>
      <div className='control-section dropdowntree-local'>
        <div className='col-lg-6'>
          <div id="local">
            <p className="displayText"> Hierarchical Data</p>
            <DropDownTreeComponent id="ddtlocal" fields={fields} popupHeight="200px" placeholder="Select an item" />
          </div>
        </div>
        <div className='col-lg-6'>
          <div id="local">
            <p className="displayText">List Data</p>
            <DropDownTreeComponent id="ddtlist" fields={listfields} popupHeight="200px" placeholder="Select an item" />
          </div>
        </div>
      </div>

      <div id="action-description">
        <p>This sample explains you about the different local data binding supports of the Dropdown Tree component. Click
          the Dropdown Tree element, and then select an item from the hierarchical structure suggestion list.
        </p>
      </div>

      <div id="description">
        <p>The <code>Dropdown Tree</code> component loads the data through the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/drop-down-tree/fields/#datasource">dataSource</a> property, where the data can be
          either local data or remote data. In case of local data, the data structure can be hierarchical data or list
          data (with self-referential format i.e., mapped with the <b>value</b> and <b>parentValue</b> fields).</p>
        <p>In this demo, the first Dropdown Tree is bound with the hierarchical data that contains the array of nested
          objects. And, the second Dropdown Tree is bound with the list type data where the parent-child relation is
          referred by the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/drop-down-tree/fields/#value">value</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/drop-down-tree/fields/#parentvalue">parentValue</a> mapping fields.</p>
      </div>
    </div>
  )
}
export default LocalData;
