import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    PivotViewComponent, IDataOptions, Inject, FieldList, CalculatedField,
    Toolbar, PDFExport, ExcelExport, ConditionalFormatting, SaveReportArgs, GroupingBar, DrillThrough,
    FetchReportArgs, LoadReportArgs, RemoveReportArgs, RenameReportArgs, ToolbarArgs,
    NumberFormatting
} from '@syncfusion/ej2-react-pivotview';
import { ChartTheme } from '@syncfusion/ej2-react-charts';
import { Pivot_Data } from './data-source';
import { updateSampleSection } from '../common/sample-base';
import './tool-bar.css';

/**
 * PivotView KeyboardNavigation Sample
 */

let dataSourceSettings: IDataOptions = {
    enableSorting: true,
    columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
    rows: [{ name: 'Country' }, { name: 'Products' }],
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    dataSource: Pivot_Data,
    expandAll: false,
    allowLabelFilter: true,
    allowMemberFilter: true,
    allowValueFilter: true,
    values: [{ name: 'Sold', caption: 'Units Sold' },
    { name: 'Amount', caption: 'Sold Amount' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }]
};

function PivotKeyboardNavigation () {

    React.useEffect(() => {
        updateSampleSection();
    }, [])

    let pivotObj: any;
    let toolbarOptions: any = ['New', 'Save', 'SaveAs', 'Rename', 'Remove', 'Load',
        'Export', 'SubTotal', 'GrandTotal', 'Formatting', 'FieldList'];


    function saveReport(args: any): void {
        let reports: SaveReportArgs[] = [];
        let isSaved: boolean = false;
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reports = JSON.parse(localStorage.pivotviewReports);
        }
        if (args.report && args.reportName && args.reportName !== '') {
            reports.map(function (item: any): any {
                if (args.reportName === item.reportName) {
                    item.report = args.report; isSaved = true;
                }
            });
            if (!isSaved) {
                reports.push(args);
            }
            localStorage.pivotviewReports = JSON.stringify(reports);
        }
    }
    function fetchReport(args: FetchReportArgs): void {
        let reportCollection: string[] = [];
        let reeportList: string[] = [];
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reportCollection = JSON.parse(localStorage.pivotviewReports);
        }
        reportCollection.map(function (item: any): void { reeportList.push(item.reportName); });
        args.reportName = reeportList;
    }
    function loadReport(args: LoadReportArgs): void {
        let reportCollection: string[] = [];
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reportCollection = JSON.parse(localStorage.pivotviewReports);
        }
        reportCollection.map(function (item: any): void {
            if (args.reportName === item.reportName) {
                args.report = item.report;
            }
        });
        if (args.report) {
            pivotObj.dataSourceSettings = JSON.parse(args.report).dataSourceSettings;
        }
    }
    function removeReport(args: RemoveReportArgs): void {
        let reportCollection: any[] = [];
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reportCollection = JSON.parse(localStorage.pivotviewReports);
        }
        for (let i: number = 0; i < reportCollection.length; i++) {
            if (reportCollection[i].reportName === args.reportName) {
                reportCollection.splice(i, 1);
            }
        }
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            localStorage.pivotviewReports = JSON.stringify(reportCollection);
        }
    }
    function renameReport(args: RenameReportArgs): void {
        let reportsCollection: any[] = [];
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reportsCollection = JSON.parse(localStorage.pivotviewReports);
        }
        if (args.isReportExists) {
            for (let i: number = 0; i < reportsCollection.length; i++) {
                if (reportsCollection[i].reportName === args.rename) {
                    reportsCollection.splice(i, 1);
                }
            }
        }
        reportsCollection.map(function (item: any): any { if (args.reportName === item.reportName) { item.reportName = args.rename; } });
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            localStorage.pivotviewReports = JSON.stringify(reportsCollection);
        }
    }
    function newReport(): void {
        pivotObj.setProperties({ dataSourceSettings: { columns: [], rows: [], values: [], filters: [] } }, false);
    }
    function beforeToolbarRender(args: ToolbarArgs): void {
        args.customToolbar.splice(6, 0, {
            type: 'Separator'
        });
        args.customToolbar.splice(9, 0, {
            type: 'Separator'
        });
    }
    function chartOnLoad(args): void {
        let selectedTheme = location.hash.split("/")[1];
        selectedTheme = selectedTheme ? selectedTheme : "Material";
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    }
    return (
        <div className='control-pane'>
            <div className='control-section' id='pivot-table-section' style={{ overflow: 'initial' }}>
                <PivotViewComponent id='PivotView' ref={(scope) => { pivotObj = scope; }} dataSourceSettings={dataSourceSettings} width={'100%'} height={'450'} enableValueSorting={true} showFieldList={true} gridSettings={{ columnWidth: 140 }}
                    allowExcelExport={true} allowNumberFormatting={true} allowConditionalFormatting={true} showGroupingBar={true} allowDrillThrough={true} showTooltip={false} allowPdfExport={true} showToolbar={true} allowCalculatedField={true} toolbar={toolbarOptions}
                    newReport={newReport.bind(this)} renameReport={renameReport.bind(this)} removeReport={removeReport.bind(this)} loadReport={loadReport.bind(this)} fetchReport={fetchReport.bind(this)}
                    saveReport={saveReport.bind(this)} toolbarRender={beforeToolbarRender.bind(this)} chartSettings={{ title: 'Sales Analysis', load: chartOnLoad.bind(this) }} editSettings={{ allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal', allowEditOnDblClick: true }}>
                    <Inject services={[FieldList, CalculatedField, Toolbar, PDFExport, ExcelExport, ConditionalFormatting, GroupingBar, DrillThrough, NumberFormatting]} />
                </PivotViewComponent>
            </div>

            <div id="description">
                <i>Below key combinations can be used in pivot table to initiate various actions</i>
                <ul>
                    <li>
                        <b>FOCUS</b>
                        <ul>
                            <li>
                                <span className="key-class"><kbd>Alt</kbd> + <kbd>J</kbd></span>
                                <span> - Focuses the Pivot Table component.</span>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <b>PIVOT TABLE</b>
                        <ul>
                            <li>
                                <span className="key-class"><kbd>Tab</kbd></span>
                                <span> - Moves the cell focus right side. If no cells are focused, it moves to the next active element in the browser page. </span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Shift</kbd> + <kbd>Tab</kbd></span>
                                <span> - Moves the cell focus left side. If no cells are focused, it moves to the previous active element in the browser page. </span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Down arrow</kbd></span>
                                <span> - Moves the cell focus downwards. </span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Up arrow</kbd></span>
                                <span> - Moves the cell focus upwards. </span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Left arrow</kbd></span>
                                <span> - Moves the cell focus left side. </span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Right arrow</kbd></span>
                                <span> - Moves the cell focus right side.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Home</kbd></span>
                                <span> - Goes to the first cell in the current row.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>End</kbd></span>
                                <span> - Goes to the last cell in the current row.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Ctrl</kbd> + <kbd>Home</kbd></span>
                                <span> - Goes to the first cell in the table.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Ctrl</kbd> + <kbd>End</kbd></span>
                                <span> - Goes to the last cell in the table.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Enter</kbd></span>
                                <span> - If the current cell is an expand/collapse cell, it performs expand/collapse operation (drill operation). If the current row/column header is in value sort state, it performs value sorting.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Shift</kbd> + <kbd>Enter</kbd></span>
                                <span> - If value sorting is enabled in the pivot table and the current cell is a header with respect to its value axis, it performs value sorting to either ascending or descending order.</span>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <b>GROUPING BAR</b>
                        <ul>
                            <li>
                                <span className="key-class"><kbd>Tab</kbd></span>
                                <span> - Moves to the next active element (field’s button) in the grouping bar. If no active elements present, it moves to the next active element in the browser page.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Shift</kbd> + <kbd>Tab</kbd></span>
                                <span> - Moves to the previous active element (field’s button) in the grouping bar. If no active elements present, it moves to the previous active element in the browser page.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Shift</kbd> + <kbd>F</kbd></span>
                                <span> - If the current active element is a field’s button and if it has a filter icon, the filter dialog will be opened to perform filtering.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Shift</kbd> + <kbd>S</kbd></span>
                                <span> - If the current active element is a field’s button and if it has a sort icon, the sorting will be performed to the selected field.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Shift</kbd> + <kbd>E</kbd></span>
                                <span> - If the current active element is a calculated field’s button and if it has an edit icon, the calculated field dialog will be opened to perform editing the selected calculated field.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Enter</kbd></span>
                                <span> - Performs the selection operation of the current active element. If the current active element is a field’s button and it has a dropdown icon, the aggregation menu will open to perform calculations using aggregation options to the selected value field.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Delete</kbd></span>
                                <span> - If the current active element is a field’s button, the selected field will be removed from the current report.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Down arrow</kbd></span>
                                <span> - If the current active element is a dropdown list, the next item will be selected.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Up arrow</kbd></span>
                                <span> - If the current active element is a dropdown list, the previous item will be selected.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Home</kbd></span>
                                <span> - If the current active element is a dropdown list, the first item will be selected.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>End</kbd></span>
                                <span> - If the current active element is a dropdown list, the last item will be selected.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Alt</kbd> + <kbd>Down</kbd></span>
                                <span> - If the current active element is a dropdown list, the popup will be opened.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Alt</kbd> + <kbd>Down</kbd></span>
                                <span> - If the current active element is a dropdown list, the popup will be closed.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Esc or Escape</kbd></span>
                                <span> - Closes the dropdown list.</span>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <b>FIELD LIST</b>
                        <ul>
                            <li>
                                <span className="key-class"><kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>F</kbd></span>
                                <span> - If the popup field list is enabled in either the pivot table or the pivot chart, the field list dialog will be opened.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Tab</kbd></span>
                                <span> - Moves to the next active element in the field list. If no active elements present, it moves to the next active element in the browser page.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Shift</kbd> + <kbd>Tab</kbd></span>
                                <span> - Moves to the previous active element in the field list. If no active elements present, it moves to the previous active element in the browser page.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Shift</kbd> + <kbd>F</kbd></span>
                                <span> - If the current active element is a field’s button and if it has a filter icon, the filter dialog will be opened to perform filtering.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Shift</kbd> + <kbd>S</kbd></span>
                                <span> - If the current active element is a field’s button and if it has a sort icon, the sorting will be performed to the selected field.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Shift</kbd> + <kbd>E</kbd></span>
                                <span> - If the current active element is a calculated field’s button and if it has an edit icon, the calculated field dialog will be opened to perform editing the selected calculated field.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Enter</kbd></span>
                                <span> - Performs the selection operation of the current active element. If the current active element is a field’s button and if it has a dropdown icon, the aggregation menu will be opened to perform calculations using aggregation options to the selected value field.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Delete</kbd></span>
                                <span> - If the current active element is a field’s button, the selected field will be removed from the current report.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Down arrow</kbd></span>
                                <span> - If the current active element is a tree node, it moves to the next node.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Up arrow</kbd></span>
                                <span> - If the current active element is a tree node, it moves to the prevous node.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Left arrow</kbd></span>
                                <span> - If the current active element is a tree node, it collapses the current node.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Right arrow</kbd></span>
                                <span> - If the current active element is a tree node, it expands the current node.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Home</kbd></span>
                                <span> - If the current active element is a tree node, it goes to the first node.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>End</kbd></span>
                                <span> - If the current active element is a tree node, it goes to the last node.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Space</kbd></span>
                                <span> - If the current active element is a tree node or a checkbox element, it will be either checked or unchecked.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Esc or Escape</kbd></span>
                                <span> - Closes the popup field list dialog.</span>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <b>TOOLBAR</b>
                        <ul>
                            <li>
                                <span className="key-class"><kbd>Tab</kbd></span>
                                <span> - Moves to the next active option in the toolbar. If no active elements present, it moves to the next active element in the browser page.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Shift</kbd> + <kbd>Tab</kbd></span>
                                <span> - Moves to the previous active option in the toolbar. If no active elements present, it moves to the previous active element in the browser page.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Enter</kbd></span>
                                <span> - Performs the selection operation of the current active element.</span>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <b>CALCULATED FIELD</b>
                        <ul>
                            <li>
                                <span className="key-class"><kbd>Shift</kbd> + <kbd>E</kbd></span>
                                <span> - If the current active element is a field’s button and if it has an edit icon in either the field list or grouping bar UI, the calculated field dialog will be opened to perform editing the selected calculated field.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Tab</kbd></span>
                                <span> - Moves to the next active element in the calculated field dialog. If no active elements present, it moves to the next active element in the browser page.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Shift</kbd> + <kbd>Tab</kbd></span>
                                <span> - Moves to the previous active element in the calculated field dialog. If no active elements present, it moves to the previous active element in the browser page.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Enter</kbd></span>
                                <span> - Performs the selection operation of the current active element. If the current active element is a tree node, it copies the selected field name/formula to the formula text area to perform calculations.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Down arrow</kbd></span>
                                <span> - If the current active element is a tree node, it moves to the next node.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Up arrow</kbd></span>
                                <span> - If the current active element is a tree node, it moves to the prevous node.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Left arrow</kbd></span>
                                <span> - If the current active element is a tree node, it collapses the current node.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Right arrow</kbd></span>
                                <span> - If the current active element is a tree node, it expands the current node. If the current active element is a tree node and has a menu icon, the aggregation menu will be opened to select appropriate aggregation type to the selected field.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Home</kbd></span>
                                <span> - If the current active element is a tree node, it goes to the first node.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>End</kbd></span>
                                <span> - If the current active element is a tree node, it goes to the last node.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Esc or Escape</kbd></span>
                                <span> -  the filter dialog.</span>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <b>DRILL THROUGH</b>
                        <ul>
                            <li>
                                <span className="key-class"><kbd>Tab</kbd></span>
                                <span> - Moves to the next active element in the drill-through dialog. If the current active element is a Grid cell, it moves the cell focus to right side. If no active elements present, then it moves to the next active element in the browser page.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Shift</kbd> + <kbd>Tab</kbd></span>
                                <span> - Moves to the previous active element in the drill-through dialog. If the current active element is a Grid cell, it moves the cell focus to left side, If no active elements present, then it moves to the previous active element in the browser page.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Down arrow</kbd></span>
                                <span> - Moves the row/cell focus downwards.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Up arrow</kbd></span>
                                <span> - Moves the row/cell focus upwards.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Left arrow</kbd></span>
                                <span> - Moves the cell focus left side.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Right arrow</kbd></span>
                                <span> - Moves the cell focus left side.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Home</kbd></span>
                                <span> - Goes to the first cell in the current row.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>End</kbd></span>
                                <span> - Goes to the last cell in the current row.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Ctrl</kbd> + <kbd>Home</kbd></span>
                                <span> - Goes to the first cell in the table.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Ctrl</kbd> + <kbd>End</kbd></span>
                                <span> - Goes to the first cell in the table.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Enter</kbd></span>
                                <span> - Performs the selection operation of the current active element.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Esc or Escape</kbd></span>
                                <span> - If the cell is in selected state, the it deselects all rows/cells. If the row/cell is in edit state, it cancels the current entries in the row/cell. If the current active element is not a row/cell, it closes the drill-through dialog.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>F2</kbd></span>
                                <span> - If the cell is in selected state, the it deselects all rows/cells. If the row/cell is in edit state, it cancels the current entries in the row/cell. If the current active element is not a row/cell, it closes the drill-through dialog.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Insert</kbd></span>
                                <span> - Adds a new row/cell in the data grid.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Delete</kbd></span>
                                <span> - Removes the selected row in the data grid.</span>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <b>FILTER DIALOG</b>
                        <ul>
                            <li>
                                <span className="key-class"><kbd>Shift</kbd> + <kbd>F</kbd></span>
                                <span> - If the current active element is a field’s button and if it has a filter icon in either the field list or grouping bar UI, the filter dialog will be opened to perform filtering.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Tab</kbd></span>
                                <span> - Moves to the next active element in the filter dialog. If no active elements present, it moves to the next active element in the browser page.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Shift</kbd> + <kbd>Tab</kbd></span>
                                <span> - Moves to the previous active element in the filter dialog. If no active elements present, it moves to the previous active element in the browser page.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Enter</kbd></span>
                                <span> - Performs the selection operation of the current active element. If the current active element is a tab, the current tab element will be selected. If the current active element is a tree node, the current node will be either checked or unchecked. If the current active element is DropDownList, the focus item will be selected, and the popup list will close when it is open. Otherwise, toggles the popup list.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Down arrow</kbd></span>
                                <span> - If the current active element is a tree node, it moves to the next node.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Up arrow</kbd></span>
                                <span> - If the current active element is a tree node, it moves to the prevous node.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Left aArrow</kbd></span>
                                <span> - If the current active element is a tree node, it collapses the current node.  If the current active element is a tab, it moves focus to the previous tab element.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Right arrow</kbd></span>
                                <span> - If the current active element is a tree node, it expands the current node.  If the current active element is a tab, it moves focus to the next tab element.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Home</kbd></span>
                                <span> - If the current active element is a tree node, it goes to the first node.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>End</kbd></span>
                                <span> - If the current active element is a tree node, it goes to the last node.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Space</kbd></span>
                                <span> - If the current active element is a tree node or a checkbox element, it will be either checked or unchecked.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Esc or Escape</kbd></span>
                                <span> - Closes the filter dialog.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Alt</kbd> + <kbd>Down</kbd></span>
                                <span> - If the current active element is a DropDownList or DatePicker or DateTimePicker, the popup will be opened.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Alt</kbd> + <kbd>Up</kbd></span>
                                <span> - If the current active element is a DropDownList or DatePicker or DateTimePicker, the popup will be closed.</span>
                            </li>
                        </ul>
                    </li>
                </ul><br />
                <p>
                    More information on the keyboard navigation can be found in this <a target='_blank'
                        href='https://ej2.syncfusion.com/react/documentation/pivotview/accessibility#keyboard-interaction'>
                    documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default PivotKeyboardNavigation;
