import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Selection, RowDD, Inject } from '@syncfusion/ej2-react-grids';
import { orderDetails } from './data';
import { updateSampleSection } from '../common/sample-base';

function DragWithinGrid() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <GridComponent dataSource={orderDetails} allowRowDragAndDrop={true} height='400' selectionSettings={{ type: 'Multiple' }}>
          <ColumnsDirective>
            <ColumnDirective field='OrderID' isPrimaryKey={true} headerText='Order ID' width='120' textAlign='Right'></ColumnDirective>
            <ColumnDirective field='CustomerName' headerText='Customer Name' width='150'></ColumnDirective>
            <ColumnDirective field='OrderDate' headerText='Order Date' width='100' format='yMd' textAlign='Right' />
            <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right' />
            <ColumnDirective field='ShipCity' headerText='Ship City' width='150'></ColumnDirective>
            <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150'></ColumnDirective>
          </ColumnsDirective>
          <Inject services={[RowDD, Selection]} />
        </GridComponent>
      </div>
      <div id="action-description">
        <p>This sample demonstrates the Grid component with the row drag and drop feature within same grid. You can rearrange the grid rows by using drag icon in left side of grid column.Here you can drag and drop the grid rows between the decided rows.
        </p>
      </div>
      <div id="description">
        <p>Row drag and drop enabled by settting
          <code><a target="_blank" className="code"
            href="http://ej2.syncfusion.com/documentation/grid/api-grid.html#allowrowdraganddrop">
            allowRowDragAndDrop
          </a></code> property as true.
        </p>

        <p style={{ fontWeight: 500 }}>Injecting Module:</p>
        <p>
          Grid features are segregated into individual feature-wise modules.
          To use row, drag and drop feature we need to inject
          <code>RowDD</code> module using the <code>Grid.Inject(RowDD)</code> section.
        </p>
      </div>
    </div>
  )
}
export default DragWithinGrid;