import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { updateSampleSection } from '../common/sample-base';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import './treeview.css';
import * as dataSource from './dataSource/multiSelect-data.json';

function MultiSelect() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  const data = dataSource as any;
  const fields: Object = { dataSource: data.multiSelectData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild', selected: 'isSelected' };
  const allowMultiSelection: boolean = true;

  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div className='tree-control_wrapper'>
          {/* Render the TreeView with node multi select option */}
          <TreeViewComponent fields={fields} allowMultiSelection={allowMultiSelection} />
        </div>
      </div>
      <div id="action-description">
        <p>This <a href="https://www.syncfusion.com/react-ui-components/react-treeview" target="_blank">React TreeView example</a> demonstrates the multiple node selection functionalities of the TreeView. To select multiple nodes, press the CTRL key and select the desired nodes; or select any node and by pressing SHIFT key select another node, this selects all the nodes in-between the selected nodes.</p>
      </div>
      <div id="description">
        <p>The <code>TreeView</code> component allows to select multiple nodes by enabling the <code>allowMultiSelection</code> property.</p>
        <p>In this demo, the TreeView is enabled with multiple selection</p>
        <p>For more information, refer to the <a href="https://ej2.syncfusion.com/react/documentation/treeview/multiple-selection/" target="_blank">Multi Selection</a> section from the documentation.</p>
      </div>
    </div>
  )
}
export default MultiSelect;