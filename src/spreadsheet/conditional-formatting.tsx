import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SpreadsheetComponent, SheetsDirective, SheetDirective, ColumnsDirective } from '@syncfusion/ej2-react-spreadsheet';
import { ColumnDirective, RowDirective, RowsDirective, CellsDirective, CellDirective } from '@syncfusion/ej2-react-spreadsheet';
import { ConditionalFormatsDirective, ConditionalFormatDirective, RangeDirective } from '@syncfusion/ej2-react-spreadsheet';
import { RangesDirective } from '@syncfusion/ej2-react-spreadsheet';
import { conditionalFormatting } from './data';
import { SampleBase } from '../common/sample-base';
import './spreadsheet.css';

/**
 * ConditionalFormatting sample
 */

export class ConditionalFormatting extends SampleBase<{}, {}> {
    public spreadsheet: SpreadsheetComponent;
    public onCreated(): void {
        this.spreadsheet.merge('A1:G1');
        this.spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center' }, 'A2:G2');
        this.spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle', fontSize: '13pt' }, 'A1:G1');
        this.spreadsheet.conditionalFormat({ type: 'BlueDataBar', range: 'D3:D18' });
        this.spreadsheet.conditionalFormat({ type: 'OrangeDataBar', range: 'E3:E18' });
        this.spreadsheet.conditionalFormat({ type: 'ThreeStars', range: 'G3:G18' });
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section spreadsheet-control'>
                    <SpreadsheetComponent openUrl='https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open'
                        saveUrl='https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save'
                        ref={(ssObj) => { this.spreadsheet = ssObj }} created={this.onCreated.bind(this)}>
                        <SheetsDirective>
                            <SheetDirective name='Inventory List'>
                                <RowsDirective>
                                    <RowDirective height= {30}>
                                        <CellsDirective>
                                            <CellDirective index={1} value='Inventory List'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                </RowsDirective>
                            <RangesDirective>
                                <RangeDirective dataSource={conditionalFormatting} startCell='A2' ></RangeDirective>
                            </RangesDirective>
                            <ConditionalFormatsDirective>
                                  <ConditionalFormatDirective type='GYRColorScale' range='C3:C18'></ConditionalFormatDirective>
                                  <ConditionalFormatDirective type='LessThan' cFColor='RedFT' value='8/30/2019' range='F3:F18'>
                                  </ConditionalFormatDirective>
                            </ConditionalFormatsDirective>
                            <ColumnsDirective>
                            <ColumnDirective width={100}></ColumnDirective>
                                <ColumnDirective width={158}></ColumnDirective>
                                <ColumnDirective width={72}></ColumnDirective>
                                <ColumnDirective width={113}></ColumnDirective>
                                <ColumnDirective width={113}></ColumnDirective>
                                <ColumnDirective width={97}></ColumnDirective>
                                <ColumnDirective width={73}></ColumnDirective>
                            </ColumnsDirective>
                        </SheetDirective>
                    </SheetsDirective>
                </SpreadsheetComponent>
            </div>
    <div id="action-description">
        <p>
            This sample demonstrates about the conditional formatting features like highlight cell rules, data bars,
            color scales, and icon sets by using the inventory list details.
        </p>
    </div>
    <div id="description">
        <p>
            This feature allows you to format a cell or range of cells based on the conditions applied. You can enable
            or disable conditional formats by using the <code>allowConditionalFormat</code> property.
        </p>
        <p>
            In this sample, we have applied conditional formatting color scales in Quantity column, data bars in Purchase
            price and selling price column, highlight cell rules in last updated column and rating icon sets applied in
            rating column by using the <code>conditionalFormat</code> method and <code>conditionalFormats</code> property
            in sheets model.
        </p>
        <p>
            More information about the Spreadsheet component can be found in this
            <a target="_blank" href="https://ej2.syncfusion.com/documentation/spreadsheet/getting-started">
            documentation</a> section.
        </p>
    </div>
    </div>
        )
    }
}