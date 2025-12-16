import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, VirtualScroll, Sort, Selection, Inject, SelectionSettings, Toolbar, ToolbarItems, EditSettingsModel, Edit, FilterSettingsModel, Filter } from '@syncfusion/ej2-react-grids';
import { ordersTrackData } from './data';
import './conditional-row-selection.css';
import { SampleBase } from '../common/sample-base';

export class ConditionalRowSelection extends SampleBase<{}, {}> {

    public selectionsettings: Object = { persistSelection: true, checkboxOnly: true };
    public filterSettings: FilterSettingsModel = { type: 'Excel' };
    private gridInstance: GridComponent;
    public toolbarOptions: ToolbarItems[] = ['Edit', 'Update', 'Cancel'];
    public editSettings: EditSettingsModel = { allowEditing: true };
    public isRowSelectable(data: any, column: any): any {
        if (data.Status === "Canceled" || data.Status === "Delivered") {
            return false;
        }
        return true;
    };
    public productTemplate = (props: any): any => {
        return (
            <div className="e-product-info">
                <img
                    src={`src/grid/images/product/${props.Product}.png`}
                    alt={props.Product}
                />
                <span>{props.Product}</span>
            </div>
        );
    };
    public statusTemplate = (props: any): any => {
        return (
            <div className="e-status-info">
                <img
                    src={`src/grid/images/status/${props.Status}.svg`}
                    alt={props.Status}
                />
                <span>{props.Status}</span>
            </div>
        );
    };
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <GridComponent id="ConditionalSelection" dataSource={ordersTrackData} ref={grid => this.gridInstance = grid} height={400} enableVirtualization={true} isRowSelectable={this.isRowSelectable.bind(this)} allowSorting={true} allowFiltering={true} filterSettings={this.filterSettings} selectionSettings={this.selectionsettings} toolbar={this.toolbarOptions} editSettings={this.editSettings}>
                        <ColumnsDirective>
                            <ColumnDirective type='checkbox' width='50' allowEditing={false}></ColumnDirective>
                            <ColumnDirective field='OrderID' isPrimaryKey={true} headerText='Order ID' width='110' allowEditing={false}></ColumnDirective>
                            <ColumnDirective field='CustomerName' headerText='Customer Name' width='170' allowEditing={false}></ColumnDirective>
                            <ColumnDirective field='Product' headerText='Product' width='130' template={this.productTemplate} allowEditing={false} />
                            <ColumnDirective field='Amount' headerText='Amount' width='110' format='C2' textAlign='Right' allowEditing={false} />
                            <ColumnDirective field='OrderDate' headerText='Order Date' width='130' format="yMd" textAlign="Right" allowEditing={false}></ColumnDirective>
                            <ColumnDirective field='Status' headerText='Status' width='130' template={this.statusTemplate} editType="dropdownedit" />
                        </ColumnsDirective>
                        <Inject services={[VirtualScroll, Selection, Toolbar, Edit, Filter, Sort]} />
                    </GridComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the conditional row selection of the Data Grid using checkbox selection.
                        It allows end-users to select only specific rows based on certain conditions.</p>
                </div>
                <div id="description">
                    <p>In this demo, conditional row selection is implemented using the
                        <code><a target="_blank" className="code"
                            href="https://ej2.syncfusion.com/react/documentation/api/grid/#isrowselectable">isRowSelectable</a></code> callback function.
                        This callback function executes before the grid loads data, evaluates each row, and returns <strong>false</strong> for orders
                        with <strong>Delivered</strong> or <strong>Canceled</strong> status.</p>

                    <p>Selection is persisted by enabling <code><a target="_blank" className="code"
                            href="https://ej2.syncfusion.com/react/documentation/api/grid/selectionSettings/#persistselection">
                            selectionSettings -&gt; persistSelection</a></code>. With this setting, selected rows remain checked across all operations. Persist selection
                        requires at least one column to be defined as a primary key using the <code><a target="_blank" className="code"
                            href="https://ej2.syncfusion.com/react/documentation/api/grid/column/#isprimarykey">
                            columns -&gt; isPrimaryKey</a></code> property.</p>
                    <p>More information on the conditional row selection can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/grid/selection/row-selection"> documentation section</a>.</p>
                </div>
            </div>
        )
    }
}