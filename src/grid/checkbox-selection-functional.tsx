import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, SelectionSettings, Edit, Toolbar } from '@syncfusion/ej2-react-grids';
import { data } from './data';
import { updateSampleSection } from '../common/sample-base';

function CheckboxSelection() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    const selectionsettings: Object = { persistSelection: true };
    let gridInstance: GridComponent;
    const toolbarOptions: any = ['Delete'];
    const editSettings: any = { allowDeleting: true };

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <GridComponent dataSource={data} ref={grid => gridInstance = grid} enableHover={false} allowPaging={true} pageSettings={{ pageCount: 5 }} selectionSettings={selectionsettings} toolbar={toolbarOptions} editSettings={editSettings}>
                    <ColumnsDirective>
                        <ColumnDirective type='checkbox' width='50'></ColumnDirective>
                        <ColumnDirective field='OrderID' isPrimaryKey={true} headerText='Order ID' width='120' textAlign="Right"></ColumnDirective>
                        <ColumnDirective field='CustomerName' headerText='Customer Name' width='150'></ColumnDirective>
                        <ColumnDirective field='OrderDate' headerText='Order Date' width='130' format='yMd' textAlign='Right' />
                        <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right' />
                        <ColumnDirective field='ShippedDate' headerText='Shipped Date' width='130' format="yMd" textAlign="Right"></ColumnDirective>
                    </ColumnsDirective>
                    <Inject services={[Page, Selection, Toolbar, Edit]} />
                </GridComponent>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the selection functionality of the Grid using checkbox selection, To select and unselect all rows use header checkbox.
                    To select/unselect particular row, click the desired row. Delete one or more records using the toolbar delete button</p>
            </div>
            <div id="description">
                <p>
                    Grid multiple selection can be achieved with help of checkbox in each row. To render checkbox in each grid row, you need
                    to define column type as <code>checkbox</code> using
                    <code><a target="_blank" className="code"
                        href="http://ej2.syncfusion.com/react/documentation/grid/api-column.html#type">
                        columns-&gt;type
                    </a></code> property.</p>
                <p>Selection can be persisted on all the operations using
                    <code><a target="_blank" className="code"
                        href="http://ej2.syncfusion.com/react/documentation/grid/api-selectionSettings.html#persistselection">
                        selectionSettings-&gt; persistSelection
                    </a></code> property. For persisting selection on the Grid, any one of the column should be defined as
                    a primary key using
                    <code><a target="_blank" className="code"
                        href="http://ej2.syncfusion.com/react/documentation/grid/api-column.html#isprimarykey">
                        columns-&gt;isPrimaryKey
                    </a></code> property.
                </p>

                <p>
                    In this demo, Grid multiple selection has been enabled with selection persistance. You can also delete multiple records,
                    by clicking the toolbar’s <code>Delete</code> button after selecting the checkboxes.
                </p>
                <p>
                    More information on the checkbox selection configuration can be found in this <a target="_blank"
                        href="http://ej2.syncfusion.com/react/documentation/grid/selection.html#checkbox-selection">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default CheckboxSelection;