import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject } from '@syncfusion/ej2-react-grids';
import { data } from './data';
import { SampleBase } from '../common/sample-base';

export class Selectioning extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <GridComponent dataSource={data} allowPaging={true} selectionSettings={{ type: 'multiple' }}>
                        <ColumnsDirective>
                            <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign="right"></ColumnDirective>
                            <ColumnDirective field='CustomerName' headerText='Customer Name' width='150'></ColumnDirective>
                            <ColumnDirective field='OrderDate' headerText='Order Date' width='130' format='yMd' textAlign='right' />
                            <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='right' />
                            <ColumnDirective field='ShippedDate' headerText='Shipped Date' width='130' format="yMd" textAlign="right"></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Page, Selection]} />
                    </GridComponent>
                </div>
                <div id='description'>
                    <p>
                        Selection provides an interactive support to highlight the row or cell that you select. Selection can be done through a simple
            Mouse down or Keyboard interaction. To enable selection, set <code><a target="_blank" className="code"
                            href="http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#allowselection-boolean">
                            allowSelection
                            </a></code> as true.
                    </p>
                    <p>Grid component supports two types of selection which can be set using <code><a target="_blank" className="code"
                        href="http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#selectionsettings-selectionsettingsmodel">
                        selectionSettings->type
                    </a></code> property.
            They are</p>
                    <ul>
                        <li><code>single</code> - Enabled by default. Allows the user to select single row/cell at a time.</li>
                        <li><code>multiple</code> - Allows the user to select more than one row/cell at a time.</li>
                    </ul>
                    <p>Also, supports three modes of selection which can be set using <code><a target="_blank" className="code"
                        href="http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#selectionsettings-selectionsettingsmodel">
                        selectionSettings->mode
                       </a></code> property. They are
                      </p>
                    <ul>
                        <li><code>row</code> - Enabled by default. Enables the row selection in Grid.</li>
                        <li><code>cell</code> - Enables the cell selection in Grid.</li>
                        <li><code>both</code> - Enables both the row and cell selection in Grid. Clicking any cell will select both row and cell
                simultaneously</li>
                    </ul>
                    <p>To perform the multi-selection, hold <strong>CTRL</strong> key and click the desired rows/cells. To select range of rows/cells,
                       hold <strong>SHIFT</strong> key and click the rows/cells.</p>
                    <p>While using the Grid in a touch device environment, there is an option for multi-selection through a single tap on the
                        row and it will show a popup with the multi-selection symbol. Tap the icon to enable multi-selection in a single
                       tap.
                    </p>
                    <p>In this demo, multiple row selection is enabled, click any row to select.</p>

                    <p>
                        More information on the selection configuration can be found in this
                     <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#selectionsettings-selectionsettingsmodel"> documentation section</a>.
                   </p>

                </div>
            </div>
        )
    }
}