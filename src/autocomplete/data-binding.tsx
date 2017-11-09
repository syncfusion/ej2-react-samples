/**
 * AutoComplete Remote-Data & Local-Data Samples
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { AutoCompleteComponent } from '@syncfusion/ej2-react-dropdowns';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { DataManager, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import './databinding.css';

export class Data extends SampleBase<{}, {}> {

    private countries: { [key: string]: Object; }[] = [
        { Name: 'Australia', Code: 'AU' },
        { Name: 'Bermuda', Code: 'BM' },
        { Name: 'Canada', Code: 'CA' },
        { Name: 'Cameroon', Code: 'CM' },
        { Name: 'Denmark', Code: 'DK' },
        { Name: 'France', Code: 'FR' },
        { Name: 'Finland', Code: 'FI' },
        { Name: 'Germany', Code: 'DE' },
        { Name: 'Greenland', Code: 'GL' },
        { Name: 'Hong Kong', Code: 'HK' },
        { Name: 'India', Code: 'IN' },
        { Name: 'Italy', Code: 'IT' },
        { Name: 'Japan', Code: 'JP' },
        { Name: 'Mexico', Code: 'MX' },
        { Name: 'Norway', Code: 'NO' },
        { Name: 'Poland', Code: 'PL' },
        { Name: 'Switzerland', Code: 'CH' },
        { Name: 'United Kingdom', Code: 'GB' },
        { Name: 'United States', Code: 'US' }
    ];
    // bind the DataManager instance to dataSource property
    public productData: DataManager = new DataManager({
        url: 'http://services.odata.org/V4/Northwind/Northwind.svc/Products',
        adaptor: new ODataV4Adaptor,
        crossDomain: true
    });
    // bind the Query instance to query property
    public query: Query = new Query().select(['ProductID', 'ProductName']);
    // map the appropriate columns to remote data fields property
    public remoteFields: Object = { value: 'ProductName' };
    // map the appropriate columns to local data fields property
    private localFields: Object = { value: 'Name' };
    // AutoComplete object creation
    private localDataObj: AutoCompleteComponent;
    // AutoComplete Object creation
    private remoteDataObj: AutoCompleteComponent;
    // Bind change event
    onChange(args: ChangeEventArgs) {
        this.localDataObj.autofill = args.checked;
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
                                <AutoCompleteComponent id="country" dataSource={this.countries} ref={(autocomplete) => { this.localDataObj = autocomplete }} fields={this.localFields} popupHeight="250px" placeholder="e.g. Australia" autofill={true} filterType='StartsWith' />
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div id="remote">
                                <h4>Remote Data</h4>
                                <AutoCompleteComponent id="products" dataSource={this.productData} query={this.query} ref={(autocomplete) => { this.remoteDataObj = autocomplete }} sortOrder="Ascending" fields={this.remoteFields} autofill={true} placeholder="e.g. Alice Mutton" suggestionCount={5} filterType='StartsWith' />
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
                    <p>This sample demonstrates the different data binding supports of the AutoComplete. Type a character(s) in the AutoComplete element and the remaining characters are automatically filled based on the first matched item.
                        Also, provided option to enable/disable this <code>autofill</code> feature in the property panel.</p>
                </div>
                
                <div id="description">
                    <p>The AutoComplete loads the data either from local data sources or remote data services through the <code>dataSource</code> property. It supports the data type of <code>array</code> or <code>DataManager</code>.</p>
                    <p>The DataManager, that act as an interface between service endpoint and AutoComplete, will require the follwoing minimal
                        information to interact with the service endpoint properly.
                    </p>
                    <ul>
                        <li><code>DataManager->url</code> - Defines the service endpoint to fetch data.</li>
                        <li><code>DataManager->adaptor</code> - Defines the adaptor option. By default, <code>ODataAdaptor</code> is used for
                            remote binding.</li>
                    </ul>
                    <p>The adaptor is responsible for processing response and request from/to the service endpoint.
                        <code>@syncfusion/ej2-data</code> package provides some predefined adaptors that are designed to interact with particular
                        service endpoints. They are:</p>
                    <ul>
                        <li><code>UrlAdaptor</code> - Use this to interact any remote services.</li>
                        <li><code>ODataAdaptor</code> - Use this to interact with OData endpoints.</li>
                        <li><code>ODataV4Adaptor</code> - Use this to interact with OData V4 endpoints.</li>
                        <li><code>WebApiAdaptor</code> - Use this to interact with Web API created under OData standards.</li>
                        <li><code>WebMethodAdaptor</code> - Use this to interact with web methods.</li>
                    </ul>
                    <p> More information on the data binding feature configuration can be found in the
                        <a href="http://ej2.syncfusion.com/react/documentation/auto-complete/data-binding.html" target="_blank"> documentation section</a>.
                    </p>
                </div>
            </div>
        );
    }
}