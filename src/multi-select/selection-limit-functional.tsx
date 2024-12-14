import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { MultiSelectComponent, CheckBoxSelection, Inject } from '@syncfusion/ej2-react-dropdowns';
import { PropertyPane } from '../common/property-pane';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import './checkbox.css';
import * as data from './dataSource.json';

const SelectionLimit = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const temp: string = 'countries';
    //define the data with category
    const countries: { [key: string]: Object; }[] = data[temp];
    // maps the appropriate column to fields property
    const checkFields: Object = { text: 'Name', value: 'Code' };
    const [maximumSelectionLength, setMaximumSelectionLength] = useState<number>(3);
    const [value, setValue] = useState<string[] | number[] | boolean[]>(null);
    const applyRange = (): void => {
        let textBoxValue: number = parseFloat((document.getElementById('length') as HTMLInputElement).value);
        setValue(value === null ? [''] : null);
        setMaximumSelectionLength(textBoxValue);
    }
    return (
        <div id="multichecbox" className='control-pane'>
            <div className='control-section col-lg-8'>
                <div id="multigroup" className="control-styles">
                <label className="h4">Selection Limit</label>
                    <MultiSelectComponent id="checkbox" dataSource={countries}
                        fields={checkFields} placeholder="Select countries" mode="CheckBox" value={value}
                        showDropDownIcon={true} maximumSelectionLength={maximumSelectionLength} filterBarPlaceholder="Search countries" popupHeight="350px">
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
                                    <div>Selection Limit </div>
                                </td>
                                <td>
                                    <div>
                                        <NumericTextBoxComponent id='length' aria-label="number" format="n0" max={countries.length} value={maximumSelectionLength} min={1} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <div>
                                        <ButtonComponent id="buttonApply" cssClass='e-btn e-control e-outline' style={{ marginBottom: '10px', marginLeft: '100px' }} onClick={applyRange.bind(this)}>Apply</ButtonComponent>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the maximum selection limit functionalities with checkbox of the MultiSelect. MultiSelect value
                    can set restrictions based on the maximum selection length that can be selected.</p>
            </div>
            <div id="description">
                <p>The MultiSelect has built-in support to limit the value selected in Multiselect component, when the <code>maximumSelectionLength</code>property is set as <code>3</code>, maximum of only 3 value will be selected in the MultiSelect.</p>
                <p>The selection limit sample illustrates using the countries data.</p>
            </div>
        </div>
    );
}
export default SelectionLimit;