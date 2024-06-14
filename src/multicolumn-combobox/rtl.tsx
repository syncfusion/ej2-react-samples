/**
 * MultiColumnComboBox RTL Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MultiColumnComboBoxComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-multicolumn-combobox';
import { SampleBase } from '../common/sample-base';
import './rtl.css';
import * as data from './dataSource.json';

export class RTL extends SampleBase<{}, {}> {

    fields: object = { text: 'Name', value: 'Designation' };
    render() {
        return (
            <div className='control-pane'>
                <div className="control-section">
                    <div className='control-wrapper rtl-multicolumn'>
                        <div style={{ paddingTop: '60px' }}>
                            <MultiColumnComboBoxComponent type="text" dataSource={(data as any).empList} fields={this.fields} placeholder='Select an employee' popupHeight={'230px'} enableRtl={true}>
                                <ColumnsDirective>
                                    <ColumnDirective field='Eimg' header='Employee ID' width={120}></ColumnDirective>
                                    <ColumnDirective field='Name' header='Employee Name' width={160}></ColumnDirective>
                                    <ColumnDirective field='Designation' header='Designation' width={150}></ColumnDirective>
                                    <ColumnDirective field='Country' header='Country' width={100}></ColumnDirective>
                                </ColumnsDirective>
                            </MultiColumnComboBoxComponent>
                        </div>
                    </div>
                </div>

                <div id="action-description">
                    <p>This example demonstrates the RTL support in the MultiColumn ComboBox.</p>
                </div>

                <div id="description">
                    <p>The MultiColumn ComboBox has the support to enable the right-to-left (RTL) text direction when the <code>enableRtl</code> property is enabled.</p>
                </div>
            </div>
        )
    }
}
