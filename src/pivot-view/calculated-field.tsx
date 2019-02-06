import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PropertyPane } from '../common/property-pane';
import { PivotViewComponent, IDataOptions, FieldList, Inject, CalculatedField } from '@syncfusion/ej2-react-pivotview';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { Pivot_Data } from './data-source';
import { SampleBase } from '../common/sample-base';

/**
 * PivotView Sample with Calculated Fields.
 */

const SAMPLE_CSS = `
.e-pivotview {
    width: 100%;
    height: 100%;
}`;

let dataSource: IDataOptions = {
    data: Pivot_Data,
    expandAll: false,
    enableSorting: true,
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
    rows: [{ name: 'Country' }, { name: 'Products' }],
    values: [{ name: 'In_Stock', caption: 'In Stock' },
    { name: 'Sold', caption: 'Units Sold' }, { name: 'Total', caption: 'Total Units', type: 'CalculatedField' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
    calculatedFieldSettings: [
        {
            name: 'Total',
            formula: '"Sum(In_Stock)"+"Sum(Sold)"'
        }]
};

export class CalculatedFieldClass extends SampleBase<{}, {}> {

    private pivotGridObj: PivotViewComponent;

    btnClick(): void {
        this.pivotGridObj.calculatedFieldModule.createCalculatedFieldDialog();
    }

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <div className='col-lg-9 adaptive'>
                        <PivotViewComponent id='PivotView' ref={(pivotview) => { this.pivotGridObj = pivotview }} dataSource={dataSource} showFieldList={true} width={'100%'} height={'300'} allowCalculatedField={true} gridSettings={{columnWidth: 140}}>
                            <Inject services={[CalculatedField, FieldList]} />
                        </PivotViewComponent>
                    </div>
                    <div className='col-lg-3 property-section'>
                        <PropertyPane title='Properties'>
                            <div style={{ float: 'Right', marginRight: '10px' }}>
                                <ButtonComponent cssClass='e-primary' onClick={this.btnClick.bind(this)}>Calculated Field</ButtonComponent>
                            </div>
                        </PropertyPane>
                    </div>

                </div>
                <div id="action-description">
                    <p>In this sample,
                        <b> Total Units</b> acts as the calculated field. Users are allowed to insert a new calculated field based on the existing
                        calculated items either through a dialog window at run time or through code behind.</p>
                </div>
                <div id="description">
                    <p>The calculated field feature allows users to create custom fields which are not present in the actual data. Users can
                        create these fields using basic mathematical expression collaborating with existing fields. Calculated fields can
                        be created through UI dialog as well as code behind and it can be enabled by setting <code>allowCalculatedField</code> as true. The
                            <code> calculatedFieldSettings</code> property is available to configure the calculated field in code behind.
                            <br />
                        <br />The pivotgrid widget features are segregated into individual modules. To add calculated field, we need to inject
                            <code> CalculatedField</code> module into the
                            <code> services</code>.</p>
                </div>
            </div>
        )
    }
}