import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MultiSelectComponent, FilteringEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import {  debounce } from '@syncfusion/ej2-base';
import { SampleBase } from './sample-base';


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
      </div>
    );
  }
}
ReactDOM.render(<Filtering />, document.getElementById('sample'));