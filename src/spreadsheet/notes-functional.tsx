import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SpreadsheetComponent, SheetDirective, RowsDirective, CellsDirective, CellDirective, CellStyleModel, RowDirective, SheetsDirective, ColumnsDirective, ColumnDirective, RangesDirective, RangeDirective } from '@syncfusion/ej2-react-spreadsheet';
import { updateSampleSection } from '../common/sample-base';
import { notesData } from './data';
import './spreadsheet.css';

function Notes() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])

    let spreadsheet: SpreadsheetComponent;
    const cellStyle: CellStyleModel = { fontWeight: 'bold', textAlign: 'center' };
    const currencyFormat: string = '$#,##0.00';
    function onCreated(): void {
        spreadsheet.numberFormat('$#,##0.00', 'F4:F12');
        spreadsheet.numberFormat('$###', 'E4:E12');
        spreadsheet.freezePanes(3, 0);
    }
    return (
        <div className='control-pane'>
            <div className='control-section spreadsheet-control'>
                <SpreadsheetComponent openUrl='https://services.syncfusion.com/react/production/api/spreadsheet/open' saveUrl='https://services.syncfusion.com/react/production/api/spreadsheet/save' ref={(ssObj) => { spreadsheet = ssObj }} created={onCreated.bind(this)}>
                    <SheetsDirective>
                        <SheetDirective name='Cart'>
                            <RangesDirective>
                                <RangeDirective dataSource={notesData} startCell='B3' ></RangeDirective>
                            </RangesDirective>
                            <RowsDirective>
                                <RowDirective>
                                    <CellsDirective>
                                        <CellDirective value='Shopping Cart' rowSpan={2} colSpan={6} style={{ fontSize: '20pt', fontWeight: 'bold', textAlign: 'center', backgroundColor: '#279377', verticalAlign: 'middle', color: '#ffffff' }} ></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective index={2}>
                                    <CellsDirective>
                                        <CellDirective value='Product ID' style={cellStyle}></CellDirective>
                                        <CellDirective style={cellStyle}></CellDirective>
                                        <CellDirective style={cellStyle}></CellDirective>
                                        <CellDirective style={cellStyle}></CellDirective>
                                        <CellDirective style={cellStyle}></CellDirective>
                                        <CellDirective style={cellStyle}></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective>
                                    <CellsDirective>
                                        <CellDirective value='101' style={{ textAlign: 'left' }}></CellDirective>
                                        <CellDirective index={1} notes='This product has been the most profitable this month.'></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective>
                                    <CellsDirective>
                                        <CellDirective value='102' style={{ textAlign: 'left' }}></CellDirective>
                                        <CellDirective index={1} notes='This product has had the lowest sales in terms of quantity this month.'></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective>
                                    <CellsDirective>
                                        <CellDirective value='103' style={{ textAlign: 'left' }}></CellDirective>
                                        <CellDirective index={1} notes='This product has been the least profitable this month.'></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective>
                                    <CellsDirective>
                                        <CellDirective value='104' style={{ textAlign: 'left' }}></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective>
                                    <CellsDirective>
                                        <CellDirective value='105' style={{ textAlign: 'left' }}></CellDirective>
                                        <CellDirective index={1} notes='This product has had the highest sales in terms of quantity this month.'></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective>
                                    <CellsDirective>
                                        <CellDirective value='106' style={{ textAlign: 'left' }}></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective>
                                    <CellsDirective>
                                        <CellDirective value='107' style={{ textAlign: 'left' }}></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective>
                                    <CellsDirective>
                                        <CellDirective value='108' style={{ textAlign: 'left' }}></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective>
                                    <CellsDirective>
                                        <CellDirective value='109' style={{ textAlign: 'left' }}></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective>
                                    <CellsDirective>
                                        <CellDirective index={4} value='Total Amount' style={{ border: '1px solid #A6A6A6', fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle' }}></CellDirective>
                                        <CellDirective formula='=Sum(F4:F12)' format={currencyFormat} style={{ border: '1px solid #A6A6A6', textAlign: 'right', verticalAlign: 'middle', fontWeight: 'bold' }}></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                            </RowsDirective>
                            <ColumnsDirective>
                                <ColumnDirective width={88}></ColumnDirective>
                                <ColumnDirective width={120}></ColumnDirective>
                                <ColumnDirective width={100}></ColumnDirective>
                                <ColumnDirective width={100}></ColumnDirective>
                                <ColumnDirective width={100}></ColumnDirective>
                                <ColumnDirective width={110}></ColumnDirective>
                            </ColumnsDirective>
                        </SheetDirective>
                    </SheetsDirective>
                </SpreadsheetComponent>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates the <b>Notes</b> feature using the shopping cart scenario as an example. When you hover your mouse over the red indicator in the right corner of the cell, any note attached to the cell will be displayed.
                </p>
            </div>
            <div id="description">
                <p>The <b>Notes</b> feature allows you to add comments while reviewing a document. You can enable or disable the notes option using the <code>enableNotes</code> property; by default, it's enabled. To insert a note into cells, use the
                    <b>"Add Note"</b> context menu option. Once added, notes can be edited or removed using the <b>"Edit Note"</b> and
                    <b>"Delete Note"</b> context menu options respectively.</p>
                <p>The following keyboard shortcuts apply to the <b>Notes</b> feature:</p>
                <ul>
                    <li>
                        <span style={{ display: 'inline-block', width: '130px' }}><kbd>Shift</kbd> + <kbd>F2</kbd></span>
                        <span>- Add a note to the current cell.</span>
                    </li>
                    <li><span style={{ display: 'inline-block', width: '130px' }}><kbd>Esc</kbd></span>
                        <span>- Save and close the note.</span></li>
                </ul>
            </div>
        </div>
    )
}
export default Notes;
