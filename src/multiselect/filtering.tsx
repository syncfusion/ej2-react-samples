import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MultiSelectComponent, FilteringEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import {  debounce } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import './style.css';

export class Filtering extends SampleBase<{}, {}> {
  private data: { [key: string]: Object; }[] = [
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
    private query: Query = new Query();
    private fields: Object = { text: 'Name', value: 'Code' };
  public onFiltering = debounce((e: FilteringEventArgs) => {
    let query = new Query();
    query = (e.text != "") ? query.where("Name", "startswith", e.text, true) : query;
    e.updateData(this.data, query);
  }, 400);
  render() {
    return (      
      <div className = 'control-pane'>
        <div className='control-section'>
            <div id='multifilter' className="control-styles">
              <h4>Filtering</h4>
              <MultiSelectComponent id="comboelement" dataSource={this.data} filtering={this.onFiltering.bind(this)} allowFiltering={true} fields={this.fields} placeholder="Select countries" />
            </div>
        </div>
        <div id="description">
            <p>The MultiSelect has built-in support to filter the data source when <code>allowFiltering</code> is enabled. It performs
                when characters are typed in the component. In <code>filtering</code> event, you can filter down the data source and
                return the resulted data to MultiSelect via <code>updateData</code> method to display its list items.</p>
            <p>This sample illustrates that, query the data source and pass the resulted data to MultiSelect through the <code>updateData</code> method in <code>filtering</code> event.</p>
            <p>More information on the filtering feature configuration can be found in the
                <a href="http://ej2.syncfusion.com/documentation/multi-select/filtering.html" target="_blank"> documentation section</a>.
            </p>
        </div>
      </div>
    );
  }
}