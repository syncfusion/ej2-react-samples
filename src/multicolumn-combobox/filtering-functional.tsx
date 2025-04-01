/**
 * MultiColumnComboBox Filtering Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useState } from 'react';
import { MultiColumnComboBoxComponent, FilteringEventArgs, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-multicolumn-combobox';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import './filtering.css';
import * as data from './dataSource.json';
import { PropertyPane } from '../common/property-pane';

    const Filter = () => {
        useEffect(() => {
            updateSampleSection();
        }, []);
        const fields: object = { text: 'Name', value: 'Experience' };
        const mccbDropdownListData: string[] = ['StartsWith','EndsWith','Contains'];
        const [filterType, setFilterType] = useState('StartsWith');

        const change = (args: ChangeEventArgs) => {
            setFilterType(args.value.toString());
        }
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className="col-lg-8">
                        <div className="control-wrapper multicolumn">
                            <div style={{ paddingTop: '50px'}}>
                            <label>Select an employee</label>
                            <MultiColumnComboBoxComponent type="text" dataSource={(data as any).employee} fields={fields} placeholder='Select a name' filterType={filterType} popupHeight={'200px'} popupWidth={'650px'} >
                            <ColumnsDirective>
                                <ColumnDirective field='Name' header='Name' width={110}></ColumnDirective>
                                <ColumnDirective field='Department' header='Department' width={120}></ColumnDirective>
                                <ColumnDirective field='Role' header='Role' width={140}></ColumnDirective>
                                <ColumnDirective field='Location' header='Location' width={100}></ColumnDirective>
                                <ColumnDirective field='Experience' header='Experience in Year' width={150}></ColumnDirective>
                            </ColumnsDirective>
                            </MultiColumnComboBoxComponent>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 property-section">
                        <div className="property-panel-header"> Properties </div>
                        <div className="property-panel-content">
                            <table className="property-panel-table">
                                <tbody>
                                    <tr>
                                        <td> Choose filter type </td>
                                        <td style={{ paddingRight: '10px' }}>
                                            <DropDownListComponent id="filterType" dataSource={mccbDropdownListData} index={0} change={change} placeholder="Select a filter type" popupHeight="200px" popupWidth="300px" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div id="action-description">
                    <p>This sample demonstrates the built-in support to filter the <code>datasource</code> in the MultiColumn ComboBox.</p>
                </div>

                <div id="description">
                <p>The <code>MultiColumn ComboBox</code> supports filtering, which allows users to search for and select items by typing keywords. The available items are dynamically filtered based on the input, ensuring quick access to the desired data.</p>
                </div>
            </div>
        );
}
export default Filter;
