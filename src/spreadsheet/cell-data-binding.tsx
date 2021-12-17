import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SpreadsheetComponent, SheetDirective, RowsDirective, CellsDirective, CellDirective, CellStyleModel, RowDirective, SheetsDirective, ColumnsDirective, ColumnDirective, getFormatFromType } from '@syncfusion/ej2-react-spreadsheet';
import { SampleBase } from '../common/sample-base';
import './spreadsheet.css';

/**
 * Cell Data Binding sample
 */

export class CellDataBinding extends SampleBase<{}, {}> {
    public boldCenter: CellStyleModel = { fontWeight: 'bold', textAlign: 'center' };
    public boldRight: CellStyleModel = { fontWeight: 'bold', textAlign: 'right' };
    public bold: CellStyleModel = { fontWeight: 'bold' };
    public currencyFormat: string = getFormatFromType('Currency');
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section spreadsheet-control'>
                    <SpreadsheetComponent showFormulaBar={false} showRibbon={false}>
                        <SheetsDirective>
                            <SheetDirective name='Monthly Budget' selectedRange='D13'>
                                <RowsDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective value='Category' style={this.boldCenter} ></CellDirective>
                                            <CellDirective value='Planned cost' style={this.boldCenter} ></CellDirective>
                                            <CellDirective value='Actual cost' style={this.boldCenter} ></CellDirective>
                                            <CellDirective value='Difference' style={this.boldCenter} ></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective value='Food' ></CellDirective>
                                            <CellDirective value='$7000' ></CellDirective>
                                            <CellDirective value='$8120' ></CellDirective>
                                            <CellDirective formula='=B2-C2' format={this.currencyFormat} ></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective value='Loan' ></CellDirective>
                                            <CellDirective value='$1500' ></CellDirective>
                                            <CellDirective value='$1500' ></CellDirective>
                                            <CellDirective formula='=B3-C3' format={this.currencyFormat} ></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective value='Medical' ></CellDirective>
                                            <CellDirective value='$300' ></CellDirective>
                                            <CellDirective value='$0' ></CellDirective>
                                            <CellDirective formula='=B4-C4' format={this.currencyFormat} ></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective value='Clothing' ></CellDirective>
                                            <CellDirective value='$400' ></CellDirective>
                                            <CellDirective value='$140' ></CellDirective>
                                            <CellDirective formula='=B5-C5' format={this.currencyFormat} ></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective value='Education' ></CellDirective>
                                            <CellDirective value='$900' ></CellDirective>
                                            <CellDirective value='$750' ></CellDirective>
                                            <CellDirective formula='=B6-C6' format={this.currencyFormat} ></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective value='Insurance' ></CellDirective>
                                            <CellDirective value='$30' ></CellDirective>
                                            <CellDirective value='$30' ></CellDirective>
                                            <CellDirective formula='=B7-C7' format={this.currencyFormat} ></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective value='Utilities' ></CellDirective>
                                            <CellDirective value='$130' ></CellDirective>
                                            <CellDirective value='$160' ></CellDirective>
                                            <CellDirective formula='=B8-C8' format={this.currencyFormat} ></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective value='Enterainment' ></CellDirective>
                                            <CellDirective value='$500' ></CellDirective>
                                            <CellDirective value='$730' ></CellDirective>
                                            <CellDirective formula='=B9-C9' format={this.currencyFormat} ></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective value='Maintainance' ></CellDirective>
                                            <CellDirective value='$50' ></CellDirective>
                                            <CellDirective value='$70' ></CellDirective>
                                            <CellDirective formula='=B10-C10' format={this.currencyFormat} ></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective value='Transportation' ></CellDirective>
                                            <CellDirective value='$250' ></CellDirective>
                                            <CellDirective value='$400' ></CellDirective>
                                            <CellDirective formula='=B11-C11' format={this.currencyFormat} ></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective value='Gifts/Donations' ></CellDirective>
                                            <CellDirective value='$0' ></CellDirective>
                                            <CellDirective value='$100' ></CellDirective>
                                            <CellDirective formula='=B12-C12' format={this.currencyFormat} ></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={2} value='Total Difference:' style={this.boldRight}></CellDirective>
                                            <CellDirective formula='=D2+D12' format={this.currencyFormat} style={this.bold}></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                </RowsDirective>
                                <ColumnsDirective>
                                    <ColumnDirective width={110}></ColumnDirective>
                                    <ColumnDirective width={115}></ColumnDirective>
                                    <ColumnDirective width={110}></ColumnDirective>
                                    <ColumnDirective width={100}></ColumnDirective>
                                </ColumnsDirective>
                            </SheetDirective>
                        </SheetsDirective>
                    </SpreadsheetComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample illustrates a monthly budget for a home using planned versus actual costs with cell data binding
                        feature.
                    </p>
                </div>
                <div id="description">
                    <p>
                        The <code>Spreadsheet</code> component supports data binding for individual cells in a sheet. You can set value,
                        styles and format to a cell using following properties:
                        <ul>
                            <li><code>index</code> - Specify index for a cell.</li>
                            <li><code>value</code> - Specify cell value.</li>
                            <li><code>style</code> - Specify style for the cell.</li>
                            <li><code>format</code> - Apply number formatting for the cell.</li>
                        </ul>
                    </p>
                    <p>
                        More information about cell data binding feature can be found in this
        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/spreadsheet/data-binding/#cell-data-binding"> documentation</a> section.
                    </p>
                </div>
            </div>
        )
    }
}