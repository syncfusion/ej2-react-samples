import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from "react";
import { updateSampleSection } from '../common/sample-base';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import './template.css';
import * as dataSource from './dataSource/template-data.json';

const Template = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const data = dataSource as any;
  const fields: Object = { dataSource: data.templateData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };
  const cssClass: string = "template-tree";
  const nodeTemplate = (data: any) => {
    return (
      <div>
        <div className="treeviewdiv">
          <div className="textcontent">
            <span className="treeName">{data.name}</span>
          </div>
          {data.count &&
            <div className="countcontainer">
              <span className="treeCount e-badge e-badge-primary" >{data.count}</span>
            </div>
          }
        </div>
      </div>
    )
  };
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div className='tree-control-wrapper'>
          {/* Render the TreeView using template option */}
          <TreeViewComponent fields={fields} nodeTemplate={nodeTemplate as any} cssClass={cssClass} />
        </div>
      </div>
      <div id="action-description">
        <p>This <a href="https://www.syncfusion.com/react-ui-components/react-treeview" target="_blank">React TreeView example</a> demonstrates the template functionalities of the TreeView. Select the root node by clicking on it, or expand the root node and select the customized child node.</p>
      </div>
      <div id="description">
        <p>The <code>TreeView</code> component has an option to customize the node structure through the <code>nodeTemplate</code> property, so that the tree node can be formed with any custom structure.</p>
        <p>In this demo, the node is formed as like webmail with folder name and number of unread messages.</p>
        <p>For more information, you can refer to the <a href="https://ej2.syncfusion.com/react/documentation/treeview/template/" target="_blank">Templates</a> section from the documentation.</p>
      </div>
    </div>
  )
}
export default Template;