/**
 * ComboBox Filtering Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ComboBoxComponent, FilteringEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { SampleBase } from './sample-base';


export class Custom extends SampleBase<{}, {}> {

  private listObj: ComboBoxComponent;
  // defined the JSON of data
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
    { Name: 'Italy', Code: 'IT' }
  ];
  // maps the appropriate column to fields property
  private fields: Object = { text: 'Name', value: 'Code' };
  // set the template content when the typed character(s) is not present in the list
  private template: string = '<div id="nodata"> No matched item, do you want to add it as new item in list?</div> <button id="btn" class="e-control e-btn">Add New Item</button>';
  // bind the filtering event
  public onFiltering = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    // frame the query based on search string with filter type.
    query = (e.text !== '') ? query.where('Name', 'startswith', e.text, true) : query;
    // pass the filter data source, filter query to updateData method.
    e.updateData(this.searchData, query);
    let proxy: this = this;
    if (document.getElementById('nodata')) {
      // bind click event to button which is shown in popup element when the typed character(s) is not present in the list
      document.getElementById('btn').onclick = function () {
        // get the typed characters
        let customValue: string = (document.getElementById('customvalue') as HTMLInputElement).value;
        // make new object based on typed characters
        let newItem: { [key: string]: Object; } = {'Name': customValue, 'Code': customValue };
        // new object added to data source.
        (proxy.listObj.dataSource as Object[]).push(newItem);
        // close the popup element.
        proxy.listObj.hidePopup();
        // pass new object to addItem method.
        proxy.listObj.addItem(newItem);
        // select the newly added item.
        proxy.listObj.value = customValue;
      }
    }
  };

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div id='customvalues'>
          <ComboBoxComponent id="customvalue" ref={(ComboBox) => { this.listObj = ComboBox }} dataSource={this.searchData} filtering={this.onFiltering.bind(this)} allowFiltering={true} fields={this.fields} noRecordsTemplate={this.template} placeholder="Select a country" popupHeight="270px" />
          </div>
        </div>
            
      </div>
    );
  }
}
ReactDOM.render(<Custom />, document.getElementById('sample'));