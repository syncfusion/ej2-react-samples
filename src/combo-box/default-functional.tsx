/**
 * ComboBox Default functionality Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { ComboBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { PropertyPane } from '../common/property-pane';
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
    const fields: { [key: string]: string } = { text: 'Game', value: 'Id' };
    const [value, setValue] = useState<string>('Game3');
    const [text, setText] = useState<string>('Basketball');
    // call the change event's function after initialized the component.
    const onChange = (args: ChangeEventArgs) => {
        setValue(args.itemData === null ? 'null' : args.itemData[fields.value].toString());
        setText(args.itemData === null ? 'null' : args.itemData[fields.text].toString());
    }
    return (
        <div id='combodefault' className='control-pane'>
            <div className='control-section'>
                <div className='col-lg-8'>
                    <div className="content-wrapper">
                        <div id='default'>
                            <ComboBoxComponent id="games" dataSource={sportsData} fields={fields} change={onChange.bind(this)} placeholder="Select a game" value={value} popupHeight="220px" />
                        </div>
                    </div>
                </div>
                <div id='combopanel' className='col-lg-4 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' style={{ width: '100%', margin: '10px' }}>
                            <tbody>
                                <tr>
                                    <td style={{ width: '25%' }}>Value</td>
                                    <td>:<span id='value' style={{ paddingLeft: '10px' }}>{value}</span></td>
                                </tr>
                                <tr>
                                    <td style={{ width: '25%' }}>Text</td>
                                    <td>:<span id='text' style={{ paddingLeft: '10px' }}>{text}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the default functionalities of the ComboBox. Type a character in the ComboBox element or click the drodown icon to choose an item from the <code>options</code> list.
                    The selected item's <code>value</code> and <code>text</code> property values will be shown in the property panel.</p>
            </div>
            <div id="description">
                <p>The <code>ComboBox</code> component allows the user to type a value, or choose an option from the list of predefined options.</p>
                <p> More information on the ComboBox instantiation can be found in the
                    <a href="https://ej2.syncfusion.com/react/documentation/combo-box/getting-started/" target="_blank"> documentation section</a>.
                </p>
            </div>
        </div>
    );
}
export default Default;