import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Inject } from '@syncfusion/ej2-react-grids';
import { data } from '../data';
import { SampleBase } from './sample-base';

export class Localbinding extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <GridComponent dataSource={data} allowPaging={true} pageSettings={{ pageCount: 8 }}>
                        <ColumnsDirective>
                            <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='right'></ColumnDirective>
                            <ColumnDirective field='CustomerName' headerText='Customer Name' width='150'></ColumnDirective>
                            <ColumnDirective field='OrderDate' headerText='Order Date' width='130' format='yMd' textAlign='right' />
                            <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='right' />
                            <ColumnDirective field='ShippedDate' headerText='Shipped Date' width='130' format='yMd' textAlign='right'></ColumnDirective>
                            <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150'></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Page]} />
                    </GridComponent>
                </div>
            </div>
        )
    }
}
ReactDOM.render(<Localbinding />, document.getElementById('sample'));