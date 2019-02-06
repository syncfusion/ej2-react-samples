import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PivotViewComponent, GroupingBar, IDataOptions, IDataSet, Inject, FieldList } from '@syncfusion/ej2-react-pivotview';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { Pivot_Data } from './data-source';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import './grouping-bar.css';

/**
 * PivotView Grouping bar Sample
 */

let dataSource: IDataOptions = {
    enableSorting: true,
    columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
    rows: [{ name: 'Country' }, { name: 'Products' }],
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    data: Pivot_Data,
    expandAll: false,
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
    { name: 'Amount', caption: 'Sold Amount' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }]
};

export class Grouping extends SampleBase<{}, {}> {

    public pivotGridObj: any;

    onChange(args: any): void {
        if ((args.event.target as HTMLElement).id === 'filter') {
            this.pivotGridObj.groupingBarSettings.showFilterIcon = args.checked;
        } else if (args.event.target.id === 'sort') {
            this.pivotGridObj.groupingBarSettings.showSortIcon = args.checked;
        } else if (args.event.target.id === 'remove') {
            this.pivotGridObj.groupingBarSettings.showRemoveIcon = args.checked;
        } else {
            this.pivotGridObj.groupingBarSettings.showValueTypeIcon = args.checked;
        }
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='col-lg-9 control-section' id='pivot-grid-section' style={{ overflow: 'initial' }}>
                    <PivotViewComponent id='PivotView' ref={(scope) => { this.pivotGridObj = scope; }} dataSource={dataSource} width={'100%'} height={'300'} showGroupingBar={true} showFieldList={true} gridSettings={{columnWidth: 140}}>
                        <Inject services={[GroupingBar, FieldList]} />
                    </PivotViewComponent>
                </div>
                <div className="col-lg-3 property-section">
                    <PropertyPane title='Properties'>
                        <table id="property" title="Properties" style={{ width: '100%', height:'100%'}}>
                            <tbody>
                                <tr style={{height:'50px'}}>
                                    <td>
                                        <div>
                                            <CheckBoxComponent id='sort' checked={true} label='Show Sort Icon' change={this.onChange.bind(this)} ></CheckBoxComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{height:'50px'}}>
                                    <td>
                                        <div>
                                            <CheckBoxComponent id='filter' checked={true} label='Show Filter Icon' change={this.onChange.bind(this)} ></CheckBoxComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{height:'50px'}}>
                                    <td>
                                        <div>
                                            <CheckBoxComponent id='summary' checked={true} label='Show Value Type Icon' change={this.onChange.bind(this)} ></CheckBoxComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{height:'50px'}}>
                                    <td>
                                        <div>
                                            <CheckBoxComponent id='remove' checked={true} label='Show Remove Icon' change={this.onChange.bind(this)} ></CheckBoxComponent>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the grouping bar feature of the pivotgrid widget. In the sample, fields are automatically populated
                                from the bound data source, and it can be used to create a pivot view at runtime.</p>
                </div>
                <div id="description">
                    <p>The pivotgrid widget grouping bar option automatically populates fields from the bound data source and allows end users
                        to drag fields between different axes such as columns, rows, values, and filters, and create pivot views at runtime.
                        To enable grouping bar, set the
                            <code>showGroupingBar</code> property as true.</p>
                    <p>
                        Filter and sort icons allow displaying selective records and ordering them in ascending or descending order. The value type icon
                        allows to display values based on selected aggregate type. The remove icon
                        allows the user to remove the field from the report.
                                </p>
                    <p>
                        <strong>Injecting Module:</strong>
                    </p>
                    <p>
                        The pivotgrid widget features are segregated into individual modules. To take advantage of grouping bar support, we need
                        to inject the
                                    <code> GroupingBar</code> module into the
                                    <code> services</code>.
                    </p>
                </div>
            </div>
        )
    }
}