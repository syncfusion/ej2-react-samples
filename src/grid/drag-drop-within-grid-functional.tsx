import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Selection, RowDD, Group, Inject, Sort } from '@syncfusion/ej2-react-grids';
import { orderDetails } from './data';
import { updateSampleSection } from '../common/sample-base';
import { DialogComponent } from '@syncfusion/ej2-react-popups';

function DragWithinGrid() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  let gridInstance: GridComponent;
  const visible = false;
  const animationSettings: Object = { effect: 'None' };
  let alertDialogInstance: DialogComponent;
  const alertButtons = [{
    click: () => {
      alertDialogInstance.hide();
    },
    buttonModel: { content: 'OK', isPrimary: true }
  }];
  function columnDragStart(args) {
    if (args.column.field === 'ShipCountry') {
      alertDialogInstance.show();
    }
  }
  function created() {
    gridInstance.on('columnDragStart', columnDragStart, this);
  }
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <GridComponent ref={grid => gridInstance = grid} dataSource={orderDetails} allowRowDragAndDrop={true} allowSorting={true} allowGrouping={true} height='400' selectionSettings={{ type: 'Multiple' }} created={created}>
          <ColumnsDirective>
            <ColumnDirective field='OrderID' isPrimaryKey={true} headerText='Order ID' width='120' textAlign='Right'></ColumnDirective>
            <ColumnDirective field='CustomerName' headerText='Customer Name' width='150'></ColumnDirective>
            <ColumnDirective field='OrderDate' headerText='Order Date' width='100' format='yMd' textAlign='Right'/>
            <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right'/>
            <ColumnDirective field='ShipCity' headerText='Ship City' width='150'></ColumnDirective>
            <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150' allowGrouping={false}></ColumnDirective>
          </ColumnsDirective>
          <Inject services={[RowDD, Selection, Group, Sort]} />
        </GridComponent>
        <DialogComponent id="alertDialog" header='Grouping' visible={visible} animationSettings={animationSettings} width='300px' content='Grouping is disabled for this column' ref={alertdialog => alertDialogInstance = alertdialog} target='.control-section' buttons={alertButtons} ></DialogComponent>
      </div>
      <div id="action-description">
        <p>This sample demonstrates the Grid component with the row drag and drop feature within same grid. You can rearrange the grid rows by using drag icon in left side of grid column.Here you can drag and drop the grid rows between the decided rows.
        </p>
      </div>
      <div id="description">
        <p>Row drag and drop enabled by setting
          <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/#allowrowdraganddrop">allowRowDragAndDrop</a></code> property as true.
        </p>
        <p>Grouping can be enabled by setting  
          <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/#allowgrouping">allowGrouping</a></code> property as true.
        </p>
          <p>
            Grid features are segregated into individual feature-wise modules.
            To use row drag and drop and grouping features, 
            we need to inject 
            <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/#rowdraganddropmodule">RowDD</a></code>, 
            <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/group/#group">Group</a></code> modules into the <code>services</code>.
          </p>
        <p>
          The row drag and drop functionality is enabled with grouped records in the grid.
          Now, you can drag and drop the records from one group to another group of your choice.
        </p> 
      </div>
    </div>
  )
}
export default DragWithinGrid;
