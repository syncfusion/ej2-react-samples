/**
 * AutoComplete Default functionality Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { AutoCompleteComponent, Inject, VirtualScroll } from '@syncfusion/ej2-react-dropdowns';
import { Query, DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import './virtual-scroll.css';
import * as data from './dataSource.json';

export class Default extends SampleBase<{}, {}> {

  private listObj: AutoCompleteComponent;
  // define the array of string
  private records: { [key: string]: Object }[] = [];

    constructor(props: {}) {
        super(props);

        for (let i = 1; i <= 150; i++) {
          let item: { [key: string]: Object } = {};
          item.id = 'id' + i;
          item.text = `Item ${i}`;
  
          // Generate a random number between 1 and 4 to determine the group
          const randomGroup = Math.floor(Math.random() * 4) + 1;
          switch (randomGroup) {
            case 1:
              item.group = 'Group A';
              break;
            case 2:
              item.group = 'Group B';
              break;
            case 3:
              item.group = 'Group C';
              break;
            case 4:
              item.group = 'Group D';
              break;
            default:
              break;
          }
          this.records.push(item);
        }
    }
    // bind the DataManager instance to dataSource property
    public customerData: DataManager = new DataManager({
      url: 'https://services.syncfusion.com/js/production/api/VirtualDropdownData',
      adaptor: new UrlAdaptor,
      crossDomain: true
  });
  // maps the appropriate column to fields property
  public fields: { [key: string]: string } = { value: 'text' };
  public customerField: { [key: string]: string } = { value: 'OrderID' };
  public groupField: { [key: string]: string } = { groupBy: 'group', value: 'text' };

  render() {
    return (
      <div id='combodefault' className='control-pane'>
        <div className='control-section'>
          <div className='col-lg-6'>
            <div id="local">
              <h4> Local Data</h4>
              <AutoCompleteComponent id="localdata" dataSource={this.records} placeholder="e.g. Item 1" enableVirtualization={true} fields={this.fields} popupHeight="200px">
                <Inject services={[VirtualScroll]}/>
              </AutoCompleteComponent>
            </div>
          </div>
          <div className='col-lg-6'>
            <div id="remote">
              <h4>Remote Data</h4>
              <AutoCompleteComponent id="remotedata" dataSource={this.customerData} placeholder="OrderId" enableVirtualization={true} fields={this.customerField} popupHeight="200px">
                <Inject services={[VirtualScroll]}/>
              </AutoCompleteComponent>
            </div>
          </div>
          <div className='col-lg-6'>
            <div id="remote">
              <h4>Grouping</h4>
              <AutoCompleteComponent id="groupdata" dataSource={this.records} placeholder="e.g. Item 1" enableVirtualization={true} fields={this.customerField} popupHeight="200px">
                <Inject services={[VirtualScroll]}/>
              </AutoCompleteComponent>
            </div>
          </div>
        </div>
        <div id="action-description">
            <p>This example demonstrates the virtualization support of the AutoComplete. The component has 150 items bound to it; however, when you open the suggestion list, only few items are loaded based on the popup height, and the remaining items are loaded while scrolling.</p>

        </div>
        
        <div id="description">
            <p>The <code>AutoComplete</code> component supports virtualization, which improves UI performance for large amounts of data. To enable virtualization, set the <code>enableVirtualization</code> property to true. When virtualization is enabled, AutoComplete doesn't render the entire suggestion data source on initial component rendering. It loads the N number of items in the popup on initial rendering and the remaining set number of items will load while scrolling.
            Virtualization works with both local and remote data.</p>
            <p>To perform the virtualization feature in the AutoComplete, the <code>VirtualScroll</code> module has to be injected at the application level.</p>
        </div>
      </div>
    );
  }
}