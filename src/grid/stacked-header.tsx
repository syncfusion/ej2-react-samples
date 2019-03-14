import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Inject, Resize } from '@syncfusion/ej2-react-grids';
import { orderDetails } from './data';
import { SampleBase } from '../common/sample-base';

export class StackedHeader extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <GridComponent dataSource={orderDetails} allowPaging={true} allowResizing={true}>
                        <ColumnsDirective>
                            <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='Right'></ColumnDirective>
                            <ColumnDirective columns={[{ field: 'OrderDate', headerText: 'Order Date', format: 'yMd', width: 130, textAlign: 'Right' }, { field: 'Freight', headerText: 'Freight ($)', width: 120, format: 'C1', textAlign: 'Right' }]} headerText='Order Details' ></ColumnDirective>
                            <ColumnDirective columns={[{ field: 'ShippedDate', headerText: 'Shipped Date', format: 'yMd', textAlign: 'Right', width: 150 }, { field: 'ShipCountry', headerText: 'Ship Country', width: 150 }]} headerText='Ship Details' />
                        </ColumnsDirective>
                        <Inject services={[Page, Resize]} />
                    </GridComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the Grid component with the stacked header and resize feature. In this sample, we have shown multiple level of column headers.</p>
                </div>
                <div id='description'>
                    <p>The Grid columns can be stacked/grouped in order to show multiple level of column headers. It can be done by setting the  <code><a target='_blank' className='code'
                        href='http://ej2.syncfusion.com/react/documentation/api/grid#columns'>
                        columns</a></code> property.
                    </p>
                    <p>The Grid columns can be resized by clicking and dragging at the right edge of columns header. To enable column, resize behavior, set <code><a target="_blank" className="code"
                        href="http://ej2.syncfusion.com/react/documentation/api/grid#allowresizing">allowResizing
                        </a></code> property as true. You can also prevent the resize of the particular column by setting
                        <code><a target="_blank" className="code"
                        href="http://ej2.syncfusion.com/react/documentation/api/grid/column#allowresizing">columns->allowResizing
                        </a></code> as false in columns definition.
                    </p>

                    <p>In this demo, the columns <b>OrderDate</b>, <b>Freight</b> are grouped under <b>Order Details</b>, the columns <b>ShippedDate</b>, <b>ShipCountry</b> are grouped under<b> Ship Details</b>. </p>
                    <p> More information on the Stacked Header feature configuration can be found in this
                    <a target='_blank' href='http://ej2.syncfusion.com/react/documentation/api/grid.html#columns'> documentation section</a>.
                 </p>
                </div>
            </div>
        )
    }
}