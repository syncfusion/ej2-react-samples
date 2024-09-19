import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SpreadsheetComponent, SheetsDirective, SheetDirective, ColumnsDirective, RangesDirective, RangeDirective, ColumnDirective } from '@syncfusion/ej2-react-spreadsheet';
import { sortingAndFiltering } from './data';
import { updateSampleSection } from '../common/sample-base';
import './spreadsheet.css';

/**
 * SortingAndFiltering sample
 */

function SortingAndFiltering() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let spreadsheet: SpreadsheetComponent;

    function onCreated(): void {
        spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center' }, 'A1:G1');
        spreadsheet.numberFormat('m/d/yyyy', 'E2:E51');
        spreadsheet.sort({ sortDescriptors: { field: 'B' } }, 'A2:G51').then(() => {
            spreadsheet.applyFilter([{ field: 'D', operator: 'equal', value: 'Services' }], 'A1:G51');
        });
        spreadsheet.numberFormat('$#,##0.00', 'F2:F51');
    }

    return (
        <div className='control-pane'>
            <div className='control-section spreadsheet-control'>
                <SpreadsheetComponent ref={(ssObj) => { spreadsheet = ssObj }} openUrl='https://services.syncfusion.com/react/production/api/spreadsheet/open'
                    saveUrl='https://services.syncfusion.com/react/production/api/spreadsheet/save' created={onCreated.bind(this)}>
                    <SheetsDirective>
                        <SheetDirective name='Employee Details'>
                            <RangesDirective>
                                <RangeDirective dataSource={sortingAndFiltering} showFieldAsHeader={true} ></RangeDirective>
                            </RangesDirective>
                            <ColumnsDirective>
                                <ColumnDirective width={110}></ColumnDirective>
                                <ColumnDirective width={142}></ColumnDirective>
                                <ColumnDirective width={80}></ColumnDirective>
                                <ColumnDirective width={137}></ColumnDirective>
                                <ColumnDirective width={122}></ColumnDirective>
                                <ColumnDirective width={92}></ColumnDirective>
                                <ColumnDirective width={124}></ColumnDirective>
                            </ColumnsDirective>
                        </SheetDirective>
                    </SheetsDirective>
                </SpreadsheetComponent>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates sorting and filtering feature using employee details.
                </p>
            </div>
            <div id="description">
                <p>
                    In this demo, sorting is applied to B(Employee Name) column in ascending order using <code>sort</code> method.
                    The sort order can be specified in <code>order</code> property with following values `Ascending` or `Descending` and its
                    default value is `Ascending`.

                    The sorted data is filtered with value 'Services' in `D` column using <code>
                        <a target="_blank" href="https://ej2.syncfusion.com/documentation/api/spreadsheet/#applyfilter">applyFilter</a>
                    </code> method in call back function of <code>
                        <a target="_blank" href="https://ej2.syncfusion.com/documentation/api/spreadsheet/#sort">sort</a>
                    </code> method.
                </p>
                <p>
                    More information about sorting and filtering feature can be found in this
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/spreadsheet/sort/">
                        documentation</a> section.
                </p>
            </div>
        </div>
    )
}
export default SortingAndFiltering;