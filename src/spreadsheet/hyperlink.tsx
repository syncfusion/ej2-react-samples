import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SpreadsheetComponent, SheetDirective, RowsDirective, CellsDirective, CellDirective, CellStyleModel, RowDirective, SheetsDirective, ColumnsDirective, ColumnDirective, RangesDirective, RangeDirective } from '@syncfusion/ej2-react-spreadsheet';
import { SampleBase } from '../common/sample-base';
import { hyperlinkCart, hyperlinkStock } from './data';
import './spreadsheet.css';

/**
 * Hyperlink sample
 */

export class Hyperlink extends SampleBase<{}, {}> {
    public spreadsheet: SpreadsheetComponent;
    public style1: CellStyleModel = { fontWeight: 'bold', textAlign: 'center', backgroundColor: '#279377', color: '#ffffff' };
    public currencyFormat: string = '$#,##0.00';
    public onCreated(): void {
        this.spreadsheet.merge('Cart!A1:F2');
        this.spreadsheet.numberFormat('$#,##0.00', 'Cart!E4:F12');
        this.spreadsheet.setBorder({ border: '1px solid #A6A6A6' }, 'Cart!A1:F12');
        this.spreadsheet.cellFormat({ textAlign: 'center', verticalAlign: 'middle' }, 'A1:F12');
        this.spreadsheet.cellFormat({
                    fontWeight: 'bold', textAlign: 'center', backgroundColor: '#279377',
                    color: '#ffffff'
                }, 'Cart!A3:F3');
        this.spreadsheet.cellFormat({
                    fontWeight: 'bold', textAlign: 'center', backgroundColor: '#279377',
                    color: '#ffffff'
                }, 'Stock!A1:E1');
        this.spreadsheet.wrap('Stock!B1:D1');
        this.spreadsheet.setBorder({ border: '1px solid #A6A6A6' }, 'Stock!A1:E10');
        this.spreadsheet.cellFormat({ textAlign: 'center', verticalAlign: 'middle' }, 'Stock!A1:E11');
    }
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section spreadsheet-control'>
                    <SpreadsheetComponent ref={(ssObj) => { this.spreadsheet = ssObj }} created={this.onCreated.bind(this)}>
                        <SheetsDirective>
                            <SheetDirective name='Cart' selectedRange='D3'>
                                <RangesDirective>
                                    <RangeDirective dataSource={hyperlinkCart} startCell='B3' ></RangeDirective>
                                </RangesDirective>
                                <RowsDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective value='Shopping Cart' style={{ fontSize: '20pt', fontWeight: 'bold', textAlign: 'center', backgroundColor: '#279377', verticalAlign: 'middle', color: '#ffffff' }} ></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective index={2}>
                                        <CellsDirective>
                                            <CellDirective value='Product ID' style={this.style1}></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective value='AG940Z' hyperlink='Stock!A2:D2'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective value='BJ120K' hyperlink='Stock!A3:D3'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective value='BC120M' hyperlink='Stock!A4:D4'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective value='BS121L' hyperlink='Stock!A5:D5'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective value='BU121K' hyperlink='Stock!A6:D6'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective value='BD121M' hyperlink='Stock!A7:D7'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective value='AT992X' hyperlink='Stock!A8:D8'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective value='AP992Z' hyperlink='Stock!A9:D9'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective value='AW920X' hyperlink='Stock!A10:D10'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                        <CellDirective index= {4} value='Total Amount' style={{ border: '1px solid #A6A6A6', fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle'}}></CellDirective>
                                            <CellDirective formula='=Sum(F4:F12)' format={this.currencyFormat} style={{border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold'}}></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                </RowsDirective>
                                <ColumnsDirective>
                                    <ColumnDirective width={88}></ColumnDirective>
                                    <ColumnDirective width={120}></ColumnDirective>
                                    <ColumnDirective width={100}></ColumnDirective>
                                    <ColumnDirective width={100}></ColumnDirective>
                                    <ColumnDirective width={110}></ColumnDirective>
                                    <ColumnDirective width={110}></ColumnDirective>
                                </ColumnsDirective>
                            </SheetDirective>
                            <SheetDirective name='Stock' selectedRange='D3'>
                                <RangesDirective>
                                    <RangeDirective dataSource={hyperlinkStock}></RangeDirective>
                                </RangesDirective>
                                <RowsDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={4} value='Place Order' style={this.style1}></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={4} value= 'Amazon' hyperlink='https://www.amazon.com/'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={4} value= 'Amazon' hyperlink='https://www.amazon.com/'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={4} value= 'EBay' hyperlink='https://www.ebay.com/'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={4} value= 'Amazon' hyperlink='https://www.amazon.com/'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={4} value= 'EBay' hyperlink='https://www.ebay.com/'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={4} value= 'EBay' hyperlink='https://www.ebay.com/'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={4} value= 'Amazon' hyperlink='https://www.amazon.com/'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={4} value= 'EBay' hyperlink='https://www.ebay.com/'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={4} value= 'Amazon' hyperlink='https://www.amazon.com/'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                </RowsDirective>
                                <ColumnsDirective>
                                    <ColumnDirective width={88}></ColumnDirective>
                                    <ColumnDirective width={88}></ColumnDirective>
                                    <ColumnDirective width={88}></ColumnDirective>
                                    <ColumnDirective width={88}></ColumnDirective>
                                    <ColumnDirective width={88}></ColumnDirective>
                                </ColumnsDirective>
                            </SheetDirective>
                        </SheetsDirective>
                    </SpreadsheetComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the Hyperlink feature with the shopping cart scenario as an example. To add hyperlink, click the link button in the insert tab or click hyperlink option using the cell context menu.
                    </p>
                </div>
                <div id="description">
                <ul>
                    <li>
                        This feature allows you to add reference as cell address or any web url to a cell and also navigate to a reference by clicking or tapping. You can enable or disable hyperlink by using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/spreadsheet#allowhyperlink">
                            allowHyperlink</a> property. 
                    </li>
                    <li>  
                        In this sample, we have applied hyperlink to the cells using the <code>hyperlink</code> property in cell. We can also add hyperlink using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/spreadsheet#addhyperlink">
                            addHyperlink</a> method. In shopping cart scenario, we have added cell reference as hyperlink in the product id column. In the stock sheet, we have added web url as hyperlink in the place order column.
                    </li>
                </ul>
                    <p>
                        More information about the Hyperlink can be found in this 
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/spreadsheet/link">
                            documentation</a> section.
                    </p>
                </div>
            </div>
        )
    }
}