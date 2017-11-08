import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-grids';
import { data } from '../data';
import { SampleBase } from './sample-base';

export class Default extends SampleBase<{}, {}> {

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GridComponent dataSource={data.slice(0, 30)} height='350'>
            <ColumnsDirective>
              <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='right'></ColumnDirective>
              <ColumnDirective field='CustomerName' headerText='Customer Name' width='150'></ColumnDirective>
              <ColumnDirective field='OrderDate' headerText='Order Date' width='130' format='yMd' textAlign='right' />
              <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='right' />
              <ColumnDirective field='ShippedDate' headerText='Shipped Date' width='130' format='yMd' textAlign='right'></ColumnDirective>
              <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150'></ColumnDirective>
            </ColumnsDirective>
          </GridComponent>
        </div>
      </div>
    )
  }
}
ReactDOM.render(<Default />, document.getElementById('sample'));