/**
 * MultiColumnComboBox Grouping Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MultiColumnComboBoxComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-multicolumn-combobox';
import { SampleBase } from '../common/sample-base';
import './grouping.css';
import * as data from './dataSource.json';

export class Group extends SampleBase<{}, {}> {

    fields: { text: 'Name', value: 'Name', groupBy: 'Category' };
    render() {
        return (
            <div className='control-pane'>
                <div className="control-section">
                    <div className='control-wrapper grouping-multicolumn'>
                        <div style={{ paddingTop: '60px' }}>
                        <label>Select a product</label>
                            <MultiColumnComboBoxComponent type="text" dataSource={(data as any).products} fields={this.fields} placeholder='e.g. Laptop' popupHeight={'230px'} popupWidth={'550px'} allowSorting={false}>
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

                <div id="action-description">
                    <p>This sample demonstrates grouping feature of the MultiColumn Combobox.</p>
                </div>

                <div id="description">
                    <p>The MultiColumn ComboBox allows to group the relevant items under a corresponding category by mapping the <code>groupBy</code> property in the <code>fieldSettings</code> which allows to load the list of employees. In this sample, the order data is grouped against <code>Position</code> column, which illustrates how the orders details are grouped based on its category.</p>
                </div>
            </div>
        )
    }
}