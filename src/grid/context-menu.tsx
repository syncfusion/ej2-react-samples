import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
import { GroupSettingsModel, FilterSettingsModel, ContextMenuItem, EditSettingsModel } from '@syncfusion/ej2-react-grids';
import { orderDetails } from './data';
import { SampleBase } from '../common/sample-base';
import './grid-context-menu.css';

export class ContextMenuSample extends SampleBase<{}, {}> {
    public groupOptions: GroupSettingsModel = { showGroupedColumn: true };
    public contextMenuItems: ContextMenuItem[] = ['AutoFit', 'AutoFitAll',
        'SortAscending', 'SortDescending', 'Copy', 'Edit', 'Delete', 'Save',
        'Cancel', 'PdfExport', 'ExcelExport', 'CsvExport', 'FirstPage', 'PrevPage',
        'LastPage', 'NextPage'];
    public editing: EditSettingsModel = { allowDeleting: true, allowEditing: true }
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <GridComponent id='gridcomp' dataSource={orderDetails} allowPaging={true} allowSorting={true}
                        allowExcelExport={true} allowPdfExport={true} contextMenuItems={this.contextMenuItems}
                        editSettings={this.editing}>
                        <ColumnsDirective>
                            <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='Right' isPrimaryKey={true}></ColumnDirective>
                            <ColumnDirective field='CustomerName' headerText='Customer Name'></ColumnDirective>
                            <ColumnDirective field='Freight' headerText='Freight' format='C2' textAlign='Right' editType='numericedit' />
                            <ColumnDirective field='ShipName' headerText='Ship Name' width='200'></ColumnDirective>
                            <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150' editType='dropdownedit'></ColumnDirective>
                            <ColumnDirective field='ShipCity' headerText='Ship City' width='150'></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
                    </GridComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the usage of context menu in Grid component. Right click anywhere on the Grid to view context
                        menu.
                    </p>
                </div>
                <div id="description">
                    <p>
                        Grid has options to show the context menu when right click on it. To configure the items in context menu, you should define
                either default or custom item in
                <code><a target="_blank" className="code"
                            href="http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#contextmenuitems">contextMenuItems
                    </a></code>. Each item will be shown based on it target. The default items are
                    </p>
                    <ul>
                        <li>
                            <code>edit</code> - Edit the current record.</li>
                        <li>
                            <code>delete</code> - Delete the current record.</li>
                        <li>
                            <code>save</code> - Save the edited record.</li>
                        <li>
                            <code>cancel</code> - Cancel the edited state.</li>
                        <li>
                            <code>copy</code> - Copy the selected records.</li>
                        <li>
                            <code>pdfExport</code> - Export the grid as Pdf format.</li>
                        <li>
                            <code>excelExport</code> - Export the grid as Excel format.</li>
                        <li>
                            <code>csvExport</code> - Export the grid as CSV format.</li>
                        <li>
                            <code>sortAscending</code> - Sort the current column in ascending order.</li>
                        <li>
                            <code>sortDescending</code> - Sort the current column in descending order.</li>
                        <li>
                            <code>firstPage</code> - Go to the first page.</li>
                        <li>
                            <code>prevPage</code> - Go to the previous page.</li>
                        <li>
                            <code>lastPage</code> - Go to the last page.</li>
                        <li>
                            <code>nextPage</code> - Go to the next page.</li>
                    </ul>

                    <br />
                    <p>
                        While using the Grid in a touch device environment, touch and hold the Grid row cell to show the context menu.
                    </p>

                    <p>
                        In this demo, Context Menu feature has enabled by defining the
                <code> contextMenuItems </code> property with all default items.

            </p>

                    <p style={{ fontWeight: 500 }}>Injecting Module:</p>
                    <p>
                        Grid component features are segregated into individual feature-wise modules. To use context menu feature, we need to inject <code>ContextMenu</code> modeule into the <code>services</code>
                    </p>

                </div>
            </div >
        )
    }
}