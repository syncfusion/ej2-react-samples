import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Toolbar } from '@syncfusion/ej2-react-grids';
import { orderDetails } from './data';
import { SampleBase } from '../common/sample-base';

export class Print extends SampleBase<{}, {}> {

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GridComponent dataSource={orderDetails} height='350' toolbar={['Print']}>
            <ColumnsDirective>
              <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='Right'></ColumnDirective>
              <ColumnDirective field='CustomerName' headerText='Customer Name' width='150'></ColumnDirective>
              <ColumnDirective field='OrderDate' headerText='Order Date' width='130' format='yMd' textAlign='Right' />
              <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right' />
              <ColumnDirective field='ShippedDate' headerText='Shipped Date' width='130' format='yMd' textAlign='Right'></ColumnDirective>
              <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150'></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Toolbar]}/>
          </GridComponent>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the default rendering of the Grid with minimum configuration.</p>
        </div>
        <div id="description">
        <p>The Grid can be printed using the <code><a target="_blank" className="code"
            href="https://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#print">print
            </a></code> method. While printing the pager and 
        scrollbar will be removed if they are enabled in Grid.</p>
        <p>By default, all pages will be printed. 
            We can print current page alone by setting the <code><a target="_blank" className="code"
            href="https://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#printmode">printMode
            </a></code> property
            value as <code>CurrentPage</code>.</p>
        <p>In this demo, The Grid toolbar provides an option to print the Grid.</p>
        <p>More information on the print feature can be found in this
            <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#printmode">
            documentation section</a>.
        </p>
    </div>
      </div>
    )
  }
}