import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SpreadsheetComponent, SheetsDirective, SheetDirective, ColumnsDirective, CellStyleModel, RowsDirective, RowDirective, CellsDirective, RangesDirective, RangeDirective, CellDirective, getFormatFromType, ColumnDirective, CellRenderEventArgs } from '@syncfusion/ej2-react-spreadsheet';
import { protectSheetData } from './data';
import { updateSampleSection } from '../common/sample-base';
import './spreadsheet.css';

/**
 * ProtectSheet sample
 */

function ProtectSheet() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let spreadsheet: SpreadsheetComponent;
    const boldCenter: CellStyleModel = { fontWeight: 'bold', textAlign: 'center' };

    function onCreated(): void {
        spreadsheet.cellFormat({ fontWeight: 'bold' }, 'EMI Schedule!A1:F1');
        spreadsheet.numberFormat('$#,##0.00', 'EMI Schedule!C2:F13');
    }
    function beforeCellRender(args: CellRenderEventArgs): void {
        if (spreadsheet.activeSheetIndex === 0 && args.address === 'B1') {
            (args.element as HTMLTableCellElement).colSpan = 2;
        }
    }

    return (
        <div className='control-pane'>
            <div className='control-section spreadsheet-control'>
                <SpreadsheetComponent
                    password='spreadsheet' openUrl='https://services.syncfusion.com/react/production/api/spreadsheet/open'
                    saveUrl='https://services.syncfusion.com/react/production/api/spreadsheet/save' ref={(ssObj) => { spreadsheet = ssObj }} created={onCreated.bind(this)}
                    beforeCellRender={beforeCellRender.bind(this)} >
                    <SheetsDirective>
                        <SheetDirective name='EMI Calculator' isProtected={true}>
                            <RowsDirective>
                                <RowDirective>
                                    <CellsDirective>
                                        <CellDirective index={1} value='Home Loan Calculator' style={boldCenter}></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective>
                                    <CellsDirective>
                                        <CellDirective index={1} value='Loan Amount:'></CellDirective>
                                        <CellDirective value='100000' format='$#,##0.00' ></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective>
                                    <CellsDirective>
                                        <CellDirective index={1} value='Interest Rate:'></CellDirective>
                                        <CellDirective value='0.08' format={getFormatFromType('Percentage')}></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective>
                                    <CellsDirective>
                                        <CellDirective index={1} value='Periods (terms in year):'></CellDirective>
                                        <CellDirective value='1'></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective>
                                    <CellsDirective>
                                        <CellDirective index={1} value='Start Date:'></CellDirective>
                                        <CellDirective value='03-03-2020'></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective>
                                    <CellsDirective>
                                        <CellDirective index={1} value='Loan EMI:'></CellDirective>
                                        <CellDirective value='8698.84' format='$#,##0.00'></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective>
                                    <CellsDirective>
                                        <CellDirective index={1} value='Number of Payments:'></CellDirective>
                                        <CellDirective value='12'></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective>
                                    <CellsDirective>
                                        <CellDirective index={1} value='Total Repayment Amount:'></CellDirective>
                                        <CellDirective value='104386.11' format='$#,##0.00'></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective>
                                    <CellsDirective>
                                        <CellDirective index={1} value='Total Interest Amount:'></CellDirective>
                                        <CellDirective value='4386.11' format='$#,##0.00'></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                            </RowsDirective>
                            <ColumnsDirective>
                                <ColumnDirective index={1} width={190}></ColumnDirective>
                                <ColumnDirective width={100}></ColumnDirective>
                            </ColumnsDirective>
                        </SheetDirective>
                        <SheetDirective name='EMI Schedule' isProtected={true}>
                            <RangesDirective>
                                <RangeDirective dataSource={protectSheetData} showFieldAsHeader={true}></RangeDirective>
                            </RangesDirective>
                            <ColumnsDirective>
                                <ColumnDirective index={1} width={110}></ColumnDirective>
                                <ColumnDirective width={85}></ColumnDirective>
                                <ColumnDirective width={85}></ColumnDirective>
                                <ColumnDirective width={80}></ColumnDirective>
                                <ColumnDirective width={90}></ColumnDirective>
                            </ColumnsDirective>
                        </SheetDirective>
                    </SheetsDirective>
                </SpreadsheetComponent>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates protect sheet and protect workbook with EMI calculation scenario as an example. To unprotect the sheet, click the unprotect sheet button in the Data tab. Meanwhile, to unprotect the workbook, click the unprotect workbook button in the data tab and provide the password as <code>spreadsheet</code> in the dialog box.
                </p>
            </div>
            <div id="description">
                <p>
                    Protect sheet helps you to prevent the users from modifying the data in the spreadsheet. Protect workbook helps you to protect the workbook with a password. In this demo, the `EMI Schedule` sheet is locked using <code>isProtected</code> property inside the `Sheet` property and protect the workbook with a password using <code>password</code> property.
                </p>
                <p>
                    More information about protect sheet and lock cell feature can be found in this
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/spreadsheet/protect-sheet/">
                        documentation</a> section.
                </p>
            </div>
        </div>
    )
}
export default ProtectSheet;