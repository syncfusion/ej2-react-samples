import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { MultiSelectComponent, CheckBoxSelection, Inject } from '@syncfusion/ej2-react-dropdowns';
import { PropertyPane } from '../common/property-pane';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';
import './checkbox.css';

const CheckBox = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    //define the data with category
    const countries: { [key: string]: Object; }[] = [
        { Name: 'Australia', Code: 'AU' },
        { Name: 'Bermuda', Code: 'BM' },
        { Name: 'Canada', Code: 'CA' },
        { Name: 'Cameroon', Code: 'CM' },
        { Name: 'Denmark', Code: 'DK' },
        { Name: 'France', Code: 'FR' },
        { Name: 'Finland', Code: 'FI' },
        { Name: 'Germany', Code: 'DE' },
        { Name: 'Greenland', Code: 'GL' },
        { Name: 'Hong Kong', Code: 'HK' },
        { Name: 'India', Code: 'IN' },
        { Name: 'Italy', Code: 'IT' },
        { Name: 'Japan', Code: 'JP' },
        { Name: 'Mexico', Code: 'MX' },
        { Name: 'Norway', Code: 'NO' },
        { Name: 'Poland', Code: 'PL' },
        { Name: 'Switzerland', Code: 'CH' },
        { Name: 'United Kingdom', Code: 'GB' },
        { Name: 'United States', Code: 'US' }
    ];
    // maps the appropriate column to fields property
    const checkFields: Object = { text: 'Name', value: 'Code' };
    // enable or disable the SelectAll in multiselect on CheckBox checked state
    const [showSelectAll, setShowSelectAll] = useState<boolean>(true);
    // enable or disable the Dropdown button in multiselect on CheckBox checked state
    const [showDropDownIcon, setShowDropDownIcon] = useState<boolean>(true);
    // enable or disable the selection limit in multiselect on CheckBox checked state
    const [enableSelectionOrder, setEnableSelectionOrdern] = useState<boolean>(true);
    // function to handle the CheckBox change event
    const onChange = (args: ChangeEventArgs) => {
        // enable or disable the SelectAll in multiselect on CheckBox checked state
        setShowSelectAll(args.checked);
    }

    // function to handle the CheckBox change event
    const onChangeDrop = (args: ChangeEventArgs) => {
        // enable or disable the Dropdown button in multiselect on CheckBox checked state
        setShowDropDownIcon(args.checked);
    }

    // function to handle the CheckBox change event
    const onChangeLimit = (args: ChangeEventArgs) => {
        // enable or disable the selection limit in multiselect on CheckBox checked state
        setEnableSelectionOrdern(args.checked);
    }
    return (
        <div id="multichecbox" className='control-pane'>
            <div className='control-section col-lg-8'>
                <div id="multigroup" className="control-styles">
                <label className="h4">CheckBox</label>
                    <MultiSelectComponent id="checkbox" dataSource={countries}
                        fields={checkFields} placeholder="Select countries" value={null} mode="CheckBox" showSelectAll={showSelectAll} showDropDownIcon={showDropDownIcon}
                        enableSelectionOrder={enableSelectionOrder} filterBarPlaceholder="Search countries" popupHeight="350px">
                        <Inject services={[CheckBoxSelection]} />
                    </MultiSelectComponent>
                </div>
            </div>
            <div className='col-lg-4 property-section'>
                <PropertyPane title='Properties'>
                    <table id="property" title="Properties" className='property-panel-table' style={{ width: '100%' }}>
                        <tbody>
                            <tr>
                                <td>
                                    <div>
                                        <CheckBoxComponent checked={showSelectAll} label='Show Select All' change={onChange.bind(this)} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>
                                        <CheckBoxComponent checked={showDropDownIcon} label='DropDown Button' change={onChangeDrop.bind(this)} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>
                                        <CheckBoxComponent checked={enableSelectionOrder} label='Selection Reorder' change={onChangeLimit.bind(this)} />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the checkbox functionalities of the MultiSelect. Click the MultiSelect element and then type
                    a character in the search box. It will display the filtered list items based on the typed characters and then select
                    the multiple values through the checkbox.</p>
            </div>
            <div id="description">
                <p>The MultiSelect has built-in support to select the multiple values through checkbox, when the <code>mode</code> property is set
                    as <code>CheckBox</code>. To perform the checkbox feature in MultiSelect, the <code>CheckBoxSelection</code> module
                    have to be injected in the application end.</p>
                <p>In this sample, the local data is bound to a collection of countries data. Also, provided options for the following:
                    <p> To enable/disable <code>Select All</code>feature in the property panel.</p>
                    <p> To enable/disable <code>DropDown Button</code>feature in the property panel.</p>
                    <p> To enable/disable <code>Selection Reorder</code>feature in the property panel.</p>
                </p>
                <p>The checkbox sample illustrates using the countries data. </p>
            </div>
        </div >
    );
}
export default CheckBox;