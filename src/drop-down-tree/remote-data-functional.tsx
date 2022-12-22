import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { updateSampleSection } from '../common/sample-base';
import { DropDownTreeComponent } from '@syncfusion/ej2-react-dropdowns';
import { DataManager, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';
import './remote-data.css';

function RemoteData() {
    React.useEffect(() => {
        updateSampleSection();
        }, [])

    // Use data manager to get dropdown tree data from remote source
    let data: DataManager = new DataManager({
        url: 'https://services.odata.org/V4/Northwind/Northwind.svc',
        adaptor: new ODataV4Adaptor,
        crossDomain: true,
    });

    // Set queries to filter and fetch remote data
    let query: Query = new Query().from('Employees').select('EmployeeID,FirstName,Title').take(5);
    let query1: Query = new Query().from('Orders').select('OrderID,EmployeeID,ShipName').take(5);
    let fields: object = {
        dataSource: data, query: query, value: 'EmployeeID', text: 'FirstName', hasChildren: 'EmployeeID',
        child: { dataSource: data, query: query1, value: 'OrderID', parentValue: 'EmployeeID', text: 'ShipName' }
    };

    return (
      <div className='control-pane'>
        <div className='control-section dropdowntree-remote'>
          <div id="remote">
            <DropDownTreeComponent id="ddtremote" fields={fields} placeholder="Select a name" popupHeight="200px" />
          </div>
        </div>

        <div id="action-description">
          <p>This sample explains you about how to bind data to the Dropdown Tree from a remote data source. Click the
          Dropdown Tree element, and then select an item from the hierarchical structure suggestion list.</p>
        </div>
        <div id="description">
          <p>The <code>Dropdown Tree</code> loads the data from the remote data services through the dataSource property. It
            supports the data type of <code>array</code> or <code>DataManager</code>.</p>
          <p>The DataManager that act as an interface between the service endpoint and Dropdown Tree, will require the below
            minimal information to interact with the service endpoint properly.
          </p>
          <ul>
            <li><code>DataManager-&gt;url</code> - Defines the service endpoint to fetch data</li>
            <li><code>DataManager-&gt;adaptor</code> - Defines the adaptor option. By default, <code>ODataAdaptor</code> is
              used for remote binding.</li>
          </ul>
          <p>Adaptor is responsible for processing response and request from or to the service endpoint.
            <code>@syncfusion/ej2-data</code> package provides some pre-defined adaptors that are designed to interact with
            the particular service endpoints. They are:</p>
          <ul>
            <li><code>UrlAdaptor</code> - To interact with any remote services.</li>
            <li><code>ODataAdaptor</code> - To interact with OData endpoints.</li>
            <li><code>ODataV4Adaptor</code> - To interact with OData V4 endpoints.</li>
            <li><code>WebApiAdaptor</code> - To interact with Web API created under OData standards.</li>
            <li><code>WebMethodAdaptor</code> - To interact with web methods.</li>
          </ul>
          <p>In this demo, the Dropdown Tree is bound with the dataSource from the Northwind remote service by using the
            DataManager instance.</p>
        </div>
      </div>
    )
}
export default RemoteData;