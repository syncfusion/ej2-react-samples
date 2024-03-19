import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import './default.css';
import * as data from './dataSource.json';

const Default = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    // define the array of string
    let records: { [key: string]: Object }[] = [];
    for (let i = 1; i <= 150; i++) {
        let item: { [key: string]: Object } = {};
        item.id = 'id' + i;
        item.text = `Item ${i}`;
    
        // Generate a random number between 1 and 4 to determine the group
        const randomGroup = Math.floor(Math.random() * 4) + 1;
        switch (randomGroup) {
            case 1:
                item.group = 'Group A';
                break;
            case 2:
                item.group = 'Group B';
                break;
            case 3:
                item.group = 'Group C';
                break;
            case 4:
                item.group = 'Group D';
                break;
            default:
                break;
        }
        records.push(item);
    }
    const [value, setValue] = useState<string[] | object[] | number[] | boolean[]>(null);
    const [objectValue, setObjectValue] = useState<string>("Selected value : ");
    const onChange = (args: any) => {
        setObjectValue("Selected value : " + JSON.stringify(args.value));
    }
    // maps the appropriate column to fields property
    const fields: { [key: string]: string } = { text: 'text', value: 'id' };
    // set the value to select an item based on mapped value at initial rendering
    return (
        <div>
        <div className="col-lg-8 control-section">
          <div className="control-wrapper">
            <div id="default" style={{ paddingTop: '75px' }}>
            <MultiSelectComponent id="defaultelement" dataSource={records} mode="Default" value={value} change={onChange.bind(this)} allowObjectBinding={true} fields={fields} placeholder="eg Item" />
            </div>
          </div>
        </div>
        <div className="col-lg-4 property-section">
          <textarea id="value" title="Properties" style={{ width: '100%', marginTop: '90px', height: '60px' }} value={objectValue} readOnly />
        </div>
        <div id="action-description">
          <p>This sample demonstrates the object value binding functionalities of the MultiSelect. Type a character in the
            MultiSelect element or click on this element to choose one or more items from the suggestion list. The
            corresponding object value of the selected
            item is then assigned to the value property.In the property panel, the <code>value</code> property of the
            selected item's will be displayed.</p>
        </div>
        <div id="description">
        <p>The <code>MultiSelect</code> component allows users to select multiple values from a predefined list. 
          Selected items are displayed with default UI modes. Upon selection, the associated object value is automatically assigned 
          to the <code>value</code> property, enabled by the <code>allowObjectBinding</code> feature.</p>
        </div>
      </div>
    );
}
export default Default;