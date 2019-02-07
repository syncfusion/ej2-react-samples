import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PivotViewComponent, GroupingBar, FieldList, IDataOptions, IDataSet, Inject, CalculatedField } from '@syncfusion/ej2-react-pivotview';
import { Pivot_Data } from './data-source';
import { SampleBase } from '../common/sample-base';
import './right-to-left.css';

/**
 * PivotView RTL Sample.
 */

let dataSource: IDataOptions = {
    data: Pivot_Data,
    expandAll: false,
    enableSorting: true,
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
    { name: 'Amount', caption: 'Sold Amount' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
    columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
    rows: [{ name: 'Country' }, { name: 'Products' }],
};

export class RTL extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section' style={{ overflow: 'auto' }}>
                    <PivotViewComponent id='PivotView' dataSource={dataSource} showGroupingBar={true} width={'100%'} height={'300'} showFieldList={true} allowCalculatedField={true} enableRtl={true} gridSettings={{columnWidth: 140}}>
                        <Inject services={[GroupingBar, FieldList, CalculatedField]} />
                    </PivotViewComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the right-to-left view of the
                        <code>PivotGrid, Grouping Bar</code> and
                        <code>Field List</code>
                    </p>
                </div>
                <div id="description">
                    <p>
                        <code>PivotGrid</code>,
                        <code>Grouping Bar</code> and
                        <code>Field List</code> support right-to-left direction. It can be enabled by setting the
                        <code>enbleRtl</code> property to true. To open the field list, click the icon at the top-left corner of the grouping bar.</p>
                </div>
            </div>
        )
    }
}