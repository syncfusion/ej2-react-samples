/**
 * ComboBox Remote-Data & Local-Data Samples
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { DataManager, Query, ODataAdaptor } from '@syncfusion/ej2-data';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import './databinding.css';

export class Data extends SampleBase<{}, {}> {

    // define the JSON of data
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
    // bind the DataManager instance to dataSource property
    private customerData: DataManager = new DataManager({
        url: 'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Customers',
        adaptor: new ODataAdaptor,
        crossDomain: true
    });
    // bind the Query instance to query property
    private query: Query = new Query().select(['ContactName', 'CustomerID']);
    // maps the remote data column to fields property
    private remoteFields: Object = { text: 'ContactName', value: 'CustomerID' };
    // maps the local data column to fields property
    private localFields: Object = { text: 'Game', value: 'Id' };
    private localDataObj: ComboBoxComponent;
    private remoteDataObj: ComboBoxComponent;
    onChange(args: ChangeEventArgs) {
        // enable or disable the autofill in local data ComboBox based on CheckBox checked state
        this.localDataObj.autofill = args.checked;
        // enable or disable the autofill in remote data ComboBox based on CheckBox checked state
        this.remoteDataObj.autofill = args.checked;
    }
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className='col-lg-9'>
                        <div className='col-lg-6'>
                            <div id="local">
                                <h4> Local Data</h4>
                                <ComboBoxComponent id="games" dataSource={this.sportsData} ref={(combobox) => { this.localDataObj = combobox }} fields={this.localFields} placeholder="Select a game" popupHeight="220px" autofill={true} />
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div id="remote">
                                <h4>Remote Data</h4>
                                <ComboBoxComponent id="customers" dataSource={this.customerData} ref={(combobox) => { this.remoteDataObj = combobox }} sortOrder="Ascending" query={this.query} fields={this.remoteFields} placeholder="Select a customer" autofill={true} popupHeight="220px" />
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-3 property-section'>
                        <PropertyPane title='Properties'>                            
                            <div  style={{marginLeft: '75px', paddingTop:'35px'}}>
                                <CheckBoxComponent checked={true} label='Autofill' change={ this.onChange.bind(this) } ></CheckBoxComponent>
                            </div> 
                        </PropertyPane>
                    </div>
                </div>

                <div id="action-description">
                    <p>This sample demonstrates the different data binding supports of the ComboBox. Type a character(s) in the ComboBox element and the remaining characters are automatically filled based on the first matched item.
                        Also, provided option to enable/disable this <code>autofill</code> feature in the property panel.</p>
                </div>

                <div id="description">
                    <p>The ComboBox loads the data either from local data sources or remote data services through the <code>dataSource</code> property. It supports the data type of <code>array</code> or <code>DataManager</code>.</p>
                    <p>The DataManager, that act as an interface between service endpoint and ComboBox will require the following minimal
                        information to interact with the service endpoint properly.
                    </p>
                    <ul>
                        <li><code>DataManager->url</code> - Defines the service endpoint to fetch data.</li>
                        <li><code>DataManager->adaptor</code> - Defines the adaptor option. By default, <code>ODataAdaptor</code> is used for
                            remote binding.</li>
                    </ul>
                    <p>The adaptor is responsible for processing response and request from/to the service endpoint.
                        <code>@syncfusion/ej2-data</code> package provides some predefined adaptors which are designed to interact with particular
                        service endpoints. They are:</p>
                    <ul>
                        <li><code>UrlAdaptor</code> - Use this to interact any remote services.</li>
                        <li><code>ODataAdaptor</code> - Use this to interact with OData endpoints.</li>
                        <li><code>ODataV4Adaptor</code> - Use this to interact with OData V4 endpoints.</li>
                        <li><code>WebApiAdaptor</code> - Use this to interact with Web API created under OData standards.</li>
                        <li><code>WebMethodAdaptor</code> - Use this to interact with web methods.</li>
                    </ul>
                    <p>In this sample, the local data is bound to a collection of sports data and the remote data is bound to a collection of
                        customer data as an instance of <code>DataManager</code>. Also, provided option to enable/disable <code>autofill</code> feature in the property panel.
                    </p>
                    <p> More information on the data binding feature configuration can be found in the
                        <a href="http://ej2.syncfusion.com/react/documentation/combo-box/data-binding.html" target="_blank"> documentation section</a>.
                    </p>
                </div>
            </div>
        );
    }
}