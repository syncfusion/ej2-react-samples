import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PropertyPane } from '../common/property-pane';
import { PivotViewComponent, IDataOptions, IDataSet } from '@syncfusion/ej2-react-pivotview';
import { Pivot_Data } from './data-source';
import { SampleBase } from '../common/sample-base';
import { RadioButtonComponent } from '@syncfusion/ej2-react-buttons';

/**
 * PivotView Sample with Drill Options.
 */

let dataSource: IDataOptions = {
    enableSorting: true,
    columns: [{ name: 'Year' }, { name: 'Quarter' }, { name: 'Order_Source', caption: 'Order Source' }],
    rows: [{ name: 'Country' }, { name: 'Product_Categories', caption: 'Product Categories' }, { name: 'Products' }],
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    data: Pivot_Data,
    expandAll: false,
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
    { name: 'Amount', caption: 'Sold Amount' }],
    filters: []
};

const SAMPLE_CSS = `
.e-pivotview {
    width: 100%;
    height: 100%;
}`;

export class DrillOptions extends SampleBase<{}, {}> {

    private pivotGridObj: PivotViewComponent;

    onRadioChange(args: any): void {
        let id: string = (args.event.target as HTMLElement).id;
        if (id !== 'collapse') {
            /** To restrict multiple times grid rendering on property change */
            this.pivotGridObj.setProperties({ dataSource: { expandAll: false, drilledMembers: [] } }, true);
        } else {
            this.pivotGridObj.dataSource.drilledMembers = [];
        }
        if (id === 'collapse') {
            this.pivotGridObj.dataSource.expandAll = false;
        } else if (id === 'expand') {
            this.pivotGridObj.dataSource.expandAll = true;
        } else if (id === 'fy15') {
            this.pivotGridObj.dataSource.drilledMembers = [{ name: 'Year', items: ['FY 2015'] }];
        } else if (id === 'fy15_q1') {
            this.pivotGridObj.dataSource.drilledMembers = [{ name: 'Year', items: ['FY 2015'] },
            { name: 'Quarter', items: ['Q1'] }];
        } else if (id === 'us') {
            this.pivotGridObj.dataSource.drilledMembers = [{ name: 'Country', items: ['United States'] }];
        } else {
            this.pivotGridObj.dataSource.drilledMembers = [{ name: 'Country', items: ['United States'] },
            { name: 'Product_Categories', items: ['Clothing'] }];
        }
    }

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <div className='col-lg-8 adaptive'>
                        <PivotViewComponent id='PivotView' ref={(pivotview) => { this.pivotGridObj = pivotview }} dataSource={dataSource} width={'100%'} height={'300'} gridSettings={{columnWidth: 140}}>
                        </PivotViewComponent>
                    </div>
                    <div className='col-lg-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', height: '100%' }}>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className='row' style={{ margin: '0px' }}>
                                                <RadioButtonComponent id="collapse" change={this.onRadioChange.bind(this)} checked={true} label='Collapse All' name='DrillOperation' value="Collapse All"></RadioButtonComponent>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className='row' style={{ margin: '0px' }}>
                                                <RadioButtonComponent id="expand" change={this.onRadioChange.bind(this)} label='Expand All' name='DrillOperation' value="Expand All"></RadioButtonComponent>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className='row' style={{ margin: '0px' }}>
                                                <RadioButtonComponent id="fy15" change={this.onRadioChange.bind(this)} label='FY 2015' name='DrillOperation' value="FY 2015"></RadioButtonComponent>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className='row' style={{ margin: '0px' }}>
                                                <RadioButtonComponent id="fy15_q1" change={this.onRadioChange.bind(this)} label='FY 2015 >> Q1' name='DrillOperation' value="FY 2015 >> Q1"></RadioButtonComponent>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className='row' style={{ margin: '0px' }}>
                                                <RadioButtonComponent id="us" change={this.onRadioChange.bind(this)} label='United States' name='DrillOperation' value="United States"></RadioButtonComponent>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className='row' style={{ margin: '0px' }}>
                                                <RadioButtonComponent id="us_clothing" change={this.onRadioChange.bind(this)} label='United States >> Clothing' name='DrillOperation' value="United States >> Clothing"></RadioButtonComponent>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the drill up and drill down capabilities of pivotgrid widget.</p>
                </div>
                <div id="description">
                    <p>In the sample, the pivotgrid widget can be completely expanded as well as collapsed. It can be done using
                        <code>expandAll</code> property in pivotgrid widget.
                        <br /><br />Meanwhile a particular row or column header can also be drilled during initial
                                                        loading of the pivotgrid. It can be done using the
                        <code>name</code> and
                        <code>items</code> options inside the
                        <code>drilledMembers</code> property in pivotgrid widget.
                    </p>
                </div>
            </div>
        )
    }
}