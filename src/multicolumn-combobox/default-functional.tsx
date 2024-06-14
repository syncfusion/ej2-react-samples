/**
 * MultiColumnComboBox Default functionality Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MultiColumnComboBoxComponent, ChangeEventArgs, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-multicolumn-combobox';
import { useEffect, useState } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import './default.css';
import * as data from './dataSource.json';

const Default = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const [value, setValue] = useState("1001");
    const [text, setText] = useState("France");

    const valueChange = (args: ChangeEventArgs) => {
        setValue(args.itemData.value || "null");
        setText(args.itemData.text || "null");
    }
    return(
        <div className='control-pane'>
            <div className='control-section'>
                <div className="col-lg-8">
                    <div className="control-wrapper multicolumn">
                        <div style={{ paddingTop: '50px'}}>
                            <MultiColumnComboBoxComponent dataSource={(data as any).orderDetails} fields={{text: 'ShipCountry', value: 'OrderID' }} popupHeight={'230px'} placeholder='Select the country' value={value} text={text} change={valueChange} showClearButton={true}>
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
                <div className="col-lg-4 property-section">
                    <PropertyPane title='Properties'>
                        <table id="property" title="Properties" style={{ width: '100%', margin: '10px' }}>
                            <tbody>
                                <tr>
                                    <td className="left-side">Value</td>
                                    <td>:<span id='value' className="right-side">{ value }</span></td>
                                </tr>
                                <tr>
                                    <td className="left-side">Text</td>
                                    <td>:<span id='text' className="right-side"> { text }</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>

            <div id="action-description">
                <p>This sample demonstrates the default functionalities of the <code>MultiColumn ComboBox</code>.</p>
            </div>

            <div id="description">
                <p>The <code>MultiColumn ComboBox</code> allows the user to display detailed information about items in multiple columns. In the above sample, type any character in the MultiColumn ComboBox or click the dropdown icon to choose an item from the options available in the list. The selected item's <code>value</code> and <code>text</code> property values will be shown in the property panel.</p>
            </div>
        </div>
    );
}
export default Default;
