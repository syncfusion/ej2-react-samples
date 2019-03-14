import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PivotViewComponent, IDataOptions, IDataSet, FieldList, DrillThrough, Inject } from '@syncfusion/ej2-react-pivotview';
import { SampleBase } from '../common/sample-base';
import * as pivotData from './pivot-data/Pivot_Data.json';

/**
 * PivotView Value Sorting sample.
 */

const SAMPLE_CSS = `
.e-pivotview {
    width: 100%;
    height: 100%;
}`;
/* tslint:disable */
let Pivot_Data: IDataSet[] = (pivotData as any).data;
let dataSource: IDataOptions = {
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
    { name: 'Amount', caption: 'Sold Amount' }],
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
    data: Pivot_Data,
    expandAll: false,
    enableSorting: true,
    rows: [{ name: 'Country' }, { name: 'Products' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }]
};

export class DrillThroughComponent extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section' style={{ overflow: 'initial' }}>
                    <PivotViewComponent id='PivotView' dataSource={dataSource} showTooltip={false} width={'100%'} height={'300'} showFieldList={true} allowDrillThrough={true} gridSettings={{ columnWidth: 140 }}>
                        <Inject services={[FieldList, DrillThrough]} />
                    </PivotViewComponent>
                </div>
                <div id="action-description">
                    <p>This demo demonstrates how to obtain a list of raw items for a particular cell using the drill-through option.</p>
                </div>
                <div id="description">
                    <p>In this sample, you can view the raw items of any pivot table cell by double-clicking the cell. The
                        drill-through dialog holds the row headers, column headers, and values information of the clicked cell.
                        Initially drill-through information is displayed for bound fields and you can include the remaining raw items
                        details using the <code>column chooser</code> option in the dialog.
                    </p>
                    <p>This feature can be enabled by setting the <code>allowDrillThrough</code> as true.</p>
                    <p>
                        <strong>Injecting Module:</strong>
                    </p>
                    <p>
                        The pivot grid widget features are segregated into individual modules.
                        To enable drill-through, inject the
                        <code> DrillThrough</code> module into
                        <code>services</code>.
                    </p>
                </div>
            </div>
        )
    }
}