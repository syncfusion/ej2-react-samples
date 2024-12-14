/**
 * AutoComplete Custom Resize Sample
 */
import * as React from 'react';
import { AutoCompleteComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import './resize.css';
import * as data from './dataSource.json';

export class Resize extends SampleBase<{}, {}> {

  private temp:string = 'booksData';
  private booksData: { [key: string]: Object; }[] = data[this.temp];
  // maps the appropriate column to fields property
  private fields: object = { value: 'BookName' };
  // set true for enable the resize property to autocomplete 
  private allowResize: boolean = true;
  
  render() {
    return (
      <div id='autocustom' className='control-pane'>
        <div className='control-section'>
          <div id='resize'>
            <AutoCompleteComponent id="books" dataSource={this.booksData} allowResize={this.allowResize}  fields={this.fields} placeholder="e.g. Node.js Succinctly" />
          </div>
        </div>

        <div id="action-description">
        <p>This example demonstrates the custom resizing functionality of the AutoComplete component. You can adjust the popup size based on your preferences, providing more control over its appearance.</p>
        </div>

        <div id="description">
         <p>Enable the resize feature of the AutoComplete popup by setting AllowResize to true. This allows you to drag the resize handle at the bottom-right corner of the popup, adjusting its dimensions to suit your preferences and enhancing its visual management.</p> 
        </div>
      </div>
    );
  }
}
