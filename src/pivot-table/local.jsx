import * as React from 'react';
import { PivotViewComponent } from '@syncfusion/ej2-react-pivotview';
import { SampleBase } from '../common/sample-base';
import * as localData from './pivot-data/rData.json';
/**
 * PivotView sample for Local data source.
 */
const SAMPLE_CSS = `
.e-pivotview {
    width: 100%;
    height: 100%;
}`;
/* tslint:disable */
let data = localData.data;
let dataSourceSettings = {
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
let pivotObj;
export class Local extends SampleBase {
    onLoad() {
        if (data[0].Year === undefined) {
            let date;
            for (let ln = 0, lt = data.length; ln < lt; ln++) {
                date = new Date(data[ln].Date.toString());
                let dtYr = date.getFullYear();
                let dtMn = date.getMonth();
                let dtdv = (dtMn + 1) / 3;
                data[ln].Year = 'FY ' + dtYr;
                data[ln].Quarter = dtdv <= 1 ? 'Q1 ' + ('FY ' + dtYr) : dtdv <= 2 ? 'Q2 ' + ('FY ' + dtYr) :
                    dtdv <= 3 ? 'Q3 ' + ('FY ' + dtYr) : 'Q4 ' + ('FY ' + dtYr);
                data[ln].HalfYear = (dtMn + 1) / 6 <= 1 ? 'H1 ' + ('FY ' + dtYr) : 'H2' + ('FY ' + dtYr);
                delete (data[ln].Date);
            }
        }
        pivotObj.dataSourceSettings.dataSource = data;
    }
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section' style={{ overflow: 'auto' }}>
                    <PivotViewComponent id='PivotView' ref={(pivotview) => { pivotObj = pivotview; }} load={this.onLoad} dataSourceSettings={dataSourceSettings} width={'100%'} height={'300'} gridSettings={{ columnWidth: 120 }}>
                    </PivotViewComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates basic rendering of the pivot table bound to JSON data extracted from a local file.</p>
                </div>
                <div id="description">
                    <p>The pivot table supports JSON data source. The
                        <code>dataSourceSettings->dataSource</code> property can be assigned with the JSON data to populate the pivot table.</p>
                    <p>In this demo, the JSON data is assigned from an external file.</p>

                </div>
            </div>);
    }
}
