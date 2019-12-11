import * as React from 'react';
import { SpreadsheetComponent, SheetsDirective, SheetDirective, ColumnsDirective, RangeSettingsDirective, RangeSettingDirective, RowsDirective, RowDirective, CellsDirective, CellDirective, ColumnDirective } from '@syncfusion/ej2-react-spreadsheet';
import { defaultData } from './data';
import { SampleBase } from '../common/sample-base';
import './spreadsheet.css';
export class Default extends SampleBase {
    constructor() {
        super(...arguments);
        this.boldRight = { fontWeight: 'bold', textAlign: 'right' };
        this.bold = { fontWeight: 'bold' };
    }
    onDataBound() {
        if (this.spreadsheet.sheets[this.spreadsheet.activeSheetTab - 1].name === 'Car Sales Report' && !this.spreadsheet.isOpen) {
            this.spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle' }, 'A1:F1');
            this.spreadsheet.numberFormat('$#,##0.00', 'F2:F31');
        }
    }
    render() {
        return (<div className='control-pane'>
                <div className='control-section spreadsheet-control'>
                    <SpreadsheetComponent openUrl='https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open' saveUrl='https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save' ref={(ssObj) => { this.spreadsheet = ssObj; }} dataBound={this.onDataBound.bind(this)}>
                        <SheetsDirective>
                            <SheetDirective name="Car Sales Report">
                                <RangeSettingsDirective>
                                    <RangeSettingDirective dataSource={defaultData}></RangeSettingDirective>
                                </RangeSettingsDirective>
                                <RowsDirective>
                                    <RowDirective index={30}>
                                        <CellsDirective>
                                            <CellDirective index={4} value="Total Amount:" style={this.boldRight}></CellDirective>
                                            <CellDirective formula="=SUM(F2:F30)" style={this.bold}></CellDirective>
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
                        The <code>Spreadsheet</code> component is used to organize and analyze data in a tabular format.
                        It has a built-in calculation library that supports most commonly used formulas. Excel workbook files can be
                        imported and exported by providing <code>openUrl</code> &
                        <code>saveUrl</code> property.
                    </p>
                    <p>
                        Data binding can be achieved by setting an array of JavaScript objects or an instance of Data Manager to the
                        <code>dataSource</code> property under the rangeSettings of sheet. The <code>cellFormat</code> and
                        <code>numberFormat</code>
                        methods are used to apply format to a range of cells in the <code>dataBound</code> event.
                    </p>
                    <p>
                        More information about the Spreadsheet component can be found in this
                        <a target="_blank" href="https://ej2.syncfusion.com/documentation/spreadsheet/getting-started"> documentation</a> section.
                    </p>
                </div>
            </div>);
    }
}
