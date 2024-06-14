import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SpreadsheetComponent, SheetDirective, RowsDirective, CellsDirective, PrintType, CellDirective, ImageModel, ChartModel, CellStyleModel, RowDirective, SheetsDirective, ColumnsDirective, ColumnDirective, RangesDirective, RangeDirective } from '@syncfusion/ej2-react-spreadsheet';
import { SampleBase } from '../common/sample-base';
import { CheckBoxComponent, ChangeEventArgs, ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { printData, yearlyReport } from './data';
import './spreadsheet.css';

export class Print extends SampleBase<{}, {}> {
    public spreadsheet: SpreadsheetComponent;
    public cellStyle: CellStyleModel = { fontSize: '13pt', fontWeight: 'bold', textAlign: 'center', backgroundColor: '#919aff', verticalAlign: 'middle', color: '#ffffff' };
    public currencyFormat: string = '$#,##0.00';
    public chart: ChartModel[] = [{ type: 'Column', range: 'C2:D58' }];
    private dropDownListInstance: DropDownListComponent;
    private printTypeDataSource: { [key: string]: Object }[] = [
        { text: 'Active Sheet', value: 'ActiveSheet' },
        { text: 'Workbook', value: 'Workbook' },
    ];
    public allowGridLines: boolean = false;
    public allowRowColumnHeader: boolean = false;
    public printType: PrintType = "ActiveSheet";
    private printTypeChange() {
        this.printType = this.dropDownListInstance.value as PrintType;
    }

    private enableRowColumnHeader(args: ChangeEventArgs) {
        this.allowRowColumnHeader = args.checked;
    }

    private enableGridLines(args: ChangeEventArgs) {
        this.allowGridLines = args.checked;
    }

    public onClick(e: Event): void {
        this.spreadsheet.print({ type: this.printType, allowGridLines: this.allowGridLines, allowRowColumnHeader: this.allowRowColumnHeader });
    }

    public onCreated(): void {
        this.spreadsheet.numberFormat('$#,##0.00', 'Car Sales!F3:F59');
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='col-lg-8 control-section spreadsheet-control'>
                    <SpreadsheetComponent openUrl='https://services.syncfusion.com/react/production/api/spreadsheet/open' saveUrl='https://services.syncfusion.com/react/production/api/spreadsheet/save' ref={(ssObj) => { this.spreadsheet = ssObj }} created={this.onCreated.bind(this)}>
                        <SheetsDirective>
                            <SheetDirective name='Car Sales'>
                                <RangesDirective>
                                    <RangeDirective dataSource={printData} startCell='A2' ></RangeDirective>
                                </RangesDirective>
                                <RowsDirective>
                                    <RowDirective height={51}>
                                        <CellsDirective>
                                            <CellDirective></CellDirective>
                                            <CellDirective colSpan={5} value='          Ivaa Premium Cars' style={{ fontSize: '30pt', fontWeight: 'bold', textAlign: 'center' }} ></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective height={45}>
                                        <CellsDirective>
                                            <CellDirective style={this.cellStyle}></CellDirective>
                                            <CellDirective style={this.cellStyle}></CellDirective>
                                            <CellDirective style={this.cellStyle}></CellDirective>
                                            <CellDirective wrap={true} style={this.cellStyle}></CellDirective>
                                            <CellDirective wrap={true} style={this.cellStyle}></CellDirective>
                                            <CellDirective style={this.cellStyle}></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='sarah.johnson@example.com'></CellDirective>
                                            <CellDirective index={7} chart={this.chart}></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='michael.smith@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='emily.davis@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='john.anderson@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='jessica.martinez@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='daniel.thompson@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective><RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='samantha.harris@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective><RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='christopher.wilson@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective><RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='ashley.brown@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective><RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='matthew.taylor@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective><RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='olivia.garcia@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective><RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='david.hernandez@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective><RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='emma.moore@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='andrew.lewis@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='elizabeth.clark@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='james.walker@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='ava.rodriguez@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='ryan.white@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective><RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='madison.lee@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective><RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='nicholas.martin@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective><RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='sophia.hall@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective><RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='joshua.young@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective><RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='isabella.king@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective><RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='joseph.allen@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective><RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='charlotte.scott@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='william.green@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='amelia.adams@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='ethan.carter@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='mia.turner@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='alexander.baker@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective><RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='chloe.hill@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective><RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='benjamin.nelson@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective><RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='grace.mitchell@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective><RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='jacob.perez@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective><RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='avery.roberts@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective><RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='ethan.thomas@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective><RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='lily.phillips@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='samuel.davis@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='zoey.campbell@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='daniel.cooper@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='madeline.collins@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='nathan.edwards@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='evelyn.stewart@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='alexander.rivera@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='sophia.henderson@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='isaac.morris@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='claire.rogers@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='luke.flores@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='aubrey.long@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='julian.coleman@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='leah.reed@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='gabriel.bell@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='natalie.ward@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='lucas.brooks@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='hailey.mitchell@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective index={1} hyperlink='jackson.ward@example.com'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective index={58} height={25}>
                                        <CellsDirective>
                                            <CellDirective index={4} value='Total Amount' style={{ border: '1px solid #A6A6A6', fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle' }}></CellDirective>
                                            <CellDirective formula='=Sum(F3:F56)' format={this.currencyFormat} style={{ border: '1px solid #A6A6A6', textAlign: 'right', verticalAlign: 'middle', fontWeight: 'bold' }}></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                </RowsDirective>
                                <ColumnsDirective>
                                    <ColumnDirective width={125}></ColumnDirective>
                                    <ColumnDirective width={205}></ColumnDirective>
                                    <ColumnDirective width={115}></ColumnDirective>
                                    <ColumnDirective width={50}></ColumnDirective>
                                    <ColumnDirective width={90}></ColumnDirective>
                                    <ColumnDirective width={80}></ColumnDirective>
                                    <ColumnDirective width={20}></ColumnDirective>
                                </ColumnsDirective>
                            </SheetDirective>
                            <SheetDirective name='Yearly Report'>
                                <RangesDirective>
                                    <RangeDirective dataSource={yearlyReport} startCell='A2'></RangeDirective>
                                </RangesDirective>
                                <RowsDirective>
                                    <RowDirective height={51}>
                                        <CellsDirective>
                                            <CellDirective></CellDirective>
                                            <CellDirective colSpan={6} value='       Ivaa Premium Cars' style={{ fontSize: '30pt', fontWeight: 'bold', textAlign: 'left' }} ></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective height={23}>
                                        <CellsDirective>
                                            <CellDirective style={this.cellStyle}></CellDirective>
                                            <CellDirective style={this.cellStyle}></CellDirective>
                                            <CellDirective style={this.cellStyle}></CellDirective>
                                            <CellDirective style={this.cellStyle}></CellDirective>
                                            <CellDirective style={this.cellStyle}></CellDirective>
                                            <CellDirective style={this.cellStyle}></CellDirective>
                                            <CellDirective style={this.cellStyle}></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                    <RowDirective index={31} height={25}>
                                        <CellsDirective>
                                            <CellDirective index={0} value='Total cars sold' style={{ border: '1px solid #A6A6A6', fontWeight: 'bold', textAlign: 'left', verticalAlign: 'middle' }}></CellDirective>
                                            <CellDirective formula='=Sum(B3:B31)' style={{ border: '1px solid #A6A6A6', fontWeight: 'bold', textAlign: 'right', verticalAlign: 'middle' }}></CellDirective>
                                            <CellDirective formula='=Sum(C3:C31)' style={{ border: '1px solid #A6A6A6', fontWeight: 'bold', textAlign: 'right', verticalAlign: 'middle' }}></CellDirective>
                                            <CellDirective formula='=Sum(D3:D31)' style={{ border: '1px solid #A6A6A6', fontWeight: 'bold', textAlign: 'right', verticalAlign: 'middle' }}></CellDirective>
                                            <CellDirective formula='=Sum(E3:E31)' style={{ border: '1px solid #A6A6A6', fontWeight: 'bold', textAlign: 'right', verticalAlign: 'middle' }}></CellDirective>
                                            <CellDirective formula='=Sum(F3:F31)' style={{ border: '1px solid #A6A6A6', fontWeight: 'bold', textAlign: 'right', verticalAlign: 'middle' }}></CellDirective>
                                            <CellDirective formula='=Sum(G3:G31)' style={{ border: '1px solid #A6A6A6', fontWeight: 'bold', textAlign: 'right', verticalAlign: 'middle' }}></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                </RowsDirective>
                                <ColumnsDirective>
                                    <ColumnDirective width={120}></ColumnDirective>
                                    <ColumnDirective width={80}></ColumnDirective>
                                    <ColumnDirective width={80}></ColumnDirective>
                                    <ColumnDirective width={80}></ColumnDirective>
                                    <ColumnDirective width={80}></ColumnDirective>
                                    <ColumnDirective width={80}></ColumnDirective>
                                    <ColumnDirective width={80}></ColumnDirective>
                                    <ColumnDirective width={80}></ColumnDirective>
                                </ColumnsDirective>
                            </SheetDirective>
                        </SheetsDirective>
                    </SpreadsheetComponent>
                </div>
                <div className='col-lg-4 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' role='none' title='Properties' className='property-panel-table' style={{ width: '100%', marginBottom: '20px' }}>
                            <tbody>
                                <tr style={{ height: "60px" }}>
                                    <td>
                                        <div style={{ paddingLeft: '0px' }}>Print type</div>
                                    </td>
                                    <td>
                                        <div style={{ marginLeft: '0px' }}>
                                            <DropDownListComponent id="printingOption" width="100%" index={0} change={this.printTypeChange.bind(this)} ref={d => this.dropDownListInstance = d} dataSource={this.printTypeDataSource} fields={{ text: 'text', value: 'value' }} />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: "55px" }}>
                                    <td>
                                        <div className="property-text" style={{ padding: "0px" }}>Enable row and column headers</div>
                                    </td>
                                    <td>
                                        <div className="col" style={{ marginLeft: '0px', paddingLeft: '0px', marginTop: '-19px' }}>
                                            <CheckBoxComponent id="header" change={this.enableRowColumnHeader.bind(this)} style={{ paddingLeft: '0px' }} />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: "55px" }}>
                                    <td>
                                        <div className="property-text" style={{ padding: "0px" }}>Enable gridlines</div>
                                    </td>
                                    <td>
                                        <div className="col" style={{ marginLeft: '0px', paddingLeft: '0px', marginTop: '-19px' }}>
                                            <CheckBoxComponent id="gridline" change={this.enableGridLines.bind(this)} style={{ paddingLeft: '0px' }} />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '55px' }}>
                                    <td colSpan={2} style={{ width: '100%' }}>
                                        <div id="btn-control" style={{ textAlign: 'center' }}>
                                            <ButtonComponent onClick={this.onClick.bind(this)} style={{ width: '80px' }} isPrimary={true}>Print</ButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the print functionality of the Spreadsheet within a car sales scenario as an example.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, the spreadsheet's <b>"File"</b> menu features a <b>"Print"</b> option, allowing you to print the current worksheet without gridlines as well as row and column headers, which serves as the default print setting.
                        You can also invoke the print option using the <kbd>Ctrl</kbd> + <kbd>P</kbd> keyboard shortcut. Any texts, charts, images, and formatted content incorporated into the document will be previewed and then printed.
                    </p>
                    <p>
                        Furthermore, there are built-in customization options available. If you need to print either the current worksheet or the entire workbook, you can select the appropriate option from the <b>"Print type"</b> dropdown list in the property panel.
                        To include row and column headers in the printed output, you can check the <b>"Enable row and column headers"</b> checkbox. Similarly, you can include gridlines in the printed output by checking the <b>"Enable gridlines"</b> checkbox.
                        Upon selecting the desired options in the property panel and clicking the <b>"Print"</b> button, the <code>print</code> method of the spreadsheet is invoked, facilitating customized printing.
                    </p>
                </div>
            </div>
        )
    }
}
