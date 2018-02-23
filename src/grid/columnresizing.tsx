import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Inject } from '@syncfusion/ej2-react-grids';
import { orderDetails } from './data';
import { SampleBase } from '../common/sample-base';

export class ColumnResizing extends SampleBase<{}, {}> {
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <GridComponent dataSource={orderDetails} allowResizing={true} height='400' >
                        <ColumnsDirective>
                            <ColumnDirective field='OrderID' headerText='Order ID' minWidth= '120' width='200' maxWidth='300' textAlign='Right'></ColumnDirective>
                            <ColumnDirective field='CustomerName' headerText='Customer Name' minWidth= '8' width='200' ></ColumnDirective>
                            <ColumnDirective field='OrderDate' headerText='Order Date' minWidth= '8' width='200' format='yMd' textAlign='Right' />
                            <ColumnDirective field='ShippedDate' headerText='Shipped Date' allowResizing= {false} width='200' format='yMd' textAlign='Right' />
                            <ColumnDirective field='Freight' headerText='Freight' minWidth= '8' width='150' format='C2' textAlign='Right' />
                            <ColumnDirective field='ShipName' headerText='Ship Name' minWidth= '8' width='200'></ColumnDirective>
                            <ColumnDirective field='ShipCountry' headerText='Ship Country' minWidth= '8' width='200'></ColumnDirective>
                            <ColumnDirective field='ShipCity' headerText='Ship City' minWidth= '8' width='200'></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Resize]} />
                    </GridComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the Grid column resizing feature. Click and drag at the right corner of each column header to
        resize the column.
    </p>
                </div>
                <div id="description">
                    <p>The Grid columns can be resized by clicking and dragging at the right corner of columns header. To enable column, resize behavior, set <code><a target="_blank" className="code"
                        href="http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#allowresizing-boolean">allowResizing
                        </a></code> property as true. You can also prevent the resize of the particular column by setting
                        <code><a target="_blank" className="code" href="http://ej2.syncfusion.com/react/documentation/grid/api-columnModel.html#allowresizing-boolean">columns->allowResizing
                        </a></code> as false in columns definition.
                
                        And, by double clicking at the right corner of column header, the respective column width will get auto adjusted to its fit by <code><a target="_blank" className="code"
                            href="http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#autofitcolumns">autoFitColumns
                            </a></code> method.
                    </p>
                    <p>
                        In this demo, allowResizing feature have enabled through by setting the <code> allowResizing </code> property to true and <b>Order ID</b> column can be resized
                        between the range of  <code><a target="_blank" className="code" href="http://ej2.syncfusion.com/react/documentation/grid/api-columnModel.html#minwidth-string---number">minWidth (120px)
                            </a></code> and <code><a target="_blank" className="code" href="http://ej2.syncfusion.com/react/documentation/grid/api-columnModel.html#maxwidth-string---number">maxWidth (300px).
                                </a></code> Also, column resizing has been disabled in the <b>Shipped Date</b> column. 
                    </p>
                    <p style={{ fontWeight: 500 }}>Injecting Module:</p>
                    <p>
                        Grid component features are segregated into individual feature-wise modules. To use Resize feature, we need to inject <code>Resize</code> module into the <code>services</code>
                    </p>

                </div>
            </div>
        )
    }
}