import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SpreadsheetComponent, SheetsDirective, SheetDirective, ColumnsDirective, BeforeSelectEventArgs, CellStyleModel, RowsDirective, RowDirective, CellsDirective, RangesDirective, RangeDirective, CellDirective, getFormatFromType, ColumnDirective, CellRenderEventArgs, ScrollSettingsModel } from '@syncfusion/ej2-react-spreadsheet';
import { SampleBase } from '../common/sample-base';
import './spreadsheet.css';
import { TextBox } from '@syncfusion/ej2-inputs';
import { DatePicker } from '@syncfusion/ej2-calendars';
import { RadioButton } from '@syncfusion/ej2-buttons';
import { DropDownList, MultiSelect } from '@syncfusion/ej2-dropdowns';

/**
 * CellTemplate sample
 */

export class CellTemplate extends SampleBase<{}, {}> {
    public spreadsheet: SpreadsheetComponent;
    public scrollSettings: ScrollSettingsModel = { isFinite: true };
    public boldCenter: CellStyleModel = { fontWeight: 'bold', textAlign: 'center' , fontSize: '12pt', verticalAlign: 'middle',
    textDecoration: 'underline'
};

    public onCreated(): void {
        this.spreadsheet.cellFormat({ fontWeight: 'bold' }, 'B2:B9');
    }
    public beforeSelect(args: BeforeSelectEventArgs): void {
        args.cancel = true;
    }
    public beforeCellRender(args: CellRenderEventArgs): void {
        if (this.spreadsheet.activeSheetIndex === 0) {
            let target: HTMLInputElement = args.element.firstElementChild as HTMLInputElement;
            switch (args.address) {
                case 'B1':
                    (args.element as HTMLTableCellElement).colSpan = 2;
                    break;
                case 'C2':
                    new TextBox({ placeholder: 'Name' }, target);
                    break;
                case 'C3':
                    new DatePicker({ placeholder: 'DOB',  }, target);
                    break;
                case 'C4':
                    new RadioButton({ label: 'Male' }, args.element.firstElementChild.firstElementChild as HTMLInputElement);
                    new RadioButton({ label: 'Female' }, args.element.firstElementChild.lastElementChild as HTMLInputElement);
                    break;
                case 'C5':
                    let experience: string[] =  ['0 - 1 year', '1 - 3 years', '3 - 5 years', '5 - 10 years'];
                    new DropDownList({
                        placeholder: 'Experience',
                        dataSource: experience
                    }, target);
                    break;
                case 'C6':
                    let languages: string[] = ['JAVA', 'C#', 'SQL'];
                    new MultiSelect({
                        showClearButton: false,
                        placeholder: 'Areas of Interest',
                        dataSource: languages
                    }, target);
                    break;
                case 'C7':
                    new TextBox({ placeholder: 'Mobile Number' }, target);
                    break;
                case 'C8':
                    new TextBox({ placeholder: 'Email'}, target);
                    break;
                case 'C9':
                    new TextBox(null, target);
                    break;
            }
        }

    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section spreadsheet-control'>
                    <SpreadsheetComponent showRibbon={false} showFormulaBar= {false} allowOpen= {false} allowSave= {false}
                        ref={(ssObj) => { this.spreadsheet = ssObj }} created={this.onCreated.bind(this)} name= {'Candidates List'}
                        beforeCellRender={this.beforeCellRender.bind(this)} beforeSelect={this.beforeSelect.bind(this)} scrollSettings={this.scrollSettings} >
                        <SheetsDirective>
                            <SheetDirective name='Registration Form' rowCount= {40} colCount= {30} showGridLines= {false}>
                                <RowsDirective>
                                    <RowDirective height= {55}>
                                        <CellsDirective>
                                            <CellDirective index={1} value='Interview Registration Form' style={this.boldCenter}></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective height= {45}>
                                        <CellsDirective>
                                            <CellDirective index={1} value='Name:'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective height= {45}>
                                        <CellsDirective>
                                            <CellDirective index={1} value='Date of Birth:'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective height= {45}>
                                        <CellsDirective>
                                            <CellDirective index={1} value='Gender:'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective height= {45}>
                                        <CellsDirective>
                                            <CellDirective index={1} value='Year of Experience:'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective height= {45}>
                                        <CellsDirective>
                                            <CellDirective index={1} value='Areas of Interest:'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective height= {45}>
                                        <CellsDirective>
                                            <CellDirective index={1} value='Mobile Number:'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective height= {45}>
                                        <CellsDirective>
                                            <CellDirective index={1} value='Email:'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective height= {82}>
                                        <CellsDirective>
                                            <CellDirective index={1} value='Address:'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                </RowsDirective>
                                <ColumnsDirective>
                                    <ColumnDirective index={1} width={190}></ColumnDirective>
                                    <ColumnDirective width={350}></ColumnDirective>
                                </ColumnsDirective>
                                <RangesDirective>
                                    <RangeDirective template='<input />' address='C2:C3'></RangeDirective>
                                    <RangeDirective template= '<div><input type="radio" name="gender" value="male" /><input type="radio" name="gender" value="female"/></div>' address={'C4'}></RangeDirective>
                                    <RangeDirective template='<input />' address='C5:C8'></RangeDirective>
                                    <RangeDirective template='<textarea rows="3"/>' address={'C9'}></RangeDirective>
                                    <RangeDirective template='<button class="e-btn e-flat" style="float:right">Add</button>' address={'C11'}></RangeDirective>
                                </RangesDirective>
                            </SheetDirective>
                        </SheetsDirective>
                    </SpreadsheetComponent>
                </div>
                <div id="action-description">
                    <p>
                    This sample demonstrates cell template feature with interview registration form scenario using input components.
    </p>
                </div>
                <div id="description">
                    <p>
                    In this demo, cell template is applied to `C2:C9` and instantiated with input components like TextBox, DropDownList,
        RadioButton, MultiSelect, DatePicker etc.

    </p>
                    <p>
                    More information about cell template feature can be found in this
        <a target="_blank" href="https://ej2.syncfusion.com/documentation/spreadsheet/getting-started">
                            documentation</a> section.
    </p>
                </div>
            </div>
        )
    }
}