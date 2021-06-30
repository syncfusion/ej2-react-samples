import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SpreadsheetComponent, SheetsDirective, SheetDirective, ColumnsDirective, getFormatFromType, CellStyleModel, ChartModel } from '@syncfusion/ej2-react-spreadsheet';
import { ColumnDirective, RowDirective, RowsDirective, CellsDirective, CellDirective } from '@syncfusion/ej2-react-spreadsheet';
import { RangeDirective } from '@syncfusion/ej2-react-spreadsheet';
import { RangesDirective } from '@syncfusion/ej2-react-spreadsheet';
import { GDPData } from './data';
import { SampleBase } from '../common/sample-base';
import './spreadsheet.css';

/**
 * Chart sample
 */

export class Chart extends SampleBase<{}, {}> {
    public spreadsheet: SpreadsheetComponent;
    public style: CellStyleModel = { backgroundColor: '#e56590', color: '#fff',
    fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle' };
    public chart: ChartModel[] = [{ type: 'Column', range: 'A3:E10' }];
    public onCreated(): void {
        // Formatting cells dynamically using cellFormat method
        this.spreadsheet.cellFormat({ backgroundColor: '#e56590', color: '#fff', fontWeight: 'bold', textAlign: 'center' }, 'A3:E3');
        // Applying currency format to the specified range.
        this.spreadsheet.numberFormat(getFormatFromType('Currency'), 'B4:E10');
        // Merging the cells from A1 to E1
        this.spreadsheet.merge('A1:E1');
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section spreadsheet-control'>
                    <SpreadsheetComponent openUrl='https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open'
                        saveUrl='https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save'
                        ref={(ssObj) => { this.spreadsheet = ssObj }} created={this.onCreated.bind(this)}>
                        <SheetsDirective>
                            <SheetDirective name='GDP'>
                                <RowsDirective>
                                    <RowDirective height= {30}>
                                        <CellsDirective>
                                            <CellDirective value='Gross Domestic Product (in trillions)' style={this.style}></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={6} chart={this.chart}></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                </RowsDirective>
                            <RangesDirective>
                                <RangeDirective dataSource={GDPData} startCell='A3' ></RangeDirective>
                            </RangesDirective>
                            <ColumnsDirective>
                                <ColumnDirective width={80}></ColumnDirective>
                                <ColumnDirective width={75}></ColumnDirective>
                                <ColumnDirective width={75}></ColumnDirective>
                                <ColumnDirective width={75}></ColumnDirective>
                                <ColumnDirective width={75}></ColumnDirective>
                            </ColumnsDirective>
                        </SheetDirective>
                    </SheetsDirective>
                </SpreadsheetComponent>
            </div>
            <div id="action-description">
        <p>
            This sample visualizes the data using chart feature by comparing the GDP of different
            countries with various years.
        </p>
    </div>
    <div id="description">
        <p>
            In this demo, the chart has been inserted in the specific cell position by using the <code>chart</code>
            property in the cell object. You can also insert a chart by using the <a target="_blank"
            href="https://ej2.syncfusion.com/javascript/documentation/api/spreadsheet#insertchart"> insertChart</a>
             method.
            To enable or disable this feature use the <a target="_blank"
            href="https://ej2.syncfusion.com/javascript/documentation/api/spreadsheet#allowchart"> allowChart</a>
             property in Spreadsheet.
        </p>
        <p>
            This sample is configured with import and export options. Use <b>Ctrl + O</b> to open an excel file
            and <b>Ctrl + S</b> to save an excel file with chart.
        </p>
        <p>
            More information about the chart can be found in this
            <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/spreadsheet/illustrations/#chart"> documentation</a> section.
        </p>
    </div>
    </div>
        )
    }
}
