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
  private fields: Object = { text: 'Name', value: 'Code' };
  private template: string = '<div id="nodata"> No matched item, do you want to add it as new item in list?</div> <button id="btn" class="e-control e-btn">Add New Item</button>';
  public onFiltering = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('Name', 'startswith', e.text, true) : query;
    e.updateData(this.searchData, query);
    let proxy: this = this;
    if (document.getElementById('nodata')) {
      document.getElementById('btn').onclick = function () {
        let customValue: string = (document.getElementsByClassName('e-input')[0] as HTMLInputElement).value;
        let newItem: { [key: string]: Object; } = {'Name': customValue, 'Code': customValue };
        (proxy.listObj.dataSource as Object[]).push(newItem);
        proxy.listObj.hidePopup();
        proxy.listObj.addItem(newItem);
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