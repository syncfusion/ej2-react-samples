import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, SelectionSettings } from '@syncfusion/ej2-react-grids';
import { data } from './data';
import { SampleBase } from '../common/sample-base';

export class CheckboxSelection extends SampleBase<{}, {}> {

    public selectionsettings: Object = { persistSelection: true };
    private gridInstance: GridComponent;

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <GridComponent dataSource={data} ref={grid => this.gridInstance = grid} enableHover={false} allowPaging={true} selectionSettings={this.selectionsettings}>
                        <ColumnsDirective>
                            <ColumnDirective type='checkbox' width='50'></ColumnDirective>
                            <ColumnDirective field='OrderID' isPrimaryKey={true} headerText='Order ID' width='120' textAlign="right"></ColumnDirective>
                            <ColumnDirective field='CustomerName' headerText='Customer Name' width='150'></ColumnDirective>
                            <ColumnDirective field='OrderDate' headerText='Order Date' width='130' format='yMd' textAlign='right' />
                            <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='right' />
                            <ColumnDirective field='ShippedDate' headerText='Shipped Date' width='130' format="yMd" textAlign="right"></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Page, Selection]} />
                    </GridComponent>
                </div>
                <div id="description">
                    <p>
                        Grid mutliple selection can be achieved with help of checkbox in each row. To render checkbox in each grid row, you need
            to define column type as <code>checkbox</code> using
            <code><a target="_blank" className="code"
                            href="http://ej2.syncfusion.com/react/documentation/grid/api-column.html#type-string">
                            columns->type
        </a></code> property.</p>
                    <p>Selection can be persisted on all the operations using
            <code><a target="_blank" className="code"
                            href="http://ej2.syncfusion.com/react/documentation/grid/api-selectionSettings.html#persistselection-boolean">
                            selectionSettings-> persistSelection
        </a></code> property. For persisting selection on the Grid, any one of the column should be defined as
            a primary key using
            <code><a target="_blank" className="code"
                            href="http://ej2.syncfusion.com/react/documentation/grid/api-column.html#isprimarykey-boolean">
                            columns->isPrimaryKey
        </a></code> property.
        </p>

                    <p>In this demo, Grid mutliple selection has been enabled with selection persistance.
        </p>
                    <p>
                        More information on the checkbox selection configuration can be found in this <a target="_blank"
                        href="http://ej2.syncfusion.com/react/documentation/grid/selection.html#checkbox-selection">documentation section</a>.
        </p>
                </div>
            </div>
        )
    }
}