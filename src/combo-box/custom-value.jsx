import * as React from 'react';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { SampleBase } from '../common/sample-base';
import './custom.css';
import * as data from './dataSource.json';
export class Custom extends SampleBase {
    constructor() {
        super(...arguments);
        this.temp = 'countries';
        // defined the JSON of data
        this.searchData = data[this.temp];
        // maps the appropriate column to fields property
        this.fields = { text: 'Name', value: 'Code' };
        // set the template content when the typed character(s) is not present in the list
        this.template = '<div id="nodata"> No matched item, do you want to add it as new item in list?</div> <button id="btn" class="e-control e-btn">Add New Item</button>';
        // bind the filtering event
        this.onFiltering = (e) => {
            let query = new Query();
            // frame the query based on search string with filter type.
            query = (e.text !== '') ? query.where('Name', 'startswith', e.text, true) : query;
            // pass the filter data source, filter query to updateData method.
            e.updateData(this.searchData, query);
            let proxy = this;
            if (document.getElementById('nodata')) {
                // bind click event to button which is shown in popup element when the typed character(s) is not present in the list
                document.getElementById('btn').onclick = function () {
                    // get the typed characters
                    let customValue = document.getElementById('customvalue').value;
                    // make new object based on typed characters
                    let newItem = { 'Name': customValue, 'Code': customValue };
                    // new object added to data source.
                    proxy.listObj.dataSource.push(newItem);
                    // close the popup element.
                    proxy.listObj.hidePopup();
                    // pass new object to addItem method.
                    proxy.listObj.addItem(newItem);
                    // select the newly added item.
                    proxy.listObj.value = customValue;
                };
            }
        };
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
          <div id='customvalues'>
          <ComboBoxComponent id="customvalue" ref={(ComboBox) => { this.listObj = ComboBox; }} dataSource={this.searchData} filtering={this.onFiltering.bind(this)} allowFiltering={true} fields={this.fields} noRecordsTemplate={this.template} placeholder="Select a country" popupHeight="270px"/>
          </div>
        </div>
        <div id="action-description">    
            <p>This sample demonstrates the custom value functionalities of the ComboBox. When the typed character(s) is not present in the list, a button will be shown in the popup list.
                By clicking on this button, the custom value character is added in the existing list as a new item.</p>
        </div>
            
        <div id="description">
            <p>The ComboBox allows the user to give input as <code>custom value</code> which is not required to
                present in the predefined set of values. By default, this support is enabled by <code>allowCustom</code>
                property. In this case, both text field and value field are considered as same. The custom value will be
                sent to post back handler when a form is about to be submitted.</p>
            <p> More information about the Custom value feature can be found in the
                <a href="http://ej2.syncfusion.com/react/documentation/combo-box/getting-started.html#custom-values" target="_blank"> documentation section</a>.
            </p>
        </div>  
      </div>);
    }
}
