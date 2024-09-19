import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SheetsDirective, SheetDirective, ColumnsDirective, RangesDirective, RangeDirective } from '@syncfusion/ej2-react-spreadsheet';
import { RowsDirective, RowDirective, CellsDirective, CellDirective, ColumnDirective } from '@syncfusion/ej2-react-spreadsheet';
import { SpreadsheetComponent, CellStyleModel } from '@syncfusion/ej2-react-spreadsheet';
import { defaultData } from './data';
import { updateSampleSection } from '../common/sample-base';
import './spreadsheet.css';

/**
 * Default Spreadsheet sample
 */

function Default() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let spreadsheet: SpreadsheetComponent;
    const boldRight: CellStyleModel = { fontWeight: 'bold', textAlign: 'right' };
    const bold: CellStyleModel = { fontWeight: 'bold' };

    const onCreated = (): void => {
        // Apply styles to the specified range in the active sheet.
        spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle' }, 'A1:F1');
        // Apply format to the specified range in the active sheet.
        spreadsheet.numberFormat('$#,##0.00', 'F2:F31');
        // The default format code for the date format is 'm/d/yyyy'.
        spreadsheet.numberFormat('m/d/yyyy', 'E2:E30');
    };

    return (
        <div className='control-pane'>
            <div className='control-section spreadsheet-control'>
                <SpreadsheetComponent openUrl='https://services.syncfusion.com/react/production/api/spreadsheet/open'
                    saveUrl='https://services.syncfusion.com/react/production/api/spreadsheet/save'
                    ref={(ssObj) => { spreadsheet = ssObj }} created={onCreated.bind(this)} >
                    <SheetsDirective>
                        <SheetDirective name="Car Sales Report">
                            <RangesDirective>
                                <RangeDirective dataSource={defaultData}></RangeDirective>
                            </RangesDirective>
                            <RowsDirective>
                                <RowDirective index={30}>
                                    <CellsDirective>
                                        <CellDirective index={4} value="Total Amount:" style={boldRight}></CellDirective>
                                        <CellDirective formula="=SUM(F2:F30)" style={bold}></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                            </RowsDirective>
                            <ColumnsDirective>
                                <ColumnDirective width={180}></ColumnDirective>
                                <ColumnDirective width={130}></ColumnDirective>
                                <ColumnDirective width={130}></ColumnDirective>
                                <ColumnDirective width={180}></ColumnDirective>
                                <ColumnDirective width={130}></ColumnDirective>
                                <ColumnDirective width={120}></ColumnDirective>
                            </ColumnsDirective>
                        </SheetDirective>
                    </SheetsDirective>
                </SpreadsheetComponent>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates the <code>Spreadsheet</code> component and its features such as editing, formulas,
                    formatting, importing, and exporting.
                </p>
            </div>
            <div id="description">
                <p>
                    The <code>Spreadsheet</code> component is used to organize and analyze data in tabular format.
                    It has a built-in calculation library that supports most commonly used formulas. Excel workbook files can be
                    imported and exported by providing <code>openUrl</code> &
                    <code>saveUrl</code> property.
                </p>
                <p>
                    Data binding can be achieved by setting an array of JavaScript objects or an instance of Data Manager to the
                    <code>dataSource</code> property under the <code>ranges</code> of sheet. The <code>cellFormat</code> and
                    <code>numberFormat</code>
                    methods are used to apply format to a range of cells in the <code>created</code> event.
                </p>
                <p>
                    More information about the Spreadsheet component can be found in this
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/spreadsheet/getting-started"> documentation</a> section.
                </p>
            </div>
        </div>
    )
}
export default Default;