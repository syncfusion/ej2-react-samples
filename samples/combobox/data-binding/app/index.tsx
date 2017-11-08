/**
 * ComboBox Remote-Data & Local-Data Samples
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { DataManager, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { SampleBase } from './sample-base';
import { PropertyPane } from './property-pane';


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
    private localDataObj: ComboBoxComponent;
    private remoteDataObj: ComboBoxComponent;
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

            </div>
        );
    }
}
ReactDOM.render(<Data />, document.getElementById('sample'));