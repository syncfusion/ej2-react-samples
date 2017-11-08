import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Toolbar, Inject } from '@syncfusion/ej2-react-grids';
import { data } from './data';
import { SampleBase } from '../common/sample-base';

export class ColumnChooser extends SampleBase<{}, {}> {
    public toolbarOptions: any = ['columnchooser'];
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <GridComponent dataSource={data} toolbar={this.toolbarOptions} allowPaging={true} showColumnChooser={true} >
                        <ColumnsDirective>
                            <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='right'></ColumnDirective>
                            <ColumnDirective field='CustomerName' headerText='Customer Name' width='150' showInColumnChooser={false}></ColumnDirective>
                            <ColumnDirective field='OrderDate' headerText='Order Date' width='130' format='yMd' textAlign='right' />
                            <ColumnDirective field='ShippedDate' headerText='Shipped Date' width='130' format='yMd' textAlign='right' />
                            <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='right' />
                            <ColumnDirective field='ShipCountry' headerText='Ship Country' visible={false} width='150'></ColumnDirective>
                            <ColumnDirective field='ShipCity' headerText='Ship City' visible={false} width='150'></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Toolbar]} />
                    </GridComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the Grid column chooser feature. Click the column chooser
        icon in the toolbar to open column chooser and you can select columns to hide/show from the checkbox list.
    </p>
                </div>
                <div id="description">
                    <p>The Grid columns can be shown/hidden dynamically by using column chooser.  To enable column chooser behavior, set  <code><a target="_blank" className="code"
                        href="http://ej2.syncfusion.com/react/documentation/grid/api-grid.html#showColumnChooser-boolean">showColumnChooser
        </a></code> property as true. You can also prevent the show of a column by setting
            <code><a target="_blank" className="code"
                            href="http://ej2.syncfusion.com/react/documentation/grid/api-column.html#showInColumnChooser-boolean">columns->showInColumnChooser
        </a></code> as false in Grid columns definition.

        </p>
                    <br/>

                    <p>
                        In this demo,  when the user clicks column chooser icon from the toolbar then the column chooser menu will open.
                   User can show or hide the columns by changing the state of the checkbox..
        </p>
                </div>
            </div >
        )
    }
}