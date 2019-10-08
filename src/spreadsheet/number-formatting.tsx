import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SpreadsheetComponent, SheetsDirective, SheetDirective, ColumnsDirective, RangeSettingsDirective, RangeSettingDirective, RowsDirective, RowDirective, CellsDirective, CellDirective, CellStyleModel, ColumnDirective, getFormatFromType } from '@syncfusion/ej2-react-spreadsheet';
import { numberFormatData } from './data';
import { SampleBase } from '../common/sample-base';
import './spreadsheet.css';

export class NumberFormatting extends SampleBase<{}, {}> {
    public spreadsheet: SpreadsheetComponent;
    public bold: CellStyleModel = { fontWeight: 'bold' };

    public onDataBound(): void {
        if (this.spreadsheet.sheets[this.spreadsheet.activeSheetTab - 1].name === 'Restaurant Invoice' && !this.spreadsheet.isOpen) {
            this.spreadsheet.cellFormat({ fontWeight: 'bold' }, 'A1:E2');
            this.spreadsheet.cellFormat({ textAlign: 'center', fontWeight: 'bold' }, 'A3:E3');
            this.spreadsheet.cellFormat({ textAlign: 'center' }, 'A4:A14');
            this.spreadsheet.cellFormat({ textAlign: 'center' }, 'C4:C14');
            this.spreadsheet.cellFormat({ backgroundColor: '#F9FBE7' }, 'A4:E15');
            this.spreadsheet.cellFormat({ backgroundColor: '#1E88E5', color: '#F5F5F5' }, 'A1:E2');
            this.spreadsheet.cellFormat({ backgroundColor: '#BBDEFB' }, 'A3:E3');
            this.spreadsheet.cellFormat({ backgroundColor: '#B3E5FC' }, 'A15:E17');
            this.spreadsheet.numberFormat('$#,##0.00', 'D4:E14');
            this.spreadsheet.numberFormat('$#,##0.00', 'E15:E17');
        }
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section spreadsheet-control'>
                    <SpreadsheetComponent showRibbon={false} showFormulaBar={false} 
                        ref={(ssObj) => { this.spreadsheet = ssObj }} dataBound={this.onDataBound.bind(this)} >
                        <SheetsDirective>
                            <SheetDirective name='Restaurant Invoice' selectedRange='E17'>
                                <RangeSettingsDirective>
                                    <RangeSettingDirective dataSource={numberFormatData} startCell='A3'></RangeSettingDirective>
                                </RangeSettingsDirective>
                                <RowsDirective>
                                    <RowDirective height={30}>
                                        <CellsDirective>
                                            <CellDirective value='Customer Name'></CellDirective>
                                            <CellDirective value='Cristi Espinos'></CellDirective>
                                            <CellDirective index={3} value='Waiter Name'></CellDirective>
                                            <CellDirective value='Raye Whines'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective height={30}>
                                        <CellsDirective>
                                            <CellDirective value='Table No.'></CellDirective>
                                            <CellDirective value='8'></CellDirective>
                                            <CellDirective index={3} value='Date'></CellDirective>
                                            <CellDirective value='5/7/2019'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective index={14}>
                                        <CellsDirective>
                                            <CellDirective index={1} value='Subtotal:'></CellDirective>
                                            <CellDirective index={4} formula='=SUBTOTAL(9,E4:E14)' format='$#,##0.00'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} value='Discount (8%):'></CellDirective>
                                            <CellDirective index={4} formula='=PRODUCT(8,E15)/100' format='$#,##0.00'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} value='Total Amount:' style={this.bold}></CellDirective>
                                            <CellDirective index={4} formula='=SUM(E15-E16)' format={getFormatFromType('Accounting')} style={this.bold}></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                </RowsDirective>
                                <ColumnsDirective>
                                    <ColumnDirective width={120}></ColumnDirective>
                                    <ColumnDirective width={180}></ColumnDirective>
                                    <ColumnDirective width={100}></ColumnDirective>
                                    <ColumnDirective width={120}></ColumnDirective>
                                    <ColumnDirective width={120}></ColumnDirective>
                                </ColumnsDirective>
                            </SheetDirective>
                        </SheetsDirective>
                    </SpreadsheetComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates number formatting feature with a restaurant invoice.
            </p>
                </div>
                <div id="description">
                    <p>
                        In this demo, number formatting is applied to specific cells by using the <code>format</code> property,
                        and a range of cells by using the <code>numberFormat</code> method.
                    </p>
                    <p>
                        More information about number formatting can be found in this
                        <a target="_blank" href="https://ej2.syncfusion.com/documentation/spreadsheet/getting-started"> documentation</a> section.
                    </p>
                </div>
            </div>
        )
    }
}