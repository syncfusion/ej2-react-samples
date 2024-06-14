/**
 * DropDownList Disabled Items Samples
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import './disabled-items.css';
import * as data from './dataSource.json';

const DisabledItems = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const temp: string = 'status';
    //define the data with status
    const statusData: { [key: string]: Object }[] = data[temp];
    // map the groupBy field with status
    const statusFields: Object = { value: "ID", text: "Text", disabled: "State" };
    const tempData: string = 'vegetables';
    //define the data with groupong
    const vegetableData: { [key: string]: Object }[] = data[tempData];
    // map the vegetable field with Class column
    const vegetableFields: Object = { groupBy: 'Category', text: 'Vegetable', value: 'ID', disabled: 'State' };
    return (
        <div className='control-pane'>
            <div className='control-section' id='dropIcon'>
                <div className='col-lg-6'>
                    <div id="disabled-status">
                        <h4>Status</h4>
                        <DropDownListComponent id="status" dataSource={statusData} fields={statusFields} placeholder="Select Status" allowFiltering={true} />
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div id="vegetable">
                        <h4>Vegetable</h4>
                        <DropDownListComponent id="vegetables" dataSource={vegetableData} fields={vegetableFields} placeholder="Select Vegetable"/>
                    </div>
                </div>
            </div>
            <div id="action-description">
            <p>This example showcases the disabled items of DropDownList. When you click on the DropDownList the popup will open, and you will notice that the disabled items are greyed out and cannot be selected.</p>
            </div>
            <div id="description">
            <p>The DropDownList provides options for individual items to be in either an enabled or disabled state for specific scenarios. Once an item is disabled, it cannot be selected as a value for the component. To configure the disabled item columns, use the <code>fields.disabled</code> property.</p>
            </div>
        </div>
    );
}
export default DisabledItems;