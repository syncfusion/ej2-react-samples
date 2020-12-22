import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Page, Inject } from '@syncfusion/ej2-react-treegrid';
import { stackedData } from './data';
import { SampleBase } from '../common/sample-base';

export class Stacked extends SampleBase<{}, {}> {

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <TreeGridComponent dataSource={stackedData} treeColumnIndex={1} childMapping= 'subtasks' height='350' allowPaging='true'
            pageSettings={{ pageCount: 5 }}>
            <ColumnsDirective>
            <ColumnDirective columns={[{ field: 'orderID', headerText: 'Order ID', width: 90, textAlign: 'Right' },
              { field: 'orderName', headerText: 'Order Name', width: 170, textAlign: 'Left' },
              { field: 'orderDate', headerText: 'Order Date', width: 120, textAlign: 'Right', format:'yMd' }]}
              headerText='Order Details' textAlign='Center'></ColumnDirective>
            <ColumnDirective columns={[{ field: 'shipMentCategory', headerText: 'Shipment Category', width: 150, textAlign: 'Left' },
              { field: 'shippedDate', headerText: 'Shipped Date', width: 120, textAlign: 'Right', format:'yMd' },
              { field: 'units', headerText: 'Units', width: 90, textAlign: 'Left' },]}
              headerText='Shipment Details' textAlign='Center' ></ColumnDirective>
            <ColumnDirective columns={[{ field: 'unitPrice', headerText: 'Price per unit', format: 'C2', type:'number', textAlign: 'Right', width: 130 },
              { field: 'price', headerText: 'Total Price', width: 130, format:'C', type:'number' }]}
              headerText='Price Details' textAlign='Center' ></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Page]}/>
          </TreeGridComponent>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the Tree Grid component with the stacked header feature. In this sample, we have 
            shown multiple levels of column header.</p>
        </div>
        <div id='description'>
          <p>The Tree Grid columns can be stacked/grouped in order to show multiple levels of column header.
            It can be done by setting the <code>columns->columns property</code>.</p>
          <p>In this demo, the columns <b>Order ID</b>, <b>Order Name</b>, <b>Order Date</b> are grouped under Order Details,
            the columns <b>Shipment Category</b>,<b>Shipped Date</b>, <b>Units</b> are grouped under Shipment Details and
            Price per Unit, Total Price are grouped under Price details.</p>
          <p>
            More information on the stacked header configuration can be found in this documentation section.
          </p>
        </div>
      </div>
    )
  }
}