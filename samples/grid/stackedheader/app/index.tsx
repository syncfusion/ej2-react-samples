import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-grids';
import { data } from '../data';
import { SampleBase } from './sample-base';

export class StackedHeader extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <GridComponent dataSource={data.slice(0, 12)} >
                        <ColumnsDirective>
                            <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='right'></ColumnDirective>
                            <ColumnDirective columns={[{ field: 'OrderDate', headerText: 'Order Date', format: 'yMd', width: 130, textAlign: 'right' }, { field: 'Freight', headerText: 'Freight ($)', width: 120, format: 'C1', textAlign: 'right' }]} headerText='Order Details' ></ColumnDirective>
                            <ColumnDirective columns={[{ field: 'ShippedDate', headerText: 'Shipped Date', format: 'yMd', textAlign: 'right', width: 150 }, { field: 'ShipCountry', headerText: 'Ship Country', width: 150 }]} headerText='Ship Details' />
                        </ColumnsDirective>
                    </GridComponent>
                </div>
            </div>
        )
    }
}
ReactDOM.render(<StackedHeader />, document.getElementById('sample'));