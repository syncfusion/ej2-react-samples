/**
 * MultiColumnComboBox Filtering Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MultiColumnComboBoxComponent, FilteringEventArgs, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-multicolumn-combobox';
import { SampleBase } from '../common/sample-base';
import './filtering.css';
import { Query } from '@syncfusion/ej2-data';
import * as data from './dataSource.json';

export class Filter extends SampleBase<{}, {}> {

    fields: { text: 'Name', value: 'Experience' };
    query: Query;
    filtering = (e: FilteringEventArgs) => {
        this.query = new Query();
        this.query = (e.text !== '') ? this.query.where('Name', 'startswith', e.text, true) : this.query;
        e.updateData((data as any).workDetails, this.query);
    };
    render() {
        return (
            <div className='control-pane'>
                <div className="control-section">
                    <div className='control-wrapper filtering-multicolumn'>
                        <div style={{ paddingTop: '60px' }}>
                            <MultiColumnComboBoxComponent type="text" dataSource={(data as any).workDetails} fields={this.fields} placeholder='Select a name' popupHeight={'200px'} popupWidth={'575px'} filtering={ (args) => this.filtering(args) }>
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
        )
    }
}
