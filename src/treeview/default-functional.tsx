import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { updateSampleSection } from '../common/sample-base';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import './treeview.css';
import * as dataSource from './dataSource/default-data.json';

function Default() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  const data = dataSource as any;
  const fields: object = { dataSource: data.defaultData, id: 'id', text: 'name', child: 'subChild' };

  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div className='tree-control_wrapper'>
          {/* Render TreeView */}
          <TreeViewComponent fields={fields} />
        </div>
      </div>
      <div id="action-description">
        <p>This <a href="https://www.syncfusion.com/react-ui-components/react-treeview" target="_blank">React TreeView example</a> demonstrates the default functionalities of the TreeView. Click on node to select it, and click on icon or double click on node to expand/collapse it. The child nodes will be loaded on expand the parent node.</p>
      </div>
      <div id="description">
        <p>The <code>TreeView</code> component is used to display the data in a hierarchical structure with the configuration options to control the way of data is presented and manipulated. It will pull the data from a data source, such as an array of JSON objects, OData web services, or DataManager binding data fields to the <code>fields</code> property.</p>
        <p>In this demo, the TreeView is populated with its minimum default settings.</p>
        <p>More information on the TreeView instantiation can be found in the <a href="https://ej2.syncfusion.com/react/documentation/treeview/getting-started/" target="_blank">documentation section</a>.</p>
      </div>
    </div>
  )
}
export default Default;