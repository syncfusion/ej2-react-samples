/**
 * ListBox with CheckBox selection Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { ListBoxComponent, SelectionSettingsModel, Inject, CheckBoxSelection } from '@syncfusion/ej2-react-dropdowns';
import { updateSampleSection } from '../common/sample-base';
import * as data from './dataSource.json';
import './checkbox.css';

const CheckBox = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const dataA = data["info"];
    const selectionSettings: SelectionSettingsModel = { showCheckbox: true };

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div id='listbox-selection'>
                    <ListBoxComponent dataSource={dataA} selectionSettings={selectionSettings}>
                        <Inject services={[CheckBoxSelection]} />
                    </ListBoxComponent>
                </div>
            </div>
            <div id='action-description'>
                <p>This sample demonstrates the checkbox functionalities of the ListBox. Click one or more items from the list of items in the ListBox.</p>
            </div>
            <div id='description'>
                <p>The <code>ListBox</code> component has built-in support to select multiple items from the list. The Checkbox selection can be enabled by setting the
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/list-box/selectionSettingsModel/#showcheckbox"><code>showCheckbox</code></a> as <code>true</code>
                    in the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/list-box/#selectionsettings"><code>selectionSettings</code></a> property.</p>
                <p>To perform the checkbox feature in the ListBox, the <code>CheckBoxSelection</code> module has to be injected at the application level.</p>
                <p>More information about checkbox selection in ListBox can be found in the
                    <a href="https://ej2.syncfusion.com/react/documentation/list-box/" target="_blank"> documentation</a> section.
                </p>
            </div>
        </div>
    );
}
export default CheckBox;