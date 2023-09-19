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
                    <div style={{ overflowX: 'auto', marginLeft: '4px' }}>
                        <GridComponent dataSource={orderDetails} allowResizing={true} height='400' width='850' autoFit={true} >
                            <ColumnsDirective>
                                <ColumnDirective field='OrderID' headerText='Order ID' minWidth= '100' width='150' maxWidth='200' textAlign='Right'></ColumnDirective>
                                <ColumnDirective field='CustomerName' headerText='Customer Name' minWidth= '8' width='150' ></ColumnDirective>
                                <ColumnDirective field='Freight' headerText='Freight' minWidth= '8' width='120' format='C2' textAlign='Right' />
                                <ColumnDirective field='ShippedDate' headerText='Shipped Date' allowResizing= {false} width='150' format='yMd' textAlign='Right' />
                                <ColumnDirective field='ShipCountry' headerText='Ship Country' minWidth= '8' width='150'></ColumnDirective>
                            </ColumnsDirective>
                            <Inject services={[Resize]} />
                        </GridComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the Grid column rendering with a specified width. This sample also shows how to enable the resizing feature. Click and drag the right corner of each column header to resize it.</p>
                </div>
                <div id="description">
                    <p>
                    By default, if the total width of the columns is less than the width of the Grid, columns will automatically fill to the grid's width. The Grid's AutoFit feature prevents Grid columns from filling more than their specified width by enabling the <code>autoFit</code> as true.
                    </p>
                    <br/>

                    <p>The Grid columns can be resized by clicking and dragging at the right edge of column's header. To enable column, resize behavior, set the <code><a target="_blank" className="code"
                        href="https://ej2.syncfusion.com/react/documentation/api/grid/#allowresizing">allowResizing
                        </a></code> property to true. You can also prevent the resize of a particular column by setting
                        <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/columnModel/#allowresizing">columns-&gt;allowResizing
                        </a></code> to false in columns definition.
                
                        And, by double clicking at the right edge of column header, the respective column width will get auto adjusted to its fit using the <code><a target="_blank" className="code"
                            href="https://ej2.syncfusion.com/react/documentation/api/grid/#autofitcolumns">autoFitColumns
                            </a></code> method.
                    </p>
                    <p>
                    In this demo, the allowResizing feature is enabled by setting the <code>allowResizing</code> property to true and <b>Order ID</b> column can be resized
                        between the range of <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/columnModel/#minwidth">minWidth (100px)
                            </a></code> and <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/columnModel/#maxwidth">maxWidth (200px).
                                </a></code> Also, column resizing is disabled for the <b>Shipped Date</b> column.
                    </p>
                    <p style={{ fontWeight: 500 }}>Injecting Module:</p>
                    <p>
                    Grid features are segregated into individual feature-wise modules. 
                    To use resize feature, inject the<code>Resize</code> module using the <code>services</code>
                    </p>

                </div>
            </div>
        )
    }
}