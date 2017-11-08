/**
 * DropDownList Remote-Data & Local-Data Samples
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { DataManager, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { SampleBase } from '../common/sample-base';
import './databinding.css';

export class Data extends SampleBase<{}, {}> {

    private sportsData: { [key: string]: Object }[] = [
        { Id: 'Game1', Game: 'American Football' },
        { Id: 'Game2', Game: 'Badminton' },
        { Id: 'Game3', Game: 'Basketball' },
        { Id: 'Game4', Game: 'Cricket' },
        { Id: 'Game5', Game: 'Football' },
        { Id: 'Game6', Game: 'Golf' },
        { Id: 'Game7', Game: 'Hockey' },
        { Id: 'Game8', Game: 'Rugby' },
        { Id: 'Game9', Game: 'Snooker' },
        { Id: 'Game10', Game: 'Tennis' }
    ];
    private customerData: DataManager = new DataManager({
        url: 'http://services.odata.org/V4/Northwind/Northwind.svc/Customers',
        adaptor: new ODataV4Adaptor,
        crossDomain: true
    });
    private query: Query = new Query().select(['ContactName', 'CustomerID']);
    private remoteFields: Object = { text: 'ContactName', value: 'CustomerID' };
    private localFields: Object = { text: 'Game', value: 'Id' };
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className='col-lg-6'>
                        <div id="local">
                            <h4> Local Data</h4>
                            <DropDownListComponent id="games" dataSource={this.sportsData} fields={this.localFields} placeholder="Select a game" popupHeight="220px" />
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <div id="remote">
                            <h4>Remote Data</h4>
                            <DropDownListComponent id="customers" dataSource={this.customerData} sortOrder="Ascending" query={this.query} fields={this.remoteFields} placeholder="Select a customer" popupHeight="220px" />
                        </div>
                    </div>

                </div>
                <div id="description">
                    <p>The DropDownList loads the data either from the local data sources, or remote data services that is is through the <code>dataSource</code> property. It supports the data type of <code>array</code> or <code>DataManager</code>.
                    </p>
                    <p>The DataManager that act as an interface between service endpoint and DropDownList, will require the below minimal
                        information to interact with the service endpoint properly.
                    </p>
                    <ul>
                        <li><code>DataManager->url</code> - Defines the service endpoint to fetch data</li>
                        <li><code>DataManager->adaptor</code> - Defines the adaptor option. By default, <code>ODataAdaptor</code> is used for
                            remote binding.</li>
                    </ul>
                    <p>Adaptor is responsible for processing response and request from/to the service endpoint.
                        <code>@syncfusion/ej2-data</code> package provides some predefined adaptors that are designed to interact with the particular
                        service endpoints. They are:</p>
                    <ul>
                        <li><code>UrlAdaptor</code> - Use this to interact any remote services.</li>
                        <li><code>ODataAdaptor</code> - Use this to interact with OData endpoints.</li>
                        <li><code>ODataV4Adaptor</code> - Use this to interact with OData V4 endpoints.</li>
                        <li><code>WebApiAdaptor</code> - Use this to interact with Web API created under OData standards.</li>
                        <li><code>WebMethodAdaptor</code> - Use this to interact with web methods.</li>
                    </ul>
                    <p>In this sample, the local data is bound to a collection of sports data, and the remote data is bound to a collection of
                        customer data as an instance of <code>DataManager</code>.
                    </p>
                    <p> More information on the data binding feature configuration can be found in the
                        <a href="http://ej2.syncfusion.com/documentation/drop-down-list/data-binding.html" target="_blank"> documentation section</a>.
                    </p>
                </div>
            </div>
        );
    }
}