import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MultiSelectComponent, TaggingEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import './chip-customization.css';
export class ChipCustomization extends SampleBase<{}, {}> {
  // define the JSON of data
  private colorsData: { [key: string]: Object }[] = [
    { Color: 'Chocolate', Code: '#75523C' },
    { Color: 'CadetBlue', Code: '#3B8289' },
    { Color: 'DarkOrange', Code: '#FF843D' },
    { Color: 'DarkRed', Code: '#CA3832' },
    { Color: 'Fuchsia', Code: '#D44FA3' },
    { Color: 'HotPink', Code: '#F23F82' },
    { Color: 'Indigo', Code: '#2F5D81' },
    { Color: 'LimeGreen', Code: '#4CD242' },
    { Color: 'OrangeRed', Code: '#FE2A00' },
    { Color: 'Tomato', Code: '#FF745C' }
  ];
  // maps the appropriate column to fields property
  private fields: { [key: string]: string } = { text: 'Color', value: 'Code' };
  // set the value to MultiSelect
  private colorValues: [number | string] = ['#75523C', '#4CD242', '#FF745C', '#3B8289', '#CA3832'];
  // bind the tagging event
  private onTagging = (e: TaggingEventArgs) => {
    // set the current selected item text as class to chip element.
    e.setClass((e.itemData as any)[this.fields.text].toLowerCase());
  }
  render() {
    return (
      <div className='col-lg-12 control-pane'>
        <div className='control-section ms-chip-customize'>
          <div id='multi-customize' className="control-styles">
            <h4>Chip Customization</h4>
            <MultiSelectComponent id="chip-customization" value={this.colorValues} dataSource={this.colorsData} fields={this.fields} mode="Box" placeholder="Favorite Colors" tagging={this.onTagging.bind(this)} />
          </div>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the customization of selected chip element in the MultiSelect. Type a character in the MultiSelect
        element or click on the element to choose one or more items from the list.</p>
        </div>
        <div id="description">
          <p>The MultiSelect allows the user to customize the selected chip element through the <code>tagging</code> event. In that
        event, you can set the custom classes to chip element via the event argument of the <code>setClass</code> method.
    </p>
          <p>This sample illustrates how to use the favorite colors of data and set the favorite color text as custom class through
        <code>tagging</code> event argument of the <code>setClass</code> method.</p>
        </div>
      </div>
    );
  }
}