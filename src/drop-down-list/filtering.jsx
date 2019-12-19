import * as React from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { SampleBase } from '../common/sample-base';
import './filtering.css';
import * as data from './dataSource.json';
export class Filtering extends SampleBase {
    constructor() {
        super(...arguments);
        //define the filtering data
        this.temp = 'countries';
        this.searchData = data[this.temp];
        // maps the appropriate column to fields property
        this.fields = { text: 'Name', value: 'Code' };
        // filtering event handler to filter a Country
        this.onFiltering = (e) => {
            let query = new Query();
            //frame the query based on search string with filter type.
            query = (e.text !== '') ? query.where('Name', 'startswith', e.text, true) : query;
            //pass the filter data source, filter query to updateData method.
            e.updateData(this.searchData, query);
        };
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
          <div id='filtering'>
            <DropDownListComponent id="country" ref={(dropdownlist) => { this.listObj = dropdownlist; }} dataSource={this.searchData} filtering={this.onFiltering.bind(this)} filterBarPlaceholder='Search a country' allowFiltering={true} fields={this.fields} placeholder="Select a country" popupHeight="220px"/>
          </div>
        </div>
        <div id="action-description">
            <p>This sample demonstrates the filtering functionalities of the DropDownList. Click the DropDownList element and then type a character in the search box. It will display the
                filtered list items based on the typed characters.</p>
        </div>
        
        <div id="description">
            <p>The DropDownList has built-in support to filter the data source, when <code>allowFiltering</code> is enabled. It performs
                when characters are typed in the search box. In the <code>filtering</code> event, you can filter down the data source and
                return the resulted data to DropDownList via <code>updateData</code> method to display its list items.</p>
            <p>This sample illustrates that, query the data source and pass the resulted data to DropDownList through the <code>updateData</code> method in <code>filtering</code> event.</p>
            <p>More information on the filtering feature configuration can be found in the
                <a href="http://ej2.syncfusion.com/react/documentation/drop-down-list/filtering.html" target="_blank"> documentation section</a>.
            </p>
        </div>
      </div>);
    }
}
