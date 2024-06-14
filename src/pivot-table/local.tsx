import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PivotViewComponent, IDataOptions, IDataSet, LoadEventArgs } from '@syncfusion/ej2-react-pivotview';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { csvdata } from './pivot-data/csvData';
import * as localData from './pivot-data/rData.json';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import './local.css';

/**
 * PivotView sample for Local data source.
 */

/* tslint:disable */
let data: IDataSet[] = (localData as any).data;

export class Local extends SampleBase<{}, {}> {
    private pivotObj: PivotViewComponent;
    private fields: object = { text: 'text', value: 'value' };
    private contentTypes: { [key: string]: Object }[] = [
        { 'value': 'JSON', 'text': 'JSON' },
        { 'value': 'CSV', 'text': 'CSV' }
    ];

    private jsonReport: IDataOptions = {
        dataSource: this.groupDate(data),
        type: 'JSON',
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

    private csvReport: IDataOptions = {
        type: 'CSV',
        expandAll: false,
        enableSorting: true,
        formatSettings: [{ name: 'Total Cost', format: 'C0' }, { name: 'Total Revenue', format: 'C0' }, { name: 'Total Profit', format: 'C0' }],
        drilledMembers: [{ name: 'Item Type', items: ['Baby Food'] }],
        rows: [
            { name: 'Region' },
            { name: 'Country' }
        ],
        columns: [
            { name: 'Item Type' },
            { name: 'Sales Channel' }
        ],
        values: [
            { name: 'Total Cost' },
            { name: 'Total Revenue' },
            { name: 'Total Profit' }
        ],
        filters: []
    };

    ddlOnChange(args: ChangeEventArgs): void {
        if (args.value === 'JSON') {
            this.pivotObj.dataSourceSettings = this.jsonReport;
        } else if (args.value === 'CSV') {
            this.csvReport.dataSource = this.getCSVData();
            this.pivotObj.dataSourceSettings = this.csvReport;
        }
    }

    getCSVData(): string[][] {
        let dataSource: string[][] = [];
        let jsonObject: string[] = csvdata.split(/\r?\n|\r/);
        for (let i: number = 0; i < jsonObject.length; i++) {
            if (!isNullOrUndefined(jsonObject[i]) && jsonObject[i] !== '') {
                dataSource.push(jsonObject[i].split(','));
            }
        }
        return dataSource;
    }

    groupDate(data: IDataSet[]): IDataSet[] {
        if (data[0].Year === undefined) {
            let date: Date;
            for (let ln: number = 0, lt: number = data.length; ln < lt; ln++) {
                date = new Date(data[ln].Date.toString());
                let dtYr: number = date.getFullYear();
                let dtMn: number = date.getMonth();
                let dtdv: number = (dtMn + 1) / 3;
                data[ln].Year = 'FY ' + dtYr;
                data[ln].Quarter = dtdv <= 1 ? 'Q1 ' + ('FY ' + dtYr) : dtdv <= 2 ? 'Q2 ' + ('FY ' + dtYr) :
                    dtdv <= 3 ? 'Q3 ' + ('FY ' + dtYr) : 'Q4 ' + ('FY ' + dtYr);
                data[ln].HalfYear = (dtMn + 1) / 6 <= 1 ? 'H1 ' + ('FY ' + dtYr) : 'H2' + ('FY ' + dtYr);
                delete (data[ln].Date);
            }
        }
        return data;
    }

    onLoad(args: LoadEventArgs): void {
        if (args.dataSourceSettings.type === 'CSV') {
            args.dataSourceSettings.dataSource = this.getCSVData();
        }
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section component-section'>
                    <div id='dropdown-control' style={{ marginBottom: '5px' }}>
                        <table style={{ width: '350px' }}>
                            <tbody>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div><b>Content Type:</b>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <div>
                                                <DropDownListComponent placeholder={'Content Type'} fields={this.fields} change={this.ddlOnChange.bind(this)} id="contenttype" index={0} enabled={true} dataSource={this.contentTypes} />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <PivotViewComponent id='PivotView' ref={(pivotview) => { this.pivotObj = pivotview }} load={this.onLoad.bind(this)} dataSourceSettings={this.jsonReport} width={'100%'} height={'290'} gridSettings={{ columnWidth: 120 }}>
                    </PivotViewComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates basic rendering of the pivot table bound to JSON or CSV data extracted from a local file.</p>
                </div>
                <div id="description">
                    <p>The pivot table supports JSON and CSV data source. The
                        <code>dataSourceSettings-&gt;dataSource</code> property can be assigned with the source data to populate the pivot table.</p>
                    <p>In this demo, the JSON and CSV data is assigned from an external file.</p><br />
                    <p>
                        More information on the Essential JS2 Pivot Table can be found in these <a target="_blank"
                            href="https://ej2.syncfusion.com/react/documentation/pivotview/data-binding#binding-json-data-via-local">JSON</a> & <a target="_blank"
                            href="https://ej2.syncfusion.com/react/documentation/pivotview/data-binding#binding-csv-data-via-local">CSV</a> documentation section.
                    </p>
                </div>
            </div>
        )
    }
}