/**
 * MultiColumnComboBox Filtering Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MultiColumnComboBoxComponent, FilteringEventArgs, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-multicolumn-combobox';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import './filtering.css';
import * as data from './dataSource.json';
import { Query } from '@syncfusion/ej2-data';

const Filter = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const filtering = (e: FilteringEventArgs) => {
        let query: Query = new Query();
        query = (e.text !== '') ? query.where('Name', 'startswith', e.text, true) : query;
        e.updateData((data as any).workDetails, query);
    };
    const fields: object = { text: 'Name', value: 'Experience' };
    return(
        <div className='control-pane'>
            <div className="control-section">
                <div className='control-wrapper filtering-multicolumn'>
                    <div style={{ paddingTop: '60px' }}>
                        <MultiColumnComboBoxComponent type="text" dataSource={(data as any).workDetails} fields={fields} placeholder='Select a name' popupHeight={'200px'} filtering={filtering}>
                            <ColumnsDirective>
                                <ColumnDirective field='Name' header='Name' width={100}></ColumnDirective>
                                <ColumnDirective field='YearOfJoining' header='Year Of Joining' width={120}></ColumnDirective>
                                <ColumnDirective field='Status' header='Status' width={90}></ColumnDirective>
                                <ColumnDirective field='Location' header='Location' width={100}></ColumnDirective>
                                <ColumnDirective field='Experience' header='Experience in Year' width={150}></ColumnDirective>
                            </ColumnsDirective>
                        </MultiColumnComboBoxComponent>
                    </div>
                </div>
            </div>

            <div id="action-description">
                <p>This sample demonstrates the built-in support to filter the <code>datasource</code> in the MultiColumn ComboBox.</p>
            </div>

            <div id="description">
                <p>This sample illustrates to query the datasource and pass the resulted data when characters are typed in the search box triggers the <code>filtering</code> event and using the <code>updateData</code> method to display the list of employees in the MultiColumn ComboBox.</p>
            </div>
        </div>
    );
}
export default Filter;
