import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PivotViewComponent, GroupingBar, IDataOptions, IDataSet, Inject } from '@syncfusion/ej2-react-pivotview';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as pivotData from './pivot-data/Pivot_Data.json';
import './grouping-bar.css';

/**
 * PivotView Grouping bar Sample
 */
/* tslint:disable */
let Pivot_Data: IDataSet[] = (pivotData as any).data;
let dataSourceSettings: IDataOptions = {
    enableSorting: true,
    columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
    rows: [{ name: 'Country' }, { name: 'Products' }],
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    dataSource: Pivot_Data,
    expandAll: false,
    values: [{ name: 'Sold', caption: 'Units Sold' },
    { name: 'Amount', caption: 'Sold Amount' }],
    filters: []
};

export class GroupingBarSample extends SampleBase<{}, {}> {

    public pivotObj: any;

    onChange(args: any): void {
        if ((args.event.target as HTMLElement).id === 'filter') {
            this.pivotObj.groupingBarSettings.showFilterIcon = args.checked;
        } else if (args.event.target.id === 'sort') {
            this.pivotObj.groupingBarSettings.showSortIcon = args.checked;
        } else if (args.event.target.id === 'remove') {
            this.pivotObj.groupingBarSettings.showRemoveIcon = args.checked;
        } else {
            this.pivotObj.groupingBarSettings.showValueTypeIcon = args.checked;
        }
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='col-lg-9 control-section' id='pivot-table-section' style={{ overflow: 'initial' }}>
                    <PivotViewComponent id='PivotView' ref={(scope) => { this.pivotObj = scope; }} dataSourceSettings={dataSourceSettings} width={'100%'} height={'450'} showGroupingBar={true} groupingBarSettings={{showFieldsPanel: true}} gridSettings={{columnWidth: 140}} showValuesButton={true}>
                        <Inject services={[GroupingBar]} />
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
                    <p>This sample demonstrates the grouping feature of the pivot table. The pivot fields are automatically populated from the bound data source, and they can be dragged and dropped to alter the report at runtime. The pivot fields can be sorted, filtered, and removed dynamically as well.</p>
                </div>
                <div id="description">
                    <p>The pivot table grouping bar option automatically populates fields from the bound data source and allows end users
                        to drag fields between different axes such as columns, rows, values, and filters, and create pivot table at runtime.
                        To enable grouping bar, set the
                        <code>showGroupingBar</code> property as true.</p>
                    <p>
                        Filter and sort icons allow displaying selective records and ordering them in ascending or descending order. The value type icon
                        allows to display values based on selected aggregate type. The remove icon
                        allows the user to remove the field from the report.
                    </p>
                    <p>
                        During runtime, the <b>Values</b> button in the grouping bar can be moved to a different position (i.e., different index) 
                        among other fields in the column or row axis. To enable values button, 
                        set the <code>showValuesButton</code> property to <b>true</b>.
                    </p>
                    <p>
                        The fields panel, which is located above the grouping bar, displays the fields that are available in the data
                        source but are not bound in the report. The fields can be dragged and dropped into the appropriate axis. In
                        addition, any field removed from any axes will be automatically added to the fields panel. The fields panel can
                        be displayed by setting the <code>showFieldsPanel</code> property in the <code>groupingBarSettings</code> to <b>true</b>.
                    </p>
                    <p>
                        <strong>Injecting Module:</strong>
                    </p>
                    <p>
                        The pivot table features are segregated into individual modules. To take advantage of grouping bar support, we need
                        to inject the
                        <code> GroupingBar</code> module into the
                        <code> services</code>.
                    </p>
                </div>
            </div>
        )
    }
}