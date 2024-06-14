/**
 * MultiSelect Disabled Items Samples
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { MultiSelectComponent, CheckBoxSelection, Inject} from '@syncfusion/ej2-react-dropdowns';
import './disabled-items.css';
import * as data from './dataSource.json';

const DisabledItems = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const temp: string = 'tag';
    //define the data with tag
    const tagData: { [key: string]: Object }[] = data[temp];
    // map the groupBy field with tag
    const tagFields: Object = { value: "ID", text: "Text", disabled: "State" };
    const tempData: string = 'vegetables';
    //define the data with groupong
    const vegetableData: { [key: string]: Object }[] = data[tempData];
    // map the vegetable field with Class column
    const vegetableFields: Object = { groupBy: 'Category', text: 'Vegetable', value: 'ID', disabled: 'State' };
    return (
        <div className='control-pane'>
            <div className='control-section' id='dropIcon'>
                <div className='col-lg-6'>
                    <div id="disabled-tag">
                    <label className="h4">Tags</label>
                        <MultiSelectComponent id="tag" dataSource={tagData} fields={tagFields} placeholder="Select Tags" allowFiltering={true} />
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div id="vegetable">
                        <label className="h4">Vegetables</label>
                        <MultiSelectComponent id="vegetables" dataSource={vegetableData} fields={vegetableFields} placeholder="Select Vegetables" mode="CheckBox">
                        <Inject services={[CheckBoxSelection]} />
                        </MultiSelectComponent>
                    </div>
                </div>
            </div>
            <div id="action-description">
            <p>This example showcases the disabled items of MultiSelect. When you click on the MultiSelect the popup will open, and you will notice that the disabled items are greyed out and cannot be selected.</p>
            </div>
            <div id="description">
            <p>The MultiSelect provides options for individual items to be in either an enabled or disabled state for specific scenarios. Once an item is disabled, it cannot be selected as a value for the component. To configure the disabled item columns, use the <code>fields.disabled</code> property.</p>
            </div>
        </div>
    );
}
export default DisabledItems;