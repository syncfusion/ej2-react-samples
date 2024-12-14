/**
 * ComboBox Resize Sample
 */
import * as React from 'react';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import * as data from './dataSource.json';
import './resize.css';
export class Resize extends SampleBase<{}, {}> {

  private listObj: ComboBoxComponent;
  private temp:string = 'countries';
  //define the resize data
  private searchData: { [key: string]: Object; }[] = data[this.temp];
  // maps the appropriate column to fields property
  private fields: Object = { text: 'Name', value: 'Code' };

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div id='filtering'>
            <ComboBoxComponent id="country" ref={(ComboBox) => { this.listObj = ComboBox }} dataSource={this.searchData} allowResize={true} fields={this.fields} placeholder="Select a country" popupHeight="270px" />
          </div>
        </div>
        <div id="action-description">
        <p>This example demonstrates the custom resizing functionality of the ComboBox component. You can adjust the popup size based on your preferences, providing more control over its appearance.</p>
        </div>
            
        <div id="description">
        <p>Enable the resize feature of the ComboBox popup by setting AllowResize to true. This allows you to drag the resize handle at the bottom-right corner of the popup, adjusting its dimensions to suit your preferences and enhancing its visual management.</p> 
        </div>
      </div>
    );
  }
}