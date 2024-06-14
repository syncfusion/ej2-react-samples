/**
 * MultiColumnComboBox Sorting Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MultiColumnComboBoxComponent, SortOrder, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-multicolumn-combobox';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import './default.css';
import * as data from './dataSource.json';

const Sort = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const fields: object = { text: 'OrderID', value: 'CustomerID' };
    return(
        <div className='control-pane'>
            <div className="control-section">
                <div className='control-wrapper sorting-multicolumn'>
                    <div style={{ paddingTop: '60px' }}>
                        <MultiColumnComboBoxComponent type="text" dataSource={(data as any).orderDetails} fields={fields} placeholder='Select an order ID' popupHeight={'230px'} allowSorting={true} sortOrder={SortOrder.Ascending} sortType='MultiColumn'>
                            <ColumnsDirective>
                                <ColumnDirective field='OrderID' header='Order ID' width={110}></ColumnDirective>
                                <ColumnDirective field='CustomerID' header='Customer ID' width={130}></ColumnDirective>
                                <ColumnDirective field='Freight' header='Freight' width={90}></ColumnDirective>
                                <ColumnDirective field='ShipCountry' header='Ship Country' width={140}></ColumnDirective>
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
    );
}
export default Sort;
