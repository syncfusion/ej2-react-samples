import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import { DataManager, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';
import './remote-data.css';

const RemoteData = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])

  const [loading,setLoading] = useState<string>('');
  // Use data manager to get tree data from remote source
  const data: DataManager = new DataManager({
    url: 'https://services.odata.org/V4/Northwind/Northwind.svc',
    adaptor: new ODataV4Adaptor,
    crossDomain: true,
  });

  // Set queries to filter and fetch remote data
  const query: Query = new Query().from('Employees').select('EmployeeID,FirstName,Title').take(5);
  const query1: Query = new Query().from('Orders').select('OrderID,EmployeeID,ShipName').take(5);
  const fields: object = {
    dataSource: data, query: query, id: 'EmployeeID', text: 'FirstName', hasChildren: 'EmployeeID',
    child: { dataSource: data, query: query1, id: 'OrderID', parentID: 'EmployeeID', text: 'ShipName' }
  };

  // Show loading message, while loading tree data
  const show = (): void => {
    // let popup: HTMLElement = document.getElementById('loading');
    // popup.style.display = '';
    setLoading('Loading...');
  }

  // Hide loading message, after tree data has been loaded
  const hide = (): void => {
    // let popup: HTMLElement = document.getElementById('loading') as HTMLElement;
    // popup.style.display = 'none';
    setLoading('');
  }

  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div className='tree-control_wrapper'>
          <span id="loading">{loading}</span>
          <TreeViewComponent fields={fields} dataBound={hide.bind(this)} created={show.bind(this)} />
        </div>
      </div>
      <div id="action-description">
        <p>This <a href="https://www.syncfusion.com/react-ui-components/react-treeview" target="_blank">React TreeView example</a> demonstrates the binding data to the TreeView from remote data source. On expanding the parent node, the spinner icon will be displayed until the child nodes will be loaded into parent node. Click on node to select it, and click on icon or double click on node to expand/collapse it.</p>
      </div>
      <div id="description">
        <p>The <code>TreeView</code> component loads the data through the <code>dataSource</code> property, where the data can be either local data or remote data. In case of remote data, the data can be loaded from any remote services though the <code>DataManager</code>.</p>
        <p>The DataManager will act as an interface between the service endpoint and the TreeView, that requires the below minimal information to interact with the service endpoint.</p>
        <ul>
          <li><code>DataManager-&gt;url</code> - Defines the service endpoint to fetch data.</li>
          <li><code>DataManager-&gt;adaptor</code> - Defines the adaptor option. By default, ODataAdaptor is used for remote binding.</li>
        </ul>
        <p>In this demo, the TreeView is bound with the dataSource from the Northwind remote service by using the DataManager instance.</p>
        <p>For more information, you can refer to the <a href="https://ej2.syncfusion.com/react/documentation/treeview/data-binding/#remote-data" target="_blank">Data Binding</a> section from the documentation.</p>
      </div>
    </div>
  )
}
export default RemoteData;