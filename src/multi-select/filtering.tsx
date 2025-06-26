import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MultiSelectComponent, FilteringEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { NumericTextBoxComponent, ChangeEventArgs  } from '@syncfusion/ej2-react-inputs';
import { PropertyPane } from '../common/property-pane';
import { Query } from '@syncfusion/ej2-data';
import {  debounce } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import './style.css';
import * as data from './dataSource.json';

export class Filtering extends SampleBase<{}, {}> {
  private listObj: MultiSelectComponent;
  private temp:string = 'countries';
  //define the filtering data
  private data: { [key: string]: Object; }[] = data[this.temp];
    private query: Query = new Query();
    // maps the appropriate column to fields property
    private fields: Object = { text: 'Name', value: 'Code' };
    // filtering event handler to filter a country
    public onFiltering = debounce((e: FilteringEventArgs) => {
      let query = new Query();
      //frame the query based on search string with filter type.
      query = (e.text != "") ? query.where("Name", "startswith", e.text, true) : query;
      //pass the filter data source, filter query to updateData method.
      e.updateData(this.data, query);
    }, 400);
  onChange(args: ChangeEventArgs) {
              this.listObj.debounceDelay = args.value;
          }  
  render() {
    return (      
      <div className = 'control-pane'>
        <div className='control-section'>
          <div className='col-lg-8'>
            <div id='multifilter' className="control-styles" style={{paddingTop:'50px'}}>
              <h4>Filtering</h4>
              <MultiSelectComponent id="comboelement" ref={(multiselect) => { this.listObj = multiselect }} dataSource={this.data} filtering={this.onFiltering.bind(this)} allowFiltering={true} fields={this.fields} placeholder="Select countries" debounceDelay={300} />
            </div>
          </div>
          <div className='col-lg-4 property-section dropdown-filtering'>
            <PropertyPane title='Properties:'>
              <div className="property-panel-content">
                <label className="example-label">Debounce Delay</label>
                <NumericTextBoxComponent format='n0' value={300} min={1} change={this.onChange.bind(this)}></NumericTextBoxComponent>
              </div>
            </PropertyPane>
          </div>
        </div>
        <div id="action-description">
            <p>This sample demonstrates the filtering functionalities of the MultiSelect. Type a character in the MultiSelect element and choose one or more items from the <code>filtered</code> list.</p>
        </div>
        
        <div id="description">
            <p>The MultiSelect has built-in support to filter the data source when <code>allowFiltering</code> is enabled. It performs
                when characters are typed in the component. In <code>filtering</code> event, you can filter down the data source and
                return the resulted data to MultiSelect via <code>updateData</code> method to display its list items.
                The debounce delay, in milliseconds, for filtering items in the MultiSelect component can be set using the <a href="https://ej2.syncfusion.com/react/documentation/api/multi-select/#debouncedelay" target="_blank">debounceDelay</a> property.
            </p>
            <p>This sample illustrates that, query the data source and pass the resulted data to MultiSelect through the <code>updateData</code> method in <code>filtering</code> event.</p>
            <p>More information on the filtering feature configuration can be found in the
                <a href="http://ej2.syncfusion.com/react/documentation/multi-select/filtering.html" target="_blank"> documentation section</a>.
            </p>
        </div>
      </div>
    );
  }
}