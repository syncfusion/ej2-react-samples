import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { DropDownTreeComponent } from '@syncfusion/ej2-react-dropdowns';
import { updateSampleSection } from '../common/sample-base';
import './multiple-selection.css';
import * as dataSource from './multiSelect-data.json';

const MultiSelect = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const data = dataSource as any;
    const fields: Object = { dataSource: data.multiSelectData, value: 'id', parentValue: 'pid', text: 'name', hasChildren: 'hasChild' };
    const allowMultiSelection: boolean = true;

    return (
        <div className='control-pane'>
            <div className='col-lg-12 control-section dropdowntree-multi'>
                <div className='control_wapper'>
                    {/* Render the Dropdown Tree with item multi select option */}
                    <DropDownTreeComponent fields={fields} allowMultiSelection={allowMultiSelection} placeholder="Select items" popupHeight="200px" />
                </div>
            </div>
            <div id="action-description">
                <p>This sample explains you about the multiple item selection functionalities of the Dropdown Tree. To select multiple
                    items, you may press and hold the CTRL key and then select the desired items; or select any item by selecting it and
                    then press and hold the SHIFT key to select a range of items continuously.</p>
            </div>

            <div id="description">
                <p>The <code>Dropdown Tree</code> component allows you to select multiple items by enabling the
                    <code>allowMultiSelection</code> property.</p>
                <p>In this demo, the Dropdown Tree is enabled with multiple selection.</p>
            </div>
        </div>
    )
}
export default MultiSelect;