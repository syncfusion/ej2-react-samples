/**
 * Dropdown Tree Default Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { DropDownTreeComponent } from '@syncfusion/ej2-react-dropdowns';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import './default.css';
import * as dataSource from './default-data.json';

const Default = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const data = dataSource as any;
  const fields: object = { dataSource: data.defaultData, value: 'id', text: 'name', child: 'subChild' };
  const [value, setValue] = useState<string>(null);
  const [text, setText] = useState<string>(null);
  // call the change event's function after initialized the component.
  const onChange = (args: any): void => {
    // update the text and value property values in property panel based on selected item in Dropdown Tree
    setValue(args.value && args.value.length > 0 ? args.value[0] : '')
    setText(args.element.value)
  }

  return (
    <div className='control-pane dropdowntree-default'>
      <div className='control-section'>
        <div className='col-lg-8'>
          <div id="default">
            <DropDownTreeComponent fields={fields} change={onChange.bind(this)} changeOnBlur={false} placeholder="Select a folder or file" popupHeight="200px" />
          </div>
        </div>
        <div className='col-lg-3 property-section'>
          <PropertyPane title='Properties'>
            <table id='property' title='Properties' style={{ width: '100%', margin: '10px' }}>
              <tr>
                <td style={{ width: '25%' }}>Value</td>
                <td>:<span id='value' style={{ paddingLeft: '10px' }}>{value}</span></td>
              </tr>
              <tr>
                <td style={{ width: '25%' }}>Text</td>
                <td>:<span id='text' style={{ paddingLeft: '10px' }}>{text}</span></td>
              </tr>
            </table>
          </PropertyPane>
        </div>
      </div>
      <div id="action-description">
        <p>This sample explains you about the default functionalities of the Dropdown Tree component.
          Click the Dropdown Tree element, and then select an item from the hierarchical structure <code>options</code>
          list.
          The selected item's <code>value</code> and <code>text</code> property values will be shown in the property
          panel.</p>
      </div>

      <div id="description">
        <p>The <code>Dropdown Tree</code> component contains a hierarchical structure list of pre-defined values from that
          the user can choose a single value.</p>
        <p>The default sample explains you about the use of Dropdown Tree that allows the end-users to select an item from
          the hierarchical structure <code>options</code> list. The selected item's <code>value</code> and
          <code>text</code> property values will be displayed in the property panel.
        </p>
      </div>
    </div>
  );
}
export default Default;