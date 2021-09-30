import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SpreadsheetComponent, SheetDirective, RowsDirective, CellsDirective, CellDirective, CellStyleModel, RowDirective, SheetsDirective, ColumnsDirective, ColumnDirective, RangesDirective, RangeDirective } from '@syncfusion/ej2-react-spreadsheet';
import { SampleBase } from '../common/sample-base';
import { grossPay } from './data';
import './spreadsheet.css';

/**
 * Data Validation sample
 */

export class DataValidation extends SampleBase<{}, {}> {
    public spreadsheet: SpreadsheetComponent;
    public style1: CellStyleModel = { fontWeight: 'bold', textAlign: 'center', backgroundColor: '#B3FFB3' };
    public currencyFormat: string = '$#,##0.00';
    public onCreated(): void {
        this.spreadsheet.merge('A1:I2');
        this.spreadsheet.setBorder({ border: '1px solid #A6A6A6' }, "A1:I13");
        this.spreadsheet.cellFormat({ textAlign: 'center', verticalAlign: 'middle'}, 'A3:I13');
        this.spreadsheet.cellFormat({ backgroundColor: '#B3FFB3', fontWeight : "bold"}, 'A3:I3');
        this.spreadsheet.numberFormat('$#,##0.00', 'H4:I13');
        this.spreadsheet.wrap('H3:I3');
        //Add Data validation to range.
        this.spreadsheet.addDataValidation({ type: 'WholeNumber', operator: 'LessThan', value1: '9', ignoreBlank: false }, 'G4:G13');
        this.spreadsheet.addDataValidation({ type: 'TextLength', operator: 'GreaterThan', value1: '3', ignoreBlank: false }, 'B4:B13');
        this.spreadsheet.addDataValidation({ type: 'Time', operator: 'GreaterThan', value1: '8:00:00 AM', ignoreBlank: false  }, 'E4:E13');
        this.spreadsheet.addDataValidation({ type: 'Time', operator: 'LessThan', value1: '6:00:00 PM', ignoreBlank: false  }, 'F4:F13');
        this.spreadsheet.addDataValidation({ type: 'List', value1: 'Mon, Tue, Wed, Thu, Fri', ignoreBlank: false  }, 'D4:D13');
        this.spreadsheet.addDataValidation({ type: 'WholeNumber', operator: 'LessThan', value1: '=H5', ignoreBlank: false }, 'I4:I13');
        //Highlight Invalid Data.
        this.spreadsheet.addInvalidHighlight('G4:G13');
        this.spreadsheet.addInvalidHighlight('I4:I13');
    }
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section spreadsheet-control'>
                    <SpreadsheetComponent ref={(ssObj) => { this.spreadsheet = ssObj }} created={this.onCreated.bind(this)}>
                        <SheetsDirective>
                            <SheetDirective name='Gross Pay' selectedRange='D13'>
                                <RangesDirective>
                                        <RangeDirective dataSource={grossPay} startCell='A3' ></RangeDirective>
                                </RangesDirective>
                                <RowsDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective value='TimeSheet Calculation' style={{ fontSize: '20pt', fontWeight: 'bold', textAlign: 'center', backgroundColor: '#B3FFB3', verticalAlign: 'middle' }} ></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective index={13}>
                                        <CellsDirective>
                                            <CellDirective index={7} value='Total Gross' style={{ border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' }}></CellDirective>
                                            <CellDirective index={8} formula='=Sum(I4:I13)' format={this.currencyFormat} style={{ border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' }}></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                </RowsDirective>
                                <ColumnsDirective>
                                    <ColumnDirective width={88}></ColumnDirective>
                                    <ColumnDirective width={120}></ColumnDirective>
                                    <ColumnDirective width={106}></ColumnDirective>
                                    <ColumnDirective width={98}></ColumnDirective>
                                    <ColumnDirective width={110}></ColumnDirective>
                                    <ColumnDirective width={110}></ColumnDirective>
                                    <ColumnDirective width={110}></ColumnDirective>
                                    <ColumnDirective width={98}></ColumnDirective>
                                    <ColumnDirective width={130}></ColumnDirective>
                                </ColumnsDirective>
                            </SheetDirective>
                        </SheetsDirective>
                    </SpreadsheetComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample explains the Data Validation feature with the gross pay calculation as an example. It is used to restrict the data that the user enters into a cell. To clear the applied validation, click the <code>Data Validation</code> button in the Data tab and <code>Clear Validation</code> option. You can also highlight the invalid data by selecting <code>Highlight Invalid Data</code> option.
                    </p>
                </div>
                <div id="description">
                <ul>
                    <li>
                        This feature allows you to apply validation to a cell or range of cells based on the conditions required. You can enable or disable data validation by using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/spreadsheet#allowdatavalidation">
                            allowDataValidation</a> property.
                    </li>
                    <li>
                        In this sample, we have applied data validation for List, String, Number, Date and Time by using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/spreadsheet#adddatavalidation">
                            addDataValidation</a> method with <code>ValidationModel</code> as argument.
                    </li>
                    <li>
                        In the Employee Name column, we have used <code>TextLength</code> validation to provide proper name with more than 3 text length.
                        In time in and time out column, we have provided <code>Time</code> validation for working hours between 8.00 AM to 6.00 PM. In the weekdays column, we have used <code>List</code> validation for weekdays (Monday to Friday).
                    </li>
                    <li>
                        In the hours worked column, we have used <code>WholeNumber</code> validation to find out overtime calculation(i.e more than 8 hours). And also, we used the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/spreadsheet/#addinvalidhighlight">addInvalidHighlight</a> to highlight the overtime hours of the employee.
                    </li>
                    <li>
                        In the gross pay with overtime column, we have used <code>WholeNumber</code> validation.
                        In this validation, we have used the input value as the cell reference. It helps in changing the criteria dynamically.
                    </li>
                </ul>
                    <p>
                        More information about the Data Validation can be found in this 
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/spreadsheet/cell-range/#data-validation">
                            documentation</a> section.
                    </p>
                </div>
            </div>
        )
    }
}