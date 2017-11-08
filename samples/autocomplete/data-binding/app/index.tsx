/**
 * AutoComplete Remote-Data & Local-Data Samples
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { AutoCompleteComponent } from '@syncfusion/ej2-react-dropdowns';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { DataManager, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { SampleBase } from './sample-base';
import { PropertyPane } from './property-pane';


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
    public productData: DataManager = new DataManager({
        url: 'http://services.odata.org/V4/Northwind/Northwind.svc/Products',
        adaptor: new ODataV4Adaptor,
        crossDomain: true
    });
    public query: Query = new Query().select(['ProductID', 'ProductName']);
    public remoteFields: Object = { value: 'ProductName' };
    private localFields: Object = { value: 'Name' };
    private localDataObj: AutoCompleteComponent;
    private remoteDataObj: AutoCompleteComponent;
    public loader: HTMLElement;
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
            </div>
        );
    }
}
ReactDOM.render(<Data />, document.getElementById('sample'));