import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Sort, Inject } from '@syncfusion/ej2-react-grids';
import { data } from './data';
import { SampleBase } from '../common/sample-base';

export class Sorting extends SampleBase<{}, {}> {

    public sortingOptions: Object = { columns: [{ field: 'Freight', direction: 'ascending' }, { field: 'CustomerName', direction: 'descending' }] };

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <GridComponent dataSource={data} allowPaging={true} allowSorting={true} sortSettings={this.sortingOptions}>
                        <ColumnsDirective>
                            <ColumnDirective field='OrderID' headerText='Order ID' width='150' textAlign='right'></ColumnDirective>
                            <ColumnDirective field='CustomerName' headerText='Customer Name' width='170'></ColumnDirective>
                            <ColumnDirective field='OrderDate' headerText='Order Date' width='155' format='yMd' textAlign='right' />
                            <ColumnDirective field='Freight' headerText='Freight' width='150' format='C2' textAlign='right' />
                            <ColumnDirective field='ShippedDate' headerText='Shipped Date' format='yMd' width='155' textAlign='right' ></ColumnDirective>
                            <ColumnDirective field='ShipCountry' headerText='Ship Country' width='170'></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Page, Sort]} />
                    </GridComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the Grid multi sorting feature. To sort two or more columns,
                        hold the CTRL key and click the column header.
                    </p>
                </div>

                <div id='description'>
                    <p>
                        Sorting feature enables us to order the data in a particular direction. It can be enabled by setting the  <code><a target='_blank' className='code'
                            href='http://ej2.syncfusion.com/react/documentation/grid/api-grid.html#allowsorting-boolean'>
                            allowSorting</a></code> as true.</p>

                    <p>To sort a Grid column simply click the column header. The icons (ascending) and (descending) specifies the sort direction of a column.</p>

                    <p>By default, multi-sorting is enabled in Grid, to sort multiple column hold <b>CTRL</b> key and <b>click</b> the column header. To clear sort for a column, hold SHIFT key and click the column header.</p>

                    <p>While using Grid in a touch device, you have an option for multi sorting in single tap on the grid header. By tapping on the grid header, it will show the toggle button in small popup with sort icon. Now tap the button to enable the multi sorting in single tap.</p>

                    <p>In this demo, simply click the column header to sort a column. Also multiple sorting is enabled.
          </p>
                    <p style={{ fontWeight: 500 }}>Injecting Module:</p>
                    <p>
                        Grid component features are segregated into individual feature-wise modules. To use Sorting feature, we need to inject <code>Sort</code> modeule into the <code>services</code>.</p>

                    <p>
                        More information on the paging feature configuration can be found in this
            <a target='_blank' href='http://ej2.syncfusion.com/react/documentation/grid/sorting.html'> documentation section</a>.
          </p>
                </div>
            </div>
        )
    }
}