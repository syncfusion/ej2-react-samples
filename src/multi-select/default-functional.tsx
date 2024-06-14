import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import './default.css';
import * as data from './dataSource.json';

const Default = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const temp: string = 'sportsData';
    // define the JSON of data
    const sportsData: { [key: string]: Object }[] = data[temp];
    // maps the appropriate column to fields property
    const fields: object = { text: 'Game', value: 'Id' };
    // set the value to select an item based on mapped value at initial rendering
    return (
        <div className='control-pane'>
            <div id="multisection" className='control-section'>
                <div id="multidefault">
                    <div className="control-styles">
                    <label className="h4"> Default Mode</label>
                        <div>
                            <MultiSelectComponent id="defaultelement" dataSource={sportsData} mode="Default" fields={fields} placeholder="Favorite Sports" />
                        </div>
                    </div>
                    <div className="control-styles">
                    <label className="h4">Box Mode</label>
                        <div>
                            <MultiSelectComponent id="boxelement" dataSource={sportsData} mode="Box" fields={fields} placeholder="Favorite Sports" />
                        </div>
                    </div>
                    <div className="control-styles">
                    <label className="h4">Delimiter Mode</label>
                        <div>
                            <MultiSelectComponent id="delimiterelement" dataSource={sportsData} mode="Delimiter" fields={fields} placeholder="Favorite Sports" />
                        </div>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the default functionalities of the MultiSelect. Type a character in the MultiSelect element or click on this element to choose one or more items from the suggestion list.</p>
            </div>
            <div id="description">
                <p>The <code>MultiSelect</code> component contains a list of predefined values, from that the user can choose a multiple
                    values. </p>
                <p>In this sample, the selected items are shown with three different UI modes in three different MultiSelect elements. That three UI modes are listed here below,</p>
                <ul>
                    <li><b>Default</b> - on focus-in, the component will act in <code>box mode</code> and on blur, the component will act in <code>delimiter mode</code>.</li>
                    <li><b>Box</b> - selected items will be visualized in chip.</li>
                    <li><b>Delimiter</b> - selected items will be visualized in text content.</li>
                </ul>
                <p> More information on the MultiSelect instantiation can be found in the
                    <a href="https://ej2.syncfusion.com/react/documentation/multi-select/getting-started/" target="_blank"> documentation section</a>.
                </p>
            </div>
        </div>
    );
}
export default Default;