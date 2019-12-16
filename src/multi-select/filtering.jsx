import * as React from 'react';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { debounce } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import './style.css';
import * as data from './dataSource.json';
export class Filtering extends SampleBase {
    constructor() {
        super(...arguments);
        this.temp = 'countries';
        //define the filtering data
        this.data = data[this.temp];
        this.query = new Query();
        // maps the appropriate column to fields property
        this.fields = { text: 'Name', value: 'Code' };
        // filtering event handler to filter a country
        this.onFiltering = debounce((e) => {
            let query = new Query();
            //frame the query based on search string with filter type.
            query = (e.text != "") ? query.where("Name", "startswith", e.text, true) : query;
            //pass the filter data source, filter query to updateData method.
            e.updateData(this.data, query);
        }, 400);
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
            <div id='multifilter' className="control-styles">
              <h4>Filtering</h4>
              <MultiSelectComponent id="comboelement" dataSource={this.data} filtering={this.onFiltering.bind(this)} allowFiltering={true} fields={this.fields} placeholder="Select countries"/>
            </div>
        </div>
        <div id="action-description">
            <p>This sample demonstrates the filtering functionalities of the MultiSelect. Type a character in the MultiSelect element and choose one or more items from the <code>filtered</code> list.</p>
        </div>
        
        <div id="description">
            <p>The MultiSelect has built-in support to filter the data source when <code>allowFiltering</code> is enabled. It performs
                when characters are typed in the component. In <code>filtering</code> event, you can filter down the data source and
                return the resulted data to MultiSelect via <code>updateData</code> method to display its list items.</p>
            <p>This sample illustrates that, query the data source and pass the resulted data to MultiSelect through the <code>updateData</code> method in <code>filtering</code> event.</p>
            <p>More information on the filtering feature configuration can be found in the
                <a href="http://ej2.syncfusion.com/react/documentation/multi-select/filtering.html" target="_blank"> documentation section</a>.
            </p>
        </div>
      </div>);
    }
}
