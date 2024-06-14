import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PivotViewComponent, IDataOptions, IDataSet, FieldList, DrillThrough, Inject } from '@syncfusion/ej2-react-pivotview';
import { updateSampleSection } from '../common/sample-base';
import * as pivotData from './pivot-data/Pivot_Data.json';
import './drill-through.css';

/**
 * PivotView Value Sorting sample.
 */

/* tslint:disable */
let Pivot_Data: IDataSet[] = (pivotData as any).data;
let dataSourceSettings: IDataOptions = {
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
    { name: 'Amount', caption: 'Sold Amount' }],
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
    dataSource: Pivot_Data,
    expandAll: false,
    enableSorting: true,
    rows: [{ name: 'Country' }, { name: 'Products' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }]
};

function DrillThroughComponent () {

    React.useEffect(() => {
        updateSampleSection();
    }, [])

    return (
        <div className='control-pane'>
            <div className='control-section' style={{ overflow: 'initial' }}>
                <PivotViewComponent id='PivotView' dataSourceSettings={dataSourceSettings} showTooltip={false} width={'100%'} height={'300'} showFieldList={true} allowDrillThrough={true} gridSettings={{ columnWidth: 140 }}>
                    <Inject services={[FieldList, DrillThrough]} />
                </PivotViewComponent>
            </div>
            <div id="action-description">
                <p>This sample demonstrates how to obtain a list of raw items for a particular cell using the drill-through option on double-clicking.</p>
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
                    The pivot table features are segregated into individual modules.
                    To enable drill-through, inject the
                    <code> DrillThrough</code> module into
                    <code>services</code>.
                </p><br />
                <p>
                    More information on the drill-through can be found in this <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/pivotview/drill-through">
                    documentation section</a>.
                </p>
            </div>
        </div>
    )
}

export default DrillThroughComponent;