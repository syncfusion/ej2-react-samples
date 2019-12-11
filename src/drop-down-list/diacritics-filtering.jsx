import * as React from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import './default.css';
import * as data from './dataSource.json';
export class DiacriticsFiltering extends SampleBase {
    constructor() {
        super(...arguments);
        this.temp = 'data';
        this.diacriticsData = data[this.temp];
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
          <div id='default'>
            <DropDownListComponent id="diacritics" ignoreAccent={true} dataSource={this.diacriticsData} allowFiltering={true} placeholder="Select a value" filterBarPlaceholder="e.g: gul"/>
          </div>
        </div>

        <div id="action-description">
          <p>This sample demonstrates the diacritics filter functionality of the DropDownList. Type the characters ‘gul’ in the DropDownList
        filterbar and it displays the suggestion list ignoring the diacritics lists.</p>
        </div>

        <div id="description">
          <p>The DropDownList filtering will ignore the <a href="https://en.wikipedia.org/wiki/Diacritic" target="_blank"> diacritics </a> which makes it easier to filter the results in international characters
        lists when the <code>ignoreAccent</code> is enabled.</p>

          <p>This sample illustrates using the international characters data.</p>
        </div>
      </div>);
    }
}
