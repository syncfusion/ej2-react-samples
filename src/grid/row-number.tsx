import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    GridComponent, ColumnsDirective, ColumnDirective, Filter, Inject, Sort, Edit, Toolbar,
    VirtualScroll, FilterSettingsModel, EditSettingsModel, ExcelExport, PdfExport, LoadEventArgs
} from '@syncfusion/ej2-react-grids';
import { ClickEventArgs } from '@syncfusion/ej2-react-navigations';
import { groceryProducts } from './data';
import { SampleBase } from '../common/sample-base';

export class RowNumber extends SampleBase<{}, {}> {
    public grid: GridComponent;
    public filterSettings: FilterSettingsModel = { type: 'CheckBox' };
    public editSettings: EditSettingsModel = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Cell' };
    public toolbarOptions: any = ['Delete', 'Update', 'Cancel', 'ExcelExport', 'PdfExport'];
    private availableStockTemplate = (props: any) => {
        return <span>{props.AvailableStock} {props.Unit}</span>;
    }

    private soldStockTemplate = (props: any) => {
        return <span>{props.SoldStock} {props.Unit}</span>;
    }

    public toolbarClick(args: ClickEventArgs): void {
        switch (args.item.id) {
            case this.grid.element.id + '_pdfexport':
                this.grid.pdfExport();
                break;
            case this.grid.element.id + '_excelexport':
                this.grid.excelExport();
                break;
        }
    }
    public load(args: LoadEventArgs) {
        if (args) {
            args.enableSeamlessScrolling = true;
        }
    }
    actionBegin(args: any): void {
        if (args.requestType === 'save' && args.action === 'add') {
            if (args.data.Category === 'Beverages' || args.data.Category === 'Dairy Products') {
                args.data.Unit = 'Litre';
            }
            else if (
                args.data.Category === 'Fruits' || args.data.Category === 'Vegetables' ||
                args.data.Category === 'Nuts' || args.data.Category === 'Rices'
            ) {
                args.data.Unit = 'Kg';
            }
            else {
                args.data.Unit = 'Pack';
            }
        }
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section row'>
                    <GridComponent dataSource={groceryProducts} ref={grid => this.grid = grid} allowSorting={true} allowFiltering={true} allowExcelExport={true} allowPdfExport={true} enableVirtualization={true}
                        filterSettings={this.filterSettings} rowHeight={45} toolbar={this.toolbarOptions} editSettings={this.editSettings} pageSettings={{ pageSize: 50 }} height={365}  actionBegin={this.actionBegin.bind(this)} toolbarClick={this.toolbarClick.bind(this)} load={this.load.bind(this)}>
                        <ColumnsDirective>
                            <ColumnDirective type='RowNumber' textAlign='Center'></ColumnDirective>
                            <ColumnDirective field='ProductID' headerText='Product ID' width={120} visible={false} textAlign='Right' isPrimaryKey={true} type='number'></ColumnDirective>
                            <ColumnDirective field='ProductName' headerText='Products' width={160} validationRules={{ required: true }} allowEditing={false}></ColumnDirective>
                            <ColumnDirective field='Category' headerText='Category' width={140} validationRules={{ required: true }} allowEditing={false}></ColumnDirective>
                            <ColumnDirective field='SellingPrice' headerText='Price' width={130} format='C' textAlign='Right' editType='numericedit' validationRules={{ required: true, min: 0 }} filter={{ type: 'Menu' }} edit={{ params: { showSpinButton: false } }}></ColumnDirective>
                            <ColumnDirective field='AvailableStock' headerText='In-Stock' width={120} textAlign='Right' template={this.availableStockTemplate.bind(this)} editType='numericedit' validationRules={{ required: true, min: 0 }} filter={{ type: 'Menu' }} edit={{ params: { showSpinButton: false } }}></ColumnDirective>
                            <ColumnDirective field='SoldStock' headerText='Sold' width={120} textAlign='Right' template={this.soldStockTemplate.bind(this)} editType='numericedit' validationRules={{ required: true, min: 0 }} filter={{ type: 'Menu' }} edit={{ params: { showSpinButton: false } }}></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Sort, Filter, Edit, Toolbar, VirtualScroll, ExcelExport, PdfExport]} />
                    </GridComponent>
                </div>

                <div id="action-description">
                    <p>This sample demonstrates the Row Number feature in the Data Grid, which automatically displays sequential row numbers in a dedicated column. It provides a simple way to identify the position of records in the current grid view.</p>
                </div>

                <div id="description">
                    <p>
                        In this demo, the row number column is enabled by setting the <code>columns-&gt;type</code> property to <code>RowNumber</code>. The grid automatically generates and maintains row numbers for all displayed records, updating them appropriately during operations such as paging, sorting, filtering and grouping.
                    </p>
                    <p>
                        More information on row configuration can be found in the <a target="_blank"
                            href="https://ej2.syncfusion.com/react/documentation/grid/row"> documentation section</a>.
                    </p>
                    <p>Looking for the full React Data Grid component overview, features, pricing, and documentation? Visit our
                        <a target="_blank"
                            href="https://www.syncfusion.com/react-components/react-data-grid"> React Data Grid component</a> page.</p>
                    
                </div>

            </div>
        );
    }
}