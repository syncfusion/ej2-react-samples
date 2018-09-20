/**
 * MultiSelect Diacritics Filtering Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import './style.css';

export class DiacriticsFiltering extends SampleBase<{}, {}> {

  private diacriticsData: string[] = [
    'Águilas',
    'Ajedrez',
    'Ala Delta',
    'Álbumes de Música',
    'Alusivos',
    'Análisis de Escritura a Mano',
    'Dyarbakır',
    'Derepazarı ',
    'Gülümsemek ',
    'Teşekkürler', 
    'Güle güle.',
    'Gülhatmi',
    'Gülünç'
  ];

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
        <div id='multifilter' className="control-styles">
            <h4>Diacritics Filtering</h4>
            <MultiSelectComponent id="diacritics" ignoreAccent={true} allowFiltering={true} dataSource={this.diacriticsData} placeholder="e.g: gul" />
          </div>
        </div>

        <div id="action-description">
          <p>This sample demonstrates the diacritics filter functionality of the MultiSelect. Type the characters ‘gul’ in the MultiSelect
        element and it displays the suggestion list ignoring the diacritics lists.</p>
        </div>

        <div id="description">
          <p>The MultiSelect filtering will ignore the <a href="https://en.wikipedia.org/wiki/Diacritic" target="_blank"> diacritics </a> which makes it easier to filter the results in international characters
        lists when the <code>ignoreAccent</code> is enabled.</p>

          <p>This sample illustrates using the international characters data.</p>
        </div>
      </div>
    );
  }
}