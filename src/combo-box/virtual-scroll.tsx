/**
 * ComboBox Default functionality Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ComboBoxComponent, Inject, VirtualScroll } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import './default.css';
import * as data from './dataSource.json';

export class Default extends SampleBase<{}, {}> {

  private listObj: ComboBoxComponent;
  // define the array of string
  private records: { [key: string]: Object }[] = [];
    constructor(props: {}) {
        super(props);

        for (let i: number = 1; i <= 150; i++) {
            const item: { [key: string]: Object } = {
                id: 'id' + i,
                text: `Item ${i}`,
            };
            this.records.push(item);
        }
    }
  // maps the appropriate column to fields property
  private fields: object = { text: 'text', value: 'id' };
  // call the change event's function after initialized the component.
  public rendereComplete(): void {
  }
  render() {
    return (
      <div id='combodefault' className='control-pane'>
        <div className='control-section'>
          <div className='col-lg-8'>
            <div className="content-wrapper">
              <div id='default'>
                <ComboBoxComponent id="datas" dataSource={this.records} ref={(combobox) => { this.listObj = combobox }} fields={this.fields} placeholder="e.g. Item 1" allowFiltering={true} enableVirtualization={true} popupHeight="200px" >
                  <Inject services={[VirtualScroll]}/>
                </ComboBoxComponent>
              </div>
            </div>
          </div>
        </div>
        <div id="action-description">
          <p>This example demonstrates the virtualization support of the ComboBox. The component has 150 items bound to it; however, when you open the suggestion list, only few items are loaded based on the popup height, and the remaining items are loaded while scrolling.</p>
        </div>

        <div id="description">
          <p>The <code>ComboBox</code> component supports virtualization, which improves UI performance for large amounts of data. To enable virtualization, set the <code>enableVirtualization</code> property to true. When virtualization is enabled, ComboBox doesn't render the entire suggestion data source on initial component rendering. It loads the N number of items in the popup on initial rendering and the remaining set number of items will load while scrolling.
            Virtualization works with both local and remote data.</p>
          <p>To perform the virtualization feature in the ComboBox, the <code>VirtualScroll</code> module has to be injected at the application level.</p>
        </div>
      </div>
    );
  }
}