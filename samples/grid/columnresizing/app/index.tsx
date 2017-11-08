import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Inject } from '@syncfusion/ej2-react-grids';
import { data } from '../data';
import { SampleBase } from './sample-base';

export class ColumnResizing extends SampleBase<{}, {}> {
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <GridComponent dataSource={data.splice(0, 60)} allowResizing={true} height='400' >
                        <ColumnsDirective>
                            <ColumnDirective field='OrderID' headerText='Order ID' minWidth= '120' width='200' maxWidth='300' textAlign='right'></ColumnDirective>
                            <ColumnDirective field='CustomerName' headerText='Customer Name' minWidth= '8' width='200' ></ColumnDirective>
                            <ColumnDirective field='OrderDate' headerText='Order Date' minWidth= '8' width='200' format='yMd' textAlign='right' />
                            <ColumnDirective field='ShippedDate' headerText='Shipped Date' allowResizing= {false} width='200' format='yMd' textAlign='right' />
                            <ColumnDirective field='Freight' headerText='Freight' minWidth= '8' width='150' format='C2' textAlign='right' />
                            <ColumnDirective field='ShipName' headerText='Ship Name' minWidth= '8' width='200'></ColumnDirective>
                            <ColumnDirective field='ShipCountry' headerText='Ship Country' minWidth= '8' width='200'></ColumnDirective>
                            <ColumnDirective field='ShipCity' headerText='Ship City' minWidth= '8' width='200'></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Resize]} />
                    </GridComponent>
                </div>
            </div>
        )
    }
}
ReactDOM.render(<ColumnResizing />, document.getElementById('sample'));