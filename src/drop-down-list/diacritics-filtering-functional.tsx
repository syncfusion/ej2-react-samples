/**
 * DropDownList Diacritics Filtering Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import './default.css';
import * as data from './dataSource.json';

const DiacriticsFiltering = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const temp: string = 'data';
    const diacriticsData: string[] = data[temp];
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div id='default'>
                    <DropDownListComponent id="diacritics" ignoreAccent={true} dataSource={diacriticsData} allowFiltering={true} placeholder="Select a value" filterBarPlaceholder="e.g: gul" />
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
        </div>
    );
}
export default DiacriticsFiltering;