import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PivotViewComponent, IDataOptions, IDataSet, Inject, GroupingBar, FieldList } from '@syncfusion/ej2-react-pivotview';
import { updateSampleSection } from '../common/sample-base';
import { SwitchComponent } from '@syncfusion/ej2-react-buttons';
import { Pivot_Data } from './data-source';
import './classic-layout.css';
import { Browser } from '@syncfusion/ej2-base';

/**
 * PivotView Classic layout Sample.
 */

let dataSourceSettings: IDataOptions = {
    dataSource: Pivot_Data,
    enableSorting: true,
    columns: [{ name: 'Year' }, { name: 'Quarter' }],
    rows: [{ name: 'Product_Categories', caption: 'Product Categories' }, { name: 'Products' }, {name: 'Order_Source', caption: 'Order Source'}],
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    drilledMembers: [{ name: 'Product_Categories', items: ['Accessories', 'Bikes'] }, { name: 'Products', delimiter: '##', items: ['Accessories##Helmets'] }],
    filterSettings: [{
        name: 'Products', type: 'Exclude', items: ['Cleaners', 'Fenders']
    }],
    expandAll: false,
    values: [{ name: 'Sold', caption: 'Units Sold' },
    { name: 'Amount', caption: 'Sold Amount' }],
    filters: []
};

function ClassicLayout() {

    React.useEffect(() => {
        updateSampleSection();
    }, []);

    let pivotObj: any;
    function onChange() {
        pivotObj.gridSettings.layout = pivotObj.gridSettings.layout === 'Compact' ? 'Tabular' : 'Compact';
    }

    return (
        <div className='control-pane'>
            <div className='control-section' style={{ overflow: 'initial' }}>
                <div className="tabular-layout-switch">
                    <label id="layout-label" htmlFor="layout-switch">Classic Layout</label>
                    <SwitchComponent id="layout-switch" checked={true} cssClass="pivot-layout-switch" change={onChange}></SwitchComponent>
                </div>
                <div>
                    <PivotViewComponent id='PivotView' ref={(scope) => { pivotObj = scope; }} dataSourceSettings={dataSourceSettings} showFieldList={true} width={'100%'} height={'450'} gridSettings={{ columnWidth: Browser.isDevice ? 100 : 120, layout: 'Tabular' }}>
                        <Inject services={[FieldList]} />
                    </PivotViewComponent>
                </div>
            </div>
            <div id="action-description">
                <p>This sample showcases the classic layout option of the Pivot Table, also known as the Excel-like tabular format.
                    In this layout, each field from the row and column axes is arranged sequentially, displayed side by side in
                    separate rows or columns. Subtotals and grand totals are prominently shown, making it easy to compare and
                    analyze data effectively.</p>
            </div>
            <div id="description">
                <p>The Pivot Table's classic layout displays each field in the row axis side by side in separate columns. By default, grand totals are displayed at the end of all rows, while subtotals are placed in a separate row beneath
                    each group. All other features of the pivot table, such as filtering, sorting, drag-and-drop, expand/collapse functionality, and more, remain the same as in the Compact (Excel-like) layout, which serves as the default layout for the Syncfusion<sup>®</sup> Pivot Table.
                </p>
                <p>
                    This layout can be enabled by setting the <code>layout</code> property to <b>Tabular</b> within the <code>gridSettings</code>.
                    Using the <b>Classic Layout</b> toggle switch, the pivot table layout can be dynamically switched between
                    Compact and Classic layouts at runtime.
                </p>
                <p><b>Note:</b> For pivot table reports containing multi-level hierarchies with extensive sublevels, the default
                    layout (i.e., compact view) is recommended, as it effectively displays data in a simple and compact manner.
                </p><br />
                <p>
                    More information on the React Pivot Table can be found in this <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/pivotview/getting-started#adding-pivot-table-component">
                        documentation section</a>.
                </p>
            </div>
        </div>
    )
}

export default ClassicLayout;
