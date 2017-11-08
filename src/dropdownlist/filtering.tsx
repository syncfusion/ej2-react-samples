/**
 * DropDownList Filtering Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DropDownListComponent, FilteringEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { SampleBase } from '../common/sample-base';
import './filtering.css';

export class Filtering extends SampleBase<{}, {}> {

  private listObj: DropDownListComponent;
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
  private fields: Object = { text: 'Name', value: 'Code' };
  public onFiltering = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('Name', 'startswith', e.text, true) : query;
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
        <div id="description">
            <p>The DropDownList has built-in support to filter the data source, when <code>allowFiltering</code> is enabled. It performs
                when characters are typed in the search box. In the <code>filtering</code> event, you can filter down the data source and
                return the resulted data to DropDownList via <code>updateData</code> method to display its list items.</p>
            <p>This sample illustrates that, query the data source and pass the resulted data to DropDownList through the <code>updateData</code> method in <code>filtering</code> event.</p>
            <p>More information on the filtering feature configuration can be found in the
                <a href="http://ej2.syncfusion.com/documentation/drop-down-list/filtering.html" target="_blank"> documentation section</a>.
            </p>
        </div>
      </div>
    );
  }
}