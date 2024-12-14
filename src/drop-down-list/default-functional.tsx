/**
 * DropDownList Default Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { PropertyPane } from '../common/property-pane';
import './default.css';
import * as data from './dataSource.json';

const Default = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    // define the JSON of data
    const temp: string = 'sportsData';
    const sportsData: { [key: string]: Object }[] = data[temp];
    // maps the appropriate column to fields property
    const fields: { [key: string]: string } = { text: 'Game', value: 'Id' };
    // set the value to select an item based on mapped value at initial rendering
    const [value, setValue] = useState<string>('Game3');
    const [text, setText] = useState<string>('Basketball');
    // call the change event's function after initialized the component.
    const onChange = (args: ChangeEventArgs) => {
        setValue(args.itemData === null ? 'null' : args.itemData[fields.value].toString());
        setText(args.itemData === null ? 'null' : args.itemData[fields.text].toString());
    }
    return (
        <div id="dropdowndefault" className='control-pane'>
            <div className='control-section'>
                <div className='col-lg-8'>
                    <div className="content-wrapper">
                        <div id='default'>
                            <DropDownListComponent id="games" dataSource={sportsData} fields={fields} change={onChange.bind(this)} placeholder="Select a game" value={value} popupHeight="220px" />
                        </div>
                    </div>
                </div>
                <div className='col-lg-4 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' style={{ width: '100%', margin: '10px' }}>
                            <tbody>
                                <tr>
                                    <td style={{ padding: '5px', width: '25%' }}>Value</td>
                                    <td>:<span id='value' style={{ paddingLeft: '10px' }}>{value}</span></td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '5px', width: '25%' }}>Text</td>
                                    <td>:<span id='text' style={{ paddingLeft: '10px' }}>{text}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the default functionalities of the DropDownList. Click the DropDownList element and select an item from the <code>options</code> list.
                    The selected item's <code>value</code> and <code>text</code> property values will be shown the in property panel.</p>
            </div>
            <div id="description">
                <p>The <code>DropDownList</code> component contains a list of predefined values from that the user can choose a single
                    value.</p>
                <p>The default sample illustrates the use of DropDownList that allows the end-users to select an item from the <code>options</code> list. The selected item's <code>value</code> and <code>text</code> property values will be displayed in the property
                    panel.</p>
                <p> More information on the DropDownList instantiation can be found in the
                    <a href="https://ej2.syncfusion.com/react/documentation/drop-down-list/getting-started/" target="_blank"> documentation section</a>.
                </p>
            </div>
        </div>
    );
}
export default Default;