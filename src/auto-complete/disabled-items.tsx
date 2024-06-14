/**
 * AutoComplete Disabled Items Samples
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { AutoCompleteComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import './disabled-items.css';
import * as data from './dataSource.json';

export class Grouping extends SampleBase<{}, {}> {

  private temp: string = 'statusData';
  //define the data with status
  private statusData: { [key: string]: Object }[] = data[this.temp];
  // map the groupBy field with status
  private statusFields: Object = { value: "Status", disabled: "State" };
  private tempData: string = 'vegetables';
  //define the data with groupong
  private vegetableData: { [key: string]: Object }[] = data[this.tempData];
  // map the vegetable field with Class column
  private vegetableFields: Object = { groupBy: 'Category', value: 'Vegetable', disabled: 'State' };

  render() {
    return (
        <div className='control-pane'>
        <div className='control-section' id='dropIcon'>
            <div className='col-lg-6'>
                <div id="disabled-status">
                    <h4>Status</h4>
                    <AutoCompleteComponent id="status" dataSource={this.statusData} fields={this.statusFields} placeholder="Select Status" />
                </div>
            </div>
            <div className='col-lg-6'>
                <div id="vegetable">
                    <h4>Vegetable</h4>
                    <AutoCompleteComponent id="vegetables" dataSource={this.vegetableData} fields={this.vegetableFields} placeholder="Select Vegetable"/>
                </div>
            </div>
        </div>
        <div id="action-description">
        <p>This example showcases the disabled items of AutoComplete. When you type on the AutoComplete the popup will open, and you will notice that the disabled items are greyed out and cannot be selected.</p>
        </div>
        <div id="description">
        <p>The AutoComplete provides options for individual items to be in either an enabled or disabled state for specific scenarios. Once an item is disabled, it cannot be selected as a value for the component. To configure the disabled item columns, use the <code>fields.disabled</code> property.</p>
        </div>
    </div>
    );
  }
}