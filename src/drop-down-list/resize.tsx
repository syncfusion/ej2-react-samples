/**
 * DropDownList Resize Sample
 */
import * as React from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import * as data from './dataSource.json';

export class Resize extends SampleBase<{}, {}> {

  private listObj: DropDownListComponent;
  //define the resize data
  private temp:string = 'countries';
  private searchData: { [key: string]: Object; }[] = data[this.temp];
  // maps the appropriate column to fields property
  private fields: Object = { text: 'Name', value: 'Code' };

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div id='resize'>
            <DropDownListComponent id="country" ref={(dropdownlist) => { this.listObj = dropdownlist }} dataSource={this.searchData} allowResize={true} fields={this.fields} placeholder="Select a country" popupHeight="220px" />
          </div>
        </div>
        <div id="action-description">
        <p>This example demonstrates the custom resizing functionality of the DropDownList component. You can adjust the popup size based on your preferences, providing more control over its appearance.</p>
        </div>
        
        <div id="description">
        <p>Enable the resize feature of the DropDownList popup by setting AllowResize to true. This allows you to drag the resize handle at the bottom-right corner of the popup, adjusting its dimensions to suit your preferences and enhancing its visual management.</p>
        </div>
      </div>
    );
  }
}