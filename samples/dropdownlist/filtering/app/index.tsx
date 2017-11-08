/**
 * DropDownList Filtering Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DropDownListComponent, FilteringEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { SampleBase } from './sample-base';


export class Filtering extends SampleBase<{}, {}> {

  private listObj: DropDownListComponent;
  //define the filtering data
  private searchData: { [key: string]: Object; }[] = [
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
  private fields: Object = { text: 'Name', value: 'Code' };
  // filtering event handler to filter a Country
  public onFiltering = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text !== '') ? query.where('Name', 'startswith', e.text, true) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.searchData, query);
  };

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div id='filtering'>
            <DropDownListComponent id="country" ref={(dropdownlist) => { this.listObj = dropdownlist }} dataSource={this.searchData} filtering={this.onFiltering.bind(this)} filterBarPlaceholder='Search a country' allowFiltering={true} fields={this.fields} placeholder="Select a country" popupHeight="220px" />
          </div>
        </div>
        
      </div>
    );
  }
}
ReactDOM.render(<Filtering />, document.getElementById('sample'));