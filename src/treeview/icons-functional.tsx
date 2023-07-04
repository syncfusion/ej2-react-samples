import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from "react";
import { updateSampleSection } from '../common/sample-base';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import './icons.css';
import * as dataSource from './dataSource/icons-data.json';

const Icons = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const data = dataSource as any;
  const fields: Object = { dataSource: data.iconData, id: 'nodeId', text: 'nodeText', child: 'nodeChild', iconCss: 'icon', imageUrl: 'image' };

  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div className='control_wrapper'>
          {/* Render the TreeView with image icons */}
          <TreeViewComponent id="treeview" fields={fields} sortOrder='Ascending' />
        </div>
      </div>
      <div id="action-description">
        <p>This <a href="https://www.syncfusion.com/react-ui-components/react-treeview" target="_blank">React TreeView example</a> demonstrates the node can be configured by icons/images in TreeView. Click on icon or double click on node to expand/collapse it, and show the icons/images that configured with nodes.</p>
      </div>
      <div id="description">
        <p>The <code>TreeView</code> component has the built-in option to customize each node's appearance with the icons and images by mapping the <code>iconCss</code> and <code>imageUrl</code> fields.</p>
        <p>In this demo, the TreeView is showcased like a file system with custom icons and images.</p>
      </div>
    </div>
  )
}
export default Icons;