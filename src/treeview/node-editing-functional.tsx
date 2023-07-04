import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from "react";
import { updateSampleSection } from '../common/sample-base';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import './treeview.css';
import * as dataSource from './dataSource/nodeEdit-data.json';

const Editing = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const data = dataSource as any;
  const fields: Object = { dataSource: data.nodeData, id: 'id', text: 'name', child: 'child' };

  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div className='tree-control_wrapper'>
          {/* Render the TreeView with editing option */}
          <TreeViewComponent fields={fields} allowEditing={true} />
        </div>
      </div>
      <div id="action-description">
        <p>This <a href="https://www.syncfusion.com/react-ui-components/react-treeview" target="_blank">React TreeView example</a> demonstrates the node editing functionalities of the TreeView. Double click on the node or press F2 key on selected node to edit node's text in input textbox. Press enter key or click outside of the input element to save the node's, or press escape key to cancel the modified text.</p>
      </div>
      <div id="description">
        <p>The <code>TreeView</code> component has the built-in option to edit and modify the node text in inline by enabling the <code>allowEditing</code> property.</p>
        <p>For more information, you can refer to the <a href="https://ej2.syncfusion.com/react/documentation/treeview/node-editing/" target="_blank">Node Editing</a> section from the documentation.</p>
      </div>
    </div>
  )
}
export default Editing;