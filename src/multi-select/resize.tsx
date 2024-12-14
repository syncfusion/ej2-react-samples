import * as React from 'react';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { SampleBase } from '../common/sample-base';
import './style.css';
import * as data from './dataSource.json';

export class Resize extends SampleBase<{}, {}> {
  private temp:string = 'countries';
  //define the resize data
  private data: { [key: string]: Object; }[] = data[this.temp];
    private query: Query = new Query();
    // maps the appropriate column to fields property
    private fields: Object = { text: 'Name', value: 'Code' };
  render() {
    return (      
      <div className = 'control-pane'>
        <div className='control-section'>
            <div id='multifilter' className="control-styles">
              <h4>Resize</h4>
              <MultiSelectComponent id="comboelement" dataSource={this.data} allowResize={true} fields={this.fields} placeholder="Select countries" />
            </div>
        </div>
        <div id="action-description">
        <p>This example demonstrates the custom resizing functionality of the MultiSelect component. You can adjust the popup size based on your preferences, providing more control over its appearance.</p>
        </div>
        
        <div id="description">
        <p>Enable the resize feature of the MultiSelect popup by setting AllowResize to true. This allows you to drag the resize handle at the bottom-right corner of the popup, adjusting its dimensions to suit your preferences and enhancing its visual management.</p>
        </div>
      </div>
    );
  }
}