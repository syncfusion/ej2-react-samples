import * as React from 'react';
import { SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';
import { orderDetails } from './data';
import { SampleBase } from '../common/sample-base';
import './spreadsheet.css';
export class CellFormatting extends SampleBase {
    constructor() {
        super(...arguments);
        this.rows = [
            {
                height: 36,
                // Applying cell formatting through cell binding
                cells: [{ style: { textAlign: 'right' } }, { style: { textIndent: '2pt' } }, { style: { textAlign: 'right' } },
                    { style: { textIndent: '2pt' } }, { index: 5, style: { textAlign: 'right' } },
                    { index: 7, style: { textAlign: 'center' } }, { index: 8, style: { textAlign: 'right' } }]
            },
            { height: 42 }, { height: 42 }, { height: 42 }, { height: 42 }, { height: 42 },
            { height: 42 }, { height: 42 }, { height: 42 }, { height: 42 }, { height: 42 }, { height: 42 }, { height: 42 }, { height: 42 },
            { height: 42 }, { height: 42 }
        ];
        this.sheetSettings = [{
                name: 'Order Details',
                rangeSettings: [{ dataSource: orderDetails }],
                columns: [{ width: 80 }, { width: 140 }, { width: 100 }, { width: 232 }, { width: 120 }, { width: 100 },
                    { width: 100 }, { width: 120 }, { width: 80 }],
                rows: this.rows,
                showGridLines: false
            }];
    }
    beforeDataBound() {
        if (this.spreadsheet.activeSheetTab === 1 && !this.spreadsheet.isOpen) {
            // Skip setting cell formatting for other sheets.
            if (this.spreadsheet.sheets[this.spreadsheet.activeSheetTab - 1].name !== 'Order Details') {
                return;
            }
            // Applying cell formatting dynamically using cellFormat method.
            this.spreadsheet.cellFormat({ fontWeight: 'bold', backgroundColor: '#4b5366', color: '#ffffff', fontSize: '12pt' }, 'A1:I1');
            this.spreadsheet.cellFormat({ fontWeight: 'bold', textIndent: '2pt' }, 'B2:B16');
            this.spreadsheet.cellFormat({ fontStyle: 'italic', textIndent: '2pt' }, 'D2:D16');
            this.spreadsheet.cellFormat({ textIndent: '2pt' }, 'E1:E16');
            this.spreadsheet.cellFormat({ textIndent: '2pt' }, 'G1:G16');
            this.spreadsheet.cellFormat({ textAlign: 'center', fontWeight: 'bold' }, 'H2:H16');
            this.spreadsheet.cellFormat({ fontFamily: 'Helvetica New', verticalAlign: 'middle' }, 'A1:I16');
        }
    }
    beforeCellRender(args) {
        if (this.spreadsheet.sheets[this.spreadsheet.activeSheetTab - 1].name === 'Order Details' && !this.spreadsheet.isOpen) {
            if (args.cell && args.cell.value) {
                // Applying cell formatting before rendering the particular cell.
                switch (args.cell.value) {
                    case 'Delivered':
                        this.spreadsheet.cellFormat({ color: '#10c469', textDecoration: 'line-through' }, args.address);
                        break;
                    case 'Shipped':
                        this.spreadsheet.cellFormat({ color: '#62c9e8' }, args.address);
                        break;
                    case 'Pending':
                        this.spreadsheet.cellFormat({ color: '#FFC107', textDecoration: 'underline' }, args.address);
                        break;
                    case 'Cancelled':
                        this.spreadsheet.cellFormat({ color: '#ff5b5b' }, args.address);
                        break;
                }
            }
        }
    }
    render() {
        return (<div className='control-pane'>
                <div className='control-section spreadsheet-control'>
                    <SpreadsheetComponent showRibbon={false} showFormulaBar={false} sheets={this.sheetSettings} ref={(ssObj) => { this.spreadsheet = ssObj; }} beforeDataBound={this.beforeDataBound.bind(this)} beforeCellRender={this.beforeCellRender.bind(this)}>
                    </SpreadsheetComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the <code>Spreadsheet</code> cell formatting feature by applying different styles to a
            range of cells .
            </p>
                </div>
                <div id="description">
                    <p>
                        <p>
                            Cell formatting allows you to highlight cell data that appears in the Spreadsheet. It can be enabled
                        or disabled using the <code><a target="_blank" href="https://ej2.syncfusion.com/documentation/api/spreadsheet/#allowcellformatting">allowCellFormatting</a>
                            </code> property.
                    </p>
                        <p>
                            In this sample, gridlines are hidden using the <code>showGridLines</code> property and the styles are
            applied using the <code>
                                <a target="_blank" href="https://ej2.syncfusion.com/documentation/api/spreadsheet/cellModel/#style">style</a>
                            </code> property and <code>
                                <a target="_blank" href="https://ej2.syncfusion.com/documentation/api/spreadsheet/#cellFormat">cellFormat</a>
                            </code> method.
                    </p>
                    </p>
                    <p>
                        More information about <code>cell formatting</code> can be found in this 
        <a target="_blank" href="https://ej2.syncfusion.com/documentation/spreadsheet/getting-started"> documentation</a> section.
                    </p>
                </div>
            </div>);
    }
}
