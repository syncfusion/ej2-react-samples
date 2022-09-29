import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SpreadsheetComponent, SheetsDirective, SheetDirective, ColumnsDirective, CellStyleModel, RowsDirective, RowDirective, CellsDirective, RangesDirective, RangeDirective, CellDirective, ColumnDirective, ScrollSettingsModel } from '@syncfusion/ej2-react-spreadsheet';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { RadioButtonComponent, ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { SelectionSettingsModel } from '@syncfusion/ej2-spreadsheet';
import { updateSampleSection } from '../common/sample-base';
import './spreadsheet.css';

/**
 * CellTemplate sample
 */

function CellTemplate() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let spreadsheet: SpreadsheetComponent;
    const scrollSettings: ScrollSettingsModel = { isFinite: true };
    const selectionSettings: SelectionSettingsModel = { mode: 'None' };
    const boldCenter: CellStyleModel = {
        fontWeight: 'bold', textAlign: 'center', fontSize: '12pt', verticalAlign: 'middle',
        textDecoration: 'underline'
    };

    function nameTextbox(): JSX.Element {
        return (
            <TextBoxComponent placeholder="Name"></TextBoxComponent>
        );
    }

    function dobTextbox(): JSX.Element {
        return (
            <TextBoxComponent placeholder="DOB"></TextBoxComponent>
        );
    }

    function genderRadioButton(): JSX.Element {
        return (
            <div>
                <RadioButtonComponent name="gender" value="male" label="Male"></RadioButtonComponent>
                <RadioButtonComponent name="gender" value="female" label="Female"></RadioButtonComponent>
            </div>
        );
    }

    function dropDownList(): JSX.Element {
        let experience: string[] = ['0 - 1 year', '1 - 3 years', '3 - 5 years', '5 - 10 years'];
        return (
            <DropDownListComponent placeholder="Experience" dataSource={experience}></DropDownListComponent>
        );
    }

    function multiSelect(): JSX.Element {
        let languages: string[] = ['JAVA', 'C#', 'SQL'];
        return (
            <MultiSelectComponent placeholder="Areas of Interest" showClearButton={false} dataSource={languages}></MultiSelectComponent>
        );
    }

    function mobileNoTextbox(): JSX.Element {
        return (
            <TextBoxComponent placeholder="Mobile Number"></TextBoxComponent>
        );
    }

    function emailTextbox(): JSX.Element {
        return (
            <TextBoxComponent placeholder="Email"></TextBoxComponent>
        );
    }

    function textArea(): JSX.Element {
        return (
            <TextBoxComponent multiline={true}></TextBoxComponent>
        );
    }

    function button(): JSX.Element {
        return (
            <ButtonComponent content="Add" style={{ float: "right" }} cssClass="e-flat"></ButtonComponent>
        );
    }

    function onCreated(): void {
        spreadsheet.cellFormat({ fontWeight: 'bold' }, 'B2:B9');
        // Merges B1 and C1 cells
        spreadsheet.merge('B1:C1');
    }

    return (
        <div className='control-pane'>
            <div className='control-section spreadsheet-control'>
                <SpreadsheetComponent showRibbon={false} showFormulaBar={false} allowOpen={false} allowSave={false}
                    ref={(ssObj) => { spreadsheet = ssObj }} created={onCreated.bind(this)} name={'Candidates List'}
                    scrollSettings={scrollSettings} allowEditing={false} selectionSettings={selectionSettings}>
                    <SheetsDirective>
                        <SheetDirective name='Registration Form' rowCount={40} colCount={30} showGridLines={false}>
                            <RowsDirective>
                                <RowDirective height={55}>
                                    <CellsDirective>
                                        <CellDirective index={1} value='Interview Registration Form' style={boldCenter}></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective height={45}>
                                    <CellsDirective>
                                        <CellDirective index={1} value='Name'></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective height={45}>
                                    <CellsDirective>
                                        <CellDirective index={1} value='Date of Birth:'></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective height={45}>
                                    <CellsDirective>
                                        <CellDirective index={1} value='Gender:'></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective height={45}>
                                    <CellsDirective>
                                        <CellDirective index={1} value='Year of Experience:'></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective height={45}>
                                    <CellsDirective>
                                        <CellDirective index={1} value='Areas of Interest:'></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective height={45}>
                                    <CellsDirective>
                                        <CellDirective index={1} value='Mobile Number:'></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective height={45}>
                                    <CellsDirective>
                                        <CellDirective index={1} value='Email:'></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective height={82}>
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
                                <RangeDirective template={nameTextbox} address='C2'></RangeDirective>
                                <RangeDirective template={dobTextbox} address='C3'></RangeDirective>
                                <RangeDirective template={genderRadioButton} address='C4'></RangeDirective>
                                <RangeDirective template={dropDownList} address='C5'></RangeDirective>
                                <RangeDirective template={multiSelect} address='C6'></RangeDirective>
                                <RangeDirective template={mobileNoTextbox} address='C7'></RangeDirective>
                                <RangeDirective template={emailTextbox} address='C8'></RangeDirective>
                                <RangeDirective template={textArea} address='C9'></RangeDirective>
                                <RangeDirective template={button} address='C11'></RangeDirective>
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
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/spreadsheet/template">
                        documentation</a> section.
                </p>
            </div>
        </div>
    )
}
export default CellTemplate;