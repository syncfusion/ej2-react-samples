import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PivotViewComponent, IDataOptions, IDataSet, FieldList, Inject } from '@syncfusion/ej2-react-pivotview';
import { Pivot_Data } from './data-source';
import { SampleBase } from '../common/sample-base';

/**
 * PivotView Value Sorting sample.
 */

const SAMPLE_CSS = `
.e-pivotview {
    width: 100%;
    height: 100%;
}`;

let dataSource: IDataOptions = {
    valueSortSettings: {
        headerText: 'FY 2015##In Stock',
        headerDelimiter: '##',
        sortOrder: 'Descending'
    },
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

export class ValueSorting extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section' style={{ overflow: 'auto' }}>
                    <PivotViewComponent id='PivotView' dataSource={dataSource} width={'100%'} height={'300'} showFieldList={true} enableValueSorting={true} gridSettings={{columnWidth: 140}}>
                        <Inject services={[FieldList]} />
                    </PivotViewComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates ordering of values in ascending or descending order. Here, the <b>FY 2015 -> In Stock</b> column header
                    text is ordered by defining sort-related settings in code behind.</p>
                </div>
                <div id="description">
                    <p>You can sort column values by clicking the column header. Clicking the same header once again will reverse the sorting
                        direction. It can be enabled by setting the <code>enableValueSorting</code> as true.
                    </p>
                    <p>Value sort-related settings can be defined in code behind, too. To do so, headers of the column to be sorted are given
                        in the
                    <code>headerText</code> property under
                    <code>valueSortSettings</code>, separated by a delimiter string. The purpose of providing complete header text here is to indicate exactly which
                                    value column needs to be sorted. The string which is used to separate the headers is given in the property
                    <code>headerDelimiters</code>. The sorting direction is performed by the
                    <code>sortOrder</code> property.</p>
                </div>
            </div>
        )
    }
}