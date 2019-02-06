/**
 * AutoComplete Diacritics Filtering Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { AutoCompleteComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import './custom-filtering.css';
import * as data from './dataSource.json';

export class DiacriticsFiltering extends SampleBase<{}, {}> {

  private temp:string = 'data';
  private diacriticsData: string[] =data[this.temp];
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div id='custom-filtering'>
            <AutoCompleteComponent id="diacritics" ignoreAccent={true} dataSource={this.diacriticsData} placeholder="e.g: gul" />
          </div>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the diacritics filter functionality of the AutoComplete. Type the characters ‘gul’ in the AutoComplete
        element and it displays the suggestion list ignoring the diacritics lists.</p>
        </div>

        <div id="description">
          <p>The AutoComplete filtering will ignore the <a href="https://en.wikipedia.org/wiki/Diacritic" target="_blank"> diacritics </a> which makes it easier to filter the results in international characters
        lists when the <code>ignoreAccent</code> is enabled.</p>

          <p>This sample illustrates using the international characters data.</p>
        </div>
      </div>
    );
  }
}