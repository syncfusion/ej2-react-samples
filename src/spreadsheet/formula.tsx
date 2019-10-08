import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SpreadsheetComponent, SheetsDirective, SheetDirective, ColumnsDirective, RangeSettingsDirective, RangeSettingDirective, RowsDirective, RowDirective, CellsDirective, CellDirective, CellStyleModel, ColumnDirective } from '@syncfusion/ej2-react-spreadsheet';
import { formulaData } from './data';
import { SampleBase } from '../common/sample-base';
import './spreadsheet.css';

export class Formula extends SampleBase<{}, {}> {
    public spreadsheet: SpreadsheetComponent;

    public onDataBound(): void {
        if (this.spreadsheet.sheets[this.spreadsheet.activeSheetTab - 1].name === 'Stock Details' && !this.spreadsheet.isOpen) {
            this.spreadsheet.cellFormat({ fontWeight: 'bold', backgroundColor: '#4ECDC4', textAlign: 'center', fontSize: '14px' }, 'A1:F1');
            this.spreadsheet.cellFormat({ backgroundColor: '#F2F2F2' }, 'A2:F11');
            this.spreadsheet.cellFormat({ fontWeight: 'bold', backgroundColor: '#C6EFCE' }, 'A12:F15');
            this.spreadsheet.numberFormat('0.00', 'F2:F11');
        }
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section spreadsheet-control'>
                    <SpreadsheetComponent showRibbon={false}
                        ref={(ssObj) => { this.spreadsheet = ssObj }} dataBound={this.onDataBound.bind(this)} >
                        <SheetsDirective>
                            <SheetDirective name='Stock Details' selectedRange='F15'>
                                <RangeSettingsDirective>
                                    <RangeSettingDirective dataSource={formulaData}></RangeSettingDirective>
                                </RangeSettingsDirective>
                                <RowsDirective>
                                    <RowDirective height={40}></RowDirective>
                                    <RowDirective index={11}>
                                        <CellsDirective>
                                            <CellDirective index={3} value='Average profit:'></CellDirective>
                                            <CellDirective index={5} formula='=AVERAGE(F2:F11)' format='0.00'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective height={25}>
                                        <CellsDirective>
                                            <CellDirective index={3} value='Maximum stock value:'></CellDirective>
                                            <CellDirective index={5} formula='=MAX(D2:D11)' format='0.00'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective height={25}>
                                        <CellsDirective>
                                            <CellDirective index={3} value='Minimum stock value:'></CellDirective>
                                            <CellDirective index={5} formula='=MIN(E2:E11)'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective height={25}>
                                        <CellsDirective>
                                            <CellDirective index={3} value='Non-profitable days:'></CellDirective>
                                            <CellDirective index={5} formula='=COUNTIF(F2:F11,"<=0")'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                </RowsDirective>
                                <ColumnsDirective>
                                    <ColumnDirective width={100}></ColumnDirective>
                                    <ColumnDirective width={130}></ColumnDirective>
                                    <ColumnDirective width={140}></ColumnDirective>
                                    <ColumnDirective width={140}></ColumnDirective>
                                    <ColumnDirective width={130}></ColumnDirective>
                                    <ColumnDirective width={130}></ColumnDirective>
                                </ColumnsDirective>
                            </SheetDirective>
                        </SheetsDirective>
                    </SpreadsheetComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the analysis of a company's stock value for a certain period with formula feature.
                    </p>

                </div>
                <div id="description">
                    <p> The <code>Spreadsheet</code> component provides a built-in calculation library that supports most commonly used
                        formulas. In this demo, a formula is specified to a cell using the <code>formula</code> property.
                    </p>
                    <p>
                        More information about formula support can be found in this
                    <a target="_blank" href="https://ej2.syncfusion.com/documentation/spreadsheet/getting-started"> documentation</a> section.
                    </p>
                </div>
            </div>
        )
    }
}