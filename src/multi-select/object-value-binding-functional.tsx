import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import './default.css';
import * as data from './dataSource.json';
type RecordItem = {
  id: string;
  text: string;
  group?: string;
};
const Default = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

      const [records, setRecords] = useState<RecordItem[]>([]);
      const [value, setValue] = useState(null);
      const [objectValue, setObjectValue] = useState("Selected value : ");
    
      useEffect(() => {
        const initialRecords: RecordItem[] = [];
        for (let i = 1; i <= 150; i++) {
          const item: RecordItem = { id: 'id' + i, text: `Item ${i}` };
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
          initialRecords.push(item);
        }
        setRecords(initialRecords);
      }, []);
    
      const onChange = (args) => {
        setObjectValue("Selected value : " + JSON.stringify(args.value));
      };
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
          <textarea id="value" className="auto-dropdowns" title="Properties" style={{ width: '100%', marginTop: '90px', height: '60px' }} value={objectValue} readOnly />
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