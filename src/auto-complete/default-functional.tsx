/**
 * AutoComplete Default functionality Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { AutoCompleteComponent } from '@syncfusion/ej2-react-dropdowns';
import './default.css';
import * as data from './dataSource.json';

const Default = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const temp: string = 'sportsData';
    // define the array of string
    const sportsData: string[] = data[temp];

    return (
        <div id='combodefault' className='control-pane'>
            <div className='control-section'>
                <div className='col-lg-12 control-wrappers'>
                    <div id='default'>
                        <AutoCompleteComponent id="games" dataSource={sportsData} placeholder="e.g. Basketball" />
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the default functionalities of the AutoComplete. Type a character in the autocomplete element and choose an item from the suggestion list.</p>
            </div>
            <div id="description">
                <p>The <code>AutoComplete</code> component provides the matched suggestion list when a character is typed in the input, from that the
                    user can select one.</p> By default, the filter type value is <code>contains</code>.
                <p>The default sample illustrates the use of AutoComplete that allows the end-users to select an item from the suggestion list.</p>
                <p> More information on the AutoComplete instantiation can be found in the
                    <a href="https://ej2.syncfusion.com/react/documentation/auto-complete/getting-started/" target="_blank"> documentation section</a>.
                </p>
            </div>
        </div>
    );
}
export default Default;