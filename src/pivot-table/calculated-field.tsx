import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PropertyPane } from '../common/property-pane';
import { PivotViewComponent, IDataOptions, FieldList, Inject, CalculatedField, IDataSet } from '@syncfusion/ej2-react-pivotview';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import * as pivotData from './pivot-data/Pivot_Data.json';
import './calculated-field.css';

/**
 * PivotView Sample with Calculated Fields.
 */

/* tslint:disable */
let Pivot_Data: IDataSet[] = (pivotData as any).data;
let dataSourceSettings: IDataOptions = {
    dataSource: Pivot_Data,
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

    private pivotObj: PivotViewComponent;

    btnClick(): void {
        this.pivotObj.calculatedFieldModule.createCalculatedFieldDialog();
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className='col-lg-9 adaptive'>
                        <PivotViewComponent id='PivotView' ref={(pivotview) => { this.pivotObj = pivotview }} dataSourceSettings={dataSourceSettings} showFieldList={true} width={'100%'} height={'300'} allowCalculatedField={true} gridSettings={{columnWidth: 140}}>
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
                    <p>In this sample, <b>Total Units</b> acts as the calculated field. Users can insert a new basic arithmetic expression based on the existing measure items either through a dialog at runtime or through code behind.</p>
                </div>
                <div id="description">
                    <p>The calculated field feature allows users to create custom fields which are not present in the actual data. Users can
                        create these fields using basic mathematical expression collaborating with existing fields. Calculated fields can
                        be created through UI dialog as well as code behind and it can be enabled by setting <code>allowCalculatedField</code> as true. The
                            <code> calculatedFieldSettings</code> property is available to configure the calculated field in code behind.
                            <br />
                        <br />The pivot table features are segregated into individual modules. To add calculated field, we need to inject
                            <code> CalculatedField</code> module into the
                            <code> services</code>.</p>
                </div>
            </div>
        )
    }
}