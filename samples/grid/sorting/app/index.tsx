import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Sort, Inject } from '@syncfusion/ej2-react-grids';
import { data } from '../data';
import { SampleBase } from './sample-base';

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
            </div>
        )
    }
}
ReactDOM.render(<Sorting />, document.getElementById('sample'));