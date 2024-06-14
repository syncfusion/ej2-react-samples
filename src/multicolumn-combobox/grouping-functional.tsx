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
    const fields: object = { text: 'CustomerName', value: 'OrderID', groupBy: 'ShipCountry' };
    return(
        <div className='control-pane'>
            <div className="control-section">
                <div className='control-wrapper grouping-multicolumn'>
                    <div style={{ paddingTop: '60px' }}>
                        <MultiColumnComboBoxComponent type="text" dataSource={(data as any).orderDetails} fields={fields} placeholder='Select a customer name' popupHeight={'230px'} allowSorting={false}>
                            <ColumnsDirective>
                                <ColumnDirective field='OrderID' header='OrderID' width={80}></ColumnDirective>
                                <ColumnDirective field='CustomerName' header='Customer Name' width={80}></ColumnDirective>
                                <ColumnDirective field='Freight' header='Freight' width={80}></ColumnDirective>
                                <ColumnDirective field='ShipPostalCode' header='ShipPostalCode' width={100}></ColumnDirective>
                                <ColumnDirective field='ShipCountry' header='ShipCountry' width={120}></ColumnDirective>
                            </ColumnsDirective>
                        </MultiColumnComboBoxComponent>
                    </div>
                </div>
            </div>

            <div id="action-description">
                <p>This sample demonstrates grouping feature of the MultiColumn Combobox.</p>
            </div>

            <div id="description">
                <p>The MultiColumn ComboBox allows to group the relevant items under a corresponding category by mapping the <code>groupBy</code> property in the <code>fieldSettings</code> which allows to load the list items. In this sample, the order data is grouped against <code>ShipCountry</code> column, which illustrates how the orders details are grouped based on its category.</p>
            </div>
        </div>
    );
}
export default Group;