/**
 * DropDownList Remote-Data & Local-Data Samples
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { DataManager, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { SampleBase } from './sample-base';


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
        url: 'http://services.odata.org/V4/Northwind/Northwind.svc/Customers',
        adaptor: new ODataV4Adaptor,
        crossDomain: true
    });
    // bind the Query instance to query property
    private query: Query = new Query().select(['ContactName', 'CustomerID']);
    // maps the remote data column to fields property
    private remoteFields: Object = { text: 'ContactName', value: 'CustomerID' };
    // maps the local data column to fields property
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
                
            </div>
        );
    }
}
ReactDOM.render(<Data />, document.getElementById('sample'));