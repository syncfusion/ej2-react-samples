import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PivotViewComponent, IDataOptions, IDataSet } from '@syncfusion/ej2-react-pivotview';
import { SampleBase } from '../common/sample-base';
import { renewableEnergy } from './data-source';

/**
 * PivotView sample for Local data source.
 */

const SAMPLE_CSS = `
.e-pivotview {
    width: 100%;
    height: 100%;
}`;

let dataSource: IDataOptions = {
    data: renewableEnergy,
    expandAll: false,
    enableSorting: true,
    formatSettings: [{ name: 'ProCost', format: 'C0' }, { name: 'PowUnits', format: 'N0' }],
    drilledMembers: [{ name: 'EnerType', items: ['Biomass', 'Free Energy'] }],
    rows: [
        { name: 'Year', caption: 'Production Year' },
        { name: 'HalfYear', caption: 'Half Year' },
        { name: 'Quarter', caption: 'Quarter' }
    ],
    columns: [
        { name: 'EnerType', caption: 'Energy Type' },
        { name: 'EneSource', caption: 'Energy Source' }
    ],
    values: [
        { name: 'PowUnits', caption: 'Units (GWh)' },
        { name: 'ProCost', caption: 'Cost (MM)' }
    ],
    filters: []
};

export class Local extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section' style={{ overflow: 'auto' }}>
                    <PivotViewComponent id='PivotView' dataSource={dataSource} width={'100%'} height={'300'} gridSettings={{columnWidth: 120}}>
                    </PivotViewComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the basic rendering of the pivotgrid widget with local data.</p>
                </div>
                <div id="description">
                    <p>The pivotgrid widget supports JSON data source. The
                        <code>dataSource->data</code> property can be assigned with the JSON data to populate the widget.</p>
                    <p>In this demo, the JSON data is assigned from an external file.</p>

                </div>
            </div>
        )
    }
}