import * as React from 'react';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { DataManager, Query, WebApiAdaptor } from '@syncfusion/ej2-data';
import { SampleBase } from '../common/sample-base';
import './style.css';
import * as data from './dataSource.json';
export class Data extends SampleBase {
    constructor() {
        super(...arguments);
        this.temp = 'countries';
        // define the JSON of country data
        this.countries = data[this.temp];
        // maps the appropriate column to fields property
        this.localFields = { text: 'Name', value: 'Code' };
        // bind the DataManager instance to dataSource property
        this.data = new DataManager({
            url: 'https://ej2services.syncfusion.com/production/web-services/api/Employees',
            adaptor: new WebApiAdaptor,
            crossDomain: true
        });
        // bind the Query instance to query property
        this.query = new Query().select(['FirstName', 'EmployeeID']).take(10).requiresCount();
        // maps the remote data column to fields property
        this.remoteFields = { text: 'FirstName', value: 'EmployeeID' };
    }
    render() {
        return (<div className='control-pane'>
                <div className='control-section'>
                    <div id="multilocal" className="control-styles">
                        <h4> Local Data</h4>
                        <div>
                            <MultiSelectComponent id="localData" dataSource={this.countries} fields={this.localFields} placeholder="Select countries"/>
                        </div>
                    </div>
                    <div id="multiremote" className="control-styles">
                        <h4>Remote Data</h4>
                        <div>
                            <MultiSelectComponent id="remoteData" dataSource={this.data} query={this.query} fields={this.remoteFields} sortOrder="Ascending" placeholder="Select names"/>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the different data binding supports of the DropDownList. Click the MultiSelect element and choose one or more items from the suggestion list. At the very first time, when clicked on the remote data MultiSelect,
                        the loader icon will be shown until the remote request get the data from server and display it.
                    </p>
                </div>
                
                <div id="description">
                    <p>The MultiSelect loads the data either from local data sources or remote data services through the <code>dataSource</code> property. It supports the data type of <code>array</code> or <code>DataManager</code>.
                    </p>
                    <p>The DataManager, that act as an interface between service endpoint and MultiSelect, will require the following minimal
                        information to interact with service endpoint properly.
                    </p>
                    <ul>
                        <li><code>DataManager->url</code> - Defines the service endpoint to fetch data.</li>
                        <li><code>DataManager->adaptor</code> - Defines the adaptor option. By default, <code>ODataAdaptor</code> is used for
                            remote binding.</li>
                    </ul>
                    <p>Adaptor is responsible for processing response and request from/to the service endpoint.
                        <code>@syncfusion/ej2-data</code> package provides some predefined adaptors that are designed to interact with particular
                        service endpoints. They are:</p>
                    <ul>
                        <li><code>UrlAdaptor</code> - Use this to interact any remote services.</li>
                        <li><code>ODataAdaptor</code> - Use this to interact with OData endpoints.</li>
                        <li><code>ODataV4Adaptor</code> - Use this to interact with OData V4 endpoints.</li>
                        <li><code>WebApiAdaptor</code> - Use this to interact with Web API created under OData standards.</li>
                        <li><code>WebMethodAdaptor</code> - Use this to interact with web methods.</li>
                    </ul>
                    <p>In this sample, the local data is bound to a collection of sports data and the remote data is bound to a collection of
                        customer data as an instance of <code>DataManager</code>.
                    </p>
                    <p> More information on the data binding feature configuration can be found in the
                        <a href="http://ej2.syncfusion.com/react/documentation/multi-select/data-binding.html" target="_blank"> documentation section</a>.
                    </p>
                </div>
            </div>);
    }
}
