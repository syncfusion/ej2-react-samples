import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
import { GroupSettingsModel, FilterSettingsModel, ContextMenuItem, EditSettingsModel } from '@syncfusion/ej2-react-grids';
import { data } from '../data';
import { SampleBase } from './sample-base';


export class ContextMenuSample extends SampleBase<{}, {}> {
    public groupOptions: GroupSettingsModel = { showGroupedColumn: true };
    public contextMenuItems: ContextMenuItem[] = ['autoFit', 'autoFitAll',
        'sortAscending', 'sortDescending', 'copy', 'edit', 'delete', 'save',
        'cancel', 'pdfExport', 'excelExport', 'csvExport', 'firstPage', 'prevPage',
        'lastPage', 'nextPage'];
    public editing: EditSettingsModel = { allowDeleting: true, allowEditing: true }
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <GridComponent id='gridcomp' dataSource={data.splice(0, 60)} allowPaging={true} allowSorting={true}
                        allowExcelExport={true} allowPdfExport={true} contextMenuItems={this.contextMenuItems}
                        editSettings={this.editing}>
                        <ColumnsDirective>
                            <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='right' isPrimaryKey={true}></ColumnDirective>
                            <ColumnDirective field='CustomerName' headerText='Customer Name'></ColumnDirective>
                            <ColumnDirective field='Freight' headerText='Freight' format='C2' textAlign='right' editType='numericedit' />
                            <ColumnDirective field='ShipName' headerText='Ship Name' width='200'></ColumnDirective>
                            <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150' editType='dropdownedit'></ColumnDirective>
                            <ColumnDirective field='ShipCity' headerText='Ship City' width='150'></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
                    </GridComponent>
                </div>
            </div >
        )
    }
}
ReactDOM.render(<ContextMenuSample />, document.getElementById('sample'));