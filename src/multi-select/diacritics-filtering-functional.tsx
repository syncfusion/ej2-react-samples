/**
 * MultiSelect Diacritics Filtering Sample
 */
 import * as ReactDOM from 'react-dom';
 import * as React from 'react';
 import { updateSampleSection } from '../common/sample-base';
 import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
 import './style.css';
 import * as data from './dataSource.json';
 
function DiacriticsFiltering() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    const temp:string = 'data';
    const diacriticsData: string[] = data[temp];
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div id='multifilter' className="control-styles">
                <h4>Diacritics Filtering</h4>
                    <MultiSelectComponent id="diacritics" ignoreAccent={true} allowFiltering={true} dataSource={diacriticsData} placeholder="e.g: gul" />
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
export default DiacriticsFiltering;