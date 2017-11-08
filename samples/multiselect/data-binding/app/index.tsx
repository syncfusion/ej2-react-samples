import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { DataManager, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { SampleBase } from './sample-base';


export class Data extends SampleBase<{}, {}> {
    // define the JSON of country data
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
    // maps the appropriate column to fields property
    private localFields: Object = { text: 'Name', value: 'Code' };
    // bind the DataManager instance to dataSource property
    private data: DataManager = new DataManager({
        url: 'http://services.odata.org/V4/Northwind/Northwind.svc/Customers',
        adaptor: new ODataV4Adaptor,
        crossDomain: true
    });
    // bind the Query instance to query property
    private query: Query = new Query().select(['ContactName', 'CustomerID']);
    // maps the remote data column to fields property
    private remoteFields: Object = { text: 'ContactName', value: 'CustomerID' };
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div id="multilocal" className="control-styles">
                        <h4> Local Data</h4>
                        <div>
                            <MultiSelectComponent id="localData" dataSource={this.countries} fields={this.localFields} placeholder="Select countries" />
                        </div>
                    </div>
                    <div id="multiremote" className="control-styles">
                        <h4>Remote Data</h4>
                        <div>
                            <MultiSelectComponent id="remoteData" dataSource={this.data} query={this.query} fields={this.remoteFields} sortOrder="Ascending" placeholder="Select customers" />
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}
ReactDOM.render(<Data />, document.getElementById('sample'));