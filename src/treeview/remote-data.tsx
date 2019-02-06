import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import {TreeViewComponent} from '@syncfusion/ej2-react-navigations';
import { DataManager, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';
import './remote-data.css';

export class RemoteData extends SampleBase<{}, {}> {

// Use data manager to get tree data from remote source
public data: DataManager = new DataManager({
    url: 'https://services.odata.org/V4/Northwind/Northwind.svc',
    adaptor: new ODataV4Adaptor,
    crossDomain: true,
});

// Set queries to filter and fetch remote data
public query: Query = new Query().from('Employees').select('EmployeeID,FirstName,Title').take(5);
public query1: Query = new Query().from('Orders').select('OrderID,EmployeeID,ShipName').take(5);
public fields: object = { dataSource: this.data, query: this.query, id: 'EmployeeID', text: 'FirstName', hasChildren: 'EmployeeID',
child: { dataSource: this.data, query: this.query1, id: 'OrderID', parentID: 'EmployeeID', text: 'ShipName' }
};

// Show loading message, while loading tree data
public show(): void {
  let popup: HTMLElement = document.getElementById('loading');
  popup.style.display = '';
}

// Hide loading message, after tree data has been loaded
public hide(): void {
  let popup: HTMLElement = document.getElementById('loading') as HTMLElement;
  popup.style.display = 'none';
}

  render() {
    return (       
      <div className = 'control-pane'>
        <div className='control-section'>
        <div className='tree-control_wrapper'>
            <span id="loading">Loading...</span>
            <TreeViewComponent fields={this.fields} dataBound={this.hide.bind(this)} created={this.show.bind(this)} />
        </div>
        </div>
        <div id="action-description">
            <p>This sample demonstrates the binding data to the TreeView from remote data source. On expanding the parent node, the spinner icon will be displayed until the child nodes will be loaded into parent node. Click on node to select it, and click on icon or double click on node to expand/collapse it.</p>
        </div>
        <div id="description">
            <p>The <code>TreeView</code> component loads the data through the <code>dataSource</code> property, where the data can be either local data or remote data. In case of remote data, the data can be loaded from any remote services though the <code>DataManager</code>.</p>
            <p>The DataManager will act as an interface between the service endpoint and the TreeView, that requires the below minimal information to interact with the service endpoint.</p>
            <ul>
                <li><code>DataManager->url</code> - Defines the service endpoint to fetch data.</li>
                <li><code>DataManager->adaptor</code> - Defines the adaptor option. By default, ODataAdaptor is used for remote binding.</li>
            </ul>
            <p>In this demo, the TreeView is bound with the dataSource from the Northwind remote service by using the DataManager instance.</p>
            <p>For more information, you can refer to the <a href="http://ej2.syncfusion.com/react/documentation/treeview/data-binding.html" target="_blank">Data Binding</a> section from the documentation.</p>
        </div>
      </div>
    )
  }
}
