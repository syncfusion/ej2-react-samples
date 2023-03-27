import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SpreadsheetComponent, SheetsDirective, SheetDirective, ColumnsDirective, RangesDirective, RangeDirective } from '@syncfusion/ej2-react-spreadsheet';
import { RowsDirective, RowDirective, CellsDirective, CellDirective, CellStyleModel, ColumnDirective } from '@syncfusion/ej2-react-spreadsheet';
import { freezePaneData } from './data';
import { SampleBase } from '../common/sample-base';
import './spreadsheet.css';

/**
 * Default Spreadsheet sample
 */

export class FreezePane extends SampleBase<{}, {}> {
    public spreadsheet: SpreadsheetComponent;
    public cellStyle: CellStyleModel = { fontSize: '12pt', fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle' };
    public bold: CellStyleModel = { fontWeight: 'bold' };

    public onCreated(): void {
        this.spreadsheet.wrap("C2:P2");
        this.spreadsheet.merge('A1:B1');
        this.spreadsheet.merge('C1:P1');
        this.spreadsheet.cellFormat({ backgroundColor: '#4e4ee6', color: '#FFFFF4', fontSize: '12pt', fontWeight: 'bold', textAlign: 'center', verticalAlign:
        'middle' }, 'A1:P2');
        this.spreadsheet.cellFormat({ backgroundColor: '#4e4ee6', color: '#FFFFF4' }, 'A3:B26');
        this.spreadsheet.numberFormat('$#,##0.00', 'C2:P26');
        this.spreadsheet.numberFormat('$#,##0.00', 'O27:P27');
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section spreadsheet-control'>
                    <SpreadsheetComponent openUrl='https://services.syncfusion.com/react/production/api/spreadsheet/open'
                        saveUrl='https://services.syncfusion.com/react/production/api/spreadsheet/save'
                        ref={(ssObj) => { this.spreadsheet = ssObj }} created={this.onCreated.bind(this)} >
                        <SheetsDirective>
                            <SheetDirective name='Gross Salary' frozenRows= {2} frozenColumns= {2} selectedRange='C1'>
                                <RangesDirective>
                                    <RangeDirective dataSource={freezePaneData} startCell='A2'></RangeDirective>
                                </RangesDirective>
                                <RowsDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} value='Period' style={this.cellStyle}></CellDirective>
                                            <CellDirective index={3} value='Total Gross Salary' style={this.cellStyle}></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective index={26}>
                                        <CellsDirective>
                                            <CellDirective index={13} value="Total Amount:" style={this.bold}></CellDirective>
                                            <CellDirective formula='=SUM(O4:O26)' style={this.cellStyle}></CellDirective>
                                            <CellDirective formula='=SUM(P4:P26)' style={this.cellStyle}></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                </RowsDirective>
                                <ColumnsDirective>
                                    <ColumnDirective width={80}></ColumnDirective>
                                    <ColumnDirective width={80}></ColumnDirective>
                                    <ColumnDirective width={100}></ColumnDirective>
                                    <ColumnDirective width={100}></ColumnDirective>
                                    <ColumnDirective width={100}></ColumnDirective>
                                    <ColumnDirective width={100}></ColumnDirective>
                                    <ColumnDirective width={100}></ColumnDirective>
                                    <ColumnDirective width={100}></ColumnDirective>
                                    <ColumnDirective width={100}></ColumnDirective>
                                    <ColumnDirective width={100}></ColumnDirective>
                                    <ColumnDirective width={100}></ColumnDirective>
                                    <ColumnDirective width={100}></ColumnDirective>
                                    <ColumnDirective width={80}></ColumnDirective>
                                    <ColumnDirective width={100}></ColumnDirective>
                                    <ColumnDirective width={100}></ColumnDirective>
                                    <ColumnDirective width={100}></ColumnDirective>
                                </ColumnsDirective>
                            </SheetDirective>
                        </SheetsDirective>
                    </SpreadsheetComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the <code>Spreadsheet</code> freeze pane feature by applying frozen rows and columns with the Gross Salary scenario as an example. In this sample, you can see the frozen rows/columns that are visible while scrolling the sheet content vertically/horizontally.
                    </p>
                </div>
                <div id="description">
                    <p>
                        Freeze Panes helps you to keep particular rows or columns visible when scrolling the sheet content in the spreadsheet.
                        You can specify the number of frozen rows and columns using <code>frozenRows</code> and <code>frozenColumns</code> properties inside the `Sheet` property
                    </p>
                    <p>
                        In this sample, the first 2 rows and columns are frozen using the `frozenRows` and `frozenColumns` properties.
                    </p>
                    <p>
                        More information about <code>freeze pane</code> can be found in this
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/spreadsheet/getting-started"> documentation</a> section.
                    </p>
                </div>
            </div>
        )
    }
}