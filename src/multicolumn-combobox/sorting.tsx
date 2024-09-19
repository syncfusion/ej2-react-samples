/**
 * MultiColumnComboBox Sorting Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MultiColumnComboBoxComponent, SortOrder, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-multicolumn-combobox';
import { SampleBase } from '../common/sample-base';
import './sorting.css';
import * as data from './dataSource.json';

export class Default extends SampleBase<{}, {}> {

    fields: object = { text: 'Name', value: 'YearOfJoining' };
    render() {
        return (
            <div className='control-pane'>
                <div className="control-section">
                    <div className='control-wrapper sorting-multicolumn'>
                        <div style={{ paddingTop: '60px' }}>
                            <MultiColumnComboBoxComponent type="text" dataSource={(data as any).workDetails} fields={this.fields} placeholder='Select a name' popupHeight={'230px'} allowSorting={true} sortOrder={SortOrder.Ascending} sortType='MultiColumn'>
                            <ColumnsDirective>
                                <ColumnDirective field='Name' header='Name' width={100}></ColumnDirective>
                                <ColumnDirective field='YearOfJoining' header='Year Of Joining' width={100}></ColumnDirective>                               
                                <ColumnDirective field='Status' header='Status' width={60}></ColumnDirective>
                                <ColumnDirective field='Location' header='Location' width={90}></ColumnDirective>
                                <ColumnDirective field='Experience' header='Experienced Year' width={120}></ColumnDirective>
                            </ColumnsDirective>
                            </MultiColumnComboBoxComponent>
                        </div>
                    </div>
                </div>

                <div id="action-description">
                    <p>This example demonstrates the sorting support in the MultiColumn ComboBox.</p>
                </div>

                <div id="description">
                    <p>In this sample, you can click the column header to sort/unsort the column. Any field can be selected from the Fields dropdown list and its order can be changed to display headers either in ascending or descending order. Sorting can be enabled using the <code>allowSorting</code> property and the sort order can be customized using the <code>sortOrder</code> property in the MultiColumn ComboBox.</p>
                </div>
            </div>
        )
    }
}
