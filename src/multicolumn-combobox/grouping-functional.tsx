/**
 * MultiColumnComboBox Grouping Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MultiColumnComboBoxComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-multicolumn-combobox';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import './grouping.css';
import * as data from './dataSource.json';

const Group = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const fields: object = { text: 'Name', value: 'Department', groupBy: 'Position' };
    return(
        <div className='control-pane'>
            <div className="control-section">
                <div className='control-wrapper grouping-multicolumn'>
                    <div style={{ paddingTop: '60px' }}>
                        <MultiColumnComboBoxComponent type="text" dataSource={(data as any).employeeData} fields={fields} placeholder='Select a name' popupHeight={'230px'} allowSorting={false}>
                        <ColumnsDirective>
                            <ColumnDirective field='Name' header='Name' width={90}></ColumnDirective>
                            <ColumnDirective field='Position' header='Position' width={85}></ColumnDirective>
                            <ColumnDirective field='Department' header='Department' width={98}></ColumnDirective>
                            <ColumnDirective field='PhoneNo' header='Phone No' width={105}></ColumnDirective>
                            <ColumnDirective field='Location' header='Location' width={98}></ColumnDirective>
                        </ColumnsDirective>
                        </MultiColumnComboBoxComponent>
                    </div>
                </div>
            </div>

            <div id="action-description">
                <p>This sample demonstrates grouping feature of the MultiColumn Combobox.</p>
            </div>

            <div id="description">
                <p>The MultiColumn ComboBox allows to group the relevant items under a corresponding category by mapping the <code>groupBy</code> property in the <code>fieldSettings</code> which allows to load the list of employees. In this sample, the order data is grouped against <code>Position</code> column, which illustrates how the orders details are grouped based on its category.</p>
            </div>
        </div>
    );
}
export default Group;