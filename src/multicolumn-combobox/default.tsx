/**
 * MultiColumnComboBox Default functionality Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MultiColumnComboBoxComponent, ChangeEventArgs, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-multicolumn-combobox';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import './default.css';
import * as data from './dataSource.json';

export class Default extends SampleBase<{}, {}> {
    value: string = 'Electronics';
    text: string = 'Laptop';
    valueChange = (args: ChangeEventArgs) => {
        this.value = args.itemData.value || "";
        this.text = args.itemData.text || "";
    };
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className="col-lg-8">
                        <div className="control-wrapper multicolumn">
                            <div style={{ paddingTop: '50px'}}>
                            <label>Select a product</label>
                                <MultiColumnComboBoxComponent dataSource={(data as any).products} fields={{text: 'Name', value: 'Category' }} popupHeight={'230px'} popupWidth={'520px'} placeholder='Select any product' value={this.value} text={this.text} change={ this.valueChange.bind(this) } showClearButton={true}>
                                <ColumnsDirective>
                                    <ColumnDirective field='Name' header='Name' width={110}></ColumnDirective>
                                    <ColumnDirective field='Price' header='Price' width={70}></ColumnDirective>
                                    <ColumnDirective field='Availability' header='Availability' width={98}></ColumnDirective>
                                    <ColumnDirective field='Category' header='Category' width={95}></ColumnDirective>
                                    <ColumnDirective field='Rating' header='Rating' width={70}></ColumnDirective>
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
                                        <td>:<span id='value' className="right-side">{ this.value }</span></td>
                                    </tr>
                                    <tr>
                                        <td className="left-side">Text</td>
                                        <td>:<span id='text' className="right-side">{ this.text }</span></td>
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
                    <p>The <code>MultiColumn ComboBox</code> allows the user to display detailed information about items in multiple columns. In the above sample, type any character in the MultiColumn ComboBox or click the dropdown icon to choose an employee from the options available in the list. The selected item's <code>value</code> and <code>text</code> property values will be shown in the property panel.</p>
                </div>
            </div>
        )
    }
}
