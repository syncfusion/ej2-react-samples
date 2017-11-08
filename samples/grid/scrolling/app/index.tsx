import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-grids';
import { data } from '../data';
import { SampleBase } from './sample-base';

export class Scrolling extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <GridComponent dataSource={data} height="400">
                        <ColumnsDirective>
                            <ColumnDirective field='OrderID' headerText='Order ID' width='150' textAlign='right'></ColumnDirective>
                            <ColumnDirective field='CustomerName' headerText='Customer Name' width='160'></ColumnDirective>
                            <ColumnDirective field='OrderDate' headerText='Order Date' width='155' format='yMd' textAlign='right' />
                            <ColumnDirective field='Freight' headerText='Freight' width='130' format='C2' textAlign='right' />
                            <ColumnDirective field='ShippedDate' headerText='Shipped Date' width='155' format='yMd' textAlign='right'></ColumnDirective>
                            <ColumnDirective field='ShipName' headerText='Ship Name' width='170'></ColumnDirective>
                            <ColumnDirective field='ShipAddress' headerText='Ship Address' width='170'></ColumnDirective>
                            <ColumnDirective field='ShipCity' headerText='Ship City' width='150'></ColumnDirective>
                            <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150'></ColumnDirective>
                        </ColumnsDirective>
                    </GridComponent>
                </div>
            </div>
        )
    }
}
ReactDOM.render(<Scrolling />, document.getElementById('sample'));